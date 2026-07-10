# product-promo-video-skill

用 Remotion（React 代码化视频）把**素材目录 + 创意想法**做成可直接播放的 MP4 产品宣传片/企业介绍视频/展厅循环片。

适合：图片/实物图/小程序截图/短视频为主，配有文字+动效+配音的 motion-graphics 型短片。
不适合：需要真人实拍/复杂运镜的镜头（这类用外部 AI 视频生成或实拍补镜）。

---

## 快速开始

### 前置依赖

- `node` ≥ 18，`npm`，`ffmpeg/ffprobe`，`python3`（含 `requests`）
- **阿里百炼 TTS**（推荐）：`npm install -g bailian-cli` + `bl auth login --console --console-site domestic`
- **火山引擎 TTS**（可选备选）：`source config/volcano.env`
- macOS 离线兜底：`say` 命令

### 标准工作流

```bash
# 1. 从模板搭工程
PROJ="$HOME/my-promo-video"
cp -R ~/.claude/skills/product-promo-video/template "$PROJ"
cd "$PROJ" && npm install
mkdir -p public/assets public/audio out

# 2. 放入素材（图片 → ASCII 文件名 → public/assets/）
#    HEVC 视频先转 H.264:
ffmpeg -y -i in.mp4 -c:v libx264 -pix_fmt yuv420p -crf 20 -an public/assets/video.mp4

# 3. 写旁白文案 narration.json
#    { "s1": "第一句", "s2": "第二句", ... }

# 4. 生成配音（选一种）
#    方式A — 阿里百炼（推荐，最简）:
source ~/.claude/skills/product-promo-video/config/bailian.env
python3 ~/.claude/skills/product-promo-video/scripts/gen_tts_bailian.py \
  --script narration.json --out public/audio

#    方式B — 火山引擎大模型 TTS:
source ~/.claude/skills/product-promo-video/config/seed.env
python3 ~/.claude/skills/product-promo-video/scripts/gen_tts_seed.py \
  --script narration.json --out public/audio

#    方式C — 火山引擎标准 TTS:
source ~/.claude/skills/product-promo-video/config/volcano.env
python3 ~/.claude/skills/product-promo-video/scripts/gen_tts_volcano.py \
  --script narration.json --out public/audio

#    方式D — macOS 离线兜底:
./scripts/gen_tts_say.sh narration.json public/audio

# 5. 量配音时长 → 校准分镜帧数
~/.claude/skills/product-promo-video/scripts/measure_audio.sh public/audio
# 根据输出修改 src/theme.ts 的 SCENE_FRAMES

# 6. 选风格预设（warm / guochao / tech），拷入 src/
#    见 styles/STYLES.md

# 7. 生成背景音乐（可选）
python3 ~/.claude/skills/product-promo-video/scripts/gen_bgm.py \
  --duration 60 --out public/audio/bgm.mp3

# 8. 渲染
npx remotion render Promo "out/final.mp4" --concurrency=2

# 9. 自检
~/.claude/skills/product-promo-video/scripts/verify.sh "out/final.mp4"
```

---

## TTS 配音方案对比

| 方案 | 依赖 | 音质 | 配置难度 | 推荐场景 |
|------|------|------|----------|----------|
| **阿里百炼 Bailian** (`gen_tts_bailian.py`) | `bl` CLI + 阿里云账号 | ⭐⭐⭐⭐⭐ | ★（最简） | **首选，优先使用** |
| 火山大模型 Seed TTS (`gen_tts_seed.py`) | `SEED_API_KEY` | ⭐⭐⭐⭐⭐ | ★★★ | 需单独申请 API Key |
| 火山标准 TTS (`gen_tts_volcano.py`) | `VOLC_APPID` + `VOLC_TOKEN` | ⭐⭐⭐ | ★★★ | 备选 |
| macOS `say` (`gen_tts_say.sh`) | macOS 系统 | ⭐⭐ | ★ | 离线兜底/预览 |

