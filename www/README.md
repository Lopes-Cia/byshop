# byShop - E-commerce Platform

> Documentacao tecnica otimizada para consumo por IA

## Visao Geral do Projeto

**Tipo:** E-commerce SPA (Single Page Application)
**Framework:** Next.js 16 (App Router)
**Linguagem:** TypeScript
**Estilizacao:** Tailwind CSS v4
**UI Components:** shadcn/ui (estilo new-york)

---

## Tailwind CSS v4 - Configuracao e Uso

### Diferencias do Tailwind v4 vs v3

O Tailwind CSS v4 introduz mudancas significativas na arquitetura:

| Aspecto | Tailwind v3 | Tailwind v4 |
|---------|-------------|-------------|
| Configuracao | `tailwind.config.js` | `globals.css` com `@theme` |
| Importacao | `@tailwind base/components/utilities` | `@import 'tailwindcss'` |
| Cores customizadas | `theme.extend.colors` | CSS variables + `@theme inline` |
| Plugins | `plugins: [require('...')]` | `@import 'plugin-name'` |

### Estrutura do globals.css

```css
/* 1. Importacoes principais */
@import 'tailwindcss';        /* Core do Tailwind v4 */
@import 'tw-animate-css';     /* Plugin de animacoes */

/* 2. Variante dark mode customizada */
@custom-variant dark (&:is(.dark *));

/* 3. CSS Variables para design tokens */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  /* ... demais tokens */
  --radius: 0.625rem;
}

/* 4. Tema dark (opcional) */
.dark {
  --background: oklch(0.145 0 0);
  /* ... tokens invertidos */
}

/* 5. Mapeamento para Tailwind via @theme inline */
@theme inline {
  --font-sans: 'Geist', 'Geist Fallback';
  --font-mono: 'Geist Mono', 'Geist Mono Fallback';
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  /* ... mapeamento de todas as cores */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

/* 6. Base layer para defaults globais */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* 7. CSS customizado (nao-Tailwind) */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

### Sistema de Cores OKLCH

O Tailwind v4 usa **OKLCH** (Oklab Lightness Chroma Hue) em vez de HSL:

```css
/* Formato: oklch(lightness chroma hue) */
--background: oklch(1 0 0);           /* Branco puro: L=1, C=0, H=0 */
--foreground: oklch(0.145 0 0);       /* Preto escuro: L=0.145 */
--destructive: oklch(0.577 0.245 27.325);  /* Vermelho: L, C, H especificos */
```

**Vantagens do OKLCH:**
- Percepcao de luminosidade mais uniforme
- Melhor para criar paletas harmoniosas
- Suporte nativo a wide-gamut displays

### Usando Design Tokens no Codigo

```tsx
// Classes semanticas (preferidas)
<div className="bg-background text-foreground">
<div className="bg-primary text-primary-foreground">
<div className="bg-muted text-muted-foreground">
<div className="border-border rounded-lg">

// Classes de radius semanticas
<div className="rounded-sm">  // var(--radius) - 4px
<div className="rounded-md">  // var(--radius) - 2px
<div className="rounded-lg">  // var(--radius)
<div className="rounded-xl">  // var(--radius) + 4px

// Fontes configuradas
<p className="font-sans">   // Geist
<code className="font-mono"> // Geist Mono
```

### Adicionando Novas Cores

Para adicionar cores customizadas no Tailwind v4:

```css
/* 1. Definir a variavel CSS */
:root {
  --brand-red: oklch(0.577 0.245 27.325);
  --brand-red-light: oklch(0.8 0.15 27.325);
}

/* 2. Mapear no @theme inline */
@theme inline {
  --color-brand-red: var(--brand-red);
  --color-brand-red-light: var(--brand-red-light);
}
```

```tsx
// Usar no codigo
<div className="bg-brand-red text-white">
<div className="hover:bg-brand-red-light">
```

### CSS Customizado (fora do Tailwind)

Para estilos que nao fazem parte do Tailwind:

```css
/* Colocar FORA de @layer para evitar purge */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

---

## shadcn/ui - Configuracao e Uso

