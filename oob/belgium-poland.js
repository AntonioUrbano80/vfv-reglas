// Suplemento, pp. impresas 50–51. Costes del T-13 y T-15 corregidos por la FAQ.
(function (root) {
  'use strict';
  const names = {
    commander_pistol: 'Comandante', team_leader_rifle: 'Jefe de equipo',
    rifleman: 'Fusilero', belgian_bar: 'FN Modelo 1930', belgian_mmg: 'Hotchkiss 1914 o Colt-Browning M1895/14',
    mortar: 'Mortero', sniper: 'Francotirador', at_gun: 'Cañón anticarro', crew: 'Servidor',
    polish_bar: 'Rkm wz. 1928', team_leader_smg: 'Jefe de equipo con SMG', anti_tank_rifle: 'Fusil anticarro',
    hotchkiss_mmg: 'Hotchkiss 1914',
  };
  const types = { C: 'commander_pistol', J: 'team_leader_rifle', R: 'rifleman', r: 'rifleman',
    B: 'belgian_bar', M: 'belgian_mmg', O: 'mortar', S: 'sniper', T: 'at_gun', '-': 'crew',
    P: 'polish_bar', W: 'team_leader_smg', A: 'anti_tank_rifle', H: 'hotchkiss_mmg' };
  const team = (name, composition) => ({ name, figures: [...composition].map(code => ({
    type: types[code], fixed: code !== 'r',
    ...(code === 'r' ? { reinforcementOnly: 'rifle_reinforcement' } : {}),
  })) });
  const squad = n => ({ id: 'be_group' + n, name: 'Grupo ' + n, cost: n > 2 ? 3 : 0, limit: 1,
    teams: [team('Equipo BAR', 'JBRRr'), team('Equipo de fusileros', 'JRRRR')] });
  const support = (id, name, cost, composition, limit = 1) => ({
    id, name, cost, limit, teams: [team(name, composition)],
  });
  const mortar = (id, name, cost) => ({ ...support(id, name, cost, 'O--r'),
    selectionGroup: 'morteros', maxTotalGroup: 1 });
  const coax = 'MMG coaxial · torreta';
  const light = 'ATG ligero · torreta';
  const vehicles = [
    ['t13', 'T-13', 2, 1, 'orugas', [light, coax]],
    ['t15', 'T-15', 2, 1, 'orugas', [light, coax]],
    ['carden-loyd', 'Carden-Loyd Mark VI', 1, 1, 'orugas', [light], ['Abierto']],
    ['acg1', 'ACG-1', 3, 1, 'orugas', ['ATG medio · torreta', coax]],
    ['truck', 'Camión', 0, 0, 'ruedas', [], ['Abierto', 'Transporte 12']],
    ['car', 'Automóvil', 0, 0, 'ruedas', [], ['Abierto', 'Transporte 4']],
    ['motorbike', 'Motocicleta / sidecar', 0, 0, 'motocicleta', [], ['Reconocimiento', 'Abierto', 'Dotación 2/3']],
  ];
  const belgium = {
    FIGURE_TYPES: Object.fromEntries(Object.entries(names).map(([id, name]) => [id, { name }])),
    RECRUIT_FREE_SUPPORT: 'be_group3', MAX_SMG_REMOVALS: 1, MAX_REINFORCEMENT_PURCHASES: 4,
    REINFORCEMENT_OPTIONS: [{ id: 'rifle_reinforcement', name: 'Tres fusileros', cost: 1, figures: Array(3).fill('rifleman') }],
    CORE_UNITS: [
      { id: 'be_hq', name: 'Grupo de mando', teams: [team('Comandante', 'C'), team('Equipo de mando', 'JRRRr')] },
      squad(1), squad(2),
    ],
    FIRE_SUPPORT: [
      squad(3), { ...squad(4), requires: 'be_group3' }, support('be_mmg', names.belgian_mmg, 1, 'M--r'),
      mortar('be_mortar_light', 'Mortero ligero', 1), mortar('be_mortar_medium', 'Mortero medio', 2),
      support('fs_sniper', 'Francotirador', 'diamond', 'S-'), support('be_atg_47', 'ATG ligero de 47 mm', 1, 'T---r', 2),
      support('be_recce_foot', 'Reconocimiento a pie', 1, 'JRRr'),
      { id: 'fs_recce_moto', name: 'Reconocimiento motociclista', cost: 1, limit: 1,
        hasOptionalModule: true, reconLmg: 'belgian_bar', optionalModuleCost: 1,
        baseModule: { vehicles: 1, figures: team('', 'JBr').figures },
        optionalModule: { vehicles: 1, figures: team('', 'RR').figures, reinforcementSlots: team('', 'r').figures } },
    ],
    DIVISIONAL_VEHICLES: vehicles.map(([id, name, cost, armor, movement, weapons, rules = []]) => ({
      id: 'be_' + id, name, cost, armor, movement, weapons, rules, options: [],
    })),
  };
  const polishSquad = n => ({ id: 'pl_group' + n, name: 'Grupo ' + n, cost: n === 3 ? 3 : 0, limit: 1,
    teams: [team('Equipo BAR', 'WPRR'), team('Equipo de fusileros', n === 3 ? 'JRRRRrrr' : 'JRRRRrr')] });
  const polishVehicles = [
    ['tks', 'TKS', 2, 1, 'orugas', ['Cañón automático · casco']],
    ['7tp-jw', '7TP jw', 2, 1, 'orugas', [light, coax]],
    ['7tp-dw', '7TP dw', 3, 1, 'orugas', ['MMG · torreta', 'MMG secundaria · torreta']],
    ['vickers-e', 'Vickers Mk E tipo B', 2, 1, 'orugas', [light, coax]],
    ['wz34', 'Wz. 34', 3, 1, 'ruedas', ['Cañón automático · torreta', coax], ['Reconocimiento']],
    ...vehicles.filter(vehicle => vehicle[2] === 0),
  ];
  const polishMoto = belgium.FIRE_SUPPORT.find(unit => unit.id === 'fs_recce_moto');
  const poland = {
    ...belgium, RECRUIT_FREE_SUPPORT: 'pl_group3',
    CORE_UNITS: [
      { id: 'pl_hq', name: 'Grupo de mando',
        teams: [team('Comandante', 'C'), team('Equipo de mando', 'JR'), team('Equipo ATR', 'A-')] },
      polishSquad(1), polishSquad(2),
    ],
    FIRE_SUPPORT: [
      polishSquad(3), support('pl_mmg', 'Hotchkiss 1914', 1, 'H--r'),
      mortar('pl_mortar_light', 'Mortero ligero', 1), mortar('pl_mortar_medium', 'Mortero medio', 2),
      support('fs_sniper', 'Francotirador', 'diamond', 'S-'), support('pl_atg_37', 'ATG ligero de 37 mm', 1, 'T---r', 2),
      support('pl_recce_foot', 'Reconocimiento a pie', 1, 'JRRr', 2),
      { ...polishMoto, reconLmg: 'polish_bar', baseModule: { vehicles: 1, figures: team('', 'JPr').figures } },
    ],
    DIVISIONAL_VEHICLES: polishVehicles.map(([id, name, cost, armor, movement, weapons, rules = []]) => ({
      id: 'pl_' + id, name, cost, armor, movement, weapons, rules, options: [],
    })),
  };
  if (typeof module !== 'undefined') module.exports = { belgium, poland };
  else root.VFVBelgiumPoland = { belgium, poland };
})(typeof window !== 'undefined' ? window : globalThis);
