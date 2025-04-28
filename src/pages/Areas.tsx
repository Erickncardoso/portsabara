
import React from 'react';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';
import Banner from '../components/Banner';
import CartaoArea from '../components/CartaoArea';

const Areas: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />
      
      <main className="flex-grow">
        <Banner 
          titulo="Áreas Atendidas"
          descricao="Conheça os diferentes setores e especialidades que são beneficiados pelo nosso Portal Interno."
        />
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-gray-600 max-w-3xl mx-auto">
                Com uma plataforma integrada, é possível resolver problemas de comunicação, agilizar 
                agendamentos e facilitar o acesso a exames e consultas. A solução conecta médicos, 
                funcionários e pacientes, trazendo eficiência e melhorando a experiência em todos os 
                setores do hospital.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <CartaoArea titulo="Unidades de Internação hospitalar" />
              <CartaoArea titulo="Centro diagnóstico por Imagens (CDI)" />
              <CartaoArea titulo="Laboratório de Análises Clínicas" />
              <CartaoArea titulo="Central de Agendamento" />
              <CartaoArea titulo="Fármacia e Suprimentos" />
              <CartaoArea titulo="Serviço de Limpeza e Manutenção" />
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-center">Como Funciona em Cada Área</h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-sabara-blue mb-3">Unidades de Internação</h3>
                  <p className="text-gray-600">
                    Em nossas unidades de internação, o portal permite o monitoramento em tempo real dos pacientes, 
                    com acesso imediato às informações vitais, histórico médico e prescrições. A equipe médica pode 
                    atualizar prontuários instantaneamente, enquanto a equipe de enfermagem recebe notificações sobre 
                    medicações e procedimentos a serem realizados, eliminando erros e atrasos.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-sabara-blue mb-3">Centro Diagnóstico por Imagens</h3>
                  <p className="text-gray-600">
                    No CDI, o sistema gerencia agendamentos com precisão, evitando sobreposições e otimizando o uso 
                    dos equipamentos. Os resultados de exames são disponibilizados digitalmente para médicos e pacientes 
                    assim que aprovados, eliminando a necessidade de deslocamentos desnecessários e agilizando diagnósticos.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-sabara-blue mb-3">Laboratório de Análises Clínicas</h3>
                  <p className="text-gray-600">
                    No laboratório, o portal gerencia todo o fluxo de amostras, desde a coleta até o resultado final. 
                    O rastreamento automático das amostras reduz erros de identificação, enquanto o sistema de notificação 
                    alerta sobre resultados críticos que demandam atenção imediata dos médicos responsáveis.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-sabara-blue mb-3">Farmácia e Suprimentos</h3>
                  <p className="text-gray-600">
                    A gestão de medicamentos e suprimentos torna-se eficiente com o controle automático de estoque, 
                    alertas para níveis críticos e integração com o sistema de prescrição médica. Isso elimina a falta 
                    de medicamentos essenciais e reduz o desperdício por vencimento de produtos, garantindo economia 
                    e eficiência operacional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Rodape />
    </div>
  );
};

export default Areas;
