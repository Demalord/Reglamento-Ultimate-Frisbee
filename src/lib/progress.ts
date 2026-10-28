import { MODULES, type Lesson, type Module } from '../content/manifest'

export type Status = 'completed' | 'current' | 'available' | 'locked'

/** Todas las lecciones en orden lineal. */
const ALL_LESSONS: Lesson[] = MODULES.flatMap((m) => m.lessons)

export function isModuleComplete(mod: Module, done: Set<string>) {
  return mod.lessons.every((l) => done.has(l.id))
}

/** La primera lección sin completar del recorrido (o null si terminó todo). */
export function nextLesson(done: Set<string>): Lesson | null {
  return ALL_LESSONS.find((l) => !done.has(l.id)) ?? null
}

export function lessonStatus(lesson: Lesson, done: Set<string>, unlockAll = false): Status {
  if (done.has(lesson.id)) return 'completed'
  const idx = ALL_LESSONS.findIndex((l) => l.id === lesson.id)
  const prevDone = idx === 0 || done.has(ALL_LESSONS[idx - 1].id)
  if (prevDone) return 'current'
  return unlockAll ? 'available' : 'locked'
}

export function moduleStatus(mod: Module, done: Set<string>, unlockAll = false): Status {
  if (isModuleComplete(mod, done)) return 'completed'
  const prev = MODULES.find((m) => m.id === mod.id - 1)
  if (!prev || isModuleComplete(prev, done)) return 'current'
  return unlockAll ? 'available' : 'locked'
}

/** Texto que explica por qué algo está bloqueado. */
export function lockReason(lesson: Lesson): string {
  const idx = ALL_LESSONS.findIndex((l) => l.id === lesson.id)
  const prev = ALL_LESSONS[idx - 1]
  return prev ? `Completa «${prev.title}» para desbloquear` : ''
}

export function moduleLockReason(mod: Module): string {
  const prev = MODULES.find((m) => m.id === mod.id - 1)
  return prev ? `Termina el módulo ${prev.id} para desbloquear` : ''
}

export function countDone(mod: Module, done: Set<string>) {
  return mod.lessons.filter((l) => done.has(l.id)).length
}
