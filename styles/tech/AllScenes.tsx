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
import {BigTitle, Narration, PhoneMock, Subtitle} from '../components';
import {CornerBrackets, GlassCard, HudLabel, TechBg, TechDivider} from '../tech';

/* ---------- S1 品牌产品开场 ---------- */
export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - 8, fps, config: {damping: 200}});
  return (
    <TechBg>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', gap: 22}}>
        <HudLabel delay={6}>HUIJI · AI CARE</HudLabel>
        <div
          style={{
            fontSize: 150,
            fontWeight: 900,
            color: '#fff',
            letterSpacing: 4,
            textShadow: `0 0 40px rgba(34,211,238,0.4)`,
            opacity: s,
            transform: `translateY(${interpolate(s, [0, 1], [40, 0])}px)`,
          }}
        >
          小慧呜啦啦
        </div>
        <div
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: COLORS.cyan,
            letterSpacing: 10,
            opacity: interpolate(frame, [28, 48], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          }}
        >
          AI 长辈管家
        </div>
        <div style={{marginTop: 14}}>
          <TechDivider delay={44} width={520} />
        </div>
        <div
          style={{
            fontSize: 34,
            color: COLORS.sub,
            letterSpacing: 4,
            marginTop: 10,
            opacity: interpolate(frame, [58, 78], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          }}
        >
          北京慧极科技有限公司
        </div>
      </AbsoluteFill>
      <Narration file="s1.mp3" delayFrames={16} />
    </TechBg>
  );
};

/* ---------- S2 产品定位 ---------- */
export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const a = interpolate(frame, [8, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <TechBg>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{marginBottom: 26}}>
          <HudLabel delay={4}>产品定位 · POSITIONING</HudLabel>
        </div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 900,
            color: '#fff',
            textAlign: 'center',
            lineHeight: 1.25,
            opacity: a,
            transform: `translateY(${(1 - a) * 30}px)`,
          }}
        >
          专为长辈打造的<br />
          <span style={{color: COLORS.cyan}}>智能陪伴终端</span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 40,
            color: COLORS.sub,
            fontWeight: 600,
            opacity: interpolate(frame, [40, 62], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          }}
        >
          让科技，真正读懂老人的需求
        </div>
      </AbsoluteFill>
      <Narration file="s2.mp3" delayFrames={12} />
    </TechBg>
  );
};

/* ---------- S3 产品概览（外观） ---------- */
const SpecChip: React.FC<{children: React.ReactNode; delay: number}> = ({children, delay}) => {
  const frame = useCurrentFrame();
  const s = spring({frame: frame - delay, fps: 30, config: {damping: 14}});
  return (
    <div
      style={{
        fontSize: 38,
        fontWeight: 700,
        color: COLORS.white,
        background: 'rgba(34,211,238,0.12)',
        border: `1.5px solid ${COLORS.glassBorder}`,
        padding: '12px 30px',
        borderRadius: 999,
        transform: `scale(${s})`,
      }}
    >
      {children}
    </div>
  );
};
export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame: frame - 8, fps, config: {damping: 200}});
  return (
    <TechBg>
      <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', padding: '0 130px', gap: 80}}>
        <div style={{flex: 1.05, position: 'relative'}}>
          <GlassCard style={{padding: 18, position: 'relative', transform: `scale(${interpolate(s, [0, 1], [0.86, 1])})`, opacity: s}}>
            <Img src={staticFile('assets/device_red.jpg')} style={{width: '100%', display: 'block', borderRadius: 14}} />
            <CornerBrackets size={44} />
          </GlassCard>
        </div>
        <div style={{flex: 1}}>
          <HudLabel delay={6}>产品概览 · HARDWARE</HudLabel>
          <div style={{marginTop: 18}}>
            <BigTitle size={82} align="flex-start" delay={12} color="#fff">
              小巧机身<br /><span style={{color: COLORS.cyan}}>简单易用</span>
            </BigTitle>
          </div>
          <div style={{display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 40}}>
            <SpecChip delay={34}>高清大屏</SpecChip>
            <SpecChip delay={44}>一键操作</SpecChip>
            <SpecChip delay={54}>小巧便携</SpecChip>
          </div>
        </div>
      </AbsoluteFill>
      <Subtitle delay={18}>长辈一看就会，轻松上手</Subtitle>
      <Narration file="s3.mp3" delayFrames={12} />
    </TechBg>
  );
};

