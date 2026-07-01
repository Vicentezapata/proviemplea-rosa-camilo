import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import API_BASE from '../config/api'

function MisSolicitudesEmpresa() {
  const navigate = useNavigate()

  const [solicitudes, setSolicitudes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('info')
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null)

  const mostrarMensaje = (texto, tipo = 'info') => {
    setMensaje(texto)
    setTipoMensaje(tipo)
  }

  const obtenerUsuario = () => {
    try {
      const usuarioGuardado = localStorage.getItem('usuario')
      return usuarioGuardado ? JSON.parse(usuarioGuardado) : null
    } catch (error) {
      localStorage.removeItem('usuario')
      localStorage.removeItem('token')
      return null
    }
  }

  const obtenerTalento = (solicitud) => {
    return (
      solicitud?.Talento?.area_profesional ||
      solicitud?.talento?.area_profesional ||
      solicitud?.area_profesional ||
      solicitud?.talento_id ||
      'Sin información'
    )
  }

  const obtenerEstado = (solicitud) => {
    return solicitud?.estado_solicitud || solicitud?.estado || 'Sin estado'
  }

  const obtenerMensaje = (solicitud) => {
    return (
      solicitud?.mensaje ||
      solicitud?.comentario ||
      solicitud?.observacion ||
      'Sin mensaje'
    )
  }

  const obtenerFecha = (solicitud) => {
    if (solicitud?.createdAt) {
      return new Date(solicitud.createdAt).toLocaleDateString('es-CL')
    }

    return solicitud?.fecha_solicitud || solicitud?.fecha || 'Sin fecha'
  }

  const obtenerSolicitudes = async () => {
    try {
      setCargando(true)
      setMensaje('')

      const token = localStorage.getItem('token')
      const usuario = obtenerUsuario()

      const empresaId = usuario?.empresa_id || usuario?.empresaId
      const params = new URLSearchParams()
      if (empresaId) params.append('empresa_id', empresaId)
      params.append('limit', '100')

      const response = await fetch(`${API_BASE}/api/solicitudes?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        mostrarMensaje(
          `No se pudieron obtener las solicitudes: ${data.mensaje || data.message || 'intente nuevamente.'}`,
          'warning'
        )
        return
      }

      const lista =
        Array.isArray(data) ? data :
        Array.isArray(data.data) ? data.data :
        Array.isArray(data.solicitudes) ? data.solicitudes :
        Array.isArray(data.data?.rows) ? data.data.rows :
        Array.isArray(data.data?.items) ? data.data.items :
        []

      const listaFiltrada = empresaId
        ? lista.filter((solicitud) => {
            const idEmpresaSolicitud =
              solicitud.empresa_id ||
              solicitud.empresaId ||
              solicitud.Empresa?.id ||
              solicitud.empresa?.id

            return Number(idEmpresaSolicitud) === Number(empresaId)
          })
        : lista

      setSolicitudes(listaFiltrada)

      if (listaFiltrada.length === 0) {
        mostrarMensaje('No tienes solicitudes registradas para mostrar.', 'info')
      }
    } catch (error) {
      console.error('ERROR FETCH MIS SOLICITUDES:', error)
      mostrarMensaje('Error al conectar con el backend.', 'danger')
    } finally {
      setCargando(false)
    }
  }

  const verDetalle = (solicitud) => {
    setSolicitudSeleccionada(solicitud)
    setMensaje('')
  }

  const cerrarDetalle = () => {
    setSolicitudSeleccionada(null)
  }

  const irAContactoAprobado = (solicitud) => {
    navigate(`/contacto-aprobado?solicitud_id=${solicitud.id}`)
  }

  useEffect(() => {
    obtenerSolicitudes()
  }, [])

  return (
    <main className="dashboard-page">
      <Navbar />

      <section className="module-header">
        <div className="container">
          <p className="section-label dark">Portal empresa</p>
          <h1>Solicitudes enviadas</h1>
          <p>
            Consulta el avance de las solicitudes enviadas a la Municipalidad.
            Cuando una solicitud es aprobada, podrás acceder al contacto correspondiente.
          </p>
        </div>
      </section>

      <section className="container module-content">
        <div className="module-card mb-4">
          <div className="module-card-header">
            <div>
              <h2>Panel de consulta</h2>
              <p>
                Revisa si tus solicitudes están en revisión, aprobadas o rechazadas.
              </p>
            </div>

            <button className="btn btn-outline-primary" onClick={obtenerSolicitudes}>
              Actualizar listado
            </button>
          </div>

          {mensaje && (
            <div className={`alert alert-${tipoMensaje}`}>
              {mensaje}
            </div>
          )}
        </div>

        {solicitudSeleccionada && (
          <div className="module-card mb-4">
            <div className="module-card-header">
              <div>
                <h2>Detalle de solicitud</h2>
                <p>Información enviada a revisión municipal.</p>
              </div>

              <button className="btn btn-outline-secondary" onClick={cerrarDetalle}>
                Cerrar detalle
              </button>
            </div>

            <div className="row g-3">
              <div className="col-md-3">
                <strong>ID solicitud</strong>
                <p>{solicitudSeleccionada.id}</p>
              </div>

              <div className="col-md-3">
                <strong>Perfil solicitado</strong>
                <p>{obtenerTalento(solicitudSeleccionada)}</p>
              </div>

              <div className="col-md-3">
                <strong>Estado</strong>
                <p>
                  <span className="badge text-bg-info">
                    {obtenerEstado(solicitudSeleccionada)}
                  </span>
                </p>
              </div>

              <div className="col-md-3">
                <strong>Fecha</strong>
                <p>{obtenerFecha(solicitudSeleccionada)}</p>
              </div>

              <div className="col-12">
                <strong>Mensaje enviado</strong>
                <p>{obtenerMensaje(solicitudSeleccionada)}</p>
              </div>
            </div>

            {obtenerEstado(solicitudSeleccionada) === 'aprobada' && (
              <div className="mt-4">
                <button
                  className="btn btn-success"
                  onClick={() => irAContactoAprobado(solicitudSeleccionada)}
                >
                  Ver contacto aprobado
                </button>
              </div>
            )}
          </div>
        )}

        <div className="module-card">
          <div className="module-card-header">
            <div>
              <h2>Historial de solicitudes</h2>
              <p>
                Cada registro corresponde a una solicitud de contacto enviada desde la empresa.
              </p>
            </div>
          </div>

          {cargando && (
            <div className="alert alert-info">
              Cargando solicitudes enviadas...
            </div>
          )}

          {!cargando && solicitudes.length === 0 && !mensaje && (
            <div className="alert alert-secondary">
              No tienes solicitudes registradas para mostrar.
            </div>
          )}

          {solicitudes.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Perfil solicitado</th>
                    <th>Estado</th>
                    <th>Mensaje</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {solicitudes.map((solicitud) => {
                    const estado = obtenerEstado(solicitud)

                    return (
                      <tr key={solicitud.id}>
                        <td>{solicitud.id}</td>
                        <td>{obtenerTalento(solicitud)}</td>

                        <td>
                          <span className="badge text-bg-info">
                            {estado}
                          </span>
                        </td>

                        <td>{obtenerMensaje(solicitud)}</td>
                        <td>{obtenerFecha(solicitud)}</td>

                        <td>
                          <div className="table-actions">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => verDetalle(solicitud)}
                            >
                              Ver
                            </button>

                            {estado === 'aprobada' && (
                              <button
                                className="btn btn-sm btn-outline-success"
                                onClick={() => irAContactoAprobado(solicitud)}
                              >
                                Ver contacto
                              </button>
                            )}

                            {estado === 'pendiente' && (
                              <span className="status-pill status-review">
                                En revisión
                              </span>
                            )}

                            {estado === 'rechazada' && (
                              <span className="status-pill status-unavailable">
                                No disponible
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default MisSolicitudesEmpresa
