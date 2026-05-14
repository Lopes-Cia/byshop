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
    - Shop: `/ofertas`, `/cartoes-presente`, `/presentes`
    - Usuário: (nenhum — implementadas em 2026-05-14)
  - Notas:
    - O `www/README.md` foi mantido como referência do template importado e pode conter caminhos/rotas antigas (ex.: `/product/[id]`).
- 2026-05-13: AppShell global (layout único para todas as páginas)
  - `app/layout.tsx` passou a envolver todas as rotas com `AppShell`
  - `AppShell` centraliza: Top Bar + Header + Footer + overlays globais (busca/carrinho/menu mobile)
  - Home e PDP deixaram de importar/renderizar `Header`/`Footer` e removeram estados/JSX duplicados
  - PDP abre o carrinho via `useAppShell().openCart()` (ação global do shell)
- 2026-05-13: Página institucional `/sobre` (conteúdo real)
  - Hero institucional + seções: proposta, valores, como funciona, compromissos
  - CTAs: `/produtos` e `/central-de-ajuda`
- 2026-05-13: Páginas institucionais (conteúdo real)
  - Rotas: `/central-de-ajuda`, `/frete-e-entrega`, `/trocas-e-devolucoes`, `/termos`, `/privacidade`
  - Padronização: componente base reutilizável para acelerar criação com consistência visual
- 2026-05-13: Task 1 (estado global + cupons)
  - Stores client (persistência via `useSyncExternalStore` + `localStorage`):
    - `www/stores/cart-store.ts` (itens, cupom, totais derivados)
    - `www/stores/orders-store.ts` (criação e persistência de pedidos)
  - Schemas Zod centralizados em `www/lib/schemas.ts` (com re-export em `www/lib/data.ts` para compatibilidade)
  - Cupons ativos: `SAVE10`, `SAVE20`, `FREESHIP`
  - Totais agora incluem `shipping` (frete) e `tax` (imposto), mantendo leitura de dados persistidos antigos
- 2026-05-13: Task 2 (carrinho real no Header/AppShell/PDP + rota de checkout)
  - `removeItem`/`setQuantity` agora aceitam `id` + `variant` opcional (quando omitido, aplica para todas as variações do mesmo `id`)
  - Header: badge do carrinho usa `count` do store
  - AppShell: drawer do carrinho usa itens/totais do store e ações (alterar quantidade, remover, limpar)
  - CTAs: navegação de checkout padronizada em `/finalizar-compra`
  - PDP: “Adicionar ao Carrinho” adiciona item no store e abre o drawer; “Comprar Agora” adiciona e navega para `/finalizar-compra`
- 2026-05-13: Task 3 (página real de carrinho)
  - Rota `/carrinho`: página client usando `useCartStore` (itens, quantidade, remover, cupom)
  - Resumo: subtotal, desconto, frete, taxas e total derivados do store
  - CTAs: `/finalizar-compra` e `/produtos`
- 2026-05-13: Task 6 (rota legada de checkout + remoção de placeholder)
  - `/checkout` agora redireciona (server) para `/finalizar-compra` via `redirect()` do `next/navigation`
  - `PlaceholderPage` foi removido; placeholders restantes usam `PaginaEmConstrucao` (`www/components/pagina-em-construcao.tsx`)
- 2026-05-13: Task 4 (checkout real)
  - Rota `/finalizar-compra`: formulário mock com validação (`react-hook-form` + `zodResolver`) e resumo do carrinho
  - CTA “Confirmar pedido”: cria pedido na store, limpa carrinho e navega para `/finalizar-compra/sucesso?orderId=...`
  - Link “Voltar ao carrinho”: `/carrinho`
- 2026-05-13: Task 5 (sucesso do checkout)
  - Rota `/finalizar-compra/sucesso`: lê `orderId` e carrega pedido da store (fallback: último pedido criado)
  - Exibe confirmação (id, total, status e tracking mock) e CTAs para `/produtos` e `/meus-pedidos`
- 2026-05-14: Páginas do usuário (rotas reais + autenticação)
  - Rotas de autenticação (com `next` seguro): `/conta/entrar`, `/conta/cadastrar`, `/conta/recuperar-senha`
  - Rotas do usuário (sem placeholder): `/minha-conta`, `/meus-pedidos`, `/enderecos`, `/lista-de-desejos`
  - Compatibilidade: `/perfil` → `/minha-conta`, `/favoritos` → `/lista-de-desejos`
  - Stores client (persistência via `useSyncExternalStore` + `localStorage`):
    - `www/stores/auth-store.ts` (login/cadastro/logout mock)
    - `www/stores/wishlist-store.ts` (wishlist por `productId`)
    - `www/stores/addresses-store.ts` (endereços CRUD)
  - Alinhado mock de cliente (e-mail único) entre auth/checkout/pedidos: `www/lib/mocks.ts`
  - Persistência `localStorage` com fallback seguro (try/catch): `www/lib/safe-storage.ts`
  - Funcionalidades removidas (redirecionam para `/minha-conta`): `/metodos-de-pagamento`, `/minhas-avaliacoes`

## Referências importantes
- README do app importado (fonte de verdade do design system e convenções): [README.md](file:///c:/LOPES/www/byshop/www/README.md)

## Decisões atuais (placeholder)
- (vazio)

## Próximas decisões (placeholder)
- (vazio)
