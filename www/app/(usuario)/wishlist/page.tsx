"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HeartOff, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "USD" }).format(value);

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((state) => state.addItem);
  const [hasHydrated, setHasHydrated] = useState(useWishlistStore.persist.hasHydrated());

  useEffect(() => {
    const unsubscribe = useWishlistStore.persist.onFinishHydration(() => setHasHydrated(true));
    if (useWishlistStore.persist.hasHydrated()) setHasHydrated(true);
    return unsubscribe;
  }, []);

  if (!hasHydrated) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Wishlist</h1>
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">Wishlist</h1>
        <p className="text-muted-foreground mb-8">Você ainda não salvou nenhum item.</p>
        <Link href="/products">
          <Button size="lg">Ir para produtos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wishlist</h1>
          <p className="text-muted-foreground mt-2">{items.length} item(ns)</p>
        </div>
        <Button variant="outline" onClick={clearWishlist}>
          Limpar wishlist
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <div className="divide-y divide-gray-200">
          {items.map((product) => (
            <div key={product.id} className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
              <Link href={`/products/${product.id}`} className="flex items-center gap-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <div className="truncate font-semibold text-gray-900">{product.name}</div>
                  <div className="text-muted-foreground mt-1 text-sm">{formatCurrency(product.price)}</div>
                </div>
              </Link>

              <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                <Button
                  onClick={() => {
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      quantity: 1
                    });
                    removeItem(product.id);
                  }}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Mover para carrinho
                </Button>

                <Button variant="outline" onClick={() => removeItem(product.id)}>
                  <HeartOff className="mr-2 h-4 w-4" />
                  Remover
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
