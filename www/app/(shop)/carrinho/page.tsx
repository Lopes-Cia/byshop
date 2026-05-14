"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cartItemsMock } from "@/lib/data"
import { cartStore, useCartStore } from "@/stores/cart-store"

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)

function formatMaybeFree(value: number) {
  if (value <= 0) return "Grátis"
  return formatCurrency(value)
}

export default function CarrinhoPage() {
  const cart = useCartStore((s) => ({
    items: s.items,
    couponCode: s.couponCode,
    subtotal: s.subtotal,
    discount: s.discount,
    shipping: s.shipping,
    tax: s.tax,
    total: s.total,
    removeItem: s.removeItem,
    setQuantity: s.setQuantity,
    setCouponCode: s.setCouponCode,
  }))

  const [couponDraft, setCouponDraft] = useState("")

  const itemsTotal = useMemo(() => {
    return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }, [cart.items])

  const hasItems = cart.items.length > 0

  if (!hasItems) {
    const seedCart = () => {
      cartStore.clear()
      for (const item of cartItemsMock) cartStore.addItem(item)
    }

    return (
      <main className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-bold text-neutral-900">Seu carrinho está vazio</h1>
          <p className="mb-8 text-sm text-neutral-600">
            Adicione produtos para ver itens aqui e prosseguir para a finalização de compra.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/produtos">Ir para produtos</Link>
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

  const applyCoupon = () => {
    const next = couponDraft.trim()
    cart.setCouponCode(next.length > 0 ? next : null)
  }

  const clearCoupon = () => {
    setCouponDraft("")
    cart.setCouponCode(null)
  }

  const handleDecrease = (id: number, variant: string, current: number) => {
    cart.setQuantity(id, Math.max(1, current - 1), variant)
  }

  const handleIncrease = (id: number, variant: string, current: number) => {
    cart.setQuantity(id, current + 1, variant)
  }

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Carrinho</h1>
            <p className="mt-1 text-sm text-neutral-600">
              Revise seus itens e finalize a compra quando estiver pronto.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/produtos">Continuar comprando</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
          <section className="space-y-4">
            {cart.items.map((item) => (
              <Card key={`${item.id}:${item.variant}`} className="py-0">
                <CardContent className="px-6 py-5">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-2xl">
                      {item.emoji ?? "🛍️"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-neutral-900">{item.name}</p>
                          <p className="mt-0.5 truncate text-xs text-neutral-500">{item.variant}</p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-semibold text-neutral-900">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                          <p className="mt-0.5 text-xs text-neutral-500">{formatCurrency(item.price)} un.</p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            onClick={() => handleDecrease(item.id, item.variant, item.quantity)}
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="size-4" />
                          </Button>

                          <div className="min-w-10 text-center text-sm font-semibold text-neutral-900">
                            {item.quantity}
                          </div>

                          <Button
                            type="button"
                            variant="outline"
                            size="icon-sm"
                            onClick={() => handleIncrease(item.id, item.variant, item.quantity)}
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="size-4" />
                          </Button>
                        </div>

                        <Button
                          type="button"
                          variant="ghost"
                          className="text-neutral-600 hover:text-neutral-900"
                          onClick={() => cart.removeItem(item.id, item.variant)}
                        >
                          <Trash2 className="size-4" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          <aside className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-semibold text-neutral-900">{formatCurrency(cart.subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Desconto</span>
                    <span className="font-semibold text-neutral-900">-{formatCurrency(cart.discount)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Frete</span>
                    <span className="font-semibold text-neutral-900">{formatMaybeFree(cart.shipping)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Taxas</span>
                    <span className="font-semibold text-neutral-900">{formatCurrency(cart.tax)}</span>
                  </div>

                  <div className="my-3 h-px w-full bg-neutral-200" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-neutral-900">Total</span>
                    <span className="text-lg font-bold text-neutral-900">{formatCurrency(cart.total)}</span>
                  </div>
                  <p className="text-xs text-neutral-500">
                    Itens: {formatCurrency(itemsTotal)} • Total inclui frete e taxas.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-neutral-900">Cupom</p>
                    {cart.couponCode ? (
                      <button
                        type="button"
                        className="text-xs font-medium text-neutral-600 hover:text-neutral-900"
                        onClick={clearCoupon}
                      >
                        Remover cupom
                      </button>
                    ) : null}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      value={couponDraft}
                      onChange={(e) => setCouponDraft(e.target.value)}
                      placeholder={cart.couponCode ? `Aplicado: ${cart.couponCode}` : "Ex.: SAVE10"}
                      autoCapitalize="characters"
                      inputMode="text"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") applyCoupon()
                      }}
                    />
                    <Button type="button" variant="outline" onClick={applyCoupon}>
                      Aplicar
                    </Button>
                  </div>
                  {cart.couponCode ? (
                    <p className="text-xs text-neutral-500">
                      Cupom aplicado: <span className="font-semibold text-neutral-900">{cart.couponCode}</span>
                    </p>
                  ) : (
                    <p className="text-xs text-neutral-500">
                      Cupons de teste: <span className="font-semibold text-neutral-900">SAVE10</span>,{" "}
                      <span className="font-semibold text-neutral-900">SAVE20</span>,{" "}
                      <span className="font-semibold text-neutral-900">FREESHIP</span>.
                    </p>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-3">
                <Button asChild size="lg" className="w-full">
                  <Link href="/finalizar-compra">Finalizar compra</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <Link href="/produtos">Continuar comprando</Link>
                </Button>
              </CardFooter>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  )
}
