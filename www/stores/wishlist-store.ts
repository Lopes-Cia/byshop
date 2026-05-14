'use client'

import { useSyncExternalStore } from "react"
import { z } from "zod"

import { safeGetItem, safeRemoveItem, safeSetItem } from "@/lib/safe-storage"

const WISHLIST_STORAGE_KEY = "byshop:wishlist:v2"
const WISHLIST_STORAGE_KEY_V1 = "byshop:wishlist:v1"

const WishlistItemSchema = z.object({
  productId: z.number().int().positive(),
  addedAt: z.string().min(1),
})

export type WishlistItem = z.infer<typeof WishlistItemSchema>

const WishlistPersistedSchema = z.object({
  items: WishlistItemSchema.array(),
})

type WishlistPersistedState = z.infer<typeof WishlistPersistedSchema>

export type WishlistState = {
  items: WishlistItem[]
  count: number
  add: (productId: number) => void
  remove: (productId: number) => void
  toggle: (productId: number) => void
  clear: () => void
  has: (productId: number) => boolean
}

type Listener = () => void

const listeners = new Set<Listener>()

let hydrated = false

const defaultPersistedState: WishlistPersistedState = { items: [] }
let persistedState: WishlistPersistedState = defaultPersistedState

let lastSnapshotStateRef: WishlistPersistedState | null = null
let lastSnapshot: WishlistState | null = null

const serverSnapshot: WishlistState = {
  items: [],
  count: 0,
  add: () => {},
  remove: () => {},
  toggle: () => {},
  clear: () => {},
  has: () => false,
}

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

function readStorage(): WishlistPersistedState {
  const raw = safeGetItem(WISHLIST_STORAGE_KEY)
  if (!raw) return defaultPersistedState
  const parsed = safeParseJson(raw)
  const res = WishlistPersistedSchema.safeParse(parsed)
  if (!res.success) return defaultPersistedState
  return res.data
}

function writeStorage(next: WishlistPersistedState) {
  safeSetItem(WISHLIST_STORAGE_KEY, JSON.stringify(next))
}

function ensureHydrated() {
  if (hydrated) return
  hydrated = true
  safeRemoveItem(WISHLIST_STORAGE_KEY_V1)
  persistedState = readStorage()
}

function setPersistedState(updater: (current: WishlistPersistedState) => WishlistPersistedState) {
  ensureHydrated()
  const next = updater(persistedState)
  const parsed = WishlistPersistedSchema.safeParse(next)
  if (!parsed.success) return
  persistedState = parsed.data
  writeStorage(persistedState)
  notify()
}

function add(productId: number) {
  setPersistedState((current) => {
    if (current.items.some((i) => i.productId === productId)) return current
    const nextItem: WishlistItem = {
      productId,
      addedAt: new Date().toISOString(),
    }
    return { ...current, items: [nextItem, ...current.items] }
  })
}

function remove(productId: number) {
  setPersistedState((current) => ({ ...current, items: current.items.filter((i) => i.productId !== productId) }))
}

function toggle(productId: number) {
  ensureHydrated()
  const hasItem = persistedState.items.some((i) => i.productId === productId)
  if (hasItem) {
    remove(productId)
    return
  }
  add(productId)
}

function clear() {
  setPersistedState(() => defaultPersistedState)
}

function has(productId: number) {
  ensureHydrated()
  return persistedState.items.some((i) => i.productId === productId)
}

function getStateSnapshot(): WishlistState {
  ensureHydrated()
  if (lastSnapshotStateRef === persistedState && lastSnapshot) return lastSnapshot

  lastSnapshotStateRef = persistedState
  lastSnapshot = {
    items: persistedState.items,
    count: persistedState.items.length,
    add,
    remove,
    toggle,
    clear,
    has,
  }
  return lastSnapshot
}

function getServerSnapshot(): WishlistState {
  return serverSnapshot
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useWishlistStore<T>(selector: (state: WishlistState) => T): T {
  const state = useSyncExternalStore(subscribe, getStateSnapshot, getServerSnapshot)
  return selector(state)
}

export const wishlistStore = {
  getState: getStateSnapshot,
  subscribe,
  add,
  remove,
  toggle,
  clear,
  has,
}