/* ---------- S4 连接与小程序 ---------- */
const Chip: React.FC<{children: React.ReactNode; delay: number; color: string}> = ({children, delay, color}) => {
  const frame = useCurrentFrame();
  const s = spring({frame: frame - delay, fps: 30, config: {damping: 13}});
  return (
    <div
      style={{
        fontSize: 42,
        fontWeight: 700,
        color: '#fff',
        background: color,
        padding: '13px 34px',
        borderRadius: 999,
        transform: `scale(${s})`,
        boxShadow: `0 8px 26px ${color}55`,
      }}
    >
      {children}
    </div>
  );
};
export const Scene4: React.FC = () => {
  return (
    <TechBg>
      <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', padding: '0 130px', gap: 90}}>
        <div style={{flex: 1}}>
          <HudLabel delay={4}>互联互通 · CONNECT</HudLabel>
          <div style={{marginTop: 18}}>
            <BigTitle size={80} align="flex-start" delay={10} color="#fff">
              双模连接<br /><span style={{color: COLORS.cyan}}>远程管理</span>
            </BigTitle>
          </div>
          <div style={{display: 'flex', gap: 20, marginTop: 40, flexWrap: 'wrap'}}>
            <Chip delay={30} color={COLORS.blue}>
              📶 蓝牙
            </Chip>
            <Chip delay={40} color={COLORS.cyan}>
              🌐 WiFi
            </Chip>
            <Chip delay={50} color={COLORS.green}>
              📱 小程序
            </Chip>
          </div>
        </div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
          <PhoneMock src="assets/app_home.jpg" delay={8} height={900} />
        </div>
      </AbsoluteFill>
      <Subtitle delay={12}>配套小程序，远程管理一手掌握</Subtitle>
      <Narration file="s4.mp3" delayFrames={12} />
    </TechBg>
  );
};

/* ---------- S5 AI 声音复刻 ---------- */
const Wave: React.FC<{delay: number}> = ({delay}) => {
  const frame = useCurrentFrame();
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 10, height: 90}}>
      {new Array(9).fill(0).map((_, i) => {
        const h = 16 + 64 * Math.abs(Math.sin((frame - delay) * 0.2 + i * 0.7));
        return <div key={i} style={{width: 12, height: h, borderRadius: 8, background: COLORS.cyan, boxShadow: `0 0 10px ${COLORS.cyan}`}} />;
      })}
    </div>
  );
};
export const Scene5: React.FC = () => {
  return (
    <TechBg>
      <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', padding: '0 130px', gap: 90}}>
        <div style={{flex: 1}}>
          <HudLabel delay={4}>核心技术 · AI VOICE</HudLabel>
          <div style={{marginTop: 18}}>
            <BigTitle size={78} align="flex-start" delay={10} color="#fff">
              AI <span style={{color: COLORS.cyan}}>声音复刻</span>
            </BigTitle>
          </div>
          <div style={{marginTop: 34}}>
            <Wave delay={20} />
          </div>
          <div style={{marginTop: 24, fontSize: 36, color: COLORS.sub, fontWeight: 600}}>
            用子女的声音，带来熟悉的陪伴
          </div>
        </div>
        <div style={{flex: 1, display: 'flex', justifyContent: 'center'}}>
          <PhoneMock src="assets/app_home.jpg" delay={10} height={900} />
        </div>
      </AbsoluteFill>
      <Narration file="s5.mp3" delayFrames={12} />
    </TechBg>
  );
};

