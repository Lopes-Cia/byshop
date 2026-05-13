# ByShop (/www) — Análise do projeto (estado atual)

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
  - Observação: o `www/public/logo.png` foi sincronizado a partir de `.trae/docs/design/logo.png` (logo de referência usada no sandbox).

## Rotas e páginas (mapa do App Router)

Convenções observadas:

- Várias rotas usam uma página “server” (`page.tsx` sem `"use client"`) apenas para resolver `params/searchParams` com segurança e renderizar um client component.
- Páginas com Zustand persist geralmente tratam hidratação (`persist.hasHydrated()` / `onFinishHydration`) antes de renderizar dados.

| Rota | Arquivo(s) | Tipo | Resumo |
|---|---|---|---|
| `/` | [app/(loja)/(inicio)/page.tsx](file:///c:/LOPES/www/byshop/www/app/(loja)/(inicio)/page.tsx) | Server | Home com seções (Hero/Featured/Categories/Testimonials/Newsletter). |
| `/produtos` | [app/(shop)/produtos/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/produtos/page.tsx) + [produtos-client.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/produtos/produtos-client.tsx) | Server + Client | Listagem com filtros por querystring (`category/price/sort/sale`). |
| `/produtos/[id]` | [app/(shop)/produtos/[id]/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/produtos/%5Bid%5D/page.tsx) + [detalhe-produto.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/produtos/%5Bid%5D/detalhe-produto.tsx) | Server + Client | PDP: imagens, variações, quantidade; adiciona ao carrinho e favoritos. |
| `/carrinho` | [app/(shop)/carrinho/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/carrinho/page.tsx) | Client | Carrinho com ajuste de qty, remoção, cupom e resumo de totals. |
| `/finalizar-compra` | [app/(shop)/finalizar-compra/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/finalizar-compra/page.tsx) | Client | Formulário (Zod) + resumo; cria pedido e limpa carrinho. |
| `/finalizar-compra/sucesso` | [app/(shop)/finalizar-compra/sucesso/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/finalizar-compra/sucesso/page.tsx) + [sucesso-client.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/finalizar-compra/sucesso/sucesso-client.tsx) | Server + Client | Tela pós-compra via `orderId` em querystring. |
| `/pedidos` | [app/(usuario)/pedidos/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/pedidos/page.tsx) | Client | Lista pedidos do usuário logado (filtra por `userId`). |
| `/pedidos/[id]` | [app/(usuario)/pedidos/[id]/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/pedidos/%5Bid%5D/page.tsx) + [detalhe-pedido-client.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/pedidos/%5Bid%5D/detalhe-pedido-client.tsx) | Server + Client | Detalhe do pedido a partir do `id` (path param). |
| `/rastreamento` | [app/(shop)/rastreamento/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/rastreamento/page.tsx) + [rastreamento-client.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/rastreamento/rastreamento-client.tsx) | Server + Client | Rastreamento via `orderId` em querystring. |
| `/favoritos` | [app/(usuario)/favoritos/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/favoritos/page.tsx) | Client | Lista itens salvos; move item para carrinho; limpa favoritos. |
| `/perfil` | [app/(usuario)/perfil/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/perfil/page.tsx) | Client | Perfil do usuário logado; senão, CTA para login/cadastro com `next`. |
| `/conta/entrar` | [app/(usuario)/conta/entrar/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/conta/entrar/page.tsx) + [entrar-client.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/conta/entrar/entrar-client.tsx) | Server + Client | Login mockado; respeita `next` (sanitizado para paths internos). |
| `/conta/cadastrar` | [app/(usuario)/conta/cadastrar/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/conta/cadastrar/page.tsx) + [cadastrar-client.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/conta/cadastrar/cadastrar-client.tsx) | Server + Client | Cadastro mockado; respeita `next` sanitizado. |
| `/conta/recuperar-senha` | [app/(usuario)/conta/recuperar-senha/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/conta/recuperar-senha/page.tsx) + [recuperar-senha-client.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/conta/recuperar-senha/recuperar-senha-client.tsx) | Server + Client | Recuperação mockada; respeita `next` sanitizado. |
| `/contato` | [app/(loja)/contato/page.tsx](file:///c:/LOPES/www/byshop/www/app/(loja)/contato/page.tsx) | Client | Formulário de contato (validado por Zod). |
| `/sobre` | [app/(institucional)/sobre/page.tsx](file:///c:/LOPES/www/byshop/www/app/(institucional)/sobre/page.tsx) | Server | Página institucional. |
| `/blog` | [app/(loja)/blog/page.tsx](file:///c:/LOPES/www/byshop/www/app/(loja)/blog/page.tsx) | Server | Página institucional. |
| `/perguntas-frequentes` | [app/(institucional)/perguntas-frequentes/page.tsx](file:///c:/LOPES/www/byshop/www/app/(institucional)/perguntas-frequentes/page.tsx) | Server | Página institucional. |
| `/entrega` | [app/(institucional)/entrega/page.tsx](file:///c:/LOPES/www/byshop/www/app/(institucional)/entrega/page.tsx) | Server | Página institucional. |
| `/trocas-e-devolucoes` | [app/(institucional)/trocas-e-devolucoes/page.tsx](file:///c:/LOPES/www/byshop/www/app/(institucional)/trocas-e-devolucoes/page.tsx) | Server | Página institucional. |
| `/termos-de-uso` | [app/(institucional)/termos-de-uso/page.tsx](file:///c:/LOPES/www/byshop/www/app/(institucional)/termos-de-uso/page.tsx) | Server | Página institucional. |
| `/privacidade` | [app/(institucional)/privacidade/page.tsx](file:///c:/LOPES/www/byshop/www/app/(institucional)/privacidade/page.tsx) | Server | Página institucional. |

**Arquivos globais do App Router**

- Layout raiz: [app/layout.tsx](file:///c:/LOPES/www/byshop/www/app/layout.tsx) (inclui [header.tsx](file:///c:/LOPES/www/byshop/www/components/layout/header.tsx) e [footer.tsx](file:///c:/LOPES/www/byshop/www/components/layout/footer.tsx))
- Error boundary: [app/error.tsx](file:///c:/LOPES/www/byshop/www/app/error.tsx) (client component)
- Not found: [app/not-found.tsx](file:///c:/LOPES/www/byshop/www/app/not-found.tsx)

## Fluxos principais (estado atual)

### Catálogo → PDP → Carrinho

- Catálogo em `/produtos` usa `products` de [data.ts](file:///c:/LOPES/www/byshop/www/lib/data.ts) e filtra/ordena em client-side ([produtos-client.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/produtos/produtos-client.tsx)).
- PDP em `/produtos/[id]` localiza o produto pelo `id` e renderiza a tela client ([page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/produtos/%5Bid%5D/page.tsx), [detalhe-produto.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/produtos/%5Bid%5D/detalhe-produto.tsx)).
- A ação “Adicionar ao carrinho” grava no Zustand cart store; favoritos também é local/persistida.

### Carrinho → Checkout → Sucesso → Pedido → Tracking

- Carrinho em `/carrinho`:
  - Lê `items` do store persistido e aguarda hidratação antes de renderizar ([carrinho/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/carrinho/page.tsx)).
  - Exibe o resumo calculado por `getSummary()` do store ([cartStore.ts](file:///c:/LOPES/www/byshop/www/stores/cartStore.ts)).
  - Permite aplicar cupom via `CouponBox` ([CouponBox.tsx](file:///c:/LOPES/www/byshop/www/components/CouponBox.tsx)).
- Checkout em `/finalizar-compra`:
  - Valida formulário via Zod + hook [useForm.ts](file:///c:/LOPES/www/byshop/www/hooks/useForm.ts) e schema [CheckoutSchema](file:///c:/LOPES/www/byshop/www/lib/schemas.ts).
  - Em ambiente não-produção, auto-preenche o formulário com dados de teste para acelerar a validação do fluxo.
  - Cria pedido chamando `createOrder` (orders store) e limpa o carrinho ([finalizar-compra/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/finalizar-compra/page.tsx)).
- Sucesso em `/finalizar-compra/sucesso`:
  - Recebe `orderId` via querystring e passa para um client component ([finalizar-compra/sucesso/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/finalizar-compra/sucesso/page.tsx)).
- Pedido em `/pedidos` e `/pedidos/[id]`:
  - Lista e detalhe consultam orders store persistido ([ordersStore.ts](file:///c:/LOPES/www/byshop/www/stores/ordersStore.ts)).
- Tracking em `/rastreamento`:
  - Resolve `orderId` via querystring e renderiza o client component que apresenta timeline/info ([rastreamento/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/rastreamento/page.tsx)).

### Autenticação e `next`

- Auth é mockada no front:
  - Credenciais de teste em [authStore.ts](file:///c:/LOPES/www/byshop/www/stores/authStore.ts)
  - Login simula latência, valida credenciais e grava `user` no store persistido
- Rotas `/conta/*` aceitam `?next=/alguma-rota`:
  - As páginas “server” sanitizam `next` para evitar redirecionamento externo (apenas caminhos internos) ([entrar/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/conta/entrar/page.tsx)).
  - O client component navega para `nextPath` após login ([entrar-client.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/conta/entrar/entrar-client.tsx)).

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
- Observação (React/Next + Zustand): em páginas client, evitar selectors que retornem novos arrays/objetos a cada chamada (ex.: `filter` dentro do selector), pois isso pode causar loop de render/hidratação.

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

#### Header (V1/V2)

- Alternância por build-time env: `NEXT_PUBLIC_HEADER_VARIANT`
  - `v2` → renderiza [HeaderV2](file:///c:/LOPES/www/byshop/www/components/layout/header-v2.tsx)
  - qualquer outro valor/ausente → fallback seguro para [HeaderV1](file:///c:/LOPES/www/byshop/www/components/layout/header-v1.tsx)
- Ponto de seleção (wrapper): [header.tsx](file:///c:/LOPES/www/byshop/www/components/layout/header.tsx)
- Processo detalhado (referência visual → componente Next.js): [mod_design.md](file:///c:/LOPES/www/byshop/.trae/docs/byshop/mod_design.md)
- Comparação de design (vercel vs byshop) + estratégia de upgrade: [upgrad-design.md](file:///c:/LOPES/www/byshop/.trae/docs/byshop/upgrad-design.md)
- Sandbox de desenho (apenas o header do modelo, sem chrome global): `/dev/desenho` ([page.tsx](file:///c:/LOPES/www/byshop/www/app/dev/desenho/page.tsx))
  - Implementação espelha `.trae/docs/design/modelo.html` em Tailwind (foco em estrutura e breakpoints).
  - Logo do modelo via asset estático `/logo.png` (arquivo: `www/public/logo.png`, sincronizado de `.trae/docs/design/logo.png`)
  - Links atuais do modelo: `Ofertas` (`/produtos?sale=1`), `Novidades` (`/produtos?sort=newest`), `Sobre nós` (`/sobre`)
  - Nota: a tentativa de usar esse sandbox como “sistema de desenho” para diferenciar componentes da interface teve uma implementação frágil; precisamos definir uma estratégia nova (slots/contrato + tokens/breakpoints + checklist de UI/UX) antes de evoluir.
  - 2026-05-12: revisão visual do header (top bar + nav) levantou pontos de consistência de tipografia/ícones e breakpoints (ex.: padronizar tamanho dos ícones e targets, reduzir `text-[18px]` para `text-base`, trocar breakpoint `981px` por `lg=1024`, e ajustar `px`/`gap` para escala Tailwind).

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
- Smoke do Header (desktop + mobile):
  - Arquivo: [header-variants-smoke.spec.ts](file:///c:/LOPES/www/byshop/www/tests/e2e/header-variants-smoke.spec.ts)
  - Execução sugerida (PowerShell):
    - V1 (fallback): `Remove-Item Env:\NEXT_PUBLIC_HEADER_VARIANT -ErrorAction SilentlyContinue; npx playwright test tests/e2e/header-variants-smoke.spec.ts`
    - V2: `$env:NEXT_PUBLIC_HEADER_VARIANT="v2"; npx playwright test tests/e2e/header-variants-smoke.spec.ts`
- Especificação E2E principal:
  - Compra como guest cria pedido e valida tracking
- Login respeita `next` e redireciona para `/perfil`
  - ([purchase-journey.spec.ts](file:///c:/LOPES/www/byshop/www/tests/e2e/purchase-journey.spec.ts))

- Status observado ao executar os testes:
  - Falhas anteriores eram relacionadas a seletores por texto/strict mode e mistura de idiomas; os textos e rotas foram migrados para pt-BR e os testes foram ajustados.

## Limites conhecidos (descrição do estado atual)

- Dados e integrações são mockados:
  - Produtos/categorias/depoimentos vêm de arquivo local ([data.ts](file:///c:/LOPES/www/byshop/www/lib/data.ts))
  - Auth e pedidos são persistidos no browser via Zustand persist (sem API real)
- Internacionalização/textos:
  - Objetivo: padronizar UI e URLs para pt-BR (mantendo redirects das rotas antigas).
