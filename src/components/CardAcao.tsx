import React from "react";
import { Link } from "react-router-dom";

interface CardAcaoProps {
  titulo: string;
  icon: React.ReactNode;
  link: string;
}

const CardAcao: React.FC<CardAcaoProps> = ({ titulo, icon, link }) => {
  return (
    <Link
      to={link}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-full w-full"
    >
      <div className="flex flex-col items-center justify-center text-center p-3 sm:p-4 lg:p-6 h-full min-h-[100px] sm:min-h-[120px]">
        <div className="mb-2 sm:mb-3">
          <div className="[&>svg]:w-8 [&>svg]:h-8 sm:[&>svg]:w-10 sm:[&>svg]:h-10">
            {icon}
          </div>
        </div>
        <h3 className="text-gray-800 font-medium text-xs sm:text-sm leading-tight">
          {titulo}
        </h3>
      </div>
    </Link>
  );
};

export default CardAcao;
