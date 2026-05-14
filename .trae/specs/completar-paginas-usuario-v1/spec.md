# Páginas do Usuário (v1) Spec

## Why
As rotas de conta do usuário em `www/app/(usuario)` ainda estão em placeholder e faltam páginas de autenticação. Precisamos completar o fluxo de conta (entrar/cadastrar/recuperar senha + área logada) com consistência visual do ByShop, usando a referência para rotas e comportamento (principalmente query `next`).

## What Changes
- Substituir `PaginaEmConstrucao` por páginas reais em `www/app/(usuario)`:
  - `/minha-conta`
  - `/meus-pedidos`
  - `/enderecos`
  - `/metodos-de-pagamento`
  - `/lista-de-desejos`
  - `/minhas-avaliacoes`
- Adicionar páginas de autenticação (conforme referência):
  - `/conta/entrar` (com `next` seguro)
  - `/conta/cadastrar` (com `next` seguro)
  - `/conta/recuperar-senha` (com `next` seguro)
- Implementar stores client com persistência (sem dependência nova) para:
  - Auth (usuário logado + login/signup/logout mockados)
  - Wishlist (lista de desejos)
  - Endereços (CRUD básico)
  - Métodos de pagamento (CRUD básico, dados mascarados)
- Compatibilidade de nomenclatura com a referência:
  - `/perfil` → redireciona para `/minha-conta`
  - `/favoritos` → redireciona para `/lista-de-desejos`
- Reutilizar dados já existentes do shop:
  - `/meus-pedidos` usa `orders-store` (pedidos criados pelo checkout) e filtra por `customerEmail` quando houver usuário logado.

## Impact
- Affected specs: autenticação mock; área do usuário; wishlist; navegação por `next`.
- Affected code (principal):
  - `www/app/(usuario)/*/page.tsx` (substituir placeholders por páginas reais)
  - `www/app/(usuario)/conta/*` (novas rotas)
  - `www/app/(usuario)/perfil/page.tsx` (redirect compat)
  - `www/app/(usuario)/favoritos/page.tsx` (redirect compat)
  - `www/stores/auth-store.ts` (**novo**)
  - `www/stores/wishlist-store.ts` (**novo**)
  - `www/stores/addresses-store.ts` (**novo**)
  - `www/stores/payment-methods-store.ts` (**novo**)
  - `www/components/*` (somente se precisar de componentes compartilhados de “Conta”)

## ADDED Requirements

### Requirement: Autenticação mock (rotas /conta/*)
O sistema SHALL fornecer as páginas de autenticação mockadas (sem backend), com persistência local e suporte ao `next` (redirect pós-login).

#### Scenario: Entrar com next seguro
- **WHEN** o usuário acessa `/conta/entrar?next=/meus-pedidos`
- **THEN** o sistema valida `next` (somente caminhos relativos iniciando com `/` e não `//`)
- **AND** após login, navega para o `next` validado

#### Scenario: Credenciais de teste em DEV
- **WHEN** o ambiente é desenvolvimento
- **THEN** a tela de entrar pode exibir/preencher credenciais de teste para acelerar validação

#### Scenario: Cadastrar
- **WHEN** o usuário acessa `/conta/cadastrar`
- **THEN** consegue criar uma conta mock (nome/sobrenome/email/senha)
- **AND** após cadastrar, navega para `next` (se existir e for seguro)

#### Scenario: Recuperar senha
- **WHEN** o usuário acessa `/conta/recuperar-senha`
- **THEN** consegue submeter e-mail e ver estado de confirmação (mock)
- **AND** consegue voltar para `/conta/entrar` preservando `next` (se existir e for seguro)

### Requirement: Área do usuário (páginas reais)
O sistema SHALL substituir placeholders por páginas reais para a área do usuário, mantendo o design atual do ByShop.

#### Scenario: Minha conta
- **WHEN** o usuário acessa `/minha-conta`
- **THEN** vê um “dashboard” simples com dados do usuário (quando logado) e atalhos para as demais rotas do grupo
- **AND** se não estiver logado, vê CTAs para `/conta/entrar` e `/conta/cadastrar` (com `next=/minha-conta`)

#### Scenario: Meus pedidos (integrado ao checkout)
- **WHEN** o usuário acessa `/meus-pedidos`
- **THEN** vê lista de pedidos do `orders-store`
- **AND** se estiver logado, filtra por `customerEmail === user.email` (fallback: mostra todos os pedidos locais)
- **AND** cada item deve linkar para `/finalizar-compra/sucesso?orderId=...` (detalhe do pedido)

#### Scenario: Lista de desejos
- **WHEN** o usuário acessa `/lista-de-desejos`
- **THEN** vê itens da wishlist e consegue remover/limpar
- **AND** os itens persistem em `localStorage`

#### Scenario: Endereços e Métodos de pagamento
- **WHEN** o usuário acessa `/enderecos` ou `/metodos-de-pagamento`
- **THEN** consegue criar/editar/remover registros mockados e persistidos

#### Scenario: Minhas avaliações
- **WHEN** o usuário acessa `/minhas-avaliacoes`
- **THEN** vê uma lista mockada (pode usar dados locais existentes) e estado vazio quando não houver avaliações

### Requirement: Stores sem regressões (lições do shop)
O sistema SHALL evitar regressões já vistas no fluxo do shop.

#### Scenario: useSyncExternalStore sem loop
- **WHEN** o store for implementado com `useSyncExternalStore`
- **THEN** `getSnapshot` e `getServerSnapshot` devem ser cacheados quando o estado não muda

#### Scenario: Ações de navegação devem linkar rotas
- **WHEN** existir ação “Ver X” / “Ir para X”
- **THEN** deve usar `Link` para rota correspondente (não `button` sem navegação)

### Requirement: Compatibilidade de nomenclatura
O sistema SHALL suportar rotas equivalentes encontradas na referência.

#### Scenario: Perfil
- **WHEN** o usuário acessa `/perfil`
- **THEN** é redirecionado para `/minha-conta`

#### Scenario: Favoritos
- **WHEN** o usuário acessa `/favoritos`
- **THEN** é redirecionado para `/lista-de-desejos`

## MODIFIED Requirements
N/A

## REMOVED Requirements
N/A

## Notas e suposições
- Referência analisada em `C:\LOPES\www\byshop\referencia\2026-05-13\www\app\(usuario)` (rotas `/conta/entrar`, `/conta/cadastrar`, `/conta/recuperar-senha`) e `stores/authStore.ts`.
- IMPORTANTE: manter o visual do projeto atual (ByShop em `www/`), não o visual da referência.
- Implementação é mockada (sem backend); foco é navegação, persistência e UX consistente.

