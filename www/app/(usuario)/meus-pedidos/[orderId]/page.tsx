"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/stores/auth-store"
import { useOrdersStore } from "@/stores/orders-store"

// IA-first: formatação consistente de moeda em pt-BR para toda a UI de pedidos.
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)

// IA-first: data/hora legíveis; fallback para string original quando inválida.
const formatDateTime = (value: string) => {
  const date = new Date(value)
  if (!Number.isFinite(date.getTime())) return value
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(date)
}

// IA-first: mapeia enums de status (storage) para rótulos amigáveis na UI.
const statusLabel: Record<string, string> = {
  processing: "Em processamento",
  paid: "Pagamento aprovado",
  shipped: "Enviado",
  delivered: "Entregue",
  canceled: "Cancelado",
}

// IA-first: variantes do Badge para manter consistência visual com o design de referência.
const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  processing: "secondary",
  paid: "default",
  shipped: "outline",
  delivered: "default",
  canceled: "destructive",
}

type PageProps = {
  params: {
    orderId: string
  }
}

export default function MeuPedidoDetalhePage({ params }: PageProps) {
  const userEmail = useAuthStore((s) => s.user?.email ?? null)
  const orders = useOrdersStore((s) => ({ getOrderById: s.getOrderById }))

  const orderId = (() => {
    try {
      return decodeURIComponent(params.orderId)
    } catch {
      return params.orderId
    }
  })()
  const resolvedOrder = orderId ? orders.getOrderById(orderId) : undefined

  const order =
    resolvedOrder && userEmail && resolvedOrder.customerEmail !== userEmail ? undefined : resolvedOrder

  if (!order) {
    return (
      <main className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-neutral-900">Pedido não encontrado</h1>
          <p className="mt-2 text-sm text-neutral-600">Não foi possível localizar o pedido informado.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/meus-pedidos">Meus pedidos</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/produtos">Continuar comprando</Link>
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
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-foreground text-4xl font-bold">Detalhes do pedido</h1>
            <p className="text-muted-foreground mt-3 text-lg">{order.id}</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant={statusVariant[order.status] ?? "secondary"}>
              {statusLabel[order.status] ?? order.status}
            </Badge>
            <Button asChild variant="outline">
              <Link href="/meus-pedidos">Voltar</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumo</CardTitle>
              <CardDescription>Criado em {formatDateTime(order.createdAt)}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email</span>
                <span className="text-foreground font-medium">{order.customerEmail}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="text-foreground font-semibold">{formatCurrency(order.totals.total)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Itens</CardTitle>
              <CardDescription>{order.items.length} item(ns)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item) => (
                <div key={`${item.id}:${item.variant}`} className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-foreground truncate font-medium">{item.name}</p>
                    <p className="text-muted-foreground mt-0.5 text-sm">
                      {item.variant} • Qtd: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <div className="text-foreground font-medium">{formatCurrency(item.price * item.quantity)}</div>
                    <div className="text-muted-foreground">{formatCurrency(item.price)} un.</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Totais</CardTitle>
              <CardDescription>Detalhamento do cálculo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{formatCurrency(order.totals.subtotal)}</span>
              </div>
              {order.totals.discount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Desconto</span>
                  <span className="text-foreground">-{formatCurrency(order.totals.discount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Frete</span>
                <span className="text-foreground">
                  {order.totals.shipping === 0 ? "Grátis" : formatCurrency(order.totals.shipping)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Impostos</span>
                <span className="text-foreground">{formatCurrency(order.totals.tax)}</span>
              </div>
              <div className="flex items-center justify-between border-t pt-3 text-base font-semibold">
                <span>Total</span>
                <span>{formatCurrency(order.totals.total)}</span>
              </div>
            </CardContent>
          </Card>

          {order.tracking ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Entrega</CardTitle>
                <CardDescription>Acompanhe o status e o tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Transportadora</span>
                  <span className="text-foreground">{order.tracking.carrier}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Código</span>
                  <span className="text-foreground font-medium">{order.tracking.code}</span>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button asChild size="sm">
                    <Link href="/meus-pedidos">Ir para pedidos</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href={order.tracking.url} target="_blank" rel="noreferrer">
                      Abrir tracking da transportadora
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </main>
  )
}
