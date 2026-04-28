
import React from 'react';

interface AdBannerProps {
  position: 'top' | 'side' | 'bottom' | 'inline';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ position, className }) => {
  return (
    <div className={`bg-white/5 border border-dashed border-white/10 flex items-center justify-center rounded-lg overflow-hidden ${className}`}>
      <div className="text-center p-4">
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Publicidade</p>
        <div className="text-gray-600 font-mono text-xs">Espaço Google Adsense - {position}</div>
      </div>
    </div>
  );
};
