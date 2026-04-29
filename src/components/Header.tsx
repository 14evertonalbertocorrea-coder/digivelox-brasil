import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Keyboard, Trophy, BookOpen, LogIn } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full border-b border-brand-neon/10 bg-bg-surface backdrop-blur-lg">
      <div className="container mx-auto px-4 md:px-8 h-[60px] flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 bg-brand-neon rounded flex items-center justify-center text-bg-main font-black text-xl italic group-hover:scale-110 transition-transform">
            DV
          </div>
          <span className="hidden sm:block text-2xl heading-italic text-brand-neon">
            DIGIVELOX <span className="text-white">BRASIL</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 shrink-0">
          <Link to="/" className="text-xs uppercase tracking-widest text-gray-400 hover:text-brand-neon font-bold transition-colors flex items-center gap-2">
            <Keyboard size={14} /> Teste
          </Link>
          <Link to="/ranking" className="text-xs uppercase tracking-widest text-gray-400 hover:text-brand-neon font-bold transition-colors flex items-center gap-2">
            <Trophy size={14} /> Ranking
          </Link>
          <Link to="/blog" className="text-xs uppercase tracking-widest text-gray-400 hover:text-brand-neon font-bold transition-colors flex items-center gap-2">
            <BookOpen size={14} /> Blog
          </Link>
        </nav>

        <a
          href={topAds[adIndex].link}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex flex-1 max-w-[420px] h-[38px] rounded-lg bg-brand-neon/10 border border-brand-neon/20 items-center justify-center px-4 hover:bg-brand-neon/20 transition-all overflow-hidden"
        >
          <span className="text-[11px] uppercase font-black tracking-wider text-brand-neon text-center">
            {topAds[adIndex].text}
          </span>
        </a>

        {user ? (
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold">{user.displayName}</p>
              <p className="text-[10px] text-brand-neon font-mono">{user.bestWPM} PPM RECORD</p>
            </div>
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-9 h-9 rounded-full border border-brand-neon shadow-[0_0_10px_rgba(0,255,156,0.2)]"
            />
          </div>
        ) : (
          <button
            onClick={onLogin}
            className="bg-white text-black px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 hover:bg-brand-neon transition-colors shrink-0"
          >
            <LogIn size={16} /> <span className="hidden sm:inline">ENTRAR COM GOOGLE</span>
          </button>
        )}
      </div>
    </header>
  );
};
