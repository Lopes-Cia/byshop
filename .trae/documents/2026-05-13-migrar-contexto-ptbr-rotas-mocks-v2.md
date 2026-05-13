# Plano — Migrar contexto básico (pt-BR + rotas ByShop + mocks) — v2

## Resumo
Objetivo: consolidar o “contexto básico” do app em `C:\LOPES\www\byshop\www` para o padrão ByShop:
- nomenclatura pt-BR (mínimo: Header + títulos/CTAs principais nas páginas existentes),
- rotas no estilo ByShop (route groups) mantendo o que já foi criado (`/`, `/produtos`, `/produtos/[id]`),
- dados mockados centralizados (catálogo + search + carrinho + avaliações),
- páginas “placeholder” para rotas ainda não implementadas (evitar dead-ends na navegação).

Fora de escopo (nesta etapa):
- criar a implementação real de todas as páginas/fluxos (será “uma a uma” em outro passo),
- alterar o `www/README.md` (manter como referência do template).

## Estado atual (confirmado no disco)
Estrutura relevante em `C:\LOPES\www\byshop\www`:
- Rotas já migradas:
  - Home: [page.tsx](file:///c:/LOPES/www/byshop/www/app/(loja)/(inicio)/page.tsx) (URL `/`)
  - Catálogo: [page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/produtos/page.tsx) (URL `/produtos`)
  - PDP: [page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/produtos/%5Bid%5D/page.tsx) (URL `/produtos/[id]`)
- Layout global: [layout.tsx](file:///c:/LOPES/www/byshop/www/app/layout.tsx)
- Mocks (já existentes):
  - Schemas: [schemas.ts](file:///c:/LOPES/www/byshop/www/lib/schemas.ts)
  - Data: [data.ts](file:///c:/LOPES/www/byshop/www/lib/data.ts) (products/categories/allSearchData)
- Componentes com navegação principal:
  - Header: [header.tsx](file:///c:/LOPES/www/byshop/www/components/header.tsx) (ainda tem muitos labels em inglês e muitos `href="#"`)
  - Footer: [footer.tsx](file:///c:/LOPES/www/byshop/www/components/footer.tsx) (links `#` em itens visíveis)
- Documentação do ciclo atual: [geral.md](file:///c:/LOPES/www/byshop/.trae/docs/byshop/geral.md) (ainda não registra a migração de rotas/mocks)

Principais gaps vs objetivo:
- pt-BR ainda incompleto (Home/Header/PDP têm strings em inglês e algumas sem acentuação).
- mocks “soltos” ainda existem dentro das páginas (ex.: `customerReviews`, `cartItems` no PDP; carrinho hardcoded na Home).
- links de navegação apontam para `#` (Header e Footer), mas a decisão para esta etapa é criar placeholders.

## Decisões já confirmadas
- Escopo pt-BR: **mínimo** (Header + títulos/CTAs básicos nas páginas `/`, `/produtos`, `/produtos/[id]`).
- Rotas não implementadas: **criar páginas placeholder** (ao invés de manter `#`).
- Mocks: **centralizar tudo** (inclui carrinho e avaliações).
- README: **não mexer** no [README.md](file:///c:/LOPES/www/byshop/www/README.md); documentar divergências no `geral.md`.

## Mudanças propostas (o que fazer)

### 1) Centralizar mocks de carrinho e avaliações
Objetivo: remover arrays hardcoded de páginas e padronizar a origem dos mocks.

Arquivos:
- Editar [data.ts](file:///c:/LOPES/www/byshop/www/lib/data.ts)
  - Adicionar exports para:
    - `cartItemsMock` (itens usados no drawer de carrinho; reutilizável na Home e PDP)
    - `customerReviewsMock` (avaliações exibidas na PDP)
  - Garantir que os shapes sejam simples e consumíveis sem Zod adicional (Zod fica para domínio de produto nesta etapa).
- Editar [Home page.tsx](file:///c:/LOPES/www/byshop/www/app/(loja)/(inicio)/page.tsx)
  - Remover itens de carrinho hardcoded e consumir `cartItemsMock` via import.
- Editar [PDP page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/produtos/%5Bid%5D/page.tsx)
  - Remover `customerReviews` e `cartItems` locais e consumir `customerReviewsMock` + `cartItemsMock` via import.

Critérios de aceite:
- Home e PDP continuam renderizando carrinho lateral e avaliações, sem dados duplicados dentro das páginas.
- Não cria dependências novas.

### 2) Rotas placeholder (route groups ByShop)
Objetivo: substituir dead-ends (`href="#"`) por rotas reais, mesmo que “Em construção”.

Estratégia:
- Criar um componente reutilizável de placeholder (ex.: `components/placeholder-page.tsx`) para evitar duplicação.
- Criar páginas `page.tsx` simples nas rotas-alvo (server components por padrão), com:
  - título,
  - texto “Em construção”,
  - links para `/` e `/produtos`.

Rotas-alvo (mínimo prático baseado nos links visíveis no Header/Footer):
- Conta/usuário (route group `(usuario)`):
  - `/minha-conta`
  - `/meus-pedidos`
  - `/lista-de-desejos`
  - `/minhas-avaliacoes`
  - `/metodos-de-pagamento`
- Shop:
  - `/carrinho`
  - `/checkout`
  - `/ofertas`
- Institucional (route group `(institucional)`):
  - `/sobre`
  - `/central-de-ajuda`
  - `/frete-e-entrega`
  - `/trocas-e-devolucoes`
  - `/termos`
  - `/privacidade`

Arquivos:
- Criar:
  - `app/(usuario)/*/page.tsx` (para cada rota acima)
  - `app/(shop)/*/page.tsx` (carrinho/checkout/ofertas)
  - `app/(institucional)/*/page.tsx` (institucionais listadas)
  - `components/placeholder-page.tsx` (ou equivalente) para padronizar UI do “Em construção”
- Editar [header.tsx](file:///c:/LOPES/www/byshop/www/components/header.tsx)
  - Trocar `href="#"` (ou `<a href="#">`) por `Link` para as rotas placeholder acima, apenas onde fizer sentido para navegação principal (menus e user-menu).
- Editar [footer.tsx](file:///c:/LOPES/www/byshop/www/components/footer.tsx)
  - Mapear itens mais visíveis/esperados (termos/privacidade/ajuda/entrega/trocas/conta/pedidos) para as rotas placeholder.
  - Manter itens menos relevantes como `#` se não forem críticos (decisão: evitar criar dezenas de placeholders desnecessários).

Critérios de aceite:
- Navegação principal não leva mais para `#` nos itens cobertos.
- Todas as rotas placeholder renderizam sem erro e têm links de retorno.

### 3) pt-BR mínimo (Header + títulos/CTAs principais)
Objetivo: reduzir “cara de template” em inglês nas páginas existentes, sem reescrever todo o copy.

Arquivos:
- Editar [header.tsx](file:///c:/LOPES/www/byshop/www/components/header.tsx)
  - Traduzir headings/labels principais de menus (“Electronics”, “Accessories”, etc.).
  - Ajustar microcopy de ações (ex.: “Adicionar créditos” já existe; completar acentos onde faltar).
- Editar [Home page.tsx](file:///c:/LOPES/www/byshop/www/app/(loja)/(inicio)/page.tsx)
  - Traduzir títulos de seções e CTAs:
    - Hero (título + botão),
    - “Shop By Categories”, “View More”, newsletter (“Subscribe”),
    - corrigir acentos em textos já em pt (“Olá”, “você”, “Créditos”, “Configurações”, “Grátis”).
- Editar [PDP page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/produtos/%5Bid%5D/page.tsx)
  - Traduzir strings essenciais (“stars” → “estrelas”, “Características”, “Avaliações”).
  - Padronizar moeda para pt-BR (usar `Intl.NumberFormat('pt-BR', { currency: 'BRL' })` em valores exibidos no carrinho/resumo).

Opcional (se o lint acusar e estiver no caminho):
- Ajustar [layout.tsx](file:///c:/LOPES/www/byshop/www/app/layout.tsx) para remover imports/variáveis não usadas (fonts) OU aplicar as fontes no `className` do `body` para evitar warning/erro de lint.

Critérios de aceite:
- Header e títulos/CTAs das 3 páginas principais ficam em pt-BR (mínimo), sem quebrar layout.

### 4) Atualizar documentação do projeto (obrigatório)
Objetivo: manter `geral.md` atualizado com o andamento.

Arquivo:
- Editar [geral.md](file:///c:/LOPES/www/byshop/.trae/docs/byshop/geral.md) registrando:
  - migração das rotas para `(loja)/(inicio)` e `(shop)/produtos`,
  - criação/uso de `lib/schemas.ts` + `lib/data.ts` (incluindo mocks centralizados),
  - lista de rotas existentes agora (incluindo placeholders),
  - nota: README do template permanece como referência e pode conter caminhos antigos (ex.: `/product/[id]`).

## Ordem de execução (checklist)
1. Atualizar `lib/data.ts` com `cartItemsMock` e `customerReviewsMock`.
2. Refatorar Home e PDP para consumir os mocks centralizados.
3. Implementar componente/páginas placeholder e ajustar links no Header/Footer (mínimo prático).
4. Aplicar pt-BR mínimo (Header + títulos/CTAs principais + moeda pt-BR).
5. Atualizar `geral.md` com o andamento e o “mapa” de rotas.

## Verificação
- Rodar o app e validar manualmente:
  - `/`, `/produtos`, `/produtos/1`
  - placeholders: `/carrinho`, `/checkout`, `/ofertas`, `/minha-conta`, `/meus-pedidos`, `/lista-de-desejos`, `/termos`, `/privacidade`, `/central-de-ajuda`
- Conferir que não existem imports quebrados após mover/centralizar mocks.
- Se aplicável, rodar `npm run lint` dentro de `C:\LOPES\www\byshop\www` e corrigir apenas o que bloquear a execução (sem refactors grandes).

