import { notFound } from "next/navigation";

export default function DevModeloPage() {
  /* IA: Esta rota é apenas para desenvolvimento e prototipação a partir de referência visual. */
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <div className="min-h-dvh bg-[#eef1f5] px-4 py-10">
      {/* IA: Oculta o Header/Footer globais do layout para este sandbox ficar fiel ao modelo. */}
      <style>{`
        body > header:first-of-type { display: none !important; }
        body > footer:last-of-type { display: none !important; }
      `}</style>
      {/* IA: Canvas principal em “cartão” central, como na referência (home completa). */}
      <div className="mx-auto w-full max-w-[1100px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_90px_-40px_rgba(0,0,0,0.45)] ring-1 ring-black/5">
        <header className="border-b border-black/5">
          {/* IA: Header — Row 1 (logo + util + busca + ações). */}
          <div className="px-6 pt-6 pb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-6 w-16 rounded bg-gray-200" aria-hidden="true" />
                <div className="hidden items-center gap-3 text-xs text-gray-500 md:flex">
                  <div className="h-3 w-10 rounded bg-gray-200" aria-hidden="true" />
                  <div className="h-3 w-10 rounded bg-gray-200" aria-hidden="true" />
                  <div className="h-3 w-10 rounded bg-gray-200" aria-hidden="true" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 rounded-full bg-[#f3f4f6] px-4 py-2">
                  <div className="h-4 w-4 rounded bg-gray-300" aria-hidden="true" />
                  <div className="h-3 w-48 rounded bg-gray-200" aria-hidden="true" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 text-xs text-gray-500 sm:flex">
                  <div className="h-3 w-12 rounded bg-gray-200" aria-hidden="true" />
                  <div className="h-3 w-10 rounded bg-gray-200" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200" aria-hidden="true" />
                  <div className="h-8 w-8 rounded-full bg-gray-200" aria-hidden="true" />
                  <div className="h-8 w-8 rounded-full bg-gray-200" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* IA: Header — Row 2 (atalhos/categorias em chips). */}
            <div className="mt-4 flex gap-3 overflow-auto pb-1">
              {["Today’s Deals", "Categories", "Computers", "Gaming", "Audio", "Accessories"].map(
                (label) => (
                  <div
                    key={label}
                    className="shrink-0 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-gray-700"
                  >
                    {label}
                  </div>
                )
              )}
            </div>
          </div>
        </header>

        <main className="px-6 py-8">
          {/* IA: Hero principal (texto à esquerda + produto à direita). */}
          <section className="rounded-2xl bg-[#f7f7f8] p-6">
            <div className="grid items-center gap-6 md:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs text-gray-500">
                  <div className="h-2.5 w-2.5 rounded-full bg-orange-300" aria-hidden="true" />
                  <div className="h-3 w-20 rounded bg-gray-200" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <div className="h-9 w-80 max-w-full rounded bg-gray-200" aria-hidden="true" />
                  <div className="h-4 w-[520px] max-w-full rounded bg-gray-200" aria-hidden="true" />
                  <div className="h-4 w-[420px] max-w-full rounded bg-gray-200" aria-hidden="true" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-28 rounded-full bg-gray-900" aria-hidden="true" />
                  <div className="h-10 w-28 rounded-full bg-white ring-1 ring-black/10" aria-hidden="true" />
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] w-full rounded-2xl bg-gray-200" aria-hidden="true" />
                <div className="absolute right-4 top-4 w-44 rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/10">
                  <div className="h-3 w-24 rounded bg-gray-200" aria-hidden="true" />
                  <div className="mt-2 h-6 w-20 rounded bg-gray-200" aria-hidden="true" />
                  <div className="mt-3 h-9 w-full rounded-lg bg-gray-900" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-black/5"
                >
                  <div className="h-9 w-9 rounded-full bg-gray-200" aria-hidden="true" />
                  <div className="space-y-1">
                    <div className="h-3 w-24 rounded bg-gray-200" aria-hidden="true" />
                    <div className="h-3 w-16 rounded bg-gray-200" aria-hidden="true" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* IA: Seção “Shop by categories” (4 cards). */}
          <section className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <div className="h-5 w-44 rounded bg-gray-200" aria-hidden="true" />
              <div className="h-8 w-24 rounded-full bg-gray-100 ring-1 ring-black/10" aria-hidden="true" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl bg-[#f7f7f8] p-4">
                  <div className="aspect-[4/3] w-full rounded-xl bg-gray-200" aria-hidden="true" />
                  <div className="mt-4 h-4 w-28 rounded bg-gray-200" aria-hidden="true" />
                </div>
              ))}
            </div>
          </section>

          {/* IA: Blocos “Amazon basics” + “Deals & Promotions” em 2 colunas. */}
          <section className="mt-10 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl bg-[#f7f7f8] p-5">
              <div className="h-4 w-28 rounded bg-gray-200" aria-hidden="true" />
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-white p-3 ring-1 ring-black/5">
                  <div className="aspect-[4/3] w-full rounded-lg bg-gray-200" aria-hidden="true" />
                  <div className="mt-3 h-3 w-32 rounded bg-gray-200" aria-hidden="true" />
                  <div className="mt-2 h-3 w-20 rounded bg-gray-200" aria-hidden="true" />
                </div>
                <div className="rounded-xl bg-white p-3 ring-1 ring-black/5">
                  <div className="aspect-[4/3] w-full rounded-lg bg-gray-200" aria-hidden="true" />
                  <div className="mt-3 h-3 w-32 rounded bg-gray-200" aria-hidden="true" />
                  <div className="mt-2 h-3 w-20 rounded bg-gray-200" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#f7f7f8] p-5">
              <div className="h-4 w-36 rounded bg-gray-200" aria-hidden="true" />
              <div className="mt-4 aspect-[16/9] w-full rounded-xl bg-gray-200" aria-hidden="true" />
              <div className="mt-4 h-9 w-32 rounded-full bg-gray-100 ring-1 ring-black/10" aria-hidden="true" />
            </div>
          </section>

          {/* IA: Newsletter + footer (placeholders genéricos). */}
          <section className="mt-12 rounded-2xl bg-[#f7f7f8] p-8">
            <div className="grid items-center gap-6 md:grid-cols-[1fr_0.7fr]">
              <div className="space-y-3">
                <div className="h-8 w-80 max-w-full rounded bg-gray-200" aria-hidden="true" />
                <div className="h-4 w-[520px] max-w-full rounded bg-gray-200" aria-hidden="true" />
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-11 w-full max-w-sm rounded-full bg-white ring-1 ring-black/10" aria-hidden="true" />
                  <div className="h-11 w-32 rounded-full bg-gray-900" aria-hidden="true" />
                </div>
              </div>
              <div className="aspect-[4/3] w-full rounded-2xl bg-gray-200" aria-hidden="true" />
            </div>
          </section>
        </main>

        <footer className="border-t border-black/5 px-6 py-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 w-28 rounded bg-gray-200" aria-hidden="true" />
                <div className="space-y-2">
                  <div className="h-3 w-40 rounded bg-gray-200" aria-hidden="true" />
                  <div className="h-3 w-32 rounded bg-gray-200" aria-hidden="true" />
                  <div className="h-3 w-36 rounded bg-gray-200" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-black/5 pt-6 text-xs text-gray-500">
            <div className="h-3 w-40 rounded bg-gray-200" aria-hidden="true" />
            <div className="h-3 w-24 rounded bg-gray-200" aria-hidden="true" />
          </div>
        </footer>
      </div>
    </div>
  );
}
