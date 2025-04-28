
import React, { useState } from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import Cabecalho from '../components/Cabecalho';
import Rodape from '../components/Rodape';

const EsqueciSenha: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, digite seu e-mail para receber as instruções.",
        variant: "destructive"
      });
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, digite um endereço de e-mail válido.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulação de envio de e-mail para recuperação de senha
    setTimeout(() => {
      toast({
        title: "E-mail enviado!",
        description: "Instruções para redefinir sua senha foram enviadas para seu e-mail.",
      });
      setIsSubmitting(false);
      setEnviado(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />
      
      <main className="flex-grow py-12 bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="shadow-xl border-0 overflow-hidden rounded-3xl">
              <div className="flex flex-col md:flex-row">
                {/* Lado esquerdo azul com mensagem de boas vindas */}
                <div className="w-full md:w-2/5 bg-sabara-blue text-white p-10 flex flex-col justify-center items-center text-center">
                  <img 
                    src="/lovable-uploads/logo-sabara-novo.png" 
                    alt="Logo Hospital Sabará" 
                    className="h-20 mb-10"
                  />
                  <h2 className="text-4xl font-bold mb-6">Recuperação</h2>
                  <p className="text-xl mb-6">Recupere sua senha para acessar o portal</p>
                </div>
                
                {/* Lado direito com formulário de recuperação de senha */}
                <div className="w-full md:w-3/5 p-10">
                  <div className="mb-4">
                    <Link to={-1 as any} className="flex items-center text-gray-600 hover:text-sabara-blue transition-colors mb-4">
                      <ArrowLeft size={20} className="mr-2" />
                      <span>Voltar</span>
                    </Link>
                    <h2 className="text-3xl font-bold text-gray-800 mt-6">Esqueceu sua senha?</h2>
                    <p className="text-gray-600 mt-2">
                      {!enviado 
                        ? "Digite seu e-mail abaixo e enviaremos instruções para redefinir sua senha."
                        : "E-mail enviado com sucesso! Verifique sua caixa de entrada para recuperar sua senha."}
                    </p>
                  </div>
                  
                  {!enviado ? (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="space-y-3">
                        <label htmlFor="email" className="block text-lg text-gray-700 font-medium">
                          Inserir E-mail
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                            <Mail size={20} />
                          </div>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu e-mail cadastrado"
                            className="pl-12 py-3 h-12 text-base rounded-xl border-gray-300"
                            required
                          />
                        </div>
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-[#3AA1DA] hover:bg-blue-600 rounded-xl py-3 h-12 text-base font-medium"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Enviando...' : 'Enviar instruções'}
                      </Button>
                    </form>
                  ) : (
                    <div className="space-y-8">
                      <p className="text-lg text-gray-700 mt-8">
                        Se não encontrar o e-mail, verifique sua pasta de spam ou lixo eletrônico.
                      </p>
                      
                      <Button
                        type="button"
                        onClick={() => {setEnviado(false); setEmail('');}}
                        className="w-full bg-[#3AA1DA] hover:bg-blue-600 rounded-xl py-3 h-12 text-base font-medium"
                      >
                        Tentar com outro e-mail
                      </Button>
                    </div>
                  )}
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

export default EsqueciSenha;
