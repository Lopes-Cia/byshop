# Plano — Design (alta qualidade) para listagem de pedidos

## Resumo
Construir a **página de listagem** de pedidos do usuário em `app/(usuario)/meus-pedidos` seguindo o padrão visual do projeto (shadcn + Tailwind), com **alto polish de UI/UX**, incluindo **busca** e **filtro por status**.

Este plano cobre **apenas a listagem**. A página de **detalhe** (`/meus-pedidos/[orderId]`) fica para a próxima etapa após validação da listagem.

## Estado atual (repo)
- A listagem está como placeholder “Em refatoração” em:
  - [meus-pedidos/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/meus-pedidos/page.tsx)
- O detalhe também está como placeholder em:
  - [meus-pedidos/[orderId]/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/meus-pedidos/%5BorderId%5D/page.tsx)
- Existem 3 pedidos mockados do cliente em:
  - [mocks.ts](file:///c:/LOPES/www/byshop/www/lib/mocks.ts) (`MOCK_CUSTOMER_ORDERS`)
- Padrão visual observado em páginas do usuário:
  - Layout: `main bg-white` + container `max-w-7xl px-4 py-10` (ex.: [enderecos/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/enderecos/page.tsx), [minha-conta/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/minha-conta/page.tsx))
  - Componentes: `Button`, `Card`, `Table`, `Badge`, `DropdownMenu`, `Input`.

## Decisões já confirmadas
- Quando o usuário não estiver logado: **redirecionar** para `/conta/entrar?next=/meus-pedidos`.
- Escopo desta etapa: **Busca + filtro** na listagem.
- Para simplificar testes: **usar o mock** (`MOCK_CUSTOMER_ORDERS`) como fonte de dados inicial, sem botão de seed e sem tratamento específico para dev/build.

## Mudanças propostas (somente listagem)
### 1) Implementar a listagem com UI/UX polido
- Arquivo: `c:\LOPES\www\byshop\www\app\(usuario)\meus-pedidos\page.tsx`
- Tornar a página `"use client"` novamente, pois vai depender de:
  - `useAuthStore` (para detectar usuário e acionar redirecionamento)
  - `useRouter` + `useEffect` (para fazer `router.replace(...)` quando não autenticado)
  - estado local de UI (busca/filtro)

**Comportamentos**
- **Auth redirect**
  - Se não houver `auth.user`, redirecionar para `/conta/entrar?next=/meus-pedidos`.
- **Fonte de dados**
  - Usar `MOCK_CUSTOMER_ORDERS` como lista base na UI desta etapa.
  - (Opcional, mas recomendado para manter compatibilidade futura) Permitir facilmente trocar o data source depois para `useOrdersStore(...)` sem refatorar o layout.
- **Ordenação**
  - Ordenar por `createdAt` desc (mais recente primeiro).
- **Busca**
  - Campo de busca que filtra por:
    - `order.id`
    - nomes dos itens (`item.name`)
- **Filtro por status**
  - Dropdown com opções:
    - Todos
    - Em processamento / Pago / Enviado / Entregue / Cancelado
  - Aplicar filtro em memória.
- **Navegação para detalhe**
  - Link “Ver detalhes” por linha para `/meus-pedidos/[orderId]` (o detalhe continuará como placeholder até a próxima etapa).

**Layout/UI (padrão do projeto, com polish)**
- Header com:
  - Título “Pedidos”
  - subtítulo curto (ex.: “Acompanhe compras e entregas.”)
  - ações no topo (ex.: “Ver produtos”)
- Toolbar com:
  - `Input` de busca com placeholder bem escrito
  - filtro por status via `DropdownMenu`
  - (se fizer sentido) contador de resultados
- Tabela com:
  - Colunas: Pedido, Data, Status, Itens, Total, Ação
  - `Badge` para status com variantes consistentes
  - Row hover + alinhamentos consistentes (valores monetários à direita)
- Estados:
  - “Vazio” quando nenhum pedido corresponder aos filtros (com CTA para `/produtos` e/ou `/finalizar-compra`)
  - “Carregando” não é obrigatório nesta etapa (mock é síncrono), mas pode haver um estado inicial de redirecionamento sem flicker.

### 2) Não alterar o detalhe nesta etapa
- Arquivo: `c:\LOPES\www\byshop\www\app\(usuario)\meus-pedidos\[orderId]\page.tsx`
- Manter como placeholder até concluir e testar a listagem.

## Agente especializado (execução)
Durante a implementação, delegar a construção do layout e refinamento visual para um agente focado em UI:
- **ui-designer**: definir composição, tipografia, espaçamento, micro-interações.
- **frontend-architect**: implementar com shadcn/tailwind seguindo padrões do repo e garantindo DX/perf.

## Verificação
- Visual:
  - Acessar `/meus-pedidos` logado e validar: busca, filtro, tabela, empty-state.
  - Validar que deslogado redireciona corretamente para `/conta/entrar?next=/meus-pedidos`.
- Qualidade:
  - `npm run lint`
  - `npm run build`

