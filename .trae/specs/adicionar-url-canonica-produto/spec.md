# URL Canônica de Produto (id-slug) Spec

## Why
Hoje o detalhe de produto usa `/produtos/{id}`. Queremos uma URL mais “amigável” e consistente para SEO, e evitar conteúdo duplicado quando o mesmo produto puder ser acessado por variações de URL.

## What Changes
- Adotar uma URL canônica para detalhe de produto no formato `/produtos/{id}-{slug}`.
- Aceitar acessos legados em `/produtos/{id}` e variações com slug divergente, redirecionando permanentemente (308) para a URL canônica.
- Atualizar geração de links internos para sempre apontar para a URL canônica.
- Expor canonical no metadata do detalhe do produto (`alternates.canonical`) para reforçar a versão canônica.

## Impact
- Affected specs: navegação/SEO de página de produto; consistência de links internos; compatibilidade de URLs existentes.
- Affected code:
  - Rota de detalhe de produto em `www/app/(shop)/produtos/*/page.tsx` (pasta dinâmica pode mudar).
  - Componentes que geram link para produto, como `www/components/ProductCard.tsx` (e qualquer outro `href` para `/produtos/...`).
  - Dados de produto (`www/lib/data`/schemas) caso seja necessário derivar slug de `product.name`.

## ADDED Requirements
### Requirement: URL canônica de produto
O sistema SHALL considerar como canônica a URL de detalhe do produto no formato `/produtos/{id}-{slug}`, onde:
- `{id}` é o identificador estável do produto.
- `{slug}` é derivado do nome do produto (minúsculo, sem acentos, separador `-`, apenas `a-z0-9-`, sem hífens duplicados).

#### Scenario: Acesso direto na URL canônica
- **WHEN** usuário acessa `/produtos/{id}-{slugCorreto}`
- **THEN** o detalhe do produto é renderizado normalmente
- **AND** o metadata inclui canonical apontando para a própria URL canônica

#### Scenario: Acesso legado por id (sem slug)
- **WHEN** usuário acessa `/produtos/{id}`
- **THEN** o sistema redireciona permanentemente (308) para `/produtos/{id}-{slugCorreto}`

#### Scenario: Acesso com slug incorreto
- **WHEN** usuário acessa `/produtos/{id}-{slugIncorreto}`
- **THEN** o sistema redireciona permanentemente (308) para `/produtos/{id}-{slugCorreto}`

#### Scenario: Produto inexistente
- **WHEN** usuário acessa qualquer variação de `/produtos/{id}...` com `{id}` inexistente
- **THEN** o sistema retorna 404 (página de “não encontrado”)

### Requirement: Links internos apontam para canônica
O sistema SHALL gerar links internos para detalhe do produto usando sempre o formato canônico `/produtos/{id}-{slug}`.

## MODIFIED Requirements
### Requirement: Rota de detalhe de produto aceita variações sem duplicar conteúdo
A rota de detalhe de produto SHALL aceitar tanto `id` quanto `id-slug`, mas SHALL renderizar conteúdo apenas na URL canônica (demais variações redirecionam).

## REMOVED Requirements
N/A

