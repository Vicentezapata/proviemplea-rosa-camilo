import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function DashboardAdmin() {
  return (
    <main className="dashboard-page">
      <Navbar />

      <section className="dashboard-header">
        <div>
          <p className="section-label dark">Panel de administración</p>
          <h1>Panel de control Municipalidad</h1>
          <p>
            Gestión general de talentos, empresas, solicitudes de contacto,
            seguimientos y catálogos del sistema ProviEmplea.
          </p>
        </div>
      </section>

      <section className="container dashboard-grid">
        <Link to="/talentos" className="dashboard-card dashboard-card-link">
          <span>👥</span>
          <h3>Talentos</h3>
          <p>Administrar perfiles laborales y validación municipal.</p>
          <small>Ir al módulo →</small>
        </Link>

        <Link to="/empresas" className="dashboard-card dashboard-card-link">
          <span>🏢</span>
          <h3>Empresas</h3>
          <p>Gestionar empresas registradas en la plataforma.</p>
          <small>Ir al módulo →</small>
        </Link>

        <Link to="/solicitudes" className="dashboard-card dashboard-card-link">
          <span>📩</span>
          <h3>Solicitudes</h3>
          <p>Revisar solicitudes de contacto entre empresas y talentos.</p>
          <small>Ir al módulo →</small>
        </Link>

        <Link to="/seguimientos" className="dashboard-card dashboard-card-link">
          <span>📊</span>
          <h3>Seguimientos</h3>
          <p>Controlar el avance posterior de los procesos laborales.</p>
          <small>Ir al módulo →</small>
        </Link>
      </section>
    </main>
  )
}

export default DashboardAdmin