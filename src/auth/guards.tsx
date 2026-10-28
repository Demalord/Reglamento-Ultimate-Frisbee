import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider'

function Loading() {
  return (
    <div className="center-screen" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span className="sr-only">Cargando…</span>
    </div>
  )
}

/** Solo usuarios con sesión. Si no hay sesión, manda al login y recuerda a dónde iba. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) return <Loading />
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return <>{children}</>
}

/** Solo admins. Es UX: la protección real está en firestore.rules. */
export function RequireAdmin({ children }: { children: ReactNode }) {
  const { isAdmin, loading } = useAuth()
  if (loading) return <Loading />
  if (!isAdmin) return <Navigate to="/" replace />
  return <>{children}</>
}
