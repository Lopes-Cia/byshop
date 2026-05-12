# Byshop (/www) — Análise do projeto (estado atual)

Este documento descreve o estado atual do projeto em `c:\LOPES\www\byshop\www`, com foco em arquitetura, rotas/fluxos, estado, dados, UI e testes.

## Contexto

- O projeto é um starter de e-commerce em Next.js (App Router) com UI baseada em shadcn/ui + Radix.
- A implementação atual é predominantemente **front-end** com **dados e autenticação mockados** e persistência local (Zustand persist).
- Objetivo prático: oferecer páginas e fluxos típicos de uma loja (catálogo → PDP → carrinho → checkout → pedidos → tracking) + páginas institucionais.

## Stack e dependências

**Runtime (principais)**

- Next.js 15.4.4 + React 19.1.0 ([package.json](file:///c:/LOPES/www/byshop/www/package.json))
- Zustand 5 + `zustand/middleware` (persistência em storage do browser)
- Zod 4 (schemas e validação de formulário)
- shadcn/ui (style `new-york`) + Radix UI (biblioteca de primitives acessíveis)
- Tailwind CSS v4 + `tw-animate-css` ([globals.css](file:///c:/LOPES/www/byshop/www/app/globals.css))

**Dev / Qualidade**

- ESLint (flat config) com `next/core-web-vitals` e TypeScript ([eslint.config.mjs](file:///c:/LOPES/www/byshop/www/eslint.config.mjs))
- Prettier + `prettier-plugin-tailwindcss` (ver `.prettierrc`)
- Playwright E2E ([playwright.config.ts](file:///c:/LOPES/www/byshop/www/playwright.config.ts))

## Como rodar (scripts e testes)

- Dev server: `npm run dev` (usa `next dev --turbopack`) ([package.json](file:///c:/LOPES/www/byshop/www/package.json))
- Build: `npm run build`
- Lint: `npm run lint`
- E2E (Playwright):
  - Config inicia o dev server em `http://localhost:3031` antes dos testes ([playwright.config.ts](file:///c:/LOPES/www/byshop/www/playwright.config.ts))
  - Testes vivem em `www/tests/e2e/*` (ex.: [purchase-journey.spec.ts](file:///c:/LOPES/www/byshop/www/tests/e2e/purchase-journey.spec.ts))

## Estrutura de pastas (foco em `www/`)

- `app/`
  - Rotas do App Router, `layout.tsx`, `error.tsx`, `not-found.tsx` e páginas `page.tsx`.
- `components/`
  - Componentes de domínio (ex.: [ProductCard.tsx](file:///c:/LOPES/www/byshop/www/components/ProductCard.tsx), [CouponBox.tsx](file:///c:/LOPES/www/byshop/www/components/CouponBox.tsx))
  - Layout (ex.: [header.tsx](file:///c:/LOPES/www/byshop/www/components/layout/header.tsx))
  - Seções da home (ex.: [Hero.tsx](file:///c:/LOPES/www/byshop/www/components/sections/Hero.tsx))
  - shadcn/ui em `components/ui/*` (botões, dialogs, tabelas, etc.)
- `hooks/`
  - Hooks utilitários, incluindo formulário com Zod ([useForm.ts](file:///c:/LOPES/www/byshop/www/hooks/useForm.ts))
- `lib/`
  - Dados mock e schemas (ex.: [data.ts](file:///c:/LOPES/www/byshop/www/lib/data.ts), [schemas.ts](file:///c:/LOPES/www/byshop/www/lib/schemas.ts), [utils.ts](file:///c:/LOPES/www/byshop/www/lib/utils.ts))
- `stores/`
  - Zustand stores persistidas (auth, cart, orders, wishlist)
- `tests/e2e/`
  - Testes Playwright end-to-end
- `public/`
  - Assets estáticos (ex.: logo e preview)

## Rotas e páginas (mapa do App Router)

Convenções observadas:

- Várias rotas usam uma página “server” (`page.tsx` sem `"use client"`) apenas para resolver `params/searchParams` com segurança e renderizar um client component.
- Páginas com Zustand persist geralmente tratam hidratação (`persist.hasHydrated()` / `onFinishHydration`) antes de renderizar dados.

| Rota | Arquivo(s) | Tipo | Resumo |
|---|---|---|---|
| `/` | [app/(loja)/(home)/page.tsx](file:///c:/LOPES/www/byshop/www/app/(loja)/(home)/page.tsx) | Server | Home com seções (Hero/Featured/Categories/Testimonials/Newsletter). |
| `/products` | [app/(shop)/products/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/products/page.tsx) + [products-client.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/products/products-client.tsx) | Server + Client | Listagem com filtros por querystring (`category/price/sort/sale`). |
| `/products/[id]` | [app/(shop)/products/[id]/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/products/%5Bid%5D/page.tsx) + [product-detail.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/products/%5Bid%5D/product-detail.tsx) | Server + Client | PDP: imagens, variações, quantidade; adiciona ao carrinho e wishlist. |
| `/cart` | [app/(shop)/cart/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/cart/page.tsx) | Client | Carrinho com ajuste de qty, remoção, cupom e resumo de totals. |
| `/checkout` | [app/(shop)/checkout/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/checkout/page.tsx) | Client | Formulário (Zod) + resumo; cria pedido e limpa carrinho. |
| `/checkout/success` | [app/(shop)/checkout/success/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/checkout/success/page.tsx) + [success-client.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/checkout/success/success-client.tsx) | Server + Client | Tela pós-compra via `orderId` em querystring. |
| `/orders` | [app/(usuario)/orders/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/orders/page.tsx) | Client | Lista pedidos do usuário logado (filtra por `userId`). |
| `/orders/[id]` | [app/(usuario)/orders/[id]/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/orders/%5Bid%5D/page.tsx) + [order-detail-client.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/orders/%5Bid%5D/order-detail-client.tsx) | Server + Client | Detalhe do pedido a partir do `id` (path param). |
| `/tracking` | [app/(shop)/tracking/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/tracking/page.tsx) + [tracking-client.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/tracking/tracking-client.tsx) | Server + Client | Rastreamento via `orderId` em querystring. |
| `/wishlist` | [app/(usuario)/wishlist/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/wishlist/page.tsx) | Client | Lista itens salvos; move item para carrinho; limpa wishlist. |
| `/profile` | [app/(usuario)/profile/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/profile/page.tsx) | Client | Perfil do usuário logado; senão, CTA para login/cadastro com `next`. |
| `/auth/signin` | [app/(usuario)/auth/signin/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/auth/signin/page.tsx) + [signin-client.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/auth/signin/signin-client.tsx) | Server + Client | Login mockado; respeita `next` (sanitizado para paths internos). |
| `/auth/signup` | [app/(usuario)/auth/signup/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/auth/signup/page.tsx) + [signup-client.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/auth/signup/signup-client.tsx) | Server + Client | Cadastro mockado; respeita `next` sanitizado. |
| `/auth/forgot-password` | [app/(usuario)/auth/forgot-password/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/auth/forgot-password/page.tsx) + [forgot-password-client.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/auth/forgot-password/forgot-password-client.tsx) | Server + Client | Recuperação mockada; respeita `next` sanitizado. |
| `/contact` | [app/(loja)/contact/page.tsx](file:///c:/LOPES/www/byshop/www/app/(loja)/contact/page.tsx) | Client | Formulário de contato (validado por Zod). |
| `/about` | [app/(institucional)/about/page.tsx](file:///c:/LOPES/www/byshop/www/app/(institucional)/about/page.tsx) | Server | Página institucional. |
| `/blog` | [app/(loja)/blog/page.tsx](file:///c:/LOPES/www/byshop/www/app/(loja)/blog/page.tsx) | Server | Página institucional. |
| `/faq` | [app/(institucional)/faq/page.tsx](file:///c:/LOPES/www/byshop/www/app/(institucional)/faq/page.tsx) | Server | Página institucional. |
| `/shipping` | [app/(institucional)/shipping/page.tsx](file:///c:/LOPES/www/byshop/www/app/(institucional)/shipping/page.tsx) | Server | Página institucional. |
| `/returns` | [app/(institucional)/returns/page.tsx](file:///c:/LOPES/www/byshop/www/app/(institucional)/returns/page.tsx) | Server | Página institucional. |
| `/terms` | [app/(institucional)/terms/page.tsx](file:///c:/LOPES/www/byshop/www/app/(institucional)/terms/page.tsx) | Server | Página institucional. |
| `/privacy` | [app/(institucional)/privacy/page.tsx](file:///c:/LOPES/www/byshop/www/app/(institucional)/privacy/page.tsx) | Server | Página institucional. |

**Arquivos globais do App Router**

- Layout raiz: [app/layout.tsx](file:///c:/LOPES/www/byshop/www/app/layout.tsx) (inclui [header.tsx](file:///c:/LOPES/www/byshop/www/components/layout/header.tsx) e [footer.tsx](file:///c:/LOPES/www/byshop/www/components/layout/footer.tsx))
- Error boundary: [app/error.tsx](file:///c:/LOPES/www/byshop/www/app/error.tsx) (client component)
- Not found: [app/not-found.tsx](file:///c:/LOPES/www/byshop/www/app/not-found.tsx)

## Fluxos principais (estado atual)

### Catálogo → PDP → Carrinho

- Catálogo em `/products` usa `products` de [data.ts](file:///c:/LOPES/www/byshop/www/lib/data.ts) e filtra/ordena em client-side ([products-client.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/products/products-client.tsx)).
- PDP em `/products/[id]` localiza o produto pelo `id` e renderiza a tela client ([page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/products/%5Bid%5D/page.tsx), [product-detail.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/products/%5Bid%5D/product-detail.tsx)).
- A ação “Add to Cart” grava no Zustand cart store; wishlist também é local/persistida.

### Carrinho → Checkout → Sucesso → Pedido → Tracking

- Carrinho em `/cart`:
  - Lê `items` do store persistido e aguarda hidratação antes de renderizar ([cart/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/cart/page.tsx)).
  - Exibe o resumo calculado por `getSummary()` do store ([cartStore.ts](file:///c:/LOPES/www/byshop/www/stores/cartStore.ts)).
  - Permite aplicar cupom via `CouponBox` ([CouponBox.tsx](file:///c:/LOPES/www/byshop/www/components/CouponBox.tsx)).
- Checkout em `/checkout`:
  - Valida formulário via Zod + hook [useForm.ts](file:///c:/LOPES/www/byshop/www/hooks/useForm.ts) e schema [CheckoutSchema](file:///c:/LOPES/www/byshop/www/lib/schemas.ts).
  - Cria pedido chamando `createOrder` (orders store) e limpa o carrinho ([checkout/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/checkout/page.tsx)).
- Sucesso em `/checkout/success`:
  - Recebe `orderId` via querystring e passa para um client component ([checkout/success/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/checkout/success/page.tsx)).
- Pedido em `/orders` e `/orders/[id]`:
  - Lista e detalhe consultam orders store persistido ([ordersStore.ts](file:///c:/LOPES/www/byshop/www/stores/ordersStore.ts)).
- Tracking em `/tracking`:
  - Resolve `orderId` via querystring e renderiza o client component que apresenta timeline/info ([tracking/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/tracking/page.tsx)).

### Autenticação e `next`

- Auth é mockada no front:
  - Credenciais de teste em [authStore.ts](file:///c:/LOPES/www/byshop/www/stores/authStore.ts)
  - Login simula latência, valida credenciais e grava `user` no store persistido
- Rotas `/auth/*` aceitam `?next=/alguma-rota`:
  - As páginas “server” sanitizam `next` para evitar redirecionamento externo (apenas caminhos internos) ([signin/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/auth/signin/page.tsx)).
  - O client component navega para `nextPath` após login ([signin-client.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/auth/signin/signin-client.tsx)).

## Dados e domínio (schemas e mocks)

### Schemas (Zod)

Os principais schemas/tipos estão em [schemas.ts](file:///c:/LOPES/www/byshop/www/lib/schemas.ts):

- `Product` (catálogo / PDP)
- `CartItem` (carrinho e pedido)
- `User` (auth)
- Schemas de formulários: `SignInSchema`, `SignUpSchema`, `ForgotPasswordSchema`, `CheckoutSchema`, `ContactSchema`

### Dados mock

- Produtos/categorias/testimonials em [data.ts](file:///c:/LOPES/www/byshop/www/lib/data.ts)
  - `sampleProducts` é `as const`
  - `products` exportado é `Product[]` validado com `ProductSchema.parse` (validação em runtime)

## Estado e persistência (Zustand)

### Auth (`stores/authStore.ts`)

- Store persistida com chave `auth-storage` ([authStore.ts](file:///c:/LOPES/www/byshop/www/stores/authStore.ts))
- Estado:
  - `user: User | null`
  - `isLoading: boolean`
- Ações:
  - `login(email, password)` (mock)
  - `signup(...)` (mock)
  - `logout()`

### Carrinho (`stores/cartStore.ts`)

- Store persistida com chave `cart-storage` ([cartStore.ts](file:///c:/LOPES/www/byshop/www/stores/cartStore.ts))
- Estado:
  - `items: CartItem[]`
  - `discountAmount: number`
  - `coupon: AppliedCoupon | null`
- Ações:
  - CRUD de itens (`addItem`, `removeItem`, `updateQuantity`, `clearCart`)
  - Cupons (`applyCoupon`, `removeCoupon`) com normalização e mensagens de erro
  - Totais:
    - `getSummary()` computa `subtotal`, `discount`, `shipping`, `tax`, `total`
    - Regras observadas: frete grátis acima de um threshold, imposto fixo (8%), cupom percentual e cupom de frete grátis

### Pedidos (`stores/ordersStore.ts`)

- Store persistida com chave `orders-storage` ([ordersStore.ts](file:///c:/LOPES/www/byshop/www/stores/ordersStore.ts))
- Modelo:
  - `Order` contém `items`, `totals`, `status`, `tracking`, `createdAt`, `userId`
- Ações:
  - `createOrder()` gera `ord_*`, status inicial `processing`, e tracking mock (`MockExpress`)
  - Leitura: `getOrderById`, `getOrdersByUserId`

### Wishlist (`stores/wishlistStore.ts`)

- Store persistida com chave `wishlist-storage` ([wishlistStore.ts](file:///c:/LOPES/www/byshop/www/stores/wishlistStore.ts))
- Estado:
  - `items: Product[]`
- Ações:
  - `addItem`, `removeItem`, `toggleItem`, `isInWishlist`, `clearWishlist`

## Formulários e validação

- Hook genérico de formulário: [useForm.ts](file:///c:/LOPES/www/byshop/www/hooks/useForm.ts)
  - Mantém `data`, `errors`, `isSubmitting`
  - Integra validação Zod com `safeParse()`
  - Remove erro do campo ao `setValue`
- As páginas de auth/checkout/contact usam os schemas de [schemas.ts](file:///c:/LOPES/www/byshop/www/lib/schemas.ts).

## UI e componentes

### Layout global e navegação

- Layout raiz em [layout.tsx](file:///c:/LOPES/www/byshop/www/app/layout.tsx)
  - Injeta fonte via `next/font/google` e inclui `Header`/`Footer`
- Header é client component e integra stores:
  - `useCartStore.getItemCount()` (contador do carrinho)
  - `useWishlistStore.getCount()` (contador da wishlist)
  - `useAuthStore` (estado do usuário e logout)
  - ([header.tsx](file:///c:/LOPES/www/byshop/www/components/layout/header.tsx))

### shadcn/ui

- Config do registry/aliases em [components.json](file:///c:/LOPES/www/byshop/www/components.json)
- Componentes shadcn estão em `components/ui/*` (Radix + classes Tailwind).
- Utilitário `cn()` para merge de classes em [utils.ts](file:///c:/LOPES/www/byshop/www/lib/utils.ts).

### Tailwind v4 (tokens)

- Tokens e cores via CSS variables em [globals.css](file:///c:/LOPES/www/byshop/www/app/globals.css)
- Dark mode via `.dark` e `@custom-variant dark`.

## Testes (Playwright)

- Config em [playwright.config.ts](file:///c:/LOPES/www/byshop/www/playwright.config.ts)
  - Sobe o dev server na porta 3031
  - Reporter HTML (não abre automaticamente)
- Especificação E2E principal:
  - Compra como guest cria pedido e valida tracking
  - Login respeita `next` e redireciona para `/profile`
  - ([purchase-journey.spec.ts](file:///c:/LOPES/www/byshop/www/tests/e2e/purchase-journey.spec.ts))

- Status observado ao executar os testes:
  - O cenário de compra falha por “strict mode violation” ao localizar `Add to Cart` (existem dois botões com o mesmo nome acessível na página do produto).
  - O cenário de signin falha ao esperar o heading `"My Account"` em `/profile`, mas a página atual renderiza textos em pt-BR.

## Limites conhecidos (descrição do estado atual)

- Dados e integrações são mockados:
  - Produtos/categorias/depoimentos vêm de arquivo local ([data.ts](file:///c:/LOPES/www/byshop/www/lib/data.ts))
  - Auth e pedidos são persistidos no browser via Zustand persist (sem API real)
- Internacionalização/textos:
  - Há mistura de textos em pt-BR e inglês em algumas páginas/labels (ex.: signin vs wishlist/pedidos).
