import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, Mail, Phone, CreditCard, Home, Hash } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';
import { getLogoUrl } from '../services/logoService';

const CadastroPaciente: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    rg: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    endereco: '',
    numero: '',
    aceitaTermos: false
  });
  
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const logoUrl = getLogoUrl();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      setFormData({...formData, [name]: formatarCPF(value)});
    } else if (name === 'telefone') {
      setFormData({...formData, [name]: formatarTelefone(value)});
    } else {
      setFormData({...formData, [name]: value});
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({...formData, aceitaTermos: checked});
  };

  const formatarCPF = (valor: string) => {
    valor = valor.replace(/\D/g, ''); 
    if (valor.length > 11) valor = valor.substring(0, 11);
    
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    return valor;
  };

  const formatarTelefone = (valor: string) => {
    valor = valor.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.substring(0, 11);
    
    if (valor.length > 10) {
      valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (valor.length > 5) {
      valor = valor.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
    } else if (valor.length > 2) {
      valor = valor.replace(/(\d{2})(\d+)/, '($1) $2');
    }
    
    return valor;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (!formData.nome || !formData.cpf || !formData.email || !formData.senha) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.senha !== formData.confirmarSenha) {
      toast({
        title: "Senhas diferentes",
        description: "As senhas não conferem. Por favor, verifique.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.aceitaTermos) {
      toast({
        title: "Termos de uso",
        description: "É necessário aceitar os termos de uso para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulação de cadastro
    setTimeout(() => {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você já pode fazer login no portal do Hospital Sabará.",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />
      
      <main className="flex-grow py-8 bg-gradient-to-b from-blue-50 to-white flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="shadow-lg border-0 overflow-hidden rounded-2xl">
              <div className="flex flex-col md:flex-row">
                {/* Lado esquerdo azul com mensagem de boas vindas */}
                <div className="w-full md:w-2/5 bg-sabara-blue text-white p-8 flex flex-col justify-center items-center text-center">
                  <img 
                    src='/images/logo-sabara.png' 
                    alt="Logo Hospital Sabará" 
                    className="h-16 mb-8 filter brightness-0 invert"
                  />
                  <h2 className="text-3xl font-bold mb-4">Bem-vindo</h2>
                  <p className="text-lg mb-4">Preencha seus dados para realizar o cadastro no portal.</p>
                </div>
                
                {/* Lado direito com formulário de cadastro */}
                <div className="w-full md:w-3/5 p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Cadastro Paciente</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="nome" className="block text-gray-700 font-medium">
                          Nome Completo
                        </label>
                        <Input
                          id="nome"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          placeholder="Digite seu nome completo"
                          className="rounded-xl border-gray-300"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cpf" className="block text-gray-700 font-medium">
                            CPF
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                              <User size={18} />
                            </div>
                            <Input
                              id="cpf"
                              name="cpf"
                              value={formData.cpf}
                              onChange={handleChange}
                              placeholder="000.000.000-00"
                              className="pl-10 rounded-xl border-gray-300"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="rg" className="block text-gray-700 font-medium">
                            RG
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                              <CreditCard size={18} />
                            </div>
                            <Input
                              id="rg"
                              name="rg"
                              value={formData.rg}
                              onChange={handleChange}
                              placeholder="Digite seu RG"
                              className="pl-10 rounded-xl border-gray-300"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="telefone" className="block text-gray-700 font-medium">
                            Telefone
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                              <Phone size={18} />
                            </div>
                            <Input
                              id="telefone"
                              name="telefone"
                              value={formData.telefone}
                              onChange={handleChange}
                              placeholder="(00) 00000-0000"
                              className="pl-10 rounded-xl border-gray-300"
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-gray-700 font-medium">
                            Email
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                              <Mail size={18} />
                            </div>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="seu.email@exemplo.com"
                              className="pl-10 rounded-xl border-gray-300"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="senha" className="block text-gray-700 font-medium">
                            Senha
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                              <Lock size={18} />
                            </div>
                            <Input
                              id="senha"
                              name="senha"
                              type={mostrarSenha ? "text" : "password"}
                              value={formData.senha}
                              onChange={handleChange}
                              placeholder="Digite sua senha"
                              className="pl-10 pr-10 rounded-xl border-gray-300"
                              required
                            />
                            <div 
                              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                              onClick={() => setMostrarSenha(!mostrarSenha)}
                            >
                              {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="confirmarSenha" className="block text-gray-700 font-medium">
                            Confirmar Senha
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                              <Lock size={18} />
                            </div>
                            <Input
                              id="confirmarSenha"
                              name="confirmarSenha"
                              type={mostrarConfirmarSenha ? "text" : "password"}
                              value={formData.confirmarSenha}
                              onChange={handleChange}
                              placeholder="Confirme sua senha"
                              className="pl-10 pr-10 rounded-xl border-gray-300"
                              required
                            />
                            <div 
                              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                              onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                            >
                              {mostrarConfirmarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="endereco" className="block text-gray-700 font-medium">
                            Endereço
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                              <Home size={18} />
                            </div>
                            <Input
                              id="endereco"
                              name="endereco"
                              value={formData.endereco}
                              onChange={handleChange}
                              placeholder="Seu endereço"
                              className="pl-10 rounded-xl border-gray-300"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="numero" className="block text-gray-700 font-medium">
                            Número
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                              <Hash size={18} />
                            </div>
                            <Input
                              id="numero"
                              name="numero"
                              value={formData.numero}
                              onChange={handleChange}
                              placeholder="Número"
                              className="pl-10 rounded-xl border-gray-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="termos" 
                        checked={formData.aceitaTermos}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <label 
                        htmlFor="termos" 
                        className="text-sm text-gray-600"
                      >
                        Concordo com os <a href="#" className="text-sabara-blue hover:underline">Termos de Uso</a> e <a href="#" className="text-sabara-blue hover:underline">Política de Privacidade</a>
                      </label>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-sabara-blue hover:bg-blue-600 rounded-xl py-6 text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Cadastrando...' : 'Salvar'}
                    </Button>
                    
                    <div className="text-center">
                      <p className="text-gray-600">
                        Já possui uma conta?{" "}
                        <Link to="/login-paciente" className="text-sabara-blue hover:underline">
                          Faça login
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Rodape />
    </div>
  );
};

export default CadastroPaciente;
