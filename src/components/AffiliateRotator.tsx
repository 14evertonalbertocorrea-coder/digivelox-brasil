
import React, { useEffect, useState } from 'react';

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
    <div className="overflow-hidden border border-brand-neon/20 rounded-xl bg-[#0b0e14] hover:border-brand-neon/50 transition-all">
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[170px] object-cover"
        />

        <div className="p-4 text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-neon font-black">
            {product.label}
          </span>

          <h3 className="text-lg font-black text-white leading-tight mt-2 mb-2">
            {product.title}
          </h3>

          <p className="text-xs text-gray-400 mb-4">
            {product.description}
          </p>

          <div className="bg-brand-neon text-black rounded-lg px-4 py-3 font-black text-sm">
            VER OFERTA NA SHOPEE
          </div>

          <div className="flex justify-center gap-1 mt-4">
            {products.map((_, dotIndex) => (
              <span
                key={dotIndex}
                className={`w-2 h-2 rounded-full ${
                  dotIndex === index ? 'bg-brand-neon' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </a>
    </div>
  );
};
