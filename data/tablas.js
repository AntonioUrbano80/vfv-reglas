/* Tablas y modificadores para consultar a media partida.
   Valores tomados del reglamento básico (Studio Tomahawk, 2024).
   Las páginas son las del PDF (= impresa + 1).
   Símbolos: ▲ = boost (sube un escalón de dado), ▼ = burn (baja un escalón). */

// Perfiles cotejados con CRB impreso 44 y 46–48, hoja resumen v3.5 y FAQ v2.5.
function weaponProfileTable(rows, label) {
  const escape = value => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  return '<div class="weapon-table-scroll" role="region" tabindex="0" aria-label="' + escape(label) + '"><table class="weapon-profiles"><thead><tr><th>Arma</th><th>Alcance</th><th>Potencia</th><th>HE</th><th>Factor AT</th><th>Cuerpo a cuerpo</th><th>Notas</th></tr></thead><tbody>' + rows.map(([key, ...cells]) => '<tr data-weapon="' + key + '">' + cells.map(value => '<td>' + escape(value) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>';
}

window.VFV_TABLAS = [
  {
    id: 'turno',
    titulo: 'Estructura del turno',
    nota: 'Un turno tiene tres pasos. La fase de activación se repite 7 veces (una por carta).',
    html: `
      <table>
        <tr><th>Paso</th><th>Qué ocurre</th></tr>
        <tr><td><b>1. Preparación</b></td>
          <td>Cada jugador recupera sus <b>7 cartas de activación</b> y su carta de Habilidad Especial.
          Se resuelven los efectos de «inicio de turno» del escenario. No hay mazo: todas las cartas están
          disponibles desde el principio.</td></tr>
        <tr><td><b>2. Activación</b></td>
          <td><b>7 fases.</b> En cada una: ambos eligen carta en secreto y boca abajo → se revelan a la vez →
          resuelve primero la Iniciativa más alta → el otro responde con fuego reactivo o retirándose →
          la carta se descarta. Cuando ambos han resuelto, empieza la fase siguiente.</td></tr>
        <tr><td><b>3. Mopping up</b></td>
          <td>Se anotan los PV del turno. Se comprueba el final de partida (último turno o breakpoint).
          Si continúa, se retiran <b>solo</b> las fichas de acción rojas y verdes.</td></tr>
      </table>
      <p class="note-line"><b>Fin de la fase de activación:</b> cuando todas las unidades están desactivadas
      o cuando los jugadores se quedan sin cartas.</p>`,
    refs: [{ doc: 'crb', page: 19 }, { doc: 'crb', page: 20 }, { doc: 'crb', page: 22 }],
  },

  {
    id: 'distancias',
    titulo: 'Medidas, movimiento y acciones',
    nota: 'Se puede medir en cualquier momento, incluso sin estar activo.',
    html: `
      <table>
        <tr><th>Concepto</th><th>Distancia / valor</th></tr>
        <tr><td>Reglas</td><td><b>VS</b> 5 cm · <b>S</b> 10 cm · <b>M</b> 15 cm · <b>L</b> 30 cm (se suman: 2S = 20 cm, M+S = 25 cm)</td></tr>
        <tr><td>Mando del comandante</td><td><b>L</b> (30 cm) a cualquier unidad</td></tr>
        <tr><td>Órdenes a una escuadra</td><td><b>L</b> entre equipos de la misma escuadra (líder a líder)</td></tr>
        <tr><td>Advance (a pie)</td><td><b>1S</b></td></tr>
        <tr><td>Run (solo equipos a pie)</td><td><b>2S</b>; nunca vehículos ni equipos con arma <i>Cumbersome</i></td></tr>
        <tr><td>Fall Back (infantería)</td><td><b>2S</b> alejándose de todo enemigo visible, ignorando el terreno</td></tr>
        <tr><td>Fall Back (vehículo)</td><td>un <b>Advance</b> (le afecta el terreno)</td></tr>
        <tr><td>Acciones por unidad y turno</td><td><b>2</b> como máximo; las órdenes sobrantes se pierden</td></tr>
        <tr><td>Ficha de acción</td><td>sin ficha = 0 acciones · <b>verde</b> = 1 · <b>roja</b> = 2 (desactivada)</td></tr>
        <tr><td>Quitar marcador de Fuego</td><td>al moverse al menos <b>S</b> de la posición anterior</td></tr>
        <tr><td>Detección estándar</td><td><b>3L</b>; nunca menos de <b>M</b> por muchas penalizaciones</td></tr>
        <tr><td>Estrés para bajar moral</td><td><b>3</b> fichas → baja un nivel y las descarta todas</td></tr>
      </table>`,
    refs: [{ doc: 'crb', page: 9 }, { doc: 'crb', page: 23 }, { doc: 'crb', page: 25 }, { doc: 'crb', page: 41 }],
  },

  {
    id: 'spotting',
    titulo: 'Detección (spotting)',
    nota: 'Los modificadores son acumulativos y se aplican sobre la columna roja (3L). No hace falta tirada.',
    html: `
      <table>
        <tr><th>Columna</th><th>M</th><th>L</th><th>2L</th><th style="color:#e8b07a">3L</th><th>&gt;3L</th></tr>
        <tr><td>Distancia</td><td>15 cm</td><td>30 cm</td><td>60 cm</td><td style="color:#e8b07a"><b>90 cm</b></td><td>toda la mesa</td></tr>
      </table>
      <p class="note-line">Se mueve una columna a la izquierda por cada ▼ y a la derecha por cada ▲.
      A la derecha de 3L la distancia es ilimitada; nunca se baja de M.</p>
      <table>
        <tr><th>Situación del objetivo</th><th></th></tr>
        <tr><td>Escuadra de ≤ 2 figuras / unidad Recon</td><td>▼1</td></tr>
        <tr><td>Unidad camuflada</td><td>▼3</td></tr>
        <tr><td>La unidad tiene marcador de Fuego</td><td>▲2</td></tr>
        <tr><td>Es un vehículo</td><td>▲2</td></tr>
      </table>
      <table>
        <tr><th>Situación del observador</th><th></th></tr>
        <tr><td>Vehículo (salvo descubierto)</td><td>▼1</td></tr>
      </table>
      <table>
        <tr><th>Clima (el peor)</th><th></th></tr>
        <tr><td>Lluvia / cielo cubierto</td><td>▼1</td></tr>
        <tr><td>Niebla / oscuridad</td><td>▼2</td></tr>
      </table>
      <table>
        <tr><th>Terreno</th><th></th></tr>
        <tr><td>Cada obstáculo lineal cruzado</td><td>▼1</td></tr>
        <tr><td>Cobertura ligera, por cada S</td><td>▼1</td></tr>
        <tr><td>Cobertura pesada, por cada S</td><td>▼2</td></tr>
      </table>
      <p class="note-line">El que observa y toca el obstáculo lineal no sufre su penalización.
      Recon y «equipo de ≤ 2 figuras» no se acumulan (solo ▼1).</p>
      <p class="note-line"><b>Errata 2025:</b> esa penalización de ▼1 solo se aplica si el equipo tiene
      menos de 3 figuras <b>y no lleva marcador de Fuego</b>.</p>`,
    refs: [{ doc: 'crb', page: 28 }, { doc: 'crb', page: 29 }],
  },

  {
    id: 'disparo',
    titulo: 'Disparo antipersonal',
    nota: 'Se dispara con orden Engage o con fuego reactivo. Éxito con 5+; cada éxito es un impacto.',
    html: `
      <table>
        <tr><th>La unidad que dispara</th><th></th></tr>
        <tr><td>Es Élite</td><td>▲1</td></tr>
        <tr><td>Es Recluta</td><td>▼1</td></tr>
        <tr><td>Está <i>shaken</i> (amarilla)</td><td>▼2</td></tr>
        <tr><td>Es fuego reactivo</td><td>▼2</td></tr>
        <tr><td>Giró la torreta antes de disparar</td><td>▼1</td></tr>
      </table>
      <table>
        <tr><th>Unidad objetivo (solo equipos, no se acumulan)</th><th></th></tr>
        <tr><td>Equipo de ≤ 2 figuras</td><td>▼1</td></tr>
        <tr><td>Se ha echado cuerpo a tierra / está camuflada</td><td>▼2</td></tr>
      </table>
      <table>
        <tr><th>Cobertura del objetivo (solo infantería; no vale en fuego de supresión)</th><th></th></tr>
        <tr><td>Cobertura ligera / unidad Recon</td><td>▼1</td></tr>
        <tr><td>Cobertura pesada</td><td>▼2</td></tr>
        <tr><td>Armas HE contra edificios, bosque denso o jungla</td><td>▲2</td></tr>
      </table>
      <p class="note-line">Los modificadores marcados en verde en el reglamento (equipo de ≤ 2 figuras,
      cobertura ligera y pesada) <b>no se aplican al fuego indirecto</b>.</p>
      <p class="note-line"><b>Cuerpo a tierra:</b> la unidad objetivo sufre 1 de Estrés y el tirador recibe
      la penalización. Una unidad <i>pinned</i> o <i>panicked</i> cuenta siempre como echada cuerpo a tierra,
      sin gastar Estrés. Se mantiene hasta que se resuelve la carta en curso.</p>`,
    refs: [{ doc: 'crb', page: 30 }, { doc: 'crb', page: 31 }, { doc: 'crb', page: 39 }],
  },

  {
    id: 'defensa',
    titulo: 'Tirada de defensa',
    nota: 'Se tira un dado por cada impacto recibido. Cada éxito anula un impacto.',
    html: `
      <table>
        <tr><th>Dónde está la unidad</th><th>Dado</th></tr>
        <tr><td>Corriendo campo a través (fuego reactivo)</td><td><b>d6</b></td></tr>
        <tr><td>En cualquier otra situación</td><td><b>d8</b></td></tr>
        <tr><td>En cobertura pesada</td><td><b>d12</b></td></tr>
        <tr><td>En fortificaciones</td><td><b>d12</b> que se puede repetir</td></tr>
      </table>
      <p class="note-line">Los impactos no anulados matan una figura cada uno. La figura del líder de equipo
      <b>siempre se retira la última</b>. Si el número de bajas supera las figuras con línea de fuego,
      el exceso se pierde.</p>`,
    refs: [{ doc: 'crb', page: 31 }, { doc: 'crb', page: 32 }],
  },

  {
    id: 'at',
    titulo: 'Disparo antitanque (AT)',
    nota: 'Cada arma AT dispara por separado: 1d12 para impactar y luego el dado de penetración. Resultado >5 destruye; exactamente 5 = daño ligero.',
    html: `
      <table>
        <tr><th>Blindaje ▼ / Factor AT ►</th><th>A</th><th>B</th><th>C</th><th>D</th></tr>
        <tr><td>0</td><td>d12+</td><td>d12+</td><td>d12+</td><td>d12</td></tr>
        <tr><td>1</td><td>d12+</td><td>d12+</td><td>d12</td><td>d8</td></tr>
        <tr><td>2</td><td>d12+</td><td>d12+</td><td>d8</td><td>d6</td></tr>
        <tr><td>3</td><td>d12+</td><td>d12</td><td>d6</td><td>d6−</td></tr>
        <tr><td>4</td><td>d12</td><td>d8</td><td>d6−</td><td>—</td></tr>
      </table>
      <p class="note-line"><b>d12+</b> = tira d12 y d6 y usa el mejor. <b>d6−</b> = tira 2d6 y usa el peor.
      «—» significa que ese arma no puede penetrar ese blindaje.</p>
      <table>
        <tr><th>Modificadores (a la tirada de 1d12 para impactar)</th><th></th></tr>
        <tr><td>Es Élite / es Recluta</td><td>▲1 / ▼1</td></tr>
        <tr><td>Unidad <i>shaken</i> / fuego reactivo</td><td>▼2 / ▼2</td></tr>
        <tr><td>Ha movido antes de disparar / giró la torreta</td><td>▼1 / ▼1</td></tr>
        <tr><td>Cobertura ligera o Recon / cobertura pesada (≥ mitad del vehículo tapado)</td><td>▼1 / ▼2</td></tr>
      </table>
      <p class="note-line">El blindaje se reduce en 1 (mínimo 1) si se dispara al <b>flanco, retaguardia o desde arriba</b>.
      No se aplica a vehículos con blindaje 0.</p>
      <p class="note-line">Si el vehículo no queda destruido al final de la acción de disparo, recibe
      <b>1 de Estrés</b>.</p>`,
    refs: [{ doc: 'crb', page: 33 }],
  },

  {
    id: 'armas-ligeras',
    titulo: 'Armas ligeras contra vehículos ligeros',
    nota: 'Vehículo ligero = blindaje 0, 1 o 2. Se usa con armas de factor AT E, F o G.',
    html: `
      <table>
        <tr><th>Blindaje ▼ / Factor AT ►</th><th>E</th><th>F</th><th>G</th></tr>
        <tr><td>0</td><td>d12</td><td>d12</td><td>d12</td></tr>
        <tr><td>1</td><td>d8</td><td>d6</td><td>—</td></tr>
        <tr><td>2</td><td>d6−</td><td>—</td><td>—</td></tr>
      </table>
      <p class="note-line">Se dispara como fuego antipersonal normal y se cuentan los impactos:
      <b>3 impactos</b> = tira el dado de la tabla; cada impacto extra <b>boostea</b> el dado; cada impacto
      que falte lo <b>quema</b>. Resultado >5 destruye; exactamente 5 = daño ligero.</p>
      <p class="note-line"><b>Armas AT portátiles:</b> una unidad puede hacer dos acciones de disparo en la
      misma acción (una de armas ligeras y otra de panzerfaust/bazooka), pero hay que anunciar el arma
      portátil <b>antes</b> de resolver las armas ligeras.</p>`,
    refs: [{ doc: 'crb', page: 34 }],
  },

  {
    id: 'asalto',
    titulo: 'Asalto',
    nota: 'Solo unidades confident o shaken. Los vehículos no asaltan. Gana quien consigue más impactos, no quien causa más bajas.',
    html: `
      <table>
        <tr><th>Modificadores de asalto</th><th></th></tr>
        <tr><td>Unidad Élite / Recluta</td><td>▲1 / ▼1</td></tr>
        <tr><td>Unidades atacantes</td><td>▲2</td></tr>
        <tr><td>Defensor desactivado (sin acciones)</td><td>▼2</td></tr>
        <tr><td>Unidad <i>shaken</i> o <i>pinned</i></td><td>▼2</td></tr>
        <tr><td>En o tras cobertura ligera / pesada</td><td>▼1 / ▼2</td></tr>
      </table>
      <table>
        <tr><th>Paso</th><th>Qué pasa</th></tr>
        <tr><td>1</td><td>El defensor puede <b>retirarse</b> (2S, ignorando terreno; si sale de la mesa, eliminado).
          Después el atacante tira d6 y por cada éxito causa 1 baja y 1 Estrés, repitiendo mientras acierte.
          El defensor recibe <b>3 de Estrés</b> y queda desactivado. El asalto termina.</td></tr>
        <tr><td>2-4</td><td>El atacante mueve su líder a <b>S</b> o menos del enemigo (puede provocar fuego reactivo;
          si se echa cuerpo a tierra o queda pinned/panicked, el asalto se detiene) y coloca el resto de figuras a S de su líder.</td></tr>
        <tr><td>5-7</td><td>Ambos tiran a la vez. Cada impacto no anulado se salva con <b>1d8</b> (cualquier terreno).</td></tr>
        <tr><td>8</td><td>El perdedor se retira 2S. El ganador puede reposicionar con un Advance de S gratis
          (no provoca fuego reactivo) y recibe marcador de Fuego. Todos quedan <b>desactivados</b>.</td></tr>
        <tr><td>9</td><td>Ganador: 1 Estrés por equipo. Perdedor: 2 Estrés por equipo.</td></tr>
      </table>
      <p class="note-line">Empate = gana el defensor. Unidad <i>panicked</i> en asalto: todas sus figuras
      se retiran como bajas, sin tirar dados.</p>`,
    refs: [{ doc: 'crb', page: 35 }, { doc: 'crb', page: 36 }, { doc: 'crb', page: 37 }, { doc: 'crb', page: 38 }],
  },

  {
    id: 'asalto-vehiculos',
    titulo: 'Asalto a vehículos',
    nota: 'La infantería ataca por arriba: blindaje −1 (mínimo 1) y el open-topped cuenta como 0.',
    html: `
      <table>
        <tr><th>Paso</th><th>Qué pasa</th></tr>
        <tr><td>1</td><td>El líder llega a <b>contacto</b> con un advance de S o un run de 2S. Puede provocar
          fuego reactivo; si se echa cuerpo a tierra o queda pinned/panicked, el asalto se detiene.</td></tr>
        <tr><td>2</td><td>El resto de figuras se coloca a <b>S</b> del líder y en contacto con el vehículo.</td></tr>
        <tr><td>3</td><td>Reserva: <b>1d8</b> por figura con Anti-Tank Assault, <b>1d6</b> el resto. Se suman
          los dados de todas las unidades.</td></tr>
        <tr><td>4</td><td>Blindaje <b>−1</b> (mínimo 1); <b>open-topped = 0</b>. Factor AT <b>F</b>, o <b>E</b>
          con Anti-Tank Assault.</td></tr>
        <tr><td>5</td><td>Impactar a 5+. <b>3 impactos</b> = dado de la tabla; extras boostean, faltantes
          queman. <b>6+</b> destruye, <b>5 exacto</b> = daño ligero.</td></tr>
        <tr><td>6</td><td>Si no arde, <b>1 Estrés</b> extra. Desenganche de S, <b>1 Estrés</b>, marcador de
          Fuego y desactivado. El vehículo <b>no</b> queda desactivado.</td></tr>
      </table>
      <p class="note-line">Si varios equipos asaltan a la vez, cada uno puede recibir fuego reactivo de una
      unidad distinta; basta con que uno llegue a contacto. El dado de penetración sale de la tabla de armas
      ligeras (factores E y F).</p>`,
    refs: [{ doc: 'crb', page: 38 }, { doc: 'crb', page: 34 }],
  },

  {
    id: 'moral',
    titulo: 'Moral y estrés',
    nota: 'Los chequeos de moral se hacen con el dado de la experiencia: 5+ es éxito.',
    html: `
      <table>
        <tr><th>Nivel</th><th>Color</th><th>Efecto</th></tr>
        <tr><td><b>Confident</b></td><td>verde</td><td>Sin efecto</td></tr>
        <tr><td><b>Shaken</b></td><td>amarillo</td><td><b>▼2</b> a las acciones de disparo</td></tr>
        <tr><td><b>Pinned</b></td><td>naranja</td><td>▼1 a chequeos de moral · no puede usar Move ni Engage ·
          siempre cuerpo a tierra</td></tr>
        <tr><td><b>Panicked</b></td><td>rojo</td><td>Igual que pinned, y además chequeo de moral
          <b>siempre</b> que fuera a recibir Estrés</td></tr>
      </table>
      <table>
        <tr><th>Dado de moral</th><th>Recruit</th><th>Trained</th><th>Elite</th></tr>
        <tr><td>Chequeo</td><td>d6</td><td>d8</td><td>d12</td></tr>
      </table>
      <table>
        <tr><th>Modificadores del chequeo</th><th></th></tr>
        <tr><td>Comandante a M o menos (no hace falta verlo)</td><td>▲1</td></tr>
        <tr><td>En cobertura pesada frente a todos los enemigos vistos</td><td>▲1</td></tr>
        <tr><td>Algún enemigo a M o menos y en línea de visión</td><td>▼1</td></tr>
        <tr><td>La unidad está pinned o panicked</td><td>▼1</td></tr>
        <tr><td>Ha perdido más de la mitad de sus figuras (solo si empezó con 3+)</td><td>▼1</td></tr>
      </table>
      <p class="note-line"><b>Producto de un chequeo fallido:</b> un equipo panicked que falla huye o se rinde
      (figuras retiradas, cuenta como eliminado); un vehículo es abandonado por la tripulación y queda como pecio.</p>
      <p class="note-line"><b>Al eliminar una unidad</b>, todas las unidades amigas a <b>S</b> o menos reciben 1 Estrés.</p>`,
    refs: [{ doc: 'crb', page: 43 }, { doc: 'crb', page: 44 }],
  },

  {
    id: 'danio',
    titulo: 'Daño ligero en vehículos',
    nota: 'Se aplica cuando la tirada para destruir el vehículo da exactamente 5. Se vuelve a tirar el mismo dado.',
    html: `
      <table>
        <tr><th>Resultado</th><th>Efecto</th></tr>
        <tr><td>1</td><td>Vehículo desactivado (sin más acciones)</td></tr>
        <tr><td>2</td><td>Vehículo <i>shaken</i></td></tr>
        <tr><td>3</td><td>Pierde un arma secundaria (la elige el tirador)</td></tr>
        <tr><td>4</td><td>Vehículo inmovilizado para el resto de la partida</td></tr>
        <tr><td>5</td><td>Pierde un arma principal (la elige el tirador)</td></tr>
        <tr><td>6+</td><td>Vehículo destruido</td></tr>
      </table>
      <p class="note-line">Si el efecto ya no es aplicable (sin arma secundaria, ya inmovilizado, etc.),
      el vehículo recibe <b>1 de Estrés</b> en su lugar.</p>`,
    refs: [{ doc: 'crb', page: 39 }],
  },

  {
    id: 'terreno',
    titulo: 'Terreno y movimiento',
    nota: '«No correr» impide a la infantería correr por o a través de ese terreno. R = reglas de movimiento del vehículo.',
    html: `
      <table>
        <tr><th>Terreno</th><th>Tipo</th><th>Cobertura</th><th>Altura</th><th>Equipos</th><th>Ruedas</th><th>Semioruga</th><th>Orugas</th></tr>
        <tr><td>Hierba alta, campos arados</td><td>Área</td><td>—</td><td>Baja</td><td>—</td><td>3R</td><td>3R</td><td>2R</td></tr>
        <tr><td>Suelo rocoso</td><td>Área</td><td>Ligera</td><td>Baja</td><td>—</td><td>2R</td><td>2R</td><td>2R</td></tr>
        <tr><td>Bosques, huertos</td><td>Área</td><td>Ligera</td><td>Alta</td><td>—</td><td>2R</td><td>2R</td><td>2R</td></tr>
        <tr><td>Pantanos</td><td>Área</td><td>Pesada</td><td>Baja</td><td>No correr</td><td>Impasable</td><td>Impasable</td><td>Impasable</td></tr>
        <tr><td>Bosque denso, jungla</td><td>Área</td><td>Pesada</td><td>Alta</td><td>No correr</td><td>Impasable</td><td>Impasable</td><td>Impasable</td></tr>
        <tr><td>Ruinas</td><td>Área</td><td>Pesada</td><td>Alta</td><td>No correr</td><td>Impasable</td><td>Impasable</td><td>Impasable</td></tr>
        <tr><td>Barreras de madera</td><td>Obstáculo</td><td>Ligera</td><td>Baja</td><td>No correr</td><td>2R</td><td>2R</td><td>2R</td></tr>
        <tr><td>Pajares</td><td>Obstáculo</td><td>Ligera</td><td>Baja</td><td>No correr</td><td>2R avería</td><td>2R avería</td><td>2R</td></tr>
        <tr><td>Muros bajos, taludes, barricadas</td><td>Obstáculo</td><td>Pesada</td><td>Baja</td><td>No correr</td><td>Impasable</td><td>Impasable</td><td>2R</td></tr>
        <tr><td>Bocage</td><td>Obstáculo</td><td>Pesada</td><td>Alta</td><td>Trepar</td><td>Impasable</td><td>Impasable</td><td>1R avería</td></tr>
        <tr><td>Muros, empalizadas</td><td>Obstáculo</td><td>—</td><td>Alta</td><td>Trepar</td><td>Impasable</td><td>Impasable</td><td>1R avería</td></tr>
        <tr><td>Caminos y pistas</td><td>—</td><td>—</td><td>Baja</td><td>—</td><td>Normal</td><td>Normal</td><td>Normal</td></tr>
      </table>
      <p class="note-line">Modificador «avería» = terreno peligroso: 1d6 y con 5+ el vehículo queda inmovilizado
      para el resto de la partida.</p>
      <table>
        <tr><th>Altura</th><th>Línea de visión</th></tr>
        <tr><td>Obstáculo bajo</td><td>No afecta</td></tr>
        <tr><td>Obstáculo alto</td><td>Bloquea toda la línea de visión</td></tr>
        <tr><td>Área baja</td><td>No afecta</td></tr>
        <tr><td>Área alta</td><td>Puede entrar hasta 2S; se puede cruzar si el área tiene menos de 2S de fondo</td></tr>
        <tr><td>Edificio</td><td>Bloquea la línea de visión</td></tr>
      </table>`,
    refs: [{ doc: 'crb', page: 57 }, { doc: 'crb', page: 58 }, { doc: 'crb', page: 59 }],
  },

  {
    id: 'montajes',
    titulo: 'Armas de vehículo',
    nota: 'Cada montaje tiene su arco de tiro. La torreta puede girarse antes de disparar a cambio de una penalización.',
    html: `
      <table>
        <tr><th>Montaje</th><th>Arco</th><th>Notas</th></tr>
        <tr><td>Casco <code>-H-</code></td><td>45°</td><td>Fijo</td></tr>
        <tr><td>Pintle <code>-P-</code></td><td>360°</td><td>22,5° por lado si indica forward / rear / flank</td></tr>
        <tr><td>Torreta <code>-T-</code></td><td>45°</td><td>Giro antes de disparar: ▼1</td></tr>
      </table>
      <p class="note-line">Un vehículo dispara <b>una primaria y una secundaria</b> (la secundaria solo si
      dispara la primaria), a objetivos distintos si ambos están detectados. Las coaxiales no disparan
      junto a su primaria. Un vehículo no descubierto se considera con escotillas cerradas: no usa sus
      ametralladoras exteriores.</p>
      <table>
        <tr><th>Movimiento</th><th>Coste</th></tr>
        <tr><td>Ruedas / semioruga / orugas</td><td>3 / 3 / 2 reglas</td></tr>
        <tr><td>Marcha atrás</td><td>1 regla</td></tr>
        <tr><td>Giro de orugas hasta 180°</td><td>1 regla (al inicio o al final)</td></tr>
        <tr><td>Giro de torreta</td><td>Gratis al final de un advance</td></tr>
        <tr><td>Atravesar tropas</td><td>Gratis; si son enemigas, 1 Estrés</td></tr>
      </table>`,
    refs: [{ doc: 'crb', page: 51 }, { doc: 'crb', page: 52 }, { doc: 'crb', page: 54 }],
  },

  {
    id: 'artilleria',
    titulo: 'Perfiles de morteros y obuses',
    nota: 'Potencia antipersona del arma, antes de modificadores. >M / ∞: objetivo a más de M; sin límite máximo dentro de la mesa. S/M en HE es el radio de explosión.',
    html: weaponProfileTable([
      ['mo-l', 'Mortero ligero (MO. L)', '>M / ∞', '4d6', 'S', 'E', '—', 'Arma pesada; solo fuego indirecto.'],
      ['mo-m', 'Mortero medio (MO. M)', '>M / ∞', '4d8', 'S', 'E', '—', 'Arma pesada; solo fuego indirecto. HE (S), corregido por FAQ.'],
      ['lh', 'Obús ligero (LH)', '>M / ∞', '4d6', 'S', 'E', '—', 'Barrage, Carriage, Shield; puede montarse en vehículo. Penetración según FAQ.'],
      ['mh', 'Obús medio (MH)', '>M / ∞', '4d8', 'S', 'E', '—', 'HE (S), corregido por FAQ; puede montarse en vehículo. Penetración según FAQ.'],
      ['hh', 'Obús pesado (HH)', '>M / ∞', '4d12', 'M', 'D', '—', 'Barrage, Carriage, Shield; puede montarse en vehículo.'],
    ], 'Perfiles de morteros y obuses') + `
      <p class="note-line"><b>Fuego indirecto:</b> tira 1d6; éxito (5+) = pool normal. Con fallo, retira la mitad de los dados iniciales, redondeando hacia arriba. Las otras unidades dentro del radio HE reciben siempre la mitad de los dados iniciales, redondeando hacia arriba. Se resuelve cada ataque por separado.</p>
      <p class="note-line">Los obuses no son exclusivamente armas fuera de mesa: la armería también contempla piezas y montajes en vehículos. No confundas el perfil ordinario del obús pesado (<b>4d12, HE M</b>) con los ataques especiales de bombardeo preparatorio (<b>2d12 sin HE</b>).</p>`,
    refs: [{ doc: 'crb', page: 48 }, { doc: 'crb', page: 49 }],
  },

  {
    id: 'armas-pesadas',
    titulo: 'Cañones antitanque (ATG) y autocañones',
    nota: 'La potencia es el pool antipersona; no es la tirada de penetración. Contra vehículos se utiliza el factor AT. ∞ significa toda la mesa. — en potencia impide disparar contra infantería.',
    html: weaponProfileTable([
      ['atg-ul', 'ATG ultraligero (UL)', '∞', '—', '—', 'E', '—', 'Sin potencia antipersona. Penetración según FAQ; Ammo Bearers, Carriage, Shield.'],
      ['atg-l', 'ATG ligero (L)', '∞', '4d6', 'S', 'D', '—', 'Ammo Bearers, Barrage, Carriage, Shield; Vehicle Weapon.'],
      ['atg-m', 'ATG medio (M)', '∞', '4d8', 'S', 'C', '—', 'Ammo Bearers, Barrage, Carriage, Shield; Vehicle Weapon.'],
      ['atg-h', 'ATG pesado (H)', '∞', '4d8', 'M', 'B', '—', 'Ammo Bearers, Barrage, Carriage, Shield.'],
      ['atg-sh', 'ATG superpesado / extrapesado (SH)', '∞', '4d12', 'M', 'A', '—', 'Ammo Bearers, Barrage, Carriage, Shield; Vehicle Weapon.'],
      ['acn', 'Autocañón (ACN)', '∞', '1d12', '—', 'E', '—', 'Rapid Fire; Penetración según FAQ.'],
      ['acn-h', 'Autocañón pesado (ACN H)', '∞', '2d12', '—', 'D', '—', 'Rapid Fire.'],
    ], 'Perfiles ATG y autocañones') + `
      <p class="note-line"><b>ATG UL, L, M, H, SH:</b> ultraligero, ligero, medio, pesado y superpesado. El ATG ultraligero no tiene ataque antipersona; su factor E no equivale a tirar un dado E. Consulta la tabla antitanque para cruzar factor y blindaje.</p>`,
    refs: [{ doc: 'crb', page: 48 }, { doc: 'crb', page: 49 }],
  },

  {
    id: 'armas-infanteria',
    titulo: 'Perfiles de armas de infantería',
    nota: 'Perfiles de armería con las erratas de la FAQ v2.5 y la hoja resumen v3.5: SMG y fusil de asalto son armas distintas; ATW tiene factor C.',
    html: weaponProfileTable([
      ['pst', 'Pistola (PST)', 'M', '1d6', '—', '—', '1d6', 'Sidearm.'],
      ['smg', 'Subfusil (SMG)', 'L', '1d8', '—', 'G', '1d8', 'Sidearm. Potencia y cuerpo a cuerpo corregidos por FAQ.'],
      ['r', 'Fusil (R)', '2L', '1d6', '—', 'G', '1d6', 'Sidearm.'],
      ['ar', 'Fusil de asalto (AR)', '2L', '1d8 (≤L) / 1d6 (>L)', '—', 'G', '1d8', 'Sidearm. Hasta L usa 1d8; más allá de L usa 1d6.'],
      ['bar', 'Fusil automático (BAR)', '2L', '2d8', '—', 'G', '2d6', 'Sidearm.'],
      ['sniper', 'Fusil de francotirador (SNIPER)', '∞', '1d12+', '—', 'G', '1d6', 'El boost propio ya está incluido en 1d12+.'],
      ['lmg', 'Ametralladora ligera (LMG)', '3L', '4d6', '—', 'G', '2d6', 'Sidearm.'],
      ['km', 'Mortero portátil / lanzagranadas (KM)', '2L', '1d8', '—', 'G', '1d6', 'Se incorpora al pool del equipo; no es el mortero ligero MO. L.'],
      ['atr', 'Fusil anticarro (ATR)', '2L', '—', '—', 'E', '1d6', 'Solo contra vehículos. Éxitos de destrucción cuentan como 5; tras disparar, d6 exitoso evita marcador de Fuego.'],
      ['atw', 'AT portátil recargable: bazooka / PIAT (ATW)', '2L', '—', '—', 'C', '—', 'Backblast, Short Range Firepower. Factor C corregido por FAQ.'],
      ['atc', 'AT portátil desechable: panzerfaust (ATC)', 'L', '—', '—', 'D', '—', 'Independent, Short Range Firepower, Single Use.'],
      ['ft', 'Lanzallamas (FT)', 'M', '4d12', '—', 'D', '4d12', 'No puede hacer fuego reactivo; sus dados no sufren burns al disparar. No tiene HE.'],
      ['mmg', 'Ametralladora media (MMG)', '∞', '4d8', '—', 'G', '2d8', 'Ammo Bearers, Barrage, Cumbersome, Heavy Weapon, Vehicle Weapon.'],
      ['hmg', 'Ametralladora pesada (HMG)', '∞', '3d12', '—', 'F', '2d8', 'Ammo Bearers, Barrage, Cumbersome, Heavy Weapon, Vehicle Weapon.'],
    ], 'Perfiles de armas de infantería') + `
      <p class="note-line"><b>1d12+:</b> tira 1d12 y 1d6 y conserva el mejor resultado; el boost del francotirador ya está incorporado. <b>HE —</b> significa que el arma no tiene esa regla; un lanzallamas no se trata como un arma HE.</p>
      <p class="note-line">Las armas portátiles AT se anuncian antes de resolver las armas ligeras del equipo. La potencia antipersona y el factor antitanque son columnas diferentes.</p>`,
    refs: [{ doc: 'crb', page: 45 }, { doc: 'crb', page: 47 }],
  },


  {
    id: 'blindaje-vehiculos',
    titulo: 'Blindaje de vehículos comunes (Frente / Lado / Atrás / Techo)',
    nota: 'Cruzar con tabla AT (Factor A–D) o armas ligeras (E–G). Blindaje −1 por flanco/retaguardia/arriba (mín 1). Open-topped = 0 en asalto infantería.',
    html: `
      <table>
        <tr><th>Vehículo</th><th>Nación</th><th>Frente</th><th>Lado</th><th>Atrás</th><th>Techo</th><th>Notas</th></tr>
        <tr><td>Panzer II</td><td>🇩🇪</td><td>2</td><td>1</td><td>1</td><td>0</td><td>Ligero</td></tr>
        <tr><td>Panzer III J/L</td><td>🇩🇪</td><td>3</td><td>2</td><td>1</td><td>1</td><td></td></tr>
        <tr><td>Panzer IV H/J</td><td>🇩🇪</td><td>4</td><td>3</td><td>2</td><td>1</td><td></td></tr>
        <tr><td>StuG III G</td><td>🇩🇪</td><td>4</td><td>3</td><td>1</td><td>1</td><td>Casco -H-</td></tr>
        <tr><td>Tiger I</td><td>🇩🇪</td><td>5</td><td>4</td><td>3</td><td>1</td><td></td></tr>
        <tr><td>Tiger II</td><td>🇩🇪</td><td>6</td><td>5</td><td>4</td><td>2</td><td></td></tr>
        <tr><td>Panther G</td><td>🇩🇪</td><td>5</td><td>3</td><td>2</td><td>1</td><td></td></tr>
        <tr><td>SdKfz 251/1</td><td>🇩🇪</td><td>1</td><td>0</td><td>0</td><td>0</td><td>Semioruga, open-topped</td></tr>
        <tr><td>SdKfz 234/1</td><td>🇩🇪</td><td>1</td><td>0</td><td>0</td><td>0</td><td>Ruedas, open-topped</td></tr>
        <tr><td>T-34/76</td><td>🇷🇺</td><td>3</td><td>2</td><td>1</td><td>1</td><td></td></tr>
        <tr><td>T-34/85</td><td>🇷🇺</td><td>4</td><td>3</td><td>2</td><td>1</td><td></td></tr>
        <tr><td>KV-1</td><td>🇷🇺</td><td>4</td><td>3</td><td>3</td><td>1</td><td></td></tr>
        <tr><td>IS-2</td><td>🇷🇺</td><td>5</td><td>4</td><td>3</td><td>2</td><td></td></tr>
        <tr><td>BA-64</td><td>🇷🇺</td><td>1</td><td>0</td><td>0</td><td>0</td><td>Ruedas, open-topped</td></tr>
        <tr><td>M4 Sherman</td><td>🇺🇸</td><td>3</td><td>2</td><td>1</td><td>1</td><td></td></tr>
        <tr><td>M4A3E8 Easy Eight</td><td>🇺🇸</td><td>4</td><td>3</td><td>2</td><td>1</td><td></td></tr>
        <tr><td>M10 Wolverine</td><td>🇺🇸</td><td>2</td><td>1</td><td>1</td><td>0</td><td>Open-topped, torreta</td></tr>
        <tr><td>M18 Hellcat</td><td>🇺🇸</td><td>1</td><td>1</td><td>1</td><td>0</td><td>Ruedas, open-topped</td></tr>
        <tr><td>M3/M5 Stuart</td><td>🇺🇸</td><td>2</td><td>1</td><td>1</td><td>0</td><td>Ligero</td></tr>
        <tr><td>M8 Greyhound</td><td>🇺🇸</td><td>1</td><td>0</td><td>0</td><td>0</td><td>Ruedas, open-topped</td></tr>
        <tr><td>Churchill III/IV</td><td>🇬🇧</td><td>4</td><td>3</td><td>2</td><td>1</td><td>Lento (orugas 2R)</td></tr>
        <tr><td>Cromwell</td><td>🇬🇧</td><td>3</td><td>2</td><td>1</td><td>1</td><td>Rápido</td></tr>
        <tr><td>Valentine</td><td>🇬🇧</td><td>3</td><td>2</td><td>1</td><td>1</td><td></td></tr>
        <tr><td>M13/40</td><td>🇮🇹</td><td>2</td><td>1</td><td>1</td><td>0</td><td></td></tr>
        <tr><td>Semovente 75/18</td><td>🇮🇹</td><td>2</td><td>1</td><td>1</td><td>0</td><td>Casco -H-</td></tr>
        <tr><td>Char B1 bis</td><td>🇫🇷</td><td>4</td><td>3</td><td>2</td><td>1</td><td>Casco + torreta</td></tr>
        <tr><td>Somua S35</td><td>🇫🇷</td><td>3</td><td>2</td><td>1</td><td>1</td><td></td></tr>
        <tr><td>Hotchkiss H39</td><td>🇫🇷</td><td>2</td><td>1</td><td>1</td><td>0</td><td></td></tr>
      </table>
      <p class="note-line">Uso: cruzar Factor AT (A–D) o armas ligeras (E–G) con blindaje. <b>Flanco/retaguardia/arriba = blindaje −1 (mín 1)</b>. <b>Open-topped = 0</b> en asalto infantería. No se aplica a blindaje 0.</p>`,
    refs: [{ doc: 'crb', page: 33 }, { doc: 'crb', page: 34 }, { doc: 'crb', page: 38 }],
  },

  {
    id: 'bonus-cards',
    titulo: 'Cartas de bonificación (Bonus Cards)',
    nota: 'Mazo 20 cartas = 2 copias × 10 efectos. Nunca dos iguales sobre la misma acción. Se rebaraja si se agota.',
    html: `
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
      <p class="note-line"><b>Regla:</b> Nunca dos cartas con la misma ilustración afectan a la misma acción (ej. una sola Ammo! por disparo, una sola Medical! por baja).</p>
      <p class="note-line">Si el mazo se agota, <b>se barajan los descartes</b> para formar uno nuevo.</p>`,
    refs: [{ doc: 'crb', page: 17 }, { doc: 'crb', page: 18 }],
  },
];
