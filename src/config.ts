// ─────────────────────────────────────────────────────────────
// Configuración del proyecto. Edita SOLO este archivo.
// ─────────────────────────────────────────────────────────────

// 1. Pega aquí la config de tu app web de Firebase
//    (Consola Firebase → Configuración del proyecto → Tus apps → SDK config).
//    Estos valores NO son secretos: la seguridad la dan las Security Rules.
export const firebaseConfig = {
  apiKey: 'AIzaSyDj1snc7NMnxxQX-XAgS3ZqxEWks8jxAIU',
  authDomain: 'reglamento-ultimate-frisbee.firebaseapp.com',
  projectId: 'reglamento-ultimate-frisbee',
  storageBucket: 'reglamento-ultimate-frisbee.firebasestorage.app',
  messagingSenderId: '625485318752',
  appId: '1:625485318752:web:be8194d600c0ad6d529105',
}

// 2. Correos del dueño (en minúscula). Son admin siempre y son los ÚNICOS que pueden
//    dar o quitar admin a otras personas, desde Admin → Administradores.
//    IMPORTANTE: mantén esta lista igual a la de firestore.rules → isOwner().
export const OWNER_EMAILS: string[] = [
  'diego.mahechar@uniagustiniana.edu.co',
  'diegomahereyes@gmail.com',
]

// 3. Nombre del equipo (aparece en el header y el login).
export const TEAM_NAME = 'Ultimate Uniagustiniana'

// 4. Lema que aparece en el inicio.
export const TEAM_MOTTO = 'Disciplina, equipo, competencia'

export const isFirebaseConfigured = !firebaseConfig.apiKey.startsWith('TU_')
