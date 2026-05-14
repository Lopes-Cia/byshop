# Tasks

- [x] Task 1: Implementar stores e dados do fluxo (carrinho + pedidos)
  - [x] Definir tipos/schemas do fluxo em `www/lib/schemas.ts` (CartItem, CheckoutForm, Order, totals, status)
  - [x] Consolidar mocks necessários em `www/lib/data.ts` (seed do carrinho, cupons, tracking/status mock)
  - [x] Criar store de carrinho (com persistência localStorage, resumo e cupons) sem dependência nova
  - [x] Criar store de pedidos (com persistência localStorage, createOrder e consulta por id) sem dependência nova

- [x] Task 2: Integrar store na UI global (Header + AppShell + PDP)
  - [x] Header: badge do carrinho deve refletir quantidade total da store (remover hardcode “3”)
  - [x] AppShell: drawer do carrinho deve ler itens/total da store e permitir alterar quantidade/remover
  - [x] AppShell: “Finalizar compra” deve navegar para `/finalizar-compra` e fechar o drawer
  - [x] PDP (`/produtos/[id]`): “Adicionar ao carrinho” deve adicionar item na store e abrir o carrinho

- [x] Task 3: Implementar `/carrinho` (página real)
  - [x] Substituir `PlaceholderPage` por conteúdo real
  - [x] Renderizar itens do carrinho via store (nome, variação, preço, quantidade)
  - [x] Permitir alterar quantidade/remover item e aplicar cupom (mock)
  - [x] Renderizar resumo (subtotal/desconto/frete/total) coerente com o AppShell
  - [x] Incluir CTAs: ir para `/finalizar-compra` e continuar comprando (`/produtos`)

- [x] Task 4: Implementar `/finalizar-compra` (página real mockada)
  - [x] Criar rota `www/app/(shop)/finalizar-compra/page.tsx`
  - [x] Renderizar resumo do pedido via store do carrinho (itens + total)
  - [x] Implementar formulário mockado com validação (react-hook-form + Zod)
  - [x] CTA “Confirmar pedido”: criar pedido na store, limpar carrinho e navegar para `/finalizar-compra/sucesso?orderId=...`
  - [x] CTA para voltar ao `/carrinho`

- [x] Task 5: Implementar `/finalizar-compra/sucesso` (página real)
  - [x] Criar rota `www/app/(shop)/finalizar-compra/sucesso/page.tsx`
  - [x] Ler `orderId` por querystring e carregar pedido da store (fallback: último pedido criado)
  - [x] Mostrar confirmação (id, total, status, tracking) e CTAs para `/produtos` e `/meus-pedidos`

- [x] Task 6: Compatibilidade de nomenclatura (`/checkout` → `/finalizar-compra`)
  - [x] Manter `www/app/(shop)/checkout/page.tsx` como redirect para `/finalizar-compra`

- [x] Task 7: Atualizar documentação do projeto
  - [x] Atualizar `.trae/docs/byshop/geral.md` removendo `/carrinho` e `/checkout` da lista de placeholders
  - [x] Registrar `/finalizar-compra` e `/finalizar-compra/sucesso` como páginas reais do fluxo de compra

- [x] Task 8: Verificação e checklist
  - [x] Verificar CTAs/links corretos
  - [x] Verificar que páginas não importam `Header`/`Footer`
  - [x] Verificar diagnósticos TypeScript/Next no editor (GetDiagnostics)

# Task Dependencies
- Task 2 depende de Task 1
- Task 3 depende de Task 2
- Task 4 depende de Task 3
- Task 5 depende de Task 4
- Task 6 depende de Task 4
- Task 7 depende de Task 1–6
- Task 8 depende de Task 1–7
