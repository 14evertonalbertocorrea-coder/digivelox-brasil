import React, { useEffect, useState } from 'react';

export const MouseTestPage: React.FC = () => {
  const [leftClick, setLeftClick] = useState(0);
  const [rightClick, setRightClick] = useState(0);
  const [middleClick, setMiddleClick] = useState(0);
  const [backClick, setBackClick] = useState(0);
  const [forwardClick, setForwardClick] = useState(0);
  const [scrollCount, setScrollCount] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [deviceType, setDeviceType] = useState('Mouse Detectado');

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) setLeftClick((v) => v + 1);
      if (e.button === 1) setMiddleClick((v) => v + 1);
      if (e.button === 2) setRightClick((v) => v + 1);
      if (e.button === 3) setBackClick((v) => v + 1);
      if (e.button === 4) setForwardClick((v) => v + 1);
    };

    const handleWheel = () => {
      setScrollCount((v) => v + 1);
    };

    const handleMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    const handleContext = (e: MouseEvent) => {
      e.preventDefault();
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('contextmenu', handleContext);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('contextmenu', handleContext);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-14">
      <h1 className="text-5xl md:text-6xl font-black italic uppercase text-center mb-4">
        TESTE DE <span className="text-brand-neon">MOUSE</span> ONLINE
      </h1>

      <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
        Verifique todos os botões do seu mouse, scroll, clique lateral e rastreamento em tempo real.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        <div className="glass-card p-6 text-center">
          <p className="text-xs uppercase text-gray-500 font-black mb-2">Clique Esquerdo</p>
          <p className="text-4xl font-black text-brand-neon">{leftClick}</p>
        </div>

        <div className="glass-card p-6 text-center">
          <p className="text-xs uppercase text-gray-500 font-black mb-2">Clique Direito</p>
          <p className="text-4xl font-black text-red-400">{rightClick}</p>
        </div>

        <div className="glass-card p-6 text-center">
          <p className="text-xs uppercase text-gray-500 font-black mb-2">Botão Meio</p>
          <p className="text-4xl font-black text-blue-400">{middleClick}</p>
        </div>

        <div className="glass-card p-6 text-center">
          <p className="text-xs uppercase text-gray-500 font-black mb-2">Scroll</p>
          <p className="text-4xl font-black text-purple-400">{scrollCount}</p>
        </div>

        <div className="glass-card p-6 text-center">
          <p className="text-xs uppercase text-gray-500 font-black mb-2">Botão Voltar</p>
          <p className="text-4xl font-black text-yellow-400">{backClick}</p>
        </div>

        <div className="glass-card p-6 text-center">
          <p className="text-xs uppercase text-gray-500 font-black mb-2">Botão Avançar</p>
          <p className="text-4xl font-black text-cyan-400">{forwardClick}</p>
        </div>

        <div className="glass-card p-6 text-center">
          <p className="text-xs uppercase text-gray-500 font-black mb-2">Posição X</p>
          <p className="text-3xl font-black text-white">{mouseX}</p>
        </div>

        <div className="glass-card p-6 text-center">
          <p className="text-xs uppercase text-gray-500 font-black mb-2">Posição Y</p>
          <p className="text-3xl font-black text-white">{mouseY}</p>
        </div>
      </div>

      <div className="glass-card p-10 text-center">
        <img
          src="/mouse-banner.webp"
          alt="mouse test"
          className="mx-auto w-[280px] mb-6 rounded-2xl border border-brand-neon/20"
        />

        <p className="text-brand-neon uppercase font-black tracking-widest mb-2">
          {deviceType}
        </p>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Clique em qualquer botão do mouse, use o scroll e movimente o cursor para verificar se todos os sensores e botões estão respondendo corretamente.
        </p>
      </div>
    </div>
  );
};
