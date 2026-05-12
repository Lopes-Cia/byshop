"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { usePathname } from "next/navigation";

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const nextPath = pathname;

  if (!user) {
    const encodedNext = encodeURIComponent(nextPath);
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Sua conta</h1>
        <p className="text-muted-foreground mt-4 max-w-xl">
          Faça login para acessar seu perfil.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href={`/auth/signin?next=${encodedNext}`}>Entrar</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/auth/signup?next=${encodedNext}`}>Criar conta</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Olá, {user.firstName}</h1>
        <p className="text-muted-foreground mt-3">Gerencie informações básicas do seu perfil.</p>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <div className="text-muted-foreground text-xs tracking-widest uppercase">
              Nome
            </div>
            <div className="mt-1 text-sm font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </div>
          </div>
          <div>
            <div className="text-muted-foreground text-xs tracking-widest uppercase">
              Email
            </div>
            <div className="mt-1 text-sm font-medium text-gray-900">{user.email}</div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild variant="outline">
            <Link href="/contact">Precisa de ajuda?</Link>
          </Button>
          <Button variant="destructive" onClick={logout} className="sm:ml-auto">
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
}