/* ---------- S6 智能用药管理闭环（核心） ---------- */
const StepCard: React.FC<{
  delay: number;
  no: string;
  title: string;
  bubble: string;
  bubbleColor: string;
}> = ({delay, no, title, bubble, bubbleColor}) => {
  const frame = useCurrentFrame();
  const s = spring({frame: frame - delay, fps: 30, config: {damping: 15}});
  return (
    <GlassCard
      style={{
        flex: 1,
        padding: '36px 26px',
        position: 'relative',
        transform: `translateY(${interpolate(s, [0, 1], [50, 0])}px) scale(${interpolate(s, [0, 1], [0.9, 1])})`,
        opacity: s,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 18,
      }}
    >
      <CornerBrackets size={28} thickness={2} />
      <div style={{fontSize: 56, fontWeight: 900, color: COLORS.cyan, letterSpacing: 2}}>{no}</div>
      <div style={{fontSize: 38, fontWeight: 800, color: '#fff'}}>{title}</div>
      <div
        style={{
          fontSize: 34,
          fontWeight: 700,
          color: '#fff',
          background: bubbleColor,
          padding: '12px 24px',
          borderRadius: 14,
        }}
      >
        {bubble}
      </div>
    </GlassCard>
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
        background: COLORS.navy3,
        borderRadius: 18,
        border: `1.5px solid ${COLORS.cyan}`,
        padding: '16px 24px',
        boxShadow: `0 16px 40px rgba(0,0,0,0.4)`,
        transform: `scale(${s})`,
        textAlign: 'center',
      }}
    >
      <div style={{fontSize: 26, color: COLORS.sub, fontWeight: 700}}>本月按时服药率</div>
      <div style={{fontSize: 66, fontWeight: 900, color: COLORS.green}}>98%</div>
      <div style={{fontSize: 24, color: COLORS.green, fontWeight: 800}}>✓ 已按时服药</div>
    </div>
  );
};
export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const arrow = (a: number, b: number) =>
    interpolate(frame, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <TechBg>
      <AbsoluteFill style={{padding: '64px 100px', flexDirection: 'column'}}>
        <div style={{textAlign: 'center'}}>
          <HudLabel delay={4}>核心能力 · CLOSED LOOP</HudLabel>
          <div style={{fontSize: 72, fontWeight: 900, color: '#fff', marginTop: 12}}>
            智能用药<span style={{color: COLORS.cyan}}>管理闭环</span>
          </div>
        </div>
        <div style={{flex: 1, display: 'flex', alignItems: 'center', gap: 30}}>
          <StepCard delay={24} no="01" title="到点语音提醒" bubble="“该吃降压药啦”" bubbleColor={COLORS.blue} />
          <div style={{fontSize: 60, color: COLORS.cyan, fontWeight: 900, opacity: arrow(54, 70)}}>›</div>
          <StepCard delay={58} no="02" title="长辈开口确认" bubble="“我吃啦”" bubbleColor={COLORS.green} />
          <div style={{fontSize: 60, color: COLORS.cyan, fontWeight: 900, opacity: arrow(90, 106)}}>›</div>
          <div style={{flex: 1, display: 'flex', justifyContent: 'center', position: 'relative'}}>
            <PhoneMock src="assets/app_meds.jpg" delay={96} height={620} crop={{top: 0.32, bottom: 0.12}} />
            <MedsBadge delay={124} />
          </div>
        </div>
      </AbsoluteFill>
      <Subtitle delay={14}>服药数据实时回传，子女随时掌握</Subtitle>
      <Narration file="s6.mp3" delayFrames={12} />
    </TechBg>
  );
};

