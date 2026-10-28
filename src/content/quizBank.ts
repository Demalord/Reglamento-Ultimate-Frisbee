import type { Question } from './types'

// Banco de preguntas de los quizzes (una evaluación por módulo).
// Son distintas a las de las lecciones y repasos.
// Este archivo solo lo carga el panel admin (import dinámico): al activar un quiz,
// sus preguntas se copian a Firestore (quizzes/{m}) y los estudiantes las leen de ahí.

export const QUIZ_BANK: Record<number, Question[]> = {
  1: [
    {
      prompt: '¿Qué tiene que pasar para que un equipo anote un gol?',
      options: [
        'Que el disco cruce la línea de gol',
        'Que un jugador atrape un pase dentro de la zona de anotación que ataca',
        'Que un jugador corra con el disco hasta la zona de anotación',
        'Que el disco caiga dentro de la zona de anotación',
      ],
      correct: 1,
      explanation: 'Se anota cuando un jugador atrapa un pase dentro de la zona de anotación que está atacando (Introducción).',
      ruleRef: 'Introducción',
      lessonId: 'm1.l1',
    },
    {
      prompt: '¿Por qué el reglamento no tiene castigos duros para las infracciones sin intención?',
      options: [
        'Porque en Ultimate no hay árbitros que los apliquen',
        'Porque se confía en que nadie rompe las reglas a propósito, y se busca reanudar como habría seguido la jugada',
        'Porque las infracciones no existen en un deporte sin contacto',
        'Porque cada equipo decide sus propios castigos',
      ],
      correct: 1,
      explanation:
        'Se confía en que nadie rompe las reglas intencionalmente; por eso, en lugar de castigos, se reanuda de la forma que mejor simula lo que habría pasado (1.2).',
      ruleRef: '1.2',
      lessonId: 'm1.l2',
    },
    {
      prompt: 'Un rival te roza el brazo levemente cuando atrapas, sin afectar en nada la atrapada. ¿Qué es lo esperado según el Espíritu?',
      options: [
        'Llamar «Foul» siempre que haya contacto',
        'No hacer la llamada, porque no cambió el resultado de la jugada',
        'Pedir que el rival salga del punto',
        'Esperar al final del punto y reclamarlo',
      ],
      correct: 1,
      explanation:
        'Solo se hace una llamada cuando la infracción es lo bastante importante como para cambiar el resultado de la acción o cuando hay riesgo para la seguridad (1.3.10).',
      ruleRef: '1.3.10',
      lessonId: 'm1.l2',
    },
    {
      prompt: '¿Para qué sirve una parada de Espíritu?',
      options: [
        'Para descansar entre puntos',
        'Para hablar de temas relacionados con el Espíritu del Juego',
        'Para que el entrenador dé instrucciones',
        'Para cambiar jugadores en medio del punto',
      ],
      correct: 1,
      explanation:
        'Los equipos pueden pedir una parada de Espíritu para atender temas de Espíritu del Juego cuando haga falta (1.7.4 y Definiciones).',
      ruleRef: '1.7.4',
      lessonId: 'm1.l3',
    },
    {
      prompt: 'Un jugador novato comete una infracción porque no conocía la regla. ¿Qué deberían hacer los jugadores con experiencia?',
      options: [
        'Pedir que salga del partido',
        'Ayudarle a entender la infracción',
        'Ignorarlo y seguir jugando',
        'Darle el disco al otro equipo como castigo',
      ],
      correct: 1,
      explanation: 'Si un novato está involucrado en una infracción y no conoce las reglas, los jugadores experimentados deben ayudarle a entenderla (1.8).',
      ruleRef: '1.8',
      lessonId: 'm1.l3',
    },
    {
      prompt: '¿Quiénes son los únicos responsables de hacer y resolver las llamadas?',
      options: [
        'Los jugadores y los capitanes',
        'Los entrenadores',
        'El público y los jugadores',
        'Los organizadores del torneo',
      ],
      correct: 0,
      explanation: 'Los jugadores y los capitanes son los únicos responsables de hacer y resolver todas las llamadas (1.11).',
      ruleRef: '1.11',
      lessonId: 'm1.l3',
    },
    {
      prompt: '¿Qué marcan los ocho conos del campo?',
      options: [
        'Los bricks',
        'Las esquinas de la zona central y de las zonas de anotación',
        'Dónde se ubican los equipos antes del pull',
        'La mitad de la cancha',
      ],
      correct: 1,
      explanation: 'Ocho objetos flexibles de colores, como conos, marcan las esquinas de la zona central y de las zonas de anotación (2.6).',
      ruleRef: '2.6',
      lessonId: 'm1.l4',
    },
    {
      prompt: 'Un jugador quiere jugar con unos guayos con taches metálicos afilados. ¿Qué dice el reglamento?',
      options: [
        'Está permitido si su equipo lo acepta',
        'No se permite ropa ni equipamiento que pueda lastimar a alguien o impedir que el rival juegue',
        'Solo se permite en torneos oficiales',
        'Está permitido si el capitán rival lo acepta',
      ],
      correct: 1,
      explanation:
        'Ningún jugador puede usar ropa o equipamiento que razonablemente pueda lastimarlo a él o a otros, o impedir que el rival juegue (3.4).',
      ruleRef: '3.4',
      lessonId: 'm1.l4',
    },
    {
      prompt: 'El partido va 7–6 y el equipo que va ganando anota. ¿Qué pasa?',
      options: [
        'Sigue el siguiente punto normalmente',
        'Llega el medio tiempo, porque un equipo anotó su gol número 8',
        'Termina el partido',
        'Se hace un nuevo sorteo',
      ],
      correct: 1,
      explanation: 'El medio tiempo ocurre cuando un equipo anota su octavo gol (4.3).',
      ruleRef: '4.3',
      lessonId: 'm1.l5',
    },
    {
      prompt: '¿Qué proporción de jugadores se debería usar en un partido mixto?',
      options: [
        'Siempre 4 hombres y 3 mujeres',
        'Una forma de proporción alternada 4:3',
        'La que decida cada equipo en cada punto',
        'Siempre 5:2',
      ],
      correct: 1,
      explanation: 'En partidos mixtos debería usarse alguna forma de proporción alternada 4:3 (5.4).',
      ruleRef: '5.4',
      lessonId: 'm1.l5',
    },
  ],

  2: [
    {
      prompt: 'Un atacante se mueve de la línea antes de que salga el pull y la defensa llama «false start». ¿Cómo se reanuda?',
      options: [
        'Se repite el pull',
        'El lanzador establece su pivote donde le corresponda y se reanuda como si se hubiera pedido un time-out ahí',
        'Es turnover para la ofensiva',
        'La defensa recibe el disco en el brick',
      ],
      correct: 1,
      explanation:
        'Si la defensa llama false start, el lanzador establece el pivote según 7.9–7.12 y el juego se reanuda como si se hubiera pedido un time-out en ese lugar (7.5.1).',
      ruleRef: '7.5.1',
      lessonId: 'm2.l1',
    },
    {
      prompt: '¿En qué momento pueden moverse todos los jugadores libremente durante el pull?',
      options: [
        'Cuando el pull toca el suelo',
        'Cuando un atacante toca el disco',
        'En cuanto el pull sale de la mano del lanzador',
        'Cuando el lanzador del pull levanta la mano',
      ],
      correct: 2,
      explanation: 'En cuanto se suelta el pull, todos los jugadores pueden moverse en cualquier dirección (7.6).',
      ruleRef: '7.6',
      lessonId: 'm2.l1',
    },
    {
      prompt: '¿Puede un defensor tocar el pull en el aire antes de que lo toque un atacante?',
      options: [
        'Sí, si lo hace dentro del campo',
        'No: la defensa no puede tocarlo hasta que lo toque un atacante o caiga al suelo',
        'Sí, pero el disco queda para la ofensiva',
        'Solo el jugador que lanzó el pull',
      ],
      correct: 1,
      explanation:
        'Ningún jugador de la defensa puede tocar el disco después del pull hasta que un atacante lo toque o el disco toque el suelo (7.7).',
      ruleRef: '7.7',
      lessonId: 'm2.l2',
    },
    {
      prompt: 'El pull cae dentro del campo, rueda y se detiene dentro de tu zona de defensa, sin salir. ¿Dónde estableces el pivote?',
      options: [
        'En la línea de gol más cercana',
        'En el brick',
        'Donde se detuvo el disco, aunque esté en tu zona de defensa',
        'En el punto más cercano de la zona central',
      ],
      correct: 2,
      explanation:
        'Si el pull toca el campo y nunca sale, el pivote va donde se detiene el disco, aunque esté dentro de la zona de defensa (7.10).',
      ruleRef: '7.10',
      lessonId: 'm2.l2',
    },
    {
      prompt: 'Con el juego muerto, ¿puede el lanzador entregarle el disco a un compañero para que sea él quien lance?',
      options: [
        'Sí, siempre que no haya conteo',
        'No: con el juego muerto el lanzador no puede transferir la posesión',
        'Sí, si la defensa está de acuerdo',
        'Solo después de un time-out',
      ],
      correct: 1,
      explanation: 'El lanzador no puede transferir la posesión del disco a otro jugador durante el juego muerto (8.3).',
      ruleRef: '8.3',
      lessonId: 'm2.l3',
    },
    {
      prompt: 'La defensa avisa «Delay of Game» y la ofensiva sigue demorando en establecer el pivote. ¿Qué puede pasar?',
      options: [
        'Es turnover automático',
        'El marcador puede empezar el conteo aunque no se haya establecido el pivote',
        'Se repite el punto',
        'Nada, solo se puede avisar una vez',
      ],
      correct: 1,
      explanation:
        'Si después del aviso la ofensiva sigue incumpliendo, no aplica la condición de 9.3.1 y el marcador puede empezar el conteo (8.5.2.1).',
      ruleRef: '8.5.2.1',
      lessonId: 'm2.l3',
    },
    {
      prompt: 'El marcador está a 5 metros del lanzador y empieza a contar. ¿Es válido el conteo?',
      options: [
        'Sí, si lo dice en voz alta',
        'No: debe estar a 3 metros o menos del pivote',
        'Sí, la distancia no importa',
        'Solo si nadie más está cerca',
      ],
      correct: 1,
      explanation: 'El marcador solo puede empezar y continuar el conteo si está a 3 metros o menos del pivote del lanzador (9.3.2).',
      ruleRef: '9.3.2',
      lessonId: 'm2.l4',
    },
    {
      prompt: 'El conteo iba en «nueve» y la ofensiva acepta que cometió una infracción. ¿En qué número se reanuda?',
      options: ['Uno', 'Seis', 'Nueve', 'Diez'],
      correct: 2,
      explanation:
        'Tras una infracción de la ofensiva aceptada se reanuda en máximo nueve: el menor entre 9 + 1 = 10 y 9, o sea, nueve (9.5.2 y 9.6).',
      ruleRef: '9.5.2, 9.6',
      lessonId: 'm2.l5',
    },
    {
      prompt: 'El juego se detiene por una llamada antes de que se lance ningún pase. ¿Dónde se ubican los jugadores para el check?',
      options: [
        'Donde quieran, mientras estén quietos',
        'Donde estaban cuando se hizo la llamada',
        'En la línea de gol',
        'Donde estaban al empezar el punto',
      ],
      correct: 1,
      explanation: 'Si el juego se para antes de lanzar un pase, todos vuelven a donde estaban cuando se hizo la llamada (10.2.1).',
      ruleRef: '10.2.1',
      lessonId: 'm2.l6',
    },
    {
      prompt: 'Empezó el punto pero ningún equipo ha señalado que está listo. ¿Quién puede pedir un time-out?',
      options: [
        'Solo el capitán',
        'Cualquier jugador de cualquiera de los dos equipos',
        'Solo el jugador que va a lanzar el pull',
        'Nadie, solo durante el juego',
      ],
      correct: 1,
      explanation:
        'Después del inicio del punto y antes de que ambos equipos señalen listos, un jugador de cualquier equipo puede pedir time-out (20.2).',
      ruleRef: '20.2',
      lessonId: 'm2.l7',
    },
  ],

  3: [
    {
      prompt: 'Un atacante salta desde fuera de la línea lateral, atrapa el disco en el aire y cae dentro del campo. ¿Qué pasa?',
      options: [
        'Es válida porque cayó dentro',
        'Es turnover: en el aire conserva el estado de fuera que tenía al saltar',
        'Se repite el pase',
        'Depende de si el pase venía de adentro',
      ],
      correct: 1,
      explanation:
        'Un jugador en el aire conserva su estado hasta tocar el suelo (11.3.1). Si estaba fuera al saltar, sigue fuera al tocar el disco, y eso es turnover (11.4.1).',
      ruleRef: '11.3.1, 11.4.1',
      lessonId: 'm3.l1',
    },
    {
      prompt: 'El lanzador, mientras pivotea, pone un pie fuera de la línea lateral. ¿Está fuera?',
      options: [
        'Sí, es turnover inmediato',
        'No: el lanzador se considera dentro hasta que lanza',
        'Sí, debe volver a poner el pivote',
        'Solo si lanza con ese pie afuera',
      ],
      correct: 1,
      explanation: 'Un lanzador que toca el área fuera de límites se considera dentro hasta que hace el pase (11.3.3).',
      ruleRef: '11.3.3',
      lessonId: 'm3.l1',
    },
    {
      prompt: 'Para reanudar tras un out, ¿cuál es el lugar donde se considera que salió el disco?',
      options: [
        'Donde tocó el suelo fuera del campo',
        'Donde estuvo por última vez sobre el campo, o donde lo tocó por última vez un jugador que estaba dentro',
        'El punto de la línea más cercano al lanzador',
        'Donde lo recoge el nuevo lanzador',
      ],
      correct: 1,
      explanation:
        'El lugar donde salió es donde, antes de tocar el área de afuera, el disco estuvo por última vez total o parcialmente sobre el campo, o lo tocó por última vez un jugador dentro (11.8).',
      ruleRef: '11.8',
      lessonId: 'm3.l1',
    },
    {
      prompt: 'Sujetas el disco entre las dos manos, pero sigue girando. ¿Es una atrapada?',
      options: [
        'Sí, si lo sujetas con las dos manos',
        'No: una atrapada es un disco que no está girando',
        'Sí, si dura más de un segundo',
        'Solo si estás dentro de la zona de anotación',
      ],
      correct: 1,
      explanation: 'Una atrapada es un disco que no está girando, sujeto entre al menos dos partes del cuerpo (12.1).',
      ruleRef: '12.1',
      lessonId: 'm3.l2',
    },
    {
      prompt: '¿Puedes ocupar cualquier espacio de la cancha que no esté ocupado por un rival?',
      options: [
        'Sí, siempre que no inicies contacto al tomarlo ni te muevas de forma imprudente o peligrosa',
        'No, cada jugador tiene una zona asignada',
        'Solo si estás en ofensiva',
        'Solo si el disco no está en el aire',
      ],
      correct: 0,
      explanation:
        'Todo jugador puede ocupar cualquier posición no ocupada por un rival, siempre que no inicie contacto al tomarla y no se mueva de forma imprudente o peligrosamente agresiva (12.5).',
      ruleRef: '12.5',
      lessonId: 'm3.l2',
    },
    {
      prompt: 'Antes de lanzarte en dive por el disco, ¿qué debes tener claro?',
      options: [
        'Que vas a llegar primero',
        'Que razonablemente no vas a iniciar contacto con un rival',
        'Que el disco va a caer dentro',
        'Que tu compañero no está cerca',
      ],
      correct: 1,
      explanation:
        'Antes de lanzarte, saltar o tirarte desde tu posición, debes estar razonablemente seguro de que no vas a iniciar contacto con un rival (12.6.2).',
      ruleRef: '12.6.2',
      lessonId: 'm3.l3',
    },
    {
      prompt: 'Un atacante levanta a propósito a su compañero para que salte más alto y atrape el pase. ¿Qué pasa?',
      options: [
        'Es válido si atrapa',
        'Es turnover: no se puede ayudar físicamente el movimiento de un compañero para atrapar',
        'Es una falta de la defensa',
        'Se repite el pase',
      ],
      correct: 1,
      explanation:
        'Ningún jugador puede ayudar físicamente el movimiento de otro (12.10). Si un atacante lo hace a propósito para que un compañero atrape, es turnover (13.2.6).',
      ruleRef: '12.10, 13.2.6',
      lessonId: 'm3.l3',
    },
    {
      prompt: 'Un receptor atrapa el pase y, al caer, el disco toca el pasto mientras él lo sigue sujetando. ¿Es un down?',
      options: [
        'Sí, el disco tocó el suelo',
        'No: si atrapó antes y mantiene la atrapada mientras el disco toca el suelo, no es down',
        'Depende de si cayó de pie',
        'Sí, si el disco tocó el suelo más de un segundo',
      ],
      correct: 1,
      explanation:
        'No es down si el receptor atrapa el pase antes de que el disco toque el suelo y mantiene la atrapada mientras el disco está en contacto con el suelo (13.1.1.1).',
      ruleRef: '13.1.1.1',
      lessonId: 'm3.l4',
    },
    {
      prompt: 'Llaman stall-out. El lanzador aún tiene el disco y cree que hubo un conteo rápido sin tiempo para llamarlo. ¿Cómo se trata?',
      options: [
        'Siempre es turnover',
        'Como una infracción de la defensa aceptada o como un stall-out en disputa',
        'Se repite el conteo desde cero sin parar el juego',
        'Lo deciden los capitanes',
      ],
      correct: 1,
      explanation:
        'Si el lanzador conserva el disco y cree que hubo un fast count sin oportunidad razonable de llamarlo, se trata como infracción defensiva aceptada (9.5.1) o stall-out en disputa (9.5.3) (13.4.1).',
      ruleRef: '13.4.1',
      lessonId: 'm3.l4',
    },
    {
      prompt: '¿En qué momento exacto se considera anotado un gol?',
      options: [
        'Cuando el disco entra a la zona de anotación',
        'Cuando el jugador establece la posesión',
        'Cuando alguien dice «goal»',
        'Cuando el rival acepta el gol',
      ],
      correct: 1,
      explanation: 'El gol se considera anotado en el momento en que el jugador establece la posesión (14.4).',
      ruleRef: '14.4',
      lessonId: 'm3.l5',
    },
  ],

  4: [
    {
      prompt: 'Un jugador inicia a propósito un contacto menor con un rival. ¿Qué es?',
      options: [
        'Nada, el contacto menor no cuenta',
        'Una violación',
        'Una falta',
        'Una infracción de marca',
      ],
      correct: 1,
      explanation:
        'Iniciar intencionalmente un contacto menor sigue siendo un incumplimiento, pero se trata como violación y no como falta (15.1.1).',
      ruleRef: '15.1.1',
      lessonId: 'm4.l1',
    },
    {
      prompt: 'Paras el juego porque oíste mal una llamada, justo cuando el rival interceptó el disco. ¿Qué pasa?',
      options: [
        'El disco vuelve a tu lanzador',
        'Como el rival ganó la posesión, la jugada se mantiene',
        'Se repite el punto',
        'Es violación del rival',
      ],
      correct: 1,
      explanation:
        'Si alguien para el juego incorrectamente (por ejemplo, por oír mal) y el rival gana o conserva la posesión, la jugada se mantiene (15.9.1).',
      ruleRef: '15.9.1',
      lessonId: 'm4.l1',
    },
    {
      prompt: 'Te hacen falta mientras lanzas, llamas «Foul» y tu pase es interceptado. Crees que la falta afectó el pase. ¿Qué pasa?',
      options: [
        'La intercepción se mantiene',
        'El disco vuelve a ti y se reanuda con check',
        'Es turnover y se juega desde donde cayó',
        'Se repite el punto',
      ],
      correct: 1,
      explanation:
        'Si el equipo que hizo la llamada no conserva el disco y cree que la falta afectó la posesión, el disco vuelve al lanzador para un check (16.2.4.2.1).',
      ruleRef: '16.2.4.2.1',
      lessonId: 'm4.l2',
    },
    {
      prompt: 'Un jugador se lanza de forma temeraria cerca de un rival, pero al final no lo toca. ¿Puede ser falta?',
      options: [
        'No, sin contacto no hay falta',
        'Sí: el juego peligroso se trata como falta haya contacto o no',
        'Solo si el rival se cae',
        'Solo en la zona de anotación',
      ],
      correct: 1,
      explanation:
        'Las acciones con desprecio temerario por la seguridad de los demás se consideran juego peligroso y se tratan como falta, sin importar si hubo contacto (17.1.1).',
      ruleRef: '17.1.1',
      lessonId: 'm4.l3',
    },
    {
      prompt: 'Un defensor le toca la mano a un atacante justo después de que este ya atrapó el disco. ¿Es falta de recepción?',
      options: [
        'Sí, cualquier contacto es falta',
        'No basta para una falta, aunque debe evitarse',
        'Sí, y el atacante gana un punto',
        'Es violación de la ofensiva',
      ],
      correct: 1,
      explanation:
        'El contacto con los brazos o manos del rival después de que ya atrapó el disco no es base suficiente para una falta, aunque hay que evitarlo (17.2.1.1).',
      ruleRef: '17.2.1.1',
      lessonId: 'm4.l3',
    },
    {
      prompt: 'Un atacante y un defensor corren al mismo tiempo hacia el mismo punto y chocan fuerte antes de que nadie atrape. ¿Qué se aplica?',
      options: [
        'Falta del defensor',
        'Falta del atacante',
        'Se tratan como faltas compensadas',
        'Contacto menor, sigue el juego',
      ],
      correct: 2,
      explanation:
        'El contacto que no es menor causado por dos o más rivales moviéndose a la vez hacia un mismo punto se trata como faltas compensadas (17.9.2).',
      ruleRef: '17.9.2',
      lessonId: 'm4.l4',
    },
    {
      prompt: 'El marcador empieza a contar «uno, dos, tres…» sin decir antes «Stalling». ¿Qué puede llamar el lanzador?',
      options: ['Nada, es válido', 'Fast count', 'Travel', 'Double team'],
      correct: 1,
      explanation:
        'Empezar o reiniciar el conteo sin decir «Stalling» es una de las formas de fast count (18.1.1.1.2).',
      ruleRef: '18.1.1.1.2',
      lessonId: 'm4.l5',
    },
    {
      prompt: 'Un defensor que está marcando a otro atacante queda a 2 metros del lanzador e intenta bloquear un pase. ¿Es double team?',
      options: [
        'Sí, siempre que esté a menos de 3 metros',
        'No, mientras siga marcando a otro atacante',
        'Sí, si el marcador no se mueve',
        'Solo si toca el disco',
      ],
      correct: 1,
      explanation:
        'Un defensor que marca a otro atacante puede intentar impedir un pase del lanzador, siempre que siga marcando a ese otro atacante (18.1.1.5.1).',
      ruleRef: '18.1.1.5.1',
      lessonId: 'm4.l5',
    },
    {
      prompt: 'Atrapas en dive y quedas sentado en el pasto. ¿Cómo pivoteas?',
      options: [
        'Tienes que levantarte antes de pivotear',
        'Puedes usar cualquier parte del cuerpo como pivote, y levantarte no es travel si mantienes el pivote en el mismo lugar',
        'No puedes lanzar hasta ponerte de pie',
        'El disco pasa a la defensa',
      ],
      correct: 1,
      explanation:
        'Un lanzador que no está de pie puede usar cualquier parte del cuerpo como pivote; levantarse no es travel si establece el pivote en el mismo lugar (18.2.3).',
      ruleRef: '18.2.3',
      lessonId: 'm4.l6',
    },
    {
      prompt: 'Alguien llama «Injury» con el disco en el aire. La lesión no fue por falta de un rival y el pase se completa. ¿Qué pasa?',
      options: [
        'El disco vuelve al lanzador',
        'La recepción se mantiene y se reanuda desde ahí después de la parada',
        'Es turnover',
        'Se repite el punto',
      ],
      correct: 1,
      explanation:
        'Con el disco en el aire, el juego sigue hasta la posesión o el suelo; si la lesión no fue por una falta del rival, el pase completo o el turnover se mantiene y se reanuda ahí (19.1.6).',
      ruleRef: '19.1.6',
      lessonId: 'm4.l7',
    },
  ],
}

/** Tiempo sugerido para presentar cada quiz, en minutos. */
export const DEFAULT_TIME_LIMIT_MIN = 15
