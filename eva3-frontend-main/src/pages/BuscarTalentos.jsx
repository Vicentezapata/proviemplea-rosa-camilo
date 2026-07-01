import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import API_BASE from '../config/api'

function BuscarTalentos() {
  const [talentos, setTalentos] = useState([])
  const [cargando, setCargando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('warning')

  const [areaProfesional, setAreaProfesional] = useState('')
  const [pretensionMaxima, setPretensionMaxima] = useState('')
  const [solicitandoId, setSolicitandoId] = useState(null)

  const mostrarMensaje = (texto, tipo = 'warning') => {
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

  const obtenerArea = (talento) => talento?.area_profesional || 'Sin información'

  const obtenerEducacion = (talento) => talento?.nivel_educacional || 'Sin información'

  const obtenerExperiencia = (talento) => talento?.experiencia_laboral || 'Sin información'

  const obtenerCompetencias = (talento) => talento?.competencias_tecnicas || 'Sin información'

  const obtenerEstado = (talento) => talento?.estado_perfil || talento?.estado || 'Sin estado'

  const obtenerRenta = (talento) => {
    if (talento?.pretension_renta) {
      return `$${Number(talento.pretension_renta).toLocaleString('es-CL')}`
    }

    return 'Sin información'
  }

  const buscarTalentos = async () => {
    try {
      setCargando(true)
      setMensaje('')

      const token = localStorage.getItem('token')

      const params = new URLSearchParams()

      if (areaProfesional.trim() !== '') {
        params.append('area_profesional', areaProfesional.trim())
      }

      if (pretensionMaxima.trim() !== '') {
        params.append('pretension_renta_max', pretensionMaxima.trim())
      }

      params.append('page', '1')
      params.append('limit', '10')

      const response = await fetch(`${API_BASE}/api/talentos?${params.toString()}`, {
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
        []

      setTalentos(lista)

      if (lista.length === 0) {
        mostrarMensaje('No se encontraron perfiles con los filtros ingresados.', 'info')
      }
    } catch (error) {
      console.error('ERROR BUSCAR TALENTOS:', error)
      mostrarMensaje('Error al conectar con el backend.', 'danger')
    } finally {
      setCargando(false)
    }
  }

  const limpiarFiltros = () => {
    setAreaProfesional('')
    setPretensionMaxima('')
    setMensaje('')
  }

  const solicitarContacto = async (talento) => {
    const usuario = obtenerUsuario()

    if (!usuario?.empresa_id) {
      mostrarMensaje('No se encontró empresa asociada al usuario autenticado.', 'warning')
      return
    }

    const confirmar = window.confirm(
      `¿Deseas solicitar contacto para el perfil ID ${talento.id}?`
    )

    if (!confirmar) return

    try {
      setSolicitandoId(talento.id)
      setMensaje('')

      const token = localStorage.getItem('token')

      const payload = {
        empresa_id: usuario.empresa_id,
        talento_id: talento.id,
        estado_solicitud: 'pendiente',
        mensaje: `Empresa solicita contacto con perfil del área ${obtenerArea(talento)}.`,
      }

      const response = await fetch(`${API_BASE}/api/solicitudes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        mostrarMensaje(
          `Error ${response.status}: ${data.mensaje || data.message || 'No se pudo enviar la solicitud.'}`,
          'warning'
        )
        return
      }

      mostrarMensaje(
        'Solicitud enviada correctamente. La Municipalidad revisará el contacto solicitado.',
        'success'
      )
    } catch (error) {
      console.error('ERROR SOLICITAR CONTACTO:', error)
      mostrarMensaje('Error al conectar con el backend.', 'danger')
    } finally {
      setSolicitandoId(null)
    }
  }

  useEffect(() => {
    buscarTalentos()
  }, [])

  return (
    <main className="dashboard-page">
      <Navbar />

      <section className="module-header">
        <div className="container">
          <p className="section-label dark">Portal empresa</p>
          <h1>Explorar perfiles laborales</h1>
          <p>
            Encuentra personas disponibles según área profesional y pretensión de renta.
            La información personal se mantiene protegida hasta que la Municipalidad
            apruebe la solicitud de contacto.
          </p>
        </div>
      </section>

      <section className="container module-content">
        <div className="module-card mb-4">
          <div className="module-card-header">
            <div>
              <h2>Buscar perfiles</h2>
              <p>
                Filtra perfiles laborales disponibles y solicita contacto cuando
                encuentres una opción adecuada.
              </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-5">
              <label className="form-label">Área profesional</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej: Administración, Tecnología, Comercio"
                value={areaProfesional}
                onChange={(e) => setAreaProfesional(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Renta máxima</label>
              <input
                type="number"
                className="form-control"
                placeholder="Ej: 900000"
                value={pretensionMaxima}
                onChange={(e) => setPretensionMaxima(e.target.value)}
              />
            </div>

            <div className="col-md-3 d-flex align-items-end gap-2">
              <button className="btn btn-primary w-100" onClick={buscarTalentos}>
                Buscar
              </button>

              <button className="btn btn-outline-secondary w-100" onClick={limpiarFiltros}>
                Limpiar
              </button>
            </div>
          </div>
        </div>

        <div className="module-card">
          <div className="module-card-header">
            <div>
              <h2>Perfiles disponibles</h2>
              <p>
                Revisa antecedentes laborales y solicita contacto para iniciar el
                proceso con apoyo municipal.
              </p>
            </div>

            <button className="btn btn-outline-primary" onClick={buscarTalentos}>
              Actualizar
            </button>
          </div>

          {cargando && (
            <div className="alert alert-info">
              Buscando perfiles disponibles...
            </div>
          )}

          {mensaje && (
            <div className={`alert alert-${tipoMensaje}`}>
              {mensaje}
            </div>
          )}

          {talentos.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Área</th>
                    <th>Educación</th>
                    <th>Experiencia</th>
                    <th>Competencias</th>
                    <th>Renta</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {talentos.map((talento) => (
                    <tr key={talento.id}>
                      <td>{talento.id}</td>
                      <td>{obtenerArea(talento)}</td>
                      <td>{obtenerEducacion(talento)}</td>
                      <td>{obtenerExperiencia(talento)}</td>
                      <td>{obtenerCompetencias(talento)}</td>
                      <td>{obtenerRenta(talento)}</td>
                      <td>
                        <span className="badge text-bg-info">
                          {obtenerEstado(talento)}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => solicitarContacto(talento)}
                          disabled={solicitandoId === talento.id}
                        >
                          {solicitandoId === talento.id
                            ? 'Enviando...'
                            : 'Solicitar contacto'}
                        </button>
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

export default BuscarTalentos
