'use client'

import { useSyncExternalStore } from "react"
import { z } from "zod"

import { MOCK_CUSTOMER } from "@/lib/mocks"
import { safeGetItem, safeRemoveItem, safeSetItem } from "@/lib/safe-storage"

export const MOCK_AUTH_USER = {
  email: MOCK_CUSTOMER.email,
  password: "demo123",
  firstName: MOCK_CUSTOMER.firstName,
  lastName: MOCK_CUSTOMER.lastName,
} as const

const AUTH_STORAGE_KEY = "byshop:auth:v2"
const AUTH_STORAGE_KEY_V1 = "byshop:auth:v1"

const UserSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
})

export type User = z.infer<typeof UserSchema>

const AuthPersistedSchema = z.object({
  user: UserSchema.nullable(),
})

type AuthPersistedState = z.infer<typeof AuthPersistedSchema>

type AuthVolatileState = {
  isLoading: boolean
}

export type AuthState = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (input: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>
  logout: () => void
}

type Listener = () => void

const listeners = new Set<Listener>()

let hydrated = false

const defaultPersistedState: AuthPersistedState = { user: null }
let persistedState: AuthPersistedState = defaultPersistedState

let volatileState: AuthVolatileState = { isLoading: false }

let lastSnapshotPersistedRef: AuthPersistedState | null = null
let lastSnapshotIsLoading: boolean | null = null
let lastSnapshot: AuthState | null = null

const serverSnapshot: AuthState = {
  user: null,
  isLoading: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
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

function readStorage(): AuthPersistedState {
  const raw = safeGetItem(AUTH_STORAGE_KEY)
  if (!raw) return defaultPersistedState
  const parsed = safeParseJson(raw)
  const res = AuthPersistedSchema.safeParse(parsed)
  if (!res.success) return defaultPersistedState
  return res.data
}

function writeStorage(next: AuthPersistedState) {
  safeSetItem(AUTH_STORAGE_KEY, JSON.stringify(next))
}

function ensureHydrated() {
  if (hydrated) return
  hydrated = true
  safeRemoveItem(AUTH_STORAGE_KEY_V1)
  persistedState = readStorage()
  volatileState = { isLoading: false }
}

function setPersistedState(updater: (current: AuthPersistedState) => AuthPersistedState) {
  ensureHydrated()
  const next = updater(persistedState)
  const parsed = AuthPersistedSchema.safeParse(next)
  if (!parsed.success) return
  persistedState = parsed.data
  writeStorage(persistedState)
  notify()
}

function setIsLoading(isLoading: boolean) {
  if (volatileState.isLoading === isLoading) return
  volatileState = { isLoading }
  notify()
}

function createUserId() {
  const uuid = globalThis.crypto?.randomUUID?.()
  if (uuid) return `usr_${uuid}`
  const rand = Math.random().toString(16).slice(2, 10)
  return `usr_${Date.now()}_${rand}`
}

async function mockDelay(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

async function login(email: string, password: string) {
  setIsLoading(true)
  try {
    await mockDelay(600)
    if (email !== MOCK_AUTH_USER.email || password !== MOCK_AUTH_USER.password) {
      throw new Error("E-mail ou senha inválidos.")
    }
    const user: User = UserSchema.parse({
      id: "mock-1",
      email: MOCK_AUTH_USER.email,
      firstName: MOCK_AUTH_USER.firstName,
      lastName: MOCK_AUTH_USER.lastName,
    })
    setPersistedState((current) => ({ ...current, user }))
  } finally {
    setIsLoading(false)
  }
}

async function signup(input: { email: string; password: string; firstName: string; lastName: string }) {
  setIsLoading(true)
  try {
    await mockDelay(600)
    const user: User = UserSchema.parse({
      id: createUserId(),
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
    })
    setPersistedState((current) => ({ ...current, user }))
  } finally {
    setIsLoading(false)
  }
}

function logout() {
  setPersistedState((current) => ({ ...current, user: null }))
}

function getStateSnapshot(): AuthState {
  ensureHydrated()
  if (
    lastSnapshotPersistedRef === persistedState &&
    lastSnapshotIsLoading === volatileState.isLoading &&
    lastSnapshot
  ) {
    return lastSnapshot
  }

  lastSnapshotPersistedRef = persistedState
  lastSnapshotIsLoading = volatileState.isLoading
  lastSnapshot = {
    user: persistedState.user,
    isLoading: volatileState.isLoading,
    login,
    signup,
    logout,
  }
  return lastSnapshot
}

function getServerSnapshot(): AuthState {
  return serverSnapshot
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useAuthStore<T>(selector: (state: AuthState) => T): T {
  const state = useSyncExternalStore(subscribe, getStateSnapshot, getServerSnapshot)
  return selector(state)
}

export const authStore = {
  getState: getStateSnapshot,
  subscribe,
  login,
  signup,
  logout,
}
