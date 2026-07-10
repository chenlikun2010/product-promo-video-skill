import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  staticFile,
} from 'remotion';
import {COLORS, FONT} from '../theme';
import {BigTitle, KenBurns, Narration, PhoneMock, Subtitle} from '../components';

const Cream: React.FC<{children: React.ReactNode; bg?: string}> = ({children, bg}) => (
  <AbsoluteFill
    style={{
      background:
        bg ??
        `radial-gradient(circle at 50% 38%, ${COLORS.cream} 0%, ${COLORS.warmBg} 70%, #F2D9BE 100%)`,
      fontFamily: FONT,
    }}
  >
    {children}
  </AbsoluteFill>
);

/* ---------- S1 痛点钩子 ---------- */
export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const q = spring({frame: frame - 40, fps: 30, config: {damping: 12, mass: 0.6}});
  return (
    <Cream>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{fontSize: 120, marginBottom: 30}}>💊</div>
        <BigTitle size={104} delay={8}>
          爸妈的药，今天
          <span style={{color: COLORS.brandRed}}>吃了吗？</span>
          <span style={{display: 'inline-block', transform: `scale(${0.6 + q * 0.4})`, color: COLORS.brandRed}}> </span>
        </BigTitle>
        <div
          style={{
            marginTop: 26,
            fontSize: 38,
            color: COLORS.sub,
            opacity: interpolate(frame, [55, 80], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          }}
        >
          你有多久，没在他们身边了
        </div>
      </AbsoluteFill>
      <Narration file="s1.mp3" delayFrames={16} />
    </Cream>
  );
};

