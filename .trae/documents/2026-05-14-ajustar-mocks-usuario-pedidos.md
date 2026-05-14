# Plano — Alinhar mocks (carrinho/checkout/usuário/pedidos) + remover páginas não usadas

## Resumo
Corrigir o fluxo de validação das páginas do usuário e pedidos garantindo que:
- pedidos criados no checkout apareçam em “Meus pedidos” (mesmo com filtro por usuário logado),
- o estado de login e pedidos persista via `localStorage` de forma confiável (dev e build),
- os mocks (identidade do cliente) fiquem consistentes entre carrinho/checkout/auth/pedidos,
- remover do produto as funcionalidades/páginas **Métodos de pagamento** e **Minhas avaliações** (não serão usadas) e ajustar o Header/Minha Conta.

## Estado atual (diagnóstico)
- `orders-store` persiste pedidos em `localStorage` e o checkout cria pedidos via `ordersStore.createOrder()`.
- `meus-pedidos` filtra por `customerEmail === user.email` quando existe usuário logado.
- O checkout em DEV usa `devMockValues.email = "cliente@byshop.com"`, mas o auth mock usa `MOCK_AUTH_USER.email = "demo@byshop.com"`, então ao logar e abrir “Meus pedidos” o filtro tende a zerar a lista.
- Os stores usam `localStorage` sem try/catch; em alguns ambientes (permissões/privacidade) isso pode falhar silenciosamente ou lançar exceções, quebrando persistência.
- “Métodos de pagamento” e “Minhas avaliações” foram implementadas, mas agora precisam ser removidas do fluxo.

## Decisões (fechadas com o usuário)
- Manter `localStorage` e corrigir (precisa funcionar em `run dev` e `run build`).
- Não é necessário “salvar de verdade” (backend), mas precisa ser consistente para validar telas e navegação.
- Remover funcionalidades/páginas: `/metodos-de-pagamento` e `/minhas-avaliacoes`.

## Mudanças propostas (por arquivo)

### 1) Unificar identidade mock do cliente (fonte única)
- **Adicionar** `www/lib/mocks.ts` (ou `www/lib/data.ts` se já for o padrão) com um objeto único (ex.: `MOCK_CUSTOMER`) contendo `email`, `firstName`, `lastName` e (opcional) telefone/endereço para prefill.
- **Atualizar**:
  - `www/stores/auth-store.ts`: `MOCK_AUTH_USER` passa a usar o mesmo e-mail/nome do `MOCK_CUSTOMER`.
  - `www/app/(shop)/finalizar-compra/page.tsx`: `devMockValues.email` e nome passam a vir do `MOCK_CUSTOMER`.

**Resultado esperado:** login mock e checkout mock geram pedidos para o mesmo e-mail → “Meus pedidos” lista corretamente.

### 2) Garantir persistência via localStorage (dev e build)
- Criar utilitário pequeno e local (sem deps) para `localStorage`:
  - `safeGetItem(key)`, `safeSetItem(key, value)`, `safeRemoveItem(key)`
  - tudo com `try/catch` e fallback para estado default se falhar
- Aplicar esse utilitário nos stores que precisam persistir para validação:
  - `www/stores/auth-store.ts`
  - `www/stores/orders-store.ts`
  - (opcional, se usado no fluxo) `www/stores/cart-store.ts` e `www/stores/wishlist-store.ts`

**Resultado esperado:** em ambientes onde o `localStorage` falha/interdita, o app não “quebra”; e quando disponível, persiste de forma consistente.

### 3) Alinhar criação/consulta de pedidos com usuário logado
- **Atualizar** `www/app/(shop)/finalizar-compra/page.tsx`:
  - se houver usuário logado (`useAuthStore`), prefill do e-mail com `user.email` (em DEV e PROD).
  - ao confirmar pedido, usar `customerEmail` prioritariamente do `user.email` quando logado (evita divergência por edição do campo).
- **Atualizar** `www/app/(usuario)/meus-pedidos/page.tsx`:
  - Ajustar estado vazio para refletir o motivo real:
    - se `userEmail` existe e há pedidos no store, mas nenhum do e-mail → informar que não há pedidos para esse e-mail e sugerir criar pelo checkout.
    - manter mensagem atual quando não houver pedido nenhum no store.

**Resultado esperado:** após comprar, o pedido aparece imediatamente em “Meus pedidos”; após refresh, permanece.

### 4) Remover “Métodos de pagamento” e “Minhas avaliações”
- **Ajustar navegação**:
  - `www/components/header.tsx`: remover links do menu do usuário para `/metodos-de-pagamento` e `/minhas-avaliacoes`.
  - `www/app/(usuario)/minha-conta/page.tsx`: remover atalhos para essas páginas.
- **Desativar rotas**:
  - `www/app/(usuario)/metodos-de-pagamento/page.tsx`: trocar para `redirect("/minha-conta")` (server) ou página simples informando remoção.
  - `www/app/(usuario)/minhas-avaliacoes/page.tsx`: trocar para `redirect("/minha-conta")`.
- **Limpeza opcional** (se não houver mais imports):
  - Remover store `www/stores/payment-methods-store.ts` (e qualquer referência) para reduzir superfície.

**Resultado esperado:** UI não mostra essas opções; acessos diretos não quebram e voltam para “Minha conta”.

### 5) Documentação
- Atualizar `.trae/docs/byshop/geral.md` registrando:
  - alinhamento dos mocks (cliente único),
  - correção do fluxo “Meus pedidos”,
  - remoção das funcionalidades de métodos de pagamento e avaliações.

## Verificação (manual e por diagnóstico)
- Abrir `/conta/entrar`, fazer login com credenciais mock e confirmar que ao recarregar a página o header continua em estado logado.
- Fazer um pedido em `/finalizar-compra` e confirmar:
  - redireciona para `/finalizar-compra/sucesso`,
  - acessar `/meus-pedidos` lista o pedido,
  - recarregar (`F5`) mantém o pedido listado.
- Confirmar que o Header e “Minha conta” não exibem mais links para métodos de pagamento/avaliações.
- Confirmar que acessar `/metodos-de-pagamento` e `/minhas-avaliacoes` redireciona para `/minha-conta`.
- Rodar diagnóstico do editor (TypeScript/Next) para garantir build/dev sem erros (GetDiagnostics).

## Riscos e mitigação
- **Risco:** persistências antigas no `localStorage` com e-mails antigos podem fazer o filtro “sumir”.
  - **Mitigação:** alinhar mocks e melhorar a UX do estado vazio em “Meus pedidos”; opcionalmente oferecer botão DEV para “limpar pedidos” (somente dev).
- **Risco:** ambientes que bloqueiam `localStorage` continuam sem persistir.
  - **Mitigação:** `safeGet/safeSet` evita crashes e mantém o app navegável; persistência vira “melhor esforço”.

