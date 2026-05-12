# Trae Solo — Skills, MCP e Agentes (guia prático)

Este documento consolida recomendações de Skills, MCP servers e Agentes do Trae para apoiar o desenvolvimento do Byshop com Trae Solo.

## Objetivo

- Padronizar quais Skills instalar e quando usar.
- Reduzir retrabalho escolhendo o “skill certo” por cenário (design, implementação, testes, revisão, docs).
- Ter uma lista curta de MCP servers e agentes importáveis para acelerar o fluxo.

## Status no repositório

### Skills instaladas (project-level)

As skills abaixo já estão instaladas e versionadas no projeto (pasta `.agents/skills`) com lock em `skills-lock.json`:

- agent-browser
- brainstorming
- canvas-design
- chart-visualization
- data-analysis
- doc-coauthoring
- figma
- frontend-design
- git-commit
- notion-research-documentation
- vercel-composition-patterns
- vercel-react-best-practices
- webapp-testing

### Reinstalar a partir do lock

- `npx skills experimental_install -y`
- `npx skills ls`

### Como restaurar em outra máquina

- `npx skills experimental_install -y`
- `npx skills ls`

### Observação sobre frontend-skill

- O baseline cita `frontend-skill`, mas não foi instalado via `skills add` porque não há um pacote público estável/consistente no registry (os resultados apontam para uma origem sem o skill publicado).
- Quando precisarmos desse comportamento, a opção mais segura é usar o `frontend-design` (estilo forte) ou manter `frontend-skill` como skill “built-in” do Trae Solo, se estiver disponível no seu ambiente.

## Skills recomendadas (baseline para Trae Solo)

Baseado no guia “14 must-install skills for TRAE SOLO”, estas são as Skills que cobrem a maioria dos fluxos do dia a dia:

### Desenvolvimento e qualidade

- **git-commit**
  - Para gerar mensagens no padrão Conventional Commits e apoiar staging/commit de forma segura.
- **react-best-practices**
  - Para revisar qualidade/performance em projetos React/Next.js e sugerir melhorias estruturais.
- **webapp-testing**
  - Para verificar fluxos E2E, depurar UI e automatizar testes com Playwright.
- **composition-patterns**
  - Para refatorar componentes complexos usando padrões de composição.

### Produtividade e processo

- **brainstorming**
  - Para transformar pedido em design/escopo validável antes de implementar.
- **agent-browser**
  - Para automação de navegação, coleta de evidências e validação visual de páginas.

### UI/Design e conteúdo

- **figma**
  - Para extrair contexto de design e orientar implementação fiel ao layout.
- **frontend-design**
  - Para construir telas/landing com alta qualidade visual e estilo marcante.
- **frontend-skill**
  - Para UI mais “contida” e bem hierarquizada (boa para produto/saas).
- **chart-visualization**
  - Para gerar visualizações adequadas a dados e cenários de dashboard.
- **data-analysis**
  - Para análises em CSV/Excel (agregações, joins, queries).
- **canvas-design**
  - Para peças estáticas (capas, posters, visuais de marketing).
- **doc-coauthoring**
  - Para escrever e organizar documentação com um fluxo guiado.

Fonte:
- https://docs.trae.ai/solo/14-must-install-skills-for-trae-solo?_lang=en

## Skills recomendadas por cenário (Top 10)

O “Top 10 recommended skills for development scenarios” sugere um recorte por etapa do ciclo de desenvolvimento:

- **Design de UI**: `frontend-design`
- **Frontend (Next.js avançado)**: `cache-components` (quando o projeto usar PPR/Cache Components)
- **Full-stack**: `fullstack-developer` (para soluções end-to-end em TS/React/Node/DB)
- **Code review (frontend)**: `frontend-code-review`
- **Code review (geral)**: `code-reviewer`
- **Testes web**: `webapp-testing`
- **CI/CD / PR**: `pr-creator`

Fonte:
- https://docs.trae.ai/ide/top-10-recommended-skills-for-development-scenarios?_lang=en

## MCP servers mais usados (e quando usar)

