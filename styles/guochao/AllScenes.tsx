import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {COLORS, FONT} from '../theme';
import {BigTitle, KenBurns, Narration, PhoneMock, Subtitle} from '../components';
import {GoldDivider, GoldParticles, GuochaoBg, Seal} from '../guochao';

/* ---------- S1 痛点钩子 ---------- */
export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <GuochaoBg variant="paper">
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{position: 'absolute', top: 120, right: 200}}>
          <Seal delay={6} size={130} rotate={-8}>
            孝心<br />守护
          </Seal>
        </div>
        <div style={{fontSize: 110, marginBottom: 24}}>💊</div>
        <BigTitle size={108} delay={10} color={COLORS.ink}>
          爸妈的药，今天
          <span style={{color: COLORS.red}}>吃了吗？</span>
        </BigTitle>
        <div style={{marginTop: 30}}>
          <GoldDivider delay={40} width={460} />
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 38,
            color: COLORS.inkSoft,
            fontWeight: 600,
            opacity: interpolate(frame, [55, 80], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          }}
        >
          你有多久，没在他们身边了
        </div>
      </AbsoluteFill>
      <Narration file="s1.mp3" delayFrames={16} />
    </GuochaoBg>
  );
};

/* ---------- S2 牵挂 ---------- */
export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const a = interpolate(frame, [6, 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const b = interpolate(frame, [40, 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <GuochaoBg variant="paper">
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', gap: 34}}>
        <div style={{fontSize: 66, opacity: a, transform: `translateY(${(1 - a) * 30}px)`, color: COLORS.ink, fontWeight: 800}}>
          你忙于工作，<span style={{color: COLORS.gold}}>他们怕打扰</span>
        </div>
        <div
          style={{
            fontSize: 86,
            opacity: b,
            transform: `translateY(${(1 - b) * 30}px)`,
            color: COLORS.red,
            fontWeight: 900,
            textShadow: `0 2px 0 ${COLORS.goldBright}`,
          }}
        >
          总说：“不用惦记”
        </div>
      </AbsoluteFill>
      <Subtitle delay={10}>而他们，总把牵挂藏在心里</Subtitle>
      <Narration file="s2.mp3" delayFrames={10} />
    </GuochaoBg>
  );
};

/* ---------- S3 产品登场（红底·国潮主场） ---------- */
export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - 6, fps, config: {damping: 200}});
  return (
    <GuochaoBg variant="red">
      <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', padding: 120, gap: 80}}>
        <div
          style={{
            flex: 1.1,
            borderRadius: 28,
            overflow: 'hidden',
            border: `8px solid ${COLORS.goldBright}`,
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
              fontSize: 38,
              color: COLORS.goldBright,
              fontWeight: 800,
              letterSpacing: 8,
              opacity: interpolate(frame, [20, 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
            }}
          >
            北京慧极科技 · 匠心出品
          </div>
          <div
            style={{
              fontSize: 142,
              fontWeight: 900,
              color: '#fff',
              marginTop: 8,
              textShadow: `0 4px 0 ${COLORS.redDeeper}, 0 0 30px rgba(255,214,107,0.5)`,
              opacity: interpolate(frame, [28, 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
              transform: `translateX(${interpolate(frame, [28, 50], [40, 0], {extrapolateRight: 'clamp'})}px)`,
            }}
          >
            小慧呜啦啦
          </div>
          <div style={{marginTop: 28}}>
            <Seal delay={48} size={150} rotate={-6}>
              AI<br />长辈管家
            </Seal>
          </div>
        </div>
      </AbsoluteFill>
      <Subtitle delay={20}>替你守在他们身边的贴心小帮手</Subtitle>
      <Narration file="s3.mp3" delayFrames={14} />
    </GuochaoBg>
  );
};

/* ---------- 国潮标签胶囊 ---------- */
const Chip: React.FC<{children: React.ReactNode; delay: number; color: string}> = ({children, delay, color}) => {
  const frame = useCurrentFrame();
  const s = spring({frame: frame - delay, fps: 30, config: {damping: 12}});
  return (
    <div
      style={{
        fontSize: 44,
        fontWeight: 800,
        color: '#fff',
        background: color,
        padding: '14px 40px',
        borderRadius: 999,
        border: `3px solid ${COLORS.goldBright}`,
        transform: `scale(${s})`,
        boxShadow: '0 10px 30px rgba(0,0,0,0.18)',
      }}
    >
      {children}
    </div>
  );
};

/* ---------- S4 一键连接 ---------- */
export const Scene4: React.FC = () => {
  return (
    <GuochaoBg variant="paper">
      <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', padding: '0 130px', gap: 90}}>
        <div style={{flex: 1}}>
          <Seal delay={4} size={104} rotate={-7}>
            一键<br />连接
          </Seal>
          <div style={{marginTop: 30}}>
            <BigTitle size={88} align="flex-start" delay={10} color={COLORS.ink}>
              连接简单<br />老人<span style={{color: COLORS.red}}>好上手</span>
            </BigTitle>
          </div>
          <div style={{display: 'flex', gap: 26, marginTop: 44}}>
            <Chip delay={30} color={COLORS.red}>
              📶 蓝牙配对
            </Chip>
            <Chip delay={42} color={COLORS.green}>
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
    </GuochaoBg>
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
        return <div key={i} style={{width: 14, height: h, borderRadius: 8, background: COLORS.red}} />;
      })}
    </div>
  );
};
export const Scene5: React.FC = () => {
  return (
    <GuochaoBg variant="paper">
      <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', padding: '0 130px', gap: 90}}>
        <div style={{flex: 1}}>
          <Seal delay={4} size={104} rotate={-7}>
            声音<br />复刻
          </Seal>
          <div style={{marginTop: 30}}>
            <BigTitle size={84} align="flex-start" delay={10} color={COLORS.ink}>
              用<span style={{color: COLORS.red}}>你的声音</span><br />陪伴他们
            </BigTitle>
          </div>
          <div style={{marginTop: 36}}>
            <Wave delay={20} />
          </div>
          <div style={{marginTop: 22, fontSize: 36, color: COLORS.inkSoft, fontWeight: 600}}>
            录一段话 → 音箱用「你的声音」开口
          </div>
        </div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
          <PhoneMock src="assets/app_home.jpg" delay={10} height={900} />
        </div>
      </AbsoluteFill>
      <Narration file="s5.mp3" delayFrames={12} />
    </GuochaoBg>
  );
};

