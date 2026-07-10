#!/usr/bin/env bash
# 量出每段旁白时长，换算成帧(30fps)，辅助设置 theme.ts 里的 SCENE_FRAMES。
# 规则: 每段镜头帧数 >= Narration delayFrames + ceil(音频秒数 * fps) + 收尾留白
# 用法: ./measure_audio.sh <项目>/public/audio [fps]
set -euo pipefail
DIR="${1:?需要 audio 目录}"
FPS="${2:-30}"
printf "%-8s %-10s %-10s\n" "file" "seconds" "frames@${FPS}"
for mp3 in "$DIR"/s*.mp3; do
  [ -e "$mp3" ] || continue
  d=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$mp3")
  frames=$(python3 -c "import math;print(math.ceil($d*$FPS))")
  printf "%-8s %-10s %-10s\n" "$(basename "$mp3")" "$d" "$frames"
done
