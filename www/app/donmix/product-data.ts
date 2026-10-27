import { CARDAPIO, LOJA, type CategoriaId, type MenuItem } from "./menu-data"
import type {
  AdicionalERP,
  ProdutoDetalhe,
  ProdutoERP,
  VariacaoProduto,
} from "./product-types"

/* ─── Adicionais (mock da tabela PRODUTOADICIONAL) ───
 *
 * `gratis` = o adicional é elegível a consumir a cota `qtAdicionalGratis`.
 * Depois da cota, ele é cobrado pelo `preco`.
 */

const ID = {
  morango: 1,
  amendoim: 2,
  granola: 3,
  marshmallow: 4,
  nutella: 5,
  mm: 6,
  cookies: 7,
  banana: 8,
  cereais: 9,
  caldaChocolate: 10,
  caldaMorango: 11,
  pacoca: 12,
  canela: 13,
  bacon: 20,
  cheddar: 21,
  ovo: 22,
  cebola: 23,
  molho: 24,
  queijo: 25,
  manteiga: 30,
  requeijao: 31,
  mel: 32,
  leitePo: 90,
  chantilly: 530,
  leiteCondensado: 531,
} as const

export const ADICIONAIS: AdicionalERP[] = [
  {
    id: ID.morango,
    descricao: "Morango em pedaço",
    gratis: false,
    preco: 1,
    estoque: 25,
    ativo: true,
  },
  {
    id: ID.amendoim,
    descricao: "Amendoim granulado",
    gratis: true,
    preco: 1,
    estoque: 50,
    ativo: true,
  },
  {
    id: ID.granola,
    descricao: "Granola",
    gratis: true,
    preco: 1.5,
    estoque: 40,
    ativo: true,
  },
  {
    id: ID.marshmallow,
    descricao: "Marshmallow",
    gratis: true,
    preco: 1.5,
    estoque: 0,
    ativo: true,
  },
  {
    id: ID.nutella,
    descricao: "Nutella",
    gratis: false,
    preco: 3,
    estoque: 20,
    ativo: true,
  },
  {
    id: ID.mm,
    descricao: "M&M's",
    gratis: false,
    preco: 2.5,
    estoque: 30,
    ativo: true,
  },
  {
    id: ID.cookies,
    descricao: "Mini cookies",
    gratis: false,
    preco: 2,
    estoque: 30,
    ativo: true,
  },
  {
    id: ID.banana,
    descricao: "Banana em rodelas",
    gratis: true,
    preco: 1,
    estoque: 40,
    ativo: true,
  },
  {
    id: ID.cereais,
    descricao: "Cereais",
    gratis: true,
    preco: 1,
    estoque: 40,
    ativo: true,
  },
  {
    id: ID.caldaChocolate,
    descricao: "Calda de chocolate",
    gratis: true,
    preco: 1.5,
    estoque: 50,
    ativo: true,
  },
  {
    id: ID.caldaMorango,
    descricao: "Calda de morango",
    gratis: true,
    preco: 1.5,
    estoque: 50,
    ativo: true,
  },
  {
    id: ID.pacoca,
    descricao: "Paçoca",
    gratis: true,
    preco: 1,
    estoque: 20,
    ativo: false,
  },
  {
    id: ID.canela,
    descricao: "Canela em pó",
    gratis: true,
    preco: 0.5,
    estoque: 50,
    ativo: true,
  },
  {
    id: ID.bacon,
    descricao: "Bacon",
    gratis: false,
    preco: 4,
    estoque: 25,
    ativo: true,
  },
  {
    id: ID.cheddar,
    descricao: "Cheddar extra",
    gratis: false,
    preco: 3,
    estoque: 30,
    ativo: true,
  },
  {
    id: ID.ovo,
    descricao: "Ovo",
    gratis: false,
    preco: 2.5,
    estoque: 30,
    ativo: true,
  },
  {
    id: ID.cebola,
    descricao: "Cebola caramelizada",
    gratis: false,
    preco: 2,
    estoque: 20,
    ativo: true,
  },
  {
    id: ID.molho,
    descricao: "Molho especial extra",
    gratis: true,
    preco: 1.5,
    estoque: 50,
    ativo: true,
  },
  {
    id: ID.queijo,
    descricao: "Queijo extra",
    gratis: false,
    preco: 3,
    estoque: 25,
    ativo: true,
  },
  {
    id: ID.manteiga,
    descricao: "Manteiga extra",
    gratis: true,
    preco: 0.5,
    estoque: 50,
    ativo: true,
  },
  {
    id: ID.requeijao,
    descricao: "Requeijão",
    gratis: false,
    preco: 2,
    estoque: 20,
    ativo: true,
  },
  {
    id: ID.mel,
    descricao: "Mel",
    gratis: true,
    preco: 1,
    estoque: 40,
    ativo: true,
  },
  {
    id: ID.leitePo,
    descricao: "Leite em pó",
    gratis: true,
    preco: 1,
    estoque: 50,
    ativo: true,
  },
  {
    id: ID.chantilly,
    descricao: "Creme Chantilly",
    gratis: true,
    preco: 1,
    estoque: 50,
    ativo: true,
  },
  {
    id: ID.leiteCondensado,
    descricao: "Leite condensado",
    gratis: true,
    preco: 1.5,
    estoque: 40,
    ativo: true,
  },
]