/* ---------- S6 吃药提醒 + 确认（核心） ---------- */
const StepCard: React.FC<{
  delay: number;
  badge: string;
  title: string;
  bubble: string;
  bubbleColor: string;
}> = ({delay, badge, title, bubble, bubbleColor}) => {
  const frame = useCurrentFrame();
  const s = spring({frame: frame - delay, fps: 30, config: {damping: 14}});
  return (
    <div
      style={{
        flex: 1,
        background: COLORS.cream,
        borderRadius: 24,
        border: `4px solid ${COLORS.gold}`,
        padding: '40px 28px',
        boxShadow: '0 18px 50px rgba(139,20,16,0.14)',
        transform: `translateY(${interpolate(s, [0, 1], [50, 0])}px) scale(${interpolate(s, [0, 1], [0.9, 1])})`,
        opacity: s,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 22,
      }}
    >
      <Seal delay={delay + 4} size={78} rotate={0}>
        {badge}
      </Seal>
      <div style={{fontSize: 40, fontWeight: 900, color: COLORS.ink}}>{title}</div>
      <div
        style={{
          fontSize: 36,
          fontWeight: 800,
          color: '#fff',
          background: bubbleColor,
          padding: '14px 26px',
          borderRadius: 16,
        }}
      >
        {bubble}
      </div>
    </div>
  );
};
const MedsBadge: React.FC<{delay: number}> = ({delay}) => {
  const frame = useCurrentFrame();
  const s = spring({frame: frame - delay, fps: 30, config: {damping: 12}});
  return (
    <div
      style={{
        position: 'absolute',
        top: -10,
        right: -10,
        background: '#fff',
        borderRadius: 20,
        border: `3px solid ${COLORS.gold}`,
        padding: '16px 24px',
        boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
        transform: `scale(${s})`,
        textAlign: 'center',
      }}
    >
      <div style={{fontSize: 28, color: COLORS.inkSoft, fontWeight: 700}}>本月按时服药率</div>
      <div style={{fontSize: 70, fontWeight: 900, color: COLORS.green}}>98%</div>
      <div style={{fontSize: 26, color: COLORS.green, fontWeight: 800}}>✓ 已按时吃药</div>
    </div>
  );
};
export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const arrow = (a: number, b: number) =>
    interpolate(frame, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <GuochaoBg variant="paper">
      <AbsoluteFill style={{padding: '78px 100px', flexDirection: 'column'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: 76, fontWeight: 900, color: COLORS.red, textShadow: `0 2px 0 ${COLORS.goldBright}`}}>
            智能用药提醒
          </div>
          <div style={{fontSize: 38, fontWeight: 800, color: COLORS.ink, marginTop: 8}}>
            到点提醒 · 开口确认 · 子女实时知晓
          </div>
        </div>
        <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 34}}>
          <StepCard delay={20} badge="壹" title="音箱到点提醒" bubble="“妈，该吃降压药啦”" bubbleColor={COLORS.red} />
          <div style={{fontSize: 70, color: COLORS.gold, fontWeight: 900, opacity: arrow(50, 65)}}>➜</div>
          <StepCard delay={55} badge="贰" title="老人开口确认" bubble="“我吃啦”" bubbleColor={COLORS.green} />
          <div style={{fontSize: 70, color: COLORS.gold, fontWeight: 900, opacity: arrow(85, 100)}}>➜</div>
          <div style={{flex: 1, display: 'flex', justifyContent: 'center', position: 'relative'}}>
            <PhoneMock src="assets/app_meds.jpg" delay={90} height={640} crop={{top: 0.32, bottom: 0.12}} />
            <MedsBadge delay={120} />
          </div>
        </div>
      </AbsoluteFill>
      <Subtitle delay={14}>再也不用反复打电话追问</Subtitle>
      <Narration file="s6.mp3" delayFrames={12} />
    </GuochaoBg>
  );
};

