# Mod Design — Processo de conversão (imagem → componente Next.js)

Este documento registra, de forma detalhada e replicável, o processo usado para transformar uma referência visual de header (imagem) em um componente funcional no projeto ByShop (Next.js App Router), mantendo o header existente (V1) e adicionando uma versão alternativa (V2).

## Nota (sistema de desenho)

- A tentativa de criar um “sistema de desenho” no `/dev/desenho` para diferenciar e testar componentes da interface acabou ficando **frágil**: mudanças pontuais e iteração rápida geraram drift visual (perda de consistência de espaçamento, tipografia, ícones e breakpoints).
- Conclusão: a implementação atual não é uma base confiável para “polish automático” sem uma estratégia mais rígida.

Nova estratégia (proposta):

- Tratar `/dev/desenho` como **referência visual** (modelo) e não como fonte de verdade de componentes do produto.
- Definir um “contrato de slots” para o header (TopBar / Nav / Actions), com tokens de tipografia e espaçamento padronizados (escala Tailwind) e breakpoints únicos (ex.: `sm/md/lg`).
- Centralizar ícones e hit-areas (uma única biblioteca/estilo, ex.: Lucide + tamanhos fixos) para evitar inconsistência óptica.
- Criar um fluxo de evolução: primeiro ajustar o modelo (wire/HTML) → depois traduzir para componente (HeaderV2) com checklist de UI/UX (consistência, foco, estados, responsividade).

## Objetivo prático

- Criar um **Header V2** inspirado no modelo da imagem, sem alterar o **Header V1** (design atual).
- Permitir alternar entre V1 e V2 via variável de ambiente pública: `NEXT_PUBLIC_HEADER_VARIANT`.
- Manter paridade funcional (busca, carrinho, wishlist, conta) e responsividade.

## Referências no código

