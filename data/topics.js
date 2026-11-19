/* Temas del reglamento, redactados en castellano para consulta rápida en mesa.
   Cada tema enlaza a la página del PDF original (que va una por delante de la impresa).
   Fuente: V for Victory, reglamento básico (Studio Tomahawk, 2024). */

window.VFV_TOPICS = [
  /* ============ FUNDAMENTOS ============ */
  {
    id: 'como-jugar',
    cat: 'Fundamentos',
    icono: '🎯',
    titulo: 'De qué va y qué hace falta',
    resumen: 'Escaramuzas de la IIGM a nivel de pelotón: 120×120 cm, ~30 figuras y una baraja.',
    buscar: 'materiales mesa superficie figuras peanas dados que necesito empezar',
    html: `
      <p>Cada jugador manda una <b>fuerza</b> equivalente a un pelotón reforzado con apoyos de compañía
      o división. Se juega en una mesa de <b>120 × 120 cm</b> (4' × 4'), salvo que el escenario pida otra cosa.</p>
      <h3>Qué hace falta</h3>
      <ul>
        <li><b>Reglas</b> VS / S / M / L (5, 10, 15 y 30 cm). Son la única herramienta de medida.</li>
        <li><b>Dados d6, d8 y d12</b>; lo ideal es una docena de cada tipo.</li>
        <li><b>Baraja del juego</b>: 1 carta de Iniciativa, 7 cartas de activación por jugador y
            1 carta de Habilidad Especial por jugador.</li>
        <li><b>Mazo de bonificación</b> de 20 cartas (común a los dos jugadores).</li>
        <li><b>Marcadores</b> de acción, de Estrés/Moral, de Fuego y de objetivo.</li>
        <li><b>Figuras</b>: unas 30 por bando y un par de vehículos o armas pesadas.
            Se recomiendan 28 mm sobre peanas redondas de 25–30 mm, aunque vale 20 mm o 15 mm.
            Varias figuras por peana están permitidas si ambos jugadores quieren, sin efecto en las reglas.</li>
      </ul>
      <p>Una partida tipo dura <b>4 turnos</b> y viene a llevar <b>2–3 horas</b> con el despliegue incluido.</p>
      <div class="note">El juego prima la moral y el desgaste sobre las bajas: la mayoría de las figuras no
      mueren, pierden la capacidad de actuar. Y la detección importa: mirar la mesa no equivale a ver al enemigo.</div>`,
    refs: [{ doc: 'crb', page: 7 }, { doc: 'crb', page: 8 }],
  },

  {
    id: 'dados',
    cat: 'Fundamentos',
    icono: '🎲',
    titulo: 'Cómo funcionan los dados',
    resumen: 'Éxito con 5+, sin modificadores al resultado: solo boost y burn al tipo de dado.',
    buscar: 'dado d6 d8 d12 exito boost burn potenciar quemar repeticion reroll umbral',
    html: `
      <p>Hay tres dados: <b>d6, d8 y d12</b>. Dos reglas inviolables:</p>
      <ul>
        <li><b>Éxito con 5 o más</b>, con cualquier dado. Menos de 5 es fallo.</li>
        <li><b>No existen modificadores al resultado.</b> Nunca se suma ni se resta nada a lo que sale en
            el dado. Lo que se modifica es <i>qué dado tiras</i>.</li>
      </ul>
      <h3>Boost (▲) y burn (▼)</h3>
      <p>Se aplican <b>antes</b> de tirar y mueven el dado un escalón en la cadena:</p>
      <table>
        <tr><th>Cadena</th><th>d6−</th><th>d6</th><th>d8</th><th>d12</th><th>d12+</th></tr>
      </table>
      <ul>
        <li>Un <b>boost</b> sube un escalón: d8 → d12. Un <b>burn</b> baja uno: d12 → d8.</li>
        <li><b>Se anulan entre sí</b>: calcula el neto antes de convertir nada (▲ + ▼ = nada).</li>
        <li>Al potenciar se suben <b>primero los dados más débiles</b>; al quemar, se bajan
            <b>primero los más fuertes</b>.</li>
        <li>Un <b>d6 quemado se elimina de la reserva</b>, salvo que sea el último dado. Si es el último,
            tiras 2d6 y te quedas el peor (<b>d6−</b>).</li>
        <li>Potenciar un <b>d12</b> = tirar d12 + d6 y quedarte el mejor (<b>d12+</b>). No se puede volver a potenciar.</li>
      </ul>
      <h3>Repeticiones</h3>
      <p>Un dado <b>solo se puede repetir una vez</b> y el resultado nuevo manda siempre. Al repetir un d12+
      se repiten los dos dados (d12 y d6).</p>`,
    refs: [{ doc: 'crb', page: 10 }, { doc: 'crb', page: 11 }, { doc: 'crb', page: 12 }],
  },

  {
    id: 'organizacion',
    cat: 'Fundamentos',
    icono: '🧩',
    titulo: 'Equipo, unidad, escuadra y fuerza',
    resumen: 'Los cuatro términos que se confunden todo el rato. Los vehículos no son equipos.',
    buscar: 'team unit squad force commander lider equipo unidad escuadra fuerza comandante',
    html: `
      <table>
        <tr><th>Término</th><th>Qué es</th></tr>
        <tr><td><b>Equipo</b> (team)</td><td>Todo elemento de maniobra que combate <b>a pie</b>.
          Los vehículos <b>no</b> son equipos.</td></tr>
        <tr><td><b>Unidad</b> (unit)</td><td>Cualquier grupo de figuras que actúa junto: un equipo, una escuadra
          entera, un comandante solo o un vehículo. Las figuras nunca actúan por separado.</td></tr>
        <tr><td><b>Escuadra</b> (squad)</td><td>Varios equipos, normalmente dos. Es lo que se elige como objetivo
          de una carta para repartir órdenes.</td></tr>
        <tr><td><b>Fuerza</b> (force)</td><td>Todo lo que manda un jugador.</td></tr>
        <tr><td><b>Comandante</b></td><td>La figura que manda la fuerza; suele ir solo, en un equipo de una figura
          de la escuadra de mando.</td></tr>
      </table>
      <p>El <b>líder de equipo</b> es una figura de cada equipo identificable como tal. Todas las medidas
      (movimiento, alcance de armas, detección y línea de visión) se hacen desde él.</p>
      <div class="note">Una fuerza típica: escuadra de mando (comandante + equipo de mando) y al menos
      una escuadra de infantería de dos equipos. Puede haber equipos de apoyo independientes
      (francotirador, mortero, HMG) y vehículos independientes.</div>`,
    refs: [{ doc: 'crb', page: 10 }, { doc: 'crb', page: 12 }, { doc: 'crb', page: 14 }],
  },

  {
    id: 'cadena-mando',
    cat: 'Fundamentos',
    icono: '🎖️',
    titulo: 'La cadena de mando',
    resumen: 'Con una carta puedes activar una unidad, una escuadra o al comandante. Aquí está la diferencia.',
    buscar: 'mando ordenes comandante escuadra activar carta repartir L 30',
    html: `
      <p>Al resolver una carta de activación eliges <b>uno de tres objetivos</b>:</p>
      <ol>
        <li><b>Tu comandante.</b> Reparte las órdenes a <b>cualquier unidad de la fuerza a L (30 cm)</b>.
            Además gana <b>una acción libre de cualquier tipo</b>, incluso de un tipo que no figure en la carta.</li>
        <li><b>Una escuadra.</b> Reparte las órdenes entre sus equipos, que deben estar <b>a L entre sí</b>
            (líder a líder, o a la parte más cercana del transporte).</li>
        <li><b>Una unidad.</b> Solo esa unidad recibe las órdenes.</li>
      </ol>
      <div class="warn">La acción libre del comandante <b>se consume aunque no la uses</b>: hay que marcarla.
      Un comandante desactivado (sin acciones) <b>no puede ser objetivo de una carta</b>. Ojo con gastarlo pronto.</div>
      <p>Las órdenes sobrantes se pierden: si una carta da 3 órdenes de movimiento y solo puedes hacer 2,
      pierdes una. Por eso escuadra y comandante rentabilizan mejor las cartas.</p>`,
    refs: [{ doc: 'crb', page: 14 }, { doc: 'crb', page: 20 }],
  },

  {
    id: 'experiencia',
    cat: 'Fundamentos',
    icono: '⬆️',
    titulo: 'Niveles de experiencia',
    resumen: 'Recruit, Trained y Elite: cambian el dado de moral y los modificadores de disparo y asalto.',
    buscar: 'experiencia recruit trained elite recluta veterano',
    html: `
      <table>
        <tr><th>Nivel</th><th>Dado de moral</th><th>Efectos</th></tr>
        <tr><td><b>Recruit</b></td><td>d6</td><td>▼1 a disparo y asalto; <b>debe tirar d8</b> para lanzar un asalto
          (si falla, pierde la acción)</td></tr>
        <tr><td><b>Trained</b></td><td>d8</td><td>Sin modificadores. Es el nivel por defecto.</td></tr>
        <tr><td><b>Elite</b></td><td>d12</td><td>▲1 a disparo y asalto</td></tr>
      </table>
      <p>La opción de Experiencia de una Orden de Batalla cambia el nivel de <b>toda la infantería</b> de la fuerza.
      Los vehículos se consideran siempre del nivel de la infantería.</p>`,
    refs: [{ doc: 'crb', page: 14 }, { doc: 'crb', page: 43 }],
  },

  {
    id: 'marcadores',
    cat: 'Fundamentos',
    icono: '🔖',
    titulo: 'Marcadores: acción, estrés, fuego',
    resumen: 'Verde = 1 acción, roja = 2 (desactivada). El marcador de Fuego te hace más fácil de detectar.',
    buscar: 'marcador ficha token accion verde rojo estres moral fuego objetivo',
    html: `
      <table>
        <tr><th>Marcador</th><th>Qué indica</th></tr>
        <tr><td><b>Acción</b></td><td>Sin ficha = 0 acciones. <b>Verde</b> = 1 acción hecha.
          <b>Roja</b> = 2 acciones, unidad <b>desactivada</b>.</td></tr>
        <tr><td><b>Estrés y Moral</b></td><td>Un solo marcador: el <b>color</b> es el nivel de moral y el
          <b>número de explosiones</b> son los puntos de Estrés.</td></tr>
        <tr><td><b>Fuego</b></td><td>La unidad ha disparado. Permanece hasta que se mueve al menos S.
          Da <b>▲2</b> a quien intente detectarla.</td></tr>
        <tr><td><b>Objetivo</b></td><td>Solo en algunos escenarios; a veces con un número que fija su importancia.</td></tr>
      </table>
      <p>Colores de moral: <b>verde</b> confident, <b>amarillo</b> shaken, <b>naranja</b> pinned,
      <b>rojo</b> panicking. Sin marcador = confident y sin Estrés.</p>
      <p>Al final del turno se retiran <b>solo</b> las fichas de acción. Todo lo demás se queda.</p>`,
    refs: [{ doc: 'crb', page: 9 }, { doc: 'crb', page: 10 }, { doc: 'crb', page: 22 }],
  },

  /* ============ EL TURNO ============ */
  {
    id: 'turno',
    cat: 'El turno',
    icono: '🕐',
    titulo: 'El turno: preparación, activación y limpieza',
    resumen: 'Tres pasos y siete fases de activación. Sin mazo: todas las cartas están en la mano.',
    buscar: 'turno preparacion activacion mopping limpieza fases siete cartas',
    html: `
      <ol>
        <li><b>Preparación.</b> Cada jugador pone en la mano sus <b>7 cartas de activación</b> y su
            Habilidad Especial. Se resuelven los efectos de «inicio de turno» del escenario.
            <b>No hay mazo del que robar</b>: las 7 están disponibles desde el principio.</li>
        <li><b>Activación.</b> <b>Siete fases.</b> En cada una los dos jugadores eligen carta en secreto,
            las revelan a la vez y resuelve primero la Iniciativa más alta. Después el rival responde
            con fuego reactivo o retirándose. Cuando los dos han resuelto, la carta se descarta y empieza otra fase.</li>
        <li><b>Mopping up.</b> Se anotan los PV del turno, se comprueba si acaba la partida y, si sigue,
            se retiran las fichas de acción.</li>
      </ol>
      <p><b>La fase de activación termina</b> cuando todas las unidades de la mesa están desactivadas
      o cuando los jugadores se quedan sin cartas.</p>
      <div class="note">Puede pasar que un jugador no pueda activar ninguna unidad mientras el rival sí.
      Ese jugador <b>sigue jugando cartas igualmente</b>: pueden desencadenar eventos aleatorios.</div>`,
    refs: [{ doc: 'crb', page: 19 }, { doc: 'crb', page: 20 }, { doc: 'crb', page: 22 }],
  },

  {
    id: 'cartas',
    cat: 'El turno',
    icono: '🃏',
    titulo: 'Las cartas de activación',
    resumen: 'Iniciativa de 1 a 7 y de 1 a 3 símbolos: Move, Engage y Tactical.',
    buscar: 'carta activacion iniciativa orden simbolo move engage tactical habilidad bonificacion',
    html: `
      <p>Cada jugador tiene <b>7 cartas de activación</b>, con dorso propio. <b>Nunca se barajan</b> (salvo
      regla de escenario): se tienen todas en la mano.</p>
      <p>Cada carta muestra:</p>
      <ul>
        <li>Un <b>valor de Iniciativa del 1 al 7</b>, que decide quién actúa primero.</li>
        <li>De <b>1 a 3 símbolos de orden</b>, cada uno con un número que indica <b>cuántas órdenes</b> de ese tipo da.</li>
      </ul>
      <table>
        <tr><th>Orden</th><th>Acciones que permite</th></tr>
        <tr><td><b>Move</b></td><td>Advance (avanzar) · Run (correr)</td></tr>
        <tr><td><b>Engage</b></td><td>Fire (disparar) · Launch an Assault (asaltar)</td></tr>
        <tr><td><b>Tactical</b></td><td>Rally (reorganizar) · Fall Back (retroceder) · Unlimber (desplegar arma)</td></tr>
      </table>
      <p>Hay además dos barajas aparte:</p>
      <ul>
        <li><b>Carta de Habilidad Especial</b>: una por jugador, se usa una vez por turno y vuelve al
            inicio del turno siguiente.</li>
        <li><b>Cartas de bonificación</b>: 20 cartas (dos copias de cada una de 10), comunes a los dos jugadores.
            Se roban cuando dice el escenario y se juegan boca abajo cuando interese. <b>Nunca se pueden jugar
            dos cartas con la misma ilustración sobre la misma acción.</b></li>
      </ul>`,
    refs: [{ doc: 'crb', page: 15 }, { doc: 'crb', page: 17 }, { doc: 'crb', page: 18 }],
  },

  {
    id: 'empate',
    cat: 'El turno',
    icono: '⚖️',
    titulo: 'Empate de iniciativa',
    resumen: 'La carta de Iniciativa decide quién va primero y luego se tira 1D12 en la tabla de eventos.',
    buscar: 'empate iniciativa drawn tie igual evento aleatorio d12 tabla',
    html: `
      <p>Si los dos jugadores juegan cartas con el <b>mismo valor de Iniciativa</b>:</p>
      <ul>
        <li>Decide el jugador cuya facción está <b>boca arriba en la carta de Iniciativa</b>.</li>
        <li>Puede <b>resolver primero</b>: en ese caso <b>gira la carta de Iniciativa</b> para mostrar la otra cara.</li>
        <li>O puede <b>ceder</b> el paso al rival: la carta de Iniciativa se queda como estaba.</li>
        <li>Tras resolverse ambas cartas, <b>quien tiene la carta de Iniciativa tira 1D12</b> en la tabla
            de eventos aleatorios.</li>
      </ul>
      <div class="note">La tabla de eventos está en la pestaña <a href="#mesa">Herramientas</a>, con un
      botón para tirar el dado y ver el resultado.</div>`,
    refs: [{ doc: 'crb', page: 22 }],
  },

  {
    id: 'recuperar',
    cat: 'El turno',
    icono: '♻️',
    titulo: 'Recuperar una carta gastada',
    resumen: 'Descartas dos cartas para recuperar una: pierdes una carta neta pero eliges cuál vuelve.',
    buscar: 'recuperar retrieving descarte mano carta usada devolver',
    html: `
      <p>En lugar de resolver tu carta, puedes <b>recuperar una carta ya usada este turno</b>:</p>
      <ol>
        <li>Descarta tu carta de activación <b>sin asignar órdenes a ninguna unidad</b>.</li>
        <li>Descarta <b>además otra carta</b> de tu mano.</li>
        <li>Recupera <b>una carta de tu pila de descartes</b> y vuelve a la mano.</li>
      </ol>
      <p>Neto: pierdes dos cartas y recuperas una. Se usa cuando una carta concreta te hace mucha falta
      para el objetivo que persigues.</p>`,
    refs: [{ doc: 'crb', page: 22 }],
  },

  /* ============ MOVIMIENTO ============ */
  {
    id: 'movimiento',
    cat: 'Movimiento',
    icono: '🥾',
    titulo: 'Avanzar y correr',
    resumen: 'Advance = 1S, Run = 2S. Correr solo a pie y con restricciones de terreno.',
    buscar: 'movimiento advance run avanzar correr mover distancia regla S lider',
    html: `
      <table>
        <tr><th>Acción</th><th>Distancia</th><th>Restricciones</th></tr>
        <tr><td><b>Advance</b></td><td>1S</td><td>Puede cruzar infantería amiga. No puede contactar ni cruzar
          al enemigo, ni cruzar vehículos.</td></tr>
        <tr><td><b>Run</b></td><td>2S</td><td>Solo equipos a pie. No cruza figuras amigas ajenas a su equipo
          ni enemigas. Un equipo con arma <b>Cumbersome</b> no puede correr, ni se corre por terreno abrupto.</td></tr>
      </table>
      <p><b>Cómo se mueve:</b> pones la regla en contacto con la base del líder y colocas al líder al final.
      El resto de figuras se colocan a <b>S o menos del líder</b>, sin medir una a una, y no pueden quedar
      al otro lado de un obstáculo infranqueable respecto a él.</p>
      <ul>
        <li>Al terminar hay que <b>marcar la acción</b> (poner ficha o girarla a roja).</li>
        <li>Si el líder se aleja <b>al menos S</b> de su posición anterior, la unidad <b>retira su marcador de Fuego</b>.</li>
      </ul>
      <div class="note">El terreno <b>nunca frena</b> el movimiento de infantería en este juego. Hay tipos de
      terreno, como los obstáculos lineales o el terreno abrupto, que simplemente <b>no se pueden cruzar corriendo</b>.</div>`,
    refs: [{ doc: 'crb', page: 23 }, { doc: 'crb', page: 25 }, { doc: 'crb', page: 26 }],
  },

  /* ============ DETECCIÓN ============ */
  {
    id: 'deteccion',
    cat: 'Detección y visión',
    icono: '👁️',
    titulo: 'Detección (spotting)',
    resumen: 'Ver la mesa no es ver al enemigo. Por defecto se detecta a 3L y los modificadores mueven la columna.',
    buscar: 'deteccion spotting detectar ver enemigo distancia columna camuflaje',
    html: `
      <p>Ver una figura en la mesa no significa que tu unidad la haya <b>detectado</b>. La detección es
      <b>permanente</b>: se puede comprobar en cualquier momento, no cuesta acción y <b>no se tira ningún dado</b>.
      Se mide siempre desde el <b>líder de equipo</b> (o desde el centro del vehículo, o su torreta).</p>
      <p>Sin obstáculos, se detecta a <b>3L (90 cm)</b>. Los modificadores mueven una columna a izquierda o
      derecha sobre una regla de columnas: <b>M · L · 2L · 3L · &gt;3L</b>.</p>
      <ul>
        <li><b>Nunca se detecta a menos de M</b>: a 15 cm o menos, se ve siempre.</li>
        <li>Si la columna pasa de la última casilla (&gt;3L), <b>se ve en toda la mesa</b>.</li>
        <li>Los modificadores son <b>acumulativos</b>.</li>
        <li>Si detectas <b>una figura</b> de la unidad enemiga, <b>toda la unidad</b> está detectada.</li>
        <li>Las unidades amigas se ven siempre, sin comprobar nada.</li>
      </ul>
      <p>Lo más habitual en partida: lluvia o cielo cubierto ▼1, niebla u oscuridad ▼2, cada obstáculo
      lineal ▼1, cobertura ligera ▼1 por S, cobertura pesada ▼2 por S, camuflada ▼3; a favor, marcador de
      Fuego ▲2 y vehículo ▲2.</p>
      <div class="note">La tabla completa está en <a href="#tablas">Tablas</a>.</div>`,
    refs: [{ doc: 'crb', page: 28 }, { doc: 'crb', page: 29 }],
  },

  {
    id: 'linea-vision',
    cat: 'Detección y visión',
    icono: '📐',
    titulo: 'Línea de visión y línea de fuego',
    resumen: 'Ver no es poder disparar: la línea de fuego es más restrictiva.',
    buscar: 'linea vision fuego los lof obstaculo bloquea edificio vehiculo altura 2S',
    html: `
      <h3>Línea de visión</h3>
      <p>Se traza desde el líder de equipo. Las figuras tienen <b>360°</b> de visión y se mira «desde la
      altura de la figura». Bloquean la visión por completo:</p>
      <ul>
        <li>Los <b>edificios</b>.</li>
        <li>Los <b>vehículos (amigos o enemigos) al menos tan altos como quien mira</b>.</li>
        <li>Los <b>obstáculos lineales al menos tan altos como la figura</b> que intenta ver.</li>
      </ul>
      <p>Quien mira desde una posición elevada (planta alta, cresta) no se ve afectado por obstáculos
      de altura de suelo.</p>
      <h3>Línea de fuego</h3>
      <p>Puedes ver a alguien y no poder dispararle. Además de lo anterior, bloquean el fuego:</p>
      <ul>
        <li>Las <b>figuras</b> y el espacio entre figuras de otras unidades.</li>
        <li>Las <b>áreas de terreno al menos tan altas</b> como la figura, <b>en cuanto la línea cruza más de 2S</b> de ese terreno.</li>
      </ul>
      <div class="warn">Una unidad no detectada <b>nunca</b> puede estar en tu línea de fuego: primero
      hay que detectarla.</div>`,
    refs: [{ doc: 'crb', page: 28 }],
  },

  /* ============ COMBATE ============ */
  {
    id: 'disparo',
    cat: 'Combate',
    icono: '💥',
    titulo: 'Disparo antipersonal',
    resumen: 'Seis pasos: objetivo, reacción, reserva de dados, impactos, salvaciones y efectos.',
    buscar: 'disparo fire fuego antipersonal directo supresion suppressive herir matar',
    html: `
      <p>Hay dos formas de disparar a infantería:</p>
      <ul>
        <li><b>Fuego directo</b>: busca eliminar figuras.</li>
        <li><b>Fuego de supresión</b>: busca saturar y romper la moral. <b>No causa bajas</b>, pero
            da mucho Estrés. Las armas con regla <b>HE no pueden</b> usarlo.</li>
      </ul>
      <h3>Secuencia</h3>
      <ol>
        <li><b>Elegir objetivo.</b> Debe estar <b>detectado</b> y en la línea de fuego del líder.</li>
        <li><b>Reacción del objetivo.</b> Puede <b>echarse cuerpo a tierra</b>: sufre 1 de Estrés y el
            tirador recibe ▼2.</li>
        <li><b>Reserva de dados.</b> Cada figura con el enemigo a alcance de su arma y línea de fuego
            aporta sus dados de disparo. Se aplican boost y burn.</li>
        <li><b>Tirar.</b> Cada éxito es un impacto. Se pone un marcador de Fuego al tirador.</li>
        <li><b>Salvaciones.</b> La unidad objetivo tira <b>un dado por impacto</b>: d6 si corre campo a
            través, <b>d8</b> en cualquier otra situación, <b>d12</b> en cobertura pesada, d12 repetible
            en fortificaciones. Cada éxito anula un impacto.</li>
        <li><b>Efectos.</b></li>
      </ol>
      <table>
        <tr><th></th><th>Fuego directo</th><th>Fuego de supresión</th></tr>
        <tr><td>Bajas</td><td>1 figura por impacto no anulado</td><td>Ninguna</td></tr>
        <tr><td>Estrés</td><td>1 si recibe al menos un impacto, +1 por cada baja</td><td>1 si recibe al menos
          un impacto, +1 por cada impacto no anulado</td></tr>
        <tr><td>Cobertura</td><td>Se aplica</td><td><b>No</b> se aplica</td></tr>
      </table>
      <div class="note">El líder de equipo es <b>siempre la última figura</b> que se retira. Si hay más
      bajas que figuras con línea de fuego, el exceso se cancela: no se puede matar a quien no se ve.</div>`,
    refs: [{ doc: 'crb', page: 30 }, { doc: 'crb', page: 31 }, { doc: 'crb', page: 32 }],
  },

  {
    id: 'antitanque',
    cat: 'Combate',
    icono: '🛡️',
    titulo: 'Disparo antitanque',
    resumen: '1d12 para impactar y luego el dado de penetración según arma y blindaje.',
    buscar: 'antitanque at blindaje penetracion bazooka panzerfaust cañon destruir vehiculo',
    html: `
      <p>Disparan así las armas con <b>factor de penetración A, B, C o D</b>. Cada arma AT dispara
      <b>por separado</b>: dos cañones son dos resoluciones completas.</p>
      <ol>
        <li><b>Objetivo</b>: vehículo detectado, en línea de fuego y a alcance del arma.</li>
        <li><b>Impactar</b>: <b>un solo d12</b>, con modificadores (Élite ▲1, Recluta ▼1, <i>shaken</i> ▼2,
            fuego reactivo ▼2, haber movido ▼1, haber girado la torreta ▼1, cobertura ligera o Recon ▼1,
            cobertura pesada ▼2).</li>
        <li><b>Penetrar</b>: cruza el factor del arma con el blindaje del objetivo y tira el dado que salga.
            <b>Más de 5</b> = destruido. <b>Exactamente 5</b> = daño ligero (pestaña Tablas).</li>
      </ol>
      <p>El blindaje se reduce en 1 (mínimo 1) al disparar al <b>flanco, la retaguardia o desde arriba</b>.
      No se aplica a vehículos con blindaje 0.</p>
      <div class="note">Si el vehículo no queda destruido al final de la acción de disparo, recibe
      <b>1 de Estrés</b> además del daño ligero que haya podido sufrir.</div>`,
    refs: [{ doc: 'crb', page: 33 }],
  },

  {
    id: 'asalto',
    cat: 'Combate',
    icono: '⚔️',
    titulo: 'Asalto a infantería',
    resumen: 'Cuerpo a cuerpo: gana quien consigue más impactos, no quien hace más bajas.',
    buscar: 'asalto assault cuerpo a cuerpo cargar combatir',
    html: `
      <p><b>Quién puede asaltar:</b> solo unidades <b>confident o shaken</b>. Las <i>pinned</i> y
      <i>panicked</i> no pueden, y los <b>vehículos tampoco</b> asaltan (aunque sí pueden ser asaltados).</p>
      <p>Se declara el objetivo al anunciar la acción. El objetivo es cualquier unidad enemiga que quede
      <b>a S</b> del asaltante tras su movimiento y a la que tenga línea de fuego.</p>
      <h3>Resolución</h3>
      <ol>
        <li><b>El defensor puede retirarse</b> 2S ignorando el terreno. Entonces el asaltante tira d6 y
            repite mientras acierte: cada éxito es 1 baja y 1 Estrés. El defensor acaba con <b>3 de Estrés</b>
            y desactivado. Si alguna figura sale de la mesa, la unidad se elimina.</li>
        <li>El asaltante mueve su líder hasta <b>S o menos</b> del enemigo. Ese movimiento puede provocar
            fuego reactivo: si el asaltante se echa cuerpo a tierra o queda pinned/panicked, <b>el asalto se detiene</b>.</li>
        <li>Se montan las reservas de cuerpo a cuerpo (según el perfil de cada arma) y se aplican los modificadores.</li>
        <li>Los dos tiran a la vez. <b>Gana quien consigue más impactos</b>, no quien causa más bajas.
            En empate gana el defensor.</li>
        <li>Cada impacto no anulado se salva con <b>1d8</b>, sea cual sea el terreno.</li>
        <li>El perdedor se retira 2S. El ganador puede reposicionarse con un Advance de S gratis
            (no provoca fuego reactivo) y recibe marcador de Fuego.</li>
        <li>Todos los participantes quedan <b>desactivados</b>.</li>
      </ol>
      <p><b>Estrés final:</b> ganador 1 por equipo, perdedor 2 por equipo.</p>
      <div class="warn">Una unidad <i>panicked</i> asaltada no tira dados: <b>todas sus figuras se retiran</b>
      como bajas y la unidad se elimina.</div>`,
    refs: [{ doc: 'crb', page: 35 }, { doc: 'crb', page: 36 }, { doc: 'crb', page: 37 }],
  },

  {
    id: 'reactivo',
    cat: 'Combate',
    icono: '↩️',
    titulo: 'Fuego reactivo',
    resumen: 'Solo el jugador inactivo, cuesta una acción y una acción enemiga solo lo permite una vez.',
    buscar: 'reactivo reactive fire reaccion respuesta disparar interrumpir',
    html: `
      <p>Una unidad <b>con al menos una acción disponible</b> puede disparar cuando el enemigo
      <b>se mueve o dispara</b>. Es una acción normal y gasta una de las dos del turno.</p>
      <ul>
        <li>Solo puede disparar así el <b>jugador inactivo</b> (el que no está resolviendo la carta).</li>
        <li>La acción enemiga <b>se interrumpe</b>, se resuelve el fuego y luego continúa.</li>
        <li><b>Una misma acción enemiga solo puede desencadenar un fuego reactivo</b>: si tienes tres
            unidades con línea de fuego, eliges <b>una</b>.</li>
        <li><b>Nunca</b> se puede disparar reactivamente contra otro fuego reactivo.</li>
      </ul>
      <p>Contra una unidad que se mueve puedes interrumpirla en cualquier punto del recorrido: los
      modificadores se calculan con la posición del líder <b>en ese momento</b>. Si la unidad se echa
      cuerpo a tierra o queda pinned/panicked, su movimiento <b>termina ahí</b>.</p>
      <div class="warn">Disparar en reactivo tiene <b>▼2</b>. Y ojo a la carrera: si una unidad corre
      campo a través y le disparas en reactivo, sus salvaciones son solo <b>d6</b>.</div>`,
    refs: [{ doc: 'crb', page: 24 }, { doc: 'crb', page: 39 }],
  },

  {
    id: 'cobertura',
    cat: 'Combate',
    icono: '🧱',
    titulo: 'Cobertura',
    resumen: 'Cuenta si al menos la mitad de la unidad está cubierta respecto al líder que dispara.',
    buscar: 'cobertura cover ligera pesada muro edificio obstaculo linea',
    html: `
      <p>La cobertura se comprueba <b>solo desde la posición del líder del tirador</b> (o del vehículo).</p>
      <h3>Infantería</h3>
      <ul>
        <li>Si al menos <b>la mitad de las figuras</b> de la unidad están en un área de cobertura,
            la unidad entera tiene esa cobertura.</li>
        <li>Si hay un <b>obstáculo lineal</b> entre el líder y al menos la mitad de las figuras, la unidad
            tiene cobertura de ese obstáculo. Si el líder está <b>en contacto</b> con el obstáculo, se ignora.</li>
        <li>Si hay <b>terreno de área</b> con cobertura entre el líder y al menos la mitad de las figuras,
            se aplica esa cobertura.</li>
      </ul>
      <h3>Vehículos</h3>
      <p>La cobertura debe tapar al menos <b>la mitad del vehículo</b> visto desde el tirador.</p>
      <p>Efecto: cobertura ligera <b>▼1</b>, cobertura pesada <b>▼2</b> al disparo. En la tirada de salvación,
      cobertura pesada da <b>d12</b> en lugar de d8.</p>
      <div class="note">Contra armas <b>HE</b> en edificios, bosque denso o jungla, el tirador gana <b>▲2</b>:
      la cobertura no protege tanto de una explosión.</div>`,
    refs: [{ doc: 'crb', page: 39 }, { doc: 'crb', page: 31 }],
  },

  /* ============ MORAL ============ */
  {
    id: 'moral',
    cat: 'Moral',
    icono: '🧠',
    titulo: 'Estrés y niveles de moral',
    resumen: 'Tres fichas de Estrés bajan un nivel de moral. El nivel cambia lo que la unidad puede hacer.',
    buscar: 'moral estres stress shaken pinned panicked confident chequeo',
    html: `
      <table>
        <tr><th>Nivel</th><th>Color</th><th>Efecto</th></tr>
        <tr><td><b>Confident</b></td><td>verde</td><td>Sin efecto</td></tr>
        <tr><td><b>Shaken</b></td><td>amarillo</td><td><b>▼2</b> a las acciones de disparo</td></tr>
        <tr><td><b>Pinned</b></td><td>naranja</td><td>▼1 a chequeos de moral · <b>no puede usar Move ni Engage</b>
          · siempre se considera cuerpo a tierra</td></tr>
        <tr><td><b>Panicked</b></td><td>rojo</td><td>Igual que pinned, y además <b>hace chequeo cada vez que
          fuera a recibir Estrés</b></td></tr>
      </table>
      <p>Al recibir el <b>tercer</b> punto de Estrés, la unidad <b>no coge la ficha</b>: baja un nivel de
      moral y <b>descarta todas</b> sus fichas de Estrés.</p>
      <p>Se recibe Estrés al aguantar fuego, en el cuerpo a cuerpo, al echarse cuerpo a tierra, al ver
      eliminar una unidad amiga cercana y por algunas reglas especiales.</p>
      <h3>Chequeos de moral</h3>
      <p>Se tiran con el dado de la experiencia (<b>Recruit d6, Trained d8, Elite d12</b>) y éxito a <b>5+</b>.
      Los modificadores son boost y burn <b>acumulables</b>:</p>
      <ul>
        <li><b>▲1</b> si el comandante está a <b>M</b> o menos (no hace falta que lo vea).</li>
        <li><b>▲1</b> en cobertura pesada frente a todos los enemigos detectados.</li>
        <li><b>▼1</b> si hay algún enemigo a <b>M</b> o menos y en línea de visión.</li>
        <li><b>▼1</b> si la unidad está pinned o panicked.</li>
        <li><b>▼1</b> si ha perdido más de la mitad de sus figuras (solo unidades que empezaron con 3 o más).</li>
      </ul>`,
    refs: [{ doc: 'crb', page: 43 }],
  },

  {
    id: 'tacticas',
    cat: 'Moral',
    icono: '🔁',
    titulo: 'Rally, Fall Back y Unlimber',
    resumen: 'Las tres órdenes Tactical: recuperar moral, romper el contacto o desplegar el arma pesada.',
    buscar: 'rally reagrupar fall back retroceder unlimber desplegar tactico retirada moral',
    html: `
      <h3>Rally (reagrupar)</h3>
      <p>Es un chequeo de moral. <b>Primero descarta todos sus puntos de Estrés</b> y luego tira:
      con éxito sube un nivel (panicked → pinned → shaken → confident). Si falla, no sube, pero el Estrés
      ya se ha descartado.</p>
      <h3>Fall Back (retroceder)</h3>
      <ul>
        <li><b>Infantería:</b> movimiento de <b>2S</b> alejándose de todos los enemigos visibles y detectados.
            El terreno no lo frena. Debe recorrerse entero: si no cabe, no se puede hacer Fall Back.</li>
        <li><b>Vehículo:</b> hace un Advance normal, con terreno.</li>
        <li>Si al terminar el líder queda a <b>más de L</b> de todos los enemigos visibles y detectados,
            la unidad <b>descarta su Estrés y sube un nivel de moral automáticamente</b> (el vehículo,
            además, debe haber acabado más lejos que donde empezó).</li>
      </ul>
      <div class="warn">Un Fall Back <b>puede provocar fuego reactivo</b>. Si la unidad se echa cuerpo a
      tierra por ese fuego, <b>el Fall Back se cancela</b>: se queda donde estaba y sin mejorar.</div>
      <h3>Unlimber (desplegar)</h3>
      <p>Solo para equipos con <b>armas pesadas</b> (MMG, HMG, mortero, artillería). Sin esta acción el
      arma <b>no puede disparar</b>. Al desplegarla se orienta hacia donde quieras y también sirve para
      <b>reorientarla</b> después. Hay que indicar claramente la orientación al rival, porque estas armas
      tienen campo de tiro restringido.</p>`,
    refs: [{ doc: 'crb', page: 41 }, { doc: 'crb', page: 44 }],
  },

  {
    id: 'bajas',
    cat: 'Moral',
    icono: '☠️',
    titulo: 'Unidades eliminadas y fin de partida',
    resumen: 'Perder una unidad cuesta Estrés a los vecinos; perder más de la mitad de la fuerza es rendirse.',
    buscar: 'eliminada baja breakpoint ruptura derrota rendirse mitad figuras',
    html: `
      <p>Cuando una unidad es eliminada, <b>todas las unidades amigas a S o menos</b> reciben
      inmediatamente <b>1 de Estrés</b>. Se mide desde el líder de equipo (la última figura retirada)
      o desde cualquier punto del vehículo destruido.</p>
      <h3>Breakpoint</h3>
      <p>Al final de cada turno se comparan las figuras que quedan con las retiradas como bajas:</p>
      <ul>
        <li>Un <b>vehículo cuenta como 1 figura</b>.</li>
        <li>Las <b>piezas de artillería no cuentan</b>, solo su tripulación.</li>
      </ul>
      <p>Si has perdido <b>más de la mitad</b> de las figuras de tu fuerza, la fuerza abandona sus
      posiciones: <b>pierdes la partida</b> y el rival obtiene una victoria total. Si las dos fuerzas
      se rinden a la vez, es <b>empate</b>.</p>`,
    refs: [{ doc: 'crb', page: 44 }],
  },

  /* ============ VEHÍCULOS ============ */
  {
    id: 'vehiculos-mover',
    cat: 'Vehículos',
    icono: '🚙',
    titulo: 'Mover un vehículo',
    resumen: 'Ruedas y semiorugas 3 reglas, orugas 2. Se puede parar en cualquier punto del recorrido.',
    buscar: 'vehiculo mover ruedas orugas semioruga reglas giro torreta atropellar terreno peligroso',
    html: `
      <p>Los vehículos <b>no avanzan una distancia fija</b>: mueven un número de <b>reglas</b> que puedes
      combinar libremente (por ejemplo una L y dos S).</p>
      <table>
        <tr><th>Propulsión</th><th>Velocidad</th></tr>
        <tr><td>Ruedas</td><td>3 reglas</td></tr>
        <tr><td>Semioruga</td><td>3 reglas</td></tr>
        <tr><td>Orugas</td><td><b>2 reglas</b> (pueden arriesgarse por cualquier terreno)</td></tr>
      </table>
      <h3>Cómo se coloca</h3>
      <ul>
        <li>La <b>primera regla</b> parte del centro de la <b>cara frontal</b>, con un ángulo de hasta <b>45°</b>.</li>
        <li>Cada regla siguiente parte del extremo de la anterior, girando hasta <b>90°</b>.</li>
        <li>El vehículo acaba con el centro de su <b>cara trasera</b> en el extremo de la última regla,
            pero puede <b>parar en cualquier punto</b> del recorrido.</li>
      </ul>
      <p><b>Marcha atrás:</b> cuesta una regla. <b>Orugas:</b> pueden gastar una regla para girar hasta 180°
      sobre su centro, al principio o al final del movimiento. Al terminar un Advance, si tienen torreta,
      pueden girarla.</p>
      <p><b>Atravesar tropas:</b> los vehículos pueden pasar entre unidades, que se apartan lo justo sin
      gastar acción. Si la unidad atravesada es enemiga, recibe <b>1 de Estrés</b>.</p>
      <div class="warn"><b>Terreno peligroso:</b> si entras, tira 1d6. Con <b>5+</b> el vehículo queda
      <b>inmovilizado para el resto de la partida</b>.</div>`,
    refs: [{ doc: 'crb', page: 51 }, { doc: 'crb', page: 52 }, { doc: 'crb', page: 58 }],
  },

  {
    id: 'vehiculos-disparar',
    cat: 'Vehículos',
    icono: '🎯',
    titulo: 'Disparar con un vehículo',
    resumen: 'Una primaria y una secundaria, con arcos de tiro según el montaje. La torreta gira con penalización.',
    buscar: 'vehiculo disparar torreta casco pintle coaxial arco 45 360 montaje',
    html: `
      <p>Un vehículo puede disparar <b>un arma primaria y una secundaria</b>. La secundaria solo puede
      disparar <b>si también dispara la primaria</b>. Pueden ir a <b>objetivos distintos</b>, siempre que
      los dos estén detectados. Las armas <b>coaxiales</b> no disparan a la vez que su primaria.</p>
      <table>
        <tr><th>Montaje</th><th>Arco de tiro</th></tr>
        <tr><td>Casco <code>-H-</code></td><td>45°</td></tr>
        <tr><td>Pintle <code>-P-</code></td><td>360°</td></tr>
        <tr><td>Torreta <code>-T-</code></td><td>45°, pero puede girarse antes de disparar con <b>▼1</b></td></tr>
      </table>
      <p>Un vehículo <b>no descubierto</b> se considera con escotillas cerradas: no puede usar las
      ametralladoras exteriores, y por eso no suelen aparecer en su perfil.</p>
      <h3>Si el vehículo es destruido</h3>
      <p>Cada unidad a <b>VS o menos</b> tira <b>1d6</b>: por cada éxito sufre <b>1 baja y 1 Estrés</b> y
      <b>vuelve a tirar</b>, encadenando hasta fallar. El vehículo no se retira: queda como <b>pecio</b>
      y pasa a ser una pieza de terreno.</p>`,
    refs: [{ doc: 'crb', page: 54 }],
  },

  {
    id: 'transporte',
    cat: 'Vehículos',
    icono: '🚚',
    titulo: 'Transportes',
    resumen: 'Embarcar y desembarcar son acciones de avance. Un transporte destruido es muy mal negocio.',
    buscar: 'transporte embarcar desembarcar camion semioruga pasajeros open topped',
    html: `
      <ul>
        <li><b>Embarcar</b>: acción de <b>advance</b>; el líder debe estar a <b>S o menos</b> del vehículo
            al empezar. Se retiran las figuras.</li>
        <li><b>Desembarcar</b>: otra <b>advance</b>; el líder se coloca en contacto con el vehículo y se
            mide desde ahí. <b>Desembarcar nunca permite asaltar.</b></li>
        <li><b>Disparar desde dentro</b>: solo si el vehículo es <b>open-topped</b> y solo con armas
            <b>Sidearm</b>; como mucho la <b>mitad</b> de esas figuras, redondeando hacia arriba.</li>
        <li><b>La unidad embarcada como objetivo</b>: cobertura <b>pesada</b> si el blindaje es 1 o más,
            <b>ligera</b> si es 0. Puede echarse cuerpo a tierra.</li>
      </ul>
      <p><b>Si el transporte sufre Estrés</b>, cada unidad transportada recibe <b>1 de Estrés</b>.</p>
      <div class="warn"><b>Transporte destruido:</b> se tira <b>1d6 por cada figura transportada</b> y cada
      éxito es una baja. Después el líder se coloca en contacto con el vehículo, el resto a S de él, la
      unidad queda <b>desactivada</b> y su <b>moral baja un nivel</b>.</div>`,
    refs: [{ doc: 'crb', page: 55 }],
  },

  {
    id: 'proteger-con-vehiculo',
    cat: 'Vehículos',
    icono: '🛡️',
    titulo: 'Escudar infantería con un vehículo',
    resumen: 'Avanzan juntos gastando una sola orden: la protección se mide antes del movimiento.',
    buscar: 'escudar proteger infanteria detras vehiculo avanzar coordinado',
    html: `
      <p>Si haces un <b>advance</b> con el líder de una unidad <b>en contacto con un vehículo amigo</b>,
      puedes activar el vehículo a la vez para un movimiento de <b>VS</b>. Gasta una acción del vehículo,
      pero <b>no una orden adicional</b>.</p>
      <ul>
        <li>Avanzan coordinados: si la infantería se detiene, el vehículo se detiene en ese punto.</li>
        <li>La <b>cobertura y las líneas de visión se miden antes del movimiento</b> y la infantería conserva
            la misma protección durante todo el trayecto.</li>
        <li>Si el vehículo es destruido en ese movimiento, ambos se detienen y la infantería recibe <b>1 de Estrés</b>.</li>
      </ul>`,
    refs: [{ doc: 'crb', page: 54 }],
  },

  /* ============ TERRENO ============ */
  {
    id: 'terreno',
    cat: 'Terreno y edificios',
    icono: '🌳',
    titulo: 'Tipos de terreno y sus efectos',
    resumen: 'Cada pieza se define por tipo, cobertura, altura y efecto sobre el movimiento.',
    buscar: 'terreno bosque ruinas pantano muro alambre bocage nieve cobertura altura',
    html: `
      <p>Antes de jugar se acuerda qué es cada pieza, con cuatro datos: <b>tipo</b> (área u obstáculo),
      <b>cobertura</b> (ninguna, ligera o pesada), <b>altura</b> (baja o alta) y <b>efecto sobre el movimiento</b>.</p>
      <table>
        <tr><th>Terreno</th><th>Tipo</th><th>Cobertura</th><th>Altura</th><th>Equipos</th><th>Ruedas</th><th>Orugas</th></tr>
        <tr><td>Hierba alta, campos arados</td><td>Área</td><td>—</td><td>Baja</td><td>—</td><td>3R</td><td>2R</td></tr>
        <tr><td>Suelo rocoso</td><td>Área</td><td>Ligera</td><td>Baja</td><td>—</td><td>2R</td><td>2R</td></tr>
        <tr><td>Bosques, huertos</td><td>Área</td><td>Ligera</td><td>Alta</td><td>—</td><td>2R</td><td>2R</td></tr>
        <tr><td>Pantanos</td><td>Área</td><td>Pesada</td><td>Baja</td><td>No correr</td><td>Impasable</td><td>Impasable</td></tr>
        <tr><td>Bosque denso, jungla</td><td>Área</td><td>Pesada</td><td>Alta</td><td>No correr</td><td>Impasable</td><td>Impasable</td></tr>
        <tr><td>Ruinas</td><td>Área</td><td>Pesada</td><td>Alta</td><td>No correr</td><td>Impasable</td><td>Impasable</td></tr>
        <tr><td>Barreras de madera</td><td>Obstáculo</td><td>Ligera</td><td>Baja</td><td>No correr</td><td>2R</td><td>2R</td></tr>
        <tr><td>Muros bajos, barricadas</td><td>Obstáculo</td><td>Pesada</td><td>Baja</td><td>No correr</td><td>Impasable</td><td>2R</td></tr>
        <tr><td>Bocage</td><td>Obstáculo</td><td>Pesada</td><td>Alta</td><td>Trepar</td><td>Impasable</td><td>1R (avería)</td></tr>
        <tr><td>Muros, empalizadas</td><td>Obstáculo</td><td>—</td><td>Alta</td><td>Trepar</td><td>Impasable</td><td>1R (avería)</td></tr>
      </table>
      <h3>Altura y línea de visión</h3>
      <ul>
        <li>Obstáculo <b>bajo</b>: no afecta a la línea de visión. <b>Alto</b>: la bloquea.</li>
        <li>Área <b>baja</b>: no afecta. Área <b>alta</b>: la línea de visión puede entrar pero
            <b>no avanzar más de 2S</b> dentro.</li>
      </ul>
      <p><b>Cobertura:</b> ligera da <b>d8</b> en la salvación, pesada <b>d12</b>. Si una línea de fuego
      cruza varias coberturas, <b>se acumulan</b>.</p>`,
    refs: [{ doc: 'crb', page: 57 }, { doc: 'crb', page: 58 }],
  },

  {
    id: 'edificios',
    cat: 'Terreno y edificios',
    icono: '🏚️',
    titulo: 'Edificios, ruinas y búnkeres',
    resumen: 'Cada planta se divide en áreas de M como máximo. Se entra solo avanzando y no con vehículos.',
    buscar: 'edificio ruina bunker casa planta area abertura ventana asaltar fortificacion',
    html: `
      <p>Un edificio da <b>cobertura pesada</b> y se abstrae: las paredes interiores de una planta se
      ignoran. Cada planta se divide en <b>áreas de M como máximo</b> de ancho y fondo, con un máximo de
      <b>10 figuras por área</b> (ajustable de mutuo acuerdo).</p>
      <ul>
        <li><b>Un área solo admite unidades de un bando</b>, y ninguna unidad puede repartirse entre dos áreas.</li>
        <li>Un <b>comandante</b> dentro del edificio puede dar órdenes a cualquier unidad a <b>L del edificio</b>.</li>
        <li><b>Entrar:</b> solo con <b>advance</b> (nunca corriendo) y con un extremo de la regla cruzando
            el umbral. <b>No entran vehículos ni piezas de artillería.</b></li>
        <li><b>Salir:</b> con advance y solo desde la <b>planta baja</b>.</li>
        <li>Dentro del edificio <b>no se dispara de un área a otra</b>: solo se puede asaltar.</li>
      </ul>
      <h3>Disparar desde un edificio</h3>
      <p>Como máximo disparan <b>el doble del número de aberturas</b> con línea de visión al objetivo.
      Las armas pesadas deben <b>desplegarse frente a una abertura concreta</b> y son las únicas que
      disparan por ella. Los morteros solo desde una azotea plana.</p>
      <h3>Disparar a un edificio</h3>
      <p>Se declara <b>un área</b>; basta con detectar una unidad de dentro. Los impactos se asignan
      <b>de uno en uno, de la unidad mayor a la menor</b>, reiniciando el ciclo cuando todas tienen tantos
      impactos como figuras. El comandante puede ceder su impacto a una unidad con menos impactos que figuras.</p>
      <div class="note"><b>Búnkeres:</b> cuentan como un área única y <b>no se les puede disparar</b>: cualquier
      disparo contra ellos se resuelve como combate cercano. Asaltar la puerta requiere la regla
      <b>Anti-Tank Assault</b>.</div>`,
    refs: [{ doc: 'crb', page: 59 }, { doc: 'crb', page: 61 }, { doc: 'crb', page: 62 }],
  },

  {
    id: 'reglas-especiales',
    cat: 'Terreno y edificios',
    icono: '⭐',
    titulo: 'Reglas especiales',
    resumen: 'Las once reglas que aparecen en las listas de ejército, con sus números.',
    buscar: 'reglas especiales elite recluta camuflado recon atrincherado open topped bombardeo asalto antitanque',
    html: `
      <table>
        <tr><th>Regla</th><th>Efecto</th></tr>
        <tr><td><b>Anti-Tank Assault</b></td><td>En asaltos, las figuras tiran <b>1d8</b> para impactar vehículos
          y usan factor AT <b>E</b></td></tr>
        <tr><td><b>Camouflaged</b></td><td><b>▼3</b> a quien intente detectarla. Se pierde al activarse para
          avanzar, correr o asaltar, o al recibir un marcador de Fuego</td></tr>
        <tr><td><b>Commander</b></td><td>Manda a <b>L</b>, tiene 2 acciones y una acción libre al ser activado.
          No puede ser objetivo de disparo ni asalto si está a <b>VS</b> de una unidad amiga, salvo que sea
          el más cercano y esté a L de quien dispara</td></tr>
        <tr><td><b>Crew</b></td><td>Sus armas cortas se ignoran; <b>1d6</b> por figura en asalto</td></tr>
        <tr><td><b>Elite</b></td><td><b>▲1</b> al disparar y asaltar; moral con <b>d12</b></td></tr>
        <tr><td><b>Entrenched</b></td><td><b>Cobertura pesada</b> y <b>▼2 columnas</b> al ser detectada,
          incluso contra HE y bombardeo. Se pierde al primer movimiento</td></tr>
        <tr><td><b>Open-Topped</b></td><td>Su tripulación no sufre la penalización de detección por vehículo;
          blindaje <b>0</b> en asaltos de infantería</td></tr>
        <tr><td><b>Preparatory Bombardment</b></td><td>Tras desplegar, tira <b>1d6</b> por cada unidad enemiga
          a más de L+M de tus unidades: cada éxito resuelve fuego de howitzer pesado con <b>2d12</b></td></tr>
        <tr><td><b>Recon</b></td><td>Tras desplegar mueve <b>3S</b> sin acercarse a M del enemigo;
          <b>▼1</b> al ser detectada y siempre cuenta como <b>cobertura ligera</b></td></tr>
        <tr><td><b>Recruit</b></td><td><b>▼1</b> al disparar y asaltar; moral con <b>d6</b>;
          <b>1d8</b> antes de asaltar o pierde la acción</td></tr>
      </table>`,
    refs: [{ doc: 'crb', page: 63 }, { doc: 'crb', page: 64 }],
  },

  /* ============ SUPLEMENTO 1939-1943 ============ */
  {
    id: 'recon-moto',
    cat: 'Suplemento 39-43',
    icono: '🏍️',
    titulo: 'Recon motorizado (motos y sidecars)',
    resumen: 'Infantería con hasta dos motos. No son vehículos: no se les dispara a ellos, sino a las figuras.',
    buscar: 'recon moto sidecar motorizado reconocimiento desembarcar',
    html: `
      <p>Un equipo <b>Recon motorizado</b> es infantería con <b>hasta 2 vehículos</b> (motos y/o sidecars).
      Hay que <b>declarar cuál lleva al líder</b> y el otro debe acabar a <b>S</b> de él.</p>
      <ul>
        <li>Todos <b>montados</b> o todos <b>desembarcados</b>.</li>
        <li>Se puede <b>abandonar</b> el vehículo: queda inmóvil. Si un líder enemigo lo toca, queda
            <b>destruido</b>; se recupera al volver a tocarlo.</li>
        <li>Las motos <b>no son vehículos separados</b>: no se les dispara a ellas, solo a las figuras.
            Las bajas se quitan primero de la moto <b>sin líder</b>.</li>
        <li>Montados <b>no pueden echarse cuerpo a tierra</b> y cuentan <b>siempre como equipo de ≤ 2 figuras</b>.</li>
        <li>Para <b>disparar o asaltar hay que desembarcar</b>.</li>
        <li>Mueven <b>4 reglas cualesquiera</b>, la primera en contacto con el vehículo del líder.</li>
        <li>A efectos de terreno cuentan como vehículo de <b>ruedas</b>.</li>
      </ul>`,
    refs: [{ doc: 'e43', page: 3 }],
  },

  {
    id: 'comisario',
    cat: 'Suplemento 39-43',
    icono: '🚩',
    titulo: 'Comisario político soviético',
    resumen: 'Equipo de una figura con dos acciones que se meten en cualquier carta. Muy pegajoso de eliminar.',
    buscar: 'comisario politico sovietico urss commissar',
    html: `
      <p>Equipo de <b>una figura</b> con <b>2 acciones</b> por turno, que pueden resolverse
      <b>antes, después o durante cualquier carta</b> (incluso la del rival).</p>
      <ul>
        <li>A <b>VS</b> de una unidad amiga <b>no puede ser objetivo</b> de disparo ni asalto, salvo que
            sea el enemigo más cercano y esté a <b>L</b> de quien dispara.</li>
        <li>Una unidad amiga a <b>M</b> que hace <b>Rally</b> tira <b>d12 sin modificadores</b>.</li>
        <li>Una unidad a <b>M</b> <b>no puede</b> hacer Fall Back ni retirarse ante un asalto.</li>
        <li>Los <b>Reclutas a M</b> pueden asaltar <b>sin chequeo de moral</b>.</li>
      </ul>`,
    refs: [{ doc: 'e43', page: 30 }],
  },

  {
    id: 'e43-novedades',
    cat: 'Suplemento 39-43',
    icono: '❄️',
    titulo: 'Alambre, nieve, ATR y otros añadidos',
    resumen: 'Reglas nuevas del primer suplemento: alambre de espino, nieve, fusil antitanque y coste ♦.',
    buscar: 'alambre espino nieve esqui ATR fusil antitanque coste diamante periodo early late mid',
    html: `
      <h3>Alambre de espino</h3>
      <p>Un líder en contacto con el alambre y una orden <b>Tactical</b> abre una brecha de <b>VS</b>
      (se marca). Las <b>ruedas no pasan</b>; las orugas sí. Los semiorugas cruzan con <b>tirada de avería</b>.
      La brecha abierta por un vehículo también es de <b>VS</b>.</p>
      <h3>Nieve</h3>
      <p>Solo las unidades con <b>esquís</b> pueden correr. Los vehículos <b>no pueden usar reglas L</b>.</p>
      <h3>Fusil antitanque (ATR)</h3>
      <p>Alcance <b>2L</b>, potencia de fuego <b>—</b>, factor AT <b>E</b>, cuerpo a cuerpo <b>1d6</b>.
      Todos los éxitos para destruir cuentan como <b>5</b>, así que siempre se va a la tabla de daño ligero.
      Tras disparar, tira <b>1d6</b>: con éxito no recibe marcador de Fuego.</p>
      <h3>Coste ♦</h3>
      <p>Una unidad marcada con ♦ obliga a <b>retirar 2 figuras</b> o a <b>gastar 2 refuerzos</b> (queda
      una figura de sobra).</p>
      <h3>Periodos</h3>
      <p>El suplemento introduce <b>Early / Mid / Late War</b>. Para Mid War se puede elegir entre el reglamento
      básico y este suplemento. Se admiten vehículos tempranos en listas tardías y vehículos de una nación
      en listas de otra (por ejemplo, carros franceses en una lista alemana de 1944).</p>`,
    refs: [{ doc: 'e43', page: 2 }, { doc: 'e43', page: 3 }],
  },

  {
    id: 'campana',
    cat: 'Suplemento 39-43',
    icono: '📜',
    titulo: 'Campañas',
    resumen: 'Fuerza de 10 O más 10 O de reserva, con bajas y vehículos que persisten entre partidas.',
    buscar: 'campaña campaña refuerzos reserva entre partidas bajas permanentes arbol',
    html: `
      <ul>
        <li>Fuerza inicial de <b>10 O</b> más una reserva de <b>10 O</b> de refuerzos de campaña,
            con un máximo de <b>3 vehículos</b>.</li>
        <li>Entre partidas se gasta el O de campaña sin superar el OOB inicial y se pueden reorganizar figuras.</li>
        <li>Solo <b>un vehículo de coste 0</b> por escenario.</li>
        <li>Si cae el comandante, se sustituye por <b>1 O</b> de la reserva.</li>
        <li>Vehículo <b>destruido</b> = eliminado. Vehículo <b>dañado</b> = tira <b>d12</b>: éxito repara, fallo elimina.</li>
        <li>Al final de cada partida el perdedor tira <b>d8</b> y retira esas figuras extra como bajas.
            Después, <b>cada figura perdida tira su dado de moral</b>: si acierta vuelve, si falla muere
            definitivamente.</li>
        <li>Árbol de escenarios: 1 → 2 o 5 → 8 o 10, con 11 y 12 como desvíos.</li>
      </ul>`,
    refs: [{ doc: 'e43', page: 50 }, { doc: 'e43', page: 51 }, { doc: 'e43', page: 53 }],
  },

  {
    id: 'erratas',
    cat: 'Suplemento 39-43',
    icono: '🩹',
    titulo: 'Erratas y aclaraciones oficiales (FAQ 2025)',
    resumen: 'El suplemento trae una FAQ y una lista de erratas que cambian varias reglas del libro básico.',
    buscar: 'errata faq aclaracion oficial correccion cambios 2025',
    html: `
      <p>El suplemento incluye una <b>FAQ &amp; Errata 2025</b>. Estas son las que más afectan a la mesa:</p>
      <ul>
        <li><b>Ammo!</b> pasa de <b>+2d6</b> a <b>+1d12</b> al pool de disparo o asalto no dirigido a blindados.</li>
        <li><b>Detección:</b> la penalización por «equipo de 1-2 figuras» solo se aplica si tiene menos de
            3 figuras <b>y no lleva marcador de Fuego</b>. Recon igual. Y <b>siguen sin acumularse</b> (▼1, no ▼2).</li>
        <li><b>Asalto:</b> la infantería que asalta <b>no puede echarse cuerpo a tierra</b> ante fuego reactivo.
            Los modificadores se separan: <b>Shaken ▼2</b> y <b>Pinned ▼4</b>.</li>
        <li><b>Línea de visión y de fuego:</b> basta con trazar desde el <b>centro de la base del líder</b>
            a cualquier punto de la base del objetivo.</li>
        <li><b>SMG y fusiles de asalto:</b> su potencia pasa de <b>2d6 a d8</b>, también en cuerpo a cuerpo.
            El <b>francotirador</b> pasa a <b>d12+</b> y tras disparar el rival tira 1d6: solo recibe marcador
            de Fuego si acierta.</li>
        <li><b>Lanzallamas:</b> no puede usarse en fuego reactivo. Morteros y obuses <b>medios</b>:
            HE (M) pasa a HE (S).</li>
        <li><b>Cobertura acumulativa:</b> dos coberturas ligeras y una pesada son <b>4 burns</b>, también en detección.</li>
        <li><b>Fuego indirecto:</b> se tira <b>1d6</b>; un fallo afecta a <b>mitad del pool</b> (redondeando
            arriba). Las tropas a X del blanco son atacadas con <b>mitad de los dados</b>.</li>
        <li><b>Unidad pinned:</b> <b>no puede</b> hacer fuego reactivo, solo Rally y Fall Back.</li>
        <li><b>Open-topped:</b> su blindaje <b>no se reduce</b> contra morteros (solo contra antitanque).</li>
        <li><b>Objetivos:</b> solo <b>una miniatura</b> en contacto, y ni vehículos ni artillería pueden
            situarse sobre un objetivo.</li>
        <li><b>Fuego reactivo:</b> sí contra quien se redespliega; <b>no</b> contra quien huye o se desengancha.</li>
      </ul>`,
    refs: [{ doc: 'e43', page: 54 }, { doc: 'e43', page: 55 }, { doc: 'e43', page: 57 }, { doc: 'e43', page: 58 }],
  },

  /* ============ EJÉRCITO Y ESCENARIOS ============ */
  {
    id: 'reclutamiento',
    cat: 'Ejército y escenarios',
    icono: '📋',
    titulo: 'Reclutar la fuerza',
    resumen: 'El núcleo del OOB es gratis; el resto se compra en secreto con el presupuesto del escenario.',
    buscar: 'reclutar oob orden de batalla refuerzos apoyo presupuesto estrellas opciones equipo figuras grises',
    html: `
      <p>Cada escenario da un <b>presupuesto</b> (las «estrellas» o ◇ del apartado FORMAT). Se gasta
      <b>en secreto</b>, antes de desplegar, y solo con opciones del OOB que el escenario no prohíba.</p>
      <p>Lo que <b>no cuesta nada</b> es el núcleo de la Orden de Batalla: la escuadra de mando y una o dos
      escuadras de combate, las unidades cuyo nombre no lleva estrellas.</p>
      <h3>Los tres tipos de apoyo</h3>
      <table>
        <tr><th>Tipo</th><th>Qué compra</th></tr>
        <tr><td><b>Reinforcements</b></td><td>Figuras extra que rellenan los <b>huecos grises</b> de los equipos.
          Por ejemplo, 3 figuras por 1 ◇ hasta nueve figuras. <b>Las figuras que no caben se pierden.</b></td></tr>
        <tr><td><b>Fire Support</b></td><td>Equipos o escuadras adicionales: MMG, morteros, antitanque,
          francotiradores… Cada entrada tiene su límite de cantidad y su coste en ◇.</td></tr>
        <tr><td><b>Divisional Support</b></td><td>Vehículos, normalmente a <b>5 ◇</b> cada uno, más extras
          como ametralladoras adicionales.</td></tr>
      </table>
      <p><b>Opciones de equipo:</b> cambiar armas (por ejemplo hasta 4 rifles por subfusiles), añadir
      panzerfausts o comprar rasgos como <b>Elite</b>. Bajar una unidad a <b>Recruit</b> la abarata.</p>
      <div class="note">Límite habitual: <b>3 vehículos por fuerza</b>, sin contar los transportes orgánicos
      de las escuadras. En las siluetas del OOB, la figura negra es una figura real y la gris un hueco
      para refuerzos.</div>`,
    refs: [{ doc: 'crb', page: 66 }, { doc: 'crb', page: 67 }, { doc: 'crb', page: 68 }],
  },

  {
    id: 'escenarios',
    cat: 'Ejército y escenarios',
    icono: '🗺️',
    titulo: 'Cómo leer un escenario',
    resumen: 'Iniciativa, turnos, formato, despliegue, apoyo, objetivos y reglas especiales.',
    buscar: 'escenario leer iniciativa turnos despliegue apoyo objetivos bonus cartas formato',
    html: `
      <p>Todos los escenarios traen los mismos bloques:</p>
      <table>
        <tr><th>Bloque</th><th>Qué indica</th></tr>
        <tr><td><b>Scenery</b></td><td>Terreno obligatorio; el resto lo pactan los jugadores.</td></tr>
        <tr><td><b>Initiative</b></td><td><b>A</b>, <b>B</b> o <b>—</b> (en ese caso se decide al azar antes de desplegar).</td></tr>
        <tr><td><b>Number of turns</b></td><td>Turnos fijos. Si lleva «+», hay turno extra según la tirada que indiquen las reglas especiales.</td></tr>
        <tr><td><b>Format</b></td><td>Presupuesto de apoyo en ◇. Una «X» significa que lo dice el texto.</td></tr>
        <tr><td><b>Deployment</b></td><td>Zonas, quién despliega primero y condiciones.</td></tr>
        <tr><td><b>Support</b></td><td>En qué se puede gastar el presupuesto.</td></tr>
        <tr><td><b>Objectives</b></td><td>Valor de los objetivos y diferencia de PV para ganar.</td></tr>
        <tr><td><b>Special rules</b> y <b>Bonus cards</b></td><td>Reglas propias y cómo se roban cartas de bonificación.</td></tr>
      </table>
      <h3>Objetivos</h3>
      <p>Los marcadores miden 2–3 cm y suelen venir numerados <b>1, 1, 2, 2, 2, 3</b>. Para controlar uno,
      el <b>comandante o un líder de equipo debe terminar una acción de movimiento en contacto</b> con él.
      <b>Los vehículos no controlan objetivos</b> y solo una miniatura puede estar en contacto.</p>
      <h3>Los once escenarios</h3>
      <table>
        <tr><th>#</th><th>Nombre</th><th>Apoyo</th><th>De qué va</th></tr>
        <tr><td>1</td><td>First Encounter</td><td>2 ◇</td><td>Solo infantería: sin vehículos, edificios ni HE. El de iniciación.</td></tr>
        <tr><td>2</td><td>Every Objective Counts</td><td>6 ◇</td><td>Cinco objetivos ocultos con valores distintos.</td></tr>
        <tr><td>3</td><td>A Question of Balance</td><td>6 o 10 ◇</td><td>Simétrico; PV por bajas y por salir por el borde rival.</td></tr>
        <tr><td>4</td><td>The Outskirts</td><td>defensor 3–6 ◇, atacante el doble</td><td>El defensor se atrinchera en tres edificios y sufre bombardeo.</td></tr>
        <tr><td>5</td><td>The Crossroads</td><td>9 o 12 ◇</td><td>Cruce central; los vehículos entran desde fuera de la mesa.</td></tr>
        <tr><td>6</td><td>The Road to Hell</td><td>6 vs 12 ◇</td><td>Camino con restos en llamas y llegadas escalonadas.</td></tr>
        <tr><td>7</td><td>Shifting Lines</td><td>6 o 10 ◇</td><td>Cada jugador coloca sus objetivos y puede moverlos.</td></tr>
        <tr><td>8</td><td>Escape</td><td>6 ◇</td><td>Un bando cercado debe salir por el borde sur.</td></tr>
        <tr><td>9</td><td>A Tight Pinch</td><td>variable, la elige el defensor</td><td>Edificio central muy disputado.</td></tr>
        <tr><td>10</td><td>We Must Hold</td><td>6 ◇</td><td>Río y puente; el defensor está atrincherado.</td></tr>
        <tr><td>XL</td><td>Grand Manoeuvres</td><td>14 o 22 ◇ por equipo</td><td>Cuatro jugadores en dos equipos, mesa 180 × 120 cm.</td></tr>
      </table>`,
    refs: [{ doc: 'crb', page: 69 }, { doc: 'crb', page: 70 }, { doc: 'crb', page: 111 }],
  },
];
