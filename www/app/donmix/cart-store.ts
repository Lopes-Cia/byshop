"use client"

import { useSyncExternalStore } from "react"
import { z } from "zod"

import { safeGetItem, safeSetItem } from "@/lib/safe-storage"

import {
  chaveLinha,
  roundMoney,
  totalLinha,
  type AdicionalLinha,
  type CartLine,
} from "./product-types"

// IA-first: carrinho do Don Mix persistido entre a vitrine e a página de produto.
const STORAGE_KEY = "donmix:cart:v1"

const AdicionalLinhaSchema = z.object({
  id: z.number().int(),
  descricao: z.string().min(1),
  preco: z.number().nonnegative(),
  gratis: z.boolean(),
  qty: z.number().int().positive(),
})

const CartLineSchema = z.object({
  key: z.string().min(1),
  productId: z.string().min(1),
  codProd: z.number().int(),
  produtoNome: z.string().min(1),
  variacaoNome: z.string().min(1),
  imagem: z.string().min(1),
  precoBase: z.number().nonnegative(),
  precoOriginal: z.number().nonnegative().optional(),
  qty: z.number().int().positive(),
  adicionais: z.array(AdicionalLinhaSchema),
  observacao: z.string().max(200).optional(),
  qtAdicionalGratis: z.number().int().nonnegative(),
})

const PersistedSchema = z.object({
  lines: z.array(CartLineSchema),
})

export interface DonMixCartSnapshot {
  lines: CartLine[]
  count: number
  subtotal: number
  open: boolean
  addLine: (line: Omit<CartLine, "key">) => void
  incLine: (key: string) => void
  decLine: (key: string) => void
  removeLine: (key: string) => void
  clear: () => void
  setOpen: (open: boolean) => void
  openCart: () => void
}

const listeners = new Set<() => void>()

let lines: CartLine[] = []
let open = false
let hydrated = false
let lastLines: CartLine[] | null = null
let lastOpen: boolean | null = null
let lastSnapshot: DonMixCartSnapshot | null = null

function notify() {
  for (const listener of listeners) listener()
}

function persist(next: CartLine[]) {
  safeSetItem(STORAGE_KEY, JSON.stringify({ lines: next }))
}

function hydrate() {
  if (hydrated) return
  hydrated = true

  const raw = safeGetItem(STORAGE_KEY)
  if (!raw) return

  try {
    const parsed = PersistedSchema.safeParse(JSON.parse(raw))
    if (parsed.success) lines = parsed.data.lines
  } catch {
    // Storage corrompido: começa com o carrinho vazio.
  }
}

function setLines(updater: (current: CartLine[]) => CartLine[]) {
  hydrate()
  const next = updater(lines)
  lines = next
  persist(next)
  notify()
}

function clampQty(value: number) {
  if (!Number.isFinite(value)) return 1
  return Math.min(99, Math.max(1, Math.trunc(value)))
}

function addLine(input: Omit<CartLine, "key">) {
  const key = chaveLinha(input)
  const qty = clampQty(input.qty)

  setLines((current) => {
    const index = current.findIndex((line) => line.key === key)
    if (index === -1) return [{ ...input, qty, key }, ...current]

    const next = current.slice()
    next[index] = { ...next[index], qty: clampQty(next[index].qty + qty) }
    return next
  })
}

function incLine(key: string) {
  setLines((current) =>
    current.map((line) =>
      line.key === key ? { ...line, qty: clampQty(line.qty + 1) } : line,
    ),
  )
}

function decLine(key: string) {
  setLines((current) =>
    current.flatMap((line) => {
      if (line.key !== key) return [line]
      return line.qty > 1 ? [{ ...line, qty: line.qty - 1 }] : []
    }),
  )
}

function removeLine(key: string) {
  setLines((current) => current.filter((line) => line.key !== key))
}

function clear() {
  setLines(() => [])
}

function setOpen(next: boolean) {
  if (open === next) return
  open = next
  notify()
}

function openCart() {
  setOpen(true)
}

function getSnapshot(): DonMixCartSnapshot {
  hydrate()

  if (lastLines === lines && lastOpen === open && lastSnapshot) {
    return lastSnapshot
  }

  lastLines = lines
  lastOpen = open
  lastSnapshot = {
    lines,
    open,
    count: lines.reduce((sum, line) => sum + line.qty, 0),
    subtotal: roundMoney(
      lines.reduce((sum, line) => sum + totalLinha(line), 0),
    ),
    addLine,
    incLine,
    decLine,
    removeLine,
    clear,
    setOpen,
    openCart,
  }

  return lastSnapshot
}

const serverSnapshot: DonMixCartSnapshot = {
  lines: [],
  open: false,
  count: 0,
  subtotal: 0,
  addLine,
  incLine,
  decLine,
  removeLine,
  clear,
  setOpen,
  openCart,
}

function getServerSnapshot() {
  return serverSnapshot
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function useDonMixCart(): DonMixCartSnapshot {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

// IA-first: API fora de hooks (ex.: handlers em módulos client).
export const donMixCart = {
  getState: getSnapshot,
  subscribe,
  addLine,
  incLine,
  decLine,
  removeLine,
  clear,
  setOpen,
  openCart,
}
