
import React from 'react';
import { Link } from 'react-router-dom';

interface SecaoCTAProps {
  titulo: string;
  descricao: string;
  textoBotao: string;
  link: string;
}

const SecaoCTA: React.FC<SecaoCTAProps> = ({ titulo, descricao, textoBotao, link }) => {
  return (
    <div className="bg-sabara-red py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">{titulo}</h2>
        <p className="text-white mb-6 max-w-3xl mx-auto">{descricao}</p>
        <p className="text-white mb-6">Faça parte dessa mudança agora mesmo!</p>
        <Link 
          to={link} 
          className="inline-block px-6 py-3 bg-white text-sabara-red font-medium rounded-md hover:bg-gray-100 transition-colors"
        >
          {textoBotao}
        </Link>
      </div>
    </div>
  );
};

export default SecaoCTA;
