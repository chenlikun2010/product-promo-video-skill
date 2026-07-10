import {loadFont} from '@remotion/google-fonts/NotoSansSC';

const {fontFamily: notoFamily} = loadFont();

// 中文字体：优先 Noto Sans SC，回退到系统苹方
export const FONT = `${notoFamily}, "PingFang SC", "Hiragino Sans GB", sans-serif`;

// 暖色温情主色板（贴合产品介绍图的插画风）
export const COLORS = {
  cream: '#FFF6EC', // 背景奶油色
  warmBg: '#FBEAD7', // 暖背景
  brandRed: '#E1352B', // 设备/品牌红
  deepRed: '#B5261E',
  ink: '#3A2E27', // 主文字（暖棕黑）
  sub: '#7A6A5E', // 次要文字
  gold: '#E8973A', // 强调橙
  green: '#3FB36F', // 确认/成功
  white: '#FFFFFF',
};

export const FPS = 30;

// 各分镜时长（帧）—— 按 TTS 实测时长 + 呼吸留白设计
export const SCENE_FRAMES = {
  s1: 150, // 5.0s 痛点钩子
  s2: 165, // 5.5s 牵挂
  s3: 210, // 7.0s 产品登场
  s4: 180, // 6.0s 一键连接
  s5: 240, // 8.0s 复刻声音
  s6: 330, // 11.0s 吃药提醒+确认
  s7: 360, // 12.0s 六大功能
  s8: 150, // 5.0s 升华
  s9: 150, // 5.0s LOGO收尾
};

export const TRANSITION_FRAMES = 18; // 叠化时长
