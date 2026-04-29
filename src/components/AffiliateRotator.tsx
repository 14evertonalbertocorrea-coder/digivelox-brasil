import React, { useEffect, useState } from 'react';
import { ShoppingCart, Zap } from 'lucide-react';

const products = [
  {
    title: 'Teclado para Digitar Melhor',
    description: 'Mais conforto, precisão e velocidade para aumentar seu PPM.',
    image: '/teclado-banner.webp',
    link: 'https://s.shopee.com.br/5Aouf22y52',
    label: 'Oferta teclado'
  },
  {
    title: 'Mouse Gamer para Setup',
    description: 'Melhore seu controle e deixe seu setup mais completo.',
    image: '/mouse-banner.webp',
    link: 'https://s.shopee.com.br/2g7aayvHrR',
    label: 'Oferta mouse'
  },
  {
    title: 'Cadeira Gamer Confortável',
    description: 'Mais conforto para estudar, trabalhar e treinar por mais tempo.',
    image: '/cadeira-banner.webp',
    link: 'https://s.shopee.com.br/7fWGYD6JMT',
    label: 'Oferta cadeira'
  }
];

export const AffiliateRotator: React.FC = () => {
  const [index, setIndex] = useState(0);
  const product = products[index];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % products.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-neon/20 bg-[#070b12]/90 hover:border-brand-neon/50 transition-all shadow-[0_0_30px_rgba(0,255,156,0.05)]">
      <div className="absolute top-[-60px] right-[-60px] w-40 h-40 bg-brand-neon/10 rounded-full blur-[70px]" />

      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative"
      >
        <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-black/70 border border-brand-neon/20 flex items-center gap-1">
          <Zap size={12} className="text-brand-neon" />
          <span className="text-[9px] uppercase tracking-widest text-brand-neon font-black">
            Oferta gamer
          </span>
        </div>

        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[180px] object-cover"
        />

        <div className="p-5 text-center">
          <span className="text-[10px] uppercase tracking-[0.25em] text-brand-neon font-black">
            {product.label}
          </span>

          <h3 className="text-2xl font-black text-white leading-tight mt-3 mb-3">
            {product.title}
          </h3>

          <p className="text-xs text-gray-400 mb-5 leading-relaxed">
            {product.description}
          </p>

          <div className="bg-brand-neon text-black rounded-xl px-4 py-4 font-black text-sm flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform shadow-[0_0_18px_rgba(0,255,156,0.18)]">
            <ShoppingCart size={16} />
            VER OFERTA NA SHOPEE
          </div>

          <div className="flex justify-center gap-2 mt-5">
            {products.map((_, dotIndex) => (
              <span
                key={dotIndex}
                className={`rounded-full transition-all ${
                  dotIndex === index
                    ? 'w-3 h-3 bg-brand-neon shadow-[0_0_8px_rgba(0,255,156,0.4)]'
                    : 'w-2 h-2 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </a>
    </div>
  );
};
