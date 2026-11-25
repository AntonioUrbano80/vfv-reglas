/* Motor independiente: no accede al DOM, almacenamiento ni aplicación principal. */
(function (root) {
  'use strict';
  const britishData = typeof module !== 'undefined' ? require('./data.js') : OOB_DEMO_DATA;
  function createEngine(D, { year = 1940, campaign = 'F40' } = {}) {
  const smgPerRemoval = D.SMG_PER_REMOVAL ?? 2;
  const available = item => (!item.fromYear || item.fromYear <= year) && (!item.toYear || item.toYear >= year) &&
    (!item.avail || item.avail.some(x => x === campaign || x === 'Todos'));
  const purchasable = v => available(v) && (v.cost > 0 || v.options.some(o => o.cost > 0));
  const fresh = () => ({ version: 3, budget: 15, purchases: [], assignments: {}, sniperReserve: [], sniperDonors: ['', ''], support: {},
    motoModule: false, brenSwap: false, elite: false, removed: 0, smg: 0,
    sniperPayment: 'force', vehicles: {}, ...(D.RECRUIT_FREE_SUPPORT ? { recruit: false } : {}) });
  const rifle = f => ['rifleman', 'recce_rifleman'].includes(f.type);
  const canSwapToRifle = f => (D.SMG_TO_RIFLE && ['commander_smg', 'team_leader_smg', 'smg'].includes(f.type)) ||
    (D.KM_TO_RIFLE && f.type === 'light_mortar');
  const compatible = (figure, slot) => !slot.fixed && (
    slot.reinforcementOnly === 'rifle_reinforcement' ? figure.type === 'rifleman' :
    slot.reinforcementOnly === 'at_rifle_reinforcement' ? figure.type === 'anti_tank_rifle' :
    !!slot.reinforcementOnly && slot.reinforcementOnly === figure.option);

  function migrate(saved) {
    if (!saved || ![1, 2].includes(saved.version)) return saved;
    const next = { ...saved, version: 3, sniperDonors: ['', ''] };
    if (saved.version === 1) {
      next.assignments = {}; next.sniperReserve = [];
      if (next.support?.fs_sniper && next.sniperPayment === 'reinforcement' && Array.isArray(next.purchases)) {
        const p = next.purchases.indexOf('rifle_reinforcement');
        if (p >= 0) next.sniperReserve = [`${p}:0`, `${p}:1`];
      }
    }
    if (next.support?.fs_sniper && next.sniperPayment === 'force') {
      // Conserva las dos bajas que calculaba la versión anterior, sin inventar un pago nuevo.
      const without = { ...next, support: { ...next.support, fs_sniper: 0 } };
      if (validate(without).some(e => !e.startsWith('Presupuesto excedido:'))) return next;
      next.sniperDonors = calculate(without).units.flatMap(u => u.figures)
        .filter(f => f.present && rifle(f)).sort((a, b) => Number(b.reinforcement) - Number(a.reinforcement))
        .reverse().slice(0, 2).map(f => f.key);
    }
    return next;
  }

  const extraPayments = s => Object.values(s.diamondPayments || {}).flat();
  const diamondUnit = f => D.FIRE_SUPPORT.some(u => u.cost === 'diamond' && f.key.startsWith(u.id + ':'));

  function calculate(s) {
    const units = [];
    function addUnit(u, n, support) {
      const figures = (u.teams ? u.teams.flatMap(t => t.figures.map((f, i) => ({ ...f, team: t.name, leader: i === 0 }))) : u.baseModule.figures.map((f, i) => ({ ...f, team: 'Vehículo 1', leader: i === 0 })))
        .map((f, i) => ({ ...f, key: `${u.id}:${n}:${i}`, unit: `${u.name}${n ? ' ' + (n + 1) : ''}`,
          support, present: !!f.fixed, reinforcement: false }));
      if (u.hasOptionalModule && s.motoModule) {
        [...u.optionalModule.figures, ...u.optionalModule.reinforcementSlots].forEach((f, i) =>
          figures.push({ ...f, team: 'Vehículo 2', key: `${u.id}:${n}:module:${i}`, unit: u.name, support,
            present: !!f.fixed, reinforcement: false }));
      }
      if (u.id === 'fs_recce_moto' && s.brenSwap) {
        figures.forEach(f => { if (f.type === 'recce_bren') f.type = 'recce_rifleman'; });
      }
      const id = `${u.id}:${n}`;
      if (u.reconLmg && s.reconSwap === id) {
        const gunner = figures.find(f => f.type === u.reconLmg);
        if (gunner) gunner.type = 'rifleman';
      }
      const transportSlots = (u.transportSlots || []).map((choices, i) => {
        const options = choices.filter(available);
        const key = `${id}:${i}`;
        return { key, options, selected: options.find(o => o.id === s.transports?.[key]) || options[0] };
      });
      units.push({ id, name: figures[0].unit, figures, transportSlots, reconLmg: u.reconLmg, skis: !!s.skis?.includes(id) });
    }
    D.CORE_UNITS.forEach(u => addUnit(u, 0, false));
    let stars = s.purchases.reduce((sum, id) => sum + D.REINFORCEMENT_OPTIONS.find(option => option.id === id).cost, 0) +
      (s.elite ? (D.ELITE_COST ?? D.EQUIPMENT_OPTIONS?.find(option => option.id === 'eq_elite')?.cost ?? 3) -
        (s.eliteDiscount ? D.ELITE_DISCOUNT : 0) : 0) + (s.antiTankAssault ? D.ANTI_TANK_ASSAULT_COST : 0), vehicles = 0;
    D.FIRE_SUPPORT.filter(f => f.type !== 'modifier').forEach(f => {
      const count = s.support[f.id] || 0;
      if (typeof f.cost === 'number' && !(s.recruit && f.id === D.RECRUIT_FREE_SUPPORT)) stars += f.cost * count;
      for (let n = 0; n < count; n++) addUnit(f, n, true);
      if (f.hasOptionalModule && count) {
        vehicles += f.baseModule.vehicles;
        if (s.motoModule) { stars += f.optionalModuleCost; vehicles += f.optionalModule.vehicles; }
      }
    });
    if (s.brenSwap && s.support.fs_recce_moto) stars--;
    if (s.reconSwap && units.some(u => u.id === s.reconSwap && u.reconLmg)) stars--;
    for (const slot of units.flatMap(u => u.transportSlots)) {
      stars += slot.selected.cost;
      vehicles += slot.selected.count ?? 1;
    }
    const figures = units.flatMap(u => u.figures);
    const slots = figures.filter(f => !f.fixed);
    const pool = s.purchases.flatMap((id, purchase) => {
      const opt = D.REINFORCEMENT_OPTIONS.find(o => o.id === id);
      return opt.figures.map((type, index) => ({ type, purchase, index, key: `${purchase}:${index}`, option: id, status: 'unused' }));
    });
    const sniper = !!s.support.fs_sniper;
    const errors = [];
    const payments = extraPayments(s);
    const forceKeys = new Set(payments.filter(p => p.method === 'force').flatMap(p => p.figures));
    for (const entry of payments.filter(p => p.method === 'reinforcement')) {
      const payment = pool.filter(f => entry.figures.includes(f.key) && f.option === 'rifle_reinforcement' && f.status === 'unused');
      if (payment.length !== 2) errors.push('Cada ♦ requiere dos fusileros de refuerzo distintos y sin asignar.');
      payment.forEach(f => { f.status = 'payment'; });
    }
    if (sniper && s.sniperPayment === 'reinforcement') {
      const payment = pool.filter(f => s.sniperReserve.includes(f.key) && f.option === 'rifle_reinforcement' && f.status === 'unused');
      if (payment.length !== 2) errors.push('El francotirador requiere dos figuras sin asignar de refuerzo normal para pagar el ♦.');
      payment.forEach(f => { f.status = 'payment'; });
    }
    for (const [key, destination] of Object.entries(s.assignments)) {
      const f = pool.find(f => f.key === key);
      const target = slots.find(slot => slot.key === destination);
      if (!f || f.status !== 'unused' || !target || target.present || !compatible(f, target)) {
        errors.push('Asignación de refuerzo inválida: figura reservada, hueco ocupado, incompatible o inexistente.');
        continue;
      }
      target.present = true; target.reinforcement = true; target.purchase = f.purchase; target.source = f.key;
      f.status = 'placed'; f.target = target.key;
    }
    // No se retiran jefes, armas especiales ni figuras del propio francotirador.
    const forcePayment = sniper && s.sniperPayment === 'force';
    const removable = figures.filter(f => f.present && rifle(f) && !diamondUnit(f) &&
      !forceKeys.has(f.key) && !(forcePayment && s.sniperDonors.includes(f.key)))
      .sort((a, b) => Number(b.reinforcement) - Number(a.reinforcement));
    const removeCount = s.removed;
    if (removable.length < removeCount) errors.push('No hay suficientes fusileros para pagar las retiradas.');
    removable.slice().reverse().slice(0, removeCount).forEach((f, i) => {
      f.present = false; f.removedFor = 'SMG';
    });
    const donorCandidates = figures.filter(f => f.present && rifle(f) && !diamondUnit(f));
    if (forcePayment) {
      const donors = donorCandidates.filter(f => s.sniperDonors.includes(f.key));
      if (donors.length !== 2) errors.push('Para añadir el francotirador debes elegir y retirar dos figuras distintas de la fuerza.');
      donors.forEach(f => { f.present = false; f.removedFor = '♦'; });
    }
    for (const entry of payments.filter(p => p.method === 'force')) {
      const donors = donorCandidates.filter(f => f.present && entry.figures.includes(f.key));
      if (donors.length !== 2) errors.push('Cada ♦ requiere dos fusileros distintos de la fuerza.');
      donors.forEach(f => { f.present = false; f.removedFor = '♦'; });
    }
    const diamonds = Number(sniper) + payments.length;
    const diamondPaid = figures.filter(f => f.removedFor === '♦').length + pool.filter(f => f.status === 'payment').length;
    if (diamondPaid !== diamonds * 2) errors.push('Cada ♦ requiere exactamente dos figuras.');
    figures.forEach(f => { f.rifleSwap = canSwapToRifle(f) && !!s.rifleSwaps?.includes(f.key); });
    const convertible = figures.filter(f => f.present && !f.rifleSwap && (rifle(f) || f.type === 'team_leader_rifle' || f.type === 'recce_leader'));
    if (s.smg > s.removed * smgPerRemoval || s.smg > convertible.length) errors.push('Las conversiones SMG exceden las permitidas.');
    convertible.slice(0, s.smg).forEach(f => { f.smg = true; });
    let divisionalStars = 0;
    Object.entries(s.vehicles).forEach(([id, selection]) => {
      const v = D.DIVISIONAL_VEHICLES.find(x => x.id === id);
      divisionalStars += v.cost; vehicles++;
      v.options.forEach(o => { if (selection.includes(o.id)) divisionalStars += o.cost; });
    });
    if (divisionalStars && D.FIRST_DIVISIONAL_SURCHARGE) divisionalStars += D.FIRST_DIVISIONAL_SURCHARGE;
    stars += divisionalStars;
    const budget = Math.max(0, s.budget - (D.BUDGET_PENALTY || 0)) +
      Math.min(divisionalStars, s.divisionalBonus ? D.DIVISIONAL_BONUS : 0);
    if (stars > budget) errors.push(`Presupuesto excedido: ${stars}★ / ${budget}★.`);
    const active = figures.filter(f => f.present);
    return { stars, budget, diamonds, diamondPaid, donorCandidates: donorCandidates.filter(f => f.present), minis: active.length, vehicles,
      core: active.filter(f => !f.support).length, fire: active.filter(f => f.support).length,
      reinforcements: active.filter(f => f.reinforcement).length,
      totalGrey: slots.length, usedGrey: slots.filter(f => f.present).length,
      free: slots.filter(f => !f.present).length,
      unused: pool.filter(f => f.status === 'unused').length, units, pool, errors };
  }

  function validate(s) {
    if (!s || s.version !== 3 || !Number.isInteger(s.budget) || s.budget < 0 || s.budget > 50 ||
        (s.recruit !== undefined && (typeof s.recruit !== 'boolean' || !D.RECRUIT_FREE_SUPPORT)) ||
        (s.divisionalBonus !== undefined && (!D.DIVISIONAL_BONUS || typeof s.divisionalBonus !== 'boolean')) ||
        (s.antiTankAssault !== undefined && (!D.ANTI_TANK_ASSAULT_COST || typeof s.antiTankAssault !== 'boolean')) ||
        !Array.isArray(s.sniperDonors) || s.sniperDonors.length !== 2 || s.sniperDonors.some(v => typeof v !== 'string') ||
        new Set(s.sniperDonors.filter(Boolean)).size !== s.sniperDonors.filter(Boolean).length ||
        !s.assignments || typeof s.assignments !== 'object' || Array.isArray(s.assignments) ||
        Object.values(s.assignments).some(v => typeof v !== 'string') ||
        !Array.isArray(s.sniperReserve) || s.sniperReserve.some(v => typeof v !== 'string') ||
        new Set(s.sniperReserve).size !== s.sniperReserve.length ||
        !Array.isArray(s.purchases) || s.purchases.length > D.MAX_REINFORCEMENT_PURCHASES ||
        s.purchases.some(id => !D.REINFORCEMENT_OPTIONS.some(o => o.id === id)) ||
        !s.support || typeof s.support !== 'object' || Array.isArray(s.support) ||
        !s.vehicles || typeof s.vehicles !== 'object' || Array.isArray(s.vehicles) ||
        !['force', 'reinforcement'].includes(s.sniperPayment) ||
        ['motoModule', 'brenSwap', 'elite'].some(k => typeof s[k] !== 'boolean') ||
        (s.elite && (D.ALWAYS_ELITE || s.recruit || (D.RECRUIT_FREE_SUPPORT && !D.ELITE_COST))) ||
        (s.eliteDiscount !== undefined && (!D.ELITE_DISCOUNT || typeof s.eliteDiscount !== 'boolean' || (s.eliteDiscount && !s.elite))) ||
        (s.skis !== undefined && (!D.SKIS || !Array.isArray(s.skis) || new Set(s.skis).size !== s.skis.length)) ||
        (s.rifleSwaps !== undefined && (!(D.SMG_TO_RIFLE || D.KM_TO_RIFLE) || !Array.isArray(s.rifleSwaps) || new Set(s.rifleSwaps).size !== s.rifleSwaps.length)) ||
        !Number.isInteger(s.removed) || s.removed < 0 || s.removed > (D.MAX_SMG_REMOVALS ?? 2) ||
        !Number.isInteger(s.smg) || s.smg < 0 || s.smg > (D.MAX_SMG_REMOVALS ?? 2) * smgPerRemoval) return ['Formato de lista inválido.'];
    for (const [id, count] of Object.entries(s.support)) {
      const f = D.FIRE_SUPPORT.find(x => x.id === id && x.type !== 'modifier');
      if (!f || !Number.isInteger(count) || count < 0 || count > f.limit || (count && !available(f)))
        return ['Apoyo inválido, fuera de límite o no disponible en esta campaña.'];
      if (count && f.requires && !s.support[f.requires]) return ['El equipo adicional requiere su grupo.'];
    }
    if (s.diamondPayments !== undefined && (!s.diamondPayments || typeof s.diamondPayments !== 'object' ||
        Array.isArray(s.diamondPayments))) return ['Formato de pagos de rombo inválido.'];
    const validPayment = p => p && ['force', 'reinforcement'].includes(p.method) &&
      Array.isArray(p.figures) && p.figures.length === 2 && new Set(p.figures).size === 2 &&
      p.figures.every(key => typeof key === 'string' && key);
    for (const [id, payments] of Object.entries(s.diamondPayments || {})) {
      if (!D.FIRE_SUPPORT.some(f => f.id === id && f.cost === 'diamond') || id === 'fs_sniper' ||
          !Array.isArray(payments) || payments.length !== (s.support[id] || 0) ||
          !payments.every(p => validPayment(p) && (p.method === 'force' || !D.FIRE_SUPPORT.find(f => f.id === id).forceOnly)))
        return ['Pago de rombo inválido.'];
    }
    if (D.FIRE_SUPPORT.some(f => f.cost === 'diamond' && f.id !== 'fs_sniper' &&
        (s.support[f.id] || 0) !== (s.diamondPayments?.[f.id]?.length || 0))) return ['Falta un pago de rombo.'];
    const sharedCounts = new Map();
    for (const support of D.FIRE_SUPPORT) {
      if (!support.selectionGroup) continue;
      const total = (sharedCounts.get(support.selectionGroup) || 0) + (s.support[support.id] || 0);
      if (total > support.maxTotalGroup) return [`El grupo ${support.selectionGroup} admite hasta ${support.maxTotalGroup} apoyos.`];
      sharedCounts.set(support.selectionGroup, total);
    }
    if ((s.motoModule || s.brenSwap) && !s.support.fs_recce_moto) return ['La opción recce requiere la unidad base.'];
    if (s.brenSwap && D.FIRE_SUPPORT.some(f => f.reconLmg)) return ['Cambio de arma de reconocimiento inválido.'];
    if ((!s.support.fs_sniper || s.sniperPayment !== 'reinforcement') && s.sniperReserve.length)
      return ['Reserva de figuras sin francotirador.'];
    if (s.sniperReserve.length > 2) return ['El pago del francotirador requiere dos figuras.'];
    for (const [id, options] of Object.entries(s.vehicles)) {
      const v = D.DIVISIONAL_VEHICLES.find(x => x.id === id);
      if (!v || !purchasable(v) || !Array.isArray(options) || new Set(options).size !== options.length ||
          options.some(id => !v.options.some(o => o.id === id)) ||
          (v.cost === 0 && !v.options.some(o => o.cost > 0 && options.includes(o.id)))) return ['Vehículo u opción no disponible.'];
      const groups = v.options.filter(option => option.selectionGroup && options.includes(option.id)).map(option => option.selectionGroup);
      if (new Set(groups).size !== groups.length) return ['Las opciones del mismo grupo son excluyentes.'];
    }
    if (s.transports !== undefined && (!s.transports || typeof s.transports !== 'object' ||
        Array.isArray(s.transports))) return ['Formato de transportes inválido.'];
    const totals = calculate(s);
    if ((s.skis || []).some(id => !totals.units.some(u => u.id === id)) ||
        (s.rifleSwaps || []).some(key => !totals.units.some(u => u.figures.some(f => f.key === key && canSwapToRifle(f)))))
      return ['Equipo de invierno o cambio de arma no disponible.'];
    if (s.reconSwap !== undefined && s.reconSwap !== '' &&
        !totals.units.some(u => u.id === s.reconSwap && u.reconLmg)) return ['Equipo de reconocimiento no disponible.'];
    const transportSlots = totals.units.flatMap(u => u.transportSlots);
    if (Object.entries(s.transports || {}).some(([key, value]) =>
      !transportSlots.some(slot => slot.key === key && slot.options.some(o => o.id === value))))
      return ['Transporte no disponible para esta unidad.'];
    return totals.errors;
  }

  function change(s, action, id, value) {
    const next = JSON.parse(JSON.stringify(s));
    switch (action) {
      case 'budget': next.budget = Number(value); break;
      case 'reinforce': next.purchases.push(id); break;
      case 'unreinforce': {
        if (!Number.isInteger(Number(id)) || Number(id) < 0 || Number(id) >= next.purchases.length) return s;
        const removed = Number(id);
        const rekey = key => { const [p, i] = key.split(':').map(Number); return p === removed ? null : `${p > removed ? p - 1 : p}:${i}`; };
        const reserves = extraPayments(next).filter(p => p.method === 'reinforcement');
        if (reserves.some(p => p.figures.some(key => rekey(key) === null))) return s;
        reserves.forEach(payment => { payment.figures = payment.figures.map(rekey); });
        if (next.sniperReserve.some(key => rekey(key) === null)) return s;
        next.assignments = Object.fromEntries(Object.entries(next.assignments)
          .filter(([key]) => rekey(key) !== null).map(([key, target]) => [rekey(key), target]));
        next.sniperReserve = next.sniperReserve.map(rekey);
        next.purchases.splice(removed, 1); break;
      }
      case 'assign': {
        const figure = calculate(s).pool.find(f => f.key === id);
        if (!figure || figure.status === 'payment' || typeof value !== 'string') return s;
        if (value) next.assignments[id] = value; else delete next.assignments[id];
        break;
      }
      case 'sniperDonor': {
        const index = Number(id);
        if (next.support.fs_sniper || ![0, 1].includes(index) || typeof value !== 'string') return s;
        if (value && !calculate(s).donorCandidates.some(f => f.key === value)) return s;
        next.sniperDonors[index] = value;
        break;
      }
      case 'recruitDiamond': {
        // La selección visual confirma el alta y las dos bajas en una sola operación.
        const unit = D.FIRE_SUPPORT.find(f => f.id === id && f.cost === 'diamond');
        if (!unit || (next.support[id] || 0) >= unit.limit || !value ||
            !['force', 'reinforcement'].includes(value.method) || !Array.isArray(value.figures) ||
            value.figures.length !== 2 || new Set(value.figures).size !== 2 ||
            value.figures.some(key => typeof key !== 'string' || !key)) return s;
        next.support[id] = (next.support[id] || 0) + 1;
        if (id !== 'fs_sniper') {
          next.diamondPayments ||= {};
          (next.diamondPayments[id] ||= []).push({ method: value.method, figures: [...value.figures] });
          break;
        }
        next.sniperPayment = value.method;
        next.sniperReserve = value.method === 'reinforcement' ? value.figures : [];
        next.sniperDonors = value.method === 'force' ? value.figures : ['', ''];
        break;
      }
      case 'removeDiamond':
        if (!next.diamondPayments?.[id]?.length) return s;
        next.diamondPayments[id].pop();
        next.support[id]--;
        break;
      case 'support': {
        const f = D.FIRE_SUPPORT.find(x => x.id === id && x.type !== 'modifier' && x.cost !== 'diamond');
        if (!f || !available(f) || ![-1, 1].includes(Number(value))) return s;
        next.support[id] = (next.support[id] || 0) + Number(value);
        if (id === 'fs_recce_moto' && !next.support[id]) { next.motoModule = false; next.brenSwap = false; }
        break;
      }
      case 'sniper':
        next.support.fs_sniper = next.support.fs_sniper ? 0 : 1; next.sniperPayment = id;
        next.sniperReserve = next.support.fs_sniper && id === 'reinforcement'
          ? calculate(s).pool.filter(f => f.option === 'rifle_reinforcement' && f.status === 'unused').slice(0, 2).map(f => f.key) : [];
        break;
      case 'moto': next.motoModule = !next.motoModule; break;
      case 'bren': next.brenSwap = !next.brenSwap; break;
      case 'divisionalBonus': next.divisionalBonus = !next.divisionalBonus; break;
      case 'antiTankAssault': next.antiTankAssault = !next.antiTankAssault; break;
      case 'reconSwap': next.reconSwap = next.reconSwap === id ? '' : id; break;
      case 'elite':
        next.elite = !next.elite;
        if (next.elite && next.recruit) next.recruit = false;
        if (next.eliteDiscount) next.eliteDiscount = false;
        break;
      case 'eliteDiscount':
        if (!D.ELITE_DISCOUNT) return s;
        next.elite = true;
        next.eliteDiscount = !next.eliteDiscount;
        break;
      case 'recruit':
        if (!D.RECRUIT_FREE_SUPPORT) return s;
        next.recruit = !next.recruit;
        if (next.recruit) next.elite = false;
        break;
      case 'skis':
      case 'rifleSwaps': {
        const selected = next[action] || [];
        next[action] = selected.includes(id) ? selected.filter(key => key !== id) : [...selected, id];
        break;
      }
      case 'transport':
        next.transports ||= {};
        next.transports[id] = value;
        break;
      case 'removed': next.removed += Number(value); next.smg = Math.min(next.smg, next.removed * smgPerRemoval); break;
      case 'smg': next.smg += Number(value); break;
      case 'vehicle':
        if (Object.hasOwn(next.vehicles, id)) delete next.vehicles[id]; else next.vehicles[id] = [];
        break;
      case 'option': {
        const vehicle = D.DIVISIONAL_VEHICLES.find(item => item.id === id);
        if (!vehicle || (!Object.hasOwn(next.vehicles, id) && vehicle.cost > 0)) return s;
        const options = next.vehicles[id] || [];
        if (options.includes(value)) {
          next.vehicles[id] = options.filter(x => x !== value);
          if (vehicle.cost === 0 && !next.vehicles[id].length) delete next.vehicles[id];
        } else {
          const group = vehicle.options.find(option => option.id === value)?.selectionGroup;
          const remaining = group ? options.filter(selected => !vehicle.options.some(option => option.id === selected && option.selectionGroup === group)) : options;
          next.vehicles[id] = [...remaining, value];
        }
        break;
      }
      default: return s;
    }
    // Solo se liberan destinos que desaparecen: las demás elecciones no se redistribuyen.
    if (['support', 'moto', 'removeDiamond', 'sniper'].includes(action)) {
      const { units } = calculate(next);
      if (next.reconSwap && !units.some(u => u.id === next.reconSwap)) next.reconSwap = '';
      if (next.skis) next.skis = next.skis.filter(id => units.some(u => u.id === id));
      if (next.rifleSwaps) next.rifleSwaps = next.rifleSwaps.filter(key => units.some(u => u.figures.some(f => f.key === key)));
      const targets = new Set(units.flatMap(u => u.figures).filter(f => !f.fixed).map(f => f.key));
      next.assignments = Object.fromEntries(Object.entries(next.assignments).filter(([, target]) => targets.has(target)));
      if (next.transports) {
        const slots = new Set(units.flatMap(u => u.transportSlots).map(slot => slot.key));
        next.transports = Object.fromEntries(Object.entries(next.transports).filter(([key]) => slots.has(key)));
      }
    }
    // Se permite bajar el presupuesto y quitar compras aunque la lista ya esté excedida.
    const errors = validate(next).filter(e => !e.startsWith('Presupuesto excedido:'));
    if (errors.length) return s;
    const totals = calculate(next);
    if (action !== 'budget' && totals.stars > totals.budget && totals.stars > calculate(s).stars) return s;
    return next;
  }

  function weapons(v, options = []) {
    const replacement = v.options.find(o => o.replacesPrimary && options.includes(o.id));
    return [...(replacement ? replacement.weapons : v.weapons),
      ...v.options.filter(o => !o.replacesPrimary && options.includes(o.id)).flatMap(o => o.weapons)];
  }
  return { data: D, fresh, calculate, validate, change, available, purchasable, weapons, compatible, migrate, canSwapToRifle };
  }
  const api = { ...createEngine(britishData), createEngine };
  if (typeof module !== 'undefined') module.exports = api; else root.OOBDemo = api;
})(typeof window !== 'undefined' ? window : globalThis);
