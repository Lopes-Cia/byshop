# AppShell global (Top Bar + Header + Footer) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Centralizar Top Bar + Header + Footer + overlays (busca/carrinho/menu mobile) no `app/layout.tsx`, removendo duplicação das páginas.

**Architecture:** Criar um `AppShell` (client) com um Context + hook para páginas acionarem ações globais (ex.: abrir carrinho). O `layout.tsx` (server) apenas envolve `children` com `AppShell`.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Tailwind CSS, lucide-react.

---

## Mapa de arquivos

**Create**
- `c:/LOPES/www/byshop/www/components/app-shell-context.tsx`
- `c:/LOPES/www/byshop/www/components/app-shell.tsx`

**Modify**
- `c:/LOPES/www/byshop/www/app/layout.tsx`
- `c:/LOPES/www/byshop/www/app/(loja)/(inicio)/page.tsx`
- `c:/LOPES/www/byshop/www/app/(shop)/produtos/[id]/page.tsx`
- `c:/LOPES/www/byshop/.trae/docs/byshop/geral.md`

---

### Task 1: Criar AppShell Context (API para páginas)

**Files:**
- Create: `c:/LOPES/www/byshop/www/components/app-shell-context.tsx`

- [ ] **Step 1: Criar o contexto e o hook**

```tsx
'use client'

import { createContext, useContext } from 'react'

export type AppShellApi = {
  openCart: () => void
  closeCart: () => void
  openSearch: () => void
  closeSearch: () => void
  openMobileMenu: () => void
  closeMobileMenu: () => void
}

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
    throw new Error('useAppShell deve ser usado dentro de AppShellProvider')
  }
  return ctx
}
```

- [ ] **Step 2: Verificar build localmente (manual)**

Run: `npm run dev` (opcional)  
Expected: app inicializa sem erro de módulo.

---

### Task 2: Criar AppShell (Top Bar + Header + Footer + Overlays globais)

**Files:**
- Create: `c:/LOPES/www/byshop/www/components/app-shell.tsx`

- [ ] **Step 1: Definir estado global e API**

```tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  ChevronRight,
  CreditCard,
  Cpu,
  Gamepad2,
  Gift,
  GraduationCap,
  Hash,
  Heart,
  MapPin,
  Minus,
  Monitor,
  Package,
  Plus,
  Search,
  Star,
  Trash2,
  User,
  Wallet,
  X,
} from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AppShellProvider } from '@/components/app-shell-context'
import { allSearchData, cartItemsMock } from '@/lib/data'

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)

export function AppShell({ children }: { children: React.ReactNode }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const api = useMemo(
    () => ({
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      openSearch: () => setIsSearchOpen(true),
      closeSearch: () => setIsSearchOpen(false),
      openMobileMenu: () => setIsMobileMenuOpen(true),
      closeMobileMenu: () => setIsMobileMenuOpen(false),
    }),
    []
  )

  const filteredResults =
    searchQuery.trim() === ''
      ? allSearchData.map((cat) => ({ ...cat, items: cat.items.slice(0, 3) }))
      : allSearchData
          .map((cat) => ({
            ...cat,
            items: cat.items.filter(
              (item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase())
            ),
          }))
          .filter((cat) => cat.items.length > 0)

  const allFilteredItems = filteredResults.flatMap((cat) => cat.items)
  const cartTotal = cartItemsMock.reduce((sum, item) => sum + item.price * item.quantity, 0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false)
        setSearchQuery('')
        setSelectedIndex(0)
      }
      if (isSearchOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex((prev) => Math.min(prev + 1, allFilteredItems.length - 1))
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex((prev) => Math.max(prev - 1, 0))
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSearchOpen, allFilteredItems.length])

  return (
    <AppShellProvider value={api}>
      <div className="min-h-screen bg-white">
        {/* Top Bar */}
        <div className="bg-neutral-100 border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between text-xs text-neutral-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Avisos da ByShop</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <span>Português</span>
              <span>R$ BRL</span>
              <span>BRL</span>
              <span>Atendimento</span>
              <span>Vender na ByShop</span>
            </div>
          </div>
        </div>

        <Header
          onMobileMenuOpen={() => setIsMobileMenuOpen(true)}
          onSearchOpen={() => setIsSearchOpen(true)}
          onCartOpen={() => setIsCartOpen(true)}
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          isUserMenuOpen={isUserMenuOpen}
          setIsUserMenuOpen={setIsUserMenuOpen}
        />

        {children}

        <Footer />

        {/* Mobile Menu Sidebar */}
        <div
          className={`fixed inset-0 z-[100] lg:hidden transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div
            className={`absolute top-0 left-0 h-full w-[calc(100%-48px)] max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-out ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-200 bg-neutral-900">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-neutral-700 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-medium">Olá, Thomas</p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-neutral-800 rounded-full transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 70px)' }}>
              <div className="py-2">
                <p className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase">Menu Principal</p>
                <Link href="/produtos" className="flex items-center gap-3 px-4 py-3 text-neutral-900 hover:bg-neutral-100">
                  <Cpu className="w-5 h-5 text-neutral-500" />
                  Eletrônicos
                </Link>
                <Link href="/produtos" className="flex items-center gap-3 px-4 py-3 text-neutral-900 hover:bg-neutral-100">
                  <Monitor className="w-5 h-5 text-neutral-500" />
                  Computadores
                </Link>
                <Link href="/produtos" className="flex items-center gap-3 px-4 py-3 text-neutral-900 hover:bg-neutral-100">
                  <Gamepad2 className="w-5 h-5 text-neutral-500" />
                  Games e consoles
                </Link>
                <Link href="/produtos" className="flex items-center gap-3 px-4 py-3 text-neutral-900 hover:bg-neutral-100">
                  <Gift className="w-5 h-5 text-neutral-500" />
                  Cartões-presente
                </Link>
              </div>

              <div className="border-t border-neutral-200 py-2">
                <p className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase">Ofertas</p>
                <Link href="/ofertas" className="flex items-center gap-3 px-4 py-3 text-neutral-900 hover:bg-neutral-100">
                  <Star className="w-5 h-5 text-amber-500" />
                  Ofertas do dia
                </Link>
              </div>

              <div className="border-t border-neutral-200 py-2">
                <p className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase">Minha Conta</p>
                <Link href="/minha-conta" className="flex items-center gap-3 px-4 py-3 text-neutral-900 hover:bg-neutral-100">
                  <User className="w-5 h-5 text-neutral-500" />
                  Minha conta
                </Link>
                <Link href="/meus-pedidos" className="flex items-center gap-3 px-4 py-3 text-neutral-900 hover:bg-neutral-100">
                  <Package className="w-5 h-5 text-neutral-500" />
                  Meus pedidos
                </Link>
                <Link href="/lista-de-desejos" className="flex items-center gap-3 px-4 py-3 text-neutral-900 hover:bg-neutral-100">
                  <Heart className="w-5 h-5 text-neutral-500" />
                  Lista de desejos
                </Link>
                <Link href="/minha-conta" className="flex items-center gap-3 px-4 py-3 text-neutral-900 hover:bg-neutral-100">
                  <Wallet className="w-5 h-5 text-neutral-500" />
                  Créditos: R$ 150,00
                </Link>
              </div>

              <div className="border-t border-neutral-200 py-2">
                <p className="px-4 py-2 text-xs font-semibold text-neutral-500 uppercase">Configurações</p>
                <Link href="/metodos-de-pagamento" className="flex items-center gap-3 px-4 py-3 text-neutral-900 hover:bg-neutral-100">
                  <CreditCard className="w-5 h-5 text-neutral-500" />
                  Métodos de pagamento
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Search Modal */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-[100]">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => {
                setIsSearchOpen(false)
                setSearchQuery('')
                setSelectedIndex(0)
              }}
            />

            <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-4 border-b border-neutral-200">
                <Search className="w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Buscar produtos, categorias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 text-lg outline-none placeholder:text-neutral-400"
                  autoFocus
                />
                <button
                  onClick={() => {
                    setIsSearchOpen(false)
                    setSearchQuery('')
                    setSelectedIndex(0)
                  }}
                  className="text-xs text-neutral-500 border border-neutral-300 rounded px-2 py-1 hover:bg-neutral-100"
                >
                  esc
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto p-2">
                {(() => {
                  let globalIndex = 0
                  return filteredResults.map((category, catIdx) => (
                    <div key={catIdx} className="mb-4">
                      <h3 className="text-sm font-semibold text-neutral-900 px-3 py-2">{category.category}</h3>
                      <div className="space-y-1">
                        {category.items.map((item, itemIdx) => {
                          const currentIndex = globalIndex
                          globalIndex++
                          return (
                            <button
                              key={itemIdx}
                              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition ${
                                selectedIndex === currentIndex ? 'bg-sky-500 text-white' : 'hover:bg-neutral-100'
                              }`}
                              onMouseEnter={() => setSelectedIndex(currentIndex)}
                            >
                              <div
                                className={`w-8 h-8 rounded-md flex items-center justify-center ${
                                  selectedIndex === currentIndex ? 'bg-sky-400' : 'bg-neutral-100'
                                }`}
                              >
                                <Hash
                                  className={`w-4 h-4 ${
                                    selectedIndex === currentIndex ? 'text-white' : 'text-neutral-500'
                                  }`}
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{item.title}</p>
                                <p className={`text-sm ${selectedIndex === currentIndex ? 'text-sky-100' : 'text-neutral-500'}`}>
                                  {item.description}
                                </p>
                              </div>
                              <ArrowRight
                                className={`w-4 h-4 ${selectedIndex === currentIndex ? 'text-white' : 'text-neutral-400'}`}
                              />
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))
                })()}
              </div>

              <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200 bg-neutral-50 text-xs text-neutral-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white border border-neutral-300 rounded text-neutral-600">Enter</kbd>
                    para selecionar
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-white border border-neutral-300 rounded text-neutral-600">Esc</kbd>
                    para fechar
                  </span>
                </div>
                <span className="text-neutral-400">Pesquisa ByShop</span>
              </div>
            </div>
          </div>
        )}

        {/* Cart Drawer */}
        <div
          className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
            isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />

          <div
            className={`absolute top-0 right-0 h-full w-[calc(100%-48px)] max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-out ${
              isCartOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-200">
              <h2 className="text-lg font-bold text-neutral-900">Seu Carrinho ({cartItemsMock.length})</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-neutral-100 rounded-full transition">
                <X className="w-5 h-5 text-neutral-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(100vh - 280px)' }}>
              {cartItemsMock.map((item, idx) => (
                <div
                  key={item.id}
                  className={`flex gap-4 ${idx < cartItemsMock.length - 1 ? 'pb-4 border-b border-neutral-100' : ''}`}
                >
                  <div className="w-20 h-20 bg-neutral-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">{item.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-neutral-900">{item.name}</h4>
                    <p className="text-sm text-neutral-500">{item.variant}</p>
                    <p className="text-lg font-bold text-neutral-900 mt-1">{formatCurrency(item.price)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-neutral-300 rounded">
                        <button className="p-1 hover:bg-neutral-100">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button className="p-1 hover:bg-neutral-100">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button className="text-neutral-400 hover:text-red-500 transition">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 space-y-4">
              <div className="flex justify-between text-sm text-neutral-600">
                <span>Subtotal</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-neutral-600">
                <span>Frete</span>
                <span className="text-green-600">Grátis</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                <span>Total</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-semibold transition">
                Finalizar compra
              </button>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full text-neutral-600 hover:text-neutral-900 py-2 text-sm transition"
              >
                Continuar comprando
              </button>
            </div>
          </div>
        </div>
      </div>
    </AppShellProvider>
  )
}
```

- [ ] **Step 2: Verificar comportamento**
Expected:
- Top Bar/Header/Footer aparecem em qualquer rota
- Ctrl+K abre busca
- Header abre carrinho e menu mobile

---

### Task 3: Usar AppShell no layout global

**Files:**
- Modify: `c:/LOPES/www/byshop/www/app/layout.tsx`

- [ ] **Step 1: Importar e envolver children**

```tsx
import { AppShell } from '@/components/app-shell'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        <AppShell>{children}</AppShell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
```

---

### Task 4: Refatorar Home para não renderizar infra duplicada

**Files:**
- Modify: `c:/LOPES/www/byshop/www/app/(loja)/(inicio)/page.tsx`

- [ ] **Step 1: Remover `Header/Footer` e blocos de overlay**
Remover da Home:
- Top Bar
- `<Header ... />`
- `<Footer />`
- Mobile Menu Sidebar
- Search Modal
- Cart Drawer

- [ ] **Step 2: Remover estados/hook relacionados**
Remover:
- `openMenu`, `isCartOpen`, `isUserMenuOpen`, `isSearchOpen`, `searchQuery`, `selectedIndex`, `isMobileMenuOpen`
- `useEffect` de teclado
- lógica de `filteredResults` (passa para o AppShell)

Expected: Home vira principalmente conteúdo estático + componentes client (carrosséis).

---

### Task 5: Refatorar PDP para usar AppShell e abrir carrinho via Context

**Files:**
- Modify: `c:/LOPES/www/byshop/www/app/(shop)/produtos/[id]/page.tsx`

- [ ] **Step 1: Remover `Header/Footer` e overlays locais**
Remover:
- `<Header ... />` e `<Footer />`
- Search Modal local
- Cart Drawer local
- estados `isCartOpen`, `isSearchOpen`, `searchQuery`, `selectedIndex`, `openMenu`, `isUserMenuOpen`, `isMobileMenuOpen`
- `useEffect` de teclado

- [ ] **Step 2: Usar hook do shell para abrir carrinho**

```tsx
import { useAppShell } from '@/components/app-shell-context'

export default function ProductPage() {
  const { openCart } = useAppShell()
  // ...
  return (
    // ...
    <button onClick={openCart}>Adicionar ao Carrinho</button>
    // ...
  )
}
```

---

### Task 6: Atualizar documentação do projeto (obrigatório)

**Files:**
- Modify: `c:/LOPES/www/byshop/.trae/docs/byshop/geral.md`

- [ ] **Step 1: Adicionar nota do AppShell**
Registrar:
- `AppShell` no `app/layout.tsx` centraliza Top Bar + Header + Footer
- overlays globais de busca/carrinho/menu mobile
- páginas deixam de importar `Header/Footer`

---

## Self-review (do plano)
- Cobertura da spec: AppShell + Context + layout + Home + PDP + docs
- Sem placeholders: caminhos e códigos foram explicitados

## Execução
Implementar inline nesta sessão (sem commits automáticos).

