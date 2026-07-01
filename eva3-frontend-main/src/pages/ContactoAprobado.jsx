import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import API_BASE from '../config/api'

function ContactoAprobado() {
  const [searchParams] = useSearchParams()

  const [solicitudId, setSolicitudId] = useState(searchParams.get('solicitud_id') || '')
  const [cargando, setCargando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('info')
  const [resultado, setResultado] = useState(null)

  const mostrarMensaje = (texto, tipo = 'info') => {
    setMensaje(texto)
    setTipoMensaje(tipo)
  }

  const extraerSolicitud = (data) => {
    return data?.solicitud || data?.data?.solicitud || data?.data || data || null
  }

  const extraerContacto = (data) => {
    return data?.contacto || data?.data?.contacto || data?.talento || data?.data?.talento || data?.data || null
  }

  const obtenerValor = (...valores) => {
    const valor = valores.find((item) => item !== undefined && item !== null && item !== '')
    return valor || 'Sin información'
  }

  const consultarContacto = async (idParam = solicitudId) => {
    const id = String(idParam).trim()

    if (id === '') {
      mostrarMensaje('Ingresa el ID de una solicitud aprobada.', 'warning')
      setResultado(null)
      return
    }

    if (isNaN(Number(id))) {
      mostrarMensaje('El ID de solicitud debe ser numérico.', 'warning')
      setResultado(null)
      return
    }

    try {
      setCargando(true)
      setMensaje('')
      setResultado(null)

      const token = localStorage.getItem('token')

      const response = await fetch(`${API_BASE}/api/v1/solicitudes/${id}/contacto`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok) {
        setResultado({
          solicitud: extraerSolicitud(data),
          contacto: extraerContacto(data),
        })

        mostrarMensaje('Contacto autorizado encontrado correctamente.', 'success')
        return
      }

      const ultimaRespuesta = {
        status: response.status,
        data,
      }

      const textoError =
        ultimaRespuesta?.data?.mensaje ||
        ultimaRespuesta?.data?.message ||
        'No se pudo consultar el contacto.'

      if (ultimaRespuesta?.status === 403 || ultimaRespuesta?.status === 401) {
        mostrarMensaje(
          'No tienes autorización para ver este contacto o la sesión expiró.',
          'warning'
        )
        return
      }

      if (ultimaRespuesta?.status === 400 || ultimaRespuesta?.status === 409) {
        mostrarMensaje(
          'El contacto todavía no está disponible. La solicitud debe estar aprobada por la Municipalidad.',
          'info'
        )
        return
      }

      mostrarMensaje(`No se pudo consultar el contacto: ${textoError}`, 'warning')
    } catch (error) {
      console.error('ERROR CONSULTAR CONTACTO:', error)
      mostrarMensaje('Error al conectar con el backend.', 'danger')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    const idDesdeUrl = searchParams.get('solicitud_id')

    if (idDesdeUrl) {
      setSolicitudId(idDesdeUrl)
      consultarContacto(idDesdeUrl)
    }
  }, [])

  return (
    <main className="dashboard-page">
      <Navbar />

      <section className="module-header">
        <div className="container">
          <p className="section-label dark">Portal empresa</p>
          <h1>Contacto autorizado</h1>
          <p>
            Consulta los datos de contacto autorizados por la Municipalidad para
            continuar el proceso laboral.
          </p>
        </div>
      </section>

      <section className="container module-content">
        <div className="module-card mb-4">
          <div className="module-card-header">
            <div>
              <h2>Buscar contacto autorizado</h2>
              <p>
                Ingresa el ID de una solicitud aprobada o accede desde el botón
                “Ver contacto” en Mis solicitudes.
              </p>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-md-8">
              <label className="form-label">ID de solicitud</label>
              <input
                type="number"
                className="form-control"
                value={solicitudId}
                onChange={(e) => setSolicitudId(e.target.value)}
                placeholder="Ej: 1"
              />
            </div>

            <div className="col-md-4 d-flex align-items-end">
              <button
                className="btn btn-primary w-100"
                onClick={() => consultarContacto()}
                disabled={cargando}
              >
                {cargando ? 'Consultando...' : 'Ver contacto'}
              </button>
            </div>
          </div>

          {mensaje && (
            <div className={`alert alert-${tipoMensaje} mt-4`}>
              {mensaje}
            </div>
          )}
        </div>

        {resultado && (
          <>
            <div className="module-card mb-4">
              <div className="module-card-header">
                <div>
                  <h2>Detalle de solicitud</h2>
                  <p>Información de la solicitud aprobada por la Municipalidad.</p>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-4">
                  <strong>ID solicitud</strong>
                  <p>{obtenerValor(resultado.solicitud?.id, solicitudId)}</p>
                </div>

                <div className="col-md-4">
                  <strong>Estado</strong>
                  <p>
                    <span className="badge text-bg-info">
                      {obtenerValor(
                        resultado.solicitud?.estado_solicitud,
                        resultado.solicitud?.estado,
                        'aprobada'
                      )}
                    </span>
                  </p>
                </div>

                <div className="col-md-4">
                  <strong>Empresa ID</strong>
                  <p>
                    {obtenerValor(
                      resultado.solicitud?.empresa_id,
                      resultado.solicitud?.empresaId,
                      resultado.solicitud?.Empresa?.id
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="module-card">
              <div className="module-card-header">
                <div>
                  <h2>Contacto liberado</h2>
                  <p>Datos visibles solo después de la aprobación municipal.</p>
                </div>
              </div>

              <div className="contact-grid">
                <div className="contact-card">
                  <span>👤</span>
                  <strong>Nombre</strong>
                  <p>
                    {obtenerValor(
                      resultado.contacto?.nombre,
                      resultado.contacto?.nombre_completo
                    )}
                  </p>
                </div>

                <div className="contact-card">
                  <span>📧</span>
                  <strong>Correo</strong>
                  <p>
                    {obtenerValor(
                      resultado.contacto?.correo,
                      resultado.contacto?.email
                    )}
                  </p>
                </div>

                <div className="contact-card">
                  <span>📞</span>
                  <strong>Teléfono</strong>
                  <p>
                    {obtenerValor(
                      resultado.contacto?.telefono,
                      resultado.contacto?.telefono_contacto
                    )}
                  </p>
                </div>

                <div className="contact-card">
                  <span>💼</span>
                  <strong>Área profesional</strong>
                  <p>
                    {obtenerValor(
                      resultado.contacto?.area_profesional,
                      resultado.solicitud?.Talento?.area_profesional,
                      resultado.solicitud?.talento?.area_profesional
                    )}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default ContactoAprobado
