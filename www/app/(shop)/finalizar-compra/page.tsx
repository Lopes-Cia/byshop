'use client'

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { cartItemsMock } from "@/lib/data"
import { cartStore, useCartStore } from "@/stores/cart-store"
import { ordersStore } from "@/stores/orders-store"

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)

const onlyDigits = (value: string) => value.replace(/\D/g, "")

const CheckoutFormSchema = z.object({
  fullName: z.string().trim().min(3, "Informe seu nome completo."),
  email: z.string().trim().email("Informe um e-mail válido."),
  phone: z.string().trim().min(10, "Informe um telefone válido."),
  cep: z
    .string()
    .trim()
    .refine((value) => /^\d{5}-?\d{3}$/.test(value), "Informe um CEP válido (ex.: 00000-000)."),
  street: z.string().trim().min(2, "Informe a rua."),
  number: z.string().trim().min(1, "Informe o número."),
  neighborhood: z.string().trim().min(2, "Informe o bairro."),
  city: z.string().trim().min(2, "Informe a cidade."),
  state: z
    .string()
    .trim()
    .transform((value) => value.toUpperCase())
    .refine((value) => /^[A-Z]{2}$/.test(value), "Informe o UF (ex.: SP)."),
  cardNumber: z
    .string()
    .trim()
    .refine((value) => {
      const digits = onlyDigits(value)
      return digits.length >= 13 && digits.length <= 19
    }, "Informe um número de cartão válido."),
  cardName: z.string().trim().min(3, "Informe o nome no cartão."),
  cardExp: z
    .string()
    .trim()
    .refine((value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value), "Use MM/AA (ex.: 08/29)."),
  cardCvv: z
    .string()
    .trim()
    .refine((value) => /^\d{3,4}$/.test(value), "Informe um CVV válido (3 ou 4 dígitos)."),
})

type CheckoutFormValues = z.infer<typeof CheckoutFormSchema>

const devMockValues: CheckoutFormValues = {
  fullName: "Cliente ByShop",
  email: "cliente@byshop.com",
  phone: "11999999999",
  cep: "01001-000",
  street: "Rua Exemplo",
  number: "123",
  neighborhood: "Centro",
  city: "São Paulo",
  state: "SP",
  cardNumber: "4111 1111 1111 1111",
  cardName: "CLIENTE BYSHOP",
  cardExp: "08/29",
  cardCvv: "123",
}

