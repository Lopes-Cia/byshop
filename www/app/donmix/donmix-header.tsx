"use client"

import Image from "next/image"
import { ArrowLeft, ShoppingBag } from "lucide-react"

import { cn } from "@/lib/utils"

import { useDonMixCart } from "./cart-store"
import { LOJA } from "./menu-data"

const NAV = [
  { href: "#cardapio", label: "Cardápio" },
  { href: "#promo", label: "Promoções" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#contato", label: "Contato" },
]

interface DonMixHeaderProps {
  /** Na página de produto: mostra voltar e esconde a navegação de âncoras. */
  compact?: boolean
}

export function DonMixHeader({ compact = false }: DonMixHeaderProps) {
  const { count, openCart } = useDonMixCart()
  const contagem = count > 99 ? "99+" : count

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-dm-plum-deep/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <div className="flex min-w-0 items-center gap-1.5">
          {compact && (
            <a
              href="/donmix#cardapio"
              aria-label="Voltar ao cardápio"
              className="grid size-10 shrink-0 place-items-center rounded-full text-purple-100 transition hover:bg-white/10 hover:text-white dm-focus-lime"
            >
              <ArrowLeft className="size-5" />
            </a>
          )}

          <a
            href={compact ? "/donmix" : "#top"}
            className="flex min-w-0 items-center gap-2.5 dm-focus-lime"
          >
            <Image
              src="/images/donmix_logo.webp"
              alt="Don Mix"
              width={44}
              height={44}
              priority
              className="size-11 shrink-0 rounded-full ring-2 ring-dm-lime/70"
            />
            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate font-display text-lg font-extrabold tracking-tight text-white">
                Don Mix
              </span>
              <span className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-dm-lime">
                {LOJA.slogan}
              </span>
            </span>
          </a>
        </div>

        {!compact && (
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-purple-100/80 transition-colors hover:bg-white/10 hover:text-white dm-focus-lime"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        <div className="flex shrink-0 items-center gap-2">
          <span
            className={cn(
              "hidden items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-purple-100",
              compact ? "xl:flex" : "md:flex",
            )}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-dm-lime opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-dm-lime" />
            </span>
            Aberto agora
          </span>

          {compact && (
            <a
              href="/donmix#cardapio"
              className="hidden rounded-full px-3 py-2 text-sm font-medium text-purple-100/80 transition-colors hover:bg-white/10 hover:text-white sm:inline-flex dm-focus-lime"
            >
              Cardápio
            </a>
          )}

          <button
            type="button"
            onClick={openCart}
            aria-label={`Abrir pedido (${count} ${count === 1 ? "item" : "itens"})`}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-dm-lime pl-4 pr-3 text-sm font-bold text-dm-ink transition hover:bg-dm-lime-bright active:scale-95 dm-focus-lime"
          >
            <ShoppingBag className="size-5" />
            <span className="hidden sm:inline">Pedido</span>
            {count > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-dm-ink text-[11px] font-bold text-dm-lime tabular-nums">
                {contagem}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
