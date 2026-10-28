import type { LessonContent, ReviewContent } from './types'

// Módulo 4 · Llamadas, faltas y violaciones
// Fuente: WFDF Rules of Ultimate 2025–2028 — secciones 15 a 19.
// Traducción y adaptación propias (CC BY 4.0).

export const MODULO_4: LessonContent[] = [
  // ───────────────────────────────────────── m4.l1 · 15
  {
    id: 'm4.l1',
    intro: 'Falta, infracción o violación: cada una se llama distinto, la llama alguien distinto y tiene consecuencias distintas.',
    steps: [
      {
        title: 'Los tres tipos de infracción',
        blocks: [
          {
            type: 'list',
            items: [
              '[[falta|Falta]] (foul): incumplimiento por **contacto que no es menor** entre rivales. Si alguien inicia a propósito un contacto menor, también incumple, pero se trata como **violación**.',
              '[[infraccion|Infracción]]: incumplimientos de **marca** o de **travel**. Las infracciones **no detienen** el juego.',
              '[[violacion|Violación]]: **todo lo demás**.',
            ],
          },
          { type: 'rule', ref: '15.1 – 15.3', text: 'Faltas, infracciones y violaciones.' },
        ],
      },
      {
        title: 'Quién puede llamar qué',
        blocks: [
          {
            type: 'list',
            items: [
              '**Falta:** solo el jugador que **recibió** la falta, diciendo «Foul».',
              '**Infracción:** en general solo el **lanzador**, diciendo el nombre de la infracción. Excepciones: **cualquier atacante** puede llamar double team y **cualquier defensor** puede llamar travel.',
              '**Violación:** cualquier rival, diciendo su nombre o «Violation».',
            ],
          },
          { type: 'rule', ref: '15.4 – 15.6', text: 'Quién hace cada llamada.' },
          { type: 'key', text: 'La falta solo la llama quien la recibió.' },
        ],
      },
      {
        title: 'Cómo se hace una llamada',
        blocks: [
          {
            type: 'list',
            items: [
              'La llamada se hace **apenas** reconoces la infracción.',
              'Si la llamada detiene el juego, todos paran en cuanto se enteran y deberían **repetirla en voz alta**. Si el juego se paró para discutir sin que nadie llamara, se considera que la llamada se hizo cuando empezó la discusión.',
              'Se recomienda usar las **señas con las manos** de la WFDF.',
            ],
          },
          { type: 'rule', ref: '15.7, 15.8, 15.13', text: 'Detener el juego y señas.' },
        ],
      },
      {
        title: 'Contest, retracted y llamadas mal hechas',
        blocks: [
          {
            type: 'list',
            items: [
              'Si no estás de acuerdo con una llamada contra ti, dices **«Contest»**.',
              'Si te das cuenta de que tu llamada estaba mal, dices **«Retracted»**: se sigue como si **tú** hubieras cometido una infracción aceptada.',
              'Si paras el juego por error (oíste mal, no conocías la regla, llamaste tarde): si el rival gana o conserva la posesión, la jugada **se mantiene**; si no, el disco vuelve al último lanzador no disputado. El conteo se reanuda como si la infracción la hubieras cometido tú.',
              'Si hay **varias infracciones** en la misma jugada, se resuelven **de la última a la primera**.',
            ],
          },
          { type: 'rule', ref: '15.9 – 15.12', text: 'Contest, retracted, paradas incorrectas y varias infracciones.' },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: '¿Quién puede llamar una falta?',
        options: [
          'Cualquier jugador que la haya visto',
          'Solo el jugador que recibió la falta',
          'Solo los capitanes',
          'Cualquier jugador del equipo que la recibió',
        ],
        correct: 1,
        explanation: 'Solo el jugador que recibió la falta puede reclamarla, diciendo «Foul» (15.4).',
        ruleRef: '15.4',
      },
      {
        prompt: 'Haces una llamada y luego te das cuenta de que estabas equivocado. ¿Qué dices y qué pasa?',
        options: [
          '«Contest», y se repite la jugada',
          '«Retracted», y se sigue como si tú hubieras cometido una infracción aceptada',
          'Nada, la llamada ya está hecha',
          '«Play on», y el disco es tuyo',
        ],
        correct: 1,
        explanation:
          'Si quien hizo la llamada cree que estaba mal, puede retirarla diciendo «Retracted»; el juego sigue como si esa persona hubiera cometido una infracción aceptada (15.11).',
        ruleRef: '15.11',
      },
      {
        prompt: '¿Cuál de estas llamadas NO detiene el juego?',
        options: ['Foul', 'Pick', 'Fast count', 'Violation'],
        correct: 2,
        explanation:
          'El fast count es una infracción de marca, y las infracciones (de marca y travel) no detienen el juego (15.2). El marcador corrige y sigue contando.',
        ruleRef: '15.2',
      },
    ],
  },

  // ───────────────────────────────────────── m4.l2 · 16
  {
    id: 'm4.l2',
    intro: 'Una llamada en el momento justo del pase: ¿se para todo o se termina la jugada?',
    steps: [
      {
        title: 'La regla general',
        blocks: [
          {
            type: 'rule',
            ref: '16.1',
            text: 'Cuando se hace una llamada de falta o violación, o alguien intenta parar el juego, el juego se detiene **de inmediato** y **no puede haber turnover**, salvo en los casos de 15.9, 16.2 y 16.3.',
          },
        ],
      },
      {
        title: 'Cuándo la jugada continúa',
        blocks: [
          { type: 'p', text: 'El juego **sigue hasta que alguien establece la posesión** si la falta o violación:' },
          {
            type: 'list',
            items: [
              'se llama **contra el lanzador** y él igual intenta el pase,',
              'la llama **el lanzador mientras lanza**, o',
              'se llama u ocurre **con el disco en el aire**.',
            ],
          },
          { type: 'rule', ref: '16.2 – 16.2.3', text: 'Casos en que la jugada continúa.' },
        ],
      },
      {
        title: 'Qué pasa al terminar la jugada',
        blocks: [
          {
            type: 'list',
            items: [
              'Si el equipo que hizo la llamada **gana o conserva** el disco con ese pase, la jugada **se mantiene**. Quien llamó puede decir **«Play on»** cuanto antes para seguir sin parar.',
              'Si el equipo que llamó **no** se queda con el disco, el juego se detiene. Si ese equipo cree que la infracción afectó la posesión, el disco **vuelve al lanzador** y se reanuda con check (salvo que la regla específica diga otra cosa).',
            ],
          },
          { type: 'rule', ref: '16.2.4', text: 'Resultado tras la continuación.' },
          {
            type: 'example',
            text: 'Te hacen falta mientras lanzas y llamas «Foul». El pase llega a tu compañero en la zona: tu equipo conservó el disco, así que la jugada se mantiene y es gol.',
          },
        ],
      },
      {
        title: 'Si no cambió nada',
        blocks: [
          {
            type: 'rule',
            ref: '16.3',
            text: 'Sin importar cuándo se hizo la llamada, si los jugadores involucrados de **los dos equipos** acuerdan que la llamada **no afectó el resultado**, la jugada se mantiene. Esta regla no la anula ninguna otra.',
          },
          {
            type: 'list',
            items: [
              'Si la jugada terminó en **gol**, el gol vale.',
              'Si no, los jugadores afectados pueden recuperar la **desventaja de posición** que les causó la llamada y se reanuda con check.',
            ],
          },
          { type: 'key', text: 'Si los dos equipos acuerdan que no afectó la jugada, la jugada se mantiene.' },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: 'Una falta ocurre mientras el disco está en el aire. ¿Qué pasa con el juego?',
        options: [
          'Se detiene de inmediato y el disco vuelve al lanzador',
          'Continúa hasta que alguien establece la posesión',
          'Es turnover automático',
          'Se repite el punto',
        ],
        correct: 1,
        explanation:
          'Si la falta o violación se llama u ocurre con el disco en el aire, el juego continúa hasta que se establece la posesión (16.2.3).',
        ruleRef: '16.2.3',
      },
      {
        prompt: 'Llamas una falta mientras lanzas y tu compañero atrapa el pase. ¿Qué pasa?',
        options: [
          'El disco vuelve a ti porque llamaste falta',
          'La jugada se mantiene porque tu equipo conservó el disco; puedes decir «Play on»',
          'Es turnover porque hubo una llamada',
          'Se discute desde cero',
        ],
        correct: 1,
        explanation:
          'Si el equipo que hizo la llamada gana o conserva la posesión con el pase, la jugada se mantiene, y quien llamó puede decir «Play on» para seguir sin parar (16.2.4.1).',
        ruleRef: '16.2.4.1',
      },
      {
        prompt: 'Hay una llamada y los jugadores involucrados de los dos equipos acuerdan que no afectó la jugada, que terminó en gol. ¿Vale el gol?',
        options: ['No, toda llamada anula el gol', 'Sí, la jugada se mantiene y el gol vale', 'Se repite el punto', 'Lo deciden los capitanes'],
        correct: 1,
        explanation:
          'Si los jugadores involucrados de ambos equipos acuerdan que la llamada no afectó el resultado, la jugada se mantiene; si terminó en gol, el gol vale (16.3, 16.3.1).',
        ruleRef: '16.3.1',
      },
    ],
  },

  // ───────────────────────────────────────── m4.l3 · 17.1–17.5
  {
    id: 'm4.l3',
    intro: 'Las faltas alrededor del disco en el aire: las más comunes en un partido.',
    steps: [
      {
        title: 'Juego peligroso',
        blocks: [
          {
            type: 'rule',
            ref: '17.1',
            text: 'Las acciones que muestran **desprecio por la seguridad** de los demás o un riesgo serio de lesión se tratan como **falta**, haya contacto o no. Si se acepta, se trata como la falta de la sección 17 que más se ajuste. Esta regla no la anula ninguna otra.',
          },
        ],
      },
      {
        title: 'Falta de recepción',
        blocks: [
          {
            type: 'p',
            text: 'Ocurre cuando un jugador inicia **contacto que no es menor** con un rival **antes, durante o justo después** de que alguno de los dos intente jugar el disco.',
          },
          {
            type: 'p',
            text: 'El contacto con los brazos o manos del rival **después** de que el disco ya fue atrapado, o cuando ya no puede jugarlo, no basta para una falta (pero hay que evitarlo).',
          },
          {
            type: 'list',
            items: [
              '**Aceptada:** el jugador que recibió la falta **gana la posesión** en el lugar de la falta, aunque sea dentro de una zona de anotación, y se reanuda con check. Si eso deja al jugador en su zona de ataque sin gol, el conteo no puede empezar hasta que lleve el pivote a la línea de gol.',
              '**Disputada:** el disco **vuelve al lanzador**.',
            ],
          },
          { type: 'rule', ref: '17.2', text: 'Faltas de recepción.' },
        ],
      },
      {
        title: 'Strip y bloqueo',
        blocks: [
          {
            type: 'list',
            items: [
              '**Strip foul:** un rival te comete falta y por eso **se te cae** un disco que habías atrapado. Si esa recepción habría sido gol y se acepta la falta, **es gol**.',
              '**Falta de bloqueo:** un jugador se pone en una posición que un rival que se mueve legalmente **no puede evitar**, considerando su velocidad y dirección, y hay contacto que no es menor. Se trata como falta de recepción o como falta indirecta, según aplique.',
            ],
          },
          { type: 'rule', ref: '17.3, 17.4', text: 'Strip foul y falta de bloqueo.' },
        ],
      },
      {
        title: 'Force-out',
        blocks: [
          {
            type: 'p',
            text: 'Un receptor está estableciendo la posesión y un defensor le comete falta, y por ese contacto atrapa **fuera** en vez de dentro, o en la **zona central** en vez de en su zona de ataque.',
          },
          {
            type: 'list',
            items: [
              'Si habría atrapado en su zona de ataque, **es gol**.',
              'Si se **disputa**: si el receptor quedó fuera, el disco vuelve al lanzador; si no, el disco se queda con el receptor.',
            ],
          },
          { type: 'rule', ref: '17.5', text: 'Force-out foul.' },
          {
            type: 'example',
            text: 'Saltas para atrapar dentro de la zona de anotación y un defensor te empuja en el aire: caes fuera con el disco. Si la falta se acepta y habrías caído dentro de la zona, es gol.',
          },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: 'Recibes una falta de recepción, el rival la acepta y estabas dentro de la zona de anotación que atacas. ¿Qué pasa?',
        options: [
          'Es gol automático',
          'Ganas la posesión en el lugar de la falta y se reanuda con check',
          'El disco vuelve al lanzador',
          'Se repite el punto',
        ],
        correct: 1,
        explanation:
          'Tras una falta de recepción aceptada, el jugador que la recibió gana la posesión en el lugar de la falta, aunque sea en una zona de anotación, y se reanuda con check (17.2.2). No es gol automático.',
        ruleRef: '17.2.2',
      },
      {
        prompt: 'Atrapas un disco en la zona de anotación y un rival te lo arranca con una falta. Él acepta la falta. ¿Qué pasa?',
        options: ['El disco vuelve al lanzador', 'Es gol', 'Es turnover', 'Ganas la posesión en la línea de gol'],
        correct: 1,
        explanation:
          'Es un strip foul: si la recepción habría sido gol y la falta se acepta, se concede el gol (17.3.2).',
        ruleRef: '17.3.2',
      },
      {
        prompt: 'Hay una falta de recepción y el defensor la disputa. ¿Qué pasa con el disco?',
        options: [
          'Lo gana el receptor en el lugar de la falta',
          'Vuelve al lanzador',
          'Es turnover',
          'Se pone en el brick',
        ],
        correct: 1,
        explanation: 'Si la falta de recepción se disputa, el disco vuelve al lanzador (17.2.2).',
        ruleRef: '17.2.2',
      },
    ],
  },

  // ───────────────────────────────────────── m4.l4 · 17.6–17.9
  {
    id: 'm4.l4',
    intro: 'Faltas alrededor del lanzador, contactos lejos del disco y faltas de los dos lados.',
    steps: [
      {
        title: 'Falta del marcador',
        blocks: [
          { type: 'p', text: 'Hay falta de lanzamiento de la defensa cuando, **antes de que el lanzador suelte el pase**:' },
          {
            type: 'list',
            items: [
              'hay contacto que no es menor entre el lanzador y un defensor **mal ubicado**, o',
              'un defensor **inicia** contacto que no es menor con el lanzador, o los dos se chocan peleando por el mismo espacio libre.',
            ],
          },
          {
            type: 'p',
            text: 'Si pasa antes de soltar el pase y **no durante el movimiento de lanzamiento**, el lanzador puede llamar en su lugar una infracción de contacto diciendo **«Contact»**. Si no se disputa, el juego **no se detiene** y el marcador reanuda el conteo en **uno**.',
          },
          { type: 'rule', ref: '17.6', text: 'Faltas de lanzamiento de la defensa.' },
        ],
      },
      {
        title: 'Falta del lanzador',
        blocks: [
          {
            type: 'list',
            items: [
              'Es falta del lanzador cuando **solo él** es responsable de iniciar contacto que no es menor con un defensor bien ubicado.',
              'El contacto durante el **seguimiento** del lanzamiento (después de soltar) no basta para una falta, aunque hay que evitarlo.',
            ],
          },
          { type: 'rule', ref: '17.7', text: 'Faltas de lanzamiento de la ofensiva.' },
        ],
      },
      {
        title: 'Falta indirecta',
        blocks: [
          {
            type: 'p',
            text: 'Contacto que no es menor entre un receptor y un defensor que **no afecta directamente** un intento de jugar el disco (por ejemplo, un choque lejos del pase).',
          },
          {
            type: 'list',
            items: [
              'Antes de llamarla, puedes esperar **hasta dos segundos** para ver si afecta la jugada.',
              'Si se acepta, el jugador que la recibió puede **recuperar la desventaja de posición** que le causó.',
            ],
          },
          { type: 'rule', ref: '17.8', text: 'Faltas indirectas.' },
        ],
      },
      {
        title: 'Faltas compensadas',
        blocks: [
          {
            type: 'list',
            items: [
              'Si en la misma jugada se aceptan faltas llamadas por **un atacante y un defensor**, se compensan y el disco vuelve al **último lanzador no disputado**.',
              'Si el contacto lo causan dos o más rivales yendo **al mismo punto a la vez**, se trata como faltas compensadas. Pero si pasa después de que el disco fue atrapado, o cuando ya nadie podía jugarlo, es falta indirecta.',
            ],
          },
          { type: 'rule', ref: '17.9', text: 'Faltas compensadas.' },
          { type: 'key', text: 'Faltas de los dos lados → disco al último lanzador no disputado.' },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: 'El marcador te contacta antes de que lances, fuera del movimiento de lanzamiento, y llamas «Contact». Nadie lo disputa. ¿Qué pasa?',
        options: [
          'Se detiene el juego y se hace check',
          'El juego no se detiene y el marcador reanuda el conteo en uno',
          'Es turnover para la defensa',
          'El conteo sigue donde iba',
        ],
        correct: 1,
        explanation:
          'Tras una infracción de contacto no disputada, el juego no se detiene y el marcador debe reanudar el conteo en uno (17.6.1.3).',
        ruleRef: '17.6.1.3',
      },
      {
        prompt: 'Un receptor y un defensor chocan lejos del pase, sin afectar el intento de jugar el disco. El receptor llama la falta y se acepta. ¿Qué pasa?',
        options: [
          'El receptor gana el disco',
          'Es una falta indirecta: el receptor recupera la desventaja de posición que le causó',
          'El disco vuelve al lanzador obligatoriamente',
          'Es turnover',
        ],
        correct: 1,
        explanation:
          'Es una falta indirecta (17.8): si se acepta, el jugador que la recibió puede recuperar la desventaja de posición que le causó.',
        ruleRef: '17.8.2',
      },
      {
        prompt: 'En la misma jugada se aceptan una falta llamada por un atacante y otra llamada por un defensor. ¿Cómo sigue?',
        options: [
          'Gana la falta que se llamó primero',
          'El disco vuelve al último lanzador no disputado',
          'Es turnover para la defensa',
          'Se repite el punto',
        ],
        correct: 1,
        explanation:
          'Son faltas compensadas: el disco debe volver al último lanzador no disputado (17.9.1).',
        ruleRef: '17.9.1',
      },
    ],
  },

  // ───────────────────────────────────────── m4.l5 · 18.1
  {
    id: 'm4.l5',
    intro: 'Lo que el marcador no puede hacer al defender al lanzador, y cómo se corrige sin parar el juego.',
    steps: [
      {
        title: 'Las infracciones de marca',
        blocks: [
          {
            type: 'list',
            items: [
              '**Fast count:** el marcador cuenta cuando no puede, no dice «Stalling», cuenta más rápido de un segundo por número, no baja o reinicia el conteo cuando debe, o empieza en un número incorrecto.',
              '**Straddle:** la línea entre los pies del defensor pasa a menos de **un diámetro de disco** del pivote del lanzador.',
              '**Disc space:** alguna parte del defensor está a menos de **un diámetro de disco** del torso del lanzador (salvo que lo cause solo el movimiento del lanzador).',
              '**Wrapping:** la línea entre las manos o brazos del defensor pasa a menos de un diámetro de disco del torso del lanzador, o el defensor tiene alguna parte del cuerpo encima del pivote (salvo que lo cause solo el lanzador).',
              '**Double team:** otro defensor, que no es el marcador, está a menos de **3 metros** del pivote del lanzador **sin marcar a otro atacante**. Pasar corriendo por esa zona no cuenta.',
              '**Vision:** un defensor tapa a propósito la visión del lanzador con su cuerpo.',
            ],
          },
          { type: 'rule', ref: '18.1.1', text: 'Infracciones de marca.' },
        ],
      },
      {
        title: 'Qué pasa después de la llamada',
        blocks: [
          {
            type: 'list',
            items: [
              'El juego **no se detiene**. El marcador reanuda el conteo en el **último número que dijo completo, menos uno**.',
              'Antes de seguir contando, debe **corregir** su posición. Si no, comete otra infracción.',
              'La defensa puede **disputar** la infracción y ahí sí se para el juego. Si el pase ya se completó, una infracción de marca disputada o retirada se trata como violación de la ofensiva y el disco vuelve al lanzador.',
            ],
          },
          { type: 'rule', ref: '18.1.2, 18.1.3', text: 'Disputa y conteo tras una infracción de marca.' },
          {
            type: 'example',
            title: 'Con números',
            text: 'Te cuentan «…cinco, seis» demasiado rápido y llamas «Fast count». El marcador sigue en **cinco** (seis menos uno), contando a un ritmo correcto.',
          },
        ],
      },
      {
        title: 'Cuando la infracción se vuelve violación',
        blocks: [
          { type: 'p', text: 'En vez de la infracción, el lanzador puede llamar **violación de marca** y parar el juego si:' },
          {
            type: 'list',
            items: [
              'el conteo no se corrige,',
              'no hay conteo,',
              'la infracción es muy grave, o',
              'hay un patrón de infracciones repetidas.',
            ],
          },
          {
            type: 'p',
            text: 'Si se llama una infracción o violación de marca y el lanzador **igual lanza** (antes, durante o después de la llamada), la llamada no tiene consecuencias, y si el pase es incompleto, **el turnover se mantiene**.',
          },
          { type: 'rule', ref: '18.1.4, 18.1.5', text: 'Violación de marca y pase durante la llamada.' },
          { type: 'key', text: 'Si llamas una infracción de marca y lanzas un pase incompleto, igual es turnover.' },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: 'El marcador va en «siete» y llamas «Fast count». ¿En qué número sigue el conteo?',
        options: ['Uno', 'Seis', 'Siete', 'Ocho'],
        correct: 1,
        explanation:
          'Tras una infracción de marca en la que el juego no se detuvo, el marcador reanuda con el último número dicho completo menos uno: siete menos uno, seis (18.1.3).',
        ruleRef: '18.1.3',
      },
      {
        prompt: 'Un segundo defensor se queda a 2 metros del lanzador sin marcar a ningún otro atacante. ¿Qué infracción es?',
        options: ['Straddle', 'Double team', 'Wrapping', 'Disc space'],
        correct: 1,
        explanation:
          'Es double team: un defensor que no es el marcador está a menos de 3 metros del pivote del lanzador sin marcar a otro atacante (18.1.1.5).',
        ruleRef: '18.1.1.5',
      },
      {
        prompt: 'Llamas «Disc space» y en el mismo momento lanzas un pase que cae incompleto. ¿Qué pasa?',
        options: [
          'El disco vuelve a ti por la infracción',
          'El turnover se mantiene: la llamada no tiene consecuencias',
          'Se repite el pase',
          'Es violación de la defensa',
        ],
        correct: 1,
        explanation:
          'Si se llama una infracción de marca y el lanzador intenta un pase, la llamada no tiene consecuencias; si el pase es incompleto, el turnover se mantiene (18.1.5).',
        ruleRef: '18.1.5',
      },
    ],
  },

  // ───────────────────────────────────────── m4.l6 · 18.2–18.3
  {
    id: 'm4.l6',
    intro: 'Cuánto te puedes mover con el disco y qué pasa cuando te bloquean el camino hacia tu marca.',
    steps: [
      {
        title: 'Frenar después de atrapar',
        blocks: [
          {
            type: 'p',
            text: 'Después de atrapar, el lanzador debe **frenar lo antes posible, sin cambiar de dirección**, hasta establecer su [[pivote]].',
          },
          {
            type: 'p',
            text: 'Excepción: si atrapas corriendo o saltando, puedes **lanzar sin frenar** y sin establecer pivote, siempre que **no cambies de dirección ni aceleres** y hagas **máximo dos contactos más** con el suelo después de atrapar.',
          },
          { type: 'rule', ref: '18.2.1', text: 'Reducir la velocidad tras atrapar.' },
        ],
      },
      {
        title: 'El pivote y el travel',
        blocks: [
          {
            type: 'list',
            items: [
              'Solo puedes moverte en cualquier dirección **pivoteando**: manteniendo el pivote hasta soltar el pase.',
              'Si no estás de pie, cualquier parte del cuerpo puede ser el pivote. Levantarte no es travel si mantienes el pivote en el mismo lugar.',
            ],
          },
          { type: 'p', text: 'Es **travel** si el lanzador:' },
          {
            type: 'list',
            items: [
              'establece el pivote en un lugar incorrecto (por no frenar o por cambiar de dirección tras atrapar),',
              'lanza sin cumplir la excepción de los dos contactos,',
              'empieza a armar o lanzar antes de establecer el pivote en un lugar que le corresponde,',
              'no mantiene el pivote hasta soltar el pase, o',
              'deja caer o se pasa el disco a sí mismo a propósito para moverse.',
            ],
          },
          { type: 'rule', ref: '18.2.2 – 18.2.4', text: 'Pivote y casos de travel.' },
        ],
      },
      {
        title: 'Después de llamar travel',
        blocks: [
          {
            type: 'list',
            items: [
              'El juego **no se detiene**. El lanzador vuelve a poner el pivote en el lugar correcto que le indica quien llamó, sin demoras.',
              'El conteo se **pausa** y el lanzador no puede lanzar hasta corregir. Al reanudar, el marcador no necesita decir «Stalling».',
              'Si lanza un pase **completo antes de corregir**, la defensa puede llamar violación de travel: se para el juego y el disco vuelve al lanzador, que regresa al lugar del travel.',
              'Si el pase es **incompleto**, el juego sigue.',
              'Si el travel se disputa y el lanzador no ha soltado el pase, el juego se detiene.',
            ],
          },
          { type: 'rule', ref: '18.2.5 – 18.2.8', text: 'Qué pasa tras un travel.' },
        ],
      },
      {
        title: 'El pick',
        blocks: [
          {
            type: 'p',
            text: 'Si estás [[guardar|marcando]] a un atacante y **otro jugador te impide moverte** hacia él o con él, puedes llamar **«Pick»**. No es pick si el atacante que marcas y el jugador que te obstruye están **los dos jugando el disco** en ese momento.',
          },
          {
            type: 'list',
            items: [
              'Puedes esperar **hasta dos segundos** antes de llamarlo, para ver si la obstrucción afecta la jugada.',
              'Si se detuvo el juego, el jugador obstruido se mueve a la posición acordada donde habría estado sin la obstrucción.',
              'Todos deben esforzarse por **evitar picks**. Durante una parada, los rivales pueden acordar ajustar un poco sus posiciones para evitarlos.',
            ],
          },
          { type: 'rule', ref: '18.3', text: 'Violación de pick.' },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: 'Atrapas el disco corriendo. ¿Puedes lanzar sin frenar?',
        options: [
          'No, siempre hay que frenar y pivotear',
          'Sí, si no cambias de dirección ni aceleras y haces máximo dos contactos más con el suelo antes de soltar',
          'Sí, con hasta tres pasos',
          'Solo dentro de la zona de anotación',
        ],
        correct: 1,
        explanation:
          'Si atrapas corriendo o saltando, puedes lanzar sin frenar siempre que no cambies de dirección ni aceleres, y hagas máximo dos contactos adicionales con el suelo antes de soltar (18.2.1.1).',
        ruleRef: '18.2.1.1',
      },
      {
        prompt: 'Te llaman travel, no corriges el pivote y lanzas un pase completo. ¿Qué puede pasar?',
        options: [
          'Nada, el pase cuenta',
          'La defensa puede llamar violación de travel: se para el juego y el disco vuelve a ti',
          'Es turnover',
          'El conteo se reinicia en uno',
        ],
        correct: 1,
        explanation:
          'Si después del travel y antes de corregir el pivote el lanzador completa un pase, la defensa puede llamar violación de travel: el juego se detiene y el disco vuelve al lanzador (18.2.6).',
        ruleRef: '18.2.6',
      },
      {
        prompt: 'Marcas a un atacante y otro jugador se cruza y te bloquea, mientras ninguno de los dos está jugando el disco. ¿Qué puedes llamar?',
        options: ['Foul', 'Pick', 'Double team', 'Travel'],
        correct: 1,
        explanation:
          'Si estás marcando a un atacante y otro jugador te impide moverte hacia él o con él, puedes llamar «Pick» (18.3.1). No sería pick si ambos estuvieran jugando el disco.',
        ruleRef: '18.3.1',
      },
    ],
  },

  // ───────────────────────────────────────── m4.l7 · 19
  {
    id: 'm4.l7',
    intro: 'Cuando la seguridad está en juego, se para todo. Así funcionan las paradas por lesión y técnicas.',
    steps: [
      {
        title: 'Parada por lesión',
        blocks: [
          {
            type: 'list',
            items: [
              'La llama el jugador lesionado o cualquier compañero de su equipo, diciendo «Injury».',
              'Si la lesión **no la causó un rival**, el jugador elige: **salir** o que su equipo **gaste un time-out**.',
              'Si la causó un rival, el jugador puede **quedarse o salir**.',
              'Si el lesionado tenía el disco y se le cayó por la lesión, **conserva la posesión**.',
              'Se considera llamada en el momento de la lesión, salvo que el lesionado decida seguir jugando antes de que se llame.',
            ],
          },
          { type: 'rule', ref: '19.1 – 19.1.5', text: 'Parada por lesión.' },
        ],
      },
      {
        title: 'Lesión con el disco en el aire',
        blocks: [
          {
            type: 'rule',
            ref: '19.1.6',
            text: 'Si el disco estaba en el aire, el juego sigue hasta que alguien establece la posesión o el disco toca el suelo. Si la lesión no fue por una falta del rival, el pase completo o el turnover **se mantiene** y se reanuda ahí después de la parada.',
          },
        ],
      },
      {
        title: 'Parada técnica',
        blocks: [
          {
            type: 'list',
            items: [
              'Cualquier jugador que vea algo que **pone en peligro** a los jugadores (incluida una herida abierta o que sangra) debe llamar **«Technical»** o **«Stop»**, y el juego se detiene de inmediato. Compañeros, entrenadores u oficiales también deberían avisar.',
              'Quien tiene una herida que sangra tiene **70 segundos** para atenderla; si necesita más, sale o su equipo gasta un time-out.',
              'El lanzador puede pedir una parada técnica durante el juego para **cambiar un disco muy dañado**.',
              'Si se llamó con el disco en el aire: si no afectó la jugada, el resultado se mantiene; si la afectó, el disco vuelve al lanzador.',
            ],
          },
          { type: 'rule', ref: '19.2', text: 'Parada técnica.' },
        ],
      },
      {
        title: 'Cambios por lesión',
        blocks: [
          {
            type: 'list',
            items: [
              'Si un jugador sale por lesión o por equipamiento ilegal o dañado, el **equipo rival también puede** cambiar a un jugador.',
              'El que entra toma **todo el estado** del que sale: ubicación, posesión, conteo… y puede hacer llamadas en su nombre.',
            ],
          },
          { type: 'rule', ref: '19.3', text: 'Cambios tras lesión.' },
          { type: 'key', text: 'Primero la seguridad: cualquiera puede parar el juego si alguien está en peligro.' },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: 'Te lesionas sin que nadie te haya hecho falta. ¿Qué opciones tienes?',
        options: [
          'Seguir jugando sin consecuencias',
          'Salir de la cancha o que tu equipo gaste un time-out',
          'Pedir que el rival saque a un jugador',
          'Repetir el punto',
        ],
        correct: 1,
        explanation:
          'Si la lesión no la causó un rival, el jugador debe elegir entre ser sustituido o cargar un time-out a su propio equipo (19.1.2).',
        ruleRef: '19.1.2',
      },
      {
        prompt: '¿Cuánto tiempo tiene un jugador para atender una herida que sangra antes de tener que salir o usar un time-out?',
        options: ['30 segundos', '60 segundos', '70 segundos', '75 segundos'],
        correct: 2,
        explanation:
          'Un jugador con una herida abierta o que sangra tiene 70 segundos para atenderla; si necesita más, sale o su equipo usa un time-out (19.2.1.2).',
        ruleRef: '19.2.1.2',
      },
      {
        prompt: 'Un jugador sale por lesión. ¿Qué puede hacer el equipo rival?',
        options: [
          'Nada',
          'Cambiar también a un jugador',
          'Cambiar a todo su equipo',
          'Pedir un time-out gratis',
        ],
        correct: 1,
        explanation:
          'Si un jugador es sustituido por lesión (o por equipamiento ilegal o dañado), el equipo rival también puede sustituir a un jugador (19.3).',
        ruleRef: '19.3',
      },
    ],
  },
]

export const REPASO_4: ReviewContent = {
  moduleId: 4,
  questions: [
    {
      prompt: 'Un defensor ve que el lanzador hizo travel. ¿Puede llamarlo aunque no sea el marcador?',
      options: [
        'No, solo el marcador',
        'Sí, cualquier defensor puede llamar travel',
        'No, solo el capitán',
        'Solo si el lanzador está de acuerdo',
      ],
      correct: 1,
      explanation:
        'Las infracciones en general las llama el lanzador, pero cualquier defensor puede llamar travel y cualquier atacante puede llamar double team (15.5.1).',
      ruleRef: '15.5.1',
      lessonId: 'm4.l1',
    },
    {
      prompt: 'En una jugada hay varias infracciones antes de que se pare el juego. ¿En qué orden se resuelven?',
      options: [
        'De la primera a la última',
        'De la última a la primera',
        'Solo cuenta la primera',
        'Las decide el capitán',
      ],
      correct: 1,
      explanation: 'Si hay varias infracciones en la misma jugada, se resuelven en orden inverso: de la última a la primera (15.12).',
      ruleRef: '15.12',
      lessonId: 'm4.l1',
    },
    {
      prompt: 'Una llamada se hace con el disco en el aire y el equipo que llamó no se queda con el disco. Cree que la infracción afectó la jugada. ¿Qué pasa?',
      options: [
        'Es turnover',
        'El disco vuelve al lanzador y se reanuda con check',
        'Se repite el punto',
        'La jugada se mantiene',
      ],
      correct: 1,
      explanation:
        'Si el equipo que llamó no gana ni conserva el disco y cree que la infracción afectó la posesión, el disco vuelve al lanzador para un check (16.2.4.2.1).',
      ruleRef: '16.2.4.2.1',
      lessonId: 'm4.l2',
    },
    {
      prompt: 'Un defensor te empuja en el aire cuando ibas a caer dentro de la zona de anotación y caes fuera con el disco. Acepta la falta. ¿Qué pasa?',
      options: ['Turnover', 'Es gol (force-out)', 'El disco vuelve al lanzador', 'Ganas el disco en la línea lateral'],
      correct: 1,
      explanation:
        'Es un force-out foul: si el receptor habría atrapado en su zona de ataque, es gol (17.5.2).',
      ruleRef: '17.5.2',
      lessonId: 'm4.l3',
    },
    {
      prompt: 'El lanzador termina su lanzamiento y, en el seguimiento del brazo, toca levemente al marcador. ¿Es falta?',
      options: [
        'Sí, falta del lanzador',
        'No: el contacto en el seguimiento no basta para una falta, aunque hay que evitarlo',
        'Sí, falta del marcador',
        'Es una violación',
      ],
      correct: 1,
      explanation:
        'El contacto que ocurre durante el seguimiento del lanzamiento no es base suficiente para una falta, aunque debe evitarse (17.7.2).',
      ruleRef: '17.7.2',
      lessonId: 'm4.l4',
    },
    {
      prompt: 'La línea entre los pies del marcador pasa casi por encima del pivote del lanzador. ¿Qué infracción es?',
      options: ['Wrapping', 'Straddle', 'Vision', 'Fast count'],
      correct: 1,
      explanation:
        'Es straddle: la línea entre los pies del defensor pasa a menos de un diámetro de disco del pivote del lanzador (18.1.1.2).',
      ruleRef: '18.1.1.2',
      lessonId: 'm4.l5',
    },
    {
      prompt: 'Después de una llamada de travel, ¿qué pasa con el conteo?',
      options: [
        'Se reinicia en uno',
        'Se pausa hasta que el lanzador corrija el pivote',
        'Sigue corriendo',
        'Salta a nueve',
      ],
      correct: 1,
      explanation:
        'Tras un travel, el conteo se pausa y el lanzador no puede lanzar hasta establecer el pivote en el lugar correcto (18.2.5.2).',
      ruleRef: '18.2.5.2',
      lessonId: 'm4.l6',
    },
    {
      prompt: 'Un jugador con el disco se lesiona y se le cae el disco por la lesión. ¿Quién tiene la posesión?',
      options: ['La defensa', 'El jugador lesionado la conserva', 'Cualquiera de su equipo', 'Se decide con un nuevo pull'],
      correct: 1,
      explanation:
        'Si el lesionado tenía la posesión y se le cayó el disco por la lesión, conserva la posesión (19.1.4).',
      ruleRef: '19.1.4',
      lessonId: 'm4.l7',
    },
  ],
}
