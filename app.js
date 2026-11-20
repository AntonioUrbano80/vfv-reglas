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

// Vistas que cuelgan de la pestaña «Más» de la barra inferior.
const GRUPO_MAS = ['mas', 'secuencia', 'mesa', 'gce', 'docs'];
const VISTAS = ['buscar', 'temas', 'faq', 'tablas', ...GRUPO_MAS];

// Abreviatura de cada libro en los sellos de página.
const SIGLA = { crb: 'Regl.', e43: '39–43', gce: 'GCE' };

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

function icon(id, cls = '') {
  return `<svg class="${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
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

// Sello de página: el libro abreviado y la página del PDF.
function pagHtml(r) {
  const d = DOCS[r.doc];
  const sigla = SIGLA[r.doc] || (d ? d.short : r.doc);
  return `<a class="pag" href="${pageUrl(r.doc, r.page)}" data-local-doc="${r.doc}" data-page="${r.page}" target="_blank" rel="noopener"
    title="Abrir ${d ? VFV.escapeHtml(d.title) : r.doc} en la página ${r.page} del PDF"><small>${sigla}</small>${r.page}</a>`;
}

function refsHtml(refs) {
  if (!refs || !refs.length) return '';
  return `<div class="refs"><strong>Fuente</strong> ${refs.map(pagHtml).join('')}</div>`;
}

// Las fuentes externas se abren solo cuando el jugador lo solicita.
function onlineHtml(query) {
  const q = encodeURIComponent('V for Victory rules ' + query);
  const official = encodeURIComponent('site:studio-tomahawk.com V for Victory ' + query);
  return '<details class="external"><summary>Consultar en internet</summary>' +
    '<p>Abre una búsqueda externa. La aplicación no lee ni verifica sus resultados. Prioriza publicaciones oficiales; una opinión de foro es una interpretación.</p>' +
    '<p><a target="_blank" rel="noopener noreferrer" href="https://www.google.com/search?q=' + official + '">Buscar en Studio Tomahawk</a><br>' +
    '<a target="_blank" rel="noopener noreferrer" href="https://www.google.com/search?q=' + q + '">Buscar aclaraciones y foros</a></p></details>';
}
function sourceKind(refs) {
  if ((refs || []).some(r => r.doc === 'gce')) return 'Suplemento no oficial';
  return 'Resumen de fuentes oficiales';
}
function relatedHtml(entry) {
  const ids = entry.related || [];
  const related = FAQ.filter(f => ids.includes(f.id));
  if (!related.length) return '';
  return '<details class="source-detail"><summary>Reglas y preguntas relacionadas (' + related.length + ')</summary>' +
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
  if (v && v !== state.view && VISTAS.includes(v)) {
    state.view = v;
    render();
  }
});

/* ---------------- vistas ---------------- */
function render() {
  const tab = GRUPO_MAS.includes(state.view) ? 'mas' : state.view;
  for (const b of nav.querySelectorAll('button')) {
    const on = b.dataset.view === tab;
    b.classList.toggle('on', on);
    if (on) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  }
  document.body.dataset.view = state.view;
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
    mas: viewMas,
  }[state.view] || viewBuscar;
  fn();
}

/* ---------- 1. BUSCAR ---------- */
const SUGERENCIAS = ['cobertura pesada', 'fuego reactivo', 'chequeo de moral', 'empate de iniciativa', 'correr', 'embarcar en transporte'];

function viewBuscar() {
  const wrap = el(`
    <section>
      <h2 class="page-title">¿Qué pasa en la mesa?</h2>
      <p class="sub">Escribe la duda en castellano o en inglés.</p>
      <div class="searchbox">
        ${icon('buscar', 'glass')}
        <input id="q" type="search" enterkeyhint="search" autocomplete="off" spellcheck="false"
          placeholder="cobertura pesada, fall back, moral…" aria-label="Buscar en el reglamento" />
        <button class="clear" id="clearq" type="button" aria-label="Borrar la búsqueda">${icon('cerrar')}</button>
      </div>
      <div class="filters" id="filters" role="group" aria-label="Dónde buscar">
        <button class="chip on" data-doc="">Todo</button>
        <button class="chip" data-doc="crb">Reglamento</button>
        <button class="chip" data-doc="e43">39–43</button>
        <button class="chip" data-doc="gce">GCE</button>
      </div>
      <div id="results"></div>
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
      results.innerHTML = `<h3 class="sec-head">Prueba con</h3>
        <div class="sugerencias">${SUGERENCIAS.map((s) => `<button type="button">${s}</button>`).join('')}</div>
        <p class="ayuda-busqueda">El texto original del reglamento está en inglés: ahí funcionan mejor
        <em>cover</em>, <em>reactive fire</em> o <em>morale check</em>. El suplemento GCE está en castellano.
        ${window.VFV_LOCAL ? 'Para buscar dentro de los libros, impórtalos en <a href="#docs">Mis libros</a>.' : ''}</p>`;
      for (const b of results.querySelectorAll('.sugerencias button')) {
        b.addEventListener('click', () => {
          input.value = b.textContent;
          doSearch();
        });
      }
      return;
    }
    const terms = VFV.tokenize(q);
    const hits = VFV.searchBilingual(INDEX, q, { docId: state.docFilter, limit: 40 });
    const expl = VFV.searchEntries(TOPICS, FAQ, q, state.docFilter);

    if (!hits.length && !expl.length) {
      results.innerHTML = `<p class="contador">Sin resultados para «${VFV.escapeHtml(q)}».</p>
        <p class="ayuda-busqueda">Prueba con menos palabras o en inglés: <em>cover</em> en vez de «cobertura».</p>` + onlineHtml(q);
      return;
    }

    let html = '';

    if (expl.length) {
      html += `<h3 class="sec-head">Temas y preguntas <span class="n">${expl.length}</span></h3><div class="ans-list">`;
      html += expl
        .map((x) => {
          if (x.tipo === 'tema') {
            return `<div class="ans" data-tipo="tema" data-id="${x.id}">
              <div class="ans-top">
                <span class="tipo">${icon('temas')} Tema de ${VFV.escapeHtml((x.cat || '').toLowerCase())}</span>
                <b>${VFV.highlight(x.titulo, terms)}</b>
                <span class="pags">${(x.refs || []).slice(0, 2).map(pagHtml).join('')}</span>
              </div>
              <p>${VFV.highlight(x.resumen, terms)}</p></div>`;
          }
          return `<div class="ans" data-tipo="faq" data-id="${x.id}">
            <div class="ans-top">
              <span class="tipo">${icon('preguntas')} Pregunta de ${VFV.escapeHtml((x.cat || '').toLowerCase())}</span>
              <b>${VFV.highlight(x.q, terms)}</b>
            </div>
            <div class="faq-body">${answerHtml(x)}</div></div>`;
        })
        .join('');
      html += '</div>';
    }

    if (hits.length) {
      html += `<h3 class="sec-head">Texto original <span class="n">${hits.length} ${hits.length === 1 ? 'página' : 'páginas'}</span></h3><div class="hits">`;
      html += hits
        .map((h) => {
          const p = h.page;
          return `<a class="hit" href="${pageUrl(p.docId, p.page)}" target="_blank" rel="noopener" data-doc="${p.docId}" data-page="${p.page}">
            <span class="src">${VFV.escapeHtml(p.docTitle)}</span>
            <span class="pag" data-doc="${p.docId}"><small>${SIGLA[p.docId] || ''}</small>${p.page}</span>
            <p>${VFV.highlight(h.snippet, terms)}</p>
          </a>`;
        })
        .join('');
      html += '</div>';
    }

    results.innerHTML = html + onlineHtml(q);

    for (const a of results.querySelectorAll('.ans')) {
      a.addEventListener('click', (e) => {
        // los sellos de página abren el PDF: no deben además cambiar de vista
        if (e.target.closest('a, summary, details')) return;
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
      <h2 class="page-title">Temas</h2>
      <p class="sub">${TOPICS.length} explicaciones en castellano, ordenadas como se juega.</p>
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
    tg.appendChild(el(`<h3 class="cat-head">${VFV.escapeHtml(g.cat)} <span class="n">${g.items.length}</span></h3>`));
    const list = el('<ul class="lista"></ul>');
    for (const t of g.items) {
      const li = el(`<li><button data-id="${t.id}">
          <b>${VFV.escapeHtml(t.titulo)}</b>
          <span class="res">${VFV.escapeHtml(t.resumen || '')}</span>
          ${icon('flecha', 'flecha')}
        </button></li>`);
      li.querySelector('button').addEventListener('click', () => go('temas', { topicId: t.id }));
      list.appendChild(li);
    }
    tg.appendChild(list);
  }

  main.appendChild(wrap);
}

function viewTopic(id) {
  const t = TOPICS.find((x) => x.id === id);
  if (!t) return go('temas', { topicId: null });
  const wrap = el(`
    <section class="article">
      <button class="volver" id="back" type="button">${icon('volver')} Temas</button>
      <h2 class="page-title">${VFV.escapeHtml(t.titulo)}</h2>
      ${t.html}
      ${refsHtml(t.refs)}${relatedHtml(t)}
      <p style="margin-top:22px">
        <button class="btn" id="tosearch" type="button">${icon('buscar')} Buscar en el texto original</button>
      </p>
    </section>
  `);
  wrap.querySelector('#back').addEventListener('click', () => go('temas', { topicId: null }));
  wrap.querySelector('#tosearch').addEventListener('click', () =>
    go('buscar', { query: t.buscar || t.titulo, docFilter: '' })
  );
  main.appendChild(wrap);
}

/* ---------- 3. PREGUNTAS ---------- */
function viewFaq() {
  const cats = [...new Set(FAQ.map((f) => f.cat))];
  const wrap = el(`
    <section>
      <h2 class="page-title">Preguntas de mesa</h2>
      <p class="sub">${FAQ.length} dudas típicas con respuesta corta y su página.</p>
      <div class="searchbox small">
        ${icon('buscar', 'glass')}
        <input id="fq" type="search" autocomplete="off" placeholder="Filtrar preguntas" aria-label="Filtrar preguntas" />
      </div>
      <div class="filters" id="fc" role="group" aria-label="Categoría">
        <button class="chip on" data-cat="">Todas</button>
        ${cats.map((c) => `<button class="chip" data-cat="${VFV.escapeHtml(c)}">${VFV.escapeHtml(c)}</button>`).join('')}
      </div>
      <div id="list" class="faq-list"></div>
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
      list.innerHTML = `<p class="contador">Ninguna pregunta coincide. Prueba con otra palabra o elige «Todas».</p>`;
      return;
    }
    list.innerHTML = items
      .map((f) => {
        const open = state.openFaq.has(f.id);
        return `
      <div class="faq ${open ? 'open' : ''}" data-id="${f.id}">
        <button type="button" aria-expanded="${open}">${icon('flecha', 'caret')}<span>${VFV.escapeHtml(f.q)}</span></button>
        <div class="a">${answerHtml(f)}</div>
      </div>`;
      })
      .join('');
    for (const box of list.querySelectorAll('.faq')) {
      const btn = box.querySelector('button');
      btn.addEventListener('click', () => {
        const id = box.dataset.id;
        box.classList.toggle('open');
        const open = box.classList.contains('open');
        btn.setAttribute('aria-expanded', open);
        if (open) state.openFaq.add(id);
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
    <button class="volver" id="back" type="button">${icon('volver')} Más</button>
    <h2 class="page-title">El turno, paso a paso</h2>
    <p class="sub">Marca cada paso durante la partida. Las marcas se guardan hasta mañana.</p>
    <button class="btn" id="reset" type="button">Desmarcar todo</button>
    <div id="seq"></div>
  </section>`);
  const box = wrap.querySelector('#seq');

  SECUENCIA.forEach((bloque, bi) => {
    const fase = el(`<div class="fase"><h3>${bloque.fase}</h3><div class="steps"></div></div>`);
    const steps = fase.querySelector('.steps');
    bloque.pasos.forEach((p, i) => {
      const id = `${bi}-${i}`;
      const row = el(`<label class="check ${done.has(id) ? 'done' : ''}">
        <input type="checkbox" ${done.has(id) ? 'checked' : ''} />
        <span><span class="step-num">${i + 1}.</span> ${VFV.escapeHtml(p)}</span>
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
    box.appendChild(fase);
  });

  wrap.querySelector('#back').addEventListener('click', () => go('mas'));
  wrap.querySelector('#reset').addEventListener('click', () => {
    localStorage.removeItem(KEY);
    render();
  });

  main.appendChild(wrap);
}

/* ---------- 5. TABLAS ---------- */
const TABLAS = window.VFV_TABLAS || [];
const TABLA_CORTA = {
  turno: 'Turno', distancias: 'Medidas', spotting: 'Detección', disparo: 'Disparo', defensa: 'Defensa',
  at: 'Antitanque', 'armas-ligeras': 'Armas ligeras', asalto: 'Asalto', moral: 'Moral', danio: 'Daño',
  terreno: 'Terreno', montajes: 'Montajes',
};

function viewTablas() {
  const wrap = el(`<section>
    <h2 class="page-title">Tablas</h2>
    <nav class="segmentos" id="tnav" aria-label="Ir a la tabla"></nav>
    <div id="tb"></div>
    <p class="note-line">Reconstruidas desde las páginas de reglas: el escaneo no trae la hoja de referencia rápida.</p>
  </section>`);

  const nav2 = wrap.querySelector('#tnav');
  const tb = wrap.querySelector('#tb');
  const botones = [];
  let fijado = 0;
  // Borde inferior de la cabecera y las pestañas cuando están pegadas arriba.
  const tope = () => (document.getElementById('cab').offsetHeight || 0) + nav2.offsetHeight;

  function marcar(id) {
    for (const b of botones) {
      const on = b.dataset.t === id;
      b.classList.toggle('on', on);
      // desplaza solo la fila de pestañas: un scrollIntoView cortaría el desplazamiento de la página
      if (on) nav2.scrollLeft = b.offsetLeft - 16;
    }
  }

  for (const t of TABLAS) {
    const b = el(`<button type="button" data-t="${t.id}">${VFV.escapeHtml(TABLA_CORTA[t.id] || t.titulo)}</button>`);
    b.addEventListener('click', () => {
      const target = document.getElementById('t-' + t.id);
      if (target) {
        fijado = Date.now() + 1200; // durante el desplazamiento no se recalcula la pestaña
        window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top - tope() + 1, behavior: 'smooth' });
      }
      marcar(t.id);
    });
    nav2.appendChild(b);
    botones.push(b);

    tb.appendChild(
      el(`<div class="table-card" id="t-${t.id}">
        <h2>${VFV.escapeHtml(t.titulo)}</h2>
        ${t.nota ? `<p class="sub">${t.nota}</p>` : ''}
        ${t.html}
        ${refsHtml(t.refs)}
      </div>`)
    );
  }

  // Modificadores ▲/▼ en su columna, con color.
  for (const td of tb.querySelectorAll('td')) {
    if (td.parentElement.children.length !== 2) continue; // solo tablas de «situación / modificador»
    const v = (td.textContent || '').trim();
    if (/^[▲▼]\s*\d+$/.test(v)) td.classList.add('v', v[0] === '▲' ? 'sube' : 'baja');
    else if (v === '—' && !td.nextElementSibling) td.classList.add('v', 'nada');
  }

  if (botones.length) botones[0].classList.add('on');
  // Al desplazarse, se marca la última tabla cuyo título ya ha pasado bajo las pestañas.
  let pendiente = false;
  function alDesplazar() {
    if (!document.body.contains(wrap)) return window.removeEventListener('scroll', alDesplazar);
    if (pendiente || Date.now() < fijado) return;
    pendiente = true;
    requestAnimationFrame(() => {
      pendiente = false;
      const limite = tope() + 40;
      let actual = TABLAS[0] && TABLAS[0].id;
      for (const c of tb.querySelectorAll('.table-card')) {
        if (c.getBoundingClientRect().top <= limite) actual = c.id.slice(2);
      }
      const alFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (alFinal && TABLAS.length) actual = TABLAS[TABLAS.length - 1].id;
      marcar(actual);
    });
  }
  window.addEventListener('scroll', alDesplazar, { passive: true });

  main.appendChild(wrap);
}

/* ---------- 6. HERRAMIENTAS ---------- */

// Tablas de modificadores extraídas de la hoja de referencia rápida v2.5
const MODIFIER_TABLES = {
  antipersona: {
    titulo: 'Fuego Antipersonal / Armas Ligeras vs Vehículo Ligero',
    categorias: [
      {
        nombre: 'Tirador',
        mods: [
          { id: 'tirador_elite', label: 'Unidad Élite', boost: 1, burn: 0 },
          { id: 'tirador_recluta', label: 'Unidad Recluta', boost: 0, burn: 1 },
          { id: 'tirador_shaken', label: 'Unidad Shaken (amarilla)', boost: 0, burn: 2 },
          { id: 'tirador_reactivo', label: 'Fuego reactivo', boost: 0, burn: 2 },
          { id: 'tirador_torreta', label: 'Giró torreta antes de disparar', boost: 0, burn: 1 },
        ]
      },
      {
        nombre: 'Objetivo (solo equipos, no se acumulan)',
        mods: [
          { id: 'obj_equipo_pequeno', label: 'Equipo de ≤2 figuras', boost: 0, burn: 1 },
          { id: 'obj_cuerpo_tierra', label: 'Cuerpo a tierra / Camuflada', boost: 0, burn: 2 },
        ]
      },
      {
        nombre: 'Cobertura del objetivo (solo infantería; no en supresión)',
        mods: [
          { id: 'cob_ligera', label: 'Cobertura ligera / Recon', boost: 0, burn: 1 },
          { id: 'cob_pesada', label: 'Cobertura pesada', boost: 0, burn: 2 },
          { id: 'cob_he_edificios', label: 'HE vs edificios/bosque denso/jungla', boost: 2, burn: 0 },
        ]
      }
    ],
    nota: 'Los mods marcados en verde (equipo ≤2 fig, cob. ligera/pesada) NO se aplican al fuego indirecto. Cuerpo a tierra: objetivo recibe 1 estrés + tirador 2 burns.'
  },
  antitanque: {
    titulo: 'Fuego Antitanque (Factores A–D)',
    categorias: [
      {
        nombre: 'Tirador',
        mods: [
          { id: 'at_tirador_elite', label: 'Unidad Élite', boost: 1, burn: 0 },
          { id: 'at_tirador_recluta', label: 'Unidad Recluta', boost: 0, burn: 1 },
          { id: 'at_tirador_shaken', label: 'Unidad Shaken', boost: 0, burn: 2 },
          { id: 'at_tirador_reactivo', label: 'Fuego reactivo', boost: 0, burn: 2 },
          { id: 'at_tirador_movio', label: 'Movió antes de disparar', boost: 0, burn: 1 },
          { id: 'at_tirador_torreta', label: 'Giró torreta', boost: 0, burn: 1 },
        ]
      },
      {
        nombre: 'Cobertura del vehículo (≥ mitad tapado)',
        mods: [
          { id: 'at_cob_ligera', label: 'Cobertura ligera / Recon', boost: 0, burn: 1 },
          { id: 'at_cob_pesada', label: 'Cobertura pesada', boost: 0, burn: 2 },
        ]
      }
    ],
    nota: 'Blindaje baja 1 (mín 1) por flanco/retaguardia/arriba. No aplica a blindaje 0. Si no destruye, +1 estrés al final.'
  },
  asalto: {
    titulo: 'Asalto (Cuerpo a cuerpo)',
    categorias: [
      {
        nombre: 'Atacante / Defensor',
        mods: [
          { id: 'asalto_elite', label: 'Unidad Élite', boost: 1, burn: 0 },
          { id: 'asalto_recluta', label: 'Unidad Recluta', boost: 0, burn: 1 },
          { id: 'asalto_atacante', label: 'Unidades atacantes', boost: 2, burn: 0 },
          { id: 'asalto_defensor_desactivado', label: 'Defensor desactivado (sorprendido)', boost: 0, burn: 2 },
          { id: 'asalto_shaken_pinned', label: 'Unidad Shaken o Pinned', boost: 0, burn: 2 },
        ]
      },
      {
        nombre: 'Cobertura',
        mods: [
          { id: 'asalto_cob_ligera', label: 'En/detrás de cobertura ligera', boost: 0, burn: 1 },
          { id: 'asalto_cob_pesada', label: 'En/detrás de cobertura pesada', boost: 0, burn: 2 },
        ]
      }
    ],
    nota: 'FAQ 2025: infantería que asalta NO puede echarse cuerpo a tierra ante reactivo. Shaken = -2, Pinned = -4 (se separan). Empate = gana defensor. Panicked en asalto = todas las figuras se retiran como bajas.'
  },
  deteccion: {
    titulo: 'Detección (Spotting) — Base 3L (columna roja)',
    categorias: [
      {
        nombre: 'Objetivo',
        mods: [
          { id: 'det_obj_equipo_pequeno', label: 'Equipo ≤2 fig / Recon', boost: 0, burn: 1 },
          { id: 'det_obj_camuflada', label: 'Unidad camuflada', boost: 0, burn: 3 },
          { id: 'det_obj_fuego', label: 'Tiene marcador de Fuego', boost: 2, burn: 0 },
          { id: 'det_obj_vehiculo', label: 'Es un vehículo', boost: 2, burn: 0 },
        ]
      },
      {
        nombre: 'Observador',
        mods: [
          { id: 'det_obs_vehiculo', label: 'Vehículo (salvo descubierto)', boost: 0, burn: 1 },
        ]
      },
      {
        nombre: 'Clima (el peor)',
        mods: [
          { id: 'det_clima_lluvia', label: 'Lluvia / Cielo cubierto', boost: 0, burn: 1 },
          { id: 'det_clima_niebla', label: 'Niebla / Oscuridad', boost: 0, burn: 2 },
        ]
      },
      {
        nombre: 'Terreno',
        mods: [
          { id: 'det_ter_obstaculo', label: 'Cada obstáculo lineal cruzado', boost: 0, burn: 1 },
          { id: 'det_ter_cob_ligera', label: 'Cobertura ligera, por S', boost: 0, burn: 1 },
          { id: 'det_ter_cob_pesada', label: 'Cobertura pesada, por S', boost: 0, burn: 2 },
        ]
      }
    ],
    nota: 'Acumulativos. Mínimo M. >3L = toda la mesa. Quien observa y toca obstáculo lineal NO sufre su penalización. Recon y "equipo ≤2 fig" no se acumulan (solo -1). FAQ 2025: penalización -1 solo si <3 fig Y sin marcador Fuego.'
  },
  moral: {
    titulo: 'Chequeo de Moral — Éxito 5+',
    categorias: [
      {
        nombre: 'Modificadores (acumulables)',
        mods: [
          { id: 'mor_comandante', label: 'Comandante a M o menos (sin ver)', boost: 1, burn: 0 },
          { id: 'mor_cob_pesada', label: 'Cobertura pesada vs todos enemigos', boost: 1, burn: 0 },
          { id: 'mor_enemigo_cerca', label: 'Enemigo a M o menos con LoS', boost: 0, burn: 1 },
          { id: 'mor_pinned_panicked', label: 'Unidad Pinned o Panicked', boost: 0, burn: 1 },
          { id: 'mor_mitad_bajas', label: '>50% bajas (solo si empezó con 3+)', boost: 0, burn: 1 },
        ]
      }
    ],
    nota: 'Dado: Recruit d6, Trained d8, Elite d12. 3er estrés = baja moral y descarta todo estrés. Panicked: chequeo por cada estrés posterior.'
  }
};

function viewMesa() {
  const wrap = el(`<section>
    <button class="volver" id="back" type="button">${icon('volver')} Más</button>
    <h2 class="page-title">Herramientas</h2>

    <div class="herramienta">
      <h2>Tirada de dados (pool + boost/burn)</h2>
      <p class="sub">Añade dados al pool, selecciona modificadores de la tabla de referencia o pon boost/burn neto manual. La app transforma la reserva según la cadena d6− → d6 → d8 → d12 → d12+ y tira.</p>

      <div class="dice-tool-tabs" id="diceToolTabs">
        <button class="tab-btn active" data-tab="pool">Pool</button>
        <button class="tab-btn" data-tab="mods-antipersona">Antipersonal</button>
        <button class="tab-btn" data-tab="mods-antitanque">Antitanque</button>
        <button class="tab-btn" data-tab="mods-asalto">Asalto</button>
        <button class="tab-btn" data-tab="mods-deteccion">Detección</button>
        <button class="tab-btn" data-tab="mods-moral">Moral</button>
        <button class="tab-btn" data-tab="mods-manual">Manual</button>
      </div>

      <div class="tab-panel active" id="tab-pool">
        <div class="pool-editor" id="poolEditor">
          <div class="pool-header">
            <span>Pool de dados</span>
            <span class="pool-total" id="poolTotal">0 dados</span>
          </div>
          <div class="pool-list" id="poolList"></div>
          <div class="pool-add">
            <select class="field" id="addDieType">
              <option value="6">d6</option>
              <option value="8" selected>d8</option>
              <option value="12">d12</option>
            </select>
            <input type="number" class="field small" id="addDieCount" value="1" min="1" max="20" aria-label="Cantidad" />
            <button class="btn" id="addDieBtn" type="button">Añadir</button>
          </div>
          <div class="pool-mods">
            <label>Boost/Burn neto manual: <input type="number" class="field small" id="boostCount" value="0" min="-20" max="20" step="1" aria-label="Boosts netos (positivo = boost, negativo = burn)" /></label>
            <p class="note-line"><small>Boost = ▲ (sube escalón), Burn = ▼ (baja escalón). Se anulan: pon neto. +2 = dos boosts; −1 = un burn.</small></p>
          </div>
          <button class="btn primary" id="transformBtn" type="button">Transformar pool</button>
        </div>

        <div class="pool-result" id="poolResult" hidden>
          <h3>Reserva transformada</h3>
          <div class="transformed-list" id="transformedList"></div>
          <div class="net-display" id="netDisplay"></div>
          <button class="btn primary" id="rollPoolBtn" type="button">Tirar reserva</button>
        </div>

        <div class="dice-roll-result" id="diceRollResult" hidden>
          <div class="roll-header">
            <div class="exitos"><strong id="rollOkN">0</strong><span id="rollOkT">éxitos</span></div>
            <button class="btn small" id="rerollBtn" type="button" aria-label="Tirar de nuevo">Tirar de nuevo</button>
          </div>
          <div class="dice-out" id="diceRollOut"></div>
          <p class="note-line" id="rollDetail"></p>
        </div>
      </div>

      <div class="tab-panel" id="tab-mods-antipersona"></div>
      <div class="tab-panel" id="tab-mods-antitanque"></div>
      <div class="tab-panel" id="tab-mods-asalto"></div>
      <div class="tab-panel" id="tab-mods-deteccion"></div>
      <div class="tab-panel" id="tab-mods-moral"></div>
      <div class="tab-panel" id="tab-mods-manual">
        <div class="pool-mods">
          <label>Boost/Burn neto manual: <input type="number" class="field small" id="manualBoostCount" value="0" min="-20" max="20" step="1" /></label>
          <p class="note-line"><small>Introduce el neto final tras revisar las pestañas de modificadores. Se suma al neto calculado automáticamente.</small></p>
        </div>
      </div>
    </div>

    <div class="herramienta">
      <h2>Evento aleatorio</h2>
      <p class="sub">Se tira 1D12 cuando hay empate de iniciativa, tras resolverse ambas cartas.</p>
      <button class="btn primary" id="evt" type="button">Tirar 1D12</button>
      <div id="evtOut" class="evento"></div>
    </div>

    <div class="herramienta">
      <h2>Control de unidades</h2>
      <p class="sub">Tres de Estrés bajan un nivel de moral. Se guarda en este dispositivo.</p>
      <div class="unidades" id="units"></div>
      <p><button class="btn" id="addUnit" type="button">Añadir unidad</button></p>
    </div>
  </section>`);

  wrap.querySelector('#back').addEventListener('click', () => go('mas'));

  // ---- Tabs ----
  const tabBtns = wrap.querySelectorAll('.tab-btn');
  const tabPanels = wrap.querySelectorAll('.tab-panel');
  let activeTab = 'pool';
  let manualBoost = 0;

  function switchTab(tabId) {
    activeTab = tabId;
    tabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    tabPanels.forEach(p => p.classList.toggle('active', p.id === 'tab-' + tabId));
    if (tabId.startsWith('mods-') && !wrap.querySelector('#tab-' + tabId).innerHTML) {
      renderModifierTab(tabId.replace('mods-', ''));
    }
  }
  tabBtns.forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));

  // ---- Modificadores ----
  let selectedMods = {}; // { modId: count }

  function renderModifierTab(key) {
    const table = MODIFIER_TABLES[key];
    if (!table) return;
    const panel = wrap.querySelector('#tab-' + 'mods-' + key);
    let html = `<h3>${table.titulo}</h3><p class="note-line"><small>${table.nota}</small></p>`;
    for (const cat of table.categorias) {
      html += `<div class="mod-category"><h4>${cat.nombre}</h4><div class="mod-list">`;
      for (const mod of cat.mods) {
        const count = selectedMods[mod.id] || 0;
        const net = mod.boost - mod.burn;
        const sign = net >= 0 ? '+' : '';
        html += `
          <div class="mod-item">
            <label class="mod-label">${VFV.escapeHtml(mod.label)} <span class="mod-net">(${sign}${net})</span></label>
            <div class="mod-counter">
              <button type="button" class="btn small" data-mod="${mod.id}" data-delta="-1" ${count <= 0 ? 'disabled' : ''}>−</button>
              <output class="mod-count" id="modcount-${mod.id}">${count}</output>
              <button type="button" class="btn small" data-mod="${mod.id}" data-delta="1">+</button>
            </div>
          </div>`;
      }
      html += `</div></div>`;
    }
    html += `<div class="mod-summary" id="modSummary-${key}"></div>`;
    panel.innerHTML = html;
    panel.querySelectorAll('.mod-counter button').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.dataset.mod;
        const delta = +b.dataset.delta;
        selectedMods[id] = Math.max(0, (selectedMods[id] || 0) + delta);
        updateModCounters(key);
        updateNetDisplay();
      });
    });
    updateModCounters(key);
  }

  function updateModCounters(key) {
    const table = MODIFIER_TABLES[key];
    if (!table) return;
    let totalBoost = 0, totalBurn = 0;
    for (const cat of table.categorias) {
      for (const mod of cat.mods) {
        const count = selectedMods[mod.id] || 0;
        const el = wrap.querySelector('#modcount-' + mod.id);
        if (el) el.textContent = count;
        totalBoost += mod.boost * count;
        totalBurn += mod.burn * count;
      }
    }
    const net = totalBoost - totalBurn;
    const summary = wrap.querySelector('#modSummary-' + key);
    if (summary) {
      summary.innerHTML = `<strong>Total: ${totalBoost} boost / ${totalBurn} burn</strong> → Neto: ${net >= 0 ? '+' : ''}${net}`;
    }
    updateNetDisplay();
  }

  function updateNetDisplay() {
    let totalBoost = 0, totalBurn = 0;
    for (const key of Object.keys(MODIFIER_TABLES)) {
      const table = MODIFIER_TABLES[key];
      for (const cat of table.categorias) {
        for (const mod of cat.mods) {
          const count = selectedMods[mod.id] || 0;
          totalBoost += mod.boost * count;
          totalBurn += mod.burn * count;
        }
      }
    }
    manualBoost = +(wrap.querySelector('#manualBoostCount')?.value || 0);
    const autoNet = totalBoost - totalBurn;
    const finalNet = autoNet + manualBoost;

    const display = wrap.querySelector('#netDisplay');
    if (display) {
      display.innerHTML = `
        <div class="net-breakdown">
          <span>Auto (tablas): <strong>${totalBoost}▲ / ${totalBurn}▼</strong> = ${autoNet >= 0 ? '+' : ''}${autoNet}</span>
          <span>Manual: <strong>${manualBoost >= 0 ? '+' : ''}${manualBoost}</strong></span>
          <span class="final-net">Neto final: <strong>${finalNet >= 0 ? '+' : ''}${finalNet}</strong></span>
        </div>`;
    }
    // Actualizar el input hidden del pool editor
    const boostInput = wrap.querySelector('#boostCount');
    if (boostInput) boostInput.value = finalNet;
    renderTransformed();
  }

  // ---- Pool de dados con boost/burn ----
  const DIE_CHAIN = ['d6-', 'd6', 'd8', 'd12', 'd12+'];
  const DIE_FACES = { 'd6-': 6, 'd6': 6, 'd8': 8, 'd12': 12, 'd12+': 12 };

  let pool = []; // [{type: 'd6'|'d8'|'d12', count: n}]
  let transformedPool = [];

  const poolList = wrap.querySelector('#poolList');
  const poolTotal = wrap.querySelector('#poolTotal');

  function renderPool() {
    if (!pool.length) {
      poolList.innerHTML = '<p class="note-line"><small>Pool vacío. Añade dados abajo.</small></p>';
      poolTotal.textContent = '0 dados';
      return;
    }
    poolTotal.textContent = pool.reduce((s, d) => s + d.count, 0) + ' dados';
    poolList.innerHTML = pool.map((d, i) => `
      <div class="pool-item">
        <span class="die-type">${d.count}×d${d.type.slice(1)}</span>
        <button class="btn small" type="button" data-i="${i}" data-act="del" aria-label="Eliminar">×</button>
      </div>
    `).join('');
    for (const b of poolList.querySelectorAll('button[data-act="del"]')) {
      b.addEventListener('click', () => {
        pool.splice(+b.dataset.i, 1);
        renderPool();
        renderTransformed();
      });
    }
  }

  function applyBoostBurn(sourcePool, netBoost) {
    // Expand to individual dice
    let dice = [];
    for (const d of sourcePool) {
      for (let i = 0; i < d.count; i++) dice.push(d.type);
    }
    if (!dice.length) return [];

    // Net boost/burn
    let net = netBoost;
    if (net > 0) {
      // Boost: upgrade weakest dice first
      dice.sort((a, b) => DIE_CHAIN.indexOf(a) - DIE_CHAIN.indexOf(b));
      for (let i = 0; i < net && i < dice.length; i++) {
        const idx = DIE_CHAIN.indexOf(dice[i]);
        if (idx < DIE_CHAIN.length - 1) dice[i] = DIE_CHAIN[idx + 1];
      }
    } else if (net < 0) {
      // Burn: downgrade strongest dice first
      dice.sort((a, b) => DIE_CHAIN.indexOf(b) - DIE_CHAIN.indexOf(a));
      for (let i = 0; i < -net && i < dice.length; i++) {
        const idx = DIE_CHAIN.indexOf(dice[i]);
        if (idx > 0) dice[i] = DIE_CHAIN[idx - 1];
      }
    }

    // Count by type
    const counts = {};
    for (const d of dice) counts[d] = (counts[d] || 0) + 1;
    return Object.entries(counts).map(([type, count]) => ({ type, count }));
  }

  function renderTransformed() {
    const net = +(wrap.querySelector('#boostCount')?.value || 0);
    transformedPool = applyBoostBurn(pool, net);

    const tList = wrap.querySelector('#transformedList');
    if (!transformedPool.length) {
      tList.innerHTML = '<p class="note-line"><small>Pool vacío.</small></p>';
      return;
    }
    tList.innerHTML = transformedPool.map((d) => {
      const label = d.type === 'd12+' ? 'd12+' : d.type === 'd6-' ? 'd6−' : d.type;
      const faces = DIE_FACES[d.type];
      const isSpecial = d.type === 'd12+' || d.type === 'd6-';
      return `<div class="transformed-item${isSpecial ? ' special' : ''}"><span class="die-type">${d.count}×${label}</span><span class="die-faces">(${faces} caras${d.type === 'd6-' ? ', 2d6 queda peor' : d.type === 'd12+' ? ', d12+d6 queda mejor' : ''})</span></div>`;
    }).join('');
  }

  function rollTransformedPool() {
    const results = [];
    let detailParts = [];

    for (const d of transformedPool) {
      for (let i = 0; i < d.count; i++) {
        let v;
        if (d.type === 'd12+') {
          const r1 = 1 + Math.floor(Math.random() * 12);
          const r2 = 1 + Math.floor(Math.random() * 6);
          v = Math.max(r1, r2);
          detailParts.push(`d12+ → d12:${r1} + d6:${r2} = <b>${v}</b>`);
        } else if (d.type === 'd6-') {
          const r1 = 1 + Math.floor(Math.random() * 6);
          const r2 = 1 + Math.floor(Math.random() * 6);
          v = Math.min(r1, r2);
          detailParts.push(`d6− → 2d6:${r1},${r2} = <b>${v}</b> (peor)`);
        } else {
          const faces = DIE_FACES[d.type];
          v = 1 + Math.floor(Math.random() * faces);
          detailParts.push(`${d.type}:<b>${v}</b>`);
        }
        results.push({ value: v, type: d.type });
      }
    }

    // Sort: successes first, then by value desc
    results.sort((a, b) => {
      const sa = a.value >= 5, sb = b.value >= 5;
      if (sa !== sb) return sb - sa;
      return b.value - a.value;
    });

    const succ = results.filter(r => r.value >= 5).length;

    wrap.querySelector('#diceRollResult').hidden = false;
    wrap.querySelector('#rollOkN').textContent = succ;
    wrap.querySelector('#rollOkT').textContent = `${succ === 1 ? 'éxito' : 'éxitos'}`;
    wrap.querySelector('#diceRollOut').innerHTML = results.map((r, i) => 
      `<span class="die ${r.value >= 5 ? 'ok' : ''} ${r.type === 'd12+' ? 'd12p' : r.type === 'd6-' ? 'd6m' : ''}" style="animation-delay:${i * 20}ms">${r.value}</span>`
    ).join('');
    wrap.querySelector('#rollDetail').innerHTML = 'Detalle: ' + detailParts.join(' · ');
  }

  // Eventos pool
  wrap.querySelector('#addDieBtn').addEventListener('click', () => {
    const type = 'd' + wrap.querySelector('#addDieType').value;
    const count = Math.min(20, Math.max(1, +wrap.querySelector('#addDieCount').value || 1));
    const existing = pool.findIndex(d => d.type === type);
    if (existing >= 0) pool[existing].count += count;
    else pool.push({ type, count });
    renderPool();
    renderTransformed();
  });

  wrap.querySelector('#boostCount').addEventListener('input', () => {
    renderTransformed();
    updateNetDisplay();
  });
  wrap.querySelector('#transformBtn').addEventListener('click', () => {
    wrap.querySelector('#poolResult').hidden = false;
    renderTransformed();
  });
  wrap.querySelector('#rollPoolBtn').addEventListener('click', rollTransformedPool);
  wrap.querySelector('#rerollBtn').addEventListener('click', rollTransformedPool);
  wrap.querySelector('#manualBoostCount')?.addEventListener('input', updateNetDisplay);

  renderPool();

  // ---- Evento aleatorio ----
  wrap.querySelector('#evt').addEventListener('click', () => {
    const n = 1 + Math.floor(Math.random() * 12);
    const ev = EVENTOS.find((e) => e.n === n);
    wrap.querySelector('#evtOut').innerHTML = ev
      ? `<span class="n">${n}</span><b>${ev.titulo}</b><p>${ev.texto}</p>`
      : `<span class="n">${n}</span>`;
  });

  // ---- Control de unidades ----
  const KEY = 'vfv.units';
  let units = JSON.parse(localStorage.getItem(KEY) || '[]');
  if (!units.length) units = [{ n: 'Escuadra 1', stress: 0, morale: 0, fire: 0, acts: 0 }];
  const MORAL = ['Confiado', 'Sacudido', 'Fijado', 'En pánico'];
  const box = wrap.querySelector('#units');

  function save() {
    localStorage.setItem(KEY, JSON.stringify(units));
  }
  function draw() {
    box.innerHTML = '';
    units.forEach((u, i) => {
      box.appendChild(el(`<div class="unidad">
        <div class="fila">
          <input class="field" value="${VFV.escapeHtml(u.n)}" data-i="${i}" data-k="n" aria-label="Nombre de la unidad" />
          <button class="btn" type="button" data-i="${i}" data-k="del" aria-label="Quitar ${VFV.escapeHtml(u.n)}">${icon('cerrar')}</button>
        </div>
        <div class="fila">
          <span class="ctl">Estrés
            <button class="btn" type="button" data-i="${i}" data-k="stress" data-d="-1" aria-label="Menos estrés">−</button>
            <b>${u.stress}</b>
            <button class="btn" type="button" data-i="${i}" data-k="stress" data-d="1" aria-label="Más estrés">+</button>
          </span>
          <span class="ctl">Moral <span class="moral" data-m="${u.morale}">${MORAL[u.morale] || MORAL[0]}</span></span>
        </div>
        <div class="fila">
          <button class="btn ${u.fire ? 'activo' : ''}" type="button" data-i="${i}" data-k="fire" aria-pressed="${!!u.fire}">Marcador de Fuego</button>
          <button class="btn" type="button" data-i="${i}" data-k="acts">Acciones ${u.acts}/2</button>
        </div>
      </div>`));
    });
    for (const inp of box.querySelectorAll('input[data-k="n"]')) {
      inp.addEventListener('input', () => {
        units[+inp.dataset.i].n = inp.value;
        save();
      });
    }
    for (const b of box.querySelectorAll('button[data-k]')) {
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
            toast('Moral: ' + MORAL[u.morale]);
          }
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

/* ---------- 7. GCE ---------- */
function viewGce() {
  const wrap = el(`<section>
    <button class="volver" id="back" type="button">${icon('volver')} Más</button>
    <h2 class="page-title">Suplemento Guerra Civil</h2>
    <p class="sub">«vforvictory GCE v3», suplemento no oficial de Magnuscapo / Irregulares Plan B. Necesita el reglamento básico.</p>
    <div class="filters" id="bandos" role="group" aria-label="Bando">
      <button class="chip on" data-b="">Todos</button>
      <button class="chip" data-b="franquista">Franquista</button>
      <button class="chip" data-b="republicano">Republicano</button>
      <button class="chip" data-b="compartida">Compartidas</button>
    </div>
    <div class="topic-grid" id="fac"></div>
    <div class="gce-extra" id="extra" style="margin-top:26px"></div>
  </section>`);

  const fac = wrap.querySelector('#fac');
  let filter = '';

  function draw() {
    fac.innerHTML = '';
    for (const f of GCE.facciones) {
      if (filter && f.bando !== filter) continue;
      const cls = f.bando === 'franquista' ? 'nat' : f.bando === 'republicano' ? 'rep' : '';
      const card = el(`<div class="topic" data-id="${f.id}" role="button" tabindex="0">
        <span class="pill ${cls}">${f.etiqueta}</span>
        <h3>${VFV.escapeHtml(f.nombre)}</h3>
        <p>${VFV.escapeHtml(f.resumen)}</p>
      </div>`);
      card.addEventListener('click', () => goGceFaction(f.id));
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goGceFaction(f.id); } });
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
    extra.appendChild(el(`<div class="card">
      <h3>${VFV.escapeHtml(s.titulo)}</h3>
      ${s.html}
    </div>`));
  }

  wrap.querySelector('#back').addEventListener('click', () => go('mas'));
  main.appendChild(wrap);
  draw();
}

function goGceFaction(id) {
  const f = GCE.facciones.find((x) => x.id === id);
  if (!f) return;
  const wrap = el(`<section class="article">
    <button class="volver" id="back" type="button">${icon('volver')} Suplemento GCE</button>
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

/* ---------- 8. DOCUMENTOS ---------- */
function viewDocs() {
  if (window.VFV_LOCAL) return window.VFV_LOCAL.viewDocuments(main, state.docPage);
  const d = DOCS[state.docPage.doc] || DOCS.crb;
  const total = d.pages.length;
  let idx = state.docPage.idx || 0;
  if (Number.isNaN(idx)) idx = 0;
  idx = Math.max(0, Math.min(total - 1, idx));
  const p = d.pages[idx];

  const wrap = el(`<section>
    <button class="volver" id="back" type="button">${icon('volver')} Más</button>
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
          <div style="font-size:14px;color:var(--lapiz)">${VFV.escapeHtml(d.note || '')}</div>
        </div>
        <a class="btn" href="${pageUrl(d.id, p.page)}" target="_blank" rel="noopener">Abrir en el PDF</a>
      </div>
      <div class="pager">
        <button class="btn" id="prev" aria-label="Página anterior" ${idx === 0 ? 'disabled' : ''}>${icon('volver')}</button>
        <span style="font-size:14px;color:var(--lapiz)">Página</span>
        <input class="field" id="pg" type="number" min="${d.pages[0].page}" max="${d.pages[total - 1].page}" value="${p.page}" style="width:80px" />
        <span style="font-size:14px;color:var(--lapiz)">del PDF (${idx + 1} de ${total})</span>
        <button class="btn" id="next" aria-label="Página siguiente" ${idx === total - 1 ? 'disabled' : ''}>${icon('flecha')}</button>
      </div>
      <div class="viewer" id="viewer" style="margin-top:12px">${VFV.escapeHtml(p.text)}</div>
    </div>
  </section>`);

  wrap.querySelector('#back').addEventListener('click', () => go('mas'));
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

/* ---------- 9. MÁS ---------- */
function viewMas() {
  const local = !!window.VFV_LOCAL;
  const items = [
    ['mesa', 'dado', 'Herramientas', 'Dados, eventos aleatorios y control de unidades'],
    ['secuencia', 'turno', 'Turno paso a paso', 'Lista de comprobación de cada fase'],
    ['gce', 'bandera', 'Suplemento GCE', `${GCE.facciones.length} facciones de la Guerra Civil Española`],
    ['docs', 'libro', local ? 'Mis libros' : 'Documentos', local ? 'Tus PDF y su texto, guardados en este dispositivo' : 'Texto OCR de los tres PDF, página a página'],
  ];
  const wrap = el(`<section>
    <h2 class="page-title">Más</h2>
    <ul class="lista con-icono" style="margin-top:14px">
      ${items.map(([v, ic, t, r]) => `<li><button type="button" data-view="${v}">
        ${icon(ic, 'icono')}<b>${t}</b><span class="res">${r}</span>${icon('flecha', 'flecha')}
      </button></li>`).join('')}
    </ul>
    <p class="ayuda-busqueda">En el ordenador, pulsa <span class="kbd">/</span> para buscar.</p>
  </section>`);
  for (const b of wrap.querySelectorAll('button[data-view]')) {
    b.addEventListener('click', () => go(b.dataset.view, { topicId: null }));
  }
  main.appendChild(wrap);
}

/* ---------------- tabla de eventos ---------------- */
const EVENTOS = (window.VFV_EVENTOS || []).slice();

/* ---------------- modo día / noche ---------------- */
function syncThemeColor() {
  const meta = document.getElementById('theme-color');
  if (meta && window.getComputedStyle) meta.setAttribute('content', getComputedStyle(document.body).backgroundColor);
}
document.getElementById('theme-toggle').addEventListener('click', () => {
  const root = document.documentElement;
  const dark = root.dataset.theme
    ? root.dataset.theme === 'dark'
    : !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('vfv.theme', root.dataset.theme); } catch (e) { /* sin almacenamiento */ }
  syncThemeColor();
});

// Altura de la cabecera, para que las pestañas de Tablas se peguen justo debajo.
function medirCabecera() {
  const cab = document.getElementById('cab');
  if (cab && cab.offsetHeight && document.documentElement) {
    document.documentElement.style.setProperty('--cab-h', cab.offsetHeight + 'px');
  }
}
window.addEventListener('resize', medirCabecera);

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
state.view = VISTAS.includes(initial) ? initial : 'buscar';
render();
medirCabecera();
syncThemeColor();
