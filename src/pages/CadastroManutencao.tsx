import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { getLogoUrl } from '../services/logoService';

const CadastroManutencao: React.FC = () => {
  const [nome, setNome] = useState('');
  const [registro, setRegistro] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome || !registro || !senha || !confirmarSenha) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    if (senha !== confirmarSenha) {
      toast({
        title: "Senhas diferentes",
        description: "As senhas informadas não conferem.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulação de cadastro
    setTimeout(() => {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você já pode fazer login no sistema.",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <main className="flex-grow py-12 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="shadow-xl border-0 overflow-hidden rounded-3xl">
              <div className="flex flex-col md:flex-row">
                {/* Lado esquerdo azul com mensagem de boas vindas */}
                <div className="w-full md:w-2/5 bg-sabara-blue text-white p-10 flex flex-col justify-center items-center text-center">
                  <Link to="/">
                    <img 
                      src="/images/logo-sabara-branca.png" 
                      alt="Logo Hospital Sabará" 
                      className="h-52 mb-10 cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </Link>
                  <h2 className="text-4xl font-bold mb-6">Bem-vindo</h2>
                  <p className="text-xl mb-6">Preencha os dados para cadastrar um funcionário da manutenção</p>
                </div>
                
                {/* Lado direito com formulário de cadastro */}
                <div className="w-full md:w-3/5 p-10">
                  <div className="mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">Cadastro Manutenção</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                      <label htmlFor="nome" className="block text-lg text-gray-700 font-medium">
                        Nome Completo
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                          <User size={20} />
                        </div>
                        <Input
                          id="nome"
                          type="text"
                          value={nome}
                          onChange={(e) => setNome(e.target.value)}
                          placeholder="Digite seu nome completo"
                          className="pl-12 py-3 h-12 text-base rounded-xl border-gray-300"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label htmlFor="registro" className="block text-lg text-gray-700 font-medium">
                          Nº Registro
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                            <FileText size={20} />
                          </div>
                          <Input
                            id="registro"
                            type="text"
                            value={registro}
                            onChange={(e) => setRegistro(e.target.value)}
                            placeholder="Número de registro"
                            className="pl-12 py-3 h-12 text-base rounded-xl border-gray-300"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <label htmlFor="senha" className="block text-lg text-gray-700 font-medium">
                          Senha
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                            <Lock size={20} />
                          </div>
                          <Input
                            id="senha"
                            type={mostrarSenha ? "text" : "password"}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Crie sua senha"
                            className="pl-12 pr-12 py-3 h-12 text-base rounded-xl border-gray-300"
                            required
                          />
                          <div 
                            className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-500"
                            onClick={() => setMostrarSenha(!mostrarSenha)}
                          >
                            {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label htmlFor="confirmarSenha" className="block text-lg text-gray-700 font-medium">
                        Confirmar Senha
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                          <Lock size={20} />
                        </div>
                        <Input
                          id="confirmarSenha"
                          type={mostrarConfirmarSenha ? "text" : "password"}
                          value={confirmarSenha}
                          onChange={(e) => setConfirmarSenha(e.target.value)}
                          placeholder="Confirme sua senha"
                          className="pl-12 pr-12 py-3 h-12 text-base rounded-xl border-gray-300"
                          required
                        />
                        <div 
                          className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-gray-500"
                          onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                        >
                          {mostrarConfirmarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button
                        type="button" 
                        variant="outline"
                        className="w-full border-[#3AA1DA] text-[#3AA1DA] hover:bg-blue-50 rounded-xl py-3 h-12 text-base font-medium"
                        asChild
                      >
                        <Link to="/login-manutencao">
                          Voltar para Login
                        </Link>
                      </Button>
                    </div>
                    
                    <div className="pt-0">
                      <Button
                        type="submit"
                        className="w-full bg-[#3AA1DA] hover:bg-blue-600 rounded-xl py-3 h-12 text-base font-medium"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CadastroManutencao;
