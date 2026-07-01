# eva3-frontend

Interfaz web de ProviEmplea desarrollada con React y Vite.

---

## Requisitos previos

- [Node.js](https://nodejs.org/) v18 o superior (incluye npm)
- El backend (`eva3-backend`) corriendo en `http://localhost:3000`

---

## Instalación

**1. Clonar el repositorio**

```bash
git clone https://github.com/camilo-lavado/eva3-frontend.git
cd eva3-frontend
```

**2. Instalar dependencias**

```bash
npm install
```

**3. Iniciar el servidor de desarrollo**

```bash
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

---

## Notas

- Asegúrate de que el backend esté activo antes de iniciar el frontend.
- Para construir la versión de producción usa `npm run build`.

---

## Descripción general

ProviEmplea es un sistema frontend-backend desarrollado para una evaluación grupal, orientado a apoyar procesos de vinculación laboral desde una mirada municipal.

La plataforma permite que la Municipalidad administre perfiles laborales de personas inscritas, empresas participantes, solicitudes de contacto y seguimientos del proceso. Además, incorpora el principio de **CV Ciego**, evitando que las empresas visualicen datos personales antes de una autorización municipal.

El proyecto está compuesto por:

- **Backend:** Node.js, Express, Sequelize, MySQL, JWT y Swagger/OpenAPI.
- **Frontend:** React, Vite, JavaScript, Bootstrap, React Router DOM y Fetch API.
- **Base de datos:** MySQL mediante XAMPP.
- **Documentación técnica:** Swagger UI y README.

---

## 2. Objetivo del sistema

El objetivo principal del sistema es representar una solución municipal para gestionar procesos de empleabilidad, permitiendo:

1. Administrar perfiles laborales de personas inscritas.
2. Registrar y validar empresas participantes.
3. Permitir que empresas revisen perfiles laborales bajo modalidad de CV Ciego.
4. Gestionar solicitudes de contacto entre empresas y personas inscritas.
5. Controlar que los datos personales solo sean visibles después de una aprobación municipal.
6. Registrar seguimientos del proceso laboral.

---

## 3. Tecnologías utilizadas

### Backend

- Node.js.
- Express.
- Sequelize ORM.
- MySQL.
- JWT para autenticación.
- bcryptjs para encriptación de contraseñas.
- Swagger / OpenAPI.
- CORS.
- Helmet.
- express-rate-limit.
- Dotenv.

### Frontend

- React.
- Vite.
- JavaScript.
- Bootstrap.
- React Router DOM.
- Fetch API.
- CSS personalizado.

### Herramientas utilizadas

- Visual Studio Code.
- XAMPP.
- MySQL.
- phpMyAdmin.
- Swagger UI.
- Navegador web.
- Terminal / PowerShell.

> Nota: En este proyecto las pruebas principales no se realizaron con Postman. El backend fue validado principalmente mediante Swagger UI y el frontend fue probado desde el navegador consumiendo los endpoints mediante Fetch API.

---

## 4. Estructura general del proyecto

### Backend

Ruta local utilizada durante el desarrollo:

```txt
C:\Users\rosita\proviemplea-api-grupal\src
```

Estructura general:

```txt
src/
├── config/
├── controllers/
├── middlewares/
├── migrations/
├── models/
├── routes/
├── seeders/
├── services/
├── openapi.yaml
├── expressServer.js
└── package.json
```

### Frontend

Ruta local utilizada durante el desarrollo:

```txt
C:\Users\rosita\proviemplea-frontend
```

Estructura general:

```txt
src/
├── assets/
├── components/
├── pages/
├── App.jsx
├── main.jsx
└── index.css
```

---

## 5. Base de datos

Base de datos utilizada:

```txt
proviemplea_api_grupal
```

Tablas principales:

- `Talentos`
- `Empresas`
- `SolicitudContactos`
- `Seguimientos`
- `Catalogos`
- `UsuarioSistemas`

Se trabajó con un modelo compacto para evitar una estructura demasiado extensa. La información se organizó en módulos principales relacionados entre sí, permitiendo cubrir el flujo central del sistema sin generar tablas innecesarias.

---

## 6. Usuarios de demostración

El sistema cuenta con usuarios demo para probar los distintos roles.

### Administrador municipal

```txt
Correo: admin@proviemplea.cl
Contraseña: admin123
Rol: admin
```

### Empresa

```txt
Correo: empresa@proviemplea.cl
Contraseña: empresa123
Rol: empresa
```

### Persona inscrita / Talento

```txt
Correo: talento@proviemplea.cl
Contraseña: talento123
Rol: talento
```

Estos usuarios permiten demostrar la navegación y restricciones del sistema según el rol autenticado.

---

## 7. Instalación y ejecución

### 7.1. Levantar XAMPP

Antes de ejecutar el proyecto, se debe iniciar XAMPP y activar:

```txt
Apache
MySQL
```

Luego se puede revisar la base de datos desde:

```txt
http://localhost/phpmyadmin
```

---

### 7.2. Ejecutar backend

Entrar a la carpeta del backend:

```bash
cd C:\Users\rosita\proviemplea-api-grupal\src
```

Instalar dependencias si corresponde:

```bash
npm.cmd install
```

Ejecutar migraciones si la base de datos está vacía:

```bash
npx.cmd sequelize-cli db:migrate
```

Ejecutar seeders para cargar datos de prueba:

```bash
npx.cmd sequelize-cli db:seed:all
```

Levantar servidor:

```bash
npm.cmd start
```

El backend queda disponible en:

```txt
http://localhost:3000
```

Swagger UI queda disponible en:

```txt
http://localhost:3000/api-docs/
```

---

### 7.3. Ejecutar frontend

Entrar a la carpeta del frontend:

```bash
cd C:\Users\rosita\proviemplea-frontend
```

Instalar dependencias si corresponde:

```bash
npm.cmd install
```

Levantar frontend:

```bash
npm.cmd run dev
```

El frontend queda disponible en:

```txt
http://localhost:5173
```

---

## 8. Documentación Swagger / OpenAPI

El backend cuenta con documentación Swagger disponible en:

```txt
http://localhost:3000/api-docs/
```

La especificación OpenAPI se encuentra incluida dentro del proyecto backend en el archivo:

```txt
openapi.yaml
```

No se preparó un documento separado para Swagger, ya que la documentación forma parte del código fuente del backend y puede visualizarse directamente desde Swagger UI.

Para la entrega se debe incluir el backend completo, donde se encuentra el archivo `openapi.yaml`, además de una captura de Swagger UI funcionando.

---

## 9. Módulos desarrollados en backend

### 9.1. Autenticación

Se implementó autenticación mediante JWT.

Funcionalidades:

- Inicio de sesión.
- Generación de token.
- Protección de rutas.
- Validación por rol.
- Contraseñas encriptadas con bcryptjs.

Endpoint principal:

```txt
POST /api/auth/login
```

---

### 9.2. Talentos

El módulo Talentos permite administrar perfiles laborales de personas inscritas.

Funcionalidades:

- Listar talentos.
- Ver detalle de talento.
- Crear talento.
- Actualizar talento.
- Validar perfil.
- Eliminar lógicamente.

Campos principales:

- RUT.
- Nombre.
- Correo.
- Resumen profesional.
- Área profesional.
- Nivel educacional.
- Años de experiencia.
- Competencias.
- Pretensión de renta.
- Estado del perfil.
- Discapacidad Ley 21.015.

---

### 9.3. Empresas

El módulo Empresas permite registrar y administrar empresas participantes.

Funcionalidades:

- Listar empresas.
- Ver detalle.
- Crear empresa.
- Actualizar empresa.
- Validar empresa.
- Eliminar lógicamente.

Campos principales:

- Nombre empresa / razón social.
- RUT empresa.
- Correo.
- Teléfono.
- Rubro.
- Estado de validación.

Durante la integración con frontend se corrigió el envío de datos para cumplir con los campos obligatorios del backend, especialmente `correo` y `rubro`.

---

### 9.4. Solicitudes de contacto

El módulo Solicitudes permite que una empresa solicite contacto de una persona inscrita.

Funcionalidades:

- Listar solicitudes.
- Ver detalle.
- Crear solicitud.
- Validar solicitudes duplicadas.
- Aprobar solicitud.
- Rechazar solicitud.
- Eliminar lógicamente.

La regla principal es que una empresa no puede mantener una solicitud pendiente duplicada para el mismo talento.

Ejemplo de respuesta esperada ante duplicado:

```txt
409 Conflict
Ya existe una solicitud pendiente para esa empresa y talento.
```

---

### 9.5. Seguimientos

El módulo Seguimientos fue utilizado como bitácora del proceso laboral.

Funcionalidades:

- Listar seguimientos.
- Ver detalle.
- Crear seguimiento.
- Asociar seguimiento a solicitud, empresa y talento.
- Registrar tipo de avance.
- Registrar estado.
- Registrar descripción.

Se decidió tratar los seguimientos como registros históricos. Por eso, en el frontend se priorizó la creación de nuevos registros en vez de editar avances anteriores.

---

### 9.6. Catálogos

El módulo Catálogos permite administrar datos de apoyo para el sistema.

Funcionalidades:

- Listar catálogos.
- Crear catálogo.
- Actualizar catálogo.
- Eliminar lógicamente.

---

### 9.7. Contacto autorizado

Se implementó un endpoint protegido para mostrar datos de contacto solo cuando una solicitud está aprobada.

Endpoint:

```txt
GET /api/v1/solicitudes/:id/contacto
```

Este endpoint valida:

- Token JWT.
- Rol autorizado.
- Existencia de la solicitud.
- Estado aprobado.
- Relación entre empresa, solicitud y talento.

Si la solicitud está aprobada, el sistema muestra los datos de contacto autorizados.

---

## 10. Módulos desarrollados en frontend

### 10.1. Landing pública

Se creó una página de inicio con diseño institucional, enfocada en la presentación de ProviEmplea como plataforma municipal de apoyo a la empleabilidad.

Incluye:

- Presentación del sistema.
- Descripción del objetivo.
- Acceso al inicio de sesión.
- Lenguaje orientado a una plataforma pública.

---

### 10.2. Login

Se creó una pantalla de inicio de sesión con diseño institucional.

Funcionalidades:

- Ingreso con correo y contraseña.
- Consumo del endpoint de login.
- Almacenamiento del token en `localStorage`.
- Almacenamiento del usuario en `localStorage`.
- Redirección según rol.

Redirecciones:

```txt
admin   → /admin
empresa → /empresa
talento → /talento
```

---

### 10.3. Rutas protegidas

Se implementó un componente `ProtectedRoute` para restringir accesos según el rol autenticado.

Rutas principales:

```txt
/admin              → admin
/talentos           → admin
/empresas           → admin
/solicitudes        → admin
/seguimientos       → admin
/empresa            → empresa
/buscar-talentos    → empresa
/mis-solicitudes    → empresa
/contacto-aprobado  → empresa
/talento            → talento
```

---

### 10.4. Navbar dinámico

Se implementó un menú de navegación que cambia según el rol autenticado.

Rol administrador:

- Inicio.
- Talentos.
- Empresas.
- Solicitudes.
- Seguimientos.

Rol empresa:

- Inicio.
- Buscar talentos.
- Mis solicitudes.
- Contacto aprobado.

Rol talento:

- Inicio.

También se agregó opción para cerrar sesión.

---

## 11. Panel administrador municipal

### 11.1. Dashboard administrador

Se desarrolló un panel de administración municipal con accesos a los módulos principales:

- Talentos.
- Empresas.
- Solicitudes.
- Seguimientos.

Las tarjetas funcionan como accesos directos a cada módulo.

---

### 11.2. Gestión de Talentos

Se implementó el módulo completo de Talentos.

Acciones disponibles:

- Nuevo talento.
- Ver detalle.
- Editar.
- Validar perfil.
- Eliminar.

Pruebas realizadas desde frontend:

- Creación de talento.
- Edición de información.
- Actualización de años de experiencia.
- Validación de perfil.
- Eliminación de talento de prueba.
- Verificación del resultado en el listado.

Resultado:

```txt
Módulo Talentos funcionando correctamente desde frontend conectado al backend.
```

---

### 11.3. Gestión de Empresas

Se implementó el módulo completo de Empresas.

Acciones disponibles:

- Nueva empresa.
- Ver detalle.
- Editar.
- Validar empresa.
- Eliminar.

Pruebas realizadas desde frontend:

- Creación de empresa.
- Corrección de campos obligatorios.
- Registro de correo y rubro.
- Visualización de empresa creada.
- Validación de empresa.

Resultado:

```txt
Módulo Empresas funcionando correctamente desde frontend conectado al backend.
```

---

### 11.4. Gestión de Solicitudes

Se implementó el módulo administrativo para revisar solicitudes de contacto.

Acciones disponibles:

- Ver solicitud.
- Aprobar solicitud.
- Rechazar solicitud.

Pruebas realizadas:

- Visualización de solicitudes.
- Aprobación de solicitud.
- Rechazo de solicitud.
- Confirmación visual del cambio de estado.
- Verificación desde el portal empresa.

Resultado:

```txt
Módulo Solicitudes funcionando correctamente y respetando el flujo de aprobación municipal.
```

---

### 11.5. Gestión de Seguimientos

Se implementó el módulo Seguimientos como bitácora.

Acciones disponibles:

- Ver seguimiento.
- Crear nuevo seguimiento.

Pruebas realizadas:

- Listado de seguimientos.
- Creación de seguimiento.
- Asociación a solicitud, empresa y talento.
- Registro de tipo de avance.
- Registro de estado y descripción.

Resultado:

```txt
Módulo Seguimientos funcionando como bitácora histórica del proceso.
```

---

## 12. Portal Empresa

### 12.1. Dashboard empresa

Se desarrolló un portal para empresas con accesos a:

- Buscar talentos.
- Mis solicitudes.
- Contacto aprobado.

El lenguaje fue ajustado para que la vista sea más institucional y menos técnica.

---

### 12.2. Buscar talentos

Se desarrolló una vista para que la empresa pueda explorar perfiles laborales.

Funcionalidades:

- Buscar perfiles.
- Filtrar por área profesional.
- Filtrar por pretensión de renta máxima.
- Limpiar filtros.
- Solicitar contacto.

En esta vista se aplica el principio de CV Ciego, por lo que la empresa revisa información laboral sin acceder directamente a datos personales.

Pruebas realizadas:

- Búsqueda de perfiles.
- Uso de filtros.
- Solicitud de contacto.
- Validación de solicitud duplicada.
- Mensaje informativo cuando ya existe una solicitud pendiente.

Resultado:

```txt
La empresa puede buscar perfiles laborales y solicitar contacto sin acceder directamente a datos personales.
```

---

### 12.3. Mis solicitudes

Se desarrolló una vista para que la empresa consulte el estado de sus solicitudes.

Estados visibles:

- En revisión.
- Aprobada.
- Rechazada.

Acciones disponibles:

- Ver detalle.
- Ver contacto, solo cuando la solicitud está aprobada.
- Visualización de estado cuando está pendiente o rechazada.

Pruebas realizadas:

- Consulta de solicitudes enviadas.
- Visualización de estado.
- Acceso a contacto aprobado desde una solicitud aprobada.

Resultado:

```txt
La empresa puede consultar el avance de sus solicitudes sin modificar decisiones municipales.
```

---

### 12.4. Contacto aprobado

Se desarrolló una vista para consultar datos de contacto autorizados.

Funcionalidades:

- Ingreso manual del ID de solicitud.
- Lectura automática del ID desde la URL.
- Consulta de contacto aprobado.
- Visualización del detalle de solicitud.
- Visualización de datos de contacto autorizados.

Rutas frontend:

```txt
/contacto-aprobado
/contacto-aprobado?solicitud_id=1
```

Endpoint consumido:

```txt
GET /api/v1/solicitudes/:id/contacto
```

Pruebas realizadas:

- Consulta manual por ID.
- Acceso desde “Mis solicitudes”.
- Visualización de contacto cuando la solicitud está aprobada.
- Validación de acceso mediante token de empresa.

Resultado:

```txt
El contacto solo se muestra cuando existe aprobación municipal previa.
```

---

## 13. Portal persona inscrita

### 13.1. Vista del rol persona inscrita

Se creó una vista informativa para el usuario con rol talento, presentada como:

```txt
Portal persona inscrita
Mi espacio laboral
```

La vista de persona inscrita fue adaptada con un lenguaje más cercano a una plataforma municipal, usando el nombre “Mi espacio laboral” para representar el acceso informativo del usuario.

La vista muestra:

- Correo de la sesión.
- Tipo de acceso.
- Programa ProviEmplea.
- Estado visual del perfil.
- Etapas del proceso: perfil registrado, revisión municipal y vinculación laboral.
- Explicación del CV Ciego.
- Explicación del contacto autorizado.

Acciones visuales incorporadas:

- Ver detalle del estado.
- Solicitar actualización de datos.
- Consultar estado.
- Actualizar antecedentes.
- Ver protección.
- Solicitar orientación.

Estas acciones son informativas y permiten mostrar mensajes dentro de la misma pantalla. En esta versión demo no generan solicitudes reales ni modifican información en la base de datos.

---

## 14. Por qué no se implementó inscripción directa de personas

Durante el desarrollo se evaluó la posibilidad de permitir que nuevas personas se inscribieran directamente desde el portal.

Esta opción no se implementó en esta etapa porque no era solamente crear una página en frontend. Para funcionar correctamente, requería un flujo completo en backend, base de datos, seguridad, validaciones, documentación y pruebas.

Para implementar una inscripción directa se habría requerido:

- Formulario público de inscripción.
- Endpoint de registro de persona.
- Validaciones de RUT, correo y campos obligatorios.
- Control de duplicados.
- Creación de perfil en `Talentos`.
- Creación de usuario en `UsuarioSistemas`.
- Asociación entre usuario y talento mediante `talento_id`.
- Encriptación de contraseña.
- Documentación Swagger.
- Pruebas desde Swagger UI.
- Pruebas desde frontend.
- Verificación en base de datos.

Por esta razón, se decidió que en esta versión la Municipalidad registre y valide a las personas desde el panel administrador.

---

### 14.1. ¿Es una vista demo?

Sí. El portal persona inscrita funciona como una **vista demo/informativa** del rol talento.

Representa cómo una persona inscrita podría revisar su estado general dentro del sistema, pero no incluye todavía un flujo real de inscripción, actualización de datos o solicitud enviada al backend.

Esta decisión permitió mantener el alcance del proyecto centrado en:

- CRUD administrativo.
- Autenticación por roles.
- Gestión de talentos.
- Gestión de empresas.
- Solicitudes de contacto.
- Aprobación municipal.
- CV Ciego.
- Contacto autorizado.
- Seguimientos.

---

### 14.2. Mejora futura propuesta

Como mejora futura se propone implementar endpoints específicos para el rol persona inscrita:

```txt
POST /api/talentos/registro-publico
GET /api/talentos/me
GET /api/talentos/me/estado
POST /api/talentos/me/solicitud-actualizacion
```

Esto permitiría que una persona:

- Se inscriba directamente.
- Revise su perfil real.
- Consulte su estado desde datos reales del backend.
- Solicite actualización de antecedentes.
- Visualice seguimientos asociados.

Esta mejora requeriría nuevas pruebas en Swagger UI, validaciones de seguridad y conexión frontend.

---

## 15. CV Ciego

El sistema aplica el principio de CV Ciego en la búsqueda de perfiles laborales.

### Antes de la aprobación municipal

La empresa puede ver:

- Área profesional.
- Nivel educacional.
- Años de experiencia.
- Competencias.
- Pretensión de renta.
- Estado del perfil.

La empresa no debe ver:

- Nombre.
- RUT.
- Correo.
- Teléfono.
- Datos personales directos.

### Después de la aprobación municipal

Cuando la Municipalidad aprueba una solicitud de contacto, la empresa puede visualizar los datos autorizados.

Esto no rompe el principio de CV Ciego, porque el acceso ocurre después de una revisión y aprobación municipal.

---

## 16. Pruebas realizadas

### 16.1. Pruebas de backend con Swagger UI

El backend fue validado principalmente mediante Swagger UI.

Se revisó:

- Disponibilidad de endpoints.
- Respuestas JSON.
- Códigos de estado.
- Validaciones.
- Rutas protegidas.
- Comportamiento de módulos principales.

Swagger UI se ejecutó en:

```txt
http://localhost:3000/api-docs/
```

---

### 16.2. Pruebas de frontend desde navegador

El frontend fue probado desde el navegador, iniciando sesión con los distintos roles y verificando la comunicación con el backend mediante Fetch API.

Se validó:

- Login por rol.
- Redirección según rol.
- Navegación protegida.
- Consumo de endpoints.
- Creación y actualización de registros.
- Visualización de mensajes.
- Flujo de solicitudes.
- Contacto autorizado.

---

### 16.3. Pruebas de autenticación

Se probaron los tres roles:

- Administrador.
- Empresa.
- Persona inscrita / talento.

Resultado:

```txt
Login funcional con redirección según rol.
```

---

### 16.4. Pruebas de Talentos

Pruebas realizadas:

- Listar talentos.
- Crear talento.
- Editar talento.
- Validar talento.
- Eliminar talento de prueba.

Resultado:

```txt
CRUD de talentos funcionando desde frontend.
```

---

### 16.5. Pruebas de Empresas

Pruebas realizadas:

- Listar empresas.
- Crear empresa.
- Corregir campos obligatorios.
- Validar empresa.
- Visualizar empresa creada.

Resultado:

```txt
CRUD de empresas funcionando desde frontend.
```

---

### 16.6. Pruebas de Solicitudes

Pruebas realizadas:

- Empresa solicita contacto.
- Sistema evita solicitudes duplicadas pendientes.
- Administrador aprueba solicitud.
- Administrador rechaza solicitud.
- Empresa consulta estado.

Resultado:

```txt
Flujo de solicitudes funcionando correctamente.
```

---

### 16.7. Pruebas de Seguimientos

Pruebas realizadas:

- Listar seguimientos.
- Crear seguimiento.
- Asociar seguimiento a solicitud, empresa y talento.
- Registrar estado y descripción.

Resultado:

```txt
Seguimientos funcionando como bitácora del proceso.
```

---

### 16.8. Pruebas de Contacto aprobado

Pruebas realizadas:

- Consultar contacto por ID de solicitud.
- Acceder desde Mis solicitudes.
- Visualizar contacto solo si la solicitud está aprobada.
- Probar acceso con token de empresa.

Resultado:

```txt
Contacto aprobado funcionando y respetando autorización municipal.
```

---

### 16.9. Pruebas de CV Ciego

Pruebas realizadas:

- Empresa busca perfiles laborales.
- Empresa solicita contacto sin ver datos personales.
- Datos personales se muestran solo después de aprobación municipal.

Resultado:

```txt
Principio de CV Ciego aplicado correctamente.
```

---

## 17. Endpoints principales usados

### Auth

```txt
POST /api/auth/login
```

### Talentos

```txt
GET /api/talentos
GET /api/talentos/:id
POST /api/talentos
PUT /api/talentos/:id
PATCH /api/talentos/:id/estado
DELETE /api/talentos/:id
```

### Empresas

```txt
GET /api/empresas
GET /api/empresas/:id
POST /api/empresas
PUT /api/empresas/:id
PATCH /api/empresas/:id/validacion
DELETE /api/empresas/:id
```

### Solicitudes

```txt
GET /api/solicitudes
GET /api/solicitudes/:id
POST /api/solicitudes
PUT /api/solicitudes/:id
PATCH /api/solicitudes/:id/estado
DELETE /api/solicitudes/:id
```

### Seguimientos

```txt
GET /api/seguimientos
GET /api/seguimientos/:id
POST /api/seguimientos
PUT /api/seguimientos/:id
PATCH /api/seguimientos/:id/estado
DELETE /api/seguimientos/:id
```

### Contacto aprobado

```txt
GET /api/v1/solicitudes/:id/contacto
```

---

## 18. Códigos de respuesta observados

```txt
200 OK
Solicitud procesada correctamente.
```

```txt
201 Created
Registro creado correctamente.
```

```txt
400 Bad Request
Datos incompletos o inválidos.
```

```txt
401 Unauthorized
Token inválido, ausente o expirado.
```

```txt
403 Forbidden
Usuario sin permisos suficientes.
```

```txt
404 Not Found
Registro no encontrado.
```

```txt
409 Conflict
Registro duplicado o solicitud pendiente existente.
```

---

## 19. Evidencias de pruebas realizadas

Durante el desarrollo se generaron capturas como evidencia del funcionamiento del sistema. Las evidencias consideradas para la entrega son:

1. Backend ejecutándose en terminal.
2. Swagger UI abierto.
3. Login del sistema.
4. Dashboard administrador.
5. Gestión de Talentos.
6. Creación o edición de talento.
7. Gestión de Empresas.
8. Creación de empresa con correo y rubro.
9. Gestión de Solicitudes.
10. Solicitud aprobada por administrador.
11. Dashboard Empresa.
12. Búsqueda de talentos con CV Ciego.
13. Solicitud de contacto enviada.
14. Mensaje de solicitud duplicada.
15. Mis solicitudes de empresa.
16. Contacto aprobado visible.
17. Portal persona inscrita.
18. Vista de estado informativo del perfil.
19. Seguimientos como bitácora.
20. Base de datos en phpMyAdmin.

---

## 20. Alcance logrado

El sistema logró implementar:

- Backend funcional con Sequelize y MySQL.
- Modelos, migraciones y seeders.
- Autenticación JWT.
- Roles admin, empresa y talento.
- Swagger UI.
- CRUD de módulos principales.
- Frontend conectado al backend.
- Login funcional.
- Rutas protegidas.
- Panel administrador.
- Portal empresa.
- Portal persona inscrita demo.
- CV Ciego.
- Solicitudes de contacto.
- Aprobación municipal.
- Contacto autorizado.
- Seguimientos como bitácora.
- Mensajes de validación y errores.

---

## 21. Limitaciones actuales

- La inscripción directa de personas no fue implementada.
- La actualización real de datos desde el portal persona no fue implementada.
- El portal persona es una vista demo/informativa.
- Algunas acciones del portal persona muestran mensajes visuales, pero no crean registros en base de datos.
- El contacto se libera solo para solicitudes aprobadas.

Estas limitaciones responden a una decisión de alcance, para mantener el proyecto enfocado en los módulos principales desarrollados.

---

## 22. Mejoras futuras

Se proponen como mejoras futuras:

- Registro público de personas.
- Endpoint `/api/talentos/me`.
- Consulta real del estado del perfil desde backend.
- Solicitud real de actualización de antecedentes.
- Historial visible para persona inscrita.
- Panel de usuarios del sistema.
- Asociación completa entre `UsuarioSistema` y `Talento`.
- Recuperación de contraseña.
- Notificaciones por correo.
- Exportación de reportes.
- Mejoras de accesibilidad.
- Mejoras responsive.

---

## 23. Conclusión

El proyecto ProviEmplea API Grupal cumple con el desarrollo de una solución frontend-backend conectada, con autenticación, roles, módulos CRUD, documentación Swagger y pruebas funcionales.

El sistema representa un flujo municipal de empleabilidad donde la Municipalidad administra y valida perfiles, las empresas pueden revisar información laboral bajo modalidad de CV Ciego y los datos personales solo se entregan cuando existe una aprobación formal.

La vista de persona inscrita se mantiene como demo informativa, porque implementar inscripción directa y actualización real de datos habría requerido nuevos endpoints, controladores, validaciones, documentación Swagger y pruebas adicionales. Esta decisión permitió mantener el alcance del proyecto controlado y enfocado en los módulos principales desarrollados.
