import Link from "next/link"
export default function MeuPedidoDetalhePage() {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">Em refatoração</h1>
        <p className="mt-2 text-sm text-neutral-600">Esta página está sendo reescrita.</p>
        <div className="mt-8 flex justify-center">
          <Link href="/meus-pedidos" className="text-sm font-semibold text-amber-700 hover:text-amber-800">
            Voltar
          </Link>
        </div>
      </div>
    </main>
  )
}
