"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState, useSyncExternalStore, type ComponentProps } from "react"
import { FilterIcon, SearchIcon, XIcon } from "lucide-react"

import type { Order, OrderStatus } from "@/lib/schemas"
import { MOCK_CUSTOMER_ORDERS } from "@/lib/mocks"
import { useAuthStore } from "@/stores/auth-store"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type OrderStatusFilter = "all" | OrderStatus

function subscribeNoop() {
  // IA-first: subscribe no-op para `useSyncExternalStore` (evita setState em effect só para "mounted").
  return () => {}
}

function useHasMounted() {
  // IA-first: gate de hidratação sem `useEffect(setState)` (passa no lint).
  return useSyncExternalStore(subscribeNoop, () => true, () => false)
}

// IA-first: lista fixa de status (deve incluir todos do schema, mesmo que o mock não tenha).
const STATUS_FILTER_OPTIONS: Array<{ value: OrderStatusFilter; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "processing", label: "Processando" },
  { value: "paid", label: "Pago" },
  { value: "shipped", label: "Enviado" },
  { value: "delivered", label: "Entregue" },
  { value: "canceled", label: "Cancelado" },
]

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

function formatDatePtBR(isoDate: string) {
  // IA-first: ISO → data curta pt-BR (ex.: 01/05/2026).
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(new Date(isoDate))
}

function formatMoneyPtBR(value: number) {
  // IA-first: formatação monetária para BRL (evita dependências).
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)
}

function getItemsSummary(order: Order) {
  // IA-first: resumo curto para caber na tabela (primeiro item + contagem).
  const totalItems = order.items.reduce((acc, item) => acc + item.quantity, 0)
  const first = order.items[0]
  if (!first) return { title: "—", totalItems: 0 }

  if (totalItems <= 1) return { title: first.name, totalItems }
  return { title: `${first.name} +${Math.max(0, totalItems - 1)} item(ns)`, totalItems }
}

function getStatusBadgeProps(status: OrderStatus): {
  label: string
  variant: NonNullable<ComponentProps<typeof Badge>["variant"]>
  className?: string
} {
  // IA-first: mapeamento simples de status → badge (consistência visual).
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

export default function MeusPedidosPage() {
  const router = useRouter()
  const auth = useAuthStore((s) => ({ user: s.user }))

  const hasMounted = useHasMounted()
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<OrderStatusFilter>("all")

  // IA-first: redirect client-side obrigatório (conforme plano).
  useEffect(() => {
    if (!hasMounted) return
    if (auth.user) return
    router.replace(buildAuthHref("/conta/entrar", "/meus-pedidos"))
  }, [auth.user, hasMounted, router])

  const orders = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()
    const next = [...MOCK_CUSTOMER_ORDERS]

    // IA-first: ordena por data desc (mais recente primeiro).
    next.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return next.filter((order) => {
      const matchesStatus = status === "all" ? true : order.status === status
      if (!matchesStatus) return false

      if (!normalizedSearch) return true
      const matchesId = order.id.toLowerCase().includes(normalizedSearch)
      const matchesItem = order.items.some((item) => item.name.toLowerCase().includes(normalizedSearch))
      return matchesId || matchesItem
    })
  }, [search, status])

  const isFiltering = search.trim().length > 0 || status !== "all"

  if (!hasMounted) {
    return (
      <main className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <Spinner className="size-4" />
            Carregando seus pedidos…
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

  const selectedStatusLabel = STATUS_FILTER_OPTIONS.find((opt) => opt.value === status)?.label ?? "Status"

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Meus pedidos</h1>
            <p className="mt-1 text-sm text-neutral-600">Acompanhe seus pedidos (mock).</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/minha-conta">Minha conta</Link>
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="w-full sm:max-w-md">
            <InputGroup>
              <InputGroupAddon className="gap-2">
                <SearchIcon className="size-4" aria-hidden="true" />
                <span className="sr-only">Buscar</span>
              </InputGroupAddon>
              <InputGroupInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por ID ou item…"
                aria-label="Buscar por ID do pedido ou nome de item"
              />
              {search.trim().length > 0 ? (
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    aria-label="Limpar busca"
                    onClick={() => setSearch("")}
                    title="Limpar"
                    variant="ghost"
                    size="icon-xs"
                  >
                    <XIcon className="size-4" aria-hidden="true" />
                  </InputGroupButton>
                </InputGroupAddon>
              ) : null}
            </InputGroup>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <FilterIcon className="size-4" aria-hidden="true" />
                Status: {selectedStatusLabel}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Filtrar por status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={status}
                onValueChange={(value) => setStatus(value as OrderStatusFilter)}
              >
                {STATUS_FILTER_OPTIONS.map((option) => (
                  <DropdownMenuRadioItem key={option.value} value={option.value}>
                    {option.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {isFiltering ? (
            <Button type="button" variant="ghost" className="gap-2" onClick={() => (setSearch(""), setStatus("all"))}>
              <XIcon className="size-4" aria-hidden="true" />
              Limpar filtros
            </Button>
          ) : null}
        </div>

        <section className="mt-6">
          {orders.length === 0 ? (
            <Empty className="border-neutral-200">
              <EmptyHeader>
                <EmptyTitle>Nenhum pedido encontrado</EmptyTitle>
                <EmptyDescription>
                  {isFiltering ? "Tente ajustar a busca ou o status." : "Quando você finalizar uma compra, seus pedidos aparecem aqui."}
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className="flex flex-wrap justify-center gap-2">
                  {isFiltering ? (
                    <Button type="button" variant="outline" onClick={() => (setSearch(""), setStatus("all"))}>
                      Limpar filtros
                    </Button>
                  ) : null}
                  <Button asChild>
                    <Link href="/produtos">Ver produtos</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/minha-conta">Minha conta</Link>
                  </Button>
                </div>
              </EmptyContent>
            </Empty>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pedido</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="min-w-[260px] whitespace-normal">Itens</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Ação</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => {
                  const statusBadge = getStatusBadgeProps(order.status)
                  const itemsSummary = getItemsSummary(order)

                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium text-neutral-900">{order.id}</TableCell>
                      <TableCell className="text-neutral-700">{formatDatePtBR(order.createdAt)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={statusBadge.variant}
                          className={cn(statusBadge.className)}
                        >
                          {statusBadge.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-normal">
                        <div className="min-w-0">
                          <p className="truncate text-sm text-neutral-900">{itemsSummary.title}</p>
                          <p className="text-xs text-neutral-600">{itemsSummary.totalItems} item(ns)</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-neutral-900">{formatMoneyPtBR(order.totals.total)}</TableCell>
                      <TableCell className="text-right">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/meus-pedidos/${order.id}`}>Ver detalhes</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          )}
        </section>
      </div>
    </main>
  )
}
