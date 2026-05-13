# ByShop — Documentação (novo ciclo)

## Objetivo
- Recomeçar a documentação do projeto sem referências legadas.
- Registrar decisões e estado atual a partir deste ponto.

## Estrutura
- `www/`: app principal (importado do projeto `C:\LOPES\www\vercel`).
- `referencia/`: snapshots do estado anterior (código + `.trae`).

## Andamento
- 2026-05-13: importado `C:\LOPES\www\vercel` para `C:\LOPES\www\byshop\www` (cópia limpa: sem `.next/`, sem `node_modules/`, sem `.git/`).
  - Snapshot do estado anterior: `C:\LOPES\www\byshop\referencia\2026-05-13\`
- 2026-05-13: migração do “contexto básico” para o padrão ByShop (pt-BR + rotas + mocks)
  - Rotas principais (App Router + route groups):
    - `/` → `app/(loja)/(inicio)/page.tsx`
    - `/produtos` → `app/(shop)/produtos/page.tsx`
    - `/produtos/[id]` → `app/(shop)/produtos/[id]/page.tsx`
  - Mocks centralizados:
    - Contratos: `www/lib/schemas.ts` (Zod)
    - Dataset: `www/lib/data.ts` (`products`, `categories`, `allSearchData`, `cartItemsMock`, `customerReviewsMock`)
  - Placeholders (páginas “Em construção”) para evitar dead-ends:
    - Shop: `/carrinho`, `/checkout`, `/ofertas`, `/cartoes-presente`, `/presentes`
    - Usuário: `/minha-conta`, `/meus-pedidos`, `/lista-de-desejos`, `/minhas-avaliacoes`, `/metodos-de-pagamento`, `/enderecos`
    - Institucional: `/sobre`, `/central-de-ajuda`, `/frete-e-entrega`, `/trocas-e-devolucoes`, `/termos`, `/privacidade`
  - Notas:
    - O `www/README.md` foi mantido como referência do template importado e pode conter caminhos/rotas antigas (ex.: `/product/[id]`).
- 2026-05-13: AppShell global (layout único para todas as páginas)
  - `app/layout.tsx` passou a envolver todas as rotas com `AppShell`
  - `AppShell` centraliza: Top Bar + Header + Footer + overlays globais (busca/carrinho/menu mobile)
  - Home e PDP deixaram de importar/renderizar `Header`/`Footer` e removeram estados/JSX duplicados
  - PDP abre o carrinho via `useAppShell().openCart()` (ação global do shell)

## Referências importantes
- README do app importado (fonte de verdade do design system e convenções): [README.md](file:///c:/LOPES/www/byshop/www/README.md)

## Decisões atuais (placeholder)
- (vazio)

## Próximas decisões (placeholder)
- (vazio)
