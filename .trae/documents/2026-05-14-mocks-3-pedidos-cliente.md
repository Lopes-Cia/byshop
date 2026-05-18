# Plano — Adicionar 3 pedidos mockados ao cliente

## Resumo
Adicionar ao arquivo `www/lib/mocks.ts` uma lista de **3 pedidos mockados** pertencentes ao cliente `MOCK_CUSTOMER` (`cliente@byshop.com`), para uso em telas de pedidos/checkout durante desenvolvimento.

## Análise do estado atual
- O arquivo [mocks.ts](file:///c:/LOPES/www/byshop/www/lib/mocks.ts) exporta apenas `MOCK_CUSTOMER`.
- O schema de pedido é definido em `www/lib/schemas.ts`:
  - `OrderSchema` exige: `id`, `createdAt`, `customerEmail`, `items`, `totals`, `status`, `couponCode`, `tracking?`.
  - `CartItemSchema` exige: `id`, `name`, `variant`, `price`, `quantity` (e `emoji` opcional).
- Já existe um conjunto de itens de carrinho em `www/lib/data.ts` (`cartItemsMock`), mas o pedido mock pode ser declarado diretamente em `mocks.ts` sem dependência cruzada (para manter o arquivo simples e isolado).

## Mudanças propostas
### 1) Exportar pedidos mockados em `mocks.ts`
- Arquivo: `c:\LOPES\www\byshop\www\lib\mocks.ts`
- Adicionar imports do schema/tipo:
  - `import { OrderSchema, type Order } from "@/lib/schemas"`
- Criar um novo export:
  - `export const MOCK_CUSTOMER_ORDERS: Order[] = OrderSchema.array().parse([...])`
- Conteúdo:
  - 3 pedidos com `customerEmail: MOCK_CUSTOMER.email`
  - `status` variando (ex.: `processing`, `paid`, `shipped`)
  - `createdAt` em formato ISO (datas diferentes, em ordem decrescente ou com espaçamento de dias)
  - `items` com 1–3 itens cada (ids numéricos, variant, price, quantity)
  - `totals` coerentes (subtotal = soma; discount opcional; shipping/tax >= 0; total >= 0)
  - `tracking` preenchido (carrier/code/url) para pelo menos 1–2 pedidos (ou todos, para consistência)

### 2) Não “injetar” automaticamente no store (fora de escopo)
- Este plano **não** altera `stores/orders-store.ts`.
- Motivo: manter o mock como “dados disponíveis” sem mudar o comportamento/persistência automaticamente.
- Uso posterior (quando você quiser): consumir `MOCK_CUSTOMER_ORDERS` em uma ação de seed (ex.: botão dev-only) ou em uma rotina de bootstrap controlada.

## Assunções e decisões
- Os pedidos mockados serão validados por `OrderSchema.array().parse(...)` para garantir consistência.
- O identificador do pedido seguirá o padrão usado hoje no app (`ord_...`) apenas por legibilidade (não é requisito técnico).

## Verificação
- Build/Typecheck:
  - Rodar `npm run lint` e `npm run build` após a mudança.
- Sanidade dos dados:
  - Confirmar que `MOCK_CUSTOMER_ORDERS.length === 3` e que o parse do Zod não falha.

