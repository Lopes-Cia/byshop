# Página “Sobre” (Institucional) Spec

## Why
Hoje a rota `/sobre` existe apenas como placeholder. Precisamos criar a página real para validar o padrão de páginas institucionais usando o design atual do ByShop.

## What Changes
- Substituir o placeholder de `app/(institucional)/sobre/page.tsx` por uma página institucional completa “Sobre a ByShop”.
- Usar apenas estilos e componentes já presentes no projeto (Tailwind/shadcn/ui) e manter o AppShell (Top Bar + Header + Footer) como layout global.
- Conteúdo textual em pt-BR, consistente com o restante do app.

## Impact
- Affected specs: páginas institucionais; navegação/SEO (metadata já global no layout).
- Affected code:
  - `www/app/(institucional)/sobre/page.tsx`
  - (opcional) componentes utilitários já existentes em `www/components/ui/*` se necessário, sem criar dependências novas.

## ADDED Requirements

### Requirement: Página institucional /sobre
O sistema SHALL exibir uma página “Sobre a ByShop” na rota `/sobre`, com conteúdo institucional estático, seguindo o design atual.

#### Scenario: Renderização padrão
- **WHEN** o usuário acessa `/sobre`
- **THEN** a página mostra um título “Sobre a ByShop”
- **AND** contém seções institucionais estáticas (ex.: missão/visão/valores e como funciona)
- **AND** possui CTAs para continuar navegação (ex.: “Ver produtos” → `/produtos`, “Central de ajuda” → `/central-de-ajuda`)
- **AND** não importa/renderiza `Header`/`Footer` diretamente (pois o AppShell é global)

#### Scenario: Consistência visual
- **WHEN** o usuário navega entre `/` → `/sobre` → `/produtos`
- **THEN** Top Bar + Header + Footer permanecem consistentes (AppShell)
- **AND** a página “Sobre” usa a mesma linguagem visual do app (cores/spacing/tipografia)

## MODIFIED Requirements
N/A

## REMOVED Requirements
### Requirement: Placeholder “Sobre a ByShop”
**Reason**: a rota deve ser uma página real para validar o padrão de institucionais.
**Migration**: substituir o conteúdo do `PlaceholderPage` por layout e conteúdo completos na mesma rota.

## Notas e suposições
- “Referência” não está disponível no workspace atual (não há snapshot em `referencia/` além do `.gitignore`). A implementação seguirá o design atual e o padrão institucional proposto; caso você traga o texto exato da referência, ele pode substituir o conteúdo estático sem mudar a estrutura.

