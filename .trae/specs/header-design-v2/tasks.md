# Tasks
- [x] Task 1: Mapear o Header atual (V1) e preparar ponto de seleção
  - [x] Identificar onde o Header é importado/renderizado no layout global
  - [x] Definir a fonte da configuração (`NEXT_PUBLIC_HEADER_VARIANT`) e o fallback para V1

- [x] Task 2: Extrair o Header atual como V1 (sem mudanças visuais/comportamentais)
  - [x] Manter a implementação atual intacta em um componente dedicado (HeaderV1)
  - [x] Garantir que o export público `Header` continue funcionando como antes quando variante = V1

- [x] Task 3: Implementar Header V2 (layout inspirado no modelo)
  - [x] Criar estrutura em 3 faixas no desktop (utilitária, principal, navegação)
  - [x] Reutilizar `Logo` e `Navigation` quando possível, preservando links e comportamento
  - [x] Incluir busca, wishlist, carrinho e conta com paridade funcional

- [x] Task 4: Responsividade e acessibilidade do V2
  - [x] Implementar menu mobile colapsável (hamburger) e estados abertos/fechados
  - [x] Garantir que a busca seja utilizável no mobile (menu/expansão)
  - [x] Garantir labels/aria onde necessário (botões e inputs)

- [x] Task 5: Validação e regressão
  - [x] Validar manualmente V1 vs V2 (desktop e mobile)
  - [x] Rodar `npm run lint` e `npm run build` em `www/`
  - [x] (Opcional) Adicionar/ajustar teste Playwright de smoke para alternância V1/V2

- [x] Task 6: Atualizar documentação de andamento do projeto
  - [x] Atualizar `.trae/docs/byshop/geral.md` com a entrega do Header V2 e instruções de alternância

# Task Dependencies
- Task 3 depende de Task 1 e Task 2
- Task 4 depende de Task 3
- Task 5 depende de Task 2, Task 3 e Task 4
- Task 6 depende de Task 5
