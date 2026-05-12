# Tasks

- [ ] Task 1: Definir utilitários de slug e parsing de rota
  - [ ] Definir regra de slug (normalização + remoção de acentos + hífen) sem adicionar dependências.
  - [ ] Definir regra de parsing do segmento `{id}-{slug}` (extrair `id` e preservar o restante como slug “informativo”).

- [ ] Task 2: Implementar rota de produto com canonical + redirect 308
  - [ ] Ajustar a rota dinâmica do detalhe para aceitar `{id}` e `{id}-{slug}` no mesmo handler.
  - [ ] Implementar 404 para produto inexistente.
  - [ ] Implementar redirect permanente (308) para:
    - Acesso por `{id}` sem slug
    - Acesso com slug divergente do slug calculado
  - [ ] Adicionar metadata canonical no detalhe do produto.

- [ ] Task 3: Atualizar links internos para usar a URL canônica
  - [ ] Atualizar `ProductCard` para linkar para `/produtos/{id}-{slug}`.
  - [ ] Buscar e atualizar outros lugares que montam `/produtos/${id}`.

- [ ] Task 4: Verificação
  - [ ] Validar build e lint: `npm run lint` e `npm run build` em `www/`.
  - [ ] Se houver Playwright E2E para navegação de produto, adicionar/ajustar um caso que valide:
    - `/produtos/{id}` redireciona para canônica
    - slug errado redireciona para canônica
    - canônica renderiza sem redirect

# Task Dependencies
- Task 2 depende de Task 1
- Task 3 depende de Task 1 e Task 2
- Task 4 depende de Task 2 e Task 3

# Notas de coordenação (tarefas paralelas)
- Se a tarefa “traduzir-rotas-ptbr” estiver renomeando pastas/rotas, executar Task 2 somente após estabilizar o caminho final do detalhe de produto (ex.: manter `/produtos/...`).

