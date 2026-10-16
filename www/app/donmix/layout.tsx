import type { Metadata } from "next"
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google"

import { Toaster } from "@/components/ui/sonner"

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
})

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Don Mix — Delivery de lanches, sobremesas e bebidas",
  description:
    "Cardápio do Don Mix: lanches artesanais, sobremesas cremosas e bebidas geladas com entrega rápida em Consolação, SP.",
  // Ícones/favicon do Don Mix — aplicados somente às rotas deste segmento,
  // sobrepondo os ícones globais definidos em app/layout.tsx.
  icons: {
    icon: [
      { url: "/donmix/icon0.svg", type: "image/svg+xml" },
      { url: "/donmix/icon1.png", type: "image/png", sizes: "96x96" },
      { url: "/donmix/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/donmix/apple-icon.png", sizes: "180x180" }],
  },
  manifest: "/donmix/manifest.json",
  appleWebApp: {
    title: "DonMix",
  },
}

export default function DonmixLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div
      className={`${display.variable} ${body.variable} font-body bg-dm-cream text-dm-ink antialiased`}
    >
      {children}
      <Toaster position="top-center" richColors closeButton />
    </div>
  )
}
