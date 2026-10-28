import { MODULES, type Module } from '../content/manifest'

export type Status = 'completed' | 'current' | 'available' | 'locked'

/**
 * El recorrido es una secuencia lineal de pasos:
 *   m1.l1 → … → m1.l5 → m1.repaso → m2.l1 → … → m4.repaso
 * Cada paso se desbloquea cuando el anterior está en completedLessons.
 * El repaso de un módulo se guarda como "m{n}.repaso" en el mismo arreglo.
 */
export interface PathItem {
  id: string
  title: string
  moduleId: number
  kind: 'lesson' | 'review'
}

export const reviewId = (moduleId: number) => `m${moduleId}.repaso`

export const PATH: PathItem[] = MODULES.flatMap((m) => [
  ...m.lessons.map((l) => ({ id: l.id, title: l.title, moduleId: m.id, kind: 'lesson' as const })),
  { id: reviewId(m.id), title: `Repaso del módulo ${m.id}`, moduleId: m.id, kind: 'review' as const },
])

const indexOf = (id: string) => PATH.findIndex((p) => p.id === id)

/** Estado de cualquier paso del recorrido (lección o repaso). */
export function itemStatus(id: string, done: Set<string>, unlockAll = false): Status {
  if (done.has(id)) return 'completed'
  const idx = indexOf(id)
  if (idx <= 0 || done.has(PATH[idx - 1].id)) return 'current'
  return unlockAll ? 'available' : 'locked'
}

export const lessonStatus = (lesson: { id: string }, done: Set<string>, unlockAll = false) =>
  itemStatus(lesson.id, done, unlockAll)

export const reviewStatus = (mod: Module, done: Set<string>, unlockAll = false) =>
  itemStatus(reviewId(mod.id), done, unlockAll)

/** Un módulo está completo cuando terminaste sus lecciones y su repaso. */
export function isModuleComplete(mod: Module, done: Set<string>) {
  return mod.lessons.every((l) => done.has(l.id)) && done.has(reviewId(mod.id))
}

export function moduleStatus(mod: Module, done: Set<string>, unlockAll = false): Status {
  if (isModuleComplete(mod, done)) return 'completed'
  const prev = MODULES.find((m) => m.id === mod.id - 1)
  if (!prev || isModuleComplete(prev, done)) return 'current'
  return unlockAll ? 'available' : 'locked'
}

/** El siguiente paso pendiente (o null si terminó todo). */
export function nextItem(done: Set<string>): PathItem | null {
  return PATH.find((p) => !done.has(p.id)) ?? null
}

/** Texto que explica por qué un paso está bloqueado. */
export function lockReason(item: { id: string }): string {
  const prev = PATH[indexOf(item.id) - 1]
  return prev ? `Completa «${prev.title}» para desbloquear` : ''
}

export function moduleLockReason(mod: Module): string {
  const prev = MODULES.find((m) => m.id === mod.id - 1)
  return prev ? `Termina el módulo ${prev.id} y su repaso para desbloquear` : ''
}

/** Lecciones completadas del módulo (sin contar el repaso). */
export function countDone(mod: Module, done: Set<string>) {
  return mod.lessons.filter((l) => done.has(l.id)).length
}

/** Total de lecciones completadas en todo el recorrido (sin repasos). */
export function countAllLessons(done: Set<string>) {
  return MODULES.reduce((n, m) => n + countDone(m, done), 0)
}

/** Ruta del paso dentro de la app. */
export function itemPath(item: PathItem) {
  return item.kind === 'review' ? `/modulo/${item.moduleId}/repaso` : `/modulo/${item.moduleId}/leccion/${item.id}`
}
