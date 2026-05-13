# Spec — AppShell global (Top Bar + Header + Footer)

## Contexto
Hoje as páginas (ex.: `/(loja)/(inicio)` e `/produtos/[id]`) importam `Header` e `Footer` diretamente e também carregam estados/overlays (search modal, carrinho lateral, menu mobile). Isso gera:
- duplicação de imports e wiring,
- risco de inconsistência entre rotas,
- dificuldade para manter navegação/overlays iguais em todas as páginas.

## Objetivo
Centralizar a UI “global” em um único lugar:
- Top Bar em todas as páginas,
- `Header` e `Footer` em todas as páginas,
- estados e overlays globais (busca, carrinho, menu mobile),
- páginas passam a renderizar apenas o conteúdo principal e, quando necessário, chamam ações globais (ex.: abrir carrinho).

## Escopo
Inclui:
- criar um `AppShell` client global,
- adicionar um contexto/hook para páginas dispararem ações do shell,
- atualizar `app/layout.tsx` para usar o shell,
- remover `Header/Footer` e a infraestrutura local de overlays das páginas que hoje duplicam isso (Home e PDP).

Não inclui:
- refatorar o conteúdo visual das páginas além do necessário para encaixar no shell,
- implementar fluxos reais (auth, checkout real, carrinho real etc.).

## Arquitetura proposta

### 1) AppShell (Client Component)
Arquivo novo: `www/components/app-shell.tsx`

Responsabilidades:
- renderizar Top Bar + Header + Footer + children
- manter o estado global necessário pelo Header:
  - `openMenu`, `isUserMenuOpen`
  - `isSearchOpen`, `searchQuery`, `selectedIndex`
  - `isCartOpen`
  - `isMobileMenuOpen`
- renderizar overlays globais:
  - Search Modal
  - Cart Drawer
  - Mobile Menu Sidebar

### 2) Contexto do Shell (Client)
Arquivo novo: `www/components/app-shell-context.tsx`

Interface:
- `openCart()`, `closeCart()`
- `openSearch()`, `closeSearch()`
- `openMobileMenu()`, `closeMobileMenu()`

Uso:
- páginas chamam `useAppShell()` para abrir overlays (ex.: PDP “Adicionar ao Carrinho” abre o carrinho global).

### 3) Layout global (Server Component)
Arquivo a editar: `www/app/layout.tsx`

Papel:
- envolver `children` em `<AppShell>` e manter `metadata`/`lang`.

### 4) Páginas (Server/Client)
Arquivos a editar:
- `www/app/(loja)/(inicio)/page.tsx`
  - remover `Header` e `Footer` importados
  - remover a infraestrutura duplicada (Search Modal, Cart Drawer, Mobile Menu) que passa a existir no shell
  - manter conteúdo principal da home (hero, carrosséis etc.)
- `www/app/(shop)/produtos/[id]/page.tsx`
  - remover `Header` e `Footer` importados
  - remover Search Modal e Cart Drawer locais
  - trocar `setIsCartOpen(true)` por `useAppShell().openCart()`

## Regras e decisões
- Top Bar global (sempre visível em todas as páginas).
- Não alterar o `www/README.md` importado; divergências continuam documentadas em `.trae/docs/byshop/geral.md`.
- Não adicionar dependências novas.

## Critérios de aceite
- Nenhuma `page.tsx` precisa importar `Header` e `Footer`.
- `Header` funciona em todas as rotas: abre busca/carrinho/menu mobile.
- A Top Bar aparece em todas as rotas (sem condicional).
- A PDP consegue abrir o carrinho via contexto do shell (sem estado local duplicado).
- O app roda sem erros de runtime ao navegar entre `/`, `/produtos`, `/produtos/1` e páginas placeholder.

## Verificação
- Manual:
  - Acessar `/`, `/produtos`, `/produtos/1`
  - Abrir busca e carrinho pelo Header em cada página
  - Clicar “Adicionar ao Carrinho” na PDP e validar abertura do carrinho
  - Validar navegação para placeholders (ex.: `/termos`) com Header/Footer presentes

