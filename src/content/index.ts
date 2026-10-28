import type { LessonContent, ReviewContent } from './types'
import { MODULO_1, REPASO_1 } from './modulo1'
import { MODULO_2, REPASO_2 } from './modulo2'
import { MODULO_3, REPASO_3 } from './modulo3'
import { MODULO_4, REPASO_4 } from './modulo4'

// Registro del contenido por lección y por módulo.
// Para agregar un módulo: crea moduloN.ts y súmalo aquí.
const LESSONS: LessonContent[] = [...MODULO_1, ...MODULO_2, ...MODULO_3, ...MODULO_4]
const REVIEWS: ReviewContent[] = [REPASO_1, REPASO_2, REPASO_3, REPASO_4]

const LESSON_MAP = new Map(LESSONS.map((l) => [l.id, l]))
const REVIEW_MAP = new Map(REVIEWS.map((r) => [r.moduleId, r]))

export const getLessonContent = (id: string) => LESSON_MAP.get(id)
export const getReview = (moduleId: number) => REVIEW_MAP.get(moduleId)
