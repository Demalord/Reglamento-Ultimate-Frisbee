import { useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { DiscIcon } from '../components/DiscIcon'
import { TEAM_NAME } from '../config'

export function Login() {
  const { user, loading, signIn } = useAuth()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (!loading && user) return <Navigate to={from} replace />

  const handle = async () => {
    setError(null)
    setBusy(true)
    try {
      await signIn()
    } catch (e) {
      const code = (e as { code?: string }).code ?? ''
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setError(null)
      } else if (code === 'auth/unauthorized-domain') {
        setError('Este dominio no está autorizado en Firebase. Agrégalo en Authentication → Configuración → Dominios autorizados.')
      } else if (code === 'auth/popup-blocked') {
        setError('El navegador bloqueó la ventana de Google. Permite ventanas emergentes para este sitio e inténtalo otra vez.')
      } else {
        setError('No se pudo iniciar sesión. Revisa tu conexión e inténtalo otra vez.')
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="login">
      <div className="login-card">
        <DiscIcon className="login-disc" />
        <h1>Reglamento Ultimate</h1>
        <p className="lede">
          Estudia las reglas WFDF 2025–2028 paso a paso con {TEAM_NAME}.
        </p>
        <button type="button" className="btn btn-primary login-btn" onClick={handle} disabled={busy}>
          <GoogleIcon />
          {busy ? 'Abriendo Google…' : 'Entrar con Google'}
        </button>
        <div aria-live="polite">{error && <p className="form-error">{error}</p>}</div>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 009 18z" />
      <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 010-3.44V4.95H.96a9 9 0 000 8.1l3.01-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 00.96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
  )
}