### Configuracao (`components.json`)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",           // Estilo visual (new-york vs default)
  "rsc": true,                   // React Server Components habilitado
  "tsx": true,                   // TypeScript habilitado
  "tailwind": {
    "config": "",                // Vazio no v4 (usa globals.css)
    "css": "app/globals.css",    // Arquivo de estilos
    "baseColor": "neutral",      // Paleta base
    "cssVariables": true,        // Usa CSS variables
    "prefix": ""                 // Sem prefixo nas classes
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"        // Biblioteca de icones
}
```

### Estilo "new-york" vs "default"

| Caracteristica | new-york | default |
|----------------|----------|---------|
| Border radius | Menor, mais sutil | Maior, mais arredondado |
| Espacamento | Mais compacto | Mais espaçado |
| Sombras | Minimas | Mais pronunciadas |
| Visual geral | Moderno, clean | Amigável, soft |

### Funcao Utilitaria `cn()`

Localizada em `lib/utils.ts`:

```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Uso:**
```tsx
import { cn } from "@/lib/utils"

// Combina classes condicionalmente
<div className={cn(
  "base-class",
  isActive && "active-class",
  variant === "primary" && "bg-primary",
  className // permite override via props
)}>

// Resolve conflitos de Tailwind
cn("px-4", "px-2")  // Resultado: "px-2" (ultimo vence)
cn("text-red-500", "text-blue-500")  // Resultado: "text-blue-500"
```

### Instalando Componentes shadcn/ui

```bash
# Instalar um componente
npx shadcn@latest add button

# Instalar multiplos componentes
npx shadcn@latest add button card input

# Listar componentes disponiveis
npx shadcn@latest add
```

**Componentes sao copiados para:** `components/ui/`

### Padrao de Componentes shadcn/ui

```tsx
// components/ui/button.tsx (exemplo de estrutura)
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center ...", // base
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground ...",
        destructive: "bg-destructive text-destructive-foreground ...",
        outline: "border border-input bg-background ...",
        secondary: "bg-secondary text-secondary-foreground ...",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### Integracao Tailwind v4 + shadcn/ui

Os componentes shadcn/ui usam os design tokens definidos no `globals.css`:

```tsx
// O componente usa classes semanticas
<Button variant="default">  // usa bg-primary, text-primary-foreground

// Que mapeiam para as variaveis CSS
// bg-primary -> --color-primary -> var(--primary) -> oklch(0.205 0 0)
```

**Para customizar a aparencia global:**
1. Modifique as variaveis em `:root` no `globals.css`
2. Todos os componentes shadcn/ui serao afetados automaticamente

---

## Arquitetura de Pastas

```
/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Layout raiz (fonts, metadata)
│   ├── page.tsx             # Homepage
│   ├── globals.css          # Estilos globais + design tokens
│   └── product/[id]/        # Pagina de produto dinamica
│       └── page.tsx
├── components/              # Componentes reutilizaveis
│   ├── header.tsx          # Header global (navegacao, busca, carrinho)
│   ├── footer.tsx          # Footer global
│   ├── carousel.tsx        # Carrossel otimizado
│   ├── product-card.tsx    # Card de produto padrao
│   └── top-seller-card.tsx # Card de produto com badge
│   └── ui/                 # shadcn/ui components
├── hooks/                   # Custom hooks
├── lib/                     # Utilitarios (cn function)
└── public/                  # Assets estaticos
    └── images/
        └── logo.png        # Logo byShop
