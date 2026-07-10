#!/usr/bin/env bash
# macOS 离线 TTS 兜底（无网络/无火山授权时用）。音质不如火山，仅作占位或预览。
# 用法: ./gen_tts_say.sh narration.json <项目>/public/audio
# 依赖: macOS `say` + ffmpeg ; narration.json: {"s1":"文本", ...}
set -euo pipefail
SCRIPT_JSON="${1:?需要 narration.json}"
OUT_DIR="${2:?需要输出目录}"
VOICE="${SAY_VOICE:-Tingting}"   # 普通话女声; 可选 Sinji(粤) 等
RATE="${SAY_RATE:-165}"
mkdir -p "$OUT_DIR"
# 遍历 JSON 的 key/value
python3 - "$SCRIPT_JSON" <<'PY' | while IFS=$'\t' read -r name text; do
import json,sys
for k,v in json.load(open(sys.argv[1],encoding='utf-8')).items():
    print(f"{k}\t{v}")
PY
  say -v "$VOICE" -r "$RATE" -o "/tmp/_say_$name.aiff" "$text"
  ffmpeg -y -loglevel error -i "/tmp/_say_$name.aiff" -ar 48000 -ac 2 -b:a 192k "$OUT_DIR/$name.mp3"
  echo "[OK] $name.mp3"
done
echo "完成。记得用 measure_audio.sh 量时长校准 SCENE_FRAMES。"
