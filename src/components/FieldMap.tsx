import { Link } from 'react-router-dom'
import { MODULES } from '../content/manifest'
import { countDone, moduleLockReason, moduleStatus, type Status } from '../lib/progress'
import { DiscIcon } from './DiscIcon'
import './FieldMap.css'

const STATUS_LABEL: Record<Status, string> = {
  completed: 'Completado',
  current: 'Vas aquí',
  available: 'Disponible',
  locked: 'Bloqueado',
}

/**
 * El recorrido dibujado como la cancha de Ultimate.
 * Orden en el DOM: zona de defensa → M1…M4 → zona de ataque (orden lógico para lectores de pantalla).
 * En móvil se ve vertical (ataque arriba); en escritorio horizontal (ataque a la derecha).
 */
export function FieldMap({ done, unlockAll }: { done: Set<string>; unlockAll: boolean }) {
  const allDone = MODULES.every((m) => moduleStatus(m, done) === 'completed')

  return (
    <section className="field" aria-label="Tu recorrido por el reglamento">
      <div className="endzone endzone-def" aria-hidden="true">
        <span>Tu zona</span>
      </div>

      <ol className="field-central">
        {MODULES.map((m) => {
          const status = moduleStatus(m, done, unlockAll)
          const n = countDone(m, done)
          const inner = (
            <>
              <span className="band-num" aria-hidden="true">{m.id}</span>
              <span className="band-body">
                <span className="band-title">{m.title}</span>
                <span className="band-meta">
                  {status === 'locked'
                    ? moduleLockReason(m)
                    : `${n} de ${m.lessons.length} lecciones`}
                </span>
              </span>
              <span className={`band-tag tag-${status}`}>
                {status === 'completed' && <CheckIcon />}
                {status === 'locked' && <LockIcon />}
                {STATUS_LABEL[status]}
              </span>
            </>
          )
          return (
            <li key={m.id} className={`band band-${status}`}>
              {status === 'locked' ? (
                <div className="band-inner" aria-disabled="true">
                  {inner}
                </div>
              ) : (
                <Link to={`/modulo/${m.id}`} className="band-inner">
                  {inner}
                </Link>
              )}
            </li>
          )
        })}
      </ol>

      <div className={`endzone endzone-att ${allDone ? 'is-scored' : ''}`}>
        {allDone ? (
          <>
            <DiscIcon className="endzone-disc" />
            <span>¡Gol! Terminaste el reglamento</span>
          </>
        ) : (
          <span aria-hidden="true">Zona de anotación</span>
        )}
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <rect x="3" y="7" width="10" height="7" rx="1.5" fill="currentColor" />
      <path d="M5.5 7V5a2.5 2.5 0 015 0v2" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export { CheckIcon, LockIcon }
