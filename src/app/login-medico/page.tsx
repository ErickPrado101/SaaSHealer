"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GlassmorphismCard from "../components/GlassmorphismCard";

export default function LoginMedico() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      router.push("/medico/dashboard");
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto">
          <GlassmorphismCard>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-heading-color mb-2">Login do Médico</h1>
              <p className="text-sm text-gray-600">Acesse sua área de gerenciamento</p>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-color"
                  placeholder="seu@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-color"
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
            <p className="mt-6 text-center text-gray-600 text-sm">
              <Link href="/login" className="text-primary-color hover:underline">
                Voltar para login de usuário
              </Link>
            </p>
          </GlassmorphismCard>
        </div>
      </div>
    </main>
  );
}
