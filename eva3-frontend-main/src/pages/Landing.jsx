import { Link } from 'react-router-dom'
import logoProvidencia from '../assets/img/logo_providencia.png'

function Landing() {
  return (
    <main className="landing-institucional">
      <section className="landing-hero">
        <div className="container">
          <nav className="landing-navbar">
            <div className="landing-brand">
              <img
                src={logoProvidencia}
                alt="Logo Municipalidad de Providencia"
                className="logo-providencia"
              />

              <div className="brand-text">
                <strong>ProviEmplea</strong>
                <span>Plataforma municipal de empleabilidad</span>
              </div>
            </div>

            <div className="landing-menu">
              <a href="#como-funciona">Cómo funciona</a>
              <a href="#beneficios">Beneficios</a>
              <Link to="/login" className="btn btn-primary">
                Iniciar sesión
              </Link>
            </div>
          </nav>

          <div className="row align-items-center hero-institucional-content">
            <div className="col-lg-6">
              <p className="section-label">Municipalidad de Providencia</p>

              <h1>
                Impulsamos oportunidades laborales para personas y empresas
              </h1>

              <p className="hero-description">
                ProviEmplea es una plataforma municipal orientada a conectar
                talentos con empresas, facilitando procesos de intermediación
                laboral de manera segura, inclusiva y organizada.
              </p>

              <div className="hero-buttons">
                <a href="#como-funciona" className="btn btn-light btn-lg">
                  Conocer la plataforma
                </a>

                <Link to="/login" className="btn btn-outline-light btn-lg">
                  Acceder al sistema
                </Link>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="institutional-card">
                <div className="card-label">ProviEmplea</div>

                <h2>Vinculación laboral con apoyo municipal</h2>

                <p>
                  La plataforma permite registrar talentos, gestionar empresas,
                  revisar solicitudes de contacto y realizar seguimiento a los
                  procesos laborales.
                </p>

                <div className="mini-stats">
                  <div>
                    <strong>CV Ciego</strong>
                    <span>Protección de datos personales</span>
                  </div>

                  <div>
                    <strong>Empresas</strong>
                    <span>Búsqueda de perfiles laborales</span>
                  </div>

                  <div>
                    <strong>Seguimiento</strong>
                    <span>Acompañamiento del proceso</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="beneficios" className="benefits-section">
        <div className="container">
          <div className="text-center mb-5">
            <p className="section-label dark">Beneficios</p>
            <h2 className="section-title">
              Una plataforma para fortalecer la empleabilidad local
            </h2>
            <p className="section-description">
              ProviEmplea organiza la relación entre personas, empresas y la
              Municipalidad, entregando una experiencia clara y confiable.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="benefit-card">
                <span>👥</span>
                <h3>Para personas</h3>
                <p>
                  Permite visibilizar perfiles laborales y facilitar nuevas
                  oportunidades de empleo.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="benefit-card">
                <span>🏢</span>
                <h3>Para empresas</h3>
                <p>
                  Facilita la búsqueda de talentos según área profesional,
                  experiencia y necesidades laborales.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="benefit-card">
                <span>🤝</span>
                <h3>Apoyo municipal</h3>
                <p>
                  La Municipalidad valida perfiles, revisa solicitudes y
                  acompaña el proceso de vinculación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="steps-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <p className="section-label dark">Cómo funciona</p>
              <h2 className="section-title">
                Un flujo simple, seguro y ordenado
              </h2>
              <p className="section-description text-start">
                El sistema permite administrar la información laboral y controlar
                cuándo se liberan los datos de contacto, respetando el proceso
                de aprobación municipal.
              </p>
            </div>

            <div className="col-lg-7">
              <div className="steps-list">
                <div className="step-item">
                  <span>01</span>
                  <div>
                    <h3>Registro y validación</h3>
                    <p>
                      La Municipalidad registra y valida los perfiles laborales.
                    </p>
                  </div>
                </div>

                <div className="step-item">
                  <span>02</span>
                  <div>
                    <h3>Búsqueda con CV Ciego</h3>
                    <p>
                      Las empresas visualizan información profesional sin datos
                      personales sensibles.
                    </p>
                  </div>
                </div>

                <div className="step-item">
                  <span>03</span>
                  <div>
                    <h3>Solicitud y contacto</h3>
                    <p>
                      Si la solicitud es aprobada, el sistema libera el contacto
                      del talento correspondiente.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link to="/login" className="btn btn-primary btn-lg">
              Iniciar sesión en ProviEmplea
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Landing