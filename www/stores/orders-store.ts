'use client'

import { useSyncExternalStore } from "react"
import { z } from "zod"

import { coupons } from "@/lib/data"
import { safeGetItem, safeRemoveItem, safeSetItem } from "@/lib/safe-storage"
import { CouponSchema, OrderSchema, OrderStatusSchema, OrderTotalsSchema, type CartItem, type Order } from "@/lib/schemas"

// IA-first: storage v2 descarta dados antigos do v1 (sem migração) para manter schema estrito.
const ORDERS_STORAGE_KEY = "byshop:orders:v2"
const ORDERS_STORAGE_KEY_V1 = "byshop:orders:v1"

// IA-first: shape persistida (somente dados serializáveis; sem funções).
const OrdersPersistedSchema = z.object({
  orders: OrderSchema.array(),
  lastCreatedOrderId: z.string().nullable(),
})

type OrdersPersistedState = z.infer<typeof OrdersPersistedSchema>

export type CreateOrderInput = {
  items: CartItem[]
  customerEmail: string
  couponCode?: string | null
  totals?: {
    subtotal?: number
    shipping?: number
    tax?: number
    discount?: number
    total?: number
  }
}

export type OrdersState = {
  orders: Order[]
  lastCreatedOrderId: string | null
  createOrder: (input: CreateOrderInput) => Order
  getOrderById: (id: string) => Order | undefined
  setStatus: (id: string, status: z.infer<typeof OrderStatusSchema>) => void
  clear: () => void
}

type Listener = () => void

const listeners = new Set<Listener>()

let hydrated = false

const defaultPersistedState: OrdersPersistedState = {
  orders: [],
  lastCreatedOrderId: null,
}

let persistedState: OrdersPersistedState = defaultPersistedState
let lastSnapshotStateRef: OrdersPersistedState | null = null
let lastSnapshot: OrdersState | null = null

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

function readStorage(): OrdersPersistedState {
  const raw = safeGetItem(ORDERS_STORAGE_KEY)
  if (!raw) return defaultPersistedState

  const parsed = safeParseJson(raw)
  const res = OrdersPersistedSchema.safeParse(parsed)
  if (!res.success) return defaultPersistedState

  return res.data
}

function writeStorage(next: OrdersPersistedState) {
  safeSetItem(ORDERS_STORAGE_KEY, JSON.stringify(next))
}

function ensureHydrated() {
  if (hydrated) return
  safeRemoveItem(ORDERS_STORAGE_KEY_V1)
  hydrated = true
  persistedState = readStorage()
}

function createOrderId() {
  const uuid = globalThis.crypto?.randomUUID?.()
  if (uuid) return `ord_${uuid}`
  const rand = Math.random().toString(16).slice(2, 10)
  return `ord_${Date.now()}_${rand}`
}

function createTracking() {
  const code = `TRK-${Math.random().toString(36).slice(2, 10).toUpperCase()}`
  return {
    carrier: "MockExpress",
    code,
    url: `https://tracking.mock/${encodeURIComponent(code)}`,
  }
}

function computeSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
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

function roundMoney(value: number) {
  const n = Number.isFinite(value) ? value : 0
  return Math.round(n * 100) / 100
}

function computeDiscount(subtotal: number, couponCode: string | null) {
  const coupon = getCouponByCode(couponCode)
  if (!coupon) return 0
  if (coupon.minSubtotal && subtotal < coupon.minSubtotal) return 0

  if (coupon.type === "shipping") return 0

  if (coupon.type === "percent") {
    const raw = subtotal * (coupon.value / 100)
    return roundMoney(Math.max(0, Math.min(subtotal, raw)))
  }

  return roundMoney(Math.max(0, Math.min(subtotal, coupon.value)))
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

function computeTotals(input: CreateOrderInput) {
  const subtotal = input.totals?.subtotal ?? computeSubtotal(input.items)
  const couponCode = input.couponCode ?? null
  const discount = input.totals?.discount ?? computeDiscount(subtotal, couponCode)
  const taxable = Math.max(0, subtotal - discount)
  const shipping = input.totals?.shipping ?? computeShipping(taxable, couponCode)
  const tax = input.totals?.tax ?? computeTax(taxable)
  const total = input.totals?.total ?? roundMoney(Math.max(0, taxable + shipping + tax))

  return OrderTotalsSchema.parse({ subtotal, shipping, tax, discount, total })
}

function setPersistedState(updater: (current: OrdersPersistedState) => OrdersPersistedState) {
  ensureHydrated()

  const next = updater(persistedState)
  const parsed = OrdersPersistedSchema.safeParse(next)
  if (!parsed.success) return

  persistedState = parsed.data
  writeStorage(persistedState)
  notify()
}

function createOrder(input: CreateOrderInput): Order {
  const order: Order = {
    id: createOrderId(),
    createdAt: new Date().toISOString(),
    customerEmail: input.customerEmail,
    items: input.items.map((i) => ({ ...i })),
    totals: computeTotals(input),
    status: "processing",
    couponCode: input.couponCode ?? null,
    tracking: createTracking(),
  }

  const parsed = OrderSchema.parse(order)

  setPersistedState((current) => ({
    ...current,
    orders: [parsed, ...current.orders],
    lastCreatedOrderId: parsed.id,
  }))

  return parsed
}

function getOrderById(id: string) {
  ensureHydrated()
  return persistedState.orders.find((o) => o.id === id)
}

function setStatus(id: string, status: z.infer<typeof OrderStatusSchema>) {
  const parsed = OrderStatusSchema.safeParse(status)
  if (!parsed.success) return

  setPersistedState((current) => ({
    ...current,
    orders: current.orders.map((o) => (o.id === id ? { ...o, status: parsed.data } : o)),
  }))
}

function clear() {
  setPersistedState(() => defaultPersistedState)
}

function getStateSnapshot(): OrdersState {
  ensureHydrated()
  if (lastSnapshotStateRef === persistedState && lastSnapshot) return lastSnapshot

  lastSnapshotStateRef = persistedState
  lastSnapshot = {
    orders: persistedState.orders,
    lastCreatedOrderId: persistedState.lastCreatedOrderId,
    createOrder,
    getOrderById,
    setStatus,
    clear,
  }
  return lastSnapshot
}

const serverSnapshot: OrdersState = {
  orders: defaultPersistedState.orders,
  lastCreatedOrderId: defaultPersistedState.lastCreatedOrderId,
  createOrder,
  getOrderById,
  setStatus,
  clear,
}

function getServerSnapshot(): OrdersState {
  return serverSnapshot
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useOrdersStore<T>(selector: (state: OrdersState) => T): T {
  const state = useSyncExternalStore(subscribe, getStateSnapshot, getServerSnapshot)
  return selector(state)
}

// IA-first: API opcional para uso fora de hooks (ex.: handlers em módulos client).
export const ordersStore = {
  getState: getStateSnapshot,
  subscribe,
  createOrder,
  getOrderById,
  setStatus,
  clear,
}
