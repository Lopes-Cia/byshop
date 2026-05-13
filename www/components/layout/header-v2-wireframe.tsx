"use client";

import type { HeaderV2Contract } from "@/components/layout/header-v2";

function Block({
  className,
  label
}: {
  className: string;
  label?: string;
}) {
  return (
    <div className={className}>
      {label ? (
        <div className="text-muted-foreground px-2 py-1 text-[10px] tracking-wide uppercase">
          {label}
        </div>
      ) : null}
    </div>
  );
}

export default function HeaderV2Wireframe({ contract }: { contract?: HeaderV2Contract }) {
  /* IA: Wireframe “skeleton” do HeaderV2; respeita o contrato para ligar/desligar blocos. */
  const c: Required<HeaderV2Contract> = {
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
      {c.showTopBar ? (
        <div className="hidden border-b border-gray-200 bg-gray-50 md:block">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-10 items-center justify-between">
              <div className="flex items-center gap-2">
                <Block className="h-5 w-5 rounded bg-gray-200" />
                <Block className="h-5 w-28 rounded bg-gray-200" label={c.phoneLabel} />
                <Block className="h-4 w-px bg-gray-200" />
                <Block className="h-5 w-20 rounded bg-gray-200" label={c.contactLabel} />
              </div>
              <div className="flex items-center gap-3">
                <Block className="h-6 w-24 rounded bg-gray-200" label={c.localeLabel} />
                {c.showAccount ? <Block className="h-8 w-20 rounded bg-gray-200" label="Conta" /> : null}
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
              <Block className="h-10 w-32 rounded bg-gray-200" label="Logo" />
            </div>
            <div className="flex justify-end">
              {c.showSearch ? (
                <Block className="h-10 w-full max-w-md rounded bg-gray-200" label="Busca" />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {c.showNav ? (
        <div className="hidden border-t border-gray-200 md:block">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-12 items-center justify-between">
              <div className="flex items-center gap-2">
                <Block className="h-8 w-20 rounded bg-gray-200" label="Menu" />
                <Block className="h-8 w-24 rounded bg-gray-200" />
                <Block className="h-8 w-28 rounded bg-gray-200" />
              </div>
              <div className="flex items-center gap-4">
                {c.showWishlist ? <Block className="h-8 w-8 rounded bg-gray-200" label="♥" /> : null}
                {c.showCart ? <Block className="h-8 w-8 rounded bg-gray-200" label="🛒" /> : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="md:hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <Block className="h-10 w-10 rounded bg-gray-200" label="≡" />
            <Block className="h-10 w-24 rounded bg-gray-200" label="Logo" />
            <div className="flex items-center gap-3">
              {c.showWishlist ? <Block className="h-10 w-10 rounded bg-gray-200" label="♥" /> : null}
              {c.showCart ? <Block className="h-10 w-10 rounded bg-gray-200" label="🛒" /> : null}
              {c.showAccount ? <Block className="h-10 w-10 rounded bg-gray-200" label="👤" /> : null}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl space-y-4 px-4 py-4 sm:px-6">
            {c.showSearch ? <Block className="h-10 w-full rounded bg-gray-200" label="Busca" /> : null}
            {c.showNav ? (
              <div className="space-y-2">
                <Block className="h-9 w-full rounded bg-gray-200" label="Link" />
                <Block className="h-9 w-full rounded bg-gray-200" />
                <Block className="h-9 w-full rounded bg-gray-200" />
              </div>
            ) : null}
            {c.showAccount ? <Block className="h-10 w-full rounded bg-gray-200" label="Conta" /> : null}
          </div>
        </div>
      </div>
    </header>
  );
}

