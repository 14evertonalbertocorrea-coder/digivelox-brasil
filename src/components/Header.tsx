import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Keyboard, Trophy, BookOpen, LogIn, Zap, Flame } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
}

const topAds = [
  {
    text: '⌨️ MELHORES TECLADOS PARA DIGITAR MAIS RÁPIDO',
    link: 'https://s.shopee.com.br/5Aouf22y52'
  },
  {
    text: '🖱️ MOUSE GAMER RGB EM OFERTA HOJE',
    link: 'https://s.shopee.com.br/2g7aayvHrR'
  },
  {
    text: '🪑 CADEIRA GAMER CONFORTÁVEL COM DESCONTO',
    link: 'https://s.shopee.com.br/7fWGYD6JMT'
  }
];

export const Header: React.FC<HeaderProps> = ({ user, onLogin }) => {
  const [adIndex, setAdIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAdIndex((prev) => (prev + 1) % topAds.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-neon/20 bg-[#070b12]/90 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,156,0.06)]">
      <div className="container mx-auto px-4 md:px-8 h-[70px] flex items-center justify-between gap-4">

        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-12 h-12 bg-brand-neon rounded-xl flex items-center justify-center text-bg-main font-black text-xl italic group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,255,156,0.35)]">
            DV
          </div>

          <div className="hidden sm:block leading-none">
            <span className="block text-2xl heading-italic text-brand-neon">
              DIGIVELOX <span className="text-white">BRASIL</span>
            </span>
            <span className="text-[10px] text-gray-500 uppercase font-black tracking-[0.25em]">
              Teste • Ranking • Velocidade
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-2 shrink-0 bg-white/5 border border-white/10 rounded-full p-1">
          <Link
            to="/"
            className="px-4 py-2 rounded-full text-xs uppercase tracking-widest text-gray-300 hover:text-black hover:bg-brand-neon font-black transition-all flex items-center gap-2"
          >
            <Keyboard size={14} /> Teste
          </Link>

          <Link
            to="/ranking"
            className="px-4 py-2 rounded-full text-xs uppercase tracking-widest text-gray-300 hover:text-black hover:bg-brand-neon font-black transition-all flex items-center gap-2"
          >
            <Trophy size={14} /> Ranking
          </Link>

          <Link
            to="/blog"
            className="px-4 py-2 rounded-full text-xs uppercase tracking-widest text-gray-300 hover:text-black hover:bg-brand-neon font-black transition-all flex items-center gap-2"
          >
            <BookOpen size={14} /> Blog
          </Link>
        </nav>

        <a
          href={topAds[adIndex].link}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex flex-1 max-w-[430px] h-[42px] rounded-xl bg-brand-neon/10 border border-brand-neon/30 items-center justify-center px-4 hover:bg-brand-neon hover:text-black transition-all overflow-hidden group"
        >
          <span className="text-[11px] uppercase font-black tracking-wider text-brand-neon group-hover:text-black text-center flex items-center gap-2">
            <Flame size={14} /> {topAds[adIndex].text}
          </span>
        </a>

        <div className="hidden xl:flex items-center gap-2 shrink-0 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
          <Zap size={16} className="text-brand-neon" />
          <div className="leading-none">
            <p className="text-[10px] uppercase font-black text-white">+10 mil testes</p>
            <p className="text-[9px] uppercase font-bold text-brand-neon">comunidade crescendo</p>
          </div>
        </div>

        {user ? (
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-black">{user.displayName}</p>
              <p className="text-[10px] text-brand-neon font-mono">{user.bestWPM} PPM RECORD</p>
            </div>

            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-10 h-10 rounded-full border-2 border-brand-neon shadow-[0_0_14px_rgba(0,255,156,0.35)]"
            />
          </div>
        ) : (
          <button
            onClick={onLogin}
            className="bg-brand-neon text-black px-5 py-3 rounded-xl font-black text-xs flex items-center gap-2 hover:scale-105 transition-transform shrink-0 shadow-[0_0_18px_rgba(0,255,156,0.25)]"
          >
            <LogIn size={16} />
            <span className="hidden sm:inline">ENTRAR</span>
          </button>
        )}
      </div>
    </header>
  );
};
