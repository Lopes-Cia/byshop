# Tasks

- [x] Task 1: Definir rotas pt-BR (pastas) e manter URL funcionando
  - [x] Criar/renomear pastas de rotas no `www/app/` para o mapeamento pt-BR (incluindo dinâmicas `[id]` e subrotas como `success`).
  - [x] Atualizar imports relativos que quebrarem devido à movimentação/renomeação.
  - [x] Garantir que não existam conflitos de rota (duas pastas gerando o mesmo slug).

- [x] Task 2: Atualizar navegação interna para novos slugs
  - [x] Atualizar `href` em Header/Navigation/Footer e páginas para usar as novas URLs.
  - [x] Atualizar navegação programática (`router.push/replace`) e geração de links com `next` param.

- [x] Task 3: Adicionar redirects permanentes (inglês -> pt-BR)
  - [x] Implementar `redirects()` em `www/next.config.ts` cobrindo o mapeamento.
  - [x] Validar que rotas antigas redirecionam para as novas (308 permanente).

- [x] Task 4: Traduzir textos para pt-BR (páginas + componentes compartilhados)
  - [x] Páginas em `app/(institucional)`, `app/(loja)`, `app/(shop)`, `app/(usuario)`.
  - [x] Componentes compartilhados renderizados nessas páginas (ex.: Header, Navigation, Footer e quaisquer outros com texto em inglês).
  - [x] Padronizar placeholders, headings e labels usados em testes E2E.

- [x] Task 5: Atualizar testes E2E
  - [x] Ajustar `www/tests/e2e/purchase-journey.spec.ts` para novos caminhos e textos pt-BR.
  - [x] Garantir seletores robustos onde textos mudarem (preferir roles/labels coerentes).

- [x] Task 6: Atualizar documentação
  - [x] Atualizar `.trae/docs/byshop/geral.md` para novos caminhos de arquivo e slugs.

- [x] Task 7: Verificação
  - [x] Rodar `npm run lint` e `npm run build` em `c:\LOPES\www\byshop\www`.
  - [x] Rodar Playwright E2E (`npm run test:e2e` se existir; senão, `npx playwright test`) e corrigir falhas relacionadas a rotas/texto.

# Task Dependencies
- Task 2 depende de Task 1
- Task 3 depende de Task 1
- Task 4 depende de Task 1 e Task 2
- Task 5 depende de Task 1, Task 2 e Task 4
- Task 6 depende de Task 1
- Task 7 depende de todas as anteriores
