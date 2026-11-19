/* Suplemento no oficial "vforvictory GCE v3" — Guerra Civil Española (1936-1939)
   Texto transcrito del PDF: vforvictory gce v3.pdf */

window.VFV_GCE = {
  facciones: [
    {
      id: 'sublevado',
      bando: 'franquista',
      etiqueta: 'Franquista',
      nombre: 'Ejército sublevado',
      resumen: 'Redespliegue tras el despliegue y capacidad de quitar marcadores de activación.',
      peloton: {
        n: 'Redespliegue',
        t: 'Una vez que ambas fuerzas hayan terminado de desplegar, puedes retirar una de tus unidades de la mesa y redesplegarla en cualquier lugar de tu área de despliegue. Esta unidad no puede ser del tipo vehículo.',
      },
      faccion: {
        n: 'Mandos fiables',
        t: 'Una vez por turno, una vez se ha revelado carta de acción propia, pero antes de realizarla, lanza 1D12 y si tienes un éxito, puedes seleccionar a cualquier unidad a L del Mando y quitarle un marcador de activación.',
      },
      refs: [{ doc: 'gce', page: 3 }],
    },
    {
      id: 'legion',
      bando: 'franquista',
      etiqueta: 'Franquista',
      nombre: 'Ejército de África (la Legión)',
      resumen: 'Terror: penaliza la reagrupación enemiga cerca de los legionarios.',
      peloton: {
        n: 'Terror',
        t: 'Las unidades enemigas a M de cualquier unidad de legionarios, pero no de una unidad de apoyo divisional, obtienen una penalización extra a la hora de realizar el chequeo de moral para reagruparse.',
      },
      faccion: {
        n: 'Preparados',
        t: 'Una vez por turno, tras revelarse las cartas de acción, si tu carta tiene un número de iniciativa inferior, puedes lanzar 1D12 y si tienes un éxito, tu carta contará como si tuviera más iniciativa que la de tu rival.',
      },
      refs: [{ doc: 'gce', page: 3 }],
    },
    {
      id: 'regulares',
      bando: 'franquista',
      etiqueta: 'Franquista',
      nombre: 'Ejército de África (Regulares)',
      resumen: 'Terror, y una acción de movimiento que puede ganar una C extra.',
      peloton: {
        n: 'Terror',
        t: 'Las unidades enemigas a M de cualquier unidad de legionarios, pero no de una unidad de apoyo divisional, obtienen una penalización extra a la hora de realizar el chequeo de moral para reagruparse.',
      },
      faccion: {
        n: 'Sufridos',
        t: 'Una vez por turno, tras haber realizado una acción de movimiento con una unidad, puedes lanzar 1D12 y si tienes un éxito, añade una C a la acción realizada. No podrán beneficiarse unidades de apoyo divisional.',
      },
      refs: [{ doc: 'gce', page: 3 }],
    },
    {
      id: 'falange',
      bando: 'franquista',
      etiqueta: 'Franquista',
      nombre: 'Milicianos (Falange)',
      resumen: 'Una estrella de refuerzos gratis y repetición de impactos fallidos en carga.',
      peloton: {
        n: 'Populares',
        t: 'A la hora de reunir tu banda, puedes añadir gratuitamente una estrella de refuerzos a tu fuerza.',
      },
      faccion: {
        n: 'Fanáticos',
        t: 'Una vez por turno, tras haber realizado una acción de carga y lanzado los dados para impactar, lanza 1D12 y si tienes un éxito, puedes repetir todos los impactos fallidos.',
      },
      refs: [{ doc: 'gce', page: 4 }],
    },
    {
      id: 'requetes',
      bando: 'franquista',
      etiqueta: 'Franquista',
      nombre: 'Milicianos (Requetés)',
      resumen: 'Refuerzos gratis y repetición de las salvaciones fallidas ante un disparo.',
      peloton: {
        n: 'Populares',
        t: 'A la hora de reunir tu banda, puedes añadir gratuitamente una estrella de refuerzos a tu fuerza.',
      },
      faccion: {
        n: 'Creyentes',
        t: 'Una vez por turno, tras haber sido objetivo de un disparo, antes de realizar la tirada de salvación, lanza 1D12 y si tienes un éxito, puedes repetir todos los resultados que no consigan cancelar el impacto.',
      },
      refs: [{ doc: 'gce', page: 4 }],
    },
    {
      id: 'ctv',
      bando: 'franquista',
      etiqueta: 'Franquista · Italia',
      nombre: 'Corpo Truppe Volontarie',
      resumen: 'Sube la experiencia de una unidad y cambia sus chequeos de moral según las bajas.',
      peloton: {
        n: 'Imprevisible',
        t: 'Una vez por turno, elige una unidad y haz una tirada de 1D8. Si tiene éxito, el nivel de experiencia de la unidad crece una categoría hasta el final del turno.',
      },
      faccion: {
        n: 'Ímpetu variable',
        t: 'Durante la partida, si más unidades italianas que enemigas están destruidas, obtienes una degradación de 1 a todos tus chequeos de moral. Pero en caso de empate o de haber destruido más unidades que tu enemigo, obtienes una bonificación de 1 a todos tus chequeos de moral.',
      },
      nota:
        'Solo puede reclutar apoyo divisional italiano (el que lleva la bandera italiana en su descripción). El resto de su bando no puede reclutar ese apoyo.',
      refs: [{ doc: 'gce', page: 5 }],
    },
    {
      id: 'popular',
      bando: 'republicano',
      etiqueta: 'Republicano',
      nombre: 'Ejército Popular de la República',
      resumen: 'Comisario político gratuito.',
      peloton: {
        n: 'Comisario',
        t: 'Si lo deseas, puedes desplegar gratuitamente un comisario político. Sus reglas se encuentran en el reglamento de V for Victory.',
      },
      faccion: {
        n: 'Regla de facción',
        t: 'El PDF no incluye el texto de esta regla: en el original aparece únicamente un punto («Regla especial de facción .»). Consulta la última versión del suplemento con su autor antes de usarla.',
      },
      refs: [{ doc: 'gce', page: 6 }],
    },
    {
      id: 'anarquistas',
      bando: 'republicano',
      etiqueta: 'Republicano',
      nombre: 'Milicias y sindicatos (anarquistas)',
      resumen: 'Cobertura pesada temporal y disparos sin marcador de Fuego.',
      peloton: {
        n: 'Parapetarse',
        t: 'Al inicio del turno, puedes lanzar 1D12 y si obtienes éxito, una de tus unidades a tu elección contará como en cobertura pesada hasta el inicio del siguiente turno. No se pueden beneficiar unidades de apoyo divisional y la cobertura pesada no se puede acumular si la unidad ya se beneficiara de ella.',
      },
      faccion: {
        n: 'Sigilo',
        t: 'Una vez por turno, al inicio del turno y antes de jugar carta de acción, puedes lanzar 3D8. Por cada éxito, no colocarás un marcador de fuego tras una acción de disparo de las unidades que disparen durante el turno. No pueden beneficiarse de esta regla las unidades de apoyo divisional.',
      },
      refs: [{ doc: 'gce', page: 6 }],
    },
    {
      id: 'comunistas',
      bando: 'republicano',
      etiqueta: 'Republicano',
      nombre: 'Milicias y sindicatos (comunistas)',
      resumen: 'Refuerzos gratis y sacrificio de un soldado para superar un chequeo de moral.',
      peloton: {
        n: 'Columnistas',
        t: 'A la hora de reunir tu banda, puedes añadir gratuitamente una estrella de refuerzos a tu fuerza.',
      },
      faccion: {
        n: 'Purga',
        t: 'Una vez por turno, a la hora de realizar un chequeo de moral con una unidad, puedes decidir lanzar 1D12 y si obtienes un éxito, puedes sacrificar a un soldado de esa misma unidad para superar automáticamente el chequeo y quitar todos los marcadores de estrés que tenga dicha unidad. Esta regla no se puede utilizar con unidades de apoyo divisional.',
      },
      refs: [{ doc: 'gce', page: 7 }],
    },
    {
      id: 'bri',
      bando: 'republicano',
      etiqueta: 'Republicano',
      nombre: 'Brigadas Internacionales',
      resumen: 'Reportero de guerra que añade 1D6 a los disparos y disparos de reacción sin penalización.',
      peloton: {
        n: 'Cronistas',
        t: 'Si lo deseas, puedes desplegar gratuitamente un reportero de guerra. A su lado, una unidad por turno añade 1D6 a todos sus disparos. No se benefician las unidades de apoyo divisional.',
      },
      faccion: {
        n: 'Voluntarios',
        t: 'Una vez por turno, antes de resolver un disparo de reacción, puedes lanzar 1D12 y si obtienes éxito, el disparo se resuelve sin la penalización que comporta este tipo de disparos. No se benefician de esta regla unidades de apoyo divisional.',
      },
      refs: [{ doc: 'gce', page: 8 }],
    },
    {
      id: 'asalto',
      bando: 'republicano',
      etiqueta: 'Republicano',
      nombre: 'Guardia de Asalto',
      resumen: 'Gana los empates en asalto y reparte estrés antes de jugar cartas.',
      peloton: {
        n: 'Tenaces',
        t: 'Si uno de tus equipos participa en un asalto que termine en empate, se te considerará el ganador, aunque fueras el atacante.',
      },
      faccion: {
        n: 'Respeto',
        t: 'Una vez por turno, antes de jugar cualquier carta de activación, lanza 1D12, si tienes éxito, coloca un marcador de estrés a una unidad enemiga a M o menos de cualquier unidad de Guardia de Asalto, pero no de apoyo divisional.',
      },
      refs: [{ doc: 'gce', page: 8 }],
    },
    {
      id: 'guardiacivil',
      bando: 'compartida',
      etiqueta: 'Compartida',
      nombre: 'Guardia Civil',
      resumen: '+1 a los dados de ataque si recibes un asalto, y acciones extra tras una acción enemiga.',
      peloton: {
        n: 'Orgullosos',
        t: 'Si recibes un asalto, obtienes un bonificador de +1 a tus dados de ataque.',
      },
      faccion: {
        n: 'Control',
        t: 'Una vez por turno, tras la resolución de una acción enemiga, lanza 1D12. Si tienes éxito, elige una unidad para realizar cualquier acción. No se pueden elegir unidades de apoyo divisional.',
      },
      nota:
        'Puede luchar en cualquiera de los dos bandos, pero solo puede reclutar apoyo divisional del bando con el que juega.',
      refs: [{ doc: 'gce', page: 9 }],
    },
    {
      id: 'civiles',
      bando: 'compartida',
      etiqueta: 'Compartida',
      nombre: 'Civiles armados',
      resumen: 'Marcador de camuflaje y reducción del apoyo del escenario.',
      peloton: {
        n: 'Conocimiento del terreno',
        t: 'Una vez durante cada turno, después de jugar y revelar una carta de activación, puedes lanzar 1D8. Si tienes éxito, puedes poner un marcador de camuflaje a un equipo situado completamente en cobertura pesada o en un edificio.',
      },
      faccion: {
        n: 'Emboscada',
        t: 'Después de elegir escenario, puedes optar por reducir hasta la mitad el número de apoyos que el escenario otorga (redondeando hacia abajo). No tienen acceso a apoyo divisional.',
      },
      refs: [{ doc: 'gce', page: 9 }],
    },
  ],

  secciones: [
    {
      titulo: 'Cómo se usa el suplemento',
      html: `<ul>
        <li>Necesitas el reglamento oficial de V for Victory: el suplemento solo añade lo específico de la Guerra Civil.</li>
        <li>Primero se elige <b>bando</b> (franquista o republicano) y después la <b>fuerza</b> dentro de ese bando.</li>
        <li>Cada fuerza tiene una regla especial de pelotón y una regla especial de facción.</li>
        <li>El reclutamiento es genérico y común a todos; el <b>apoyo divisional</b> no: un bando no puede usar el del contrario.</li>
      </ul>
      <div class="refs"><strong>Fuente:</strong> <a href="../vforvictory gce v3.pdf#page=2" target="_blank" rel="noopener">Supl. GCE p. 2 ↗</a></div>`,
    },
    {
      titulo: 'Reclutamiento',
      html: `<ul>
        <li><b>Armas de apoyo:</b> puedes eliminar una figura para reemplazarla por 1 LMG. Cualquier número de figuras con SMG pueden cambiarse por fusiles; también puedes eliminar una figura para cambiar 2 fusiles por SMG.</li>
        <li><b>Equipo de reconocimiento:</b> va montado en un coche, con la regla especial <i>reconocimiento</i>, blindaje 0, <i>descubierto</i> y transporte 4.</li>
        <li><b>Experiencia:</b> puedes mejorar a élite tus escuadras principales y equipos de armas de apoyo (no el apoyo divisional) por 3 puntos. O bien convertir la unidad en reclutas: en ese caso la escuadra 3 (armas de apoyo) es gratuita.</li>
        <li><b>Apoyo divisional:</b> solo del bando propio. El Corpo Truppe Volontarie únicamente puede reclutar el apoyo italiano; la Guardia Civil, el del bando con el que luche.</li>
        <li><b>Iniciativa:</b> en el desempate de iniciativa, el jugador del bando nacional puede repetir la tirada y quedarse con el segundo resultado.</li>
      </ul>
      <div class="refs"><strong>Fuente:</strong> <a href="../vforvictory gce v3.pdf#page=10" target="_blank" rel="noopener">Supl. GCE p. 10 ↗</a></div>`,
    },
    {
      titulo: 'Nota del autor',
      html: `<p>Suplemento gratuito, creado por Magnuscapo para Irregulares Plan B (asociación de wargames de Barcelona) en septiembre de 2026, con la colaboración de Caliga. No busca ningún beneficio económico y se invita a readaptarlo libremente.</p>`,
    },
  ],
};
