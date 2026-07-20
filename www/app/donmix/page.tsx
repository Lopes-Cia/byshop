"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Clock,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  ChevronRight,
  Search,
  Sparkles,
  ChefHat,
  Flame,
  Coffee,
  Utensils,
  Heart,
  Plus,
  Check,
  Truck,
  Award,
  Menu,
  X,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/* ─── Tipos ─────────────────────────────────────────── */

interface MenuItem {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  precoOriginal?: number;
  categoria: string;
  destaque?: boolean;
  maisVendido?: boolean;
  lancamento?: boolean;
  imagem: string;
  tag?: string;
  tagColor?: string;
}

interface Categoria {
  id: string;
  nome: string;
  icone: React.ReactNode;
}

/* ─── Dados do Cardápio ────────────────────────────── */

const CATEGORIAS: Categoria[] = [
  { id: "todos", nome: "Todos", icone: <Utensils className="size-4" /> },
  { id: "lanches", nome: "Lanches", icone: <ChefHat className="size-4" /> },
  { id: "salgados", nome: "Salgados", icone: <Flame className="size-4" /> },
  { id: "doces", nome: "Doces", icone: <Sparkles className="size-4" /> },
  { id: "bebidas", nome: "Bebidas", icone: <Coffee className="size-4" /> },
  { id: "combos", nome: "Combos", icone: <Award className="size-4" /> },
];

