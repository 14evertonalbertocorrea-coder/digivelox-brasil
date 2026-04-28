
import React, { useState } from 'react';
import { PlusCircle, Trash2, Save, FileText } from 'lucide-react';
import { TYPING_TEXTS } from './constants';

export const AdminPage: React.FC = () => {
  const [texts, setTexts] = useState<string[]>(TYPING_TEXTS);
  const [newText, setNewText] = useState('');

  const handleAdd = () => {
    if (newText.trim()) {
      setTexts([...texts, newText]);
      setNewText('');
      alert('Texto adicionado com sucesso! (Simulação)');
    }
  };

  const handleRemove = (index: number) => {
    setTexts(texts.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Save className="text-brand-neon" /> Painel de Controle
        </h1>
        <p className="text-gray-500">Gerencie os textos do sistema DigiVelox.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <PlusCircle size={20} className="text-brand-neon" /> Adicionar Novo Texto
            </h3>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-brand-neon min-h-[150px] mb-4"
              placeholder="Digite aqui o novo parágrafo de teste..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <button onClick={handleAdd} className="btn-neon w-full">Publicar no Sistema</button>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs">Textos Atuais ({texts.length})</h3>
            {texts.map((text, i) => (
              <div key={i} className="glass-card p-4 flex gap-4 items-start group">
                <FileText className="text-gray-600 mt-1 shrink-0" size={20} />
                <p className="text-sm text-gray-300 flex-1">{text}</p>
                <button 
                  onClick={() => handleRemove(i)}
                  className="text-gray-600 hover:text-brand-danger transition-colors p-2"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6 bg-brand-neon/5 border-brand-neon/20">
            <h3 className="font-bold mb-2">Dica de Admin</h3>
            <p className="text-sm text-gray-400">
              Textos entre 150 e 250 caracteres são ideais para o modo de 15s. 
              Para 60s, prefira textos com mais de 500 caracteres.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
