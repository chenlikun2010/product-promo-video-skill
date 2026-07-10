---
name: product-promo-video
description: 用 Remotion(代码化)把一个素材目录 + 创意想法做成产品宣传片/介绍视频/展厅循环片。当用户提供素材目录(图片/实物图/产品视频/小程序截图等)并想生成产品宣传视频、宣传片、产品介绍视频、展厅播放视频时使用。涵盖分镜设计、素材处理、火山引擎TTS配音、背景音乐合成、渲染与自检的完整流程。
---

# 产品宣传片制作 (Remotion)

把「素材目录 + 创意想法」做成一支可直接播放的 MP4 宣传片。用 Remotion（React 代码化视频），全程本地用 `node + ffmpeg + Chromium` 渲染，可复现、易微调。

适合：图片/实物图/小程序截图/短视频为主、文字+动效+配音的 motion-graphics 型宣传片（展厅循环、产品介绍、发布会片头）。
不适合：需要真人实拍/复杂运镜的镜头——这类要外部 AI 视频生成或实拍补镜，本 skill 只负责合成与动效。

## 环境前置
- `node`(>=18) `npm` `ffmpeg/ffprobe` `python3`(含 numpy、requests)。开工前 `which node ffmpeg python3` 确认。
- 渲染时需联网（首次加载 Noto Sans SC 字体）。

## 标准工作流（按序执行）

### 1. 摸清素材与意图
- 让用户给出**素材目录**和**创意想法/卖点**。先列目录：`find <dir> -type f \( -iname '*.jpg' -o -iname '*.png' -o -iname '*.mp4' -o -iname '*.mov' \)`。
- **逐张 Read 关键图片**（看清产品、功能点、界面），`ffprobe` 每个视频拿时长/编码/分辨率。
- 识别坑：① 截图里有不利数据（如"按时吃药率 4%"）要在片中用 React 覆盖成正向数据；② 同一产品多种颜色/型号要选主视觉；③ 无关素材剔除。

### 2. 设计分镜，先和用户对齐（重要）
- 用 `AskUserQuestion` 确认：**风格**、**时长**(展厅循环建议 60–90s)、**画幅**(横屏 1920×1080 / 竖屏 1080×1920)、**配音方式**。
- **风格直接给现成 3 套预设选**(见 `styles/STYLES.md`)：`warm` 温情家庭向 / `guochao` 活力国潮 / `tech` 商务科技。每套都已实现好配色+装饰+分镜，选定后第 7 步直接套用，不用从零设计视觉。需要全新风格再以最接近的一套为基底改。
- 文案口吻随风格定：情感叙事(warm/guochao) 还是公司产品介绍(tech)。
- 产出**分镜表**：每段(镜头号/时长/画面/大字卡/旁白/用哪个素材)。展厅片原则：**无声也能看懂**(大字卡为主)、3秒抓人、结尾能循环接回开头。

### 3. 从模板搭工程
```bash
PROJ="$HOME/<片名>"
cp -R ~/.claude/skills/product-promo-video/template "$PROJ"
cd "$PROJ" && npm install
mkdir -p public/assets public/audio out
```
模板已含：`theme.ts`(配色/字体/SCENE_FRAMES)、`components.tsx`(KenBurns/BigTitle/Subtitle/Narration/BgMusic/PhoneMock/Chip)、`Video.tsx`(TransitionSeries 叠化)、`Root.tsx`、`scenes/AllScenes.example.tsx`(完整示例,改写后另存为 `AllScenes.tsx` 供 Video 引用)。

### 4. 处理素材进 public/assets
- **HEVC 必转 H.264**(Chromium 解 HEVC 不稳)：
  `ffmpeg -y -i in.mp4 -c:v libx264 -pix_fmt yuv420p -crf 20 -an public/assets/weather.mp4`
- 图片拷入并**改成 ASCII 文件名**(`staticFile` 对中文路径不稳)：`intro.jpg / device.jpg / app_home.jpg ...`。
- 不利数据的截图照常拷入，靠分镜组件里画 React 卡片覆盖。

### 5. 写文案 + 火山引擎配音
- 把旁白写进 `narration.json`：`{"s1":"...","s2":"..."}`，键名对应分镜段，与 `Narration file="s1.mp3"` 一致。**逗号分句**有助于 TTS 自然停顿。
- 生成：
```bash
source ~/.claude/skills/product-promo-video/config/volcano.env
python3 ~/.claude/skills/product-promo-video/scripts/gen_tts_volcano.py \
  --script narration.json --out public/audio
```
- 报 **code 3001 `resource not granted`** = 账号侧未授权：火山控制台开通「语音合成」、把音色加到该 appid、确认 appid/token 配对。服务刚开通时**首个请求可能仍失败**，脚本已内置重试；个别没成的单独重跑即可。
- 无网络/无授权时兜底：`scripts/gen_tts_say.sh narration.json public/audio`(macOS `say`，音质一般，作占位)。
- **大模型音色(更自然，推荐)**：若用 `*_bigtts` / `saturn_*` / `*_uranus_*` 等大模型音色，走 v3 接口：`source config/seed.env` 后 `python3 scripts/gen_tts_seed.py --script narration.json --out public/audio`。换音色直接 `export SEED_SPEAKER=<音色ID>` 覆盖即可。它是 API Key 鉴权(`X-Api-Key`)、流式返回，和 v1(BV音色)是两套服务/计费。
  - **Resource-Id 用 `seed-tts-2.0`**(seed.env 默认值)。实测 `saturn_*` 和 `*_uranus_*` 音色都走它；用错(如 `seed-tts-1.0`/`volc.megatts.default`)会报 `code 55000000 resource ID is mismatched with speaker`。
  - 网络/代理抖动会偶发 `RemoteDisconnected`，脚本已内置异常捕获+重试(`--retry 5`)。