/* ---------- S2 牵挂 ---------- */
export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const a = interpolate(frame, [6, 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const b = interpolate(frame, [40, 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <Cream>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', gap: 30}}>
        <div style={{fontSize: 64, opacity: a, transform: `translateY(${(1 - a) * 30}px)`, color: COLORS.ink, fontWeight: 800}}>
          你忙于工作，<span style={{color: COLORS.gold}}>他们怕打扰</span>
        </div>
        <div style={{fontSize: 76, opacity: b, transform: `translateY(${(1 - b) * 30}px)`, color: COLORS.ink, fontWeight: 900}}>
          总说：“不用惦记”
        </div>
      </AbsoluteFill>
      <Subtitle delay={10}>而他们，总把牵挂藏在心里</Subtitle>
      <Narration file="s2.mp3" delayFrames={10} />
    </Cream>
  );
};

/* ---------- S3 产品登场 ---------- */
export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - 6, fps, config: {damping: 200}});
  return (
    <AbsoluteFill style={{background: `linear-gradient(135deg, #2A1B16 0%, #5A2A22 100%)`, fontFamily: FONT}}>
      <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', padding: 120, gap: 80}}>
        <div
          style={{
            flex: 1.1,
            borderRadius: 36,
            overflow: 'hidden',
            boxShadow: '0 30px 90px rgba(0,0,0,0.5)',
            transform: `scale(${interpolate(s, [0, 1], [0.85, 1])})`,
            opacity: s,
          }}
        >
          <Img src={staticFile('assets/device_red.jpg')} style={{width: '100%', display: 'block'}} />
        </div>
        <div style={{flex: 1}}>
          <div
            style={{
              fontSize: 40,
              color: COLORS.gold,
              fontWeight: 700,
              letterSpacing: 6,
              opacity: interpolate(frame, [20, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
            }}
          >
            北京慧极科技 出品
          </div>
          <div
            style={{
              fontSize: 132,
              fontWeight: 900,
              color: '#fff',
              marginTop: 10,
              opacity: interpolate(frame, [28, 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
              transform: `translateX(${interpolate(frame, [28, 50], [40, 0], {extrapolateRight: 'clamp'})}px)`,
            }}
          >
            小慧呜啦啦
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: COLORS.brandRed,
              background: '#fff',
              display: 'inline-block',
              padding: '6px 26px',
              borderRadius: 14,
              marginTop: 24,
              opacity: interpolate(frame, [44, 66], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
            }}
          >
            AI 长辈管家
          </div>
        </div>
      </AbsoluteFill>
      <Subtitle delay={20}>替你守在他们身边的贴心小帮手</Subtitle>
      <Narration file="s3.mp3" delayFrames={14} />
    </AbsoluteFill>
  );
};

/* ---------- S4 一键连接 ---------- */
const Chip: React.FC<{children: React.ReactNode; delay: number; color: string}> = ({children, delay, color}) => {
  const frame = useCurrentFrame();
  const s = spring({frame: frame - delay, fps: 30, config: {damping: 14}});
  return (
    <div
      style={{
        fontSize: 44,
        fontWeight: 800,
        color: '#fff',
        background: color,
        padding: '14px 40px',
        borderRadius: 999,
        transform: `scale(${s})`,
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      }}
    >
      {children}
    </div>
  );
};
export const Scene4: React.FC = () => {
  return (
    <Cream>
      <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', padding: '0 130px', gap: 90}}>
        <div style={{flex: 1}}>
          <BigTitle size={92} align="flex-start" delay={4}>
            一键连接<br />简单上手
          </BigTitle>
          <div style={{display: 'flex', gap: 26, marginTop: 50}}>
            <Chip delay={28} color="#2F7BE4">
              📶 蓝牙配对
            </Chip>
            <Chip delay={40} color={COLORS.green}>
              🌐 WiFi 连接
            </Chip>
          </div>
        </div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
          <PhoneMock src="assets/app_home.jpg" delay={8} height={900} />
        </div>
      </AbsoluteFill>
      <Subtitle delay={12}>打开小程序，轻轻一连就绪</Subtitle>
      <Narration file="s4.mp3" delayFrames={12} />
    </Cream>
  );
};

/* ---------- S5 复刻声音 ---------- */
const Wave: React.FC<{delay: number}> = ({delay}) => {
  const frame = useCurrentFrame();
  const bars = 7;
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 10, height: 90}}>
      {new Array(bars).fill(0).map((_, i) => {
        const h = 20 + 60 * Math.abs(Math.sin((frame - delay) * 0.18 + i));
        return <div key={i} style={{width: 14, height: h, borderRadius: 8, background: COLORS.brandRed}} />;
      })}
    </div>
  );
};
export const Scene5: React.FC = () => {
  return (
    <Cream bg={`radial-gradient(circle at 30% 40%, #FFF1F0 0%, ${COLORS.warmBg} 75%)`}>
      <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', padding: '0 130px', gap: 90}}>
        <div style={{flex: 1}}>
          <BigTitle size={88} align="flex-start" delay={4}>
            用<span style={{color: COLORS.brandRed}}>你的声音</span><br />陪伴他们
          </BigTitle>
          <div style={{marginTop: 36, fontSize: 46, fontWeight: 800, color: COLORS.gold, letterSpacing: 3}}>
            AI 声音复刻
          </div>
          <div style={{marginTop: 40}}>
            <Wave delay={20} />
          </div>
          <div style={{marginTop: 24, fontSize: 36, color: COLORS.sub}}>
            录一段话 → 音箱用「你的声音」开口
          </div>
        </div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
          <PhoneMock src="assets/app_home.jpg" delay={10} height={900} />
        </div>
      </AbsoluteFill>
      <Narration file="s5.mp3" delayFrames={12} />
    </Cream>
  );
};

