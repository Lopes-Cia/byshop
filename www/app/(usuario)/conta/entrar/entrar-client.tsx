'use client'

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { MOCK_AUTH_USER, useAuthStore } from "@/stores/auth-store"

type Props = {
  nextPath: string
}

const SignInSchema = z.object({
  email: z.string().trim().email("Informe um e-mail válido."),
  password: z.string().trim().min(1, "Informe sua senha."),
})

type SignInValues = z.infer<typeof SignInSchema>

export default function EntrarClient({ nextPath }: Props) {
  const router = useRouter()
  const { login, isLoading } = useAuthStore((s) => ({ login: s.login, isLoading: s.isLoading }))
  const [authError, setAuthError] = useState<string | null>(null)

  const form = useForm<SignInValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues:
      process.env.NODE_ENV === "production"
        ? { email: "", password: "" }
        : { email: MOCK_AUTH_USER.email, password: MOCK_AUTH_USER.password },
    mode: "onTouched",
  })

  useEffect(() => {
    const subscription = form.watch(() => {
      setAuthError(null)
    })
    return () => subscription.unsubscribe()
  }, [form])

  const signUpHref = useMemo(() => {
    const encodedNext = encodeURIComponent(nextPath)
    return nextPath !== "/" ? `/conta/cadastrar?next=${encodedNext}` : "/conta/cadastrar"
  }, [nextPath])

  const forgotPasswordHref = useMemo(() => {
    const encodedNext = encodeURIComponent(nextPath)
    return nextPath !== "/" ? `/conta/recuperar-senha?next=${encodedNext}` : "/conta/recuperar-senha"
  }, [nextPath])

  const onSubmit = async (values: SignInValues) => {
    setAuthError(null)
    try {
      await login(values.email, values.password)
      router.push(nextPath)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível entrar."
      setAuthError(message)
    }
  }

  return (
    <main className="bg-neutral-50">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900">Entre na sua conta</h1>
            <p className="mt-2 text-sm text-neutral-600">
              Ou{" "}
              <Link href={signUpHref} className="font-semibold text-amber-700 hover:text-amber-800">
                crie uma conta
              </Link>
              .
            </p>
          </div>

          {process.env.NODE_ENV !== "production" && (
            <Alert>
              <AlertTitle>Credenciais de teste</AlertTitle>
              <AlertDescription>
                <div className="grid gap-1">
                  <p>
                    <span className="font-semibold">E-mail:</span> {MOCK_AUTH_USER.email}
                  </p>
                  <p>
                    <span className="font-semibold">Senha:</span> {MOCK_AUTH_USER.password}
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {authError && (
            <Alert variant="destructive">
              <AlertTitle>Não foi possível entrar</AlertTitle>
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dados de acesso</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input placeholder="voce@email.com" inputMode="email" autoComplete="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Sua senha" autoComplete="current-password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between">
                    <Link href={forgotPasswordHref} className="text-sm font-semibold text-amber-700 hover:text-amber-800">
                      Esqueceu a senha?
                    </Link>
                    <Link href="/privacidade" className="text-sm text-neutral-600 hover:text-neutral-900">
                      Privacidade
                    </Link>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? "Entrando…" : "Entrar"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
