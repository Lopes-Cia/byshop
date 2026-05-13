"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, Phone, Search, ShoppingCart, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import Navigation from "@/components/layout/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";

export type HeaderV2Contract = {
  showTopBar?: boolean;
  showSearch?: boolean;
  showNav?: boolean;
  showWishlist?: boolean;
  showCart?: boolean;
  showAccount?: boolean;
  phoneLabel?: string;
  phoneHref?: string;
  contactLabel?: string;
  contactHref?: string;
  localeLabel?: string;
};

function CountBadge({ value }: { value: number }) {
  if (value <= 0) return null;

  return (
    <span className="bg-primary absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs text-white">
      {value}
    </span>
  );
}

function UserMenu({
  signInHref,
  enabled
}: {
  signInHref: string;
  enabled: boolean;
}) {
  const { user, logout } = useAuthStore();

  if (!enabled) return null;

  if (!user) {
    return (
      <Link href={signInHref}>
        <Button variant="outline" size="sm">
          Entrar
        </Button>
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Button variant="ghost" size="sm" aria-label="Abrir menu da conta">
        <User className="h-5 w-5" />
      </Button>
      <div
        role="menu"
        aria-label="Menu da conta"
        className="invisible absolute right-0 mt-2 w-48 rounded-md bg-white py-1 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
        <Link
          role="menuitem"
          href="/perfil"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Perfil
        </Link>
        <button
          role="menuitem"
          type="button"
          onClick={logout}
          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
          Sair
        </button>
      </div>
    </div>
  );
}

function MobileAccountActions({
  signInHref,
  enabled
}: {
  signInHref: string;
  enabled: boolean;
}) {
  const { user, logout } = useAuthStore();

  if (!enabled) return null;

  return (
    <div className="border-t border-gray-200 pt-4">
      {user ? (
        <div className="flex flex-col gap-3">
          <Link href="/perfil" className="text-gray-700 hover:text-gray-900">
            Minha conta
          </Link>
          <button
            type="button"
            onClick={logout}
            className="text-left text-gray-700 hover:text-gray-900">
            Sair
          </button>
        </div>
      ) : (
        <Link href={signInHref} className="text-gray-700 hover:text-gray-900">
          Entrar
        </Link>
      )}
    </div>
  );
}

export default function HeaderV2({ contract }: { contract?: HeaderV2Contract }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuId = useId();
  const itemCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.getCount());
  const pathname = usePathname();
  const signInHref = `/conta/entrar?next=${encodeURIComponent(pathname)}`;
  const { user } = useAuthStore();
  /* IA: O contrato permite controlar presença/labels do header sem alterar a lógica principal. */
  const resolvedContract: Required<HeaderV2Contract> = {
    showTopBar: contract?.showTopBar ?? true,
    showSearch: contract?.showSearch ?? true,
    showNav: contract?.showNav ?? true,
    showWishlist: contract?.showWishlist ?? true,
    showCart: contract?.showCart ?? true,
    showAccount: contract?.showAccount ?? true,
    phoneLabel: contract?.phoneLabel ?? "(11) 99999-9999",
    phoneHref: contract?.phoneHref ?? "tel:+5511999999999",
    contactLabel: contract?.contactLabel ?? "Contato",
    contactHref: contract?.contactHref ?? "/contato",
    localeLabel: contract?.localeLabel ?? "PT-BR / BRL"
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      {resolvedContract.showTopBar ? (
        <div className="hidden border-b border-gray-200 bg-gray-50 md:block">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-10 items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href={resolvedContract.phoneHref} className="hover:text-gray-900">
                  {resolvedContract.phoneLabel}
                </a>
                <span className="text-gray-300">•</span>
                <Link href={resolvedContract.contactHref} className="hover:text-gray-900">
                  {resolvedContract.contactLabel}
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-md px-2 py-1 hover:bg-gray-100"
                  aria-label="Idioma e moeda (placeholder)">
                  {resolvedContract.localeLabel}
                </button>
                <UserMenu signInHref={signInHref} enabled={resolvedContract.showAccount} />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="hidden md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center gap-4 py-4">
            <div />

            <div className="flex justify-center">
              <Logo />
            </div>

            <div className="flex justify-end">
              {resolvedContract.showSearch ? (
                <div className="relative w-full max-w-md">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    aria-label="Buscar produtos"
                    placeholder="Buscar produtos..."
                    className="focus:ring-primary w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {resolvedContract.showNav ? (
        <div className="hidden border-t border-gray-200 md:block">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-12 items-center justify-between">
              <nav aria-label="Categorias" className="flex items-center">
                <Navigation />
              </nav>

              <div className="flex items-center gap-4">
                {resolvedContract.showWishlist ? (
                  <Link href="/favoritos" className="relative" aria-label="Favoritos">
                    <Heart className="hover:text-primary h-6 w-6 text-gray-700 transition-colors" />
                    <CountBadge value={wishlistCount} />
                  </Link>
                ) : null}

                {resolvedContract.showCart ? (
                  <Link href="/carrinho" className="relative" aria-label="Carrinho">
                    <ShoppingCart className="hover:text-primary h-6 w-6 text-gray-700 transition-colors" />
                    <CountBadge value={itemCount} />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="md:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <button
              type="button"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-controls={mobileMenuId}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              className="rounded-md p-2 hover:bg-gray-100">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <div className="flex justify-center">
              <Logo />
            </div>

            <div className="flex items-center gap-3">
              {resolvedContract.showWishlist ? (
                <Link href="/favoritos" className="relative" aria-label="Favoritos">
                  <Heart className="h-6 w-6 text-gray-700" />
                  <CountBadge value={wishlistCount} />
                </Link>
              ) : null}

              {resolvedContract.showCart ? (
                <Link href="/carrinho" className="relative" aria-label="Carrinho">
                  <ShoppingCart className="h-6 w-6 text-gray-700" />
                  <CountBadge value={itemCount} />
                </Link>
              ) : null}

              {resolvedContract.showAccount ? (
                <Link
                  href={user ? "/perfil" : signInHref}
                  aria-label={user ? "Minha conta" : "Entrar"}
                  className="rounded-md p-2 hover:bg-gray-100">
                  <User className="h-6 w-6 text-gray-700" />
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        {isMenuOpen ? (
          <div id={mobileMenuId} className="border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl space-y-4 px-4 py-4 sm:px-6">
              {resolvedContract.showSearch ? (
                <div className="relative">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    aria-label="Buscar produtos"
                    placeholder="Buscar produtos..."
                    className="focus:ring-primary w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2"
                  />
                </div>
              ) : null}

              {resolvedContract.showNav ? (
                <nav aria-label="Navegação">
                  <div className="flex flex-col gap-3">
                    <Link href="/" className="text-gray-700 hover:text-gray-900">
                      Início
                    </Link>
                    <Link href="/produtos" className="text-gray-700 hover:text-gray-900">
                      Produtos
                    </Link>
                    <Link href="/favoritos" className="text-gray-700 hover:text-gray-900">
                      Favoritos
                    </Link>
                    <Link href="/sobre" className="text-gray-700 hover:text-gray-900">
                      Sobre
                    </Link>
                  </div>
                </nav>
              ) : null}

              <MobileAccountActions signInHref={signInHref} enabled={resolvedContract.showAccount} />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
