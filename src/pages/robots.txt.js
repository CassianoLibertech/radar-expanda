import { LANCADO, absoluta } from '../lib/site';

// Ate o lancamento (LANCADO != 1): ninguem indexa.
export function GET(context) {
  const corpo = LANCADO
    ? `User-agent: *\nAllow: /\n\nSitemap: ${absoluta('/sitemap-index.xml', context.site)}\n`
    : 'User-agent: *\nDisallow: /\n';
  return new Response(corpo, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
