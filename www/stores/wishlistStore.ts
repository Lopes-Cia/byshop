import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product } from "@/lib/schemas"

interface WishlistStore {
  items: Product[]
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  toggleItem: (product: Product) => void
  isInWishlist: (id: string) => boolean
  getCount: () => number
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          if (state.items.some((item) => item.id === product.id)) return state
          return { items: [product, ...state.items] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      toggleItem: (product) => {
        const has = get().items.some((item) => item.id === product.id)
        if (has) {
          get().removeItem(product.id)
          return
        }
        get().addItem(product)
      },
      isInWishlist: (id) => get().items.some((item) => item.id === id),
      getCount: () => get().items.length,
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "wishlist-storage",
    }
  )
)