const CARDAPIO: MenuItem[] = [
  // ── Lanches ──
  {
    id: "lanche-1",
    nome: "X-Tudo Especial",
    descricao:
      "Hambúrguer artesanal 180g, queijo cheddar, bacon crocante, alface, tomate, maionese verde e molho especial da casa. Acompanha fritas.",
    preco: 34.9,
    categoria: "lanches",
    destaque: true,
    maisVendido: true,
    imagem: "/images/hamburger.png",
    tag: "Mais Vendido",
    tagColor: "#C2D82A",
  },
  {
    id: "lanche-2",
    nome: "Chicken Crispy",
    descricao:
      "Filé de frango empanado crocante, queijo prato, alface, tomate e maionese de ervas no pão brioche.",
    preco: 29.9,
    precoOriginal: 34.9,
    categoria: "lanches",
    imagem: "/images/chicken_crispy.png",
    tag: "Oferta",
    tagColor: "#45AD56",
  },
  {
    id: "lanche-3",
    nome: "Veggie Mix",
    descricao:
      "Hambúrguer de grão-de-bico com quinoa, pasta de abacate, rúcula, tomate seco e molho de iogurte.",
    preco: 27.9,
    categoria: "lanches",
    imagem: "/images/veggie_mix.png",
    tag: "Veggie",
    tagColor: "#45AD56",
  },
  {
    id: "lanche-4",
    nome: "Hot Dog Supremo",
    descricao:
      "Salsicha defumada, purê cremoso, vinagrete, batata palha, molho especial e queijo ralado.",
    preco: 22.9,
    categoria: "lanches",
    lancamento: true,
    imagem: "/images/hot_dog_supremo.png",
    tag: "Lançamento",
    tagColor: "#692D8F",
  },
  // ── Salgados ──
  {
    id: "salgado-1",
    nome: "Coxinha Gourmet",
    descricao:
      "Massa fina e crocante recheada com frango catupiri. Porção com 6 unidades.",
    preco: 18.9,
    categoria: "salgados",
    destaque: true,
    maisVendido: true,
    imagem: "/images/coxinha.png",
    tag: "Mais Vendido",
    tagColor: "#C2D82A",
  },
  {
    id: "salgado-2",
    nome: "Pastel de Feira",
    descricao:
      "Pastel frito na hora com carne moída temperada, queijo ou frango. Escolha o recheio.",
    preco: 12.9,
    categoria: "salgados",
    imagem: "/images/pastel.png",
    tag: "Clássico",
    tagColor: "#400F46",
  },
  {
    id: "salgado-3",
    nome: "Empada Frango c/ Catupiry",
    descricao:
      "Empada de dar água na boca: massa amanteigada, recheio cremoso de frango com catupiry.",
    preco: 9.9,
    categoria: "salgados",
    imagem: "/images/donmix_logo.png",
  },
  {
    id: "salgado-4",
    nome: "Esfiha Aberta",
    descricao:
      "Esfiha aberta com carne, queijo ou calabresa. Massa leve e assada na hora.",
    preco: 7.9,
    categoria: "salgados",
    imagem: "/images/donmix_logo.png",
    tag: "Mais Barato",
    tagColor: "#45AD56",
  },
  {
    id: "salgado-5",
    nome: "Porção de Batata Frita",
    descricao:
      "Batata frita crocante sequinha com sal temperado. Acompanha ketchup e mostarda.",
    preco: 16.9,
    categoria: "salgados",
    imagem: "/images/donmix_logo.png",
  },
  // ── Doces ──
  {
    id: "doce-1",
    nome: "Petit Gâteau",
    descricao:
      "Bolinho de chocolate com casca crocante e recheio cremoso. Acompanha sorvete de creme.",
    preco: 24.9,
    categoria: "doces",
    destaque: true,
    imagem: "/images/donmix_logo.png",
    tag: "Sobremesa",
    tagColor: "#692D8F",
  },
  {
    id: "doce-2",
    nome: "Mousse de Maracujá",
    descricao:
      "Mousse leve e aerado de maracujá com calda da fruta. Coberto com chantilly.",
    preco: 14.9,
    categoria: "doces",
    imagem: "/images/donmix_logo.png",
  },
  {
    id: "doce-3",
    nome: "Banana Split",
    descricao:
      "Banana partida ao meio com 3 bolas de sorvete, calda de chocolate, chantilly e castanhas.",
    preco: 19.9,
    categoria: "doces",
    lancamento: true,
    imagem: "/images/donmix_logo.png",
    tag: "Novo",
    tagColor: "#C2D82A",
  },
  {
    id: "doce-4",
    nome: "Milkshake de Ovomaltine",
    descricao:
      "Milkshake cremoso de ovomaltine com calda de chocolate e chantilly.",
    preco: 18.9,
    categoria: "doces",
    imagem: "/images/donmix_logo.png",
  },
  // ── Bebidas ──
  {
    id: "bebida-1",
    nome: "Suco Natural",
    descricao:
      "Suco fresco de laranja, limão, maracujá, manga ou abacaxi. 500ml.",
    preco: 12.9,
    categoria: "bebidas",
    destaque: true,
    imagem: "/images/donmix_logo.png",
    tag: "Natural",
    tagColor: "#45AD56",
  },
  {
    id: "bebida-2",
    nome: "Refrigerente Lata",
    descricao: "Coca-Cola, Guaraná Antarctica, Fanta Laranja ou Sprite. 350ml.",
    preco: 6.9,
    categoria: "bebidas",
    imagem: "/images/donmix_logo.png",
  },
  {
    id: "bebida-3",
    nome: "Água Mineral c/ Gás",
    descricao: "Água mineral com gás. 500ml.",
    preco: 4.9,
    categoria: "bebidas",
    imagem: "/images/donmix_logo.png",
  },
  {
    id: "bebida-4",
    nome: "Café Especial",
    descricao:
      "Café coado na hora com grãos selecionados. Servido quente ou gelado.",
    preco: 8.9,
    categoria: "bebidas",
    imagem: "/images/donmix_logo.png",
    tag: "Gourmet",
    tagColor: "#400F46",
  },
  {
    id: "bebida-5",
    nome: "Mate Leão Gelado",
    descricao: "Mate Leão gelado natural. 300ml.",
    preco: 5.9,
    categoria: "bebidas",
    imagem: "/images/donmix_logo.png",
  },
  // ── Combos ──
  {
    id: "combo-1",
    nome: "Combo Casal",
    descricao:
      "2 X-Tudo Especial, 1 porção de batata frita grande, 2 refrigerantes e 1 sobremesa para dividir.",
    preco: 79.9,
    precoOriginal: 98.5,
    categoria: "combos",
    destaque: true,
    imagem: "/images/donmix_logo.png",
    tag: "Economia de R$18,60",
    tagColor: "#C2D82A",
  },
  {
    id: "combo-2",
    nome: "Combo Kids",
    descricao:
      "Mini hambúrguer, batata frita pequena, suco natural e brinde surpresa.",
    preco: 29.9,
    categoria: "combos",
    lancamento: true,
    imagem: "/images/donmix_logo.png",
    tag: "Novo",
    tagColor: "#692D8F",
  },
  {
    id: "combo-3",
    nome: "Combo Executivo",
    descricao:
      "1 lanche + 1 bebida + 1 sobremesa. Escolha entre as opções do cardápio.",
    preco: 44.9,
    precoOriginal: 52.0,
    categoria: "combos",
    imagem: "/images/donmix_logo.png",
    tag: "Mais Pedido",
    tagColor: "#C2D82A",
  },
];

