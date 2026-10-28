import type { LessonContent, ReviewContent } from './types'

// Módulo 3 · Posesión, límites y anotación
// Fuente: WFDF Rules of Ultimate 2025–2028 — secciones 11 a 14.
// Traducción y adaptación propias (CC BY 4.0).

export const MODULO_3: LessonContent[] = [
  // ───────────────────────────────────────── m3.l1 · 11
  {
    id: 'm3.l1',
    intro: 'Qué está dentro, qué está fuera y quién decide si una atrapada vale. Aquí se resuelven muchos «¿salió o no salió?».',
    steps: [
      {
        title: 'Adentro y afuera',
        blocks: [
          {
            type: 'list',
            items: [
              'Todo el [[campo-de-juego|campo de juego]] está **dentro**. Las líneas perimetrales están **fuera**.',
              'El área fuera de límites es el suelo que no está dentro **y todo lo que esté en contacto con él**, incluidas las personas que no juegan.',
              'Excepción importante: los **defensores siempre se consideran dentro**, estén donde estén.',
            ],
          },
          { type: 'rule', ref: '11.1, 11.2', text: 'Qué es dentro y qué es fuera de límites.' },
          { type: 'key', text: 'La regla de dentro y fuera se aplica a los atacantes; los defensores siempre cuentan como dentro.' },
        ],
      },
      {
        title: 'Cuándo un atacante está dentro',
        blocks: [
          {
            type: 'list',
            items: [
              'Un atacante que **no está fuera, está dentro**.',
              'Un jugador **en el aire** conserva el estado que tenía hasta que vuelve a tocar el campo o el área de afuera.',
              'Si atrapas, **tocas el campo y después sales**, sigues contando como dentro mientras mantengas la atrapada hasta establecer la posesión. Luego estableces el pivote donde cruzaste la línea.',
              'Un **lanzador** que toca el área de afuera se considera dentro hasta que lanza.',
              'El contacto entre jugadores **no pasa** el estado de dentro o fuera de uno a otro.',
            ],
          },
          { type: 'rule', ref: '11.3', text: 'Estado de los atacantes.' },
        ],
      },
      {
        title: 'Recepciones que son fuera',
        blocks: [
          { type: 'p', text: 'Son turnover por fuera de límites, y **no se cuenta como atrapada**:' },
          {
            type: 'list',
            items: [
              'Que **cualquier parte** del receptor esté fuera cuando toca el disco.',
              'Atrapar **en el aire** y que tu **primer contacto** con el suelo sea fuera mientras sigues tocando el disco.',
            ],
          },
          { type: 'rule', ref: '11.4', text: 'Turnovers por fuera de límites.' },
          {
            type: 'example',
            text: 'Saltas desde adentro, atrapas el disco en el aire cerca de la lateral y caes con el primer pie del otro lado de la línea. Aunque saltaste desde adentro, es turnover: tu primer contacto con el disco en las manos fue fuera.',
          },
        ],
      },
      {
        title: 'El disco fuera y dónde se reanuda',
        blocks: [
          {
            type: 'list',
            items: [
              'El disco se vuelve fuera cuando **toca primero el área de afuera** o a un **atacante que está fuera**. Un disco atrapado tiene el mismo estado que el jugador que lo tiene.',
              'Si el disco vuela por fuera de la línea y **vuelve al campo**, sigue en juego. Los jugadores pueden salir para jugarlo.',
              'El lugar donde salió es donde el disco estuvo **por última vez sobre el campo**, total o parcialmente, o donde lo tocó por última vez un jugador que estaba dentro.',
              'Si el disco queda a más de 3 metros del lugar del pivote, alguien que no juega puede alcanzarlo, pero el lanzador debe llevarlo los **últimos 3 metros**.',
            ],
          },
          { type: 'rule', ref: '11.5 – 11.9', text: 'Estado del disco y lugar donde salió.' },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: 'Saltas desde adentro, atrapas en el aire y tu primer pie cae fuera de la línea lateral mientras sostienes el disco. ¿Qué pasa?',
        options: [
          'Es una atrapada válida porque saltaste desde adentro',
          'Es turnover por fuera de límites',
          'Se repite el pase',
          'Es válida si el otro pie cae adentro después',
        ],
        correct: 1,
        explanation:
          'Si atrapas en el aire y tu primer contacto con el suelo es fuera mientras sigues en contacto con el disco, es turnover y no se cuenta como atrapada (11.4.2).',
        ruleRef: '11.4.2',
      },
      {
        prompt: 'Un pase sale volando por fuera de la línea lateral, se curva, vuelve sobre el campo y tu compañero lo atrapa adentro. ¿Qué pasa?',
        options: [
          'Es turnover porque el disco salió',
          'La jugada sigue: el disco puede salir volando y volver al campo',
          'Se para el juego y se pone el disco en la línea',
          'Es válida solo si nadie la disputa',
        ],
        correct: 1,
        explanation:
          'El disco puede volar por fuera de una línea perimetral y volver al campo; solo se vuelve fuera cuando toca el área de afuera o a un atacante que está fuera (11.6, 11.7).',
        ruleRef: '11.7',
      },
      {
        prompt: 'Un defensor con los pies fuera de la línea lateral desvía el disco, que vuelve al campo y lo atrapa un atacante adentro. ¿Qué pasa?',
        options: [
          'Es turnover porque el disco tocó a alguien que estaba fuera',
          'La jugada sigue: los defensores siempre se consideran dentro',
          'El disco vuelve al lanzador',
          'Se pone el disco donde estaba el defensor',
        ],
        correct: 1,
        explanation:
          'Los defensores siempre se consideran dentro (11.2). El disco solo se vuelve fuera al tocar el área de afuera o a un atacante que está fuera (11.6).',
        ruleRef: '11.2, 11.6',
      },
    ],
  },

  // ───────────────────────────────────────── m3.l2 · 12.1–12.5
  {
    id: 'm3.l2',
    intro: 'Qué cuenta como atrapar el disco, cuándo es tuyo y quién tiene derecho a qué espacio en la cancha.',
    steps: [
      {
        title: 'Qué es una atrapada',
        blocks: [
          {
            type: 'p',
            text: 'Una [[atrapada]] es un disco **que no está girando**, sujeto **entre al menos dos partes del cuerpo** (dos manos, mano y pecho, mano y pierna…).',
          },
          { type: 'rule', ref: '12.1', text: 'Definición de atrapada.' },
        ],
      },
      {
        title: 'De atrapada a posesión',
        blocks: [
          {
            type: 'p',
            text: 'Atrapar no es lo mismo que tener la [[posesion|posesión]]. Para establecerla tienes que **mantener la atrapada más de un instante** y **durante todo el contacto con el suelo** relacionado con esa atrapada. Después de eso pasas a ser el lanzador.',
          },
          {
            type: 'p',
            text: 'Si pierdes la atrapada por el golpe contra el suelo, o por contacto con un compañero o con un rival bien ubicado, **no hubo posesión**.',
          },
          { type: 'rule', ref: '12.1.1, 12.2', text: 'Cuándo no hay posesión y cuándo pasas a ser lanzador.' },
          {
            type: 'example',
            text: 'Te lanzas, atrapas el disco en el aire y al caer al pasto se te suelta. No hubo posesión: el disco tocó el suelo sin que lo tuvieras, así que es turnover.',
          },
        ],
      },
      {
        title: 'Atrapadas simultáneas',
        blocks: [
          {
            type: 'rule',
            ref: '12.3',
            text: 'Si un atacante y un defensor atrapan el disco **al mismo tiempo**, la ofensiva **conserva** la posesión.',
          },
          { type: 'key', text: 'Atrapada simultánea → el disco es de la ofensiva.' },
        ],
      },
      {
        title: 'Tu espacio en la cancha',
        blocks: [
          {
            type: 'list',
            items: [
              'Un jugador en una **posición establecida** tiene derecho a quedarse ahí, y el rival **no puede contactarlo**.',
              'Cualquier jugador puede ocupar un espacio **que no ocupe un rival**, siempre que no inicie contacto al tomarlo ni se mueva de forma imprudente o peligrosa.',
              'Pero con el disco en el aire, **no puedes moverte solo para cortarle** a un rival el camino libre hacia el disco.',
            ],
          },
          { type: 'rule', ref: '12.4, 12.5', text: 'Posición establecida y espacio libre.' },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: 'Te lanzas, atrapas el disco en el aire y al golpear el suelo se te suelta. ¿Hubo posesión?',
        options: [
          'Sí, porque lo atrapaste en el aire',
          'No, porque no mantuviste la atrapada durante el contacto con el suelo',
          'Sí, si lo tuviste más de un segundo en el aire',
          'Depende de si el rival estaba cerca',
        ],
        correct: 1,
        explanation:
          'Si no mantienes la atrapada por el contacto con el suelo relacionado con ella, se considera que no hubo posesión (12.1.1).',
        ruleRef: '12.1.1',
      },
      {
        prompt: 'Un atacante y un defensor atrapan el disco exactamente al mismo tiempo. ¿De quién es?',
        options: ['De la defensa', 'De la ofensiva', 'Se repite el pase', 'Lo deciden los capitanes'],
        correct: 1,
        explanation: 'Si un atacante y un defensor atrapan el disco simultáneamente, la ofensiva conserva la posesión (12.3).',
        ruleRef: '12.3',
      },
      {
        prompt: 'Con el disco en el aire, un defensor se mueve solo para bloquearle a un atacante el camino libre hacia el disco, sin intentar jugarlo. ¿Está permitido?',
        options: [
          'Sí, cualquier espacio libre se puede ocupar',
          'No: con el disco en el aire no puedes moverte solo para impedir que el rival tome un camino libre hacia el disco',
          'Sí, si no hay contacto',
          'Solo dentro de la zona de anotación',
        ],
        correct: 1,
        explanation:
          'Aunque puedes ocupar espacios libres, cuando el disco está en el aire no puedes moverte únicamente para impedir que un rival tome un camino libre hacia el disco (12.5.1).',
        ruleRef: '12.5.1',
      },
    ],
  },

  // ───────────────────────────────────────── m3.l3 · 12.6–12.10
  {
    id: 'm3.l3',
    intro: 'El Ultimate es sin contacto. La clave está en saber quién lo inicia cuando dos jugadores se chocan.',
    steps: [
      {
        title: 'Nadie tiene excusa para iniciar contacto',
        blocks: [
          {
            type: 'list',
            items: [
              'Todos deben intentar **no iniciar contacto**, y **no hay ninguna situación** que lo justifique.',
              'Eso incluye no chocar a un rival quieto, ni el lugar donde **va a estar** según su velocidad y dirección.',
              '«Iba por el disco» **no es excusa** para iniciar contacto.',
            ],
          },
          { type: 'rule', ref: '12.6, 12.6.1', text: 'Evitar iniciar contacto.' },
          { type: 'key', text: '«Iba por el disco» nunca justifica el contacto.' },
        ],
      },
      {
        title: 'Antes de lanzarte',
        blocks: [
          {
            type: 'list',
            items: [
              'Antes de **lanzarte, saltar o tirarte** desde tu posición, tienes que estar razonablemente seguro de que **no vas a chocar** a un rival.',
              'Si no estás seguro de llegar al disco legalmente antes que un rival que se mueve legal, **debes ajustar** tu movimiento. Si ajustas, el resultado de la jugada se mantiene.',
            ],
          },
          { type: 'rule', ref: '12.6.2, 12.6.3', text: 'Lanzarse y ajustar el movimiento.' },
        ],
      },
      {
        title: 'Quién inició el contacto',
        blocks: [
          { type: 'p', text: 'Inicia el contacto el jugador que:' },
          {
            type: 'list',
            items: [
              '**Llegó al punto de contacto después** de que el rival ya había establecido ahí una posición legítima (quieto o en movimiento), o',
              '**Cambió su movimiento** de forma que el choque con un rival que se movía legalmente fue inevitable, considerando posición, velocidad y dirección de todos.',
              'Si no está claro y **uno de los dos se lanzó, saltó o se tiró**, se considera que ese jugador inició el contacto.',
            ],
          },
          { type: 'rule', ref: '12.7', text: 'Quién inicia el contacto.' },
          {
            type: 'example',
            text: 'Tu rival ya está parado donde va a caer el disco. Llegas corriendo por detrás y lo chocas al saltar. El que inició el contacto fuiste tú: llegaste después de que él estableció su posición.',
          },
        ],
      },
      {
        title: 'Contacto menor y lo que no se vale',
        blocks: [
          {
            type: 'list',
            items: [
              'Cuando dos o más jugadores van **al mismo punto a la vez**, puede haber [[contacto-menor|contacto menor]]. Hay que minimizarlo, pero **no es falta**.',
              'No se vale usar **brazos o piernas extendidos** para obstruir el movimiento del rival.',
              'No se vale **impulsar físicamente** a otro jugador, ni usar un objeto o equipamiento para alcanzar el disco.',
            ],
          },
          { type: 'rule', ref: '12.8 – 12.10', text: 'Contacto menor, obstrucción y ayudas.' },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: 'Corres por el disco y chocas a un rival que ya estaba quieto en su posición. ¿Es excusa que ibas por el disco?',
        options: [
          'Sí, si tenías posibilidad real de atraparlo',
          'No: hacer una jugada sobre el disco no justifica iniciar contacto',
          'Sí, si el choque fue en la zona de anotación',
          'Solo si el rival se movió primero',
        ],
        correct: 1,
        explanation:
          'Ninguna situación justifica iniciar contacto, y «hacer una jugada sobre el disco» no es una excusa válida (12.6, 12.6.1).',
        ruleRef: '12.6.1',
      },
      {
        prompt: 'Dos jugadores chocan y no está claro quién inició el contacto, pero uno de ellos se había lanzado en dive. ¿Quién se considera que lo inició?',
        options: ['El que no se lanzó', 'El que se lanzó', 'Ninguno: es contacto menor', 'El que estaba en defensa'],
        correct: 1,
        explanation:
          'Si no está claro quién inició el contacto y uno de los jugadores se lanzó, saltó o se tiró desde su posición, se considera que ese jugador lo inició (12.7.3).',
        ruleRef: '12.7.3',
      },
      {
        prompt: 'Dos jugadores corren al mismo punto al mismo tiempo y se rozan levemente, sin cambiar la jugada. ¿Qué es?',
        options: [
          'Falta de quien llegó segundo',
          'Contacto menor: hay que minimizarlo, pero no es falta',
          'Turnover',
          'Violación de los dos',
        ],
        correct: 1,
        explanation:
          'Cuando dos o más jugadores se mueven a la vez hacia un mismo punto puede haber contacto menor; debe minimizarse, pero no se considera falta (12.8).',
        ruleRef: '12.8',
      },
    ],
  },

  // ───────────────────────────────────────── m3.l4 · 13
  {
    id: 'm3.l4',
    intro: 'Todas las formas de perder el disco, quién lo recoge y desde dónde se vuelve a jugar.',
    steps: [
      {
        title: 'Turnovers sin parar el juego',
        blocks: [
          { type: 'p', text: 'Cambia la posesión y el juego **sigue**, cuando:' },
          {
            type: 'list',
            items: [
              '**Down:** el disco toca el suelo sin estar en posesión de un atacante. No es down si el receptor lo atrapó antes y lo mantiene mientras el disco toca el suelo.',
              '**Intercepción:** un defensor establece la posesión de un pase.',
              '**Out:** el disco se vuelve fuera de límites.',
              '**Dropped pull:** la ofensiva toca el pull en el aire y no establece la posesión.',
            ],
          },
          { type: 'rule', ref: '13.1', text: 'Turnovers sin parada.' },
        ],
      },
      {
        title: 'Turnovers que paran el juego',
        blocks: [
          { type: 'p', text: 'Cambia la posesión **y se detiene el juego**, cuando:' },
          {
            type: 'list',
            items: [
              'Se acepta una **falta de recepción de la ofensiva**.',
              '**Stall-out:** el lanzador no soltó el disco antes de que el marcador empezara a decir «diez».',
              '**Handover:** el disco pasa de un atacante a otro sin quedar en ningún momento libre de los dos.',
              '**Deflection:** el lanzador desvía a propósito un pase hacia sí mismo usando a otro jugador.',
              '**Self-catch:** el lanzador atrapa su propio pase antes de que lo toque otro jugador.',
              'Un atacante **impulsa a propósito** a un compañero para atrapar, o usa un objeto para atrapar.',
            ],
          },
          { type: 'rule', ref: '13.2', text: 'Turnovers con parada.' },
          {
            type: 'p',
            text: 'Sobre el stall-out: si el lanzador aún tiene el disco y cree que hubo un conteo rápido sin oportunidad de llamarlo, se trata como infracción de la defensa aceptada o como stall-out en disputa. Si disputa el stall-out pero igual lanza y el pase es incompleto, el turnover se mantiene.',
          },
          { type: 'rule', ref: '13.4', text: 'Llamadas de stall-out.' },
        ],
      },
      {
        title: 'Llamar el turnover y quién recoge',
        blocks: [
          {
            type: 'list',
            items: [
              'Si crees que hubo turnover, haz la llamada **de inmediato**. Si el rival no está de acuerdo, dice **«contest»** y se para el juego. Sin acuerdo, el disco vuelve al último lanzador no disputado.',
              'Tras un turnover, **cualquier atacante** puede recoger el disco, salvo dos casos: en una **intercepción**, el que interceptó debe quedárselo; tras una **falta de recepción de la ofensiva** aceptada, el disco es del jugador que recibió la falta.',
              'Si el que tiene el disco tras un turnover lo suelta, lo pone en el suelo o lo pasa a propósito, debe recuperarlo y reanudar con check.',
            ],
          },
          { type: 'rule', ref: '13.3, 13.5, 13.6', text: 'Llamadas, quién recoge y posesión tras turnover.' },
        ],
      },
      {
        title: 'Desde dónde se juega',
        blocks: [
          {
            type: 'list',
            items: [
              'Si el turnover fue **fuera**, o el disco tocó el área de afuera después: pivote en el punto de la **zona central** más cercano a donde salió.',
              'En la **zona central**: pivote en el lugar del turnover.',
              'En la zona de anotación que **ataca** el nuevo equipo con el disco: pivote en el punto **más cercano de la línea de gol**.',
              'En la zona de anotación que **defiende**: el lanzador elige: quedarse en el lugar del turnover (o hacer una finta), o ir al punto más cercano de la línea de gol. Puede señalar la opción de la línea de gol con un brazo arriba antes de recoger el disco. **Moverse, quedarse quieto, fintar o señalar decide, y no hay vuelta atrás.**',
            ],
          },
          { type: 'rule', ref: '13.7 – 13.11', text: 'Lugar del turnover y del pivote.' },
          {
            type: 'p',
            text: 'Si se aceptó un turnover pero el juego siguió sin que nadie se diera cuenta, se para, el disco vuelve al lugar del turnover y todos regresan a donde estaban.',
          },
          { type: 'rule', ref: '13.12', text: 'Juego que siguió sin saberlo.' },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: 'Un defensor intercepta un pase. ¿Quién debe poner el disco en juego?',
        options: [
          'Cualquier jugador de su equipo',
          'El defensor que interceptó',
          'El que esté más cerca de la línea de gol',
          'El capitán',
        ],
        correct: 1,
        explanation:
          'Tras una intercepción, el jugador que interceptó debe mantener la posesión: es la excepción a que cualquier atacante pueda recoger el disco (13.5.1).',
        ruleRef: '13.5.1',
      },
      {
        prompt: 'Hay un turnover y el disco queda dentro de la zona de anotación que tu equipo ahora ataca. ¿Dónde estableces el pivote?',
        options: [
          'Donde quedó el disco',
          'En el brick',
          'En el punto más cercano de la línea de gol',
          'En el centro de la zona central',
        ],
        correct: 2,
        explanation:
          'Si el turnover ocurre en la zona de anotación que ataca el equipo que toma el disco, el pivote va en el punto más cercano de la línea de gol (13.10).',
        ruleRef: '13.10',
      },
      {
        prompt: 'Tras un turnover dentro de tu zona de defensa, recoges el disco y caminas hacia la línea de gol. ¿Puedes cambiar de opinión y jugar desde donde estaba el disco?',
        options: [
          'Sí, mientras no hayas lanzado',
          'No: moverte ya decidió que el pivote va en la línea de gol',
          'Sí, si la defensa está de acuerdo',
          'Solo si no habías señalado con el brazo',
        ],
        correct: 1,
        explanation:
          'En tu zona de defensa eliges dónde poner el pivote, pero moverte de inmediato, quedarte quieto, fintar o señalar con el brazo decide la opción y no se puede revertir (13.11.3).',
        ruleRef: '13.11.3',
      },
    ],
  },

  // ───────────────────────────────────────── m3.l5 · 14
  {
    id: 'm3.l5',
    intro: 'El momento más importante de cada punto, con todas sus condiciones.',
    steps: [
      {
        title: 'Cuándo es gol',
        blocks: [
          { type: 'p', text: 'Es gol cuando un jugador que está **dentro** atrapa un **pase legal** y:' },
          {
            type: 'list',
            items: [
              '**Todos** sus contactos con el suelo están **completamente dentro** de su zona de ataque. Si atrapa en el aire, cuentan los **primeros puntos de contacto** al caer.',
              'Después **establece la posesión** y mantiene la atrapada durante todo el contacto con el suelo relacionado con ella.',
            ],
          },
          { type: 'rule', ref: '14.1', text: 'Condiciones para anotar.' },
          {
            type: 'example',
            text: 'Saltas desde la zona central, atrapas en el aire y caes con los dos pies dentro de la zona de anotación, sin soltar el disco. Es gol: lo que cuenta es dónde caes, no desde dónde saltaste.',
          },
        ],
      },
      {
        title: 'Atrapar antes de la zona',
        blocks: [
          {
            type: 'rule',
            ref: '14.3',
            text: 'Si un jugador con el disco termina dentro de su zona de ataque **sin haber anotado** según 14.1, debe establecer el pivote en el punto **más cercano de la línea de gol**.',
          },
          {
            type: 'example',
            text: 'Atrapas el disco corriendo en la zona central y el impulso te lleva hasta dentro de la zona de anotación. No es gol: vuelves al punto más cercano de la línea de gol y desde ahí lanzas.',
          },
          { type: 'key', text: 'Atrapaste afuera y el impulso te metió en la zona → no es gol, vuelves a la línea.' },
        ],
      },
      {
        title: 'Llamar el gol',
        blocks: [
          {
            type: 'list',
            items: [
              'Si crees que hubo gol puedes decir **«goal»** y el juego se detiene.',
              'Si el gol se **disputa** o se **retira**, se reanuda con un **check**.',
              'El gol, y la llamada, se consideran hechos en el momento en que el jugador **estableció la posesión**.',
            ],
          },
          { type: 'rule', ref: '14.2, 14.4', text: 'Llamada de gol y momento del gol.' },
        ],
      },
    ],
    checkpoints: [
      {
        prompt: 'Saltas desde la zona central, atrapas en el aire y caes con los dos pies dentro de la zona de anotación, sin soltar el disco. ¿Es gol?',
        options: [
          'No, porque saltaste desde la zona central',
          'Sí, porque tus primeros contactos al caer están dentro de la zona de anotación',
          'Solo si el rival está de acuerdo',
          'No, hay que atrapar con los pies en el suelo',
        ],
        correct: 1,
        explanation:
          'Para un jugador en el aire, cuentan los primeros puntos de contacto con el suelo después de atrapar: si están completamente dentro de la zona de ataque y mantiene la atrapada, es gol (14.1.1).',
        ruleRef: '14.1.1',
      },
      {
        prompt: 'Atrapas el disco en la zona central y el impulso te lleva hasta dentro de la zona de anotación. ¿Qué pasa?',
        options: [
          'Es gol porque terminaste dentro de la zona',
          'No es gol: estableces el pivote en el punto más cercano de la línea de gol',
          'Es turnover',
          'Lanzas desde donde quedaste dentro de la zona',
        ],
        correct: 1,
        explanation:
          'Si terminas en tu zona de ataque con el disco sin haber anotado según 14.1, debes establecer el pivote en el punto más cercano de la línea de gol (14.3).',
        ruleRef: '14.3',
      },
      {
        prompt: 'Atrapas el disco dentro de la zona de anotación, pero al rodar por el suelo se te suelta. ¿Es gol?',
        options: [
          'Sí, ya lo habías atrapado dentro de la zona',
          'No, porque no mantuviste la atrapada durante el contacto con el suelo',
          'Sí, si duró más de un segundo en tus manos',
          'Se repite el punto',
        ],
        correct: 1,
        explanation:
          'Para que sea gol hay que establecer la posesión y mantener la atrapada durante todo el contacto con el suelo relacionado con ella (14.1.2 y 12.1.1).',
        ruleRef: '14.1.2',
      },
    ],
  },
]

export const REPASO_3: ReviewContent = {
  moduleId: 3,
  questions: [
    {
      prompt: 'Un receptor tiene un pie sobre la línea lateral cuando toca el disco. ¿Qué pasa?',
      options: [
        'Es válida si el otro pie está adentro',
        'Es turnover por fuera de límites',
        'Se repite el pase',
        'Es válida porque la línea es parte del campo',
      ],
      correct: 1,
      explanation:
        'Si cualquier parte del receptor está fuera cuando toca el disco, es turnover y no hay atrapada (11.4.1). Recuerda: las líneas perimetrales son fuera.',
      ruleRef: '11.4.1',
      lessonId: 'm3.l1',
    },
    {
      prompt: 'Un pase incompleto sale por la línea lateral a la altura de la zona central. ¿Dónde pone el pivote el nuevo lanzador?',
      options: [
        'Donde cayó el disco, fuera del campo',
        'En el punto de la zona central más cercano a donde salió el disco',
        'En el brick',
        'En la línea de gol',
      ],
      correct: 1,
      explanation:
        'Si el turnover ocurre fuera de límites, el pivote va en el punto de la zona central más cercano a donde salió el disco (13.8).',
      ruleRef: '13.8',
      lessonId: 'm3.l4',
    },
    {
      prompt: '¿Qué es una atrapada según el reglamento?',
      options: [
        'Tocar el disco con una mano',
        'Un disco que no gira, sujeto entre al menos dos partes del cuerpo',
        'Cualquier contacto que frene el disco',
        'Sujetar el disco durante tres segundos',
      ],
      correct: 1,
      explanation: 'Una atrapada es un disco que no está girando, sujeto entre al menos dos partes del cuerpo (12.1).',
      ruleRef: '12.1',
      lessonId: 'm3.l2',
    },
    {
      prompt: 'Un rival ya estaba en su posición y tú llegas después y lo chocas. ¿Quién inició el contacto?',
      options: ['Él, por estar en tu camino', 'Tú, porque llegaste después de que él estableció su posición', 'Nadie', 'Se decide por quién tenía el disco'],
      correct: 1,
      explanation:
        'Inicia el contacto el que llega al punto de contacto después de que el rival ya había establecido una posición legítima ahí (12.7.1).',
      ruleRef: '12.7.1',
      lessonId: 'm3.l3',
    },
    {
      prompt: 'Un atacante le entrega el disco en la mano a un compañero, sin que el disco quede libre en ningún momento. ¿Qué es?',
      options: ['Un pase legal', 'Un handover: turnover y se detiene el juego', 'Un self-catch', 'Una violación del check'],
      correct: 1,
      explanation:
        'Pasar el disco a propósito de un atacante a otro sin que en ningún momento quede completamente libre de los dos es un handover: turnover con parada (13.2.3).',
      ruleRef: '13.2.3',
      lessonId: 'm3.l4',
    },
    {
      prompt: 'El lanzador lanza un pase y él mismo lo atrapa antes de que lo toque nadie más. ¿Qué es?',
      options: ['Un pase válido', 'Un self-catch: turnover', 'Un travel', 'Se repite el pase'],
      correct: 1,
      explanation:
        'Si el lanzador atrapa su propio pase antes de que lo toque otro jugador, es un self-catch: turnover con parada (13.2.5).',
      ruleRef: '13.2.5',
      lessonId: 'm3.l4',
    },
    {
      prompt: 'Se disputa un gol. ¿Cómo se reanuda el juego?',
      options: ['Con un nuevo pull', 'Con un check', 'Desde el brick', 'Se cuenta el gol de todas formas'],
      correct: 1,
      explanation: 'Después de un gol disputado o retirado, el juego se reanuda con un check (14.2).',
      ruleRef: '14.2',
      lessonId: 'm3.l5',
    },
  ],
}