/* ---------- S7 六大功能 ---------- */
const FEATURES: {icon: string; title: string; desc: string}[] = [
  {icon: '💝', title: '亲情陪伴', desc: '陪你解闷唠家常'},
  {icon: '💊', title: '提醒吃药', desc: '按时提醒主动关怀'},
  {icon: '📦', title: '帮忙找东西', desc: '物品再也不担心丢'},
  {icon: '🛡️', title: '防诈预警', desc: '识别诈骗及时提醒'},
  {icon: '😊', title: '心结开解', desc: '有人倾听帮你宽心'},
  {icon: '🧠', title: '脑活力训练', desc: '专属训练保持活力'},
];
const FeatureCard: React.FC<{i: number; data: (typeof FEATURES)[number]}> = ({i, data}) => {
  const frame = useCurrentFrame();
  const s = spring({frame: frame - (20 + i * 12), fps: 30, config: {damping: 14}});
  return (
    <div
      style={{
        background: COLORS.cream,
        borderRadius: 26,
        border: `4px solid ${COLORS.gold}`,
        padding: '30px 30px',
        boxShadow: '0 16px 44px rgba(139,20,16,0.10)',
        transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px) scale(${interpolate(s, [0, 1], [0.85, 1])})`,
        opacity: s,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 22,
          background: COLORS.red,
          border: `3px solid ${COLORS.goldBright}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 54,
          flexShrink: 0,
        }}
      >
        {data.icon}
      </div>
      <div>
        <div style={{fontSize: 46, fontWeight: 900, color: COLORS.ink}}>{data.title}</div>
        <div style={{fontSize: 30, color: COLORS.inkSoft, marginTop: 6}}>{data.desc}</div>
      </div>
    </div>
  );
};
export const Scene7: React.FC = () => {
  return (
    <GuochaoBg variant="paper">
      <AbsoluteFill style={{padding: '64px 120px', flexDirection: 'column'}}>
        <div style={{textAlign: 'center', marginBottom: 30}}>
          <div style={{fontSize: 42, color: COLORS.gold, fontWeight: 800, letterSpacing: 6}}>最值得先用的 6 个功能</div>
          <div style={{fontSize: 80, fontWeight: 900, color: COLORS.red, textShadow: `0 2px 0 ${COLORS.goldBright}`}}>
            它，懂他们的每一天
          </div>
        </div>
        <div style={{flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr 1fr', gap: 28}}>
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} i={i} data={f} />
          ))}
        </div>
      </AbsoluteFill>
      <Narration file="s7.mp3" delayFrames={10} />
    </GuochaoBg>
  );
};

/* ---------- S8 升华（红底） ---------- */
export const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <GuochaoBg variant="red">
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <BigTitle size={108} delay={6} color="#fff" shadow>
          让爱，<span style={{color: COLORS.goldBright}}>每天准时</span>陪在身边
        </BigTitle>
        <div style={{marginTop: 30}}>
          <GoldDivider delay={36} width={520} />
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 48,
            color: COLORS.goldBright,
            fontWeight: 800,
            opacity: interpolate(frame, [44, 65], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          }}
        >
          距离再远，爱，从不缺席
        </div>
      </AbsoluteFill>
      <Narration file="s8.mp3" delayFrames={14} />
    </GuochaoBg>
  );
};

/* ---------- S9 LOGO 收尾（红底） ---------- */
export const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const s = spring({frame: frame - 6, fps, config: {damping: 200}});
  const fadeOut = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: fadeOut}}>
      <GuochaoBg variant="red">
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', gap: 22}}>
          <div
            style={{
              transform: `scale(${interpolate(s, [0, 1], [0.8, 1])})`,
              opacity: s,
              width: 340,
              borderRadius: 24,
              overflow: 'hidden',
              border: `7px solid ${COLORS.goldBright}`,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            <Img src={staticFile('assets/device_red.jpg')} style={{width: '100%', display: 'block'}} />
          </div>
          <div style={{fontSize: 100, fontWeight: 900, color: '#fff', marginTop: 16, textShadow: `0 4px 0 ${COLORS.redDeeper}`}}>
            小慧呜啦啦
          </div>
          <Seal delay={30} size={120} rotate={-5}>
            AI<br />长辈管家
          </Seal>
          <div
            style={{
              fontSize: 42,
              color: COLORS.goldBright,
              marginTop: 14,
              letterSpacing: 3,
              fontWeight: 700,
              opacity: interpolate(frame, [44, 64], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
            }}
          >
            北京慧极科技有限公司
          </div>
        </AbsoluteFill>
      </GuochaoBg>
    </AbsoluteFill>
  );
};
