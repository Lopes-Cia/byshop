import type { Metadata } from "next"
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google"

import { Toaster } from "@/components/ui/sonner"

import { CartSheet } from "./cart-sheet"

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
  // Em produção, defina NEXT_PUBLIC_SITE_URL (ex.: https://donmix.com.br)
  // para resolver as imagens de Open Graph com o domínio correto.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "Don Mix — Delivery de lanches, sobremesas e bebidas",
  description:
    "Cardápio do Don Mix: lanches artesanais, sobremesas cremosas e bebidas geladas com entrega rápida em Aparecida de Goiânia, GO.",
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
      <CartSheet />
      <Toaster position="top-center" richColors closeButton />
    </div>
  )
}
