import { Suspense } from "react"

import SucessoClient from "./sucesso-client"

const Loading = () => (
  <main className="bg-white">
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <p className="text-sm text-neutral-600">Carregando pedido…</p>
    </div>
  </main>
)

export default function SucessoPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SucessoClient />
    </Suspense>
  )
}
