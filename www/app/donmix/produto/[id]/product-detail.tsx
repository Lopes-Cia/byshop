"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  AlertCircle,
  ArrowRight,
  Bike,
  Check,
  ChevronDown,
  Flame,
  Gift,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"

import { useDonMixCart } from "../../cart-store"
import { DonMixHeader } from "../../donmix-header"
import {
  categoriaPorId,
  formatBRL,
  LOJA,
  type MenuItem,
} from "../../menu-data"
import {
  resumoAdicionais,
  roundMoney,
  type AdicionalERP,
  type AdicionalLinha,
  type ProdutoDetalhe,
  type VariacaoProduto,
} from "../../product-types"

function rotuloVariacoes(variacoes: VariacaoProduto[]) {
  const nomes = variacoes.map((variacao) => variacao.nome.trim().toLowerCase())

  const todosTamanhos = nomes.every((nome) =>
    /^\d+([.,]\d+)?\s*(ml|l)$/.test(nome),
  )
  if (todosTamanhos) return "o tamanho"

  const temSabor = nomes.some((nome) =>
    /coca|fanta|guaraná|guarana|laranja|tangerina|abacaxi|uva|pêssego|pessego|zero/.test(
      nome,
    ),
  )
  if (temSabor) return "o sabor"

  return "a opção"
}

interface AdicionalRowProps {
  adicional: AdicionalERP
  qty: number
  unidadesGratis: number
  unidadesPagas: number
  totalPago: number
  onToggle: () => void
  onInc: () => void
  onDec: () => void
}