export default function FinalizarCompraPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const cart = useCartStore((s) => ({
    items: s.items,
    couponCode: s.couponCode,
    subtotal: s.subtotal,
    discount: s.discount,
    shipping: s.shipping,
    tax: s.tax,
    total: s.total,
    count: s.count,
  }))

  const itemCountLabel = useMemo(() => {
    const qty = cart.count
    if (qty === 1) return "1 item"
    return `${qty} itens`
  }, [cart.count])

  useEffect(() => {
    setMounted(true)
  }, [])

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues:
      process.env.NODE_ENV === "production"
        ? {
            fullName: "",
            email: "",
            phone: "",
            cep: "",
            street: "",
            number: "",
            neighborhood: "",
            city: "",
            state: "",
            cardNumber: "",
            cardName: "",
            cardExp: "",
            cardCvv: "",
          }
        : devMockValues,
    mode: "onTouched",
  })

  const onSubmit = async (values: CheckoutFormValues) => {
    if (cart.items.length === 0) return
    setIsSubmitting(true)

    try {
      const order = ordersStore.createOrder({
        items: cart.items,
        customerEmail: values.email,
        couponCode: cart.couponCode,
        totals: {
          subtotal: cart.subtotal,
          shipping: cart.shipping,
          tax: cart.tax,
          discount: cart.discount,
          total: cart.total,
        },
      })

      cartStore.clear()
      router.push(`/finalizar-compra/sucesso?orderId=${encodeURIComponent(order.id)}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) {
    return (
      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-sm text-neutral-600">Carregando checkout…</p>
        </div>
      </main>
    )
  }

  if (cart.items.length === 0) {
    const seedCart = () => {
      cartStore.clear()
      for (const item of cartItemsMock) cartStore.addItem(item)
    }

    return (
      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-neutral-900">Seu carrinho está vazio</h1>
          <p className="mt-2 text-sm text-neutral-600">Adicione itens para finalizar a compra.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/produtos">Ver produtos</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/carrinho">Ir para o carrinho</Link>
            </Button>
            {process.env.NODE_ENV !== "production" && (
              <Button type="button" variant="secondary" size="lg" onClick={seedCart}>
                Carregar carrinho de teste
              </Button>
            )}
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Finalizar compra</h1>
            <p className="mt-1 text-sm text-neutral-600">Confira seus dados e confirme o pedido.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/carrinho">Voltar ao carrinho</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
          <section className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dados do comprador</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome completo</FormLabel>
                            <FormControl>
                              <Input placeholder="Seu nome" {...field} />
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
                              <Input placeholder="voce@email.com" inputMode="email" autoComplete="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefone</FormLabel>
                            <FormControl>
                              <Input placeholder="(11) 99999-9999" inputMode="tel" autoComplete="tel" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cep"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CEP</FormLabel>
                            <FormControl>
                              <Input placeholder="00000-000" inputMode="numeric" autoComplete="postal-code" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <FormField
                          control={form.control}
                          name="street"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rua</FormLabel>
                              <FormControl>
                                <Input placeholder="Rua Exemplo" autoComplete="address-line1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número</FormLabel>
                            <FormControl>
                              <Input placeholder="123" autoComplete="address-line2" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="neighborhood"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bairro</FormLabel>
                            <FormControl>
                              <Input placeholder="Centro" autoComplete="address-level3" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cidade</FormLabel>
                            <FormControl>
                              <Input placeholder="São Paulo" autoComplete="address-level2" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>UF</FormLabel>
                            <FormControl>
                              <Input placeholder="SP" autoComplete="address-level1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">Pagamento (mock)</p>
                        <p className="mt-1 text-xs text-neutral-500">
                          Estes dados são apenas para simular o fluxo. Nada é processado de verdade.
                        </p>
                      </div>

                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número do cartão</FormLabel>
                            <FormControl>
                              <Input placeholder="0000 0000 0000 0000" inputMode="numeric" autoComplete="cc-number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="cardName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome no cartão</FormLabel>
                              <FormControl>
                                <Input placeholder="Nome Sobrenome" autoComplete="cc-name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid gap-4 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="cardExp"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Validade</FormLabel>
                                <FormControl>
                                  <Input placeholder="MM/AA" inputMode="numeric" autoComplete="cc-exp" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="cardCvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl>
                                  <Input placeholder="123" inputMode="numeric" autoComplete="cc-csc" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Confirmando…" : "Confirmar pedido"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-3">
                  <p className="text-xs text-neutral-500">{itemCountLabel}</p>
                  <div className="space-y-3">
                    {cart.items.map((item) => (
                      <div key={`${item.id}:${item.variant}`} className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-neutral-900">{item.name}</p>
                          <p className="mt-0.5 truncate text-xs text-neutral-500">
                            {item.variant} • Qtd: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold text-neutral-900">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-semibold text-neutral-900">{formatCurrency(cart.subtotal)}</span>
                  </div>
                  {cart.discount > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Desconto</span>
                      <span className="font-semibold text-green-700">- {formatCurrency(cart.discount)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-600">Frete</span>
                    <span className="font-semibold text-neutral-900">
                      {cart.shipping <= 0 ? "Grátis" : formatCurrency(cart.shipping)}
                    </span>
                  </div>
                  {cart.tax > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-600">Impostos</span>
                      <span className="font-semibold text-neutral-900">{formatCurrency(cart.tax)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-neutral-900">Total</span>
                    <span className="text-lg font-bold text-neutral-900">{formatCurrency(cart.total)}</span>
                  </div>
                  {cart.couponCode ? (
                    <p className="text-xs text-neutral-500">
                      Cupom aplicado: <span className="font-semibold text-neutral-900">{cart.couponCode}</span>
                    </p>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  )
}
