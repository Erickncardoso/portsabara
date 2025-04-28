
import React from 'react';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';
import Banner from '../components/Banner';
import CartaoInformativo from '../components/CartaoInformativo';

const Dores: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />
      
      <main className="flex-grow">
        <Banner 
          titulo="Dores do Hospital Sabará"
          descricao="Conheça os desafios que enfrentamos no dia a dia do hospital e como trabalhamos para superá-los."
        />
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-gray-600 max-w-3xl mx-auto">
                O nosso portal oferece soluções inovadoras para minimizar esse desconforto, promovendo uma 
                recuperação mais rápida e um atendimento mais humanizado, melhorando a experiência do 
                paciente e tornando o processo de tratamento mais eficiente e confortável.
              </p>
              <a 
                href="#solucoes" 
                className="mt-6 inline-block px-6 py-3 bg-sabara-green text-white font-medium rounded-md hover:bg-green-600 transition-colors"
              >
                Ver como resolvemos
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <CartaoInformativo 
                tipo="realizacao" 
                titulo="Realização/Busca de registros" 
                descricao="A necessidade de registrar informações no prontuário durante o atendimento e buscar dados para passagem de plantão ou consultas atrasa o fluxo de trabalho, comprometendo eficiência e a continuidade do cuidado."
              />
              
              <CartaoInformativo 
                tipo="comunicacao" 
                titulo="Comunicação" 
                descricao="A comunicação entre pacientes, médicos e funcionários nem sempre é eficiente, o que pode gerar atrasos e falta de alinhamento no atendimento."
              />
              
              <CartaoInformativo 
                tipo="paciente" 
                titulo="Fluxo do Paciente" 
                descricao="Pacientes com necessidades específicas, como pessoas autistas, enfrentam dificuldades devido à falta de atividades visuais e ambientes adaptados, gerando desconforto e compromete a qualidade do cuidado."
              />
              
              <CartaoInformativo 
                tipo="farmacia" 
                titulo="Farmácia" 
                descricao="O sistema de recepção de suprimentos e medicamentos apresenta falhas, dificultando a reposição adequada. O recurso utilizado atualmente não atende às demandas, resultando em atrasos e riscos para o atendimento aos pacientes."
              />
              
              <CartaoInformativo 
                tipo="fluxo" 
                titulo="Falha no Fluxo de Itens" 
                descricao="A circulação de itens como medicamentos, água e mamadeiras enfrenta atrasos frequentes, comprometendo o atendimento no momento necessário e impactando diretamente o cuidado aos pacientes."
              />
              
              <CartaoInformativo 
                tipo="organizacao" 
                titulo="Desafios na Organização" 
                descricao="A saída de pacientes da UTI ou quartos de internação nem sempre é seguida de uma limpeza e higienização rápidas, gerando atrasos no preparo do espaço para novos pacientes."
              />
            </div>
          </div>
        </section>
        
        <section id="solucoes" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Nossas Soluções</h2>
              <p className="text-gray-600">
                Para enfrentar cada um desses desafios, desenvolvemos soluções específicas 
                integradas ao nosso Portal Interno. Veja como resolvemos cada problema:
              </p>
            </div>
            
            <div className="space-y-12 max-w-3xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-sabara-blue mb-4">Registros e Documentação</h3>
                <p className="text-gray-600 mb-4">
                  Implementamos um sistema digital de prontuário eletrônico que permite registro 
                  rápido de informações e acesso instantâneo a todo histórico do paciente, eliminando 
                  a necessidade de busca manual de documentos.
                </p>
                <p className="text-gray-600">
                  Os médicos e enfermeiros podem acessar e atualizar informações em tempo real, 
                  garantindo continuidade no cuidado e economia de tempo.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-sabara-blue mb-4">Comunicação Integrada</h3>
                <p className="text-gray-600 mb-4">
                  Nossa plataforma centraliza toda comunicação entre equipes médicas, administrativas 
                  e pacientes, com notificações em tempo real e canais específicos para cada tipo de 
                  informação.
                </p>
                <p className="text-gray-600">
                  Os pacientes podem receber atualizações sobre seus tratamentos, enquanto as equipes 
                  internas mantêm comunicação fluida e documentada.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-sabara-blue mb-4">Gestão Farmacêutica</h3>
                <p className="text-gray-600 mb-4">
                  Implementamos um módulo específico para gestão de medicamentos e suprimentos, com 
                  controle automatizado de estoque, alertas para reposição e rastreamento completo 
                  do uso de medicamentos.
                </p>
                <p className="text-gray-600">
                  O sistema garante que nunca faltem insumos essenciais e otimiza todo o processo 
                  logístico da farmácia hospitalar.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Rodape />
    </div>
  );
};

export default Dores;
