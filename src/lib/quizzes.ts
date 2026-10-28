import { useEffect, useState } from 'react'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type Timestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import type { Question } from '../content/types'

// ─────────────────────────────────────────────────────────────
// Modelo
//   quizzes/{moduleId}         preguntas + active (invisible para estudiantes si active=false)
//   schedule/{moduleId}        anuncio público: fecha y nota, sin preguntas
//   results/{uid}_{moduleId}   un intento por estudiante por quiz
// ─────────────────────────────────────────────────────────────

export interface QuizDoc {
  moduleId: number
  title: string
  active: boolean
  timeLimitMin: number | null
  questions: Question[]
  activatedAt?: Timestamp
}

export interface ScheduleDoc {
  moduleId: number
  opensOn: string | null // "2026-11-05"
  note: string
}

/** Respuesta guardada con el texto, para poder revisarla aunque el quiz se desactive. */
export interface AnswerRecord {
  prompt: string
  selected: string | null
  correctAnswer: string
  correct: boolean
  explanation: string
  ruleRef: string
  lessonId?: string
}

export interface ResultDoc {
  uid: string
  name: string
  moduleId: number
  score: number
  total: number
  answers: AnswerRecord[]
  /** lessonId → [aciertos, total] */
  byLesson: Record<string, [number, number]>
  timedOut: boolean
  submittedAt?: Timestamp
}

export const resultId = (uid: string, moduleId: number) => `${uid}_${moduleId}`
export const PASS_RATIO = 0.6

// ── Lecturas en vivo ─────────────────────────────────────────

/** Quizzes activos (el estudiante solo puede consultar con este filtro: lo exigen las rules). */
export function useActiveQuizzes() {
  const [quizzes, setQuizzes] = useState<QuizDoc[] | null>(null)
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'quizzes'), where('active', '==', true)),
        (snap) => setQuizzes(snap.docs.map((d) => d.data() as QuizDoc)),
        (err) => {
          console.error('quizzes', err)
          setQuizzes([])
        },
      ),
    [],
  )
  return quizzes
}

/** Todos los quizzes (solo admin). */
export function useAllQuizzes() {
  const [quizzes, setQuizzes] = useState<Record<number, QuizDoc> | null>(null)
  useEffect(
    () =>
      onSnapshot(
        collection(db, 'quizzes'),
        (snap) => setQuizzes(Object.fromEntries(snap.docs.map((d) => [Number(d.id), d.data() as QuizDoc]))),
        (err) => {
          console.error('quizzes (admin)', err)
          setQuizzes({})
        },
      ),
    [],
  )
  return quizzes
}

export function useSchedule() {
  const [schedule, setSchedule] = useState<Record<number, ScheduleDoc> | null>(null)
  useEffect(
    () =>
      onSnapshot(
        collection(db, 'schedule'),
        (snap) => setSchedule(Object.fromEntries(snap.docs.map((d) => [Number(d.id), d.data() as ScheduleDoc]))),
        (err) => {
          console.error('schedule', err)
          setSchedule({})
        },
      ),
    [],
  )
  return schedule
}

/** Resultados propios del estudiante (consulta filtrada por uid, como exigen las rules). */
export function useMyResults(uid: string | undefined) {
  const [results, setResults] = useState<Record<number, ResultDoc> | null>(null)
  useEffect(() => {
    if (!uid) return
    return onSnapshot(
      query(collection(db, 'results'), where('uid', '==', uid)),
      (snap) => setResults(Object.fromEntries(snap.docs.map((d) => [(d.data() as ResultDoc).moduleId, d.data() as ResultDoc]))),
      (err) => {
        console.error('results', err)
        setResults({})
      },
    )
  }, [uid])
  return results
}

/** Todos los resultados (solo admin). */
export function useAllResults() {
  const [results, setResults] = useState<ResultDoc[] | null>(null)
  useEffect(
    () =>
      onSnapshot(
        collection(db, 'results'),
        (snap) => setResults(snap.docs.map((d) => d.data() as ResultDoc)),
        (err) => {
          console.error('results (admin)', err)
          setResults([])
        },
      ),
    [],
  )
  return results
}

/** null si no existe o si está inactivo (para un estudiante, las rules niegan la lectura). */
export async function getQuiz(moduleId: number): Promise<QuizDoc | null> {
  try {
    const snap = await getDoc(doc(db, 'quizzes', String(moduleId)))
    return snap.exists() ? (snap.data() as QuizDoc) : null
  } catch {
    return null
  }
}

// ── Escrituras del estudiante ────────────────────────────────

/** Califica en el cliente (equipo de confianza) y guarda el único intento. */
export async function submitQuiz(
  uid: string,
  name: string,
  quiz: QuizDoc,
  selections: (number | null)[],
  timedOut: boolean,
): Promise<ResultDoc> {
  const answers: AnswerRecord[] = quiz.questions.map((q, i) => {
    const sel = selections[i]
    return {
      prompt: q.prompt,
      selected: sel === null || sel === undefined ? null : q.options[sel],
      correctAnswer: q.options[q.correct],
      correct: sel === q.correct,
      explanation: q.explanation,
      ruleRef: q.ruleRef,
      ...(q.lessonId ? { lessonId: q.lessonId } : {}),
    }
  })
  const byLesson: Record<string, [number, number]> = {}
  for (const a of answers) {
    if (!a.lessonId) continue
    const [ok, tot] = byLesson[a.lessonId] ?? [0, 0]
    byLesson[a.lessonId] = [ok + (a.correct ? 1 : 0), tot + 1]
  }
  const result: ResultDoc = {
    uid,
    name,
    moduleId: quiz.moduleId,
    score: answers.filter((a) => a.correct).length,
    total: answers.length,
    answers,
    byLesson,
    timedOut,
  }
  await setDoc(doc(db, 'results', resultId(uid, quiz.moduleId)), { ...result, submittedAt: serverTimestamp() })
  return result
}

// ── Escrituras del admin ─────────────────────────────────────

export async function activateQuiz(moduleId: number, title: string, questions: Question[], timeLimitMin: number | null) {
  await setDoc(doc(db, 'quizzes', String(moduleId)), {
    moduleId,
    title,
    active: true,
    timeLimitMin,
    questions,
    activatedAt: serverTimestamp(),
  })
}

export async function deactivateQuiz(moduleId: number) {
  await updateDoc(doc(db, 'quizzes', String(moduleId)), { active: false })
}

export async function saveSchedule(moduleId: number, opensOn: string | null, note: string) {
  await setDoc(doc(db, 'schedule', String(moduleId)), { moduleId, opensOn, note })
}

export async function resetAttempt(uid: string, moduleId: number) {
  await deleteDoc(doc(db, 'results', resultId(uid, moduleId)))
}

export async function getUsers() {
  const snap = await getDocs(collection(db, 'users'))
  return snap.docs.map((d) => ({
    uid: d.id,
    name: (d.get('name') as string) ?? '',
    email: (d.get('email') as string) ?? '',
    completedLessons: (d.get('completedLessons') as string[]) ?? [],
  }))
}

// ── Utilidades ───────────────────────────────────────────────

/** "2026-11-05" → "jueves 5 de noviembre" */
export function formatDay(iso: string | null) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const weekday = date.toLocaleDateString('es-CO', { weekday: 'long' })
  const month = date.toLocaleDateString('es-CO', { month: 'long' })
  return `${weekday} ${d} de ${month}`
}

/** Fecha local de hoy en formato ISO corto. */
export function todayIso() {
  const t = new Date()
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`
}
