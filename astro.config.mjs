// Radar Expanda: site 100% estatico. SITE_URL, BASE_PATH e LANCADO vem do workflow (.github/workflows/deploy.yml).
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = process.env.SITE_URL || 'https://cassianolibertech.github.io';
const BASE = process.env.BASE_PATH ?? '/radar-expanda';

// Agrupa o corpo da materia em blocos: cada "## ..." abre uma <section class="bloco">;
// "## O que muda para a sua empresa" ganha tambem a classe "sua" (destaque).
function rehypeBlocos() {
  const texto = (n) => (n.type === 'text' ? n.value : (n.children || []).map(texto).join(''));
  return (tree) => {
    const saida = [];
    let atual = null;
    for (const n of tree.children) {
      if (n.type === 'element' && n.tagName === 'h2') {
        const sua = texto(n).trim().toLowerCase().startsWith('o que muda');
        atual = { type: 'element', tagName: 'section', properties: { className: sua ? ['bloco', 'sua'] : ['bloco'] }, children: [n] };
        saida.push(atual);
      } else if (atual) {
        atual.children.push(n);
      } else {
        saida.push(n);
      }
    }
    tree.children = saida;
  };
}

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [sitemap()],
  markdown: { rehypePlugins: [rehypeBlocos] },
});
