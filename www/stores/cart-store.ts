'use client'

import { useSyncExternalStore } from "react"
import { z } from "zod"

import { coupons } from "@/lib/data"
import { CartItemSchema, CouponSchema, type CartItem } from "@/lib/schemas"

// IA-first: chave única para persistir o carrinho no localStorage (versionada para futuras migrações).
const CART_STORAGE_KEY = "byshop:cart:v1"

// IA-first: shape persistida (somente dados serializáveis; sem funções).
const CartPersistedSchema = z.object({
  items: CartItemSchema.array(),
  couponCode: z.string().trim().min(1).nullable(),
})

type CartPersistedState = z.infer<typeof CartPersistedSchema>

// IA-first: snapshot consumido por UI (inclui derivados + ações).
export type CartState = {
  items: CartItem[]
  couponCode: string | null
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  count: number
  addItem: (item: CartItem) => void
  // IA-first: `variant` é opcional para compatibilidade; sem variant remove/atualiza todas as variações do mesmo id.
  removeItem: (id: number, variant?: string) => void
  // IA-first: `variant` é opcional para compatibilidade; sem variant atualiza todas as variações do mesmo id.
  setQuantity: (id: number, quantity: number, variant?: string) => void
  clear: () => void
  setCouponCode: (code: string | null) => void
}

type Listener = () => void

const listeners = new Set<Listener>()

let hydrated = false

const defaultPersistedState: CartPersistedState = {
  items: [],
  couponCode: null,
}

let persistedState: CartPersistedState = defaultPersistedState
let lastSnapshotStateRef: CartPersistedState | null = null
let lastSnapshot: CartState | null = null

function notify() {
  for (const listener of listeners) listener()
}

function safeParseJson(input: string) {
  try {
    return JSON.parse(input) as unknown
  } catch {
    return null
  }
}

function readStorage(): CartPersistedState {
  if (typeof window === "undefined") return defaultPersistedState

  const raw = window.localStorage.getItem(CART_STORAGE_KEY)
  if (!raw) return defaultPersistedState

  const parsed = safeParseJson(raw)
  const res = CartPersistedSchema.safeParse(parsed)
  if (!res.success) return defaultPersistedState

  return res.data
}

function writeStorage(next: CartPersistedState) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next))
}

function ensureHydrated() {
  if (hydrated) return
  hydrated = true
  persistedState = readStorage()
}

function getCouponByCode(code: string | null) {
  if (!code) return null
  const normalized = code.trim().toUpperCase()
  const coupon = coupons.find((c) => c.code.toUpperCase() === normalized)
  const parsed = CouponSchema.safeParse(coupon)
  if (!parsed.success) return null
  if (!parsed.data.active) return null
  if (parsed.data.expiresAt) {
    const now = Date.now()
    const expiresAt = new Date(parsed.data.expiresAt).getTime()
    if (!Number.isFinite(expiresAt) || expiresAt < now) return null
  }
  return parsed.data
}

function clampInt(value: number, min: number, max: number) {
  const n = Number.isFinite(value) ? Math.trunc(value) : min
  return Math.min(max, Math.max(min, n))
}

function computeSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function computeDiscount(subtotal: number, couponCode: string | null) {
  const coupon = getCouponByCode(couponCode)
  if (!coupon) return 0
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) return 0

  if (coupon.type === "shipping") return 0

  if (coupon.type === "percent") {
    const raw = subtotal * (coupon.value / 100)
    return Math.max(0, Math.min(subtotal, raw))
  }

  return Math.max(0, Math.min(subtotal, coupon.value))
}

function roundMoney(value: number) {
  const n = Number.isFinite(value) ? value : 0
  return Math.round(n * 100) / 100
}

function computeBaseShipping(taxableSubtotal: number) {
  if (taxableSubtotal <= 0) return 0
  if (taxableSubtotal > 100) return 0
  return 9.99
}

