// Datos de la demo. Infantería cotejada con pages/ext/p-24.png (impresa 32).
// Vehículos cotejados con p-27 a p-29.png (impresas 36-38).
// T = torreta, C = casco, P = montaje exterior. Una estrella azul equivale a 5.
// Tipos de figura
const FIGURE_TYPES = {
  commander_pistol: { name: 'Comandante (pistola)', category: 'hq' },
  team_leader_rifle: { name: 'Jefe de equipo (fusil)', category: 'leader' },
  rifleman: { name: 'Fusilero', category: 'rifleman' },
  light_mortar: { name: 'Mortero/lanzagranadas portátil', category: 'special' },
  bren_lmg: { name: 'LMG Bren', category: 'lmg' },
  vickers_mmg: { name: 'MMG Vickers', category: 'mmg' },
  mortar_crew: { name: 'Servidor de mortero', category: 'crew' },
  vickers_crew: { name: 'Servidor MMG', category: 'crew' },
  at_gun_crew: { name: 'Servidor cañón AT', category: 'crew' },
  anti_tank_rifle: { name: 'Fusil anticarro Boys', category: 'at_rifle' },
  sniper: { name: 'Francotirador', category: 'sniper' },
  recce_leader: { name: 'Jefe recce (fusil)', category: 'leader' },
  recce_bren: { name: 'LMG Bren (recce)', category: 'lmg' },
  recce_rifleman: { name: 'Fusilero recce', category: 'rifleman' },
  truck_driver: { name: 'Conductor camión', category: 'driver' }
};

// ============================================================
// NÚCLEO OBLIGATORIO (3 unidades, 0★)
// ============================================================
const CORE_UNITS = [
  {
    id: 'uk_hq',
    name: 'Grupo de Mando',
    cost: 0,
    mandatory: true,
    teams: [
      {
        id: 'hq_team',
        name: 'Equipo de Mando',
        figures: [
          { type: 'commander_pistol', slotType: 'hq', fixed: true },
          { type: 'team_leader_rifle', slotType: 'hq', fixed: true },
          { type: 'rifleman', slotType: 'hq', fixed: true },
          { type: 'rifleman', slotType: 'hq', fixed: true },
          { type: 'light_mortar', slotType: 'hq', fixed: true },
          { type: 'anti_tank_rifle', slotType: 'hq', fixed: false, reinforcementOnly: 'at_rifle_reinforcement', label: 'Hueco: Fusil anticarro' },
          { type: 'rifleman', slotType: 'hq', fixed: false, reinforcementOnly: 'rifle_reinforcement', label: 'Hueco: Fusilero' }
        ]
      }
    ],
    initial: 5, max: 7, greySlots: 2
  },
  {
    id: 'uk_group1',
    name: 'Grupo 1',
    cost: 0,
    mandatory: true,
    teams: [
      {
        id: 'bren_team',
        name: 'Equipo Bren',
        figures: [
          { type: 'team_leader_rifle', slotType: 'bren', fixed: true },
          { type: 'bren_lmg', slotType: 'bren', fixed: true },
          { type: 'rifleman', slotType: 'bren', fixed: true },
          { type: 'rifleman', slotType: 'bren', fixed: true }
        ]
      },
      {
        id: 'rifle_team',
        name: 'Equipo de Fusileros',
        figures: [
          { type: 'team_leader_rifle', slotType: 'rifle', fixed: true },
          { type: 'rifleman', slotType: 'rifle', fixed: true },
          { type: 'rifleman', slotType: 'rifle', fixed: true },
          { type: 'rifleman', slotType: 'rifle', fixed: true },
          { type: 'rifleman', slotType: 'rifle', fixed: false, reinforcementOnly: 'rifle_reinforcement', label: 'Hueco: Fusilero' },
          { type: 'rifleman', slotType: 'rifle', fixed: false, reinforcementOnly: 'rifle_reinforcement', label: 'Hueco: Fusilero' },
          { type: 'rifleman', slotType: 'rifle', fixed: false, reinforcementOnly: 'rifle_reinforcement', label: 'Hueco: Fusilero' }
        ]
      }
    ],
    initial: 8, max: 11, greySlots: 3
  },
  {
    id: 'uk_group2',
    name: 'Grupo 2',
    cost: 0,
    mandatory: true,
    teams: [
      {
        id: 'bren_team',
        name: 'Equipo Bren',
        figures: [
          { type: 'team_leader_rifle', slotType: 'bren', fixed: true },
          { type: 'bren_lmg', slotType: 'bren', fixed: true },
          { type: 'rifleman', slotType: 'bren', fixed: true },
          { type: 'rifleman', slotType: 'bren', fixed: true }
        ]
      },
      {
        id: 'rifle_team',
        name: 'Equipo de Fusileros',
        figures: [
          { type: 'team_leader_rifle', slotType: 'rifle', fixed: true },
          { type: 'rifleman', slotType: 'rifle', fixed: true },
          { type: 'rifleman', slotType: 'rifle', fixed: true },
          { type: 'rifleman', slotType: 'rifle', fixed: true },
          { type: 'rifleman', slotType: 'rifle', fixed: false, reinforcementOnly: 'rifle_reinforcement', label: 'Hueco: Fusilero' },
          { type: 'rifleman', slotType: 'rifle', fixed: false, reinforcementOnly: 'rifle_reinforcement', label: 'Hueco: Fusilero' },
          { type: 'rifleman', slotType: 'rifle', fixed: false, reinforcementOnly: 'rifle_reinforcement', label: 'Hueco: Fusilero' }
        ]
      }
    ],
    initial: 8, max: 11, greySlots: 3
  }
];

