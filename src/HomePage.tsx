import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { TypingArea } from './components/TypingArea';
import { ResultsModal } from './components/ResultsModal';
import { BlogSection } from './components/BlogSection';
import { TypingStats, User, RankingEntry } from './types';
import { dbService } from './services/db';
import { cn } from './lib/utils';
import { SEOMeta, JSONLD } from './components/SEOMeta';

export const HomePage: React.FC<{ user: User | null }> = ({ user }) => {
  const [showResults, setShowResults] = useState(false);
  const [lastStats, setLastStats] = useState<TypingStats | null>(null);

  const affiliateLink = "https://s.shopee.com.br/5Aouf22y52";

  const handleFinish = async (stats: TypingStats) => {
    setLastStats(stats);
    setShowResults(true);

    if (user) {
      const entry: RankingEntry = {
        userId: user.uid,
        userName: user.displayName,
        userPhoto: user.photoURL,
        wpm: stats.wpm,
        accuracy: stats.accuracy,
        mode: '30s',
        timestamp: Date.now()
      };
      await dbService.addRanking(entry);

      if (stats.wpm > user.bestWPM) {
        const updatedUser = { ...user, bestWPM: stats.wpm };
        await dbService.saveUser(updatedUser);
      }
    }
  };

  const seoData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DigiVelox Brasil",
    "alternateName": "Teste de Digitação Online",
    "url": "https://14evertonalbertocorrea-coder-digive.vercel.app",
    "description": "Teste de digitação online grátis para medir palavras por minuto, precisão e velocidade no teclado.",
    "inLanguage": "pt-BR"
  };

  return (
    <div className="flex flex-1 min-h-[calc(100vh-100px)]">
      <SEOMeta
        title="Teste de Digitação Online Grátis em Português | DigiVelox Brasil"
        description="Teste sua velocidade de digitação online grátis. Descubra seu PPM, precisão, erros e treine para digitar mais rápido no teclado."
        keywords="teste de digitação online, teste ppm, palavras por minuto, digitar rápido, treino de digitação, velocidade de digitação, teste de teclado"
      />
      <JSONLD data={seoData} />

      <h1 className="absolute opacity-0 pointer-events-none">
        Teste de Digitação Online Grátis - Descubra sua Velocidade de Digitação e PPM no DigiVelox Brasil
      </h1>

      <aside className="hidden lg:flex w-[240px] bg-bg-surface border-r border-white/5 p-6 flex-col gap-6">
        <div className="space-y-4">
          <h3 className="text-brand-neon text-xs font-black uppercase tracking-widest italic">Ranking Diário</h3>
          <div className="space-y-3">
            {[
              { name: 'velox_ninja', ppm: 142 },
              { name: 'gabi_keys', ppm: 128 },
              { name: 'flash_br', ppm: 115 },
            ].map((r, i) => (
              <div
                key={i}
                className={cn(
                  "flex justify-between items-center text-sm p-3 rounded transition-colors",
                  i === 0 ? "bg-white/5 border-l-2 border-brand-neon" : "text-gray-400"
                )}
              >
                <span className="font-medium truncate mr-2">{i + 1}. {r.name}</span>
                <span className={cn("font-mono", i === 0 ? "text-brand-neon" : "text-gray-500")}>{r.ppm}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto overflow-hidden border border-brand-neon/20 rounded-xl bg-[#0b0e14] hover:border-brand-neon/50 transition-all">
          <a href={affiliateLink} target="_blank" rel="noopener noreferrer" className="block">
            <img
              src="/teclado-banner.webp"
              alt="Teclado mecânico gamer"
              className="w-full h-[150px] object-cover"
            />
            <div className="p-3 text-center">
              <h3 className="text-sm font-black text-white mb-2">TECLADOS PARA DIGITAR MELHOR</h3>
              <div className="bg-brand-neon text-black rounded-lg px-3 py-2 font-black text-xs">
                VER OFERTAS
              </div>
            </div>
          </a>
        </div>
      </aside>

      <main className="flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-neon/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] -ml-64 -mb-64" />

        <TypingArea onFinish={handleFinish} />

        <div className="mt-20 w-full max-w-4xl space-y-16">
          <section className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-black italic uppercase tracking-tight text-brand-neon">
              Como fazer o Teste de Digitação Online?
            </h2>
            <p className="text-gray-400">
              O teste de digitação online grátis do DigiVelox Brasil mede velocidade, precisão e palavras por minuto.
            </p>
          </section>

          <BlogSection />
        </div>
      </main>

      <aside className="hidden xl:flex w-[300px] bg-bg-surface border-l border-white/5 p-6 flex-col gap-6">
        <div className="p-5 bg-gradient-to-br from-brand-neon/10 to-transparent border border-brand-neon/20 rounded-xl">
          <h4 className="text-sm font-black text-brand-neon mb-2 uppercase italic tracking-tight">Dica de Desempenho</h4>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed">
            Mantenha os punhos levemente elevados e pratique diariamente para ganhar até 20% mais velocidade.
          </p>
          <a href="/blog" className="text-[10px] font-black underline text-white hover:text-brand-neon transition-colors uppercase tracking-widest">
            LER ARTIGO COMPLETO
          </a>
        </div>

        <div className="overflow-hidden border border-brand-neon/20 rounded-xl bg-[#0b0e14] hover:border-brand-neon/50 transition-all">
          <a href={affiliateLink} target="_blank" rel="noopener noreferrer" className="block">
            <img
              src="/teclado-banner.webp"
              alt="Teclado gamer para digitação rápida"
              className="w-full h-[170px] object-cover"
            />

            <div className="p-4 text-center">
              <h3 className="text-lg font-black text-white leading-tight mb-2">
                TECLADO IDEAL PARA TREINAR DIGITAÇÃO
              </h3>

              <p className="text-xs text-gray-400 mb-4">
                Mais conforto e velocidade para aumentar seu PPM.
              </p>

              <div className="bg-brand-neon text-black rounded-lg px-4 py-3 font-black text-sm hover:scale-105 transition-transform">
                VER OFERTA NA SHOPEE
              </div>
            </div>
          </a>
        </div>
      </aside>

      <AnimatePresence>
        {showResults && lastStats && (
          <ResultsModal
            stats={lastStats}
            onRestart={() => {
              setShowResults(false);
              setLastStats(null);
              window.location.reload();
            }}
            onShare={() => {}}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
