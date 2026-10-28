import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc, type Timestamp } from 'firebase/firestore'
import { db } from './firebase'

// admins/{correo en minúscula}: quien tiene documento aquí es admin.
// Solo el dueño puede escribir en esta colección (lo exigen las rules).

export interface AdminDoc {
  email: string
  name: string
  grantedBy: string
  grantedAt?: Timestamp
}

export function useAdmins() {
  const [admins, setAdmins] = useState<AdminDoc[] | null>(null)
  useEffect(
    () =>
      onSnapshot(
        collection(db, 'admins'),
        (snap) => setAdmins(snap.docs.map((d) => ({ ...(d.data() as AdminDoc), email: d.id }))),
        (err) => {
          console.error('admins', err)
          setAdmins([])
        },
      ),
    [],
  )
  return admins
}

export const normalizeEmail = (email: string) => email.trim().toLowerCase()
export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export async function grantAdmin(email: string, name: string, grantedBy: string) {
  const e = normalizeEmail(email)
  await setDoc(doc(db, 'admins', e), { email: e, name: name.trim(), grantedBy, grantedAt: serverTimestamp() })
}

export async function revokeAdmin(email: string) {
  await deleteDoc(doc(db, 'admins', normalizeEmail(email)))
}