/* ─── Componente do Item do Cardápio ───────────────── */

function MenuItemCard({ item }: { item: MenuItem }) {
  const [adicionado, setAdicionado] = useState(false);

  return (
    <Card
      className={cn(
        "group border-0 overflow-hidden transition-all duration-300 hover:-translate-y-1",
        item.destaque
          ? "shadow-lg ring-2 ring-[#C2D82A]/30"
          : "shadow-sm hover:shadow-md",
      )}
      style={{ backgroundColor: "#FEFEFE" }}
    >
      {/* Imagem / Placeholder */}
      <div
        className="relative flex h-44 items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #400F46 0%, #692D8F 50%, #400F46 100%)",
        }}
      >
        {/* Padrão decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, #C2D82A 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        {/* Emoji grande */}
        <span className="relative z-10 text-6xl drop-shadow-lg select-none">
          <Image src={item.imagem} alt={item.nome} width={96} height={96} />
        </span>

        {/* Tags */}
        <div className="absolute left-3 top-3 z-20 flex flex-col gap-1.5">
          {item.maisVendido && (
            <Badge
              className="border-0 text-[10px] font-bold uppercase tracking-wider"
              style={{
                backgroundColor: "#C2D82A",
                color: "#400F46",
              }}
            >
              <Flame className="mr-0.5 size-3" />
              Mais Vendido
            </Badge>
          )}
          {item.lancamento && (
            <Badge
              className="border-0 text-[10px] font-bold uppercase tracking-wider"
              style={{
                backgroundColor: "#692D8F",
                color: "#FEFEFE",
              }}
            >
              <Sparkles className="mr-0.5 size-3" />
              Lançamento
            </Badge>
          )}
        </div>

        {/* Preço original (desconto) */}
        {item.precoOriginal && (
          <div className="absolute right-3 top-3 z-20">
            <Badge
              className="border-0 text-[10px] font-bold"
              style={{ backgroundColor: "#45AD56", color: "#FEFEFE" }}
            >
              {Math.round(
                ((item.precoOriginal - item.preco) / item.precoOriginal) * 100,
              )}
              % OFF
            </Badge>
          </div>
        )}

        {/* Botão favoritar (hover) */}
        <button
          className="absolute right-3 bottom-3 z-20 flex size-8 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100"
          style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          aria-label="Favoritar"
        >
          <Heart className="size-4 text-white" />
        </button>
      </div>

      <CardContent className="space-y-2 px-4 pt-4 pb-0">
        {/* Tag inline */}
        {item.tag && (
          <span
            className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: item.tagColor + "20",
              color: item.tagColor,
            }}
          >
            {item.tag}
          </span>
        )}

        {/* Nome e descrição */}
        <h3
          className="text-base font-bold leading-tight"
          style={{ color: "#400F46" }}
        >
          {item.nome}
        </h3>
        <p className="text-xs leading-relaxed text-gray-500 line-clamp-2">
          {item.descricao}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between px-4 pb-4 pt-3">
        <div className="flex flex-col">
          {item.precoOriginal && (
            <span className="text-xs text-gray-400 line-through">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(item.precoOriginal)}
            </span>
          )}
          <span className="text-xl font-bold" style={{ color: "#400F46" }}>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(item.preco)}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

/* ─── Seção de Destaques ───────────────────────────── */

