# Plano — Ruído legado (ByShop)

## Resumo
- Objetivo: reduzir “ruído legado” removendo compatibilidades/fallbacks e referências antigas do template importado, deixando o projeto com contratos/rotas/dados “canônicos” (novo ciclo).
- Escopo: remover rotas de redirect legadas, remover fallbacks/compat nos stores/schemas, remover re-exports “por compat”, e corrigir documentação (`www/README.md` e `.trae/docs/byshop/geral.md`).
- Fora de escopo: refator de UI/UX do fluxo de compra, troca de emojis por imagens, SEO, novos componentes.

## Estado atual (achados)
### Rotas/redirects de compatibilidade
- Existem páginas que só fazem `redirect()` (compatibilidade de URL):
  - `/checkout` → `/finalizar-compra`: [checkout/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/checkout/page.tsx)
  - `/perfil` → `/minha-conta`: [perfil/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/perfil/page.tsx)
  - `/favoritos` → `/lista-de-desejos`: [favoritos/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/favoritos/page.tsx)
  - `/minhas-avaliacoes` → `/minha-conta`: [minhas-avaliacoes/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/minhas-avaliacoes/page.tsx)
  - `/metodos-de-pagamento` → `/minha-conta`: [metodos-de-pagamento/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/metodos-de-pagamento/page.tsx)

