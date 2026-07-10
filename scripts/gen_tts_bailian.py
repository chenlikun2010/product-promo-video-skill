# coding=utf-8
"""阿里百炼 Bailian / 阿里云模型工作室 CLI (bl) TTS 批量配音生成器。

用法:
    source config/bailian.env
    python gen_tts_bailian.py --script narration.json --out <项目>/public/audio

narration.json 形如：
    { "s1": "第一句旁白", "s2": "第二句旁白", ... }
键名即输出文件名（s1.mp3 ...），与分镜组件里的 Narration file 对应。

依赖:
    - bl CLI (aliyun-model-studio / bailian-cli): npm install -g bailian-cli
    - Python requests (一般已内置)

环境变量(见 config/bailian.env):
    BAILIAN_VOICE      音色 ID (默认 longanwen_v3, 优雅知性女声)
    BAILIAN_RATE       语速 0.5-2.0 (默认 1.0)
    BAILIAN_PITCH      音调 0.5-2.0 (默认 1.0)
    BAILIAN_LANGUAGE   语言提示 (默认 zh)
    BAILIAN_INSTRUCT   自然语言语气指令 (默认空, 如 "用温暖亲切的语气，语速稍慢")

可用音色列表 (bl speech synthesize --list-voices --model cosyvoice-v3-flash):
    longanwen_v3   龙安温  优雅知性女  ← 默认推荐
    longanli_v3    龙安莉  利落从容女
    longanlang_v3  龙安朗  清爽利落男
    longtian_v3    龙天    磁性理智男
    longcheng_v3   龙橙    智慧青年男
    longanyang     龙安洋  阳光大男孩
    ... (更多音色见 bl --list-voices 输出)

与 gen_tts_volcano.py / gen_tts_seed.py 的区别:
    - 无需申请火山/字节 SECRET_KEY / APPID，凭阿里云 AccessKey 自动鉴权
    - bl CLI 会自动从 ~/.bailian/config.json 读取凭证（或通过 bl auth login）
    - 音色基于 CosyVoice v3-flash，端点由 bl CLI 封装，稳定性高
"""
import argparse
import json
import os
import subprocess
import sys
import time


def synth(text, voice, rate, pitch, language, instruct, out_path):
    """调用 bl speech synthesize 生成单句配音。"""
    cmd = [
        "bl", "speech", "synthesize",
        "--text", text,
        "--voice", voice,
        "--format", "mp3",
        "--out", out_path,
    ]
    if rate != "1.0":
        cmd += ["--rate", rate]
    if pitch != "1.0":
        cmd += ["--pitch", pitch]
    if language:
        cmd += ["--language", language]
    if instruct:
        cmd += ["--instruction", instruct]

    # bl CLI 输出较冗长，--quiet 抑制进度条但保留错误
    proc = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    if proc.returncode == 0:
        size = os.path.getsize(out_path)
        print(f"[OK]   {os.path.basename(out_path)}  ({size / 1024:.1f} KB)")
        return True
    # 常见错误：未登录 / quota 超限 / 内容违规
    err = proc.stderr.strip()
    print(f"[FAIL] {os.path.basename(out_path)}: {err[:200]}")
    return False


def main():
    ap = argparse.ArgumentParser(
        description="阿里百炼 bl TTS 批量配音生成器"
    )
    ap.add_argument("--script", required=True,
                    help="narration JSON 文件路径 (如 narration.json)")
    ap.add_argument("--out", required=True,
                    help="输出目录 (一般是 <项目>/public/audio)")
    ap.add_argument("--retry", type=int, default=2,
                    help="单句失败重试次数 (默认 2)")
    args = ap.parse_args()

    voice = os.environ.get("BAILIAN_VOICE", "longanwen_v3")
    rate = os.environ.get("BAILIAN_RATE", "1.0")
    pitch = os.environ.get("BAILIAN_PITCH", "1.0")
    language = os.environ.get("BAILIAN_LANGUAGE", "zh")
    instruct = os.environ.get("BAILIAN_INSTRUCT", "")

    # 简单检查 bl 是否可用
    if subprocess.run(["bl", "--version"],
                      capture_output=True).returncode != 0:
        sys.exit("bl CLI 未安装或不在 PATH 中。请先: npm install -g bailian-cli")

    with open(args.script, encoding="utf-8") as f:
        lines = json.load(f)
    os.makedirs(args.out, exist_ok=True)

    failed = []
    for name, text in lines.items():
        out_path = os.path.join(args.out, f"{name}.mp3")
        ok = False
        for attempt in range(args.retry + 1):
            if attempt > 0:
                print(f"  重试 ({attempt}/{args.retry}) ...")
                time.sleep(2)
            ok = synth(text, voice, rate, pitch, language, instruct, out_path)
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
