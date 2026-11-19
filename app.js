/* ============================================================
   V for Victory — Mesa de consulta
   Interfaz (vanilla JS, sin dependencias)
   ============================================================ */

const RULES = window.VFV_RULES || { documents: [] };
const TOPICS = window.VFV_TOPICS || [];
const FAQ = window.VFV_FAQ || [];
const GCE = window.VFV_GCE || { facciones: [], reclutamiento: [] };

const DOCS = {};
for (const d of RULES.documents) DOCS[d.id] = d;

let INDEX = VFV.buildIndex(RULES.documents);

const main = document.getElementById('main');
const nav = document.getElementById('nav');
const toastEl = document.getElementById('toast');

const state = {
  view: 'buscar',
  query: '',
  docFilter: '',
  topicId: null,
  faqQuery: '',
  docPage: { doc: 'crb', idx: 0 },
  openFaq: new Set(),
};

/* ---------------- utilidades ---------------- */
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toastEl.classList.remove('show'), 1800);
}

function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

function pageUrl(docId, page) {
  if (window.VFV_LOCAL) return '#docs?doc=' + encodeURIComponent(docId) + '&page=' + page;
  const d = DOCS[docId];
  if (!d) return '#';
  return `${encodeURI(d.pdf)}#page=${page}`;
}