const ADICIONAIS_POR_ID = new Map(ADICIONAIS.map((adicional) => [adicional.id, adicional]))

/* ─── Conjuntos de adicionais por família ───────────── */

const ACAI = [
  ID.morango,
  ID.leitePo,
  ID.chantilly,
  ID.amendoim,
  ID.granola,
  ID.marshmallow,
  ID.nutella,
  ID.mm,
  ID.cookies,
  ID.banana,
  ID.cereais,
  ID.caldaChocolate,
  ID.caldaMorango,
  ID.pacoca,
]

const SUNDAE = [
  ID.morango,
  ID.leitePo,
  ID.chantilly,
  ID.amendoim,
  ID.granola,
  ID.mm,
  ID.caldaChocolate,
  ID.caldaMorango,
  ID.marshmallow,
]

const CREME = [
  ID.morango,
  ID.chantilly,
  ID.leitePo,
  ID.granola,
  ID.amendoim,
  ID.caldaChocolate,
  ID.caldaMorango,
  ID.pacoca,
]

const MILKSHAKE = [
  ID.leitePo,
  ID.chantilly,
  ID.nutella,
  ID.mm,
  ID.cookies,
  ID.cereais,
  ID.morango,
  ID.marshmallow,
]

const IOGURTE = [
  ID.granola,
  ID.mel,
  ID.morango,
  ID.banana,
  ID.leitePo,
  ID.mm,
  ID.cookies,
  ID.nutella,
  ID.cereais,
  ID.amendoim,
]

const CAFE = [
  ID.chantilly,
  ID.canela,
  ID.leitePo,
  ID.leiteCondensado,
  ID.caldaChocolate,
]

const LANCHE = [
  ID.bacon,
  ID.cheddar,
  ID.ovo,
  ID.cebola,
  ID.molho,
  ID.queijo,
]

const PAO = [ID.manteiga, ID.queijo, ID.requeijao]

/* ─── Configuração das famílias ─────────────────────── */

interface VariacaoConfig {
  nome: string
  preco: number
  precoOriginal?: number
  estoque: number
  /** Sobrescreve a cota da família (ex.: copo maior tem mais grátis). */
  gratis?: number
  adicionais?: number[]
}

interface FamiliaConfig {
  adicionais: number[]
  gratis: number
  variacoes: VariacaoConfig[]
}