### Compat/fallback em stores e schemas
- Carrinho: API com `variant?` “para compatibilidade”:
  - [cart-store.ts](file:///c:/LOPES/www/byshop/www/stores/cart-store.ts#L21-L38)
- Pedidos: fallback de criação de pedido quando o schema falha (persiste pedido “zerado”):
  - [orders-store.ts](file:///c:/LOPES/www/byshop/www/stores/orders-store.ts#L193-L232)
- Schemas: totals aceitam campos ausentes via `.default(0)` (compat com dados persistidos antigos):
  - [schemas.ts](file:///c:/LOPES/www/byshop/www/lib/schemas.ts#L58-L65)
- `localStorage` usa chaves `:v1` em múltiplas stores:
  - Carrinho: `byshop:cart:v1`
  - Pedidos: `byshop:orders:v1`
  - Auth: `byshop:auth:v1`
  - Endereços: `byshop:addresses:v1`
  - Wishlist: `byshop:wishlist:v1`

### Documentação com rotas antigas
- `www/README.md` ainda referencia `/product/[id]` e `app/product/[id]/page.tsx` (template), mas o ByShop atual usa `/produtos/[id]` em `app/(shop)/produtos/[id]/page.tsx`:
  - [README.md](file:///c:/LOPES/www/byshop/www/README.md#L319-L341)
  - [README.md](file:///c:/LOPES/www/byshop/www/README.md#L405-L469)
- `www/lib/data.ts` expõe re-exports de schemas/types (superfície extra “por compat”), sem uso atual no código:
  - [data.ts](file:///c:/LOPES/www/byshop/www/lib/data.ts#L499-L501)

## Decisões (confirmadas)
- Redirects: remover todas as rotas de compatibilidade (as URLs antigas passam a 404).
- Storage: bump de `:v1` → `:v2` e apagar as chaves antigas.
- Carrinho: exigir sempre `variant` em `removeItem` e `setQuantity` (sem comportamento “sem variant afeta tudo”).

## Proposta de mudanças (o que/onde/por quê)
### 1) Remover rotas de redirect (compatibilidade de URL)
- Deletar as páginas que só fazem `redirect()`:
  - [checkout/page.tsx](file:///c:/LOPES/www/byshop/www/app/(shop)/checkout/page.tsx)
  - [perfil/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/perfil/page.tsx)
  - [favoritos/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/favoritos/page.tsx)
  - [minhas-avaliacoes/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/minhas-avaliacoes/page.tsx)
  - [metodos-de-pagamento/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/metodos-de-pagamento/page.tsx)
- Motivo: eliminar compatibilidade com URLs antigas conforme o item “Ruído legado”.
- Impacto esperado: acessar essas rotas vai resultar em 404 (o comportamento desejado).

### 2) Remover “compat/fallback” no carrinho (API do store)
- Ajustar [cart-store.ts](file:///c:/LOPES/www/byshop/www/stores/cart-store.ts):
  - Tornar `removeItem(id, variant)` e `setQuantity(id, quantity, variant)` com `variant` obrigatório (sem `?`).
  - Remover a lógica de “se variant não vier, aplica em todas as variações”.
  - Atualizar `CartState` e `cartStore` para refletir assinaturas novas.
  - Garantir que os call sites já passam `variant` (atualmente passam).
- Motivo: remover compat de API e deixar o contrato explícito 1:1 com a linha do carrinho.

### 3) Remover fallbacks em pedidos + deixar validação estrita
- Ajustar [schemas.ts](file:///c:/LOPES/www/byshop/www/lib/schemas.ts):
  - Remover `.default(0)` de `OrderTotalsSchema` e remover o texto de compatibilidade com dados antigos.
  - Manter required: `subtotal/shipping/tax/discount/total` sempre presentes (criados pelo app).
- Ajustar [orders-store.ts](file:///c:/LOPES/www/byshop/www/stores/orders-store.ts):
  - Remover bloco de fallback quando `OrderSchema.safeParse(order)` falha.
  - Trocar validações “best effort” por validação estrita (`parse`) e falhar rápido se existir bug (sem persistir pedido inválido).
  - Simplificar `computeTotals`: retornar objeto sempre completo e validá-lo de forma estrita (sem “fallback zeros”).
- Motivo: eliminar compat/fallback e garantir que persistimos somente pedidos válidos.

### 4) Bump de storage `v1`→`v2` + limpeza das chaves antigas
- Atualizar chaves de storage para `:v2`:
  - [cart-store.ts](file:///c:/LOPES/www/byshop/www/stores/cart-store.ts)
  - [orders-store.ts](file:///c:/LOPES/www/byshop/www/stores/orders-store.ts)
  - [auth-store.ts](file:///c:/LOPES/www/byshop/www/stores/auth-store.ts)
  - [addresses-store.ts](file:///c:/LOPES/www/byshop/www/stores/addresses-store.ts)
  - [wishlist-store.ts](file:///c:/LOPES/www/byshop/www/stores/wishlist-store.ts)
- Implementar limpeza das chaves antigas (`safeRemoveItem`) no primeiro `ensureHydrated()` de cada store:
  - Remover `byshop:*:v1` correspondente e passar a ler/gravar apenas `:v2`.
- Motivo: cortar compatibilidade com estado persistido antigo e evitar inconsistência/“lixo” de versões anteriores.
- Impacto esperado: reset de sessão (logout), carrinho vazio e lista de pedidos vazia após a mudança.

### 5) Remover superfície “por compat” em `lib/data.ts`
- Ajustar [data.ts](file:///c:/LOPES/www/byshop/www/lib/data.ts):
  - Remover `export { CartItemSchema, ... }` e `export type { ... }` (re-exports).
  - Manter imports internos necessários para `parse` do dataset.
- Motivo: reduzir API pública acidental e evitar padrões de import “errados” no futuro.

### 6) Limpar documentação do template importado
- Ajustar [README.md](file:///c:/LOPES/www/byshop/www/README.md):
  - Substituir referências `/product/[id]` → `/produtos/[id]`.
  - Substituir `app/product/[id]/page.tsx` → `app/(shop)/produtos/[id]/page.tsx`.
  - Ajustar trechos de árvore de pastas e seções de componentes relacionados (ex.: `ProductCard`).
- Ajustar [.trae/docs/byshop/geral.md](file:///c:/LOPES/www/byshop/.trae/docs/byshop/geral.md):
  - Remover/atualizar nota de “re-export em data.ts para compatibilidade” (deixa de existir).
  - Adicionar entrada no “Andamento” registrando a execução do item “Ruído legado”.
- Motivo: evitar indução a implementação/links errados e manter a documentação do ciclo atual consistente.

## Sequência de execução (passo a passo)
1) Mapear dependências (rápido): confirmar que não há links internos para `/checkout`, `/perfil`, `/favoritos`, etc.
2) Refatorar stores/schemas:
   - `OrderTotalsSchema` estrito.
   - `orders-store` sem fallback e com validação estrita.
   - `cart-store` com `variant` obrigatório.
3) Bump de storage para `:v2` e remoção ativa das chaves `:v1` via `safeRemoveItem`.
4) Remover páginas de redirect.
5) Limpar `lib/data.ts` (remover re-exports).
6) Corrigir documentação (`www/README.md` e `.trae/docs/byshop/geral.md`).

## Verificação (aceite)
- Build/Typecheck:
  - Rodar checagem de types e build do `www/` (o mínimo necessário para pegar quebras de assinatura/import).
- Manual (fluxos principais):
  - Abrir `/produtos` → abrir uma PDP `/produtos/[id]` → adicionar ao carrinho → abrir `/carrinho` → ajustar quantidade/remover item.
  - Prosseguir para `/finalizar-compra` → confirmar pedido → ver `/finalizar-compra/sucesso` → abrir `/meus-pedidos`.
- Compat removida (esperado 404):
  - Confirmar que `/checkout`, `/perfil`, `/favoritos`, `/metodos-de-pagamento`, `/minhas-avaliacoes` não existem mais.

## Riscos e mitigação
- Risco: “reset” do estado (logout/carrinho/pedidos) após bump para `:v2`.
  - Mitigação: comportamento intencional; documentar no `.trae/docs/byshop/geral.md`.
- Risco: exceções em runtime se algum bug gerar pedido inválido.
  - Mitigação: validação estrita expõe o bug cedo; correção pontual no fluxo de checkout se aparecer.