```

## Componentes Principais

### Header (`components/header.tsx`)

**Props:**
```typescript
interface HeaderProps {
  onMobileMenuOpen: () => void
  onSearchOpen: () => void
  onCartOpen: () => void
  openMenu: string | null
  setOpenMenu: (menu: string | null) => void
  isUserMenuOpen: boolean
  setIsUserMenuOpen: (open: boolean) => void
}
```

**Funcionalidades:**
- Logo responsivo (imagem)
- Navegacao com mega menus (hover em desktop)
- Botao hamburger (mobile only, abre sidebar)
- Busca modal (Ctrl+K)
- Menu do usuario com creditos/wallet
- Botao do carrinho com badge de quantidade

**Breakpoints:**
- Mobile: `< lg` - Hamburger menu, icones simplificados
- Desktop: `>= lg` - Navegacao completa, mega menus

### Footer (`components/footer.tsx`)

**Funcionalidades:**
- Grid 4 colunas (2 em mobile)
- Links institucionais em portugues
- Logo com filtro de inversao para fundo escuro
- Links legais e copyright

### Carousel (`components/carousel.tsx`)

**Exports:**
```typescript
export function Carousel({ title, viewMoreHref, children, className })
export function CarouselItem({ children, className })
```

**Funcionalidades:**
- Scroll horizontal sem scrollbar visivel
- Botoes prev/next com estado disabled automatico
- Snap points para mobile (`snap-x snap-mandatory`)
- Scroll suave baseado em 80% da largura do container

**CSS Requerido (globals.css):**
```css
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

### ProductCard (`components/product-card.tsx`)

**Props:**
```typescript
interface ProductCardProps {
  id?: number           // ID para link (default: 1)
  title?: string        // Nome do produto
  category?: string     // Categoria exibida
  price?: string        // Preco formatado
  emoji?: string        // Emoji placeholder
  colored?: boolean     // Background colorido aleatorio
}
```

**Estrutura:**
- Link para `/product/[id]`
- Imagem/emoji placeholder
- Categoria em amber
- Titulo truncado (2 linhas)
- Preco em destaque
- Botao "Comprar" com icone

### TopSellerCard (`components/top-seller-card.tsx`)

**Props:** Mesmas do ProductCard

**Diferenciais:**
- Badge "MAIS VENDIDO" (posicao absoluta)
- Aspect ratio diferente (video vs square)
- Border adicional

## Paginas

### Homepage (`app/page.tsx`)

**Estados:**
```typescript
const [isCartOpen, setIsCartOpen] = useState(false)
const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
const [isSearchOpen, setIsSearchOpen] = useState(false)
const [searchQuery, setSearchQuery] = useState("")
const [selectedIndex, setSelectedIndex] = useState(0)
const [openMenu, setOpenMenu] = useState<string | null>(null)
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
```

**Secoes (ordem):**
1. Header (componente)
2. Hero Banner (grid 2 colunas)
3. Categories (grid responsivo com icones)
4. Carousel "Vistos Recentemente"
5. Carousel "Mais Vendidos"
6. Comfy Styles (cards de estilo)
7. Carousel "Thomas, feito para voce"
8. Footer (componente)

**Modais/Sidebars:**
- Mobile Menu Sidebar (esquerda)
- Cart Sidebar (direita)
- Search Modal (centralizado)

### Pagina de Produto (`app/product/[id]/page.tsx`)

**Params:** `{ id: string }`

**Estados adicionais:**
```typescript
const [selectedImage, setSelectedImage] = useState(0)
const [selectedColor, setSelectedColor] = useState("black")
const [quantity, setQuantity] = useState(1)
const [isWishlisted, setIsWishlisted] = useState(false)
```

**Secoes:**
1. Header (componente)
2. Breadcrumb responsivo
3. Grid produto (galeria + info + compra)
4. Avaliacoes com resumo
5. Carousel produtos relacionados
6. Footer (componente)

**Galeria:**
- Thumbnails verticais (desktop) / horizontais (mobile)
- Imagem principal com zoom potencial
- Navegacao por clique

## Padroes de Estilo

### Cores (Design Tokens)

```css
--background: oklch(1 0 0)           /* Branco */
--foreground: oklch(0.145 0 0)       /* Preto */
--primary: oklch(0.205 0 0)          /* Preto escuro */
--accent: oklch(0.97 0 0)            /* Cinza claro */
--muted: oklch(0.97 0 0)             /* Cinza muted */
--destructive: oklch(0.577 0.245 27.325)  /* Vermelho */
```

**Cores de marca:**
- Vermelho byShop: `text-red-500`, `bg-red-500`
- Amber para destaques: `text-amber-500`, `bg-amber-500`

### Espacamento

**Padrao container:**
```html
<div class="max-w-7xl mx-auto px-4">
```

**Secoes:**
```html
<section class="py-10">
```

### Responsividade

