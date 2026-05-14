# Páginas Institucionais (v1) Spec

## Why
As rotas em `app/(institucional)` (exceto `/sobre`) ainda estão como placeholder. Precisamos transformá-las em páginas reais para validar o padrão institucional com o design atual do ByShop, mantendo velocidade sem perder qualidade.

## What Changes
- Substituir `PlaceholderPage` pelas páginas reais:
  - `/central-de-ajuda`
  - `/frete-e-entrega`
  - `/trocas-e-devolucoes`
  - `/termos`
  - `/privacidade`
- Criar um componente base reutilizável para páginas institucionais (Hero + seções + FAQ + CTAs), para acelerar a criação mantendo consistência visual.
- Conteúdo em pt-BR, com linguagem clara e útil (sem ser “lorem ipsum”).

## Impact
- Affected specs: páginas institucionais; consistência de UI; navegação.
- Affected code:
  - `www/app/(institucional)/*/page.tsx`
  - `www/components/` (novo componente base institucional)
  - `.trae/docs/byshop/geral.md` (registrar avanço e remover da lista de placeholders)

## ADDED Requirements

### Requirement: Páginas institucionais reais (sem placeholder)
O sistema SHALL renderizar páginas institucionais reais (conteúdo estático), substituindo o uso de `PlaceholderPage` nas rotas listadas.

#### Scenario: Central de ajuda
- **WHEN** o usuário acessa `/central-de-ajuda`
- **THEN** vê uma página com tópicos de ajuda + FAQ
- **AND** possui CTAs para `/trocas-e-devolucoes`, `/frete-e-entrega`, `/privacidade` e `/termos`

#### Scenario: Frete e entrega
- **WHEN** o usuário acessa `/frete-e-entrega`
- **THEN** vê uma página com política/prazos + rastreio + dúvidas frequentes
- **AND** possui CTAs para `/central-de-ajuda` e `/produtos`

#### Scenario: Trocas e devoluções
- **WHEN** o usuário acessa `/trocas-e-devolucoes`
- **THEN** vê uma política clara (prazos, condições, passos do processo, reembolso)
- **AND** possui CTAs para `/central-de-ajuda` e `/produtos`

#### Scenario: Termos de uso
- **WHEN** o usuário acessa `/termos`
- **THEN** vê seções de termos (uso do site, pedidos, pagamentos, responsabilidade)
- **AND** possui CTA para `/privacidade` e `/central-de-ajuda`

#### Scenario: Política de privacidade
- **WHEN** o usuário acessa `/privacidade`
- **THEN** vê seções de privacidade (dados coletados, finalidade, cookies, direitos)
- **AND** possui CTA para `/termos` e `/central-de-ajuda`

### Requirement: Consistência visual e de layout
O sistema SHALL manter consistência visual com o design atual do app (tipografia, espaçamento, cores).

#### Scenario: Layout global
- **WHEN** o usuário navega entre páginas institucionais e o restante do app
- **THEN** Top Bar + Header + Footer permanecem globais (AppShell)
- **AND** as páginas institucionais não importam/renderizam `Header`/`Footer` diretamente

### Requirement: Implementação dinâmica com qualidade
O sistema SHALL usar um componente base para reduzir duplicação entre páginas institucionais, sem perder clareza do conteúdo e qualidade visual.

## MODIFIED Requirements
N/A

## REMOVED Requirements
### Requirement: Placeholders em páginas institucionais
**Reason**: validar o padrão institucional com páginas reais.
**Migration**: substituir `PlaceholderPage` por conteúdo real nos respectivos `page.tsx`.

## Notas e suposições
- “Referência” textual completa não está presente no workspace atual; o conteúdo será elaborado como “políticas/modelo” coerentes e poderá ser substituído depois por texto oficial sem mudar a estrutura.

