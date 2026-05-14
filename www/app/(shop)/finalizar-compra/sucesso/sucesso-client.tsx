'use client'

import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useOrdersStore } from "@/stores/orders-store"

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)

const formatDateTime = (value: string) => {
  const date = new Date(value)
  if (!Number.isFinite(date.getTime())) return value
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(date)
}

const statusLabel: Record<string, string> = {
  processing: "Em processamento",
  paid: "Pagamento aprovado",
  shipped: "Enviado",
  delivered: "Entregue",
  canceled: "Cancelado",
}

export default function SucessoClient() {
  const searchParams = useSearchParams()
  const orderIdParam = searchParams.get("orderId")

  const orders = useOrdersStore((s) => ({
    getOrderById: s.getOrderById,
    lastCreatedOrderId: s.lastCreatedOrderId,
  }))

  const resolvedOrderId = orderIdParam ?? orders.lastCreatedOrderId
  const order = resolvedOrderId ? orders.getOrderById(resolvedOrderId) : undefined

  if (!order) {
    return (
      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-neutral-900">Pedido não encontrado</h1>
          <p className="mt-2 text-sm text-neutral-600">Não foi possível localizar o pedido informado.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/produtos">Continuar comprando</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/meus-pedidos">Meus pedidos</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900">Pedido confirmado</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Obrigado pela compra. Você pode acompanhar o status do seu pedido a qualquer momento.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-neutral-600">ID do pedido</span>
                <span className="font-semibold text-neutral-900">{order.id}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-neutral-600">Data</span>
                <span className="font-semibold text-neutral-900">{formatDateTime(order.createdAt)}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-neutral-600">E-mail</span>
                <span className="font-semibold text-neutral-900">{order.customerEmail}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-neutral-600">Status</span>
                <span className="font-semibold text-neutral-900">{statusLabel[order.status] ?? order.status}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-neutral-600">Total</span>
                <span className="text-lg font-bold text-neutral-900">{formatCurrency(order.totals.total)}</span>
              </div>
              {order.tracking ? (
                <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                  <p className="text-xs font-semibold text-neutral-900">Rastreamento (mock)</p>
                  <p className="mt-1 text-xs text-neutral-600">
                    {order.tracking.carrier} • Código: <span className="font-semibold">{order.tracking.code}</span>
                  </p>
                  <a
                    href={order.tracking.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex text-xs font-semibold text-amber-700 hover:text-amber-800"
                  >
                    Abrir link de rastreio
                  </a>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Itens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {order.items.map((item) => (
                <div key={`${item.id}:${item.variant}`} className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-neutral-900">{item.name}</p>
                    <p className="mt-0.5 truncate text-xs text-neutral-500">
                      {item.variant} • Qtd: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-neutral-900">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href="/produtos">Continuar comprando</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/meus-pedidos">Meus pedidos</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
