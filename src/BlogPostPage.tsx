
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS } from './constants';
import { SEOMeta, JSONLD } from './components/SEOMeta';
import { ArrowLeft, Clock, User, Share2 } from 'lucide-react';
import { BlogSection } from './components/BlogSection';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) return <div className="p-20 text-center">Post não encontrado.</div>;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": "DigiVelox Brasil"
    },
    "datePublished": post.createdAt,
    "image": "https://images.unsplash.com/photo-1587829741301-dc798b83bac?q=80&w=2070&auto=format&fit=crop"
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <SEOMeta title={`${post.title} | DigiVelox`} description={post.excerpt} />
      <JSONLD data={schemaData} />

      <Link to="/" className="text-brand-neon flex items-center gap-2 mb-8 hover:underline">
        <ArrowLeft size={16} /> Voltar para o Teste
      </Link>

      <article className="glass-card p-8 md:p-12 mb-12">
        <header className="mb-10">
          <div className="flex items-center gap-4 text-xs text-gray-500 uppercase tracking-widest mb-4">
            <span className="flex items-center gap-1"><Clock size={14} /> {post.createdAt}</span>
            <span className="flex items-center gap-1"><User size={14} /> Equipe DigiVelox</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-gray-400 italic leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-loose space-y-6">
          <p>{post.content}</p>
          <p>
            A digitação rápida é uma das habilidades mais valiosas no mercado de trabalho atual. 
            Seja você um programador, um escritor ou um estudante, ser capaz de transcrever seus 
            pensamentos para o computador com velocidade e precisão pode economizar centenas de horas ao longo de um ano.
          </p>
          <h2 className="text-2xl font-bold text-white mt-10 mb-4">FAQ: Perguntas Frequentes</h2>
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="font-bold text-brand-neon">Qual o PPM médio em português?</h3>
              <p className="text-sm">A média gira em torno de 40 PPM para usuários comuns.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="font-bold text-brand-neon">Como treinar digitação de graça?</h3>
              <p className="text-sm">Você pode usar plataformas como o DigiVelox Brasil para treinos diários gratuitos.</p>
            </div>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
          <div className="flex gap-4">
            <button className="btn-outline flex items-center gap-2 py-2 text-sm">
              <Share2 size={16} /> Compartilhar Artigo
            </button>
          </div>
          <Link to="/" className="btn-neon py-2 text-sm">
            Fazer Teste de Digitação
          </Link>
        </footer>
      </article>

      <BlogSection />
    </div>
  );
};
