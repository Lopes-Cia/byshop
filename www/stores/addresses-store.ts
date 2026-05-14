'use client'

import { useSyncExternalStore } from "react"
import { z } from "zod"

import { safeGetItem, safeRemoveItem, safeSetItem } from "@/lib/safe-storage"

const ADDRESSES_STORAGE_KEY = "byshop:addresses:v2"
const ADDRESSES_STORAGE_KEY_V1 = "byshop:addresses:v1"

const AddressSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  recipientName: z.string().min(1),
  phone: z.string().min(8),
  cep: z.string().min(8),
  street: z.string().min(1),
  number: z.string().min(1),
  neighborhood: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(2).max(2),
  complement: z.string().optional(),
  isDefault: z.boolean(),
})

export type Address = z.infer<typeof AddressSchema>

const AddressesPersistedSchema = z.object({
  addresses: AddressSchema.array(),
})

type AddressesPersistedState = z.infer<typeof AddressesPersistedSchema>

export type AddressesState = {
  addresses: Address[]
  defaultAddressId: string | null
  addAddress: (input: Omit<Address, "id" | "isDefault"> & { isDefault?: boolean }) => void
  updateAddress: (id: string, patch: Partial<Omit<Address, "id">>) => void
  removeAddress: (id: string) => void
  setDefaultAddress: (id: string) => void
  clear: () => void
  getById: (id: string) => Address | undefined
}

type Listener = () => void

const listeners = new Set<Listener>()

let hydrated = false

const defaultPersistedState: AddressesPersistedState = { addresses: [] }
let persistedState: AddressesPersistedState = defaultPersistedState

let lastSnapshotStateRef: AddressesPersistedState | null = null
let lastSnapshot: AddressesState | null = null

const serverSnapshot: AddressesState = {
  addresses: [],
  defaultAddressId: null,
  addAddress: () => {},
  updateAddress: () => {},
  removeAddress: () => {},
  setDefaultAddress: () => {},
  clear: () => {},
  getById: () => undefined,
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

function readStorage(): AddressesPersistedState {
  const raw = safeGetItem(ADDRESSES_STORAGE_KEY)
  if (!raw) return defaultPersistedState
  const parsed = safeParseJson(raw)
  const res = AddressesPersistedSchema.safeParse(parsed)
  if (!res.success) return defaultPersistedState
  return res.data
}

function writeStorage(next: AddressesPersistedState) {
  safeSetItem(ADDRESSES_STORAGE_KEY, JSON.stringify(next))
}

function ensureHydrated() {
  if (hydrated) return
  hydrated = true
  safeRemoveItem(ADDRESSES_STORAGE_KEY_V1)
  persistedState = readStorage()
}

function setPersistedState(updater: (current: AddressesPersistedState) => AddressesPersistedState) {
  ensureHydrated()
  const next = updater(persistedState)
  const parsed = AddressesPersistedSchema.safeParse(next)
  if (!parsed.success) return
  persistedState = parsed.data
  writeStorage(persistedState)
  notify()
}

function createId(prefix: string) {
  const uuid = globalThis.crypto?.randomUUID?.()
  if (uuid) return `${prefix}_${uuid}`
  const rand = Math.random().toString(16).slice(2, 10)
  return `${prefix}_${Date.now()}_${rand}`
}

function normalizeDefault(addresses: Address[], defaultId: string | null) {
  const hasDefault = typeof defaultId === "string" && addresses.some((a) => a.id === defaultId)
  const nextDefaultId = hasDefault ? defaultId : addresses[0]?.id ?? null
  return addresses.map((a) => ({ ...a, isDefault: nextDefaultId ? a.id === nextDefaultId : false }))
}

function addAddress(input: Omit<Address, "id" | "isDefault"> & { isDefault?: boolean }) {
  const id = createId("adr")
  setPersistedState((current) => {
    const requestedDefault = Boolean(input.isDefault) || current.addresses.length === 0
    const nextDefaultId = requestedDefault ? id : current.addresses.find((a) => a.isDefault)?.id ?? null
    const nextAddress: Address = AddressSchema.parse({
      id,
      label: input.label,
      recipientName: input.recipientName,
      phone: input.phone,
      cep: input.cep,
      street: input.street,
      number: input.number,
      neighborhood: input.neighborhood,
      city: input.city,
      state: input.state.toUpperCase(),
      complement: input.complement,
      isDefault: false,
    })
    const nextAddresses = normalizeDefault([nextAddress, ...current.addresses], nextDefaultId)
    return { addresses: nextAddresses }
  })
}

function updateAddress(id: string, patch: Partial<Omit<Address, "id">>) {
  setPersistedState((current) => {
    const nextAddresses = current.addresses.map((a) => {
      if (a.id !== id) return a
      const merged = { ...a, ...patch, state: (patch.state ?? a.state).toUpperCase() }
      return AddressSchema.parse(merged)
    })
    const nextDefaultId = nextAddresses.find((a) => a.isDefault)?.id ?? null
    return { addresses: normalizeDefault(nextAddresses, nextDefaultId) }
  })
}

function removeAddress(id: string) {
  setPersistedState((current) => {
    const nextAddresses = current.addresses.filter((a) => a.id !== id)
    const nextDefaultId = nextAddresses.find((a) => a.isDefault)?.id ?? null
    return { addresses: normalizeDefault(nextAddresses, nextDefaultId) }
  })
}

function setDefaultAddress(id: string) {
  setPersistedState((current) => ({ addresses: normalizeDefault(current.addresses, id) }))
}

function clear() {
  setPersistedState(() => defaultPersistedState)
}

function getById(id: string) {
  ensureHydrated()
  return persistedState.addresses.find((a) => a.id === id)
}

function getStateSnapshot(): AddressesState {
  ensureHydrated()
  if (lastSnapshotStateRef === persistedState && lastSnapshot) return lastSnapshot

  lastSnapshotStateRef = persistedState
  const defaultAddressId = persistedState.addresses.find((a) => a.isDefault)?.id ?? null
  lastSnapshot = {
    addresses: persistedState.addresses,
    defaultAddressId,
    addAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress,
    clear,
    getById,
  }
  return lastSnapshot
}

function getServerSnapshot(): AddressesState {
  return serverSnapshot
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useAddressesStore<T>(selector: (state: AddressesState) => T): T {
  const state = useSyncExternalStore(subscribe, getStateSnapshot, getServerSnapshot)
  return selector(state)
}

export const addressesStore = {
  getState: getStateSnapshot,
  subscribe,
  addAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress,
  clear,
  getById,
}
