// Suplemento, pp. impresas 14–16 y 18–20. Costes y composición corregidos por la FAQ.
(function (root) {
  'use strict';
  const types = { C: 'commander_smg', W: 'team_leader_smg', J: 'team_leader_rifle', R: 'rifleman',
    r: 'rifleman', L: 'mg34_lmg', l: 'mg34_lmg', M: 'mg34_mmg', O: 'mortar',
    F: 'flamethrower', A: 'anti_tank_rifle', T: 'at_gun', H: 'howitzer', S: 'sniper', '-': 'crew' };
  const team = (name, composition) => ({ name, figures: [...composition].map(code => ({
    type: types[code], fixed: !['r', 'l'].includes(code),
    ...(code === 'r' ? { reinforcementOnly: 'rifle_reinforcement' } : {}),
    ...(code === 'l' ? { reinforcementOnly: 'lmg_reinforcement' } : {}),
  })) });
  const support = (id, name, cost, composition, limit = 1, group, groupLimit = limit) => ({
    id, name, cost, limit, teams: [team(name, composition)],
    ...(group ? { selectionGroup: group, maxTotalGroup: groupLimit } : {}),
  });
  const front = ['DE39', 'DE40'], africaRussia = ['DE40-41', 'DE41'], late = ['DE42', 'DE43'];
  const all = [...front, ...africaRussia, ...late], afterFront = [...africaRussia, ...late];
  const truck = { id: 'de_truck', name: 'Camión', cost: 0 };
  const halftrack = { id: 'de_251-1', name: 'Sd.Kfz. 251/1', cost: 1 };
  const kubel = { id: 'de_kubelwagen', name: 'Kübelwagen', cost: 0 };
  const halftrackSlot = [[truck, halftrack]];
  const squad = (n, left, right, mechanised) => ({
    id: 'de_group' + n, name: 'Grupo ' + n, cost: n > 1 ? 3 : 0, limit: 1,
    teams: [team('Equipo 1', left), team('Equipo 2', right)],
    ...(mechanised ? { transportSlots: halftrackSlot } : {}),
  });
  const headquarters = (composition, mechanised) => ({
    id: 'de_hq', name: 'Grupo de mando',
    teams: [team('Comandante', 'C'), team('Equipo de mando', composition),
      ...(mechanised ? [team('Equipo ATR', 'A-')] : [])],
    ...(mechanised ? { transportSlots: halftrackSlot } : {}),
  });
  const open = ['Abierto'], recon = ['Reconocimiento'], openRecon = [...recon, ...open];
  const transport = capacity => [...open, 'Transporte ' + capacity];
  const coax = 'MMG coaxial · torreta', hull = 'MMG secundaria · casco', mg = 'MMG frontal · exterior';
  const auto = ['Cañón automático · torreta', coax], light = ['ATG ligero · torreta', coax, hull];
  const howitzer = ['Obús medio · torreta', coax, hull];
  const rear = { id: 'rear-mmg', name: 'MMG secundaria trasera', cost: 1, weapons: ['MMG trasera · exterior'] };
  const profiles = [
    ['221', 'Sd.Kfz. 221', 2, 1, 'ruedas', ['MMG · torreta'], openRecon],
    ['222', 'Sd.Kfz. 222', 2, 1, 'ruedas', auto, openRecon],
    ['231', 'Sd.Kfz. 231 (6/8 ruedas)', 3, 2, 'ruedas', auto, recon],
    ['234-1', 'Sd.Kfz. 234/1', 3, 2, 'ruedas', auto, openRecon, late],
    ['234-3', 'Sd.Kfz. 234/3', 2, 1, 'ruedas', ['Obús ligero · torreta', coax], openRecon, late],
    ['250-9', 'Sd.Kfz. 250/9', 2, 1, 'semioruga', auto, openRecon, afterFront],
    ['250', 'Sd.Kfz. 250', 1, 1, 'semioruga', [mg], transport(6), [...front, ...africaRussia], [rear]],
    ['251-1', halftrack.name, 1, 1, 'semioruga', [mg], transport(10), [...front, ...africaRussia], [rear]],
    ['250-10', 'Sd.Kfz. 250/10', 1, 1, 'semioruga', ['ATG ligero frontal · exterior'], transport(8), afterFront, [rear]],
    ['unic', 'Unic P107 / U304(f)', 1, 1, 'semioruga', ['ATG ligero frontal · exterior'], transport(4), ['DE41', ...late]],
    ['7', 'Sd.Kfz. 7', 0, 0, 'semioruga', [], transport(8)],
    ['truck', truck.name, 0, 0, 'ruedas', [], transport(12)],
    ['marder', 'Marder II / III', 3, 1, 'orugas', ['ATG pesado · casco', 'MMG coaxial · casco'], open, late],
    ['panzerjager', 'Panzerjäger I', 2, 1, 'orugas', ['ATG medio · casco'], open],
    ['10', 'Sd.Kfz. 10', 0, 0, 'semioruga', [], transport(6)],
    ['moto', 'Motocicleta / sidecar', 0, 0, 'motocicleta', [], [...openRecon, 'Dotación 2/3']],
    ['kubelwagen', 'Kübelwagen / automóvil de mando', 0, 0, 'ruedas', [], transport(4), all,
      [{ id: 'mmg', name: 'MMG exterior', cost: 1, weapons: ['MMG · exterior'] }]],
    ['panzer35', 'Panzer 35(t) / 38(t)', 3, 1, 'orugas', light],
    ['panzer1', 'Panzer I', 2, 1, 'orugas', ['MMG gemelas · torreta']],
    ['panzer2', 'Panzer II A–F', 3, 2, 'orugas', auto],
    ['panzer3-c-f', 'Panzer III C–F', 4, 2, 'orugas', light],
    ['panzer3-g', 'Panzer III G', 5, 2, 'orugas', ['ATG medio · torreta', coax, hull], [], afterFront],
    ['panzer4-a', 'Panzer IV A', 5, 2, 'orugas', howitzer],
    ['panzer4-b-f', 'Panzer IV B–F', 6, 3, 'orugas', howitzer, [], afterFront],
    ['tiger', 'Panzer VI / Tiger I', 9, 4, 'orugas', ['ATG extrapesado · torreta', coax, hull], [], late],
    ['stug', 'StuG III A–E', 5, 3, 'orugas', ['Obús ligero · casco']],
  ];
  const normal = { id: 'rifle_reinforcement', name: 'Tres fusileros', cost: 1, figures: Array(3).fill('rifleman') };
  const lmg = { id: 'lmg_reinforcement', name: 'MG34', cost: 1, figures: ['mg34_lmg'] };
  const atr = support('de_atr', 'Equipo ATR PzB 39', 'diamond', 'A-');
  const flame = support('de_ft', 'Equipo lanzallamas', 1, 'F-');
  const supports = [
    support('de_mmg', 'MG34 en trípode', 1, 'M--r'),
    support('de_mortar_light', 'Mortero ligero de 50 mm', 1, 'O--r', 1, 'morteros'),
    support('de_mortar_medium', 'Mortero medio de 81 mm', 2, 'O--r', 1, 'morteros'),
    support('fs_sniper', 'Francotirador', 'diamond', 'S-'),
  ];
  const atg = support('de_pak38', 'ATG ligero Pak 38', 1, 'T--rr', 2, 'anticarros');
  const heavyAtg = { ...support('de_pak40', 'ATG pesado Pak 40', 3, 'T--rr', 2, 'anticarros'), fromYear: 1942 };
  const artillery = support('de_leig18', 'Obús medio 7,5 cm le.IG 18', 1, 'H--r');
  const moto = {
    id: 'fs_recce_moto', name: 'Reconocimiento motociclista', cost: 1, limit: 1,
    hasOptionalModule: true, reconLmg: 'mg34_lmg', optionalModuleCost: 1,
    baseModule: { vehicles: 1, figures: team('', 'WLr').figures },
    optionalModule: { vehicles: 1, figures: team('', 'RR').figures, reinforcementSlots: team('', 'r').figures },
  };
  const common = {
    FIGURE_TYPES: Object.fromEntries(Object.entries({
      commander_smg: 'Comandante', team_leader_smg: 'Jefe de equipo', team_leader_rifle: 'Jefe de equipo',
      rifleman: 'Fusilero', mg34_lmg: 'MG34', mg34_mmg: 'MG34 en trípode', mortar: 'Mortero',
      flamethrower: 'Lanzallamas', anti_tank_rifle: 'PzB 39', at_gun: 'Cañón anticarro',
      howitzer: 'Obús', sniper: 'Francotirador', crew: 'Servidor',
    }).map(([id, name]) => [id, { name }])),
    ELITE_COST: 3, SMG_TO_RIFLE: true, MAX_REINFORCEMENT_PURCHASES: 4,
    DIVISIONAL_VEHICLES: profiles.map(([id, name, cost, armor, movement, weapons, rules = [], avail = all, options = []]) => ({
      id: 'de_' + id, name, cost, armor, movement, weapons, rules, avail, options,
    })),
  };
  const infantry = {
    ...common, RECRUIT_FREE_SUPPORT: 'de_group3', REINFORCEMENT_OPTIONS: [normal],
    CORE_UNITS: [headquarters('WLR'), squad(1, 'WLRr', 'JRRRrr'), { ...squad(2, 'WLRr', 'JRRRrr'), cost: 0 }],
    FIRE_SUPPORT: [squad(3, 'WLRr', 'JRRRrr'), ...supports, atr, flame, atg, heavyAtg, artillery,
      moto, support('de_recon_foot', 'Reconocimiento a pie', 1, 'WRRr')],
  };
  const motorised = {
    ...common, RECRUIT_FREE_SUPPORT: 'de_group2', REINFORCEMENT_OPTIONS: [normal, lmg],
    CORE_UNITS: [headquarters('WRRRR', true), squad(1, 'WLRR', 'WLRR', true)],
    FIRE_SUPPORT: [squad(2, 'WLRR', 'WLRR', true), { ...squad(3, 'WLRR', 'WLRR', true), requires: 'de_group2' }, ...supports, atr, flame, moto,
      { ...support('de_recon_kubel', 'Reconocimiento en Kübelwagen', 1, 'WLrr'),
        reconLmg: 'mg34_lmg', transportSlots: [[kubel]] }],
  };
  const airborne = {
    ...common, BUDGET_PENALTY: 1, REINFORCEMENT_OPTIONS: [normal, lmg], MAX_SMG_REMOVALS: Infinity,
    CORE_UNITS: [headquarters('WRRrr'), squad(1, 'WLRRrr', 'WlRRRr'), { ...squad(2, 'WLRRrr', 'WlRRRr'), cost: 0 }],
    FIRE_SUPPORT: [squad(3, 'WLRrrr', 'WlRRRr'), ...supports, atg, artillery,
      support('de_recon_foot', 'Reconocimiento a pie', 1, 'WRRr', 2)],
  };
  if (typeof module !== 'undefined') module.exports = { infantry, motorised, airborne };
  else root.VFVGermany = { infantry, motorised, airborne };
})(typeof window !== 'undefined' ? window : globalThis);
