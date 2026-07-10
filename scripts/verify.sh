#!/usr/bin/env bash
# 成片自检: 规格 + 抽帧(目检中文/排版/emoji) + 音量(非静音) + 旁白起止。
# 用法: ./verify.sh <项目>/out/xxx.mp4 [抽帧秒列表,逗号分隔]
set -euo pipefail
OUT="${1:?需要 mp4 路径}"
SHOTS="${2:-2,12,20,27,38,50,58}"

echo "=== 规格 ==="
ffprobe -v error -show_entries format=duration:stream=codec_type,codec_name,width,height \
  -of default=noprint_wrappers=1 "$OUT"

echo "=== 整体音量(应非静音, mean 约 -18~-23dB) ==="
ffmpeg -hide_banner -i "$OUT" -af volumedetect -f null /dev/null 2>&1 | grep -E "mean_volume|max_volume"

echo "=== 抽验证帧到 /tmp/vchk ==="
mkdir -p /tmp/vchk
IFS=',' read -ra TS <<< "$SHOTS"
for t in "${TS[@]}"; do
  ffmpeg -y -loglevel error -ss "$t" -i "$OUT" -frames:v 1 "/tmp/vchk/f_${t}s.jpg"
done
ls /tmp/vchk
echo "→ 用 Read 工具看这些帧，确认中文/emoji/排版正常。"