function stripHtml(html) {
  return String(html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');
}

function refsHtml(refs) {
  if (!refs || !refs.length) return '';
  const items = refs.map((r) => {
    const d = DOCS[r.doc];
    const label = d ? d.short : r.doc;
    return `<a href="${pageUrl(r.doc, r.page)}" data-local-doc="${r.doc}" data-page="${r.page}" target="_blank" rel="noopener"
      title="Abrir ${d ? d.title : r.doc} en la página ${r.page} del PDF">${label} p. ${r.page} ↗</a>`;
  });
  return `<div class="refs"><strong>Fuente:</strong> ${items.join(' ')}</div>`;
}

// Las fuentes externas se abren solo cuando el jugador lo solicita.
function onlineHtml(query) {
  const q = encodeURIComponent('V for Victory rules ' + query);
  const official = encodeURIComponent('site:studio-tomahawk.com V for Victory ' + query);
  return '<details class="card external"><summary>Consultar en internet</summary>' +
    '<p>Abre una búsqueda externa. La aplicación no lee ni verifica sus resultados. Prioriza publicaciones oficiales; una opinión de foro debe identificarse como interpretación.</p>' +
    '<a target="_blank" rel="noopener noreferrer" href="https://www.google.com/search?q=' + official + '">Buscar en Studio Tomahawk</a> · ' +
    '<a target="_blank" rel="noopener noreferrer" href="https://www.google.com/search?q=' + q + '">Buscar aclaraciones y foros</a></details>';
}
function sourceKind(refs) {
  if ((refs || []).some(r => r.doc === 'gce')) return 'Suplemento no oficial';
  return 'Resumen de fuentes oficiales';
}
function relatedHtml(entry) {
  const ids = entry.related || [];
  const related = FAQ.filter(f => ids.includes(f.id));
  if (!related.length) return '';
  return '<details class="source-detail"><summary>Reglas y FAQ relacionadas (' + related.length + ')</summary>' +
    related.map(f => '<div class="related-rule"><b>' + VFV.escapeHtml(f.q) + '</b>' + f.html + refsHtml(f.refs) + '</div>').join('') + '</details>';
}
function answerHtml(entry) {
  const evidence = (entry.evidence || []).map(e => '<div class="related-rule"><b>' + VFV.escapeHtml(e.label) + '</b><p>' + VFV.escapeHtml(e.text) + '</p>' + refsHtml([e.ref]) + '</div>').join('');
  return '<div class="answer-kind">' + (entry.status ? VFV.escapeHtml(entry.status) : sourceKind(entry.refs)) + '</div>' +
    entry.html + refsHtml(entry.refs) +
    (evidence ? '<details class="source-detail"><summary>Por qué se resuelve así</summary>' + evidence + '</details>' : '') + relatedHtml(entry);
}

/* ---------------- router ---------------- */
function go(view, opts = {}) {
  Object.assign(state, opts);
  state.view = view;
  location.hash = view;
  render();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

window.addEventListener('hashchange', () => {
  const v = location.hash.replace('#', '').split('?')[0];
  if (window.VFV_LOCAL && v === 'docs' && location.hash.includes('?')) {
    const params = new URLSearchParams(location.hash.split('?')[1]);
    state.docPage = { doc: params.get('doc') || 'crb', idx: Math.max(0, (Number(params.get('page')) || 1) - 1) };
    state.view = 'docs';
    render();
    return;
  }
  if (v && v !== state.view) {
    state.view = v;
    render();
  }
});

/* ---------------- vistas ---------------- */
function render() {
  for (const b of nav.querySelectorAll('button')) {
    b.classList.toggle('on', b.dataset.view === state.view);
  }
  main.innerHTML = '';
  const fn = {
    buscar: viewBuscar,
    temas: viewTemas,
    faq: viewFaq,
    secuencia: viewSecuencia,
    tablas: viewTablas,
    mesa: viewMesa,
    gce: viewGce,
    docs: viewDocs,
  }[state.view] || viewBuscar;
  fn();
}

/* ---------- 1. BUSCAR ---------- */
function viewBuscar() {
  const wrap = el(`
    <section>
      <h2 class="page-title">Buscar en el reglamento</h2>
      <p class="sub">Escribe lo que te está pasando en la mesa, en castellano o en inglés: primero busca en las
      explicaciones y en las preguntas, y luego en el texto original.</p>
      <div class="searchbox">
        <span class="glass">🔍</span>
        <input id="q" type="search" placeholder="Ej.: cobertura pesada, fuego reactivo, chequeo de moral, vehículo descubierto…" />
        <button class="clear" id="clearq" title="Borrar">×</button>
      </div>
      <div class="filters" id="filters">
        <button class="chip on" data-doc="">Todo</button>
        <button class="chip" data-doc="crb">Reglamento</button>
        <button class="chip" data-doc="e43">Suplemento 39-43</button>
        <button class="chip" data-doc="gce">Suplemento GCE</button>
      </div>
      <div class="note">Los temas y preguntas funcionan sin libros. Para consultar los originales, importa tus PDF en <a href="#docs">Mis libros</a>. Solo se busca dentro de las páginas con texto local.</div><div id="results"></div>
    </section>
  `);

  const input = wrap.querySelector('#q');
  const results = wrap.querySelector('#results');

  input.value = state.query;
  for (const c of wrap.querySelectorAll('.chip')) {
    c.classList.toggle('on', c.dataset.doc === state.docFilter);
  }

  function doSearch() {
    state.query = input.value;
    const q = state.query.trim();
    if (q.length < 2) {
      results.innerHTML = `<div class="card" style="color:var(--dim);font-size:13.6px">
        Escribe al menos 2 letras. También puedes probar con los <a href="#temas">temas</a>
        o las <a href="#faq">preguntas frecuentes</a>.<br><br>
        <span style="font-size:12.5px">El texto del reglamento está en inglés (OCR del escaneo): busca
        <em>cover</em>, <em>reactive fire</em>, <em>morale check</em>, <em>assault</em>… El suplemento de la
        Guerra Civil está en español.</span></div>`;
      return;
    }
    const terms = VFV.tokenize(q);
    const hits = VFV.searchBilingual(INDEX, q, { docId: state.docFilter, limit: 40 });
    const expl = VFV.searchEntries(TOPICS, FAQ, q, state.docFilter);

    if (!hits.length && !expl.length) {
      results.innerHTML = onlineHtml(q) + `<div class="card"><b>Sin resultados para «${VFV.escapeHtml(q)}».</b><br>
        <span style="font-size:13.4px;color:var(--dim)">Prueba con menos palabras o con sinónimos
        (por ejemplo <em>cover</em> en vez de «cobertura»).</span></div>`;
      return;
    }

    let html = onlineHtml(q);

    if (expl.length) {
      html += `<h3 class="sec-head">En castellano (${expl.length})</h3><div class="ans-list">`;
      html += expl
        .map((x) => {
          if (x.tipo === 'tema') {
            return `<div class="ans" data-tipo="tema" data-id="${x.id}">
              <div class="ans-top"><span class="badge">Tema</span>
              <b>${VFV.escapeHtml(x.titulo)}</b></div>
              <p>${VFV.highlight(x.resumen, terms)}</p></div>`;
          }
          return `<div class="ans" data-tipo="faq" data-id="${x.id}">
            <div class="ans-top"><span class="badge q">Pregunta</span>
            <b>${VFV.highlight(x.q, terms)}</b></div>
            ${answerHtml(x)}</div>`;
        })
        .join('');
      html += '</div>';
    }

    if (hits.length) {
      html += `<h3 class="sec-head">Texto original del reglamento (${hits.length} página/s)</h3>`;
      html += hits
        .map((h) => {
          const p = h.page;
          return `<a class="hit" href="${pageUrl(p.docId, p.page)}" target="_blank" rel="noopener"
              style="display:block;color:inherit;text-decoration:none" data-doc="${p.docId}" data-page="${p.page}">
            <div class="top">
              <span class="src">${VFV.escapeHtml(p.docTitle)}</span>
              <span class="pg">pág. ${p.page} del PDF ↗</span>
            </div>
            <p>${VFV.highlight(h.snippet, terms)}</p>
          </a>`;
        })
        .join('');
    }

    results.innerHTML = html;

    for (const a of results.querySelectorAll('.ans')) {
      a.addEventListener('click', (e) => {
        // los enlaces «Fuente» abren el PDF: no deben además cambiar de vista
        if (e.target.closest('a')) return;
        if (a.dataset.tipo === 'tema') go('temas', { topicId: a.dataset.id });
        else {
          state.openFaq.add(a.dataset.id);
          go('faq');
        }
      });
    }
  }

  input.addEventListener('input', debounce(doSearch, 130));
  wrap.querySelector('#clearq').addEventListener('click', () => {
    input.value = '';
    doSearch();
    input.focus();
  });
  for (const c of wrap.querySelectorAll('.chip')) {
    c.addEventListener('click', () => {
      state.docFilter = c.dataset.doc;
      for (const x of wrap.querySelectorAll('.chip')) x.classList.toggle('on', x === c);
      doSearch();
    });
  }

  main.appendChild(wrap);
  doSearch();
  if (!state.query) input.focus();
}

function debounce(fn, ms) {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}

/* Busca la consulta en los temas y preguntas redactadas en castellano.
   Hace un recorte de sufijos muy básico para que «dados» encuentre «dado». */
function buscarExplicaciones(terms) {
  return VFV.searchEntries(TOPICS, FAQ, terms.join(' '), typeof state === 'undefined' ? '' : state.docFilter);
}

/* ---------- 2. TEMAS ---------- */
function viewTemas() {
  if (state.topicId) return viewTopic(state.topicId);

  const wrap = el(`
    <section>
      <h2 class="page-title">Temas del reglamento</h2>
      <p class="sub">${TOPICS.length} explicaciones en castellano, ordenadas como se juega. Cada una enlaza a la página exacta del PDF.</p>
      <div id="tg"></div>
    </section>
  `);
  const tg = wrap.querySelector('#tg');

  const grupos = [];
  for (const t of TOPICS) {
    const cat = t.cat || 'Otros';
    let g = grupos.find((x) => x.cat === cat);
    if (!g) {
      g = { cat, items: [] };
      grupos.push(g);
    }
    g.items.push(t);
  }

  for (const g of grupos) {
    tg.appendChild(el(`<h3 class="cat-head">${VFV.escapeHtml(g.cat)}</h3>`));
    const grid = el('<div class="topic-grid"></div>');
    for (const t of g.items) {
      const card = el(`
        <div class="topic" data-id="${t.id}">
          <span class="ico">${t.icono || '📄'}</span>
          <h3>${VFV.escapeHtml(t.titulo)}</h3>
          <p>${VFV.escapeHtml(t.resumen || '')}</p>
        </div>
      `);
      card.addEventListener('click', () => go('temas', { topicId: t.id }));
      grid.appendChild(card);
    }
    tg.appendChild(grid);
  }

  main.appendChild(wrap);
}

function viewTopic(id) {
  const t = TOPICS.find((x) => x.id === id);
  if (!t) return go('temas', { topicId: null });
  const wrap = el(`
    <section class="article">
      <button class="btn" id="back" style="margin-bottom:16px">← Todos los temas</button>
      <h2 class="page-title">${t.icono || ''} ${VFV.escapeHtml(t.titulo)}</h2>
      ${t.html}
      ${refsHtml(t.refs)}${relatedHtml(t)}
      <div style="margin-top:22px">
        <button class="btn" id="tosearch">Buscar en el texto original</button>
      </div>
    </section>
  `);
  wrap.querySelector('#back').addEventListener('click', () => go('temas', { topicId: null }));
  wrap.querySelector('#tosearch').addEventListener('click', () =>
    go('buscar', { query: t.buscar || t.titulo, docFilter: '' })
  );
  main.appendChild(wrap);
}

/* ---------- 3. FAQ ---------- */
function viewFaq() {
  const cats = [...new Set(FAQ.map((f) => f.cat))];
  const wrap = el(`
    <section>
      <h2 class="page-title">Preguntas frecuentes</h2>
      <p class="sub">Dudas típicas de partida, con la respuesta corta y su respaldo en el reglamento.</p>
      <div class="searchbox" style="margin-bottom:14px">
        <span class="glass">🔍</span>
        <input id="fq" type="search" placeholder="Filtrar preguntas…" />
      </div>
      <div class="filters" id="fc">
        <button class="chip on" data-cat="">Todas</button>
        ${cats.map((c) => `<button class="chip" data-cat="${VFV.escapeHtml(c)}">${VFV.escapeHtml(c)}</button>`).join('')}
      </div>
      <div id="list"></div>
    </section>
  `);

  const list = wrap.querySelector('#list');
  const fq = wrap.querySelector('#fq');
  let cat = '';

  function draw() {
    const q = fq.value.trim();
    const found = q ? new Set(VFV.searchEntries([], FAQ, q).map(f => f.id)) : null;
    const items = FAQ.filter(
      (f) =>
        (!cat || f.cat === cat) &&
        (!found || found.has(f.id))
    );
    if (!items.length) {
      list.innerHTML = `<div class="card" style="color:var(--dim)">Ninguna pregunta coincide.</div>`;
      return;
    }
    list.innerHTML = items
      .map(
        (f) => `
      <div class="faq ${state.openFaq.has(f.id) ? 'open' : ''}" data-id="${f.id}">
        <button><span class="q">?</span><span>${VFV.escapeHtml(f.q)}</span><span class="caret">▸</span></button>
        <div class="a">${answerHtml(f)}</div>
      </div>`
      )
      .join('');
    for (const box of list.querySelectorAll('.faq')) {
      box.querySelector('button').addEventListener('click', () => {
        const id = box.dataset.id;
        box.classList.toggle('open');
        if (box.classList.contains('open')) state.openFaq.add(id);
        else state.openFaq.delete(id);
      });
    }
  }

  fq.addEventListener('input', debounce(draw, 120));
  for (const c of wrap.querySelectorAll('#fc .chip')) {
    c.addEventListener('click', () => {
      cat = c.dataset.cat;
      for (const x of wrap.querySelectorAll('#fc .chip')) x.classList.toggle('on', x === c);
      draw();
    });
  }

  main.appendChild(wrap);
  draw();
}

/* ---------- 4. SECUENCIA ---------- */
const SECUENCIA = [
  {
    fase: 'Antes de empezar (solo una vez)',
    pasos: [
      'Elegid cada uno una Orden de Batalla y un escenario.',
      'Montad la mesa y la escenografía según el escenario y desplegad.',
      'Gastad los puntos de refuerzo y apoyo que indique el escenario.',
      'Entregad la carta de Iniciativa al bando que diga el escenario, con su cara boca arriba.',
      'Robad las cartas de bonificación que proceda.',
    ],
  },
  {
    fase: '1. Preparación (cada turno)',
    pasos: [
      'Cada jugador pone en la mano sus 7 cartas de activación. No hay mazo del que robar.',
      'Se recupera la carta de Habilidad Especial.',
      'Se resuelven los efectos de «inicio de turno» que indique el escenario.',
    ],
  },
  {
    fase: '2. Activación (se repite 7 veces)',
    pasos: [
      'Ambos jugadores eligen una carta en secreto y la colocan boca abajo.',
      'Se revelan a la vez y resuelve primero el valor de Iniciativa más alto.',
      'El jugador activo elige el objetivo de la carta: una unidad, una escuadra o su comandante.',
      'Asigna las órdenes y resuelve las acciones (máximo 2 por unidad; las sobrantes se pierden).',
      'El rival puede reaccionar con fuego reactivo o retirándose.',
      'La carta se descarta. Si el rival aún no ha resuelto, pasa a ser el jugador activo.',
    ],
  },
  {
    fase: '3. Empate de Iniciativa',
    pasos: [
      'Decide el jugador con la carta de Iniciativa boca arriba.',
      'Puede resolver primero (y gira la carta de Iniciativa) o ceder el paso (la carta no gira).',
      'Tras resolverse ambas cartas, quien tiene la Iniciativa tira 1D12 en la tabla de eventos.',
    ],
  },
  {
    fase: '4. Fin de la fase de activación',
    pasos: [
      'Acaba cuando todas las unidades están desactivadas o cuando los jugadores se quedan sin cartas.',
      'Si un jugador no puede activar nada, sigue jugando cartas: pueden desencadenar eventos.',
    ],
  },
  {
    fase: '5. Mopping up (fin de turno)',
    pasos: [
      'Anotad los puntos de victoria que otorgue el escenario en ese turno.',
      'Comprobad si acaba la partida: último turno o una fuerza ha alcanzado su breakpoint.',
      'Si continúa, retirad SOLO las fichas de acción (rojas y verdes). El resto de marcadores se queda.',
      'Empezad el siguiente turno volviendo a la preparación.',
    ],
  },
];

function viewSecuencia() {
  const KEY = 'vfv.seq.' + new Date().toDateString();
  const done = new Set(JSON.parse(localStorage.getItem(KEY) || '[]'));
  const wrap = el(`<section>
    <h2 class="page-title">El turno, paso a paso</h2>
    <p class="sub">Marca las casillas durante la partida; se guardan hasta mañana. <button class="btn" id="reset" style="padding:4px 10px;font-size:12px">Reiniciar</button></p>
    <div id="seq"></div>
  </section>`);
  const box = wrap.querySelector('#seq');

  SECUENCIA.forEach((bloque, bi) => {
    const card = el(`<div class="card" style="margin-bottom:14px">
      <h3 style="margin:0 0 10px;font-size:15px;color:var(--acc)">${bloque.fase}</h3>
      <div class="steps"></div>
    </div>`);
    const steps = card.querySelector('.steps');
    bloque.pasos.forEach((p, i) => {
      const id = `${bi}-${i}`;
      const row = el(`<label class="check ${done.has(id) ? 'done' : ''}">
        <input type="checkbox" ${done.has(id) ? 'checked' : ''} />
        <span><span class="step-num">${i + 1}</span>${VFV.escapeHtml(p)}</span>
      </label>`);
      const cb = row.querySelector('input');
      cb.addEventListener('change', () => {
        if (cb.checked) done.add(id);
        else done.delete(id);
        row.classList.toggle('done', cb.checked);
        localStorage.setItem(KEY, JSON.stringify([...done]));
      });
      steps.appendChild(row);
    });
    box.appendChild(card);
  });

  wrap.querySelector('#reset').addEventListener('click', () => {
    localStorage.removeItem(KEY);
    render();
  });

  main.appendChild(wrap);
}

/* ---------- 5. TABLAS ---------- */
const TABLAS = window.VFV_TABLAS || [];

function viewTablas() {
  const wrap = el(`<section>
    <h2 class="page-title">Tablas y modificadores</h2>
    <p class="sub">Lo que más se consulta a media partida, en una sola pantalla. Reconstruidas desde las páginas de reglas: el escaneo no incluye la hoja de referencia rápida del libro.</p>
    <div class="filters" id="tnav"></div>
    <div id="tb"></div>
  </section>`);

  const nav2 = wrap.querySelector('#tnav');
  const tb = wrap.querySelector('#tb');

  for (const t of TABLAS) {
    const b = el(`<button class="chip">${VFV.escapeHtml(t.titulo)}</button>`);
    b.addEventListener('click', () => {
      const target = document.getElementById('t-' + t.id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    nav2.appendChild(b);

    tb.appendChild(
      el(`<div class="card table-card" id="t-${t.id}">
        <h3 style="margin:0 0 10px;font-size:15px;color:var(--acc)">${VFV.escapeHtml(t.titulo)}</h3>
        ${t.nota ? `<p class="note-line">${t.nota}</p>` : ''}
        ${t.html}
        ${refsHtml(t.refs)}
      </div>`)
    );
  }

  main.appendChild(wrap);
}

/* ---------- 6. HERRAMIENTAS ---------- */
function viewMesa() {
  const wrap = el(`<section>
    <h2 class="page-title">Herramientas de mesa</h2>
    <p class="sub">Dados, eventos aleatorios y control de marcadores. Nada se envía a internet.</p>
    <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(320px,1fr))">

      <div class="card">
        <h3 style="margin:0 0 12px;font-size:15px">🎲 Tirada de dados</h3>
        <div class="toolbar-row">
          <div><label class="lbl">Dado</label>
            <select class="field" id="dieType">
              <option value="6">D6</option>
              <option value="8">D8</option>
              <option value="12" selected>D12</option>
            </select></div>
          <div><label class="lbl">Nº de dados</label>
            <input class="field" id="dieCount" type="number" min="1" max="20" value="3" /></div>
          <div><label class="lbl">Éxito con</label>
            <select class="field" id="dieTarget">
              <option value="4">4+</option>
              <option value="5" selected>5+</option>
              <option value="6">6+</option>
              <option value="7">7+</option>
              <option value="8">8+</option>
              <option value="10">10+</option>
            </select></div>
        </div>
        <div class="dice-out" id="diceOut"></div>
        <div class="result-line" id="diceRes" style="color:var(--dim)"></div>
        <button class="btn primary" id="roll" style="margin-top:10px">Tirar</button>
      </div>

      <div class="card">
        <h3 style="margin:0 0 12px;font-size:15px">🃏 Evento aleatorio (1D12)</h3>
        <p style="font-size:13px;color:var(--dim);margin:0 0 10px">
          Se tira cuando hay empate de iniciativa, tras resolverse ambas cartas.</p>
        <button class="btn primary" id="evt">Tirar 1D12</button>
        <div id="evtOut" style="margin-top:12px;font-size:13.6px"></div>
      </div>

      <div class="card" style="grid-column:1/-1">
        <h3 style="margin:0 0 12px;font-size:15px">🎯 Control de unidades</h3>
        <p style="font-size:13px;color:var(--dim);margin:0 0 12px">
          Estrés (3 → sube un nivel de moral y vuelve a 0), marcador de Fuego y acciones usadas.</p>
        <table class="plain" id="unitTable">
          <thead><tr><th>Unidad</th><th>Estrés</th><th>Moral</th><th>Fuego</th><th>Acciones</th><th></th></tr></thead>
          <tbody></tbody>
        </table>
        <button class="btn" id="addUnit" style="margin-top:10px">+ Añadir unidad</button>
      </div>

    </div>
  </section>`);

  // dados
  const roll = wrap.querySelector('#roll');
  roll.addEventListener('click', () => {
    const sides = +wrap.querySelector('#dieType').value;
    const n = Math.max(1, Math.min(20, +wrap.querySelector('#dieCount').value || 1));
    const target = +wrap.querySelector('#dieTarget').value;
    const out = wrap.querySelector('#diceOut');
    const res = wrap.querySelector('#diceRes');
    out.innerHTML = '';
    let succ = 0;
    const values = [];
    for (let i = 0; i < n; i++) {
      const v = 1 + Math.floor(Math.random() * sides);
      values.push(v);
      if (v >= target) succ++;
      out.appendChild(el(`<div class="die ${v >= target ? 'ok' : 'fail'}">${v}</div>`));
    }
    res.innerHTML = `<span style="color:var(--txt)">${values.join(' · ')}</span><br>
      <b>${succ}</b> éxito(s) con ${n}d${sides} a ${target}+`;
  });

  // evento
  wrap.querySelector('#evt').addEventListener('click', () => {
    const n = 1 + Math.floor(Math.random() * 12);
    const ev = EVENTOS.find((e) => e.n === n);
    wrap.querySelector('#evtOut').innerHTML = ev
      ? `<span class="pill">${n}</span> <b>${ev.titulo}</b><br>${ev.texto}`
      : `<span class="pill">${n}</span> —`;
  });

  // unidades
  const KEY = 'vfv.units';
  let units = JSON.parse(localStorage.getItem(KEY) || '[]');
  if (!units.length) units = [{ n: 'Escuadra 1', stress: 0, morale: 0, fire: 0, acts: 0 }];
  const MORAL = ['Confiado', 'Sacudido', 'Fijado', 'En pánico'];
  const tbody = wrap.querySelector('#unitTable tbody');

  function save() {
    localStorage.setItem(KEY, JSON.stringify(units));
  }
  function draw() {
    tbody.innerHTML = '';
    units.forEach((u, i) => {
      const tr = el(`<tr>
        <td><input class="field" style="width:130px" value="${VFV.escapeHtml(u.n)}" data-i="${i}" data-k="n" /></td>
        <td>
          <button class="btn" style="padding:2px 9px" data-i="${i}" data-k="stress" data-d="-1">−</button>
          <b style="display:inline-block;min-width:20px;text-align:center">${u.stress}</b>
          <button class="btn" style="padding:2px 9px" data-i="${i}" data-k="stress" data-d="1">+</button>
        </td>
        <td>${MORAL[u.morale] || MORAL[0]}</td>
        <td><button class="btn" style="padding:2px 9px" data-i="${i}" data-k="fire" data-d="1">${u.fire ? '🔥' : '—'}</button></td>
        <td>
          <button class="btn" style="padding:2px 9px" data-i="${i}" data-k="acts" data-d="1">${u.acts}/2</button>
        </td>
        <td><button class="btn" style="padding:2px 9px" data-i="${i}" data-k="del">✕</button></td>
      </tr>`);
      tbody.appendChild(tr);
    });
    for (const inp of tbody.querySelectorAll('input[data-k="n"]')) {
      inp.addEventListener('input', () => {
        units[+inp.dataset.i].n = inp.value;
        save();
      });
    }
    for (const b of tbody.querySelectorAll('button[data-k]')) {
      b.addEventListener('click', () => {
        const i = +b.dataset.i;
        const k = b.dataset.k;
        const u = units[i];
        if (k === 'del') {
          units.splice(i, 1);
          save();
        } else if (k === 'stress') {
          u.stress += +b.dataset.d;
          if (u.stress < 0) u.stress = 0;
          if (u.stress >= 3) {
            u.stress = 0;
            u.morale = Math.min(3, u.morale + 1);
            toast('¡Moral: ' + MORAL[u.morale] + '!');
          } else if (u.stress < 0) u.stress = 0;
          save();
        } else if (k === 'fire') {
          u.fire = u.fire ? 0 : 1;
          save();
        } else if (k === 'acts') {
          u.acts = (u.acts + 1) % 3;
          save();
        }
        draw();
      });
    }
  }
  wrap.querySelector('#addUnit').addEventListener('click', () => {
    units.push({ n: 'Unidad ' + (units.length + 1), stress: 0, morale: 0, fire: 0, acts: 0 });
    save();
    draw();
  });
  draw();

  main.appendChild(wrap);
}

/* ---------- 6. GCE ---------- */
function viewGce() {
  const wrap = el(`<section>
    <h2 class="page-title">Suplemento Guerra Civil Española</h2>
    <p class="sub">"vforvictory GCE v3", suplemento no oficial de Magnuscapo / Irregulares Plan B (septiembre 2026). Necesita el reglamento básico.</p>
    <div class="filters" id="bandos">
      <button class="chip on" data-b="">Todos</button>
      <button class="chip" data-b="franquista">Bando franquista</button>
      <button class="chip" data-b="republicano">Bando republicano</button>
      <button class="chip" data-b="compartida">Fuerzas compartidas</button>
    </div>
    <div class="topic-grid" id="fac"></div>
    <div id="extra" style="margin-top:26px"></div>
  </section>`);

  const fac = wrap.querySelector('#fac');
  let filter = '';

  function draw() {
    fac.innerHTML = '';
    for (const f of GCE.facciones) {
      if (filter && f.bando !== filter) continue;
      const cls = f.bando === 'franquista' ? 'nat' : f.bando === 'republicano' ? 'rep' : '';
      const card = el(`<div class="topic" data-id="${f.id}">
        <span class="pill ${cls}">${f.etiqueta}</span>
        <h3 style="margin-top:8px">${VFV.escapeHtml(f.nombre)}</h3>
        <p>${VFV.escapeHtml(f.resumen)}</p>
      </div>`);
      card.addEventListener('click', () => goGceFaction(f.id));
      fac.appendChild(card);
    }
  }

  for (const c of wrap.querySelectorAll('#bandos .chip')) {
    c.addEventListener('click', () => {
      filter = c.dataset.b;
      for (const x of wrap.querySelectorAll('#bandos .chip')) x.classList.toggle('on', x === c);
      draw();
    });
  }

  const extra = wrap.querySelector('#extra');
  for (const s of GCE.secciones || []) {
    extra.appendChild(el(`<div class="card" style="margin-bottom:14px">
      <h3 style="margin:0 0 8px;font-size:15px;color:var(--acc)">${VFV.escapeHtml(s.titulo)}</h3>
      ${s.html}
    </div>`));
  }

  main.appendChild(wrap);
  draw();
}

function goGceFaction(id) {
  const f = GCE.facciones.find((x) => x.id === id);
  if (!f) return;
  const wrap = el(`<section class="article">
    <button class="btn" id="back" style="margin-bottom:16px">← Suplemento GCE</button>
    <h2 class="page-title">${VFV.escapeHtml(f.nombre)}</h2>
    <h3>Regla especial de pelotón</h3>
    <p><b>${VFV.escapeHtml(f.peloton.n)}.</b> ${VFV.escapeHtml(f.peloton.t)}</p>
    <h3>Regla especial de facción</h3>
    <p><b>${VFV.escapeHtml(f.faccion.n)}.</b> ${VFV.escapeHtml(f.faccion.t)}</p>
    ${f.nota ? `<div class="note">${f.nota}</div>` : ''}
    ${refsHtml(f.refs)}
  </section>`);
  wrap.querySelector('#back').addEventListener('click', () => go('gce'));
  main.innerHTML = '';
  main.appendChild(wrap);
  window.scrollTo({ top: 0, behavior: 'instant' });
}

/* ---------- 7. DOCUMENTOS ---------- */
function viewDocs() {
  if (window.VFV_LOCAL) return window.VFV_LOCAL.viewDocuments(main, state.docPage);
  const d = DOCS[state.docPage.doc] || DOCS.crb;
  const total = d.pages.length;
  let idx = state.docPage.idx || 0;
  if (Number.isNaN(idx)) idx = 0;
  idx = Math.max(0, Math.min(total - 1, idx));
  const p = d.pages[idx];

  const wrap = el(`<section>
    <h2 class="page-title">Documentos</h2>
    <p class="sub">Texto local de tus documentos. Sirve para localizar la página exacta; el original
    manda y el OCR tiene erratas de reconocimiento.</p>
    <div class="filters" id="docs">
      ${RULES.documents
        .map(
          (x) =>
            `<button class="chip ${x.id === d.id ? 'on' : ''}" data-d="${x.id}">${VFV.escapeHtml(x.short)}</button>`
        )
        .join('')}
    </div>
    <div class="card">
      <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline">
        <div>
          <b>${VFV.escapeHtml(d.title)}</b>
          <div style="font-size:12.5px;color:var(--dim)">${VFV.escapeHtml(d.note || '')}</div>
        </div>
        <a class="btn" href="${pageUrl(d.id, p.page)}" target="_blank" rel="noopener">Abrir en el PDF ↗</a>
      </div>
      <div class="pager">
        <button class="btn" id="prev" ${idx === 0 ? 'disabled' : ''}>←</button>
        <span style="font-size:13px;color:var(--dim)">Página</span>
        <input class="field" id="pg" type="number" min="${d.pages[0].page}" max="${d.pages[total - 1].page}" value="${p.page}" style="width:80px" />
        <span style="font-size:13px;color:var(--dim)">del PDF (${idx + 1} de ${total})</span>
        <button class="btn" id="next" ${idx === total - 1 ? 'disabled' : ''}>→</button>
      </div>
      <div class="viewer" id="viewer">${VFV.escapeHtml(p.text)}</div>
    </div>
  </section>`);

  wrap.querySelector('#prev').addEventListener('click', () =>
    go('docs', { docPage: { doc: d.id, idx: idx - 1 } })
  );
  wrap.querySelector('#next').addEventListener('click', () =>
    go('docs', { docPage: { doc: d.id, idx: idx + 1 } })
  );
  wrap.querySelector('#pg').addEventListener('change', (e) => {
    const wanted = +e.target.value || 1;
    let best = 0;
    d.pages.forEach((x, i) => {
      if (Math.abs(x.page - wanted) < Math.abs(d.pages[best].page - wanted)) best = i;
    });
    go('docs', { docPage: { doc: d.id, idx: best } });
  });
  for (const c of wrap.querySelectorAll('#docs .chip')) {
    c.addEventListener('click', () => go('docs', { docPage: { doc: c.dataset.d, idx: 0 } }));
  }

  main.appendChild(wrap);
}

/* ---------------- tabla de eventos ---------------- */
const EVENTOS = (window.VFV_EVENTOS || []).slice();

/* ---------------- eventos globales ---------------- */
nav.addEventListener('click', (e) => {
  const b = e.target.closest('button[data-view]');
  if (!b) return;
  go(b.dataset.view, { topicId: null });
});

document.addEventListener('keydown', (e) => {
  if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
    e.preventDefault();
    go('buscar');
    const q = document.getElementById('q');
    if (q) q.focus();
  }
  if (e.key === 'Escape') {
    const q = document.getElementById('q');
    if (q) q.blur();
  }
});

// arranque
const initial = location.hash.replace('#', '').split('?')[0] || 'buscar';
state.view = ['buscar', 'temas', 'faq', 'secuencia', 'tablas', 'mesa', 'gce', 'docs'].includes(initial)
  ? initial
  : 'buscar';
render();
