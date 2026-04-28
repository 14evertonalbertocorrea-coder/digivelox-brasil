
import React, { useState, useEffect } from 'react';
import { RankingTable } from './components/RankingTable';
import { dbService } from './services/db';
import { RankingEntry } from './types';
import { Trophy, TrendingUp, Calendar } from 'lucide-react';

export const RankingPage: React.FC = () => {
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await dbService.getRankings('30s');
      setRankings(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">
          HALL DA <span className="text-brand-neon">FAMA</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Os pilotos mais rápidos do Brasil. Você tem o que é preciso para entrar no Top 10?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="glass-card p-8 text-center border-yellow-500/20">
          <div className="bg-yellow-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="text-yellow-500" size={24} />
          </div>
          <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Diário</h4>
          <p className="text-2xl font-black">TOP VELOCIDADE</p>
        </div>
        <div className="glass-card p-8 text-center border-brand-neon/20">
          <div className="bg-brand-neon/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="text-brand-neon" size={24} />
          </div>
          <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Semanal</h4>
          <p className="text-2xl font-black">MAIOR EVOLUÇÃO</p>
        </div>
        <div className="glass-card p-8 text-center border-purple-500/20">
          <div className="bg-purple-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="text-purple-500" size={24} />
          </div>
          <h4 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Geral</h4>
          <p className="text-2xl font-black">LENDAS VIVAS</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        <RankingTable title="Ranking Global - 30 Segundos" entries={rankings} />
      </div>
    </div>
  );
};
