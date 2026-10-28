import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { FieldMap } from '../components/FieldMap'
import { ProgressBar } from '../components/ProgressBar'
import { MODULES, TOTAL_LESSONS, rulesLabel } from '../content/manifest'
import { nextLesson } from '../lib/progress'
import { TEAM_MOTTO } from '../config'

export function Home() {
  const { profile, done, isAdmin } = useAuth()
  const next = nextLesson(done)
  // Google a veces entrega el nombre en mayúsculas ("DIEGO"): se normaliza a "Diego"
  const rawFirst = (profile?.name ?? '').trim().split(/\s+/)[0] ?? ''
  const firstName = rawFirst ? rawFirst[0].toLocaleUpperCase('es') + rawFirst.slice(1).toLocaleLowerCase('es') : ''
  const started = done.size > 0
  const nextModule = next ? MODULES.find((m) => m.lessons.some((l) => l.id === next.id)) : null

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
          <ProgressBar value={done.size} max={TOTAL_LESSONS} label="Progreso total" />
        </div>
      </div>

      {next && nextModule && (
        <Link to={`/modulo/${nextModule.id}/leccion/${next.id}`} className="continue">
          <span className="continue-label brush">{started ? 'Continúa donde quedaste' : 'Primera lección'}</span>
          <span className="continue-title">{next.title}</span>
          <span className="continue-meta">
            Módulo {nextModule.id}. {rulesLabel(next.rules)}. Unos {next.minutes} minutos.
          </span>
        </Link>
      )}

      <FieldMap done={done} unlockAll={isAdmin} />
    </div>
  )
}
