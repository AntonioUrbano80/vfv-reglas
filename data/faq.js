/* Preguntas frecuentes de mesa, con respuesta corta y cita a la página del PDF.
   Fuente: V for Victory, reglamento básico (Studio Tomahawk, 2024). */

window.VFV_FAQ = [
  {
    id: 'retirada-reactivo-panico',
    cat: 'Reacciones',
    q: 'Durante una retirada Fall Back recibo fuego reactivo y paso de suprimido a pánico: ¿qué hago?',
    plain: 'retirada retroceder fall back falling back fuego reactivo reacciono disparandome dispandome suprimido pinned panico panicked interrumpir movimiento recuperacion moral estres',
    status: 'Resolución combinada: reglamento y FAQ oficial 2025',
    html: `<p><b>Si era una acción Fall Back, el disparo reactivo es posible. Si te deja panicked, la retirada se interrumpe donde está el líder y reagrupas allí a los supervivientes.</b></p>
      <ol>
        <li>El rival declara la reacción en un punto del recorrido y resuelve el disparo desde esa posición.</li>
        <li>Aplica bajas y Estrés. Si el ataque te hace pasar de <b>pinned (suprimido/fijado)</b> a <b>panicked (pánico)</b>, descarta el Estrés al bajar de nivel.</li>
        <li><b>No completes los 2S.</b> La regla de fuego reactivo detiene el movimiento cuando provoca pinned o panicked. Reagrupa la unidad alrededor de la posición actual del líder.</li>
        <li><b>No apliques la recuperación automática de moral de una retirada completada.</b> Esta conclusión combina la interrupción del movimiento con los requisitos de Fall Back; no es una respuesta literal de la FAQ sobre este caso concreto.</li>
        <li><b>No hay chequeo inmediato por el Estrés sobrante del mismo evento que causó el pánico.</b> Se ignora. Un evento posterior que fuera a causar Estrés sí obliga a chequear; fallarlo elimina al equipo.</li>
      </ol>
      <p>Si puede recibir otra orden y conserva una acción, la unidad puede intentar <b>Rally</b> o una nueva <b>Fall Back</b>. Entrar en pánico no la elimina automáticamente.</p>
      <div class="note"><b>Antes de aplicar:</b> esta respuesta presupone una acción voluntaria <b>Fall Back</b> de un equipo de infantería. La FAQ excluye el fuego reactivo contra una unidad que huye o se retira tras un asalto. Confirma también que «suprimido» significa <b>pinned</b>: <b>shaken</b> es otro nivel distinto.</div>`,
    refs: [{ doc: 'crb', page: 39 }, { doc: 'crb', page: 41 }, { doc: 'crb', page: 43 }, { doc: 'crb', page: 44 }, { doc: 'e43', page: 57 }, { doc: 'e43', page: 58 }],
    evidence: [
      { label: 'Regla expresa: interrupción', text: 'Fuego reactivo: si el ataque provoca pinned o panicked, termina el movimiento y se reagrupa alrededor del líder en su posición actual. Paráfrasis del original.', ref: { doc: 'crb', page: 39 } },
      { label: 'Regla expresa: Fall Back', text: 'La retirada exige recorrer 2S; tras el movimiento, el líder debe quedar a más de L de todos los enemigos visibles y detectados para recuperar un nivel de moral. El recuadro confirma que puede recibir fuego reactivo y que echarse cuerpo a tierra cancela la acción sin mejorar la moral. Paráfrasis.', ref: { doc: 'crb', page: 41 } },
      { label: 'Aclaración oficial: Estrés sobrante', text: 'Cuando un evento causa panicked, se ignora el Estrés excedente de ese evento. El chequeo corresponde al siguiente evento que cause Estrés. Paráfrasis de la FAQ.', ref: { doc: 'e43', page: 57 } },
      { label: 'Límite de aplicación: huida y retirada tras asalto', text: 'La FAQ no permite reaccionar contra una unidad que huye ni contra una que se retira tras un asalto; sí permite reaccionar contra un redespliegue. Paráfrasis.', ref: { doc: 'e43', page: 58 } },
    ],
    related: ['of-panicked-estres-sobrante', 'panicked-que-hace', 'of-reactivo-huida', 'subir-moral'],
  },
  /* ============ TURNO Y CARTAS ============ */
  {
    id: 'acciones-max',
    cat: 'Turno y cartas',
    q: '¿Cuántas acciones puede hacer una unidad por turno?',
    plain: 'dos acciones como maximo por unidad y turno, aunque la carta de activacion de mas ordenes, las sobrantes se pierden',
    html: `<p><b>Dos como máximo</b>, aunque la carta dé tres o cuatro órdenes del mismo tipo. Las órdenes
      sobrantes se pierden. Por eso conviene dirigir las cartas a una escuadra o al comandante, que reparten
      las órdenes entre varias unidades.</p>`,
    refs: [{ doc: 'crb', page: 20 }],
  },
  {
    id: 'dos-ordenes-iguales',
    cat: 'Turno y cartas',
    q: '¿Puedo dar dos órdenes del mismo tipo a la misma unidad?',
    plain: 'si, dos ordenes del mismo tipo, por ejemplo dos Move, gastan dos acciones',
    html: `<p>Sí. Las dos órdenes pueden venir de la misma carta y ser del mismo tipo (dos <b>Move</b>
      = avanzar y volver a avanzar). Cada orden gastada consume una de las dos acciones de la unidad.</p>`,
    refs: [{ doc: 'crb', page: 23 }],
  },
  {
    id: 'comandante-accion-libre',
    cat: 'Turno y cartas',
    q: '¿El comandante está obligado a usar su acción libre?',
    plain: 'no esta obligado, pero la accion libre se consume igualmente y hay que marcarla, un comandante desactivado no puede ser objetivo de una carta',
    html: `<p>No está obligado, pero la acción <b>se consume igual</b> y hay que marcarla. Un comandante
      sin acciones (desactivado) <b>no puede ser objetivo de una carta</b>, así que piensa cuándo gastarlo.</p>`,
    refs: [{ doc: 'crb', page: 20 }],
  },
  {
    id: 'fin-fase-activacion',
    cat: 'Turno y cartas',
    q: '¿Cuándo termina la fase de activación?',
    plain: 'cuando todas las unidades de la mesa estan desactivadas o cuando los jugadores no tienen mas cartas en la mano',
    html: `<p>Al final de la fase en que se dé una de estas dos condiciones: <b>todas las unidades de la
      mesa están desactivadas</b> o <b>los jugadores se quedan sin cartas</b> en la mano.</p>
      <p>Si un jugador no puede activar ninguna unidad mientras el rival sí, <b>sigue jugando cartas</b>:
      pueden desencadenar eventos aleatorios.</p>`,
    refs: [{ doc: 'crb', page: 22 }],
  },
  {
    id: 'recuperar-carta',
    cat: 'Turno y cartas',
    q: '¿Cómo recupero una carta que ya he jugado?',
    plain: 'en vez de resolver la carta, descartas la carta jugada sin asignar unidades y otra carta mas de la mano, recuperas una del descarte',
    html: `<p>En lugar de resolver tu carta: descartas la carta jugada <b>sin asignar órdenes a ninguna
      unidad</b>, descartas <b>otra carta más</b> de la mano y recuperas <b>una carta de tu pila de descartes</b>.
      Neto: pierdes dos y recuperas una.</p>`,
    refs: [{ doc: 'crb', page: 22 }],
  },
  {
    id: 'empate-iniciativa',
    cat: 'Turno y cartas',
    q: '¿Quién va primero si los dos jugamos cartas con la misma Iniciativa?',
    plain: 'decide el jugador con la carta de Iniciativa boca arriba; si resuelve primero gira la carta, si cede no; despues tira 1d12 en la tabla de eventos',
    html: `<p>Decide el jugador cuya facción está <b>boca arriba en la carta de Iniciativa</b>:</p>
      <ul>
        <li>Si <b>resuelve primero</b>, gira la carta de Iniciativa para mostrar la otra cara.</li>
        <li>Si <b>cede</b> el paso al rival, la carta se queda como estaba.</li>
      </ul>
      <p>En ambos casos, tras resolverse las dos cartas, <b>quien tiene la carta de Iniciativa tira 1D12</b>
      en la tabla de eventos aleatorios.</p>`,
    refs: [{ doc: 'crb', page: 22 }],
  },
  {
    id: 'cartas-mano',
    cat: 'Turno y cartas',
    q: '¿Se roban cartas de activación de un mazo?',
    plain: 'no hay mazo de activacion, las siete cartas estan siempre en la mano y se recuperan al inicio de cada turno',
    html: `<p>No hay mazo. Cada jugador tiene sus <b>7 cartas de activación en la mano desde el inicio del
      turno</b> y las recupera todas al empezar el turno siguiente. Las que se gastan se descartan y vuelven
      a la mano en la preparación.</p>
      <p>La <b>Habilidad Especial</b> se usa una vez por turno y se recupera al turno siguiente.</p>`,
    refs: [{ doc: 'crb', page: 19 }, { doc: 'crb', page: 15 }],
  },
  {
    id: 'ordenes-sobrantes',
    cat: 'Turno y cartas',
    q: 'Me sobran órdenes de la carta, ¿puedo guardarlas para luego?',
    plain: 'no, las ordenes sobrantes se pierden; no se acumulan de una carta a otra ni de un turno a otro',
    html: `<p>No. Las órdenes que no puedas usar <b>se pierden</b>: no se acumulan de una carta a otra ni
      de un turno a otro. Es la razón de peso para usar la escuadra o el comandante como objetivo de la carta.</p>`,
    refs: [{ doc: 'crb', page: 20 }],
  },

  /* ============ MOVIMIENTO ============ */
  {
    id: 'cuanto-muevo',
    cat: 'Movimiento',
    q: '¿Cuánto avanza y cuánto corre una unidad?',
    plain: 'avanzar advance una regla S, correr run dos reglas S; correr solo equipos a pie, nunca vehiculos',
    html: `<p><b>Advance = 1S</b> (10 cm) y <b>Run = 2S</b> (20 cm). Solo pueden correr los equipos
      a pie; <b>los vehículos nunca corren</b>.</p>`,
    refs: [{ doc: 'crb', page: 23 }, { doc: 'crb', page: 25 }],
  },
  {
    id: 'correr-restricciones',
    cat: 'Movimiento',
    q: '¿Qué impide correr?',
    plain: 'el terreno abrupto, los obstaculos lineales que no se pueden cruzar, el bosque denso y las armas pesadas cumbersome',
    html: `<p>No se puede correr:</p>
      <ul>
        <li>Con un equipo que lleve un arma <b>Cumbersome</b>.</li>
        <li>Atravesando <b>terreno abrupto</b> o <b>bosque denso</b>.</li>
        <li>Cruzando <b>obstáculos lineales</b> que no se puedan cruzar corriendo.</li>
        <li>A través de figuras amigas de otras unidades (solo puedes cruzar las de tu propio equipo).</li>
      </ul>`,
    refs: [{ doc: 'crb', page: 25 }, { doc: 'crb', page: 26 }],
  },
  {
    id: 'quitar-marcador-fuego',
    cat: 'Movimiento',
    q: '¿Cuándo desaparece el marcador de Fuego?',
    plain: 'cuando la unidad se mueve al menos S de su posicion anterior; en infanteria se mide por el lider de equipo',
    html: `<p>Cuando el movimiento aleja a la unidad <b>al menos S</b> de su posición anterior. En infantería
      se mide con la posición inicial y final del <b>líder de equipo</b>. También desaparece al retirarse por
      fuego reactivo si se aleja esa distancia.</p>`,
    refs: [{ doc: 'crb', page: 25 }],
  },
  {
    id: 'coherencia-movimiento',
    cat: 'Movimiento',
    q: '¿Tengo que mantener la unidad cohesionada al mover?',
    plain: 'si, al terminar el movimiento todas las figuras deben estar a S o menos del lider de equipo',
    html: `<p>Sí: al terminar el movimiento, <b>todas las figuras deben quedar a S o menos del líder de
      equipo</b>. No se mide figura a figura, pero no pueden quedar al otro lado de un obstáculo
      infranqueable respecto al líder.</p>`,
    refs: [{ doc: 'crb', page: 25 }],
  },
  {
    id: 'cruzar-amigos',
    cat: 'Movimiento',
    q: '¿Puedo atravesar mis propias figuras?',
    plain: 'avanzando si puedes cruzar infanteria amiga; corriendo no, salvo las figuras de tu propio equipo; nunca puedes cruzar vehiculos',
    html: `<p><b>Avanzando</b> puedes cruzar libremente infantería amiga. <b>Corriendo</b> solo puedes cruzar
      las figuras de tu propio equipo. En ningún caso puedes <b>cruzar vehículos</b> (ni amigos ni enemigos)
      ni contactar con el enemigo.</p>`,
    refs: [{ doc: 'crb', page: 25 }],
  },

  /* ============ DETECCIÓN ============ */
  {
    id: 'spotting-tirada',
    cat: 'Detección y visión',
    q: '¿Hay que tirar dados para detectar al enemigo?',
    plain: 'no se tira ningun dado ni cuesta accion: se mira la distancia y las columnas de deteccion',
    html: `<p>No. La detección <b>no cuesta acción y no se tira ningún dado</b>: se comprueba la distancia
      y se aplican los modificadores de columna. Cualquier jugador puede comprobarla en cualquier momento.</p>`,
    refs: [{ doc: 'crb', page: 28 }],
  },
  {
    id: 'spotting-distancia',
    cat: 'Detección y visión',
    q: '¿A qué distancia se detecta al enemigo?',
    plain: 'por defecto a 3L, 90 cm; nunca menos de M, 15 cm, y con suficientes bonificaciones se le ve en toda la mesa',
    html: `<p>Por defecto a <b>3L (90 cm)</b>. Los modificadores mueven la columna a izquierda o derecha
      sobre <b>M · L · 2L · 3L · &gt;3L</b>:</p>
      <ul>
        <li>Nunca se detecta a menos de <b>M (15 cm)</b>: a esa distancia se ve siempre.</li>
        <li>Si la columna pasa de la última casilla, se detecta <b>en toda la mesa</b>.</li>
      </ul>`,
    refs: [{ doc: 'crb', page: 28 }, { doc: 'crb', page: 29 }],
  },
  {
    id: 'spotting-una-figura',
    cat: 'Detección y visión',
    q: 'Si veo una sola figura, ¿veo toda la unidad?',
    plain: 'si, si el lider detecta una figura de la unidad enemiga, toda la unidad cuenta como detectada',
    html: `<p>Sí. Si el líder detecta <b>una figura</b> del enemigo, <b>toda su unidad</b> cuenta como
      detectada. Un soldado mal colocado delata al resto.</p>`,
    refs: [{ doc: 'crb', page: 28 }],
  },
  {
    id: 'spotting-vehiculo',
    cat: 'Detección y visión',
    q: '¿Los vehículos son más fáciles de ver?',
    plain: 'si, detectar un vehiculo da dos columnas a la derecha; un marcador de fuego tambien da dos columnas a la derecha',
    html: `<p>Sí: detectar un <b>vehículo</b> da <b>▲2 columnas</b>, igual que si la unidad tiene un
      <b>marcador de Fuego</b> (disparar delata la posición).</p>`,
    refs: [{ doc: 'crb', page: 29 }],
  },
  {
    id: 'spotting-camuflaje',
    cat: 'Detección y visión',
    q: '¿Cuánto cuesta ver una unidad camuflada?',
    plain: 'una unidad camuflada impone tres columnas a la izquierda, y no se acumula con la penalizacion de equipo de dos figuras',
    html: `<p><b>▼3 columnas</b>. Es la penalización más dura de la tabla de detección. Solo se aplica si el
      escenario lo indica y a quien corresponda.</p>`,
    refs: [{ doc: 'crb', page: 29 }],
  },
  {
    id: 'spotting-amigos',
    cat: 'Detección y visión',
    q: '¿Tengo que detectar a mis propias unidades?',
    plain: 'no, tu fuerza siempre sabe donde estan sus unidades amigas',
    html: `<p>No. Tu fuerza <b>siempre sabe dónde están sus unidades</b>. Si el líder tiene línea de visión
      a una unidad amiga, se ven mutuamente sin comprobar nada.</p>`,
    refs: [{ doc: 'crb', page: 28 }],
  },
  {
    id: 'vision-bloqueo',
    cat: 'Detección y visión',
    q: '¿Qué bloquea la línea de visión?',
    plain: 'los edificios, los vehiculos al menos tan altos como quien mira y los obstaculos lineales al menos tan altos como la figura',
    html: `<p>Bloquean la visión por completo:</p>
      <ul>
        <li>Los <b>edificios</b>.</li>
        <li>Los <b>vehículos</b> (amigos o enemigos) al menos tan altos como quien mira.</li>
        <li>Los <b>obstáculos lineales</b> al menos tan altos como la figura que intenta ver.</li>
      </ul>
      <p>La <b>línea de fuego</b> es además bloqueada por figuras y por áreas de terreno al menos tan altas
      como la figura, en cuanto la línea cruza <b>más de 2S</b> de ese terreno.</p>`,
    refs: [{ doc: 'crb', page: 28 }],
  },

  /* ============ DISPARO ============ */
  {
    id: 'cuando-disparo',
    cat: 'Disparo',
    q: '¿Cuándo puede disparar una unidad?',
    plain: 'con una orden Engage, o en fuego reactivo si le quedan acciones; el objetivo debe estar detectado y en linea de fuego',
    html: `<p>Con una orden <b>Engage</b> (acción Fire), o con <b>fuego reactivo</b> si le quedan acciones.
      En ambos casos el objetivo debe estar <b>detectado</b> y en la <b>línea de fuego</b> del líder.
      Puedes ver a alguien y no poder dispararle.</p>`,
    refs: [{ doc: 'crb', page: 30 }, { doc: 'crb', page: 24 }],
  },
  {
    id: 'quien-aporta-dados',
    cat: 'Disparo',
    q: '¿Qué figuras de la unidad aportan dados al disparo?',
    plain: 'solo las figuras cuyo arma alcanza al objetivo y que tienen linea de fuego a alguna figura enemiga',
    html: `<p>Solo las figuras cuyo <b>arma tiene alcance</b> hasta el objetivo y que tienen <b>línea de
      fuego</b> a al menos una figura enemiga. Las demás no suman dados. La distancia se mide desde el
      líder hasta la figura enemiga más cercana.</p>`,
    refs: [{ doc: 'crb', page: 30 }],
  },
  {
    id: 'salvacion-dado',
    cat: 'Disparo',
    q: '¿Qué dado tiro para salvar los impactos?',
    plain: 'd8 en cualquier situacion normal, d12 en cobertura pesada, d12 repetible en fortificaciones y d6 si corres campo a traves bajo fuego reactivo',
    html: `<table>
        <tr><th>Situación</th><th>Dado</th></tr>
        <tr><td>Corriendo campo a través (fuego reactivo)</td><td>d6</td></tr>
        <tr><td>Normal</td><td><b>d8</b></td></tr>
        <tr><td>Cobertura pesada</td><td>d12</td></tr>
        <tr><td>Fortificaciones</td><td>d12 repetible</td></tr>
      </table>
      <p>Cada éxito anula un impacto.</p>`,
    refs: [{ doc: 'crb', page: 31 }],
  },
  {
    id: 'lider-ultimo',
    cat: 'Disparo',
    q: '¿Puedo eliminar al líder de equipo?',
    plain: 'no, el lider de equipo siempre se retira el ultimo; si es la unica figura a la que se puede quitar, se cambia por otra figura de la unidad',
    html: `<p>No. La figura del <b>líder de equipo siempre se retira la última</b>. Si es la única figura a
      la que se podría quitar como baja, se elige otra figura de la unidad, se pone en su lugar y se retira
      esa otra.</p>`,
    refs: [{ doc: 'crb', page: 32 }],
  },
  {
    id: 'supresion-mata',
    cat: 'Disparo',
    q: '¿El fuego de supresión causa bajas?',
    plain: 'no causa bajas, pero provoca estres: uno por recibir algun impacto y uno mas por cada impacto no cancelado; la cobertura no se aplica',
    html: `<p><b>No</b>. El fuego de supresión busca romper la moral:</p>
      <ul>
        <li><b>No causa bajas.</b></li>
        <li>Recibe <b>1 de Estrés</b> si sufre al menos un impacto, <b>+1 más por cada impacto no anulado</b>.</li>
        <li>La <b>cobertura no se aplica</b> a la supresión.</li>
      </ul>
      <p>Las armas con regla <b>HE no pueden</b> usar fuego de supresión.</p>`,
    refs: [{ doc: 'crb', page: 30 }, { doc: 'crb', page: 32 }],
  },
  {
    id: 'cuerpo-a-tierra',
    cat: 'Disparo',
    q: '¿Qué es echarse cuerpo a tierra y cuánto cuesta?',
    plain: 'reaccion de una unidad que va a recibir fuego: sufre un punto de estres y el tirador recibe dos burns; dura hasta resolverse la carta',
    html: `<p>Es una <b>reacción del objetivo</b>: la unidad sufre <b>1 punto de Estrés</b> y quien dispara
      recibe <b>▼2</b>. Dura hasta que se resuelve por completo la carta enemiga: si la vuelven a disparar
      con la misma carta, <b>no paga otro Estrés</b>.</p>
      <div class="note">Una unidad <i>pinned</i> o <i>panicked</i> cuenta <b>siempre</b> como echada cuerpo a
      tierra, sin pagar Estrés.</div>`,
    refs: [{ doc: 'crb', page: 30 }, { doc: 'crb', page: 31 }],
  },
  {
    id: 'comandante-dispara',
    cat: 'Disparo',
    q: '¿El comandante puede sumar su disparo al de la unidad que ordena?',
    plain: 'si, el comandante puede usar su accion libre para disparar al mismo tiempo y sumar los dados de su arma, siempre que tenga a tiro al objetivo',
    html: `<p>Sí. Si la unidad dispara por una orden del <b>comandante</b>, este puede usar su <b>acción libre
      para disparar a la vez</b> y sumar los dados de su arma, siempre que tenga el objetivo detectado,
      a alcance y en línea de fuego.</p>`,
    refs: [{ doc: 'crb', page: 31 }],
  },

  /* ============ ANTITANQUE ============ */
  {
    id: 'matar-tanque',
    cat: 'Antitanque',
    q: '¿Cómo destrozo un vehículo?',
    plain: 'disparo antitanque con un arma de factor A B C o D: un d12 para impactar y luego el dado de la tabla de penetracion; mas de 5 destruye',
    html: `<p>Con <b>fuego antitanque</b>: un <b>1d12</b> para impactar y después el dado que salga de cruzar
      el factor del arma (<b>A, B, C o D</b>) con el blindaje del objetivo.</p>
      <ul>
        <li>Resultado <b>mayor que 5</b> → vehículo destruido.</li>
        <li>Resultado <b>exactamente 5</b> → daño ligero.</li>
      </ul>
      <p>El blindaje se reduce en 1 (mínimo 1) al disparar al <b>flanco, la retaguardia o desde arriba</b>.</p>`,
    refs: [{ doc: 'crb', page: 33 }],
  },
  {
    id: 'varios-cañones',
    cat: 'Antitanque',
    q: '¿Varios cañones disparan juntos contra el mismo tanque?',
    plain: 'no, cada arma antitanque se resuelve por separado, con su propia tirada de impacto y penetracion',
    html: `<p>No. Cada <b>arma antitanque dispara por separado</b>: si dos armas disparan al mismo vehículo,
      se resuelven dos veces, una detrás de otra.</p>`,
    refs: [{ doc: 'crb', page: 33 }],
  },
  {
    id: 'daño-ligero',
    cat: 'Antitanque',
    q: '¿Qué es el daño ligero?',
    plain: 'cuando la tirada de penetracion da exactamente 5 se tira el mismo dado en la tabla de daño ligero: desactivado, shaken, pierde arma secundaria, inmovilizado, pierde arma principal o destruido',
    html: `<p>Cuando la tirada de penetración da <b>exactamente 5</b>, se vuelve a tirar el mismo dado en la
      tabla de daño ligero: 1 desactivado, 2 shaken, 3 pierde arma secundaria, 4 inmovilizado,
      5 pierde arma principal, <b>6+ destruido</b>.</p>
      <p>Si el efecto ya no se puede aplicar (por ejemplo, ya está inmovilizado), recibe <b>1 de Estrés</b>.</p>`,
    refs: [{ doc: 'crb', page: 39 }],
  },
  {
    id: 'infanteria-contra-vehiculo',
    cat: 'Antitanque',
    q: '¿Puede la infantería disparar a un vehículo con sus fusiles?',
    plain: 'si, contra vehiculos ligeros de blindaje 0 1 o 2 con armas de factor E F o G, siguiendo el procedimiento de armas ligeras contra vehiculos ligeros',
    html: `<p>Sí, contra <b>vehículos ligeros</b> (blindaje <b>0, 1 o 2</b>) y con armas de factor
      <b>E, F o G</b>. Se dispara como fuego antipersonal y con los impactos se tira el dado de la tabla:
      <b>3 impactos</b> para empezar, boost por cada impacto extra y burn por cada uno que falte.</p>`,
    refs: [{ doc: 'crb', page: 34 }],
  },

  /* ============ ASALTO ============ */
  {
    id: 'quien-asalta',
    cat: 'Asalto',
    q: '¿Qué unidades pueden lanzar un asalto?',
    plain: 'solo unidades confident o shaken; pinned y panicked no pueden, y los vehiculos tampoco asaltan',
    html: `<p>Solo las unidades <b>confident o shaken</b>. Las <b>pinned</b> y <b>panicked</b> no pueden
      (solo gastar acciones Tactical). Los <b>vehículos no asaltan</b>, aunque sí pueden ser asaltados.</p>`,
    refs: [{ doc: 'crb', page: 35 }],
  },
  {
    id: 'gana-asalto',
    cat: 'Asalto',
    q: '¿Gana el asalto quien causa más bajas?',
    plain: 'no, gana quien consigue mas impactos, no quien causa mas bajas; en empate gana el defensor',
    html: `<p>No. Gana <b>quien consigue más impactos</b>, no quien causa más bajas. Los impactos se salvan
      después con 1d8, así que puedes ganar el combate y sufrir más bajas. <b>En empate gana el defensor.</b></p>`,
    refs: [{ doc: 'crb', page: 36 }],
  },
  {
    id: 'defensor-huye',
    cat: 'Asalto',
    q: '¿Puede el defensor huir antes de que le asalten?',
    plain: 'si, el defensor puede retirarse dos reglas S ignorando el terreno, pero acaba con tres de estres y desactivado',
    html: `<p>Sí. Cuando se declara el asalto, el defensor puede <b>retirarse 2S</b> ignorando el terreno
      (si saca alguna figura de la mesa, la unidad se elimina). Después:</p>
      <ul>
        <li>El asaltante tira <b>d6</b> y repite mientras acierte: cada éxito es <b>1 baja y 1 Estrés</b>.</li>
        <li>El defensor acaba con <b>3 de Estrés</b> y <b>desactivado</b>.</li>
      </ul>
      <p>El asalto termina ahí: no hay cuerpo a cuerpo.</p>`,
    refs: [{ doc: 'crb', page: 36 }],
  },
  {
    id: 'reclutas-asalto',
    cat: 'Asalto',
    q: '¿Pueden asaltar los reclutas?',
    plain: 'si, pero antes de resolver el asalto deben tirar un d8 y solo si tienen exito se lanzan; si fallan pierden la accion',
    html: `<p>Sí, pero <b>tiran 1d8 antes de resolver</b>: con éxito se lanzan al ataque; si fallan,
      <b>pierden la acción</b> por indecisión o miedo.</p>`,
    refs: [{ doc: 'crb', page: 35 }],
  },
  {
    id: 'estres-asalto',
    cat: 'Asalto',
    q: '¿Cuánto Estrés se lleva un asalto?',
    plain: 'el ganador un punto de estres por equipo y el perdedor dos por equipo; ademas todos quedan desactivados',
    html: `<p>Al final del cuerpo a cuerpo: <b>ganador 1 de Estrés por equipo</b> y <b>perdedor 2 por equipo</b>.
      Además todos los participantes quedan <b>desactivados</b> (han gastado sus dos acciones del turno).</p>`,
    refs: [{ doc: 'crb', page: 37 }],
  },
  {
    id: 'asaltar-vehiculo',
    cat: 'Asalto',
    q: '¿Cómo se asalta un vehículo?',
    plain: 'el lider llega a contacto con un advance de S o un run de 2S y puede recibir fuego reactivo; luego las figuras se ponen a S, cada una tira 1d8 si tiene anti-tank assault o 1d6 si no, y con tres impactos se tira el dado de penetracion',
    html: `<p>No es un cuerpo a cuerpo: el vehículo no devuelve golpes.</p>
      <ol>
        <li>El <b>líder llega a contacto</b> con un advance de S o un run de 2S. Puede provocar fuego reactivo;
            si se echa cuerpo a tierra o queda pinned/panicked, el asalto se detiene.</li>
        <li>El resto de figuras se coloca a <b>S</b> del líder y en contacto con el vehículo.</li>
        <li>Reserva de dados: <b>1d8</b> por figura con <b>Anti-Tank Assault</b>, <b>1d6</b> el resto.</li>
        <li>Con <b>3 impactos</b> se tira el dado de penetración, con boosts y burns por los impactos de más o de menos.</li>
      </ol>
      <p>Al final el equipo se retira S, recibe 1 de Estrés, marcador de Fuego y queda desactivado.</p>`,
    refs: [{ doc: 'crb', page: 38 }],
  },
  {
    id: 'blindaje-asaltado',
    cat: 'Asalto',
    q: '¿Qué blindaje tiene un vehículo asaltado por infantería?',
    plain: 'baja uno, con minimo uno, porque la infanteria ataca por arriba; un open topped cuenta como blindaje cero',
    html: `<p>La infantería ataca <b>por arriba</b>, así que el blindaje <b>baja 1</b> (mínimo 1). Un vehículo
      <b>open-topped</b> cuenta como <b>blindaje 0</b> frente a un asalto de infantería, sea cual sea su
      blindaje normal.</p>
      <p>El factor AT es <b>F</b> para casi todos los equipos y <b>E</b> para los que tienen
      Anti-Tank Assault.</p>`,
    refs: [{ doc: 'crb', page: 38 }, { doc: 'crb', page: 34 }],
  },
  {
    id: 'varios-asaltan-vehiculo',
    cat: 'Asalto',
    q: '¿Pueden varios equipos asaltar el mismo vehículo?',
    plain: 'si, a la vez; cada uno puede recibir fuego reactivo de una unidad distinta y basta con que uno llegue a contacto para que el asalto se resuelva',
    html: `<p>Sí, <b>a la vez</b>. Cada equipo que asalta puede recibir fuego reactivo de <b>una unidad
      distinta</b>, y <b>basta con que uno de ellos llegue a contacto</b> con el vehículo para que el asalto
      se resuelva. Los dados de todas las unidades participantes <b>se suman</b> en una sola reserva.</p>`,
    refs: [{ doc: 'crb', page: 38 }],
  },
  {
    id: 'vehiculo-tras-asalto',
    cat: 'Asalto',
    q: '¿Queda desactivado el vehículo que recibe un asalto?',
    plain: 'no, el vehiculo defensor no queda desactivado, aunque si puede haber disparado en reactivo gastando una accion',
    html: `<p><b>No.</b> El vehículo defensor <b>no queda desactivado</b> por el asalto, a diferencia de la
      infantería, que acaba desactivada. Eso sí: si reaccionó disparando, <b>gastó una de sus acciones</b>.</p>`,
    refs: [{ doc: 'crb', page: 38 }],
  },

  /* ============ REACTIVO ============ */
  {
    id: 'reactivo-cuantas-veces',
    cat: 'Reacciones',
    q: '¿Cuántas veces puedo disparar en reactivo?',
    plain: 'una accion enemiga solo puede desencadenar un fuego reactivo, asi que eliges una sola unidad; y no puedes reaccionar a otro fuego reactivo',
    html: `<p>Una <b>acción enemiga solo puede desencadenar un fuego reactivo</b>. Si tienes tres unidades
      con línea de fuego al enemigo que se mueve, eliges <b>una</b>. Y <b>nunca</b> puedes reaccionar contra
      otro fuego reactivo.</p>`,
    refs: [{ doc: 'crb', page: 39 }],
  },
  {
    id: 'quien-reacciona',
    cat: 'Reacciones',
    q: '¿Puede reaccionar el jugador que está activo?',
    plain: 'no, solo el jugador inactivo, el que no esta resolviendo la carta, puede disparar en reactivo',
    html: `<p>Solo el <b>jugador inactivo</b>: el que no está resolviendo la carta en ese momento. El jugador
      activo no puede disparar reactivamente, ni siquiera contra el fuego del rival.</p>`,
    refs: [{ doc: 'crb', page: 24 }],
  },

  /* ============ MORAL ============ */
  {
    id: 'subir-moral',
    cat: 'Moral',
    q: '¿Cómo recupero la moral de una unidad?',
    plain: 'con una accion Rally, que es un chequeo de moral, o con Fall Back si acaba lejos del enemigo',
    html: `<p>De dos maneras:</p>
      <ul>
        <li><b>Rally</b>: descarta el Estrés y hace un chequeo de moral; con éxito sube un nivel.</li>
        <li><b>Fall Back</b>: si tras retroceder 2S el líder queda a <b>más de L</b> de todos los enemigos
            visibles y detectados, descarta el Estrés y sube un nivel <b>automáticamente</b>.</li>
      </ul>`,
    refs: [{ doc: 'crb', page: 41 }, { doc: 'crb', page: 44 }],
  },
  {
    id: 'dado-moral',
    cat: 'Moral',
    q: '¿Qué dado se tira en un chequeo de moral?',
    plain: 'd6 si la unidad es recruit, d8 si es trained y d12 si es elite; exito con 5 o mas, con modificadores acumulables',
    html: `<p><b>Recruit d6 · Trained d8 · Elite d12</b>, con éxito a <b>5+</b>. Los modificadores son boost y
      burn <b>acumulables</b>: comandante a M (+1), cobertura pesada (+1), enemigo a M en línea de visión (−1),
      pinned o panicked (−1), más de la mitad de bajas (−1, solo si empezó con 3+).</p>`,
    refs: [{ doc: 'crb', page: 43 }],
  },
  {
    id: 'tercer-estres',
    cat: 'Moral',
    q: '¿Qué pasa al recibir un tercer punto de Estrés?',
    plain: 'no se coge la tercera ficha: la unidad baja un nivel de moral y descarta todas sus fichas de estres',
    html: `<p>No se coge la ficha: la unidad <b>baja un nivel de moral</b> (confident → shaken → pinned →
      panicked) y <b>descarta todas sus fichas de Estrés</b>.</p>`,
    refs: [{ doc: 'crb', page: 43 }],
  },
  {
    id: 'panicked-que-hace',
    cat: 'Moral',
    q: '¿Qué puede hacer una unidad panicked?',
    plain: 'no puede usar acciones de Move ni Engage, solo Tactical, y hace un chequeo de moral cada vez que fuera a recibir estres',
    html: `<p>No puede usar acciones de <b>Move</b> ni <b>Engage</b>: solo le quedan las <b>Tactical</b>
      (Rally, Fall Back, Unlimber). Además:</p>
      <ul>
        <li>Cuenta siempre como echada cuerpo a tierra.</li>
        <li>Hace un <b>chequeo de moral cada vez que fuera a recibir Estrés</b>. Si falla, el equipo huye o
            se rinde (se retira, cuenta como eliminado) y el vehículo es abandonado y queda como pecio.</li>
      </ul>`,
    refs: [{ doc: 'crb', page: 43 }, { doc: 'crb', page: 44 }],
  },
  {
    id: 'perder-partida',
    cat: 'Moral',
    q: '¿Cuándo pierdo la partida por bajas?',
    plain: 'si al final de un turno has perdido mas de la mitad de las figuras de tu fuerza; un vehiculo cuenta como una figura y la artilleria solo cuenta por su tripulacion',
    html: `<p>Si al final de un turno has perdido <b>más de la mitad de las figuras</b> de tu fuerza, la
      fuerza se retira y <b>pierdes</b> (el rival obtiene victoria total). Si las dos fuerzas se rinden
      a la vez, empate.</p>
      <p>Un <b>vehículo cuenta como 1 figura</b>; las piezas de artillería no cuentan, solo su tripulación.</p>`,
    refs: [{ doc: 'crb', page: 44 }],
  },
  {
    id: 'unidad-eliminada-estres',
    cat: 'Moral',
    q: '¿Qué pasa cuando eliminan a una unidad amiga cerca?',
    plain: 'todas las unidades amigas a S o menos reciben un punto de estres inmediatamente',
    html: `<p>Todas las unidades amigas <b>a S o menos</b> de la eliminada reciben <b>1 de Estrés</b>
      inmediatamente. Se mide desde el líder del equipo o desde cualquier punto del vehículo destruido.</p>`,
    refs: [{ doc: 'crb', page: 44 }],
  },

  /* ============ TERMINOS ============ */
  {
    id: 'que-es-desactivada',
    cat: 'Reglas generales',
    q: '¿Qué significa que una unidad está «desactivada»?',
    plain: 'que ha gastado sus dos acciones del turno y lleva ficha roja; no puede volver a ser activada ese turno',
    html: `<p>Que ha gastado sus <b>dos acciones</b> del turno y lleva <b>ficha roja</b>. No puede actuar
      más ese turno ni ser objetivo de una carta. Al empezar el turno siguiente se le retira la ficha.</p>`,
    refs: [{ doc: 'crb', page: 9 }, { doc: 'crb', page: 22 }],
  },
  {
    id: 'dados-sin-modificadores',
    cat: 'Reglas generales',
    q: '¿Se suma o resta algo al resultado de los dados?',
    plain: 'no, nunca se modifica el resultado de un dado; lo que cambia es el tipo de dado mediante boost y burn',
    html: `<p><b>Nunca</b>. No hay modificadores al resultado de un dado. Lo que cambia es <b>qué dado
      tiras</b>, con <b>boost</b> (▲ sube un escalón) y <b>burn</b> (▼ baja un escalón). Éxito siempre con 5+.</p>`,
    refs: [{ doc: 'crb', page: 10 }, { doc: 'crb', page: 11 }],
  },
  {
    id: 'boost-burn-netos',
    cat: 'Reglas generales',
    q: 'Si tengo dos boosts y un burn, ¿cómo lo aplico?',
    plain: 'se anulan entre si, asi que quedaria un solo boost; se calcula el neto antes de cambiar dados',
    html: `<p>Se anulan entre sí: <b>2 ▲ + 1 ▼ = 1 ▲</b>. Haz siempre el <b>neto antes de cambiar dados</b>.
      Y recuerda: los boosts suben primero los dados más débiles, los burns bajan primero los más fuertes.</p>`,
    refs: [{ doc: 'crb', page: 11 }],
  },

  /* ============ VEHÍCULOS ============ */
  {
    id: 'cuanto-mueve-vehiculo',
    cat: 'Vehículos',
    q: '¿Cuánto mueve un vehículo?',
    plain: 'ruedas y semiorugas tres reglas, orugas dos reglas; se pueden combinar reglas de distintas longitudes y parar en cualquier punto',
    html: `<p><b>Ruedas 3 reglas, semioruga 3 reglas, orugas 2 reglas.</b> Puedes combinar reglas de
      distintas longitudes (una L y dos S, por ejemplo) y el vehículo puede <b>parar en cualquier punto</b>
      del recorrido, no solo al final.</p>`,
    refs: [{ doc: 'crb', page: 51 }],
  },
  {
    id: 'girar-180',
    cat: 'Vehículos',
    q: '¿Puede un carro girar sin desplazarse?',
    plain: 'las orugas pueden gastar una regla para girar hasta 180 grados sobre su centro, al inicio o al final del movimiento',
    html: `<p>Las <b>orugas</b> sí: gastan <b>una regla</b> de su movimiento para girar hasta <b>180°</b>
      sobre su centro, al principio o al final del movimiento. Los vehículos de ruedas no tienen ese truco.</p>`,
    refs: [{ doc: 'crb', page: 52 }],
  },
  {
    id: 'retroceder',
    cat: 'Vehículos',
    q: '¿Puedo retroceder y luego avanzar en el mismo movimiento?',
    plain: 'si, retroceder cuesta una regla y despues puede volver a avanzar colocando la siguiente regla delante',
    html: `<p>Sí. La marcha atrás cuesta <b>una regla</b> (con 3 reglas solo colocas 2) y, tras la primera
      regla en reversa, la siguiente puede ponerse delante y seguir avanzando.</p>`,
    refs: [{ doc: 'crb', page: 52 }],
  },
  {
    id: 'armas-vehiculo',
    cat: 'Vehículos',
    q: '¿Cuántas armas dispara un vehículo y a cuántos objetivos?',
    plain: 'una primaria y una secundaria, la secundaria solo si tambien dispara la primaria; pueden ser objetivos distintos si ambos estan detectados; la coaxial no dispara con su primaria',
    html: `<p><b>Una primaria y una secundaria</b>. La secundaria solo puede disparar <b>si también dispara
      la primaria</b>. Pueden ser <b>dos objetivos distintos</b> si ambos están detectados. Las armas
      <b>coaxiales</b> no pueden disparar a la vez que la primaria a la que van montadas.</p>`,
    refs: [{ doc: 'crb', page: 54 }],
  },
  {
    id: 'arcos-tiro',
    cat: 'Vehículos',
    q: '¿Qué arco de tiro tiene cada arma de un vehículo?',
    plain: 'casco 45 grados, pintle 360 grados, torreta 45 grados pero se puede girar antes de disparar con una penalizacion',
    html: `<table>
        <tr><th>Montaje</th><th>Arco</th></tr>
        <tr><td>Casco <code>-H-</code></td><td>45°</td></tr>
        <tr><td>Pintle <code>-P-</code></td><td>360°</td></tr>
        <tr><td>Torreta <code>-T-</code></td><td>45°, girable antes de disparar con ▼1</td></tr>
      </table>`,
    refs: [{ doc: 'crb', page: 54 }],
  },
  {
    id: 'vehiculo-destruido-cerca',
    cat: 'Vehículos',
    q: 'Han destruido un vehículo junto a mi infantería, ¿qué les pasa?',
    plain: 'cada unidad a VS o menos tira un d6 y por cada exito sufre una baja y un estres y vuelve a tirar, encadenando hasta fallar; el vehiculo queda como pecio',
    html: `<p>Cada unidad a <b>VS o menos</b> tira <b>1d6</b>: por cada éxito sufre <b>1 baja y 1 de Estrés</b>
      y <b>vuelve a tirar</b>, encadenando hasta fallar. Es peligroso quedarse pegado a un carro que arde.</p>
      <p>El vehículo queda como <b>pecio</b> y pasa a ser una pieza de terreno.</p>`,
    refs: [{ doc: 'crb', page: 54 }],
  },
  {
    id: 'embarcar-desembarcar',
    cat: 'Vehículos',
    q: '¿Cómo embarco y desembarco tropas?',
    plain: 'ambas son acciones de avance; para embarcar el lider debe estar a S o menos del vehiculo; al desembarcar se coloca el lider en contacto y se mide desde ahi; desembarcar nunca permite asaltar',
    html: `<p>Las dos son <b>acciones de advance</b>:</p>
      <ul>
        <li><b>Embarcar:</b> el líder debe estar a <b>S o menos</b> del vehículo al empezar la acción.</li>
        <li><b>Desembarcar:</b> el líder se coloca en <b>contacto</b> con el vehículo y se mide desde ahí.</li>
      </ul>
      <p><b>Desembarcar nunca permite asaltar</b>: el asalto exige orden Engage.</p>`,
    refs: [{ doc: 'crb', page: 55 }],
  },
  {
    id: 'transporte-destruido',
    cat: 'Vehículos',
    q: '¿Qué pasa si destruyen el transporte con tropas dentro?',
    plain: 'se tira un d6 por cada figura transportada y cada exito es una baja; luego el lider se coloca en contacto, el resto a S, la unidad queda desactivada y baja un nivel de moral',
    html: `<p>Se tira <b>1d6 por cada figura transportada</b> y cada éxito es una <b>baja</b>. Después:</p>
      <ul>
        <li>El líder se coloca en <b>contacto</b> con el vehículo y el resto a <b>S</b> de él.</li>
        <li>La unidad queda <b>desactivada</b>.</li>
        <li>Su <b>moral baja un nivel</b>.</li>
      </ul>`,
    refs: [{ doc: 'crb', page: 55 }],
  },
  {
    id: 'disparar-embarcado',
    cat: 'Vehículos',
    q: '¿Puede disparar la infantería embarcada?',
    plain: 'solo desde un vehiculo open topped y solo con armas sidearm, como mucho la mitad de esas figuras redondeando hacia arriba',
    html: `<p>Solo si el vehículo es <b>open-topped</b> y solo con armas <b>Sidearm</b> (pistolas, subfusiles
      ligeros): como máximo <b>la mitad</b> de esas figuras, redondeando hacia arriba.</p>`,
    refs: [{ doc: 'crb', page: 55 }],
  },
  {
    id: 'escudo-vehiculo',
    cat: 'Vehículos',
    q: '¿Cómo uso un vehículo para cubrir a mi infantería?',
    plain: 'con el lider en contacto, la infanteria hace advance y el vehiculo se activa a la vez para un movimiento de VS, gastando una de sus acciones pero no una orden extra; la proteccion se mide antes de mover',
    html: `<p>Con el <b>líder en contacto</b> con un vehículo amigo, la unidad hace un <b>advance</b> y el
      vehículo se activa a la vez para un movimiento de <b>VS</b>. Gasta una acción del vehículo, pero
      <b>no una orden adicional</b>.</p>
      <p>La cobertura y las líneas de visión se miden <b>antes</b> del movimiento y se mantienen todo el
      trayecto. Si el vehículo muere durante el movimiento, los dos se detienen y la infantería recibe
      <b>1 de Estrés</b>.</p>`,
    refs: [{ doc: 'crb', page: 54 }],
  },
  {
    id: 'terreno-peligroso',
    cat: 'Vehículos',
    q: '¿Qué pasa si un vehículo entra en terreno peligroso?',
    plain: 'tira un d6 y con cinco o mas el vehiculo queda inmovilizado para el resto de la partida',
    html: `<p>Tira <b>1d6</b>: con <b>5 o más</b> el vehículo queda <b>inmovilizado para el resto de la
      partida</b>. Algunos terrenos de la tabla además limitan el movimiento a <b>una regla S</b>.</p>`,
    refs: [{ doc: 'crb', page: 52 }, { doc: 'crb', page: 58 }],
  },

  /* ============ TERRENO Y EDIFICIOS ============ */
  {
    id: 'entrar-edificio',
    cat: 'Terreno y edificios',
    q: '¿Cómo se entra en un edificio?',
    plain: 'solo con una accion de avance, nunca corriendo, y con un extremo de la regla cruzando el umbral; no entran vehiculos ni piezas de artilleria',
    html: `<p>Solo con <b>advance</b>, nunca corriendo, y al final del movimiento <b>un extremo de la regla
      debe cruzar el umbral</b> de puerta, ventana o brecha. Si el área no cabe la unidad, no puede entrar.
      <b>No entran vehículos ni piezas de artillería.</b></p>`,
    refs: [{ doc: 'crb', page: 59 }],
  },
  {
    id: 'disparar-desde-edificio',
    cat: 'Terreno y edificios',
    q: '¿Cuántas figuras pueden disparar desde una casa?',
    plain: 'como maximo el doble del numero de aberturas con linea de vision al objetivo; las armas pesadas deben desplegarse frente a una abertura concreta y los morteros solo desde la azotea',
    html: `<p>Como máximo <b>el doble del número de aberturas</b> con línea de visión al objetivo.
      Las armas pesadas deben <b>desplegarse frente a una abertura concreta</b> y son las únicas que
      disparan por ella. Los morteros solo desde una <b>azotea plana</b>.</p>`,
    refs: [{ doc: 'crb', page: 61 }],
  },
  {
    id: 'disparar-a-edificio',
    cat: 'Terreno y edificios',
    q: 'Hay tres unidades dentro de una casa, ¿cómo reparto los impactos?',
    plain: 'se dispara a un area concreta contando cobertura pesada, y los impactos se asignan de uno en uno de la unidad mayor a la menor, reiniciando el ciclo; el comandante puede ceder su impacto',
    html: `<p>Se declara <b>un área</b> y se resuelve con <b>cobertura pesada</b>. Los impactos se asignan
      <b>de uno en uno, de la unidad mayor a la menor</b>, reiniciando el ciclo cuando todas tienen tantos
      impactos como figuras. El <b>comandante</b> puede ceder su impacto a una unidad con menos impactos
      que figuras.</p>`,
    refs: [{ doc: 'crb', page: 61 }],
  },
  {
    id: 'bunker',
    cat: 'Terreno y edificios',
    q: '¿Cómo se toma un búnker?',
    plain: 'no se le puede disparar, cualquier disparo se resuelve como combate cercano; el asalto frontal pierde automaticamente si los ocupantes no se retiran ni son eliminados, y solo el asalto antitanque puede reventar la puerta',
    html: `<p>Un búnker <b>no puede ser objetivo de una acción de fuego</b>: cualquier disparo contra él se
      resuelve como <b>combate cercano</b>.</p>
      <ul>
        <li><b>Asalto frontal:</b> si los ocupantes no se retiran y no son eliminados, <b>el atacante
            pierde automáticamente</b>.</li>
        <li><b>Asalto por la puerta:</b> solo unidades con <b>Anti-Tank Assault</b>; la puerta se considera
            demolida y, si los ocupantes pierden, <b>se rinden</b>.</li>
      </ul>`,
    refs: [{ doc: 'crb', page: 62 }],
  },
  {
    id: 'cruce-río',
    cat: 'Terreno y edificios',
    q: '¿Se puede cruzar un río corriendo?',
    plain: 'no, una unidad en el rio solo puede hacer advance y los vehiculos no anfibios no cruzan; el rio mide siempre L o mas de ancho',
    html: `<p>No. Un río mide siempre <b>L o más</b> de ancho. Una unidad <b>dentro del río solo puede hacer
      advance</b> y no puede correr para cruzarlo. Los <b>vehículos no anfibios no pueden cruzar</b> ríos.</p>`,
    refs: [{ doc: 'crb', page: 62 }],
  },
  {
    id: 'bocage',
    cat: 'Terreno y edificios',
    q: '¿Se ve a través del bocage?',
    plain: 'no, bloquea la linea de vision; solo ven a traves los vehiculos y las unidades cuyo lider esta en contacto, y solo mientras tienen marcador de fuego; da cobertura pesada',
    html: `<p>El bocage es un obstáculo <b>alto</b>: <b>bloquea la línea de visión</b>. Solo ven a través
      los <b>vehículos</b> y las unidades cuyo <b>líder está en contacto</b> con él, y esas unidades solo
      son visibles <b>mientras tienen marcador de Fuego</b>. Da <b>cobertura pesada</b>.</p>`,
    refs: [{ doc: 'crb', page: 62 }],
  },
  {
    id: 'muro-alto',
    cat: 'Terreno y edificios',
    q: '¿Cómo salto un muro alto?',
    plain: 'el lider en contacto al inicio de un advance se cambia al otro lado y la unidad se reforma a su alrededor; la unidad no puede tener figuras a ambos lados del muro',
    html: `<p>Con el <b>líder en contacto</b> con el muro al inicio de un <b>advance</b>, en vez de moverse
      <b>se le intercambia al otro lado</b> y la unidad se reforma a su alrededor. La unidad <b>no puede
      quedar con figuras a ambos lados</b> del muro.</p>`,
    refs: [{ doc: 'crb', page: 62 }, { doc: 'crb', page: 58 }],
  },

  /* ============ FAQ OFICIAL 2025 ============ */
  {
    id: 'of-todas-las-ordenes',
    cat: 'FAQ oficial 2025',
    q: '¿Estoy obligado a usar todas las órdenes de la carta?',
    plain: 'no, puedes usar solo algunas o ninguna',
    html: `<p>No. Puedes usar <b>solo algunas o ninguna</b>. Las que no uses se pierden.</p>`,
    refs: [{ doc: 'e43', page: 57 }],
  },
  {
    id: 'of-directo-o-supresion',
    cat: 'FAQ oficial 2025',
    q: '¿Espero a ver si el rival se echa cuerpo a tierra antes de elegir fuego directo o de supresión?',
    plain: 'no, se elige al dar la orden, antes de que el rival decida',
    html: `<p>No. El tipo de fuego <b>se elige al dar la orden</b>, antes de que el rival decida echarse
      cuerpo a tierra.</p>`,
    refs: [{ doc: 'e43', page: 57 }],
  },
  {
    id: 'of-coberturas-acumulan',
    cat: 'FAQ oficial 2025',
    q: '¿Se acumulan varias coberturas en la misma línea de fuego?',
    plain: 'si, toda cobertura es acumulativa, tambien en deteccion: dos ligeras y una pesada son cuatro burns',
    html: `<p><b>Sí, toda cobertura es acumulativa</b>, también en detección. Dos coberturas ligeras y una
      pesada a lo largo de la línea son <b>4 burns</b>.</p>`,
    refs: [{ doc: 'e43', page: 57 }],
  },
  {
    id: 'of-bazooka-vehiculo',
    cat: 'FAQ oficial 2025',
    q: '¿Puede dispararse un bazooka desde dentro de un vehículo?',
    plain: 'no, desde un vehiculo solo se disparan armas con la regla sidearm; el bazooka tiene backblast',
    html: `<p>No. Desde dentro de un vehículo solo se disparan armas con la regla <b>Sidearm</b>.
      Un bazooka tiene <b>Backblast</b> y no puede dispararse en un espacio cerrado.</p>`,
    refs: [{ doc: 'e43', page: 57 }, { doc: 'crb', page: 50 }],
  },
  {
    id: 'of-panicked-estres-sobrante',
    cat: 'FAQ oficial 2025',
    q: 'Una unidad panicked recibe Estrés de más, ¿qué pasa?',
    plain: 'no hay chequeo inmediato por el exceso: se ignora y el chequeo llegara en el siguiente evento de estres',
    html: `<p>No hay chequeo inmediato por el exceso: <b>se ignora</b>. El chequeo llega en el siguiente
      evento de estrés de esa unidad.</p>`,
    refs: [{ doc: 'e43', page: 57 }],
  },
  {
    id: 'of-marcadores-por-unidad',
    cat: 'FAQ oficial 2025',
    q: '¿Cuántos marcadores lleva una unidad como máximo?',
    plain: 'tres: moral, activacion y fuego',
    html: `<p><b>Tres</b>: el de moral, el de activación y el de Fuego.</p>`,
    refs: [{ doc: 'e43', page: 57 }],
  },
  {
    id: 'of-reactivo-tras-tierra',
    cat: 'FAQ oficial 2025',
    q: 'Si me echo cuerpo a tierra, ¿puedo disparar reactivamente después?',
    plain: 'no, una vez echado cuerpo a tierra la unidad permanece abajo hasta resolver todas las acciones de la carta',
    html: `<p>No. Al echarte cuerpo a tierra como reacción quedas <b>abajo hasta que se resuelven todas las
      acciones de la carta enemiga</b>.</p>`,
    refs: [{ doc: 'e43', page: 57 }],
  },
  {
    id: 'of-open-topped-mortero',
    cat: 'FAQ oficial 2025',
    q: '¿El open-topped reduce su blindaje contra un mortero?',
    plain: 'no, el blindaje reducido del open topped solo se aplica contra fuego antitanque, no contra morteros',
    html: `<p>No. El blindaje reducido del <b>open-topped</b> solo se aplica contra <b>fuego antitanque</b>,
      no contra morteros ni fuego HE.</p>`,
    refs: [{ doc: 'e43', page: 57 }],
  },
  {
    id: 'of-mortero-transporte',
    cat: 'FAQ oficial 2025',
    q: 'Si un mortero alcanza un transporte, ¿sufren los pasajeros?',
    plain: 'si, la unidad embarcada recibe fuego con la mitad de la reserva de dados, pero puede echarse cuerpo a tierra',
    html: `<p>Sí. La unidad embarcada <b>sí recibe</b>, con <b>la mitad de la reserva de dados</b>, pero
      puede <b>echarse cuerpo a tierra</b>.</p>`,
    refs: [{ doc: 'e43', page: 57 }],
  },
  {
    id: 'of-carta-transporte',
    cat: 'FAQ oficial 2025',
    q: 'Una unidad transportada, ¿recibe órdenes de la carta del vehículo?',
    plain: 'solo si es el transporte dedicado del OOB base; si es apoyo divisionario, la carta es solo del vehiculo',
    html: `<p>Solo si es el <b>transporte dedicado</b> de la Orden de Batalla base. Si es un vehículo de
      <b>Apoyo Divisionario</b>, la carta es solo del vehículo.</p>`,
    refs: [{ doc: 'e43', page: 57 }],
  },
  {
    id: 'of-pinned-reactivo',
    cat: 'FAQ oficial 2025',
    q: '¿Puede una unidad pinned hacer fuego reactivo?',
    plain: 'no, una unidad pinned solo puede hacer rally y fall back',
    html: `<p>No. Una unidad <b>pinned</b> solo puede hacer <b>Rally</b> y <b>Fall Back</b>.</p>`,
    refs: [{ doc: 'e43', page: 58 }],
  },
  {
    id: 'of-objetivo-lider',
    cat: 'FAQ oficial 2025',
    q: '¿Cualquier líder puede tomar un objetivo?',
    plain: 'no, las unidades pinned y panicked no pueden controlar objetivos',
    html: `<p>No. Las unidades <b>pinned</b> y <b>panicked</b> <b>no pueden</b> controlar objetivos.
      Además solo <b>una miniatura</b> puede estar en contacto con el objetivo.</p>`,
    refs: [{ doc: 'e43', page: 58 }, { doc: 'e43', page: 56 }],
  },
  {
    id: 'of-edificio-varias-unidades',
    cat: 'FAQ oficial 2025',
    q: 'Hay varias unidades en un edificio, ¿todas deben echarse cuerpo a tierra?',
    plain: 'si, todas deben echarse cuerpo a tierra para causar los dos burns al tirador',
    html: `<p>Sí. <b>Todas</b> las unidades del área deben echarse cuerpo a tierra para causar los
      <b>2 burns</b> al tirador.</p>`,
    refs: [{ doc: 'e43', page: 58 }],
  },
  {
    id: 'of-descarte-publico',
    cat: 'FAQ oficial 2025',
    q: 'Al recuperar una carta, ¿se muestran las cartas descartadas?',
    plain: 'no, el descarte no es publico; solo la ultima carta jugada queda boca arriba',
    html: `<p>No. El descarte <b>no es público</b>: solo la última carta jugada queda boca arriba.</p>`,
    refs: [{ doc: 'e43', page: 58 }],
  },
  {
    id: 'of-reactivo-huida',
    cat: 'FAQ oficial 2025',
    q: '¿Se puede disparar en reactivo a quien huye o se redespliega?',
    plain: 'contra quien huye o se desengancha no; contra quien se redespliega si',
    html: `<p>Contra quien <b>huye</b> o se <b>desengancha</b>: <b>no</b>. Contra quien <b>se redespliega</b>: <b>sí</b>.</p>`,
    refs: [{ doc: 'e43', page: 58 }],
  },
  {
    id: 'of-at-f-flanco',
    cat: 'FAQ oficial 2025',
    q: 'Un arma con factor AT «F», ¿puede penetrar blindaje 2?',
    plain: 'si, si el disparo es por el flanco o la retaguardia, porque el blindaje baja a 1',
    html: `<p>Sí, si el disparo va por el <b>flanco o la retaguardia</b>: el blindaje baja de 2 a 1 y la
      tabla ya da dado para F contra 1.</p>`,
    refs: [{ doc: 'e43', page: 58 }],
  },
  {
    id: 'of-escuadra-reparte',
    cat: 'FAQ oficial 2025',
    q: 'Una escuadra reparte órdenes, ¿deben los equipos seguir a L entre sí?',
    plain: 'solo hace falta la distancia L en el momento de asignar la primera orden; despues la escuadra puede repartir ordenes sin mantener la distancia',
    html: `<p>La distancia <b>L</b> se exige <b>al asignar</b>. Después la escuadra puede repartir sus órdenes
      sin mantener la distancia entre equipos. El comandante, igual: solo necesita <b>L al dar la primera orden</b>.</p>`,
    refs: [{ doc: 'e43', page: 58 }],
  },
  {
    id: 'of-ammo-errata',
    cat: 'FAQ oficial 2025',
    q: '¿Cuánto da la carta «Ammo!» después de la errata?',
    plain: 'la errata cambia el efecto: ahora da un d12 en vez de dos d6 al pool de disparo o asalto no dirigido a blindados',
    html: `<p>La errata la cambia: ahora da <b>+1d12</b> (antes +2d6) al pool de disparo o asalto que
      <b>no</b> vaya dirigido a un vehículo blindado.</p>`,
    refs: [{ doc: 'e43', page: 54 }],
  },
  {
    id: 'of-smg-errata',
    cat: 'FAQ oficial 2025',
    q: '¿Cuánta potencia tienen los subfusiles tras la errata?',
    plain: 'la errata sube los smg y fusiles de asalto de dos d6 a d8, tambien en cuerpo a cuerpo',
    html: `<p>La errata los sube de <b>2d6 a d8</b>, también en <b>cuerpo a cuerpo</b>. El francotirador
      pasa a <b>d12+</b>.</p>`,
    refs: [{ doc: 'e43', page: 54 }],
  },
  {
    id: 'of-asalto-terra-errata',
    cat: 'FAQ oficial 2025',
    q: '¿Puede echarse cuerpo a tierra la infantería que asalta?',
    plain: 'no, la errata prohibe que la infanteria que asalta se eche cuerpo a tierra ante fuego reactivo; ademas shaken es menos dos y pinned menos cuatro',
    html: `<p>No. La errata lo prohíbe: la infantería que asalta <b>no puede echarse cuerpo a tierra</b> ante
      fuego reactivo. Además los modificadores se separan: <b>Shaken ▼2</b> y <b>Pinned ▼4</b>.</p>`,
    refs: [{ doc: 'e43', page: 54 }],
  },

  /* ============ EJÉRCITO Y ESCENARIOS ============ */
  {
    id: 'controlar-objetivo',
    cat: 'Ejército y escenarios',
    q: '¿Cómo se controla un objetivo?',
    plain: 'el comandante o un lider de equipo debe terminar una accion de movimiento en contacto con el marcador; los vehiculos no controlan objetivos y solo una miniatura puede estar en contacto',
    html: `<p>El <b>comandante o un líder de equipo</b> debe <b>terminar una acción de movimiento (advance o run)
      en contacto</b> con el marcador. Se marca inmediatamente y sigue bajo tu control hasta que el rival lo tome.</p>
      <p><b>Los vehículos no controlan objetivos</b>, y solo <b>una miniatura</b> puede estar en contacto con
      el marcador. Ni vehículos ni artillería pueden situarse encima.</p>`,
    refs: [{ doc: 'crb', page: 70 }, { doc: 'e43', page: 56 }],
  },
  {
    id: 'cuantos-vehiculos',
    cat: 'Ejército y escenarios',
    q: '¿Cuántos vehículos puedo llevar?',
    plain: 'por defecto un maximo de tres vehiculos por fuerza, sin contar los transportes organicos de las escuadras',
    html: `<p>Por defecto, <b>3 vehículos por fuerza</b>, salvo que el escenario diga otra cosa. Los
      <b>transportes orgánicos</b> de las escuadras <b>no cuentan</b> para ese límite.</p>`,
    refs: [{ doc: 'crb', page: 112 }, { doc: 'crb', page: 66 }],
  },
  {
    id: 'refuerzos-no-caben',
    cat: 'Ejército y escenarios',
    q: '¿Qué pasa con las figuras de refuerzo que no caben en el equipo?',
    plain: 'se pierden; no se pueden pasar a otro equipo',
    html: `<p><b>Se pierden.</b> Las figuras de refuerzo solo rellenan los huecos previstos del equipo;
      las que no caben no se pueden reasignar.</p>`,
    refs: [{ doc: 'crb', page: 66 }],
  },
  {
    id: 'turnos-mas',
    cat: 'Ejército y escenarios',
    q: '¿Qué significa un número de turnos como «4+»?',
    plain: 'que hay un turno extra segun una tirada indicada en las reglas especiales del escenario',
    html: `<p>Que puede haber <b>un turno extra</b> según la tirada que indiquen las reglas especiales
      del escenario. Por ejemplo, «4+» con tirada de 5+ en d6 al final del turno 4 da un quinto turno.</p>`,
    refs: [{ doc: 'crb', page: 70 }],
  },
  {
    id: 'iniciativa-escenario',
    cat: 'Ejército y escenarios',
    q: 'El escenario dice «Initiative —», ¿quién empieza con la carta?',
    plain: 'se decide al azar antes de desplegar; si el escenario dice A o B, ese bando la recibe boca arriba',
    html: `<p>Si el escenario marca <b>A</b> o <b>B</b>, ese bando recibe la carta de Iniciativa con su
      cara boca arriba. Si marca <b>—</b>, se decide <b>al azar</b> antes de desplegar.</p>`,
    refs: [{ doc: 'crb', page: 70 }],
  },
  {
    id: 'gastar-presupuesto',
    cat: 'Ejército y escenarios',
    q: '¿Cuándo y cómo se gasta el presupuesto de apoyo?',
    plain: 'despues de montar la mesa y en secreto, antes de desplegar, solo con opciones del OOB que el escenario permita',
    html: `<p>Después de montar la mesa, y <b>en secreto</b>, antes de desplegar. Solo se pueden comprar
      opciones del OOB que el escenario no prohíba, y en las categorías que permita su apartado <b>Support</b>.</p>`,
    refs: [{ doc: 'crb', page: 68 }, { doc: 'crb', page: 70 }],
  },

  /* ============ ARTILLERÍA ============ */
  {
    id: 'artilleria-mortero-despliegue',
    cat: 'Artillería',
    q: '¿Cómo se despliega un mortero?',
    plain: 'solo desde azotea plana, requiere accion unlimber antes de disparar y para reorientar, dispara fuego indirecto con observador',
    html: `<p>El mortero es un arma de fuego indirecto con reglas específicas:</p>
      <ul>
        <li>Solo puede disparar desde una <b>azotea plana</b> de un edificio.</li>
        <li>Requiere acción <b>Unlimber</b> (orden Tactical) antes de disparar y cada vez que se reorienta.</li>
        <li>Dispara <b>fuego indirecto</b>: no necesita línea de visión al objetivo, basta con que un <b>observador</b> (cualquier unidad amiga detectada) lo tenga.</li>
        <li>Potencia HE: ligero <b>HE (S)</b>, medio <b>HE (S)</b> (errata 2025: era M).</li>
      </ul>`,
    refs: [{ doc: 'crb', page: 46 }, { doc: 'e43', page: 54 }],
  },
  {
    id: 'artilleria-fuego-indirecto',
    cat: 'Artillería',
    q: '¿Cómo funciona el fuego indirecto?',
    plain: 'observador detecta objetivo con linea de vision, se anuncia arma, se monta pool, se tira 1d6 para desvio (artilleria fuera de mesa) o resuelve directo (mortero), impactos = exitos, se aplica HE',
    html: `<p>El fuego indirecto (morteros en mesa y obuses fuera de mesa) se resuelve así:</p>
      <ol>
        <li>Un <b>observador</b> (unidad amiga detectada con línea de visión al objetivo) "llama" el fuego.</li>
        <li>Se anuncia el arma y se monta su <b>pool de dados</b> (potencia del arma).</li>
        <li><b>Mortero en mesa:</b> resuelve directo contra el objetivo (el observador da la corrección).<br>
            <b>Artillería fuera de mesa (obuses):</b> tira <b>1d6</b> (errata 2025): éxito (5+) = impacto en objetivo; fallo = <b>desvío</b> → afecta a <b>mitad del pool</b> (redondeando arriba).</li>
        <li>Los <b>impactos = éxitos</b>. Se aplica regla <b>HE</b> (ignora cobertura ligera/pesada en edificios/bosque denso/jungla → tirador gana ▲2).</li>
        <li>Salvaciones normales: cobertura pesada = d12, fortificaciones = d12 repetible.</li>
      </ol>`,
    refs: [{ doc: 'crb', page: 46 }, { doc: 'e43', page: 57 }],
  },
  {
    id: 'artilleria-desvio',
    cat: 'Artillería',
    q: '¿Qué pasa si falla la tirada de fuego indirecto?',
    plain: 'fallo en el 1d6 de desvio: el impacto afecta a la mitad del pool de dados redondeando arriba; las tropas a X del blanco reciben mitad de los dados',
    html: `<p>Según la errata 2025 (e43 p.57), si la tirada de 1d6 para fuego indirecto <b>falla</b>:</p>
      <ul>
        <li>El impacto se desvía y solo afecta a <b>mitad del pool de dados</b> (redondeando hacia arriba).</li>
        <li>Las tropas situadas a <b>X del blanco</b> (distancia que indica el perfil del arma) son atacadas con <b>mitad de los dados</b>.</li>
      </ul>
      <p>Si la tirada tiene <b>éxito (5+)</b>, el impacto cae en el objetivo declarado con el pool completo.</p>`,
    refs: [{ doc: 'e43', page: 57 }],
  },
  {
    id: 'artilleria-bateria',
    cat: 'Artillería',
    q: '¿Varios morteros u obuses disparan juntos?',
    plain: 'si, forman una bateria: se suman los pools y se resuelve una sola tirada de desvio',
    html: `<p>Sí. Varios tubos (morteros u obuses) disparando al mismo objetivo forman una <b>batería</b>:</p>
      <ul>
        <li>Se <b>suman los pools de dados</b> de todas las piezas.</li>
        <li>Se resuelve <b>una sola tirada de desvío</b> (1d6 para artillería fuera de mesa).</li>
        <li>Los éxitos totales generan impactos con el pool combinado.</li>
      </ul>
      <p>Esto representa fuego concentrado coordinado.</p>`,
    refs: [{ doc: 'crb', page: 46 }, { doc: 'e43', page: 57 }],
  },

  /* ============ LANZALLAMAS ============ */
  {
    id: 'lanzallamas-reactivo',
    cat: 'Lanzallamas',
    q: '¿Puede un lanzallamas disparar en reactivo?',
    plain: 'no, la errata 2025 prohibe usar lanzallamas en fuego reactivo',
    html: `<p><b>No.</b> La errata 2025 (e43 p.54) establece explícitamente que el <b>lanzallamas no puede usarse en fuego reactivo</b>.</p>
      <p>Solo puede disparar como acción <b>Fire</b> (orden Engage) durante la activación del jugador activo.</p>`,
    refs: [{ doc: 'e43', page: 54 }],
  },
  {
    id: 'lanzallamas-edificio',
    cat: 'Lanzallamas',
    q: '¿Cómo afecta el lanzallamas a unidades en edificios?',
    plain: 'ignora la cobertura la explosion llena el espacio causa panico chequeo moral inmediato con dos burns',
    html: `<p>El lanzallamas es devastador contra edificios:</p>
      <ul>
        <li><b>Ignora la cobertura</b>: la explosión llena el espacio interior.</li>
        <li>Causa <b>pánico</b>: la unidad objetivo hace <b>chequeo de moral inmediato con ▼2</b>.</li>
        <li>Al ser <b>HE (S)</b>, el tirador gana <b>▲2</b> contra edificios, bosque denso y jungla.</li>
      </ul>`,
    refs: [{ doc: 'crb', page: 30 }, { doc: 'e43', page: 57 }],
  },
  {
    id: 'lanzallamas-bunker',
    cat: 'Lanzallamas',
    q: '¿Sirve el lanzallamas contra un búnker?',
    plain: 'si, ignora la cobertura del bunker y causa panico con chequeo moral a menos dos; el bunker no se puede tomar solo con lanzallamas hace falta asalto antitanque para la puerta',
    html: `<p>Sí, el lanzallamas afecta a los ocupantes de un búnker:</p>
      <ul>
        <li><b>Ignora la cobertura</b> del búnker (explosión interna).</li>
        <li>Causa <b>pánico</b> → chequeo de moral inmediato con <b>▼2</b>.</li>
        <li>Pero <b>no destruye el búnker</b> ni abre la puerta: para tomar un búnker hace falta <b>asalto antitanque</b> (regla Anti-Tank Assault) contra la puerta.</li>
      </ul>`,
    refs: [{ doc: 'crb', page: 62 }, { doc: 'e43', page: 57 }],
  },

  /* ============ FRANCOTIRADOR ============ */
  {
    id: 'francotirador-despliegue',
    cat: 'Francotiradores',
    q: '¿Cómo se despliega un francotirador?',
    plain: 'despliegue oculto se coloca boca abajo o se anota su posicion no cuenta para deteccion hasta que dispara o se le ve',
    html: `<p>El francotirador usa <b>despliegue oculto</b>:</p>
      <ul>
        <li>Se coloca en mesa <b>boca abajo</b> o se anota su posición en secreto.</li>
        <li>No cuenta para detección (spotting) hasta que <b>dispara</b> o una unidad enemiga consigue <b>línea de visión directa</b> a su posición.</li>
        <li>Al revelarse, se trata como un equipo normal de una figura.</li>
      </ul>`,
    refs: [{ doc: 'crb', page: 30 }, { doc: 'e43', page: 54 }],
  },
  {
    id: 'francotirador-detectar',
    cat: 'Francotiradores',
    q: '¿Se detecta al francotirador igual que una unidad normal?',
    plain: 'no, esta oculto hasta que dispara o se le ve directamente; no cuenta para deteccion mientras esta oculto',
    html: `<p><b>No.</b> Mientras está oculto:</p>
      <ul>
        <li>No se le aplica la tabla de detección (spotting).</li>
        <li>No se puede detectar a distancia; solo se "ve" si una unidad tiene <b>línea de visión directa</b> a su posición real.</li>
        <li>Al <b>disparar</b>, se revela automáticamente (y el rival tira 1d6 para Fire marker, errata 2025).</li>
      </ul>`,
    refs: [{ doc: 'crb', page: 30 }, { doc: 'e43', page: 54 }],
  },
  {
    id: 'francotirador-fire',
    cat: 'Francotiradores',
    q: '¿Qué pasa tras disparar un francotirador?',
    plain: 'el rival tira 1d6 y con exito pone marcador de fuego en el francotirador errata 2025',
    html: `<p>Tras disparar, el rival tira <b>1d6</b> (errata 2025, e43 p.54):</p>
      <ul>
        <li><b>Éxito (5+):</b> coloca un <b>marcador de Fuego</b> en el francotirador (será más fácil de detectar).</li>
        <li><b>Fallo:</b> el francotirador sigue sin marcador de Fuego.</li>
      </ul>
      <p>Esto representa el destello y humo del disparo delatando su posición.</p>`,
    refs: [{ doc: 'e43', page: 54 }],
  },

  /* ============ RESERVAS ============ */
  {
    id: 'reservas-llegada',
    cat: 'Reservas',
    q: '¿Cómo entran las reservas en mesa?',
    plain: 'al inicio de una fase de activacion tiras el dado que indica el escenario ej d8 5+ y con exito entran por el borde designado con un advance',
    html: `<p>La regla general para reservas:</p>
      <ol>
        <li>Al inicio de una <b>fase de activación</b> (antes de revelar cartas), tira el dado que indique el escenario (habitualmente <b>d8</b>, éxito <b>5+</b>).</li>
        <li>Con éxito, la unidad entra por el <b>borde de mesa designado</b> en el escenario.</li>
        <li>Entra con un <b>advance</b> desde el borde; su líder debe poder colocarse a <b>S</b> del borde.</li>
      </ol>
      <p>Variantes: escalonadas (oleadas), desde fuera de mesa (vehículos), turno fijo + dado, o automáticas según escenario.</p>`,
    refs: [{ doc: 'crb', page: 115 }, { doc: 'crb', page: 116 }, { doc: 'crb', page: 120 }],
  },
  {
    id: 'reservas-activacion',
    cat: 'Reservas',
    q: '¿Pueden activar las reservas el turno que llegan?',
    plain: 'si, la unidad que entra forma parte de la fuerza y puede ser objetivo de cartas normalmente ese mismo turno',
    html: `<p><b>Sí.</b> La unidad que entra en mesa <b>forma parte de la fuerza inmediatamente</b> y puede ser objetivo de cartas de activación en ese mismo turno. No hay penalización ni espera.</p>`,
    refs: [{ doc: 'crb', page: 115 }],
  },
  {
    id: 'reservas-borde',
    cat: 'Reservas',
    q: '¿Por qué borde entran las reservas?',
    plain: 'el borde lo indica el escenario o se acuerda entre los jugadores al montar la mesa',
    html: `<p>El borde de entrada <b>lo indica el escenario</b> (ej. "borde sur" en Escape, "borde lateral" en The Crossroads). Si no lo especifica, <b>se acuerda entre los jugadores</b> al montar la mesa, típicamente el borde de despliegue de la fuerza a la que pertenecen.</p>`,
    refs: [{ doc: 'crb', page: 115 }],
  },

  /* ============ BONUS CARDS ============ */
  {
    id: 'bonus-cards-efectos',
    cat: 'Reglas generales',
    q: '¿Qué efectos tienen las 10 Bonus Cards?',
    plain: '1 +2d6 disparo 2 +1d12 disparo 3 añade tactical o +1 4 sustituye tirada por d6 5 anula baja 6 añade engage o +1 7 añade move o +1 8 +1 columna spotting 9 +2d6 defensa 10 +1d12 defensa',
    html: `<p>El mazo de bonificación tiene <b>20 cartas = 2 copias de cada una de 10 efectos</b>:</p>
      <table>
        <tr><th>#</th><th>Efecto</th><th>Cuándo se juega</th></tr>
        <tr><td>1</td><td><b>+2d6</b> al pool de disparo (no AT)</td><td>Tras montar reserva, aplicar boosts/burns</td></tr>
        <tr><td>2</td><td><b>+1d12</b> al pool de disparo (no AT)</td><td>Ídem</td></tr>
        <tr><td>3</td><td>Añade orden <b>Tactical</b> a carta en juego; si ya tiene, <b>+1</b> a su valor</td><td>Al resolver tu carta</td></tr>
        <tr><td>4</td><td><b>Sustituye cualquier tirada por 1d6</b></td><td>Después de cualquier tirada</td></tr>
        <tr><td>5</td><td>Tira el dado indicado: <b>éxito = anula 1 baja</b></td><td>Cuando un equipo sufre una baja</td></tr>
        <tr><td>6</td><td>Añade orden <b>Engage</b> a carta en juego; si ya tiene, <b>+1</b></td><td>Al resolver tu carta</td></tr>
        <tr><td>7</td><td>Añade orden <b>Move</b> a carta en juego; si ya tiene, <b>+1</b></td><td>Al resolver tu carta</td></tr>
        <tr><td>8</td><td><b>+1 columna</b> a spotting hasta resolver carta</td><td>Durante intento de detección</td></tr>
        <tr><td>9</td><td><b>+2d6</b> al pool de defensa</td><td>Antes de tirar reserva de defensa</td></tr>
        <tr><td>10</td><td><b>+1d12</b> al pool de defensa</td><td>Antes de tirar reserva de defensa</td></tr>
      </table>
      <p><b>Regla:</b> Nunca dos cartas con la misma ilustración sobre la misma acción. Si el mazo se agota, se rebarajan los descartes.</p>`,
    refs: [{ doc: 'crb', page: 17 }, { doc: 'crb', page: 18 }],
  },

  /* ============ ESCENARIOS ESPECÍFICOS ============ */
  {
    id: 'escenario-4-bombardeo',
    cat: 'Ejército y escenarios',
    q: '¿Cómo funciona el bombardeo preparatorio de The Outskirts?',
    plain: 'tras desplegar d6 por cada unidad enemiga a mas de L+M de tus unidades cada exito resuelve fuego de howitzer pesado con 2d12 sin HE',
    html: `<p>Escenario 4 "The Outskirts": tras el despliegue, el atacante tira <b>1d6 por cada unidad enemiga desplegada a más de L+M</b> de toda unidad propia.</p>
      <ul>
        <li>Por cada <b>éxito (5+)</b>, resuelve un fuego de <b>obús pesado (howitzer) con 2d12</b>.</li>
        <li>Este fuego <b>no tiene efecto HE</b> (no ignora cobertura, no da ▲2).</li>
        <li>El defensor está <b>atrincherado (Entrenched)</b> en sus 3 edificios: cobertura pesada + ▼2 columnas a detección (incluso contra HE/bombardeo), se pierde al primer movimiento.</li>
      </ul>`,
    refs: [{ doc: 'crb', page: 114 }, { doc: 'crb', page: 64 }],
  },
  {
    id: 'escenario-6-restos-llamas',
    cat: 'Ejército y escenarios',
    q: '¿Qué son los "restos en llamas" del escenario 6?',
    plain: 'bloquean linea de vision echan humo d12 de viento las unidades dentro sufren efectos',
    html: `<p>Escenario 6 "The Road to Hell": el camino tiene <b>restos en llamas</b>:</p>
      <ul>
        <li><b>Bloquean línea de visión</b> (como obstáculo alto).</li>
        <li><b>Echan humo</b>: cada turno se tira <b>1d12</b> para ver dirección/extensión del humo (véase regla de humo si existe, si no, trátalo como área que bloquea LoS y da cobertura pesada).</li>
        <li>Las unidades que entren o terminen en los restos pueden sufrir daño (según reglas del escenario).</li>
      </ul>`,
    refs: [{ doc: 'crb', page: 116 }],
  },
  {
    id: 'escenario-10-refuerzos',
    cat: 'Ejército y escenarios',
    q: '¿Cómo funcionan los refuerzos del escenario 10 (We Must Hold)?',
    plain: 'a partir del turno 3 el defensor tira d8 por cada refuerzo con 5+ entra por el borde designado',
    html: `<p>Escenario 10 "We Must Hold": el defensor recibe <b>refuerzos a partir del turno 3</b>.</p>
      <ul>
        <li>Al inicio de cada turno (desde el 3), tira <b>1d8 por cada refuerzo</b> pendiente.</li>
        <li>Con <b>5+</b>, ese refuerzo entra por el <b>borde designado</b> (normalmente el borde de despliegue del defensor).</li>
        <li>Entran con un advance y pueden activar ese turno.</li>
      </ul>`,
    refs: [{ doc: 'crb', page: 120 }],
  },
  {
    id: 'escenario-xl-compartido',
    cat: 'Ejército y escenarios',
    q: '¿Qué significa "apoyo compartido" en Grand Manoeuvres?',
    plain: 'los vehiculos comprados con estrellas son controlables por los dos jugadores del mismo equipo',
    html: `<p>En el escenario XL "Grand Manoeuvres" (4 jugadores, 2 equipos de 2):</p>
      <ul>
        <li>El apoyo (◇) se reparte entre los dos jugadores de cada equipo.</li>
        <li>Los <b>vehículos comprados con ◇</b> son <b>controlables por ambos</b> jugadores del equipo.</li>
        <li>Máx. 6 vehículos por fuerza y máx. 6 ◇ por jugador en Fire Support.</li>
        <li>Cada jugador tiene su propia baraja de 7 cartas y carta de Habilidad Especial.</li>
      </ul>`,
    refs: [{ doc: 'crb', page: 121 }, { doc: 'crb', page: 122 }],
  },
];
