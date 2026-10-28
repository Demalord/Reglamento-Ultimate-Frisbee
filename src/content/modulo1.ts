import type { LessonContent, ReviewContent } from './types'

// Módulo 1 · Fundamentos y Espíritu del Juego
// Fuente: WFDF Rules of Ultimate 2025–2028 — Introducción y secciones 1 a 6.
// Traducción y adaptación propias (CC BY 4.0).

export const MODULO_1: LessonContent[] = [
  // ───────────────────────────────────────── m1.l1
  {
    id: 'm1.l1',
    intro: 'Antes de las reglas finas, la foto completa: cómo se juega, cómo se gana y qué hace distinto al Ultimate.',
    steps: [
      {
        title: 'El juego en una frase',
        blocks: [
          {
            type: 'p',
            text: 'El Ultimate es un deporte de **siete contra siete** que se juega con un disco volador en un campo rectangular, más o menos de la mitad del ancho de una cancha de fútbol, con una [[zona-de-anotacion|zona de anotación]] en cada extremo.',
          },
          {
            type: 'p',
            text: 'Cada equipo intenta anotar un **gol**: que uno de sus jugadores atrape un pase dentro de la zona de anotación que está atacando.',
          },
          { type: 'key', text: 'Gol = atrapar un pase dentro de la zona de anotación que atacas.' },
        ],
      },
      {
        title: 'Cómo se mueve el disco',
        blocks: [
          {
            type: 'list',
            items: [
              'El [[lanzador]] **no puede correr** con el disco.',
              'Puede pasarlo **en cualquier dirección** a cualquier compañero.',
              'Si un pase no se completa, hay [[turnover]]: el otro equipo toma el disco y ataca hacia la zona contraria.',
            ],
          },
          {
            type: 'example',
            text: 'Lanzas un pase largo y el disco cae al piso sin que nadie de tu equipo lo atrape. No importa si el rival lo tocó o no: es turnover y ahora el rival ataca hacia tu zona.',
          },
        ],
      },
      {
        title: 'Cuánto dura un partido',
        blocks: [
          {
            type: 'p',
            text: 'Normalmente los partidos se juegan **a 15 goles** o alrededor de **100 minutos**. Hay variaciones para torneos especiales, número de jugadores, edades o espacio disponible.',
          },
        ],
      },
      {
        title: 'Lo que lo hace único',
        blocks: [
          {
            type: 'p',
            text: 'El Ultimate es **autoarbitrado** y **sin contacto**. No hay árbitros que piten: los jugadores hacen y resuelven sus propias llamadas.',
          },
          {
            type: 'p',
            text: 'Lo que guía esa forma de arbitrar y de comportarse es el [[espiritu-del-juego|Espíritu del Juego]], que verás a fondo en las dos siguientes lecciones.',
          },
          {
            type: 'rule',
            ref: 'Introducción',
            text: 'Muchas reglas son generales y cubren la mayoría de situaciones; algunas cubren casos específicos y en esos casos prevalecen sobre la regla general.',
          },
        ],
      },
    ],
    checkpoint: {
      prompt: 'Haces un pase y el disco cae al piso sin que ningún compañero lo atrape. ¿Qué pasa?',
      options: [
        'Se repite el pase desde donde estabas',
        'Es turnover: el otro equipo toma el disco y ataca hacia la zona contraria',
        'Sigue tu equipo si el disco cayó dentro del campo',
        'Lo decide el capitán de tu equipo',
      ],
      correct: 1,
      explanation:
        'Cualquier pase incompleto es un turnover: el otro equipo establece la posesión e intenta anotar en la zona de anotación opuesta.',
      ruleRef: 'Introducción',
    },
  },

  // ───────────────────────────────────────── m1.l2
  {
    id: 'm1.l2',
    intro: 'En Ultimate no hay árbitro: cada jugador es responsable del juego limpio. Aquí está la base de cómo funciona eso.',
    steps: [
      {
        title: 'Autoarbitraje',
        blocks: [
          {
            type: 'rule',
            ref: '1.1',
            text: 'El Ultimate es un deporte sin contacto y autoarbitrado. Todos los jugadores son responsables de aplicar y respetar las reglas. El juego limpio depende del Espíritu del Juego, que pone esa responsabilidad en cada jugador.',
          },
          { type: 'key', text: 'Tú eres el árbitro. Y el rival también.' },
        ],
      },
      {
        title: 'No se castiga el error, se repara',
        blocks: [
          {
            type: 'p',
            text: 'El reglamento parte de la confianza: se asume que **nadie rompe las reglas a propósito**. Por eso no hay castigos duros para los errores sin intención.',
          },
          {
            type: 'p',
            text: 'En vez de castigar, la idea es **reanudar el juego como lo más probable es que hubiera seguido** si la infracción no hubiera pasado.',
          },
          {
            type: 'rule',
            ref: '1.2.1',
            text: 'Si hay una infracción deliberada o muy grave de las reglas o del Espíritu, los capitanes deben hablarlo y decidir un resultado adecuado, aunque no sea el que diría una regla específica.',
          },
        ],
      },
      {
        title: 'Lo que se espera de ti como árbitro',
        blocks: [
          {
            type: 'p',
            text: 'Cuando hay una discusión entre equipos, los jugadores actúan como árbitros. El reglamento pide que cada jugador:',
          },
          {
            type: 'list',
            items: [
              'Conozca y respete **las reglas y su espíritu**.',
              'Sea imparcial, objetivo y **honesto**.',
              'Explique su punto de vista de forma **clara y breve**, y deje hablar al rival.',
              '**Escuche y considere** lo que dice el rival.',
              'Use palabras y lenguaje corporal **respetuosos**, considerando posibles diferencias culturales.',
              'Resuelva las discusiones **rápido**.',
              'Haga sus llamadas de forma **consistente** durante todo el partido.',
              'Solo haga una llamada cuando la infracción **sea lo bastante importante** como para cambiar el resultado de la jugada, o cuando la seguridad de alguien esté en riesgo.',
            ],
          },
          { type: 'rule', ref: '1.3', text: 'Esta es la lista de 1.3.1 a 1.3.10, resumida.' },
        ],
      },
      {
        title: 'Competir duro, con respeto',
        blocks: [
          {
            type: 'rule',
            ref: '1.4',
            text: 'Se fomenta el juego muy competitivo, pero nunca a costa del respeto mutuo, de las reglas acordadas, de la seguridad de los jugadores ni del gusto básico de jugar.',
          },
          {
            type: 'example',
            text: 'Un rival te roza la mano apenas, sin cambiar en nada tu atrapada. Según 1.3.10, no vale la pena parar el juego por eso: la llamada se reserva para lo que realmente cambia la jugada o pone en riesgo a alguien.',
          },
        ],
      },
    ],
    checkpoint: {
      prompt: '¿Cuándo deberías hacer una llamada según el Espíritu del Juego?',
      options: [
        'Siempre que notes cualquier contacto o error del rival',
        'Solo si el capitán de tu equipo está de acuerdo',
        'Cuando la infracción cambia el resultado de la jugada o la seguridad de alguien está en riesgo',
        'Solo en jugadas que terminan en gol',
      ],
      correct: 2,
      explanation:
        'La regla 1.3.10 pide hacer llamadas solo cuando la infracción es lo bastante importante como para cambiar el resultado de la acción, o cuando la seguridad de un jugador está en riesgo.',
      ruleRef: '1.3.10',
    },
  },

  // ───────────────────────────────────────── m1.l3
  {
    id: 'm1.l3',
    intro: 'Cómo se ve el buen Espíritu en la práctica, qué está prohibido y qué pasa cuando no hay acuerdo.',
    steps: [
      {
        title: 'Buen Espíritu',
        blocks: [
          { type: 'p', text: 'Algunos ejemplos de buen Espíritu que da el reglamento:' },
          {
            type: 'list',
            items: [
              '**Retirar una llamada** cuando ya no crees que fuera correcta.',
              'Buscar al rival en la banda después de una jugada tensa para hablarlo.',
              'Felicitar a un rival por una buena jugada o por su Espíritu.',
              'Presentarte con tu rival.',
              'Reaccionar con calma ante un desacuerdo o una provocación.',
            ],
          },
          { type: 'rule', ref: '1.5', text: 'Ejemplos de buen Espíritu.' },
        ],
      },
      {
        title: 'Lo que viola el Espíritu',
        blocks: [
          { type: 'p', text: 'Estas acciones son violaciones claras del Espíritu del Juego y hay que evitarlas:' },
          {
            type: 'list',
            items: [
              'Juego peligroso y comportamiento agresivo.',
              'Faltas intencionales u otras infracciones a propósito.',
              'Burlarse de los rivales o intimidarlos.',
              'Celebrar un gol de forma irrespetuosa.',
              'Hacer llamadas **como revancha** por una llamada del rival.',
              'Pedirle el pase a un jugador del otro equipo.',
              'Cualquier otro comportamiento de «ganar a toda costa».',
            ],
          },
          { type: 'rule', ref: '1.6', text: 'Violaciones claras del Espíritu del Juego.' },
        ],
      },
      {
        title: 'El equipo cuida el Espíritu',
        blocks: [
          {
            type: 'p',
            text: 'Los equipos son los **guardianes** del Espíritu. Deben enseñar las reglas y el buen Espíritu a su gente, corregir a los compañeros que tengan mal Espíritu, darles retroalimentación constructiva a otros equipos y, cuando haga falta, pedir una [[parada-de-espiritu|parada de Espíritu]].',
          },
          {
            type: 'p',
            text: 'Si un jugador novato comete una infracción porque no conoce la regla, los jugadores con experiencia deben ayudarle a entenderla. En partidos de principiantes o de jugadores jóvenes puede haber un jugador experimentado que oriente sobre las reglas.',
          },
          { type: 'rule', ref: '1.7 – 1.9', text: 'El rol del equipo, los novatos y los supervisores.' },
        ],
      },
      {
        title: 'Quién decide y qué pasa sin acuerdo',
        blocks: [
          {
            type: 'list',
            items: [
              'Las llamadas las discuten **los jugadores directamente involucrados** y los que tuvieron la [[mejor-perspectiva|mejor perspectiva]].',
              'Si un compañero que no estaba en la jugada cree que tu llamada fue incorrecta, debe decírtelo.',
              'Las personas que no están jugando, salvo los capitanes, no deben meterse; aunque se les puede preguntar para aclarar una regla.',
              'Solo los **jugadores y capitanes** hacen y resuelven las llamadas.',
            ],
          },
          {
            type: 'rule',
            ref: '1.12',
            text: 'Si después de hablarlo no hay acuerdo, o no está claro qué pasó o qué habría pasado en la jugada, el disco vuelve al **último lanzador no disputado**.',
          },
          { type: 'key', text: 'Sin acuerdo → el disco vuelve al último lanzador que nadie discute.' },
        ],
      },
    ],
    checkpoint: {
      prompt: 'Hay una llamada, los dos equipos lo discuten y no logran ponerse de acuerdo sobre qué pasó. ¿Cómo sigue el juego?',
      options: [
        'Gana la versión del equipo que tiene el disco',
        'Se repite el punto completo',
        'Deciden los entrenadores desde la banda',
        'El disco vuelve al último lanzador no disputado',
      ],
      correct: 3,
      explanation:
        'Según 1.12, si no hay acuerdo o no está claro qué ocurrió (o qué habría ocurrido), el disco vuelve al último lanzador cuya posesión nadie discute.',
      ruleRef: '1.12',
    },
  },

  // ───────────────────────────────────────── m1.l4
  {
    id: 'm1.l4',
    intro: 'Las partes de la cancha y qué línea pertenece a qué. Esto decide muchos goles y muchos «fuera».',
    steps: [
      {
        title: 'Las partes del campo',
        blocks: [
          {
            type: 'p',
            text: 'El [[campo-de-juego|campo de juego]] es rectangular: una [[zona-central|zona central]] y una [[zona-de-anotacion|zona de anotación]] en cada extremo. Debe ser plano, sin obstáculos y razonablemente seguro.',
          },
          {
            type: 'p',
            text: 'Lo rodean las [[lineas-perimetrales|líneas perimetrales]]: dos **laterales** a lo largo y dos **de fondo** a lo ancho. Ocho conos de colores marcan las esquinas de la zona central y de las zonas de anotación.',
          },
          { type: 'rule', ref: '2.1 – 2.2, 2.6', text: 'Forma del campo, líneas perimetrales y conos.' },
        ],
      },
      {
        title: 'Las dos líneas que confunden',
        blocks: [
          {
            type: 'rule',
            ref: '2.3',
            text: 'Las líneas perimetrales **no** son parte del campo de juego: pisarlas es estar fuera de límites.',
          },
          {
            type: 'rule',
            ref: '2.4',
            text: 'Las líneas de gol separan la zona central de las zonas de anotación y **son parte de la zona central**.',
          },
          {
            type: 'example',
            text: 'Atrapas el disco con un pie sobre la línea de gol de tu zona de ataque. **No es gol**: la línea de gol pertenece a la zona central, así que ese pie no está dentro de la zona de anotación.',
          },
          { type: 'key', text: 'Línea perimetral = afuera. Línea de gol = zona central.' },
        ],
      },
      {
        title: 'El brick',
        blocks: [
          {
            type: 'p',
            text: 'Los [[brick|bricks]] son dos cruces de líneas de un metro dentro de la zona central. Cada uno está a una distancia de su línea de gol **igual al largo de la zona de anotación**, centrado entre las laterales.',
          },
          { type: 'p', text: 'Se usan para poner el disco en juego en algunas situaciones del pull; lo verás en el módulo 2.' },
          { type: 'rule', ref: '2.5', text: 'Ubicación de las marcas de brick.' },
        ],
      },
      {
        title: 'Alrededores y equipamiento',
        blocks: [
          {
            type: 'rule',
            ref: '2.7',
            text: 'Los alrededores del campo deben estar libres de objetos movibles. Si una persona que no juega o un objeto a menos de 3 metros de la línea perimetral obstruye la jugada, el jugador obstruido o el lanzador puede llamar «Violation».',
          },
          {
            type: 'list',
            items: [
              'Se puede usar cualquier disco que acepten **ambos capitanes** (la WFDF puede tener una lista de discos aprobados).',
              'Cada jugador debe llevar un **uniforme** que distinga a su equipo.',
              'Nadie puede usar ropa o equipamiento que pueda lastimar a alguien o impedir que el rival juegue.',
            ],
          },
          { type: 'rule', ref: '3.1 – 3.4', text: 'Disco, uniforme y equipamiento.' },
        ],
      },
    ],
    checkpoint: {
      prompt: 'Un receptor atrapa el disco con un pie dentro de la zona de anotación que ataca y el otro pie pisando la línea de gol. ¿Es gol?',
      options: [
        'Sí, la línea de gol es parte de la zona de anotación',
        'No, la línea de gol es parte de la zona central',
        'No, porque pisó una línea perimetral y es fuera',
        'Sí, si el rival está de acuerdo',
      ],
      correct: 1,
      explanation:
        'La línea de gol pertenece a la zona central (2.4). Para anotar, todos los contactos con el suelo deben estar completamente dentro de la zona de anotación; eso lo verás en detalle en el módulo 3.',
      ruleRef: '2.4',
    },
  },

  // ───────────────────────────────────────── m1.l5
  {
    id: 'm1.l5',
    intro: 'Cómo se cuenta un partido, cuántos juegan y cómo se decide quién empieza.',
    steps: [
      {
        title: 'Puntos, mitades y final',
        blocks: [
          {
            type: 'list',
            items: [
              'Un partido tiene varios **puntos**; cada punto termina cuando se anota un gol.',
              'Gana el primer equipo en llegar a **15 goles**.',
              'Hay dos mitades: el **medio tiempo** llega cuando un equipo anota su gol **número 8**.',
            ],
          },
          { type: 'rule', ref: '4.1 – 4.4', text: 'Estructura del partido.' },
        ],
      },
      {
        title: 'Después de cada gol',
        blocks: [
          { type: 'p', text: 'Si el partido no terminó y no es medio tiempo, después de un gol:' },
          {
            type: 'list',
            ordered: true,
            items: [
              'El siguiente punto empieza de inmediato.',
              'Los equipos **cambian de lado**.',
              'El equipo que anotó pasa a **defender** y hace el siguiente [[pull]].',
            ],
          },
          { type: 'rule', ref: '4.5', text: 'Qué pasa tras cada gol.' },
          { type: 'key', text: 'Anotaste → cambias de lado, defiendes y lanzas el pull.' },
        ],
      },
      {
        title: 'Equipos',
        blocks: [
          {
            type: 'list',
            items: [
              'Cada equipo pone en cancha **máximo 7 y mínimo 5** jugadores por punto.',
              'Cada equipo designa un **capitán** y un [[capitan-de-espiritu|capitán de Espíritu]].',
              'Los cambios son **ilimitados**, pero solo después de un gol y antes de que el equipo señale que está listo para el pull.',
              'En partidos mixtos se usa una proporción alternada de **4:3**.',
            ],
          },
          { type: 'rule', ref: '5.1 – 5.4', text: 'Jugadores, capitanes, cambios y mixto.' },
        ],
      },
      {
        title: 'Quién empieza',
        blocks: [
          {
            type: 'p',
            text: 'Representantes de los dos equipos definen de forma justa (por ejemplo, lanzando el disco al aire) cuál equipo elige primero entre:',
          },
          {
            type: 'list',
            items: ['**Recibir o lanzar** el pull inicial, o', '**Qué zona** va a defender al principio.'],
          },
          {
            type: 'p',
            text: 'El otro equipo se queda con la elección que sobra. En la segunda mitad, esas elecciones **se invierten**.',
          },
          { type: 'rule', ref: '6.1 – 6.3', text: 'Inicio del partido.' },
          {
            type: 'example',
            text: 'Ganan el sorteo y eligen recibir el pull. El rival entonces elige qué zona defender. Al volver del medio tiempo, ustedes lanzan el pull y el rival recibe.',
          },
        ],
      },
    ],
    checkpoint: {
      prompt: 'Tu equipo acaba de anotar y el partido va 5–3. ¿Qué sigue?',
      options: [
        'Tu equipo vuelve a recibir el pull',
        'Tu equipo cambia de lado, pasa a defender y lanza el pull',
        'Se hace un nuevo sorteo para ver quién lanza',
        'Los equipos se quedan del mismo lado y el rival lanza',
      ],
      correct: 1,
      explanation:
        'Tras un gol (si no terminó el partido ni es medio tiempo), el punto siguiente empieza de inmediato, los equipos cambian de lado y el que anotó defiende y lanza el pull (4.5).',
      ruleRef: '4.5',
    },
  },
]

