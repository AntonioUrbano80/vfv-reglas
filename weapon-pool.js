/* Pool previo a modificadores, construido desde los mismos perfiles que Tablas. */
(function (root) {
  'use strict';
  function create(profiles) {
    const diePattern = /(\d*)d(6|8|12)(\+)?/g;
    function dice(text) {
      return [...text.matchAll(diePattern)].map(m => ({ type: 'd' + m[2] + (m[3] || ''), count: Number(m[1] || 1) }));
    }
    function rangeCm(range) {
      if (range.includes('∞')) return Infinity;
      const m = range.match(/^(\d*)([LMS])$/);
      return m ? Number(m[1] || 1) * ({ L: 30, M: 15, S: 10 })[m[2]] : 0;
    }
    function combine(pool) {
      const counts = {};
      for (const d of pool) counts[d.type] = (counts[d.type] || 0) + d.count;
      return ['d6', 'd8', 'd12', 'd12+'].filter(type => counts[type]).map(type => ({ type, count: counts[type] }));
    }
    const format = pool => pool.length ? pool.map(d => d.count + d.type).join(' + ') : 'Sin dados';
    function calculate({ counts = {}, distance = 30, nation = '' } = {}) {
      if (!Number.isFinite(distance) || distance < 0) throw Error('La distancia debe ser un número mayor o igual que cero.');
      const contributions = [], excluded = [], groups = [], smallArms = [];
      for (const [id, count] of Object.entries(counts)) {
        if (!profiles[id] || !Number.isInteger(count) || count < 0 || count > 100) throw Error('Cantidad o arma inválida.');
        if (!count) continue;
        const p = profiles[id];
        const minimum = p.range.startsWith('>M') ? 15 : 0;
        if ((minimum && distance <= minimum) || distance > rangeCm(p.range)) {
          excluded.push({ id, name: p.name, count, reason: minimum && distance <= minimum ? 'Por debajo del alcance mínimo (>M)' : 'Fuera de alcance (' + p.range + ')' }); continue;
        }
        let power = p.firepower;
        if (id === 'ar') power = distance <= 30 ? '1d8' : '1d6';
        if (id === 'lmg' && nation === 'de') power = '2d6 + 2d8';
        const each = dice(power), pool = each.map(d => ({ type: d.type, count: d.count * count }));
        if (!pool.length) { excluded.push({ id, name: p.name, count, reason: 'Sin ataque antipersona: resolver su disparo antitanque por separado' }); continue; }
        const separate = p.he !== '—' || id === 'sniper' || id === 'ft';
        contributions.push({ id, name: p.name, count, each, pool, separate, national: id === 'lmg' && nation === 'de' });
        if (!separate) smallArms.push(...pool);
        else for (let i = 0; i < count; i++) groups.push({ id: id + ':' + i, name: p.name + (count > 1 ? ' ' + (i + 1) : ''), pool: each, ignoreBurns: id === 'ft', separate: true });
      }
      if (smallArms.length) groups.unshift({ id: 'small-arms', name: 'Armas del equipo', pool: combine(smallArms), separate: false });
      return { distance, nation, contributions, excluded, groups };
    }
    function mount(host, usePool) {
      host.innerHTML = `<details class="card"><summary>Calcular pool por armas</summary>
        <p class="note-line">Indica cuántas figuras disparan con cada arma. L = 30 cm. Los ataques especiales se muestran por separado.</p>
        <div class="toolbar-row"><label>Nación<br><select class="field" data-nation><option value="">General</option><option value="de">Alemania</option></select></label>
        <label>Distancia (cm)<br><input class="field" data-distance type="number" min="0" step="any" value="30"></label></div>
        <div class="weapon-counts"></div><p data-breakdown aria-live="polite"></p><div class="toolbar-row" data-groups></div></details>`;
      const counts = host.querySelector('.weapon-counts');
      for (const profile of Object.values(profiles)) {
        const label = document.createElement('label');
        label.textContent = profile.name;
        const input = document.createElement('input');
        Object.assign(input, { type: 'number', min: '0', max: '100', step: '1', value: '0', className: 'field' });
        input.dataset.weaponCount = profile.id;
        label.append(input);
        counts.append(label);
      }
      const breakdown = host.querySelector('[data-breakdown]');
      const groups = host.querySelector('[data-groups]');
      function update() {
        groups.replaceChildren();
        const distance = host.querySelector('[data-distance]');
        const nation = host.querySelector('[data-nation]').value;
        try {
          const result = calculate({ distance: distance.valueAsNumber, nation,
            counts: Object.fromEntries([...counts.querySelectorAll('input')].map(input => [input.dataset.weaponCount, input.value === '' ? 0 : input.valueAsNumber])) });
          const included = result.contributions.map(item => `${item.count} × ${item.name}: ${format(item.pool)}`);
          const excluded = result.excluded.map(item => `${item.name}: ${item.reason}`);
          breakdown.replaceChildren(...[...included, ...excluded].map(line => {
            const row = document.createElement('span'); row.textContent = line; row.style.display = 'block'; return row;
          }));
          if (!included.length && !excluded.length) breakdown.textContent = 'Añade al menos una figura.';
          for (const group of result.groups) {
            const button = document.createElement('button');
            Object.assign(button, { type: 'button', className: 'btn', textContent: `Usar ${format(group.pool)} · ${group.name}` });
            button.addEventListener('click', () => usePool(group));
            groups.append(button);
          }
        } catch (error) { breakdown.textContent = error.message; }
      }
      host.addEventListener('input', update);
      update();
    }
    return { profiles, calculate, combine, format, mount };
  }
  if (typeof module !== 'undefined') module.exports = { create };
  else root.VFVWeaponPool = create(root.VFV_WEAPON_PROFILES || {});
})(typeof window !== 'undefined' ? window : globalThis);