MCP servers “aumentam o alcance” do agente: leitura de docs oficiais, automação de navegador, integração com GitHub, Figma, etc.

O guia “Most used MCP servers in TRAE” lista 10 MCP servers frequentes. Os mais úteis para o fluxo do Byshop:

- **Context7**
  - Para consultar documentação oficial e exemplos atualizados (evita implementação baseada em conhecimento desatualizado).
- **Playwright / Puppeteer**
  - Para automação de navegador, captura de screenshots e verificação de UI/fluxos.
- **Chrome DevTools MCP**
  - Para inspeção mais profunda (console, network, performance) em debugging e QA.
- **File System**
  - Para leitura/escrita estruturada no workspace (base de qualquer agente efetivo).
- **GitHub**
  - Para ações remotas (issues/PRs/repo) via API.
- **Figma AI Bridge**
  - Para extrair dados do design e reutilizar assets com menos “achismo”.
- **Memory**
  - Para manter preferências/decisões entre sessões (quando disponível).

Fonte:
- https://docs.trae.ai/ide/01fzsij0?_lang=en

## Agentes importáveis (one-click) e uso recomendado

O Trae fornece agentes prontos para importar e usar, isolando competências por domínio. Recomendações:

- **UI Designer (ui-designer)**
  - Quando a tarefa for layout, hierarquia visual, tokens e consistência de componentes.
- **Frontend Architect (frontend-architect)**
  - Quando a tarefa envolver arquitetura de UI, padrões de componentes, estado e performance.
- **Backend Architect (backend-architect)**
  - Para desenho de API, regras de negócio, dados, escalabilidade e segurança.
- **API Test Pro (api-test-pro)**
  - Para testes de contrato, funcionais, carga e checklist de confiabilidade de endpoints.
- **AI Integration Eng (ai-integration-engineer)**
  - Para integrar LLMs, recomendações e automações inteligentes.
- **DevOps Architect (devops-architect)**
  - Para CI/CD, ambientes, observabilidade e automação de deploy.
- **Performance Expert (performance-expert)**
  - Para profiling, análise de gargalos e recomendações de otimização.
- **Compliance Checker (compliance-checker)**
  - Para revisão de termos, privacidade e aderência a regulações.

Fonte:
- https://docs.trae.ai/ide/custom-agents-ready-for-one-click-import?_lang=en

## Fluxo sugerido (padrão de trabalho)

Um fluxo simples e repetível (especialmente para features maiores):

1. **brainstorming**
   - Fechar escopo, critérios de aceite, riscos e abordagem.
2. **doc-coauthoring**
   - Consolidar decisões em um documento curto (design/spec).
3. **Implementação (modo normal)**
   - Executar em mudanças pequenas e verificáveis.
4. **react-best-practices / code-reviewer**
   - Revisar qualidade e performance antes de merge/entrega.
5. **webapp-testing**
   - Validar fluxos críticos E2E e evidenciar comportamento.
6. **git-commit**
   - Padronizar commits (principalmente em times).

## Notas para o Byshop (Next.js + Tailwind + shadcn/ui)

- Para UI, priorize reuso de componentes existentes e consistência visual. Em tarefas de UI mais “sensíveis”, combine `ui-designer` + `frontend-architect`.
- Para debugging de páginas e fluxos de compra/auth, combine `webapp-testing` + Chrome DevTools MCP (console/network).
- Para dúvidas de API/SDKs, use Context7 antes de implementar (evita “API inventada”).

## Referências (origem do conteúdo)

- Top 10 recommended skills for development scenarios:
  - https://docs.trae.ai/ide/top-10-recommended-skills-for-development-scenarios?_lang=en
- Most used MCP servers in TRAE:
  - https://docs.trae.ai/ide/01fzsij0?_lang=en
- Custom agents ready for one-click import:
  - https://docs.trae.ai/ide/custom-agents-ready-for-one-click-import?_lang=en
- 14 must-install skills for TRAE SOLO:
  - https://docs.trae.ai/solo/14-must-install-skills-for-trae-solo?_lang=en
