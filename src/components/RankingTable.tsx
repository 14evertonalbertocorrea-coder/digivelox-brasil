
import React from 'react';
import { Trophy, Medal, Star } from 'lucide-react';
import { RankingEntry } from '../types';

interface RankingTableProps {
  entries: RankingEntry[];
  title: string;
}

export const RankingTable: React.FC<RankingTableProps> = ({ entries, title }) => {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Trophy size={20} className="text-brand-neon" /> {title}
        </h3>
        <span className="text-xs text-gray-400 capitalize">Top 50</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
            <tr>
              <th className="px-6 py-4">Pouso</th>
              <th className="px-6 py-4">Piloto</th>
              <th className="px-6 py-4">PPM</th>
              <th className="px-6 py-4">Precisão</th>
              <th className="px-6 py-4">Data</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {entries.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 italic">
                  Nenhum registro encontrado ainda. Seja o primeiro!
                </td>
              </tr>
            ) : (
              entries.map((entry, index) => (
                <tr key={index} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {index === 0 && <Medal className="text-yellow-400" size={18} />}
                      {index === 1 && <Medal className="text-gray-300" size={18} />}
                      {index === 2 && <Medal className="text-amber-600" size={18} />}
                      <span className={index < 3 ? 'font-bold' : 'text-gray-400 font-mono'}>#{index + 1}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={entry.userPhoto} alt={entry.userName} className="w-8 h-8 rounded-full border border-white/10" />
                      <span className="font-medium group-hover:text-brand-neon transition-colors">{entry.userName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-brand-neon">{entry.wpm}</td>
                  <td className="px-6 py-4 text-gray-400 font-mono">{entry.accuracy}%</td>
                  <td className="px-6 py-4 text-xs text-gray-500">
                    {new Date(entry.timestamp).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
