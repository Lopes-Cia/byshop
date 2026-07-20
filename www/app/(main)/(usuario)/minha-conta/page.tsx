"use client"

import Link from "next/link"
import { useMemo } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/stores/auth-store"

function buildAuthHref(path: string, nextPath: string) {
  const encoded = encodeURIComponent(nextPath)
  return nextPath !== "/" ? `${path}?next=${encoded}` : path
}

export default function MinhaContaPage() {
  const auth = useAuthStore((s) => ({ user: s.user, logout: s.logout }))

  const signInHref = useMemo(() => buildAuthHref("/conta/entrar", "/minha-conta"), [])
  const signUpHref = useMemo(() => buildAuthHref("/conta/cadastrar", "/minha-conta"), [])

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Minha conta</h1>
            <p className="mt-1 text-sm text-neutral-600">Gerencie seus pedidos, endereços e preferências.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/produtos">Ver produtos</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
          <section className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Atalhos</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/meus-pedidos">Meus pedidos</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/enderecos">Endereços</Link>
                </Button>
                <Button asChild variant="outline" className="justify-start">
                  <Link href="/lista-de-desejos">Lista de desejos</Link>
                </Button>
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{auth.user ? "Sua conta" : "Entrar"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {auth.user ? (
                  <>
                    <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                      <p className="text-sm font-semibold text-neutral-900">
                        {auth.user.firstName} {auth.user.lastName}
                      </p>
                      <p className="text-sm text-neutral-600">{auth.user.email}</p>
                    </div>
                    <Button type="button" variant="destructive" className="w-full" onClick={auth.logout}>
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-neutral-600">
                      Para ver pedidos e salvar preferências, entre com sua conta.
                    </p>
                    <Button asChild className="w-full" size="lg">
                      <Link href={signInHref}>Entrar</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full" size="lg">
                      <Link href={signUpHref}>Criar conta</Link>
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  )
}
