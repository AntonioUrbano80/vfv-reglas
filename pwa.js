/* Instalación, estado sin conexión y conexión con el lector privado. */
(() => {
  const status = document.getElementById('offline-status');
  const install = document.getElementById('install-app');
  const update = document.getElementById('update-app');
  let installPrompt;
  let ready = false;
  function networkStatus() {
    status.textContent = !navigator.onLine ? 'Sin conexión' : ready ? 'Disponible sin conexión' : 'Preparando…';
    status.dataset.ok = ready ? '1' : '';
  }
  window.addEventListener('online', networkStatus);
  window.addEventListener('offline', networkStatus);
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    installPrompt = event;
    install.hidden = false;
    install.textContent = 'Instalar aplicación';
  });
  install.onclick = async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      await installPrompt.userChoice;
      installPrompt = null;
    } else {
      document.getElementById('install-help').hidden = false;
      document.getElementById('install-help').scrollIntoView({ behavior: 'smooth' });
    }
  };
  document.getElementById('close-install-help').onclick = () => { document.getElementById('install-help').hidden = true; };
  const installBox = install.closest('.install-controls') || install;
  window.addEventListener('appinstalled', () => { installBox.hidden = true; });
  if (window.matchMedia('(display-mode: standalone)').matches || navigator.standalone) installBox.hidden = true;

  window.addEventListener('vfv-books-changed', () => {
    INDEX = VFV.buildIndex(RULES.documents);
    if (state.view === 'buscar') render();
  });
  function openBook(doc, page) {
    go('docs', { docPage: { doc, idx: Math.max(0, page - 1) } });
  }
  window.addEventListener('vfv-open-book', e => openBook(e.detail.doc, e.detail.page));
  document.addEventListener('click', e => {
    const link = e.target.closest('a[data-local-doc], a.hit[data-doc]');
    if (!link) return;
    e.preventDefault();
    openBook(link.dataset.localDoc || link.dataset.doc, Number(link.dataset.page) || 1);
  });
  window.VFV_LOCAL.init().then(() => {
    if (state.view === 'docs') {
      const params = new URLSearchParams(location.hash.split('?')[1] || '');
      if (params.has('doc')) state.docPage = { doc: params.get('doc'), idx: Math.max(0, (Number(params.get('page')) || 1) - 1) };
      render();
    }
  });
  if ('serviceWorker' in navigator && window.isSecureContext) {
    navigator.serviceWorker.register('./sw.js', { scope: './', updateViaCache: 'none' }).then(reg => {
      function offerUpdate() {
        if (!reg.waiting) return;
        update.hidden = false;
        update.onclick = () => reg.waiting?.postMessage({ type: 'ACTIVATE_UPDATE' });
      }
      offerUpdate();
      reg.addEventListener('updatefound', () => {
        const worker = reg.installing;
        worker?.addEventListener('statechange', () => { if (worker.state === 'installed') offerUpdate(); });
      });
      navigator.serviceWorker.ready.then(() => { ready = true; networkStatus(); });
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (update.hidden || refreshing) return;
        refreshing = true;
        location.reload();
      });
    }).catch(() => {
      status.textContent = 'Sin modo offline';
      status.title = 'No se ha preparado el modo sin conexión. Vuelve a abrir la app con internet.';
    });
  } else {
    status.textContent = 'Requiere HTTPS';
    status.title = 'La instalación y el modo sin conexión requieren HTTPS o localhost.';
  }
  networkStatus();
})();
