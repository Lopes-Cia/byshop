# Tasks

- [x] Task 1: Criar componente base reutilizável para páginas institucionais
  - [x] Criar `www/components/institucional/pagina-institucional.tsx` com:
    - Hero (label institucional + título + descrição)
    - CTAs (primário e secundário)
    - Seções por dados (cards/bullets)
    - FAQ opcional usando `components/ui/accordion`
  - [x] Garantir que o componente não importa/renderiza `Header`/`Footer`

- [x] Task 2: Implementar `/central-de-ajuda` usando o componente base
  - [x] Substituir `PlaceholderPage` por conteúdo real
  - [x] Incluir CTAs para `/trocas-e-devolucoes`, `/frete-e-entrega`, `/privacidade`, `/termos`

- [x] Task 3: Implementar `/frete-e-entrega` usando o componente base
  - [x] Substituir `PlaceholderPage` por conteúdo real
  - [x] Incluir CTAs para `/central-de-ajuda` e `/produtos`

- [x] Task 4: Implementar `/trocas-e-devolucoes` usando o componente base
  - [x] Substituir `PlaceholderPage` por conteúdo real
  - [x] Incluir CTAs para `/central-de-ajuda` e `/produtos`

- [x] Task 5: Implementar `/termos` usando o componente base
  - [x] Substituir `PlaceholderPage` por conteúdo real
  - [x] Incluir CTAs para `/privacidade` e `/central-de-ajuda`

- [x] Task 6: Implementar `/privacidade` usando o componente base
  - [x] Substituir `PlaceholderPage` por conteúdo real
  - [x] Incluir CTAs para `/termos` e `/central-de-ajuda`

- [x] Task 7: Atualizar documentação do projeto
  - [x] Atualizar `.trae/docs/byshop/geral.md` removendo essas rotas da lista de placeholders e registrando entrega

- [x] Task 8: Verificação e checklist
  - [x] Verificar inspeção de código: CTAs/links corretos
  - [x] Verificar que páginas não importam `Header`/`Footer`
  - [x] Verificar diagnósticos TypeScript/Next no editor (GetDiagnostics)

# Task Dependencies
- Task 2–6 dependem de Task 1
- Task 7 depende de Task 2–6
- Task 8 depende de Task 2–7
