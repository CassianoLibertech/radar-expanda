// Schema = contrato da materia (D-16, 24/10/2026). Mudar aqui exige mudar o pipeline (publicar.py) junto.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORIAS } from './lib/site';

const materias = defineCollection({
  // so AAAA-MM-DD-<slug>.md; o id vira "AAAA-MM-DD-<slug>"
  loader: glob({ pattern: '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-*.md', base: './src/content/materias' }),
  schema: z.object({
    titulo: z.string().min(5).max(110),
    linha_fina: z.string().max(200),
    data: z.coerce.date(),
    atualizado: z.coerce.date().nullable().optional(),
    categoria: z.enum(Object.keys(CATEGORIAS) as [string, ...string[]]),
    fontes: z.array(z.object({ nome: z.string().min(1), url: z.string().url() })).min(2),
    capa: z.string().startsWith('/capas/'),
    capa_alt: z.string().min(3),
    angulo: z.string().min(10),
    pauta: z.number().int(),
  }),
});

export const collections = { materias };
