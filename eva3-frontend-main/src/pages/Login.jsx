import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logoProvidencia from '../assets/img/logo_providencia.png'
import API_BASE from '../config/api'

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [cargando, setCargando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')

    if (email.trim() === '' || password.trim() === '') {
      setMensaje('Debe ingresar correo y contraseña.')
      return
    }

    try {
      setCargando(true)

      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setMensaje(data.mensaje || data.message || 'Credenciales incorrectas.')
        return
      }

      if (!data.token || !data.usuario) {
        setMensaje('La respuesta del backend no contiene token o usuario.')
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('usuario', JSON.stringify(data.usuario))

      const rol = data.usuario.rol

      if (rol === 'admin') {
        navigate('/admin')
      } else if (rol === 'empresa') {
        navigate('/empresa')
      } else if (rol === 'talento') {
        navigate('/talento')
      } else {
        setMensaje('Rol de usuario no reconocido.')
      }
    } catch (error) {
      console.error(error)
      setMensaje('No se pudo conectar con el backend. Verifique que el servidor esté activo.')
    } finally {
      setCargando(false)
    }
  }

  return (
    <main className="login-institucional">
      <section className="login-shell">
        <div className="login-side">
          <Link to="/" className="login-back">
            ← Volver a la página principal
          </Link>

          <img
            src={logoProvidencia}
            alt="Logo Municipalidad de Providencia"
            className="login-logo-providencia"
          />

          <div className="login-side-content">
            <p className="section-label">Acceso institucional</p>

            <h1>Bienvenido a ProviEmplea</h1>

            <p>
              Plataforma municipal de empleabilidad que conecta talentos con
              empresas, facilitando la gestión de oportunidades laborales y el
              seguimiento de solicitudes.
            </p>

            <div className="login-tags">
              <span>Oportunidades laborales</span>
              <span>Vinculación con empresas</span>
              <span>Acompañamiento municipal</span>
            </div>
          </div>
        </div>

        <div className="login-panel">
          <div className="login-panel-header">
            <p className="section-label dark">Inicio de sesión</p>
            <h2>Accede a tu cuenta</h2>
            <p>
              Ingresa tus credenciales para continuar al panel correspondiente
              según tu rol en la plataforma.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                placeholder="ejemplo@proviemplea.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {mensaje && (
              <div className="alert alert-info py-2">
                {mensaje}
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100" disabled={cargando}>
              {cargando ? 'Ingresando...' : 'Ingresar a ProviEmplea'}
            </button>
          </form>

          <div className="demo-users institucional-demo">
            <h4>Cuentas de Demostración</h4>
            <p><strong>Municipalidad:</strong> admin@proviemplea.cl / admin123</p>
            <p><strong>Empresa:</strong> empresa@proviemplea.cl / empresa123</p>
            <p><strong>Talento:</strong> talento@proviemplea.cl / talento123</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login