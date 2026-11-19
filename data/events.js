/* Tabla de eventos aleatorios (1D12) — se tira tras un empate de iniciativa resuelto.
   Reglamento básico, pág. 22 del PDF. Traducido del inglés. */

window.VFV_EVENTOS = [
  {
    n: 1,
    titulo: 'Apretado (Tight Corner)',
    texto: 'Ambos jugadores descartan una carta de activación de su mano, elegida al azar.',
  },
  {
    n: 2,
    titulo: '¡Empujad! (Push Forwards!)',
    texto:
      'Empezando por un jugador determinado al azar, cada uno tira 1D8: con éxito puede elegir una unidad propia desactivada y resolver con ella una acción de avance (Advance).',
  },
  {
    n: 3,
    titulo: 'Escasez de munición (Low on Ammunition)',
    texto:
      'Empezando por un jugador al azar, cada uno tira 1D8: con éxito elige un equipo de infantería enemigo, que sufre 2 «burns» en sus acciones de disparo hasta el final del turno.',
  },
  {
    n: 4,
    titulo: 'Un francotirador (A Sniper)',
    texto:
      'Se elige al azar un equipo de infantería de cada jugador. Por cada equipo se tira 1D12: con éxito, la unidad recibe 1 de estrés y hace una tirada de defensa con 1D6; si falla, sufre 1 baja y 1 punto de estrés adicional.',
  },
  {
    n: 5,
    titulo: 'Localizados (Spotted)',
    texto:
      'Ambos tiran 5D6: quien saque más éxitos coloca un marcador de Fuego en la unidad enemiga que elija (así será más fácil de detectar).',
  },
  {
    n: 6,
    titulo: 'Llovizna (Drizzle)',
    texto:
      'Hasta el final del turno, el spotting sufre una columna de penalización a la izquierda y todos los disparos sufren un «burn».',
  },
  {
    n: 7,
    titulo: 'Mina (Mine)',
    texto:
      'En el siguiente turno, cada jugador elige una de sus unidades y tira 1D6; con éxito explota una mina: si es infantería, 1 baja y 1 de estrés; si es un vehículo, tirada para destruirlo con factor AT 0.',
  },
  {
    n: 8,
    titulo: '¡Un empujón más! (One More Push!)',
    texto:
      'Cada jugador tira 1D8: con éxito elige una unidad y recupera 1 de sus acciones del turno (se retira una ficha verde o se gira la roja para mostrar la verde).',
  },
  {
    n: 9,
    titulo: 'Mensaje recibido (Message Received)',
    texto:
      'Cada jugador tira 1D6: con éxito elige al azar una carta de su pila de descartes y la recupera; después descarta una de las cartas de su mano.',
  },
  {
    n: 10,
    titulo: 'Golpe de suerte (Stroke of Luck)',
    texto: 'Cada jugador roba una carta de bonificación.',
  },
  {
    n: 11,
    titulo: 'Soldado perdido (Stray Soldier)',
    texto:
      'Ambos tiran 5D6: quien obtenga más éxitos añade una figura al equipo de infantería que elija. Si empatan, no pasa nada.',
  },
  {
    n: 12,
    titulo: '¡Ataque aéreo! (Attack!)',
    texto:
      'Ambos tiran 5D6. Quien saque menos éxitos elige al azar una de sus unidades, que es atacada por un avión: se resuelve una acción de disparo como si la hubiera hecho una HMG.',
  },
];
