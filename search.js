/* ============================================================
   V for Victory — Consulta de reglamento
   Motor de búsqueda (sin dependencias, offline)
   ============================================================ */

const VFV = (() => {
  const norm = (s) =>
    (s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9ñç]+/g, ' ')
      .trim();

  const STOP = new Set(
    ('de la el los las un una unos unas y o u que en con por para del al a se su sus es son ' +
     'lo como mas menos cuando donde si no ni pero tambien muy sin sobre entre este esta estos estas ' +
     'aquel esa ese eso esos esas te tu tus mi mis le les me nos os ya hay ha han he has ser esta ' +
     'estan estaba puede pueden hacer tiene tienen todo toda todos todas otro otra otros otras')
      .split(' ')
  );

  function tokenize(text) {
    return norm(text)
      .split(' ')
      .filter((t) => t.length > 1 && !STOP.has(t));
  }

  // --- índice -------------------------------------------------
  function buildIndex(docs) {
    const pages = [];
    for (const doc of docs) {
      for (const p of doc.pages) {
        pages.push({
          docId: doc.id,
          docTitle: doc.title,
          docShort: doc.short,
          pdf: doc.pdf,
          page: p.page,
          text: p.text,
          raw: p.raw || p.text,
          tokens: tokenize(p.text),
          tf: null,
        });
      }
    }
    // frecuencia de documento por término (para idf)
    const df = Object.create(null);
    for (const p of pages) {
      const seen = new Set(p.tokens);
      for (const t of seen) df[t] = (df[t] || 0) + 1;
    }
    const N = pages.length;
    const idf = Object.create(null);
    for (const t in df) idf[t] = Math.log(1 + N / df[t]);
    for (const p of pages) {
      const tf = Object.create(null);
      for (const t of p.tokens) tf[t] = (tf[t] || 0) + 1;
      p.tf = tf;
    }
    return { pages, idf, N };
  }

  // --- búsqueda -----------------------------------------------
  function search(index, query, opts = {}) {
    const terms = tokenize(query);
    if (!terms.length) return [];
    const limit = opts.limit || 40;
    const results = [];

    for (const p of index.pages) {
      if (opts.docId && p.docId !== opts.docId) continue;
      let score = 0;
      let matched = 0;
      for (const term of terms) {
        let tf = p.tf[term];
        if (!tf) {
          // prefijo parcial (mín. 4 letras)
          if (term.length >= 4) {
            let partial = 0;
            for (const k in p.tf) if (k.startsWith(term)) partial += p.tf[k];
            if (partial) {
              tf = partial * 0.6;
            }
          }
        }
        if (tf) {
          matched++;
          score += (1 + Math.log(tf)) * (index.idf[term] || 1);
        }
      }
      if (!matched) continue;
      // exigir al menos la mitad de los términos (o todos si son 1-2)
      const need = terms.length <= 2 ? terms.length : Math.ceil(terms.length * 0.6);
      if (matched < need) continue;
      score *= 1 + 0.35 * (matched / terms.length);
      // ligero bonus si los términos aparecen cerca (frase)
      if (terms.length > 1 && norm(p.text).includes(terms.join(' '))) score *= 1.6;
      results.push({ page: p, score, matched });
    }

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, limit).map((r) => ({ ...r, snippet: snippet(r.page.text, terms) }));
  }

  function snippet(text, terms) {
    const n = norm(text);
    let best = 0;
    let bestScore = -1;
    const window = 340;
    for (let i = 0; i < Math.max(1, n.length - window); i += 40) {
      const chunk = n.slice(i, i + window);
      let s = 0;
      for (const t of terms) {
        let idx = chunk.indexOf(t);
        while (idx !== -1) {
          s++;
          idx = chunk.indexOf(t, idx + t.length);
        }
      }
      if (s > bestScore) {
        bestScore = s;
        best = i;
      }
    }
    const start = Math.max(0, best - 80);
    let out = text.slice(start, start + window + 80).replace(/\s+/g, ' ').trim();
    return (start > 0 ? '… ' : '') + out + ' …';
  }

  function highlight(html, terms) {
    let s = escapeHtml(html);
    for (const t of terms) {
      if (t.length < 3) continue;
      const re = new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[a-z0-9ñ]*)', 'gi');
      s = s.replace(re, (m) => {
        // comparar sin acentos
        const plain = norm(m);
        return plain.startsWith(t) ? '<mark>' + m + '</mark>' : m;
      });
    }
    return s;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // Cada grupo representa un concepto; los sinónimos no cuentan como requisitos extra.
  const GROUPS = [
    ['retirada', 'retirar', 'retroceder', 'retreat', 'fall back', 'falling back'],
    ['panico', 'panic', 'panicked', 'panicked'],
    ['suprimido', 'suprimida', 'fijado', 'pinned'],
    ['sacudido', 'shaken'],
    ['cobertura', 'cover'],
    ['pesada', 'heavy'],
    ['ligera', 'light'],
    ['reactivo', 'reactiva', 'reaccion', 'reacciono', 'reaccionar', 'reactive'],
    ['disparo', 'disparar', 'disparando', 'disparandome', 'dispandome', 'fuego', 'fire', 'shooting'],
    ['moral', 'morale'],
    ['estres', 'stress'],
    ['detectar', 'detectado', 'deteccion', 'localizar', 'localizado', 'spotting', 'spotted'],
    ['asalto', 'assault'],
    ['objetivo', 'objective'],
    ['tanque', 'carro', 'tank'],
    ['mortero', 'mortar'],
    ['salvar', 'salvacion', 'salvaciones', 'defence'],
  ];
  const stems = (t) => t.length > 4 ? t.replace(/(?:es|s)$/, '') : t;
  function concepts(query) {
    const n = norm(query);
    const out = [];
    const used = new Set();
    const tokens = tokenize(query);
    for (const token of tokens) {
      const group = GROUPS.findIndex(g => g.some(v => v === token || (v.includes(' ') && n.includes(v))));
      const key = group < 0 ? stems(token) : 'g' + group;
      if (!used.has(key)) {
        used.add(key);
        out.push(group < 0 ? [stems(token)] : GROUPS[group]);
      }
    }
    return out;
  }
  function matching(text, group) {
    const hay = ' ' + norm(text) + ' ';
    return group.some(v => hay.includes(' ' + v + ' ') ||
      (!v.includes(' ') && tokenize(text).some(t => stems(t) === stems(v))));
  }
  function searchEntries(topics, faqs, query, docId = '') {
    const groups = concepts(query);
    if (!groups.length) return [];
    const entries = topics.map(t => ({ ...t, tipo: 'tema', titulo: t.titulo }))
      .concat(faqs.map(f => ({ ...f, tipo: 'faq', titulo: f.q })));
    return entries.filter(x => !docId || (x.refs || []).some(r => r.doc === docId))
      .map(x => {
        const title = x.titulo;
        const keywords = x.buscar || x.plain || '';
        const body = String(x.html || '').replace(/<[^>]*>/g, ' ');
        const matched = groups.filter(g => matching(title + ' ' + keywords + ' ' + body, g)).length;
        const titleHits = groups.filter(g => matching(title, g)).length;
        const keyHits = groups.filter(g => matching(keywords, g)).length;
        const score = matched * 2 + titleHits * 5 + keyHits * 2 + (norm(title).includes(norm(query)) ? 12 : 0);
        return { ...x, c: matched, score, titleHits };
      })
      .filter(x => x.c >= Math.max(1, Math.ceil(groups.length * 0.45)))
      .sort((a, b) => b.score - a.score || b.titleHits - a.titleHits || a.id.localeCompare(b.id))
      .slice(0, 12);
  }
  function searchBilingual(index, query, opts = {}) {
    const groups = concepts(query);
    if (!groups.length) return [];
    return index.pages.filter(p => !opts.docId || p.docId === opts.docId)
      .map(p => {
        const matched = groups.filter(g => matching(p.text, g)).length;
        return { page: p, matched, score: matched / groups.length, snippet: snippet(p.text, groups.flat()) };
      })
      .filter(x => x.matched >= Math.max(1, Math.ceil(groups.length * 0.45)))
      .sort((a, b) => b.score - a.score || a.page.page - b.page.page)
      .slice(0, opts.limit || 40);
  }
  return { norm, tokenize, buildIndex, search, searchBilingual, searchEntries, concepts, snippet, highlight, escapeHtml };
})();
