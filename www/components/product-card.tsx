import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { getProductById } from "@/lib/data"

interface ProductCardProps {
  id?: number
  title?: string
  category?: string
  price?: string
  emoji?: string
  colored?: boolean
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)

export function ProductCard({ id = 1, title, category, price, emoji, colored = false }: ProductCardProps) {
  const colors = ["bg-rose-100", "bg-amber-100", "bg-emerald-100", "bg-sky-100", "bg-violet-100"]
  // IA-first: evita `Math.random()` durante o render (mantém a UI estável e lint-free).
  const colorIndex = Math.abs(id) % colors.length
  const bgColor = colored ? colors[colorIndex] : "bg-neutral-100"
  const product = getProductById(id)
  const resolvedTitle = title ?? product?.name ?? "Produto"
  const resolvedCategory = category ?? product?.category ?? "Categoria"
  const resolvedPrice = price ?? (product ? formatCurrency(product.price) : "R$ 0,00")
  const resolvedEmoji = emoji ?? product?.emoji ?? "🛍️"

  return (
    <div className="bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
      <Link href={`/produtos/${id}`} className="block">
        <div className={`${bgColor} aspect-square flex items-center justify-center`}>
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