/* ---------- S6 吃药提醒 + 确认（核心） ---------- */
const StepCard: React.FC<{
  delay: number;
  badge: string;
  badgeColor: string;
  title: string;
  bubble: string;
  bubbleColor: string;
}> = ({delay, badge, badgeColor, title, bubble, bubbleColor}) => {
  const frame = useCurrentFrame();
  const s = spring({frame: frame - delay, fps: 30, config: {damping: 16}});
  return (
    <div
      style={{
        flex: 1,
        background: '#fff',
        borderRadius: 28,
        padding: '40px 30px',
        boxShadow: '0 18px 50px rgba(0,0,0,0.10)',
        transform: `translateY(${interpolate(s, [0, 1], [50, 0])}px) scale(${interpolate(s, [0, 1], [0.9, 1])})`,
        opacity: s,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 22,
      }}
    >
      <div
        style={{
          width: 74,
          height: 74,
          borderRadius: 999,
          background: badgeColor,
          color: '#fff',
          fontSize: 44,
          fontWeight: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {badge}
      </div>
      <div style={{fontSize: 40, fontWeight: 800, color: COLORS.ink}}>{title}</div>
      <div
        style={{
          fontSize: 38,
          fontWeight: 700,
          color: '#fff',
          background: bubbleColor,
          padding: '14px 28px',
          borderRadius: 18,
        }}
      >
        {bubble}
      </div>
    </div>
  );
};
export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Cream bg={`linear-gradient(135deg, #FFF6EC 0%, #FCE7D2 100%)`}>
      <AbsoluteFill style={{padding: '70px 110px', flexDirection: 'column'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: 74, fontWeight: 900, color: COLORS.ink}}>智能用药提醒</div>
          <div style={{fontSize: 40, fontWeight: 700, color: COLORS.gold, marginTop: 6}}>
            到点提醒 · 开口确认 · 子女实时知晓
          </div>
        </div>
        <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 40}}>
          <StepCard delay={20} badge="1" badgeColor={COLORS.brandRed} title="音箱到点提醒" bubble="“妈，该吃降压药啦”" bubbleColor={COLORS.brandRed} />
          <div style={{fontSize: 70, color: COLORS.gold, opacity: interpolate(frame, [50, 65], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>→</div>
          <StepCard delay={55} badge="2" badgeColor={COLORS.green} title="老人开口确认" bubble="“我吃啦”" bubbleColor={COLORS.green} />
          <div style={{fontSize: 70, color: COLORS.gold, opacity: interpolate(frame, [85, 100], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}}>→</div>
          <div style={{flex: 1, display: 'flex', justifyContent: 'center', position: 'relative'}}>
            <PhoneMock src="assets/app_meds.jpg" delay={90} height={640} crop={{top: 0.32, bottom: 0.12}} />
            <MedsBadge delay={120} />
          </div>
        </div>
      </AbsoluteFill>
      <Subtitle delay={14}>再也不用反复打电话追问</Subtitle>
      <Narration file="s6.mp3" delayFrames={12} />
    </Cream>
  );
};
// 覆盖在吃药截图上的干净 mock 数据（避免出现 4%）
const MedsBadge: React.FC<{delay: number}> = ({delay}) => {
  const frame = useCurrentFrame();
  const s = spring({frame: frame - delay, fps: 30, config: {damping: 14}});
  return (
    <div
      style={{
        position: 'absolute',
        top: -10,
        right: 0,
        background: '#fff',
        borderRadius: 22,
        padding: '18px 26px',
        boxShadow: '0 16px 40px rgba(0,0,0,0.18)',
        transform: `scale(${s})`,
        textAlign: 'center',
      }}
    >
      <div style={{fontSize: 30, color: COLORS.sub, fontWeight: 700}}>本月按时服药率</div>
      <div style={{fontSize: 72, fontWeight: 900, color: COLORS.green}}>98%</div>
      <div style={{fontSize: 28, color: COLORS.green, fontWeight: 700}}>✓ 已按时吃药</div>
    </div>
  );
};

/* ---------- S7 六大功能 ---------- */
const FEATURES: {icon: string; title: string; desc: string; color: string}[] = [
  {icon: '💝', title: '亲情陪伴', desc: '陪你解闷唠家常', color: '#E1352B'},
  {icon: '💊', title: '提醒吃药', desc: '按时提醒主动关怀', color: '#E8973A'},
  {icon: '📦', title: '帮忙找东西', desc: '物品再也不担心丢', color: '#3FB36F'},
  {icon: '🛡️', title: '防诈预警', desc: '识别诈骗及时提醒', color: '#2F7BE4'},
  {icon: '😊', title: '心结开解', desc: '有人倾听帮你宽心', color: '#C45CC0'},
  {icon: '🧠', title: '脑活力训练', desc: '专属训练保持活力', color: '#7A6AE0'},
];
const FeatureCard: React.FC<{i: number; data: (typeof FEATURES)[number]}> = ({i, data}) => {
  const frame = useCurrentFrame();
  const s = spring({frame: frame - (20 + i * 12), fps: 30, config: {damping: 15}});
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 30,
        padding: '34px 30px',
        boxShadow: '0 16px 44px rgba(0,0,0,0.08)',
        transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px) scale(${interpolate(s, [0, 1], [0.85, 1])})`,
        opacity: s,
        display: 'flex',
        alignItems: 'center',
        gap: 26,
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 24,
          background: data.color + '22',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 56,
          flexShrink: 0,
        }}
      >
        {data.icon}
      </div>
      <div>
        <div style={{fontSize: 46, fontWeight: 900, color: COLORS.ink}}>{data.title}</div>
        <div style={{fontSize: 30, color: COLORS.sub, marginTop: 6}}>{data.desc}</div>
      </div>
    </div>
  );
};
export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Cream>
      <AbsoluteFill style={{padding: '70px 120px', flexDirection: 'column'}}>
        <div style={{textAlign: 'center', marginBottom: 40}}>
          <div style={{fontSize: 44, color: COLORS.gold, fontWeight: 800, letterSpacing: 4}}>最值得先用的 6 个功能</div>
          <div style={{fontSize: 78, fontWeight: 900, color: COLORS.ink}}>它，懂他们的每一天</div>
        </div>
        <div style={{flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr 1fr', gap: 30}}>
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} i={i} data={f} />
          ))}
        </div>
      </AbsoluteFill>
      <Narration file="s7.mp3" delayFrames={10} />
    </Cream>
  );
};

/* ---------- S8 升华 ---------- */
export const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Cream bg={`radial-gradient(circle at 50% 45%, #FFF7EF 0%, #F6E0C6 100%)`}>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <BigTitle size={104} delay={6}>
          让爱，<span style={{color: COLORS.brandRed}}>每天准时</span>陪在身边
        </BigTitle>
        <div
          style={{
            marginTop: 36,
            fontSize: 46,
            color: COLORS.sub,
            fontWeight: 700,
            opacity: interpolate(frame, [40, 65], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          }}
        >
          距离再远，爱，从不缺席
        </div>
      </AbsoluteFill>
      <Narration file="s8.mp3" delayFrames={14} />
    </Cream>
  );
};

/* ---------- S9 LOGO 收尾 ---------- */
export const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const s = spring({frame: frame - 6, fps, config: {damping: 200}});
  const fadeOut = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
  return (
    <AbsoluteFill style={{background: `linear-gradient(135deg, #2A1B16 0%, #5A2A22 100%)`, fontFamily: FONT, opacity: fadeOut}}>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', gap: 24}}>
        <div
          style={{
            transform: `scale(${interpolate(s, [0, 1], [0.8, 1])})`,
            opacity: s,
            width: 360,
            borderRadius: 28,
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <Img src={staticFile('assets/device_red.jpg')} style={{width: '100%', display: 'block'}} />
        </div>
        <div style={{fontSize: 96, fontWeight: 900, color: '#fff', marginTop: 20}}>小慧呜啦啦</div>
        <div style={{fontSize: 44, fontWeight: 700, color: COLORS.gold, letterSpacing: 4}}>AI 长辈管家</div>
        <div
          style={{
            fontSize: 40,
            color: '#fff',
            marginTop: 18,
            letterSpacing: 2,
            opacity: interpolate(frame, [40, 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          }}
        >
          北京慧极科技有限公司
        </div>
      </AbsoluteFill>
      <Narration file="s9.mp3" delayFrames={12} />
    </AbsoluteFill>
  );
};
