import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import API_BASE from '../config/api'

const formularioInicial = {
  solicitud_contacto_id: '',
  etapa: '',
  notas_internas: '',
  estado_seguimiento: 'pendiente',
}

function Seguimientos() {
  const [seguimientos, setSeguimientos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('info')

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [seguimientoSeleccionado, setSeguimientoSeleccionado] = useState(null)
  const [formulario, setFormulario] = useState(formularioInicial)

  const mostrarMensaje = (texto, tipo = 'info') => {
    setMensaje(texto)
    setTipoMensaje(tipo)
  }

  const obtenerSolicitud = (seguimiento) => {
    return (
      seguimiento?.solicitud_contacto_id ||
      seguimiento?.solicitud_id ||
      seguimiento?.solicitudId ||
      seguimiento?.SolicitudContacto?.id ||
      seguimiento?.Solicitud?.id ||
      'Sin información'
    )
  }

  const obtenerEmpresa = (seguimiento) => {
    return (
      seguimiento?.empresa_id ||
      seguimiento?.empresaId ||
      seguimiento?.Empresa?.id ||
      'Sin información'
    )
  }

  const obtenerTalento = (seguimiento) => {
    return (
      seguimiento?.talento_id ||
      seguimiento?.talentoId ||
      seguimiento?.Talento?.id ||
      'Sin información'
    )
  }

  const obtenerTipo = (seguimiento) => {
    return seguimiento?.etapa || seguimiento?.tipo_seguimiento || seguimiento?.tipo || 'Sin tipo'
  }

  const obtenerDescripcion = (seguimiento) => {
    return (
      seguimiento?.notas_internas ||
      seguimiento?.descripcion ||
      seguimiento?.observacion ||
      'Sin descripción'
    )
  }

  const obtenerEstado = (seguimiento) => {
    return seguimiento?.estado_seguimiento || seguimiento?.estado || 'Sin estado'
  }

  const obtenerFecha = (seguimiento) => {
    if (seguimiento?.createdAt) {
      return new Date(seguimiento.createdAt).toLocaleDateString('es-CL')
    }

    return seguimiento?.fecha_seguimiento || seguimiento?.fecha || 'Sin fecha'
  }

  const obtenerSeguimientos = async () => {
    try {
      setCargando(true)
      setMensaje('')

      const token = localStorage.getItem('token')

      const response = await fetch(`${API_BASE}/api/seguimientos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        mostrarMensaje(
          `Error ${response.status}: ${data.mensaje || data.message || 'No se pudieron obtener los seguimientos.'}`,
          'warning'
        )
        return
      }

      const lista =
        Array.isArray(data) ? data :
        Array.isArray(data.data) ? data.data :
        Array.isArray(data.seguimientos) ? data.seguimientos :
        Array.isArray(data.data?.rows) ? data.data.rows :
        Array.isArray(data.data?.items) ? data.data.items :
        []

      setSeguimientos(lista)
    } catch (error) {
      console.error('ERROR FETCH SEGUIMIENTOS:', error)
      mostrarMensaje('Error al conectar con el backend.', 'danger')
    } finally {
      setCargando(false)
    }
  }

  const abrirFormularioCrear = () => {
    setFormulario(formularioInicial)
    setSeguimientoSeleccionado(null)
    setMostrarFormulario(true)
    setMensaje('')
  }

  const cerrarFormulario = () => {
    setMostrarFormulario(false)
    setFormulario(formularioInicial)
  }

  const manejarCambio = (e) => {
    const { name, value } = e.target

    setFormulario({
      ...formulario,
      [name]: value,
    })
  }

  const construirPayload = () => {
    return {
      solicitud_contacto_id: Number(formulario.solicitud_contacto_id),
      etapa: formulario.etapa.trim(),
      notas_internas: formulario.notas_internas.trim(),
      estado_seguimiento: formulario.estado_seguimiento,
      estado: formulario.estado_seguimiento,
    }
  }

  const guardarSeguimiento = async (e) => {
    e.preventDefault()

    if (
      formulario.solicitud_contacto_id.trim() === '' ||
      isNaN(Number(formulario.solicitud_contacto_id))
    ) {
      mostrarMensaje('ID de solicitud es obligatorio y debe ser numérico.', 'warning')
      return
    }

    if (formulario.etapa.trim() === '') {
      mostrarMensaje('La etapa es obligatoria.', 'warning')
      return
    }

    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`${API_BASE}/api/seguimientos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(construirPayload()),
      })

      const data = await response.json()

      if (!response.ok) {
        mostrarMensaje(
          `Error ${response.status}: ${data.mensaje || data.message || 'No se pudo registrar el seguimiento.'}`,
          'warning'
        )
        return
      }

      mostrarMensaje('Seguimiento registrado correctamente.', 'success')
      cerrarFormulario()
      obtenerSeguimientos()
    } catch (error) {
      console.error('ERROR CREAR SEGUIMIENTO:', error)
      mostrarMensaje('Error al conectar con el backend.', 'danger')
    }
  }

  const verSeguimiento = (seguimiento) => {
    setSeguimientoSeleccionado(seguimiento)
    setMostrarFormulario(false)
    setMensaje('')
  }

  useEffect(() => {
    obtenerSeguimientos()
  }, [])

  return (
    <main className="dashboard-page">
      <Navbar />

      <section className="module-header">
        <div className="container">
          <p className="section-label dark">Módulo administrador</p>
          <h1>Bitácora de seguimientos</h1>
          <p>
            Registro histórico del avance posterior a una solicitud aprobada.
            Cada seguimiento representa una acción del proceso laboral, como
            contacto, entrevista, selección o cierre.
          </p>
        </div>
      </section>

      <section className="container module-content">
        <div className="module-card mb-4">
          <div className="module-card-header">
            <div>
              <h2>Panel de acciones</h2>
              <p>
                Registra nuevos avances y consulta el historial de seguimiento
                asociado a solicitudes, empresas y talentos.
              </p>
            </div>

            <div className="d-flex gap-2 flex-wrap">
              <button className="btn btn-outline-primary" onClick={obtenerSeguimientos}>
                Actualizar listado
              </button>

              <button className="btn btn-primary" onClick={abrirFormularioCrear}>
                Nuevo seguimiento
              </button>
            </div>
          </div>

          {mensaje && (
            <div className={`alert alert-${tipoMensaje}`}>
              {mensaje}
            </div>
          )}
        </div>

        {mostrarFormulario && (
          <div className="module-card mb-4">
            <div className="module-card-header">
              <div>
                <h2>Registrar nuevo seguimiento</h2>
                <p>
                  Agrega un nuevo avance al historial del proceso. Usa los ID reales
                  de la solicitud, empresa y talento relacionados.
                </p>
              </div>

              <button className="btn btn-outline-secondary" onClick={cerrarFormulario}>
                Cancelar
              </button>
            </div>

            <form onSubmit={guardarSeguimiento}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">ID Solicitud</label>
                  <input
                    type="number"
                    className="form-control"
                    name="solicitud_contacto_id"
                    value={formulario.solicitud_contacto_id}
                    onChange={manejarCambio}
                    placeholder="Ej: 1"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Etapa</label>
                  <input
                    type="text"
                    className="form-control"
                    name="etapa"
                    value={formulario.etapa}
                    onChange={manejarCambio}
                    placeholder="Ej: Contacto, Entrevista, Cierre"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Estado del proceso</label>
                  <select
                    className="form-select"
                    name="estado_seguimiento"
                    value={formulario.estado_seguimiento}
                    onChange={manejarCambio}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="contactado">Contactado</option>
                    <option value="entrevista">Entrevista</option>
                    <option value="seleccionado">Seleccionado</option>
                    <option value="no_seleccionado">No seleccionado</option>
                    <option value="finalizado">Finalizado</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label">Notas internas</label>
                  <textarea
                    className="form-control"
                    name="notas_internas"
                    value={formulario.notas_internas}
                    onChange={manejarCambio}
                    rows="3"
                    placeholder="Ej: Se contactó al talento y se agendó entrevista."
                  />
                </div>
              </div>

              <div className="mt-4">
                <button type="submit" className="btn btn-primary">
                  Registrar seguimiento
                </button>
              </div>
            </form>
          </div>
        )}

        {seguimientoSeleccionado && !mostrarFormulario && (
          <div className="module-card mb-4">
            <div className="module-card-header">
              <div>
                <h2>Detalle de seguimiento</h2>
                <p>
                  Información registrada como parte del historial del proceso laboral.
                </p>
              </div>

              <button
                className="btn btn-outline-secondary"
                onClick={() => setSeguimientoSeleccionado(null)}
              >
                Cerrar detalle
              </button>
            </div>

            <div className="row g-3">
              <div className="col-md-3">
                <strong>ID seguimiento</strong>
                <p>{seguimientoSeleccionado.id}</p>
              </div>

              <div className="col-md-3">
                <strong>Solicitud</strong>
                <p>{obtenerSolicitud(seguimientoSeleccionado)}</p>
              </div>

              <div className="col-md-3">
                <strong>Empresa</strong>
                <p>{obtenerEmpresa(seguimientoSeleccionado)}</p>
              </div>

              <div className="col-md-3">
                <strong>Talento</strong>
                <p>{obtenerTalento(seguimientoSeleccionado)}</p>
              </div>

              <div className="col-md-3">
                <strong>Tipo</strong>
                <p>{obtenerTipo(seguimientoSeleccionado)}</p>
              </div>

              <div className="col-md-3">
                <strong>Estado</strong>
                <p>
                  <span className="badge text-bg-info">
                    {obtenerEstado(seguimientoSeleccionado)}
                  </span>
                </p>
              </div>

              <div className="col-md-3">
                <strong>Fecha</strong>
                <p>{obtenerFecha(seguimientoSeleccionado)}</p>
              </div>

              <div className="col-12">
                <strong>Descripción</strong>
                <p>{obtenerDescripcion(seguimientoSeleccionado)}</p>
              </div>
            </div>
          </div>
        )}

        <div className="module-card">
          <div className="module-card-header">
            <div>
              <h2>Historial de seguimientos</h2>
              <p>
                Cada registro corresponde a un avance dentro del proceso laboral.
              </p>
            </div>
          </div>

          {cargando && (
            <div className="alert alert-info">
              Cargando seguimientos desde el backend...
            </div>
          )}

          {!cargando && seguimientos.length === 0 && !mensaje && (
            <div className="alert alert-secondary">
              No hay seguimientos registrados para mostrar.
            </div>
          )}

          {seguimientos.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Solicitud</th>
                    <th>Empresa</th>
                    <th>Talento</th>
                    <th>Tipo</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {seguimientos.map((seguimiento) => (
                    <tr key={seguimiento.id}>
                      <td>{seguimiento.id}</td>
                      <td>{obtenerSolicitud(seguimiento)}</td>
                      <td>{obtenerEmpresa(seguimiento)}</td>
                      <td>{obtenerTalento(seguimiento)}</td>
                      <td>{obtenerTipo(seguimiento)}</td>
                      <td>{obtenerDescripcion(seguimiento)}</td>

                      <td>
                        <span className="badge text-bg-info">
                          {obtenerEstado(seguimiento)}
                        </span>
                      </td>

                      <td>{obtenerFecha(seguimiento)}</td>

                      <td>
                        <div className="table-actions">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => verSeguimiento(seguimiento)}
                          >
                            Ver
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Seguimientos
