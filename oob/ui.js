(function () {
  'use strict';
  window.VFVBuilder = { mount };
  function mount(host, options = {}) {
    const container = document.createElement('div');
    container.className = 'oob-demo';
    container.innerHTML = `<div class="page-heading"><div><p class="eyebrow">ORDEN DE BATALLA / GRAN BRETAÑA</p><h1 class="page-title">Constructor de listas</h1><p class="sub">Infantería británica · Francia 1940<br>Suplemento 1939–1943 · páginas impresas 32 y 36–38</p></div><span class="pill">Francia 1940</span></div>
        <div class="card setup-card">
          <div class="toolbar-row">
            <div class="army-field"><label class="lbl" for="oobSelect">Orden de batalla</label><select class="field" id="oobSelect"><option value="e43-british-early">Infantería británica · Francia 1940</option></select></div>
            <div><label class="lbl" for="budgetInput">Presupuesto (★)</label><input class="field" type="number" id="budgetInput" min="0" max="50" step="1" value="15" inputmode="numeric"></div>
          </div>
          <div class="budget-bar"><span>Presupuesto <b id="budgetTotal">15</b> ★</span><span>Disponible <b class="budget-remaining ok" id="budgetRemaining">15</b> ★</span><span class="pill">Francia 1940</span></div>
        </div>
        <div id="validationErrors" class="validation-errors warn" role="status" aria-live="polite"></div>
        <section id="nucleo" class="builder-section">
          <h2 class="sec-head">Núcleo obligatorio <span class="n">Incluido · 0★</span></h2>
          <p class="section-intro">21 figuras de base. Los espacios grises admiten refuerzos compatibles que tú eliges.</p>
          <div id="coreList" class="core-grid"></div>
        </section>
        <section id="refuerzos" class="builder-section">
          <h2 class="sec-head">Refuerzos <span class="n" id="reinforcementCount">0/4 compras</span></h2>
          <p class="section-intro">Compra las figuras y elige su destino en cualquier hueco gris compatible del núcleo o de los apoyos seleccionados. Puedes moverlas o dejarlas sin colocar.</p>
          <div class="controls purchase-controls" id="reinforcementBuy"></div>
          <div id="reinforcementsList" class="reinforcement-grid"></div>
        </section>
        <section id="equipo" class="builder-section">
          <h2 class="sec-head">Equipamiento y experiencia</h2>
          <div class="card"><div id="equipmentList"></div><p class="note-line">Hasta dos retiradas para SMG, con dos conversiones por retirada. Élite afecta a la infantería, no a los vehículos divisionales.</p></div>
        </section>
        <section id="apoyos" class="builder-section">
          <h2 class="sec-head">Apoyos orgánicos</h2>
          <p class="section-intro">Al añadir un apoyo, sus huecos grises aparecen entre los destinos disponibles. El francotirador cuesta 1♦: elige dos figuras que retirar de la fuerza o paga con dos de refuerzo normal sin colocar.</p>
          <div id="fireSupportList" class="support-grid"></div>
        </section>
        <section id="vehiculos" class="builder-section">
          <h2 class="sec-head">Apoyo divisional</h2>
          <p class="section-intro">Vehículos disponibles en Francia 1940. Selección por modelo, con sus opciones de armamento.</p>
          <div id="divisionalGrid" class="vehicle-grid"></div>
        </section>
        <section id="resumen" class="builder-section">
          <h2 class="sec-head">Tu lista</h2>
          <div class="summary card" id="summary">
            <div><span>Total de infantería</span><b id="sumMinis">21</b></div>
            <div><span>Núcleo actual</span><b id="sumCore">21</b></div>
            <div><span>Apoyos actuales</span><b id="sumFire">0</b></div>
            <div><span>De ellas, refuerzos</span><b id="sumReinf">0</b></div>
            <div><span>Vehículos (incluye recce)</span><b id="sumVeh">0</b></div>
            <div><span>Coste ★</span><b id="sumCost">0</b></div>
            <div><span>Disponible ★</span><b id="sumRemain">15</b></div>
            <div><span>Coste ♦</span><b id="sumDiamond">0</b></div>
            <div><span>Huecos grises libres</span><b id="sumGreyFree">8</b></div>
            <div><span>Huecos grises ocupados</span><b id="sumGreyUsed">0</b></div>
          </div>
          <div class="toolbar-row list-actions"><button class="btn primary" id="exportList" type="button">Exportar lista</button><button class="btn" id="resetList" type="button">Reiniciar lista</button></div>
          <p id="saveStatus" class="note-line" role="status"></p>
          <details class="card list-detail"><summary>Ver desglose por equipos y figuras</summary><pre id="listOutput"></pre></details>
        </section>
        <footer class="builder-footer"><span class="pill">Infantería británica · Francia 1940</span><p>Destinos de refuerzos y bajas para ♦ elegidos manualmente. Retiradas para SMG automáticas. No incluye otras campañas ni transportes asignados.</p></footer>
  `;
    host.appendChild(container);
    const E = window.OOBDemo, D = E.data, KEY = options.demo ? 'vfv-oob-demo-v1' : 'vfv-oob-list-v2';
    let state = E.fresh(), storageMessage = '';
    const $ = id => container.querySelector('#' + id);
    const esc = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    try {
      const saved = localStorage.getItem(KEY) || (!options.demo ? localStorage.getItem('vfv-oob-demo-v1') : null);
      if (saved) {
        const previous = JSON.parse(saved);
        const parsed = E.migrate(previous);
        if (E.validate(parsed).filter(e => !e.startsWith('Presupuesto excedido:')).length) storageMessage = 'Guardado inválido: se ha abierto una lista nueva.';
        else { state = parsed; if (previous.version === 1) storageMessage = 'Compras recuperadas. Elige ahora el destino de cada refuerzo.'; }
      }
    } catch (_) { storageMessage = 'No se pudo leer el guardado local. La lista funciona en esta sesión.'; }

    function button(label, action, id = '', value = '', enabled) {
      if (enabled === undefined) enabled = E.change(state, action, id, value) !== state;
      return `<button type="button" class="btn" data-action="${action}" data-id="${esc(id)}" data-value="${esc(value)}" ${enabled ? '' : 'disabled'}>${esc(label)}</button>`;
    }
    function unitHTML(unit) {
      return `<div class="unit-card card core"><h3>${esc(unit.name)}</h3>${[...new Set(unit.figures.map(f => f.team))].map(team =>
        `<p class="team-name">${esc(team)}</p><div class="slots-grid">${unit.figures.filter(f => f.team === team).map(f =>
        `<div class="slot ${f.present ? 'filled' : 'grey'}" data-slot="${esc(f.key)}"><span>${esc(f.smg ? 'Subfusil' : D.FIGURE_TYPES[f.type]?.name || f.type)}</span><span class="figure-status">${f.removedFor ? 'Retirada ' + f.removedFor : f.present ? f.reinforcement ? 'Ref. ' + (f.purchase + 1) : 'Incluido' : 'Hueco gris'}</span></div>`).join('')}</div>`).join('')}</div>`;
    }
    function assignmentHTML(figure, totals) {
      const label = (D.FIGURE_TYPES[figure.type]?.name || figure.type) + ' ' + (figure.index + 1);
      if (figure.status === 'payment') return `<div class="assignment-row"><span>${esc(label)}</span><span class="pill">Reservada para ♦</span></div>`;
      const selectId = 'assign-' + figure.key.replace(':', '-');
      return `<div class="assignment-row"><label class="lbl" for="${selectId}">${esc(label)}</label><select class="field" id="${selectId}" data-assignment="${figure.key}"><option value="">Sin colocar</option>` +
        totals.units.map(u => {
          const slots = u.figures.filter(slot => E.compatible(figure, slot));
          if (!slots.length) return '';
          return `<optgroup label="${esc(u.name)}">` + slots.map((slot, i) => {
            const own = figure.target === slot.key;
            const occupied = totals.pool.some(other => other.key !== figure.key && other.target === slot.key);
            return `<option value="${esc(slot.key)}" ${own ? 'selected' : ''} ${occupied ? 'disabled' : ''}>${esc(u.name + ' · ' + slot.team + ' · ' + (D.FIGURE_TYPES[slot.type]?.name || slot.type) + ' · hueco ' + (i + 1))}${occupied ? ' (ocupado)' : ''}</option>`;
          }).join('') + '</optgroup>';
        }).join('') + '</select></div>';
    }
    function listText(t) {
      const lines = ['British Infantry · Francia 1940', `${t.stars}/${state.budget}★ · ${t.minis} figuras de infantería · ${t.vehicles} vehículos`, ''];
      t.units.forEach(u => {
        lines.push(u.name + (state.elite ? ' (Élite)' : ''));
        u.figures.filter(f => f.present || f.removedFor).forEach(f => lines.push('  [' + f.team + '] ' +
          (f.smg ? 'Subfusil' : D.FIGURE_TYPES[f.type]?.name || f.type) +
          (f.removedFor ? ' — retirada para ' + f.removedFor : f.reinforcement ? ' — refuerzo ' + (f.purchase + 1) : '')));
      });
      Object.entries(state.vehicles).forEach(([id, opts]) => {
        const v = D.DIVISIONAL_VEHICLES.find(x => x.id === id);
        lines.push(v.name + ' — ' + v.cost + '★ · ' + E.weapons(v, opts).join(', '));
        v.options.filter(o => opts.includes(o.id)).forEach(o => lines.push('  ' + o.name + ' +' + o.cost + '★'));
      });
      if (t.diamonds) lines.push(`Pago de 1♦: ${t.diamondPaid}/2 figuras de ` + (state.sniperPayment === 'force' ? 'la fuerza retiradas.' : 'refuerzo normal reservadas.'));
      lines.push(`Refuerzos: ${state.purchases.length}/4 compras; ${t.reinforcements} presentes; ${t.unused} sin colocar (no cuentan en la fuerza).`,
        'Destinos de refuerzos y bajas para ♦ elegidos manualmente. Las retiradas para SMG son automáticas.',
        'Catálogo disponible: infantería británica y vehículos de Francia 1940.');
      if (t.errors.length) lines.push(...t.errors);
      return lines.join('\n');
    }
    function diamondHTML(t) {
      const active = !!state.support.fs_sniper;
      const method = state.sniperPayment === 'force' ? 'retiradas de la fuerza' : 'reservadas de refuerzos';
      const paid = active ? `<p class="diamond-status" role="status">Pago de 1♦: <b>${t.diamondPaid}/2 figuras ${method}</b>.</p>` :
        '<p class="note-line">Para pagar 1♦, elige dos fusileros distintos. Se retirarán al añadir el francotirador. Las bajas para SMG no sirven para pagar el rombo.</p>';
      if (active && state.sniperPayment === 'reinforcement') return `<div class="diamond-payment" id="diamondPayment">${paid}</div>`;
      return `<div class="diamond-payment" id="diamondPayment">${paid}` + [0, 1].map(index =>
        `<div class="assignment-row"><label class="lbl" for="sniper-donor-${index}">Figura ${index + 1} que retirar por ♦</label><select class="field" id="sniper-donor-${index}" data-sniper-donor="${index}" ${active ? 'disabled' : ''}><option value="">Elige una figura</option>` +
        t.donorCandidates.map((f, i) => `<option value="${esc(f.key)}" ${state.sniperDonors[index] === f.key ? 'selected' : ''} ${state.sniperDonors[1 - index] === f.key ? 'disabled' : ''}>${esc(f.unit + ' · ' + f.team + ' · fusilero ' + (i + 1))}</option>`).join('') + '</select></div>').join('') +
        (active ? '<p class="note-line">Las dos bajas se muestran también en sus equipos. Salen dos figuras y entra un equipo de francotirador de dos: el total puede quedarse igual. Quita el francotirador para cambiar el pago.</p>' : '') + '</div>';
    }
    function render() {
      const t = E.calculate(state), rem = state.budget - t.stars;
      $('budgetInput').value = state.budget;
      $('budgetTotal').textContent = state.budget;
      $('budgetRemaining').textContent = rem;
      $('budgetRemaining').className = 'budget-remaining ' + (rem < 0 ? 'over' : rem <= 2 ? 'near' : 'ok');
      $('coreList').innerHTML = t.units.filter(u => u.id.startsWith('uk_')).map(unitHTML).join('');
      $('reinforcementCount').textContent = `${state.purchases.length}/4 compras · ${t.unused} sin colocar`;
      $('reinforcementBuy').innerHTML = D.REINFORCEMENT_OPTIONS.map(o => button('+ ' + o.name + ' (1★)', 'reinforce', o.id)).join('');
      $('reinforcementsList').innerHTML = state.purchases.map((id, i) => `<article class="unit-card card"><div class="purchase-heading"><span class="pill">Refuerzo ${i + 1} · 1★</span>${button('Eliminar compra ' + (i + 1), 'unreinforce', i)}</div><h3>${esc(D.REINFORCEMENT_OPTIONS.find(o => o.id === id).name)}</h3><p class="note-line">${t.pool.filter(f => f.purchase === i && f.status === 'placed').length} asignadas · ${t.pool.filter(f => f.purchase === i && f.status === 'payment').length} para ♦ · ${t.pool.filter(f => f.purchase === i && f.status === 'unused').length} sin colocar</p>${t.pool.filter(f => f.purchase === i).map(f => assignmentHTML(f, t)).join('')}</article>`).join('') ||
        '<p class="empty-bank">Compra un refuerzo y elige el destino de cada figura. Ningún hueco se rellena por defecto.</p>';
      $('fireSupportList').innerHTML = D.FIRE_SUPPORT.filter(f => f.type !== 'modifier').map(f => {
        const count = state.support[f.id] || 0;
        let controls = f.cost === 'diamond'
          ? button(count ? 'Quitar francotirador' : 'Añadir francotirador: pagar con las 2 bajas elegidas', 'sniper', 'force') +
            (!count ? button('Añadir ♦: usar 2 figuras de refuerzo normal', 'sniper', 'reinforcement') : '')
          : button('+ Añadir', 'support', f.id, 1) + button('− Quitar', 'support', f.id, -1);
        if (f.hasOptionalModule) controls += button(state.motoModule ? 'Quitar 2º vehículo' : 'Añadir 2º vehículo (+1★)', 'moto') +
          button(state.brenSwap ? 'Restaurar Bren (+1★)' : 'Bren → fusilero (−1★)', 'bren');
        const units = t.units.filter(u => u.id.startsWith(f.id + ':'));
        return `<article class="unit-card card ${count ? 'selected' : ''}"><h3>${esc(f.name)}</h3><p class="note-line">${f.cost === 'diamond' ? '1♦ = 2 figuras' : f.cost + '★'} · ${count}/${f.limit}${!E.available(f) ? ' · No disponible en Francia 1940' : ''}</p>${f.cost === 'diamond' ? diamondHTML(t) : ''}<div class="controls">${controls}</div>${units.map(unitHTML).join('')}</article>`;
      }).join('');
      $('equipmentList').innerHTML = `<p>Retiradas para SMG: ${state.removed}/2 · conversiones: ${state.smg}/${state.removed * 2}</p><div class="controls">` +
        button('Retirar fusilero', 'removed', '', 1) + button('Devolver fusilero', 'removed', '', -1) +
        button('+ SMG', 'smg', '', 1) + button('− SMG', 'smg', '', -1) +
        button(state.elite ? 'Quitar Élite' : 'Añadir Élite (+3★)', 'elite') + '</div>';
      $('divisionalGrid').innerHTML = D.DIVISIONAL_VEHICLES.filter(E.purchasable).map(v => {
        const selected = Object.hasOwn(state.vehicles, v.id);
        return `<article class="vehicle-card card ${selected ? 'selected' : ''}"><h3>${esc(v.name)} <span class="cost">${v.cost}★</span></h3><p class="vehicle-stats">Blindaje ${v.armor} · ${esc(E.weapons(v, state.vehicles[v.id] || []).join(', '))}<br>${esc(v.rules.join(', '))}</p>` +
          button(selected ? 'Quitar vehículo' : 'Añadir vehículo', 'vehicle', v.id) +
          v.options.map(o => `<div class="vehicle-option"><p>${esc(o.name)} · +${o.cost}★</p>` + button(selected && state.vehicles[v.id].includes(o.id) ? 'Quitar opción' : 'Añadir opción', 'option', v.id, o.id)).join('') + '</article>';
      }).join('');
      const values = { sumMinis: t.minis, sumCore: t.core, sumReinf: t.reinforcements, sumFire: t.fire, sumVeh: t.vehicles,
        sumCost: t.stars, sumRemain: rem, sumDiamond: t.diamonds, sumGreyFree: t.free, sumGreyUsed: t.usedGrey };
      Object.entries(values).forEach(([id, value]) => { $(id).textContent = value; });
      $('validationErrors').textContent = t.errors.join(' ');
      $('validationErrors').classList.toggle('show', !!t.errors.length);
      $('listOutput').textContent = listText(t);
      $('saveStatus').textContent = storageMessage;
    }
    function persist() {
      try { localStorage.setItem(KEY, JSON.stringify(state)); storageMessage = 'Lista guardada en este navegador.'; }
      catch (_) { storageMessage = 'No se pudo guardar. Puedes exportar la lista.'; }
    }
    container.addEventListener('click', event => {
      const b = event.target.closest('button[data-action]');
      if (!b || b.disabled) return;
      state = E.change(state, b.dataset.action, b.dataset.id, b.dataset.value);
      persist(); render();
    });
    container.addEventListener('change', event => {
      const donor = event.target.closest('select[data-sniper-donor]');
      if (donor) {
        const focus = donor.id;
        state = E.change(state, 'sniperDonor', donor.dataset.sniperDonor, donor.value);
        persist(); render(); $(focus)?.focus({ preventScroll: true }); return;
      }
      const select = event.target.closest('select[data-assignment]');
      if (!select) return;
      const selectId = select.id;
      state = E.change(state, 'assign', select.dataset.assignment, select.value);
      persist(); render();
      $(selectId)?.focus({ preventScroll: true });
    });
    $('budgetInput').addEventListener('change', event => {
      const value = Number(event.target.value);
      if (event.target.value !== '' && Number.isInteger(value) && value >= 0 && value <= 50) {
        state = E.change(state, 'budget', '', value); persist();
      }
      render();
    });
    $('resetList').addEventListener('click', () => {
      if (!window.confirm('¿Reiniciar la lista de ejército?')) return;
      state = E.fresh(); persist(); render();
    });
    $('exportList').addEventListener('click', () => {
      const url = URL.createObjectURL(new Blob([listText(E.calculate(state))], { type: 'text/plain;charset=utf-8' }));
      const a = document.createElement('a'); a.href = url; a.download = options.demo ? 'lista-british-francia-1940-demo.txt' : 'lista-british-francia-1940.txt'; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    render();
    return container;
  }
})();
