# Plano — Análise completa do projeto (/www)

## Resumo

Gerar um documento de **análise descritiva (estado atual)** do projeto localizado em `c:\LOPES\www\byshop\www`, e salvar em `.trae/docs/byshop/geral.md`.

O documento será voltado para **uso geral (dev + produto + operações)**, cobrindo stack, estrutura, rotas/fluxos, dados/estado, UI, e testes — sem recomendações ou backlog de melhorias.

## Estado atual (evidências do repositório)

### Stack e dependências principais

- Next.js (App Router) e React
  - `next@15.4.4`, `react@19.1.0`, `react-dom@19.1.0` ([package.json](file:///c:/LOPES/www/byshop/www/package.json))
- Tailwind CSS v4 + tw-animate-css
  - Tailwind carregado via `@import "tailwindcss";` e tokens via `@theme inline` ([globals.css](file:///c:/LOPES/www/byshop/www/app/globals.css))
- shadcn/ui (estilo `new-york`) + Radix UI
  - Config do shadcn em [components.json](file:///c:/LOPES/www/byshop/www/components.json)
  - Componentes UI em `components/ui/*`
- Estado client-side com Zustand (+ persist)
  - Stores em `stores/*` (ex.: auth/cart/orders/wishlist)
- Validação e tipos com Zod
  - Schemas em [schemas.ts](file:///c:/LOPES/www/byshop/www/lib/schemas.ts)
- Testes E2E com Playwright
  - Spec em [purchase-journey.spec.ts](file:///c:/LOPES/www/byshop/www/tests/e2e/purchase-journey.spec.ts)

### Organização do app (alto nível)

- App Router em `www/app/*` com rotas para: home, produtos, carrinho, checkout, pedidos, tracking, auth, páginas institucionais (about/contact/faq/terms/privacy/shipping/returns/blog etc.).
- Layout global em [layout.tsx](file:///c:/LOPES/www/byshop/www/app/layout.tsx) com `Navbar` e `Footer`.
- Dados “mock” no frontend em [data.ts](file:///c:/LOPES/www/byshop/www/lib/data.ts) (produtos, categorias e depoimentos), tipados/validados por Zod.

### Observações funcionais (estado atual)

- Autenticação é “mockada” via `authStore` (usuário demo) com persistência local ([authStore.ts](file:///c:/LOPES/www/byshop/www/stores/authStore.ts)).
- Checkout cria pedidos em store persistida (sem backend), gera tracking “mockado” e redireciona para tela de sucesso ([ordersStore.ts](file:///c:/LOPES/www/byshop/www/stores/ordersStore.ts), [checkout/page.tsx](file:///c:/LOPES/www/byshop/www/app/checkout/page.tsx)).
- O fluxo E2E valida compra como “guest”, criação de pedido e tracking; e valida o parâmetro `next` no login ([purchase-journey.spec.ts](file:///c:/LOPES/www/byshop/www/tests/e2e/purchase-journey.spec.ts)).

## Mudanças propostas (o que será produzido)

### 1) Criar o documento `.trae/docs/byshop/geral.md`

Criar um Markdown com seções fixas e conteúdo totalmente descritivo, com links para os arquivos relevantes.

Estrutura sugerida do documento:

1. **Contexto e objetivo do projeto**
2. **Stack e dependências**
3. **Como rodar o projeto (dev/build/lint/testes)**
4. **Estrutura de pastas (foco em `www/`)**
5. **Rotas e páginas (mapa do App Router)**
   - tabela: rota → arquivo → tipo (server/client) → resumo
6. **Fluxos principais**
   - navegação catálogo → produto → carrinho → checkout → sucesso → pedido → tracking
   - auth (signin/signup/forgot) e comportamento do `next`
7. **Dados e domínio (schemas e mocks)**
   - `Product`, `CartItem`, `Order`, `User`, cupons e regras de totals
8. **Estado e persistência (Zustand)**
   - auth/cart/orders/wishlist: shape, responsabilidades e como interagem
9. **UI e componentes**
   - layout (navbar/footer), seções da home, shadcn/ui e padrões de composição
10. **Testes**
   - Playwright, escopo do E2E e o que cobre
11. **Limites conhecidos do estado atual (descritivo)**
   - ex.: mocks, ausência de API/back-end real, persistência local

### 2) Ajustar (se necessário) a navegação/índice de docs do `.trae/docs/`

Se existir um índice/README dentro de `.trae/docs/`, adicionar um link para `byshop/geral.md`. (Somente se já houver padrão de “índice” na pasta.)

## Decisões e premissas (fechadas)

- O documento é **geral e completo** (dev + produto + operações).
- O conteúdo será **apenas descritivo**, sem sugestões de melhorias.
- O foco é o projeto em `c:\LOPES\www\byshop\www` (não cobrir outras pastas fora do app).
- Links no documento usarão caminhos do repositório para facilitar navegação no IDE.

## Como validar (após executar)

- Verificar se `.trae/docs/byshop/geral.md` existe e renderiza como Markdown (títulos, tabela e links).
- Conferir que o “mapa de rotas” cobre todas as rotas em `www/app/*`.
- Rodar checks básicos do projeto:
  - `npm run lint`
  - `npm run build`
  - `npx playwright test`

