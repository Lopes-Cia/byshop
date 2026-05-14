"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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

export default function MeusPedidosPage() {
  const pathname = usePathname()
  const userEmail = useAuthStore((s) => s.user?.email ?? null)
  const ordersState = useOrdersStore((s) => ({ orders: s.orders }))

  if (!userEmail) {
    const encodedNext = encodeURIComponent(pathname || "/meus-pedidos")
    return (
      <main className="bg-white">
        <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
          <h1 className="text-foreground text-3xl font-bold">Seus pedidos</h1>
          <p className="text-muted-foreground mt-4 max-w-xl">Entre para visualizar seus pedidos e acompanhar entregas.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href={`/conta/entrar?next=${encodedNext}`}>Entrar</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/conta/cadastrar?next=${encodedNext}`}>Criar conta</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  const orders = ordersState.orders.filter((o) => o.customerEmail === userEmail)

  if (orders.length === 0) {
    return (
      <main className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-neutral-900">Meus pedidos</h1>
          <p className="mt-2 text-sm text-neutral-600">
            Não encontramos pedidos para este e-mail. Finalize uma compra usando sua conta para ver o pedido aqui.
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
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-foreground text-4xl font-bold">Pedidos</h1>
            <p className="text-muted-foreground mt-3">Pedidos criados localmente a partir do checkout.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/produtos">Ver produtos</Link>
          </Button>
        </div>

        <div className="mt-8 rounded-xl border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pedido</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-semibold">{order.id}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDateTime(order.createdAt)}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[order.status] ?? "secondary"}>
                      {statusLabel[order.status] ?? order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{order.items.length} item(ns)</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(order.totals.total)}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/meus-pedidos/${encodeURIComponent(order.id)}`}>Ver detalhes</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  )
}