- Wrapper (seleção de variante): [header.tsx](file:///c:/LOPES/www/byshop/www/components/layout/header.tsx)
- Implementação preservada (V1): [header-v1.tsx](file:///c:/LOPES/www/byshop/www/components/layout/header-v1.tsx)
- Implementação nova (V2): [header-v2.tsx](file:///c:/LOPES/www/byshop/www/components/layout/header-v2.tsx)
- Wireframe do HeaderV2 (skeleton): [header-v2-wireframe.tsx](file:///c:/LOPES/www/byshop/www/components/layout/header-v2-wireframe.tsx)
- Sandbox de desenho (apenas o header do modelo, sem chrome global): [page.tsx](file:///c:/LOPES/www/byshop/www/app/dev/desenho/page.tsx)
- Layout global onde o Header é renderizado: [layout.tsx](file:///c:/LOPES/www/byshop/www/app/layout.tsx)

## Processo (passo a passo)

### 1) Ler o “contrato” do Header atual (antes de mexer em UI)

O header atual não é só layout; ele tem responsabilidades e dependências que precisam continuar existindo em qualquer versão:

- **Rotas/links**: wishlist (`/favoritos`), carrinho (`/carrinho`), perfil (`/perfil`) e “entrar” (`/conta/entrar?next=...`).
- **Estado (Zustand)**:
  - carrinho: `useCartStore((s) => s.getItemCount())`
  - wishlist: `useWishlistStore((s) => s.getCount())`
  - auth: `useAuthStore()` (user/logout)
- **Responsividade**: navegação e busca no desktop, menu colapsável no mobile.

Resultado desta etapa:

- Definir que o V2 precisa manter essas integrações.
- Evitar “quebrar” o Header V1, extraindo-o para um arquivo próprio.

### 2) Decompor a imagem em blocos de UI (a parte “conversão”)

A imagem de referência sugere um header em **camadas (faixas horizontais)**, com hierarquia clara:

1. **Faixa utilitária (top bar)**:
   - Esquerda: contato (ex.: “Call us now…”, telefone).
   - Direita: atalhos (ex.: idioma/moeda) e acesso a conta.

2. **Faixa principal (main bar)**:
   - Logo centralizado (marca).
   - Busca em destaque (input com ícone/botão).

3. **Faixa de navegação (nav bar)**:
   - Menu de categorias (links em linha).
   - Carrinho com valor/contador.

O “truque” aqui é **não copiar pixels**; é traduzir a estrutura visual para componentes com:

- alinhamento (flex/grid),
- espaçamento (padding/margins),
- tipografia (sizes/weights),
- e estados (hover, focus, open/closed).

Resultado desta etapa:

- Um mapa de layout que vira markup semântico:
  - `<header>` contendo três linhas empilhadas.
  - `<nav>` para navegação principal.
  - ações em botões/links com ARIA.

### 3) Definir estratégia para não perder o V1 (branching por variante)

Para preservar o design atual:

- O arquivo `components/layout/header.tsx` vira um **wrapper** (ponto único de import).
- Ele escolhe qual implementação renderizar:
  - `NEXT_PUBLIC_HEADER_VARIANT === "v2"` → renderiza `HeaderV2`
  - qualquer outro valor/ausente → fallback para `HeaderV1`

Por que isso funciona bem em Next.js:

- É **retrocompatível**: todo lugar que importa `@/components/layout/header` continua igual.
- Permite deploy gradual: V2 pode ser testado em ambientes sem alterar o default.

### 4) Extrair o Header existente como `HeaderV1` (sem alterações)

Nesta etapa, o foco é “congelar” o comportamento atual:

- Copiar a implementação original do header para `header-v1.tsx`.
- Garantir que:
  - o markup,
  - as classes Tailwind,
  - e a lógica de stores/auth/menu
  permaneçam equivalentes.

Isso reduz risco: qualquer regressão do V1 fica muito improvável, porque ele deixa de sofrer alterações por causa do V2.

### 5) Implementar o `HeaderV2` seguindo o mapa da imagem

Com a estrutura (3 faixas) definida, a implementação do V2 segue este roteiro:

1. **Criar o esqueleto**:
   - `<header>` com fundo, bordas e sticky.
   - container `max-w-7xl` (mesmo padrão do projeto) para centralizar.
   - três linhas empilhadas (top/main/nav).

2. **Aplicar o layout desktop**:
   - Top bar: `flex`, `justify-between`, tipografia menor e cores neutras.
   - Main bar: logo central + busca (área proporcional).
   - Nav bar: menu de categorias com `Navigation` + carrinho à direita.

3. **Reusar componentes existentes**:
   - Marca: `Logo`
   - Menu: `Navigation`
   - Botões: `Button` (shadcn/ui)
   - Ícones: `lucide-react`

4. **Garantir paridade de comportamento**:
   - Wishlist e carrinho com badges quando count > 0.
   - Auth:
     - deslogado: CTA “Entrar”
     - logado: menu/ações de conta e logout

### 6) Responsividade (mobile-first de verdade)

A imagem é claramente desktop. Para mobile, a regra é: reduzir densidade visual e manter o essencial.

Estratégia aplicada no V2:

- Linha principal mobile concentra:
  - botão de menu (hamburger),
  - logo (ou versão reduzida),
  - carrinho,
  - acesso a conta (ou dentro do menu).
- Busca entra no menu colapsável (ou aparece como expansão) para economizar espaço.

### 7) Acessibilidade (o que é “conversão bem feita”)

Uma conversão UI→componente não é completa sem acessibilidade mínima:

- Botões de ícone com `aria-label` (ex.: “Abrir menu”, “Carrinho”, “Favoritos”).
- Hamburger com:
  - `aria-expanded`
  - `aria-controls` apontando para o painel do menu
- Input de busca com `aria-label` quando o placeholder não for suficiente.
- Preferir `<nav>` para agrupamentos de navegação.

### 8) Testabilidade: como garantir que V1 e V2 “existem” e estão ok

Validação aplicada:

- Lint e build do app.
- Smoke E2E com Playwright cobrindo:
  - V1 (fallback) em desktop e mobile
  - V2 (env setada) em desktop e mobile

Arquivo do teste:

- [header-variants-smoke.spec.ts](file:///c:/LOPES/www/byshop/www/tests/e2e/header-variants-smoke.spec.ts)

### 9) Sandbox de desenho (header do modelo) para evoluir com IA

Para tornar o processo “imagem → componente” **operacional** (não só uma implementação pontual), foi criado um sandbox em `/dev/desenho` com dois objetivos:

- Permitir ajustes finos de design em um ambiente isolado (sem “quebrar” o site).
- Manter uma referência **limpa** do layout-alvo (sem UI extra) para servir de base para automação/IA.

#### 9.1) Fonte de verdade do layout (modelo.html)

O arquivo `c:\LOPES\www\byshop\.trae\docs\design\modelo.html` contém a versão “manual” do header (HTML + CSS) e serve como referência de layout.

#### 9.2) Sandbox `/dev/desenho` (limpo)

A rota [page.tsx](file:///c:/LOPES/www/byshop/www/app/dev/desenho/page.tsx):

- Oculta o Header/Footer globais do layout para evitar ruído.
- Renderiza apenas o header do modelo, em Tailwind, espelhando a estrutura e breakpoints do `modelo.html`.
- Mantém `notFound()` em produção (rota de dev não deve existir no site público).

Detalhes atuais do modelo (para manter a referência útil e consistente):

- Top bar usa um menu de contato inline (lado a lado, alinhado à esquerda) com:
  - telefone: `tel:+5511999999999`
  - email: `mailto:contato@byshop.com`
- À direita, a top bar exibe ícones de redes sociais (lado a lado):
  - Facebook, Instagram, TikTok, WhatsApp (links placeholder no modelo)
- Navegação principal (links do modelo):
  - `Ofertas` → `/produtos?sale=1`
  - `Novidades` → `/produtos?sort=newest`
  - `Sobre nós` → `/sobre`
  - Implementação do `nav` no sandbox usa `NavigationMenu` (shadcn/ui): [main-nav.tsx](file:///c:/LOPES/www/byshop/www/app/dev/desenho/main-nav.tsx)
  - Mobile: o `nav` colapsa para um `Sheet` (drawer lateral) com os mesmos links (`lg:hidden` / `max-lg:hidden`)
- Logo vem de asset estático do app:
  - caminho: `/logo.png` (em `www/public/logo.png`)
  - fonte sincronizada: `.trae/docs/design/logo.png`

Observação:

- Uma versão anterior do sandbox tinha painel de contrato/wireframe. Essa UI foi removida para manter o `/dev/desenho` utilizável e focado em referência visual única.

## Como reproduzir localmente (manual)

### Rodar o app com V1 (default)

- Não defina `NEXT_PUBLIC_HEADER_VARIANT` (ou remova do ambiente).
- Inicie o dev server e valide:
  - desktop: navegação + busca + ações
  - mobile: menu colapsável + busca no menu

### Rodar o app com V2

- Defina `NEXT_PUBLIC_HEADER_VARIANT=v2`.
- Reinicie o dev server (variáveis públicas são resolvidas no build).
- Valide as 3 faixas no desktop e o comportamento colapsável no mobile.

## Critérios de aceite (resumo)

- V1 continua igual (não “herda” mudanças do V2).
- V2 reflete a estrutura da imagem (top/main/nav) e mantém paridade funcional.
- Mobile continua navegável, com busca acessível.
- Lint + build passam; smoke test cobre V1 e V2.
