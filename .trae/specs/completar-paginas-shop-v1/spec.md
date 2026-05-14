# Páginas do Shop (v1) Spec

## Why
As rotas do fluxo de compra em `www/app/(shop)` ainda estão incompletas (placeholder e divergência de nomenclatura). A referência usa o caminho `/finalizar-compra` (não `/checkout`). Precisamos completar o fluxo principal (carrinho → finalizar-compra → sucesso) com rapidez e boa qualidade, mantendo `/ofertas`, `/cartoes-presente` e `/presentes` como estão por enquanto.

## What Changes
- Substituir `PlaceholderPage` por páginas reais nas rotas:
  - `/carrinho`
  - `/finalizar-compra`
  - `/finalizar-compra/sucesso`
- Adotar “store” para estado do carrinho e pedidos (inspirado na referência), sem copiar o visual da referência:
  - Carrinho: itens, quantidade, cupom, resumo e total
  - Pedidos: criação de pedido mockado e consulta para página de sucesso
- Usar dados mockados (expandidos) em `lib/data.ts` para:
  - Seed opcional do carrinho em dev
  - Cupons suportados e regras (percentual e frete grátis)
- Ajustar o fluxo do carrinho global (drawer no AppShell) para navegar corretamente para `/finalizar-compra` ao clicar em “Finalizar compra” (corrige divergência de fluxo/nomenclatura).
- Compatibilidade de nomenclatura: manter `/checkout` como rota de compatibilidade (redirect) para `/finalizar-compra`.
- Manter como placeholder (sem mudanças) nesta etapa:
  - `/ofertas`
  - `/cartoes-presente`
  - `/presentes`

## Impact
- Affected specs: navegação do shop; fluxo de compra; consistência de UI.
- Affected code:
  - `www/app/(shop)/carrinho/page.tsx`
  - `www/app/(shop)/finalizar-compra/page.tsx`
  - `www/app/(shop)/finalizar-compra/sucesso/page.tsx`
  - `www/app/(shop)/checkout/page.tsx` (**compatibilidade/redirect**)
  - `www/components/app-shell.tsx` (fluxo do botão “Finalizar compra” e fechamento do drawer)
  - `www/components/header.tsx` (badge de quantidade no carrinho)
  - `www/app/(shop)/produtos/[id]/page.tsx` (Adicionar ao carrinho deve usar store)
  - `www/lib/data.ts` (mocks adicionais do fluxo)
  - `www/lib/schemas.ts` (schemas/tipos adicionais do fluxo)
  - `.trae/docs/byshop/geral.md`

## ADDED Requirements

### Requirement: Páginas do fluxo de compra (sem placeholder)
O sistema SHALL renderizar páginas reais substituindo `PlaceholderPage` nas rotas do fluxo de compra.

#### Scenario: Carrinho
- **WHEN** o usuário acessa `/carrinho`
- **THEN** vê itens do carrinho (via store) com quantidade e preço
- **AND** pode alterar quantidade e remover item
- **AND** pode aplicar cupom (mock) e ver impacto no resumo
- **AND** vê resumo (subtotal/desconto/frete/total)
- **AND** possui CTA para `/finalizar-compra` e CTA para continuar comprando (`/produtos`)

#### Scenario: Finalizar compra
- **WHEN** o usuário acessa `/finalizar-compra`
- **THEN** vê um resumo do pedido (itens do carrinho via store + total)
- **AND** vê um formulário mockado (endereço/pagamento) com validação (Zod + react-hook-form)
- **AND** ao confirmar, cria um pedido mockado na store de pedidos, limpa o carrinho e navega para `/finalizar-compra/sucesso?orderId=...`
- **AND** possui CTA para voltar ao carrinho (`/carrinho`)

#### Scenario: Sucesso
- **WHEN** o usuário acessa `/finalizar-compra/sucesso`
- **THEN** vê uma confirmação de pedido com dados do pedido (id, total, status mock, tracking mock)
- **AND** possui CTA para continuar comprando (`/produtos`)
- **AND** possui CTA para “Meus pedidos” (rota existente, mesmo que ainda seja placeholder)

### Requirement: Store do carrinho e pedidos (sem dependências novas)
O sistema SHALL ter um “store” de carrinho e um “store” de pedidos para suportar o fluxo, sem adicionar dependência nova (ex.: Zustand) nesta etapa.

#### Scenario: Persistência
- **WHEN** o usuário recarrega a página
- **THEN** o carrinho e pedidos persistem (localStorage)

#### Scenario: Badge do carrinho
- **WHEN** o usuário adiciona/remove/altera quantidade de itens
- **THEN** o badge do ícone do carrinho no Header reflete a quantidade total

#### Scenario: Seed em desenvolvimento
- **WHEN** o ambiente é desenvolvimento e o carrinho está vazio
- **THEN** o sistema pode “seedar” itens mockados uma única vez para acelerar validação visual (config/flag simples)

### Requirement: Fluxo do AppShell consistente com rotas reais
O sistema SHALL alinhar a navegação do carrinho global (drawer) ao fluxo do app.

#### Scenario: Botão “Finalizar compra” no carrinho global
- **WHEN** o usuário clica em “Finalizar compra” no drawer do carrinho
- **THEN** navega para `/finalizar-compra`
- **AND** o drawer é fechado para não competir com o conteúdo da página

### Requirement: Compatibilidade de nomenclatura (checkout vs finalizar-compra)
O sistema SHALL lidar com divergências de nomenclatura vindas da referência, mantendo compatibilidade de rota.

#### Scenario: Rota `/checkout`
- **WHEN** o usuário acessa `/checkout`
- **THEN** é redirecionado para `/finalizar-compra`

### Requirement: Consistência visual e de layout
O sistema SHALL manter consistência visual com o design atual do app (tipografia, espaçamento, cores, componentes shadcn).

#### Scenario: Layout global
- **WHEN** o usuário navega para essas páginas
- **THEN** Top Bar + Header + Footer permanecem globais (AppShell)
- **AND** as páginas não importam/renderizam `Header`/`Footer` diretamente

## MODIFIED Requirements
N/A

## REMOVED Requirements
N/A

## Notas e suposições
- Referência analisada em `C:\LOPES\www\byshop\referencia\2026-05-13\www\app\(shop)`: a rota equivalente a checkout na referência é `/finalizar-compra` e existe também `/finalizar-compra/sucesso`.
- Finalizar compra é mockado (sem processamento real de pagamento/pedido) e serve para validar layout e navegação.
- IMPORTANTE: o visual deve seguir o padrão do projeto atual (ByShop em `www/`), não o da referência.
