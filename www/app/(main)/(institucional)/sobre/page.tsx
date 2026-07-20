import { Headphones, Package, ShieldCheck, Sparkles } from "lucide-react"

import { PaginaInstitucional } from "@/components/institucional/pagina-institucional"

export default function SobrePage() {
  return (
    <PaginaInstitucional
      title="Sobre a ByShop"
      description="Somos uma loja online focada em curadoria, experiência e suporte de ponta a ponta — da escolha do produto até o pós-venda."
      primaryCta={{ label: "Ver produtos", href: "/produtos" }}
      secondaryCta={{ label: "Central de ajuda", href: "/central-de-ajuda" }}
      heroAside={
        <div className="relative">
          <div className="rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-neutral-500">O que você encontra aqui</p>
                  <p className="mt-1 font-semibold text-neutral-900">Tecnologia e acessórios com entrega rápida</p>
                </div>
                <div className="size-12 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                  <Sparkles className="size-5" />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-neutral-100 h-16" />
                <div className="rounded-lg bg-neutral-100 h-16" />
                <div className="rounded-lg bg-neutral-100 h-16" />
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-neutral-600">
                <ShieldCheck className="size-4" />
                Pagamento seguro e atendimento dedicado
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -left-4 hidden md:block size-24 rounded-2xl bg-amber-200 border border-amber-300" />
          <div className="absolute -top-4 -right-4 hidden md:block size-20 rounded-2xl bg-white border border-neutral-200 shadow-sm" />
        </div>
      }
      beforeSections={
        <div className="max-w-3xl">
          <h2 className="text-xl font-bold text-neutral-900">Nossa proposta</h2>
          <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
            A ByShop nasceu para simplificar a compra online: catálogo objetivo, boas descrições, navegação clara e um
            suporte que resolve. Buscamos unir preço justo, entrega confiável e uma experiência moderna.
          </p>
        </div>
      }
      sections={[
        {
          title: "Curadoria",
          description:
            "Selecionamos produtos com foco em qualidade, custo-benefício e clareza na comparação.",
          icon: <Sparkles className="size-5" />,
        },
        {
          title: "Entrega",
          description: "Logística com rastreio e comunicação transparente, do pedido à sua porta.",
          icon: <Package className="size-5" />,
        },
        {
          title: "Suporte",
          description: "Atendimento direto para dúvidas, trocas e orientações — sem empurra-empurra.",
          icon: <Headphones className="size-5" />,
        },
      ]}
      afterSections={
        <div className="space-y-10">
          <section className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold text-neutral-900">Como funciona</h2>
                <p className="mt-3 text-sm text-neutral-600 max-w-xl">
                  Um fluxo simples para você comprar com segurança e acompanhar cada etapa.
                </p>
              </div>
              <ol className="space-y-3">
                <li className="rounded-lg border border-neutral-200 bg-white p-4">
                  <p className="text-sm font-medium text-neutral-900">1) Explore e compare</p>
                  <p className="mt-1 text-sm text-neutral-600">
                    Use a listagem de produtos para filtrar e encontrar o que faz sentido para seu cenário.
                  </p>
                </li>
                <li className="rounded-lg border border-neutral-200 bg-white p-4">
                  <p className="text-sm font-medium text-neutral-900">2) Compre com tranquilidade</p>
                  <p className="mt-1 text-sm text-neutral-600">
                    Checkout enxuto, pagamento seguro e confirmação clara do pedido.
                  </p>
                </li>
                <li className="rounded-lg border border-neutral-200 bg-white p-4">
                  <p className="text-sm font-medium text-neutral-900">3) Acompanhe a entrega</p>
                  <p className="mt-1 text-sm text-neutral-600">
                    Atualizações e rastreio para você acompanhar o envio até a chegada.
                  </p>
                </li>
                <li className="rounded-lg border border-neutral-200 bg-white p-4">
                  <p className="text-sm font-medium text-neutral-900">4) Conte com a gente no pós-venda</p>
                  <p className="mt-1 text-sm text-neutral-600">
                    Dúvidas, suporte e trocas são tratados com prioridade.
                  </p>
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-neutral-900">Nossos compromissos</h2>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600">
              <li className="flex gap-2">
                <span className="mt-0.5 size-2 rounded-full bg-amber-500 shrink-0" />
                Transparência em preço, prazos e informações do produto
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 size-2 rounded-full bg-amber-500 shrink-0" />
                Comunicação clara em cada etapa do pedido
              </li>
              <li className="flex gap-2">
                <span className="mt-0.5 size-2 rounded-full bg-amber-500 shrink-0" />
                Suporte humano e objetivo quando você precisar
              </li>
            </ul>
          </section>
        </div>
      }
      bottomCtaTitle="Pronto para começar?"
      bottomCtaDescription="Encontre seu próximo produto ou tire dúvidas na nossa central de ajuda."
      bottomPrimaryCta={{ label: "Ver produtos", href: "/produtos" }}
      bottomSecondaryCta={{ label: "Central de ajuda", href: "/central-de-ajuda" }}
    />
  )
}
