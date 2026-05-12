# Tradução pt-BR + URLs pt-BR (App Router) — Spec

## Why

O app está com mistura de textos e rotas em inglês, o que prejudica consistência de UX e comunicação para público pt-BR.

## What Changes

- Traduzir para pt-BR todos os textos visíveis nas páginas sob `app/(institucional)`, `app/(loja)`, `app/(shop)`, `app/(usuario)` e também qualquer componente compartilhado cujo texto apareça nessas páginas.
- Renomear os segmentos de rota (pastas) para slugs pt-BR, alterando as URLs públicas para pt-BR.
- Adicionar redirects permanentes das URLs antigas (inglês) para as novas (pt-BR) para evitar links quebrados.
- Atualizar links internos (`href`, `router.push/replace`, etc.) para apontar para as novas URLs pt-BR.
- Atualizar testes Playwright E2E para os novos caminhos e textos.
- Atualizar documentação de mapa de rotas em `.trae/docs/byshop/geral.md`.

## Impact

- Affected specs: navegação, auth, checkout, rastreamento, páginas institucionais, testes E2E.
- Affected code: `www/app/**`, componentes de layout e navegação (Header/Navigation/Footer), `www/next.config.ts`, `www/tests/e2e/purchase-journey.spec.ts`, `.trae/docs/byshop/geral.md`.

## ADDED Requirements

### Requirement: URLs em pt-BR com redirects

O sistema SHALL expor URLs canônicas em pt-BR e SHALL redirecionar permanentemente URLs antigas para as novas.

#### Scenario: Acessar URL antiga (inglês)
- **WHEN** usuário acessa uma URL antiga (ex.: `/products`, `/cart`, `/auth/signin`)
- **THEN** o sistema responde com redirect permanente para a URL pt-BR correspondente

### Requirement: UI 100% pt-BR nas páginas alvo

O sistema SHALL exibir textos (títulos, botões, labels, placeholders, mensagens e headings) em pt-BR nas páginas alvo, incluindo textos vindos de componentes compartilhados renderizados nelas.

#### Scenario: Navegação principal
- **WHEN** usuário navega pela home, catálogo, carrinho, checkout e login
- **THEN** todos os textos visíveis relevantes nesses fluxos aparecem em pt-BR

## MODIFIED Requirements

### Requirement: Slugs de rotas (mapeamento)

As rotas abaixo SHALL ser renomeadas para os seguintes slugs pt-BR:

**Institucional**
- `/about` → `/sobre`
- `/faq` → `/perguntas-frequentes`
- `/privacy` → `/privacidade`
- `/returns` → `/trocas-e-devolucoes`
- `/shipping` → `/entrega`
- `/terms` → `/termos-de-uso`

**Loja**
- `/contact` → `/contato`
- `/blog` → `/blog` (mantém)
- `/` → `/` (mantém)

**Shop**
- `/products` → `/produtos`
- `/products/[id]` → `/produtos/[id]`
- `/cart` → `/carrinho`
- `/checkout` → `/finalizar-compra`
- `/checkout/success` → `/finalizar-compra/sucesso`
- `/tracking` → `/rastreamento`

**Usuário**
- `/auth/signin` → `/conta/entrar`
- `/auth/signup` → `/conta/cadastrar`
- `/auth/forgot-password` → `/conta/recuperar-senha`
- `/orders` → `/pedidos`
- `/orders/[id]` → `/pedidos/[id]`
- `/profile` → `/perfil`
- `/wishlist` → `/favoritos`

Notas:
- Arquivos especiais do Next (ex.: `page.tsx`, `layout.tsx`, `error.tsx`) SHALL manter seus nomes, pois fazem parte do contrato do App Router.
- Querystrings (ex.: `?orderId=` e filtros do catálogo) permanecem como estão, exceto se necessário para consistência de UX.

## REMOVED Requirements

### Requirement: URLs canônicas em inglês
**Reason**: padronização para pt-BR.
**Migration**: redirects permanentes das URLs antigas para as novas.

