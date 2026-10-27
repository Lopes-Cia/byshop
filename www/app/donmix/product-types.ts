import type { CategoriaId } from "./menu-data"

/* ─── Contrato do backend (ERP) ───────────────────────
 *
 * Estes tipos espelham o JSON que o time de backend vai entregar.
 * O mock de `product-data.ts` usa exatamente este formato, então a troca
 * do mock por uma chamada de API deve ser transparente para a UI.
 */

export interface CategoriaERP {
  codigo: number
  codPai: number
  categoria: string
  detalhamento: string
  imagem: string
  sequencia: number
}

export interface ProdutoERP {
  codProd: number
  idIntegradora: number
  indiceEstoque: number
  qtUnit: number
  qtUnitCaixa: number
  qtPalete: number
  codLocalOrig: number
  marcaId: number
  recalculaPrecoUnidade: boolean
  recalculaEstoqueUnidade: boolean
  descricaoErp: string
  descricaoEcomerce: string
  ean: string
  eanCaixa: string
  codVol: string
  productId: string
  codFilial: string
  skuId: string
  descricaoTecnica?: string
  preco: number
  promotion: number
  qtEstoque: number
  imagem: string
  /** Grafia mantida igual ao ERP (sim, "Princiapal"). */
  categoriaPrinciapal: number
  dtUltAlter: string
  imagens: string[]
  categorias: CategoriaERP[]

  /* ── Campos adicionados pelo backend ── */
  /** Pai da árvore quando `varianteId === codProd`. */
  varianteId: number
  /** Quantas unidades de adicionais grátis o produto inclui. */
  qtAdicionalGratis: number
  /** IDs que referenciam a tabela de adicionais. */
  adicionais: number[]
}

export interface AdicionalERP {
  id: number
  descricao: string
  gratis: boolean
  preco: number
  estoque: number
  ativo: boolean
}

/* ─── View model da página ──────────────────────────── */

export interface VariacaoProduto {
  codProd: number
  /** Rótulo curto da variação: "300 ml", "Coca-Cola", "Tradicional"... */
  nome: string
  descricaoEcomerce: string
  preco: number
  precoOriginal?: number
  estoque: number
  imagem: string
  qtAdicionalGratis: number
  adicionais: AdicionalERP[]
}

export interface ProdutoDetalhe {
  id: string
  codProd: number
  nome: string
  descricao: string
  descricaoTecnica?: string
  categoria: CategoriaId
  imagem: string
  imagens: string[]
  maisVendido?: boolean
  lancamento?: boolean
  tag?: string
  tagColor?: string
  avaliacao: string
  tempoEntrega: string
  variacoes: VariacaoProduto[]
}

/* ─── Carrinho ──────────────────────────────────────── */

export interface AdicionalLinha {
  id: number
  descricao: string
  preco: number
  gratis: boolean
  qty: number
}

export interface CartLine {
  /** Identidade da configuração (produto + variação + adicionais + obs.). */
  key: string
  productId: string
  codProd: number
  produtoNome: string
  variacaoNome: string
  imagem: string
  precoBase: number
  precoOriginal?: number
  qty: number
  adicionais: AdicionalLinha[]
  observacao?: string
  qtAdicionalGratis: number
}

export interface ResumoAdicional extends AdicionalLinha {
  unidadesGratis: number
  unidadesPagas: number
  /** Total pago por essa linha (sem multiplicar pela qty do produto). */
  total: number
}

export interface ResumoAdicionais {
  linhas: ResumoAdicional[]
  /** Unidades que efetivamente saíram de graça. */
  unidadesGratis: number
  /** Unidades elegíveis que passaram da cota e serão cobradas. */
  unidadesExcedentes: number
  /** Valor de tabela das unidades grátis (economia). */
  valorGratis: number
  /** Total pago em adicionais por unidade do produto. */
  total: number
}

/* ─── Regras de preço ───────────────────────────────── */

export function roundMoney(value: number) {
  const n = Number.isFinite(value) ? value : 0
  return Math.round(n * 100) / 100
}

/**
 * Regra acordada com o time:
 * - Apenas adicionais com `gratis: true` consomem a cota `qtAdicionalGratis`.
 * - As unidades grátis são alocadas primeiro nos itens mais caros
 *   (melhor para o cliente), de forma determinística.
 * - Depois da cota, cada unidade é cobrada pelo `preco` do adicional.
 * - Adicionais com `gratis: false` são sempre pagos.
 */
export function resumoAdicionais(
  adicionais: AdicionalLinha[],
  qtAdicionalGratis: number,
): ResumoAdicionais {
  const selecionados = adicionais.filter((adicional) => adicional.qty > 0)
  const quota = Math.max(0, Math.floor(qtAdicionalGratis))

  const elegiveis = selecionados
    .filter((adicional) => adicional.gratis)
    .slice()
    .sort((a, b) => b.preco - a.preco || a.id - b.id)

  const gratisPorId = new Map<number, number>()
  let restante = quota

  for (const adicional of elegiveis) {
    if (restante <= 0) break
    const livres = Math.min(adicional.qty, restante)
    gratisPorId.set(adicional.id, livres)
    restante -= livres
  }

  const linhas = selecionados.map<ResumoAdicional>((adicional) => {
    const unidadesGratis = gratisPorId.get(adicional.id) ?? 0
    const unidadesPagas = Math.max(0, adicional.qty - unidadesGratis)

    return {
      ...adicional,
      unidadesGratis,
      unidadesPagas,
      total: roundMoney(unidadesPagas * adicional.preco),
    }
  })

  const unidadesGratis = linhas.reduce(
    (soma, adicional) => soma + adicional.unidadesGratis,
    0,
  )
  const unidadesElegiveis = linhas
    .filter((adicional) => adicional.gratis)
    .reduce((soma, adicional) => soma + adicional.qty, 0)
  const valorGratis = linhas.reduce(
    (soma, adicional) => soma + adicional.unidadesGratis * adicional.preco,
    0,
  )
  const total = linhas.reduce((soma, adicional) => soma + adicional.total, 0)

  return {
    linhas,
    unidadesGratis,
    unidadesExcedentes: Math.max(0, unidadesElegiveis - unidadesGratis),
    valorGratis: roundMoney(valorGratis),
    total: roundMoney(total),
  }
}

export function precoUnitarioLinha(line: CartLine) {
  const resumo = resumoAdicionais(line.adicionais, line.qtAdicionalGratis)
  return roundMoney(line.precoBase + resumo.total)
}

export function totalLinha(line: CartLine) {
  return roundMoney(precoUnitarioLinha(line) * line.qty)
}

/**
 * Duas linhas com a mesma variação, os mesmos adicionais e a mesma
 * observação são a mesma configuração e devem ser somadas no carrinho.
 */
export function chaveLinha(
  line: Pick<CartLine, "productId" | "codProd" | "adicionais" | "observacao">,
) {
  const adicionais = line.adicionais
    .filter((adicional) => adicional.qty > 0)
    .slice()
    .sort((a, b) => a.id - b.id)
    .map((adicional) => `${adicional.id}:${adicional.qty}`)
    .join(",")

  const observacao = line.observacao?.trim().toLowerCase() ?? ""

  return `${line.productId}|${line.codProd}|${adicionais}|${observacao}`
}
