import type { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getProdutoDetalhe,
  getProdutosRelacionados,
  getTodosProdutoIds,
} from "../../product-data"
import { ProductDetail } from "./product-detail"

interface ProdutoPageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return getTodosProdutoIds().map((id) => ({ id }))
}

export async function generateMetadata({
  params,
}: ProdutoPageProps): Promise<Metadata> {
  const { id } = await params
  const produto = getProdutoDetalhe(id)

  if (!produto) {
    return { title: "Produto não encontrado — Don Mix" }
  }

  return {
    title: `${produto.nome} — Don Mix`,
    description: produto.descricao,
    openGraph: {
      title: `${produto.nome} — Don Mix`,
      description: produto.descricao,
      images: [{ url: produto.imagem }],
    },
  }
}

export default async function ProdutoPage({ params }: ProdutoPageProps) {
  const { id } = await params
  const produto = getProdutoDetalhe(id)

  if (!produto) notFound()

  const relacionados = getProdutosRelacionados(produto.id)

  return <ProductDetail produto={produto} relacionados={relacionados} />
}
