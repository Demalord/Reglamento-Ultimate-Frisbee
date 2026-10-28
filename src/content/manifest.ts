// Orden oficial del recorrido. El desbloqueo se calcula a partir de este orden:
// una lección se abre cuando la anterior está completada; un módulo se abre
// cuando el anterior tiene todas sus lecciones completadas.

export interface Lesson {
  id: string // "m2.l4"
  title: string
  rules: string // secciones del reglamento que cubre
  minutes: number
}

export interface Module {
  id: number
  slug: string
  title: string
  summary: string
  lessons: Lesson[]
}

export const MODULES: Module[] = [
  {
    id: 1,
    slug: 'fundamentos',
    title: 'Fundamentos y Espíritu del Juego',
    summary: 'Qué es el Ultimate, cómo se autoarbitra y las bases del campo y del partido.',
    lessons: [
      { id: 'm1.l1', title: 'Qué es el Ultimate', rules: 'Introducción', minutes: 3 },
      { id: 'm1.l2', title: 'Espíritu del Juego: principios', rules: '1.1–1.4', minutes: 5 },
      { id: 'm1.l3', title: 'Buen y mal Espíritu, rol del equipo', rules: '1.5–1.12', minutes: 5 },
      { id: 'm1.l4', title: 'Campo y equipamiento', rules: '2, 3', minutes: 4 },
      { id: 'm1.l5', title: 'Puntos, equipos e inicio del juego', rules: '4, 5, 6', minutes: 4 },
    ],
  },
  {
    id: 2,
    slug: 'flujo',
    title: 'Flujo del juego',
    summary: 'El pull, juego vivo y muerto, el conteo, el check y los time-outs.',
    lessons: [
      { id: 'm2.l1', title: 'El pull: preparación y señales', rules: '7.1–7.6', minutes: 4 },
      { id: 'm2.l2', title: 'El pull: dónde queda el disco', rules: '7.7–7.12', minutes: 5 },
      { id: 'm2.l3', title: 'Juego vivo y muerto', rules: '8', minutes: 4 },
      { id: 'm2.l4', title: 'Stall count: cómo se cuenta', rules: '9.1–9.4', minutes: 4 },
      { id: 'm2.l5', title: 'Stall count: reinicios tras paradas', rules: '9.5–9.6', minutes: 5 },
      { id: 'm2.l6', title: 'El check', rules: '10', minutes: 5 },
      { id: 'm2.l7', title: 'Time-outs', rules: '20', minutes: 3 },
    ],
  },
  {
    id: 3,
    slug: 'posesion',
    title: 'Posesión, límites y anotación',
    summary: 'Fuera de límites, atrapadas, contacto, turnovers y cómo se marca un gol.',
    lessons: [
      { id: 'm3.l1', title: 'Fuera de límites', rules: '11', minutes: 5 },
      { id: 'm3.l2', title: 'Atrapada y posición establecida', rules: '12.1–12.5', minutes: 4 },
      { id: 'm3.l3', title: 'Contacto: quién lo inicia', rules: '12.6–12.10', minutes: 5 },
      { id: 'm3.l4', title: 'Turnovers y dónde se reanuda', rules: '13', minutes: 6 },
      { id: 'm3.l5', title: 'Anotar un gol', rules: '14', minutes: 3 },
    ],
  },
  {
    id: 4,
    slug: 'llamadas',
    title: 'Llamadas, faltas y violaciones',
    summary: 'Cómo se hacen las llamadas, qué pasa después y cada tipo de falta e infracción.',
    lessons: [
      { id: 'm4.l1', title: 'Tipos de llamadas y cómo hacerlas', rules: '15', minutes: 5 },
      { id: 'm4.l2', title: 'Continuación tras una llamada', rules: '16', minutes: 4 },
      { id: 'm4.l3', title: 'Faltas de recepción, strip, bloqueo y force-out', rules: '17.1–17.5', minutes: 5 },
      { id: 'm4.l4', title: 'Faltas de lanzamiento, indirectas y compensadas', rules: '17.6–17.9', minutes: 5 },
      { id: 'm4.l5', title: 'Infracciones de marca', rules: '18.1', minutes: 5 },
      { id: 'm4.l6', title: 'Travel y pick', rules: '18.2–18.3', minutes: 5 },
      { id: 'm4.l7', title: 'Paradas de seguridad', rules: '19', minutes: 3 },
    ],
  },
]

export const TOTAL_LESSONS = MODULES.reduce((n, m) => n + m.lessons.length, 0)

export const getModule = (id: number) => MODULES.find((m) => m.id === id)

/** "Reglas 7.1–7.6", "Sección 8", "Secciones 4, 5, 6", "Introducción". */
export function rulesLabel(rules: string) {
  if (!/\d/.test(rules)) return rules
  if (rules.includes('.')) return `Reglas ${rules}`
  return rules.includes(',') ? `Secciones ${rules}` : `Sección ${rules}`
}
