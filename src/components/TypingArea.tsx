
import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RefreshCw, Zap, Target, Gauge, Clock } from 'lucide-react';
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
    let color = "text-gray-400";
    if (index < userInput.length) {
      color = userInput[index] === char ? "text-brand-neon bg-brand-neon/10 underline decoration-2" : "text-brand-danger bg-brand-danger/20";
    }
    const isCurrent = index === userInput.length;

    return (
      <span 
        key={index} 
        className={cn(
          "transition-colors duration-150 inline-block", 
          color,
          isCurrent && "border-l-2 border-brand-neon animate-pulse"
        )}
      >
        {char}
      </span>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Test Controls */}
      <div className="flex gap-4 mb-20">
        {(['15s', '30s', '60s'] as TestMode[]).map((m) => (
          <button
            key={m}
            onClick={() => !isActive && setMode(m)}
            disabled={isActive}
            className={cn(
              "px-8 py-2 rounded-full border text-sm font-bold transition-all",
              mode === m ? "border-brand-neon text-brand-neon bg-brand-neon/10" : "border-white/10 text-gray-500 hover:text-brand-neon hover:border-brand-neon"
            )}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Main Container */}
      <div className="w-full max-w-3xl mb-12 flex justify-between items-end">
        <div className="flex gap-12">
          <div className="text-center group cursor-pointer" onClick={() => inputRef.current?.focus()}>
            <span className="block text-[10px] text-gray-500 uppercase font-black tracking-tighter mb-1">Tempo</span>
            <span className="text-6xl heading-italic text-brand-neon">{formatTime(timeLeft)}</span>
          </div>
          <div className="text-center">
            <span className="block text-[10px] text-gray-500 uppercase font-black tracking-tighter mb-1">PPM</span>
            <span className="text-6xl heading-italic text-white">
              {calculateWPM(userInput.length, parseInt(mode) - timeLeft)}
            </span>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="text-right">
            <span className="block text-[10px] text-gray-500 uppercase font-black tracking-tighter">Precisão</span>
            <span className="text-2xl font-black italic">{stats.accuracy}%</span>
          </div>
          <div className="text-right">
            <span className="block text-[10px] text-gray-500 uppercase font-black tracking-tighter">Erros</span>
            <span className="text-2xl font-black italic text-brand-danger">{stats.errors}</span>
          </div>
        </div>
      </div>

      {/* Text Area */}
      <div 
        className="w-full max-w-3xl h-[200px] text-3xl font-medium leading-relaxed tracking-wide relative cursor-text mb-8"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="select-none">
          {text.split('').map((char, i) => renderChar(char, i))}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInput}
          className="absolute inset-0 opacity-0 cursor-default"
          autoFocus
          disabled={isFinished}
        />

        {/* Progress Bar at bottom of text */}
        <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-brand-neon shadow-[0_0_10px_rgba(0,255,156,0.6)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-12 flex gap-4">
        <button 
          onClick={() => { reset(); inputRef.current?.focus(); }}
          className="btn-neon px-12 py-5 text-lg"
        >
          REINICIAR TESTE
        </button>
        <button 
          onClick={() => window.location.href = '/ranking'}
          className="border border-white/20 px-8 py-5 rounded-xl font-bold hover:bg-white/5 transition-colors"
        >
          RANKING GERAL
        </button>
      </div>

      {/* Badges Preview */}
      <div className="mt-16 w-full max-w-2xl bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-around">
        {[
          { icon: '🥉', label: 'Iniciante', active: true },
          { icon: '🥈', label: 'Rápido', active: stats.wpm >= 40 },
          { icon: '🥇', label: 'Ninja', active: stats.wpm >= 70 },
          { icon: '🔥', label: 'Máquina', active: stats.wpm >= 100 },
        ].map((bad, i) => (
          <div key={i} className={cn("flex flex-col items-center", !bad.active && "opacity-30")}>
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center mb-1 transition-all",
              bad.active ? "bg-brand-neon/20 border border-brand-neon shadow-[0_0_15px_rgba(0,255,156,0.2)]" : "bg-gray-800"
            )}>
              {bad.icon}
            </div>
            <span className={cn("text-[10px] uppercase font-bold", bad.active && "text-brand-neon")}>{bad.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
