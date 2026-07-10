# coding=utf-8
"""合成温暖柔和的背景音乐床（I–V–vi–IV 抒情和声 + 软 Pad + 轻钢琴琶音）。

用法: python gen_bgm.py --duration 62 --out <项目>/public/audio/bgm.mp3
  --duration 取「视频时长 + 2秒」即可（渲染时 BgMusic 会按视频长度淡出）。
  --key 可选 C / G / F / D 等大调根音偏移，默认 C。
依赖: numpy + ffmpeg
"""
import argparse
import os
import subprocess
import tempfile
import wave

import numpy as np

SR = 44100


def f(n):
    return 440.0 * 2 ** ((n - 69) / 12.0)


NOTE = {
    'C3': 48, 'D3': 50, 'E3': 52, 'F3': 53, 'G3': 55, 'A3': 57, 'B3': 59,
    'C4': 60, 'D4': 62, 'E4': 64, 'F4': 65, 'G4': 67, 'A4': 69, 'B4': 71,
    'C5': 72, 'D5': 74, 'E5': 76, 'F5': 77, 'G5': 79, 'A5': 81,
}

# I–V–vi–IV (C大调): C / G / Am / F
PROG = [
    (['C3', 'C4', 'E4', 'G4'], ['C5', 'E5', 'G4']),
    (['G3', 'G3', 'B3', 'D4'], ['G4', 'B4', 'D5']),
    (['A3', 'A3', 'C4', 'E4'], ['A4', 'C5', 'E5']),
    (['F3', 'F3', 'A3', 'C4'], ['F4', 'A4', 'C5']),
]
CHORD_SPACING = 4.0
CHORD_LEN = 5.6


def soft_env(length):
    t = np.linspace(0, np.pi, length)
    return np.sin(t) ** 1.4


def pad_voice(freq, length):
    t = np.arange(length) / SR
    sig = np.zeros(length)
    for detune, amp in [(-0.15, 0.5), (0.0, 1.0), (0.15, 0.5)]:
        sig += amp * np.sin(2 * np.pi * freq * (1 + detune / 100.0) * t)
    sig += 0.18 * np.sin(2 * np.pi * 2 * freq * t)
    return sig


def pluck(freq, length):
    t = np.arange(length) / SR
    env = np.exp(-t * 3.2)
    sig = (np.sin(2 * np.pi * freq * t)
           + 0.35 * np.sin(2 * np.pi * 2 * freq * t)
           + 0.15 * np.sin(2 * np.pi * 3 * freq * t))
    return sig * env


def lowpass(x, alpha=0.25):
    y = np.empty_like(x)
    acc = 0.0
    for i in range(len(x)):
        acc += alpha * (x[i] - acc)
        y[i] = acc
    return y


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--duration", type=float, default=62.0)
    ap.add_argument("--out", required=True)
    ap.add_argument("--semitones", type=int, default=0, help="整体移调(半音), 例如 +5 移到 F 大调")
    ap.add_argument("--gain", type=float, default=0.16, help="峰值电平(0~1), 越小越安静")
    args = ap.parse_args()

    DUR = args.duration
    shift = args.semitones
    n_total = int(DUR * SR)
    buf = np.zeros(n_total)
    arp = np.zeros(n_total)

    start, ci = 0.0, 0
    while start < DUR:
        chord_pad, chord_arp = PROG[ci % len(PROG)]
        s0 = int(start * SR)
        if s0 >= n_total:
            break
        L = min(int(CHORD_LEN * SR), n_total - s0)
        env = soft_env(L)
        voice = np.zeros(L)
        for note in chord_pad:
            voice += pad_voice(f(NOTE[note] + shift), L)
        voice /= len(chord_pad)
        buf[s0:s0 + L] += voice * env
        for k, note in enumerate(chord_arp):
            ns = s0 + int((0.2 + k * 0.5) * SR)
            nl = int(1.2 * SR)
            if ns + nl > n_total:
                nl = n_total - ns
            if nl > 0:
                arp[ns:ns + nl] += pluck(f(NOTE[note] + shift), nl) * 0.6
        start += CHORD_SPACING
        ci += 1

    mix = lowpass(0.85 * buf + 0.30 * arp, alpha=0.25)
    peak = np.max(np.abs(mix)) or 1.0
    mix = mix / peak * args.gain
    fi, fo = int(2.0 * SR), int(3.0 * SR)
    mix[:fi] *= np.linspace(0, 1, fi)
    mix[-fo:] *= np.linspace(1, 0, fo)

    pcm = (np.clip(mix, -1, 1) * 32767).astype(np.int16)
    stereo = np.stack([pcm, pcm], axis=1).reshape(-1)
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        wav_path = tmp.name
    with wave.open(wav_path, 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(stereo.tobytes())
    os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", wav_path,
                    "-ar", "48000", "-ac", "2", "-b:a", "192k", args.out], check=True)
    os.remove(wav_path)
    print(f"wrote {args.out}  ({DUR}s)")


if __name__ == "__main__":
    main()
