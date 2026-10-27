import type { LucideIcon } from "lucide-react"
import {
  CupSoda,
  Gift,
  IceCreamCone,
  LayoutGrid,
  Sandwich,
} from "lucide-react"

/* ─── Tipos ─────────────────────────────────────────── */

export type CategoriaId = "lanches" | "doces" | "bebidas" | "combos"

export interface MenuItem {
  id: string
  nome: string
  descricao: string
  preco: number
  precoOriginal?: number
  categoria: CategoriaId
  destaque?: boolean
  maisVendido?: boolean
  lancamento?: boolean
  imagem: string
  tag?: string
  tagColor?: string
}

export interface Categoria {
  id: "todos" | CategoriaId
  nome: string
  icon: LucideIcon
}

/* ─── Dados da loja ─────────────────────────────────── */

export const LOJA = {
  nome: "Don Mix",
  slogan: "Sabor & Qualidade",
  telefone: "(62) 98595-0004",
  telefoneLink: "+5562985950004",
  whatsapp: "5562985950004",
  endereco: "Rua Augusta, 1500 — Consolação, SP",
  horario: "Seg–Sáb 11h–23h · Dom 12h–22h",
  tempoEntrega: "30–45 min",
  avaliacao: "4,9",
  taxaEntrega: 6.9,
  entregaGratisAcima: 60,
} as const

/* ─── Categorias ────────────────────────────────────── */

export const CATEGORIAS: Categoria[] = [
  { id: "todos", nome: "Tudo", icon: LayoutGrid },
  { id: "lanches", nome: "Lanches", icon: Sandwich },
  { id: "doces", nome: "Sobremesas", icon: IceCreamCone },
  { id: "bebidas", nome: "Bebidas", icon: CupSoda },
  { id: "combos", nome: "Combos", icon: Gift },
]

export const categoriaPorId = (id: string) =>
  CATEGORIAS.find((c) => c.id === id) ?? CATEGORIAS[0]

/* ─── Cardápio ──────────────────────────────────────── */