export const REPASO_1: ReviewContent = {
  moduleId: 1,
  questions: [
    {
      prompt: '¿Qué puede hacer el lanzador con el disco?',
      options: [
        'Correr con él hasta tres pasos',
        'Pasarlo en cualquier dirección, pero no correr con él',
        'Pasarlo solo hacia adelante',
        'Correr con él si nadie lo está marcando',
      ],
      correct: 1,
      explanation: 'El lanzador no puede correr con el disco, pero puede pasarlo en cualquier dirección a cualquier compañero.',
      ruleRef: 'Introducción',
      lessonId: 'm1.l1',
    },
    {
      prompt: 'Un jugador comete una infracción sin intención. ¿Cuál es el enfoque del reglamento?',
      options: [
        'Expulsarlo del punto',
        'Darle un punto al otro equipo',
        'Reanudar como lo más probable es que hubiera seguido la jugada sin la infracción',
        'Que el capitán rival decida un castigo',
      ],
      correct: 2,
      explanation:
        'No hay castigos duros para infracciones sin intención: se reanuda de una forma que simule lo que más probablemente habría pasado (1.2).',
      ruleRef: '1.2',
      lessonId: 'm1.l2',
    },
    {
      prompt: '¿Cuál de estas acciones es una violación clara del Espíritu del Juego?',
      options: [
        'Retirar una llamada que ya no crees correcta',
        'Hacer una llamada como revancha porque el rival te hizo una',
        'Felicitar a un rival por una buena jugada',
        'Pedir una parada de Espíritu',
      ],
      correct: 1,
      explanation: 'Hacer llamadas en represalia a una llamada del rival es una de las violaciones claras del Espíritu (1.6.5).',
      ruleRef: '1.6',
      lessonId: 'm1.l3',
    },
    {
      prompt: 'Un jugador pisa la línea lateral mientras atrapa el disco. ¿Dónde está?',
      options: [
        'Dentro, porque la línea es parte del campo',
        'Fuera de límites, porque las líneas perimetrales no son parte del campo',
        'Depende de si es zona central o de anotación',
        'Dentro, si el otro pie está en el campo',
      ],
      correct: 1,
      explanation:
        'Las líneas perimetrales no forman parte del campo de juego (2.3); son fuera de límites. Qué pasa exactamente con esa atrapada lo verás en el módulo 3.',
      ruleRef: '2.3',
      lessonId: 'm1.l4',
    },
    {
      prompt: '¿Cuándo llega el medio tiempo?',
      options: [
        'A los 50 minutos de juego',
        'Cuando un equipo anota su gol número 8',
        'Cuando la suma de los dos equipos llega a 15',
        'Cuando un equipo anota su gol número 7',
      ],
      correct: 1,
      explanation: 'El medio tiempo ocurre cuando un equipo anota su octavo gol (4.3).',
      ruleRef: '4.3',
      lessonId: 'm1.l5',
    },
    {
      prompt: 'Tu equipo quiere meter un cambio en medio de un punto, mientras el disco está en juego. ¿Se puede?',
      options: [
        'Sí, los cambios son ilimitados en cualquier momento',
        'Sí, pero solo durante un time-out',
        'No, los cambios se hacen después de un gol y antes de señalar que están listos para el pull',
        'Solo si el capitán rival lo autoriza',
      ],
      correct: 2,
      explanation:
        'Los cambios son ilimitados, pero solo después de un gol y antes de que el equipo señale que está listo para el pull (5.3). Hay excepciones por lesión que verás en el módulo 4.',
      ruleRef: '5.3',
      lessonId: 'm1.l5',
    },
  ],
}
