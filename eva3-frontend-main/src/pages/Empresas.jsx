import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import API_BASE from '../config/api'

const formularioInicial = {
  nombre_empresa: '',
  rut_empresa: '',
  correo: '',
  telefono_contacto: '',
  rubro: '',
  estado_validacion: 'pendiente',
}

function Empresas() {
  const [empresas, setEmpresas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('info')

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null)
  const [formulario, setFormulario] = useState(formularioInicial)

  const mostrarMensaje = (texto, tipo = 'info') => {
    setMensaje(texto)
    setTipoMensaje(tipo)
  }

  const obtenerNombreEmpresa = (empresa) => {
    return (
      empresa?.nombre_empresa ||
      empresa?.razon_social ||
      empresa?.nombre ||
      'Sin información'
    )
  }

  const obtenerRutEmpresa = (empresa) => {
    return empresa?.rut_empresa || empresa?.rut || 'Sin información'
  }

  const obtenerCorreoEmpresa = (empresa) => {
    return (
      empresa?.correo ||
      empresa?.correo_contacto ||
      empresa?.email_contacto ||
      empresa?.email ||
      'Sin información'
    )
  }

  const obtenerTelefonoEmpresa = (empresa) => {
    return empresa?.telefono_contacto || empresa?.telefono || 'Sin información'
  }

  const obtenerRubroEmpresa = (empresa) => {
    return empresa?.rubro || empresa?.giro || 'Sin información'
  }

  const obtenerEstadoEmpresa = (empresa) => {
    return (
      empresa?.estado_validacion ||
      empresa?.estado_empresa ||
      empresa?.estado ||
      'Sin estado'
    )
  }

  const obtenerEmpresas = async () => {
    try {
      setCargando(true)
      setMensaje('')

      const token = localStorage.getItem('token')

      const response = await fetch(`${API_BASE}/api/empresas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        mostrarMensaje(
          `Error ${response.status}: ${data.mensaje || data.message || 'No se pudieron obtener las empresas.'}`,
          'warning'
        )
        return
      }

      const lista =
        Array.isArray(data) ? data :
        Array.isArray(data.data) ? data.data :
        Array.isArray(data.empresas) ? data.empresas :
        Array.isArray(data.data?.rows) ? data.data.rows :
        Array.isArray(data.data?.items) ? data.data.items :
        []

      setEmpresas(lista)
    } catch (error) {
      console.error('ERROR FETCH EMPRESAS:', error)
      mostrarMensaje('Error al conectar con el backend.', 'danger')
    } finally {
      setCargando(false)
    }
  }

  const abrirFormularioCrear = () => {
    setFormulario(formularioInicial)
    setModoEdicion(false)
    setEmpresaSeleccionada(null)
    setMostrarFormulario(true)
    setMensaje('')
  }

  const abrirFormularioEditar = (empresa) => {
    setEmpresaSeleccionada(empresa)
    setModoEdicion(true)

    setFormulario({
      nombre_empresa: obtenerNombreEmpresa(empresa) !== 'Sin información'
        ? obtenerNombreEmpresa(empresa)
        : '',
      rut_empresa: obtenerRutEmpresa(empresa) !== 'Sin información'
        ? obtenerRutEmpresa(empresa)
        : '',
      correo: obtenerCorreoEmpresa(empresa) !== 'Sin información'
        ? obtenerCorreoEmpresa(empresa)
        : '',
      telefono_contacto: obtenerTelefonoEmpresa(empresa) !== 'Sin información'
        ? obtenerTelefonoEmpresa(empresa)
        : '',
      rubro: obtenerRubroEmpresa(empresa) !== 'Sin información'
        ? obtenerRubroEmpresa(empresa)
        : '',
      estado_validacion: obtenerEstadoEmpresa(empresa) !== 'Sin estado'
        ? obtenerEstadoEmpresa(empresa)
        : 'pendiente',
    })

    setMostrarFormulario(true)
    setMensaje('')
  }

  const cerrarFormulario = () => {
    setMostrarFormulario(false)
    setModoEdicion(false)
    setEmpresaSeleccionada(null)
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
      nombre_empresa: formulario.nombre_empresa.trim(),
      razon_social: formulario.nombre_empresa.trim(),

      rut_empresa: formulario.rut_empresa.trim(),
      rut: formulario.rut_empresa.trim(),

      correo: formulario.correo.trim(),
      correo_contacto: formulario.correo.trim(),

      telefono_contacto: formulario.telefono_contacto.trim(),
      telefono: formulario.telefono_contacto.trim(),

      rubro: formulario.rubro.trim(),

      estado_validacion: formulario.estado_validacion,
      estado: formulario.estado_validacion,
    }
  }

  const guardarEmpresa = async (e) => {
    e.preventDefault()

    if (
      formulario.nombre_empresa.trim() === '' ||
      formulario.rut_empresa.trim() === '' ||
      formulario.correo.trim() === '' ||
      formulario.rubro.trim() === ''
    ) {
      mostrarMensaje('Razón social, RUT, correo y rubro son obligatorios.', 'warning')
      return
    }

    try {
      const token = localStorage.getItem('token')

      const url = modoEdicion
        ? `${API_BASE}/api/empresas/${empresaSeleccionada.id}`
        : `${API_BASE}/api/empresas`

      const metodo = modoEdicion ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method: metodo,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(construirPayload()),
      })

      const data = await response.json()

      if (!response.ok) {
        mostrarMensaje(
          `Error ${response.status}: ${data.mensaje || data.message || 'No se pudo guardar la empresa.'}`,
          'warning'
        )
        return
      }

      mostrarMensaje(
        modoEdicion
          ? 'Empresa actualizada correctamente.'
          : 'Empresa creada correctamente.',
        'success'
      )

      cerrarFormulario()
      obtenerEmpresas()
    } catch (error) {
      console.error('ERROR GUARDAR EMPRESA:', error)
      mostrarMensaje('Error al conectar con el backend.', 'danger')
    }
  }

  const validarEmpresa = async (empresa) => {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`${API_BASE}/api/empresas/${empresa.id}/validacion`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          estado_validacion: 'validada',
          estado: 'validada',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        mostrarMensaje(
          `Error ${response.status}: ${data.mensaje || data.message || 'No se pudo validar la empresa.'}`,
          'warning'
        )
        return
      }

      mostrarMensaje('Empresa validada correctamente.', 'success')
      obtenerEmpresas()
    } catch (error) {
      console.error('ERROR VALIDAR EMPRESA:', error)
      mostrarMensaje('Error al conectar con el backend.', 'danger')
    }
  }

  const eliminarEmpresa = async (empresa) => {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar o desactivar la empresa "${obtenerNombreEmpresa(empresa)}"?`
    )

    if (!confirmar) return

    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`${API_BASE}/api/empresas/${empresa.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        mostrarMensaje(
          `Error ${response.status}: ${data.mensaje || data.message || 'No se pudo eliminar la empresa.'}`,
          'warning'
        )
        return
      }

      mostrarMensaje('Empresa eliminada o desactivada correctamente.', 'success')
      obtenerEmpresas()
    } catch (error) {
      console.error('ERROR ELIMINAR EMPRESA:', error)
      mostrarMensaje('Error al conectar con el backend.', 'danger')
    }
  }

  const verEmpresa = (empresa) => {
    setEmpresaSeleccionada(empresa)
    setMostrarFormulario(false)
  }

  useEffect(() => {
    obtenerEmpresas()
  }, [])

  return (
    <main className="dashboard-page">
      <Navbar />

      <section className="module-header">
        <div className="container">
          <p className="section-label dark">Módulo administrador</p>
          <h1>Gestión de empresas</h1>
          <p>
            Administración de empresas registradas en ProviEmplea. Desde este módulo
            el administrador municipal puede listar, revisar, crear, editar, validar
            o eliminar empresas.
          </p>
        </div>
      </section>

      <section className="container module-content">
        <div className="module-card mb-4">
          <div className="module-card-header">
            <div>
              <h2>Panel de acciones</h2>
              <p>Acciones disponibles para la gestión municipal de empresas.</p>
            </div>

            <div className="d-flex gap-2 flex-wrap">
              <button className="btn btn-outline-primary" onClick={obtenerEmpresas}>
                Actualizar listado
              </button>

              <button className="btn btn-primary" onClick={abrirFormularioCrear}>
                Nueva empresa
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
                <h2>{modoEdicion ? 'Editar empresa' : 'Crear empresa'}</h2>
                <p>
                  Completa los datos principales de la empresa para su gestión en la plataforma.
                </p>
              </div>

              <button className="btn btn-outline-secondary" onClick={cerrarFormulario}>
                Cancelar
              </button>
            </div>

            <form onSubmit={guardarEmpresa}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Razón social</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre_empresa"
                    value={formulario.nombre_empresa}
                    onChange={manejarCambio}
                    placeholder="Ej: Servicios Digitales Providencia SpA"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">RUT empresa</label>
                  <input
                    type="text"
                    className="form-control"
                    name="rut_empresa"
                    value={formulario.rut_empresa}
                    onChange={manejarCambio}
                    placeholder="Ej: 76123456-7"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    name="correo"
                    value={formulario.correo}
                    onChange={manejarCambio}
                    placeholder="contacto@empresa.cl"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Teléfono contacto</label>
                  <input
                    type="text"
                    className="form-control"
                    name="telefono_contacto"
                    value={formulario.telefono_contacto}
                    onChange={manejarCambio}
                    placeholder="+56223456789"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Rubro</label>
                  <input
                    type="text"
                    className="form-control"
                    name="rubro"
                    value={formulario.rubro}
                    onChange={manejarCambio}
                    placeholder="Ej: Tecnología, Energía, Comercio"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Estado</label>
                  <select
                    className="form-select"
                    name="estado_validacion"
                    value={formulario.estado_validacion}
                    onChange={manejarCambio}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="validada">Validada</option>
                    <option value="rechazada">Rechazada</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <button type="submit" className="btn btn-primary">
                  {modoEdicion ? 'Actualizar empresa' : 'Crear empresa'}
                </button>
              </div>
            </form>
          </div>
        )}

        {empresaSeleccionada && !mostrarFormulario && (
          <div className="module-card mb-4">
            <div className="module-card-header">
              <div>
                <h2>Detalle de empresa</h2>
                <p>Información seleccionada para revisión administrativa.</p>
              </div>

              <button
                className="btn btn-outline-secondary"
                onClick={() => setEmpresaSeleccionada(null)}
              >
                Cerrar detalle
              </button>
            </div>

            <div className="row g-3">
              <div className="col-md-4">
                <strong>Razón social</strong>
                <p>{obtenerNombreEmpresa(empresaSeleccionada)}</p>
              </div>

              <div className="col-md-4">
                <strong>RUT</strong>
                <p>{obtenerRutEmpresa(empresaSeleccionada)}</p>
              </div>

              <div className="col-md-4">
                <strong>Estado</strong>
                <p>
                  <span className="badge text-bg-info">
                    {obtenerEstadoEmpresa(empresaSeleccionada)}
                  </span>
                </p>
              </div>

              <div className="col-md-4">
                <strong>Correo</strong>
                <p>{obtenerCorreoEmpresa(empresaSeleccionada)}</p>
              </div>

              <div className="col-md-4">
                <strong>Teléfono</strong>
                <p>{obtenerTelefonoEmpresa(empresaSeleccionada)}</p>
              </div>

              <div className="col-md-4">
                <strong>Rubro</strong>
                <p>{obtenerRubroEmpresa(empresaSeleccionada)}</p>
              </div>
            </div>
          </div>
        )}

        <div className="module-card">
          <div className="module-card-header">
            <div>
              <h2>Empresas registradas</h2>
              <p>Información disponible para gestión municipal y contacto laboral.</p>
            </div>
          </div>

          {cargando && (
            <div className="alert alert-info">
              Cargando empresas desde el backend...
            </div>
          )}

          {!cargando && empresas.length === 0 && !mensaje && (
            <div className="alert alert-secondary">
              No hay empresas registradas para mostrar.
            </div>
          )}

          {empresas.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Razón social</th>
                    <th>RUT</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Rubro</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {empresas.map((empresa) => {
                    const estado = obtenerEstadoEmpresa(empresa)

                    return (
                      <tr key={empresa.id}>
                        <td>{empresa.id}</td>
                        <td>{obtenerNombreEmpresa(empresa)}</td>
                        <td>{obtenerRutEmpresa(empresa)}</td>
                        <td>{obtenerCorreoEmpresa(empresa)}</td>
                        <td>{obtenerTelefonoEmpresa(empresa)}</td>
                        <td>{obtenerRubroEmpresa(empresa)}</td>

                        <td>
                          <span className="badge text-bg-info">
                            {estado}
                          </span>
                        </td>

                        <td>
                          <div className="table-actions">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => verEmpresa(empresa)}
                            >
                              Ver
                            </button>

                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => abrirFormularioEditar(empresa)}
                            >
                              Editar
                            </button>

                            {estado !== 'validada' && (
                              <button
                                className="btn btn-sm btn-outline-success"
                                onClick={() => validarEmpresa(empresa)}
                              >
                                Validar
                              </button>
                            )}

                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => eliminarEmpresa(empresa)}
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

export default Empresas