const FAMILIAS: Record<string, FamiliaConfig> = {
  "lanche-1": {
    adicionais: LANCHE,
    gratis: 1,
    variacoes: [{ nome: "Tradicional", preco: 22.9, estoque: 25 }],
  },
  "lanche-2": {
    adicionais: LANCHE,
    gratis: 1,
    variacoes: [{ nome: "Duplo", preco: 29.9, estoque: 18 }],
  },
  "lanche-3": {
    adicionais: PAO,
    gratis: 1,
    variacoes: [{ nome: "Tradicional", preco: 8.9, estoque: 30 }],
  },
  "doce-1": {
    adicionais: ACAI,
    gratis: 3,
    variacoes: [
      { nome: "300 ml", preco: 18.9, estoque: 40 },
      { nome: "400 ml", preco: 22.9, precoOriginal: 24.9, estoque: 32 },
      { nome: "500 ml", preco: 26.9, estoque: 3, gratis: 5 },
    ],
  },
  "doce-2": {
    adicionais: SUNDAE,
    gratis: 1,
    variacoes: [
      { nome: "170 ml", preco: 12.9, estoque: 30 },
      { nome: "400 ml", preco: 17.9, estoque: 0 },
    ],
  },
  "doce-3": {
    adicionais: SUNDAE,
    gratis: 1,
    variacoes: [
      { nome: "170 ml", preco: 14.9, estoque: 26 },
      { nome: "400 ml", preco: 19.9, estoque: 15 },
    ],
  },
  "doce-4": {
    adicionais: MILKSHAKE,
    gratis: 2,
    variacoes: [
      { nome: "500 ml", preco: 19.9, estoque: 25 },
      { nome: "700 ml", preco: 24.9, estoque: 10 },
    ],
  },
  "doce-5": {
    adicionais: CREME,
    gratis: 2,
    variacoes: [
      { nome: "400 ml", preco: 16.9, estoque: 20 },
      { nome: "500 ml", preco: 19.9, estoque: 12 },
    ],
  },
  "doce-6": {
    adicionais: CREME,
    gratis: 2,
    variacoes: [
      { nome: "400 ml", preco: 16.9, estoque: 20 },
      { nome: "500 ml", preco: 19.9, estoque: 12 },
    ],
  },
  "doce-7": {
    adicionais: CREME,
    gratis: 2,
    variacoes: [
      { nome: "400 ml", preco: 16.9, estoque: 20 },
      { nome: "500 ml", preco: 19.9, estoque: 12 },
    ],
  },
  "doce-8": {
    adicionais: CREME,
    gratis: 2,
    variacoes: [
      { nome: "400 ml", preco: 21.9, estoque: 15 },
      { nome: "500 ml", preco: 25.9, estoque: 8 },
    ],
  },
  "bebida-1": {
    adicionais: IOGURTE,
    gratis: 2,
    variacoes: [
      { nome: "170 ml", preco: 12.9, estoque: 20 },
      { nome: "300 ml", preco: 16.9, estoque: 10 },
    ],
  },
  "bebida-2": {
    adicionais: CAFE,
    gratis: 1,
    variacoes: [
      { nome: "170 ml", preco: 9.9, estoque: 30 },
      { nome: "300 ml", preco: 12.9, estoque: 15 },
    ],
  },
  "bebida-3": {
    adicionais: CAFE,
    gratis: 1,
    variacoes: [
      { nome: "350 ml", preco: 12.9, estoque: 25 },
      { nome: "500 ml", preco: 16.9, estoque: 12 },
    ],
  },
  "bebida-4": {
    adicionais: CAFE,
    gratis: 1,
    variacoes: [
      { nome: "350 ml", preco: 13.9, estoque: 22 },
      { nome: "500 ml", preco: 17.9, estoque: 10 },
    ],
  },
  "bebida-5": {
    adicionais: [],
    gratis: 0,
    variacoes: [
      { nome: "Coca-Cola", preco: 6.9, estoque: 40 },
      { nome: "Coca-Cola Zero", preco: 6.9, estoque: 35 },
      { nome: "Fanta Laranja", preco: 6.9, estoque: 30 },
      { nome: "Guaraná Antarctica", preco: 6.9, estoque: 48 },
    ],
  },
  "bebida-6": {
    adicionais: [],
    gratis: 0,
    variacoes: [
      { nome: "Laranja 300 ml", preco: 10.9, estoque: 20 },
      { nome: "Tangerina 300 ml", preco: 10.9, estoque: 18 },
      { nome: "Abacaxi 300 ml", preco: 10.9, estoque: 15 },
      { nome: "Uva 300 ml", preco: 10.9, estoque: 16 },
      { nome: "Pêssego 300 ml", preco: 10.9, estoque: 14 },
    ],
  },
  "bebida-7": {
    adicionais: [],
    gratis: 0,
    variacoes: [
      { nome: "500 ml", preco: 5.9, estoque: 50 },
      { nome: "1,5 L", preco: 8.9, estoque: 30 },
    ],
  },
}

