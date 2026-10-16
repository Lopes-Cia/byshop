# AGENTS.md

Guia para agentes de IA que trabalham neste repositório. Mantenha este arquivo curto e atualizado.

## Visão geral

- Repositório `byshop`: o app Next.js fica em `www/` (raiz do repositório contém só `www/`, `.agents/` e `skills-lock.json`).
- `www/`: e-commerce **ByShop** (Next.js 16 App Router, React 19, TypeScript estrito, Tailwind CSS v4, shadcn/ui estilo `new-york` + Radix UI, ícones `lucide-react`).
- Idioma do produto: **pt-BR** (UI, rotas, textos e mensagens de commit).

## Comandos

Sempre execute a partir de `www/`. O gerenciador de pacotes é **npm** (há `www/package-lock.json`; não use pnpm/yarn).

```bash
cd www
npm run dev        # desenvolvimento
npm run build      # build de produção
npm run lint       # ESLint (flat config: eslint-config-next/core-web-vitals)
npx tsc --noEmit   # checagem de tipos
```

Atenção: `www/next.config.mjs` define `typescript.ignoreBuildErrors: true` e `images.unoptimized: true`. Ou seja, o `build` **não** valida tipos — use `npx tsc --noEmit` para isso.

## Estrutura

```
www/
├── app/                         # Next.js App Router
│   ├── layout.tsx               # layout raiz (lang="pt-BR", fontes Geist, metadata, Analytics)
│   ├── globals.css              # design tokens do Tailwind v4 (@theme inline, cores oklch)
│   ├── (main)/                  # rotas com o AppShell global
│   │   ├── layout.tsx           # aplica <AppShell> (Header + Footer + overlays)
│   │   ├── (loja)/(inicio)/      # home  -> /
│   │   ├── (shop)/              # produtos, carrinho, finalizar-compra, ofertas, presentes...
│   │   ├── (usuario)/           # conta, minha-conta, meus-pedidos, enderecos, lista-de-desejos
│   │   └── (institucional)/      # sobre, termos, privacidade, ajudas...
│   └── donmix/                  # variante Don Mix (layout próprio, SEM AppShell)
├── components/                  # componentes globais (header, footer, app-shell, product-card...)
│   └── ui/                      # componentes shadcn/ui
├── hooks/                       # hooks (use-mobile, use-toast)
├── lib/                         # schemas.ts (Zod), data.ts (mocks), mocks.ts, safe-storage.ts, utils.ts (cn)
├── public/images/               # assets (logos e fotos de produtos)
└── stores/                      # stores client (cart, orders, auth, wishlist, addresses)
```

- `components/app-shell.tsx` + `components/app-shell-context.tsx`: shell global. Use `useAppShell()` (ex.: `openCart()`) em vez de duplicar Header/Footer.
- `stores/*`: stores client com `useSyncExternalStore` + `localStorage` (persistência versionada via `lib/safe-storage.ts`).
- `lib/schemas.ts`: contratos Zod centralizados. `lib/data.ts`: dataset mockado (produtos/categorias).
- Aliases: `@/*` aponta para a raiz de `www/` (ex.: `@/lib/utils`, `@/components/ui/button`).

## Foco atual

O trabalho está concentrado na variante **`/donmix`** — página única em `www/app/donmix/page.tsx` (dados locais `CATEGORIAS`/`CARDAPIO` e o componente `MenuItemCard`). O card de produto usa `next/image` com `fill` + `object-contain` dentro da área `h-44`.

## Convenções

- Tailwind v4: tokens em `app/globals.css` (`@theme inline`, cores `oklch`). **Não** crie `tailwind.config.js`; prefira classes semânticas (`bg-background`, `text-foreground`, `border-border`) e o radius via `rounded-*`.
- Combine classes condicionais com `cn()` de `@/lib/utils`.
- Novos componentes shadcn/ui: `npx shadcn@latest add <componente>` → vão para `components/ui/`.
- Evite `Math.random()` durante o render (há comentários "IA-first" no código que explicam isso).
- Ao mexer em UI, rode `npm run lint` antes de finalizar.

## Design / UI

Skills de design estão instaladas em `.agents/skills/` (versionadas junto com `skills-lock.json`):

- `frontend-design` — direção visual, tipografia, estética não-templated.
- `web-design-guidelines` — revisão de UI/UX, acessibilidade e boas práticas web.
- `ui-ux-pro-max` — inteligência ampla de UI/UX (estilos, paletas, fontes, guidelines).

Considere usá-las antes de criar ou refatorar interfaces. Para atualizar: `npx skills update`.

## Git

- Commits no padrão Conventional Commits, com mensagens em pt-BR (ex.: `chore(donmix): remover categoria Salgados`).
- Só faça commit/push quando isso for solicitado explicitamente.

## Referências

- `www/README.md`: documentação detalhada da stack e dos componentes. Pode estar desatualizada em dois pontos: comandos (`pnpm` → `npm`) e a estrutura de páginas (hoje o `Header`/`Footer` vêm do `AppShell`, e a home fica em `app/(main)/(loja)/(inicio)/page.tsx`).
