
import React from 'react';
import { Github, Twitter, Instagram, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="h-[40px] bg-black/50 border-t border-white/5 flex items-center justify-between px-8 text-[10px] font-medium text-gray-500">
      <div>&copy; 2026 DIGIVELOX BRASIL - O TESTE DE DIGITAÇÃO NÚMERO 1</div>
      <div className="flex gap-4">
        <a href="#" className="hover:text-white uppercase">Termos</a>
        <a href="#" className="hover:text-white uppercase">Privacidade</a>
        <a href="#" className="hover:text-white uppercase">Contato</a>
        <a href="#" className="hover:text-white text-brand-neon uppercase font-bold">Desafiar Amigo</a>
      </div>
    </footer>
  );
};