export const CARDAPIO: MenuItem[] = [
  // ── Lanches ──
  {
    id: "lanche-1",
    nome: "X-Burguer",
    descricao:
      "Pão brioche, hambúrguer de 90g, muçarela, alface, tomate, cebola e molho especial churrasco. Acompanha maionese, mostarda e ketchup.",
    preco: 22.9,
    categoria: "lanches",
    destaque: true,
    maisVendido: true,
    imagem: "/images/x-burguer.webp",
    tag: "Mais Vendido",
    tagColor: "#C2D82A",
  },
  {
    id: "lanche-2",
    nome: "X-Burguer Duplo",
    descricao:
      "Pão brioche, 2 hambúrgueres de 90g, muçarela, alface, tomate, cebola e molho especial churrasco. Acompanha maionese, mostarda e ketchup.",
    preco: 29.9,
    categoria: "lanches",
    destaque: true,
    imagem: "/images/x-burguer-duplo.webp",
    tag: "Duplo",
    tagColor: "#692D8F",
  },
  {
    id: "lanche-3",
    nome: "Pão na Chapa",
    descricao:
      "1 fatia de pão sovado com manteiga de leite, levemente passado na chapa. Acompanha café expresso.",
    preco: 8.9,
    categoria: "lanches",
    imagem: "/images/pao-na-chapa.webp",
    tag: "Clássico",
    tagColor: "#400F46",
  },
  // ── Sobremesas ──
  {
    id: "doce-1",
    nome: "Sobremesa Açaí",
    descricao:
      "Base de sorvete de açaí natural da polpa. Acompanha banana, morango, leite em pó, M&M's, mini cookies, Nutella, granola, cereais e amendoim granulado. 300ml, 400ml ou 500ml.",
    preco: 18.9,
    categoria: "doces",
    destaque: true,
    maisVendido: true,
    imagem: "/images/acai.webp",
    tag: "Mais Vendido",
    tagColor: "#C2D82A",
  },
  {
    id: "doce-2",
    nome: "Sundae Baunilha",
    descricao:
      "Base de sorvete sabor baunilha industrializado. Acompanha calda saborizada industrializada, cereja industrializada e amendoim granulado. 170ml ou 400ml.",
    preco: 12.9,
    categoria: "doces",
    imagem: "/images/sundae-baunilha.webp",
    tag: "Sobremesa",
    tagColor: "#692D8F",
  },
  {
    id: "doce-3",
    nome: "Sundae Misto",
    descricao:
      "Base de sorvete sabor baunilha industrializado com base de sorvete de açaí natural da polpa. Acompanha calda, cereja e amendoim granulado. 170ml ou 400ml.",
    preco: 14.9,
    categoria: "doces",
    imagem: "/images/sundae-misto.webp",
  },
  {
    id: "doce-4",
    nome: "Milk-shake 500ml",
    descricao:
      "Leite integral e base de sorvete sabor baunilha. Acompanha leite em pó, M&M's, mini cookies, Nutella e cereais. Copo com tampa reta com furo para canudo.",
    preco: 19.9,
    categoria: "doces",
    lancamento: true,
    imagem: "/images/milkshake.webp",
    tag: "Novo",
    tagColor: "#692D8F",
  },
  {
    id: "doce-5",
    nome: "Creme de Morango 400ml",
    descricao:
      "Leite integral, raspas de gelo, creme de leite, leite condensado e polpa de morango. Acompanha calda saborizada. Copo com tampa reta.",
    preco: 16.9,
    categoria: "doces",
    imagem: "/images/creme-morango.webp",
  },
  {
    id: "doce-6",
    nome: "Creme de Uva 400ml",
    descricao:
      "Leite integral, raspas de gelo, creme de leite, leite condensado e polpa de uva. Acompanha calda saborizada. Copo com tampa reta.",
    preco: 16.9,
    categoria: "doces",
    imagem: "/images/creme-uva.webp",
  },
  {
    id: "doce-7",
    nome: "Creme de Maracujá 400ml",
    descricao:
      "Leite integral, raspas de gelo, creme de leite, leite condensado e polpa de maracujá. Acompanha calda saborizada. Copo com tampa reta.",
    preco: 16.9,
    categoria: "doces",
    imagem: "/images/creme-maracuja.webp",
  },
  {
    id: "doce-8",
    nome: "Copo da Felicidade 400ml",
    descricao:
      "Creme de avelã, chantilly, creme de leite, leite em pó, chocolate branco e morango. Copo com tampa reta.",
    preco: 21.9,
    categoria: "doces",
    destaque: true,
    imagem: "/images/copo-da-felicidade.webp",
    tag: "Especial",
    tagColor: "#C2D82A",
  },
  // ── Bebidas ──
  {
    id: "bebida-1",
    nome: "Iogurte Natural com Mel 170ml",
    descricao:
      "Iogurte natural sem adição de conservantes com mel silvestre. Acompanha M&M's, mini cookies, Nutella, granola, cereais e amendoim granulado.",
    preco: 12.9,
    categoria: "bebidas",
    imagem: "/images/iogurte-com-mel.webp",
    tag: "Natural",
    tagColor: "#45AD56",
  },
  {
    id: "bebida-2",
    nome: "Café Expresso com Mel 170ml",
    descricao:
      "Café expresso solúvel adoçado com mel silvestre. Acompanha chantilly. Copo com tampa reta.",
    preco: 9.9,
    categoria: "bebidas",
    imagem: "/images/cafe-expresso.webp",
    tag: "Quente",
    tagColor: "#400F46",
  },
  {
    id: "bebida-3",
    nome: "Cappuccino Tradicional 350ml",
    descricao: "Cappuccino com canela industrializado. Copo com tampa reta.",
    preco: 12.9,
    categoria: "bebidas",
    imagem: "/images/cappuccino.webp",
  },
  {
    id: "bebida-4",
    nome: "Chocolate Quente 350ml",
    descricao:
      "Bebida láctea com achocolatado industrializado. Copo com tampa reta com furo para canudo.",
    preco: 13.9,
    categoria: "bebidas",
    imagem: "/images/chocolate-quente.webp",
  },
  {
    id: "bebida-5",
    nome: "Refrigerante Lata 350ml",
    descricao:
      "Bebida gaseificada. Escolha o sabor: Coca-Cola, Coca-Cola Zero, Fanta Laranja ou Guaraná Antarctica.",
    preco: 6.9,
    categoria: "bebidas",
    imagem: "/images/refri-lata.webp",
  },
  {
    id: "bebida-6",
    nome: "Suco de Frutas 300ml",
    descricao:
      "Suco industrializado saborizado. Sabores: laranja, tangerina, abacaxi, uva e pêssego. Copo com tampa reta.",
    preco: 10.9,
    categoria: "bebidas",
    imagem: "/images/suco-fruta.webp",
    tag: "Natural",
    tagColor: "#45AD56",
  },
  {
    id: "bebida-7",
    nome: "Água Mineral Gaseificada",
    descricao:
      "Água mineral gaseificada. Marcas: Água Mineral Mineiro e Água Mineral Lilia (ou Lia).",
    preco: 5.9,
    categoria: "bebidas",
    imagem: "/images/agua-mineral.webp",
  },
]

/* ─── Helpers ───────────────────────────────────────── */

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
})

export const formatBRL = (value: number) => brl.format(value)