// ============================================================
// REFUERZOS (hasta 4 compras, 1★ cada una)
// ============================================================
const REINFORCEMENT_OPTIONS = [
  {
    id: 'rifle_reinforcement',
    name: 'Refuerzo normal — 3 fusileros',
    cost: 1,
    figures: ['rifleman', 'rifleman', 'rifleman'],
    compatibleSlots: ['rifle', 'hq', 'mmg', 'mortar', 'at_gun', 'recce_foot', 'group3_bren', 'group3_rifle']
  },
  {
    id: 'at_rifle_reinforcement',
    name: 'Refuerzo anticarro — 1 fusil anticarro + 1 fusilero',
    cost: 1,
    figures: ['anti_tank_rifle', 'rifleman'],
    compatibleSlots: ['hq'] // solo el hueco específico del HQ
  }
];
const MAX_REINFORCEMENT_PURCHASES = 4;

// ============================================================
// APOYOS ORGÁNICOS (Fire Support)
// ============================================================
const FIRE_SUPPORT = [
  {
    id: 'fs_group3',
    name: 'Grupo 3',
    cost: 3,
    limit: 1,
    teams: [
      {
        id: 'bren_team',
        name: 'Equipo Bren',
        figures: [
          { type: 'team_leader_rifle', slotType: 'group3_bren', fixed: true },
          { type: 'bren_lmg', slotType: 'group3_bren', fixed: true },
          { type: 'rifleman', slotType: 'group3_bren', fixed: true },
          { type: 'rifleman', slotType: 'group3_bren', fixed: false, reinforcementOnly: 'rifle_reinforcement', label: 'Hueco: Fusilero' }
        ]
      },
      {
        id: 'rifle_team',
        name: 'Equipo de Fusileros',
        figures: [
          { type: 'team_leader_rifle', slotType: 'group3_rifle', fixed: true },
          { type: 'rifleman', slotType: 'group3_rifle', fixed: true },
          { type: 'rifleman', slotType: 'group3_rifle', fixed: true },
          { type: 'rifleman', slotType: 'group3_rifle', fixed: true },
          { type: 'rifleman', slotType: 'group3_rifle', fixed: true },
          { type: 'rifleman', slotType: 'group3_rifle', fixed: false, reinforcementOnly: 'rifle_reinforcement', label: 'Hueco: Fusilero' },
          { type: 'rifleman', slotType: 'group3_rifle', fixed: false, reinforcementOnly: 'rifle_reinforcement', label: 'Hueco: Fusilero' }
        ]
      }
    ],
    initial: 8, max: 11, greySlots: 3
  },
  {
    id: 'fs_vickers',
    name: 'Equipo MMG Vickers',
    cost: 1,
    limit: 1,
    teams: [{
      id: 'vickers_team',
      name: 'Equipo MMG',
      figures: [
        { type: 'vickers_mmg', slotType: 'mmg', fixed: true },
        { type: 'vickers_crew', slotType: 'mmg', fixed: true },
        { type: 'vickers_crew', slotType: 'mmg', fixed: true },
        { type: 'vickers_crew', slotType: 'mmg', fixed: false, reinforcementOnly: 'rifle_reinforcement', label: 'Hueco: Servidor' }
      ]
    }],
    initial: 3, max: 4, greySlots: 1
  },
  {
    id: 'fs_mortar',
    name: 'Mortero medio',
    cost: 2,
    limit: 1,
    teams: [{
      id: 'mortar_team',
      name: 'Equipo Mortero',
      figures: [
        { type: 'team_leader_rifle', slotType: 'mortar', fixed: true },
        { type: 'mortar_crew', slotType: 'mortar', fixed: true },
        { type: 'mortar_crew', slotType: 'mortar', fixed: true },
        { type: 'mortar_crew', slotType: 'mortar', fixed: false, reinforcementOnly: 'rifle_reinforcement', label: 'Hueco: Servidor' }
      ]
    }],
    initial: 3, max: 4, greySlots: 1
  },
  {
    id: 'fs_sniper',
    name: 'Francotirador',
    cost: 'diamond',
    limit: 1,
    diamondCost: 2, // figuras a retirar
    teams: [{
      id: 'sniper_team',
      name: 'Equipo Francotirador',
      figures: [
        { type: 'sniper', slotType: 'sniper', fixed: true },
        { type: 'rifleman', slotType: 'sniper', fixed: true }
      ]
    }],
    initial: 2, max: 2, greySlots: 0,
    special: 'Coste ♦ = retirar 2 figuras de la fuerza (no gasta estrellas). Puede pagarse comprando 1 refuerzo (1★) → 3 fusileros, usar 2 para el ♦, queda 1 fusilero libre.'
  },
  {
    id: 'fs_2pdr',
    name: 'Cañón AT ligero QF 2-pdr',
    cost: 1,
    limit: 2,
    selectionGroup: 'at_guns',
    maxTotalGroup: 2,
    teams: [{
      id: 'at_gun_team',
      name: 'Equipo Cañón AT 2-pdr',
      figures: [
        { type: 'team_leader_rifle', slotType: 'at_gun', fixed: true },
        { type: 'at_gun_crew', slotType: 'at_gun', fixed: true },
        { type: 'at_gun_crew', slotType: 'at_gun', fixed: true },
        { type: 'at_gun_crew', slotType: 'at_gun', fixed: false, reinforcementOnly: 'rifle_reinforcement', label: 'Hueco: Servidor' },
        { type: 'at_gun_crew', slotType: 'at_gun', fixed: false, reinforcementOnly: 'rifle_reinforcement', label: 'Hueco: Servidor' }
      ]
    }],
    initial: 3, max: 5, greySlots: 2
  },
  {
    id: 'fs_6pdr',
    name: 'Cañón AT medio QF 6-pdr (desde 1942)',
    cost: 2,
    limit: 2,
    selectionGroup: 'at_guns',
    maxTotalGroup: 2,
    fromYear: 1942,
    teams: [{
      id: 'at_gun_team',
      name: 'Equipo Cañón AT 6-pdr',
      figures: [
        { type: 'team_leader_rifle', slotType: 'at_gun', fixed: true },
        { type: 'at_gun_crew', slotType: 'at_gun', fixed: true },
        { type: 'at_gun_crew', slotType: 'at_gun', fixed: true },
        { type: 'at_gun_crew', slotType: 'at_gun', fixed: false, reinforcementOnly: 'rifle_reinforcement', label: 'Hueco: Servidor' },
        { type: 'at_gun_crew', slotType: 'at_gun', fixed: false, reinforcementOnly: 'rifle_reinforcement', label: 'Hueco: Servidor' }
      ]
    }],
    initial: 3, max: 5, greySlots: 2
  },
  {
    id: 'fs_recce_foot',
    name: 'Equipo de reconocimiento a pie',
    cost: 1,
    limit: 2,
    teams: [{
      id: 'recce_foot_team',
      name: 'Equipo Recce a pie',
      figures: [
        { type: 'recce_leader', slotType: 'recce_foot', fixed: true },
        { type: 'recce_rifleman', slotType: 'recce_foot', fixed: true },
        { type: 'recce_rifleman', slotType: 'recce_foot', fixed: true },
        { type: 'recce_rifleman', slotType: 'recce_foot', fixed: false, reinforcementOnly: 'rifle_reinforcement', label: 'Hueco: Fusilero' }
      ]
    }],
    initial: 3, max: 4, greySlots: 1
  },
  {
    id: 'fs_recce_moto',
    name: 'Equipo de reconocimiento motociclista',
    cost: 1,
    limit: 1,
    hasOptionalModule: true,
    optionalModuleCost: 1,
    baseModule: {
      vehicles: 1,
      figures: [
        { type: 'recce_leader', slotType: 'recce_moto', fixed: true },
        { type: 'recce_bren', slotType: 'recce_moto', fixed: true },
        { type: 'recce_rifleman', slotType: 'recce_moto', fixed: true }
      ]
    },
    optionalModule: {
      cost: 1,
      vehicles: 1,
      figures: [
        { type: 'recce_rifleman', slotType: 'recce_moto', fixed: true },
        { type: 'recce_rifleman', slotType: 'recce_moto', fixed: true }
      ],
      reinforcementSlots: [{ type: 'recce_rifleman', slotType: 'recce_moto', reinforcementOnly: 'rifle_reinforcement', label: 'Hueco: Fusilero' }]
    },
    initial: 3, max: 6, greySlots: 0,
    special: 'Config 1 vehículo: 1★, 3 figs. Config 2 vehículos: 2★, 5 figs + 1 hueco gris. Puede cambiar Bren→fusilero (-1★).'
  },
  {
    id: 'fs_recce_moto_bren_swap',
    name: 'Opción: Cambiar Bren por fusilero (-1★)',
    cost: -1,
    limit: 1,
    requires: 'fs_recce_moto',
    type: 'modifier'
  }
];

