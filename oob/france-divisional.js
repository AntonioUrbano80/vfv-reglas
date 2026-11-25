// Suplemento, pp. impresas 10–11 (PDF local 8–9), con FAQ del 10-02-2026.
(function (root) {
'use strict';
const turret = ['ATG ligero · torreta', 'MMG coaxial · torreta'];
const recon = ['Reconocimiento'];
const transport = capacity => ['Abierto', `Transporte ${capacity}`];

const profiles = [
  ['panhard-amd', 'AMD Panhard 165/175/178', 2, 1, 'ruedas', turret, recon],
  ['panhard-p16', 'Panhard-Schneider P16', 2, 1, 'semioruga', turret, recon],
  ['amr-33', 'AMR 33', 2, 1, 'orugas', ['MMG · torreta'], recon],
  ['fcm-36', 'FCM 36', 3, 2, 'orugas', turret],
  ['amc-35', 'AMC 35', 2, 1, 'orugas', turret],
  ['hotchkiss', 'Hotchkiss H35/H39', 3, 2, 'orugas', turret],
  ['somua-s35', 'Somua S35', 3, 2, 'orugas', turret],
  ['renault-d2', 'Renault D2', 3, 2, 'orugas', turret],
  ['renault-r35', 'Renault R35/R39/R40', 3, 2, 'orugas', turret],
  ['b1-bis', 'Char B1 bis', 6, 3, 'orugas', [...turret, 'Obús medio · casco', 'MMG coaxial secundaria · casco (FAQ)']],
  ['lorraine-38l', 'Lorraine 38L', 1, 1, 'orugas', [], transport(6)],
  ['laffly-s20', 'Laffly S20', 0, 0, 'ruedas', [], transport(10), [
    { id: 'rear-atg', name: 'ATG ligero hacia atrás', cost: 1, weapons: ['ATG ligero · torreta hacia atrás'], selectionGroup: 'primary' },
    { id: 'primary-mmg', name: 'MMG exterior primaria', cost: 1, weapons: ['MMG · exterior'], selectionGroup: 'primary' },
    { id: 'rear-mmg', name: 'MMG exterior trasera', cost: 1, weapons: ['MMG secundaria · exterior hacia atrás'] },
  ]],
  ['car', 'Automóvil', 0, 0, 'ruedas', [], transport(4)],
  ['truck', 'Camión', 0, 0, 'ruedas', [], transport(12)],
  ['motorcycle', 'Motocicleta / sidecar', 0, 0, 'motocicleta', [], [...recon, 'Abierto', 'Dotación 2/3']],
  ['tracked-transport', 'Transporte semioruga', 0, 0, 'semioruga', [], transport(10)],
];

const data = profiles.map(([id, name, cost, armor, movement, weapons, rules = [], options = []], index) => ({
  id: 'fr_' + id, name, cost, armor, movement, weapons, rules, options,
  avail: ['FR39-40'], category: 'Apoyo divisional francés', pdfPage: index < 9 ? 8 : 9,
}));
if (typeof module !== 'undefined') module.exports = data;
else root.VFVFranceDivisional = data;
})(typeof window !== 'undefined' ? window : globalThis);
