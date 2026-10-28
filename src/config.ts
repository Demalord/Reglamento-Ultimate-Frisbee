// ─────────────────────────────────────────────────────────────
// Configuración del proyecto. Edita SOLO este archivo.
// ─────────────────────────────────────────────────────────────

// 1. Pega aquí la config de tu app web de Firebase
//    (Consola Firebase → Configuración del proyecto → Tus apps → SDK config).
//    Estos valores NO son secretos: la seguridad la dan las Security Rules.
export const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_PROYECTO.firebaseapp.com',
  projectId: 'TU_PROYECTO',
  storageBucket: 'TU_PROYECTO.firebasestorage.app',
  messagingSenderId: '000000000000',
  appId: 'TU_APP_ID',
}

// 2. Correos de los administradores (en minúscula).
//    IMPORTANTE: mantén esta lista igual a la de firestore.rules → isAdmin().
export const ADMIN_EMAILS: string[] = [
  'diego.mahechar@uniagustiniana.edu.co',
]

// 3. Nombre del equipo (aparece en el header y el login).
export const TEAM_NAME = 'Ultimate Uniagustiniana'

// 4. Lema que aparece en el inicio.
export const TEAM_MOTTO = 'Disciplina, equipo, competencia'

export const isFirebaseConfigured = !firebaseConfig.apiKey.startsWith('TU_')
