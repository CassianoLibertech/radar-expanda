# Radar Expanda

Portal de notícias de negócios e tecnologia para donos e gestores de pequenas e médias empresas. Feito pela Expanda.

- Site estático em [Astro](https://astro.build) (MIT), publicado no GitHub Pages pelo workflow `.github/workflows/deploy.yml`.
- Matérias em `src/content/materias/AAAA-MM-DD-<slug>.md`; capas em `public/capas/AAAA/MM/<slug>.webp`.
  O formato está em `src/content.config.ts` e é escrito pelo pipeline editorial (commit pela API do GitHub).
- Cor e letra: só em `src/styles/tokens.css` (e a linha `FONTES_GOOGLE` em `src/layouts/Base.astro`).
- Indexação fechada até o lançamento: variável `LANCADO` do repositório (1 = aberto).
