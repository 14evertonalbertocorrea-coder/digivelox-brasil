import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTypingTest } from '../hooks/useTypingTest';
import { TestMode } from '../types';
import { cn, formatTime, calculateWPM } from '../lib/utils';

interface TypingAreaProps {
  onFinish: (stats: any) => void;
}

export const TypingArea: React.FC<TypingAreaProps> = ({ onFinish }) => {
  const [mode, setMode] = React.useState<TestMode>('30s');
  const { text, userInput, timeLeft, isActive, isFinished, stats, handleInput, reset } = useTypingTest(mode);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFinished) {
      onFinish(stats);
    }
  }, [isFinished, stats, onFinish]);

  const progress = ((parseInt(mode) - timeLeft) / parseInt(mode)) * 100;

  const renderChar = (char: string, index: number) => {
    let color = "text-gray-500";

    if (index < userInput.length) {
      color =
        userInput[index] === char
          ? "text-brand-neon bg-brand-neon/10 underline decoration-2"
          : "text-brand-danger bg-brand-danger/20";
    }

    const isCurrent = index === userInput.length;

    return (
      <span
        key={index}
        className={cn(
          "transition-colors duration-150 whitespace-pre-wrap",
          color,
          isCurrent && "border-l-2 border-brand-neon animate-pulse"
        )}
      >
        {char}
      </span>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">

      <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tight text-center mb-3">
        TESTE DE DIGITAÇÃO <span className="text-brand-neon">ONLINE</span>
      </h1>

      <p className="text-gray-400 text-center max-w-2xl mb-12 text-sm md:text-base">
        Descubra sua velocidade no teclado, bata recordes e desafie seus amigos no ranking DigiVelox Brasil.
      </p>

      <div className="flex gap-4 mb-14">
        {(['15s', '30s', '60s'] as TestMode[]).map((m) => (
          <button
            key={m}
            onClick={() => !isActive && setMode(m)}
            disabled={isActive}
            className={cn(
              "px-8 py-3 rounded-full border text-sm font-black transition-all uppercase tracking-widest",
              mode === m
                ? "border-brand-neon text-brand-neon bg-brand-neon/10 shadow-[0_0_15px_rgba(0,255,156,0.15)]"
                : "border-white/10 text-gray-500 hover:text-brand-neon hover:border-brand-neon"
            )}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="w-full max-w-5xl mb-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div onClick={() => inputRef.current?.focus()} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center cursor-pointer">
          <span className="block text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Tempo</span>
          <span className="text-5xl heading-italic text-brand-neon">{formatTime(timeLeft)}</span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
          <span className="block text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">PPM Atual</span>
          <span className="text-5xl heading-italic text-white">
            {calculateWPM(userInput.length, parseInt(mode) - timeLeft)}
          </span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
          <span className="block text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Precisão</span>
          <span className="text-4xl font-black italic text-blue-400">{stats.accuracy}%</span>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
          <span className="block text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Erros</span>
          <span className="text-4xl font-black italic text-brand-danger">{stats.errors}</span>
        </div>
      </div>

      <div
        className="w-full max-w-5xl min-h-[240px] bg-gradient-to-b from-white/5 to-white/[0.03] border border-brand-neon/20 rounded-3xl p-8 md:p-10 text-2xl md:text-3xl font-medium leading-loose relative cursor-text mb-8 shadow-[0_0_30px_rgba(0,255,156,0.08)]"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="absolute inset-0 rounded-3xl pointer-events-none border border-brand-neon/10" />

        <div className="select-none break-words whitespace-pre-wrap">
          {text.split('').map((char, i) => renderChar(char, i))}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInput}
          className="absolute inset-0 opacity-0"
          autoFocus
          disabled={isFinished}
        />

        <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-brand-neon shadow-[0_0_15px_rgba(0,255,156,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-6 flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => {
            reset();
            inputRef.current?.focus();
          }}
          className="btn-neon px-12 py-5 text-lg"
        >
          REINICIAR TESTE
        </button>

        <button
          onClick={() => (window.location.href = '/ranking')}
          className="border border-white/20 px-8 py-5 rounded-xl font-bold hover:bg-white/5 transition-colors"
        >
          VER RANKING GERAL
        </button>
      </div>

      <div className="mt-14 w-full max-w-3xl bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-around">
        {[
          { icon: '🥉', label: 'Iniciante', active: true },
          { icon: '🥈', label: 'Rápido', active: stats.wpm >= 40 },
          { icon: '🥇', label: 'Ninja', active: stats.wpm >= 70 },
          { icon: '🔥', label: 'Máquina', active: stats.wpm >= 100 },
        ].map((bad, i) => (
          <div key={i} className={cn("flex flex-col items-center", !bad.active && "opacity-30")}>
            <div
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center mb-2 text-xl transition-all",
                bad.active
                  ? "bg-brand-neon/20 border border-brand-neon shadow-[0_0_20px_rgba(0,255,156,0.25)]"
                  : "bg-gray-800"
              )}
            >
              {bad.icon}
            </div>
            <span className={cn("text-[11px] uppercase font-bold tracking-wider", bad.active && "text-brand-neon")}>
              {bad.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
