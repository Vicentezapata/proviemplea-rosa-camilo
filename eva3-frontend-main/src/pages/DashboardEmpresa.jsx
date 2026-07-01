import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function DashboardEmpresa() {
  return (
    <main className="dashboard-page">
      <Navbar />

      <section className="dashboard-header empresa-header">
        <div>
          <p className="section-label dark">Panel empresa</p>
          <h1>Portal Empresa</h1>
          <p>
            Revisa talentos disponibles mediante CV Ciego, consulta tus
            solicitudes enviadas y accede a contactos aprobados por la
            Municipalidad.
          </p>
        </div>
      </section>

      <section className="container dashboard-grid">
        <Link to="/buscar-talentos" className="dashboard-card dashboard-card-link">
          <span>🔎</span>
          <h3>Buscar talentos</h3>
          <p>
            Explora perfiles laborales disponibles sin visualizar datos
            personales sensibles.
          </p>
          <small>Ir a búsqueda →</small>
        </Link>

        <Link to="/mis-solicitudes" className="dashboard-card dashboard-card-link">
          <span>📨</span>
          <h3>Mis solicitudes</h3>
          <p>
            Revisa el estado de las solicitudes de contacto enviadas a la
            Municipalidad.
          </p>
          <small>Ver solicitudes →</small>
        </Link>

        <Link to="/contacto-aprobado" className="dashboard-card dashboard-card-link">
          <span>✅</span>
          <h3>Contactos aprobados</h3>
          <p>
            Accede a los datos de contacto cuando una solicitud fue aprobada.
          </p>
          <small>Ver contactos →</small>
        </Link>
      </section>
    </main>
  )
}

export default DashboardEmpresa