function AdicionalRow({
  adicional,
  qty,
  unidadesGratis,
  unidadesPagas,
  totalPago,
  onToggle,
  onInc,
  onDec,
}: AdicionalRowProps) {
  const indisponivel = !adicional.ativo || adicional.estoque <= 0
  const max = Math.max(0, Math.floor(adicional.estoque))
  const selecionado = qty > 0

  return (
    <li
      className={cn(
        "rounded-2xl transition",
        selecionado
          ? "bg-dm-cream/80 ring-1 ring-dm-line"
          : "bg-white ring-1 ring-dm-line/70",
        indisponivel && "bg-white",
      )}
    >
      <div className="flex items-center gap-2 p-3">
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={selecionado}
          disabled={indisponivel}
          aria-label={`${selecionado ? "Remover" : "Adicionar"} ${adicional.descricao}`}
          className="flex min-w-0 flex-1 items-center gap-3 text-left disabled:cursor-not-allowed dm-focus"
        >
          <span
            aria-hidden
            className={cn(
              "grid size-6 shrink-0 place-items-center rounded-lg border-2 transition",
              selecionado
                ? "border-dm-plum bg-dm-plum text-white"
                : "border-dm-line bg-white",
              indisponivel && "border-dashed border-dm-muted/40",
            )}
          >
            {selecionado && <Check className="size-3.5" />}
          </span>

          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-1.5">
              <span
                className={cn(
                  "text-sm font-semibold leading-tight",
                  indisponivel ? "text-dm-muted line-through" : "text-dm-ink",
                )}
              >
                {adicional.descricao}
              </span>
              {!indisponivel && (
                <>
                  {selecionado ? (
                    <>
                      {unidadesGratis > 0 && (
                        <span className="rounded-full bg-dm-lime/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-dm-ink">
                          {unidadesGratis} grátis
                        </span>
                      )}
                      {unidadesPagas > 0 && (
                        <span className="rounded-full bg-dm-plum/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-dm-plum">
                          {unidadesPagas} paga{unidadesPagas > 1 ? "s" : ""}
                        </span>
                      )}
                    </>
                  ) : (
                    adicional.gratis && (
                      <span className="rounded-full bg-dm-lime/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-dm-ink">
                        Grátis
                      </span>
                    )
                  )}
                </>
              )}
              {!adicional.ativo && (
                <span className="rounded-full bg-dm-muted px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  Indisponível
                </span>
              )}
              {adicional.ativo && adicional.estoque <= 0 && (
                <span className="rounded-full bg-dm-berry-dark px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  Esgotado
                </span>
              )}
            </span>

            {!indisponivel && (
              <span className="mt-0.5 block text-xs text-dm-muted">
                {selecionado ? (
                  unidadesPagas > 0 ? (
                    adicional.gratis ? (
                      unidadesGratis > 0 ? (
                        <>
                          +{" "}
                          <span className="font-semibold text-dm-berry-dark">
                            {formatBRL(totalPago)}
                          </span>
                        </>
                      ) : (
                        <>
                          Fora da cota:{" "}
                          <span className="font-semibold text-dm-berry-dark">
                            + {formatBRL(totalPago)}
                          </span>
                        </>
                      )
                    ) : (
                      <>
                        <span className="font-semibold text-dm-ink">
                          {formatBRL(adicional.preco)}
                        </span>{" "}
                        cada
                      </>
                    )
                  ) : (
                    "Grátis na cota"
                  )
                ) : adicional.gratis ? (
                  <>
                    Grátis na cota · depois{" "}
                    <span className="font-semibold text-dm-ink">
                      {formatBRL(adicional.preco)}
                    </span>
                  </>
                ) : (
                  <>
                    +{" "}
                    <span className="font-semibold text-dm-ink">
                      {formatBRL(adicional.preco)}
                    </span>{" "}
                    cada
                  </>
                )}
                {adicional.ativo &&
                  adicional.estoque > 0 &&
                  adicional.estoque <= 3 && (
                    <span className="font-semibold text-dm-ink">
                      {" "}
                      · últimas {Math.floor(adicional.estoque)}
                    </span>
                  )}
              </span>
            )}
          </span>
        </button>

        {selecionado && (
          <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-dm-cream p-1 text-dm-plum ring-1 ring-dm-line">
            <button
              type="button"
              onClick={onDec}
              aria-label={`Diminuir ${adicional.descricao}`}
              className="grid size-10 place-items-center rounded-full bg-white shadow-sm transition hover:bg-dm-cream disabled:opacity-50 dm-focus"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="min-w-5 text-center text-sm font-bold tabular-nums">
              {qty}
            </span>
            <button
              type="button"
              onClick={onInc}
              disabled={qty >= max}
              aria-label={`Aumentar ${adicional.descricao}`}
              className="grid size-10 place-items-center rounded-full bg-white shadow-sm transition hover:bg-dm-cream disabled:opacity-50 dm-focus"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

interface ProductDetailProps {
  produto: ProdutoDetalhe
  relacionados: MenuItem[]
}

export function ProductDetail({ produto, relacionados }: ProductDetailProps) {
  const { addLine, openCart, subtotal } = useDonMixCart()

  const variacaoInicial =
    produto.variacoes.find((variacao) => variacao.estoque > 0) ??
    produto.variacoes[0]

  const [variacaoCod, setVariacaoCod] = useState(variacaoInicial.codProd)
  const [qty, setQty] = useState(1)
  const [adicionaisQty, setAdicionaisQty] = useState<Record<number, number>>({})
  const [observacao, setObservacao] = useState("")

  const variacao =
    produto.variacoes.find((opcao) => opcao.codProd === variacaoCod) ??
    variacaoInicial

  const adicionaisSelecionados = useMemo<AdicionalLinha[]>(
    () =>
      variacao.adicionais
        .filter((adicional) => (adicionaisQty[adicional.id] ?? 0) > 0)
        .map((adicional) => ({
          id: adicional.id,
          descricao: adicional.descricao,
          preco: adicional.preco,
          gratis: adicional.gratis,
          qty: adicionaisQty[adicional.id] ?? 0,
        })),
    [variacao, adicionaisQty],
  )

  const resumo = useMemo(
    () => resumoAdicionais(adicionaisSelecionados, variacao.qtAdicionalGratis),
    [adicionaisSelecionados, variacao.qtAdicionalGratis],
  )

  const esgotado = variacao.estoque <= 0
  const maxQty = Math.max(1, Math.min(20, Math.floor(variacao.estoque)))
  const totalBase = roundMoney(variacao.preco * qty)
  const totalAdicionais = roundMoney(resumo.total * qty)
  const economia = roundMoney(resumo.valorGratis * qty)
  const valorAdicionaisCheio = roundMoney(
    (resumo.total + resumo.valorGratis) * qty,
  )
  const totalItem = roundMoney(totalBase + totalAdicionais)
  const custoExcedente = roundMoney(
    resumo.linhas
      .filter((adicional) => adicional.gratis)
      .reduce((soma, adicional) => soma + adicional.total, 0),
  )
  const faltamParaFrete = Math.max(
    0,
    roundMoney(LOJA.entregaGratisAcima - (subtotal + totalItem)),
  )

  const categoria = categoriaPorId(produto.categoria)
  const IconeCategoria = categoria.icon
  const rotulo = rotuloVariacoes(produto.variacoes)
  const desconto = variacao.precoOriginal
    ? Math.round((1 - variacao.preco / variacao.precoOriginal) * 100)
    : 0
  const precosVariacoes = new Set(produto.variacoes.map((opcao) => opcao.preco))
  const mostrarPrecoVariacao = precosVariacoes.size > 1

  const gratis = variacao.adicionais.filter((adicional) => adicional.gratis)
  const pagos = variacao.adicionais.filter((adicional) => !adicional.gratis)
  const gratisDisponiveis = gratis.filter(
    (adicional) => adicional.ativo && adicional.estoque > 0,
  )
  const mostrarCota =
    variacao.qtAdicionalGratis > 0 && gratisDisponiveis.length > 0
  const segmentosCota = Math.max(1, variacao.qtAdicionalGratis)
  const segmentosExtras = Math.min(
    resumo.unidadesExcedentes,
    Math.max(0, 8 - segmentosCota),
  )
  const totalSegmentos = segmentosCota + segmentosExtras
  const segmentosPreenchidos = Math.min(segmentosCota, resumo.unidadesGratis)
  const gridVariacoes =
    rotulo === "o sabor"
      ? "grid grid-cols-2 gap-2.5"
      : "grid grid-cols-2 gap-2.5 sm:grid-cols-3"

  const selecionarVariacao = (codProd: number) => {
    setVariacaoCod(codProd)
    setQty(1)
    setAdicionaisQty({})
  }

  const alterarQty = (delta: number) => {
    setQty((atual) => Math.min(maxQty, Math.max(1, atual + delta)))
  }

  const definirAdicional = (adicional: AdicionalERP, proximaQty: number) => {
    const max = Math.max(0, Math.floor(adicional.estoque))
    const next = Math.max(0, Math.min(max, proximaQty))

    setAdicionaisQty((atual) => {
      const copia = { ...atual }
      if (next === 0) delete copia[adicional.id]
      else copia[adicional.id] = next
      return copia
    })
  }

  const renderAdicional = (adicional: AdicionalERP) => {
    const resumoAdicional = resumo.linhas.find(
      (linha) => linha.id === adicional.id,
    )

    return (
      <AdicionalRow
        key={adicional.id}
        adicional={adicional}
        qty={adicionaisQty[adicional.id] ?? 0}
        unidadesGratis={resumoAdicional?.unidadesGratis ?? 0}
        unidadesPagas={resumoAdicional?.unidadesPagas ?? 0}
        totalPago={resumoAdicional?.total ?? 0}
        onToggle={() =>
          definirAdicional(
            adicional,
            (adicionaisQty[adicional.id] ?? 0) > 0 ? 0 : 1,
          )
        }
        onInc={() =>
          definirAdicional(adicional, (adicionaisQty[adicional.id] ?? 0) + 1)
        }
        onDec={() =>
          definirAdicional(adicional, (adicionaisQty[adicional.id] ?? 0) - 1)
        }
      />
    )
  }

  const adicionar = () => {
    if (esgotado) return

    addLine({
      productId: produto.id,
      codProd: variacao.codProd,
      produtoNome: produto.nome,
      variacaoNome: variacao.nome,
      imagem: variacao.imagem || produto.imagem,
      precoBase: variacao.preco,
      precoOriginal: variacao.precoOriginal,
      qty,
      adicionais: adicionaisSelecionados,
      observacao: observacao.trim() || undefined,
      qtAdicionalGratis: variacao.qtAdicionalGratis,
    })

    openCart()
    toast.success(`${produto.nome} no pedido`, {
      description: `${qty}x ${variacao.nome} · ${formatBRL(totalItem)}`,
    })
  }

  return (
    <div className="min-h-screen bg-dm-cream pb-28">
      <DonMixHeader compact />

      <main className="mx-auto max-w-6xl px-4 py-6 lg:py-10">
        <nav
          aria-label="Você está aqui"
          className="flex flex-wrap items-center gap-1.5 text-xs text-dm-muted"
        >
          <Link href="/donmix" className="transition hover:text-dm-plum dm-focus">
            Don Mix
          </Link>
          <span aria-hidden>/</span>
          <Link
            href="/donmix#cardapio"
            className="transition hover:text-dm-plum dm-focus"
          >
            Cardápio
          </Link>
          <span aria-hidden>/</span>
          <Link
            href="/donmix#cardapio"
            className="transition hover:text-dm-plum dm-focus"
          >
            {categoria.nome}
          </Link>
          <span aria-hidden>/</span>
          <span className="font-semibold text-dm-ink">{produto.nome}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-12">
          {/* ── Imagem ── */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="dm-rise relative aspect-[4/3] overflow-hidden rounded-[32px] bg-linear-to-br from-white via-dm-cream to-dm-lime/25 ring-1 ring-dm-line sm:aspect-square sm:rounded-[40px] lg:aspect-[4/5] lg:max-h-[calc(100vh-16rem)]">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-dm-lime/35 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -left-16 size-64 rounded-full bg-dm-plum-soft/20 blur-3xl"
              />

              <Image
                src={variacao.imagem || produto.imagem}
                alt={produto.nome}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-6 mix-blend-multiply drop-shadow-[0_28px_38px_rgba(43,7,51,0.22)] sm:p-12"
              />

              <div className="absolute left-4 top-4 flex flex-col items-start gap-1.5 sm:left-5 sm:top-5">
                {produto.maisVendido && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-dm-plum px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-dm-lime-bright shadow-sm">
                    <Flame className="size-3" />
                    Mais vendido
                  </span>
                )}
                {produto.lancamento && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-dm-lime px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-dm-ink shadow-sm">
                    <Sparkles className="size-3" />
                    Novidade
                  </span>
                )}
              </div>

              {desconto > 0 && (
                <span className="absolute right-4 top-4 rounded-full bg-dm-plum px-2.5 py-1 text-[11px] font-bold text-dm-lime-bright shadow-sm sm:right-5 sm:top-5">
                  -{desconto}%
                </span>
              )}

              <div className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-2 sm:inset-x-5 sm:bottom-5">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-dm-ink shadow-sm backdrop-blur">
                  <Star className="size-3.5 fill-dm-mango text-dm-mango" />
                  {produto.avaliacao}
                  <span className="font-medium text-dm-muted sm:hidden">/5</span>
                  <span className="hidden font-medium text-dm-muted sm:inline">
                    · 1.200+ avaliações
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-dm-plum-deep/85 px-3 py-1.5 text-xs font-bold text-white shadow-sm backdrop-blur">
                  <Bike className="size-3.5 text-dm-lime" />
                  {produto.tempoEntrega}
                </span>
              </div>
            </div>

            <p className="mt-3 hidden px-1 text-center text-xs text-dm-muted sm:block lg:text-left">
              Imagem ilustrativa · Cód. {produto.codProd}
            </p>
          </div>

          {/* ── Conteúdo ── */}
          <div
            className="dm-rise min-w-0 space-y-7"
            style={{ animationDelay: "80ms" }}
          >
            <header className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-dm-plum/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-dm-plum">
                  <IconeCategoria className="size-3.5" />
                  {categoria.nome}
                </span>
                {produto.tag &&
                  !(
                    produto.maisVendido &&
                    produto.tag.toLowerCase() === "mais vendido"
                  ) && (
                    <span
                      className="rounded-full px-2.5 py-1 text-[11px] font-bold"
                      style={{
                        backgroundColor: `${produto.tagColor ?? "#4a0e52"}22`,
                        color: produto.tagColor ?? "#4a0e52",
                      }}
                    >
                      {produto.tag}
                    </span>
                  )}
              </div>

              <h1 className="font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-dm-ink sm:text-4xl">
                {produto.nome}
              </h1>

              <div className="flex flex-wrap items-baseline gap-2">
                <span
                  aria-live="polite"
                  className="font-display text-3xl font-extrabold text-dm-plum"
                >
                  {formatBRL(variacao.preco)}
                </span>
                {variacao.precoOriginal && (
                  <span className="text-sm text-dm-muted line-through">
                    {formatBRL(variacao.precoOriginal)}
                  </span>
                )}
                <span className="text-xs font-medium text-dm-muted">
                  / unidade
                </span>
              </div>

              <p className="text-sm leading-relaxed text-dm-muted sm:text-base">
                {produto.descricao}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-dm-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Gift className="size-3.5 text-dm-plum" />
                  Frete grátis acima de {formatBRL(LOJA.entregaGratisAcima)}
                </span>
              </div>
            </header>

            <details className="group rounded-2xl bg-white ring-1 ring-dm-line">
              <summary className="flex cursor-pointer list-none select-none items-center justify-between gap-2 rounded-2xl p-4 text-sm font-bold text-dm-ink transition-colors hover:bg-dm-cream/40 dm-focus">
                Ingredientes e alergênicos
                <ChevronDown className="size-4 shrink-0 text-dm-muted transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-4 pb-4">
                <div className="border-t border-dm-line pt-3">
                  <p className="whitespace-pre-line text-xs leading-relaxed text-dm-muted">
                    {produto.descricaoTecnica ?? "Informação não disponível."}
                  </p>
                  <p className="mt-3 text-[11px] font-medium text-dm-muted">
                    Cód. do produto: {produto.codProd} · SKU da variação:{" "}
                    {variacao.codProd}
                  </p>
                </div>
              </div>
            </details>

            {produto.variacoes.length > 1 && (
              <section aria-labelledby="variacoes-titulo" className="space-y-3">
                <div>
                  <h2
                    id="variacoes-titulo"
                    className="font-display text-xl font-bold text-dm-ink"
                  >
                    Escolha {rotulo}
                  </h2>
                  <p id="variacoes-ajuda" className="text-xs text-dm-muted">
                    Obrigatório · escolha 1 opção
                  </p>
                </div>

              <fieldset
                aria-describedby="variacoes-ajuda"
                className="m-0 border-0 p-0"
              >
                <legend className="sr-only">Escolha {rotulo}</legend>
                <div className={gridVariacoes}>
                {produto.variacoes.map((opcao) => {
                  const selected = opcao.codProd === variacao.codProd
                  const indisponivel = opcao.estoque <= 0

                  return (
                    <label
                      key={opcao.codProd}
                      className={cn(
                        "group relative flex cursor-pointer flex-col gap-1 rounded-2xl border p-3.5 shadow-sm transition",
                        selected
                          ? "border-dm-plum bg-dm-plum text-white shadow-md"
                          : "border-dm-line bg-white text-dm-ink hover:border-dm-plum/40",
                        indisponivel &&
                          "cursor-not-allowed border-dm-line bg-dm-cream/40 text-dm-muted shadow-none hover:border-dm-line",
                      )}
                    >
                      <input
                        type="radio"
                        name="variacao"
                        value={opcao.codProd}
                        checked={selected}
                        onChange={() => selecionarVariacao(opcao.codProd)}
                        disabled={indisponivel}
                        className="sr-only peer"
                      />

                      <span className="flex items-start justify-between gap-2">
                        <span className="text-sm font-bold leading-tight">
                          {opcao.nome}
                        </span>
                        {selected && (
                          <Check className="mt-0.5 size-4 shrink-0" />
                        )}
                      </span>

                      {(mostrarPrecoVariacao || opcao.precoOriginal) && (
                        <span className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 text-xs">
                          <span
                            className={cn(
                              "font-bold",
                              selected ? "text-white" : "text-dm-plum",
                            )}
                          >
                            {formatBRL(opcao.preco)}
                          </span>
                          {opcao.precoOriginal && (
                            <span
                              className={cn(
                                "text-[10px] font-medium line-through",
                                selected ? "text-purple-200" : "text-dm-muted",
                              )}
                            >
                              {formatBRL(opcao.precoOriginal)}
                            </span>
                          )}
                        </span>
                      )}

                      {indisponivel ? (
                        <span className="inline-flex w-fit items-center rounded-full bg-dm-berry-dark px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                          Esgotado
                        </span>
                      ) : opcao.estoque <= 3 ? (
                        <span
                          className={cn(
                            "inline-flex w-fit items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                            selected
                              ? "bg-dm-lime text-dm-ink"
                              : "bg-dm-mango/20 text-dm-ink",
                          )}
                        >
                          <span
                            aria-hidden
                            className="size-1.5 rounded-full bg-dm-mango"
                          />
                          Últimas {Math.floor(opcao.estoque)}
                        </span>
                      ) : null}

                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-dm-plum ring-offset-2 opacity-0 transition peer-focus-visible:opacity-100"
                      />
                    </label>
                  )
                })}
                  </div>
                </fieldset>
              </section>
            )}

            <section
              aria-labelledby="adicionais-titulo"
              aria-describedby="adicionais-ajuda"
              className={cn(
                "space-y-3",
                variacao.adicionais.length === 0 && "hidden",
              )}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2
                    id="adicionais-titulo"
                    className="font-display text-xl font-bold text-dm-ink"
                  >
                    Adicionais
                  </h2>
                  {mostrarCota && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-dm-lime px-2.5 py-1 text-[11px] font-bold text-dm-ink">
                      <Gift className="size-3.5" />
                      {variacao.qtAdicionalGratis} grátis
                    </span>
                  )}
                </div>
                <p id="adicionais-ajuda" className="text-xs text-dm-muted">
                  {mostrarCota
                    ? `Escolha até ${variacao.qtAdicionalGratis} ${
                        variacao.qtAdicionalGratis === 1
                          ? "unidade grátis"
                          : "unidades grátis"
                      }. Depois, cada unidade é cobrada.`
                    : variacao.adicionais.length === 0
                      ? "Servido como está — este item não tem adicionais."
                      : "Deixe do seu jeito com os extras que quiser."}
                </p>
              </div>

              {mostrarCota && (
                <div className="rounded-2xl bg-white p-3 ring-1 ring-dm-line">
                  <div className="flex items-center justify-between gap-2 text-xs font-semibold">
                    <span className="inline-flex items-center gap-1.5 text-dm-ink">
                      <Gift className="size-3.5 text-dm-plum" />
                      Cota grátis
                    </span>
                    <span
                      aria-live="polite"
                      className={cn(
                        "rounded-full px-2 py-0.5 tabular-nums",
                        resumo.unidadesExcedentes > 0
                          ? "bg-dm-berry/10 text-dm-berry-dark"
                          : "bg-dm-cream text-dm-plum",
                      )}
                    >
                      {resumo.unidadesGratis}/{variacao.qtAdicionalGratis}
                    </span>
                  </div>

                  <div aria-hidden className="mt-2 flex gap-1">
                    {Array.from({ length: totalSegmentos }).map((_, index) => {
                      const preenchido = index < segmentosPreenchidos
                      const extra = index >= segmentosCota

                      return (
                        <span
                          key={index}
                          className={cn(
                            "h-2.5 flex-1 rounded-full ring-1 transition-colors duration-300",
                            preenchido
                              ? "bg-dm-lime ring-dm-plum/30"
                              : extra
                                ? "bg-dm-berry/70 ring-dm-berry-dark/30"
                                : "bg-dm-plum/15 ring-dm-plum/20",
                            index === segmentosCota && "ml-1",
                          )}
                        />
                      )
                    })}
                  </div>

                  {resumo.unidadesExcedentes > 0 && (
                    <p className="mt-2 flex items-start gap-1.5 rounded-lg bg-dm-berry/10 px-2 py-1.5 text-[11px] font-semibold text-dm-berry-dark">
                      <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
                      <span>
                        {resumo.unidadesExcedentes}{" "}
                        {resumo.unidadesExcedentes === 1
                          ? "unidade extra"
                          : "unidades extras"}{" "}
                        · + {formatBRL(custoExcedente)}
                      </span>
                    </p>
                  )}
                </div>
              )}

              {variacao.adicionais.length > 0 && (
                <div className="space-y-4">
                  {gratis.length > 0 && (
                    <div>
                      <h3 className="mb-1.5 px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-dm-muted">
                        Adicionais grátis
                      </h3>
                      <ul className="space-y-1.5">
                        {gratis.map(renderAdicional)}
                      </ul>
                    </div>
                  )}

                  {pagos.length > 0 && (
                    <div>
                      <h3 className="mb-1.5 px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-dm-muted">
                        Adicionais extras
                      </h3>
                      <ul className="space-y-1.5">
                        {pagos.map(renderAdicional)}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </section>

            <div className="space-y-2">
              <label
                htmlFor="observacao"
                className="flex items-center gap-2 font-display text-xl font-bold text-dm-ink"
              >
                <MessageSquare className="size-5 text-dm-plum" />
                Alguma observação?
              </label>
              <div className="relative">
                <textarea
                  id="observacao"
                  value={observacao}
                  onChange={(event) => setObservacao(event.target.value)}
                  maxLength={140}
                  rows={3}
                  placeholder="Ex.: sem granola, embalar separado..."
                  className="min-h-[88px] w-full resize-y rounded-2xl border border-dm-line bg-white px-4 pb-7 pt-3 text-sm text-dm-ink shadow-sm outline-none transition placeholder:text-dm-muted focus:border-dm-plum focus:ring-2 focus:ring-dm-plum/20"
                />
                <span className="pointer-events-none absolute bottom-2.5 right-3 text-[10px] font-medium text-dm-muted">
                  {observacao.length}/140
                </span>
              </div>
            </div>

            <div className="rounded-[28px] bg-dm-plum-deep p-5 text-white shadow-[0_30px_60px_-32px_rgba(43,7,51,0.7)] sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-display text-lg font-bold">
                  Resumo do pedido
                </h2>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-purple-100">
                  {qty} {qty === 1 ? "unidade" : "unidades"}
                </span>
              </div>

              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-3 text-purple-200">
                  <dt>
                    {variacao.nome} × {qty}
                  </dt>
                  <dd className="tabular-nums">{formatBRL(totalBase)}</dd>
                </div>
                {valorAdicionaisCheio > 0 && (
                  <div className="flex justify-between gap-3 text-purple-200">
                    <dt>Adicionais</dt>
                    <dd className="tabular-nums">
                      + {formatBRL(valorAdicionaisCheio)}
                    </dd>
                  </div>
                )}
                {economia > 0 && (
                  <div className="flex justify-between gap-3 text-dm-lime">
                    <dt className="inline-flex items-center gap-1.5">
                      <Sparkles className="size-3.5" />
                      Adicionais grátis
                    </dt>
                    <dd className="tabular-nums">− {formatBRL(economia)}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-3 border-t border-white/15 pt-3 font-display text-xl font-bold">
                  <dt>Total</dt>
                  <dd
                    aria-live="polite"
                    className="text-dm-lime tabular-nums"
                  >
                    {formatBRL(totalItem)}
                  </dd>
                </div>
              </dl>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-purple-200">
                <Bike className="size-3.5 text-dm-lime" />
                {faltamParaFrete > 0
                  ? `Faltam ${formatBRL(faltamParaFrete)} para entrega grátis`
                  : "Entrega grátis liberada"}
              </p>
            </div>
          </div>
        </div>

        {relacionados.length > 0 && (
          <section aria-labelledby="relacionados-titulo" className="mt-14">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h2
                  id="relacionados-titulo"
                  className="font-display text-2xl font-extrabold tracking-tight text-dm-ink"
                >
                  Você também pode gostar
                </h2>
                <p className="text-sm text-dm-muted">
                  Mais delícias para você.
                </p>
              </div>
              <a
                href="/donmix#cardapio"
                className="hidden items-center gap-1 text-sm font-bold text-dm-plum hover:underline sm:inline-flex dm-focus"
              >
                Ver tudo
                <ArrowRight className="size-4" />
              </a>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relacionados.map((item) => {
                const categoriaRelacionada = categoriaPorId(item.categoria)

                return (
                  <Link
                    key={item.id}
                    href={`/donmix/produto/${item.id}`}
                    className="group flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-dm-line transition hover:-translate-y-0.5 hover:shadow-md dm-focus"
                  >
                    <span className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-dm-cream">
                      <Image
                        src={item.imagem}
                        alt={item.nome}
                        fill
                        sizes="64px"
                        className="object-contain p-1.5 mix-blend-multiply"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-dm-muted">
                        {categoriaRelacionada.nome}
                      </span>
                      <span className="block truncate font-display text-sm font-bold text-dm-ink">
                        {item.nome}
                      </span>
                      <span className="mt-0.5 block text-sm font-bold text-dm-plum">
                        {formatBRL(item.preco)}
                      </span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-dm-muted transition group-hover:translate-x-0.5 group-hover:text-dm-plum" />
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </main>

      <footer className="mt-14 border-t border-dm-line bg-white/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-dm-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} Don Mix · Todos os direitos reservados
          </p>
          <p className="inline-flex items-center gap-2">
            <Phone className="size-3.5" />
            {LOJA.telefone}
          </p>
        </div>
      </footer>

      {/* ── Barra fixa de adicionar (mobile e desktop) ── */}
      <div className="fixed inset-x-0 bottom-0 z-30 md:bottom-4 md:px-4">
        <div className="mx-auto w-full max-w-6xl border-t border-dm-line bg-white/95 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur md:rounded-2xl md:border md:pb-3 md:shadow-[0_18px_50px_-20px_rgba(43,7,51,0.45)]">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4">
            <div className="hidden min-w-0 items-center gap-2.5 lg:flex">
              <span className="relative size-11 shrink-0 overflow-hidden rounded-xl bg-dm-cream">
                <Image
                  src={variacao.imagem || produto.imagem}
                  alt=""
                  fill
                  sizes="44px"
                  className="object-contain p-1 mix-blend-multiply"
                />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-bold text-dm-ink">
                  {produto.nome}
                </span>
                <span className="block truncate text-xs text-dm-muted">
                  {variacao.nome}
                </span>
              </span>
            </div>

            <div className="flex flex-1 items-center justify-between gap-3 lg:justify-end">
              <div className="flex shrink-0 items-center gap-0.5 rounded-full bg-dm-cream p-1 text-dm-plum ring-1 ring-dm-line">
                <button
                  type="button"
                  onClick={() => alterarQty(-1)}
                  disabled={qty <= 1}
                  aria-label="Diminuir quantidade"
                  className="grid size-10 place-items-center rounded-full bg-white shadow-sm transition hover:bg-dm-cream disabled:opacity-50 dm-focus"
                >
                  <Minus className="size-3.5" />
                </button>
                <span
                  className="min-w-5 text-center text-sm font-bold tabular-nums"
                  aria-live="polite"
                >
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => alterarQty(1)}
                  disabled={qty >= maxQty}
                  aria-label="Aumentar quantidade"
                  className="grid size-10 place-items-center rounded-full bg-white shadow-sm transition hover:bg-dm-cream disabled:opacity-50 dm-focus"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>

              <div className="hidden text-right sm:block">
                <p className="text-[10px] font-bold uppercase tracking-wide text-dm-muted">
                  Total
                </p>
                <p className="font-display text-lg font-bold text-dm-plum tabular-nums">
                  {formatBRL(totalItem)}
                </p>
                <p className="text-[10px] text-dm-muted tabular-nums">
                  {qty} × {formatBRL(variacao.preco)}
                  {totalAdicionais > 0 &&
                    ` + ${formatBRL(totalAdicionais)} em adicionais`}
                </p>
              </div>

              <button
                type="button"
                onClick={adicionar}
                disabled={esgotado}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-dm-plum px-4 text-sm font-bold text-white transition hover:bg-dm-plum-soft active:scale-[0.99] disabled:opacity-50 sm:flex-none sm:px-6 dm-focus-lime"
              >
                <ShoppingBag className="size-4" />
                <span className="sm:hidden">
                  {esgotado ? "Esgotado" : "Adicionar"}
                </span>
                <span className="hidden sm:inline">
                  {esgotado ? "Esgotado" : "Adicionar ao pedido"}
                </span>
                <span className="tabular-nums sm:hidden">
                  {formatBRL(totalItem)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
