# Detalhe de Pedido em /meus-pedidos/[orderId] — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar a rota client `app/(usuario)/meus-pedidos/[orderId]/page.tsx` para exibir detalhes do pedido pelo `orderId`, validando acesso por e-mail logado (quando existir) sem revelar existência.

**Architecture:** Página client no App Router usando `useParams` para ler `orderId`, `useOrdersStore(getOrderById)` para buscar o pedido e `useAuthStore` para validar acesso. Em caso de ausência do pedido ou mismatch de e-mail, renderiza estado “Pedido não encontrado” (opção A).

**Tech Stack:** Next.js App Router, React, Tailwind, shadcn/ui (`Button`, `Card`), stores (`auth-store`, `orders-store`).

---

### Task 1: Criar página de detalhes do pedido

**Files:**
- Create: `www/app/(usuario)/meus-pedidos/[orderId]/page.tsx`

- [ ] **Step 1: Implementar página client**

```tsx
"use client"

import Link from "next/link"
import { useParams } from "next/navigation"

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

export default function PedidoDetalhePage() {
  const params = useParams<{ orderId: string }>()
  const orderId = params?.orderId

  const userEmail = useAuthStore((s) => s.user?.email ?? null)
  const orders = useOrdersStore((s) => ({ getOrderById: s.getOrderById }))

  const order = orderId ? orders.getOrderById(orderId) : undefined

  const canShowOrder = !!order && (!userEmail || order.customerEmail === userEmail)

  if (!canShowOrder) {
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
              <Link href="/meus-pedidos">Voltar</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Detalhes do pedido</h1>
            <p className="mt-1 text-sm text-neutral-600">Acompanhe as informações e itens do seu pedido.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/meus-pedidos">Voltar</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Resumo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-neutral-600">ID</span>
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
            <Link href="/meus-pedidos">Voltar</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
```

### Task 2: Ajustar CTA “Ver detalhes” na lista de pedidos

**Files:**
- Modify: `www/app/(usuario)/meus-pedidos/page.tsx`

- [ ] **Step 1: Trocar o link para a rota nova**

```tsx
<Link href={`/meus-pedidos/${encodeURIComponent(order.id)}`}>Ver detalhes</Link>
```

### Task 3: Atualizar documento de andamento do projeto

**Files:**
- Modify: `.trae/docs/byshop/geral.md`

- [ ] **Step 1: Registrar que a rota de detalhe do pedido foi adicionada**

### Task 4: Verificação local

- [ ] **Step 1: Rodar lint**

Run: `npm run lint` (em `c:\LOPES\www\byshop\www`)
Expected: exit code 0

- [ ] **Step 2: Rodar build**

Run: `npm run build` (em `c:\LOPES\www\byshop\www`)
Expected: build finaliza sem erros de TypeScript/Next

