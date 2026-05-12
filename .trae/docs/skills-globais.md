# Skills globais (Trae Solo) — catálogo curto

Este arquivo lista as **skills globais** disponíveis no ambiente do Trae (instaladas no usuário/IDE), com um resumo do que fazem e quando usar.

## Como listar (na máquina atual)

- Ver globais: `npx skills ls -g`
- Ver do projeto: `npx skills ls`

> Observação: skills globais podem variar entre máquinas. As skills do projeto ficam em `.agents/skills` e são restauradas via `skills-lock.json`.

## Catálogo (globais)

| Skill | O que faz | Use quando… |
|---|---|---|
| agent-browser | Automação de navegador (navegar, clicar, preencher, screenshot, extração). | Precisar interagir/testar/scrapar sites ou automatizar fluxos web/desktop (Electron). |
| ai-agent-development | Workflow para criar agentes e sistemas multi-agentes. | For desenhar/orquestrar agentes (CrewAI/LangGraph), ferramentas e memória. |
| algorithmic-art | Arte generativa em p5.js com parâmetros e seed. | Quiser gerar arte por código (ex.: p5.js) com controle e reprodutibilidade. |
| alipay-payment-integration | Guia de integração de pagamentos Alipay. | For integrar/depurar fluxos de pagamento via Alipay (web/app/QR/etc.). |
| BOILERPLATE_TRAE | Rotinas de boilerplate do Trae (estrutura, regras, contexto). | Quiser padronizar/atualizar a base do Trae no projeto. |
| brainstorming | Etapa obrigatória de entendimento + design antes de implementar. | Antes de criar feature, refatorar algo grande ou mudar comportamento. |
| brand-guidelines | Aplica guideline visual de marca (cores/tipografia). | For alinhar artefatos a uma identidade visual/brand system. |
| byted-seedance-video-generate | Geração de vídeo (Seedance). | Quiser criar vídeo a partir de texto/imagem/referências. |
| byted-seedream-image-generate | Geração de imagem (Seedream). | Quiser gerar imagens em estilos variados com boa qualidade. |
| canvas-design | Cria peças visuais estáticas (PNG/PDF) guiadas por “filosofia” visual. | For criar posters/capas/peças de marketing estáticas. |
| chart-visualization | Gera gráficos a partir de dados (linha, barra, pizza, etc.). | Precisar transformar dados em gráfico (inclui fluxos/diagramas). |
| consulting-analysis | Framework de relatório analítico “consulting-grade”. | For escrever research/market/competitivo com narrativa e recomendações. |
| data-analysis | Análise de CSV/XLSX com consultas e sumarização. | Você tiver arquivos de dados e quiser queries/sumários/pivôs. |
| defuddle | Extrai conteúdo “limpo” de páginas web (markdown). | Você colar uma URL para leitura/análise de docs/artigos sem ruído. |
| doc-coauthoring | Workflow guiado para coautoria de documentação. | For escrever docs, specs, RFCs, decisões e manuais. |
| dogfood | QA exploratório estruturado com evidências (passos, screenshots). | Quiser caçar bugs/UX issues e gerar relatório reproduzível. |
| douyin-interact-creation | Cria H5 offline (HTML único / zip sem dependências). | Precisar de uma experiência H5 “portable” e sem rede. |
| electron | Automatiza apps Electron via automação de navegador. | Quiser automatizar VS Code/Slack/Discord/Figma/Notion etc. |
| element-plus-vue3 | Referência/guia completo do Element Plus para Vue 3. | O projeto for Vue 3 com Element Plus (componentes/tema/i18n). |
| executing-plans | Executa um plano escrito com checkpoints. | Você já tiver um plano e quiser só executar com verificação. |
| figma | Integra com Figma (contexto, assets) para design-to-code. | Você tiver link/node do Figma e quiser implementar fielmente. |
| find-skills | Ajuda a descobrir e instalar novas skills via `npx skills`. | Quiser achar “uma skill para X” antes de reinventar. |
| frontend-design | Cria UI web com alta qualidade visual e identidade forte. | For construir/refinar telas, landing pages, dashboards, componentes. |
| frontend-skill | UI forte com composição contida e boa hierarquia. | Quiser um visual “produto” mais sóbrio, evitando UI genérica. |
| gemini-api-dev | Guia para desenvolvimento com Gemini API (SDKs e modelos). | For integrar Gemini (texto/multimodal/function calling/outputs). |
| gemini-interactions-api | Guia para Interactions API (Gemini) e migrações. | For implementar chat/streaming/tool use via Interactions API. |
| gemini-live-api-dev | Guia para Live API (streaming bidirecional). | For implementar voz/vídeo/texto em tempo real via WebSocket. |
| gh-cli | Referência do GitHub CLI (`gh`). | Quiser operar issues/PRs/actions pelo terminal com `gh`. |
| git-commit | Ajuda a criar commits (Conventional Commits) e staging inteligente. | Quiser automatizar commit (mensagem + stage organizado). |
| hook-analyzer | Analisa “hook” dos 3 primeiros segundos de um vídeo. | Quiser avaliar abertura/gancho com base em dados de cenas. |
| image-prompt-generator | Gera imagens via API (foco em fluxo iterativo de prompt). | Quiser criar thumbnails/headers/visuais via geração de imagem. |
| internal-comms | Modelos para comunicação interna (status, incident, update). | For redigir update executivo, status report, FAQ, post-mortem. |
| json-canvas | Cria/edita arquivos `.canvas` (Obsidian Canvas). | Você trabalhar com canvas/fluxos/mapas mentais no Obsidian. |
| landing-page-generator | Estrutura e otimiza landing pages (PPC/SEM/conversão). | Quiser criar/avaliar LP de campanha com foco em conversão. |
| mcp-builder | Guia para criar MCP servers (Node/TS ou Python). | Você for integrar serviços externos via MCP. |
| nano-banana | Geração/edição de imagem via modelos nativos do Gemini (inference.sh). | Quiser gerar/editar imagem via CLI (Gemini Image). |
| notion-cli | Automação/integração com Notion via CLI. | Quiser criar/consultar páginas/databases do Notion por comando. |
| notion-knowledge-capture | Captura conversa e transforma em página estruturada no Notion. | Quiser registrar decisões/insights de reuniões/conversas. |
| notion-meeting-intelligence | Prepara material de reunião via Notion (pre-read, agenda). | Quiser organizar agenda e contexto de reunião com base no Notion. |
| notion-research-documentation | Pesquisa no Notion e gera doc consolidado com citações. | Quiser varrer várias páginas do Notion e gerar um relatório. |
| notion-spec-to-implementation | Transforma spec do Notion em tarefas implementáveis. | Quiser quebrar spec em backlog com critérios de aceite. |
| obsidian-bases | Cria/edita `.base` (Obsidian Bases). | Quiser “mini-database”/views/filters dentro do Obsidian. |
| obsidian-cli | CLI para ler/criar/pesquisar notas no Obsidian. | Quiser automatizar gestão de vault/notes/tasks. |
| obsidian-markdown | Markdown “Obsidian flavored” (wikilinks, callouts, embeds). | Quiser produzir notas compatíveis com Obsidian. |
| pdf-extraction | Extrai texto/tabelas/metadados de PDF (pdfplumber). | Quiser minerar informações de PDF com precisão. |
| playwright | Automação real de navegador via Playwright CLI. | Precisar automatizar/testar UI com Playwright diretamente. |
| redis-development | Boas práticas e otimização de Redis (inclui vetores/caching). | Quiser modelar/otimizar Redis (performance, estruturas, cache). |
| report-generator | Gera relatório de análise de vídeo (Markdown) com base em dados. | Quiser transformar análises em relatório estruturado. |
| research-workflow | Workflow estruturado de pesquisa (plano → buscas → síntese). | For fazer pesquisa profunda com múltiplas fontes e síntese. |
| screenshot | Captura screenshot de tela/área/app quando pedido explicitamente. | O usuário pedir screenshot do sistema (evidência visual). |
| security-best-practices | Revisão de boas práticas de segurança (py/js/go) sob demanda. | O usuário pedir explicitamente review/guia de segurança. |
| shadcn | Gerencia shadcn/ui (instalar, corrigir, compor componentes). | Quiser adicionar/ajustar componentes shadcn/ui no projeto. |
| Shadcn UI & Blocks | Catálogo grande de blocos/componentes shadcn/tailwind. | Quiser montar páginas com blocos (hero, pricing, navbar, etc.). |
| slides | Cria/edita `.pptx` (PptxGenJS) e valida layout. | Quiser gerar/alterar apresentações editáveis. |
| tailwind-crafter | Especialista em Tailwind com documentação local (RAG). | Quiser implementar UI com Tailwind com precisão e consistência. |
| tailwind-css-patterns | Padrões de uso Tailwind (layout, tipografia, responsivo). | Quiser soluções de CSS utilitário e patterns consistentes. |
| tailwind-design-system | Design system com Tailwind (tokens, componentes, escala). | Quiser padronizar tokens/componentes e criar biblioteca interna. |
| tailwind-theme-builder | Setup de tema Tailwind v4 + shadcn (tokens/dark mode). | Quiser configurar/ajustar tema e tokens no Tailwind v4. |
| tailwindcss-advanced-layouts | Layouts avançados com Tailwind (Grid/Flex). | Quiser resolver layouts complexos (grid, sticky, responsive). |
| test-driven-development | Workflow de TDD antes de implementar feature/bugfix. | Quiser escrever testes primeiro e guiar a implementação. |
| text-to-image-prompt-optimizer | Otimiza prompts para geração de imagens (vários motores). | Quiser melhorar prompt e criar variações para gerar imagens. |
| theme-factory | Aplica temas (cores/fontes) a artefatos (docs/slides/html). | Quiser “tematizar” outputs de forma consistente. |
| vue-best-practices | Boas práticas Vue (preferência Composition API + TS). | For trabalhar com Vue 3 (router, pinia, SSR, etc.). |
| web-artifacts-builder | Artefatos web mais complexos (React/Tailwind/shadcn). | Quiser gerar “mini-app”/artefato com estado, rotas, etc. |
| web-design-guidelines | Auditoria de UI (acessibilidade e boas práticas). | Quiser revisar UX/a11y e conformidade com guidelines. |
| web-scraping | Scraping robusto (anti-bot, extração, cascatas). | Quiser extrair dados de sites com restrições/anti-bot. |
| webapp-testing | Testes/diagnóstico de webapp local (Playwright + logs/screens). | Quiser validar fluxos e capturar evidências durante testes. |
| writing-plans | Converte spec/requisitos em plano de implementação. | Antes de mexer em código em tarefas multi-etapas. |
