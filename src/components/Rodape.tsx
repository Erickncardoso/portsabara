import React from "react";
import { Link } from "react-router-dom";

const Rodape: React.FC = () => {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">HospitAll</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#sobre"
                  className="text-gray-600 hover:text-sabara-blue"
                >
                  Sobre o Projeto
                </a>
              </li>
              <li>
                <a
                  href="#solucao"
                  className="text-gray-600 hover:text-sabara-blue"
                >
                  Solução
                </a>
              </li>
              <li>
                <a
                  href="#areas"
                  className="text-gray-600 hover:text-sabara-blue"
                >
                  Áreas atendidas
                </a>
              </li>
              <li>
                <a
                  href="#dores"
                  className="text-gray-600 hover:text-sabara-blue"
                >
                  Dores do Hospital
                </a>
              </li>
            </ul>
          </div>
          <div className="flex justify-start md:justify-end">
            <Link to="/">
              <img
                src="/images/logo-sabara.png"
                alt="Logo HospitAll"
                className="h-16 object-contain"
              />
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © 2023 Todos os direitos reservados
          </p>
          <p className="text-sm text-gray-600">HospitAll</p>
        </div>
      </div>
    </footer>
  );
};

export default Rodape;