// ============================================================
// OPCIONES DE EQUIPAMIENTO
// ============================================================
const EQUIPMENT_OPTIONS = [
  {
    id: 'eq_smg',
    name: 'Retirar figuras → Subfusiles',
    cost: 0,
    maxRemoved: 2,
    smgPerRemoved: 2,
    maxSMG: 4,
    detail: 'Retirar hasta 2 figs (fusileros/servidores). Por cada una, hasta 2 fusiles→subfusiles. Máx 4 SMG totales.'
  },
  {
    id: 'eq_elite',
    name: 'Élite (infantería núcleo + apoyos orgánicos)',
    cost: 3,
    scope: ['core', 'fire_support'],
    exclude: ['divisional'],
    detail: '+3★ global. Afecta: Grupo Mando, Grupos 1/2, Grupo 3, MMG, Mortero, Francotirador, Cañones AT, Recce. NO vehículos división.'
  }
];

// ============================================================
// APOYO DIVISIONAL — Vehículos con opciones +1★
// ============================================================
const DIVISIONAL_VEHICLES = [
  // Reconocimiento, transportes, carros ligeros
  { id: 'ds_rolls', name: 'Rolls-Royce', cost: 2, armor: 1, weapons: ['ATR T', 'MMG coaxial T'], rules: ['Reconocimiento'], avail: ['AN40-41'], category: 'Reconocimiento, transportes y carros ligeros', options: [] },
  { id: 'ds_morris', name: 'Morris CS9', cost: 1, armor: 1, weapons: ['ATR T', 'LMG coaxial T'], rules: ['Reconocimiento', 'Abierto'], avail: ['Todos'], category: 'Reconocimiento, transportes y carros ligeros', options: [] },
  { id: 'ds_dingo', name: 'Daimler Dingo', cost: 2, armor: 2, weapons: ['LMG C'], rules: ['Reconocimiento', 'Abierto'], avail: ['Todos'], category: 'Reconocimiento, transportes y carros ligeros', options: [] },
  { id: 'ds_humber', name: 'Humber Mk II/Mk IV', cost: 3, armor: 1, weapons: ['Autocañón/AT ligero T', 'MMG coaxial T'], rules: ['Reconocimiento'], avail: ['AN/S42-43'], category: 'Reconocimiento, transportes y carros ligeros', options: [] },
  { id: 'ds_daimler', name: 'Daimler', cost: 3, armor: 1, weapons: ['AT ligero T', 'MMG coaxial T'], rules: ['Reconocimiento'], avail: ['AN/S42-43'], category: 'Reconocimiento, transportes y carros ligeros', options: [] },
  { id: 'ds_marmon', name: 'Marmon-Herrington', cost: 2, armor: 1, weapons: ['MMG gemelas T o AT ligero P (alternativas)'], rules: ['Reconocimiento', 'Abierto'], avail: ['AN/S42-43'], category: 'Reconocimiento, transportes y carros ligeros', options: [] },
  { id: 'ds_indian', name: 'Indian Pattern Carrier', cost: 1, armor: 1, weapons: ['LMG C o ATR C (alternativas)'], rules: ['Reconocimiento', 'Abierto'], avail: ['AN40-41', 'AN/S42-43'], category: 'Reconocimiento, transportes y carros ligeros', options: [] },
  { id: 'ds_bren', name: 'Universal Bren Carrier', cost: 1, armor: 1, weapons: ['LMG C'], rules: ['Reconocimiento', 'Abierto', 'Transporte 5'], avail: ['Todos'], category: 'Reconocimiento, transportes y carros ligeros', options: [
    { id: 'opt_bren_atr', name: 'Sustituir LMG de casco por ATR (sin coste)', cost: 0, weapons: ['ATR C'], replacesPrimary: true },
    { id: 'opt_bren_lmg', name: 'LMG exterior (arma secundaria)', cost: 1, weapons: ['LMG P'] }
  ]},
  { id: 'ds_markvi', name: 'Mark VI Light Tank', cost: 2, armor: 1, weapons: ['HMG T', 'MMG coaxial T'], rules: [], avail: ['F40', 'AN40-41'], category: 'Reconocimiento, transportes y carros ligeros', options: [] },

  // Carros británicos
  { id: 'ds_matilda1', name: 'Matilda Mk I', cost: 3, armor: 2, weapons: ['HMG T'], rules: [], avail: ['F40'], category: 'Carros británicos', options: [] },
  { id: 'ds_cruiser1', name: 'Cruiser Mk I A9', cost: 3, armor: 1, weapons: ['AT ligero T', 'MMG coaxial', 'MMG gemelas frontales C'], rules: [], avail: ['F40', 'AN40-41'], category: 'Carros británicos', options: [] },
  { id: 'ds_cruiser2', name: 'Cruiser Mk II A10', cost: 3, armor: 2, weapons: ['AT ligero T', 'MMG coaxial'], rules: [], avail: ['F40', 'AN40-41'], category: 'Carros británicos', options: [
    { id: 'opt_cruiser2_mmg', name: 'MMG de casco', cost: 1, weapons: ['MMG C'] }
  ]},
  { id: 'ds_cruiser4', name: 'Cruiser Mk IV A13 Mk II', cost: 4, armor: 2, weapons: ['AT ligero T'], rules: [], avail: ['F40', 'AN40-41'], category: 'Carros británicos', options: [] },
  { id: 'ds_matilda2', name: 'Matilda Mk II', cost: 4, armor: 3, weapons: ['AT ligero T', 'MMG coaxial'], rules: [], avail: ['Todos'], category: 'Carros británicos', options: [] },
  { id: 'ds_crusader', name: 'Crusader Mk I/Mk II', cost: 3, armor: 2, weapons: ['AT ligero T', 'MMG coaxial'], rules: [], avail: ['AN/S42-43'], category: 'Carros británicos', options: [] },
  { id: 'ds_valentine', name: 'Valentine VIII-X / Mk III', cost: 4, armor: 3, weapons: ['AT ligero T', 'MMG coaxial'], rules: [], avail: ['AN/S42-43'], category: 'Carros británicos', options: [] },
  { id: 'ds_valentine11', name: 'Valentine XI / Mk III', cost: 5, armor: 3, weapons: ['AT medio T', 'MMG coaxial'], rules: [], avail: ['AN/S42-43'], category: 'Carros británicos', options: [] },
  { id: 'ds_churchill', name: 'Churchill Mk II/IV', cost: 7, armor: 4, weapons: ['AT medio T', 'MMG coaxial', 'MMG C'], rules: [], avail: ['AN/S42-43'], category: 'Carros británicos', options: [] },

  // Cañones autopropulsados, transportes, material US
  { id: 'ds_2pdr_portee', name: 'QF 2-pdr Portee', cost: 1, armor: 0, weapons: ['AT ligero, arco 180°'], rules: ['Abierto'], avail: ['AN40-41', 'AN/S42-43'], category: 'CA autopropulsados, transportes y material US', options: [] },
  { id: 'ds_6pdr_portee', name: 'QF 6-pdr Portee', cost: 6, armor: 0, weapons: ['AT medio, arco 180°'], rules: ['Abierto'], avail: ['AN/S42-43'], category: 'CA autopropulsados, transportes y material US', options: [] },
  { id: 'ds_jeep', name: 'Jeep Willys', cost: 0, armor: 0, weapons: ['Sin arma de serie'], rules: ['Reconocimiento', 'Abierto', 'Transporte 4'], avail: ['AN/S42-43'], category: 'CA autopropulsados, transportes y material US', options: [
    { id: 'opt_jeep_gun', name: 'LMG o MMG', cost: 1, weapons: ['LMG/MMG P'] }
  ]},
  { id: 'ds_truck', name: 'Camión', cost: 0, armor: 0, weapons: ['Ninguno'], rules: ['Abierto', 'Transporte 12'], avail: ['Todos'], category: 'CA autopropulsados, transportes y material US', options: [] },
  { id: 'ds_moto', name: 'Motocicleta/sidecar', cost: 0, armor: 0, weapons: ['Ninguna'], rules: ['Reconocimiento', 'Abierto', 'Tripulación 2/3'], avail: ['Todos'], category: 'CA autopropulsados, transportes y material US', options: [] },
  { id: 'ds_sherman', name: 'Sherman I/II', cost: 6, armor: 3, weapons: ['AT medio T', 'MMG coaxial', 'MMG C'], rules: [], avail: ['AN/S42-43'], category: 'CA autopropulsados, transportes y material US', options: [] },
  { id: 'ds_stuart', name: 'M3A1 Stuart "Honey"', cost: 4, armor: 2, weapons: ['AT ligero T', 'MMG coaxial', 'MMG C'], rules: [], avail: ['AN/S42-43'], category: 'CA autopropulsados, transportes y material US', options: [] },
  { id: 'ds_grant', name: 'M3 Grant', cost: 6, armor: 3, weapons: ['AT medio T', 'MMG coaxial', 'Obús medio C'], rules: [], avail: ['AN/S42-43'], category: 'CA autopropulsados, transportes y material US', options: [] }
];


const OOB_DEMO_DATA = { FIGURE_TYPES, CORE_UNITS, REINFORCEMENT_OPTIONS, MAX_REINFORCEMENT_PURCHASES, FIRE_SUPPORT, EQUIPMENT_OPTIONS, DIVISIONAL_VEHICLES };
if (typeof module !== "undefined") module.exports = OOB_DEMO_DATA;
