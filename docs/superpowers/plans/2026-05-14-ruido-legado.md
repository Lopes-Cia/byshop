# Ruído legado (ByShop) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remover compatibilidades/fallbacks e referências antigas do template, deixando o projeto com contratos/rotas/dados canônicos (novo ciclo).

**Architecture:** Ajustar contratos (Zod) e stores client (persistência/hidratação) para serem estritos, remover rotas legadas que faziam redirect e limpar documentação para refletir o estado atual.

**Tech Stack:** Next.js (App Router), React 19, TypeScript, Zod, localStorage (via wrapper `safe-storage.ts`).

---

## Mapa de arquivos

**Rotas (remover):**
- `www/app/(shop)/checkout/page.tsx`
- `www/app/(usuario)/perfil/page.tsx`
- `www/app/(usuario)/favoritos/page.tsx`
- `www/app/(usuario)/minhas-avaliacoes/page.tsx`
- `www/app/(usuario)/metodos-de-pagamento/page.tsx`

**Schemas (modificar):**
- `www/lib/schemas.ts`

**Stores (modificar):**
- `www/stores/cart-store.ts`
- `www/stores/orders-store.ts`
- `www/stores/auth-store.ts`
- `www/stores/wishlist-store.ts`
- `www/stores/addresses-store.ts`
- `www/lib/safe-storage.ts` (já tem `safeRemoveItem`, só será importado e usado)

**Dataset/exports (modificar):**
- `www/lib/data.ts`

**Docs (modificar):**
- `www/README.md`
- `.trae/docs/byshop/geral.md`

---

### Task 1: Varredura de dependências de rotas legadas

**Files:**
- Modify: (nenhum código; apenas checagens por grep)

- [ ] **Step 1: Confirmar que não há links internos para rotas legadas**

Run (PowerShell, repo root):
```bash
rg "/checkout|/perfil|/favoritos|/minhas-avaliacoes|/metodos-de-pagamento" c:\LOPES\www\byshop\www --glob "**/*.{ts,tsx,md}"
```

Expected:
- Idealmente nenhum match em `.tsx` (exceto os próprios arquivos de redirect que serão removidos).
- Em docs, matches podem existir e devem ser atualizados na Task 7.

---

### Task 2: Tornar `OrderTotalsSchema` estrito (sem defaults)

**Files:**
- Modify: `www/lib/schemas.ts`

- [ ] **Step 1: Alterar `OrderTotalsSchema` removendo `.default(0)`**

Atualize este trecho em `www/lib/schemas.ts`:
```ts
export const OrderTotalsSchema = z.object({
  subtotal: z.number().nonnegative(),
  shipping: z.number().nonnegative(),
  tax: z.number().nonnegative(),
  discount: z.number().nonnegative(),
  total: z.number().nonnegative(),
})
```

- [ ] **Step 2: Rodar build para garantir que nenhuma inferência/tipagem quebrou**

Run (pasta do app):
```bash
cd c:\LOPES\www\byshop\www
npm run build
```

Expected:
- Build OK (sem TypeScript errors).

---

### Task 3: Remover fallback em pedidos e usar validação estrita

**Files:**
- Modify: `www/stores/orders-store.ts`

- [ ] **Step 1: Tornar `computeTotals` estrito (sem `safeParse` + sem “totals zerado”)**

Substitua a implementação atual de `computeTotals` por:
```ts
function computeTotals(input: CreateOrderInput) {
  const subtotal = input.totals?.subtotal ?? computeSubtotal(input.items)
  const couponCode = input.couponCode ?? null
  const discount = input.totals?.discount ?? computeDiscount(subtotal, couponCode)
  const taxable = Math.max(0, subtotal - discount)
  const shipping = input.totals?.shipping ?? computeShipping(taxable, couponCode)
  const tax = input.totals?.tax ?? computeTax(taxable)
  const total = input.totals?.total ?? roundMoney(Math.max(0, taxable + shipping + tax))
  return OrderTotalsSchema.parse({ subtotal, shipping, tax, discount, total })
}
```

- [ ] **Step 2: Tornar `createOrder` estrito (remover bloco de fallback e não persistir pedido inválido)**

