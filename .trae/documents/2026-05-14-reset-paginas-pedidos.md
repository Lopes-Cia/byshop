# Plano — Reset das páginas de pedidos (versão em branco)

## Resumo
Reescrever as duas rotas de pedidos do usuário para uma versão “em branco” (fundo branco + título simples “Em refatoração”), removendo qualquer lógica/dados atuais para não atrapalhar a refatoração de design.

## Análise do estado atual
- A lista de pedidos está em [meus-pedidos/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/meus-pedidos/page.tsx)
  - Atualmente possui lógica de autenticação via `useAuthStore`, filtro por e-mail, e tabela com `Table`/`Badge`.
- O detalhe do pedido está em [meus-pedidos/[orderId]/page.tsx](file:///c:/LOPES/www/byshop/www/app/(usuario)/meus-pedidos/%5BorderId%5D/page.tsx)
  - Atualmente busca pedido via `useOrdersStore`, restringe por e-mail e renderiza cards com resumo/itens/totais/entrega.

## Mudanças propostas
### 1) Reset da lista (`/meus-pedidos`)
- Arquivo: `c:\LOPES\www\byshop\www\app\(usuario)\meus-pedidos\page.tsx`
- Substituir todo o conteúdo por uma página mínima:
  - Renderizar apenas:
    - `<main className="bg-white">`
    - container central (`max-w-4xl`, padding)
    - `<h1>` com texto “Em refatoração”
    - Link único de volta para `/` (Home) usando `next/link`
- Remover imports de stores e componentes de UI (Table/Badge/Button etc.), para garantir que nenhum dado/conteúdo atual “vaze” para a tela.
- Remover `"use client"` (opcional, recomendado): como não terá hooks nem estado, pode virar Server Component.

### 2) Reset do detalhe (`/meus-pedidos/[orderId]`)
- Arquivo: `c:\LOPES\www\byshop\www\app\(usuario)\meus-pedidos\[orderId]\page.tsx`
- Substituir todo o conteúdo por uma página mínima (mesma estrutura visual da lista):
  - Fundo branco + título “Em refatoração”
  - Link único “Voltar” para `/meus-pedidos`
- Remover qualquer leitura de `params.orderId` (não usar em UI), stores e componentes de UI.
- Remover `"use client"` (opcional, recomendado): a rota pode ser Server Component sem hooks.

## Decisões (travadas)
- Placeholder escolhido: **Título simples** (“Em refatoração”) em fundo branco.
- Páginas a zerar: **Lista + detalhe**.

## Riscos e mitigação
- Perda do código atual: mitigado por histórico do repositório (git). Se você preferir backup local fora do git, posso adicionar uma cópia dos arquivos antes do reset (ex.: `page.previous.tsx`), mas isso não é necessário para executar o reset.

## Verificação
- Abrir `/meus-pedidos` e confirmar que:
  - Só existe o título “Em refatoração” e link Home; nenhum dado de pedido aparece.
- Abrir `/meus-pedidos/qualquer-coisa` e confirmar que:
  - Só existe o título “Em refatoração” e link “Voltar”.
- Rodar `npm run lint` e `npm run build`.

