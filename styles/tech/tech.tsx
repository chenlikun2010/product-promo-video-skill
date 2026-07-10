import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLORS, FONT} from './theme';

/** 深蓝科技背景：渐变 + 网格 + 光点 + 缓慢扫光 */
export const TechBg: React.FC<{children: React.ReactNode}> = ({children}) => {
  const frame = useCurrentFrame();
  const sweep = interpolate(frame % 180, [0, 180], [-30, 130]);
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        fontFamily: FONT,
        overflow: 'hidden',
        background: `radial-gradient(circle at 50% 20%, ${COLORS.navy3} 0%, ${COLORS.navy2} 55%, ${COLORS.navy} 100%)`,
      }}
    >
      {/* 网格 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${COLORS.line} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.line} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(circle at 50% 45%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 45%, black 30%, transparent 80%)',
        }}
      />
      {/* 扫光 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${sweep}%`,
          width: 320,
          background: `linear-gradient(90deg, transparent, rgba(34,211,238,0.10), transparent)`,
          filter: 'blur(8px)',
        }}
      />
      <TechDots />
      {children}
    </div>
  );
};

const TechDots: React.FC = () => {
  const frame = useCurrentFrame();
  const dots = React.useMemo(
    () =>
      new Array(16).fill(0).map((_, i) => ({
        x: (i * 61.7) % 100,
        y: (i * 29.3) % 100,
        r: 2 + ((i * 5) % 4),
        ph: i,
        sp: 0.3 + (i % 4) * 0.1,
      })),
    []
  );
  return (
    <>
      {dots.map((p, i) => {
        const tw = 0.3 + 0.7 * Math.abs(Math.sin(frame * 0.04 * p.sp + p.ph));
        const dy = Math.sin(frame * 0.02 + p.ph) * 14;
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
              background: COLORS.cyanBright,
              boxShadow: `0 0 ${p.r * 3}px ${COLORS.cyan}`,
              opacity: 0.5 * tw,
              transform: `translateY(${dy}px)`,
            }}
          />
        );
      })}
    </>
  );
};

/** 玻璃拟态卡片 */
export const GlassCard: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div
    style={{
      background: COLORS.glass,
      border: `1.5px solid ${COLORS.glassBorder}`,
      borderRadius: 22,
      backdropFilter: 'blur(8px)',
      boxShadow: '0 18px 60px rgba(0,0,0,0.35)',
      ...style,
    }}
  >
    {children}
  </div>
);

/** 科技角标括号 */
export const CornerBrackets: React.FC<{color?: string; size?: number; thickness?: number}> = ({
  color = COLORS.cyan,
  size = 36,
  thickness = 3,
}) => {
  const c = (pos: React.CSSProperties): React.CSSProperties => ({
    position: 'absolute',
    width: size,
    height: size,
    borderColor: color,
    ...pos,
  });
  return (
    <>
      <div style={{...c({top: -2, left: -2, borderTop: `${thickness}px solid`, borderLeft: `${thickness}px solid`})}} />
      <div style={{...c({top: -2, right: -2, borderTop: `${thickness}px solid`, borderRight: `${thickness}px solid`})}} />
      <div style={{...c({bottom: -2, left: -2, borderBottom: `${thickness}px solid`, borderLeft: `${thickness}px solid`})}} />
      <div style={{...c({bottom: -2, right: -2, borderBottom: `${thickness}px solid`, borderRight: `${thickness}px solid`})}} />
    </>
  );
};

/** HUD 小标签（如 01 / PRODUCT） */
export const HudLabel: React.FC<{children: React.ReactNode; delay?: number}> = ({children, delay = 0}) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame - delay, [0, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        color: COLORS.cyan,
        fontSize: 30,
        fontWeight: 700,
        letterSpacing: 6,
        opacity: op,
      }}
    >
      <span style={{width: 40, height: 2, background: COLORS.cyan, display: 'inline-block'}} />
      {children}
    </div>
  );
};

/** 科技分割线（中心发光节点） */
export const TechDivider: React.FC<{width?: number; delay?: number}> = ({width = 460, delay = 0}) => {
  const frame = useCurrentFrame();
  const w = interpolate(frame - delay, [0, 16], [0, width], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8}}>
      <div style={{width: w / 2, height: 2, background: `linear-gradient(90deg, transparent, ${COLORS.cyan})`}} />
      <div style={{width: 10, height: 10, background: COLORS.cyanBright, transform: 'rotate(45deg)', boxShadow: `0 0 12px ${COLORS.cyan}`}} />
      <div style={{width: w / 2, height: 2, background: `linear-gradient(90deg, ${COLORS.cyan}, transparent)`}} />
    </div>
  );
};
