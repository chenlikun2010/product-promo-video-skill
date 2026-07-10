import {loadFont} from '@remotion/google-fonts/NotoSansSC';

const {fontFamily: notoFamily} = loadFont();

// 中文字体：优先 Noto Sans SC，回退到系统苹方
export const FONT = `${notoFamily}, "PingFang SC", "Hiragino Sans GB", sans-serif`;

// 活力国潮暖调：中国红 + 金 + 宣纸米
export const COLORS = {
  paper: '#FBF0DC', // 宣纸米色背景
  paperDeep: '#F6E3C2',
  red: '#C8161D', // 中国红
  vermilion: '#E63329', // 朱红
  redDeep: '#8B1410', // 深朱红(深色场景背景)
  redDeeper: '#5E0D0A',
  gold: '#E8A93A', // 金
  goldBright: '#FFD66B', // 亮金
  ink: '#2B1410', // 深棕黑(主文字)
  inkSoft: '#6E4A3A',
  green: '#2E9E5B', // 确认绿(点缀)
  white: '#FFFFFF',
  cream: '#FFF7E8',
};

export const FPS = 30;

// 各分镜时长（帧）—— 与现有配音时长匹配，留足收尾
export const SCENE_FRAMES = {
  s1: 150,
  s2: 165,
  s3: 210,
  s4: 180,
  s5: 240,
  s6: 330,
  s7: 360,
  s8: 150,
  s9: 150,
};

export const TRANSITION_FRAMES = 18;
