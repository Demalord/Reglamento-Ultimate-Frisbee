import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut as fbSignOut, type User } from 'firebase/auth'
import {
  arrayRemove,
  arrayUnion,
  deleteField,
  doc,
  increment,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { auth, db, googleProvider } from '../lib/firebase'
import { ADMIN_EMAILS } from '../config'

export interface UserProfile {
  name: string
  email: string
  photoURL: string | null
  completedLessons: string[]
  lastLesson: string | null
  /** Preguntas de control falladas por lección (clave "m1_l4"). Se borra al completar o reiniciar. */
  failedChecks?: Record<string, number>
}

/** Las claves de Firestore no pueden llevar puntos sin anidarse: "m1.l4" → "m1_l4". */
export const checkKey = (lessonId: string) => lessonId.replace(/\./g, '_')

interface AuthState {
  user: User | null
  profile: UserProfile | null
  isAdmin: boolean
  loading: boolean
  done: Set<string>
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  completeLesson: (lessonId: string) => Promise<void>
  /** Fallos en la pregunta de control de una lección (persistidos). */
  failedChecks: (lessonId: string) => number
  recordFailedCheck: (lessonId: string) => Promise<void>
  /** Borra el progreso de un módulo: sus lecciones, su repaso y sus intentos fallidos. */
  resetModule: (moduleId: number, lessonIds: string[]) => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

/** Crea el documento users/{uid} la primera vez y actualiza nombre/foto en cada login. */
async function ensureUserDoc(u: User) {
  const ref = doc(db, 'users', u.uid)
  const snap = await getDoc(ref)
  const base = {
    name: u.displayName ?? u.email ?? 'Sin nombre',
    email: (u.email ?? '').toLowerCase(),
    photoURL: u.photoURL,
    lastSeenAt: serverTimestamp(),
  }
  if (snap.exists()) {
    await updateDoc(ref, base)
  } else {
    await setDoc(ref, { ...base, completedLessons: [], lastLesson: null, createdAt: serverTimestamp() })
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubProfile: (() => void) | undefined
    const unsubAuth = onAuthStateChanged(auth, async (u) => {
      unsubProfile?.()
      setUser(u)
      if (!u) {
        setProfile(null)
        setLoading(false)
        return
      }
      try {
        await ensureUserDoc(u)
      } catch (err) {
        console.error('No se pudo crear el perfil', err)
      }
      unsubProfile = onSnapshot(
        doc(db, 'users', u.uid),
        (snap) => {
          setProfile(snap.exists() ? (snap.data() as UserProfile) : null)
          setLoading(false)
        },
        (err) => {
          console.error('No se pudo leer el perfil', err)
          setLoading(false)
        },
      )
    })
    return () => {
      unsubProfile?.()
      unsubAuth()
    }
  }, [])

  const value = useMemo<AuthState>(() => {
    const email = (user?.email ?? '').toLowerCase()
    return {
      user,
      profile,
      loading,
      isAdmin: ADMIN_EMAILS.includes(email),
      done: new Set(profile?.completedLessons ?? []),
      signIn: async () => {
        await signInWithPopup(auth, googleProvider)
      },
      signOut: () => fbSignOut(auth),
      completeLesson: async (lessonId) => {
        if (!user) return
        await updateDoc(doc(db, 'users', user.uid), {
          completedLessons: arrayUnion(lessonId),
          lastLesson: lessonId,
          [`failedChecks.${checkKey(lessonId)}`]: deleteField(),
        })
      },
      failedChecks: (lessonId) => profile?.failedChecks?.[checkKey(lessonId)] ?? 0,
      recordFailedCheck: async (lessonId) => {
        if (!user) return
        await updateDoc(doc(db, 'users', user.uid), {
          [`failedChecks.${checkKey(lessonId)}`]: increment(1),
        })
      },
      resetModule: async (moduleId, lessonIds) => {
        if (!user) return
        const ids = [...lessonIds, `m${moduleId}.repaso`]
        const clearFails = Object.fromEntries(ids.map((id) => [`failedChecks.${checkKey(id)}`, deleteField()]))
        await updateDoc(doc(db, 'users', user.uid), {
          completedLessons: arrayRemove(...ids),
          lastLesson: null,
          ...clearFails,
        })
      },
    }
  }, [user, profile, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
