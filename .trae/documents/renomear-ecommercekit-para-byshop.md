# Plano — Renomear EcommerceKit → ByShop

## Resumo

Atualizar a marca exibida no projeto de **EcommerceKit** para **ByShop**, cobrindo:
- Textos visíveis na UI (Logo e Footer)
- Documentação (README)
- Metadados do projeto (nome do pacote no `package.json` e `package-lock.json`)

## Análise do estado atual

Ocorrências confirmadas de “EcommerceKit”/“ecommercekit”:
- `www/components/logo.tsx`: texto do logo exibido no topo.
- `www/components/layout/footer.tsx`: copyright no rodapé.
- `www/README.md`: título e descrição.
- `www/package.json`: campo `"name": "ecommercekit"`.
- `www/package-lock.json`: campos `"name": "ecommercekit"` (raiz e `packages[""]`).

Não foram encontradas ocorrências adicionais em `.trae/`.

## Mudanças propostas (arquivos e ações)

### 1) UI — trocar marca exibida

- `www/components/logo.tsx`
  - **O que**: substituir `EcommerceKit` por `ByShop` no texto do `<span>`.
  - **Por quê**: este é o nome exibido no cabeçalho.
  - **Como**: alteração direta do literal.

- `www/components/layout/footer.tsx`
  - **O que**: substituir `EcommerceKit` por `ByShop` no texto do copyright.
  - **Por quê**: garantir consistência da marca no rodapé.
  - **Como**: alteração direta do literal.

### 2) Documentação — README

- `www/README.md`
  - **O que**: substituir `EcommerceKit` por `ByShop` no título e na primeira descrição.
  - **Como**:
    - `# EcommerceKit` → `# ByShop`
    - Primeira frase/menção “EcommerceKit is …” → “ByShop is …”
    - Ajustar também o título do preview (“EcommerceKit Preview”) para “ByShop Preview”.
  - **Nota**: o link da imagem atual aponta para `bundui/ecommerce-kit`. A mudança de nome não exige trocar a URL, apenas o texto/legenda.

### 3) Metadados — nome do pacote (npm)

- `www/package.json`
  - **O que**: substituir `"name": "ecommercekit"` por `"name": "byshop"`.
  - **Por quê**: refletir o nome real do projeto também nos metadados.
  - **Como**: alteração direta do campo `"name"`.

- `www/package-lock.json`
  - **O que**: atualizar os dois campos de nome:
    - Raiz: `"name": "ecommercekit"` → `"name": "byshop"`
    - `packages[""]`: `"name": "ecommercekit"` → `"name": "byshop"`
  - **Por quê**: manter lockfile consistente com `package.json`.
  - **Como**: alteração direta dos literais.

## Premissas e decisões

- “Nome correto” significa:
  - Marca exibida para o usuário final: **ByShop**
  - Nome do pacote (npm, projeto private): **byshop**
- Escopo limitado a substituir ocorrências diretas; não inclui mudança de domínio, assets (ex.: `logo.png`) ou identidade visual.

## Verificação (após aplicar as mudanças)

- Busca rápida para garantir que não sobrou nenhuma ocorrência:
  - Procurar por: `EcommerceKit`, `ecommercekit`, `ecommerce-kit`
- Checagens do projeto:
  - `npm run lint`
  - `npm run build`
- Sanidade visual:
  - Rodar `npm run dev` e confirmar no navegador que o logo e o rodapé exibem “ByShop”.

