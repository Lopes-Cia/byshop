## Resumo

Organizar a Home em uma pasta própria sem alterar a URL `/`, movendo o arquivo atual `app/page.tsx` para um **route group**: `app/(home)/page.tsx`.

## Estado atual (confirmado)

- A Home (rota `/`) está implementada em [page.tsx](file:///c:/LOPES/www/byshop/www/app/page.tsx#L1-L17).
- Ela renderiza seções da home via `components/sections/*`.
- A documentação lista a rota `/` apontando para [app/page.tsx](file:///c:/LOPES/www/byshop/.trae/docs/byshop/geral.md#L63-L70).

## Decisão

- Manter a URL da Home como `/`.
- Usar **route group** do Next.js (`(home)`) para organizar o código sem mudar rotas públicas.

## Mudanças propostas

### 1) Mover a Home para `app/(home)/page.tsx`

- Criar a pasta `www/app/(home)/`.
- Mover o conteúdo de `www/app/page.tsx` para `www/app/(home)/page.tsx`.
- Remover `www/app/page.tsx` para evitar conflito de rota (não podem existir duas pages para `/`).

### 2) Atualizar documentação do mapa de rotas

- Em `c:\LOPES\www\byshop\.trae\docs\byshop\geral.md`, atualizar o link da rota `/` de `app/page.tsx` para `app/(home)/page.tsx`.

### 3) Checagem de referências

- Buscar referências a `app/page.tsx` (principalmente na documentação) e atualizar para o novo caminho.

## Critérios de aceite

- A rota `/` continua funcionando e renderizando as mesmas seções (Hero/Featured/Categories/Testimonials/Newsletter).
- `npm run lint` e `npm run build` passam.
- Não existem referências antigas a `app/page.tsx` na documentação.

## Verificação (após implementar)

- Rodar `npm run lint` e `npm run build` dentro de `c:\LOPES\www\byshop\www`.
- Abrir `/` no browser e confirmar que as seções continuam aparecendo normalmente.

