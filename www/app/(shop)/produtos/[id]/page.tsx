// IA-first: esta página continua sendo client por conter seleção de variação/quantidade,
// mas Header/Footer e overlays globais ficam centralizados no AppShell.
'use client'

import { useState } from "react"
import {
  Star,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Check,
  ThumbsUp,
  ImageIcon,
  Heart,
  ChevronRight,
  ShoppingCart,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useAppShell } from "@/components/app-shell-context"
import { Carousel, CarouselItem } from "@/components/carousel"
import { ProductCard } from "@/components/product-card"
import { customerReviewsMock, getProductById, products } from "@/lib/data"

export default function ProductPage() {
  const params = useParams<{ id: string }>()
  const { openCart } = useAppShell()
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const productId = Number(params?.id)
  const product = Number.isFinite(productId) ? getProductById(productId) : undefined
  const seller = "byShop"
  const deliveryDate = "em até 3 dias úteis"
  const related = products.filter((p) => p.id !== product?.id).slice(0, 6)
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? "fill-amber-400 text-amber-400"
                : i < rating
                ? "fill-amber-400/50 text-amber-400"
                : "fill-neutral-200 text-neutral-200"
            }`}
          />
        ))}
      </div>
    )
  }

  if (!product) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-neutral-900">Produto não encontrado</h1>
        <p className="mt-2 text-neutral-600">O produto informado não existe no catálogo mockado.</p>
        <div className="mt-6">
          <Link
            href="/produtos"
            className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 transition"
          >
            Ver produtos
          </Link>
        </div>
      </main>
    )
  }

  return (
    <>
      {/* Breadcrumb - Responsivo */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-neutral-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link href="/" className="hover:text-amber-600 flex-shrink-0">Início</Link>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <Link href="/produtos" className="hover:text-amber-600 flex-shrink-0">Produtos</Link>
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="text-neutral-900 truncate max-w-[150px] sm:max-w-none">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              {/* Main Image */}
              <div className="aspect-square bg-neutral-100 rounded-xl overflow-hidden mb-4 flex items-center justify-center relative">
                <div className="w-3/4 h-3/4 flex items-center justify-center">
                  <ImageIcon className="w-32 h-32 text-neutral-300" />
                </div>
                {/* Wishlist button */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-neutral-400"}`} />
                </button>
                {/* Share button */}
                <button className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition">
                  <Share2 className="w-5 h-5 text-neutral-400" />
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === idx ? "border-amber-500" : "border-neutral-200"
                    }`}
                  >
                    <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-neutral-300" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-4">
            <div className="space-y-4">
              {/* Brand */}
              <Link href="#" className="text-amber-600 hover:underline text-sm font-medium">
                {product.brand}
              </Link>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 flex-wrap">
                {renderStars(product.rating ?? 0)}
                <span className="text-amber-600 hover:underline cursor-pointer text-sm">
                  {(product.reviews ?? 0).toLocaleString()} avaliações
                </span>
              </div>

              {/* Price */}
              <div className="border-t border-b border-neutral-200 py-4 space-y-1">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-2xl sm:text-3xl font-bold text-neutral-900">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-sm sm:text-base text-neutral-500 line-through">
                    {formatCurrency(product.originalPrice ?? product.price)}
                  </span>
                  <span className="text-sm font-semibold text-green-600">
                    -{product.discount ?? 0}%
                  </span>
                </div>
                <p className="text-xs text-neutral-500">
                  em até 10x de {formatCurrency(product.price / 10)} sem juros
                </p>
              </div>

              {/* Colors */}
              <div>
                <p className="text-sm font-medium text-neutral-900 mb-2">
                  Cor:{" "}
                  <span className="font-normal">
                    {/* IA-first: `colors` é opcional no dataset; fallback evita erro de TS. */}
                    {product.colors?.[selectedColor]?.name ?? "Única"}
                  </span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {(product.colors ?? []).map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      className={`w-10 h-10 rounded-full border-2 transition ${
                        selectedColor === idx ? "border-amber-500 ring-2 ring-amber-200" : "border-neutral-300"
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Sobre este produto</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Características</h3>
                <ul className="space-y-1">
                  {(product.features ?? []).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-neutral-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Buy Box */}
          <div className="lg:col-span-3">
            <div className="border border-neutral-200 rounded-xl p-4 sm:p-5 space-y-4 sticky top-24">
              {/* Price in buy box */}
              <div>
                <p className="text-2xl font-bold text-neutral-900">{formatCurrency(product.price)}</p>
                <p className="text-xs text-neutral-500 mt-1">
                  em até 10x de {formatCurrency(product.price / 10)}
                </p>
              </div>

              {/* Delivery */}
              <div className="flex items-start gap-3 text-sm">
                <Truck className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-600 font-medium">Frete grátis</p>
                  <p className="text-neutral-600">Chegará {deliveryDate}</p>
                </div>
              </div>

              {/* Stock */}
              <p className={`text-sm font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                {product.inStock ? "Em estoque" : "Indisponível"}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-600">Qtd:</span>
                <div className="flex items-center border border-neutral-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center hover:bg-neutral-100 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2">
                <button 
                  onClick={openCart}
                  className="w-full bg-amber-400 hover:bg-amber-500 text-neutral-900 font-semibold py-3 rounded-full transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Adicionar ao Carrinho
                </button>
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-full transition">
                  Comprar Agora
                </button>
              </div>

              {/* Seller */}
              <div className="text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                <p>Vendido por <span className="text-amber-600">{seller}</span></p>
                <p>Enviado por <span className="text-amber-600">ByShop</span></p>
              </div>

              {/* Trust badges */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <div className="flex items-center gap-2 text-xs text-neutral-600">
                  <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Compra Garantida</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-600">
                  <RotateCcw className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Devolução grátis em 30 dias</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="mt-12 pt-8 border-t border-neutral-200">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Avaliações de clientes</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Rating Summary */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-50 rounded-xl p-5 space-y-4">
                <div className="text-center">
                  <p className="text-4xl font-bold text-neutral-900">{product.rating ?? 0}</p>
                  <div className="flex justify-center my-2">
                    {renderStars(product.rating ?? 0)}
                  </div>
                  <p className="text-sm text-neutral-500">
                    {(product.reviews ?? 0).toLocaleString()} avaliações
                  </p>
                </div>

                {/* Rating Bars */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(stars => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-neutral-600 w-10 sm:w-12">{stars} estrelas</span>
                      <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : stars === 2 ? 2 : 1}%` }}
                        />
                      </div>
                      <span className="text-xs sm:text-sm text-neutral-500 w-8 sm:w-10 text-right">
                        {stars === 5 ? '70%' : stars === 4 ? '20%' : stars === 3 ? '7%' : stars === 2 ? '2%' : '1%'}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 border border-neutral-300 text-neutral-700 py-2 rounded-lg font-medium hover:bg-neutral-100 transition text-sm">
                  Escrever uma avaliação
                </button>
              </div>
            </div>

            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-6">
              {customerReviewsMock.map(review => (
                <div key={review.id} className="border-b border-neutral-100 pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-amber-700">
                        {review.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{review.author}</p>
                      {review.verified && (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Compra verificada
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {renderStars(review.rating)}
                    <span className="font-semibold text-neutral-900 text-sm sm:text-base">{review.title}</span>
                  </div>

                  <p className="text-xs text-neutral-500 mb-2">{review.date}</p>
                  <p className="text-sm text-neutral-600 leading-relaxed mb-3">{review.content}</p>

                  <button className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-700">
                    <ThumbsUp className="w-4 h-4" />
                    Útil ({review.helpful})
                  </button>
                </div>
              ))}

              <button className="text-amber-600 hover:text-amber-700 font-medium text-sm">
                Ver todas as avaliações
              </button>
            </div>
          </div>
        </section>

        {/* Related Products - Using Carousel Component */}
        <section className="mt-12 pt-8 border-t border-neutral-200">
          <Carousel title="Produtos Relacionados" viewMoreHref="/produtos">
            {related.map((p) => (
              <CarouselItem key={p.id} className="w-[280px] sm:w-[220px] md:w-[200px] lg:w-[180px]">
                <ProductCard id={p.id} />
              </CarouselItem>
            ))}
          </Carousel>
        </section>
      </main>
    </>
  )
}
