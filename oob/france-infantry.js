// Transcripción de la infantería francesa, suplemento p. impresa 6 (PDF p. 5).
(function (root) {
'use strict';
const types = {
  C: 'commander_pistol', J: 'team_leader_rifle', R: 'rifleman', K: 'vb1940',
  L: 'french_lmg', M: 'hotchkiss_mmg', O: 'mortar', A: 'anti_tank_rifle',
  T: 'at_gun', S: 'sniper', '-': 'crew', r: 'rifleman', l: 'french_lmg',
};
function team(name, composition) {
  return { name, figures: [...composition].map(code => ({
    type: types[code], fixed: !['r', 'l'].includes(code),
    ...(code === 'r' ? { reinforcementOnly: 'rifle_reinforcement' } : {}),
    ...(code === 'l' ? { reinforcementOnly: 'lmg_reinforcement' } : {}),
  })) };
}
const squad = (id, name, cost, lmg, grenade = 'JKRRrr') => ({ id, name, cost, limit: 1,
  teams: [team('Equipo FM 24/29 o Chauchat', lmg), team('Equipo lanzagranadas VB 1940', grenade)] });
const support = (id, name, cost, limit, composition, group) => ({ id, name, cost, limit,
  teams: [team(name, composition)], ...(group ? { selectionGroup: group, maxTotalGroup: 1 } : {}) });

const infantry = {
  RECRUIT_FREE_SUPPORT: 'fr_group3',
  DIVISIONAL_VEHICLES: typeof module !== 'undefined' ? require('./france-divisional') : root.VFVFranceDivisional,
  FIGURE_TYPES: Object.fromEntries(Object.entries({
    commander_pistol: 'Comandante', team_leader_rifle: 'Jefe de equipo', rifleman: 'Fusilero',
    vb1940: 'Lanzagranadas VB 1940', french_lmg: 'FM 24/29 o Chauchat', hotchkiss_mmg: 'Hotchkiss 1914',
    mortar: 'Mortero', anti_tank_rifle: 'Fusil anticarro', at_gun: 'Cañón anticarro',
    sniper: 'Francotirador', crew: 'Servidor',
  }).map(([id, name]) => [id, { name }])),
  CORE_UNITS: [
    { id: 'fr_hq', name: 'Grupo de mando', teams: [team('Comandante', 'C'), team('Equipo de mando', 'JKRr')] },
    squad('fr_group1', 'Grupo 1', 0, 'JLRRrr'),
    squad('fr_group2', 'Grupo 2', 0, 'JLRRrr'),
  ],
  MAX_REINFORCEMENT_PURCHASES: 4,
  REINFORCEMENT_OPTIONS: [{ id: 'rifle_reinforcement', name: 'Tres fusileros', cost: 1,
    figures: ['rifleman', 'rifleman', 'rifleman'] }],
  FIRE_SUPPORT: [
    squad('fr_group3', 'Grupo 3', 3, 'JLRrrr'),
    support('fr_mmg', 'Hotchkiss 1914', 1, 1, 'M--r'),
    support('fr_mortar_light', 'Mortero ligero', 1, 1, 'O--r', 'morteros'),
    support('fr_mortar_medium', 'Mortero medio', 2, 1, 'O--r', 'morteros'),
    support('fr_atr', 'Equipo ATR', 'diamond', 1, 'A-'),
    support('fs_sniper', 'Francotirador', 'diamond', 1, 'S-'),
    support('fr_atg_25', 'ATG ultraligero de 25 mm', 'diamond', 2, 'T---r'),
    support('fr_atg_47', 'ATG ligero de 47 mm', 1, 1, 'T---r'),
    support('fr_recce_foot', 'Equipo de reconocimiento a pie', 1, 2, 'JRRr'),
    { id: 'fs_recce_moto', name: 'Reconocimiento motociclista', cost: 1, limit: 1, hasOptionalModule: true, reconLmg: 'french_lmg',
      optionalModuleCost: 1, baseModule: { vehicles: 1, figures: team('', 'JLr').figures },
      optionalModule: { vehicles: 1, figures: team('', 'RR').figures, reinforcementSlots: team('', 'r').figures } },
  ],
};

const truck = [{ id: 'fr_truck', name: 'Camión', cost: 0 }];
const dragoonTransports = [...truck,
  { id: 'fr_tracked-transport', name: 'Semioruga', cost: 0 },
  { id: 'fr_lorraine-38l', name: 'Lorraine 38L', cost: 1 },
];
function mechanised({ headquarters, lmg, supportLmg, grenade, transports, perSquad }) {
  const withTransports = (unit, count) => ({ ...unit,
    transportSlots: Array.from({ length: count }, () => transports) });
  return {
    CORE_UNITS: [
      withTransports({ ...infantry.CORE_UNITS[0], teams: [team('Comandante', 'C'), team('Equipo de mando', headquarters)] }, 1),
      ...[1, 2].map(i => withTransports(squad('fr_group' + i, 'Grupo ' + i, 0, lmg, grenade), perSquad)),
    ],
    thirdSquad: withTransports(squad('fr_group3', 'Grupo 3', 3, supportLmg, grenade), perSquad),
  };
}
const dragoons = mechanised({ headquarters: 'JKRRrrr', lmg: 'JLRrrrr', supportLmg: 'JLRrrrr',
  grenade: 'JlKRRrr', transports: dragoonTransports, perSquad: 2 });
const motorised = mechanised({ headquarters: 'JKRr', lmg: 'JLRRr', supportLmg: 'JLRrr',
  grenade: 'JKRRr', transports: truck, perSquad: 1 });
const supports = ids => ids.map(id => infantry.FIRE_SUPPORT.find(option => option.id === id));
const commonSupports = ['fr_mmg', 'fr_mortar_light', 'fr_mortar_medium', 'fr_atr', 'fs_sniper', 'fs_recce_moto'];

const mountedDragoons = {
  ...infantry, RECRUIT_FREE_SUPPORT: null, ELITE_COST: 3, CORE_UNITS: dragoons.CORE_UNITS,
  REINFORCEMENT_OPTIONS: [...infantry.REINFORCEMENT_OPTIONS,
    { id: 'lmg_reinforcement', name: 'FM 24/29 o Chauchat', cost: 1, figures: ['french_lmg'] }],
  FIRE_SUPPORT: [dragoons.thirdSquad, ...supports(commonSupports)],
};
const motorisedInfantry = {
  ...infantry, CORE_UNITS: motorised.CORE_UNITS,
  FIRE_SUPPORT: [motorised.thirdSquad, ...supports([...commonSupports, 'fr_atg_25']),
    { ...supports(['fr_atg_47'])[0], limit: 2 },
    { ...support('fr_recce_car', 'Reconocimiento en automóvil', 1, 1, 'JLrr'), reconLmg: 'french_lmg', transportSlots: [[
      { id: 'fr_car', name: 'Automóvil', cost: 0 },
    ]] },
  ],
};
const data = { ...infantry, mountedDragoons, motorisedInfantry,
  colonial: { ...infantry, FIRST_DIVISIONAL_SURCHARGE: 1 } };
if (typeof module !== 'undefined') module.exports = data;
else root.VFVFranceInfantry = data;
})(typeof window !== 'undefined' ? window : globalThis);
