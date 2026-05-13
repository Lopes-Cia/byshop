import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { getProductById } from "@/lib/data"

interface TopSellerCardProps {
  id?: number
  title?: string
  category?: string
  price?: string
  emoji?: string
  badge?: string
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)

export function TopSellerCard({ id = 1, title, category, price, emoji, badge = "MAIS VENDIDO" }: TopSellerCardProps) {
  const product = getProductById(id)
  const resolvedTitle = title ?? product?.name ?? "Produto"
  const resolvedCategory = category ?? product?.category ?? "Categoria"
  const resolvedPrice = price ?? (product ? formatCurrency(product.price) : "R$ 0,00")
  const resolvedEmoji = emoji ?? product?.emoji ?? "🛍️"

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-neutral-200 hover:shadow-md transition-shadow group">
      <Link href={`/produtos/${id}`} className="block">
        <div className="bg-amber-100 aspect-video flex items-center justify-center relative">
          <span className="absolute top-2 left-2 bg-rose-500 text-white text-xs px-2 py-0.5 rounded font-medium">
            {badge}
          </span>
          <div className="text-4xl">{resolvedEmoji}</div>
        </div>
        <div className="p-3">
          <p className="text-xs text-amber-600 font-medium">{resolvedCategory}</p>
          <h4 className="text-sm font-medium mt-1 line-clamp-2 text-neutral-900">
            {resolvedTitle}
          </h4>
          <p className="text-lg font-bold text-neutral-900 mt-2">{resolvedPrice}</p>
        </div>
      </Link>
      <div className="px-3 pb-3">
        <button className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium py-2 rounded-lg transition">
          <ShoppingCart className="w-4 h-4" />
          Comprar
        </button>
      </div>
    </div>
  )
}
