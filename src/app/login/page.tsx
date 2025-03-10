"use client";
import { useState } from "react";
import type React from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import GlassmorphismCard from "../components/GlassmorphismCard";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulação de login - em produção, você faria uma chamada à API
    if (email && password) {
      router.push("/agendamento");
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto">
          <GlassmorphismCard>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Login</h1>
              <p className="text-gray-700">Bem-vindo de volta!</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-color"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-color"
                  placeholder="Digite sua senha"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-color text-white py-2 px-4 rounded-lg font-semibold hover:bg-primary-color/90 transition-colors"
              >
                Entrar
              </button>
            </form>

            <p className="mt-6 text-center text-gray-700 text-sm">
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="text-primary-color hover:underline">
                Cadastre-se
              </Link>
            </p>
          </GlassmorphismCard>
        </div>

        {/* Links de acesso rápido para teste */}
        <div className="fixed bottom-4 right-4 backdrop-blur-md bg-gray-100 rounded-lg border border-gray-300 p-3">
          <p className="text-gray-600 text-xs mb-2">Acessos para teste:</p>
          <div className="flex flex-col gap-1">
            <Link href="/agendamento" className="text-gray-800 hover:text-gray-900 text-sm transition-colors">
              Usuário
            </Link>
            <Link href="/medico/dashboard" className="text-gray-800 hover:text-gray-900 text-sm transition-colors">
              Médico
            </Link>
            <Link href="/admin/dashboard" className="text-gray-800 hover:text-gray-900 text-sm transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
