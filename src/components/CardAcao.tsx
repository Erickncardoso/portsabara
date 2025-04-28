
import React from 'react';
import { Link } from 'react-router-dom';

interface CardAcaoProps {
  titulo: string;
  icon: React.ReactNode;
  link: string;
}

const CardAcao: React.FC<CardAcaoProps> = ({ titulo, icon, link }) => {
  return (
    <Link to={link} className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-full w-full">
      <div className="flex flex-col items-center justify-center text-center p-6 h-full">
        <div className="mb-3">
          {React.cloneElement(icon as React.ReactElement, { size: 48 })}
        </div>
        <h3 className="text-gray-800 font-medium text-sm">{titulo}</h3>
      </div>
    </Link>
  );
};

export default CardAcao;
