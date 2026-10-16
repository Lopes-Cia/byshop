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
import { formatBRL, LOJA, type MenuItem } from "./menu-data"

export interface CartLine {
  item: MenuItem
  qty: number
}

interface CartSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lines: CartLine[]
  onInc: (item: MenuItem) => void
  onDec: (item: MenuItem) => void
  onClear: () => void
}

export function CartSheet({
  open,
  onOpenChange,
  lines,
  onInc,
  onDec,
  onClear,
}: CartSheetProps) {
  const count = lines.reduce((sum, line) => sum + line.qty, 0)
  const subtotal = lines.reduce((sum, line) => sum + line.item.preco * line.qty, 0)
  const entrega =
    subtotal === 0 || subtotal >= LOJA.entregaGratisAcima ? 0 : LOJA.taxaEntrega
  const total = subtotal + entrega
  const faltamParaFreteGratis = Math.max(LOJA.entregaGratisAcima - subtotal, 0)

  const finalizar = () => {
    const linhas = lines
      .map((line) => `- ${line.qty}x ${line.item.nome} (${formatBRL(line.item.preco * line.qty)})`)
      .join("\n")
    const mensagem = [
      `Olá, ${LOJA.nome}! Quero fazer um pedido:`,
      "",
      linhas,
      "",
      `Subtotal: ${formatBRL(subtotal)}`,
      `Entrega: ${entrega === 0 ? "Grátis" : formatBRL(entrega)}`,
      `Total: ${formatBRL(total)}`,
    ].join("\n")
    window.open(
      `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(mensagem)}`,
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
                Explore o cardápio e adicione suas delícias favoritas.
              </p>
            </div>
            <Button
              className="rounded-full bg-dm-plum text-white hover:bg-dm-plum-soft"
              onClick={() => onOpenChange(false)}
            >
              Ver cardápio
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5">
              <ul className="divide-y divide-dm-line">
                {lines.map((line) => (
                  <li key={line.item.id} className="flex gap-3 py-4">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-dm-cream">
                      <Image
                        src={line.item.imagem}
                        alt={line.item.nome}
                        fill
                        sizes="64px"
                        className="object-contain p-1.5"
                      />
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-display text-sm font-bold leading-snug text-dm-ink">
                          {line.item.nome}
                        </p>
                        <button
                          type="button"
                          onClick={() => onDec(line.item)}
                          aria-label={`Remover ${line.item.nome}`}
                          className="grid size-7 shrink-0 place-items-center rounded-full text-dm-muted transition hover:bg-dm-cream hover:text-dm-berry"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <p className="text-xs text-dm-muted">
                        {formatBRL(line.item.preco)} cada
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full bg-dm-cream p-1 text-dm-plum">
                          <button
                            type="button"
                            onClick={() => onDec(line.item)}
                            aria-label={`Remover uma unidade de ${line.item.nome}`}
                            className="grid size-7 place-items-center rounded-full transition hover:bg-white"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="min-w-5 text-center text-sm font-bold tabular-nums">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => onInc(line.item)}
                            aria-label={`Adicionar uma unidade de ${line.item.nome}`}
                            className="grid size-7 place-items-center rounded-full transition hover:bg-white"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <span className="font-display text-sm font-bold text-dm-ink">
                          {formatBRL(line.item.preco * line.qty)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={onClear}
                className="mb-4 text-xs font-medium text-dm-muted underline-offset-4 transition hover:text-dm-berry hover:underline"
              >
                Limpar pedido
              </button>
            </div>

            <SheetFooter className="gap-3 border-t border-dm-line bg-white px-5 py-5">
              {faltamParaFreteGratis > 0 && (
                <p className="rounded-xl bg-dm-lime/25 px-3 py-2 text-center text-xs font-medium text-dm-ink">
                  Faltam {formatBRL(faltamParaFreteGratis)} para a entrega sair de graça.
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
                      <span className="font-semibold text-dm-mint">Grátis</span>
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
