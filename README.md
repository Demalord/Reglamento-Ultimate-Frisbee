# Reglamento Ultimate

Web para que el equipo estudie las **WFDF Rules of Ultimate 2025–2028** en 4 módulos guiados, con quizzes por módulo que activa un admin.

- Frontend: React 19 + TypeScript + Vite, desplegado en GitHub Pages
- Backend: Firebase Auth (Google) + Firestore
- Arquitectura completa: [`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md)

## Puesta en marcha

### 1. Firebase

1. Crea un proyecto en <https://console.firebase.google.com> (Analytics no hace falta).
2. **Authentication → Comenzar → Método de acceso → Google → Habilitar.**
3. **Authentication → Configuración → Dominios autorizados → Agregar dominio:** `TU_USUARIO.github.io`
   (`localhost` ya viene autorizado para desarrollo).
4. **Firestore Database → Crear base de datos** → modo producción → región `southamerica-east1` (São Paulo) o `us-central1`.
5. **Firestore → Reglas:** pega el contenido de [`firestore.rules`](firestore.rules) y publica.
   *(O con la CLI: `npx firebase-tools deploy --only firestore:rules`.)*
6. **Configuración del proyecto → Tus apps → Web (`</>`)** → registra la app → copia el objeto `firebaseConfig`.

### 2. Configurar el proyecto

Edita **solo** [`src/config.ts`](src/config.ts):

- `firebaseConfig`: pega lo que copiaste en el paso 6 (no es secreto, puede ir en el repo).
- `ADMIN_EMAILS`: correos de los admins.
- `TEAM_NAME`: nombre del equipo.

Si cambias los admins, actualiza también la lista en `isAdmin()` de `firestore.rules` y vuelve a publicar las reglas.

### 3. Correr en local

```bash
npm install
npm run dev
```

### 4. GitHub Pages

1. Crea el repo y sube el código a la rama `main`.
2. En el repo: **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. Cada push a `main` despliega solo (workflow en `.github/workflows/deploy.yml`).
4. La URL queda en `https://TU_USUARIO.github.io/NOMBRE_DEL_REPO/`.

La app usa rutas con `#` (`/#/modulo/2`) y `base: './'`, así que funciona con cualquier nombre de repo sin configuración extra.

## Estructura

```
src/
├─ config.ts              ← lo único que hay que editar
├─ lib/firebase.ts        init de Firebase
├─ lib/progress.ts        reglas de desbloqueo (lecciones y módulos)
├─ auth/                  AuthProvider (sesión + perfil + progreso) y guards
├─ content/manifest.ts    orden oficial de módulos y lecciones
├─ content/moduloN.ts     contenido de cada módulo (lecciones + repaso)
├─ content/glosario.ts    definiciones del reglamento
├─ components/            Layout, FieldMap (la cancha), ProgressBar
└─ pages/                 Login, Home, Modulo, Leccion, Admin, Glosario
firestore.rules           seguridad de la base de datos
```

## Fases

- [x] **Fase 1:** proyecto base, deploy, login con Google, recorrido con desbloqueo, panel admin con progreso
- [ ] **Fase 2:** contenido de las 24 lecciones (pasos + pregunta de control) y glosario
  - [x] Motor de lecciones guiadas, repaso por módulo y glosario con tooltips
  - [x] Módulo 1: Fundamentos y Espíritu del Juego
  - [ ] Módulo 2: Flujo del juego
  - [ ] Módulo 3: Posesión, límites y anotación
  - [ ] Módulo 4: Llamadas, faltas y violaciones
- [ ] **Fase 3:** quizzes por módulo, calendario y pantalla de resultados con gráfico
- [ ] **Fase 4:** panel admin completo (matriz de resultados, detalle por estudiante y por quiz, CSV)
- [ ] **Fase 5:** pulido final

## Licencia del contenido

El reglamento es de la World Flying Disc Federation, bajo [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). La atribución aparece en el footer de la web.
