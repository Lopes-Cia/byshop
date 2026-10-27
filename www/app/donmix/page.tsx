"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import {
  ArrowRight,
  BadgeCheck,
  Bike,
  Clock,
  Facebook,
  Flame,
  Instagram,
  MapPin,
  Phone,
  Search,
  Send,
  ShoppingBag,
  Soup,
  Star,
  Utensils,
  Wallet,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { useDonMixCart } from "./cart-store"
import { DonMixHeader } from "./donmix-header"
import { MenuItemCard } from "./menu-item-card"
import { CARDAPIO, CATEGORIAS, LOJA, formatBRL, type MenuItem } from "./menu-data"

const PASSOS = [
  {
    icon: Utensils,
    titulo: "Escolha no cardápio",
    texto: "Navegue por lanches, sobremesas e bebidas e monte seu pedido.",
  },
  {
    icon: Send,
    titulo: "Envie pelo WhatsApp",
    texto: "Seu pedido chega pronto para a gente — é só confirmar.",
  },
  {
    icon: Bike,
    titulo: "Receba em casa",
    texto: `Entrega em ${LOJA.tempoEntrega} ou retirada no balcão.`,
  },
]

export default function DonmixPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [favoritos, setFavoritos] = useState<Set<string>>(new Set())
  const { lines, count: totalItens, subtotal, open: cartOpen, openCart } =
    useDonMixCart()

  const toggleFavorito = (item: MenuItem) => {
    setFavoritos((prev) => {
      const next = new Set(prev)
      if (next.has(item.id)) next.delete(item.id)
      else next.add(item.id)
      return next
    })
  }

  const itensFiltrados = useMemo(() => {
    const termo = searchTerm.trim().toLowerCase()
    return CARDAPIO.filter((item) => {
      const matchCategoria =
        categoriaAtiva === "todos" || item.categoria === categoriaAtiva
      const matchSearch =
        termo === "" ||
        item.nome.toLowerCase().includes(termo) ||
        item.descricao.toLowerCase().includes(termo)
      return matchCategoria && matchSearch
    })
  }, [categoriaAtiva, searchTerm])

  const qtyPorItem = useMemo(() => {
    const map = new Map<string, number>()
    lines.forEach((line) =>
      map.set(line.productId, (map.get(line.productId) ?? 0) + line.qty),
    )
    return map
  }, [lines])

  const maisPedido = CARDAPIO.find((item) => item.maisVendido)

  const irParaCardapio = (categoria?: string) => {
    if (categoria) setCategoriaAtiva(categoria)
    const reduzir = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    document
      .getElementById("cardapio")
      ?.scrollIntoView({ behavior: reduzir ? "auto" : "smooth", block: "start" })
  }

  return (
    <div className={cn("min-h-screen", totalItens > 0 && "pb-24 md:pb-0")}>
      {/* ── Navbar ── */}
      <DonMixHeader />

      <main id="top">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-dm-plum-deep">
          <div className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full bg-dm-plum-soft/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-24 size-[360px] rounded-full bg-dm-lime/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
            <div className="space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-purple-100">
                <Star className="size-3.5 fill-dm-lime text-dm-lime" />
                {LOJA.avaliacao} de 5 · mais de 1.200 avaliações
              </span>

              <h1 className="font-display text-4xl font-extrabold leading-[1.03] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Do nosso fogão direto para a sua casa.
              </h1>

              <p className="mx-auto max-w-md text-base leading-relaxed text-purple-200 lg:mx-0">
                Lanches artesanais, sobremesas cremosas e bebidas geladas.
                Escolha seus favoritos e receba quentinho em{" "}
                <span className="whitespace-nowrap">{LOJA.tempoEntrega}</span>.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Button
                  onClick={() => irParaCardapio()}
                  className="h-12 gap-2 rounded-full bg-dm-lime px-6 text-base font-bold text-dm-ink hover:bg-dm-lime-bright"
                >
                  Ver cardápio
                  <ArrowRight className="size-5" />
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="h-12 gap-2 rounded-full border-white/30 bg-white/5 px-6 text-base font-bold text-white hover:bg-white/15 hover:text-white"
                >
                  <a href="#como-funciona">Como funciona</a>
                </Button>
              </div>

              <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 pt-1 text-sm text-purple-200 lg:justify-start">
                <li className="inline-flex items-center gap-2">
                  <Bike className="size-4 text-dm-lime" />
                  Entrega em <span className="whitespace-nowrap">{LOJA.tempoEntrega}</span>
                </li>
                <li className="inline-flex items-center gap-2">
                  <BadgeCheck className="size-4 text-dm-lime" />
                  Grátis acima de {formatBRL(LOJA.entregaGratisAcima)}
                </li>
                <li className="inline-flex items-center gap-2">
                  <Clock className="size-4 text-dm-lime" />
                  Seg–Sáb 11h–23h
                </li>
              </ul>
            </div>

            <div className="relative mx-auto w-full max-w-[520px]">
              <div
                aria-hidden
                className="absolute -bottom-6 -right-6 size-44 rounded-full bg-dm-plum-soft/40 blur-3xl"
              />

              <div className="relative pt-[29%]">
                {/* Card de trás — aparece só na metade de cima */}
                <div className="absolute left-1/2 top-0 z-0 aspect-[4/5] w-[46%] -translate-x-1/2 overflow-hidden rounded-[2rem] shadow-lg ring-1 ring-white/15">
                  <Image
                    src="/images/homem-tomando-sorvete.webp"
                    alt="Cliente do Don Mix com um milk-shake"
                    fill
                    sizes="(max-width: 1024px) 45vw, 240px"
                    className="object-cover object-[50%_0%]"
                  />
                </div>

                <div className="relative z-10 flex items-end justify-center">
                  {/* Frente — lanche */}
                  <div className="relative z-30 w-[52%]">
                    <div
                      aria-hidden
                      className="absolute -left-3 -top-3 size-16 rounded-[1.5rem] bg-dm-lime sm:size-20"
                    />
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-white/15">
                      <Image
                        src="/images/comendo-hamburguer.webp"
                        alt="Cliente do Don Mix comendo um hambúrguer"
                        fill
                        priority
                        sizes="(max-width: 1024px) 50vw, 300px"
                        className="object-cover object-[50%_35%]"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-dm-plum-deep/75 to-transparent" />
                      <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-dm-plum-deep/85 px-3 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur">
                        <Star className="size-3.5 fill-dm-lime text-dm-lime" />
                        {LOJA.avaliacao}
                      </div>
                    </div>

                    {maisPedido && (
                      <div className="absolute -bottom-4 -left-2 z-40 flex items-center gap-3 rounded-2xl bg-white/95 p-3 pr-4 shadow-xl ring-1 ring-black/5 backdrop-blur sm:-left-4">
                        <span className="grid size-10 place-items-center rounded-xl bg-dm-lime text-dm-ink">
                          <Flame className="size-5" />
                        </span>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-dm-muted">
                            Mais pedido
                          </p>
                          <p className="font-display text-sm font-bold text-dm-ink">
                            {maisPedido.nome} · {formatBRL(maisPedido.preco)}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Atrás do lanche — sorvete deslocado para a esquerda */}
                  <div className="relative z-20 -ml-[12%] aspect-[4/5] w-[40%] overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-white/15">
                    <Image
                      src="/images/comendo-sorvete.webp"
                      alt="Cliente do Don Mix tomando sorvete"
                      fill
                      sizes="(max-width: 1024px) 35vw, 200px"
                      className="origin-[50%_29%] scale-[1.7] object-cover sm:scale-[1.9]"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-dm-plum-deep/70 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cardápio ── */}
        <section id="cardapio" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-dm-ink sm:text-4xl">
                Cardápio
              </h2>
              <p className="mt-1 text-sm text-dm-muted">
                {itensFiltrados.length}{" "}
                {itensFiltrados.length === 1 ? "item" : "itens"} para escolher
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-dm-plum" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar no cardápio"
                aria-label="Buscar no cardápio"
                className="h-12 w-full rounded-full border border-dm-line bg-white pl-11 pr-10 text-sm text-dm-ink outline-none transition placeholder:text-dm-muted focus:border-dm-plum focus:ring-2 focus:ring-dm-plum/20"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  aria-label="Limpar busca"
                  className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full text-dm-muted transition hover:bg-dm-cream hover:text-dm-ink dm-focus"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>

          <div className="relative mt-6">
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-hide">
              {CATEGORIAS.map((cat) => {
                const Icon = cat.icon
                const active = categoriaAtiva === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategoriaAtiva(cat.id)}
                    aria-pressed={active}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition dm-focus",
                      active
                        ? "border-dm-plum bg-dm-plum text-white shadow-md"
                        : "border-dm-line bg-white text-dm-ink hover:border-dm-plum/40 hover:text-dm-plum",
                    )}
                  >
                    <Icon className="size-4" />
                    {cat.nome}
                  </button>
                )
              })}
            </div>
            <div className="pointer-events-none absolute inset-y-0 -right-4 w-12 bg-linear-to-l from-dm-cream to-transparent sm:hidden" />
          </div>

          {itensFiltrados.length > 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {itensFiltrados.map((item, index) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  href={`/donmix/produto/${item.id}`}
                  index={index}
                  qty={qtyPorItem.get(item.id) ?? 0}
                  favorito={favoritos.has(item.id)}
                  onToggleFavorito={toggleFavorito}
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center gap-4 rounded-[28px] bg-white py-16 text-center ring-1 ring-dm-line">
              <span className="grid size-16 place-items-center rounded-full bg-dm-cream text-dm-plum">
                <Soup className="size-7" />
              </span>
              <div className="space-y-1">
                <h3 className="font-display text-lg font-bold text-dm-ink">
                  Nada encontrado por aqui
                </h3>
                <p className="text-sm text-dm-muted">
                  Tente outra busca ou explore outra categoria.
                </p>
              </div>
              <Button
                variant="outline"
                className="rounded-full border-dm-line"
                onClick={() => {
                  setSearchTerm("")
                  setCategoriaAtiva("todos")
                }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </section>

        {/* ── Promo ── */}
        <section id="promo" className="mx-auto max-w-6xl scroll-mt-20 px-4">
          <div className="relative overflow-hidden rounded-[32px] bg-dm-plum">
            <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-dm-lime/15 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
              <div
                className="size-full"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 50% 50%, #FEFEFE 2px, transparent 2px)",
                  backgroundSize: "28px 28px",
                }}
              />
            </div>

            <div className="relative grid items-center gap-6 p-8 sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:p-12">
              <div className="space-y-4 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 rounded-full bg-dm-lime px-3 py-1 text-xs font-bold uppercase tracking-wide text-dm-ink">
                  <Flame className="size-3.5" />
                  Combos & sobremesas
                </span>
                <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                  Monte o combo perfeito para o seu momento.
                </h2>
                <p className="mx-auto max-w-md text-sm leading-relaxed text-purple-200 lg:mx-0">
                  De um lanche rápido com café a uma sobremesa que abraça.
                  Combine o que quiser e a entrega sai de graça acima de{" "}
                  {formatBRL(LOJA.entregaGratisAcima)}.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-1 lg:justify-start">
                  <Button
                    onClick={() => irParaCardapio("doces")}
                    className="h-11 gap-2 rounded-full bg-dm-lime px-6 text-sm font-bold text-dm-ink hover:bg-dm-lime-bright"
                  >
                    Ver sobremesas
                    <ArrowRight className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="h-11 rounded-full border-white/30 bg-white/5 px-6 text-sm font-bold text-white hover:bg-white/15 hover:text-white"
                  >
                    <a href="#cardapio">Ver tudo</a>
                  </Button>
                </div>
              </div>

              <div className="relative mx-auto aspect-square w-full max-w-xs">
                <div className="absolute inset-0 rounded-full bg-dm-lime/15" />
                <div className="absolute inset-0">
                  <Image
                    src="/images/acai.webp"
                    alt="Sobremesa de açaí do Don Mix"
                    fill
                    sizes="(max-width: 1024px) 60vw, 320px"
                    className="object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.35)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Como funciona ── */}
        <section id="como-funciona" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-dm-ink sm:text-4xl">
              Como funciona
            </h2>
            <p className="mt-1 text-sm text-dm-muted">
              Três passos entre você e o seu pedido.
            </p>
          </div>

          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {PASSOS.map((passo, index) => {
              const Icon = passo.icon
              return (
                <li
                  key={passo.titulo}
                  className="relative rounded-[28px] bg-white p-6 ring-1 ring-dm-line"
                >
                  <span
                    aria-hidden
                    className="font-display text-4xl font-extrabold leading-none text-dm-plum"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-3 grid size-11 place-items-center rounded-2xl bg-dm-lime text-dm-ink">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-dm-ink">
                    {passo.titulo}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-dm-muted">
                    {passo.texto}
                  </p>
                </li>
              )
            })}
          </ol>
        </section>

        {/* ── Contato ── */}
        <section id="contato" className="mx-auto max-w-6xl scroll-mt-20 px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: MapPin, titulo: "Endereço", texto: LOJA.endereco },
              { icon: Clock, titulo: "Horário", texto: LOJA.horario },
              { icon: Phone, titulo: "Telefone", texto: LOJA.telefone },
              {
                icon: Wallet,
                titulo: "Pagamento",
                texto: "Pix, cartão e dinheiro na entrega",
              },
            ].map((info) => {
              const Icon = info.icon
              return (
                <div
                  key={info.titulo}
                  className="flex items-start gap-3 rounded-3xl bg-white p-5 ring-1 ring-dm-line"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-dm-cream text-dm-plum">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-bold text-dm-ink">
                      {info.titulo}
                    </h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-dm-muted">
                      {info.texto}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── CTA final ── */}
        <section className="mx-auto max-w-6xl px-4 py-14">
          <div className="relative overflow-hidden rounded-[32px] bg-dm-lime px-6 py-12 text-center sm:px-12">
            <div className="pointer-events-none absolute -bottom-16 -right-10 size-56 rounded-full bg-dm-ink/5" />
            <div className="relative mx-auto max-w-xl space-y-5">
              <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-dm-ink sm:text-4xl">
                Bateu a fome? A gente resolve.
              </h2>
              <p className="text-sm font-medium text-dm-ink/80">
                Peça pelo WhatsApp e acompanhe a entrega até a sua porta.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  onClick={openCart}
                  className="h-12 gap-2 rounded-full bg-dm-ink px-6 text-base font-bold text-white hover:bg-dm-plum"
                >
                  <ShoppingBag className="size-5" />
                  Ver meu pedido
                </Button>
                <Button
                  variant="outline"
                  asChild
                  className="h-12 gap-2 rounded-full border-dm-ink/25 bg-transparent px-6 text-base font-bold text-dm-ink hover:bg-dm-ink/10 hover:text-dm-ink"
                >
                  <a href={`tel:${LOJA.telefoneLink}`}>
                    <Phone className="size-5" />
                    Ligar para a loja
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-dm-plum-deep text-purple-200">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/donmix_logo.webp"
                alt="Don Mix"
                width={44}
                height={44}
                className="size-11 rounded-full ring-2 ring-dm-lime/60"
              />
              <span className="font-display text-lg font-extrabold text-white">
                Don Mix
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Sabor que conquista, qualidade que inspira. Desde 2015 servindo o
              melhor da culinária brasileira.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Cardápio
            </h2>
            <ul className="space-y-2 text-sm">
              {CATEGORIAS.filter((cat) => cat.id !== "todos").map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => irParaCardapio(cat.id)}
                    className="transition-colors hover:text-white dm-focus-lime"
                  >
                    {cat.nome}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Institucional
            </h2>
            <ul className="space-y-2 text-sm">
              {["Sobre nós", "Trabalhe conosco", "Política de privacidade", "Termos de uso"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="transition-colors hover:text-white dm-focus-lime">
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-white">
              Fale com a gente
            </h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-dm-lime" />
                {LOJA.telefone}
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-dm-lime" />
                <span>{LOJA.endereco}</span>
              </li>
            </ul>
            <div className="flex gap-2 pt-1">
              {[
                { icon: Instagram, nome: "Instagram" },
                { icon: Facebook, nome: "Facebook" },
                { icon: Phone, nome: "WhatsApp" },
              ].map(({ icon: Icon, nome }) => (
                <a
                  key={nome}
                  href="#"
                  aria-label={nome}
                  className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-dm-lime hover:text-dm-ink dm-focus-lime"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <p className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-purple-300">
            © {new Date().getFullYear()} Don Mix — Todos os direitos reservados ·
            © Lopes &amp; Cia
          </p>
        </div>
      </footer>

      {/* ── Barra fixa do pedido (mobile) ── */}
      {totalItens > 0 && !cartOpen && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-dm-line bg-white/95 p-3 backdrop-blur md:hidden">
          <button
            type="button"
            onClick={openCart}
            className="flex h-12 w-full items-center justify-between rounded-full bg-dm-plum pl-5 pr-4 text-white active:scale-[0.99] dm-focus"
          >
            <span className="flex items-center gap-2 text-sm font-bold">
              <ShoppingBag className="size-5" />
              Ver pedido ({totalItens})
            </span>
            <span className="font-display text-base font-bold">
              {formatBRL(subtotal)}
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
