## Resumo

Renomear o componente global de navegação **Navbar** para **Header** e reestruturar o código em subcomponentes para melhorar organização/manutenção, mantendo o comportamento visual/funcional atual.

## Estado atual (confirmado no repo)

- O layout raiz renderiza `<Navbar />` globalmente em [layout.tsx](file:///c:/LOPES/www/byshop/www/app/layout.tsx#L16-L23).
- O componente está em [navbar.tsx](file:///c:/LOPES/www/byshop/www/components/layout/navbar.tsx#L1-L129).
- O menu “Shop / Categories / Quick Links” vem de [navigation.tsx](file:///c:/LOPES/www/byshop/www/components/layout/navigation.tsx#L51-L127) e é importado dentro do Navbar.
- Não existe um componente `Header` atualmente; referências a `*Header*` no projeto são majoritariamente de componentes UI (CardHeader, DialogHeader etc.) e não conflitam com o rename.

## Objetivo e critérios de aceite

- Substituir `Navbar` por `Header` sem quebrar build.
- Atualizar import/uso no layout raiz e quaisquer outros imports existentes.
- Reestruturar o conteúdo do componente em subcomponentes (no mínimo: logo/nav, search, ações, menu mobile).
- Manter o HTML final equivalente em comportamento: links, contadores de carrinho/wishlist, login/logout, e menu mobile continuam funcionando.
- Não alterar rotas nem stores; somente refactor/rename de UI.

## Mudanças propostas (arquivos e passos)

### 1) Renomear arquivo e export principal

- **Renomear** `www/components/layout/navbar.tsx` → `www/components/layout/header.tsx`.
- Dentro do arquivo:
  - Renomear `export default function Navbar()` → `export default function Header()`.
  - Extrair subcomponentes no mesmo arquivo (sem criar novas dependências):
    - `HeaderDesktopNav` (logo + `<Navigation />`)
    - `HeaderSearch` (desktop)
    - `HeaderActions` (wishlist + cart + user/sign in)
    - `HeaderMobileMenu` (botão + conteúdo condicional)
  - Manter a lógica existente de estado (`isMenuOpen`), contadores (cart/wishlist) e auth.

### 2) Atualizar layout raiz para usar Header

- Em `www/app/layout.tsx`:
  - Atualizar import `Navbar` para `Header` apontando para o novo caminho.
  - Atualizar o JSX de `<Navbar />` para `<Header />`.

### 3) Ajustar referências e documentação interna

- Atualizar o documento de análise para refletir o rename:
  - `c:\LOPES\www\byshop\.trae\docs\byshop\geral.md`: substituir referências “Navbar” por “Header” e atualizar o link do arquivo.

### 4) Garantir que não restaram referências antigas

- Rodar uma varredura textual por `Navbar` e por `components/layout/navbar` para confirmar zero ocorrências.

## Decisões assumidas

- Os subcomponentes serão definidos **no mesmo arquivo** `header.tsx` para evitar proliferação de arquivos e manter o refactor pequeno e fácil de revisar.
- O comportamento/markup principal será preservado; a reestruturação é focada em legibilidade e organização.

## Verificação (após implementar)

- `npm run lint` em `c:\LOPES\www\byshop\www`
- `npm run build` em `c:\LOPES\www\byshop\www`
- Checagem manual:
  - Home: header renderiza corretamente (logo, menu desktop, busca, wishlist/cart, login).
  - Mobile: botão abre/fecha menu e os links funcionam.

