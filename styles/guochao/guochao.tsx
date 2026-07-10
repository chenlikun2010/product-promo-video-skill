import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS, FONT} from './theme';

/** 朱红印章：白字 + 金边，盖章弹入 */
export const Seal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
  rotate?: number;
}> = ({children, delay = 0, size = 120, rotate = -6}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - delay, fps, config: {damping: 9, mass: 0.5}});
  const sc = interpolate(s, [0, 1], [1.6, 1]);
  const op = interpolate(s, [0, 0.6], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 18,
        background: COLORS.red,
        border: `4px solid ${COLORS.goldBright}`,
        boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: size * 0.3,
        lineHeight: 1.05,
        letterSpacing: 2,
        transform: `scale(${sc}) rotate(${rotate}deg)`,
        opacity: op,
      }}
    >
      {children}
    </div>
  );
};

/** 顶/底 回纹装饰条（金色），营造国潮边框 */
export const CloudBar: React.FC<{position: 'top' | 'bottom'}> = ({position}) => {
  const motif = `repeating-linear-gradient(90deg, ${COLORS.gold} 0 8px, transparent 8px 16px, ${COLORS.gold} 16px 20px, transparent 20px 40px)`;
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        [position]: 0,
        height: 46,
        background: `linear-gradient(${position === 'top' ? '180deg' : '0deg'}, rgba(200,22,29,0.18), transparent)`,
        display: 'flex',
        alignItems: position === 'top' ? 'flex-start' : 'flex-end',
      }}
    >
      <div style={{width: '100%', height: 12, background: motif, opacity: 0.7}} />
    </div>
  );
};

/** 漂浮金色粒子点缀 */
export const GoldParticles: React.FC<{count?: number; opacity?: number}> = ({count = 14, opacity = 0.5}) => {
  const frame = useCurrentFrame();
  const seeds = React.useMemo(
    () =>
      new Array(count).fill(0).map((_, i) => ({
        x: (i * 137.5) % 100,
        y: (i * 53.7) % 100,
        r: 3 + ((i * 7) % 6),
        sp: 0.4 + ((i % 5) * 0.12),
        ph: i,
      })),
    [count]
  );
  return (
    <>
      {seeds.map((p, i) => {
        const dy = Math.sin(frame * 0.03 * p.sp + p.ph) * 16;
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(frame * 0.05 + p.ph));
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.r,
              height: p.r,
              borderRadius: '50%',
              background: COLORS.goldBright,
              boxShadow: `0 0 ${p.r * 2}px ${COLORS.gold}`,
              transform: `translateY(${dy}px)`,
              opacity: opacity * tw,
            }}
          />
        );
      })}
    </>
  );
};

/** 金色分割线 + 中心菱形 */
export const GoldDivider: React.FC<{width?: number; delay?: number}> = ({width = 420, delay = 0}) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame - delay, [0, 16], [0, width], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10}}>
      <div style={{width: w / 2, height: 3, background: `linear-gradient(90deg, transparent, ${COLORS.gold})`}} />
      <div style={{width: 14, height: 14, background: COLORS.goldBright, transform: 'rotate(45deg)', boxShadow: `0 0 10px ${COLORS.gold}`}} />
      <div style={{width: w / 2, height: 3, background: `linear-gradient(90deg, ${COLORS.gold}, transparent)`}} />
    </div>
  );
};

/** 国潮背景：宣纸米 or 朱红，含回纹边 + 粒子 */
export const GuochaoBg: React.FC<{children: React.ReactNode; variant?: 'paper' | 'red'}> = ({
  children,
  variant = 'paper',
}) => {
  const bg =
    variant === 'red'
      ? `radial-gradient(circle at 50% 38%, ${COLORS.red} 0%, ${COLORS.redDeep} 70%, ${COLORS.redDeeper} 100%)`
      : `radial-gradient(circle at 50% 35%, ${COLORS.cream} 0%, ${COLORS.paper} 60%, ${COLORS.paperDeep} 100%)`;
  return (
    <div style={{position: 'absolute', inset: 0, background: bg, fontFamily: FONT, overflow: 'hidden'}}>
      <GoldParticles opacity={variant === 'red' ? 0.6 : 0.4} />
      <CloudBar position="top" />
      <CloudBar position="bottom" />
      {children}
    </div>
  );
};
