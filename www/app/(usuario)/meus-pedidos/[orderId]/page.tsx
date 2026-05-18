"use client"

import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useSyncExternalStore, type ComponentProps } from "react"

import type { Order, OrderStatus } from "@/lib/schemas"
import { MOCK_CUSTOMER_ORDERS } from "@/lib/mocks"
import { useAuthStore } from "@/stores/auth-store"
import { useOrdersStore } from "@/stores/orders-store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner"

function subscribeNoop() {
  return () => {}
}

function useHasMounted() {
  return useSyncExternalStore(subscribeNoop, () => true, () => false)
}

const STATUS_LABEL: Record<OrderStatus, string> = {
  processing: "Processando",
  paid: "Pago",
  shipped: "Enviado",
  delivered: "Entregue",
  canceled: "Cancelado",
}

function buildAuthHref(path: string, nextPath: string) {
  const encoded = encodeURIComponent(nextPath)
  return nextPath !== "/" ? `${path}?next=${encoded}` : path
}

function formatDateTimePtBR(isoDate: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(isoDate))
}

function formatMoneyPtBR(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
}

function getStatusBadgeProps(status: OrderStatus): {
  label: string
  variant: NonNullable<ComponentProps<typeof Badge>["variant"]>
  className?: string
} {
  switch (status) {
    case "processing":
      return { label: STATUS_LABEL[status], variant: "secondary" }
    case "paid":
      return { label: STATUS_LABEL[status], variant: "default" }
    case "shipped":
      return { label: STATUS_LABEL[status], variant: "outline" }
    case "delivered":
      return {
        label: STATUS_LABEL[status],
        variant: "default",
        className: "bg-emerald-600 text-white hover:bg-emerald-600",
      }
    case "canceled":
      return { label: STATUS_LABEL[status], variant: "destructive" }
  }
}

export default function MeuPedidoDetalhePage() {
  const router = useRouter()
  const params = useParams()
  const auth = useAuthStore((s) => ({ user: s.user }))
  const storeOrders = useOrdersStore((s) => s.orders)

  const hasMounted = useHasMounted()

  const rawOrderId = params?.orderId

  const orderId = useMemo(() => {
    const value = Array.isArray(rawOrderId) ? rawOrderId[0] : rawOrderId
    if (!value) return ""
    try {
      return decodeURIComponent(value)
    } catch {
      return value
    }
  }, [rawOrderId])

  useEffect(() => {
    if (!hasMounted) return
    if (auth.user) return
    if (!orderId) {
      router.replace(buildAuthHref("/conta/entrar", "/meus-pedidos"))
      return
    }
    router.replace(buildAuthHref("/conta/entrar", `/meus-pedidos/${orderId}`))
  }, [auth.user, hasMounted, orderId, router])

  const order = useMemo(() => {
    const fromStore = storeOrders.find((o) => o.id === orderId)
    if (fromStore) return fromStore
    return MOCK_CUSTOMER_ORDERS.find((o) => o.id === orderId)
  }, [orderId, storeOrders])

  if (!hasMounted) {
    return (
      <main className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <Spinner className="size-4" />
            Carregando pedido…
          </div>
        </div>
      </main>
    )
  }

  if (!auth.user) {
    return (
      <main className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <Spinner className="size-4" />
            Redirecionando para entrar…
          </div>
        </div>
      </main>
    )
  }

  if (!order) {
    return (
      <main className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <Empty className="border-neutral-200">
            <EmptyHeader>
              <EmptyTitle>Pedido não encontrado</EmptyTitle>
              <EmptyDescription>Não foi possível localizar o pedido informado.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex flex-wrap justify-center gap-2">
                <Button asChild variant="outline">
                  <Link href="/meus-pedidos">Voltar</Link>
                </Button>
                <Button asChild>
                  <Link href="/produtos">Ver produtos</Link>
                </Button>
              </div>
            </EmptyContent>
          </Empty>
        </div>
      </main>
    )
  }

  const statusBadge = getStatusBadgeProps(order.status)

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Pedido {order.id}</h1>
            <p className="mt-1 text-sm text-neutral-600">Detalhes do seu pedido.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={statusBadge.variant} className={cn(statusBadge.className)}>
              {statusBadge.label}
            </Badge>
            <Button asChild variant="outline">
              <Link href="/meus-pedidos">Voltar</Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Itens</CardTitle>
                <CardDescription>{order.items.length} item(ns)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.items.map((item) => (
                  <div key={`${item.id}:${item.variant}`} className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-neutral-900">{item.name}</p>
                      <p className="mt-0.5 truncate text-xs text-neutral-600">
                        {item.variant} • Qtd: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-neutral-900">
                      {formatMoneyPtBR(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Resumo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-neutral-600">Data</span>
                  <span className="font-semibold text-neutral-900">{formatDateTimePtBR(order.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-neutral-600">E-mail</span>
                  <span className="truncate font-semibold text-neutral-900">{order.customerEmail}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-neutral-600">Pagamento</span>
                  <span className="font-semibold text-neutral-900">{order.payment.label}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between gap-4 text-base">
                  <span className="text-neutral-600">Total</span>
                  <span className="font-bold text-neutral-900">{formatMoneyPtBR(order.totals.total)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Totais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="text-neutral-900">{formatMoneyPtBR(order.totals.subtotal)}</span>
                </div>
                {order.totals.discount > 0 ? (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-neutral-600">Desconto</span>
                    <span className="text-neutral-900">-{formatMoneyPtBR(order.totals.discount)}</span>
                  </div>
                ) : null}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-neutral-600">Frete</span>
                  <span className="text-neutral-900">
                    {order.totals.shipping === 0 ? "Grátis" : formatMoneyPtBR(order.totals.shipping)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-neutral-600">Impostos</span>
                  <span className="text-neutral-900">{formatMoneyPtBR(order.totals.tax)}</span>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  )
}
