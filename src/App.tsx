import { lazy, Suspense, type ReactNode } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthProvider'
import { RequireAdmin, RequireAuth } from './auth/guards'
import { Layout } from './components/Layout'
import { isFirebaseConfigured } from './config'
import { Glosario } from './pages/Glosario'
import { Home } from './pages/Home'
import { Leccion } from './pages/Leccion'
import { Login } from './pages/Login'
import { NotFound, SetupNeeded } from './pages/Misc'
import { Modulo } from './pages/Modulo'
import { Quiz } from './pages/Quiz'
import { QuizResult } from './pages/QuizResult'
import { Repaso } from './pages/Repaso'
import './pages/pages.css'

// El panel admin (con el banco de preguntas de los quizzes) se descarga solo cuando un admin entra.
const AdminHome = lazy(() => import('./pages/admin/AdminHome').then((m) => ({ default: m.AdminHome })))
const AdminQuiz = lazy(() => import('./pages/admin/AdminQuiz').then((m) => ({ default: m.AdminQuiz })))
const AdminStudent = lazy(() => import('./pages/admin/AdminStudent').then((m) => ({ default: m.AdminStudent })))

function AdminRoute({ children }: { children: ReactNode }) {
  return (
    <RequireAdmin>
      <Suspense fallback={<p className="muted" role="status">Cargando panel…</p>}>{children}</Suspense>
    </RequireAdmin>
  )
}

export default function App() {
  if (!isFirebaseConfigured) return <SetupNeeded />

  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route index element={<Home />} />
            <Route path="modulo/:moduleId" element={<Modulo />} />
            <Route path="modulo/:moduleId/leccion/:lessonId" element={<Leccion />} />
            <Route path="modulo/:moduleId/repaso" element={<Repaso />} />
            <Route path="glosario" element={<Glosario />} />
            <Route path="quiz/:moduleId" element={<Quiz />} />
            <Route path="quiz/:moduleId/resultado" element={<QuizResult />} />
            <Route path="admin" element={<AdminRoute><AdminHome /></AdminRoute>} />
            <Route path="admin/quiz/:moduleId" element={<AdminRoute><AdminQuiz /></AdminRoute>} />
            <Route path="admin/estudiante/:uid" element={<AdminRoute><AdminStudent /></AdminRoute>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}
