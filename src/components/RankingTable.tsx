import React from 'react';
import { Trophy, Medal, Crown, Star, Zap } from 'lucide-react';
import { RankingEntry } from '../types';

interface RankingTableProps {
  entries: RankingEntry[];
  title: string;
}

export const RankingTable: React.FC<RankingTableProps> = ({ entries, title }) => {
  const getRankStyle = (index: number) => {
    if (index === 0) return 'border-brand-neon/40 bg-brand-neon/10 shadow-[0_0_25px_rgba(0,255,156,0.08)]';
    if (index === 1) return 'border-white/20 bg-white/8';
    if (index === 2) return 'border-amber-500/30 bg-amber-500/5';
    return 'border-white/5 bg-white/[0.03]';
  };

  const getRankIcon = (index: number) => {
    if (index === 0) return <Crown className="text-brand-neon" size={20} />;
    if (index === 1) return <Medal className="text-gray-300" size={18} />;
    if (index === 2) return <Medal className="text-amber-500" size={18} />;
    return <Star className="text-gray-600" size={16} />;
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-neon/20 bg-[#070b12]/80 shadow-[0_0_35px_rgba(0,255,156,0.06)]">
      <div className="absolute top-[-80px] right-[-80px] w-56 h-56 bg-brand-neon/10 rounded-full blur-[90px]" />

      <div className="relative p-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black italic uppercase flex items-center gap-2">
            <Trophy size={22} className="text-brand-neon" /> {title}
          </h3>
          <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">
            Os digitadores mais rápidos do Brasil
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-brand-neon/10 border border-brand-neon/20">
          <Zap size={14} className="text-brand-neon" />
          <span className="text-[10px] text-brand-neon font-black uppercase tracking-widest">
            Top 50
          </span>
        </div>
      </div>

      <div className="relative p-4">
        {entries.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-neon/10 border border-brand-neon/20 flex items-center justify-center">
              <Trophy className="text-brand-neon" size={30} />
            </div>
            <p className="text-gray-400 font-bold">
              Nenhum registro encontrado ainda.
            </p>
            <p className="text-gray-600 text-sm mt-1">
              Seja o primeiro a aparecer no ranking!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map((entry, index) => (
              <div
                key={index}
                className={`grid grid-cols-[70px_1fr_90px_90px_110px] items-center gap-4 rounded-2xl border px-4 py-4 transition-all hover:scale-[1.01] hover:border-brand-neon/40 ${getRankStyle(index)}`}
              >
                <div className="flex items-center gap-2">
                  {getRankIcon(index)}
                  <span className={index < 3 ? 'font-black text-white' : 'text-gray-500 font-mono'}>
                    #{index + 1}
                  </span>
                </div>

                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={entry.userPhoto}
                    alt={entry.userName}
                    className="w-10 h-10 rounded-full border border-brand-neon/30 shadow-[0_0_12px_rgba(0,255,156,0.12)]"
                  />
                  <div className="min-w-0">
                    <p className="font-black truncate hover:text-brand-neon transition-colors">
                      {entry.userName}
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                      Piloto DigiVelox
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">PPM</p>
                  <p className="text-xl font-black text-brand-neon font-mono">{entry.wpm}</p>
                </div>

                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Precisão</p>
                  <p className="text-sm font-black text-blue-400 font-mono">{entry.accuracy}%</p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Data</p>
                  <p className="text-xs text-gray-400">
                    {new Date(entry.timestamp).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
