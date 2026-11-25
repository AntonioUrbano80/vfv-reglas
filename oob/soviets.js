// Suplemento, pp. impresas 42–44, 46–47.
(function (root) {
  'use strict';
  const types = { C: 'commander_pistol', D: 'commander_smg', J: 'team_leader_rifle', W: 'team_leader_smg',
    R: 'rifleman', r: 'rifleman', U: 'smg', L: 'dp28', M: 'maxim', H: 'dshk', O: 'mortar',
    F: 'flamethrower', A: 'anti_tank_rifle', T: 'at_gun', S: 'sniper', P: 'commissar', '-': 'crew' };
  const team = (name, composition) => ({ name, figures: [...composition].map(code => ({
    type: types[code], fixed: code !== 'r',
    ...(code === 'r' ? { reinforcementOnly: 'rifle_reinforcement' } : {}),
  })) });
  const support = (id, name, cost, composition, limit = 1, group) => ({
    id, name, cost, limit, teams: [team(name, composition)],
    ...(group ? { selectionGroup: group, maxTotalGroup: limit } : {}),
  });
  const commissioner = support('su_commissar', 'Comisario político', 0, 'P');
  const second = { ...support('su_commissar_extra', 'Segundo comisario político', 'diamond', 'P'),
    requires: commissioner.id, forceOnly: true };
  const truck = { id: 'su_truck', name: 'Camión', cost: 0 };
  const car = { id: 'su_car', name: 'Automóvil', cost: 0 };
  const later = transport => ({ ...transport, fromYear: 1942 });
  const jeep = later({ id: 'su_jeep', name: 'Willys Jeep', cost: 0 });
  const scout = later({ id: 'su_scout', name: 'M3 Scout Car', cost: 2 });
  const halftrack = later({ id: 'su_halftrack', name: 'Semioruga M3', cost: 1 });
  const carriers = later({ id: 'su_carrier_pair', name: 'Dos Universal Bren Carrier', cost: 2, count: 2 });
  const squad = (n, left, right, transports) => ({
    id: 'su_group' + n, name: 'Grupo ' + n, cost: n > 2 ? 3 : 0, limit: 1,
    teams: [team('Equipo DP-28', left), team('Equipo de fusileros', right)],
    ...(transports ? { transportSlots: [transports] } : {}),
  });
  const hq = (commander, composition, transports) => ({
    id: 'su_hq', name: 'Grupo de mando', teams: [team('Comandante', commander),
      ...(composition ? [team('Equipo de mando', composition)] : [])],
    ...(transports ? { transportSlots: [transports] } : {}),
  });
  const coax = 'MMG coaxial · torreta', hull = 'MMG secundaria · casco', rear = 'MMG secundaria trasera · casco';
  const light = ['ATG ligero · torreta', coax], medium = ['ATG medio · torreta', coax];
  const open = ['Abierto'], recon = ['Reconocimiento'];
  const vehicles = [
    ['ba64-ba20', 'BA-64 / BA-20', 1, 1, 'ruedas', ['LMG · torreta'], [...open, ...recon]],
    ['ba10', 'BA-10', 4, 1, 'ruedas', [...light, hull], recon],
    ['t20', 'T-20 Komsomolets', 3, 1, 'orugas', ['MMG · casco'], [...recon, 'Transporte 6']],
    ['bt5', 'BT-5', 2, 1, 'orugas', light], ['bt7', 'BT-7', 4, 2, 'orugas', medium],
    ['t26', 'T-26', 3, 2, 'orugas', light],
    ['t40', 'T-40', 3, 2, 'orugas', ['HMG · torreta', coax]],
    ['t60', 'T-60', 3, 2, 'orugas', ['Cañón automático · torreta', coax], [], 1942],
    ['t70', 'T-70', 2, 2, 'orugas', light, [], 1942],
    ['t28', 'T-28', 5, 2, 'orugas', [...medium, hull, rear]],
    ['t34', 'T-34/76', 6, 3, 'orugas', [...medium, hull]],
    ['kv1', 'KV-1', 6, 3, 'orugas', [...medium, hull, rear]],
    ['kv2', 'KV-2', 8, 4, 'orugas', ['Obús pesado · torreta', coax, hull, rear]],
    ['su76', 'SU-76', 3, 2, 'orugas', ['Obús medio · casco'], open, 1942],
    ['truck', 'Camión de ruedas o semioruga', 0, 0, 'ruedas o semioruga', [], ['Transporte 10–25']],
    ['moto', 'Motocicleta / sidecar', 0, 0, 'motocicleta', [], [...recon, ...open, 'Dotación 2/3']],
  ];
  const base = {
    FIGURE_TYPES: Object.fromEntries(Object.entries({
      commander_pistol: 'Comandante', commander_smg: 'Comandante', team_leader_rifle: 'Jefe de equipo',
      team_leader_smg: 'Jefe de equipo', rifleman: 'Fusilero', smg: 'Subfusil', dp28: 'DP-28',
      maxim: 'Maxim', dshk: 'DShK', mortar: 'Mortero', flamethrower: 'Lanzallamas',
      anti_tank_rifle: 'PTRD-41', at_gun: 'Cañón anticarro', sniper: 'Francotirador', commissar: 'Comisario político', crew: 'Servidor',
    }).map(([id, name]) => [id, { name }])),
    MAX_REINFORCEMENT_PURCHASES: 4, MAX_SMG_REMOVALS: Infinity, SMG_TO_RIFLE: true, ELITE_COST: 3,
    REINFORCEMENT_OPTIONS: [{ id: 'rifle_reinforcement', name: 'Tres fusileros', cost: 1, figures: Array(3).fill('rifleman') }],
    DIVISIONAL_VEHICLES: vehicles.map(([id, name, cost, armor, movement, weapons, rules = [], fromYear = 1940]) => ({
      id: 'su_' + id, name, cost, armor, movement, weapons, rules, fromYear, options: [],
    })),
  };
  const common = [
    commissioner,
    support('su_mmg', 'Maxim', 1, 'M---r', 1, 'ametralladoras'),
    support('su_hmg', 'DShK de 12,7 mm', 1, 'H---r', 1, 'ametralladoras'),
    support('su_mortar_light', 'Mortero ligero', 1, 'O--r', 1, 'morteros'),
    support('fs_sniper', 'Francotirador', 'diamond', 'S-'),
  ];
  const mediumMortar = support('su_mortar_medium', 'Mortero medio', 2, 'O--r', 1, 'morteros');
  const atr = { ...support('su_atr', 'Equipo ATR PTRD-41', 'diamond', 'A-'), fromYear: 1941 };
  const foot = support('su_recon_foot', 'Reconocimiento a pie', 1, 'WRRr');
  const moto = { id: 'fs_recce_moto', name: 'Reconocimiento motociclista', cost: 1, limit: 1,
    hasOptionalModule: true, reconLmg: 'dp28', optionalModuleCost: 1,
    baseModule: { vehicles: 1, figures: team('', 'WLr').figures },
    optionalModule: { vehicles: 1, figures: team('', 'RR').figures, reinforcementSlots: team('', 'r').figures } };
  const infantry = {
    ...base, RECRUIT_FREE_SUPPORT: 'su_group3', SKIS: true,
    CORE_UNITS: [hq('C'), squad(1, 'WLRR', 'WRRRRrrr'), squad(2, 'WLRR', 'WRRRRrrr')],
    FIRE_SUPPORT: [
      squad(3, 'WLRR', 'JRRRrrrr'), { ...squad(4, 'WLRR', 'JRRRrrrr'), requires: 'su_group3' }, ...common, second, mediumMortar, atr,
      support('su_ft', 'Equipo lanzallamas', 1, 'F-'),
      support('su_45mm', 'ATG ligero de 45 mm', 1, 'T--r', 2, 'anticarros'),
      support('su_zis2', 'ATG medio ZiS-2', 3, 'T--r', 2, 'anticarros'),
      { ...moto, cost: 2, baseModule: { vehicles: 1, figures: team('', 'WLR').figures } }, foot,
    ],
  };
  const motorised = {
    ...base,
    CORE_UNITS: [
      hq('D', 'WL', [car, jeep, scout]),
      squad(1, 'WLRr', 'WURRr', [truck, halftrack, carriers]),
      squad(2, 'WLRr', 'WURRr', [truck, halftrack, carriers]),
    ],
    FIRE_SUPPORT: [squad(3, 'WLRr', 'WRRRr', [truck, halftrack, carriers]), ...common, second, mediumMortar, moto],
  };
  const airborne = {
    ...base, ANTI_TANK_ASSAULT_COST: 1,
    CORE_UNITS: [hq('D'), squad(1, 'WLRr', 'WRRRr'), squad(2, 'WLRr', 'WRRRr')],
    FIRE_SUPPORT: [squad(3, 'WLRr', 'WRRRr'), ...common, atr, { ...foot, limit: 2 }],
  };
  if (typeof module !== 'undefined') module.exports = { infantry, motorised, airborne };
  else root.VFVSoviets = { infantry, motorised, airborne };
})(typeof window !== 'undefined' ? window : globalThis);
