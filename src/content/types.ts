// Formato del contenido de estudio.
//
// Texto con formato en línea (en cualquier string de bloque):
//   **negrita**
//   [[término]]            → enlaza al glosario (por slug del término)
//   [[slug|texto visible]] → enlaza al glosario mostrando otro texto

export type Block =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  /** Lo que dice el reglamento, con su número. */
  | { type: 'rule'; ref: string; text: string }
  /** Una jugada concreta para aterrizar la regla. */
  | { type: 'example'; title?: string; text: string }
  /** La idea clave del paso. */
  | { type: 'key'; text: string }

export interface Step {
  title: string
  blocks: Block[]
}

export interface Question {
  prompt: string
  options: string[]
  correct: number
  explanation: string
  ruleRef: string
  /** Lección de donde sale (para el repaso: "Repasa: …"). */
  lessonId?: string
}

export interface LessonContent {
  id: string
  intro: string
  steps: Step[]
  checkpoint: Question
}

export interface ReviewContent {
  moduleId: number
  questions: Question[]
}

export interface GlossaryEntry {
  slug: string
  term: string
  /** Término original en inglés, como se dice en la cancha. */
  en: string
  definition: string
}
