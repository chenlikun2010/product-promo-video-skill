import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {COLORS, FONT} from './theme';

/** 缓慢推拉的背景图（Ken Burns） */
export const KenBurns: React.FC<{
  src: string;
  durationInFrames: number;
  from?: number;
  to?: number;
  fit?: 'cover' | 'contain';
  origin?: string;
}> = ({src, durationInFrames, from = 1.06, to = 1.16, fit = 'cover', origin = 'center'}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationInFrames], [from, to], {
    extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: fit,
          transform: `scale(${scale})`,
          transformOrigin: origin,
        }}
      />
    </AbsoluteFill>
  );
};

/** 大字卡主标题：弹入 + 上浮 */
export const BigTitle: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
  color?: string;
  sub?: React.ReactNode;
  align?: 'center' | 'flex-start';
  shadow?: boolean;
}> = ({
  children,
  delay = 0,
  size = 110,
  color = COLORS.ink,
  sub,
  align = 'center',
  shadow = false,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 200}});
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const y = interpolate(s, [0, 1], [40, 0]);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align === 'center' ? 'center' : 'left',
        opacity,
        transform: `translateY(${y}px)`,
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          fontSize: size,
          fontWeight: 900,
          color,
          lineHeight: 1.2,
          letterSpacing: 2,
          textShadow: shadow ? '0 4px 24px rgba(0,0,0,0.35)' : 'none',
        }}
      >
        {children}
      </div>
      {sub ? (
        <div
          style={{
            marginTop: 18,
            fontSize: size * 0.34,
            fontWeight: 700,
            color: shadow ? '#FFFFFF' : COLORS.sub,
            letterSpacing: 4,
            textShadow: shadow ? '0 2px 12px rgba(0,0,0,0.4)' : 'none',
          }}
        >
          {sub}
        </div>
      ) : null}
    </div>
  );
};

/** 底部旁白字幕 */
export const Subtitle: React.FC<{children: React.ReactNode; delay?: number}> = ({
  children,
  delay = 6,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame - delay, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 70,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        opacity,
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: 40,
          fontWeight: 600,
          color: '#FFFFFF',
          background: 'rgba(58,46,39,0.55)',
          padding: '12px 34px',
          borderRadius: 16,
          letterSpacing: 1,
          maxWidth: 1500,
          textAlign: 'center',
          backdropFilter: 'blur(2px)',
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** 每段旁白音频：用 Sequence 延后 delayFrames 帧起播，并从音频开头完整播放 */
export const Narration: React.FC<{file: string; delayFrames?: number; volume?: number}> = ({
  file,
  delayFrames = 9,
  volume = 1,
}) => {
  return (
    <Sequence from={delayFrames}>
      <Audio src={staticFile(`audio/${file}`)} volume={volume} />
    </Sequence>
  );
};

/** 全片背景音乐床：低音量垫底，结尾与视频对齐淡出 */
export const BgMusic: React.FC<{base?: number}> = ({base = 0.85}) => {
  const {durationInFrames} = useVideoConfig();
  return (
    <Audio
      src={staticFile('audio/bgm.mp3')}
      volume={(f) =>
        interpolate(
          f,
          [0, 30, durationInFrames - 45, durationInFrames],
          [0, base, base, 0],
          {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
        )
      }
    />
  );
};

/** 手机外壳里展示小程序截图 */
export const PhoneMock: React.FC<{
  src: string;
  height?: number;
  delay?: number;
  crop?: {top: number; bottom: number}; // 0~1 裁掉顶部/底部比例
}> = ({src, height = 880, delay = 0, crop}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 200}});
  const y = interpolate(s, [0, 1], [60, 0]);
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const width = height * 0.46;
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 46,
        background: '#111',
        padding: 12,
        boxShadow: '0 30px 80px rgba(0,0,0,0.30)',
        transform: `translateY(${y}px)`,
        opacity,
      }}
    >
      <div style={{width: '100%', height: '100%', borderRadius: 36, overflow: 'hidden', background: '#fff'}}>
        <Img
          src={staticFile(src)}
          style={{
            width: '100%',
            height: crop ? `${100 / (1 - crop.top - crop.bottom)}%` : '100%',
            objectFit: 'cover',
            objectPosition: crop ? `center ${(crop.top / (crop.top + crop.bottom || 1)) * 100}%` : 'top',
            marginTop: crop ? `-${crop.top * 100}%` : 0,
          }}
        />
      </div>
    </div>
  );
};
