import {
  ChevronRight,
  ChevronLeft,
  Cpu,
  Gamepad2,
  Speaker,
  Monitor,
  GraduationCap,
  User,
  Package,
} from "lucide-react"
import { ProductCard } from "@/components/product-card"
import { TopSellerCard } from "@/components/top-seller-card"
import { Carousel, CarouselItem } from "@/components/carousel"

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl lg:text-5xl font-bold text-neutral-900 leading-tight">
                Compre computadores
                <br />
                e acessórios
              </h1>
              <p className="mt-4 text-neutral-600 text-sm max-w-md">
                Produtos selecionados, ofertas e entrega rápida para o seu dia a dia.
              </p>
              <button className="mt-6 px-6 py-2.5 border border-neutral-900 text-neutral-900 text-sm font-medium rounded hover:bg-neutral-900 hover:text-white transition">
                Ver mais
              </button>
            </div>
            <div className="relative">
              {/* Product Card */}
              <div className="absolute top-0 right-0 lg:right-20 bg-white rounded-lg shadow-lg p-4 z-10 w-48">
                <span className="text-xs text-neutral-500">
                  Computer & accessories
                </span>
                <h3 className="font-semibold text-sm mt-1">
                  JBL T460BT Black Headphones
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-neutral-900">
                    $125.00
                  </span>
                  <span className="text-xs text-neutral-400 line-through">
                    $199.00
                  </span>
                </div>
              </div>
              {/* Sale Badge */}
              <div className="absolute top-4 right-4 lg:right-8 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                50%
              </div>
              {/* Headphones Image */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-64 h-64 lg:w-80 lg:h-80 bg-neutral-200 rounded-full flex items-center justify-center">
                  <div className="text-6xl">🎧</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations Bar */}
      <section className="border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-6 overflow-x-auto">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-neutral-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Olá, Thomas</p>
                <p className="text-xs text-neutral-500">
                  Recomendações para você
                </p>
              </div>
            </div>
            <div className="h-8 w-px bg-neutral-200 flex-shrink-0" />
            <div className="flex items-center gap-3 flex-shrink-0">
              <Package className="w-6 h-6 text-neutral-600" />
              <div>
                <p className="text-sm font-medium">Seus pedidos</p>
                <p className="text-xs text-neutral-500">Ver histórico</p>
              </div>
            </div>
            <div className="h-8 w-px bg-neutral-200 flex-shrink-0" />
            <div className="flex items-center gap-3 flex-shrink-0">
              <Cpu className="w-6 h-6 text-neutral-600" />
              <div>
                <p className="text-sm font-medium">Eletrônicos</p>
                <p className="text-xs text-neutral-500">Até 24% OFF</p>
              </div>
            </div>
            <div className="h-8 w-px bg-neutral-200 flex-shrink-0" />
            <div className="flex items-center gap-3 flex-shrink-0">
              <GraduationCap className="w-6 h-6 text-neutral-600" />
              <div>
                <p className="text-sm font-medium">Acessórios para estudo</p>
                <p className="text-xs text-neutral-500">Até 26% OFF</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop By Categories */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">
            Compre por categoria
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <CategoryCard title="Beleza" emoji="💄" bgColor="bg-neutral-800" />
            <CategoryCard
              title="Computadores e acessórios"
              emoji="🖥️"
              bgColor="bg-neutral-100"
              dark={false}
            />
            <CategoryCard title="Games" emoji="🎮" bgColor="bg-amber-100" dark={false} />
            <CategoryCard title="Brinquedos e jogos" emoji="🧸" bgColor="bg-amber-200" dark={false} />
          </div>
        </div>
      </section>

      {/* Amazon Basics & Deals */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-amber-50 rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-neutral-900">
                  ByShop Básicos
                </h3>
                <p className="text-sm text-neutral-600 mt-2 max-w-xs">
                  Confira ofertas do dia, ofertas relâmpago e descontos por tempo limitado
                </p>
                <button className="mt-4 text-sm text-amber-600 font-medium flex items-center gap-1">
                  Ver mais <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="text-4xl">👜</div>
            </div>
            <div className="bg-neutral-100 rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-neutral-900">
                  Ofertas e promoções
                </h3>
                <p className="text-sm text-neutral-600 mt-2 max-w-xs">
                  Confira ofertas do dia, ofertas relâmpago e descontos por tempo limitado
                </p>
                <button className="mt-4 text-sm text-neutral-900 font-medium flex items-center gap-1">
                  Ver mais <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="text-4xl">⌚</div>
            </div>
          </div>
        </div>
      </section>

      {/* Amazon Delivers To You */}
      <section className="py-10 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wider mb-2">
                Descubra a ByShop
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900">
                A ByShop entrega
                <br />
                para você
              </h2>
              <p className="mt-4 text-neutral-600 text-sm max-w-md">
                Receba seus pedidos com segurança e praticidade.
              </p>
              <button className="mt-6 px-6 py-2.5 border border-neutral-900 text-neutral-900 text-sm font-medium rounded hover:bg-neutral-900 hover:text-white transition">
                Ver mais
              </button>
            </div>
            <div className="flex justify-center">
              <div className="bg-amber-200 rounded-lg p-8 flex items-center justify-center">
                <div className="text-8xl">📦</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      <Carousel title="Vistos Recentemente" viewMoreHref="#">
        {[...Array(6)].map((_, i) => (
          <CarouselItem key={i} className="w-[280px] sm:w-[220px] md:w-[200px] lg:w-[180px]">
            <ProductCard id={i + 1} />
          </CarouselItem>
        ))}
      </Carousel>

      {/* Amazon's Top Sellers */}
      <Carousel title="Mais Vendidos" viewMoreHref="#" className="bg-neutral-50">
        {[...Array(8)].map((_, i) => (
          <CarouselItem key={i} className="w-[280px] sm:w-[220px] md:w-[200px] lg:w-[180px]">
            <TopSellerCard id={i + 7} />
          </CarouselItem>
        ))}
      </Carousel>

      {/* Comfy Styles */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <StyleCard title="Comfy styles for her" category="Top Handbags" emoji="👜" />
            <StyleCard title="Comfy styles for him" category="Men T-Shirts" emoji="👕" />
          </div>
        </div>
      </section>

      {/* Thomas, this is for you */}
      <Carousel title="Thomas, feito para você" viewMoreHref="#" className="bg-neutral-50">
        {[...Array(10)].map((_, i) => (
          <CarouselItem key={i} className="w-[280px] sm:w-[220px] md:w-[200px] lg:w-[180px]">
            <ProductCard colored id={i + 15} />
          </CarouselItem>
        ))}
      </Carousel>

      {/* Category Icons */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8 overflow-x-auto flex-1">
              <CategoryIcon icon={<Speaker className="w-8 h-8" />} title="Caixas de som" />
              <CategoryIcon icon={<Gamepad2 className="w-8 h-8" />} title="Consoles" />
              <CategoryIcon icon={<Monitor className="w-8 h-8" />} title="Eletrônicos" />
              <CategoryIcon icon={<GraduationCap className="w-8 h-8" />} title="Acessórios para estudo" />
            </div>
            <div className="flex gap-2 flex-shrink-0 ml-4">
              <button className="w-8 h-8 border border-neutral-300 rounded-full flex items-center justify-center hover:bg-neutral-100">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 border border-neutral-300 rounded-full flex items-center justify-center hover:bg-neutral-100">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-4">
            Descubra a ByShop
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900">
            Assine nossa
            <br />
            newsletter
          </h2>
          <p className="mt-4 text-neutral-600 text-sm max-w-md mx-auto">
            Fique por dentro de lançamentos e ofertas exclusivas.
          </p>
          <button className="mt-6 px-6 py-2.5 border border-neutral-900 text-neutral-900 text-sm font-medium rounded hover:bg-neutral-900 hover:text-white transition">
            Assinar
          </button>
        </div>
      </section>

      {/* Prime Sections */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-r from-purple-900 to-purple-700">
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Prime Gaming
                  </h3>
                </div>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden bg-gradient-to-r from-amber-600 to-amber-500">
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    ByShop Prime
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

function CategoryCard({
  title,
  emoji,
  bgColor,
  dark = true,
}: {
  title: string
  emoji: string
  bgColor: string
  dark?: boolean
}) {
  return (
    <div
      className={`${bgColor} rounded-lg p-6 aspect-square flex flex-col justify-end relative overflow-hidden`}
    >
      <div className="absolute top-4 right-4 text-5xl opacity-80">{emoji}</div>
      <h3
        className={`font-semibold ${dark ? "text-white" : "text-neutral-900"}`}
      >
        {title}
      </h3>
    </div>
  )
}

function StyleCard({
  title,
  category,
  emoji,
}: {
  title: string
  category: string
  emoji: string
}) {
  return (
    <div className="bg-amber-50 rounded-lg p-6">
      <h3 className="text-xl font-bold text-neutral-900">{title}</h3>
      <p className="text-sm text-neutral-600 mt-2">
        Seleção pensada para combinar com seu estilo e com descontos por tempo limitado.
      </p>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{emoji}</div>
          <div>
            <p className="font-medium text-neutral-900">{category}</p>
            <p className="text-xs text-neutral-500">Até 30% OFF</p>
          </div>
        </div>
        <button className="text-sm text-neutral-600 hover:underline flex items-center gap-1">
          Ver mais <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function CategoryIcon({
  icon,
  title,
}: {
  icon: React.ReactNode
  title: string
}) {
  return (
    <div className="flex flex-col items-center gap-2 flex-shrink-0">
      <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-600">
        {icon}
      </div>
      <p className="text-xs text-neutral-600 whitespace-nowrap">{title}</p>
      <p className="text-xs text-neutral-400">Até 30% OFF</p>
    </div>
  )
}
