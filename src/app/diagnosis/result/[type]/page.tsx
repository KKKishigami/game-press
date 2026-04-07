import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTypeByCode, gameTypes, GameType } from '@/lib/diagnosis-data';
import TypeImage from '@/components/diagnosis/TypeImage';

export function generateStaticParams() {
  return gameTypes.map((t) => ({ type: t.code }));
}

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const t = getTypeByCode(type);
  if (!t) return { title: 'タイプ不明' };
  return {
    title: `${t.code} ${t.characterName} — ゲームタイプ診断`,
    description: t.catchphrase,
  };
}

export default async function ResultPage({ params }: Props) {
  const { type } = await params;
  const gt = getTypeByCode(type);
  if (!gt) notFound();

  const best    = getTypeByCode(gt.bestMatch)!;
  const goods   = gt.goodMatches.map((c) => getTypeByCode(c)!);
  const rival   = getTypeByCode(gt.rivalMatch)!;

  const axes = [
    { label: 'プレイスタイル', a: 'ソロ',       b: 'パーティ', v: gt.code[0] === 'P' ? 1 : 0 },
    { label: '戦闘スタイル',   a: '攻撃',       b: '防衛',     v: gt.code[1] === 'D' ? 1 : 0 },
    { label: '熱量',           a: 'カジュアル', b: 'ガチ',     v: gt.code[2] === 'H' ? 1 : 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-x-hidden">
      {/* Top ambient glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% -10%, ${gt.accentColor}25 0%, transparent 65%)`,
        }}
      />

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center mb-14">

          {/* Badge */}
          <span
            className="text-xs font-black tracking-widest px-5 py-2 rounded-full border mb-8"
            style={{
              color: gt.accentColor,
              borderColor: `${gt.accentColor}50`,
              background: `${gt.accentColor}12`,
            }}
          >
            GAME TYPE ◆ {gt.code}
          </span>

          {/* Type image */}
          <div
            className="mb-8"
            style={{ filter: `drop-shadow(0 0 50px ${gt.accentColor}50)` }}
          >
            <TypeImage type={gt} size="lg" />
          </div>

          {/* Name */}
          <h1
            className="text-4xl md:text-5xl font-black mb-4 text-white"
            style={{ textShadow: `0 0 40px ${gt.accentColor}60` }}
          >
            {gt.characterName}
          </h1>

          {/* Catchphrase */}
          <p
            className="text-xl md:text-2xl font-black italic mb-10"
            style={{ color: gt.accentColor }}
          >
            「{gt.catchphrase}」
          </p>

          {/* Description card */}
          <div
            className="max-w-2xl w-full rounded-2xl p-6 border text-left mb-8"
            style={{
              background: `linear-gradient(135deg, ${gt.colorFrom}20, rgba(17,24,39,0.85))`,
              borderColor: `${gt.accentColor}25`,
            }}
          >
            <p className="text-gray-200 leading-relaxed text-sm md:text-base">
              {gt.description}
            </p>
          </div>

          {/* Trait badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {gt.traits.map((trait) => (
              <span
                key={trait}
                className="px-4 py-2 rounded-full text-sm font-bold border"
                style={{
                  color: gt.accentColor,
                  borderColor: `${gt.accentColor}35`,
                  background: `${gt.accentColor}12`,
                }}
              >
                ✦ {trait}
              </span>
            ))}
          </div>

          {/* Axis bars */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-lg mx-auto">
            {axes.map((ax) => (
              <div
                key={ax.label}
                className="rounded-xl p-3 border text-center"
                style={{
                  background: 'rgba(17,24,39,0.7)',
                  borderColor: `${gt.accentColor}20`,
                }}
              >
                <p className="text-gray-500 text-xs mb-2 font-bold">{ax.label}</p>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className={ax.v === 0 ? 'text-white font-black' : 'text-gray-600'}>{ax.a}</span>
                  <span className={ax.v === 1 ? 'text-white font-black' : 'text-gray-600'}>{ax.b}</span>
                </div>
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: ax.v === 0 ? '20%' : '80%',
                      background: `linear-gradient(to right, ${gt.colorFrom}, ${gt.accentColor})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Compatibility ─────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-white font-black text-2xl mb-8 text-center">
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(to right, ${gt.accentColor}, #fff)` }}
            >
              相性診断
            </span>
          </h2>

          {/* Best match */}
          <div className="mb-5">
            <SectionLabel color="#fbbf24" icon="💕" text="最高の相性" />
            <CompatCard
              type={best}
              comment="正反対だからこそ、完璧に補い合える運命の相棒。二人が出会ったとき、最強のパーティが誕生する。"
              borderColor="#fbbf24"
              fromColor="#78350f"
            />
          </div>

          {/* Good matches */}
          <div className="mb-5">
            <SectionLabel color="#4ade80" icon="👍" text="相性が良い" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {goods.map((t, i) => (
                <CompatCard
                  key={t.code}
                  type={t}
                  comment={[
                    '社会性は違えど、魂が深いところで共鳴する。',
                    '戦い方は違えど、目指す場所は同じだ。',
                    'お互いの違いが、新たな視野をもたらしてくれる。',
                  ][i]}
                  borderColor="#4ade80"
                  fromColor="#14532d"
                  compact
                />
              ))}
            </div>
          </div>

          {/* Rival */}
          <div>
            <SectionLabel color="#f87171" icon="⚔️" text="ライバル" />
            <CompatCard
              type={rival}
              comment="最もぶつかりやすい相手。だが、この衝突こそがあなたを最強に変える最大のチャンスだ。"
              borderColor="#f87171"
              fromColor="#7f1d1d"
            />
          </div>
        </section>

        {/* ── All 16 types ──────────────────────────────────────────────── */}
        <section className="mb-14">
          <h2 className="text-white font-black text-xl mb-5 text-center">全 8 タイプ</h2>
          <div className="grid grid-cols-4 gap-3">
            {gameTypes.map((t) => (
              <Link
                key={t.code}
                href={`/diagnosis/result/${t.code}`}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all duration-200
                  ${t.code === gt.code
                    ? 'scale-110 border-white/30 bg-white/10'
                    : 'border-gray-800 bg-gray-900/40 hover:border-gray-600 hover:scale-105 hover:bg-gray-800/50'
                  }`}
                title={t.characterName}
              >
                <span className="text-2xl leading-none">{t.emoji}</span>
                <span className="text-gray-500 text-xs font-mono leading-none">{t.code}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── CTAs ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/diagnosis"
            className="px-8 py-4 rounded-xl font-black text-lg text-white text-center
              bg-gradient-to-r from-purple-600 to-cyan-600
              hover:from-purple-500 hover:to-cyan-500
              transition-all duration-200 hover:scale-105
              shadow-lg shadow-purple-600/30"
          >
            🔄 もう一度診断する
          </Link>
          <Link
            href="/"
            className="px-8 py-4 rounded-xl font-bold text-lg text-white text-center
              bg-gray-800 border border-gray-700
              hover:bg-gray-700 hover:border-gray-500
              transition-all duration-200 hover:scale-105"
          >
            🏠 トップへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── helpers ────────────────────────────────────────────────────────────────

function SectionLabel({ color, icon, text }: { color: string; icon: string; text: string }) {
  return (
    <p className="font-black text-sm tracking-widest mb-3 text-center" style={{ color }}>
      {icon} {text}
    </p>
  );
}

interface CompatCardProps {
  type: GameType;
  comment: string;
  borderColor: string;
  fromColor: string;
  compact?: boolean;
}

function CompatCard({ type, comment, borderColor, fromColor, compact = false }: CompatCardProps) {
  return (
    <div
      className={`rounded-2xl p-5 border flex gap-4 items-center ${compact ? 'flex-col text-center' : 'flex-col sm:flex-row'}`}
      style={{
        borderColor: `${borderColor}35`,
        background:  `linear-gradient(135deg, ${fromColor}30, rgba(17,24,39,0.85))`,
      }}
    >
      <div className="flex-shrink-0">
        <TypeImage type={type} size="sm" />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="text-xs font-black tracking-widest mb-1"
          style={{ color: borderColor }}
        >
          ◆ {type.code}
        </div>
        <div className="text-white font-black text-base mb-1">{type.characterName}</div>
        <p className="text-gray-400 text-sm leading-relaxed">{comment}</p>
      </div>
    </div>
  );
}
