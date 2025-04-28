
import React from 'react';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';
import Banner from '../components/Banner';
import CartaoSolucao from '../components/CartaoSolucao';
import SecaoCTA from '../components/SecaoCTA';

const Solucao: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />
      
      <main className="flex-grow">
        <Banner 
          titulo="Nossa Solução"
          descricao="Conheça como o Portal Interno resolve os principais desafios do Hospital Sabará."
        />
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-gray-600 max-w-3xl mx-auto">
                O Portal Interno é a resposta para os principais desafios enfrentados no dia a dia do hospital. 
                Uma solução única para transformar a gestão hospitalar e proporcionar uma experiência mais 
                eficiente e humanizada para todos.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <CartaoSolucao 
                tipo="comunicacao"
                titulo="Comunicação Eficiente"
                descricao="Integra médicos, funcionários e pacientes em uma plataforma única, eliminando falhas de comunicação e promovendo um fluxo de informações mais claro e ágil."
              />
              <CartaoSolucao 
                tipo="agilidade"
                titulo="Agilidade nos Processos"
                descricao="Otimiza o agendamento de consultas e exames, reduzindo atrasos e tornando os processos mais rápidos e organizados."
              />
              <CartaoSolucao 
                tipo="acesso"
                titulo="Acesso Facilitado"
                descricao="Disponibiliza resultados de exames, prontuários e atualizações em tempo real, garantindo transparência e comodidade para todos os usuários."
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Tecnologia a Serviço da Saúde</h2>
                <p className="text-gray-600 mb-6">
                  Nosso portal utiliza tecnologia de ponta para oferecer uma experiência intuitiva e eficiente. 
                  Com interface amigável e funcionalidades avançadas, transformamos a forma como o hospital 
                  gerencia suas operações diárias.
                </p>
                <p className="text-gray-600 mb-6">
                  A plataforma foi desenvolvida considerando as necessidades específicas de cada área do hospital, 
                  garantindo que todos os processos sejam otimizados e integrados.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <div className="bg-green-100 p-1 rounded-full mr-3">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Prontuário eletrônico integrado</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-100 p-1 rounded-full mr-3">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Sistema de agendamento inteligente</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-100 p-1 rounded-full mr-3">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Gestão automatizada de estoques e medicamentos</span>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-100 p-1 rounded-full mr-3">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700">Comunicação segura entre equipes médicas</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <img 
                  src="/lovable-uploads/7e8ebbac-9467-4c1c-8a80-49bf7229d0b7.png" 
                  alt="Interface do Sistema" 
                  className="rounded-lg shadow-lg max-w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        <SecaoCTA 
          titulo="Transforme o seu hospital com nossa solução"
          descricao="Implante o Portal Interno e veja os resultados em eficiência e satisfação."
          textoBotao="Solicite uma demonstração"
          link="/cadastro"
        />
      </main>
      
      <Rodape />
    </div>
  );
};

export default Solucao;