/* ─── Descrições técnicas / alergênicos ─────────────── */

const TECNICA_PADRAO =
  "Produzido em cozinha que manipula leite e derivados, trigo, soja, ovos, amendoim e castanhas. Não é possível garantir a ausência total de traços de alérgenos."

const TECNICAS: Record<string, string> = {
  "doce-1":
    "INGREDIENTES: polpa de açaí, água, açúcar, leite em pó, chantilly, granola, cereais, amendoim, morango, banana, M&M's, mini cookies e Nutella.\n\nALÉRGICOS: CONTÉM LEITE E DERIVADOS, SOJA, TRIGO, AMENDOIM E CASTANHAS. PODE CONTER OVOS, AVEIA E CEVADA. PRODUTO PREPARADO NO LOCAL — CONSUMIR IMEDIATAMENTE.",
  "doce-4":
    "INGREDIENTES: leite integral, base de sorvete sabor baunilha, leite em pó, M&M's, mini cookies, Nutella e cereais.\n\nALÉRGICOS: CONTÉM LEITE E DERIVADOS, SOJA, TRIGO, AMENDOIM E CASTANHAS. PODE CONTER OVOS.",
  "lanche-1":
    "INGREDIENTES: pão brioche, hambúrguer bovino, queijo muçarela, alface, tomate, cebola e molho especial.\n\nALÉRGICOS: CONTÉM GLÚTEN, LEITE E SOJA. PODE CONTER OVOS.",
  "lanche-2":
    "INGREDIENTES: pão brioche, dois hambúrgueres bovinos, queijo muçarela, alface, tomate, cebola e molho especial.\n\nALÉRGICOS: CONTÉM GLÚTEN, LEITE E SOJA. PODE CONTER OVOS.",
  "lanche-3":
    "INGREDIENTES: pão francês e manteiga de leite.\n\nALÉRGICOS: CONTÉM GLÚTEN E LEITE.",
  "bebida-5":
    "INGREDIENTES: água gaseificada, açúcar, extrato de noz de cola, cafeína, acidulante ácido fosfórico, corante caramelo IV e aromatizante.\n\nCONTÉM CAFEÍNA. NÃO CONTÉM GLÚTEN.",
  "bebida-6":
    "INGREDIENTES: água, açúcar, polpa de fruta, acidulante, aromatizante e conservador.\n\nNÃO CONTÉM GLÚTEN.",
  "bebida-7": "Água mineral natural gaseificada. NÃO CONTÉM GLÚTEN.",
}

/* ─── Montagem do mock no formato do ERP ────────────── */

const CATEGORIA_CODIGO: Record<CategoriaId, number> = {
  lanches: 1,
  doces: 2,
  bebidas: 3,
  combos: 4,
}

const CATEGORIA_NOME: Record<CategoriaId, string> = {
  lanches: "LANCHE",
  doces: "SOBREMESAS",
  bebidas: "BEBIDAS",
  combos: "COMBOS",
}

const FALLBACK: FamiliaConfig = {
  adicionais: [],
  gratis: 0,
  variacoes: [{ nome: "Padrão", preco: 0, estoque: 20 }],
}

function resolverAdicionais(ids: number[]) {
  return ids
    .map((id) => ADICIONAIS_POR_ID.get(id))
    .filter((adicional): adicional is AdicionalERP => adicional !== undefined)
}

/** Mock completo — o backend deve devolver este mesmo shape. */
export const PRODUTOS_ERP: ProdutoERP[] = []
const DETALHES = new Map<string, ProdutoDetalhe>()
const DETALHES_POR_COD = new Map<number, ProdutoDetalhe>()

