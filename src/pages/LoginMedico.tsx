import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, FileText, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { getLogoUrl } from '../services/logoService';

const LoginMedico: React.FC = () => {
  const navigate = useNavigate();
  const [registro, setRegistro] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const logoUrl = getLogoUrl();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registro || !senha) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulação de login
    setTimeout(() => {
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao portal do Hospital Sabará.",
      });
      setIsSubmitting(false);
      navigate('/home-medico'); // Navegação para a home do médico
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <main className="flex-grow py-12 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="shadow-xl border-0 overflow-hidden rounded-3xl">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/5 bg-sabara-blue text-white p-10 flex flex-col justify-center items-center text-center">
                  <Link to="/">
                    <img 
                      src='/images/logo-sabara-branca.png' 
                      alt="Logo Hospital Sabará" 
                      className="h-52 mb-10 cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  </Link>
                  <h2 className="text-4xl font-bold mb-6">Bem-vindo</h2>
                  <p className="text-xl mb-6">Faça login para acessar o portal</p>
                </div>
                
                <div className="w-full md:w-3/5 p-10">
                  <div className="mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">Login Funcionário</h2>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-3">
                      <label htmlFor="registro" className="block text-lg text-gray-700 font-medium">
                        Inserir Nº Registro Médico
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
                          placeholder="Digite seu número de registro"
                          className="pl-12 py-3 h-12 text-base rounded-xl border-gray-300"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <label htmlFor="senha" className="block text-lg text-gray-700 font-medium">
                          Inserir senha
                        </label>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                          <Lock size={20} />
                        </div>
                        <Input
                          id="senha"
                          type={mostrarSenha ? "text" : "password"}
                          value={senha}
                          onChange={(e) => setSenha(e.target.value)}
                          placeholder="Digite sua senha"
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
                    
                    <Button
                      type="submit"
                      className="w-full bg-[#3AA1DA] hover:bg-blue-600 rounded-xl py-3 h-12 text-base font-medium"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Entrando...' : 'Entrar'}
                    </Button>
                    
                    <div className="text-center pt-2">
                      <p className="text-base text-gray-600">
                        <Link to="/esqueci-senha" className="text-sabara-blue hover:underline">
                          Esqueceu a senha?
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
    </div>
  );
};

export default LoginMedico;
