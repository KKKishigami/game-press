'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { questions, calculateTypeCode } from '@/lib/diagnosis-data';

type Phase = 'intro' | 'quiz' | 'revealing';

const AXIS_LABELS = ['プレイスタイル', '戦闘スタイル', '楽しみ方', '熱量'];
const AXIS_GRADIENTS = [
  'from-purple-600 to-cyan-600',
  'from-red-600 to-orange-500',
  'from-blue-600 to-teal-500',
  'from-yellow-500 to-pink-600',
];
const ALL_EMOJIS = ['🐺','⚔️','💥','💀','🔮','🦅','🏰','⚙️','🌟','👑','🎆','⚡','💚','🐉','🔧','✨'];

export default function DiagnosisQuiz() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [selected, setSelected] = useState<'A' | 'B' | null>(null);
  const [resultCode, setResultCode] = useState('');
  const [revealStep, setRevealStep] = useState(0);
  const [animIn, setAnimIn] = useState(true);

  const handleAnswer = useCallback((option: 'A' | 'B') => {
    if (selected !== null) return;
    setSelected(option);

    setTimeout(() => {
      const newScores = [...scores];
      const q = questions[currentQ];
      if (option === 'B') newScores[q.axis]++;
      setScores(newScores);

      if (currentQ < questions.length - 1) {
        setAnimIn(false);
        setTimeout(() => {
          setCurrentQ((prev) => prev + 1);
          setSelected(null);
          setAnimIn(true);
        }, 200);
      } else {
        const code = calculateTypeCode(newScores);
        setResultCode(code);
        setPhase('revealing');
      }
    }, 350);
  }, [selected, scores, currentQ]);

  useEffect(() => {
    if (phase !== 'revealing') return;
    const t1 = setTimeout(() => setRevealStep(1), 1800);
    const t2 = setTimeout(() => router.push(`/diagnosis/result/${resultCode}`), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [phase, resultCode, router]);

  if (phase === 'intro') return <IntroScreen onStart={() => { setPhase('quiz'); setAnimIn(true); }} />;
  if (phase === 'revealing') return <RevealScreen code={resultCode} step={revealStep} />;

  const question = questions[currentQ];
  const progress = (currentQ / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-gray-950">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-gray-950 to-cyan-950/15 pointer-events-none" />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top bar */}
      <div className="relative z-10 pt-8 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className={`text-xs font-black px-3 py-1.5 rounded-full bg-gradient-to-r ${AXIS_GRADIENTS[question.axis]} text-white tracking-wide`}>
            {AXIS_LABELS[question.axis]}
          </span>
          <span className="text-gray-500 text-sm font-bold font-mono">
            {String(currentQ + 1).padStart(2, '0')} / {questions.length}
          </span>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-1 flex-wrap max-w-xs mx-auto">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all duration-300 ${
                i < currentQ  ? 'bg-purple-500 w-3 h-1' :
                i === currentQ ? 'bg-cyan-400 w-6 h-1' :
                'bg-gray-700 w-2 h-1'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Question + options */}
      <div
        className="flex-1 flex flex-col items-center justify-center px-4 py-8 transition-all duration-200"
        style={{ opacity: animIn ? 1 : 0, transform: animIn ? 'translateY(0)' : 'translateY(16px)' }}
      >
        <div className="max-w-2xl w-full">
          <h2 className="text-white font-black text-xl md:text-2xl lg:text-3xl text-center mb-10 leading-relaxed">
            {question.text}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Option A */}
            <OptionButton
              label="A"
              text={question.optionA}
              selected={selected}
              own="A"
              activeColor="purple"
              onClick={() => handleAnswer('A')}
            />
            {/* Option B */}
            <OptionButton
              label="B"
              text={question.optionB}
              selected={selected}
              own="B"
              activeColor="cyan"
              onClick={() => handleAnswer('B')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Option Button ─────────────────────────────────────────────────────────

interface OptionButtonProps {
  label: string;
  text: string;
  selected: 'A' | 'B' | null;
  own: 'A' | 'B';
  activeColor: 'purple' | 'cyan';
  onClick: () => void;
}

function OptionButton({ label, text, selected, own, activeColor, onClick }: OptionButtonProps) {
  const isSelected   = selected === own;
  const isDeselected = selected !== null && selected !== own;
  const color = activeColor === 'purple'
    ? { border: '#a855f7', bg: 'rgba(88,28,135,0.4)', shadow: 'rgba(168,85,247,0.3)', badgeBg: '#7c3aed', hover: 'hover:border-purple-500 hover:bg-purple-900/20 hover:shadow-purple-500/20' }
    : { border: '#22d3ee', bg: 'rgba(8,145,178,0.3)',  shadow: 'rgba(34,211,238,0.3)',  badgeBg: '#0891b2', hover: 'hover:border-cyan-500 hover:bg-cyan-900/20 hover:shadow-cyan-500/20' };

  return (
    <button
      onClick={onClick}
      disabled={selected !== null}
      className={`
        group relative p-6 rounded-2xl border-2 text-left transition-all duration-200
        ${isSelected ? 'scale-100 shadow-xl' : ''}
        ${isDeselected ? 'opacity-35 scale-95 border-gray-800 bg-gray-900/20' : ''}
        ${!selected ? `border-gray-700 bg-gray-900/50 hover:scale-105 hover:shadow-xl ${color.hover} cursor-pointer` : ''}
      `}
      style={isSelected ? {
        borderColor: color.border,
        background: color.bg,
        boxShadow: `0 8px 32px ${color.shadow}`,
      } : {}}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg mb-4 transition-all duration-200`}
        style={isSelected ? { background: color.badgeBg, color: '#fff' } : {}}
      >
        <span className={isSelected ? 'text-white' : 'text-gray-500 group-hover:text-white'}>
          {label}
        </span>
      </div>
      <p className={`font-medium text-sm md:text-base leading-relaxed transition-colors ${
        isSelected ? 'text-white' : isDeselected ? 'text-gray-600' : 'text-gray-300 group-hover:text-white'
      }`}>
        {text}
      </p>
      {isSelected && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: `linear-gradient(135deg, ${color.bg}, transparent)` }}
        />
      )}
    </button>
  );
}

// ── Intro Screen ──────────────────────────────────────────────────────────

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gray-950">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-gray-950 to-cyan-950/30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      {/* Particle stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              left:   `${(i * 13 + 7)  % 100}%`,
              top:    `${(i * 19 + 11) % 100}%`,
              width:  `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              background: i % 2 === 0 ? '#a78bfa' : '#67e8f9',
              opacity: 0.2 + (i % 5) * 0.06,
              animationDelay: `${(i * 0.25) % 3}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl">
        {/* Icon */}
        <div className="text-6xl md:text-7xl mb-6 animate-bounce" style={{ animationDuration: '2s' }}>🎮</div>

        {/* Title */}
        <h1 className="font-black leading-none mb-6">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 text-5xl md:text-7xl">
            GAME TYPE
          </span>
          <span className="block text-white text-4xl md:text-6xl mt-2">診断</span>
        </h1>

        <div className="mb-8 space-y-2">
          <p className="text-gray-300 text-lg font-semibold">
            あなたのゲームスタイルは{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-black">
              16タイプ
            </span>
            {' '}のどれ？
          </p>
          <p className="text-gray-500 text-sm">20の質問に答えて、タイプ・相性を一発診断！</p>
        </div>

        {/* Type grid preview */}
        <div className="grid grid-cols-8 gap-1.5 mb-10 max-w-xs mx-auto">
          {ALL_EMOJIS.map((emoji, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl bg-gray-800/60 border border-gray-700/40 flex items-center justify-center text-xl hover:scale-125 hover:bg-gray-700/60 transition-transform duration-150"
            >
              {emoji}
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="relative group px-12 py-5 text-xl font-black rounded-2xl overflow-hidden
            bg-gradient-to-r from-purple-600 to-cyan-600 text-white
            hover:from-purple-500 hover:to-cyan-500
            transition-all duration-300 hover:scale-105
            shadow-2xl shadow-purple-600/40 hover:shadow-purple-500/60"
        >
          <span className="relative z-10 tracking-wide">診断スタート ▶</span>
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
        </button>

        <p className="text-gray-600 text-xs mt-4">所要時間：約2〜3分</p>
      </div>
    </div>
  );
}

// ── Reveal Screen ─────────────────────────────────────────────────────────

function RevealScreen({ code, step }: { code: string; step: number }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 relative overflow-hidden">
      {/* Concentric pulse rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute -inset-48 rounded-full border border-purple-500/20 animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute -inset-32 rounded-full border border-cyan-500/15 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
        <div className="absolute -inset-16 rounded-full border border-purple-400/20 animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }} />
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600/30 to-cyan-600/20 animate-pulse" />
      </div>

      <div className="relative z-10 text-center px-4">
        {step === 0 ? (
          <div>
            <div className="text-6xl mb-6 animate-spin" style={{ animationDuration: '3s' }}>🔍</div>
            <p className="text-gray-400 text-2xl font-black tracking-widest animate-pulse">解析中...</p>
            <p className="text-gray-600 text-sm mt-3">あなたのゲームDNAを分析しています</p>
          </div>
        ) : (
          <div className="animate-pulse">
            <p className="text-gray-500 text-xs tracking-[0.4em] mb-6 uppercase">Your Game Type Is</p>
            <p className="font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400"
              style={{ fontSize: 'clamp(56px, 18vw, 120px)', lineHeight: 1 }}
            >
              {code}
            </p>
            <p className="text-gray-500 text-sm mt-6 animate-bounce">結果を表示しています...</p>
          </div>
        )}
      </div>
    </div>
  );
}
