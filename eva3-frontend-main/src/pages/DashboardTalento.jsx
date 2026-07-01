import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import API_BASE from '../config/api'

function DashboardTalento() {
  const [mostrarDetalle, setMostrarDetalle] = useState(false)
  const [mostrarActualizacion, setMostrarActualizacion] = useState(false)
  const [estadoPerfil, setEstadoPerfil] = useState(null)

  const usuario = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('usuario')) || {}
    } catch (error) {
      return {}
    }
  }, [])

  useEffect(() => {
    const talentoId = usuario?.talento_id

    if (!talentoId) {
      setEstadoPerfil('en_revision')
      return
    }

    const token = localStorage.getItem('token')

    fetch(`${API_BASE}/api/talentos/${talentoId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const estado = data?.estado_perfil || data?.data?.estado_perfil || data?.estado
        setEstadoPerfil(estado || 'en_revision')
      })
      .catch(() => setEstadoPerfil('en_revision'))
  }, [usuario])

  const estados = {
    en_revision: {
      texto: 'En revisión municipal',
      clase: 'warning',
      descripcion:
        'Tu perfil laboral fue registrado y se encuentra en revisión por parte de la Municipalidad.',
    },
    validado: {
      texto: 'Perfil validado',
      clase: 'success',
      descripcion:
        'Tu perfil fue validado por la Municipalidad y puede ser considerado por empresas bajo modalidad de CV Ciego.',
    },
    rechazado: {
      texto: 'Requiere actualización',
      clase: 'danger',
      descripcion:
        'La Municipalidad requiere revisar o actualizar antecedentes antes de continuar el proceso.',
    },
  }

  const estadoActual = estados[estadoPerfil] || estados['en_revision']

  const verDetalleEstado = () => {
    setMostrarDetalle(true)
    setMostrarActualizacion(false)
  }

  const solicitarActualizacion = () => {
    setMostrarActualizacion(true)
    setMostrarDetalle(false)
  }

  return (
    <main className="dashboard-page">
      <Navbar />

      <section className="dashboard-header talento-header">
        <div>
          <p className="section-label dark">Portal persona inscrita</p>
          <h1>Mi espacio laboral</h1>
          <p>
            Revisa el estado general de tu perfil laboral, la protección de tus
            datos personales y el proceso de validación realizado por la
            Municipalidad.
          </p>

          <div className="hero-actions mt-4">
            <button className="btn btn-light" onClick={verDetalleEstado}>
              Ver detalle del estado
            </button>

            <button
              className="btn btn-outline-light"
              onClick={solicitarActualizacion}
            >
              Solicitar actualización de datos
            </button>
          </div>
        </div>
      </section>

      <section className="container module-content">
        <div className="row g-4 mb-4">
          <div className="col-lg-4">
            <div className="module-card h-100">
              <div className="module-card-header">
                <div>
                  <h2>Persona inscrita</h2>
                  <p>Datos generales de la sesión actual.</p>
                </div>
              </div>

              <div className="info-list">
                <div>
                  <strong>Correo</strong>
                  <p>{usuario.correo || usuario.email || 'talento@proviemplea.cl'}</p>
                </div>

                <div>
                  <strong>Tipo de acceso</strong>
                  <p>Persona inscrita</p>
                </div>

                <div>
                  <strong>Programa</strong>
                  <p>ProviEmplea</p>
                </div>
              </div>

              <div className="d-grid gap-2 mt-4">
                <button className="btn btn-primary" onClick={verDetalleEstado}>
                  Consultar estado
                </button>

                <button
                  className="btn btn-outline-primary"
                  onClick={solicitarActualizacion}
                >
                  Actualizar antecedentes
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="module-card h-100">
              <div className="module-card-header">
                <div>
                  <h2>Estado de mi perfil</h2>
                  <p>
                    La información registrada se revisa antes de quedar
                    disponible para procesos de vinculación laboral.
                  </p>
                </div>

                <span className={`badge text-bg-${estadoActual.clase}`}>
                  {estadoActual.texto}
                </span>
              </div>

              <p className="mb-4">{estadoActual.descripcion}</p>

              <div className="row g-3">
                <div className="col-md-4">
                  <div className="status-step active">
                    <span>1</span>
                    <strong>Perfil registrado</strong>
                    <p>La información laboral fue ingresada en la plataforma.</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="status-step active">
                    <span>2</span>
                    <strong>Revisión municipal</strong>
                    <p>La Municipalidad valida los antecedentes registrados.</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="status-step pending">
                    <span>3</span>
                    <strong>Vinculación laboral</strong>
                    <p>
                      Una empresa podrá solicitar contacto bajo autorización
                      municipal.
                    </p>
                  </div>
                </div>
              </div>

              {mostrarDetalle && (
                <div className="alert alert-primary mt-4 mb-0">
                  <strong>Detalle del estado:</strong> tu perfil se encuentra en
                  revisión municipal. Cuando sea validado, podrá ser considerado
                  por empresas mediante CV Ciego, sin mostrar tus datos
                  personales.
                </div>
              )}

              {mostrarActualizacion && (
                <div className="alert alert-warning mt-4 mb-0">
                  <strong>Actualización de antecedentes:</strong> esta acción
                  representa una solicitud informativa para actualizar datos. En
                  una versión completa, esta solicitud sería enviada al equipo
                  municipal para revisión.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <article className="dashboard-card h-100">
              <span>📄</span>
              <h3>Perfil laboral</h3>
              <p>
                La Municipalidad administra la información profesional para
                apoyar futuras oportunidades laborales.
              </p>

              <button className="btn btn-sm btn-outline-primary mt-2" onClick={verDetalleEstado}>
                Ver estado
              </button>
            </article>
          </div>

          <div className="col-md-4">
            <article className="dashboard-card h-100">
              <span>🛡️</span>
              <h3>CV Ciego</h3>
              <p>
                Las empresas visualizan información laboral sin acceder a datos
                personales antes de una autorización.
              </p>

              <button
                className="btn btn-sm btn-outline-primary mt-2"
                onClick={() => {
                  setMostrarDetalle(true)
                  setMostrarActualizacion(false)
                }}
              >
                Ver protección
              </button>
            </article>
          </div>

          <div className="col-md-4">
            <article className="dashboard-card h-100">
              <span>✅</span>
              <h3>Contacto autorizado</h3>
              <p>
                Los datos de contacto solo se entregan cuando una solicitud de
                empresa es aprobada por la Municipalidad.
              </p>

              <button
                className="btn btn-sm btn-outline-primary mt-2"
                onClick={solicitarActualizacion}
              >
                Solicitar orientación
              </button>
            </article>
          </div>
        </div>

        <div className="module-card mt-4">
          <div className="module-card-header">
            <div>
              <h2>Información importante</h2>
              <p>
                Esta vista es informativa para la persona inscrita. La creación,
                edición y validación de perfiles se realiza desde el panel
                administrador municipal.
              </p>
            </div>
          </div>

          <div className="alert alert-info mb-0">
            Si una empresa se interesa en tu perfil laboral, la solicitud debe
            ser revisada por la Municipalidad antes de compartir datos de
            contacto.
          </div>
        </div>
      </section>
    </main>
  )
}

export default DashboardTalento
