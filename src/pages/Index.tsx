
import React, { useState } from 'react';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';
import Banner from '../components/Banner';
import CartaoSolucao from '../components/CartaoSolucao';
import CartaoInformativo from '../components/CartaoInformativo';
import CartaoArea from '../components/CartaoArea';
import SecaoCTA from '../components/SecaoCTA';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';

const Index: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cargo: '',
    hospital: '',
    departamento: '',
    mensagem: '',
    aceitaTermos: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, aceitaTermos: checked }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.aceitaTermos) {
      toast({
        title: "Erro no cadastro",
        description: "Você precisa aceitar os termos para prosseguir.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simular envio para API
    setTimeout(() => {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Em breve entraremos em contato com você.",
      });
      
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        cargo: '',
        hospital: '',
        departamento: '',
        mensagem: '',
        aceitaTermos: false
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />
      
      <main className="flex-grow">
        {/* Seção Inicial / Home */}
        <section id="inicio">
          <Banner 
            titulo="Portal Hospital Sabará"
            descricao="Uma revolução na forma de gerir e vivenciar o cuidado hospitalar."
            botoes={[
              { texto: 'Saiba mais', link: '#sobre', variante: 'primario' }
            ]}
          />
        </section>

        {/* Seção Sobre */}
        <section id="sobre" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Sobre o Projeto</h2>
              <p className="text-gray-600 mb-6">
                O Portal Interno do Hospital Sabará foi desenvolvido para revolucionar a forma como
                gerenciamos nossos processos e atendemos nossos pacientes. Trata-se de uma plataforma
                intuitiva que conecta médicos, funcionários e pacientes, facilitando a comunicação e
                agilizando todos os processos hospitalares.
              </p>
            </div>
          </div>
        </section>
        
        {/* Seção Dores */}
        <section id="dores" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Dores do Hospital</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <CartaoInformativo 
                tipo="realizacao" 
                titulo="Realização/Busca de registros" 
                descricao="A necessidade de registrar informações no prontuário durante o atendimento e buscar dados para passagem de plantão ou consultas atrasa o fluxo de trabalho."
              />
              
              <CartaoInformativo 
                tipo="comunicacao" 
                titulo="Comunicação" 
                descricao="A comunicação entre pacientes, médicos e funcionários nem sempre é eficiente, o que pode gerar atrasos e falta de alinhamento no atendimento."
              />
              
              <CartaoInformativo 
                tipo="paciente" 
                titulo="Fluxo do Paciente" 
                descricao="Pacientes com necessidades específicas enfrentam dificuldades devido à falta de atividades visuais e ambientes adaptados."
              />
              
              <CartaoInformativo 
                tipo="farmacia" 
                titulo="Farmácia" 
                descricao="O sistema de recepção de suprimentos e medicamentos apresenta falhas, dificultando a reposição adequada."
              />
              
              <CartaoInformativo 
                tipo="fluxo" 
                titulo="Falha no Fluxo de Itens" 
                descricao="A circulação de itens como medicamentos, água e mamadeiras enfrenta atrasos frequentes."
              />
              
              <CartaoInformativo 
                tipo="organizacao" 
                titulo="Desafios na Organização" 
                descricao="A saída de pacientes da UTI ou quartos de internação nem sempre é seguida de uma limpeza e higienização rápidas."
              />
            </div>
          </div>
        </section>
        
        {/* Seção Áreas */}
        <section id="areas" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Áreas Atendidas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <CartaoArea titulo="Unidades de Internação hospitalar" />
              <CartaoArea titulo="Centro diagnóstico por Imagens (CDI)" />
              <CartaoArea titulo="Laboratório de Análises Clínicas" />
              <CartaoArea titulo="Central de Agendamento" />
              <CartaoArea titulo="Fármacia e Suprimentos" />
              <CartaoArea titulo="Serviço de Limpeza e Manutenção" />
            </div>
          </div>
        </section>
        
        {/* Seção Solução */}
        <section id="solucao" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">Nossa Solução</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <CartaoSolucao 
                tipo="comunicacao"
                titulo="Comunicação Eficiente"
                descricao="Integra médicos, funcionários e pacientes em uma plataforma única, eliminando falhas de comunicação."
              />
              <CartaoSolucao 
                tipo="agilidade"
                titulo="Agilidade nos Processos"
                descricao="Otimiza o agendamento de consultas e exames, reduzindo atrasos e tornando os processos mais rápidos."
              />
              <CartaoSolucao 
                tipo="acesso"
                titulo="Acesso Facilitado"
                descricao="Disponibiliza resultados de exames, prontuários e atualizações em tempo real para todos os usuários."
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">Tecnologia a Serviço da Saúde</h3>
                <p className="text-gray-600 mb-6">
                  Nosso portal utiliza tecnologia de ponta para oferecer uma experiência intuitiva e eficiente, 
                  transformando a gestão hospitalar.
                </p>
              </div>
              <div className="flex justify-center">
                <img 
                  src="../images/logo-sabara.png" 
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
          link="#cadastro"
        />
        
        {/* Seção Cadastro */}
        <section id="cadastro" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">Cadastre-se</h2>
                <p className="text-gray-600 mt-2">
                  Preencha o formulário abaixo para conhecer nosso Portal Interno.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome completo</Label>
                      <Input 
                        id="nome" 
                        name="nome" 
                        value={formData.nome} 
                        onChange={handleChange} 
                        placeholder="Seu nome completo" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="seu.email@exemplo.com" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <Input 
                        id="telefone" 
                        name="telefone" 
                        value={formData.telefone} 
                        onChange={handleChange} 
                        placeholder="(00) 00000-0000" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cargo">Cargo</Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange('cargo', value)}
                        value={formData.cargo}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione seu cargo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medico">Médico(a)</SelectItem>
                          <SelectItem value="enfermeiro">Enfermeiro(a)</SelectItem>
                          <SelectItem value="administrativo">Administrativo</SelectItem>
                          <SelectItem value="direcao">Direção</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="hospital">Hospital/Instituição</Label>
                      <Input 
                        id="hospital" 
                        name="hospital" 
                        value={formData.hospital} 
                        onChange={handleChange} 
                        placeholder="Nome do hospital ou instituição" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="departamento">Departamento</Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange('departamento', value)}
                        value={formData.departamento}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o departamento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="clinica">Clínica Médica</SelectItem>
                          <SelectItem value="pediatria">Pediatria</SelectItem>
                          <SelectItem value="enfermagem">Enfermagem</SelectItem>
                          <SelectItem value="administracao">Administração</SelectItem>
                          <SelectItem value="ti">Tecnologia da Informação</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mensagem">Mensagem (opcional)</Label>
                    <textarea 
                      id="mensagem" 
                      name="mensagem" 
                      value={formData.mensagem} 
                      onChange={handleChange} 
                      placeholder="Descreva como podemos ajudar seu hospital..." 
                      className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="termos" 
                      checked={formData.aceitaTermos}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <label
                      htmlFor="termos"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Concordo com os <a href="#" className="text-sabara-blue hover:underline">Termos de Uso</a> e <a href="#" className="text-sabara-blue hover:underline">Política de Privacidade</a>
                    </label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-sabara-blue hover:bg-blue-600" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar cadastro'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Rodape />
    </div>
  );
};

export default Index;
