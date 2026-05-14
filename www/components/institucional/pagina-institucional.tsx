import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export type InstitucionalCta = {
  label: string
  href: string
}

export type InstitucionalSection = {
  title: string
  description?: string
  icon?: React.ReactNode
  items?: string[]
  href?: string
}

export type InstitucionalFaqItem = {
  question: string
  answer: string
}

export function PaginaInstitucional({
  badge = "Institucional",
  title,
  description,
  primaryCta,
  secondaryCta,
  heroAside,
  beforeSections,
  sections = [],
  afterSections,
  faqTitle = "Dúvidas frequentes",
  faq = [],
  bottomCtaTitle = "Pronto para seguir?",
  bottomCtaDescription = "Continue navegando pela ByShop com links úteis.",
  bottomPrimaryCta,
  bottomSecondaryCta,
  note,
}: {
  badge?: string
  title: string
  description: string
  primaryCta: InstitucionalCta
  secondaryCta?: InstitucionalCta
  heroAside?: React.ReactNode
  beforeSections?: React.ReactNode
  sections?: InstitucionalSection[]
  afterSections?: React.ReactNode
  faqTitle?: string
  faq?: InstitucionalFaqItem[]
  bottomCtaTitle?: string
  bottomCtaDescription?: string
  bottomPrimaryCta?: InstitucionalCta
  bottomSecondaryCta?: InstitucionalCta
  note?: string
}) {
  return (
    <main className="bg-white">
      {/* IA-first: Hero institucional padronizado com título/descrição e CTAs. */}
      <section className="bg-amber-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-10 lg:py-14">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <p className="text-xs text-neutral-500 uppercase tracking-wider">{badge}</p>
              <h1 className="mt-2 text-3xl lg:text-5xl font-bold text-neutral-900 leading-tight">{title}</h1>
              <p className="mt-4 text-sm text-neutral-600 max-w-xl">{description}</p>
              {note ? (
                <p className="mt-3 text-xs text-neutral-500 max-w-xl">{note}</p>
              ) : null}

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href={primaryCta.href}>
                    {primaryCta.label} <ArrowRight className="size-4" />
                  </Link>
                </Button>
                {secondaryCta ? (
                  <Button asChild size="lg" variant="outline">
                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                ) : null}
              </div>
            </div>

            {heroAside ? (
              heroAside
            ) : (
              <>
                {/* IA-first: Coluna de “resumo” padronizada para consistência visual entre páginas. */}
                <div className="rounded-xl border border-neutral-200 bg-white shadow-sm">
                  <div className="p-6">
                    <p className="text-xs text-neutral-500">Atalhos</p>
                    <p className="mt-1 font-semibold text-neutral-900">Links úteis desta seção</p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {(bottomPrimaryCta ?? primaryCta) ? (
                        <Button asChild variant="secondary" className="justify-between">
                          <Link href={(bottomPrimaryCta ?? primaryCta).href}>
                            {(bottomPrimaryCta ?? primaryCta).label} <ArrowRight className="size-4" />
                          </Link>
                        </Button>
                      ) : null}
                      {(bottomSecondaryCta ?? secondaryCta) ? (
                        <Button asChild variant="outline" className="justify-between">
                          <Link href={(bottomSecondaryCta ?? secondaryCta)!.href}>
                            {(bottomSecondaryCta ?? secondaryCta)!.label} <ArrowRight className="size-4" />
                          </Link>
                        </Button>
                      ) : null}
                    </div>

                    <div className="mt-5 rounded-lg bg-neutral-100 p-4">
                      <p className="text-sm font-medium text-neutral-900">Dica</p>
                      <p className="mt-1 text-sm text-neutral-600">
                        Use o menu do topo para buscar produtos e navegar por categorias.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {beforeSections ? (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4">{beforeSections}</div>
        </section>
      ) : null}

      {/* IA-first: Seções por dados para acelerar criação com consistência. */}
      {sections.length ? (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sections.map((s, idx) => {
                const content = (
                  <>
                    <CardHeader className="px-5 pt-5 pb-0">
                      <div className="flex items-start gap-3">
                        {s.icon ? (
                          <div className="size-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center shrink-0">
                            {s.icon}
                          </div>
                        ) : null}
                        <div>
                          <CardTitle>{s.title}</CardTitle>
                          {s.description ? (
                            <p className="mt-1 text-sm text-neutral-600">{s.description}</p>
                          ) : null}
                        </div>
                      </div>
                    </CardHeader>
                    {s.items?.length ? (
                      <CardContent className="px-5 pb-5">
                        <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                          {s.items.map((item, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="mt-2 size-1.5 rounded-full bg-amber-500 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    ) : (
                      <div className="px-5 pb-5" />
                    )}
                  </>
                )

                return s.href ? (
                  <Link key={idx} href={s.href} className="block">
                    <Card className="py-0 hover:shadow-md transition-shadow">{content}</Card>
                  </Link>
                ) : (
                  <Card key={idx} className="py-0">
                    {content}
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      {afterSections ? (
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4">{afterSections}</div>
        </section>
      ) : null}

      {/* IA-first: FAQ opcional (client component interno via Accordion). */}
      {faq.length ? (
        <section className="py-10 bg-neutral-50 border-y border-neutral-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold text-neutral-900">{faqTitle}</h2>
              <p className="mt-2 text-sm text-neutral-600">
                Respostas rápidas para as perguntas mais comuns.
              </p>
            </div>
            <div className="mt-6 max-w-3xl rounded-xl border border-neutral-200 bg-white p-2">
              <Accordion type="single" collapsible>
                {faq.map((item, idx) => (
                  <AccordionItem key={idx} value={`faq-${idx}`}>
                    <AccordionTrigger className="px-3">{item.question}</AccordionTrigger>
                    <AccordionContent className="px-3 text-neutral-600">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      ) : null}

      {/* IA-first: CTA final padronizado para encerrar a página. */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-xl border border-neutral-200 bg-amber-50 p-6">
            <h3 className="text-lg font-bold text-neutral-900">{bottomCtaTitle}</h3>
            <p className="mt-2 text-sm text-neutral-600">{bottomCtaDescription}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={(bottomPrimaryCta ?? primaryCta).href}>
                  {(bottomPrimaryCta ?? primaryCta).label} <ArrowRight className="size-4" />
                </Link>
              </Button>
              {(bottomSecondaryCta ?? secondaryCta) ? (
                <Button asChild size="lg" variant="outline">
                  <Link href={(bottomSecondaryCta ?? secondaryCta)!.href}>{(bottomSecondaryCta ?? secondaryCta)!.label}</Link>
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
