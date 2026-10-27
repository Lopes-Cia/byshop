"use client"

import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { useDonMixCart } from "./cart-store"
import { formatBRL, LOJA } from "./menu-data"
import { montarMensagemPedido } from "./order-message"
import {
  resumoAdicionais,
  roundMoney,
  totalLinha,
} from "./product-types"

export function CartSheet() {
  const {
    open,
    setOpen,
    lines,
    count,
    subtotal,
    incLine,
    decLine,
    removeLine,
    clear,
  } = useDonMixCart()

  const entrega =
    subtotal === 0 || subtotal >= LOJA.entregaGratisAcima ? 0 : LOJA.taxaEntrega
  const total = roundMoney(subtotal + entrega)
  const faltamParaFreteGratis = Math.max(LOJA.entregaGratisAcima - subtotal, 0)

  const finalizar = () => {
    const mensagem = montarMensagemPedido({ lines, subtotal, entrega, total })
    window.open(
      `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(mensagem)}`,
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-dm-line px-5 py-5 pr-14">
          <SheetTitle className="font-display text-xl font-bold text-dm-ink">
            Seu pedido
          </SheetTitle>
          <SheetDescription className="text-dm-muted">
            {count === 0
              ? "Nada por aqui ainda."
              : `${count} ${count === 1 ? "item" : "itens"} · entrega em ${LOJA.tempoEntrega}`}
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-dm-cream text-dm-plum">
              <ShoppingBag className="size-7" />
            </span>
            <div className="space-y-1">
              <p className="font-display text-lg font-bold text-dm-ink">
                Seu carrinho está vazio
              </p>
              <p className="text-sm text-dm-muted">
                Explore o cardápio e monte suas delícias favoritas.
              </p>
            </div>
            <Button
              asChild
              className="rounded-full bg-dm-plum text-white hover:bg-dm-plum-soft"
            >
              <a href="/donmix#cardapio" onClick={() => setOpen(false)}>
                Ver cardápio
              </a>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              <ul className="divide-y divide-dm-line">
                {lines.map((line) => {
                  const resumo = resumoAdicionais(
                    line.adicionais,
                    line.qtAdicionalGratis,
                  )

                  return (
                    <li key={line.key} className="flex gap-3 py-4">
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-dm-cream">
                        <Image
                          src={line.imagem}
                          alt={line.produtoNome}
                          fill
                          sizes="64px"
                          className="object-contain p-1.5 mix-blend-multiply"
                        />
                      </div>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-display text-sm font-bold leading-snug text-dm-ink">
                              {line.produtoNome}
                            </p>
                            <p className="text-xs font-semibold text-dm-plum">
                              {line.variacaoNome}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeLine(line.key)}
                            aria-label={`Remover ${line.produtoNome} do pedido`}
                            className="grid size-9 shrink-0 place-items-center rounded-full text-dm-muted transition hover:bg-dm-cream hover:text-dm-berry dm-focus"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>

                        <p className="mt-0.5 text-xs text-dm-muted">
                          {resumo.total > 0 ? (
                            <>
                              {formatBRL(line.precoBase)} +{" "}
                              <span className="font-semibold text-dm-ink">
                                {formatBRL(resumo.total)}
                              </span>{" "}
                              em adicionais
                            </>
                          ) : (
                            <>{formatBRL(line.precoBase)} por unidade</>
                          )}
                        </p>

                        {resumo.linhas.length > 0 && (
                          <div className="mt-1.5 rounded-xl bg-dm-cream/70 px-2.5 py-2 ring-1 ring-dm-line/60">
                            {line.qty > 1 && (
                              <p className="text-[10px] font-bold uppercase tracking-wide text-dm-muted">
                                Por unidade
                              </p>
                            )}
                            <ul className="space-y-1">
                              {resumo.linhas.map((adicional) => (
                                <li
                                  key={adicional.id}
                                  className="flex items-start gap-1.5 text-[11px] leading-snug text-dm-muted"
                                >
                                  <span className="font-bold text-dm-plum">
                                    {adicional.qty}x
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    {adicional.descricao}
                                  </span>
                                  <span className="flex shrink-0 flex-col items-end gap-0.5">
                                    {adicional.unidadesGratis > 0 && (
                                      <span className="rounded-full bg-dm-lime/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-dm-ink">
                                        {adicional.unidadesGratis} grátis
                                      </span>
                                    )}
                                    {adicional.unidadesPagas > 0 && (
                                      <span className="rounded-full bg-dm-plum/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-dm-plum">
                                        {adicional.unidadesPagas} paga
                                        {adicional.unidadesPagas > 1 ? "s" : ""}
                                      </span>
                                    )}
                                    {adicional.total > 0 && (
                                      <span className="text-[10px] font-semibold text-dm-ink">
                                        + {formatBRL(adicional.total)}
                                      </span>
                                    )}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {line.observacao && (
                          <p className="mt-1.5 text-[11px] italic leading-snug text-dm-muted">
                            Obs.: {line.observacao}
                          </p>
                        )}

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-0.5 rounded-full bg-dm-cream p-1 text-dm-plum ring-1 ring-dm-line/60">
                            <button
                              type="button"
                              onClick={() => decLine(line.key)}
                              aria-label={`Remover uma unidade de ${line.produtoNome}`}
                              className="grid size-9 place-items-center rounded-full bg-white shadow-sm transition hover:bg-dm-cream dm-focus"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="min-w-5 text-center text-sm font-bold tabular-nums">
                              {line.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => incLine(line.key)}
                              aria-label={`Adicionar uma unidade de ${line.produtoNome}`}
                              className="grid size-9 place-items-center rounded-full bg-white shadow-sm transition hover:bg-dm-cream dm-focus"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <span className="flex flex-col items-end">
                            <span className="text-[10px] font-bold uppercase tracking-wide text-dm-plum">
                              Total do item
                            </span>
                            <span className="font-display text-sm font-bold text-dm-ink">
                              {formatBRL(totalLinha(line))}
                            </span>
                          </span>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <button
                type="button"
                onClick={clear}
                className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-dm-line px-3 py-1.5 text-xs font-semibold text-dm-muted transition hover:border-dm-berry/40 hover:text-dm-berry dm-focus"
              >
                <Trash2 className="size-3.5" />
                Limpar pedido
              </button>
            </div>

            <SheetFooter className="gap-3 border-t border-dm-line bg-white px-5 py-5">
              {faltamParaFreteGratis > 0 && (
                <p className="rounded-xl bg-dm-lime/25 px-3 py-2 text-center text-xs font-medium text-dm-ink">
                  Faltam {formatBRL(faltamParaFreteGratis)} para a entrega sair
                  de graça.
                </p>
              )}

              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between text-dm-muted">
                  <dt>Subtotal</dt>
                  <dd>{formatBRL(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-dm-muted">
                  <dt>Entrega</dt>
                  <dd>
                    {entrega === 0 ? (
                      <span className="font-semibold text-dm-plum">Grátis</span>
                    ) : (
                      formatBRL(entrega)
                    )}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-dm-line pt-2 font-display text-lg font-bold text-dm-ink">
                  <dt>Total</dt>
                  <dd>{formatBRL(total)}</dd>
                </div>
              </dl>

              <Button
                onClick={finalizar}
                className="h-12 w-full rounded-full bg-dm-plum text-base font-bold text-white hover:bg-dm-plum-soft"
              >
                <ShoppingBag className="size-5" />
                Finalizar no WhatsApp
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
