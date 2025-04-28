
import React, { useState } from 'react';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const Cadastro: React.FC = () => {
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
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">Cadastre-se</h1>
              <p className="text-gray-600 mt-2">
                Preencha o formulário abaixo para conhecer nosso Portal Interno e descobrir 
                como podemos ajudar seu hospital.
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
      </main>
      
      <Rodape />
    </div>
  );
};

export default Cadastro;
