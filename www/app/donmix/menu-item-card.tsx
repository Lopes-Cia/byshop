"use client"

import Image from "next/image"
import { Flame, Heart, Minus, Plus, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"
import { categoriaPorId, formatBRL, type MenuItem } from "./menu-data"

interface MenuItemCardProps {
  item: MenuItem
  qty: number
  favorito: boolean
  onAdd: (item: MenuItem) => void
  onDec: (item: MenuItem) => void
  onToggleFavorito: (item: MenuItem) => void
  index?: number
}

export function MenuItemCard({
  item,
  qty,
  favorito,
  onAdd,
  onDec,
  onToggleFavorito,
  index = 0,
}: MenuItemCardProps) {
  const categoria = categoriaPorId(item.categoria)
  const tagColor = item.tagColor ?? "#4a0e52"
  const desconto = item.precoOriginal
    ? Math.round(((item.precoOriginal - item.preco) / item.precoOriginal) * 100)
    : 0

  return (
    <article
      className="dm-rise group relative flex flex-col overflow-hidden rounded-[28px] bg-white ring-1 ring-dm-line transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-28px_rgba(43,7,51,0.45)]"
      style={{ animationDelay: `${Math.min(index, 7) * 55}ms` }}
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-dm-cream">
        <Image
          src={item.imagem}
          alt={item.nome}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
          className="object-contain p-5 drop-shadow-[0_18px_20px_rgba(43,7,51,0.18)] transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />

        <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
          {item.maisVendido && (
            <span className="inline-flex items-center gap-1 rounded-full bg-dm-plum px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-dm-lime-bright shadow-sm">
              <Flame className="size-3" />
              Mais vendido
            </span>
          )}
          {item.lancamento && (
            <span className="inline-flex items-center gap-1 rounded-full bg-dm-lime px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-dm-ink shadow-sm">
              <Sparkles className="size-3" />
              Novidade
            </span>
          )}
        </div>

        {desconto > 0 && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-dm-berry px-2.5 py-1 text-[11px] font-bold text-white shadow-sm">
            -{desconto}%
          </span>
        )}

        <button
          type="button"
          onClick={() => onToggleFavorito(item)}
          aria-pressed={favorito}
          aria-label={
            favorito
              ? `Remover ${item.nome} dos favoritos`
              : `Favoritar ${item.nome}`
          }
          className={cn(
            "absolute bottom-3 right-3 z-10 grid size-9 place-items-center rounded-full bg-white/85 shadow-sm backdrop-blur transition hover:bg-white dm-focus",
            favorito
              ? "text-dm-berry opacity-100"
              : "text-dm-plum md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100",
          )}
        >
          <Heart className={cn("size-4", favorito && "fill-current")} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-dm-muted">
            {categoria.nome}
          </span>
          {item.tag && (
            <span
              className="rounded-full px-2 py-0.5 text-[11px] font-bold"
              style={{ backgroundColor: `${tagColor}22`, color: tagColor }}
            >
              {item.tag}
            </span>
          )}
        </div>

        <h3 className="font-display text-lg font-bold leading-snug text-dm-ink">
          {item.nome}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-dm-muted">
          {item.descricao}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div className="flex flex-col">
            {item.precoOriginal && (
              <span className="text-xs text-dm-muted line-through">
                {formatBRL(item.precoOriginal)}
              </span>
            )}
            <span className="font-display text-xl font-bold text-dm-plum">
              {formatBRL(item.preco)}
            </span>
          </div>

          {qty > 0 ? (
            <div className="flex items-center gap-1 rounded-full bg-dm-plum p-1 text-white">
              <button
                type="button"
                onClick={() => onDec(item)}
                aria-label={`Remover uma unidade de ${item.nome}`}
                className="grid size-8 place-items-center rounded-full transition hover:bg-white/15 dm-focus"
              >
                <Minus className="size-4" />
              </button>
              <span className="min-w-5 text-center text-sm font-bold tabular-nums">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => onAdd(item)}
                aria-label={`Adicionar mais uma unidade de ${item.nome}`}
                className="grid size-8 place-items-center rounded-full transition hover:bg-white/15 dm-focus"
              >
                <Plus className="size-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onAdd(item)}
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-dm-plum pl-3.5 pr-4 text-sm font-bold text-white transition-all duration-200 hover:bg-dm-plum-soft active:scale-95 dm-focus"
            >
              <Plus className="size-4" />
              Adicionar
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
