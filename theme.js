/* Aplica el modo día/noche elegido antes de pintar la página. */
(function () {
  try {
    var t = localStorage.getItem('vfv.theme');
    if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
  } catch (e) { /* sin almacenamiento: se sigue el sistema */ }
})();
