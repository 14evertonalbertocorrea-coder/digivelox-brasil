import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './HomePage';
import { RankingPage } from './RankingPage';
import { LandingPage } from './LandingPage';
import { BlogPostPage } from './BlogPostPage';
import { MouseTestPage } from './MouseTestPage.tsx';
import { User } from './types';
import { dbService } from './services/db';
import { AdminPage } from './AdminPage';

const SITE_URL = 'https://digiveloxbr.vercel.app';

function SeoUpdater() {
  const location = useLocation();

  useEffect(() => {
    const seoMap: Record<string, { title: string; description: string }> = {
      '/': {
        title: 'Teste de Digitação Online Grátis | DigiVelox Brasil',
        description: 'Faça um teste de digitação online grátis e descubra sua velocidade em palavras por minuto, precisão e erros.',
      },
      '/ranking': {
        title: 'Ranking de Digitação Online | DigiVelox Brasil',
        description: 'Veja o ranking dos melhores resultados no teste de digitação online do DigiVelox Brasil.',
      },
      '/teste-mouse': {
        title: 'Teste de Mouse Online Grátis | DigiVelox Brasil',
        description: 'Teste os botões do mouse online grátis. Verifique clique esquerdo, direito, scroll, botão do meio e botões laterais.',
      },
      '/teste-digitacao-online': {
        title: 'Teste de Digitação Online Grátis em Português',
        description: 'Teste sua velocidade de digitação online em português e descubra seu PPM agora.',
      },
      '/teste-ppm': {
        title: 'Teste PPM Online | Palavras por Minuto',
        description: 'Meça suas palavras por minuto com um teste PPM online rápido, gratuito e fácil.',
      },
      '/treino-teclado': {
        title: 'Treino de Teclado Online para Digitar Mais Rápido',
        description: 'Treine sua digitação no teclado com exercícios online e melhore sua velocidade.',
      },
      '/curso-digitacao': {
        title: 'Curso de Digitação Online Grátis | DigiVelox Brasil',
        description: 'Aprenda a digitar melhor com treino online, dicas práticas e teste de velocidade.',
      },
    };

    const data = seoMap[location.pathname] || seoMap['/'];
    const canonicalUrl = `${SITE_URL}${location.pathname}`;

    document.title = data.title;

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    const setProperty = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', canonicalUrl);

    setMeta('description', data.description);
    setMeta('robots', 'index, follow');
    setMeta('language', 'pt-BR');

    setProperty('og:title', data.title);
    setProperty('og:description', data.description);
    setProperty('og:url', canonicalUrl);
    setProperty('og:type', 'website');
    setProperty('og:locale', 'pt_BR');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', data.title);
    setMeta('twitter:description', data.description);
  }, [location.pathname]);

  return null;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const savedUser = await dbService.getUser();
      if (savedUser) setUser(savedUser);
    };

    fetchUser();
  }, []);

  const handleLogin = async () => {
    const loggedUser = await dbService.loginWithGoogle();
    setUser(loggedUser);
  };

  return (
    <BrowserRouter>
      <SeoUpdater />

      <div className="min-h-screen flex flex-col bg-[#070b12] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-120px] left-[10%] w-[500px] h-[500px] bg-brand-neon/10 rounded-full blur-[140px]" />
          <div className="absolute top-[30%] right-[-120px] w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-150px] left-[35%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,156,0.03),transparent_60%)]" />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col">
          <Header user={user} onLogin={handleLogin} />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage user={user} />} />
              <Route path="/ranking" element={<RankingPage />} />
              <Route path="/blog" element={<HomePage user={user} />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/teste-mouse" element={<MouseTestPage />} />
              <Route path="/teste-digitacao-online" element={<LandingPage />} />
              <Route path="/teste-ppm" element={<LandingPage />} />
              <Route path="/treino-teclado" element={<LandingPage />} />
              <Route path="/curso-digitacao" element={<LandingPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
