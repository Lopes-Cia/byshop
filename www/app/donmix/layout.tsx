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

export const metadata = {
  title: "Don Mix — Delivery de lanches, sobremesas e bebidas",
  description:
    "Cardápio do Don Mix: lanches artesanais, sobremesas cremosas e bebidas geladas com entrega rápida em Consolação, SP.",
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
