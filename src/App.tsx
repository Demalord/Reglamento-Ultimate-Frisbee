import { HashRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './auth/AuthProvider'
import { RequireAdmin, RequireAuth } from './auth/guards'
import { Layout } from './components/Layout'
import { isFirebaseConfigured } from './config'
import { Admin } from './pages/Admin'
import { Home } from './pages/Home'
import { Leccion } from './pages/Leccion'
import { Login } from './pages/Login'
import { Glosario } from './pages/Glosario'
import { NotFound, SetupNeeded } from './pages/Misc'
import { Repaso } from './pages/Repaso'
import { Modulo } from './pages/Modulo'
import './pages/pages.css'

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
            {/* Fase 3: quiz/:moduleId y quiz/:moduleId/resultado */}
            <Route
              path="admin"
              element={
                <RequireAdmin>
                  <Admin />
                </RequireAdmin>
              }
            />
            {/* Fase 4: admin/estudiante/:uid y admin/quiz/:moduleId */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}
