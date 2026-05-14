'use client'

import {
  Search,
  Menu,
  ShoppingCart,
  Heart,
  User,
  Star,
  Package,
  Wallet,
  CreditCard,
  Gift,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCartStore } from "@/stores/cart-store"

interface HeaderProps {
  onMobileMenuOpen: () => void
  onSearchOpen: () => void
  onCartOpen: () => void
  openMenu: string | null
  setOpenMenu: (menu: string | null) => void
  isUserMenuOpen: boolean
  setIsUserMenuOpen: (open: boolean) => void
}

export function Header({
  onMobileMenuOpen,
  onSearchOpen,
  onCartOpen,
  openMenu,
  setOpenMenu,
  isUserMenuOpen,
  setIsUserMenuOpen,
}: HeaderProps) {
  // IA-first: badge do carrinho reflete a quantidade total (soma das quantidades) do store persistido.
  const cartCount = useCartStore((s) => s.count)
  const badgeText = cartCount > 99 ? "99+" : String(cartCount)

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 md:gap-4">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMobileMenuOpen}
          className="lg:hidden p-2 -ml-2 hover:bg-neutral-100 rounded-lg"
        >
          <Menu className="w-5 h-5 text-neutral-700" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image 
            src="/images/logo.png" 
            alt="byShop" 
            width={120} 
            height={32} 
            className="h-6 md:h-8 w-auto"
            priority
          />
        </Link>

        {/* Navigation with Mega Menus */}
        <nav className="hidden lg:flex items-center gap-6 text-sm relative">
          <Link href="/produtos" className="text-neutral-700 hover:text-neutral-900 py-2">
            Produtos
          </Link>

          {/* All Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu('all')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="flex items-center gap-1 bg-neutral-100 px-3 py-1.5 rounded-full hover:bg-neutral-200">
              <Menu className="w-4 h-4" />
              <span>Categorias</span>
            </button>
            {openMenu === 'all' && (
              <div className="absolute left-0 top-full mt-0 bg-white border border-neutral-200 shadow-lg rounded w-96 z-50">
                <div className="grid grid-cols-2 gap-8 p-6">
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-3 text-xs">ELETRÔNICOS</h4>
                    <ul className="space-y-2 text-sm text-neutral-700">
                      <li><Link href="/produtos" className="hover:text-amber-600">Computadores e notebooks</Link></li>
                      <li><Link href="/produtos" className="hover:text-amber-600">Monitores</Link></li>
                      <li><Link href="/produtos" className="hover:text-amber-600">Teclados e mouses</Link></li>
                      <li><Link href="/produtos" className="hover:text-amber-600">Fones de ouvido</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-3 text-xs">ACESSÓRIOS</h4>
                    <ul className="space-y-2 text-sm text-neutral-700">
                      <li><Link href="/produtos" className="hover:text-amber-600">Cabos e adaptadores</Link></li>
                      <li><Link href="/produtos" className="hover:text-amber-600">Power banks</Link></li>
                      <li><Link href="/produtos" className="hover:text-amber-600">Capas e suportes</Link></li>
                      <li><Link href="/produtos" className="hover:text-amber-600">Carregadores</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Today's Deals Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu('deals')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="text-neutral-700 hover:text-neutral-900 py-2">Ofertas</button>
            {openMenu === 'deals' && (
              <div className="absolute left-0 top-full mt-0 bg-white border border-neutral-200 shadow-lg rounded w-96 z-50">
                <div className="grid grid-cols-2 gap-8 p-6">
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-3 text-xs">OFERTAS EM DESTAQUE</h4>
                    <ul className="space-y-2 text-sm text-neutral-700">
                      <li><Link href="/ofertas" className="hover:text-amber-600">Ofertas relâmpago</Link></li>
                      <li><Link href="/ofertas" className="hover:text-amber-600">Queima de estoque</Link></li>
                      <li><Link href="/ofertas" className="hover:text-amber-600">Mais baratos</Link></li>
                      <li><Link href="/ofertas" className="hover:text-amber-600">Mais vendidos</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-3 text-xs">POR CATEGORIA</h4>
                    <ul className="space-y-2 text-sm text-neutral-700">
                      <li><Link href="/ofertas" className="hover:text-amber-600">Eletrônicos</Link></li>
                      <li><Link href="/ofertas" className="hover:text-amber-600">Computadores</Link></li>
                      <li><Link href="/ofertas" className="hover:text-amber-600">Acessórios</Link></li>
                      <li><Link href="/ofertas" className="hover:text-amber-600">Ver todas as ofertas</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Gift Cards Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu('giftcards')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="text-neutral-700 hover:text-neutral-900 py-2">Cartões-presente</button>
            {openMenu === 'giftcards' && (
              <div className="absolute left-0 top-full mt-0 bg-white border border-neutral-200 shadow-lg rounded w-96 z-50">
                <div className="grid grid-cols-2 gap-8 p-6">
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-3 text-xs">CARTÕES-PRESENTE</h4>
                    <ul className="space-y-2 text-sm text-neutral-700">
                      <li><Link href="/cartoes-presente" className="hover:text-amber-600">Cartões digitais</Link></li>
                      <li><Link href="/cartoes-presente" className="hover:text-amber-600">Cartões físicos</Link></li>
                      <li><Link href="/cartoes-presente" className="hover:text-amber-600">Presentes corporativos</Link></li>
                      <li><Link href="/cartoes-presente" className="hover:text-amber-600">Consultar saldo</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-3 text-xs">GUIA DE PRESENTES</h4>
                    <ul className="space-y-2 text-sm text-neutral-700">
                      <li><Link href="/presentes" className="hover:text-amber-600">Aniversário</Link></li>
                      <li><Link href="/presentes" className="hover:text-amber-600">Datas comemorativas</Link></li>
                      <li><Link href="/presentes" className="hover:text-amber-600">Última hora</Link></li>
                      <li><Link href="/presentes" className="hover:text-amber-600">Embrulhar para presente</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Registry & Gifting Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu('registry')}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <button className="text-neutral-700 hover:text-neutral-900 py-2">Presentes</button>
            {openMenu === 'registry' && (
              <div className="absolute left-0 top-full mt-0 bg-white border border-neutral-200 shadow-lg rounded w-96 z-50">
                <div className="grid grid-cols-2 gap-8 p-6">
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-3 text-xs">LISTAS</h4>
                    <ul className="space-y-2 text-sm text-neutral-700">
                      <li><Link href="/presentes" className="hover:text-amber-600">Casamento</Link></li>
                      <li><Link href="/presentes" className="hover:text-amber-600">Bebê</Link></li>
                      <li><Link href="/presentes" className="hover:text-amber-600">Encontrar lista</Link></li>
                      <li><Link href="/presentes" className="hover:text-amber-600">Criar lista</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-3 text-xs">IDEIAS</h4>
                    <ul className="space-y-2 text-sm text-neutral-700">
                      <li><Link href="/presentes" className="hover:text-amber-600">Por preço</Link></li>
                      <li><Link href="/presentes" className="hover:text-amber-600">Por interesse</Link></li>
                      <li><Link href="/presentes" className="hover:text-amber-600">Amantes de tecnologia</Link></li>
                      <li><Link href="/presentes" className="hover:text-amber-600">Mais vendidos</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right Icons */}
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={onSearchOpen}
            className="p-2 hover:bg-neutral-100 rounded-lg md:flex md:items-center md:gap-2 md:px-3 md:py-1.5 md:border md:border-neutral-200 md:rounded-full md:hover:border-neutral-300 md:hover:bg-neutral-50 transition"
          >
            <Search className="w-5 h-5 md:w-4 md:h-4 text-neutral-600 md:text-neutral-400" />
            <span className="hidden md:inline text-xs text-neutral-400 border border-neutral-200 rounded px-1.5 py-0.5">Ctrl K</span>
          </button>
          <div 
            className="hidden md:block relative"
            onMouseEnter={() => setIsUserMenuOpen(true)}
            onMouseLeave={() => setIsUserMenuOpen(false)}
          >
            <button className="hover:text-neutral-900">
              <User className="w-5 h-5 text-neutral-700" />
            </button>
            
            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-neutral-200 shadow-lg rounded-lg w-72 z-50">
                <div className="p-4 border-b border-neutral-100">
                  <p className="text-sm text-neutral-500">Bem-vindo</p>
                  <p className="font-semibold text-neutral-900">Thomas</p>
                </div>

                {/* Creditos Section */}
                <div className="p-4 border-b border-neutral-100 bg-gradient-to-r from-amber-50 to-orange-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-neutral-500 uppercase">Seus créditos</span>
                    <Wallet className="w-4 h-4 text-amber-500" />
                  </div>
                  <p className="text-2xl font-bold text-neutral-900">R$ 150,00</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Link href="/minha-conta" className="text-xs text-amber-600 hover:text-amber-700 font-medium">
                      Adicionar créditos
                    </Link>
                    <span className="text-neutral-300">|</span>
                    <Link href="/minha-conta" className="text-xs text-amber-600 hover:text-amber-700 font-medium">
                      Ver extrato
                    </Link>
                  </div>
                </div>

                {/* Gift Card Balance */}
                <div className="px-4 py-3 border-b border-neutral-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm text-neutral-600">Cartões-presente</span>
                  </div>
                  <span className="text-sm font-semibold text-neutral-900">R$ 50,00</span>
                </div>
                
                <div className="py-2">
                  <Link href="/minha-conta" className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                    <User className="w-4 h-4" />
                    Minha Conta
                  </Link>
                  <Link href="/meus-pedidos" className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                    <Package className="w-4 h-4" />
                    Meus Pedidos
                  </Link>
                  <Link href="/lista-de-desejos" className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                    <Heart className="w-4 h-4" />
                    Lista de Desejos
                  </Link>
                  <Link href="/minhas-avaliacoes" className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                    <Star className="w-4 h-4" />
                    Minhas Avaliações
                  </Link>
                  <Link href="/metodos-de-pagamento" className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                    <CreditCard className="w-4 h-4" />
                    Métodos de pagamento
                  </Link>
                </div>
                
                <div className="border-t border-neutral-100 py-2">
                  <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    Sair
                  </a>
                </div>
              </div>
            )}
          </div>
          <button className="hidden md:block hover:text-neutral-900">
            <Heart className="w-5 h-5 text-neutral-700" />
          </button>
          <button 
            onClick={onCartOpen}
            className="relative p-2 -mr-2 hover:bg-neutral-100 rounded-lg"
          >
            <ShoppingCart className="w-5 h-5 text-neutral-700" />
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-amber-500 text-white text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center">
                {badgeText}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
