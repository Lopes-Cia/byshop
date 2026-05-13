import { products } from "@/lib/data"
import { ProductCard } from "@/components/product-card"

export default function ProdutosPage() {
  return (
    <main className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Produtos</h1>
            <p className="text-sm text-neutral-600 mt-1">Catálogo mockado para desenvolvimento.</p>
          </div>
        </div>

        <div className="grid gap-4 mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} id={p.id} />
          ))}
        </div>
      </div>
    </main>
  )
}
