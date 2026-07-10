# 风格预设（3 套，可直接套用）

每套 = 一组配色(theme.ts 的 COLORS) + 装饰组件 + 一份分镜实现(AllScenes.tsx)。
分镜结构都是同一套 9 段故事板(S1 钩子/开场 → S9 收尾)，只是视觉与文案口吻不同。

| 预设 | 目录 | 适合 | 视觉关键词 | 配套文案口吻 |
|---|---|---|---|---|
| **warm 温情家庭向** | `styles/warm/` | 打动人、亲情向、展厅 | 暖奶油底、品牌红、卡通 emoji、柔和 | 情感叙事(痛点→陪伴) |
| **guochao 活力国潮** | `styles/guochao/` | 喜庆、接地气、老年群体 | 中国红+金、朱红印章、回纹边、金粒子 | 情感叙事 |
| **tech 商务科技** | `styles/tech/` | 发布会/官网/B端、产品介绍 | 深蓝网格、青蓝高光、玻璃拟态卡、HUD标签 | 公司产品介绍(定位/技术/闭环) |

## 如何套用某个风格（在已 `cp -R template` 出的工程里）

以 tech 为例：
```bash
SK=~/.claude/skills/product-promo-video
PROJ=~/<片名>
cp "$SK/styles/tech/theme.ts"      "$PROJ/src/theme.ts"
cp "$SK/styles/tech/tech.tsx"      "$PROJ/src/tech.tsx"        # warm 无装饰模块, guochao 用 guochao.tsx
cp "$SK/styles/tech/AllScenes.tsx" "$PROJ/src/scenes/AllScenes.tsx"
```
- `AllScenes.tsx` 里的相对引用(`../theme` `../components` `../tech`/`../guochao`)在 `src/scenes/` 下都能解析，直接可用。
- 套用后**务必按本片 TTS 实测时长改 `theme.ts` 的 `SCENE_FRAMES`**(见 SKILL 第6步)——不同文案/音色时长不同。
- 文案随风格走：tech 用 `config/narration.corporate.example.json`(产品介绍口吻)；warm/guochao 用 `config/narration.example.json`(情感叙事)。换文案别忘了同步改 AllScenes 里的屏幕大字卡。

## 各预设的可复用装饰组件
- **guochao.tsx**：`Seal`(朱红印章) `CloudBar`(回纹边) `GoldParticles` `GoldDivider` `GuochaoBg`(红/宣纸两种底)
- **tech.tsx**：`TechBg`(网格+扫光+光点) `GlassCard`(玻璃拟态) `CornerBrackets`(角标) `HudLabel`(HUD英文小标签) `TechDivider`
- **warm**：直接用 `components.tsx` 的通用件(BigTitle/Subtitle/PhoneMock/KenBurns/Chip)，无专属装饰

## 想要新风格？
复制最接近的一套做基底，改 `theme.ts` 的 COLORS + 背景，替换/新增装饰组件即可。9 段结构和 `components.tsx`(BigTitle/PhoneMock/Narration/BgMusic 等)都通用，不用动。
