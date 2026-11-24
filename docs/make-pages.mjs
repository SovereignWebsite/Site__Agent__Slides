// make-pages.mjs: turn docs/factory/dinis-cruz/account-<x>/<name>.md into site/factory/dinis-cruz/account-<x>/<name>/index.html, in this site's own shell
// (the head, the family credit, the header and the footer of site/index.html). No dependencies.
//   node docs/make-pages.mjs
// Markdown covered: headings, paragraphs, lists (ordered and not), tables, links, `code`, **bold**, *italic*.
// slides.d@SovereignWebsite.dinis, 23 November 2026.
import { readFileSync, writeFileSync, readdirSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const HOST = 'https://slides.agents.sovereignweb.site';
const shell = readFileSync('site/index.html', 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inline(s) {
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => `\u0000${codes.push(esc(c)) - 1}\u0000`);
  s = esc(s);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => `<a href="${u}">${t}</a>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${codes[+i]}</code>`);
}

function md(text) {
  const out = [], lines = text.replace(/\r/g, '').split('\n');
  let i = 0, title = '', last = 'Table';
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { i++; continue; }
    const h = l.match(/^(#{1,4})\s+(.*)$/);
    if (h) { const n = h[1].length; if (n === 1 && !title) title = h[2]; last = h[2].replace(/[`*]/g, ''); out.push(`<h${n}>${inline(h[2])}</h${n}>`); i++; continue; }
    if (/^\|/.test(l)) {
      const rows = []; while (i < lines.length && /^\|/.test(lines[i])) rows.push(lines[i++]);
      const cells = (r) => r.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const body = rows.filter((r, k) => k !== 1 || !/^\|[\s:-|]+\|$/.test(r));
      out.push(`<div class="table" role="region" aria-label="${esc(last)}" tabindex="0"><table>`, `<thead><tr>${cells(body[0]).map((c) => `<th scope="col">${inline(c)}</th>`).join('')}</tr></thead>`, '<tbody>');
      for (const r of body.slice(1)) out.push(`<tr>${cells(r).map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`);
      out.push('</tbody></table></div>'); continue;
    }
    const li = l.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
    if (li) {
      const ordered = /\d/.test(li[2]); const items = [];
      while (i < lines.length) {
        const m = lines[i].match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
        if (m) { items.push(m[3]); i++; } else if (/^\s{2,}\S/.test(lines[i]) && items.length) { items[items.length - 1] += ' ' + lines[i].trim(); i++; } else break;
      }
      const tag = ordered ? 'ol' : 'ul';
      out.push(`<${tag}>${items.map((x) => `<li>${inline(x)}</li>`).join('')}</${tag}>`); continue;
    }
    const para = []; while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|\||\s*([-*]|\d+\.)\s)/.test(lines[i])) para.push(lines[i++].trim());
    out.push(`<p>${inline(para.join(' '))}</p>`);
  }
  return { title, html: out.join('\n') };
}

function page({ path, title, description, body }) {
  const url = `${HOST}${path}`;
  let s = shell;
  s = s.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  for (const k of ['description', 'og:description', 'twitter:description']) s = s.replace(new RegExp(`(<meta (?:name|property)="${k}" content=")[^"]*(")`), `$1${esc(description)}$2`);
  for (const k of ['og:title', 'twitter:title']) s = s.replace(new RegExp(`(<meta (?:name|property)="${k}" content=")[^"]*(")`), `$1${esc(title)}$2`);
  s = s.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`).replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  s = s.replace(/<style>/, '<style>\n.table{overflow-x:auto}table{border-collapse:collapse;width:100%;font-size:.9rem;margin:0 0 1rem}th,td{border-bottom:1px solid var(--line);padding:.4rem .5rem;text-align:left;vertical-align:top;color:var(--fg)}h3{font-size:1.05rem;margin:1.5rem 0 .4rem}main li{color:var(--muted)}');
  const a = s.indexOf('<main id="main">'), b = s.indexOf('<footer>', a);
  return s.slice(0, a) + `<main id="main">\n<div class="mark"><a href="/factory/dinis-cruz/account-d/">slides.d, account D</a></div>\n${body}\n` + s.slice(b);
}

const root = 'docs/factory/dinis-cruz';
for (const acct of readdirSync(root)) {
  const d = join(root, acct); if (!statSync(d).isDirectory()) continue;
  for (const f of readdirSync(d).filter((x) => x.endsWith('.md'))) {
    const name = f.replace(/\.md$/, ''), src = readFileSync(join(d, f), 'utf8');
    const { title, html } = md(src);
    const first = (src.split('\n\n').find((p) => p.trim() && !p.startsWith('#')) || title).replace(/[`*[\]]|\([^)]*\)/g, '').replace(/\s+/g, ' ').trim().slice(0, 200);
    const path = name === 'index' ? `/factory/dinis-cruz/${acct}/` : `/factory/dinis-cruz/${acct}/${name}/`;
    const outDir = join('site', path); mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), page({ path, title: title.replace(/\s*\(.*$/, ''), description: first, body: html }));
    console.log(`make-pages: ${join(d, f)} -> ${join(outDir, 'index.html')}`);
  }
}
