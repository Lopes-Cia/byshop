import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "@/lib/schemas"

type CartPricingSummary = {
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
}

type CouponCode = "SAVE10" | "SAVE20" | "FREESHIP"

type AppliedCoupon =
  | { code: "SAVE10"; kind: "percent"; percent: 0.1 }
  | { code: "SAVE20"; kind: "percent"; percent: 0.2 }
  | { code: "FREESHIP"; kind: "freeship" }

const COUPONS: Record<CouponCode, AppliedCoupon> = {
  SAVE10: { code: "SAVE10", kind: "percent", percent: 0.1 },
  SAVE20: { code: "SAVE20", kind: "percent", percent: 0.2 },
  FREESHIP: { code: "FREESHIP", kind: "freeship" },
}

const normalizeCouponCode = (value: string) => value.trim().toUpperCase()

interface CartStore {
  items: CartItem[]
  discountAmount: number
  coupon: AppliedCoupon | null
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  setDiscountAmount: (amount: number) => void
  clearDiscount: () => void
  applyCoupon: (code: string) => { ok: true } | { ok: false; error: string }
  removeCoupon: () => void
  getTotal: () => number
  getItemCount: () => number
  getSummary: () => CartPricingSummary
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      discountAmount: 0,
      coupon: null,

      addItem: (newItem) =>
        set((state) => {
          const existingItem = state.items.find((item) => item.id === newItem.id)

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item,
              ),
            }
          }

          return { items: [...state.items, newItem] }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }

        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        }))
      },

      setDiscountAmount: (amount) => {
        set({ discountAmount: Number.isFinite(amount) ? Math.max(0, amount) : 0 })
      },

      clearDiscount: () => set({ discountAmount: 0 }),

      applyCoupon: (code) => {
        const normalized = normalizeCouponCode(code)

        if (!normalized) return { ok: false, error: "Informe um cupom." }

        if (!(normalized in COUPONS)) return { ok: false, error: "Cupom inválido." }

        const nextCoupon = COUPONS[normalized as CouponCode]
        if (get().coupon?.code === nextCoupon.code) return { ok: false, error: "Este cupom já está aplicado." }

        set({ coupon: nextCoupon })
        return { ok: true }
      },

      removeCoupon: () => set({ coupon: null }),

      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },

      getSummary: () => {
        const subtotal = get().items.reduce((total, item) => total + item.price * item.quantity, 0)
        const coupon = get().coupon
        const rawManualDiscount = get().discountAmount ?? 0
        const manualDiscount = Math.min(Math.max(0, rawManualDiscount), subtotal)
        const couponDiscount =
          coupon?.kind === "percent" ? Math.min(subtotal, Math.max(0, subtotal * coupon.percent)) : 0
        const discount = Math.min(subtotal, manualDiscount + couponDiscount)
        const taxableSubtotal = Math.max(0, subtotal - discount)
        const baseShipping = taxableSubtotal === 0 ? 0 : taxableSubtotal > 100 ? 0 : 9.99
        const shipping = coupon?.kind === "freeship" && taxableSubtotal > 0 ? 0 : baseShipping
        const tax = taxableSubtotal * 0.08
        const total = taxableSubtotal + shipping + tax

        return { subtotal, discount, shipping, tax, total }
      },

      clearCart: () => set({ items: [], discountAmount: 0, coupon: null }),
    }),
    {
      name: "cart-storage",
    },
  ),
)