Substitua o trecho de validação em `createOrder` por:
```ts
  const parsed = OrderSchema.parse(order)

  setPersistedState((current) => ({
    ...current,
    orders: [parsed, ...current.orders],
    lastCreatedOrderId: parsed.id,
  }))

  return parsed
```

- [ ] **Step 3: Rodar build**

Run:
```bash
cd c:\LOPES\www\byshop\www
npm run build
```

Expected:
- Build OK.

---

### Task 4: Tornar API do carrinho estrita (`variant` obrigatório)

**Files:**
- Modify: `www/stores/cart-store.ts`

- [ ] **Step 1: Atualizar assinatura no tipo `CartState`**

No `export type CartState = { ... }`, troque as assinaturas para:
```ts
  removeItem: (id: number, variant: string) => void
  setQuantity: (id: number, quantity: number, variant: string) => void
```

- [ ] **Step 2: Atualizar implementações de `removeItem` e `setQuantity` (remover compat “sem variant”)**

Substitua `removeItem` por:
```ts
function removeItem(id: number, variant: string) {
  setPersistedState((current) => {
    const nextItems = current.items.filter((i) => !(i.id === id && i.variant === variant))
    return { ...current, items: nextItems }
  })
}
```

Substitua `setQuantity` por:
```ts
function setQuantity(id: number, quantity: number, variant: string) {
  setPersistedState((current) => {
    const nextQty = clampInt(quantity, 1, 999)
    return {
      ...current,
      items: current.items.map((i) => (i.id === id && i.variant === variant ? { ...i, quantity: nextQty } : i)),
    }
  })
}
```

- [ ] **Step 3: Confirmar que nenhum call site usa `removeItem(id)`/`setQuantity(id, qty)` sem variant**

Run:
```bash
rg "removeItem\\(\\s*[^,\\)]+\\s*\\)" c:\LOPES\www\byshop\www --glob "**/*.{ts,tsx}"
rg "setQuantity\\(\\s*[^,\\)]+\\s*,\\s*[^,\\)]+\\s*\\)" c:\LOPES\www\byshop\www --glob "**/*.{ts,tsx}"
```

Expected:
- Não sobrar chamadas com 1 ou 2 argumentos (todas devem passar `variant`).

- [ ] **Step 4: Rodar build**

Run:
```bash
cd c:\LOPES\www\byshop\www
npm run build
```

Expected:
- Build OK.

---

### Task 5: Bump de storage `v1` → `v2` + limpeza das chaves antigas

**Files:**
- Modify: `www/stores/cart-store.ts`
- Modify: `www/stores/orders-store.ts`
- Modify: `www/stores/auth-store.ts`
- Modify: `www/stores/wishlist-store.ts`
- Modify: `www/stores/addresses-store.ts`

#### 5.1 Cart (`byshop:cart:v1` → `byshop:cart:v2`)

- [ ] **Step 1: Atualizar chaves e importar `safeRemoveItem`**

No topo de `www/stores/cart-store.ts`:
```ts
import { safeGetItem, safeRemoveItem, safeSetItem } from "@/lib/safe-storage"

const CART_STORAGE_KEY = "byshop:cart:v2"
const CART_STORAGE_KEY_V1 = "byshop:cart:v1"
```

- [ ] **Step 2: Limpar `v1` na hidratação**

Atualize `ensureHydrated()` para:
```ts
function ensureHydrated() {
  if (hydrated) return
  hydrated = true
  safeRemoveItem(CART_STORAGE_KEY_V1)
  persistedState = readStorage()
}
```

#### 5.2 Orders (`byshop:orders:v1` → `byshop:orders:v2`)

- [ ] **Step 1: Atualizar chaves e importar `safeRemoveItem`**

No topo de `www/stores/orders-store.ts`:
```ts
import { safeGetItem, safeRemoveItem, safeSetItem } from "@/lib/safe-storage"

const ORDERS_STORAGE_KEY = "byshop:orders:v2"
const ORDERS_STORAGE_KEY_V1 = "byshop:orders:v1"
```

- [ ] **Step 2: Limpar `v1` na hidratação**

