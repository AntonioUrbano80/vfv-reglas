// Suplemento, pp. impresas 24–26 y 28–29.
(function (root) {
  'use strict';
  const types = { C: 'commander_pistol', D: 'commander_smg', J: 'team_leader_rifle', W: 'team_leader_smg',
    R: 'rifleman', r: 'rifleman', L: 'breda_lmg', l: 'breda_lmg', M: 'breda_mmg', O: 'mortar',
    A: 'anti_tank_rifle', F: 'flamethrower', T: 'at_gun', N: 'autocannon', S: 'sniper', '-': 'crew' };
  const team = (name, composition) => ({ name, figures: [...composition].map(code => ({
    type: types[code], fixed: !['r', 'l'].includes(code),
    ...(code === 'r' ? { reinforcementOnly: 'rifle_reinforcement' } : {}),
    ...(code === 'l' ? { reinforcementOnly: 'lmg_reinforcement' } : {}),
  })) });
  const support = (id, name, cost, composition, limit = 1, group) => ({
    id, name, cost, limit, teams: [team(name, composition)],
    ...(group ? { selectionGroup: group, maxTotalGroup: 1 } : {}),
  });
  const car = { id: 'it_car', name: 'Automóvil de mando', cost: 0 };
  const armedCar = { id: 'it_car_mmg', name: 'Automóvil con MMG', cost: 1 };
  const truck = { id: 'it_truck', name: 'Camión', cost: 0 };
  const squad = (n, left, right, transports) => ({
    id: 'it_group' + n, name: 'Grupo ' + n, cost: n > 2 ? 3 : 0, limit: 1,
    teams: [team('Equipo 1', left), team('Equipo 2', right)], ...(transports ? { transportSlots: [transports] } : {}),
  });
  const hq = (commander, composition, transports) => ({ id: 'it_hq', name: 'Grupo de mando',
    teams: [team('Comandante', commander), team('Equipo de mando', composition)],
    ...(transports ? { transportSlots: [transports] } : {}) });
  const recon = ['Reconocimiento'], open = ['Abierto'], openRecon = [...recon, ...open];
  const coax = 'MMG coaxial · torreta', twin = 'MMG gemelas · torreta', auto = 'Cañón automático · torreta';
  const rear = { id: 'rear', name: 'MMG secundaria trasera', cost: 1, weapons: ['MMG trasera · exterior'] };
  const vehicles = [
    ['ab40', 'Autoblinda AB40', 3, 1, 'ruedas', [twin], recon],
    ['ab41', 'Autoblinda AB41', 3, 1, 'ruedas', [auto, coax], recon],
    ['l3-35', 'L3/35', 3, 1, 'orugas', ['MMG gemelas · casco'], recon],
    ['lancia', 'Lancia 1ZM', 3, 1, 'ruedas', [twin, 'MMG secundaria trasera · exterior'], recon],
    ['l6-40', 'Fiat L6/40', 3, 2, 'orugas', [auto, coax]],
    ['m11-39', 'Fiat M11/39', 3, 2, 'orugas', ['ATG ligero · casco', 'MMG gemelas secundarias · torreta']],
    ['m14-41', 'Fiat M14/41', 4, 2, 'orugas', ['ATG ligero · torreta', coax, 'MMG gemelas secundarias · casco']],
    ['l40', 'Semovente L.40', 3, 2, 'orugas', ['ATG ligero · casco']],
    ['90-53', 'Semovente da 90/53', 5, 1, 'orugas', ['ATG extrapesado · casco'], open],
    ['75-18', 'Semovente 75/18', 3, 2, 'orugas', ['Obús medio · casco'], open],
    ['as37', 'Autoblinda AS37', 0, 1, 'ruedas', [], [...open, 'Transporte 10']],
    ['as42-mmg', 'AS/42 con MMG', 1, 0, 'ruedas', ['MMG frontal · exterior'], openRecon, [rear]],
    ['as42-atg', 'AS/42 con ATG ultraligero', 1, 0, 'ruedas', ['ATG ultraligero · torreta'], openRecon, [rear]],
    ['as42-auto', 'AS/42 con cañón automático', 1, 0, 'ruedas', [auto], openRecon, [rear]],
    ['truck', truck.name, 0, 0, 'ruedas', [], [...open, 'Transporte 15']],
    ['car', 'Automóvil', 0, 0, 'ruedas', [], [...open, 'Transporte 4'],
      [{ id: 'mmg', name: 'MMG exterior', cost: 1, weapons: ['MMG · exterior'] }]],
    ['moto', 'Motocicleta / sidecar', 0, 0, 'motocicleta', [], [...openRecon, 'Dotación 2/3']],
  ];
  const rifle = { id: 'rifle_reinforcement', name: 'Tres fusileros', cost: 1, figures: Array(3).fill('rifleman') };
  const common = {
    FIGURE_TYPES: Object.fromEntries(Object.entries({
      commander_pistol: 'Comandante', commander_smg: 'Comandante', team_leader_rifle: 'Jefe de equipo',
      team_leader_smg: 'Jefe de equipo', rifleman: 'Fusilero', breda_lmg: 'Breda M1930', breda_mmg: 'Breda M1937',
      mortar: 'Mortero', anti_tank_rifle: 'Fusil anticarro', flamethrower: 'Lanzallamas',
      at_gun: 'Cañón anticarro', autocannon: 'Breda de 20 mm', sniper: 'Francotirador', crew: 'Servidor',
    }).map(([id, name]) => [id, { name }])),
    MAX_REINFORCEMENT_PURCHASES: 4, REINFORCEMENT_OPTIONS: [rifle],
    DIVISIONAL_VEHICLES: vehicles.map(([id, name, cost, armor, movement, weapons, rules = [], options = []]) => ({
      id: 'it_' + id, name, cost, armor, movement, weapons, rules, options,
    })),
  };
  const standard = [
    support('it_mmg', 'Breda M1937', 1, 'M--r'),
    support('it_mortar_light', 'Mortero ligero', 1, 'O--r', 1, 'morteros'),
    support('it_mortar_medium', 'Mortero medio', 2, 'O--r', 1, 'morteros'),
    support('fs_sniper', 'Francotirador', 'diamond', 'S-'),
  ];
  const atr = support('it_atr', 'Equipo ATR', 'diamond', 'A-');
  const fire = [
    support('it_ft', 'Equipo lanzallamas', 1, 'F-'),
    support('it_atg', 'ATG ligero Elefantino de 47 mm', 1, 'T---r', 2),
    support('it_auto', 'Cañón automático Breda de 20 mm', 'diamond', 'N--r'),
  ];
  const moto = { id: 'fs_recce_moto', name: 'Reconocimiento motociclista', cost: 1, limit: 1,
    hasOptionalModule: true, reconLmg: 'breda_lmg', optionalModuleCost: 1,
    baseModule: { vehicles: 1, figures: team('', 'WLr').figures },
    optionalModule: { vehicles: 1, figures: team('', 'RR').figures, reinforcementSlots: team('', 'r').figures } };
  const foot = support('it_recce_foot', 'Reconocimiento a pie', 1, 'WRRr', 2);
  const infantry = {
    ...common, RECRUIT_FREE_SUPPORT: 'it_group3',
    CORE_UNITS: [hq('C', 'JRRRr'), ...[1, 2].map(n => squad(n, 'JLRr', 'JRRRrr'))],
    FIRE_SUPPORT: [squad(3, 'JRRRRr', 'JRRRR'), { ...squad(4, 'JRRRRr', 'JRRRR'), requires: 'it_group3' }, ...standard, atr, ...fire, moto, foot],
  };
  const bersaglieri = {
    ...common, ELITE_COST: 3, ELITE_DISCOUNT: 1,
    CORE_UNITS: [hq('C', 'J', [car, armedCar]), ...[1, 2].map(n => squad(n, 'WLRR', 'WRRRrr', [truck]))],
    FIRE_SUPPORT: [
      ...[1, 2].map(n => support('it_extra' + n, 'Tercer equipo del Grupo ' + n, 1, 'JLRr')),
      squad(3, 'WRRRRr', 'WRRRR', [truck]), { ...atr, limit: 2, requires: 'it_group3' },
      ...standard, ...fire, moto,
      { ...support('it_recce_car', 'Reconocimiento en automóvil', 1, 'WLrr'),
        reconLmg: 'breda_lmg', transportSlots: [[car, armedCar]] },
    ],
  };
  const airborne = {
    ...common, ELITE_COST: 3, ELITE_DISCOUNT: 1,
    REINFORCEMENT_OPTIONS: [rifle, { id: 'lmg_reinforcement', name: 'Breda M1930', cost: 1, figures: ['breda_lmg'] }],
    CORE_UNITS: [hq('D', 'WRR'), ...[1, 2].map(n => squad(n, 'WLRR', 'WlRR'))],
    FIRE_SUPPORT: [squad(3, 'WLRR', 'WlRR'), ...standard, atr, foot],
  };
  if (typeof module !== 'undefined') module.exports = { infantry, bersaglieri, airborne };
  else root.VFVItaly = { infantry, bersaglieri, airborne };
})(typeof window !== 'undefined' ? window : globalThis);
