import type { CollectionEntry } from 'astro:content';

export const NOME = 'Radar Expanda';
export const DESCRICAO = 'Notícias de negócios e tecnologia para donos e gestores de pequenas e médias empresas.';

export const CATEGORIAS: Record<string, string> = {
  ia: 'Inteligência artificial',
  startups: 'Startups',
  mercado: 'Mercado',
  'credito-e-impostos': 'Crédito e impostos',
  varejo: 'Varejo',
  marketing: 'Marketing',
  trabalho: 'Trabalho',
  mundo: 'Mundo',
  tecnologia: 'Tecnologia',
};
export const MENU = ['ia', 'mercado', 'credito-e-impostos', 'varejo', 'marketing', 'startups', 'mundo'];

// LANCADO=1 no workflow libera indexacao (robots e meta). Padrao: fechado.
export const LANCADO = (process.env.LANCADO ?? import.meta.env.LANCADO ?? '0') === '1';

// Caminho dentro do site respeitando o base (/radar-expanda no github.io; / no dominio proprio).
export function url(caminho = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const c = caminho.startsWith('/') ? caminho : '/' + caminho;
  return base + c;
}

export function absoluta(caminho: string, site: URL | undefined): string {
  return new URL(url(caminho), site ?? 'https://cassianolibertech.github.io').href;
}

type Materia = CollectionEntry<'materias'>;

// id "AAAA-MM-DD-slug" -> /AAAA/MM/slug/
export function partes(m: Materia) {
  return { ano: m.id.slice(0, 4), mes: m.id.slice(5, 7), slug: m.id.slice(11) };
}
export function caminho(m: Materia): string {
  const p = partes(m);
  return `/${p.ano}/${p.mes}/${p.slug}/`;
}

export function ordenadas(lista: Materia[]): Materia[] {
  return [...lista].sort((a, b) => b.data.data.getTime() - a.data.data.getTime());
}

const FMT_DATA = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', day: '2-digit', month: 'long', year: 'numeric' });
const FMT_HORA = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' });
const FMT_CAB = new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo', weekday: 'long', day: '2-digit', month: 'long' });

export function dataHora(d: Date): string {
  return `${FMT_DATA.format(d)}, ${FMT_HORA.format(d)}`;
}
export function dataCabecalho(d: Date = new Date()): string {
  return FMT_CAB.format(d);
}
