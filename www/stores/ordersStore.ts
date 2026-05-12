import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "@/lib/schemas"

export type OrderStatus = "processing" | "paid" | "shipped" | "delivered" | "canceled"

export type OrderTotals = {
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
}

export type OrderTracking = {
  carrier: string
  code: string
  url: string
}

export type Order = {
  id: string
  createdAt: string
  userId: string | null
  customerEmail: string
  items: CartItem[]
  totals: OrderTotals
  status: OrderStatus
  tracking: OrderTracking
}

type CreateOrderInput = {
  items: CartItem[]
  totals: OrderTotals
  userId?: string | null
  customerEmail: string
}

interface OrdersStore {
  orders: Order[]
  lastCreatedOrderId: string | null
  createOrder: (input: CreateOrderInput) => Order
  getOrderById: (id: string) => Order | undefined
  getOrdersByUserId: (userId: string) => Order[]
  clearOrders: () => void
}

const createOrderId = () => {
  const uuid = globalThis.crypto?.randomUUID?.()
  if (uuid) return `ord_${uuid}`
  return `ord_${Date.now()}_${Math.random().toString(16).slice(2)}`
}

const createTracking = () => {
  const code = `TRK-${Math.random().toString(36).slice(2, 10).toUpperCase()}`
  return {
    carrier: "MockExpress",
    code,
    url: `https://tracking.mock/${encodeURIComponent(code)}`,
  } satisfies OrderTracking
}

export const useOrdersStore = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],
      lastCreatedOrderId: null,
      createOrder: ({ items, totals, userId = null, customerEmail }) => {
        const newOrder: Order = {
          id: createOrderId(),
          createdAt: new Date().toISOString(),
          userId,
          customerEmail,
          items: items.map((item) => ({ ...item })),
          totals: { ...totals },
          status: "processing",
          tracking: createTracking(),
        }

        set((state) => ({
          orders: [newOrder, ...state.orders],
          lastCreatedOrderId: newOrder.id,
        }))

        return newOrder
      },
      getOrderById: (id) => get().orders.find((order) => order.id === id),
      getOrdersByUserId: (userId) => get().orders.filter((order) => order.userId === userId),
      clearOrders: () => set({ orders: [], lastCreatedOrderId: null }),
    }),
    {
      name: "orders-storage",
    }
  )
)

