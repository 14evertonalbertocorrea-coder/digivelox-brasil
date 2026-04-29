import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { TypingArea } from './components/TypingArea';
import { ResultsModal } from './components/ResultsModal';
import { BlogSection } from './components/BlogSection';
import { AffiliateRotator } from './components/AffiliateRotator';
import { TypingStats, User, RankingEntry } from './types';
import { dbService } from './services/db';
import { cn } from './lib/utils';
import { SEOMeta, JSONLD } from './components/SEOMeta';

export const HomePage: React.FC<{ user: User | null }> = ({ user }) => {
  const [showResults, setShowResults] = useState(false);
  const [lastStats, setLastStats] = useState<TypingStats | null>(null);

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
    }
  };

  const seoData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "DigiVelox Brasil",
    "alternateName": "Teste de Digitação Online",
    "url": "https://digiveloxbr.vercel.app",
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

      <aside className="hidden lg:flex w-[240px] bg-bg-surface border-r border-white/5 p-6 flex-col gap-6">
        <div className="space-y-4">
          <h3 className="text-brand-neon text-xs font-black uppercase tracking-widest italic">
            Ranking Diário
          </h3>

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
                <span className="font-mono">{r.ppm}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <AffiliateRotator />
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
        <TypingArea onFinish={handleFinish} />

        {/* Banner mobile */}
        <div className="block xl:hidden w-full max-w-md mt-10">
          <AffiliateRotator />
        </div>

        <div className="mt-20 w-full max-w-4xl space-y-16">
          <section className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-black italic uppercase tracking-tight text-brand-neon">
              Como fazer o Teste de Digitação Online?
            </h2>

            <p className="text-gray-400">
              O teste de digitação online grátis do DigiVelox Brasil mede sua velocidade,
              precisão e palavras por minuto. Comece a digitar, acompanhe seu PPM e tente
              superar seu próprio recorde.
            </p>
          </section>

          <BlogSection />
        </div>
      </main>

      <aside className="hidden xl:flex w-[300px] bg-bg-surface border-l border-white/5 p-6 flex-col gap-6">
        <div className="p-5 bg-gradient-to-br from-brand-neon/10 to-transparent border border-brand-neon/20 rounded-xl">
          <h4 className="text-sm font-black text-brand-neon mb-2 uppercase italic tracking-tight">
            Dica de Desempenho
          </h4>

          <p className="text-xs text-gray-400 mb-4 leading-relaxed">
            Mantenha os punhos levemente elevados e pratique diariamente para ganhar mais velocidade.
          </p>

          <a
            href="/blog"
            className="text-[10px] font-black underline text-white hover:text-brand-neon transition-colors uppercase tracking-widest"
          >
            LER ARTIGO COMPLETO
          </a>
        </div>

        <AffiliateRotator />
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