function DestaquesSection({ itens }: { itens: MenuItem[] }) {
  const destaques = itens.filter((i) => i.destaque);

  return (
    <section className="py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: "#400F46" }}>
            🔥 Destaques do Cardápio
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Os favoritos dos nossos clientes
          </p>
        </div>
        <Button
          variant="ghost"
          className="hidden gap-1 text-sm font-medium sm:inline-flex"
          style={{ color: "#692D8F" }}
        >
          Ver todos
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {destaques.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

/* ─── Banner Promocional ───────────────────────────── */

function PromoBanner() {
  return (
    <section
      className="relative my-8 overflow-hidden rounded-2xl"
      style={{
        background:
          "linear-gradient(135deg, #400F46 0%, #692D8F 50%, #400F46 100%)",
      }}
    >
      {/* Padrão geométrico */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div
          className="size-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, #FEFEFE 2px, transparent 2px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 py-10 text-center md:flex-row md:justify-between md:text-left lg:px-12">
        <div className="space-y-2">
          <Badge
            className="inline-flex border-0 text-xs font-bold uppercase tracking-wider"
            style={{ backgroundColor: "#C2D82A", color: "#400F46" }}
          >
            <Sparkles className="mr-1 size-3" />
            Oferta Imperdível
          </Badge>
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Combo do Dia com <br className="sm:hidden" />
            <span style={{ color: "#C2D82A" }}>10% OFF</span>
          </h2>
          <p className="max-w-md text-sm text-purple-200">
            Peça o Combo Executivo e ganhe 10% de desconto + brinde especial.
            Válido para pedidos feitos até as 18h.
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-center gap-2">
          <span className="text-4xl">⏰</span>
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ color: "#C2D82A" }}
          >
            Oferta por tempo limitado
          </span>
          <Button
            className="h-11 gap-2 rounded-full border-0 px-8 text-sm font-bold uppercase tracking-wider"
            style={{ backgroundColor: "#C2D82A", color: "#400F46" }}
          >
            <ShoppingCart className="size-4" />
            Pedir Agora
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Banner de Informação (Horário/Local) ─────────── */

function InfoBanner() {
  return (
    <section className="grid gap-4 py-8 sm:grid-cols-3">
      {[
        {
          icone: <Clock className="size-6" />,
          titulo: "Seg–Sáb 11h–23h",
          subtitulo: "Dom 12h–22h",
        },
        {
          icone: <MapPin className="size-6" />,
          titulo: "Rua Augusta, 1500",
          subtitulo: "Consolação, SP",
        },
        {
          icone: <Phone className="size-6" />,
          titulo: "(11) 99999-8888",
          subtitulo: "WhatsApp",
        },
      ].map((info) => (
        <div
          key={info.titulo}
          className="flex items-center gap-4 rounded-xl p-4 transition-colors"
          style={{ backgroundColor: "#F9F0FA" }}
        >
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: "#692D8F", color: "#FEFEFE" }}
          >
            {info.icone}
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: "#400F46" }}>
              {info.titulo}
            </p>
            <p className="text-xs text-gray-500">{info.subtitulo}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ─── Footer ───────────────────────────────────────── */

function DonMixFooter() {
  return (
    <footer className="mt-12" style={{ backgroundColor: "#400F46" }}>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="space-y-3">
            <div className="flex flex-row items-center gap-4">
              <h3 className="text-lg font-bold" style={{ color: "#C2D82A" }}>
                Don Mix
              </h3>
              <Image
                src="/images/donmix_logo.png"
                alt="Don Mix"
                width={48}
                height={48}
              />
            </div>

            <p className="text-sm leading-relaxed text-purple-200">
              Sabor que conquista, qualidade que inspira.
              <br />
              Desde 2015 servindo o melhor da culinária brasileira.
            </p>
          </div>

          {/* Navegação */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Cardápio
            </h4>
            <ul className="space-y-2 text-sm text-purple-200">
              {["Lanches", "Salgados", "Doces", "Bebidas", "Combos"].map(
                (item) => (
                  <li key={item}>
                    <a href="#" className="transition-colors hover:text-white">
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Institucional */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Institucional
            </h4>
            <ul className="space-y-2 text-sm text-purple-200">
              {[
                "Sobre Nós",
                "Trabalhe Conosco",
                "Política de Privacidade",
                "Termos de Uso",
              ].map((item) => (
                <li key={item}>
                  <a href="#" className="transition-colors hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociais */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Redes Sociais
            </h4>
            <div className="flex gap-2">
              {[
                { icone: <Instagram className="size-5" />, nome: "Instagram" },
                { icone: <Facebook className="size-5" />, nome: "Facebook" },
                {
                  icone: <ShoppingBag className="size-5" />,
                  nome: "WhatsApp",
                },
              ].map(({ icone, nome }) => (
                <a
                  key={nome}
                  href="#"
                  className="flex size-10 items-center justify-center rounded-full transition-all hover:scale-110"
                  style={{ backgroundColor: "#692D8F", color: "#FEFEFE" }}
                  aria-label={nome}
                >
                  {icone}
                </a>
              ))}
            </div>
            <p className="text-xs text-purple-300">
              Siga e fique por dentro das novidades!
            </p>
          </div>
        </div>

        <Separator className="my-8" style={{ backgroundColor: "#692D8F" }} />

        <p className="text-center text-xs text-purple-300">
          © {new Date().getFullYear()} Don Mix — Todos os direitos reservados. —
          © Lopes & Cia
        </p>
      </div>
    </footer>
  );
}

/* ─── Página Principal ─────────────────────────────── */

export default function DonmixPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const [menuAberto, setMenuAberto] = useState(false);

  const itensFiltrados = CARDAPIO.filter((item) => {
    const matchCategoria =
      categoriaAtiva === "todos" || item.categoria === categoriaAtiva;
    const matchSearch =
      searchTerm === "" ||
      item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategoria && matchSearch;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FEFEFE" }}>
      {/* ── Navbar ── */}
      <header
        className="sticky top-0 z-50 shadow-lg"
        style={{ backgroundColor: "#400F46" }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/images/donmix_logo.png"
              alt="Don Mix"
              width={325}
              height={325}
              className="h-10 w-10"
            />
            <div>
              <h1
                className="text-lg font-bold leading-tight tracking-tight"
                style={{ color: "#C2D82A" }}
              >
                Don Mix
              </h1>
              <p className="text-[10px] font-medium uppercase tracking-widest text-purple-300">
                Sabor & Qualidade
              </p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {CATEGORIAS.filter((c) => c.id !== "todos").map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoriaAtiva(cat.id)}
                className={cn(
                  "flex items-center gap-1.5 text-sm font-medium transition-colors",
                  categoriaAtiva === cat.id
                    ? "text-white"
                    : "text-purple-300 hover:text-white",
                )}
              >
                {cat.icone}
                {cat.nome}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile menu */}
        {menuAberto && (
          <div
            className="border-t md:hidden"
            style={{ borderColor: "#692D8F", backgroundColor: "#400F46" }}
          >
            <div className="space-y-1 px-4 pb-4 pt-2">
              {CATEGORIAS.filter((c) => c.id !== "todos").map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setCategoriaAtiva(cat.id);
                    setMenuAberto(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    categoriaAtiva === cat.id
                      ? "text-white"
                      : "text-purple-300 hover:bg-[#692D8F] hover:text-white",
                  )}
                  style={
                    categoriaAtiva === cat.id
                      ? { backgroundColor: "#692D8F" }
                      : {}
                  }
                >
                  {cat.icone}
                  {cat.nome}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4">
        {/* ── Hero ── */}
        <section
          className="relative -mx-4 mt-0 overflow-hidden px-4 py-12 sm:rounded-b-2xl sm:mx-0"
          style={{
            background:
              "linear-gradient(160deg, #400F46 0%, #692D8F 60%, #400F46 100%)",
          }}
        >
          {/* Padrão decorativo */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
            <div
              className="size-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 50% 50%, #C2D82A 2px, transparent 2px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 text-center lg:flex-row lg:text-left">
            <div className="flex-1 space-y-4">
              <Badge
                className="inline-flex border-0 text-xs font-bold uppercase tracking-wider"
                style={{ backgroundColor: "#C2D82A", color: "#400F46" }}
              >
                <Award className="mr-1 size-3" />
                Novo Cardápio 2026
              </Badge>

              <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                O sabor que <br />
                <span style={{ color: "#C2D82A" }}>conquista</span>
              </h2>

              <p className="mx-auto max-w-md text-sm leading-relaxed text-purple-200 lg:mx-0">
                Explore nosso cardápio repleto de delícias preparadas com
                ingredientes selecionados e muito carinho. Do salgado ao doce,
                temos o que você procura!
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  className="h-11 gap-2 rounded-full border-0 px-6 text-sm font-bold uppercase tracking-wider shadow-lg"
                  style={{ backgroundColor: "#C2D82A", color: "#400F46" }}
                >
                  <ShoppingCart className="size-4" />
                  Fazer Pedido
                </Button>
                <Button
                  variant="outline"
                  className="h-11 gap-2 rounded-full border-2 px-6 text-sm font-bold uppercase tracking-wider shadow-lg"
                  style={{
                    borderColor: "#FEFEFE",
                    color: "#400F46",
                  }}
                >
                  <MapPin className="size-4" />
                  Onde Estamos
                </Button>
              </div>
            </div>

            {/* Indicadores visuais */}
            <div className="flex shrink-0 gap-4 lg:flex-col">
              {[
                { valor: "12+", label: "Anos de Tradição" },
                { valor: "80+", label: "Itens no Cardápio" },
                { valor: "4.9", label: "Avaliação ⭐" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center rounded-xl px-5 py-3"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <span
                    className="text-xl font-bold"
                    style={{ color: "#C2D82A" }}
                  >
                    {stat.valor}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-purple-200">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bem-vindo + Busca ── */}
        <section className="flex flex-col gap-4 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "#400F46" }}>
              Nosso Cardápio
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Escolha entre deliciosas opções preparadas na hora
            </p>
          </div>

          {/* Busca */}
          <div className="relative w-full sm:w-72">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2"
              style={{ color: "#692D8F" }}
            />
            <input
              type="text"
              placeholder="Buscar no cardápio…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border-2 py-2.5 pl-10 pr-4 text-sm outline-none transition-all"
              style={{
                borderColor: "#E5D0E8",
                color: "#400F46",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#692D8F")}
              onBlur={(e) => (e.target.style.borderColor = "#E5D0E8")}
            />
          </div>
        </section>

        {/* ── Abas de Categoria ── */}
        <Tabs
          defaultValue="todos"
          value={categoriaAtiva}
          onValueChange={setCategoriaAtiva}
          className="mt-6"
        >
          <TabsList
            className="h-auto flex-wrap gap-1.5 rounded-2xl border-0 p-2"
            style={{ backgroundColor: "#F9F0FA" }}
          >
            {CATEGORIAS.map((cat) => (
              <TabsTrigger
                key={cat.id}
                value={cat.id}
                className="gap-1.5 rounded-xl border-0 px-4 py-2 text-xs font-bold uppercase tracking-wider data-[state=active]:shadow-md"
                style={{
                  color: "#400F46",
                }}
              >
                {cat.icone}
                {cat.nome}
              </TabsTrigger>
            ))}
          </TabsList>

          {CATEGORIAS.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-6">
              {itensFiltrados.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {itensFiltrados.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center py-16 text-center">
                  <span className="text-5xl">😕</span>
                  <h3
                    className="mt-4 text-lg font-bold"
                    style={{ color: "#400F46" }}
                  >
                    Nenhum item encontrado
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Tente buscar por outro termo ou categoria.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("");
                      setCategoriaAtiva("todos");
                    }}
                  >
                    Limpar filtros
                  </Button>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* ── Banner Promocional ── */}
        <PromoBanner />

        {/* ── Destaques ── */}
        <DestaquesSection itens={CARDAPIO} />

        {/* ── Info Banner ── */}
        <InfoBanner />

        {/* ── CTA Final ── */}
        <section
          className="my-8 overflow-hidden rounded-2xl text-center"
          style={{
            background: "linear-gradient(135deg, #C2D82A 0%, #45AD56 100%)",
          }}
        >
          <div className="px-6 py-10">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Faça seu pedido agora!
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm font-bold text-white/90">
              Peça pelo WhatsApp ou pelo nosso delivery e receba em casa com
              todo conforto e segurança.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                className="h-11 gap-2 rounded-full border-0 px-8 text-sm font-bold uppercase tracking-wider shadow-lg"
                style={{ backgroundColor: "#400F46", color: "#FEFEFE" }}
              >
                <ShoppingBag className="size-4" />
                Pedir pelo WhatsApp
              </Button>
              <Button
                variant="outline"
                className="h-11 gap-2 rounded-full border-2 px-8 text-sm font-bold uppercase tracking-wider shadow-lg"
                style={{ borderColor: "#FEFEFE", color: "#400F46" }}
              >
                <Truck className="size-4" />
                Delivery
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <DonMixFooter />
    </div>
  );
}
