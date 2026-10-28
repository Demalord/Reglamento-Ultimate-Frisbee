import type { LessonContent, ReviewContent } from './types'

// Módulo 2 · Flujo del juego
// Fuente: WFDF Rules of Ultimate 2025–2028 — secciones 7, 8, 9, 10 y 20.
// Traducción y adaptación propias (CC BY 4.0).

export const MODULO_2: LessonContent[] = [
  // ───────────────────────────────────────── m2.l1 · 7.1–7.6
  {
    id: 'm2.l1',
    intro: 'Cada punto arranca con un pull. Antes de lanzarlo, los dos equipos tienen que estar listos y bien ubicados.',
    steps: [
      {
        title: 'Qué es el pull y cuándo se lanza',
        blocks: [
          {
            type: 'p',
            text: 'El [[pull]] es el lanzamiento que hace la **defensa** para poner el disco en juego. Se lanza al **empezar el partido**, después del **medio tiempo** y después de **cada gol**.',
          },
          { type: 'p', text: 'Los equipos deben prepararse para el pull **sin demoras injustificadas**.' },
          { type: 'rule', ref: '7.1', text: 'El juego comienza con un lanzamiento de la defensa llamado «pull».' },
        ],
      },
      {
        title: 'La señal de listos',
        blocks: [
          {
            type: 'p',
            text: 'El pull solo se puede lanzar cuando **los dos equipos señalaron que están listos**: el jugador que va a lanzar el pull y un jugador de la ofensiva **levantan la mano por encima de la cabeza**.',
          },
          { type: 'rule', ref: '7.2', text: 'Señal de listos de ambos equipos antes del pull.' },
          { type: 'key', text: 'Dos manos arriba, una por equipo → ya se puede lanzar el pull.' },
        ],
      },
      {
        title: 'Dónde se para cada equipo',
        blocks: [
          {
            type: 'list',
            items: [
              '**Ofensiva:** después de señalar, todos deben tener **un pie sobre su línea de gol** (la de su [[zona-de-defensa|zona de defensa]]) y no cambiar de ubicación entre ellos hasta que se suelte el pull.',
              '**Defensa:** después de señalar, todos deben tener **los pies completamente detrás** del plano vertical de su línea de gol hasta que se suelte el pull.',
            ],
          },
          { type: 'p', text: 'En cuanto el pull sale de la mano, **todos pueden moverse** en cualquier dirección.' },
          { type: 'rule', ref: '7.3, 7.4, 7.6', text: 'Posiciones de ofensiva y defensa antes del pull.' },
        ],
      },
      {
        title: 'False start y offside',
        blocks: [
          {
            type: 'p',
            text: 'Si un equipo incumple esas posiciones, el **rival** puede llamar la violación, siempre **antes de que la ofensiva toque el disco**:',
          },
          {
            type: 'list',
            items: [
              '**False start** (la ofensiva se movió): si la defensa lo llama, el lanzador establece su pivote donde corresponda y el juego se reanuda **como si se hubiera pedido un time-out** en ese lugar.',
              '**Offside** (la defensa salió antes): si la ofensiva lo llama, debe **dejar que el disco caiga sin tocarlo** y luego se reanuda **como si se hubiera pedido brick**, sin necesidad de [[check]].',
            ],
          },
          { type: 'rule', ref: '7.5', text: 'False start, offside y cómo se reanuda.' },
          {
            type: 'example',
            text: 'La defensa sale corriendo antes de que el pull salga de la mano. La ofensiva llama «Offside», deja caer el disco sin tocarlo y lo pone en juego desde el brick.',
          },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: 'Un defensor cruza su línea de gol antes de que se suelte el pull y la ofensiva llama «Offside». ¿Qué debe hacer la ofensiva?',
        options: [
          'Atrapar el pull y seguir jugando normalmente',
          'Dejar que el disco caiga sin tocarlo y reanudar como si hubiera pedido brick',
          'Pedir que se repita el pull',
          'Hacer un check donde está el defensor',
        ],
        correct: 1,
        explanation:
          'Si la ofensiva llama offside, debe dejar que el disco toque el suelo sin tocarlo y luego reanuda como si hubiera pedido brick, sin necesidad de check (7.5.2).',
        ruleRef: '7.5.2',
      },
      {
        prompt: 'Después de señalar que están listos, ¿dónde deben estar los atacantes hasta que se suelte el pull?',
        options: [
          'Detrás de su línea de gol, donde quieran',
          'Con un pie sobre la línea de gol que defienden y sin cambiar de ubicación entre ellos',
          'En cualquier lugar de su zona de defensa',
          'En el brick',
        ],
        correct: 1,
        explanation:
          'Tras señalar listos, todos los atacantes deben tener un pie sobre la línea de gol que defienden, sin cambiar de ubicación entre ellos hasta que se suelte el pull (7.3).',
        ruleRef: '7.3',
      },
      {
        prompt: '¿Hasta cuándo se puede llamar un false start o un offside?',
        options: [
          'Hasta el final del punto',
          'Antes de que la ofensiva toque el disco',
          'Solo antes de que se suelte el pull',
          'Hasta que el disco toque el suelo, aunque la ofensiva ya lo haya tocado',
        ],
        correct: 1,
        explanation:
          'El false start o el offside se deben llamar antes de que la ofensiva toque el disco (7.5).',
        ruleRef: '7.5',
      },
    ],
  },

  // ───────────────────────────────────────── m2.l2 · 7.7–7.12
  {
    id: 'm2.l2',
    intro: 'El pull ya está en el aire. Dónde queda el disco depende de quién lo toca y de por dónde sale.',
    steps: [
      {
        title: 'Quién puede tocar el pull',
        blocks: [
          {
            type: 'list',
            items: [
              'La **defensa no puede tocar** el pull hasta que lo toque un atacante o el disco toque el suelo.',
              'Si un **atacante toca el pull en el aire** (dentro o fuera del campo) y su equipo no logra establecer la [[posesion|posesión]], es turnover: un **dropped pull**.',
            ],
          },
          { type: 'rule', ref: '7.7, 7.8', text: 'Contacto con el pull y dropped pull.' },
        ],
      },
      {
        title: 'Si lo atrapas o cae adentro',
        blocks: [
          {
            type: 'list',
            items: [
              '**Lo atrapas:** estableces el pivote en el punto del campo **más cercano a donde estableciste la posesión**, aunque sea dentro de tu zona de defensa.',
              '**Cae en el campo y nunca sale:** el pivote va **donde se detiene el disco**, aunque sea dentro de tu zona de defensa.',
            ],
          },
          { type: 'rule', ref: '7.9, 7.10', text: 'Pivote tras atrapar el pull o si cae dentro.' },
        ],
      },
      {
        title: 'Si cae adentro y luego sale',
        blocks: [
          {
            type: 'list',
            items: [
              '**Sale sin que lo toque un atacante:** pivote donde **cruzó la línea perimetral**. Si ese punto queda en tu zona de defensa, vas al punto **más cercano de la zona central**.',
              '**Sale después de tocar a un atacante:** pivote donde **cruzó la línea perimetral**, aunque quede dentro de tu zona de defensa.',
            ],
          },
          { type: 'rule', ref: '7.11, 7.11.1', text: 'Pull que toca el campo y luego sale.' },
          {
            type: 'example',
            text: 'El pull pica cerca de tu zona y rueda hasta salir por la lateral, dentro de tu zona de defensa, sin que nadie lo toque. No juegas desde la zona: pones el disco en el punto más cercano de la zona central.',
          },
        ],
      },
      {
        title: 'Si sale directo: brick',
        blocks: [
          {
            type: 'p',
            text: 'Si el pull cae **fuera de límites sin tocar antes el campo ni a un atacante**, el lanzador elige:',
          },
          {
            type: 'list',
            items: [
              'el [[brick]] más cercano a su zona de defensa, o',
              'el punto de la zona central más cercano a donde salió el disco.',
            ],
          },
          {
            type: 'p',
            text: 'Para elegir el brick, **antes de recoger el disco**, cualquier atacante extiende **un brazo completo por encima de la cabeza** y debería decir «brick». Esa elección es definitiva.',
          },
          { type: 'rule', ref: '7.12', text: 'Pull que sale directo fuera de límites.' },
          { type: 'key', text: 'Sale directo → brick (brazo arriba antes de recogerlo) o donde salió.' },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: 'El pull cae directo fuera de límites, sin tocar el campo ni a nadie. ¿Cómo eliges el brick?',
        options: [
          'Recoges el disco y luego dices «brick»',
          'Antes de recoger el disco, un atacante extiende un brazo por encima de la cabeza y dice «brick»',
          'No hay opción: el disco siempre va al brick',
          'Lo decide la defensa',
        ],
        correct: 1,
        explanation:
          'La opción de brick se debe señalar antes de recoger el disco: cualquier atacante extiende completamente un brazo por encima de la cabeza y debería decir «brick» (7.12).',
        ruleRef: '7.12',
      },
      {
        prompt: 'Atrapas el pull dentro de tu zona de defensa. ¿Dónde estableces el pivote?',
        options: [
          'En la línea de gol más cercana',
          'En el brick',
          'En el punto donde estableciste la posesión, aunque sea dentro de tu zona de defensa',
          'En el punto más cercano de la zona central',
        ],
        correct: 2,
        explanation:
          'Si atrapas el pull, estableces el pivote en el punto del campo más cercano a donde estableciste la posesión, aunque esté en tu zona de defensa (7.9).',
        ruleRef: '7.9',
      },
      {
        prompt: 'El pull pica en el campo, toca a un atacante y sale por la lateral a la altura de su zona de defensa. ¿Dónde va el pivote?',
        options: [
          'En el brick',
          'En el punto más cercano de la zona central',
          'Donde el disco cruzó la línea perimetral, aunque sea en la zona de defensa',
          'Donde el atacante tocó el disco',
        ],
        correct: 2,
        explanation:
          'Si el disco toca a un atacante antes de salir, el pivote va donde cruzó la línea perimetral, aunque quede dentro de su zona de defensa (7.11.1).',
        ruleRef: '7.11.1',
      },
    ],
  },

  // ───────────────────────────────────────── m2.l3 · 8
  {
    id: 'm2.l3',
    intro: 'Hay momentos en que el juego está «muerto» y no puede haber turnover. Saber cuándo evita muchas discusiones.',
    steps: [
      {
        title: 'Cuándo el juego está muerto',
        blocks: [
          { type: 'p', text: 'El juego está **muerto** (no puede haber turnover):' },
          {
            type: 'list',
            items: [
              'Desde que empieza el punto hasta que se suelta el pull.',
              'Cuando hay que llevar el disco hasta la [[ubicacion-del-pivote|ubicación del pivote]] después del pull o de un turnover, hasta que se establece el pivote.',
              'Después de una llamada que detiene el juego, hasta el [[check]].',
              'Cuando el disco toca el suelo, hasta que el equipo correspondiente establece la posesión.',
            ],
          },
          { type: 'p', text: 'Si el juego no está muerto, está **vivo**. Durante el juego muerto los jugadores sí se pueden mover, salvo que una regla diga otra cosa.' },
          { type: 'rule', ref: '8.1, 8.2', text: 'Juego muerto y juego vivo.' },
        ],
      },
      {
        title: 'Disco quieto y disco rodando',
        blocks: [
          {
            type: 'list',
            items: [
              'Con el juego muerto, el lanzador **no puede pasarle** la posesión a otro jugador.',
              'Cualquier jugador puede **frenar un disco** que rueda o se desliza en el suelo.',
              'Si al frenarlo alguien **cambia mucho** su posición, el rival puede pedir que el pivote se establezca donde se tocó el disco.',
            ],
          },
          { type: 'rule', ref: '8.3, 8.4', text: 'Posesión en juego muerto y discos que ruedan.' },
        ],
      },
      {
        title: 'Recoger el disco sin perder tiempo',
        blocks: [
          {
            type: 'p',
            text: 'Después de un turnover o del pull, un atacante debe ir **directo y al menos caminando** a recoger el disco y establecer el pivote. Si el disco no salió del campo, después de que queda quieto tiene:',
          },
          {
            type: 'list',
            items: ['**10 segundos** si está en la zona central.', '**20 segundos** si está en una zona de anotación.'],
          },
          {
            type: 'p',
            text: 'Si la ofensiva no cumple, la defensa puede avisar («Delay of Game» o con un [[pre-stall]]) o llamar «Violation». Si después del aviso sigue la demora, el [[marcador]] puede empezar a contar aunque no se haya establecido el pivote.',
          },
          { type: 'rule', ref: '8.5 – 8.5.2', text: 'Recuperar el disco y límites de tiempo.' },
        ],
      },
      {
        title: 'La defensa no estorba y el punto medio',
        blocks: [
          {
            type: 'list',
            items: [
              'La defensa **no puede moverse para impedir** que la ofensiva tome el disco o establezca el pivote.',
              'Si no hay acuerdo sobre dónde va el pivote, se usa el **punto medio** entre los dos lugares propuestos.',
            ],
          },
          { type: 'rule', ref: '8.5.3, 8.5.4', text: 'No obstruir y punto medio.' },
          { type: 'key', text: '¿No se ponen de acuerdo en dónde va el disco? Punto medio.' },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: 'Hay un turnover y el disco queda quieto dentro de una zona de anotación. ¿Cuánto tiempo tiene la ofensiva para establecer el pivote?',
        options: ['5 segundos', '10 segundos', '20 segundos', 'No hay límite si camina'],
        correct: 2,
        explanation:
          'Si el disco no salió del campo, el lanzador tiene 10 segundos en la zona central y 20 segundos en una zona de anotación, contados desde que el disco queda quieto (8.5.1).',
        ruleRef: '8.5.1',
      },
      {
        prompt: 'Un defensor frena un disco que rodaba y lo desplaza varios metros. ¿Qué puede pedir la ofensiva?',
        options: [
          'Que sea turnover para la defensa',
          'Que el pivote se establezca donde el defensor tocó el disco',
          'Que se repita el pase',
          'Nada, frenar el disco no está permitido',
        ],
        correct: 1,
        explanation:
          'Cualquier jugador puede frenar un disco que rueda; si al hacerlo cambia mucho su posición, el rival puede pedir que el pivote vaya donde se tocó el disco (8.4, 8.4.1).',
        ruleRef: '8.4.1',
      },
      {
        prompt: 'Atacantes y defensores no se ponen de acuerdo sobre dónde debe ir el pivote. ¿Qué se hace?',
        options: [
          'Decide la ofensiva',
          'Decide la defensa',
          'Se usa el punto medio entre los dos lugares propuestos',
          'Se va al brick',
        ],
        correct: 2,
        explanation:
          'Si los jugadores no se ponen de acuerdo en la ubicación del pivote, se usa el punto medio entre los dos lugares propuestos (8.5.4).',
        ruleRef: '8.5.4',
      },
    ],
  },

  // ───────────────────────────────────────── m2.l4 · 9.1–9.4
  {
    id: 'm2.l4',
    intro: 'El lanzador no tiene todo el tiempo del mundo: el marcador le cuenta hasta diez.',
    steps: [
      {
        title: 'Cómo se cuenta',
        blocks: [
          {
            type: 'p',
            text: 'El [[marcador]] hace el [[stall-count|conteo]] diciendo **«Stalling»** y contando **de uno a diez**. Entre el inicio de cada número tiene que haber **al menos un segundo**, y el conteo debe ser claro para el lanzador.',
          },
          { type: 'rule', ref: '9.1, 9.2', text: 'Cómo se hace el conteo.' },
        ],
      },
      {
        title: 'Cuándo puede contar',
        blocks: [
          { type: 'p', text: 'El marcador solo puede empezar y continuar el conteo cuando:' },
          {
            type: 'list',
            items: [
              'El juego está **vivo**, o ya se estableció el pivote después de un turnover.',
              'Está a **3 metros o menos** del punto de pivote del lanzador (o de la ubicación del pivote si el lanzador aún no está ahí).',
              'Todos los defensores están **en posición legal** (sin infracciones de marca, que verás en el módulo 4).',
            ],
          },
          { type: 'rule', ref: '9.3', text: 'Condiciones para contar.' },
        ],
      },
      {
        title: 'Cuándo vuelve a uno',
        blocks: [
          {
            type: 'p',
            text: 'Si el marcador se aleja más de 3 metros, o **otro defensor pasa a ser el marcador**, el conteo se reinicia en **«Stalling uno»**.',
          },
          { type: 'rule', ref: '9.4', text: 'Reinicio por distancia o cambio de marcador.' },
          {
            type: 'example',
            text: 'Te están contando en siete y tu marcador se va a ayudar a otro compañero. Llega otro defensor a marcarte: tiene que empezar de nuevo, «Stalling uno».',
          },
        ],
      },
      {
        title: 'El diez',
        blocks: [
          {
            type: 'p',
            text: 'Si el lanzador **no ha soltado el disco** cuando el marcador **empieza a decir «diez»**, es turnover: un **stall-out**. El detalle de cómo se discute un stall-out lo verás en el módulo 3.',
          },
          { type: 'rule', ref: '13.2.2', text: 'Stall-out.' },
          { type: 'key', text: 'Suelta el disco antes de que empiece el «diez».' },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: 'Te están contando en seis y el marcador cambia: ahora te marca otro defensor. ¿En qué número sigue el conteo?',
        options: ['Sigue en siete', 'Se reinicia en «Stalling uno»', 'Sigue en seis', 'Se reinicia en cuatro'],
        correct: 1,
        explanation:
          'Si otro jugador pasa a ser el marcador (o el marcador se aleja más de 3 metros), el conteo se reinicia en «Stalling uno» (9.4).',
        ruleRef: '9.4',
      },
      {
        prompt: '¿Qué tiene que decir el marcador al empezar el conteo?',
        options: [
          '«Uno»',
          '«Stalling»',
          '«Disc in»',
          '«Listo»',
        ],
        correct: 1,
        explanation:
          'El marcador hace el conteo anunciando «Stalling» y luego contando de uno a diez (9.1).',
        ruleRef: '9.1',
      },
      {
        prompt: '¿Cuál es el tiempo mínimo entre el inicio de cada número del conteo?',
        options: [
          'Medio segundo',
          'Un segundo',
          'Dos segundos',
          'No hay mínimo, solo debe ser claro',
        ],
        correct: 1,
        explanation:
          'El intervalo entre el inicio de cada número del conteo debe ser de al menos un segundo (9.1).',
        ruleRef: '9.1',
      },
    ],
  },

  // ───────────────────────────────────────── m2.l5 · 9.5–9.6
  {
    id: 'm2.l5',
    intro: 'Después de una parada, el conteo no siempre vuelve a cero. Depende de quién cometió la infracción.',
    steps: [
      {
        title: 'La tabla de reinicios',
        blocks: [
          { type: 'p', text: 'Después de una parada, el conteo se reanuda así:' },
          {
            type: 'list',
            items: [
              'Infracción **de la defensa** aceptada → **«Stalling uno»**.',
              'Infracción **de la ofensiva** aceptada → **máximo nueve**.',
              '**Stall-out en disputa** → **«Stalling ocho»**.',
              'Si se siguió jugando porque ambos acordaron que la llamada no afectó la jugada → **«Stalling uno»**.',
              '**Cualquier otra llamada**, incluido el pick → **máximo seis**.',
            ],
          },
          { type: 'rule', ref: '9.5.1 – 9.5.5', text: 'Reanudación del conteo tras una parada.' },
          { type: 'key', text: 'Culpa de la defensa → 1. Culpa de la ofensiva → máx 9. Lo demás → máx 6.' },
        ],
      },
      {
        title: 'Qué significa «máximo»',
        blocks: [
          {
            type: 'p',
            text: 'Reiniciar «como máximo en n» quiere decir: toma el **último número que se alcanzó a decir completo** antes de la llamada (llámalo x) y reanuda en **x + 1 o en n, el que sea menor**.',
          },
          { type: 'rule', ref: '9.6', text: 'Cómo se calcula «máximo n».' },
          {
            type: 'example',
            title: 'Con números',
            text: 'Hay una llamada en disputa (máximo seis). Si el último número dicho fue **tres**, se reanuda en **cuatro**. Si fue **ocho**, se reanuda en **seis**.',
          },
        ],
      },
      {
        title: 'Dos excepciones',
        blocks: [
          {
            type: 'list',
            items: [
              'Si hay una llamada que involucra al lanzador **y** otra infracción aparte en la recepción, y el disco vuelve al lanzador, el conteo se reanuda según la llamada **del lanzador**.',
              'Si la llamada es una violación del **check**, el conteo sigue **en el mismo número** que tenía antes de esa violación.',
            ],
          },
          { type: 'rule', ref: '9.5.5.1, 9.5.5.2', text: 'Excepciones a «máximo seis».' },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: 'El marcador iba en «cinco» cuando el lanzador hizo una llamada de falta y la defensa la disputó. ¿En qué número se reanuda?',
        options: ['Uno', 'Seis', 'Ocho', 'Nueve'],
        correct: 1,
        explanation:
          'Una llamada en disputa cae en «cualquier otra llamada»: máximo seis. Como el último número fue cinco, se reanuda en el menor entre 5 + 1 = 6 y 6, o sea, seis (9.5.5 y 9.6).',
        ruleRef: '9.5.5, 9.6',
      },
      {
        prompt: 'La ofensiva acepta que cometió una infracción. El conteo iba en «dos». ¿En qué número se reanuda?',
        options: [
          'Uno',
          'Tres',
          'Seis',
          'Nueve',
        ],
        correct: 1,
        explanation:
          'Tras una infracción de la ofensiva aceptada se reanuda en máximo nueve. Como el último número fue dos, va el menor entre 2 + 1 = 3 y 9: tres (9.5.2 y 9.6).',
        ruleRef: '9.5.2, 9.6',
      },
      {
        prompt: 'Hay un stall-out en disputa. ¿En qué número se reanuda el conteo?',
        options: [
          'Stalling uno',
          'Máximo seis',
          'Stalling ocho',
          'Máximo nueve',
        ],
        correct: 2,
        explanation:
          'Después de un stall-out en disputa, el conteo se reanuda en «Stalling ocho» (9.5.3).',
        ruleRef: '9.5.3',
      },
    ],
  },

  // ───────────────────────────────────────── m2.l6 · 10
  {
    id: 'm2.l6',
    intro: 'Cada vez que el juego se detiene durante un punto, vuelve a empezar con un check. Así se hace bien.',
    steps: [
      {
        title: 'Cuándo hay check',
        blocks: [
          {
            type: 'p',
            text: 'Siempre que el juego se detiene durante un punto (falta, violación, turnover o gol en disputa, parada, discusión o al terminar un time-out) se reanuda **lo antes posible** con un [[check]]. Solo se puede demorar para discutir la llamada.',
          },
          { type: 'rule', ref: '10.1', text: 'Reanudación con check.' },
        ],
      },
      {
        title: 'Dónde se ubica cada jugador',
        blocks: [
          {
            type: 'list',
            items: [
              'Si se paró **antes de un pase**: todos vuelven a donde estaban al hacerse la llamada.',
              'Si se paró **después de un pase** y el disco **vuelve al lanzador**: todos vuelven a donde estaban cuando se soltó el pase (o al momento de la llamada, lo que haya pasado primero).',
              'Si el **resultado de la jugada se mantiene**: todos van a donde estaban cuando alguien estableció la posesión o el disco tocó el suelo.',
              'Si otro jugador **gana la posesión por una infracción** aceptada: todos van a donde estaban cuando ocurrió la infracción.',
            ],
          },
          { type: 'p', text: 'Y todos se quedan **quietos** en ese lugar hasta el check.' },
          { type: 'rule', ref: '10.2', text: 'Posición de los jugadores tras una llamada.' },
        ],
      },
      {
        title: 'Cómo se hace el check',
        blocks: [
          {
            type: 'p',
            text: 'Antes del check, quien lo hace y el rival más cercano verifican que **sus compañeros estén listos** y bien ubicados. Luego:',
          },
          {
            type: 'list',
            items: [
              'Lanzador con el disco y **defensor al alcance** → el **defensor toca el disco**.',
              'Lanzador con el disco y **sin defensor al alcance** → el **lanzador toca el disco contra el suelo** y puede decir [[disco-dentro|«Disc in»]].',
              'Disco **en el suelo** → el **defensor más cercano** dice «Disc in».',
            ],
          },
          { type: 'rule', ref: '10.4, 10.6', text: 'Verificación y forma de hacer el check.' },
          {
            type: 'p',
            text: 'Cualquier jugador puede extender brevemente una parada para arreglar su equipamiento («equipment»), pero no se puede parar el juego activo por eso.',
          },
          { type: 'rule', ref: '10.3', text: 'Paradas por equipamiento.' },
        ],
      },
      {
        title: 'Demoras y checks mal hechos',
        blocks: [
          {
            type: 'p',
            text: 'Si un equipo **demora el check** sin razón, el rival puede avisar «Delay of Game». Si sigue la demora, el equipo que avisó puede poner el disco en juego diciendo «Disc in» sin esperar la verificación del rival, siempre que su gente esté quieta y bien ubicada.',
          },
          { type: 'p', text: 'Se puede llamar violación del check si el rival:' },
          {
            type: 'list',
            items: [
              'lanza sin hacer el check como corresponde,',
              'reanuda sin la verificación de su rival más cercano,',
              'se estaba moviendo justo antes del check, o',
              'no estaba en la posición correcta.',
            ],
          },
          {
            type: 'p',
            text: 'En ese caso el pase **no cuenta**, sea completo o no, y el disco vuelve al lanzador.',
          },
          { type: 'rule', ref: '10.5, 10.7', text: 'Demora y violaciones del check.' },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: 'Hay una parada y el disco quedó en el suelo. ¿Cómo se pone de nuevo en juego?',
        options: [
          'El lanzador lo recoge y lanza cuando quiera',
          'El defensor más cercano al disco dice «Disc in»',
          'El capitán de la ofensiva dice «Disc in»',
          'Se espera a que la defensa toque el disco en las manos del lanzador',
        ],
        correct: 1,
        explanation: 'Cuando el disco está en el suelo, el defensor más cercano a él debe decir «Disc in» (10.6.2).',
        ruleRef: '10.6.2',
      },
      {
        prompt: 'La ofensiva lanza sin hacer el check y completa el pase. La defensa llama la violación del check. ¿Qué pasa?',
        options: [
          'El pase cuenta porque se completó',
          'El pase no cuenta y el disco vuelve al lanzador',
          'Es turnover',
          'Se repite el punto',
        ],
        correct: 1,
        explanation:
          'Tras una violación del check, el pase no cuenta, sea completo o incompleto, y la posesión vuelve al lanzador (10.7.5).',
        ruleRef: '10.7.5',
      },
      {
        prompt: 'El lanzador tiene el disco y no hay ningún defensor a su alcance. ¿Cómo se hace el check?',
        options: [
          'El lanzador toca el disco contra el suelo y puede decir «Disc in»',
          'Hay que esperar a que llegue un defensor',
          'El defensor más cercano dice «Disc in» desde donde está',
          'No hace falta check',
        ],
        correct: 0,
        explanation:
          'Si no hay un defensor al alcance, el lanzador toca el disco contra el suelo y puede decir «Disc in» (10.6.1.2).',
        ruleRef: '10.6.1.2',
      },
    ],
  },

  // ───────────────────────────────────────── m2.l7 · 20
  {
    id: 'm2.l7',
    intro: 'Quién puede pedir un time-out, cuánto dura y cómo se reanuda.',
    steps: [
      {
        title: 'Cómo se pide',
        blocks: [
          {
            type: 'p',
            text: 'Quien pide el time-out forma una **«T» con las manos** (o con una mano y el disco) y debería decir «time-out» a los rivales.',
          },
          { type: 'rule', ref: '20.1', text: 'Señal del time-out.' },
        ],
      },
      {
        title: 'Antes del pull y durante el juego',
        blocks: [
          {
            type: 'list',
            items: [
              '**Antes del pull** (ya empezó el punto pero los dos equipos no han señalado listos): **cualquier jugador** de cualquier equipo puede pedirlo. Alarga **75 segundos** el tiempo antes del pull.',
              '**Después del pull:** solo lo puede pedir **el lanzador que tiene el disco**. Empieza cuando forma la «T» y dura **75 segundos**.',
            ],
          },
          { type: 'rule', ref: '20.2, 20.3', text: 'Quién puede pedirlo y cuánto dura.' },
          { type: 'key', text: 'Después del pull, solo el lanzador con el disco puede pedir time-out.' },
        ],
      },
      {
        title: 'Cómo se reanuda',
        blocks: [
          { type: 'p', text: 'Después de un time-out pedido durante el juego:' },
          {
            type: 'list',
            ordered: true,
            items: [
              'No hay cambios de jugadores, salvo por lesión.',
              'Se reanuda en la ubicación del pivote, con **el mismo lanzador**.',
              'Primero los **atacantes** eligen una posición quieta, en cualquier lugar.',
              'Después los **defensores** eligen la suya, también quietos.',
              'El conteo se reanuda en **máximo nueve**; si cambió el marcador, en **«Stalling uno»**.',
            ],
          },
          { type: 'rule', ref: '20.3.1 – 20.3.6', text: 'Reanudación tras el time-out.' },
        ],
      },
      {
        title: 'Pedir time-out sin tener',
        blocks: [
          {
            type: 'p',
            text: 'Si el lanzador pide time-out con el juego vivo y su equipo **ya no tiene time-outs**, el juego se detiene y el marcador **suma dos segundos** al número en que habría reanudado. Si eso llega a diez o más, es **stall-out**.',
          },
          { type: 'rule', ref: '20.4', text: 'Time-out sin time-outs disponibles.' },
          {
            type: 'example',
            text: 'Te cuentan en ocho, pides time-out y tu equipo ya no tiene. Se reanudaría en máximo nueve, más dos: once. Es stall-out y el disco pasa al rival.',
          },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: 'Durante el juego (después del pull), ¿quién puede pedir un time-out?',
        options: [
          'Cualquier jugador de cualquier equipo',
          'Solo los capitanes',
          'Solo el lanzador que tiene el disco',
          'Cualquier jugador del equipo que defiende',
        ],
        correct: 2,
        explanation:
          'Después del pull, solo un lanzador con posesión del disco puede pedir time-out (20.3). Antes del pull, sí puede pedirlo cualquier jugador (20.2).',
        ruleRef: '20.3',
      },
      {
        prompt: '¿Cuánto dura un time-out?',
        options: [
          '30 segundos',
          '60 segundos',
          '75 segundos',
          '90 segundos',
        ],
        correct: 2,
        explanation:
          'El time-out dura 75 segundos, tanto antes del pull como durante el juego (20.2, 20.3).',
        ruleRef: '20.3',
      },
      {
        prompt: 'Después de un time-out pedido durante el juego, ¿se pueden hacer cambios de jugadores?',
        options: [
          'Sí, ilimitados',
          'Sí, uno por equipo',
          'No, salvo por lesión',
          'Solo la ofensiva',
        ],
        correct: 2,
        explanation:
          'Después de un time-out pedido durante el juego no se permiten cambios, salvo por lesión (20.3.1).',
        ruleRef: '20.3.1',
      },
    ],
  },
]

export const REPASO_2: ReviewContent = {
  moduleId: 2,
  questions: [
    {
      prompt: '¿Cuándo se puede lanzar el pull?',
      options: [
        'Cuando el equipo que defiende esté listo',
        'Cuando el lanzador del pull y un jugador de la ofensiva levantan la mano',
        'Diez segundos después del gol',
        'Cuando lo diga el capitán de la ofensiva',
      ],
      correct: 1,
      explanation: 'Los dos equipos deben señalar que están listos: el que lanza el pull y un atacante levantan la mano por encima de la cabeza (7.2).',
      ruleRef: '7.2',
      lessonId: 'm2.l1',
    },
    {
      prompt: 'Un atacante toca el pull en el aire, se le cae y su equipo no logra establecer la posesión. ¿Qué pasa?',
      options: [
        'Se repite el pull',
        'El disco se pone donde cayó y la ofensiva sigue',
        'Es turnover (dropped pull)',
        'Es brick',
      ],
      correct: 2,
      explanation: 'Si un atacante toca el pull antes de que caiga y su equipo no establece la posesión, es turnover: un dropped pull (7.8).',
      ruleRef: '7.8',
      lessonId: 'm2.l2',
    },
    {
      prompt: '¿Cuál de estas situaciones es juego muerto?',
      options: [
        'El disco está en el aire en un pase',
        'El disco tocó el suelo y aún nadie establece la posesión',
        'El lanzador está pivoteando con el conteo en curso',
        'Un receptor corre a buscar un pase',
      ],
      correct: 1,
      explanation: 'Después de que el disco toca el suelo, el juego está muerto hasta que el equipo correspondiente establece la posesión (8.1.4).',
      ruleRef: '8.1.4',
      lessonId: 'm2.l3',
    },
    {
      prompt: '¿A qué distancia máxima del pivote debe estar el marcador para poder contar?',
      options: ['1 metro', '2 metros', '3 metros', 'No hay distancia mínima'],
      correct: 2,
      explanation: 'El marcador debe estar a 3 metros o menos del punto de pivote del lanzador para empezar y continuar el conteo (9.3.2).',
      ruleRef: '9.3.2',
      lessonId: 'm2.l4',
    },
    {
      prompt: 'La defensa acepta una infracción que cometió. ¿En qué número se reanuda el conteo?',
      options: ['Stalling uno', 'Máximo seis', 'Máximo nueve', 'Stalling ocho'],
      correct: 0,
      explanation: 'Después de una infracción de la defensa aceptada, el conteo se reinicia en «Stalling uno» (9.5.1).',
      ruleRef: '9.5.1',
      lessonId: 'm2.l5',
    },
    {
      prompt: 'Iban en «siete» y hay una llamada de pick. ¿En qué número se reanuda?',
      options: ['Uno', 'Seis', 'Siete', 'Ocho'],
      correct: 1,
      explanation:
        'El pick está en «cualquier otra llamada»: máximo seis. Como el último número fue siete, se reanuda en el menor entre 8 y 6, o sea, seis (9.5.5 y 9.6).',
      ruleRef: '9.5.5, 9.6',
      lessonId: 'm2.l5',
    },
    {
      prompt: 'El lanzador tiene el disco y hay un defensor al alcance. ¿Cómo se hace el check?',
      options: [
        'El lanzador toca el disco contra el suelo',
        'El defensor toca el disco',
        'El lanzador dice «Disc in» y lanza',
        'El defensor más cercano dice «Disc in» desde lejos',
      ],
      correct: 1,
      explanation: 'Si el lanzador tiene el disco y hay un defensor al alcance, el defensor debe tocar el disco (10.6.1.1).',
      ruleRef: '10.6.1.1',
      lessonId: 'm2.l6',
    },
    {
      prompt: 'Después de un time-out pedido durante el juego, ¿quién elige posición primero?',
      options: [
        'Los defensores',
        'Los atacantes',
        'Los dos al mismo tiempo',
        'El que pidió el time-out decide',
      ],
      correct: 1,
      explanation: 'Primero los atacantes eligen una posición quieta, y después los defensores (20.3.4 y 20.3.5).',
      ruleRef: '20.3.4',
      lessonId: 'm2.l7',
    },
  ],
}
