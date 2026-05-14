# Meus pedidos (tabela) + detalhe do pedido Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trocar a listagem de “Meus pedidos” de cards para tabela e criar a rota de detalhe `/meus-pedidos/[orderId]` apontada pelo link de ação.

**Architecture:** A listagem renderiza uma tabela com 6 colunas e mantém o estado vazio com CTAs existente. A página de detalhe reutiliza o mesmo store de pedidos para buscar o pedido por `orderId` e renderiza os detalhes e itens em cards, com fallback quando não encontra (ou quando o pedido não pertence ao usuário autenticado).

**Tech Stack:** Next.js App Router, React Client Components, Tailwind CSS, shadcn/ui (Table, Card, Button), Zustand stores (`useAuthStore`, `useOrdersStore`).

---

## Estrutura de arquivos

- Modificar: `c:\LOPES\www\byshop\www\app\(usuario)\meus-pedidos\page.tsx`
- Criar: `c:\LOPES\www\byshop\www\app\(usuario)\meus-pedidos\[orderId]\page.tsx`
- Modificar: `c:\LOPES\www\byshop\.trae\docs\byshop\geral.md`

---

### Task 1: Migrar listagem para tabela (mantendo estado vazio + CTAs)

**Files:**
- Modify: `c:\LOPES\www\byshop\www\app\(usuario)\meus-pedidos\page.tsx`

- [ ] **Step 1: Atualizar imports e remover Card**

Atualizar para usar `Table` do shadcn e remover `Card*`.

```tsx
"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuthStore } from "@/stores/auth-store"
import { useOrdersStore } from "@/stores/orders-store"
```

- [ ] **Step 2: Renderizar tabela com as 6 colunas solicitadas**

Substituir o `grid` de cards por:

```tsx
<div className="mt-8 rounded-lg border border-neutral-200 bg-white">
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
          <TableCell className="font-semibold text-neutral-900">#{order.id}</TableCell>
          <TableCell className="text-neutral-600">{formatDateTime(order.createdAt)}</TableCell>
          <TableCell className="text-neutral-600">{statusLabel[order.status] ?? order.status}</TableCell>
          <TableCell className="text-neutral-600">{order.items.length}</TableCell>
          <TableCell className="text-right font-semibold text-neutral-900">
            {formatCurrency(order.totals.total)}
          </TableCell>
          <TableCell className="text-right">
            <Button asChild size="sm">
              <Link href={`/meus-pedidos/${encodeURIComponent(order.id)}`}>Ver detalhes</Link>
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>
```

- [ ] **Step 3: Garantir que o estado vazio e os CTAs permaneçam idênticos**

Verificar que o bloco do `if (orders.length === 0)` permanece sem alterações funcionais (texto e links).

- [ ] **Step 4: Rodar verificação de TypeScript/Next build**

Run (no diretório `c:\LOPES\www\byshop\www`):

```bash
npm run lint
npm run build
```

Expected: comandos finalizam sem erro.

---

### Task 2: Criar página de detalhe `/meus-pedidos/[orderId]`

**Files:**
- Create: `c:\LOPES\www\byshop\www\app\(usuario)\meus-pedidos\[orderId]\page.tsx`

- [ ] **Step 1: Criar página client e ler `params.orderId`**

```tsx
"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/stores/auth-store"
import { useOrdersStore } from "@/stores/orders-store"
```

- [ ] **Step 2: Buscar pedido no store e validar acesso por e-mail (quando logado)**

Regras:
- Se não existir pedido com o `orderId`, mostrar “Pedido não encontrado”.
- Se existir `userEmail` e `order.customerEmail !== userEmail`, tratar como não encontrado.

- [ ] **Step 3: Renderizar UI do detalhe (cards “Detalhes” e “Itens”)**

Reutilizar helpers de formatação e `statusLabel` na própria página (sem criar dependências novas).

- [ ] **Step 4: Adicionar CTAs no fim (voltar para meus pedidos + continuar comprando)**

Links:
- `/meus-pedidos`
- `/produtos`
- `/minha-conta`

- [ ] **Step 5: Rodar verificação de TypeScript/Next build**

Run (no diretório `c:\LOPES\www\byshop\www`):

```bash
npm run lint
npm run build
```

Expected: comandos finalizam sem erro.

---

### Task 3: Atualizar documentação de andamento

**Files:**
- Modify: `c:\LOPES\www\byshop\.trae\docs\byshop\geral.md`

- [ ] **Step 1: Registrar entrega**

Adicionar um item de progresso indicando:
- “Meus pedidos: listagem migrada para tabela”
- “Rota de detalhe /meus-pedidos/[orderId] criada”

