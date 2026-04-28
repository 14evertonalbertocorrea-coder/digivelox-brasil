
import React from 'react';
import { Link } from 'react-router-dom';
import { Keyboard, Trophy, BookOpen, User as UserIcon, LogIn } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogin }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-neon/10 bg-bg-surface backdrop-blur-lg">
      <div className="container mx-auto px-8 h-[60px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-brand-neon rounded flex items-center justify-center text-bg-main font-black text-xl italic group-hover:scale-110 transition-transform">
            DV
          </div>
          <span className="text-2xl heading-italic text-brand-neon">
            DIGIVELOX <span className="text-white">BRASIL</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
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

        <div className="flex items-center gap-6">
          <div className="hidden xl:block text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            Publicidade 728x90
          </div>
          {user ? (
            <div className="flex items-center gap-4">
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
              className="bg-white text-black px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 hover:bg-brand-neon transition-colors"
            >
              <LogIn size={16} /> ENTRAR COM GOOGLE
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
