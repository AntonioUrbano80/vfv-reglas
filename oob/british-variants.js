// Suplemento, pp. impresas 33, 35–38.
(function (root) {
  'use strict';
  const base = typeof module !== 'undefined' ? require('./data.js') : OOB_DEMO_DATA;
  const types = { C: 'commander_pistol', D: 'commander_smg', W: 'team_leader_smg',
    U: 'smg', J: 'team_leader_rifle', R: 'rifleman', r: 'rifleman', L: 'bren_lmg',
    K: 'light_mortar', a: 'anti_tank_rifle' };
  const team = (name, composition) => ({ name, figures: [...composition].map(code => ({
    type: types[code], fixed: !['r', 'a'].includes(code),
    ...(code === 'r' ? { reinforcementOnly: 'rifle_reinforcement' } : {}),
    ...(code === 'a' ? { reinforcementOnly: 'at_rifle_reinforcement' } : {}),
  })) });
  const support = id => base.FIRE_SUPPORT.find(option => option.id === id);
  const truck = { id: 'ds_truck', name: 'Camión', cost: 0 };
  const brens = { id: 'ds_bren_pair', name: 'Dos Universal Bren Carrier', cost: 2, count: 2 };
  const carriers = [[truck, brens]];
  const motorisedSquad = n => ({
    id: 'uk_moto_group' + n, name: 'Grupo ' + n, cost: n === 3 ? 3 : 0, limit: 1,
    teams: [team('Equipo Bren', n === 3 ? 'JLRr' : 'JLRR'), team('Equipo de fusileros', 'JRRRrrr')],
    transportSlots: carriers,
  });
  const motorised = {
    ...base, KM_TO_RIFLE: true, ELITE_COST: 3,
    CORE_UNITS: [
      { id: 'uk_moto_hq', name: 'Grupo de mando', transportSlots: carriers,
        teams: [team('Comandante', 'C'), team('Equipo de mando', 'JRKrr'), team('Equipo ATR', 'ar')] },
      motorisedSquad(1), motorisedSquad(2),
    ],
    FIRE_SUPPORT: [
      motorisedSquad(3), ...['fs_vickers', 'fs_mortar', 'fs_sniper', 'fs_2pdr', 'fs_6pdr'].map(support),
      { id: 'uk_recon_carrier', name: 'Reconocimiento en Universal Carrier', cost: 2, limit: 1,
        reconLmg: 'bren_lmg', teams: [team('Reconocimiento', 'WLrr')],
        transportSlots: [[{ id: 'ds_bren', name: 'Universal Bren Carrier', cost: 0 }]] },
      { ...support('fs_recce_moto'), reconLmg: 'recce_bren' },
    ],
  };
  const transportChoices = [
    { id: 'none', name: 'Sin vehículo', cost: 0, count: 0 },
    { id: 'lrdg-mmg', name: 'LRDG · MMG frontal', cost: 1 },
    { id: 'lrdg-hmg', name: 'LRDG · HMG frontal', cost: 1 },
    { id: 'lrdg-mmg-rear', name: 'LRDG · MMG frontal y trasera', cost: 3 },
    { id: 'lrdg-hmg-rear', name: 'LRDG · HMG frontal y MMG trasera', cost: 3 },
    { id: 'jeep', name: 'Jeep · HMG frontal', cost: 1 },
    { id: 'jeep-lmg', name: 'Jeep · HMG frontal y LMG secundaria', cost: 2 },
    { id: 'jeep-mmg', name: 'Jeep · HMG frontal y MMG secundaria', cost: 3 },
  ];
  const transportForTeams = n => Array.from({ length: n }, () => transportChoices);
  const commandSquad = n => ({
    id: 'uk_command_group' + n, name: 'Grupo ' + n, cost: n === 2 ? 3 : 0, limit: 1,
    teams: [team('Equipo 1', 'WRRRr'), team('Equipo 2', 'WRRRr')], transportSlots: transportForTeams(2),
  });
  const thirdTeam = n => ({
    id: 'uk_command_extra' + n, name: 'Tercer equipo del Grupo ' + n, cost: 1, limit: 1,
    teams: [team('Equipo 3', 'WRRrr')], transportSlots: transportForTeams(1),
    ...(n === 2 ? { requires: 'uk_command_group2' } : {}),
  });
  const commandos = {
    ...base, ALWAYS_ELITE: true, SMG_TO_RIFLE: true, MAX_SMG_REMOVALS: Infinity, SMG_PER_REMOVAL: 3,
    REINFORCEMENT_OPTIONS: base.REINFORCEMENT_OPTIONS.filter(o => o.id === 'rifle_reinforcement'),
    CORE_UNITS: [
      { id: 'uk_command_hq', name: 'Grupo de mando', transportSlots: transportForTeams(1),
        teams: [team('Comandante', 'D'), team('Equipo de mando', 'WUUrr')] },
      commandSquad(1),
    ],
    FIRE_SUPPORT: [
      thirdTeam(1), commandSquad(2), thirdTeam(2),
      ...['fs_vickers', 'fs_mortar', 'fs_sniper'].map(id => ({ ...support(id), transportSlots: transportForTeams(1) })),
    ],
  };
  if (typeof module !== 'undefined') module.exports = { motorised, commandos };
  else root.VFVBritishVariants = { motorised, commandos };
})(typeof window !== 'undefined' ? window : globalThis);
