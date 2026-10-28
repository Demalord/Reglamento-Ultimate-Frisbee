import { useEffect, useMemo, useState } from 'react'
import { OWNER_EMAILS } from '../../config'
import { useAdmins } from '../../lib/admins'
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
  const admins = useAdmins()

  useEffect(() => {
    getUsers()
      .then((u) => setUsers(u.sort((a, b) => a.name.localeCompare(b.name, 'es'))))
      .catch((e) => {
        console.error(e)
        setError('No se pudieron cargar los estudiantes. Revisa que tu correo esté en isAdmin() de firestore.rules.')
      })
  }, [])

  // Dueño y admins no cuentan como estudiantes en las estadísticas (tienen todo desbloqueado)
  const students = useMemo(() => {
    if (!users || !admins) return null
    const staff = new Set([...OWNER_EMAILS, ...admins.map((a) => a.email)])
    return users.filter((u) => !staff.has(u.email.toLowerCase()))
  }, [users, admins])

  /** results[moduleId][uid] */
  const byModule = useMemo(() => {
    const map: Record<number, Record<string, ResultDoc>> = {}
    for (const r of results ?? []) (map[r.moduleId] ??= {})[r.uid] = r
    return map
  }, [results])

  const loading = !error && (users === null || quizzes === null || results === null || schedule === null || admins === null)

  return { users, students, admins, quizzes, results, schedule, byModule, loading, error }
}
