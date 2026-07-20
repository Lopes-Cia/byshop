"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getProductById } from "@/lib/data"
import { useWishlistStore } from "@/stores/wishlist-store"

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)

export default function ListaDeDesejosPage() {
  const wishlist = useWishlistStore((s) => ({
    items: s.items,
    remove: s.remove,
    clear: s.clear,
  }))

  if (wishlist.items.length === 0) {
    return (
      <main className="bg-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-neutral-900">Lista de desejos</h1>
          <p className="mt-2 text-sm text-neutral-600">Você ainda não adicionou itens à sua lista.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/produtos">Ver produtos</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/minha-conta">Minha conta</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Lista de desejos</h1>
            <p className="mt-1 text-sm text-neutral-600">Itens salvos neste navegador.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link href="/produtos">Continuar comprando</Link>
            </Button>
            <Button type="button" variant="destructive" onClick={wishlist.clear}>
              Limpar
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.items.map((item) => {
            const product = getProductById(item.productId)
            return (
              <Card key={item.productId}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{product?.name ?? `Produto #${item.productId}`}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-neutral-600">
                    {product ? formatCurrency(product.price) : "Produto não encontrado no mock atual."}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild size="sm">
                      <Link href={product ? `/produtos/${product.id}` : "/produtos"}>Ver produto</Link>
                    </Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => wishlist.remove(item.productId)}>
                      Remover
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </main>
  )
}
