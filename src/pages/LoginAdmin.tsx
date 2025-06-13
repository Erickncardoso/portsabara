import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getLogoUrl } from "../services/logoService";

const LoginAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const logoUrl = getLogoUrl();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulando verificação de credenciais
    if (email === "admin@hospital.com" && senha === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin-dashboard");
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao painel administrativo",
        duration: 3000,
      });
    } else {
      toast({
        title: "Erro no login",
        description: "Credenciais inválidas",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Link to="/">
              <img
                src="/images/logo-sabara.png"
                alt="Logo Hospital Sabará"
                className="h-20 cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold">
            Login Administrativo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@hospital.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="senha" className="text-sm font-medium">
                Senha
              </label>
              <Input
                id="senha"
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginAdmin;
