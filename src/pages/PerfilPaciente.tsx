import React, { useState, useEffect } from 'react';
import SidebarPaciente from '../components/SidebarPaciente';
import { cn, getMainContentClasses } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, UserRound, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import FloatingChat from '@/components/FloatingChat';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

const formSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone inválido'),
  endereco: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  dataNascimento: z.string().min(1, 'Data de nascimento é obrigatória'),
  cpf: z.string().min(11, 'CPF inválido'),
});

const PerfilPaciente = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  const currentUser = {
    id: '1',
    name: 'João Silva',
    role: 'Paciente',
    avatar: '/images/avatar.png',
    email: 'joao.silva@email.com',
    telefone: '(11) 98765-4321',
    endereco: 'Rua das Flores, 123',
    dataNascimento: '1990-05-15',
    cpf: '123.456.789-00',
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: currentUser.name,
      email: currentUser.email,
      telefone: currentUser.telefone,
      endereco: currentUser.endereco,
      dataNascimento: currentUser.dataNascimento,
      cpf: currentUser.cpf,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Aqui você implementaria a lógica para atualizar os dados no backend
    console.log(data);
    toast.success('Perfil atualizado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      <SidebarPaciente isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className={getMainContentClasses(isSidebarOpen, isMobile)}>
        <div
          className={cn(
            'flex justify-between items-center',
            'sticky top-0 z-30 bg-white border-b border-gray-100 py-3 px-2 sm:px-6 mb-8'
          )}
        >
          <h1 className={cn('font-bold', isMobile ? 'text-xl' : 'text-2xl')}>PERFIL</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative" aria-label="Notificações" tabIndex={0}>
              <Bell size={isMobile ? 18 : 20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 border-2 border-gray-200">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=JoaoSilva" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="font-semibold text-gray-900 text-sm sm:text-base">JOÃO SILVA</p>
                <p className="text-xs sm:text-sm text-blue-600">PACIENTE</p>
              </div>
            </div>
          </div>
        </div>
        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>
                      <UserRound className="h-10 w-10" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Meu Perfil</CardTitle>
                    <CardDescription>Atualize suas informações pessoais</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite seu nome" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Digite seu e-mail" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="telefone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite seu telefone" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cpf"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CPF</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite seu CPF" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dataNascimento"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data de Nascimento</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="endereco"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Endereço</FormLabel>
                            <FormControl>
                              <Input placeholder="Digite seu endereço" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit">
                        <User className="mr-2 h-4 w-4" />
                        Atualizar Perfil
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <FloatingChat currentUser={currentUser} />
    </div>
  );
};

export default PerfilPaciente;