function computeShipping(taxableSubtotal: number, couponCode: string | null) {
  const base = computeBaseShipping(taxableSubtotal)
  const coupon = getCouponByCode(couponCode)
  if (!coupon) return base
  if (coupon.type !== "shipping") return base
  if (taxableSubtotal <= 0) return 0
  return 0
}

function computeTax(taxableAmount: number) {
  const TAX_RATE = 0.08
  return roundMoney(Math.max(0, taxableAmount) * TAX_RATE)
}

function computeSnapshot(state: CartPersistedState): {
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  count: number
} {
  const subtotal = computeSubtotal(state.items)
  const discount = computeDiscount(subtotal, state.couponCode)
  const taxable = Math.max(0, subtotal - discount)
  const shipping = computeShipping(taxable, state.couponCode)
  const tax = computeTax(taxable)
  const total = roundMoney(Math.max(0, taxable + shipping + tax))
  const count = state.items.reduce((sum, item) => sum + item.quantity, 0)
  return { subtotal, discount, shipping, tax, total, count }
}

function setPersistedState(updater: (current: CartPersistedState) => CartPersistedState) {
  ensureHydrated()

  const next = updater(persistedState)
  const parsed = CartPersistedSchema.safeParse(next)
  if (!parsed.success) return

  persistedState = parsed.data
  writeStorage(persistedState)
  notify()
}

function addItem(item: CartItem) {
  setPersistedState((current) => {
    const idx = current.items.findIndex((i) => i.id === item.id && i.variant === item.variant)
    if (idx === -1) return { ...current, items: [item, ...current.items] }

    const existing = current.items[idx]
    const quantity = clampInt(existing.quantity + item.quantity, 1, 999)
    const nextItems = current.items.slice()
    nextItems[idx] = { ...existing, quantity }
    return { ...current, items: nextItems }
  })
}

function removeItem(id: number, variant?: string) {
  setPersistedState((current) => {
    const nextItems =
      typeof variant === "string"
        ? current.items.filter((i) => !(i.id === id && i.variant === variant))
        : current.items.filter((i) => i.id !== id)

    return { ...current, items: nextItems }
  })
}

function setQuantity(id: number, quantity: number, variant?: string) {
  setPersistedState((current) => {
    const nextQty = clampInt(quantity, 1, 999)
    const shouldMatch = (i: CartItem) => i.id === id && (typeof variant !== "string" || i.variant === variant)
    return {
      ...current,
      items: current.items.map((i) => (shouldMatch(i) ? { ...i, quantity: nextQty } : i)),
    }
  })
}

function clear() {
  setPersistedState(() => defaultPersistedState)
}

function setCouponCode(code: string | null) {
  const normalized = code ? code.trim().toUpperCase() : null
  setPersistedState((current) => ({ ...current, couponCode: normalized && normalized.length > 0 ? normalized : null }))
}

function getStateSnapshot(): CartState {
  ensureHydrated()
  if (lastSnapshotStateRef === persistedState && lastSnapshot) return lastSnapshot

  const derived = computeSnapshot(persistedState)
  lastSnapshotStateRef = persistedState
  lastSnapshot = {
    items: persistedState.items,
    couponCode: persistedState.couponCode,
    ...derived,
    addItem,
    removeItem,
    setQuantity,
    clear,
    setCouponCode,
  }
  return lastSnapshot
}

const serverSnapshot: CartState = {
  items: defaultPersistedState.items,
  couponCode: defaultPersistedState.couponCode,
  ...computeSnapshot(defaultPersistedState),
  addItem,
  removeItem,
  setQuantity,
  clear,
  setCouponCode,
}

function getServerSnapshot(): CartState {
  return serverSnapshot
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useCartStore<T>(selector: (state: CartState) => T): T {
  const state = useSyncExternalStore(subscribe, getStateSnapshot, getServerSnapshot)
  return selector(state)
}

// IA-first: API opcional para uso fora de hooks (ex.: handlers em módulos client).
export const cartStore = {
  getState: getStateSnapshot,
  subscribe,
  addItem,
  removeItem,
  setQuantity,
  clear,
  setCouponCode,
}
