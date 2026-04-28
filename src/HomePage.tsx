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
    "url": "https://14evertonalbertocorrea-coder-digive.vercel.app",
    "description": "Teste de digitação online grátis para medir palavras por minuto, precisão e velocidade no teclado.",
    "inLanguage": "pt-BR",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://14evertonalbertocorrea-coder-digive.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
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

      {/* Left Sidebar */}
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

       <div className="mt-auto p-4 bg-gradient-to-br from-brand-neon/10 to-black border border-brand-neon/20 rounded-lg text-center hover:border-brand-neon/40 transition-all">
  <span className="text-[10px] text-brand-neon uppercase block mb-3 font-bold tracking-widest">Oferta Recomendada</span>
  
  <a 
    href="https://s.shopee.com.br/5Aouf22y52" 
    target="_blank" 
    rel="noopener noreferrer"
    className="block"
  >
    <div className="w-full aspect-square bg-[#1A1D23] rounded flex flex-col items-center justify-center text-center px-3 hover:scale-105 transition-transform">
      <span className="text-4xl mb-2">⌨️</span>
      <span className="text-sm font-black text-white leading-tight">TECLADOS PARA DIGITAR MAIS RÁPIDO</span>
      <span className="text-[11px] text-brand-neon mt-2 font-bold">VER OFERTAS NA SHOPEE</span>
    </div>
  </a>
</div>

      {/* Main */}
      <main className="flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-neon/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] -ml-64 -mb-64" />

        <TypingArea onFinish={handleFinish} />

        <div className="mt-20 w-full max-w-4xl space-y-16">
          <section className="prose prose-invert max-w-none">
            <h2 className="text-3xl font-black italic uppercase tracking-tight text-brand-neon">Como fazer o Teste de Digitação Online?</h2>
            <p className="text-gray-400">
              O <strong>teste de digitação online grátis</strong> do DigiVelox Brasil foi criado para medir sua
              <strong> velocidade de digitação</strong>, sua precisão no teclado e a quantidade de
              <strong> palavras por minuto (PPM)</strong> que você consegue atingir. Basta começar a digitar o texto
              exibido acima e o cronômetro iniciará automaticamente.
            </p>
            <p className="text-gray-400 mt-4">
              Se você procura <strong>como digitar rápido</strong>, melhorar seu desempenho em concursos,
              escritório, home office ou simplesmente deseja treinar seu teclado, esta ferramenta é ideal.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-xl font-bold mb-4 italic uppercase">O que é PPM na digitação?</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                PPM significa Palavras por Minuto. Essa é a principal métrica usada para medir a
                <strong> velocidade de digitação online</strong>. Usuários iniciantes costumam atingir entre 20 e 40 PPM,
                enquanto digitadores profissionais passam de 60 ou até 100 PPM.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 italic uppercase">Dicas para Digitar Mais Rápido</h3>
              <ul className="text-sm text-gray-400 space-y-2 list-disc pl-5">
                <li>Use os dez dedos corretamente.</li>
                <li>Evite olhar para o teclado.</li>
                <li>Mantenha postura reta.</li>
                <li>Treine todos os dias por pelo menos 15 minutos.</li>
                <li>Repita testes de PPM semanalmente.</li>
              </ul>
            </div>
          </section>

          <section className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h2 className="text-2xl font-black italic mb-6 uppercase text-center text-brand-neon">
              Por que fazer treino de digitação online?
            </h2>
            <p className="text-gray-400 leading-relaxed text-center">
              O treino de digitação online melhora produtividade, reduz erros, acelera tarefas administrativas,
              aumenta desempenho em trabalhos digitais e ajuda qualquer pessoa a escrever com mais fluidez no computador.
              Quanto maior seu PPM, maior sua eficiência.
            </p>
          </section>

          <BlogSection />

          <section className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h2 className="text-2xl font-black italic mb-8 uppercase text-center">FAQ - Perguntas Frequentes</h2>
            <div className="space-y-6">
              {[
                { q: 'O teste de digitação é grátis?', a: 'Sim. Você pode usar o teste de digitação online gratuitamente quantas vezes quiser.' },
                { q: 'Como medir meu PPM?', a: 'Ao finalizar o teste o DigiVelox calcula automaticamente suas palavras por minuto, precisão e erros.' },
                { q: 'Treinar digitação realmente funciona?', a: 'Sim. A repetição diária aumenta memória muscular e velocidade no teclado.' }
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

      {/* Right Sidebar */}
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

        <div className="flex-1 flex flex-col items-center justify-center border border-brand-neon/20 rounded-xl p-4 bg-gradient-to-b from-black to-[#111] hover:border-brand-neon/50 transition-all">
  <span className="text-brand-neon text-[10px] uppercase font-bold mb-4 tracking-[0.2em]">RECOMENDADO PARA ALTO PPM</span>

  <a 
    href="https://s.shopee.com.br/5Aouf22y52" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-full h-full"
  >
    <div className="w-full h-full rounded flex flex-col items-center justify-center text-center p-4 hover:scale-[1.02] transition-transform">
      <span className="text-6xl mb-4">⌨️</span>
      <span className="text-xl text-white font-black mb-2">MELHORES TECLADOS MECÂNICOS</span>
      <span className="text-sm text-gray-400 mb-4">Mais conforto, precisão e velocidade para aumentar seu PPM</span>
      <span className="px-4 py-2 bg-brand-neon/20 border border-brand-neon text-brand-neon rounded-lg font-bold text-sm">
        VER PROMOÇÕES SHOPEE
      </span>
    </div>
  </a>
</div>

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
