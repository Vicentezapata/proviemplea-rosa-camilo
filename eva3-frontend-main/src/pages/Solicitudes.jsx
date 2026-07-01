
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import API_BASE from '../config/api'

function Solicitudes() {
  const [solicitudes, setSolicitudes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('info')
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null)

  const mostrarMensaje = (texto, tipo = 'info') => {
    setMensaje(texto)
    setTipoMensaje(tipo)
  }

  const obtenerEmpresa = (solicitud) => {
    return (
      solicitud?.Empresa?.razon_social ||
      solicitud?.empresa?.razon_social ||
      solicitud?.Empresa?.nombre_empresa ||
      solicitud?.empresa?.nombre_empresa ||
      solicitud?.empresa_id ||
      'Sin información'
    )
  }

  const obtenerTalento = (solicitud) => {
    return (
      solicitud?.Talento?.area_profesional ||
      solicitud?.talento?.area_profesional ||
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

    return solicitud?.fecha_solicitud || 'Sin fecha'
  }

  const obtenerSolicitudes = async () => {
    try {
      setCargando(true)
      setMensaje('')

      const token = localStorage.getItem('token')

      const response = await fetch(`${API_BASE}/api/solicitudes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        mostrarMensaje(
          `Error ${response.status}: ${data.mensaje || data.message || 'No se pudieron obtener las solicitudes.'}`,
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

      setSolicitudes(lista)
    } catch (error) {
      console.error('ERROR FETCH SOLICITUDES:', error)
      mostrarMensaje('Error al conectar con el backend.', 'danger')
    } finally {
      setCargando(false)
    }
  }

  const verSolicitud = (solicitud) => {
    setSolicitudSeleccionada(solicitud)
    setMensaje('')
  }

  const cerrarDetalle = () => {
    setSolicitudSeleccionada(null)
  }

  const construirPayloadCambioEstado = (solicitud, nuevoEstado) => {
    return {
      empresa_id: solicitud.empresa_id || solicitud.empresaId || solicitud.Empresa?.id || solicitud.empresa?.id,
      talento_id: solicitud.talento_id || solicitud.talentoId || solicitud.Talento?.id || solicitud.talento?.id,
      estado_solicitud: nuevoEstado,
      estado: nuevoEstado,
      mensaje: solicitud.mensaje || solicitud.comentario || solicitud.observacion || '',
    }
  }

  const intentarCambiarEstado = async (solicitud, nuevoEstado) => {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_BASE}/api/solicitudes/${solicitud.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(construirPayloadCambioEstado(solicitud, nuevoEstado)),
    })

    const data = await response.json().catch(() => ({}))

    if (response.ok) {
      return data
    }

    throw { status: response.status, data }
  }

  const cambiarEstadoSolicitud = async (solicitud, nuevoEstado) => {
    const confirmar = window.confirm(
      `¿Seguro que deseas cambiar la solicitud ID ${solicitud.id} a estado "${nuevoEstado}"?`
    )

    if (!confirmar) return

    try {
      await intentarCambiarEstado(solicitud, nuevoEstado)

      mostrarMensaje(
        nuevoEstado === 'aprobada'
          ? 'Solicitud aprobada correctamente.'
          : 'Solicitud rechazada correctamente.',
        'success'
      )

      setSolicitudSeleccionada(null)
      obtenerSolicitudes()
    } catch (error) {
      console.error('ERROR CAMBIAR ESTADO SOLICITUD:', error)

      mostrarMensaje(
        `Error ${error?.status || ''}: ${error?.data?.mensaje || error?.data?.message || 'No se pudo cambiar el estado de la solicitud.'}`,
        'warning'
      )
    }
  }

  useEffect(() => {
    obtenerSolicitudes()
  }, [])

  return (
    <main className="dashboard-page">
      <Navbar />

      <section className="module-header">
        <div className="container">
          <p className="section-label dark">Módulo administrador</p>
          <h1>Gestión de solicitudes</h1>
          <p>
            Revisión municipal de solicitudes de contacto realizadas por empresas.
            Desde este módulo el administrador puede revisar, aprobar o rechazar
            solicitudes antes de liberar datos de contacto.
          </p>
        </div>
      </section>

      <section className="container module-content">
        <div className="module-card mb-4">
          <div className="module-card-header">
            <div>
              <h2>Panel de acciones</h2>
              <p>Acciones disponibles para la revisión municipal de solicitudes.</p>
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
                <p>Información seleccionada para revisión administrativa.</p>
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
                <strong>Empresa</strong>
                <p>{obtenerEmpresa(solicitudSeleccionada)}</p>
              </div>

              <div className="col-md-3">
                <strong>Talento</strong>
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

              <div className="col-md-4">
                <strong>Fecha</strong>
                <p>{obtenerFecha(solicitudSeleccionada)}</p>
              </div>

              <div className="col-12">
                <strong>Mensaje</strong>
                <p>{obtenerMensaje(solicitudSeleccionada)}</p>
              </div>
            </div>

            {obtenerEstado(solicitudSeleccionada) === 'pendiente' && (
              <div className="mt-4 d-flex gap-2 flex-wrap">
                <button
                  className="btn btn-success"
                  onClick={() => cambiarEstadoSolicitud(solicitudSeleccionada, 'aprobada')}
                >
                  Aprobar solicitud
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => cambiarEstadoSolicitud(solicitudSeleccionada, 'rechazada')}
                >
                  Rechazar solicitud
                </button>
              </div>
            )}
          </div>
        )}

        <div className="module-card">
          <div className="module-card-header">
            <div>
              <h2>Solicitudes registradas</h2>
              <p>Información del flujo empresa, talento y estado de solicitud.</p>
            </div>
          </div>

          {cargando && (
            <div className="alert alert-info">
              Cargando solicitudes desde el backend...
            </div>
          )}

          {!cargando && solicitudes.length === 0 && !mensaje && (
            <div className="alert alert-secondary">
              No hay solicitudes registradas para mostrar.
            </div>
          )}

          {solicitudes.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Empresa</th>
                    <th>Talento</th>
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
                        <td>{obtenerEmpresa(solicitud)}</td>
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
                              onClick={() => verSolicitud(solicitud)}
                            >
                              Ver
                            </button>

                            {estado === 'pendiente' && (
                              <>
                                <button
                                  className="btn btn-sm btn-outline-success"
                                  onClick={() => cambiarEstadoSolicitud(solicitud, 'aprobada')}
                                >
                                  Aprobar
                                </button>

                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => cambiarEstadoSolicitud(solicitud, 'rechazada')}
                                >
                                  Rechazar
                                </button>
                              </>
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

export default Solicitudes
