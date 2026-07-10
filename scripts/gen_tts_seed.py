# coding=utf-8
"""火山引擎「大模型语音合成 Seed TTS」v3 批量配音（API Key 鉴权 + 流式）。

用法:
    source config/seed.env
    python gen_tts_seed.py --script narration.json --out <项目>/public/audio

环境变量(见 config/seed.env):
    SEED_API_KEY      控制台获取的 API Key
    SEED_RESOURCE_ID  默认 seed-tts-2.0
    SEED_SPEAKER      音色ID, 如 zh_female_xiaohe_uranus_bigtts
    SEED_INSTRUCT     可选, 自然语言语气/语速指令(如 "用温暖亲切的语气，语速稍慢")

与 v1(gen_tts_volcano.py) 的区别: 这是大模型 TTS, 独立服务/独立计费, 端点 /api/v3/tts/unidirectional。
依赖: pip install requests
"""
import argparse
import base64
import json
import os
import sys

import requests

URL = "https://openspeech.bytedance.com/api/v3/tts/unidirectional"


def synth(text, api_key, resource_id, speaker, instruct, out_path):
    headers = {
        "X-Api-Key": api_key,
        "X-Api-Resource-Id": resource_id,
        "Content-Type": "application/json",
        "Connection": "keep-alive",
    }
    req = {"text": text, "speaker": speaker,
           "audio_params": {"format": "mp3", "sample_rate": 24000}}
    if instruct:
        req["additions"] = json.dumps({"context_texts": [instruct]})
    payload = {"req_params": req}

    audio = bytearray()
    err = None
    try:
        with requests.post(URL, headers=headers, json=payload, stream=True, timeout=90) as r:
            for line in r.iter_lines(decode_unicode=True):
                if not line:
                    continue
                d = json.loads(line)
                c = d.get("code", 0)
                if c == 0 and d.get("data"):
                    audio.extend(base64.b64decode(d["data"]))
                elif c == 20000000:
                    break
                elif c > 0:
                    err = d
                    break
    except Exception as e:  # 网络/代理抖动 -> 交给上层重试
        print(f"[WARN] {os.path.basename(out_path)} 网络异常, 将重试: {e}")
        return False
    if err or not audio:
        print(f"[FAIL] {os.path.basename(out_path)}: {err}")
        return False
    with open(out_path, "wb") as f:
        f.write(audio)
    print(f"[OK]   {os.path.basename(out_path)}  ({len(audio)/1024:.1f} KB)")
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--script", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--retry", type=int, default=2)
    args = ap.parse_args()

    api_key = os.environ.get("SEED_API_KEY")
    resource_id = os.environ.get("SEED_RESOURCE_ID", "seed-tts-2.0")
    speaker = os.environ.get("SEED_SPEAKER")
    instruct = os.environ.get("SEED_INSTRUCT", "")
    if not api_key or not speaker:
        sys.exit("缺少 SEED_API_KEY / SEED_SPEAKER，请先 `source config/seed.env`")

    with open(args.script, encoding="utf-8") as f:
        lines = json.load(f)
    os.makedirs(args.out, exist_ok=True)

    failed = []
    for name, text in lines.items():
        out_path = os.path.join(args.out, f"{name}.mp3")
        ok = False
        for _ in range(args.retry + 1):
            ok = synth(text, api_key, resource_id, speaker, instruct, out_path)
            if ok:
                break
        if not ok:
            failed.append(name)
    if failed:
        print(f"\n仍失败: {failed}")
        sys.exit(1)
    print("\n全部生成完毕。下一步：measure_audio.sh 量时长 → 校准 SCENE_FRAMES。")


if __name__ == "__main__":
    main()