Atualize `ensureHydrated()` para:
```ts
function ensureHydrated() {
  if (hydrated) return
  hydrated = true
  safeRemoveItem(ORDERS_STORAGE_KEY_V1)
  persistedState = readStorage()
}
```

#### 5.3 Auth (`byshop:auth:v1` → `byshop:auth:v2`)

- [ ] **Step 1: Atualizar chaves e importar `safeRemoveItem`**

No topo de `www/stores/auth-store.ts`:
```ts
import { safeGetItem, safeRemoveItem, safeSetItem } from "@/lib/safe-storage"

const AUTH_STORAGE_KEY = "byshop:auth:v2"
const AUTH_STORAGE_KEY_V1 = "byshop:auth:v1"
```

- [ ] **Step 2: Limpar `v1` na hidratação**

Atualize `ensureHydrated()` para:
```ts
function ensureHydrated() {
  if (hydrated) return
  hydrated = true
  safeRemoveItem(AUTH_STORAGE_KEY_V1)
  persistedState = readStorage()
  volatileState = { isLoading: false }
}
```

#### 5.4 Wishlist (`byshop:wishlist:v1` → `byshop:wishlist:v2`)

- [ ] **Step 1: Atualizar chaves e importar `safeRemoveItem`**

No topo de `www/stores/wishlist-store.ts`:
```ts
import { safeGetItem, safeRemoveItem, safeSetItem } from "@/lib/safe-storage"

const WISHLIST_STORAGE_KEY = "byshop:wishlist:v2"
const WISHLIST_STORAGE_KEY_V1 = "byshop:wishlist:v1"
```

- [ ] **Step 2: Limpar `v1` na hidratação**

Atualize `ensureHydrated()` para:
```ts
function ensureHydrated() {
  if (hydrated) return
  hydrated = true
  safeRemoveItem(WISHLIST_STORAGE_KEY_V1)
  persistedState = readStorage()
}
```

#### 5.5 Addresses (`byshop:addresses:v1` → `byshop:addresses:v2`)

- [ ] **Step 1: Trocar para `safe-storage` e definir chaves**

No topo de `www/stores/addresses-store.ts`:
```ts
import { safeGetItem, safeRemoveItem, safeSetItem } from "@/lib/safe-storage"

const ADDRESSES_STORAGE_KEY = "byshop:addresses:v2"
const ADDRESSES_STORAGE_KEY_V1 = "byshop:addresses:v1"
```

- [ ] **Step 2: Atualizar `readStorage` e `writeStorage` para usar wrappers**

Substitua `readStorage` por:
```ts
function readStorage(): AddressesPersistedState {
  const raw = safeGetItem(ADDRESSES_STORAGE_KEY)
  if (!raw) return defaultPersistedState
  const parsed = safeParseJson(raw)
  const res = AddressesPersistedSchema.safeParse(parsed)
  if (!res.success) return defaultPersistedState
  return res.data
}
```

Substitua `writeStorage` por:
```ts
function writeStorage(next: AddressesPersistedState) {
  safeSetItem(ADDRESSES_STORAGE_KEY, JSON.stringify(next))
}
```

- [ ] **Step 3: Limpar `v1` na hidratação**

Atualize `ensureHydrated()` para:
```ts
function ensureHydrated() {
  if (hydrated) return
  hydrated = true
  safeRemoveItem(ADDRESSES_STORAGE_KEY_V1)
  persistedState = readStorage()
}
```

- [ ] **Step 4: Rodar build (garante que imports e runtime SSR não quebraram)**

Run:
```bash
cd c:\LOPES\www\byshop\www
npm run build
```

Expected:
- Build OK.

---

### Task 6: Remover rotas de redirect (URLs antigas devem 404)

**Files:**
- Delete: `www/app/(shop)/checkout/page.tsx`
- Delete: `www/app/(usuario)/perfil/page.tsx`
- Delete: `www/app/(usuario)/favoritos/page.tsx`
- Delete: `www/app/(usuario)/minhas-avaliacoes/page.tsx`
- Delete: `www/app/(usuario)/metodos-de-pagamento/page.tsx`

