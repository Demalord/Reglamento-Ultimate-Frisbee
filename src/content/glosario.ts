import type { GlossaryEntry } from './types'

// Definiciones de la sección "Definitions" de las WFDF Rules of Ultimate 2025–2028,
// traducidas y adaptadas (CC BY 4.0, World Flying Disc Federation).
// Se agregan algunos términos de uso común en el reglamento (pull, brick, stall…).

export const GLOSARIO: GlossaryEntry[] = [
  {
    slug: 'afectar-la-jugada',
    term: 'Afectar la jugada',
    en: 'Affect the play',
    definition:
      'Una infracción o una llamada afecta la jugada si es razonable pensar que, sin ella, el resultado de esa jugada habría sido claramente distinto.',
  },
  {
    slug: 'acto-de-lanzar',
    term: 'Acto de lanzar',
    en: 'Act of throwing',
    definition: 'Ver «movimiento de lanzamiento».',
  },
  {
    slug: 'atrapada',
    term: 'Atrapada',
    en: 'Catch',
    definition:
      'Un disco que no está girando, sujeto entre al menos dos partes del cuerpo. Si el jugador deja de sujetarlo así antes de establecer la posesión, esa atrapada se considera terminada.',
  },
  {
    slug: 'brick',
    term: 'Brick',
    en: 'Brick',
    definition:
      'Marca en la zona central, a una distancia de cada línea de gol igual al largo de la zona de anotación y centrada entre las líneas laterales. Si el pull sale directo fuera de límites, el lanzador puede poner el disco en juego desde ahí.',
  },
  {
    slug: 'capitan-de-espiritu',
    term: 'Capitán de Espíritu',
    en: 'Spirit captain',
    definition: 'Jugador que, junto con el capitán, representa al equipo en temas del Espíritu del Juego.',
  },
  {
    slug: 'check',
    term: 'Check',
    en: 'Check',
    definition:
      'La forma de reanudar el juego después de una parada: el defensor toca el disco en manos del lanzador (o, si no hay defensor cerca, el lanzador lo toca contra el piso) y se anuncia «Disc in».',
  },
  {
    slug: 'contacto-menor',
    term: 'Contacto menor',
    en: 'Minor contact',
    definition:
      'Contacto con poca fuerza que no altera los movimientos ni la posición del otro jugador. No cuenta como menor el contacto con brazos o manos extendidos que van a tocar (o ya tocan) el disco, ni el contacto con la mano del lanzador durante el movimiento de lanzamiento.',
  },
  {
    slug: 'disco-dentro',
    term: 'Disc in',
    en: 'Disc in',
    definition: 'Lo que se anuncia al hacer el check para que el juego vuelva a estar vivo.',
  },
  {
    slug: 'donde-se-detiene-el-disco',
    term: 'Donde se detiene el disco',
    en: 'Where the disc stops',
    definition:
      'El lugar donde un jugador establece la posesión, donde el disco queda quieto por sí solo o donde alguien lo detiene mientras rueda o se desliza.',
  },
  {
    slug: 'falta',
    term: 'Falta',
    en: 'Foul',
    definition: 'Infracción de las reglas causada por contacto que no es menor entre jugadores de equipos contrarios.',
  },
  {
    slug: 'fuera-de-limites',
    term: 'Fuera de límites',
    en: 'Out-of-bounds (OB)',
    definition: 'Todo lo que no es parte del campo de juego, incluidas las líneas perimetrales.',
  },
  {
    slug: 'campo-de-juego',
    term: 'Campo de juego',
    en: 'Playing field',
    definition: 'El área formada por la zona central y las dos zonas de anotación. Las líneas perimetrales no forman parte de él.',
  },
  {
    slug: 'infraccion',
    term: 'Infracción',
    en: 'Infraction',
    definition: 'Incumplimiento relacionado con la marca o con el travel. Las infracciones no detienen el juego.',
  },
  {
    slug: 'contacto-con-el-suelo',
    term: 'Contacto con el suelo',
    en: 'Ground contact',
    definition:
      'Todo contacto del jugador con el suelo relacionado con una acción concreta, incluido el aterrizaje o la recuperación tras perder el equilibrio (al saltar, lanzarse, inclinarse o caer).',
  },
  {
    slug: 'defensor',
    term: 'Defensor',
    en: 'Defensive player',
    definition: 'Cualquier jugador del equipo que no tiene la posesión del disco.',
  },
  {
    slug: 'atacante',
    term: 'Atacante',
    en: 'Offensive player',
    definition: 'Un jugador del equipo que tiene la posesión del disco.',
  },
  {
    slug: 'espiritu-del-juego',
    term: 'Espíritu del Juego',
    en: 'Spirit of the Game',
    definition:
      'El principio que pone en cada jugador la responsabilidad del juego limpio. Guía cómo se autoarbitra el partido y cómo se comportan los jugadores en la cancha.',
  },
  {
    slug: 'guardar',
    term: 'Marcar a un jugador',
    en: 'Guarding',
    definition:
      'Un defensor marca a un atacante cuando está a menos de tres metros de él y su atención está centrada principalmente en ese jugador y en reaccionar a lo que hace.',
  },
  {
    slug: 'hacer-una-jugada-sobre-el-disco',
    term: 'Hacer una jugada sobre el disco',
    en: 'Making a play on the disc',
    definition:
      'Cuando el disco está en el aire y un jugador intenta tocarlo de cualquier forma (atraparlo o bloquearlo), incluido correr hacia el lugar donde espera alcanzarlo.',
  },
  {
    slug: 'intercepcion',
    term: 'Intercepción',
    en: 'Interception',
    definition: 'Cuando un defensor establece la posesión de un lanzamiento del equipo atacante.',
  },
  {
    slug: 'jugada',
    term: 'Jugada',
    en: 'Play',
    definition:
      'El tiempo desde que se lanza el pull hasta que se anota el gol. Puede detenerse por una llamada; en ese caso se reanuda con un check.',
  },
  {
    slug: 'jugador',
    term: 'Jugador',
    en: 'Player',
    definition: 'Las personas que están participando en el punto que se está jugando.',
  },
  {
    slug: 'no-jugador',
    term: 'No jugador',
    en: 'Non-player',
    definition: 'Cualquier persona que no está jugando en ese momento, incluidos los miembros del equipo que están afuera.',
  },
  {
    slug: 'lanzador',
    term: 'Lanzador',
    en: 'Thrower',
    definition:
      'El atacante que tiene el disco, o el jugador que acaba de lanzarlo mientras aún no se sabe el resultado del lanzamiento.',
  },
  {
    slug: 'lanzamiento',
    term: 'Lanzamiento',
    en: 'Throw',
    definition:
      'Un disco en vuelo después de cualquier movimiento de lanzamiento (incluidas fintas y discos soltados a propósito) que hace que el lanzador pierda contacto con él. Pase y lanzamiento son lo mismo.',
  },
  {
    slug: 'linea',
    term: 'Línea',
    en: 'Line',
    definition:
      'Límite que define las áreas de juego. Si la cancha no tiene líneas pintadas, la línea es una recta imaginaria entre dos marcadores (con el grosor de esos marcadores), y no se prolonga más allá de ellos.',
  },
  {
    slug: 'linea-de-gol',
    term: 'Línea de gol',
    en: 'Goal line',
    definition: 'La línea que separa la zona central de cada zona de anotación. Es parte de la zona central, no de la zona de anotación.',
  },
  {
    slug: 'lineas-perimetrales',
    term: 'Líneas perimetrales',
    en: 'Perimeter lines',
    definition:
      'Las líneas que separan la zona central y las zonas de anotación del área fuera de límites: dos laterales a lo largo y dos de fondo a lo ancho. No son parte del campo de juego.',
  },
  {
    slug: 'marcador',
    term: 'Marcador',
    en: 'Marker',
    definition: 'El defensor que puede hacer el conteo (stall count) al lanzador.',
  },
  {
    slug: 'mejor-perspectiva',
    term: 'Mejor perspectiva',
    en: 'Best perspective',
    definition:
      'El punto de vista más completo de una jugada: el que deja ver a la vez la posición del disco, el suelo, los jugadores y las líneas involucradas.',
  },
  {
    slug: 'movimiento-de-lanzamiento',
    term: 'Movimiento de lanzamiento',
    en: 'Throwing motion',
    definition:
      'El movimiento que transfiere impulso del lanzador al disco en la dirección del vuelo y termina en un lanzamiento. Los pivotes y el armado del brazo no hacen parte de él.',
  },
  {
    slug: 'parada-de-juego',
    term: 'Parada de juego',
    en: 'Stoppage of play',
    definition:
      'Cualquier detención del juego por una falta, una violación, una discusión, una llamada en disputa, una lesión o un time-out, que requiere un check para reanudar.',
  },
  {
    slug: 'parada-de-espiritu',
    term: 'Parada de Espíritu',
    en: 'Spirit stoppage',
    definition: 'Una parada para hablar de temas relacionados con el Espíritu del Juego.',
  },
  {
    slug: 'pase',
    term: 'Pase',
    en: 'Pass',
    definition: 'Equivale a un lanzamiento.',
  },
  {
    slug: 'pivote',
    term: 'Pivote',
    en: 'Pivot',
    definition:
      'Cuando el lanzador se mueve en cualquier dirección manteniendo una parte del cuerpo en contacto constante con un punto fijo del suelo, el punto de pivote. Si tiene varias opciones de punto de pivote, no queda definido hasta que pivotea.',
  },
  {
    slug: 'ubicacion-del-pivote',
    term: 'Ubicación del pivote',
    en: 'Pivot location',
    definition:
      'El punto del campo donde el lanzador debe establecer su pivote: después de un turnover, del pull, de un time-out, al salir de la zona central, o donde ya lo había establecido.',
  },
  {
    slug: 'posesion',
    term: 'Posesión del disco',
    en: 'Possession of the disc',
    definition:
      'Un jugador establece la posesión de un pase cuando lo atrapa, mantiene la atrapada más de un instante perceptible y la conserva durante todo el contacto con el suelo relacionado con la atrapada (o hasta que lanza). También se establece al recoger un disco que ya tocó el suelo o que le entregan tras un turnover, un pull o una parada. Un disco en posesión de un jugador se considera parte de ese jugador.',
  },
  {
    slug: 'posicion-legitima',
    term: 'Posición legítima',
    en: 'Legitimate position',
    definition: 'La posición, quieta o en movimiento, que un jugador ocupa sin incumplir ninguna regla.',
  },
  {
    slug: 'pre-stall',
    term: 'Pre-stall',
    en: 'Pre-stall',
    definition: 'Aviso sobre los tiempos para reanudar el juego, dando advertencias a los veinte, diez y cinco segundos (según aplique).',
  },
  {
    slug: 'pull',
    term: 'Pull',
    en: 'Pull',
    definition:
      'El lanzamiento de la defensa a la ofensiva que inicia el juego al comienzo de cada mitad y después de cada gol. No se considera un pase legal.',
  },
  {
    slug: 'receptores',
    term: 'Receptores',
    en: 'Receivers',
    definition: 'Todos los atacantes excepto el lanzador.',
  },
  {
    slug: 'stall-count',
    term: 'Stall count (conteo)',
    en: 'Stall count',
    definition:
      'El conteo que hace el marcador al lanzador: dice «Stalling» y cuenta de uno a diez con al menos un segundo entre números. Si el lanzador no ha soltado el disco al empezar a decir «diez», es turnover.',
  },
  {
    slug: 'suelo',
    term: 'Suelo',
    en: 'Ground',
    definition:
      'Todos los objetos sólidos importantes: pasto, conos, equipamiento, agua, árboles, cercas, muros y no jugadores. No incluye a los jugadores ni su ropa puesta, ni partículas en el aire o lluvia.',
  },
  {
    slug: 'turnover',
    term: 'Turnover',
    en: 'Turnover',
    definition: 'Cualquier evento que hace que cambie el equipo con la posesión. Un turnover no se considera una violación.',
  },
  {
    slug: 'violacion',
    term: 'Violación',
    en: 'Violation',
    definition: 'Cualquier incumplimiento de las reglas que no es ni falta ni infracción.',
  },
  {
    slug: 'zona-central',
    term: 'Zona central',
    en: 'Central zone',
    definition: 'El área del campo que incluye las líneas de gol, pero no las zonas de anotación ni las líneas perimetrales.',
  },
  {
    slug: 'zona-de-anotacion',
    term: 'Zona de anotación',
    en: 'End zone',
    definition: 'Cada una de las dos áreas en los extremos del campo donde un equipo anota al atrapar el disco dentro de ella.',
  },
  {
    slug: 'zona-de-ataque',
    term: 'Zona de ataque',
    en: 'Attacking end zone',
    definition: 'La zona de anotación en la que un equipo está intentando anotar en ese momento.',
  },
  {
    slug: 'zona-de-defensa',
    term: 'Zona de defensa',
    en: 'Defending end zone',
    definition: 'La zona de anotación que un equipo está defendiendo para que el rival no anote.',
  },
  {
    slug: 'llamada',
    term: 'Llamada',
    en: 'Call',
    definition:
      'Una declaración clara de que ocurrió una falta, infracción, violación, turnover o lesión. Se usan términos como Foul, Travel, el nombre de la infracción de marca, Violation, el nombre del turnover, Technical o Injury.',
  },
]

const BY_SLUG = new Map(GLOSARIO.map((g) => [g.slug, g]))

/** Busca un término por slug o por su texto (sin tildes, sin mayúsculas). */
export function findTerm(key: string): GlossaryEntry | undefined {
  const k = slugify(key)
  return BY_SLUG.get(k) ?? GLOSARIO.find((g) => slugify(g.term) === k || slugify(g.en) === k)
}

export function slugify(s: string) {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
