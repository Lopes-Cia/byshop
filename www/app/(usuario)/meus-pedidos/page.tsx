"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/stores/auth-store"
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

export default function MeusPedidosPage() {
  const userEmail = useAuthStore((s) => s.user?.email ?? null)
  const ordersState = useOrdersStore((s) => ({ orders: s.orders }))

  const orders = userEmail ? ordersState.orders.filter((o) => o.customerEmail === userEmail) : ordersState.orders

  if (orders.length === 0) {
    const hasAnyOrder = ordersState.orders.length > 0
    return (
      <main className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-neutral-900">Meus pedidos</h1>
          <p className="mt-2 text-sm text-neutral-600">
            {userEmail && hasAnyOrder
              ? "Não encontramos pedidos para este e-mail. Finalize uma compra usando sua conta para ver o pedido aqui."
              : "Você ainda não tem pedidos neste navegador."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/produtos">Continuar comprando</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/finalizar-compra">Finalizar compra</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/minha-conta">Minha conta</Link>
            </Button>
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
            <h1 className="text-2xl font-bold text-neutral-900">Meus pedidos</h1>
            <p className="mt-1 text-sm text-neutral-600">Acompanhe os pedidos criados no checkout.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/produtos">Ver produtos</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-4">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Pedido {order.id}</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1 text-sm">
                  <p className="text-neutral-600">
                    <span className="font-semibold text-neutral-900">Data:</span> {formatDateTime(order.createdAt)}
                  </p>
                  <p className="text-neutral-600">
                    <span className="font-semibold text-neutral-900">Status:</span>{" "}
                    {statusLabel[order.status] ?? order.status}
                  </p>
                  <p className="text-neutral-600">
                    <span className="font-semibold text-neutral-900">Itens:</span> {order.items.length}
                  </p>
                </div>
                <div className="flex flex-col items-start justify-between gap-3 sm:items-end">
                  <p className="text-lg font-bold text-neutral-900">{formatCurrency(order.totals.total)}</p>
                  <Button asChild size="sm">
                    <Link href={`/finalizar-compra/sucesso?orderId=${encodeURIComponent(order.id)}`}>Ver detalhes</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