- [ ] **Step 1: Deletar páginas que só fazem `redirect()`**

Remova os arquivos acima.

- [ ] **Step 2: Rodar build**

Run:
```bash
cd c:\LOPES\www\byshop\www
npm run build
```

Expected:
- Build OK.

---

### Task 7: Remover re-exports “por compat” em `lib/data.ts`

**Files:**
- Modify: `www/lib/data.ts`

- [ ] **Step 1: Garantir que não há imports do tipo `from "@/lib/data"` usando schemas/types**

Run:
```bash
rg "from \"@/lib/data\"" c:\LOPES\www\byshop\www --glob "**/*.{ts,tsx}"
rg "CartItemSchema|CouponSchema|OrderSchema|OrderTotalsSchema|OrderStatusSchema|OrderTrackingSchema|type\\s+Order\\b|type\\s+CartItem\\b" c:\LOPES\www\byshop\www --glob "**/*.{ts,tsx}"
```

Expected:
- Nenhum arquivo deve importar schemas/types via `@/lib/data`.

- [ ] **Step 2: Remover as linhas de export**

Remova este bloco de `www/lib/data.ts`:
```ts
export { CartItemSchema, CouponSchema, OrderSchema, OrderStatusSchema, OrderTotalsSchema }
export { OrderTrackingSchema }
export type { CartItem, Coupon, Order, OrderStatus, OrderTotals, OrderTracking }
```

- [ ] **Step 3: Rodar build**

Run:
```bash
cd c:\LOPES\www\byshop\www
npm run build
```

Expected:
- Build OK.

---

### Task 8: Atualizar documentação do template e registrar execução em `.trae/docs/byshop/geral.md`

**Files:**
- Modify: `www/README.md`
- Modify: `.trae/docs/byshop/geral.md`

- [ ] **Step 1: Atualizar README (rotas/caminhos de produto)**

Em `www/README.md`, atualizar:
- `Link para /product/[id]` → `Link para /produtos/[id]`
- `Pagina de Produto (app/product/[id]/page.tsx)` → `Pagina de Produto (app/(shop)/produtos/[id]/page.tsx)`

Trecho esperado:
```md
- Link para `/produtos/[id]`
...
### Pagina de Produto (`app/(shop)/produtos/[id]/page.tsx`)
```

- [ ] **Step 2: Atualizar `.trae/docs/byshop/geral.md`**

Em `.trae/docs/byshop/geral.md`:
- No item 2026-05-13: Task 1, remover a nota “re-export em data.ts para compatibilidade” (não existe mais).
- No item 2026-05-13: Task 2, atualizar a nota: `removeItem`/`setQuantity` agora exigem `variant` (sem compat).
- No item 2026-05-14: Páginas do usuário, remover menções de compatibilidade `/perfil` e `/favoritos` e registrar que as rotas antigas foram removidas (404).
- Adicionar uma entrada nova em “Andamento” (2026-05-14) registrando “Ruído legado” executado, incluindo:
  - Remoção das rotas legadas (404)
  - Storage `:v2` + limpeza ativa de `:v1` (impacto: reset/logout/carrinho/pedidos/wishlist/endereços)
  - Stores (carrinho/pedidos) estritos (sem fallback)

- [ ] **Step 3: Rodar build final**

Run:
```bash
cd c:\LOPES\www\byshop\www
npm run build
```

Expected:
- Build OK.

---

### Task 9: Verificação manual mínima (aceite)

**Files:**
- (manual no browser)

- [ ] **Step 1: Fluxo de compra**
1. Abrir `/produtos` → abrir uma PDP `/produtos/[id]`
2. Adicionar ao carrinho → abrir `/carrinho`
3. Ajustar quantidade e remover item (sempre por `id + variant`)
4. Prosseguir para `/finalizar-compra` → confirmar pedido
5. Ver `/finalizar-compra/sucesso` → abrir `/meus-pedidos`

- [ ] **Step 2: Confirmar 404 em rotas removidas**
Abrir e confirmar 404:
- `/checkout`
- `/perfil`
- `/favoritos`
- `/metodos-de-pagamento`
- `/minhas-avaliacoes`

