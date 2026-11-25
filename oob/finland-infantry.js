// Suplemento, pp. impresas 54–55. El diagrama repite «Grupo 4» y el texto identifica el Grupo 3.
(function (root) {
  'use strict';
  const names = {
    commander_smg: 'Comandante con SMG', team_leader_smg: 'Jefe de equipo con SMG',
    team_leader_rifle: 'Jefe de equipo', rifleman: 'Fusilero', finnish_lmg: 'Lahti-Saloranta M/26',
    finnish_mmg: 'Maxim M/09-21', mortar: 'Mortero', sniper: 'Francotirador',
    at_gun: 'Cañón anticarro', anti_tank_rifle: 'Fusil anticarro L-39', flamethrower: 'Lanzallamas', crew: 'Servidor',
  };
  const types = { C: 'commander_smg', W: 'team_leader_smg', J: 'team_leader_rifle', R: 'rifleman',
    r: 'rifleman', L: 'finnish_lmg', M: 'finnish_mmg', O: 'mortar', S: 'sniper',
    T: 'at_gun', A: 'anti_tank_rifle', F: 'flamethrower', '-': 'crew' };
  const team = (name, composition) => ({ name, figures: [...composition].map(code => ({
    type: types[code], fixed: code !== 'r',
    ...(code === 'r' ? { reinforcementOnly: 'rifle_reinforcement' } : {}),
  })) });
  const squad = n => ({ id: 'fi_group' + n, name: 'Grupo ' + n, cost: n > 2 ? 3 : 0, limit: 1,
    teams: [team('Equipo LMG', 'WLRr'), team('Equipo de fusileros', 'JRRRr')] });
  const support = (id, name, cost, composition, limit = 1) => ({
    id, name, cost, limit, teams: [team(name, composition)],
  });
  const mortar = (id, name, cost) => ({ ...support(id, name, cost, 'O--r'),
    selectionGroup: 'morteros', maxTotalGroup: 1 });
  const coax = 'MMG coaxial · torreta', hull = 'MMG secundaria · casco', rear = 'MMG secundaria trasera · casco';
  const light = ['ATG ligero · torreta', coax], medium = ['ATG medio · torreta', coax];
  const vehicles = [
    ['bt5', 'BT-5', 2, 1, light], ['bt7', 'BT-7', 4, 2, medium], ['t26', 'T-26', 3, 2, light],
    ['t28', 'T-28', 5, 2, [...medium, hull, rear]],
    ['t34-76', 'T-34/76', 6, 3, [...medium, hull]],
    ['kv1', 'KV-1', 6, 3, [...medium, hull, rear]],
    ['panzer4-b-f', 'Panzer IV B–F', 5, 3, ['Obús ligero · torreta', coax, hull], 1942],
    ['stug3-a-e', 'StuG III A–E', 5, 4, ['Obús ligero · casco']],
    ['truck', 'Camión de ruedas u orugas', 0, 0, []],
  ];
  const data = {
    FIGURE_TYPES: Object.fromEntries(Object.entries(names).map(([id, name]) => [id, { name }])),
    RECRUIT_FREE_SUPPORT: 'fi_group3', ELITE_COST: 3, SKIS: true, SMG_TO_RIFLE: true,
    MAX_SMG_REMOVALS: 1, MAX_REINFORCEMENT_PURCHASES: 4,
    REINFORCEMENT_OPTIONS: [{ id: 'rifle_reinforcement', name: 'Tres fusileros', cost: 1, figures: Array(3).fill('rifleman') }],
    CORE_UNITS: [
      { id: 'fi_hq', name: 'Grupo de mando', teams: [team('Comandante', 'C'), team('Equipo de mando', 'WRRr')] },
      squad(1), squad(2),
    ],
    FIRE_SUPPORT: [
      squad(3), { ...squad(4), requires: 'fi_group3' }, support('fi_mmg', 'Maxim M/09-21', 1, 'M--r'),
      mortar('fi_mortar_light', 'Mortero ligero', 1), mortar('fi_mortar_medium', 'Mortero medio', 2),
      support('fi_atr', 'Equipo ATR L-39', 'diamond', 'A-'),
      support('fi_flamethrower', 'Equipo lanzallamas', 1, 'F-'),
      support('fs_sniper', 'Francotirador', 'diamond', 'S-'),
      support('fi_atg_37', 'ATG ligero de 37 mm', 1, 'T--rr', 2),
      support('fi_recce_foot', 'Reconocimiento a pie', 1, 'WRRr', 2),
    ],
    DIVISIONAL_VEHICLES: vehicles.map(([id, name, cost, armor, weapons, fromYear = 1940]) => ({
      id: 'fi_' + id, name, cost, armor, weapons, fromYear, toYear: 1943,
      movement: cost ? 'orugas' : 'ruedas u orugas', rules: cost ? [] : ['Transporte 10'], options: [],
    })),
  };
  if (typeof module !== 'undefined') module.exports = data;
  else root.VFVFinlandInfantry = data;
})(typeof window !== 'undefined' ? window : globalThis);
