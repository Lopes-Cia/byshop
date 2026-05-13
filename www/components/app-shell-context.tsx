'use client'

import { createContext, useContext } from "react"

// IA-first: esta API representa ações globais do "shell" (camada de layout) que podem ser disparadas por qualquer página.
export type AppShellApi = {
  openCart: () => void
  closeCart: () => void
  openSearch: () => void
  closeSearch: () => void
  openMobileMenu: () => void
  closeMobileMenu: () => void
}

// IA-first: o contexto fica `null` fora do provider; o hook abaixo lança erro para evitar uso incorreto.
const AppShellContext = createContext<AppShellApi | null>(null)

export function AppShellProvider({
  value,
  children,
}: {
  value: AppShellApi
  children: React.ReactNode
}) {
  return <AppShellContext.Provider value={value}>{children}</AppShellContext.Provider>
}

export function useAppShell(): AppShellApi {
  const ctx = useContext(AppShellContext)
  if (!ctx) {
    throw new Error("useAppShell deve ser usado dentro de AppShellProvider")
  }
  return ctx
}
