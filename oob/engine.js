/* Motor independiente: no accede al DOM, almacenamiento ni aplicación principal. */
(function (root) {
  'use strict';
  const D = typeof module !== 'undefined' ? require('./data.js') : OOB_DEMO_DATA;
  const available = item => (!item.fromYear || item.fromYear <= 1940) &&
    (!item.avail || item.avail.some(x => x === 'F40' || x === 'Todos'));
  const purchasable = v => available(v) && v.cost > 0;
  const fresh = () => ({ version: 2, budget: 15, purchases: [], assignments: {}, sniperReserve: [], support: {},
    motoModule: false, brenSwap: false, elite: false, removed: 0, smg: 0,
    sniperPayment: 'force', vehicles: {} });
  const rifle = f => ['rifleman', 'recce_rifleman'].includes(f.type);
  const compatible = (figure, slot) => !slot.fixed && (figure.type === 'anti_tank_rifle'
    ? slot.type === 'anti_tank_rifle'
    : slot.type !== 'anti_tank_rifle' && slot.reinforcementOnly === 'rifle_reinforcement');

  function migrate(saved) {
    if (!saved || saved.version !== 1) return saved;
    const next = { ...saved, version: 2, assignments: {}, sniperReserve: [] };
    if (next.support?.fs_sniper && next.sniperPayment === 'reinforcement' && Array.isArray(next.purchases)) {
      const p = next.purchases.indexOf('rifle_reinforcement');
      if (p >= 0) next.sniperReserve = [`${p}:0`, `${p}:1`];
    }
    return next;
  }

  function calculate(s) {
    const units = [];
    function addUnit(u, n, support) {
      const figures = (u.teams ? u.teams.flatMap(t => t.figures.map(f => ({ ...f, team: t.name }))) : u.baseModule.figures.map(f => ({ ...f, team: 'Vehículo 1' })))
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
      units.push({ id: `${u.id}:${n}`, name: figures[0].unit, figures });
    }
    D.CORE_UNITS.forEach(u => addUnit(u, 0, false));
    let stars = s.purchases.length + (s.elite ? 3 : 0), vehicles = 0;
    D.FIRE_SUPPORT.filter(f => f.type !== 'modifier').forEach(f => {
      const count = s.support[f.id] || 0;
      if (typeof f.cost === 'number') stars += f.cost * count;
      for (let n = 0; n < count; n++) addUnit(f, n, true);
      if (f.hasOptionalModule && count) {
        vehicles += f.baseModule.vehicles;
        if (s.motoModule) { stars += f.optionalModuleCost; vehicles += f.optionalModule.vehicles; }
      }
    });
    if (s.brenSwap && s.support.fs_recce_moto) stars--;
    const figures = units.flatMap(u => u.figures);
    const slots = figures.filter(f => !f.fixed);
    const pool = s.purchases.flatMap((id, purchase) => {
      const opt = D.REINFORCEMENT_OPTIONS.find(o => o.id === id);
      return opt.figures.map((type, index) => ({ type, purchase, index, key: `${purchase}:${index}`, option: id, status: 'unused' }));
    });
    const sniper = !!s.support.fs_sniper;
    const errors = [];
    if (sniper && s.sniperPayment === 'reinforcement') {
      const payment = pool.filter(f => s.sniperReserve.includes(f.key) && f.option === 'rifle_reinforcement');
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
    const removable = figures.filter(f => f.present && rifle(f) && !f.key.startsWith('fs_sniper:'))
      .sort((a, b) => Number(b.reinforcement) - Number(a.reinforcement));
    const removeCount = s.removed + (sniper && s.sniperPayment === 'force' ? 2 : 0);
    if (removable.length < removeCount) errors.push('No hay suficientes fusileros para pagar las retiradas.');
    removable.slice().reverse().slice(0, removeCount).forEach((f, i) => {
      f.present = false; f.removedFor = i < s.removed ? 'SMG' : '♦';
    });
    const convertible = figures.filter(f => f.present && (rifle(f) || f.type === 'team_leader_rifle' || f.type === 'recce_leader'));
    if (s.smg > s.removed * 2 || s.smg > convertible.length) errors.push('Las conversiones SMG exceden las permitidas.');
    convertible.slice(0, s.smg).forEach(f => { f.smg = true; });
    Object.entries(s.vehicles).forEach(([id, selection]) => {
      const v = D.DIVISIONAL_VEHICLES.find(x => x.id === id);
      stars += v.cost; vehicles++;
      v.options.forEach(o => { if (selection.includes(o.id)) stars += o.cost; });
    });
    if (stars > s.budget) errors.push(`Presupuesto excedido: ${stars}★ / ${s.budget}★.`);
    const active = figures.filter(f => f.present);
    return { stars, diamonds: sniper ? 1 : 0, minis: active.length, vehicles,
      core: active.filter(f => !f.support).length, fire: active.filter(f => f.support).length,
      reinforcements: active.filter(f => f.reinforcement).length,
      totalGrey: slots.length, usedGrey: slots.filter(f => f.present).length,
      free: slots.filter(f => !f.present).length,
      unused: pool.filter(f => f.status === 'unused').length, units, pool, errors };
  }

  function validate(s) {
    if (!s || s.version !== 2 || !Number.isInteger(s.budget) || s.budget < 0 || s.budget > 50 ||
        !s.assignments || typeof s.assignments !== 'object' || Array.isArray(s.assignments) ||
        Object.values(s.assignments).some(v => typeof v !== 'string') ||
        !Array.isArray(s.sniperReserve) || s.sniperReserve.some(v => typeof v !== 'string') ||
        new Set(s.sniperReserve).size !== s.sniperReserve.length ||
        !Array.isArray(s.purchases) || s.purchases.length > 4 ||
        s.purchases.some(id => !D.REINFORCEMENT_OPTIONS.some(o => o.id === id)) ||
        !s.support || typeof s.support !== 'object' || Array.isArray(s.support) ||
        !s.vehicles || typeof s.vehicles !== 'object' || Array.isArray(s.vehicles) ||
        !['force', 'reinforcement'].includes(s.sniperPayment) ||
        ['motoModule', 'brenSwap', 'elite'].some(k => typeof s[k] !== 'boolean') ||
        !Number.isInteger(s.removed) || s.removed < 0 || s.removed > 2 ||
        !Number.isInteger(s.smg) || s.smg < 0 || s.smg > 4) return ['Formato de lista inválido.'];
    for (const [id, count] of Object.entries(s.support)) {
      const f = D.FIRE_SUPPORT.find(x => x.id === id && x.type !== 'modifier');
      if (!f || !Number.isInteger(count) || count < 0 || count > f.limit || (count && !available(f)))
        return ['Apoyo inválido, fuera de límite o no disponible en Francia 1940.'];
    }
    if ((s.support.fs_2pdr || 0) + (s.support.fs_6pdr || 0) > 2) return ['Máximo dos cañones AT.'];
    if ((s.motoModule || s.brenSwap) && !s.support.fs_recce_moto) return ['La opción recce requiere la unidad base.'];
    if ((!s.support.fs_sniper || s.sniperPayment !== 'reinforcement') && s.sniperReserve.length)
      return ['Reserva de figuras sin francotirador.'];
    if (s.sniperReserve.length > 2) return ['El pago del francotirador requiere dos figuras.'];
    for (const [id, options] of Object.entries(s.vehicles)) {
      const v = D.DIVISIONAL_VEHICLES.find(x => x.id === id);
      if (!v || !purchasable(v) || !Array.isArray(options) || new Set(options).size !== options.length ||
          options.some(id => !v.options.some(o => o.id === id))) return ['Vehículo u opción no disponible.'];
    }
    return calculate(s).errors;
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
      case 'elite': next.elite = !next.elite; break;
      case 'removed': next.removed += Number(value); next.smg = Math.min(next.smg, next.removed * 2); break;
      case 'smg': next.smg += Number(value); break;
      case 'vehicle':
        if (Object.hasOwn(next.vehicles, id)) delete next.vehicles[id]; else next.vehicles[id] = [];
        break;
      case 'option': {
        if (!Object.hasOwn(next.vehicles, id)) return s;
        const options = next.vehicles[id];
        if (options.includes(value)) next.vehicles[id] = options.filter(x => x !== value); else options.push(value);
        break;
      }
      default: return s;
    }
    // Solo se liberan destinos que desaparecen: las demás elecciones no se redistribuyen.
    if (action === 'support' || action === 'moto') {
      const targets = new Set(calculate(next).units.flatMap(u => u.figures).filter(f => !f.fixed).map(f => f.key));
      next.assignments = Object.fromEntries(Object.entries(next.assignments).filter(([, target]) => targets.has(target)));
    }
    // Se permite bajar el presupuesto y quitar compras aunque la lista ya esté excedida.
    const errors = validate(next).filter(e => !e.startsWith('Presupuesto excedido:'));
    if (errors.length) return s;
    if (action !== 'budget' && calculate(next).stars > next.budget && calculate(next).stars > calculate(s).stars) return s;
    return next;
  }

  function weapons(v, options = []) {
    const replacement = v.options.find(o => o.replacesPrimary && options.includes(o.id));
    return [...(replacement ? replacement.weapons : v.weapons),
      ...v.options.filter(o => !o.replacesPrimary && options.includes(o.id)).flatMap(o => o.weapons)];
  }
  const api = { data: D, fresh, calculate, validate, change, available, purchasable, weapons, compatible, migrate };
  if (typeof module !== 'undefined') module.exports = api; else root.OOBDemo = api;
})(typeof window !== 'undefined' ? window : globalThis);