### 阿里百炼 TTS 用法详解

```bash
# 安装 & 登录
npm install -g bailian-cli
bl auth login --console --console-site domestic  # 国内版
# 或 bl auth login --console --console-site international  # 国际版

# 查看可用音色
bl speech synthesize --list-voices --model cosyvoice-v3-flash

# 常用音色推荐
#   longanwen_v3  龙安温  优雅知性女声 ← 默认，推荐公司/产品介绍
#   longanli_v3   龙安莉  利落从容女（商务）
#   longanlang_v3 龙安朗  清爽利落男
#   longtian_v3   龙天    磁性理智男
#   longcheng_v3  龙橙    智慧青年男

# 配置（编辑 config/bailian.env 或直接设置环境变量）
export BAILIAN_VOICE=longanwen_v3    # 音色
export BAILIAN_RATE=1.0              # 语速 0.5-2.0
export BAILIAN_PITCH=1.0             # 音调 0.5-2.0
export BAILIAN_INSTRUCT="用温暖亲切的语气，语速稍慢"  # 可选语气指令

# 生成配音
python3 ~/.claude/skills/product-promo-video/scripts/gen_tts_bailian.py \
  --script narration.json --out public/audio
```

---

## 风格预设

三套开箱即用的视觉风格（`styles/STYLES.md`）：

| 风格 | 配色 | 适用场景 |
|------|------|----------|
| `warm` 温情家庭向 | 暖橙/米白 | 养老/家庭/消费品 |
| `guochao` 活力国潮 | 红金/传统纹样 | 国货/文化/节庆 |
| `tech` 商务科技 | 深蓝/科技蓝 | SaaS/AI/企业服务 |

选定风格后，将对应 `styles/<风格>/` 下的 `theme.ts`、`AllScenes.tsx` 等文件拷入工程 `src/`，再按实际文案修改文字即可。

---

## 文件地图

```
scripts/
  gen_tts_bailian.py    # 阿里百炼 Bailian TTS（推荐）
  gen_tts_volcano.py    # 火山标准 TTS（BV 音色，v1 接口）
  gen_tts_seed.py       # 火山大模型 TTS（bigtts/saturn/uranus 音色，v3 接口）
  gen_tts_say.sh        # macOS say 离线兜底
  gen_bgm.py            # 背景音乐合成
  measure_audio.sh      # 量配音时长 → 帧数校准
  verify.sh             # 成片自检（规格/音量/抽帧）

config/
  bailian.env           # 阿里百炼 TTS 配置
  volcano.env           # 火山标准 TTS 凭证
  seed.env              # 火山大模型 TTS 凭证
  narration.example.json           # 情感叙事文案样例
  narration.corporate.example.json # 公司产品介绍文案样例

styles/
  STYLES.md             # 风格预设说明
  warm/                 # 温情家庭向风格
  guochao/              # 活力国潮风格
  tech/                 # 商务科技风格

template/               # Remotion 工程骨架（cp -R 使用）
```

---

## 常见问题

**Q: 渲染时 Node 崩溃怎么办？**
A: 用 `--concurrency=2` 而非更高并发。崩溃时输出可能只有栈尾但 exit 0，务必检查 `out/` 里 mp4 是否真生成。

**Q: 旁白开头/结尾被截断？**
A: 旁白必须放在 `<Sequence from={delayFrames}>` 内，不能用 `if(frame<delay)`。不同音色/语速时长会变，每次生成后务必重新运行 `measure_audio.sh` 校准。

**Q: 火山报 code 3001？**
A: 账号侧未授权——到火山控制台开通「语音合成」、把音色加到该应用、确认 appid/token 配对。服务刚开通时首个请求可能失败，脚本已内置重试。

**Q: 内容被模型过滤？**
A: 旁白文案避免含敏感词（涉政/涉黄/涉暴），TTS 会返回内容安全错误。
