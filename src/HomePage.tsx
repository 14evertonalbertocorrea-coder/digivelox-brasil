
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
    "url": "https://digivelox.com.br",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://digivelox.com.br/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="flex flex-1 min-h-[calc(100vh-100px)]">
      <SEOMeta 
        title="Teste de Digitação Online Grátis | Velocidade e PPM | DigiVelox" 
        description="O melhor teste de digitação do Brasil. Meça seu PPM, precisão e velocidade online gratuitamente. Melhore no teclado com o DigiVelox Brasil."
        keywords="teste de digitação, digitar rápido, velocidade de digitação, ppm teclado, treino de teclado online"
      />
      <JSONLD data={seoData} />
      {/* Left Sidebar - Rankings */}
      <aside className="hidden lg:flex w-[240px] bg-bg-surface border-r border-white/5 p-6 flex-col gap-6">
        <div className="space-y-4">
          <h3 className="text-brand-neon text-xs font-black uppercase tracking-widest italic">Ranking Diário</h3>
          <div className="space-y-3">
            {[
              { name: 'velox_ninja', ppm: 142 },
              { name: 'gabi_keys', ppm: 128 },
              { name: 'flash_br', ppm: 115 },
            ].map((r, i) => (
              <div key={i} className={cn(
                "flex justify-between items-center text-sm p-3 rounded transition-colors",
                i === 0 ? "bg-white/5 border-l-2 border-brand-neon" : "text-gray-400"
              )}>
                <span className="font-medium truncate mr-2">{i+1}. {r.name}</span>
                <span className={cn("font-mono", i === 0 ? "text-brand-neon" : "text-gray-500")}>{r.ppm}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto p-4 bg-brand-neon/5 border border-brand-neon/20 rounded-lg text-center">
          <span className="text-[10px] text-gray-500 uppercase block mb-3 font-bold tracking-widest">Patrocinado</span>
          <div className="w-full aspect-square bg-[#1A1D23] rounded flex items-center justify-center text-gray-700 text-[10px] font-bold text-center px-2">
            ESPAÇO ADSENSE 200x200
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-neon/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] -ml-64 -mb-64" />
        
        <TypingArea onFinish={handleFinish} />
        
        <div className="mt-20 w-full max-w-4xl space-y-16">
          <section className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-black italic uppercase tracking-tight text-brand-neon">Como fazer o Teste de Digitação Online?</h2>
            <p className="text-gray-400">
              Para iniciar seu <strong>teste de velocidade de digitação</strong>, basta começar a digitar o texto exibido acima. 
              Nosso medidor de PPM (Palavras por Minuto) começará a contar automaticamente. O DigiVelox é a ferramenta ideal 
              para quem busca <strong>como digitar rápido</strong> e com precisão cirúrgica.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4 italic uppercase">O que é PPM na digitação?</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                PPM significa "Palavras por Minuto". É a métrica padrão ouro para medir a <strong>velocidade de digitação</strong>. 
                Uma média de 40 PPM é considerada normal, enquanto acima de 60 PPM é excelente para profissionais.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 italic uppercase">Dicas para Digitar Rápido</h3>
              <ul className="text-sm text-gray-400 space-y-2 list-disc pl-5">
                <li>Mantenha a postura ereta e os pés no chão.</li>
                <li>Não olhe para o teclado enquanto digita.</li>
                <li>Use os 10 dedos para cobrir todas as teclas.</li>
                <li>Pratique pelo menos 15 minutos todos os dias.</li>
              </ul>
            </div>
          </section>

          <BlogSection />

          <section className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h2 className="text-2xl font-black italic mb-8 uppercase text-center">FAQ - Perguntas Frequentes</h2>
            <div className="space-y-6">
              {[
                { q: 'O teste de digitação do DigiVelox é grátis?', a: 'Sim! Nosso teste é 100% gratuito e você pode testar sua velocidade PPM quantas vezes quiser.' },
                { q: 'Quanto tempo dura o teste de velocidade?', a: 'Você pode escolher entre modos de 15s, 30s ou 60s para medir sua cadência rítmica.' },
                { q: 'Como apareço no ranking de digitação?', a: 'Basta fazer login e completar um teste para salvar sua melhor pontuação no ranking geral brasileiro.' }
              ].map((faq, i) => (
                <div key={i} className="border-b border-white/5 pb-4">
                  <h4 className="font-bold text-brand-neon mb-2">Q: {faq.q}</h4>
                  <p className="text-sm text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Right Sidebar - Blog Tips & Ads */}
      <aside className="hidden xl:flex w-[300px] bg-bg-surface border-l border-white/5 p-6 flex-col gap-6">
        <div className="p-5 bg-gradient-to-br from-brand-neon/10 to-transparent border border-brand-neon/20 rounded-xl group cursor-pointer hover:border-brand-neon/40 transition-colors">
          <h4 className="text-sm font-black text-brand-neon mb-2 uppercase italic tracking-tight">Dica de Desempenho</h4>
          <p className="text-xs text-gray-400 mb-4 leading-relaxed">
            Mantenha os punhos levemente elevados e paralelos ao teclado para evitar fadiga e aumentar sua cadência em até 20%.
          </p>
          <a href="/blog" className="text-[10px] font-black underline text-white hover:text-brand-neon transition-colors uppercase tracking-widest">
            LER ARTIGO COMPLETO
          </a>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-800 rounded-xl p-4 bg-black/20">
          <span className="text-gray-600 text-[10px] uppercase font-bold mb-4 tracking-[0.2em]">Ads Side (160x600)</span>
          <div className="w-full h-full bg-[#1A1D23] rounded flex flex-col items-center justify-center text-gray-800 italic font-black text-center p-4">
            <span className="text-xl mb-2">BANNER</span>
            <span className="text-3xl">GOOGLE</span>
            <span className="text-xl mt-2 text-gray-700">ADSENSE</span>
          </div>
        </div>
      </aside>

      <AnimatePresence>
        {showResults && lastStats && (
          <ResultsModal 
            stats={lastStats} 
            onRestart={() => {
              setShowResults(false);
              setLastStats(null);
              // Instead of full reload, we'll let the user simply click again 
              // but to ensure the typing area resets, a quick reload is actually 
              // better UX for a game to clear all internal buffers.
              window.location.reload();
            }}
            onShare={() => {}}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
