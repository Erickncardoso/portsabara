import React from 'react';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';
import Banner from '../components/Banner';

const Sobre: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />
      
      <main className="flex-grow">
        <Banner 
          titulo="Sobre o PortAll"
          descricao="Conheça nossa história e nossa missão de proporcionar saúde e bem-estar para as crianças."
        />
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Nossa História</h2>
              <p className="text-gray-600 mb-6">
                O PortAll tem uma longa tradição de excelência no atendimento pediátrico, 
                sendo referência nacional em cuidados com a saúde infantil. Fundado com o compromisso de 
                oferecer atendimento humanizado e de alta qualidade, crescemos e nos desenvolvemos sempre 
                com foco no bem-estar das crianças e suas famílias.
              </p>
              <p className="text-gray-600 mb-6">
                Ao longo dos anos, investimos constantemente em tecnologia, infraestrutura e capacitação 
                profissional para garantir os melhores tratamentos e cuidados médicos disponíveis.
              </p>
              
              <div className="my-12 bg-gray-50 p-6 rounded-lg border-l-4 border-sabara-blue">
                <h3 className="text-xl font-semibold mb-3">Nossa Missão</h3>
                <p className="text-gray-600">
                  Oferecer atendimento médico infantil de excelência, com empatia e humanização, 
                  promovendo a saúde e o bem-estar das crianças e tranquilidade para suas famílias.
                </p>
              </div>
              
              <h2 className="text-3xl font-bold mb-6">Nosso Portal Interno</h2>
              <p className="text-gray-600 mb-6">
                O Portal Interno do PortAll foi desenvolvido para revolucionar a forma como 
                gerenciamos nossos processos e atendemos nossos pacientes. Trata-se de uma plataforma 
                intuitiva que conecta médicos, funcionários e pacientes, facilitando a comunicação e 
                agilizando todos os processos hospitalares.
              </p>
              <p className="text-gray-600">
                Com esse sistema, conseguimos eliminar gargalos operacionais, reduzir tempos de espera 
                e proporcionar uma experiência mais fluida e humanizada para todos os envolvidos no 
                processo de cuidado com a saúde.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Rodape />
    </div>
  );
};

export default Sobre;
