import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="leccion">
      <h1>Esta página no existe</h1>
      <p>Puede que el enlace esté mal escrito o que la página se haya movido.</p>
      <Link to="/" className="btn btn-primary">Ir al inicio</Link>
    </div>
  )
}

export function SetupNeeded() {
  return (
    <main className="main" id="main">
      <div className="leccion">
        <h1>Falta conectar Firebase</h1>
        <p>
          Pega la configuración de tu app web de Firebase en <code>src/config.ts</code> y vuelve a cargar.
          Los pasos están en el README.
        </p>
      </div>
    </main>
  )
}
