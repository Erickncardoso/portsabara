
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Cabecalho from "../components/Cabecalho";
import Rodape from "../components/Rodape";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Usuário tentou acessar rota inexistente:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-4">
          <h1 className="text-6xl font-bold text-sabara-blue mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Ops! Página não encontrada</p>
          <p className="text-gray-600 mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>
          <Button asChild className="bg-sabara-blue hover:bg-blue-600">
            <Link to="/">Voltar para o Início</Link>
          </Button>
        </div>
      </main>
      
      <Rodape />
    </div>
  );
};

export default NotFound;
