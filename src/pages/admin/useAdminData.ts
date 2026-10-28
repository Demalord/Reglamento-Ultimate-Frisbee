import { useEffect, useMemo, useState } from 'react'
import { ADMIN_EMAILS } from '../../config'
import { getUsers, useAllQuizzes, useAllResults, useSchedule, type ResultDoc } from '../../lib/quizzes'

export interface Student {
  uid: string
  name: string
  email: string
  completedLessons: string[]
}

/**
 * Todo lo que necesita el panel admin. Con ~15 estudiantes se cargan las
 * colecciones completas y se calcula en el cliente.
 */
export function useAdminData() {
  const [users, setUsers] = useState<Student[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const quizzes = useAllQuizzes()
  const results = useAllResults()
  const schedule = useSchedule()

  useEffect(() => {
    getUsers()
      .then((u) => setUsers(u.sort((a, b) => a.name.localeCompare(b.name, 'es'))))
      .catch((e) => {
        console.error(e)
        setError('No se pudieron cargar los estudiantes. Revisa que tu correo esté en isAdmin() de firestore.rules.')
      })
  }, [])

  // Los admins no cuentan como estudiantes en estadísticas
  const students = useMemo(
    () => users?.filter((u) => !ADMIN_EMAILS.includes(u.email.toLowerCase())) ?? null,
    [users],
  )

  /** results[moduleId][uid] */
  const byModule = useMemo(() => {
    const map: Record<number, Record<string, ResultDoc>> = {}
    for (const r of results ?? []) (map[r.moduleId] ??= {})[r.uid] = r
    return map
  }, [results])

  const loading = !error && (users === null || quizzes === null || results === null || schedule === null)

  return { users, students, quizzes, results, schedule, byModule, loading, error }
}
