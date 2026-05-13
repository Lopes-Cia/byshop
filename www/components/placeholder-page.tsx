import Link from "next/link"

export function PlaceholderPage({
  title,
  description = "Esta página ainda está em construção.",
}: {
  title: string
  description?: string
}) {
  return (
    <main className="min-h-[70vh] bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
        <p className="mt-2 text-neutral-600">{description}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 transition"
          >
            Voltar para o início
          </Link>
          <Link
            href="/produtos"
            className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition"
          >
            Ver produtos
          </Link>
        </div>
      </div>
    </main>
  )
}
