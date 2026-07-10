# coding=utf-8
"""火山引擎 TTS 批量配音生成器（通用版）。

用法：
    python gen_tts_volcano.py --script narration.json --out <项目>/public/audio

narration.json 形如：
    { "s1": "第一句旁白", "s2": "第二句旁白", ... }
键名即输出文件名（s1.mp3 ...），与分镜组件里的 Narration file 对应。

凭证 & 参数从环境变量读取（先 source config/volcano.env）：
    VOLC_APPID, VOLC_TOKEN, VOLC_CLUSTER(默认 volcano_tts),
    VOLC_VOICE(默认 BV421_streaming), VOLC_SPEED(默认 0.8)

依赖: pip install requests
错误码 3001 = 账号侧未授权：到火山控制台开通「语音合成」、把音色加到该应用、确认 appid/token 配对。
"""
import argparse
import base64
import json
import os
import sys
import uuid

import requests

API_URL = "https://openspeech.bytedance.com/api/v1/tts"


def synth(text, appid, token, cluster, voice, speed, out_path):
    req = {
        "app": {"appid": appid, "token": token, "cluster": cluster},
        "user": {"uid": "promo_skill"},
        "audio": {
            "voice_type": voice,
            "encoding": "mp3",
            "speed_ratio": float(speed),
            "volume_ratio": 1.0,
            "pitch_ratio": 1.0,
        },
        "request": {
            "reqid": str(uuid.uuid4()),
            "text": text,
            "text_type": "plain",
            "operation": "query",
            "with_frontend": 1,
            "frontend_type": "unitTson",
        },
    }
    header = {"Authorization": f"Bearer;{token}"}
    body = requests.post(API_URL, json.dumps(req), headers=header, timeout=30).json()
    if "data" not in body:
        print(f"[FAIL] {os.path.basename(out_path)}: code={body.get('code')} {body.get('message')!r}")
        return False
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(body["data"]))
    print(f"[OK]   {os.path.basename(out_path)}")
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--script", required=True, help="narration JSON: {name: text}")
    ap.add_argument("--out", required=True, help="输出目录 (一般是 <项目>/public/audio)")
    ap.add_argument("--retry", type=int, default=2, help="单句失败重试次数(应对授权刚生效的首请求)")
    args = ap.parse_args()

    appid = os.environ.get("VOLC_APPID")
    token = os.environ.get("VOLC_TOKEN")
    cluster = os.environ.get("VOLC_CLUSTER", "volcano_tts")
    voice = os.environ.get("VOLC_VOICE", "BV421_streaming")
    speed = os.environ.get("VOLC_SPEED", "0.8")
    if not appid or not token:
        sys.exit("缺少 VOLC_APPID / VOLC_TOKEN，请先 `source config/volcano.env`")

    with open(args.script, encoding="utf-8") as f:
        lines = json.load(f)
    os.makedirs(args.out, exist_ok=True)

    failed = []
    for name, text in lines.items():
        out_path = os.path.join(args.out, f"{name}.mp3")
        ok = False
        for _ in range(args.retry + 1):
            ok = synth(text, appid, token, cluster, voice, speed, out_path)
            if ok:
                break
        if not ok:
            failed.append(name)
    if failed:
        print(f"\n仍失败: {failed} — 多为账号授权未完全生效，稍后重试或检查控制台。")
        sys.exit(1)
    print("\n全部生成完毕。下一步：用 measure_audio.sh 量时长，校准 SCENE_FRAMES。")


if __name__ == "__main__":
    main()
