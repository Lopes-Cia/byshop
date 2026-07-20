'use client'

import { useMemo, useState } from "react"
import Link from "next/link"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

type Props = {
  nextPath: string
}

const ForgotPasswordSchema = z.object({
  email: z.string().trim().email("Informe um e-mail válido."),
})

type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>

export default function RecuperarSenhaClient({ nextPath }: Props) {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: "" },
    mode: "onTouched",
  })

  const signInHref = useMemo(() => {
    const encodedNext = encodeURIComponent(nextPath)
    return nextPath !== "/" ? `/conta/entrar?next=${encodedNext}` : "/conta/entrar"
  }, [nextPath])

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <main className="bg-neutral-50">
        <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center justify-center px-4 py-12">
          <div className="w-full max-w-md space-y-4 text-center">
            <h1 className="text-2xl font-bold text-neutral-900">Verifique seu e-mail</h1>
            <p className="text-sm text-neutral-600">
              Se existir uma conta para <span className="font-semibold text-neutral-900">{form.getValues("email")}</span>,
              enviaremos um link de redefinição de senha.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href={signInHref}>Voltar para entrar</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-neutral-50">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900">Esqueceu sua senha?</h1>
            <p className="mt-2 text-sm text-neutral-600">Informe seu e-mail e enviaremos um link (mock).</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recuperação</CardTitle>
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

                  <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Enviando…" : "Enviar link"}
                  </Button>

                  <div className="text-center">
                    <Link href={signInHref} className="text-sm font-semibold text-amber-700 hover:text-amber-800">
                      Voltar para entrar
                    </Link>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

