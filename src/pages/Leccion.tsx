import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { ProgressBar } from '../components/ProgressBar'
import { getModule, rulesLabel } from '../content/manifest'
import { lessonStatus } from '../lib/progress'

/**
 * Fase 1: estructura de la lección y desbloqueo.
 * Fase 2 reemplaza el cuerpo por los pasos en Markdown + la pregunta de control.
 */
export function Leccion() {
  const { moduleId, lessonId } = useParams()
  const mod = getModule(Number(moduleId))
  const { done, isAdmin, completeLesson } = useAuth()
  const navigate = useNavigate()
  const [saving, setSaving] = useState(false)

  const idx = mod?.lessons.findIndex((l) => l.id === lessonId) ?? -1
  const lesson = mod && idx >= 0 ? mod.lessons[idx] : null
  if (!mod || !lesson) return <Navigate to="/" replace />
  if (lessonStatus(lesson, done, isAdmin) === 'locked') return <Navigate to={`/modulo/${mod.id}`} replace />

  const isDone = done.has(lesson.id)
  const nextInModule = mod.lessons[idx + 1]

  const finish = async () => {
    setSaving(true)
    try {
      await completeLesson(lesson.id)
      navigate(nextInModule ? `/modulo/${mod.id}/leccion/${nextInModule.id}` : `/modulo/${mod.id}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <article className="leccion">
      <div className="leccion-bar">
        <Link to={`/modulo/${mod.id}`} className="back-link">Módulo {mod.id}</Link>
        <ProgressBar value={idx + 1} max={mod.lessons.length} label="Lección dentro del módulo" />
      </div>

      <h1>{lesson.title}</h1>
      <p className="muted">{rulesLabel(lesson.rules)}</p>

      <div className="notice">
        <p>El contenido de esta lección llega en la fase 2.</p>
        <p className="muted" style={{ marginBottom: 0 }}>
          Por ahora puedes marcarla como completada para probar el desbloqueo.
        </p>
      </div>

      <div className="leccion-actions">
        {isDone ? (
          <Link
            className="btn btn-primary"
            to={nextInModule ? `/modulo/${mod.id}/leccion/${nextInModule.id}` : `/modulo/${mod.id}`}
          >
            {nextInModule ? 'Siguiente lección' : 'Volver al módulo'}
          </Link>
        ) : (
          <button type="button" className="btn btn-primary" onClick={finish} disabled={saving}>
            {saving ? 'Guardando…' : 'Completar lección'}
          </button>
        )}
      </div>
    </article>
  )
}
