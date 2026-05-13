# Header (V2) inspirado no modelo — Spec

## Why
Queremos evoluir o design do Header para uma versão 2 (inspirada no modelo de referência), sem perder nem alterar o Header atual (V1), permitindo alternar entre versões.

## What Changes
- Adicionar um novo componente de Header (V2) mantendo o layout/UX atual como V1.
- Introduzir um seletor de variante (ex.: `NEXT_PUBLIC_HEADER_VARIANT=v1|v2`) com default em V1.
- Reorganizar o `Header` exportado para renderizar V1 ou V2 sem alterar as rotas.
- Garantir paridade funcional entre V1 e V2 (contadores, autenticação, menu mobile e navegação).

## Impact
- Affected specs: navegação global, busca no header, acesso a conta, wishlist, carrinho, responsividade.
- Affected code: `www/components/layout/header.tsx` (ponto de entrada), novos arquivos para V1/V2, possíveis ajustes em `Navigation`/`Logo` se necessário (sem mudança de API pública).

## ADDED Requirements
### Requirement: Seleção de variante do Header
O sistema SHALL permitir escolher a variante do Header via configuração de build (variável pública), com default em V1.

#### Scenario: Default (V1)
- **WHEN** `NEXT_PUBLIC_HEADER_VARIANT` estiver ausente ou inválida
- **THEN** o Header renderizado SHALL ser a versão atual (V1), preservando layout e comportamento.

#### Scenario: V2 habilitado
- **WHEN** `NEXT_PUBLIC_HEADER_VARIANT` for `v2`
- **THEN** o Header renderizado SHALL ser o novo layout (V2).

### Requirement: Layout do Header V2 (inspirado no modelo)
O Header V2 SHALL seguir uma estrutura em 3 faixas (desktop), inspirada no modelo:
- Faixa superior (utilitária): informações rápidas e links auxiliares.
- Faixa principal: logo centralizado e busca.
- Faixa de navegação: menu de categorias e acesso ao carrinho.

#### Scenario: Desktop — composição
- **WHEN** o viewport for desktop
- **THEN** o Header V2 SHALL exibir:
  - Faixa superior com:
    - Telefone/contato (esquerda)
    - Atalhos (direita): idioma/moeda (placeholder) e “Minha conta” (ou equivalente)
  - Faixa principal com:
    - Logo centralizado
    - Busca com input e ícone/botão
  - Faixa de navegação com:
    - Itens de navegação (ex.: `Navigation`) em linha
    - Acesso ao carrinho com contador visível

#### Scenario: Mobile — comportamento
- **WHEN** o viewport for mobile
- **THEN** o Header V2 SHALL:
  - Priorizar logo + ações principais (menu, carrinho, conta)
  - Disponibilizar navegação via menu colapsável (hamburger)
  - Disponibilizar busca de forma acessível (campo no menu ou expansão)

### Requirement: Paridade funcional com o Header atual
O Header V2 SHALL manter a mesma lógica de:
- Contador de itens do carrinho.
- Contador de itens da wishlist.
- Estado de autenticação (mostrar “Entrar” quando deslogado; menu de usuário quando logado).
- Links existentes para wishlist/carrinho/perfil.

## MODIFIED Requirements
### Requirement: Header global existente (V1)
O sistema SHALL manter o Header atual inalterado como “V1”, preservando o layout e o comportamento atuais quando a variante selecionada for V1.

## REMOVED Requirements
N/A

