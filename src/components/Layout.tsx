import { useEffect, useRef, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { TEAM_NAME } from '../config'
import { DiscIcon } from './DiscIcon'

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('')
}

function UserMenu() {
  const { profile, user, isAdmin, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  const name = profile?.name ?? user?.displayName ?? 'Tú'

  return (
    <div ref={ref}>
      <button
        type="button"
        className="avatar-btn"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={`Cuenta de ${name}`}
        onClick={() => setOpen((v) => !v)}
      >
        {user?.photoURL ? (
          <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
        ) : (
          <span className="avatar-fallback">{initials(name)}</span>
        )}
      </button>
      {open && (
        <div className="menu">
          <p>
            <strong>{name}</strong>
            <br />
            {user?.email}
            {isAdmin && ' · Admin'}
          </p>
          <button type="button" className="btn btn-ghost" onClick={signOut}>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  )
}

export function Layout() {
  const { isAdmin } = useAuth()
  return (
    <div className="app">
      <a href="#main" className="skip-link" onClick={(e) => {
        e.preventDefault()
        document.getElementById('main')?.focus()
      }}>
        Saltar al contenido
      </a>
      <header className="header">
        <div className="header-inner">
          <NavLink to="/" className="brand" end>
            <DiscIcon />
            <span>
              Reglamento Ultimate
              <small>{TEAM_NAME}</small>
            </span>
          </NavLink>
          <nav className="nav" aria-label="Principal">
            <NavLink to="/" end className="nav-hide-sm">
              Inicio
            </NavLink>
            {/* 3.2.6 Consistent help: el glosario siempre en el mismo lugar */}
            <NavLink to="/glosario">Glosario</NavLink>
            {isAdmin && <NavLink to="/admin">Admin</NavLink>}
          </nav>
          <UserMenu />
        </div>
      </header>
      <main id="main" className="main" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="footer">
        <p>
          Contenido basado en las{' '}
          <a href="https://rules.wfdf.sport/" target="_blank" rel="noreferrer">
            WFDF Rules of Ultimate 2025–2028
          </a>{' '}
          de la World Flying Disc Federation, bajo licencia{' '}
          <a href="https://creativecommons.org/licenses/by/4.0/deed.es" target="_blank" rel="noreferrer">
            CC BY 4.0
          </a>
          . Traducción y adaptación del equipo.
        </p>
      </footer>
    </div>
  )
}
