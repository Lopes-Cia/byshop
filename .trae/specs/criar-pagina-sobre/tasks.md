# Tasks

- [x] Task 1: Mapear o placeholder atual e definir estrutura da página “Sobre”
  - [x] Ler `www/app/(institucional)/sobre/page.tsx` e confirmar que **não** é placeholder
  - [x] Confirmar seções mínimas: Hero, Proposta/Valores, Como funciona, CTA final

- [x] Task 2: Implementar a página “Sobre a ByShop” usando o design atual
  - [x] Garantir markup real (server component por padrão), sem `PlaceholderPage`
  - [x] Usar Tailwind/shadcn já existentes (`components/ui/*` + utilitários do app)
  - [x] Garantir CTAs: `/produtos` e `/central-de-ajuda`

- [x] Task 3: Verificação estática e ajustes finos (sem navegador)
  - [x] Validar links/CTAs por inspeção de código (hrefs corretos)
  - [x] Verificar ausência de imports diretos de Header/Footer na página
  - [x] Rodar `lint` + `build` + `tsc` para validar TypeScript/Next

# Task Dependencies
- Task 2 depende de Task 1
- Task 3 depende de Task 2
