import React, { useRef } from 'react';
import { motion } from 'motion/react';
import {
  Trophy,
  Share2,
  RefreshCw,
  Download,
  ArrowRight,
  Copy,
  MessageCircle
} from 'lucide-react';
import { TypingStats, BadgeType } from '../types';
import { BADGES, BLOG_POSTS } from '../constants';
import confetti from 'canvas-confetti';
import { domToPng } from 'modern-screenshot';
import { Link } from 'react-router-dom';

interface ResultsModalProps {
  stats: TypingStats;
  onRestart: () => void;
  onShare: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({ stats, onRestart, onShare }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const affiliateLink = "https://s.shopee.com.br/5Aouf22y52";

  const siteUrl = "https://digiveloxbr.vercel.app";
  const challengeUrl = `${siteUrl}?desafio=${stats.wpm}`;

  const shareText = `Acabei de fazer ${stats.wpm} PPM com ${stats.accuracy}% de precisão no DigiVelox Brasil. Duvido você me bater 👇 ${challengeUrl}`;

  React.useEffect(() => {
    if (stats.wpm > 40) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00ffcc', '#ffffff', '#22c55e']
      });
    }
  }, [stats.wpm]);

  const handleDownloadImage = async () => {
    if (modalRef.current) {
      const dataUrl = await domToPng(modalRef.current, {
        backgroundColor: '#0b0e14',
        scale: 2,
      });
      const link = document.createElement('a');
      link.download = `score-digivelox-${stats.wpm}ppm.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleCopyChallenge = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      alert('Desafio copiado! Agora é só mandar para seus amigos.');
    } catch {
      alert('Não foi possível copiar. Tente novamente.');
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Meu resultado no DigiVelox Brasil',
          text: shareText,
          url: challengeUrl,
        });
      } catch {
        return;
      }
    } else {
      handleCopyChallenge();
    }
  };

  const getBadge = (wpm: number): BadgeType => {
    if (wpm >= 100) return 'maquina';
    if (wpm >= 70) return 'ninja';
    if (wpm >= 40) return 'rapido';
    return 'iniciante';
  };

  const getViralPhrase = (wpm: number) => {
    if (wpm < 40) return "Seu teclado pediu socorro 😅";
    if (wpm < 80) return "Você está evoluindo! Bora bater 80 PPM?";
    if (wpm < 120) return "Você já está digitando como um ninja.";
    return "Você humilhou o teclado 🔥";
  };

  const badgeType = getBadge(stats.wpm);
  const badge = BADGES[badgeType];

  const offerTitle =
    stats.wpm < 40
      ? "SEU TECLADO PODE ESTAR TE ATRASANDO"
      : "QUER SUBIR AINDA MAIS SEU PPM?";

  const offerText =
    stats.wpm < 40
      ? "Um teclado mais confortável pode reduzir erros e ajudar você a ganhar velocidade nos próximos testes."
      : "Se você já digita bem, um teclado confortável pode ajudar a manter ritmo, precisão e menos cansaço.";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-start p-4 md:p-8 bg-black/90 backdrop-blur-md overflow-y-auto"
    >
      <div className="max-w-2xl w-full flex flex-col gap-6 py-4">
        <div ref={modalRef} className="glass-card w-full p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-neon/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />

          <div className="mb-6 flex justify-center">
            <div className="bg-brand-neon/20 p-4 rounded-full">
              <Trophy className="text-brand-neon" size={48} />
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-2">🏆 Resultado DigiVelox</h2>

          <p className="text-gray-300 mb-3 italic font-bold">
            "{getViralPhrase(stats.wpm)}"
          </p>

          <p className="text-gray-500 mb-8 text-sm">
            Compartilhe seu resultado e desafie seus amigos.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-white/5 p-4 rounded-xl">
              <p className="text-3xl font-bold text-brand-neon">{stats.wpm}</p>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">PPM</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl">
              <p className="text-3xl font-bold text-blue-400">{stats.accuracy}%</p>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Precisão</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl">
              <p className="text-3xl font-bold text-purple-400">{stats.chars}</p>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Caracteres</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl">
              <p className="text-3xl font-bold text-red-500">{stats.errors}</p>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Erros</p>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 mb-8 flex items-center justify-center gap-6">
            <span className="text-4xl">{badge.icon}</span>
            <div className="text-left">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Medalha Conquistada</p>
              <h3 className={`text-xl font-black uppercase ${badge.color}`}>{badge.name}</h3>
            </div>
          </div>

          <div className="bg-brand-neon/10 border border-brand-neon/30 rounded-2xl p-5 mb-8">
            <p className="text-xs text-brand-neon uppercase font-black tracking-widest mb-2">
              Link de desafio
            </p>
            <p className="text-sm text-gray-300 break-all">
              {challengeUrl}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            <button
              onClick={handleWhatsAppShare}
              className="bg-brand-neon text-black rounded-xl px-4 py-4 font-black text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
            >
              <MessageCircle size={19} /> WhatsApp
            </button>

            <button
              onClick={handleCopyChallenge}
              className="btn-outline flex items-center justify-center gap-2"
            >
              <Copy size={19} /> Copiar Desafio
            </button>

            <button
              onClick={handleNativeShare}
              className="btn-outline flex items-center justify-center gap-2"
            >
              <Share2 size={19} /> Compartilhar
            </button>
          </div>

          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-8 border border-brand-neon/20 rounded-2xl overflow-hidden hover:border-brand-neon/50 transition-all bg-[#0b0e14]"
          >
            <img
              src="/teclado-banner.webp"
              alt="Teclado para digitar mais rápido"
              className="w-full h-[190px] object-cover"
            />
            <div className="p-5">
              <h3 className="text-2xl font-black text-white mb-2">{offerTitle}</h3>
              <p className="text-sm text-gray-400 mb-4">{offerText}</p>
              <div className="bg-brand-neon text-black rounded-lg px-4 py-3 font-black text-sm">
                VER TECLADOS NA SHOPEE
              </div>
            </div>
          </a>

          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={onRestart} className="btn-neon flex items-center gap-2">
              <RefreshCw size={20} /> Tentar Novamente
            </button>

            <button
              onClick={handleDownloadImage}
              className="btn-outline flex items-center gap-2 bg-brand-neon/10 border-brand-neon/30 hover:bg-brand-neon/20"
            >
              <Download size={20} className="text-brand-neon" /> Baixar Score
            </button>

            <button onClick={onShare} className="btn-outline flex items-center gap-2">
              <Share2 size={20} /> Compartilhar Normal
            </button>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Sua pontuação foi salva no ranking global brasileiro.
          </p>
        </div>

        <div className="w-full space-y-4">
          <h3 className="text-xl font-black italic uppercase tracking-tight text-brand-neon text-center mb-6">
            Aumente sua Velocidade
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BLOG_POSTS.slice(0, 2).map((post, i) => (
              <Link
                key={i}
                to={`/blog/${post.slug}`}
                className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between group hover:border-brand-neon/40 transition-colors"
                onClick={onRestart}
              >
                <div className="max-w-[70%]">
                  <h4 className="text-sm font-bold leading-tight group-hover:text-brand-neon transition-colors truncate">
                    {post.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 uppercase mt-1">
                    Dica de Especialista
                  </p>
                </div>

                <ArrowRight size={18} className="text-brand-neon group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
