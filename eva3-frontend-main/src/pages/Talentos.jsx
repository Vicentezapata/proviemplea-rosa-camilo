import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import API_BASE from '../config/api'

const formularioInicial = {
  area_profesional: '',
  nivel_educacional: '',
  experiencia_laboral: '',
  competencias_tecnicas: '',
  pretension_renta: '',
  estado_perfil: 'en_revision',
}

function Talentos() {
  const [talentos, setTalentos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('info')

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [talentoSeleccionado, setTalentoSeleccionado] = useState(null)
  const [formulario, setFormulario] = useState(formularioInicial)

  const mostrarMensaje = (texto, tipo = 'info') => {
    setMensaje(texto)
    setTipoMensaje(tipo)
  }

  const obtenerArea = (talento) => talento?.area_profesional || 'Sin información'
  const obtenerEducacion = (talento) => talento?.nivel_educacional || 'Sin información'
  const obtenerExperiencia = (talento) => talento?.experiencia_laboral || 'Sin información'
  const obtenerCompetencias = (talento) => talento?.competencias_tecnicas || 'Sin información'
  const obtenerCodigo = (talento) => talento?.codigo_talento || `T-${talento?.id}` || 'Sin código'
  const obtenerEstado = (talento) => talento?.estado_perfil || talento?.estado || 'Sin estado'

  const obtenerRenta = (talento) => {
    if (talento?.pretension_renta) {
      return `$${Number(talento.pretension_renta).toLocaleString('es-CL')}`
    }
    return 'Sin información'
  }

  const obtenerTalentos = async () => {
    try {
      setCargando(true)
      setMensaje('')

      const token = localStorage.getItem('token')

      const response = await fetch(`${API_BASE}/api/talentos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        mostrarMensaje(
          `Error ${response.status}: ${data.mensaje || data.message || 'No se pudieron obtener los talentos.'}`,
          'warning'
        )
        return
      }

      const lista =
        Array.isArray(data) ? data :
        Array.isArray(data.data) ? data.data :
        Array.isArray(data.talentos) ? data.talentos :
        Array.isArray(data.data?.rows) ? data.data.rows :
        Array.isArray(data.data?.items) ? data.data.items :
        []

      setTalentos(lista)
    } catch (error) {
      console.error('ERROR FETCH TALENTOS:', error)
      mostrarMensaje('Error al conectar con el backend.', 'danger')
    } finally {
      setCargando(false)
    }
  }

  const abrirFormularioCrear = () => {
    setFormulario(formularioInicial)
    setModoEdicion(false)
    setTalentoSeleccionado(null)
    setMostrarFormulario(true)
    setMensaje('')
  }

  const abrirFormularioEditar = (talento) => {
    setTalentoSeleccionado(talento)
    setModoEdicion(true)
    setFormulario({
      area_profesional: talento?.area_profesional || '',
      nivel_educacional: talento?.nivel_educacional || '',
      experiencia_laboral: talento?.experiencia_laboral || '',
      competencias_tecnicas: talento?.competencias_tecnicas || '',
      pretension_renta: talento?.pretension_renta ?? '',
      estado_perfil: talento?.estado_perfil || 'en_revision',
    })
    setMostrarFormulario(true)
    setMensaje('')
  }

  const cerrarFormulario = () => {
    setMostrarFormulario(false)
    setModoEdicion(false)
    setTalentoSeleccionado(null)
    setFormulario(formularioInicial)
  }

  const manejarCambio = (e) => {
    const { name, value } = e.target
    setFormulario({ ...formulario, [name]: value })
  }

  const guardarTalento = async (e) => {
    e.preventDefault()

    if (formulario.area_profesional.trim() === '') {
      mostrarMensaje('El área profesional es obligatoria.', 'warning')
      return
    }

    try {
      const token = localStorage.getItem('token')

      const url = modoEdicion
        ? `${API_BASE}/api/talentos/${talentoSeleccionado.id}`
        : `${API_BASE}/api/talentos`

      const metodo = modoEdicion ? 'PUT' : 'POST'

      const payload = {
        area_profesional: formulario.area_profesional.trim(),
        nivel_educacional: formulario.nivel_educacional.trim(),
        experiencia_laboral: formulario.experiencia_laboral.trim(),
        competencias_tecnicas: formulario.competencias_tecnicas.trim(),
        pretension_renta: formulario.pretension_renta !== '' ? Number(formulario.pretension_renta) : null,
        estado_perfil: formulario.estado_perfil,
      }

      const response = await fetch(url, {
        method: metodo,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        mostrarMensaje(
          `Error ${response.status}: ${data.mensaje || data.message || 'No se pudo guardar el talento.'}`,
          'warning'
        )
        return
      }

      mostrarMensaje(
        modoEdicion ? 'Talento actualizado correctamente.' : 'Talento creado correctamente.',
        'success'
      )
      cerrarFormulario()
      obtenerTalentos()
    } catch (error) {
      console.error('ERROR GUARDAR TALENTO:', error)
      mostrarMensaje('Error al conectar con el backend.', 'danger')
    }
  }

  const validarTalento = async (talento) => {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`${API_BASE}/api/talentos/${talento.id}/estado`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado_perfil: 'validado', estado: 'validado' }),
      })

      const data = await response.json()

      if (!response.ok) {
        mostrarMensaje(
          `Error ${response.status}: ${data.mensaje || data.message || 'No se pudo validar el talento.'}`,
          'warning'
        )
        return
      }

      mostrarMensaje('Talento validado correctamente.', 'success')
      obtenerTalentos()
    } catch (error) {
      console.error('ERROR VALIDAR TALENTO:', error)
      mostrarMensaje('Error al conectar con el backend.', 'danger')
    }
  }

  const eliminarTalento = async (talento) => {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar o desactivar el talento ID ${talento.id}?`
    )

    if (!confirmar) return

    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`${API_BASE}/api/talentos/${talento.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        mostrarMensaje(
          `Error ${response.status}: ${data.mensaje || data.message || 'No se pudo eliminar el talento.'}`,
          'warning'
        )
        return
      }

      mostrarMensaje('Talento eliminado o desactivado correctamente.', 'success')
      obtenerTalentos()
    } catch (error) {
      console.error('ERROR ELIMINAR TALENTO:', error)
      mostrarMensaje('Error al conectar con el backend.', 'danger')
    }
  }

  const verTalento = (talento) => {
    setTalentoSeleccionado(talento)
    setMostrarFormulario(false)
  }

  useEffect(() => {
    obtenerTalentos()
  }, [])

  return (
    <main className="dashboard-page">
      <Navbar />

      <section className="module-header">
        <div className="container">
          <p className="section-label dark">Módulo administrador</p>
          <h1>Gestión de talentos</h1>
          <p>
            Administración de perfiles laborales registrados en ProviEmplea. Desde este módulo
            el administrador municipal puede listar, revisar, crear, editar, validar
            o eliminar talentos.
          </p>
        </div>
      </section>

      <section className="container module-content">
        <div className="module-card mb-4">
          <div className="module-card-header">
            <div>
              <h2>Panel de acciones</h2>
              <p>Acciones disponibles para la gestión municipal de talentos.</p>
            </div>

            <div className="d-flex gap-2 flex-wrap">
              <button className="btn btn-outline-primary" onClick={obtenerTalentos}>
                Actualizar listado
              </button>

              <button className="btn btn-primary" onClick={abrirFormularioCrear}>
                Nuevo talento
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
                <h2>{modoEdicion ? 'Editar talento' : 'Crear talento'}</h2>
                <p>Completa los datos profesionales del talento para su gestión en la plataforma.</p>
              </div>

              <button className="btn btn-outline-secondary" onClick={cerrarFormulario}>
                Cancelar
              </button>
            </div>

            <form onSubmit={guardarTalento}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Área profesional</label>
                  <input
                    type="text"
                    className="form-control"
                    name="area_profesional"
                    value={formulario.area_profesional}
                    onChange={manejarCambio}
                    placeholder="Ej: Administración, Tecnología, Comercio"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Nivel educacional</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nivel_educacional"
                    value={formulario.nivel_educacional}
                    onChange={manejarCambio}
                    placeholder="Ej: Técnico, Universitario, Postgrado"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Experiencia laboral</label>
                  <textarea
                    className="form-control"
                    name="experiencia_laboral"
                    value={formulario.experiencia_laboral}
                    onChange={manejarCambio}
                    rows="2"
                    placeholder="Ej: 3 años en área administrativa"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Competencias técnicas</label>
                  <textarea
                    className="form-control"
                    name="competencias_tecnicas"
                    value={formulario.competencias_tecnicas}
                    onChange={manejarCambio}
                    rows="2"
                    placeholder="Ej: Excel, SAP, Atención al cliente"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Pretensión de renta</label>
                  <input
                    type="number"
                    className="form-control"
                    name="pretension_renta"
                    value={formulario.pretension_renta}
                    onChange={manejarCambio}
                    placeholder="Ej: 600000"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Estado del perfil</label>
                  <select
                    className="form-select"
                    name="estado_perfil"
                    value={formulario.estado_perfil}
                    onChange={manejarCambio}
                  >
                    <option value="en_revision">En revisión</option>
                    <option value="validado">Validado</option>
                    <option value="rechazado">Rechazado</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <button type="submit" className="btn btn-primary">
                  {modoEdicion ? 'Actualizar talento' : 'Crear talento'}
                </button>
              </div>
            </form>
          </div>
        )}

        {talentoSeleccionado && !mostrarFormulario && (
          <div className="module-card mb-4">
            <div className="module-card-header">
              <div>
                <h2>Detalle de talento</h2>
                <p>Información seleccionada para revisión administrativa.</p>
              </div>

              <button
                className="btn btn-outline-secondary"
                onClick={() => setTalentoSeleccionado(null)}
              >
                Cerrar detalle
              </button>
            </div>

            <div className="row g-3">
              <div className="col-md-4">
                <strong>Código</strong>
                <p>{obtenerCodigo(talentoSeleccionado)}</p>
              </div>

              <div className="col-md-4">
                <strong>Área profesional</strong>
                <p>{obtenerArea(talentoSeleccionado)}</p>
              </div>

              <div className="col-md-4">
                <strong>Estado</strong>
                <p>
                  <span className="badge text-bg-info">
                    {obtenerEstado(talentoSeleccionado)}
                  </span>
                </p>
              </div>

              <div className="col-md-4">
                <strong>Educación</strong>
                <p>{obtenerEducacion(talentoSeleccionado)}</p>
              </div>

              <div className="col-md-4">
                <strong>Renta pretendida</strong>
                <p>{obtenerRenta(talentoSeleccionado)}</p>
              </div>

              <div className="col-12">
                <strong>Experiencia laboral</strong>
                <p>{obtenerExperiencia(talentoSeleccionado)}</p>
              </div>

              <div className="col-12">
                <strong>Competencias técnicas</strong>
                <p>{obtenerCompetencias(talentoSeleccionado)}</p>
              </div>
            </div>
          </div>
        )}

        <div className="module-card">
          <div className="module-card-header">
            <div>
              <h2>Talentos registrados</h2>
              <p>Perfiles laborales disponibles para vinculación con empresas.</p>
            </div>
          </div>

          {cargando && (
            <div className="alert alert-info">
              Cargando talentos desde el backend...
            </div>
          )}

          {!cargando && talentos.length === 0 && !mensaje && (
            <div className="alert alert-secondary">
              No hay talentos registrados para mostrar.
            </div>
          )}

          {talentos.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Código</th>
                    <th>Área</th>
                    <th>Educación</th>
                    <th>Renta</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {talentos.map((talento) => {
                    const estado = obtenerEstado(talento)

                    return (
                      <tr key={talento.id}>
                        <td>{talento.id}</td>
                        <td>{obtenerCodigo(talento)}</td>
                        <td>{obtenerArea(talento)}</td>
                        <td>{obtenerEducacion(talento)}</td>
                        <td>{obtenerRenta(talento)}</td>

                        <td>
                          <span className="badge text-bg-info">
                            {estado}
                          </span>
                        </td>

                        <td>
                          <div className="table-actions">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => verTalento(talento)}
                            >
                              Ver
                            </button>

                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => abrirFormularioEditar(talento)}
                            >
                              Editar
                            </button>

                            {estado !== 'validado' && (
                              <button
                                className="btn btn-sm btn-outline-success"
                                onClick={() => validarTalento(talento)}
                              >
                                Validar
                              </button>
                            )}

                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => eliminarTalento(talento)}
                            >
                              Eliminar
                            </button>
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

export default Talentos
