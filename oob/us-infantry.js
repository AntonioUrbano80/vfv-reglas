// Suplemento, pp. impresas 56–59.
(function (root) {
  'use strict';
  const types = { C: 'commander_smg', J: 'team_leader_smg', R: 'rifleman', r: 'rifleman',
    B: 'bar', M: 'browning_mmg', H: 'browning_hmg', O: 'mortar', F: 'flamethrower',
    T: 'at_gun', S: 'sniper', '-': 'crew' };
  const team = (name, composition) => ({ name, figures: [...composition].map(code => ({
    type: types[code], fixed: code !== 'r',
    ...(code === 'r' ? { reinforcementOnly: 'rifle_reinforcement' } : {}),
  })) });
  const support = (id, name, cost, composition, limit = 1, group) => ({
    id, name, cost, limit, teams: [team(name, composition)],
    ...(group ? { selectionGroup: group, maxTotalGroup: 1 } : {}),
  });
  const halfTrack = { id: 'us_half-track', name: 'Semioruga M3', cost: 0 };
  const truck = { id: 'us_truck', name: 'Camión', cost: 0 };
  const jeep = { id: 'us_jeep', name: 'Willys Jeep', cost: 0 };
  const scout = { id: 'us_m3-scout', name: 'M3 Scout Car', cost: 0 };
  const squad = (n, mechanised) => ({
    id: 'us_group' + n, name: 'Grupo ' + n, cost: n > 1 ? 3 : 0, limit: 1,
    teams: [team(mechanised ? 'Equipo 1' : 'Equipo BAR', mechanised ? 'JRRRrr' : 'JBRR'),
      team('Equipo de fusileros', mechanised ? 'JRRRrr' : 'JRRRrrrr')],
    ...(mechanised ? { transportSlots: [[halfTrack, truck]] } : {}),
  });
  const headquarters = mechanised => ({
    id: 'us_hq', name: 'Grupo de mando',
    teams: [team('Comandante', 'C'), team('Equipo de mando', mechanised ? 'JRRRr' : 'JRRr'),
      ...(mechanised ? [team('Segundo equipo de mando', 'JRRRrr')] : [])],
    ...(mechanised ? { transportSlots: [[halfTrack, truck]] } : {}),
  });
  const commonSupports = [
    support('us_mmg', 'Browning M1919', 1, 'M--rr', 1, 'ametralladoras'),
    support('us_hmg', 'Browning M2', 1, 'H--rr', 1, 'ametralladoras'),
    support('us_mortar_light', 'Mortero ligero', 1, 'O--r', 1, 'morteros'),
    support('us_mortar_medium', 'Mortero medio', 2, 'O--r', 1, 'morteros'),
    support('us_ft', 'Equipo lanzallamas', 1, 'F-'),
    support('fs_sniper', 'Francotirador', 'diamond', 'S-'),
  ];
  const open = ['Abierto'], recon = ['Reconocimiento', ...open], hmg = 'HMG · exterior';
  const hull = 'MMG secundaria · casco', coax = 'MMG coaxial · torreta';
  const light = ['ATG ligero · torreta', coax], medium = ['ATG medio · torreta', coax];
  const vehicles = [
    ['m3-scout', scout.name, 2, 1, 'ruedas', [hmg], [...recon, 'Transporte 6'], 1942],
    ['m20-scout', 'M20 Scout Car', 2, 1, 'ruedas', [hmg], recon, 1943],
    ['m8-greyhound', 'M8 Greyhound', 2, 1, 'ruedas', light, recon, 1943, true],
    ['stuart', 'M3/M5 Stuart', 5, 2, 'orugas', [...light, hull], ['Reconocimiento'], 1942],
    ['m8-scott', 'M8 Scott', 2, 2, 'orugas', ['Obús ligero · torreta'], open, 1943, true],
    ['grant', 'M3 Grant', 6, 3, 'orugas', [...medium, 'Obús medio secundario · casco'], [], 1942],
    ['sherman', 'M4 Sherman', 6, 3, 'orugas', [...medium, hull], [], 1943],
    ['wolverine', 'M10 Wolverine', 4, 2, 'orugas', ['ATG pesado · torreta'], open, 1943, true],
    ['priest', 'M7 Priest', 4, 2, 'orugas', ['Obús pesado · casco'], open, 1943, true],
    ['m3-75', 'M3 75 mm', 2, 1, 'semioruga', ['ATG medio · exterior frontal'], open, 1942, true],
    ['half-track', halfTrack.name, 1, 1, 'semioruga', ['MMG · exterior'], [...open, 'Transporte 12'], 1942],
    ['jeep', jeep.name, 0, 0, 'ruedas', [], [...recon, 'Transporte 4'], 1942],
    ['truck', truck.name, 0, 0, 'ruedas', [], [...open, 'Transporte 10'], 1942],
  ];
  const common = {
    FIGURE_TYPES: Object.fromEntries(Object.entries({
      commander_smg: 'Comandante', team_leader_smg: 'Jefe de equipo', rifleman: 'Fusilero',
      bar: 'BAR', browning_mmg: 'Browning M1919', browning_hmg: 'Browning M2',
      mortar: 'Mortero', flamethrower: 'Lanzallamas', at_gun: 'Cañón anticarro', sniper: 'Francotirador', crew: 'Servidor',
    }).map(([id, name]) => [id, { name }])),
    RECRUIT_FREE_SUPPORT: 'us_group3', MAX_SMG_REMOVALS: Infinity, SMG_TO_RIFLE: true,
    MAX_REINFORCEMENT_PURCHASES: 4,
    REINFORCEMENT_OPTIONS: [{ id: 'rifle_reinforcement', name: 'Tres fusileros', cost: 1, figures: Array(3).fill('rifleman') }],
    DIVISIONAL_VEHICLES: vehicles.map(([id, name, cost, armor, movement, weapons, rules, fromYear, hasHmg]) => ({
      id: 'us_' + id, name, cost, armor, movement, weapons, rules, fromYear, toYear: 1943,
      options: hasHmg ? [{ id: 'hmg', name: 'HMG secundaria exterior', cost: 1, weapons: ['HMG secundaria · exterior'] }] :
        id === 'jeep' ? ['LMG', 'MMG'].map(weapon => ({ id: weapon.toLowerCase(), name: weapon + ' exterior',
          cost: 1, weapons: [weapon + ' · exterior'], selectionGroup: 'primary' })) : [],
    })),
  };
  const infantry = {
    ...common, DIVISIONAL_BONUS: 1,
    CORE_UNITS: [headquarters(false), squad(1, false), { ...squad(2, false), cost: 0 }],
    FIRE_SUPPORT: [
      squad(3, false), ...commonSupports, support('us_atg_57', 'ATG ligero M1 de 57 mm', 1, 'T--r', 2),
      support('us_recon_foot', 'Reconocimiento a pie', 1, 'JRRr', 2),
      { ...support('us_recon_jeep', 'Reconocimiento en Jeep', 1, 'JRRr'), transportSlots: [[jeep]] },
    ],
  };
  const mechanised = {
    ...common,
    CORE_UNITS: [headquarters(true), squad(1, true)],
    FIRE_SUPPORT: [
      squad(2, true), { ...squad(3, true), requires: 'us_group2' }, ...commonSupports,
      { ...support('us_recon_scout', 'Reconocimiento motorizado', 2, 'JRrr'), transportSlots: [[scout, { ...jeep, cost: -1 }]] },
    ],
  };
  if (typeof module !== 'undefined') module.exports = { infantry, mechanised };
  else root.VFVUSInfantry = { infantry, mechanised };
})(typeof window !== 'undefined' ? window : globalThis);
