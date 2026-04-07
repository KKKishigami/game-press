import { GameType } from '@/lib/diagnosis-data';
import CharacterIllustration from './CharacterIllustration';

interface Props {
  type: GameType;
  size?: 'sm' | 'md' | 'lg';
}

const DIMS = {
  sm: { w: 120, h: 144, code: 10, name: 11 },
  md: { w: 180, h: 216, code: 12, name: 13 },
  lg: { w: 240, h: 288, code: 14, name: 15 },
};

export default function TypeImage({ type, size = 'md' }: Props) {
  const d = DIMS[size];
  return (
    <div
      style={{
        width: d.w,
        height: d.h,
        borderRadius: 16,
        overflow: 'hidden',
        border: `1.5px solid ${type.accentColor}45`,
        boxShadow: `0 0 28px ${type.accentColor}35, inset 0 0 20px rgba(0,0,0,0.25)`,
        position: 'relative',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      <CharacterIllustration code={type.code} width={d.w} height={d.h} />

      {/* gradient overlay + labels at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '18px 10px 8px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.75))',
        }}
      >
        <div
          style={{
            color: type.accentColor,
            fontSize: d.code,
            fontWeight: 900,
            letterSpacing: '0.22em',
            fontFamily: 'monospace',
            lineHeight: 1.2,
          }}
        >
          {type.code}
        </div>
        <div
          style={{
            color: 'white',
            fontSize: d.name,
            fontWeight: 800,
            lineHeight: 1.2,
            textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          }}
        >
          {type.characterName}
        </div>
      </div>
    </div>
  );
}
