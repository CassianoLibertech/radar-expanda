import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { NOME, DESCRICAO, absoluta, caminho, ordenadas } from '../lib/site';

export async function GET(context) {
  const materias = ordenadas(await getCollection('materias')).slice(0, 50);
  return rss({
    title: NOME,
    description: DESCRICAO,
    site: absoluta('/', context.site),
    customData: '<language>pt-BR</language>',
    items: materias.map((m) => ({
      title: m.data.titulo,
      description: `${m.data.linha_fina} O que muda para a sua empresa: ${m.data.angulo}`,
      pubDate: m.data.data,
      link: absoluta(caminho(m), context.site),
      categories: [m.data.categoria],
    })),
  });
}
