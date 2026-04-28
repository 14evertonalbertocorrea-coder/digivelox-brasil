
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SEO_LANDING_PAGES } from './constants';
import { SEOMeta, JSONLD } from './components/SEOMeta';
import { TypingArea } from './components/TypingArea';
import { BlogSection } from './components/BlogSection';

export const LandingPage: React.FC = () => {
  const { pathname } = useLocation();
  const page = SEO_LANDING_PAGES.find(p => p.path === pathname) || SEO_LANDING_PAGES[0];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.title,
    "description": page.description,
    "url": `https://digivelox.com.br${page.path}`
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <SEOMeta title={page.title} description={page.description} />
      <JSONLD data={schemaData} />

      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-none italic uppercase">
          {page.title.split('|')[0]}
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          {page.description} Melhore sua performance com o medidor de velocidade mais preciso do Brasil.
        </p>
      </section>

      <TypingArea onFinish={() => {}} />

      <div className="mt-20 max-w-4xl mx-auto prose prose-invert">
        <h2 className="text-3xl font-bold text-brand-neon mb-6 italic">Por que usar o DigiVelox para seu {page.title.split('|')[0]}?</h2>
        <p>
          O DigiVelox Brasil é otimizado para o idioma português, garantindo que as palavras e frases 
          sejam familiares e úteis para o seu dia a dia profissional. Nossa tecnologia permite que você 
          identifique erros comuns e melhore sua cadência rítmica no teclado.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
          <div className="glass-card p-6 border-white/5">
            <h3 className="text-white font-bold mb-2">100% Gratuito</h3>
            <p className="text-sm text-gray-400">Acesse todos os recursos sem pagar nada. Treine quanto quiser e suba no ranking global.</p>
          </div>
          <div className="glass-card p-6 border-white/5">
            <h3 className="text-white font-bold mb-2">Otimizado para Mobile</h3>
            <p className="text-sm text-gray-400">Funciona perfeitamente em tablets e celulares para você treinar onde estiver.</p>
          </div>
        </div>
      </div>

      <BlogSection />
    </div>
  );
};
