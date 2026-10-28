import { useState, type FormEvent } from 'react'
import { useAuth } from '../../auth/AuthProvider'
import { OWNER_EMAILS } from '../../config'
import { grantAdmin, isValidEmail, normalizeEmail, revokeAdmin, type AdminDoc } from '../../lib/admins'
import type { Student } from './useAdminData'

/**
 * Gestión de administradores. Solo se muestra al dueño; las rules de Firestore
 * impiden igual que un admin escriba en admins/, aunque lo intente por fuera de la página.
 */
export function AdminManagers({ admins, users }: { admins: AdminDoc[]; users: Student[] }) {
  const { user } = useAuth()
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState<string | null>(null)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const nameOf = (e: string) => users.find((u) => u.email.toLowerCase() === e)?.name
  const adminEmails = new Set(admins.map((a) => a.email))
  // Personas que ya entraron y aún no son admin, para elegir rápido
  const candidates = users.filter((u) => {
    const e = u.email.toLowerCase()
    return !OWNER_EMAILS.includes(e) && !adminEmails.has(e)
  })

  const run = async (key: string, fn: () => Promise<void>, ok: string) => {
    setBusy(key)
    setMsg(null)
    try {
      await fn()
      setMsg({ ok: true, text: ok })
    } catch (err) {
      console.error(err)
      setMsg({ ok: false, text: 'No se pudo guardar. Revisa que publicaste las reglas nuevas de Firestore.' })
    } finally {
      setBusy(null)
    }
  }

  const add = (e: FormEvent) => {
    e.preventDefault()
    const target = normalizeEmail(email)
    if (!isValidEmail(target)) return setMsg({ ok: false, text: 'Escribe un correo válido, por ejemplo nombre@gmail.com.' })
    if (OWNER_EMAILS.includes(target)) return setMsg({ ok: false, text: 'Ese correo ya es tuyo: es dueño.' })
    if (adminEmails.has(target)) return setMsg({ ok: false, text: 'Esa persona ya es admin.' })
    const name = nameOf(target) ?? ''
    run('add', () => grantAdmin(target, name, user?.email ?? ''), `${name || target} ahora es admin.`).then(() => setEmail(''))
  }

  return (
    <section className="admin-card" aria-labelledby="admins-title">
      <h2 id="admins-title">Administradores</h2>
      <p className="muted">
        Los admins pueden abrir y cerrar quizzes y ver los resultados de todos. Solo tú puedes dar o quitar admin.
      </p>

      <ul className="admin-people">
        {OWNER_EMAILS.map((e) => (
          <li key={e}>
            <span className="admin-person">
              <strong>{nameOf(e) ?? 'Tu otra cuenta'}</strong>
              <span className="cell-sub">{e}</span>
            </span>
            <span className="status-pill is-open">Dueño</span>
          </li>
        ))}
        {admins.map((a) => (
          <li key={a.email}>
            <span className="admin-person">
              <strong>{nameOf(a.email) || a.name || a.email.split('@')[0]}</strong>
              <span className="cell-sub">
                {a.email}
                {!nameOf(a.email) && '. Aún no ha entrado.'}
              </span>
            </span>
            <button
              type="button"
              className="btn btn-ghost btn-small"
              disabled={busy !== null}
              onClick={() => {
                if (!window.confirm(`¿Quitarle el admin a ${nameOf(a.email) ?? a.email}?`)) return
                run(`rm-${a.email}`, () => revokeAdmin(a.email), `${nameOf(a.email) ?? a.email} ya no es admin.`)
              }}
            >
              {busy === `rm-${a.email}` ? 'Quitando…' : 'Quitar admin'}
            </button>
          </li>
        ))}
      </ul>

      <form className="admin-add" onSubmit={add} noValidate>
        <div className="field-row">
          <label htmlFor="new-admin">Dar admin por correo</label>
          <input
            id="new-admin"
            type="email"
            inputMode="email"
            autoComplete="off"
            list="admin-candidates"
            placeholder="correo de Google de la persona"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <datalist id="admin-candidates">
            {candidates.map((u) => (
              <option key={u.uid} value={u.email}>
                {u.name}
              </option>
            ))}
          </datalist>
          <span className="muted field-hint">
            Puede ser alguien que todavía no ha entrado: será admin apenas inicie sesión con ese correo.
          </span>
        </div>
        <button type="submit" className="btn btn-primary" disabled={busy !== null || email.trim() === ''}>
          {busy === 'add' ? 'Guardando…' : 'Dar admin'}
        </button>
      </form>

      <div aria-live="polite">
        {msg && <p className={msg.ok ? 'admin-msg' : 'form-error'}>{msg.text}</p>}
      </div>
    </section>
  )
}
