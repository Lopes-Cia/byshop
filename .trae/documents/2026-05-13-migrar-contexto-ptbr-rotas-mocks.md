# Plano — Migrar contexto básico (pt-BR + rotas ByShop + mocks)

## Resumo
Objetivo: adaptar o app importado de `C:\LOPES\www\vercel` (hoje em `C:\LOPES\www\byshop\www`) para o **padrão ByShop**:
- nomenclatura em pt-BR,
- rotas e route groups no estilo antigo do ByShop (`(loja)`, `(shop)`, `(usuario)`, `(institucional)`),
- mocks centralizados (produto/categorias/etc) no estilo antigo,
- sem criar todas as páginas agora (as páginas adicionais serão criadas “uma a uma” em um próximo passo).

Escopo desta fase (decidido):
- **Padrão antigo de route groups**.
- **Dados mockados do ByShop antigo**, porém **somente mocks agora** (sem reintroduzir stores/fluxos ainda).

## Análise do estado atual (confirmado no disco)
Estrutura do app (`C:\LOPES\www\byshop\www`):
- Rotas atuais do template importado:
  - Home: [app/page.tsx](file:///c:/LOPES/www/byshop/www/app/page.tsx)
  - Produto: [app/product/[id]/page.tsx](file:///c:/LOPES/www/byshop/www/app/product/%5Bid%5D/page.tsx)
- Layout:
  - [app/layout.tsx](file:///c:/LOPES/www/byshop/www/app/layout.tsx) ainda está com `lang="en"` e metadata em inglês.
- Tokens:
  - [app/globals.css](file:///c:/LOPES/www/byshop/www/app/globals.css) já está no padrão Tailwind v4 + tokens semânticos (OKLCH, `@theme inline`).
- Componentes principais:
  - Header: [components/header.tsx](file:///c:/LOPES/www/byshop/www/components/header.tsx) (texto/links ainda em inglês, e links para `product/*`).
  - Cards: [components/product-card.tsx](file:///c:/LOPES/www/byshop/www/components/product-card.tsx) (linka para rota atual de produto).
- `lib/` atual:
  - apenas [lib/utils.ts](file:///c:/LOPES/www/byshop/www/lib/utils.ts). Não existe módulo central de mocks.

## Mudanças propostas

### 1) Reestruturar rotas para o padrão ByShop (route groups + pt-BR)
**Objetivo:** manter o padrão antigo sem “inventar” páginas além do mínimo necessário.

**Ações:**
- Criar route groups-alvo (mesmo que vazios no começo):
  - `app/(loja)/(inicio)/` para a Home
  - `app/(shop)/produtos/` para catálogo e PDP
  - `app/(usuario)/` (placeholder para futuro)
  - `app/(institucional)/` (placeholder para futuro)
- Mover/transformar rotas existentes do template importado:
  - `app/page.tsx` → `app/(loja)/(inicio)/page.tsx` (mantém URL `/`)
  - `app/product/[id]/page.tsx` → `app/(shop)/produtos/[id]/page.tsx` (URL vira `/produtos/[id]`)
- Criar o mínimo necessário para compatibilidade com navegação em pt-BR:
  - `app/(shop)/produtos/page.tsx` (catálogo simples com mocks, sem filtros avançados por enquanto)
- Remover a rota antiga `app/product/*` e quaisquer links para `/product/*` no código.

**Arquivos impactados (principais):**
- `www/app/page.tsx` (movido)
- `www/app/product/[id]/page.tsx` (movido)
- `www/app/(shop)/produtos/page.tsx` (novo)
- `www/components/header.tsx` (atualizar links/labels)
- `www/components/product-card.tsx` (atualizar link base)

### 2) Centralizar mocks no estilo ByShop (sem stores nesta fase)
**Objetivo:** tirar objetos/arrays hardcoded de dentro das páginas e padronizar o “shape” do domínio (mocks).

**Ações:**
- Criar `www/lib/schemas.ts` (Zod) com um contrato mínimo de domínio:
  - `ProductSchema` + `Product` (id, name, category, price, images, rating etc.)
  - contratos auxiliares somente se forem necessários para Home/PDP agora (evitar escopo de carrinho/pedido nesta fase).
- Criar `www/lib/data.ts` exportando:
  - `products: Product[]` (mock principal)
  - `categories` (se necessário para Home)
  - `searchData`/`suggestions` (se necessário para search modal)
- Atualizar páginas para consumirem `lib/data.ts`:
  - Home: remover “listas” internas e usar `products/categories/searchData` via import.
  - PDP: carregar produto por `params.id` a partir de `products`.

**Arquivos impactados (principais):**
- `www/lib/schemas.ts` (novo)
- `www/lib/data.ts` (novo)
- `www/app/(loja)/(inicio)/page.tsx`
- `www/app/(shop)/produtos/[id]/page.tsx`
- `www/app/(shop)/produtos/page.tsx`

### 3) Nomenclatura pt-BR (UI + metadados)
**Objetivo:** garantir pt-BR no “contexto básico” do produto, sem refazer todas as páginas.

**Ações:**
- Ajustar `app/layout.tsx`:
  - `lang="pt-BR"`
  - metadata (`title/description`) em pt-BR (ByShop)
  - remover `className="bg-white"` do `<html>` e alinhar com tokens (`bg-background` via CSS base já existe)
- Ajustar `components/header.tsx`:
  - labels em português (ex.: “Categorias”, “Ofertas”, “Cartões-presente”…)
  - links principais apontando para rotas pt-BR existentes (nesta fase: `/` e `/produtos`)
  - manter itens sem rota real como placeholders sem quebrar navegação (ex.: `href="#"` ou remover do header por enquanto, decisão no passo de implementação)

## Assunções e decisões
- Nesta fase, não vamos criar o conjunto completo de páginas do ByShop (conta, carrinho, checkout, institucionais). Apenas estrutura (pastas) e o mínimo de rotas funcionais.
- “Dados mockados do ByShop antigo” serão reintroduzidos como **módulos `lib/schemas.ts` + `lib/data.ts`** (contrato + dataset) sem Zustand/stores por enquanto.
- Não adicionar dependências novas: vamos usar somente o que já existe no `package.json` atual (`zod` já está presente).

## Atualização de documentação (obrigatório)
Atualizar [geral.md](file:///c:/LOPES/www/byshop/.trae/docs/byshop/geral.md) para registrar:
- migração de rotas para pt-BR e route groups,
- criação de `lib/schemas.ts` + `lib/data.ts`,
- páginas que existem agora (Home, Catálogo, PDP) e quais ficam para o próximo passo.

## Verificação (após implementar)
- Rodar o app em dev e validar rotas:
  - `/` carrega normalmente.
  - `/produtos` carrega catálogo mock.
  - `/produtos/1` (ou id existente) carrega PDP.
  - `/product/*` deixa de existir.
- Conferir que não há imports quebrados após mover arquivos.
- Verificar `npm run lint` no diretório `C:\LOPES\www\byshop\www`.
