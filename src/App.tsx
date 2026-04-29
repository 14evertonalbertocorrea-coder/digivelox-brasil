import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './HomePage';
import { RankingPage } from './RankingPage';
import { LandingPage } from './LandingPage';
import { BlogPostPage } from './BlogPostPage';
import { MouseTestPage } from './Mouse';
import { User } from './types';
import { dbService } from './services/db';
import { AdminPage } from './AdminPage';

const SITE_URL = 'https://digiveloxbr.vercel.app';

function SeoUpdater() {
  const location = useLocation();

  useEffect(() => {
    document.title = 'DigiVelox Brasil';
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
      <div className="min-h-screen flex flex-col bg-[#070b12] text-white">
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
    </BrowserRouter>
  );
}