CARDAPIO.forEach((item, itemIndex) => {
  const config = FAMILIAS[item.id] ?? {
    ...FALLBACK,
    variacoes: [{ ...FALLBACK.variacoes[0], preco: item.preco }],
  }
  const baseCod = 50000 + itemIndex * 10
  const categoriaCodigo = CATEGORIA_CODIGO[item.categoria]
  const categoriaNome = CATEGORIA_NOME[item.categoria]
  const descricaoTecnica = TECNICAS[item.id] ?? TECNICA_PADRAO

  const variacoes: VariacaoProduto[] = config.variacoes.map((variacao, index) => {
    const codProd = baseCod + index
    const adicionalIds = variacao.adicionais ?? config.adicionais
    const qtAdicionalGratis = variacao.gratis ?? config.gratis
    const descricaoEcomerce =
      index === 0 ? item.nome : `${item.nome} — ${variacao.nome}`

    PRODUTOS_ERP.push({
      codProd,
      idIntegradora: 25,
      indiceEstoque: 100,
      qtUnit: 1,
      qtUnitCaixa: 1,
      qtPalete: 0,
      codLocalOrig: 0,
      marcaId: 0,
      recalculaPrecoUnidade: true,
      recalculaEstoqueUnidade: true,
      descricaoErp: `${item.nome} ${variacao.nome} DON MIX`.toUpperCase(),
      descricaoEcomerce,
      ean: `78900000${String(codProd).padStart(5, "0")}`,
      eanCaixa: `78900000${String(codProd).padStart(5, "0")}`,
      codVol: "UN",
      productId: String(codProd),
      codFilial: "1",
      skuId: `78900000${String(codProd).padStart(5, "0")}`,
      descricaoTecnica,
      preco: variacao.preco,
      promotion: 0,
      qtEstoque: variacao.estoque,
      imagem: item.imagem,
      categoriaPrinciapal: categoriaCodigo,
      dtUltAlter: "2026-10-27T14:08:02.000+00:00",
      imagens: [item.imagem],
      categorias: [
        {
          codigo: categoriaCodigo,
          codPai: 0,
          categoria: categoriaNome,
          detalhamento: `DON MIX · ${categoriaNome}`,
          imagem: item.imagem,
          sequencia: itemIndex + 1,
        },
      ],
      varianteId: baseCod,
      qtAdicionalGratis,
      adicionais: adicionalIds,
    })

    return {
      codProd,
      nome: variacao.nome,
      descricaoEcomerce,
      preco: variacao.preco,
      precoOriginal: variacao.precoOriginal,
      estoque: variacao.estoque,
      imagem: item.imagem,
      qtAdicionalGratis,
      adicionais: resolverAdicionais(adicionalIds),
    }
  })

  const detalhe: ProdutoDetalhe = {
    id: item.id,
    codProd: baseCod,
    nome: item.nome,
    descricao: item.descricao,
    descricaoTecnica,
    categoria: item.categoria,
    imagem: item.imagem,
    imagens: [item.imagem],
    maisVendido: item.maisVendido,
    lancamento: item.lancamento,
    tag: item.tag,
    tagColor: item.tagColor,
    avaliacao: LOJA.avaliacao,
    tempoEntrega: LOJA.tempoEntrega,
    variacoes,
  }

  DETALHES.set(item.id, detalhe)
  DETALHES_POR_COD.set(baseCod, detalhe)
})

/* ─── Consultas ─────────────────────────────────────── */

export function getTodosProdutoIds() {
  return CARDAPIO.map((item) => item.id)
}

/**
 * Aceita tanto o slug usado nas rotas (`doce-1`) quanto o `codProd`
 * numérico do ERP (`50004`). Isso facilita a troca para o backend.
 */
export function getProdutoDetalhe(idOuCodProd: string): ProdutoDetalhe | null {
  const chave = idOuCodProd.trim()
  if (!chave) return null

  const porSlug = DETALHES.get(chave)
  if (porSlug) return porSlug

  const codProd = Number(chave)
  if (!Number.isFinite(codProd)) return null

  const linha = PRODUTOS_ERP.find((produto) => produto.codProd === codProd)
  if (!linha) return null

  return DETALHES_POR_COD.get(linha.varianteId) ?? null
}

export function getProdutosRelacionados(id: string, limite = 3): MenuItem[] {
  const atual = CARDAPIO.find((item) => item.id === id)
  if (!atual) return []

  const mesmaCategoria = CARDAPIO.filter(
    (item) => item.id !== id && item.categoria === atual.categoria,
  )
  const outros = CARDAPIO.filter(
    (item) => item.id !== id && item.categoria !== atual.categoria,
  )

  return [...mesmaCategoria, ...outros].slice(0, limite)
}