/* ---------- S7 六大核心功能 ---------- */
const FEATURES: {icon: string; title: string; desc: string}[] = [
  {icon: '💝', title: '亲情陪伴', desc: '陪你解闷唠家常'},
  {icon: '💊', title: '用药提醒', desc: '按时提醒主动关怀'},
  {icon: '📦', title: '协助寻物', desc: '物品再也不担心丢'},
  {icon: '🛡️', title: '防诈预警', desc: '识别诈骗及时提醒'},
  {icon: '😊', title: '心理疏导', desc: '有人倾听帮你宽心'},
  {icon: '🧠', title: '脑力训练', desc: '专属训练保持活力'},
];
const FeatureCard: React.FC<{i: number; data: (typeof FEATURES)[number]}> = ({i, data}) => {
  const frame = useCurrentFrame();
  const s = spring({frame: frame - (22 + i * 12), fps: 30, config: {damping: 15}});
  return (
    <GlassCard
      style={{
        padding: '26px 28px',
        transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px) scale(${interpolate(s, [0, 1], [0.85, 1])})`,
        opacity: s,
        display: 'flex',
        alignItems: 'center',
        gap: 22,
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 20,
          background: 'rgba(34,211,238,0.12)',
          border: `1.5px solid ${COLORS.glassBorder}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 52,
          flexShrink: 0,
        }}
      >
        {data.icon}
      </div>
      <div>
        <div style={{fontSize: 44, fontWeight: 900, color: '#fff'}}>{data.title}</div>
        <div style={{fontSize: 28, color: COLORS.sub, marginTop: 6}}>{data.desc}</div>
      </div>
    </GlassCard>
  );
};
export const Scene7: React.FC = () => {
  return (
    <TechBg>
      <AbsoluteFill style={{padding: '58px 120px', flexDirection: 'column'}}>
        <div style={{textAlign: 'center', marginBottom: 28}}>
          <HudLabel delay={4}>功能矩阵 · 6 CORE FEATURES</HudLabel>
          <div style={{fontSize: 76, fontWeight: 900, color: '#fff', marginTop: 10}}>
            六大<span style={{color: COLORS.cyan}}>核心功能</span>
          </div>
        </div>
        <div style={{flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr 1fr', gap: 26}}>
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} i={i} data={f} />
          ))}
        </div>
      </AbsoluteFill>
      <Narration file="s7.mp3" delayFrames={12} />
    </TechBg>
  );
};

/* ---------- S8 价值主张 ---------- */
export const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <TechBg>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <BigTitle size={96} delay={6} color="#fff">
          以 <span style={{color: COLORS.cyan}}>AI</span> 之力
        </BigTitle>
        <div style={{marginTop: 26}}>
          <TechDivider delay={30} width={460} />
        </div>
        <div
          style={{
            marginTop: 26,
            fontSize: 56,
            color: '#fff',
            fontWeight: 800,
            opacity: interpolate(frame, [40, 62], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          }}
        >
          让陪伴更<span style={{color: COLORS.cyan}}>智能</span>，让关怀更<span style={{color: COLORS.cyan}}>省心</span>
        </div>
      </AbsoluteFill>
      <Narration file="s8.mp3" delayFrames={14} />
    </TechBg>
  );
};

/* ---------- S9 品牌收尾 ---------- */
export const Scene9: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const s = spring({frame: frame - 6, fps, config: {damping: 200}});
  const fadeOut = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: fadeOut}}>
      <TechBg>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', gap: 20}}>
          <GlassCard style={{padding: 16, width: 320, transform: `scale(${interpolate(s, [0, 1], [0.82, 1])})`, opacity: s, position: 'relative'}}>
            <Img src={staticFile('assets/device_red.jpg')} style={{width: '100%', display: 'block', borderRadius: 12}} />
            <CornerBrackets size={36} />
          </GlassCard>
          <div style={{fontSize: 104, fontWeight: 900, color: '#fff', marginTop: 14, textShadow: `0 0 40px rgba(34,211,238,0.4)`}}>
            小慧呜啦啦
          </div>
          <div style={{fontSize: 46, fontWeight: 700, color: COLORS.cyan, letterSpacing: 8}}>AI 长辈管家</div>
          <div
            style={{
              fontSize: 38,
              color: COLORS.sub,
              marginTop: 12,
              letterSpacing: 3,
              opacity: interpolate(frame, [44, 66], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
            }}
          >
            北京慧极科技有限公司
          </div>
        </AbsoluteFill>
      </TechBg>
    </AbsoluteFill>
  );
};
