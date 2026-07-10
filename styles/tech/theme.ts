import {loadFont} from '@remotion/google-fonts/NotoSansSC';

const {fontFamily: notoFamily} = loadFont();

// 中文字体：优先 Noto Sans SC，回退到系统苹方
export const FONT = `${notoFamily}, "PingFang SC", "Hiragino Sans GB", sans-serif`;

// 商务科技风：深蓝渐变 + 青蓝高光 + 白字
export const COLORS = {
  navy: '#07142A', // 最深蓝
  navy2: '#0A1F3F',
  navy3: '#0E2A52', // 中蓝
  cyan: '#22D3EE', // 青蓝高光
  cyanBright: '#67E8F9',
  blue: '#3B82F6', // 科技蓝
  blueSoft: '#60A5FA',
  white: '#FFFFFF',
  sub: '#9DB4D4', // 次要文字(蓝灰)
  line: 'rgba(120,170,230,0.22)', // 细线/网格
  glass: 'rgba(255,255,255,0.06)',
  glassBorder: 'rgba(125,180,240,0.28)',
  green: '#34D399', // 确认
  ink: '#0B1B33',
};

export const FPS = 30;

// 各分镜时长（帧）—— 按 saturn 音色实测时长校准，留足收尾
export const SCENE_FRAMES = {
  s1: 190,
  s2: 195,
  s3: 180,
  s4: 195,
  s5: 210,
  s6: 300,
  s7: 340,
  s8: 160,
  s9: 190,
};

export const TRANSITION_FRAMES = 18;
