
import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

export const BlogSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h2 className="text-4xl heading-italic mb-3">Blog <span className="text-brand-neon">DigiVelox</span></h2>
          <p className="text-gray-400 text-sm max-w-xl">
            Técnicas avançadas dos pilotos mais rápidos do mundo.
          </p>
        </div>
        <Link to="/blog" className="text-xs font-black text-brand-neon hover:underline flex items-center gap-2 uppercase tracking-widest transition-all">
          Ver todos os artigos <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BLOG_POSTS.slice(0, 6).map((post, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:border-brand-neon/30 transition-colors"
          >
            <Link to={`/blog/${post.slug}`} className="block">
              <div className="aspect-video bg-bg-surface relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-bg-main to-transparent opacity-60" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3 italic">
                  <span className="flex items-center gap-1 text-brand-neon"><Clock size={10} /> {post.createdAt}</span>
                  <span className="flex items-center gap-1"><User size={10} /> Equipe Velox</span>
                </div>
                
                <h3 className="text-lg font-black leading-tight mb-3 group-hover:text-brand-neon transition-colors italic uppercase">
                  {post.title}
                </h3>
                
                <p className="text-gray-400 text-xs mb-6 line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center gap-2 text-brand-neon text-[10px] font-black group-hover:translate-x-1 transition-transform uppercase tracking-widest">
                  Ler Artigo <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
