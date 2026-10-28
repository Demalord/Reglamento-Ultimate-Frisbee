import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { FieldMap } from '../components/FieldMap'
import { ProgressBar } from '../components/ProgressBar'
import { MODULES, TOTAL_LESSONS, rulesLabel } from '../content/manifest'
import { countAllLessons, itemPath, nextItem } from '../lib/progress'
import { TEAM_MOTTO } from '../config'

export function Home() {
  const { profile, done, isAdmin } = useAuth()
  const next = nextItem(done)
  const lessonsDone = countAllLessons(done)
  // Google a veces entrega el nombre en mayúsculas ("DIEGO"): se normaliza a "Diego"
  const rawFirst = (profile?.name ?? '').trim().split(/\s+/)[0] ?? ''
  const firstName = rawFirst ? rawFirst[0].toLocaleUpperCase('es') + rawFirst.slice(1).toLocaleLowerCase('es') : ''
  const started = done.size > 0
  const nextModule = next ? MODULES.find((m) => m.id === next.moduleId) : null
  const nextLessonMeta = next && nextModule ? nextModule.lessons.find((l) => l.id === next.id) : undefined

  return (
    <div className="home">
      <div className="hero">
        <div>
          <span className="brush">{TEAM_MOTTO}</span>
          <h1>{firstName ? `Hola, ${firstName}` : 'Hola'}</h1>
          <p className="lede">
            {!next
              ? `Completaste las ${TOTAL_LESSONS} lecciones. Repasa cualquier módulo cuando quieras.`
              : started
              ? 'Sigue avanzando hacia la zona de anotación.'
              : 'Cuatro módulos, de tu zona a la zona de anotación. Empieza por el primero.'}
          </p>
        </div>
        <div className="hero-progress">
          <span className="muted">Lecciones completadas</span>
          <ProgressBar value={lessonsDone} max={TOTAL_LESSONS} label="Progreso total" />
        </div>
      </div>

      {next && nextModule && (
        <Link to={itemPath(next)} className="continue">
          <span className="continue-label brush">{started ? 'Continúa donde quedaste' : 'Primera lección'}</span>
          <span className="continue-title">{next.title}</span>
          <span className="continue-meta">
            {nextLessonMeta
              ? `Módulo ${nextModule.id}. ${rulesLabel(nextLessonMeta.rules)}. Unos ${nextLessonMeta.minutes} minutos.`
              : `Unas preguntas sin nota para cerrar el módulo ${nextModule.id}.`}
          </span>
        </Link>
      )}

      <FieldMap done={done} unlockAll={isAdmin} />
    </div>
  )
}
