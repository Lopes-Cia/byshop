# Tasks

- [x] Task 1: Mapear referência e divergências de rotas
  - [x] Confirmar rotas canônicas na referência: `/conta/entrar`, `/conta/cadastrar`, `/conta/recuperar-senha`, `/perfil`, `/favoritos`
  - [x] Confirmar rotas canônicas do ByShop atual: `/minha-conta`, `/lista-de-desejos` e links do Header

- [x] Task 2: Criar stores de usuário (sem dependência nova)
  - [x] Implementar `www/stores/auth-store.ts` (persistência, login/signup/logout mock; user + isLoading)
  - [x] Implementar `www/stores/wishlist-store.ts` (persistência, add/remove/toggle, count)
  - [x] Implementar `www/stores/addresses-store.ts` (persistência, CRUD básico)
  - [x] Implementar `www/stores/payment-methods-store.ts` (persistência, CRUD básico com dados mascarados)
  - [x] Garantir `useSyncExternalStore` sem loops (cache de snapshots)

- [x] Task 3: Implementar autenticação em `www/app/(usuario)/conta/*`
  - [x] `/conta/entrar`: form com `react-hook-form` + `zodResolver`, `next` seguro, credenciais de teste em DEV
  - [x] `/conta/cadastrar`: form com validação, navega para `next` seguro
  - [x] `/conta/recuperar-senha`: form com validação e estado “e-mail enviado” (mock)

- [x] Task 4: Implementar páginas reais em `www/app/(usuario)`
  - [x] `/minha-conta`: dashboard + CTAs (logado vs visitante) + links para rotas do grupo
  - [x] `/meus-pedidos`: lista pedidos do `orders-store` + filtro por usuário (quando logado) + link para detalhe (sucesso)
  - [x] `/enderecos`: CRUD básico com formulário
  - [x] `/metodos-de-pagamento`: CRUD básico com formulário
  - [x] `/lista-de-desejos`: lista, remover, limpar, persistência
  - [x] `/minhas-avaliacoes`: lista mock/estado vazio

- [x] Task 5: Compatibilidade de nomenclatura (redirects)
  - [x] `/perfil` → redirect para `/minha-conta`
  - [x] `/favoritos` → redirect para `/lista-de-desejos`

- [x] Task 6: Verificação e checklist
  - [x] Verificar navegação com `next` seguro (não aceitar `//` ou URL absoluta)
  - [x] Verificar que o visual segue o padrão do projeto (shadcn/ui, tipografia, spacing)
  - [x] Verificar diagnósticos TypeScript/Next no editor (GetDiagnostics)

# Task Dependencies
- Task 3 depende de Task 2
- Task 4 depende de Task 2
- Task 5 depende de Task 1
- Task 6 depende de Task 1–5
