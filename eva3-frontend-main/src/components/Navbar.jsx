import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  const usuarioGuardado = localStorage.getItem('usuario')
  const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    navigate('/login')
  }

  return (
    <nav className="app-navbar">
      <div className="app-navbar-brand">
        <Link to="/" className="brand-mini">
          PE
        </Link>

        <div>
          <strong>ProviEmplea</strong>
          <span>
            {usuario ? `Rol: ${usuario.rol}` : 'Sistema municipal'}
          </span>
        </div>
      </div>

      <div className="app-navbar-links">
        {usuario?.rol === 'admin' && (
          <>
            <Link to="/admin">Inicio</Link>
            <Link to="/talentos">Talentos</Link>
            <Link to="/empresas">Empresas</Link>
            <Link to="/solicitudes">Solicitudes</Link>
            <Link to="/seguimientos">Seguimientos</Link>
          </>
        )}

        {usuario?.rol === 'empresa' && (
          <>
            <Link to="/empresa">Inicio</Link>
            <Link to="/buscar-talentos">Buscar talentos</Link>
            <Link to="/mis-solicitudes">Mis solicitudes</Link>
            <Link to="/contacto-aprobado">Contacto aprobado</Link>
          </>
        )}

        {usuario?.rol === 'talento' && (
          <>
            <Link to="/talento">Inicio</Link>
          </>
        )}

        <button type="button" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}

export default Navbar