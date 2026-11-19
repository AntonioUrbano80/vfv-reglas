/* Documentos privados: IndexedDB, sin servidores ni peticiones de subida. */
window.VFV_LOCAL = (() => {
  'use strict';
  const DB_NAME = 'vfv-private-books-v1';
  let dbPromise;
  let pdfModule;
  let viewVersion = 0;
  const records = new Map();
  const pdfs = new Map();
  const esc = s => typeof VFV !== 'undefined' ? VFV.escapeHtml(s) : String(s).replace(/[&<>"']/g, '');
  function database() {
    if (!window.indexedDB) return Promise.reject(new Error('Este navegador no permite guardar documentos locales. Usa Safari, Chrome o Edge fuera del modo privado.'));
    if (!dbPromise) dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => req.result.createObjectStore('books', { keyPath: 'id' });
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
      req.onblocked = () => reject(new Error('Cierra las otras pestañas de esta aplicación y vuelve a intentarlo.'));
    });
    return dbPromise;
  }
  async function transact(mode, action) {
    const db = await database();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('books', mode);
      let req;
      try { req = action(tx.objectStore('books')); } catch (err) { reject(err); return; }
      tx.oncomplete = () => resolve(req.result);
      tx.onerror = () => reject(tx.error || req.error);
      tx.onabort = () => reject(tx.error || new Error('No se pudo guardar el documento. Comprueba el espacio libre.'));
    });
  }
  async function engine() {
    if (!pdfModule) pdfModule = import('./vendor/pdf.mjs').then(mod => {
      mod.GlobalWorkerOptions.workerSrc = new URL('./vendor/pdf.worker.mjs', location.href).href;
      return mod;
    });
    return pdfModule;
  }
  async function loadPDF(file) {
    const mod = await engine();
    return mod.getDocument({
      data: new Uint8Array(await file.arrayBuffer()),
      cMapUrl: new URL('./vendor/cmaps/', location.href).href,
      cMapPacked: true,
      standardFontDataUrl: new URL('./vendor/standard_fonts/', location.href).href,
      wasmUrl: new URL('./vendor/wasm/', location.href).href,
      isEvalSupported: false,
      enableXfa: false,
    }).promise;
  }
  async function getPDF(id) {
    if (!pdfs.has(id)) {
      const book = records.get(id);
      if (!book?.file) throw new Error('Primero importa tu PDF en este dispositivo.');
      const promise = loadPDF(book.file).catch(err => { pdfs.delete(id); throw err; });
      pdfs.set(id, promise);
    }
    return pdfs.get(id);
  }
  function refreshIndex() {
    for (const doc of window.VFV_RULES.documents) {
      const book = records.get(doc.id);
      doc.pages = book?.pages || [];
    }
    window.dispatchEvent(new Event('vfv-books-changed'));
  }
  async function init() {
    try {
      for (const book of await transact('readonly', store => store.getAll())) records.set(book.id, book);
      refreshIndex();
    } catch (err) {
      window.VFV_LOCAL.error = err.message;
      window.dispatchEvent(new Event('vfv-books-changed'));
    }
  }
  async function importPDF(id, file, progress = () => {}) {
    if (!window.VFV_RULES.documents.some(d => d.id === id)) throw new Error('Documento desconocido.');
    if (file.size > 250 * 1024 * 1024) throw new Error('El PDF supera los 250 MB. Usa una copia de menor tamaño.');
    const header = new TextDecoder().decode(await file.slice(0, 1024).arrayBuffer());
    if (!header.includes('%PDF-')) throw new Error('El archivo no es un PDF válido.');
    let pdf;
    try {
      pdf = await loadPDF(file);
      if (pdf.numPages > 2000) throw new Error('El documento tiene demasiadas páginas.');
      const pages = [];
      for (let page = 1; page <= pdf.numPages; page++) {
        progress('Leyendo página ' + page + ' de ' + pdf.numPages + '…');
        const p = await pdf.getPage(page);
        const text = (await p.getTextContent()).items.map(i => i.str || '').join(' ').trim();
        if (text.length > 2) pages.push({ page, text });
        p.cleanup();
      }
      const book = { id, name: file.name, file, pageCount: pdf.numPages, pages, added: new Date().toISOString(), textSource: 'pdf' };
      await transact('readwrite', store => store.put(book));
      records.set(id, book);
      if (pdfs.has(id)) (await pdfs.get(id)).destroy();
      pdfs.set(id, Promise.resolve(pdf));
      pdf = null;
      refreshIndex();
      if (navigator.storage?.persist) navigator.storage.persist().catch(() => {});
      return book;
    } finally { if (pdf) await pdf.destroy(); }
  }
  async function importText(id, file) {
    const book = records.get(id);
    if (!book?.file) throw new Error('Importa primero el PDF al que pertenece este OCR.');
    if (file.size > 20 * 1024 * 1024) throw new Error('El archivo OCR supera los 20 MB.');
    const payload = JSON.parse(await file.text());
    if (payload.docId && payload.docId !== id) throw new Error('El OCR pertenece a otro documento.');
    const pages = Array.isArray(payload) ? payload : payload.pages;
    if (!Array.isArray(pages) || !pages.length) throw new Error('El OCR debe contener una lista de páginas.');
    const seen = new Set();
    const limit = Number.isInteger(book.pageCount) && book.pageCount > 0 ? book.pageCount : 0;
    if (!limit) throw new Error('El PDF importado no tiene un número de páginas válido. Vuelve a importarlo.');
    const max = pages.reduce((m, p) => (Number.isInteger(p.page) && p.page > m ? p.page : m), 0);
    if (max > limit) {
      const titulo = (window.VFV_RULES.documents.find(d => d.id === id) || {}).short || id;
      throw new Error('Este OCR llega hasta la página ' + max + ', pero el PDF importado en «' + titulo + '» (' + book.name + ') solo tiene ' +
        book.pageCount + ' páginas. Comprueba que has importado el PDF que corresponde a este apartado.');
    }
    const clean = pages.map(p => {
      if (!Number.isInteger(p.page) || p.page < 1 || p.page > limit || typeof p.text !== 'string')
        throw new Error('El OCR contiene una página sin número válido, fuera del PDF o sin texto.');
      if (seen.has(p.page)) throw new Error('El OCR repite la página ' + p.page + '.');
      seen.add(p.page);
      return { page: p.page, text: p.text };
    }).sort((a, b) => a.page - b.page);
    const updated = { ...book, pages: clean, textSource: 'ocr-local' };
    await transact('readwrite', store => store.put(updated));
    records.set(id, updated);
    refreshIndex();
  }
  async function remove(id) {
    await transact('readwrite', store => store.delete(id));
    records.delete(id);
    if (pdfs.has(id)) { (await pdfs.get(id)).destroy(); pdfs.delete(id); }
    refreshIndex();
  }
  function viewDocuments(main, selection) {
    const version = ++viewVersion;
    const docs = window.VFV_RULES.documents;
    const id = docs.some(d => d.id === selection.doc) ? selection.doc : 'crb';
    const doc = docs.find(d => d.id === id);
    const book = records.get(id);
    const wrap = document.createElement('section');
    wrap.innerHTML = `<h2 class="page-title">Mis libros · Solo en este dispositivo</h2>
      <p class="sub">Importa tus PDF. Se guardan en este navegador y no se envían a GitHub ni a ningún servidor. Las referencias usan la página del PDF, no la numeración impresa.</p>
      <p class="note">${esc(window.VFV_LOCAL.error || 'Importa los libros desde la aplicación ya instalada. Otro navegador o dispositivo puede tener un almacenamiento distinto. Conserva tus originales: borrar los datos del navegador elimina las copias locales.')}</p>
      <div class="filters">${docs.map(d => `<button class="chip ${d.id === id ? 'on' : ''}" data-book="${d.id}">${esc(d.short)}</button>`).join('')}</div>
      <div class="card"><h3>${esc(doc.title)}</h3>
        <p>${book ? esc(book.name) + ' · ' + book.pageCount + ' páginas · ' + book.pages.length + ' con texto buscable' : 'Todavía no has importado este libro.'}</p>
        <label class="btn file-label">${book ? 'Sustituir PDF' : 'Importar mi PDF'}<input id="pdf-file" type="file" accept="application/pdf,.pdf" /></label>
        ${book ? '<label class="btn file-label">Añadir texto OCR local<input id="ocr-file" type="file" accept="application/json,.json" /></label><button class="btn" id="remove-book">Eliminar copia local</button>' : ''}
        <p id="import-status" role="status" aria-live="polite"></p>
        ${book && book.pages.length === 0 ? '<p class="note">Este PDF parece escaneado: puedes leer todas sus páginas, pero para buscar dentro necesitas importar un OCR local. Los temas y preguntas preparados siguen funcionando.</p>' : ''}
        <details><summary>¿Qué es el OCR local?</summary><p>Es texto asociado a las páginas de tu propio PDF. El lector extrae automáticamente el texto que ya tenga el archivo, pero no reconoce las imágenes de un escaneo. Puedes importar un JSON con el formato <code>{"docId":"' + id + '","pages":[{"page":1,"text":"Texto de la página"}]}</code>. Nunca se sube.</p></details>
      </div>
      ${book ? '<div class="card book-reader"><div class="pager"><button class="btn" id="book-prev" aria-label="Página anterior">Anterior</button><label>Página PDF <input class="field" id="book-page" type="number" min="1" max="' + book.pageCount + '" /></label><span>de ' + book.pageCount + '</span><button class="btn" id="book-next" aria-label="Página siguiente">Siguiente</button></div><p id="render-status" role="status"></p><div class="pdf-scroll"><canvas id="pdf-canvas" aria-label="Página del PDF"></canvas></div><details><summary>Texto local de esta página</summary><div id="book-text" class="viewer"></div></details></div>' : ''}`;
    main.appendChild(wrap);
    for (const button of wrap.querySelectorAll('[data-book]')) button.onclick = () => {
      window.dispatchEvent(new CustomEvent('vfv-open-book', { detail: { doc: button.dataset.book, page: 1 } }));
    };
    const status = wrap.querySelector('#import-status');
    let busy = false;
    async function run(action) {
      if (busy) return;
      busy = true;
      for (const input of wrap.querySelectorAll('input, button')) input.disabled = true;
      try { await action(); if (version === viewVersion && wrap.isConnected) viewDocumentsReplace(); }
      catch (err) { status.textContent = 'No se ha completado: ' + err.message; }
      finally { busy = false; for (const input of wrap.querySelectorAll('input, button')) input.disabled = false; }
    }
    function viewDocumentsReplace() { main.innerHTML = ''; viewDocuments(main, selection); }
    wrap.querySelector('#pdf-file').onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      if (book && !confirm('¿Sustituir este PDF y su texto local?')) return;
      run(() => importPDF(id, file, msg => { status.textContent = msg; }));
    };
    if (!book) return;
    wrap.querySelector('#ocr-file').onchange = e => { if (e.target.files[0]) run(() => importText(id, e.target.files[0])); };
    wrap.querySelector('#remove-book').onclick = () => { if (confirm('¿Eliminar la copia local de este libro y su OCR? Tu archivo original se conserva.')) run(() => remove(id)); };
    let page = Math.max(1, Math.min(book.pageCount, (Number(selection.idx) || 0) + 1));
    const input = wrap.querySelector('#book-page');
    let pageVersion = 0;
    let renderTask;
    async function showPage() {
      const request = ++pageVersion;
      input.value = page;
      wrap.querySelector('#book-prev').disabled = page <= 1;
      wrap.querySelector('#book-next').disabled = page >= book.pageCount;
      wrap.querySelector('#book-text').textContent = book.pages.find(p => p.page === page)?.text || 'No hay texto OCR para esta página.';
      const message = wrap.querySelector('#render-status');
      message.textContent = 'Abriendo página…';
      if (renderTask) { renderTask.cancel(); try { await renderTask.promise; } catch {} }
      try {
        const pdf = await getPDF(id);
        const p = await pdf.getPage(page);
        if (version !== viewVersion || request !== pageVersion || !wrap.isConnected) return;
        const base = p.getViewport({ scale: 1 });
        const width = Math.max(280, Math.min(1200, wrap.clientWidth - 40));
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        const vp = p.getViewport({ scale: width / base.width * ratio });
        const canvas = wrap.querySelector('#pdf-canvas');
        canvas.width = vp.width;
        canvas.height = vp.height;
        renderTask = p.render({ canvasContext: canvas.getContext('2d'), viewport: vp });
        await renderTask.promise;
        if (request === pageVersion) message.textContent = 'Página ' + page + ' · Documento local';
      } catch (err) { if (err.name !== 'RenderingCancelledException') message.textContent = 'No se pudo mostrar la página: ' + err.message; }
    }
    function turn(next) {
      page = Math.max(1, Math.min(book.pageCount, Math.trunc(next) || 1));
      selection.idx = page - 1;
      showPage();
    }
    wrap.querySelector('#book-prev').onclick = () => turn(page - 1);
    wrap.querySelector('#book-next').onclick = () => turn(page + 1);
    input.onchange = () => turn(Number(input.value));
    showPage();
  }
  return { init, viewDocuments, importPDF, importText, remove, records, getPDF, error: '' };
})();
