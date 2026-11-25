(function () {
  'use strict';
  window.VFVBuilder = { mount, rosterForPage };
  const defaultRosterByPage = {
    5: 'fr-infantry-1940', 6: 'fr-dragoons-1940', 7: 'fr-motorised-1940',
    11: 'de-infantry-DE40', 12: 'de-motorised-DE40', 13: 'de-airborne-DE40',
    18: 'it-infantry-1940', 19: 'it-bersaglieri-1940', 20: 'it-airborne-1941',
    24: 'e43-british-early', 25: 'uk-motorised-F40-1940', 26: 'uk-commandos-F40-1940',
    31: 'su-infantry-1941', 32: 'su-motorised-1941', 33: 'su-airborne-1941',
    37: 'be-infantry-1940', 39: 'pl-infantry-1939', 41: 'fi-infantry-1941',
    43: 'us-infantry-1942', 44: 'us-mechanised-1942',
  };
  function rosterForPage(page) { return defaultRosterByPage[page]; }
  function mount(host, options = {}) {
    const british = ['e43-british-early', 'Infantería británica · Francia 1940', 'Gran Bretaña', 'Francia 1940', 1940, 'F40'];
    const french = window.VFVFranceInfantry;
    const rosters = [british, ...(!options.demo && french ? [
      ['fr-infantry-1939', 'Infantería francesa · 1939', 'Francia', '1939', 1939, 'FR39-40', french],
      ['fr-infantry-1940', 'Infantería francesa · 1940', 'Francia', '1940', 1940, 'FR39-40', french],
      ['fr-dragoons-1939', 'Dragones montados · 1939', 'Francia', '1939', 1939, 'FR39-40', french.mountedDragoons],
      ['fr-dragoons-1940', 'Dragones montados · 1940', 'Francia', '1940', 1940, 'FR39-40', french.mountedDragoons],
      ['fr-motorised-1940', 'Infantería motorizada francesa · 1940', 'Francia', '1940', 1940, 'FR39-40', french.motorisedInfantry],
      ...[1939, 1940].map(year => ['fr-colonial-' + year, 'Infantería colonial francesa · ' + year, 'Francia', String(year), year, 'FR39-40', french.colonial]),
      ...[1940, 1941, 1942].flatMap(year => [
        ['infantry', 'Infantería', french], ['dragoons', 'Dragones montados', french.mountedDragoons],
        ['motorised', 'Infantería motorizada', french.motorisedInfantry],
      ].map(([kind, name, roster]) => [`fr-vichy-${kind}-${year}`, name + ' de Vichy · ' + year, 'Francia', String(year), year, 'FR39-40', roster])),
      ...[1940, 1941, 1942, 1943].flatMap(year => [
        ['infantry', 'Infantería', french], ['dragoons', 'Dragones montados', french.mountedDragoons],
        ['motorised', 'Infantería motorizada', french.motorisedInfantry],
      ].map(([kind, name, roster]) => [`fr-free-${kind}-${year}`, name + ' de la Francia Libre · ' + year, 'Francia', String(year), year, 'FR39-40', roster])),
    ] : []), ...(!options.demo && window.VFVBelgiumPoland ? [
      ['be-infantry-1940', 'Infantería belga · 1940', 'Bélgica', '1940', 1940, 'BE40', window.VFVBelgiumPoland.belgium],
      ['pl-infantry-1939', 'Infantería polaca · 1939', 'Polonia', '1939', 1939, 'PL39', window.VFVBelgiumPoland.poland],
    ] : []), ...(!options.demo && window.VFVFinlandInfantry ? [1941, 1942, 1943].map(year =>
      ['fi-infantry-' + year, 'Infantería finlandesa · ' + year, 'Finlandia', String(year), year, 'FI', window.VFVFinlandInfantry]) : []),
    ...(!options.demo && window.VFVUSInfantry ? [1942, 1943].flatMap(year => [
      ['us-infantry-' + year, 'Infantería estadounidense · ' + year, 'Estados Unidos', String(year), year, 'US', window.VFVUSInfantry.infantry],
      ['us-mechanised-' + year, 'Infantería mecanizada estadounidense · ' + year, 'Estados Unidos', String(year), year, 'US', window.VFVUSInfantry.mechanised],
    ]) : []),
    ...(!options.demo && window.VFVBritishVariants ? [
      [1940, 'F40', 'Francia 1940'], [1940, 'AN40-41', 'Norte de África 1940'],
      [1941, 'AN40-41', 'Norte de África 1941'], [1942, 'AN/S42-43', 'Norte de África 1942'],
      [1943, 'AN/S42-43', 'Norte de África y Sicilia 1943'],
    ].flatMap(([year, campaign, label]) => [
      ...(campaign === 'F40' ? [] : [['infantry', 'Infantería británica', window.OOBDemo.data]]),
      ['motorised', 'Infantería motorizada británica', window.VFVBritishVariants.motorised],
      ['commandos', 'Comandos británicos', window.VFVBritishVariants.commandos],
    ].map(([kind, name, roster]) => [
      `uk-${kind}-${campaign.replace('/', '-')}-${year}`, name + ' · ' + label, 'Gran Bretaña', label, year, campaign, roster,
    ])) : []),
    ...(!options.demo && window.VFVGermany ? [
      [1939, 'DE39', '1939'], [1940, 'DE40', '1940 · Europa occidental'],
      [1940, 'DE40-41', '1940 · Norte de África'], [1941, 'DE41', '1941 · Norte de África y Rusia'],
      [1942, 'DE42', '1942'], [1943, 'DE43', '1943'],
    ].flatMap(([year, campaign, label]) => [
      ['infantry', 'Infantería alemana'], ['motorised', 'Infantería motorizada alemana'],
      ['airborne', 'Infantería aerotransportada alemana'],
    ].map(([kind, name]) => [`de-${kind}-${campaign}`, name + ' · ' + label, 'Alemania', label, year, campaign, window.VFVGermany[kind]])) : []),
    ...(!options.demo && window.VFVItaly ? [1940, 1941, 1942, 1943].flatMap(year => [
      ['infantry', 'Infantería italiana'], ['bersaglieri', 'Bersaglieri'],
      ...(year >= 1941 ? [['airborne', 'Infantería aerotransportada italiana']] : []),
    ].map(([kind, name]) => [`it-${kind}-${year}`, name + ' · ' + year, 'Italia', String(year), year, 'IT', window.VFVItaly[kind]])) : []),
    ...(!options.demo && window.VFVSoviets ? [1939, 1940, 1941, 1942, 1943].flatMap(year => [
      ['infantry', 'Infantería soviética'],
      ...(year >= 1941 ? [['motorised', 'Infantería motorizada soviética']] : []),
      ...(year === 1941 || year === 1942 ? [['airborne', 'Paracaidistas soviéticos']] : []),
    ].map(([kind, name]) => [`su-${kind}-${year}`, name + ' · ' + year, 'Unión Soviética', String(year), year, 'SU', window.VFVSoviets[kind]])) : [])];
    const [rosterId, rosterName, nation, period, year, campaign, data] =
      rosters.find(([id]) => options.roster === id) || british;
    const E = data ? window.OOBDemo.createEngine(data, { year, campaign }) : window.OOBDemo;
    const D = E.data;
    const KEY = options.demo ? 'vfv-oob-demo-v1' : data ? 'vfv-oob-' + rosterId : 'vfv-oob-list-v2';
    const countries = [...new Set(rosters.map(roster => roster[2]))].sort((a, b) => a.localeCompare(b, 'es'));
    const rosterOptions = countries.map(country => `<optgroup label="${country}">` +
      rosters.filter(roster => roster[2] === country).map(([id, name]) =>
        `<option value="${id}" ${id === rosterId ? 'selected' : ''}>${name}</option>`).join('') + '</optgroup>').join('');
    const container = document.createElement('div');
    container.className = 'oob-demo';
    container.innerHTML = `<div class="page-heading"><div><p class="eyebrow">ORDEN DE BATALLA / ${nation.toUpperCase()}</p><h1 class="page-title">Constructor de listas</h1><p class="sub">${rosterName}</p></div><span class="pill">${period}</span></div>
        <div class="card setup-card">
          <div class="toolbar-row">
            <div class="army-field"><label class="lbl" for="oobSelect">Orden de batalla</label><select class="field" id="oobSelect">${rosterOptions}</select></div>
            <div><label class="lbl" for="budgetInput">Presupuesto (★)</label><input class="field" type="number" id="budgetInput" min="0" max="50" step="1" value="15" inputmode="numeric"></div>
          </div>
          <div class="budget-bar"><span>Presupuesto <b id="budgetTotal">15</b> ★</span><span>Disponible <b class="budget-remaining ok" id="budgetRemaining">15</b> ★</span></div>
        </div>
        <div id="validationErrors" class="validation-errors warn" role="status" aria-live="polite"></div>
        <section id="nucleo" class="builder-section">
          <h2 class="sec-head">Núcleo obligatorio <span class="n">Incluido · 0★</span></h2>
          <p class="section-intro">Toca un círculo gris para colocar un refuerzo comprado. Toca un refuerzo colocado para moverlo o devolverlo al banco.</p>
          <div class="figure-legend" aria-label="Leyenda de figuras"><span><i class="legend-dot commander">C</i> Comandante</span><span><i class="legend-dot leader">J</i> Jefe</span><span><i class="legend-dot">•</i> Soldado</span><span><i class="legend-dot empty">+</i> Refuerzo</span></div>
          <p id="placementStatus" class="placement-status" role="status" aria-live="polite"></p>
          <div id="coreList" class="core-grid"></div>
        </section>
        <section id="refuerzos" class="builder-section">
          <h2 class="sec-head">Refuerzos <span class="n" id="reinforcementCount">0/4 compras</span></h2>
          <p class="section-intro">Cada compra añade figuras a tu banco. Después toca los círculos grises del núcleo o de los apoyos para colocarlas. También puedes seleccionar una figura del banco y elegir su hueco.</p>
          <div class="controls purchase-controls" id="reinforcementBuy"></div>
          <div id="reinforcementsList" class="reinforcement-grid"></div>
        </section>
        <section id="equipo" class="builder-section">
          <h2 class="sec-head">Equipamiento y experiencia</h2>
          <div class="card" id="equipmentList"></div>
        </section>
        <section id="apoyos" class="builder-section">
          <h2 class="sec-head">Apoyos orgánicos</h2>
          <p class="section-intro">Cuando un apoyo cuesta 1♦, elige dos figuras de la fuerza o dos fusileros de refuerzo sin colocar.</p>
          <div id="fireSupportList" class="support-grid"></div>
        </section>
        <section id="vehiculos" class="builder-section">
          <h2 class="sec-head">Apoyo divisional</h2>
          <div class="controls" id="divisionalBonus"></div>
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
        <footer class="builder-footer"><span class="pill">${rosterName}</span></footer>
        <dialog id="builderDialog" class="builder-dialog" aria-labelledby="builderDialogTitle"><div id="builderDialogContent"></div></dialog>
  `;
    host.appendChild(container);
    let state = E.fresh(), storageMessage = '', pickedFigure = '', placementMessage = '', dialogState = null, renderTotals;
    const $ = id => container.querySelector('#' + id);
    const esc = text => String(text).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    try {
      const saved = localStorage.getItem(KEY) || (!options.demo && !data ? localStorage.getItem('vfv-oob-demo-v1') : null);
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
    const weapons = { commander_pistol: 'Pistola', team_leader_rifle: 'Fusil', recce_leader: 'Fusil',
      rifleman: 'Fusil', recce_rifleman: 'Fusil', light_mortar: 'Mortero 2″', bren_lmg: 'Bren', recce_bren: 'Bren',
      vickers_mmg: 'Vickers', mortar_crew: 'Servidor', vickers_crew: 'Servidor', at_gun_crew: 'Servidor',
      anti_tank_rifle: 'ATR', sniper: 'Precisión', truck_driver: 'Conductor', vb1940: 'VB 1940',
      french_lmg: 'FM 24/29 o Chauchat', hotchkiss_mmg: 'Hotchkiss', belgian_bar: 'FN Modelo 1930',
      belgian_mmg: 'MMG', polish_bar: 'Rkm wz. 1928', team_leader_smg: 'SMG',
      mortar: 'Mortero', crew: 'Servidor', at_gun: 'ATG', commander_smg: 'SMG',
      finnish_lmg: 'Lahti-Saloranta M/26', finnish_mmg: 'Maxim M/09-21', flamethrower: 'Lanzallamas',
      bar: 'BAR', browning_mmg: 'Browning M1919', browning_hmg: 'Browning M2',
      mg34_lmg: 'MG34', mg34_mmg: 'MG34 en trípode', howitzer: 'Obús', smg: 'SMG',
      breda_lmg: 'Breda M1930', breda_mmg: 'Breda M1937', autocannon: 'Breda de 20 mm',
      dp28: 'DP-28', maxim: 'Maxim', dshk: 'DShK', commissar: 'Pistola' };
    function figureHTML(f, config = {}) {
      const commander = ['commander_pistol', 'commander_smg'].includes(f.type);
      const leader = f.leader || D.FIGURE_TYPES[f.type]?.category === 'leader';
      const empty = !f.present && !f.removedFor;
      const status = config.status || (f.removedFor ? 'Retirada ' + f.removedFor : empty ? 'Hueco gris' : f.reinforcement ? 'Ref. ' + (f.purchase + 1) : commander ? 'Comandante' : leader ? 'Jefe' : 'Soldado');
      const mark = f.removedFor ? '×' : empty ? '+' : commander ? 'C' : leader ? 'J' : '•';
      const label = [f.unit, f.team, D.FIGURE_TYPES[f.type]?.name || f.type, status].filter(Boolean).join(' · ');
      const tag = config.button ? 'button' : 'div';
      return `<${tag} ${config.button ? 'type="button"' : 'role="img"'} class="figure-token ${commander ? 'commander' : leader ? 'leader' : 'soldier'} ${empty ? 'empty' : 'filled'} ${f.removedFor ? 'removed' : ''} ${config.selected ? 'chosen' : ''}" ${config.attributes || ''} ${config.disabled ? 'disabled' : ''} aria-label="${esc(label)}" ${config.pressed === undefined ? '' : `aria-pressed="${config.pressed}"`} title="${esc(label)}"><span class="figure-circle" aria-hidden="true">${mark}</span><span class="figure-weapon">${esc(f.rifleSwap ? 'Fusil' : f.smg ? 'SMG' : weapons[f.type] || f.type)}</span><span class="figure-status">${esc(status)}</span></${tag}>`;
    }
    function unitHTML(unit) {
      const transports = unit.transportSlots.map((slot, index) =>
        `<div class="controls"><span>Transporte ${index + 1} · ${esc(slot.selected.name)}</span>` +
        slot.options.filter(o => o.id !== slot.selected.id).map(o => button(`${o.name} · ${o.cost}★`, 'transport', slot.key, o.id)).join('') + '</div>').join('');
      const recon = unit.reconLmg ? button(state.reconSwap === unit.id ? 'Restaurar LMG (+1★)' : 'LMG → fusilero (−1★)', 'reconSwap', unit.id) : '';
      const skis = D.SKIS ? button(unit.skis ? 'Quitar esquís' : 'Poner esquís', 'skis', unit.id) : '';
      return `<div class="unit-card card core"><h3>${esc(unit.name)}</h3>${transports}${recon}${skis}${[...new Set(unit.figures.map(f => f.team))].map(team =>
        `<p class="team-name">${esc(team)}</p><div class="figure-grid">${unit.figures.filter(f => f.team === team).map(f => {
          const source = pickedFigure && renderTotals.pool.find(p => p.key === pickedFigure);
          const selected = source && !f.present && E.compatible(source, f);
          const token = figureHTML(f, { button: !f.fixed && !f.removedFor, selected,
            attributes: `data-slot="${esc(f.key)}" ${!f.fixed && !f.removedFor ? `data-figure-slot="${esc(f.key)}"` : ''}` });
          const original = weapons[f.type] || f.type;
          return f.present && E.canSwapToRifle(f)
            ? '<div>' + token + button(f.rifleSwap ? 'Restaurar ' + original : original + ' → fusil', 'rifleSwaps', f.key) + '</div>' : token;
        }).join('')}</div>`).join('')}</div>`;
    }
    function bankHTML(f) {
      return figureHTML({ ...f, present: true, unit: 'Refuerzo ' + (f.purchase + 1) }, {
        button: true, attributes: `data-bank-figure="${esc(f.key)}"`, disabled: f.status === 'payment',
        selected: pickedFigure === f.key, pressed: pickedFigure === f.key,
        status: f.status === 'payment' ? 'Pago ♦' : f.status === 'placed' ? 'Colocado' : 'Disponible' });
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
      const lines = [rosterName, `${t.stars}/${t.budget}★ · ${t.minis} figuras de infantería · ${t.vehicles} vehículos`, ''];
      t.units.forEach(u => {
        lines.push(u.name + (state.elite || D.ALWAYS_ELITE ? ' (Élite)' : state.recruit ? ' (Recluta)' : '') + (u.skis ? ' · esquís' : ''));
        u.transportSlots.forEach(slot => lines.push('  Transporte · ' + slot.selected.name + ' · ' + slot.selected.cost + '★'));
        u.figures.filter(f => f.present || f.removedFor).forEach(f => lines.push('  [' + f.team + '] ' +
          (f.rifleSwap ? 'Fusil' : f.smg ? 'Subfusil' : D.FIGURE_TYPES[f.type]?.name || f.type) +
          (f.removedFor ? ' — retirada para ' + f.removedFor : f.reinforcement ? ' — refuerzo ' + (f.purchase + 1) : '')));
      });
      Object.entries(state.vehicles).forEach(([id, opts]) => {
        const v = D.DIVISIONAL_VEHICLES.find(x => x.id === id);
        lines.push(v.name + ' — ' + v.cost + '★ · ' + E.weapons(v, opts).join(', '));
        v.options.filter(o => opts.includes(o.id)).forEach(o => lines.push('  ' + o.name + ' +' + o.cost + '★'));
      });
      if (t.diamonds) lines.push(`Pago de ${t.diamonds}♦: ${t.diamondPaid}/${t.diamonds * 2} figuras.`);
      if (state.antiTankAssault) lines.push('Asalto anticarro para los equipos de las escuadras · 1★');
      lines.push(`Refuerzos: ${state.purchases.length}/4 compras; ${t.reinforcements} presentes; ${t.unused} sin colocar (no cuentan en la fuerza).`,
        'Destinos de refuerzos y bajas para ♦ elegidos manualmente. Las retiradas para SMG son automáticas.');
      if (t.errors.length) lines.push(...t.errors);
      return lines.join('\n');
    }
    function diamondHTML(t, id) {
      const paymentId = id === 'fs_sniper' ? 'diamondPayment' : 'diamondPayment-' + id;
      const payments = id === 'fs_sniper' && state.support[id] ? [{
        method: state.sniperPayment,
        figures: state.sniperPayment === 'force' ? state.sniperDonors : state.sniperReserve,
      }] : state.diamondPayments?.[id] || [];
      if (!payments.length) return `<p class="note-line" id="${esc(paymentId)}">1♦ = dos figuras. Al reclutarlo elegirás qué soldados descartar.</p>`;
      return `<div class="diamond-payment" id="${esc(paymentId)}">` + payments.map(payment => {
        const force = payment.method === 'force';
        const paid = force ? t.units.flatMap(u => u.figures).filter(f => payment.figures.includes(f.key)) :
          t.pool.filter(f => payment.figures.includes(f.key)).map(f => ({ ...f, present: true, unit: 'Refuerzo ' + (f.purchase + 1) }));
        return '<p class="diamond-status" role="status">Pago de 1♦: <b>' + paid.length + '/2 figuras ' + (force ? 'retiradas de la fuerza' : 'reservadas de refuerzos') + '</b>.</p><div class="figure-grid payment-figures">' +
          paid.map(f => figureHTML(f, { status: force ? 'Retirada ♦' : 'Pago ♦' })).join('') + '</div>';
      }).join('') + '</div>';
    }
    function render() {
      const openAssignments = [...container.querySelectorAll('details.assignment-alternative[open]')].map(el => el.dataset.purchase);
      const t = E.calculate(state), rem = t.budget - t.stars;
      renderTotals = t;
      if (!t.pool.some(f => f.key === pickedFigure && f.status !== 'payment')) pickedFigure = '';
      $('budgetInput').value = state.budget;
      $('budgetTotal').textContent = t.budget;
      $('budgetRemaining').textContent = rem;
      $('budgetRemaining').className = 'budget-remaining ' + (rem < 0 ? 'over' : rem <= 2 ? 'near' : 'ok');
      $('coreList').innerHTML = t.units.slice(0, D.CORE_UNITS.length).map(unitHTML).join('');
      $('reinforcementCount').textContent = `${state.purchases.length}/${D.MAX_REINFORCEMENT_PURCHASES} compras · ${t.unused} sin colocar`;
      $('reinforcementBuy').innerHTML = D.REINFORCEMENT_OPTIONS.map(o => button(`+ ${o.name} (${o.cost}★)`, 'reinforce', o.id)).join('');
      $('placementStatus').innerHTML = esc(placementMessage || (pickedFigure ? 'Figura seleccionada. Toca un círculo gris compatible para colocarla.' : `${t.unused} ${t.unused === 1 ? 'figura comprada disponible' : 'figuras compradas disponibles'} para colocar.`)) +
        (pickedFigure ? ' <button type="button" class="btn" data-clear-pick>Cancelar selección</button>' : '');
      $('reinforcementsList').innerHTML = state.purchases.map((id, i) => `<article class="unit-card card"><div class="purchase-heading"><span class="pill">Refuerzo ${i + 1} · 1★</span>${button('Eliminar compra ' + (i + 1), 'unreinforce', i)}</div><h3>${esc(D.REINFORCEMENT_OPTIONS.find(o => o.id === id).name)}</h3><p class="note-line">${t.pool.filter(f => f.purchase === i && f.status === 'placed').length} asignadas · ${t.pool.filter(f => f.purchase === i && f.status === 'payment').length} para ♦ · ${t.pool.filter(f => f.purchase === i && f.status === 'unused').length} sin colocar</p><div class="figure-grid bank-figures">${t.pool.filter(f => f.purchase === i).map(bankHTML).join('')}</div><details class="assignment-alternative" data-purchase="${i}"><summary>Asignar por nombre</summary>${t.pool.filter(f => f.purchase === i).map(f => assignmentHTML(f, t)).join('')}</details></article>`).join('') ||
        '<p class="empty-bank">Compra un refuerzo. Sus figuras aparecerán aquí listas para colocar tocando los círculos grises.</p>';
      container.querySelectorAll('details.assignment-alternative').forEach(el => { el.open = openAssignments.includes(el.dataset.purchase); });
      $('fireSupportList').innerHTML = D.FIRE_SUPPORT.filter(f => f.type !== 'modifier').map(f => {
        const count = state.support[f.id] || 0;
        let controls = f.cost === 'diamond'
          ? (count < f.limit && E.available(f) ? `<button type="button" class="btn primary" data-recruit-diamond="${esc(f.id)}" ${f.requires && !state.support[f.requires] ? 'disabled' : ''}>Añadir ${esc(f.name.toLowerCase())} · 1♦</button>` : '') +
            (count ? (f.id === 'fs_sniper' ? button('Quitar francotirador', 'sniper', 'force') : button('− Quitar último', 'removeDiamond', f.id)) : '')
          : button('+ Añadir', 'support', f.id, 1) + button('− Quitar', 'support', f.id, -1);
        if (f.hasOptionalModule) controls += button(state.motoModule ? 'Quitar 2º vehículo' : 'Añadir 2º vehículo (+1★)', 'moto') +
          (f.reconLmg ? '' : button(state.brenSwap ? 'Restaurar Bren (+1★)' : 'Bren → fusilero (−1★)', 'bren'));
        const units = t.units.filter(u => u.id.startsWith(f.id + ':'));
        const cost = state.recruit && f.id === D.RECRUIT_FREE_SUPPORT ? 0 : f.cost;
        return `<article class="unit-card card ${count ? 'selected' : ''}"><h3>${esc(f.name)}</h3><p class="note-line">${cost === 'diamond' ? '1♦ = 2 figuras' : cost + '★'} · ${count}/${f.limit}${!E.available(f) ? ' · No disponible en esta campaña' : ''}</p>${f.cost === 'diamond' ? diamondHTML(t, f.id) : ''}<div class="controls">${controls}</div>${units.map(unitHTML).join('')}</article>`;
      }).join('');
      const maxRemoved = D.MAX_SMG_REMOVALS === Infinity ? '' : '/' + (D.MAX_SMG_REMOVALS ?? 2);
      $('equipmentList').innerHTML = `<p>Retiradas para SMG: ${state.removed}${maxRemoved} · conversiones: ${state.smg}/${state.removed * (D.SMG_PER_REMOVAL ?? 2)}${D.ALWAYS_ELITE ? ' · Élite' : ''}</p><div class="controls">` +
        button('Retirar fusilero', 'removed', '', 1) + button('Devolver fusilero', 'removed', '', -1) +
        button('+ SMG', 'smg', '', 1) + button('− SMG', 'smg', '', -1) +
        (D.RECRUIT_FREE_SUPPORT ? button(state.recruit ? 'Volver a Regular' :
          'Recluta · ' + D.FIRE_SUPPORT.find(f => f.id === D.RECRUIT_FREE_SUPPORT).name + ' a 0★', 'recruit') : '') +
        (!D.ALWAYS_ELITE && (!D.RECRUIT_FREE_SUPPORT || D.ELITE_COST) ?
          button(state.elite ? 'Quitar Élite' : 'Añadir Élite (+3★)', 'elite') : '') +
        (D.ELITE_DISCOUNT ? button(state.eliteDiscount ? 'Quitar descuento Flik Flok' : 'Aplicar éxito de Flik Flok · Élite 2★', 'eliteDiscount') : '') +
        (D.ANTI_TANK_ASSAULT_COST ? button(state.antiTankAssault ? 'Quitar Asalto anticarro' : 'Añadir Asalto anticarro (+1★)', 'antiTankAssault') : '') + '</div>';
      $('divisionalBonus').innerHTML = D.DIVISIONAL_BONUS ?
        button(state.divisionalBonus ? 'Quitar bonificación divisional' : 'Aplicar éxito de Apoyo (+1★ divisional)', 'divisionalBonus') :
        D.FIRST_DIVISIONAL_SURCHARGE ? '<p class="note-line">Primer apoyo divisional · +1★</p>' : '';
      $('divisionalGrid').innerHTML = D.DIVISIONAL_VEHICLES.filter(E.purchasable).map(v => {
        const selected = Object.hasOwn(state.vehicles, v.id);
        return `<article class="vehicle-card card ${selected ? 'selected' : ''}"><h3>${esc(v.name)} <span class="cost">${v.cost}★</span></h3><p class="vehicle-stats">Blindaje ${v.armor} · ${esc(E.weapons(v, state.vehicles[v.id] || []).join(', '))}<br>${esc(v.rules.join(', '))}</p>` +
          (selected || v.cost > 0 ? button(selected ? 'Quitar vehículo' : 'Añadir vehículo', 'vehicle', v.id) : '') +
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
    const modal = $('builderDialog');
    function closeDialog() { modal.close(); dialogState = null; }
    function dialogFrame(title, content, footer = '') {
      $('builderDialogContent').innerHTML = `<div class="dialog-heading"><h2 id="builderDialogTitle">${esc(title)}</h2><button type="button" class="dialog-close" data-close-dialog aria-label="Cerrar ventana">×</button></div>${content}<div class="dialog-footer">${footer}<button type="button" class="btn" data-close-dialog>Cancelar</button></div>`;
      if (!modal.open) modal.showModal();
    }
    function openEmptySlot(slot) {
      dialogState = { type: 'empty', slot: slot.key };
      dialogFrame('Completar ' + slot.unit,
        `<p>No quedan figuras compatibles sin colocar. Puedes comprar un refuerzo y colocar aquí una de sus figuras.</p><div class="figure-grid">${figureHTML(slot)}</div><div class="controls">` +
        D.REINFORCEMENT_OPTIONS.filter(o => o.figures.some(type => E.compatible({ type }, slot))).map(o =>
          `<button type="button" class="btn primary" data-buy-slot="${o.id}" ${E.change(state, 'reinforce', o.id) === state ? 'disabled' : ''}>Comprar ${esc(o.name)} · 1★</button>`).join('') + '</div>');
    }
    function openPlacedFigure(source) {
      const t = E.calculate(state), f = t.pool.find(f => f.key === source);
      const slot = t.units.flatMap(u => u.figures).find(s => s.key === f?.target);
      if (!f || !slot || f.status !== 'placed' || slot.removedFor) return;
      dialogState = { type: 'placed', source };
      dialogFrame('Mover un refuerzo', `<p>${esc(slot.unit + ' · ' + slot.team)}</p><div class="figure-grid">${figureHTML(slot)}</div>`,
        `<button class="btn primary" type="button" data-move-figure>Elegir otro hueco</button><button class="btn" type="button" data-return-figure>Devolver al banco</button>`);
    }
    function openDiamond(id) {
      dialogState = { type: 'diamond', unit: id, method: 'force', selected: [] };
      paintDiamond();
    }
    function paintDiamond() {
      const draft = dialogState, t = E.calculate(state);
      const unit = D.FIRE_SUPPORT.find(f => f.id === draft.unit);
      const tabs = unit.forceOnly ? '' : `<div class="payment-method" role="group" aria-label="De dónde salen las dos figuras"><button type="button" class="btn ${draft.method === 'force' ? 'primary' : ''}" data-payment-method="force" aria-pressed="${draft.method === 'force'}">De mi fuerza</button><button type="button" class="btn ${draft.method === 'reinforcement' ? 'primary' : ''}" data-payment-method="reinforcement" aria-pressed="${draft.method === 'reinforcement'}">De refuerzos sin colocar</button></div>`;
      let choices;
      if (draft.method === 'force') {
        const allowed = new Set(t.donorCandidates.map(f => f.key));
        choices = t.units.filter(u => u.figures.some(f => allowed.has(f.key))).map(u =>
          `<section class="donor-unit"><h3>${esc(u.name)}</h3><div class="figure-grid">${u.figures.filter(f => f.present).map(f => {
            const selected = draft.selected.includes(f.key), eligible = allowed.has(f.key);
            return figureHTML(f, { button: true, selected, pressed: selected,
              attributes: `data-diamond-choice="${esc(f.key)}"`,
              disabled: !eligible || (!selected && draft.selected.length === 2),
              status: selected ? 'Descartar' : eligible ? 'Elegir' : 'Se conserva' });
          }).join('')}</div></section>`).join('');
      } else {
        const available = t.pool.filter(f => f.status === 'unused' && f.option === 'rifle_reinforcement');
        choices = '<div class="figure-grid donor-bank">' + available.map(f => {
          const selected = draft.selected.includes(f.key);
          return `<div>${figureHTML({ ...f, present: true, unit: 'Refuerzo ' + (f.purchase + 1) }, { button: true, selected, pressed: selected,
            attributes: `data-diamond-choice="${esc(f.key)}"`, disabled: !selected && draft.selected.length === 2,
            status: selected ? 'Descartar' : 'Ref. ' + (f.purchase + 1) + ' · fig. ' + (f.index + 1) })}</div>`;
        }).join('') + '</div>' + (available.length < 2 ? '<p class="note">Necesitas dos figuras de refuerzo normal sin colocar. Compra un refuerzo o paga con figuras de tu fuerza.</p>' : '');
      }
      dialogFrame('Reclutar ' + unit.name.toLowerCase(), `<p class="diamond-instruction"><b>1♦ = descartar dos figuras.</b> Toca los dos fusileros que quieres retirar. No se aplicará ningún cambio hasta confirmar.</p>${tabs}<p class="payment-counter" role="status" aria-live="polite">${draft.selected.length}/2 figuras elegidas</p>${choices}`,
        `<button type="button" class="btn primary" data-confirm-diamond ${draft.selected.length === 2 ? '' : 'disabled'}>Descartar 2 figuras y reclutar</button>`);
    }
    modal.addEventListener('cancel', () => { dialogState = null; });
    modal.addEventListener('click', event => {
      event.stopPropagation();
      const b = event.target.closest('button');
      if (!b || b.disabled) return;
      if (b.hasAttribute('data-close-dialog')) { closeDialog(); return; }
      if (b.hasAttribute('data-payment-method')) { dialogState.method = b.dataset.paymentMethod; dialogState.selected = []; paintDiamond(); return; }
      if (b.hasAttribute('data-diamond-choice')) {
        const key = b.dataset.diamondChoice, chosen = dialogState.selected;
        dialogState.selected = chosen.includes(key) ? chosen.filter(k => k !== key) : chosen.length < 2 ? [...chosen, key] : chosen;
        paintDiamond();
        modal.querySelector(`[data-diamond-choice="${key}"]`)?.focus({ preventScroll: true }); return;
      }
      if (b.hasAttribute('data-confirm-diamond')) {
        const next = E.change(state, 'recruitDiamond', dialogState.unit, { method: dialogState.method, figures: dialogState.selected });
        if (next === state) return;
        state = next; closeDialog(); persist(); render(); return;
      }
      if (b.hasAttribute('data-move-figure')) {
        pickedFigure = dialogState.source; placementMessage = 'Elige otro círculo gris para mover este refuerzo.';
        closeDialog(); render(); $('nucleo').scrollIntoView({ block: 'start' }); return;
      }
      if (b.hasAttribute('data-return-figure')) {
        const next = E.change(state, 'assign', dialogState.source, '');
        if (next === state) return;
        state = next; pickedFigure = ''; placementMessage = 'Figura devuelta al banco.';
        closeDialog(); persist(); render(); return;
      }
      if (b.hasAttribute('data-buy-slot')) {
        const next = E.change(state, 'reinforce', b.dataset.buySlot);
        if (next === state) return;
        const t = E.calculate(next), slot = t.units.flatMap(u => u.figures).find(f => f.key === dialogState.slot);
        const source = t.pool.find(f => f.purchase === next.purchases.length - 1 && E.compatible(f, slot));
        state = E.change(next, 'assign', source.key, slot.key);
        placementMessage = 'Refuerzo comprado y figura colocada en ' + slot.unit + '.';
        closeDialog(); persist(); render();
      }
    });
    container.addEventListener('click', event => {
      if (modal.contains(event.target)) return;
      const recruit = event.target.closest('[data-recruit-diamond]');
      if (recruit) { openDiamond(recruit.dataset.recruitDiamond); return; }
      const bank = event.target.closest('[data-bank-figure]');
      if (bank && !bank.disabled) {
        const f = E.calculate(state).pool.find(f => f.key === bank.dataset.bankFigure);
        if (f.status === 'placed') { openPlacedFigure(f.key); return; }
        pickedFigure = pickedFigure === f.key ? '' : f.key; placementMessage = '';
        render(); if (pickedFigure) $('nucleo').scrollIntoView({ block: 'start' }); return;
      }
      const slotButton = event.target.closest('[data-figure-slot]');
      if (slotButton) {
        const t = E.calculate(state), slot = t.units.flatMap(u => u.figures).find(f => f.key === slotButton.dataset.figureSlot);
        if (slot.present) { openPlacedFigure(slot.source); return; }
        const source = pickedFigure ? t.pool.find(f => f.key === pickedFigure) : t.pool.find(f => f.status === 'unused' && E.compatible(f, slot));
        if (source && !E.compatible(source, slot)) { placementMessage = 'La figura seleccionada no es compatible con ese hueco. Elige otro círculo o cancela la selección.'; render(); return; }
        if (!source) { openEmptySlot(slot); return; }
        const next = E.change(state, 'assign', source.key, slot.key);
        if (next !== state) {
          state = next; pickedFigure = ''; placementMessage = 'Refuerzo colocado en ' + slot.unit + ' · ' + slot.team + '.';
          persist(); render();
        }
        return;
      }
      if (event.target.closest('[data-clear-pick]')) { pickedFigure = ''; placementMessage = ''; render(); return; }
      const b = event.target.closest('button[data-action]');
      if (!b || b.disabled) return;
      const next = E.change(state, b.dataset.action, b.dataset.id, b.dataset.value);
      if (next === state) return;
      state = next;
      if (b.dataset.action === 'reinforce') placementMessage = 'Refuerzo comprado. Toca los círculos grises para colocar sus figuras.';
      if (b.dataset.action === 'unreinforce') { pickedFigure = ''; placementMessage = 'Compra eliminada. Las demás figuras conservan su destino.'; }
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
    $('oobSelect').addEventListener('change', event => {
      const roster = event.target.value;
      container.remove();
      mount(host, { ...options, roster }).querySelector('#oobSelect').focus();
    });
    $('resetList').addEventListener('click', () => {
      if (!window.confirm('¿Reiniciar la lista de ejército?')) return;
      state = E.fresh(); pickedFigure = ''; placementMessage = ''; persist(); render();
    });
    $('exportList').addEventListener('click', () => {
      const url = URL.createObjectURL(new Blob([listText(E.calculate(state))], { type: 'text/plain;charset=utf-8' }));
      const a = document.createElement('a');
      const filename = data ? rosterId : 'british-francia-1940';
      a.href = url; a.download = `lista-${filename}${options.demo ? '-demo' : ''}.txt`; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });
    render();
    return container;
  }
})();
