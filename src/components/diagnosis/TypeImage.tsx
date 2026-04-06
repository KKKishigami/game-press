import { GameType } from '@/lib/diagnosis-data';

interface Props {
  type: GameType;
  size?: 'sm' | 'md' | 'lg';
}

const STAR_POSITIONS = [
  { top: '10%', left: '15%', r: 3 },
  { top: '18%', left: '78%', r: 2 },
  { top: '32%', left: '88%', r: 4 },
  { top: '12%', left: '48%', r: 2 },
  { top: '55%', left: '8%',  r: 3 },
  { top: '70%', left: '82%', r: 2 },
  { top: '6%',  left: '32%', r: 2 },
  { top: '42%', left: '4%',  r: 2 },
  { top: '80%', left: '20%', r: 3 },
  { top: '25%', left: '6%',  r: 2 },
];

export default function TypeImage({ type, size = 'md' }: Props) {
  const dims = {
    sm: { w: 160, h: 200, emoji: 52, ring: 70 },
    md: { w: 220, h: 280, emoji: 72, ring: 96 },
    lg: { w: 280, h: 360, emoji: 96, ring: 130 },
  }[size];

  return (
    <div
      style={{
        width:  dims.w,
        height: dims.h,
        background: `linear-gradient(145deg, ${type.colorFrom} 0%, ${type.colorTo} 100%)`,
        boxShadow: `0 0 40px ${type.accentColor}50, inset 0 0 80px rgba(0,0,0,0.4)`,
        border: `1.5px solid ${type.accentColor}50`,
        borderRadius: 20,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 12px 14px',
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      {/* Background shimmer */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 20%, ${type.accentColor}20 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Decorative stars */}
      {STAR_POSITIONS.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: s.top, left: s.left,
            width: s.r * 2, height: s.r * 2,
            borderRadius: '50%',
            background: type.accentColor,
            opacity: 0.35 + (i % 4) * 0.1,
            boxShadow: `0 0 ${s.r * 2}px ${type.accentColor}`,
          }}
        />
      ))}

      {/* Top ring decoration */}
      <div style={{
        position: 'absolute', top: -10, right: -10,
        width: 80, height: 80, borderRadius: '50%',
        border: `1px solid ${type.accentColor}25`,
      }} />
      <div style={{
        position: 'absolute', top: 5, right: 5,
        width: 50, height: 50, borderRadius: '50%',
        border: `1px solid ${type.accentColor}15`,
      }} />

      {/* Type code */}
      <div style={{
        position: 'relative', zIndex: 1,
        fontWeight: 900,
        fontSize: dims.emoji * 0.22,
        letterSpacing: '0.25em',
        color: type.accentColor,
        textShadow: `0 0 12px ${type.accentColor}`,
        fontFamily: 'monospace',
      }}>
        {type.code}
      </div>

      {/* Emoji in glow ring */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: dims.ring, height: dims.ring,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${type.accentColor}20 0%, transparent 70%)`,
        boxShadow: `0 0 30px ${type.accentColor}40, inset 0 0 20px ${type.accentColor}10`,
        border: `1px solid ${type.accentColor}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: dims.emoji,
        lineHeight: 1,
        filter: `drop-shadow(0 0 16px ${type.accentColor}80)`,
      }}>
        {type.emoji}
      </div>

      {/* Name */}
      <div style={{
        position: 'relative', zIndex: 1,
        textAlign: 'center',
        color: '#fff',
        fontWeight: 900,
        fontSize: dims.emoji * 0.185,
        lineHeight: 1.3,
        textShadow: '0 2px 8px rgba(0,0,0,0.9)',
        padding: '0 4px',
      }}>
        {type.name}
      </div>
    </div>
  );
}