**Breakpoints utilizados:**
- `sm:` (640px) - Ajustes menores
- `md:` (768px) - Tablets
- `lg:` (1024px) - Desktop

**Padrao mobile-first:**
```html
<div class="w-full md:w-1/2 lg:w-1/4">
```

### Sidebars

**Largura com backdrop:**
```css
w-[calc(100%-48px)] max-w-md  /* Carrinho */
w-[calc(100%-48px)] max-w-xs  /* Menu mobile */
```

**Animacao:**
```css
transform transition-transform duration-300 ease-out
translate-x-0 / translate-x-full  /* Carrinho - direita */
translate-x-0 / -translate-x-full /* Menu - esquerda */
```

## Dependencias Principais

| Pacote | Versao | Uso |
|--------|--------|-----|
| next | 16.2.6 | Framework |
| react | ^19 | UI Library |
| tailwindcss | ^4.2.0 | Estilos |
| lucide-react | ^0.564.0 | Icones |
| @radix-ui/* | varios | Primitivos UI |
| class-variance-authority | ^0.7.1 | Variantes CSS |
| clsx + tailwind-merge | ^2.1.1 / ^3.3.1 | Merge de classes |

## Icones Utilizados (lucide-react)

**Header/Navegacao:**
`Search`, `Menu`, `ShoppingCart`, `Heart`, `User`, `ChevronRight`, `ChevronLeft`

**Categorias:**
`Cpu`, `Gamepad2`, `Speaker`, `Monitor`, `GraduationCap`

**UI Geral:**
`Star`, `Truck`, `Package`, `X`, `Minus`, `Plus`, `Trash2`, `Hash`, `ArrowRight`, `Wallet`, `CreditCard`, `Gift`, `MapPin`

**Produto:**
`Shield`, `RotateCcw`, `Share2`, `Check`, `ThumbsUp`, `ImageIcon`

## Funcionalidades de Busca

**Dados de busca (searchResults):**
```typescript
const searchResults = [
  {
    category: "Produtos",
    items: [
      { icon: Hash, title: "...", subtitle: "..." },
      // ...
    ]
  },
  // Categorias, Paginas
]
```

**Filtragem:**
```typescript
const filteredResults = searchResults.map(category => ({
  ...category,
  items: category.items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  )
})).filter(category => category.items.length > 0)
```

**Navegacao por teclado:**
- `Ctrl+K` / `Cmd+K`: Abre busca
- `Escape`: Fecha busca
- `ArrowUp/Down`: Navega resultados
- `Enter`: Seleciona item

## Carrinho

**Estrutura de item:**
```typescript
const cartItems = [
  {
    id: 1,
    name: "Puma AXIS TR Boot",
    variant: "Preto / Tamanho 42",
    price: 125.00,
    quantity: 1,
    image: "emoji"
  },
  // ...
]
```

**Calculos:**
```typescript
const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
const shipping = "Gratis"
const total = subtotal
```

## Notas de Implementacao

### Para adicionar nova pagina:
1. Criar arquivo em `app/[rota]/page.tsx`
2. Importar e usar `<Header />` e `<Footer />`
3. Gerenciar estados dos modais localmente
4. Passar callbacks para Header

### Para adicionar novo componente de card:
1. Criar em `components/`
2. Seguir padrao de props do ProductCard
3. Usar `Link` do Next.js para navegacao
4. Aplicar `hover:shadow-md transition-shadow`

### Para adicionar item ao carrossel:
```tsx
<Carousel title="Titulo" viewMoreHref="#">
  {items.map((item, i) => (
    <CarouselItem key={i} className="w-[280px] sm:w-[220px] md:w-[200px] lg:w-[180px]">
      <ProductCard id={item.id} {...item} />
    </CarouselItem>
  ))}
</Carousel>
```

## Assets

**Logo:**
- Path: `/images/logo.png`
- Uso: `<Image src="/images/logo.png" alt="byShop" />`
- Footer: adicionar `className="brightness-0 invert"` para versao branca

## Comandos

```bash
pnpm dev      # Desenvolvimento
pnpm build    # Build producao
pnpm start    # Servidor producao
pnpm lint     # Linting
```
