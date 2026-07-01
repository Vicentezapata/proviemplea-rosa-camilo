# eva3-frontend

Frontend desarrollado para la plataforma ProviEmplea, correspondiente a una aplicación React conectada a un backend Node.js/Express.

La aplicación permite visualizar el sistema según tres roles principales: administrador municipal, empresa y persona inscrita.

---

## Requisitos previos

Antes de ejecutar el frontend asegúrate de tener:

- Node.js v18 o superior.
- npm instalado.
- Backend ProviEmplea levantado en `http://localhost:3000`.
- XAMPP con MySQL activo para el backend.

---

## Instalación

### 1. Clonar o abrir el proyecto

Ubicarse en la carpeta del frontend:

```bash
cd C:\Users\rosita\Eva3_Camilo_Rosa\eva3-frontend-main
```

### 2. Instalar dependencias

```bash
npm.cmd install
```

### 3. Ejecutar el frontend

```bash
npm.cmd run dev
```

El frontend queda disponible en:

```txt
http://localhost:5173
```

---

## Tecnologías utilizadas

- React.
- Vite.
- JavaScript.
- Bootstrap.
- React Router DOM.
- Fetch API.
- CSS personalizado.

---

## Conexión con backend

El frontend consume la API del backend mediante Fetch API.

Backend utilizado:

```txt
http://localhost:3000
```

Documentación Swagger del backend:

```txt
http://localhost:3000/api-docs/
```

Para que el frontend funcione correctamente, el backend debe estar levantado antes de iniciar sesión o consumir los módulos.

---

## Usuarios de prueba

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | admin@proviemplea.cl | admin123 |
| Empresa | empresa@proviemplea.cl | empresa123 |
| Persona inscrita | talento@proviemplea.cl | talento123 |

---

## Roles del sistema

### Administrador municipal

El administrador puede gestionar los módulos principales del sistema:

- Talentos.
- Empresas.
- Solicitudes.
- Seguimientos.

### Empresa

La empresa puede:

- Buscar perfiles laborales mediante CV Ciego.
- Solicitar contacto de una persona inscrita.
- Revisar sus solicitudes.
- Consultar contacto autorizado cuando la Municipalidad aprueba la solicitud.

### Persona inscrita

La persona inscrita puede acceder a una vista informativa de su espacio laboral, donde se muestra el estado general del perfil y la protección de sus datos bajo la lógica de CV Ciego.

---

## Rutas principales

| Ruta | Rol | Descripción |
|---|---|---|
| `/` | Público | Página de inicio |
| `/login` | Público | Inicio de sesión |
| `/admin` | Admin | Panel administrador |
| `/talentos` | Admin | Gestión de talentos |
| `/empresas` | Admin | Gestión de empresas |
| `/solicitudes` | Admin | Gestión de solicitudes |
| `/seguimientos` | Admin | Gestión de seguimientos |
| `/empresa` | Empresa | Panel empresa |
| `/buscar-talentos` | Empresa | Búsqueda de talentos con CV Ciego |
| `/mis-solicitudes` | Empresa | Solicitudes realizadas por la empresa |
| `/contacto-aprobado` | Empresa | Consulta de contacto autorizado |
| `/talento` | Talento | Portal persona inscrita |

---

## Funcionalidades implementadas

### Login por roles

El sistema permite iniciar sesión con usuarios de prueba y redirige según el rol correspondiente.

Redirecciones:

```txt
admin   → /admin
empresa → /empresa
talento → /talento
```

---

### Panel administrador

El administrador municipal puede acceder a módulos de gestión para:

- Crear, listar, editar, validar y eliminar talentos.
- Crear, listar, editar, validar y eliminar empresas.
- Revisar, aprobar o rechazar solicitudes.
- Registrar y consultar seguimientos del proceso.

---

### Portal empresa

La empresa puede buscar perfiles laborales sin acceder directamente a datos personales.

Este flujo respeta el principio de CV Ciego, ya que la empresa visualiza información laboral, pero no datos como nombre, RUT, correo o teléfono antes de la aprobación municipal.

---

### Contacto autorizado

La empresa solo puede visualizar el contacto de una persona inscrita cuando la Municipalidad aprueba una solicitud.

Este flujo permite proteger los datos personales y controlar el acceso a información sensible.

---

### Portal persona inscrita

La vista de persona inscrita permite representar el acceso informativo de una persona registrada en el sistema.

En esta versión, la vista funciona como una sección informativa/demo, mostrando el estado general del perfil y el resguardo de datos personales.

---

## Pruebas realizadas

Se realizaron pruebas desde el navegador validando:

- Inicio de sesión con rol administrador.
- Inicio de sesión con rol empresa.
- Inicio de sesión con rol persona inscrita.
- Acceso a rutas protegidas.
- Visualización de panel administrador.
- Visualización de portal empresa.
- Visualización de portal persona inscrita.
- Búsqueda de talentos.
- Consulta de solicitudes.
- Consulta de contacto aprobado.
- Conexión correcta con backend.

---

## Flujo principal del sistema

```txt
1. La empresa inicia sesión.
2. Busca talentos bajo modalidad de CV Ciego.
3. Solicita contacto de un talento.
4. La Municipalidad revisa la solicitud.
5. El administrador aprueba o rechaza la solicitud.
6. Si la solicitud es aprobada, la empresa puede visualizar el contacto autorizado.
```

---

## Consideraciones

- El frontend no debe ejecutarse solo si el backend no está levantado.
- El backend debe estar disponible en `http://localhost:3000`.
- No se incluyen carpetas `node_modules` en la entrega.
- Para instalar dependencias se debe ejecutar `npm.cmd install`.
- Para iniciar el frontend se debe ejecutar `npm.cmd run dev`.

---

## Mejoras futuras

Como mejoras futuras se pueden considerar:

- Registro público de personas inscritas.
- Edición real del perfil por parte de la persona inscrita.
- Consulta real del estado del perfil desde backend.
- Notificaciones por correo.
- Recuperación de contraseña.
- Mejoras visuales y responsive.
- Panel de administración de usuarios del sistema.

---

## Conclusión

El frontend de ProviEmplea permite visualizar y utilizar la plataforma desde distintos roles, conectándose con el backend mediante Fetch API.

La interfaz implementa un flujo funcional para administrador municipal, empresa y persona inscrita, manteniendo la lógica de CV Ciego y el acceso controlado a datos personales mediante aprobación municipal.
