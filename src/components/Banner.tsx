import React from 'react';

interface BannerProps {
  titulo: string;
  descricao: string;
  botoes?: {
    texto: string;
    link: string;
    variante: 'primario' | 'secundario' | 'terciario';
  }[];
}

const Banner: React.FC<BannerProps> = ({ titulo, descricao, botoes }) => {
  return (
    <div className="rounded-2xl overflow-hidden relative bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="absolute inset-0 bg-cover bg-center opacity-20 rounded-2xl" style={{ backgroundImage: "url('/images/logo-sabara.png')" }}></div>
      <div className="px-8 py-20 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{titulo}</h1>
          <p className="text-lg mb-8">{descricao}</p>
          {botoes && botoes.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {botoes.map((botao, index) => (
                <a 
                  key={index} 
                  href={botao.link} 
                  className={`px-8 py-3 rounded-md font-medium transition-colors flex-1 text-center ${
                    botao.variante === 'primario' ? 'bg-sabara-blue text-white hover:bg-blue-600' : 
                    botao.variante === 'secundario' ? 'bg-sabara-red text-white hover:bg-red-600' :
                    'bg-sabara-green text-white hover:bg-green-600'
                  }`}
                >
                  {botao.texto}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
