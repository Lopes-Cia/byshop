- [ ] A URL canônica `/produtos/{id}-{slug}` renderiza o detalhe do produto e expõe canonical no metadata.
- [ ] A URL `/produtos/{id}` redireciona permanentemente (308) para a canônica.
- [ ] A URL `/produtos/{id}-{slugIncorreto}` redireciona permanentemente (308) para a canônica.
- [ ] Produto inexistente retorna 404.
- [ ] Links internos (ex.: ProductCard) apontam para `/produtos/{id}-{slug}`.
- [ ] `npm run lint` e `npm run build` passam em `www/`.
- [ ] (Se aplicável) Playwright valida redirects e renderização canônica.