### 6. 按真实音频时长校准镜头长度（关键，否则截断）
```bash
~/.claude/skills/product-promo-video/scripts/measure_audio.sh public/audio
```
在 `theme.ts` 的 `SCENE_FRAMES` 里，确保每段：
> 镜头帧数 ≥ Narration 的 delayFrames + ceil(音频秒数 × fps) + 收尾留白(建议 ≥15 帧)
改完时长记得同步检查 `Video.tsx` 总帧数(自动求和，一般不用动)。

### 7. 套用风格 / 写分镜组件
- **首选：套用现成风格预设**(`styles/STYLES.md`)。把选定风格的 `theme.ts`、装饰模块、`AllScenes.tsx` 拷进 `src/` 对应位置，再按本片文案改屏幕大字卡文字即可。三套：`warm`/`guochao`/`tech`。
- 若手写/微调分镜：用 `components.tsx` 的 `BigTitle`(大字卡)、`KenBurns`、`Subtitle`、`PhoneMock`(支持 `crop`)、`Chip`、`FeatureCard`；国潮/科技再叠各自装饰件(印章/玻璃卡/角标/HUD)。
- 每段放一个 `<Narration file="sX.mp3" delayFrames={..} />`。
- 覆盖不利数据：在对应 PhoneMock 上叠一个 React 卡片(见示例 `MedsBadge`)。

### 8. 背景音乐
```bash
python3 ~/.claude/skills/product-promo-video/scripts/gen_bgm.py \
  --duration <视频秒数+2> --out public/audio/bgm.mp3   # 可选 --semitones 移调 --gain 调音量
```
`Video.tsx` 已有 `<BgMusic base={0.85} />`，会自动按视频长度淡出、压在旁白下。觉得吵就调小 `base`。

### 9. 渲染 + 自检
```bash
npx remotion render Promo "out/<片名>.mp4" --concurrency=2
~/.claude/skills/product-promo-video/scripts/verify.sh "out/<片名>.mp4"
```
- **用 `--concurrency=2`**：高并发(4)在本机偶发 Node 崩溃(输出只剩 `Node.js v22.x` 栈尾、无成片)。崩了就降并发前台重跑，通常即过。
- 后台跑渲染时，崩溃也可能报 exit 0，**务必检查 `out/` 里 mp4 是否真生成**，别只看退出码。
然后用 **Read 看 /tmp/vchk 抽帧**(确认中文/emoji/排版)、看 `verify.sh` 的音量(mean 约 -18~-23dB 为正常，不可静音)。必要时 `silencedetect` 检查某句旁白是否完整发音。

### 10. 交付与变体
报成片路径/规格/时长。常见追加：嵌入实拍短视频、出竖屏版(改 `Root.tsx` 宽高 + 重排布局)、改文案/配色/音乐后重渲染。也可 `npm run dev` 开 Remotion Studio 实时预览。

## 硬核坑（务必遵守）
- **旁白必须放进 `<Sequence from={delayFrames}>`**。不能用 `if(frame<delay) return null` 来"延迟"——那不是延后起播，而是**跳过音频开头 delay 秒**，会把每句开头的字吃掉(典型症状："爸妈的药"只念出"的药")。模板的 `Narration` 已是正确写法。
- **HEVC 视频先转 H.264** 再 `<OffthreadVideo>`，否则 Chromium 渲染黑屏/报错。
- **素材用 ASCII 文件名**放 `public/assets`，`staticFile('assets/xx.jpg')` 引用。
- **中文字体**用 `@remotion/google-fonts/NotoSansSC`(模板 theme.ts 已配，回退苹方)；**彩色 emoji** 在 Chromium 渲染正常，可放心用作图标。
- **配音生成后一定重新量时长并校准 SCENE_FRAMES**，不同音色/语速时长会变，否则尾音被切。
- **火山 3001** 多为账号授权问题，不是代码问题，按第 5 步排查。
- 火山凭证在 `config/volcano.env`(含密钥，勿外传)；Secret Key 此 HTTP 接口用不到。
- **所有 remotion 包必须锁同一精确版本**(remotion / @remotion/cli / @remotion/transitions / @remotion/google-fonts 全部 `4.0.xxx` 不带 `^`)。带 caret 会让某个子包装成更新版，出现 `export 'HtmlInCanvas' was not found in 'remotion'` 这类打包报错。模板已锁定；新装包后用 `node -e "..."` 核对版本一致。

## 文件地图
- `scripts/gen_tts_volcano.py` 火山标准TTS(BV音色, v1接口, env 读凭证, JSON 读文案)
- `scripts/gen_tts_seed.py` 火山大模型TTS(bigtts/saturn/uranus 音色, v3接口, API Key 鉴权, 推荐)
- `scripts/gen_tts_say.sh` macOS 离线兜底配音
- `scripts/gen_bgm.py` 合成温情背景乐
- `scripts/measure_audio.sh` 量旁白时长→帧，校准 SCENE_FRAMES
- `scripts/verify.sh` 成片自检(规格/音量/抽帧)
- `config/volcano.env` 火山标准TTS凭证  ·  `config/seed.env` 大模型TTS凭证
- `config/narration.example.json` 情感叙事文案样例  ·  `config/narration.corporate.example.json` 公司产品介绍文案样例
- `styles/STYLES.md` + `styles/{warm,guochao,tech}/` 三套风格预设(配色+装饰+分镜)，选定后拷进工程 src/
- `template/` 可直接 `cp -R` 的 Remotion 工程骨架
