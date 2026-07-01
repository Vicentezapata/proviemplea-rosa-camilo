
## 1. Descripción del proyecto

ProviEmplea API es un backend desarrollado para una plataforma de intermediación laboral de búsqueda inversa, donde las empresas pueden buscar talentos disponibles y solicitar contacto a través de la Municipalidad de Providencia.

El sistema considera el concepto de **CV Ciego**, ocultando datos personales y sociodemográficos de los talentos en la vista pública para empresas, con el objetivo de reducir sesgos y evitar discriminación arbitraria.

El backend permite gestionar:

- Talentos
- Empresas
- Solicitudes de contacto
- Seguimientos del proceso de selección
- Catálogos reutilizables

---

## 2. Tecnologías utilizadas

- Node.js
- Express
- Sequelize ORM
- Sequelize CLI
- MySQL con XAMPP
- Swagger / OpenAPI
- OpenAPI Generator
- Java 11+ para OpenAPI Generator
- Swagger UI
- Visual Studio Code
- phpMyAdmin

---

## 3. Arquitectura general

El proyecto fue desarrollado partiendo desde un archivo `openapi.yaml`, siguiendo el enfoque visto en clases: primero definir el contrato Swagger/OpenAPI y luego generar la base del servidor con OpenAPI Generator.

Flujo general:

```txt
openapi.yaml → OpenAPI Generator → API Express → Sequelize ORM → MySQL → Swagger UI
```

La lógica real del sistema fue implementada en los archivos de servicios ubicados en:

```txt
src/services
```

---

## 4. Modelo de datos

Inicialmente se revisó una propuesta extendida con múltiples tablas normalizadas. Sin embargo, para el alcance de la evaluación, se consolidó el modelo en cinco entidades principales:

| Tabla | Propósito |
|---|---|
| Talentos | Guarda los perfiles laborales de los vecinos/postulantes. |
| Empresas | Guarda los datos de empresas registradas. |
| SolicitudContactos | Registra solicitudes de contacto entre empresas y talentos. |
| Seguimientos | Registra el avance del proceso de selección. |
| Catalogos | Guarda valores reutilizables como estados, rubros, modalidades, jornadas e idiomas. |

Esta decisión permitió mantener las reglas de negocio principales, el CV Ciego, los estados del proceso, las solicitudes de contacto y el seguimiento laboral, evitando una sobre-normalización innecesaria para el alcance académico.

---

## 5. Base de datos

Base de datos utilizada:

```txt
proviemplea_api_grupal
```

Tablas creadas mediante migraciones Sequelize:

```txt
Talentos
Empresas
SolicitudContactos
Seguimientos
Catalogos
SequelizeMeta
```

Relaciones principales:

```txt
Empresa 1 ─── N SolicitudContactos
Talento 1 ─── N SolicitudContactos
SolicitudContacto 1 ─── N Seguimientos
Empresa 1 ─── N Seguimientos
Talento 1 ─── N Seguimientos
```

La tabla `Catalogos` funciona como tabla de apoyo para valores reutilizables del sistema.

---

## 6. Instalación y requisitos previos

Tener instalado:

- Node.js
- npm
- Java 11 o superior
- XAMPP con MySQL activo
- OpenAPI Generator CLI

Verificar Java:

```bash
java -version
```

Verificar Node:

```bash
node -v
```

Verificar npm:

```bash
npm.cmd -v
```

---

## 7. Instalación de OpenAPI Generator

```bash
npm.cmd install -g @openapitools/openapi-generator-cli
```

Verificar versión:

```bash
openapi-generator-cli.cmd version
```

---

## 8. Generación de API desde OpenAPI

Desde la raíz del proyecto:

```bash
cd C:\Users\rosita\proviemplea-api-grupal
```

Validar el archivo OpenAPI:

```bash
openapi-generator-cli.cmd validate -i openapi.yaml
```

Generar la API base:

```bash
openapi-generator-cli.cmd generate -i openapi.yaml -g nodejs-express-server -o ./src
```

---

## 9. Instalación de dependencias

Entrar a la carpeta generada:

```bash
cd C:\Users\rosita\proviemplea-api-grupal\src
```

Instalar dependencias del proyecto generado:

```bash
npm.cmd install
```

Instalar dependencias de Sequelize:

```bash
npm.cmd install sequelize sequelize-cli mysql2 dotenv
```

---

## 10. Inicialización de Sequelize

```bash
npx.cmd sequelize-cli init
```

Esto crea las carpetas:

```txt
config
models
migrations
seeders
```

---

## 11. Configuración de conexión

Archivo utilizado:

```txt
src/config/config.json
```

Configuración local:

```json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "proviemplea_api_grupal",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "proviemplea_api_grupal",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "proviemplea_api_grupal",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

---

## 12. Migraciones

Las migraciones permiten crear las tablas en MySQL.

Comando utilizado:

```bash
npx.cmd sequelize-cli db:migrate
```

Migraciones ejecutadas:

```txt
create-talento
create-empresa
create-solicitud-contacto
create-seguimiento
create-catalogo
```

---

## 13. Seeders

Los seeders permiten cargar datos demo para probar la API.

Seeders creados y ejecutados:

```txt
demo-catalogos
demo-talentos
demo-empresas
demo-solicitudes
demo-seguimientos
```

Comando general para ejecutar un seeder específico:

```bash
npx.cmd sequelize-cli db:seed --seed nombre-del-seeder.js
```

Ejemplo:

```bash
npx.cmd sequelize-cli db:seed --seed 20260521192340-demo-catalogos.js
```

---

## 14. Ejecución del servidor

Desde la carpeta:

```bash
C:\Users\rosita\proviemplea-api-grupal\src
```

Ejecutar:

```bash
npm.cmd start
```

Servidor local:

```txt
http://localhost:3000
```

Swagger UI:

```txt
http://localhost:3000/api-docs/
```

---

## 15. Endpoints implementados

### 15.1 Sistema

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/health` | Verifica el estado de la API. |

---

### 15.2 Talentos

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/talentos` | Lista talentos aplicando CV Ciego. |
| GET | `/api/talentos/{id}` | Obtiene talento completo por ID. |
| POST | `/api/talentos` | Crea un talento. |
| PUT | `/api/talentos/{id}` | Actualiza un talento. |
| PATCH | `/api/talentos/{id}/estado` | Cambia estado del perfil. |
| DELETE | `/api/talentos/{id}` | Eliminación lógica del talento. |

---

### 15.3 Empresas

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/empresas` | Lista empresas. |
| GET | `/api/empresas/{id}` | Obtiene empresa por ID. |
| POST | `/api/empresas` | Crea una empresa. |
| PUT | `/api/empresas/{id}` | Actualiza una empresa. |
| PATCH | `/api/empresas/{id}/validacion` | Cambia estado de validación. |
| DELETE | `/api/empresas/{id}` | Eliminación lógica de empresa. |

---

### 15.4 Solicitudes

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/solicitudes` | Lista solicitudes de contacto. |
| GET | `/api/solicitudes/{id}` | Obtiene solicitud por ID. |
| POST | `/api/solicitudes` | Crea una solicitud. |
| PUT | `/api/solicitudes/{id}` | Actualiza una solicitud. |
| PATCH | `/api/solicitudes/{id}/estado` | Cambia estado de solicitud. |
| DELETE | `/api/solicitudes/{id}` | Eliminación lógica de solicitud. |

---

### 15.5 Seguimientos

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/seguimientos` | Lista seguimientos. |
| GET | `/api/seguimientos/{id}` | Obtiene seguimiento por ID. |
| POST | `/api/seguimientos` | Crea un seguimiento. |
| PUT | `/api/seguimientos/{id}` | Actualiza seguimiento. |
| PATCH | `/api/seguimientos/{id}/estado` | Cambia estado del seguimiento. |
| DELETE | `/api/seguimientos/{id}` | Eliminación lógica de seguimiento. |

---

### 15.6 Catálogos

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/catalogos` | Lista catálogos. |
| GET | `/api/catalogos/{id}` | Obtiene catálogo por ID. |
| POST | `/api/catalogos` | Crea catálogo. |
| PUT | `/api/catalogos/{id}` | Actualiza catálogo. |
| DELETE | `/api/catalogos/{id}` | Eliminación lógica de catálogo. |

---

## 16. CV Ciego

El endpoint:

```txt
GET /api/talentos
```

aplica lógica de CV Ciego.

Este endpoint muestra información profesional del talento, pero oculta datos personales y sociodemográficos.

Campos ocultos:

```txt
rut
nombre
correo
telefono
direccion
fecha_nacimiento
genero
comuna
```

Campos visibles:

```txt
codigo_talento
resumen_profesional
area_profesional
nivel_educacional
experiencia_laboral
competencias_tecnicas
idiomas
portafolio_url
discapacidad_ley_21015
condiciones_laborales
pretension_renta
estado_perfil
porcentaje_completitud
activo
```

El endpoint `GET /api/talentos/{id}` muestra el perfil completo, considerado como vista interna o administrativa.

---

## 17. Filtros y paginación

Se implementaron filtros en endpoints principales.

Ejemplo en talentos:

```txt
GET /api/talentos?estado_perfil=validado&area_profesional=Tecnología&discapacidad_ley_21015=false&pretension_renta_max=1000000&page=1&limit=10
```

Ejemplo en empresas:

```txt
GET /api/empresas?estado_validacion=validada&rubro=Tecnología&page=1&limit=10
```

Ejemplo en solicitudes:

```txt
GET /api/solicitudes?empresa_id=1&talento_id=2&estado_solicitud=pendiente&page=1&limit=10
```

Ejemplo en seguimientos:

```txt
GET /api/seguimientos?empresa_id=1&talento_id=2&estado_seguimiento=entrevista&page=1&limit=10
```

---

## 18. Reglas de negocio implementadas

- No se permite crear talentos con RUT, correo o código duplicado.
- No se permite crear empresas con RUT o correo duplicado.
- No se permite crear una solicitud pendiente duplicada para la misma empresa y talento.
- Los talentos pueden ser validados por administración.
- Las empresas pueden ser validadas por administración.
- Las solicitudes pueden cambiar de estado.
- Los seguimientos registran el avance del proceso de selección.
- Las eliminaciones son lógicas mediante el campo `activo`.

---

## 19. Códigos de respuesta usados

| Código | Uso |
|---|---|
| 200 | Operación exitosa. |
| 201 | Recurso creado correctamente. |
| 400 | Datos inválidos o incompletos. |
| 404 | Recurso no encontrado. |
| 409 | Conflicto por duplicado o regla de negocio. |
| 500 | Error interno del servidor. |

---

## 20. Pruebas realizadas en Swagger UI

Las pruebas fueron realizadas desde:

```txt
http://localhost:3000/api-docs/
```

### Talentos

- GET `/api/talentos` con CV Ciego.
- GET `/api/talentos/{id}`.
- POST `/api/talentos`.
- POST duplicado con respuesta 409.
- PUT `/api/talentos/{id}`.
- PATCH `/api/talentos/{id}/estado`.
- DELETE `/api/talentos/{id}`.

### Empresas

- GET `/api/empresas`.
- GET `/api/empresas/{id}`.
- POST `/api/empresas`.
- POST duplicado con respuesta 409.
- PUT `/api/empresas/{id}`.
- PATCH `/api/empresas/{id}/validacion`.
- DELETE `/api/empresas/{id}`.

### Solicitudes

- GET `/api/solicitudes`.
- GET `/api/solicitudes/{id}`.
- POST `/api/solicitudes`.
- POST solicitud duplicada con respuesta 409.
- PUT `/api/solicitudes/{id}`.
- PATCH `/api/solicitudes/{id}/estado`.
- DELETE `/api/solicitudes/{id}`.

### Seguimientos

- GET `/api/seguimientos`.
- GET `/api/seguimientos/{id}`.
- POST `/api/seguimientos`.
- PUT `/api/seguimientos/{id}`.
- PATCH `/api/seguimientos/{id}/estado`.
- DELETE `/api/seguimientos/{id}`.

### Catálogos

- GET `/api/catalogos`.
- GET `/api/catalogos/{id}`.
- POST `/api/catalogos`.
- PUT `/api/catalogos/{id}`.
- DELETE `/api/catalogos/{id}`.

---

## 21. Evidencias sugeridas

Las capturas pueden organizarse en una carpeta llamada:

```txt
evidencias
```

Nombres sugeridos:

```txt
01_swagger_funcionando.png
02_modelo_relacional.png
03_tablas_mysql.png
04_seeders_catalogos.png
05_get_talentos_cv_ciego.png
06_get_talento_id.png
07_post_talentos.png
08_post_talentos_409.png
09_put_talentos.png
10_patch_talentos_estado.png
11_delete_talentos.png
12_get_empresas.png
13_get_empresa_id.png
14_post_empresas.png
15_post_empresas_409.png
16_put_empresas.png
17_patch_empresas_validacion.png
18_delete_empresas.png
19_get_solicitudes.png
20_get_solicitud_id.png
21_post_solicitudes.png
22_post_solicitudes_409.png
23_put_solicitudes.png
24_patch_solicitudes_estado.png
25_delete_solicitudes.png
26_get_seguimientos.png
27_get_seguimiento_id.png
28_post_seguimientos.png
29_put_seguimientos.png
30_patch_seguimientos_estado.png
31_delete_seguimientos.png
32_get_catalogos.png
33_get_catalogo_id.png
34_post_catalogos.png
35_put_catalogos.png
36_delete_catalogos.png
```

---

## 22. Observaciones técnicas

Durante el desarrollo se corrigió una inconsistencia menor en Swagger relacionada con el campo de Seguimientos.

Inicialmente el contrato OpenAPI usaba:

```txt
solicitud_id
```

Pero el modelo Sequelize y la base de datos utilizan:

```txt
solicitud_contacto_id
```

Se ajustó el archivo Swagger para mantener coherencia entre OpenAPI, Sequelize y MySQL.

---

## 23. Conclusión

El backend ProviEmplea API cumple con los requisitos principales de la evaluación, implementando operaciones CRUD reales conectadas a MySQL mediante Sequelize ORM.

Además, incorpora documentación Swagger/OpenAPI, migraciones, seeders, manejo de errores, filtros, paginación, relaciones entre entidades, eliminación lógica y la lógica de CV Ciego para proteger datos personales de los talentos.

El sistema fue probado desde Swagger UI y validado contra la base de datos MySQL, demostrando funcionamiento real de los módulos Talentos, Empresas, Solicitudes, Seguimientos y Catálogos.

# Documentación adicional - Autenticación, roles y protección de datos

## Autenticación, roles y protección de datos

Como mejora del backend, se implementó autenticación mediante JWT para controlar el acceso al sistema según el tipo de usuario. Esta funcionalidad permite que el backend pueda diferenciar entre usuarios administradores, empresas y talentos.

La autenticación permite proteger rutas sensibles y evitar que cualquier usuario acceda directamente a datos personales de los talentos.

---

## Roles implementados

El sistema considera tres tipos de usuarios:

| Rol | Descripción |
|---|---|
| admin | Usuario municipal encargado de administrar talentos, empresas, solicitudes y seguimientos. |
| empresa | Usuario asociado a una empresa registrada en el sistema. Puede buscar talentos mediante CV Ciego y solicitar contacto. |
| talento | Usuario asociado a una persona registrada como talento laboral. |

---

## Usuarios demo

Para realizar pruebas se dejaron usuarios demo cargados mediante seeders.

| Rol | Email | Contraseña |
|---|---|---|
| Admin | admin@proviemplea.cl | admin123 |
| Empresa | empresa@proviemplea.cl | empresa123 |
| Talento | talento@proviemplea.cl | talento123 |

Las contraseñas no se guardan en texto plano. Se almacenan encriptadas mediante `bcryptjs`.

---

## Login JWT

Endpoint utilizado para iniciar sesión:

```http
POST /api/auth/login
```

Ejemplo de body:

```json
{
  "email": "empresa@proviemplea.cl",
  "password": "empresa123"
}
```

Ejemplo de respuesta:

```json
{
  "status": "ok",
  "message": "Login exitoso",
  "token": "JWT_GENERADO",
  "usuario": {
    "id": 2,
    "nombre": "Empresa Demo ProviEmplea",
    "email": "empresa@proviemplea.cl",
    "rol": "empresa",
    "empresa_id": 1,
    "talento_id": null
  }
}
```

El token JWT se utiliza posteriormente para acceder a rutas protegidas mediante el header:

```http
Authorization: Bearer TOKEN_JWT
```

---

## Relación de usuarios con empresa y talento

Se agregó a la tabla `UsuarioSistemas` la relación con empresas y talentos mediante los campos:

```txt
empresa_id
talento_id
```

Esto permite que el backend identifique si un usuario pertenece a una empresa o a un talento específico.

Ejemplo:

| Usuario | Rol | empresa_id | talento_id |
|---|---|---:|---:|
| admin@proviemplea.cl | admin | null | null |
| empresa@proviemplea.cl | empresa | 1 | null |
| talento@proviemplea.cl | talento | null | 1 |

---

## Middlewares implementados

Se agregaron dos middlewares personalizados:

```txt
src/middlewares/authMiddleware.js
src/middlewares/roleMiddleware.js
```

### authMiddleware

Este middleware valida que la petición tenga un token JWT válido.

Si no existe token, responde:

```json
{
  "status": "error",
  "message": "Token no enviado"
}
```

Si el token es inválido o expiró, responde:

```json
{
  "status": "error",
  "message": "Token inválido o expirado"
}
```

### roleMiddleware

Este middleware permite restringir rutas según el rol del usuario autenticado.

Ejemplo de uso:

```js
roleMiddleware('admin', 'empresa')
```

Esto permite que solo usuarios con rol `admin` o `empresa` accedan a una ruta protegida.

---

## Endpoint protegido para liberar contacto

Se agregó un endpoint protegido para liberar los datos personales de un talento solo cuando la solicitud de contacto fue aprobada por la Municipalidad.

Endpoint:

```http
GET /api/v1/solicitudes/:id/contacto
```

Ejemplo:

```http
GET /api/v1/solicitudes/1/contacto
```

Este endpoint requiere token JWT:

```http
Authorization: Bearer TOKEN_JWT
```

---

## Reglas aplicadas en el endpoint de contacto

El endpoint protegido aplica las siguientes reglas:

- El usuario debe estar autenticado.
- El token JWT debe ser válido.
- Solo pueden acceder usuarios con rol `admin` o `empresa`.
- Si el usuario es empresa, solo puede revisar solicitudes asociadas a su propia empresa.
- El contacto solo se libera si la solicitud está en estado `aprobada` o `aceptada`.
- Si la solicitud está `pendiente` o `rechazada`, no se liberan datos personales.

---

## Flujo protegido de CV Ciego

El sistema protege los datos personales del talento mediante la lógica de CV Ciego.

Flujo general:

```txt
1. La empresa inicia sesión.
2. La empresa busca talentos mediante CV Ciego.
3. La empresa solicita contacto.
4. La Municipalidad revisa la solicitud.
5. Si la solicitud es aprobada, el sistema libera los datos de contacto.
6. Si la solicitud está pendiente o rechazada, los datos personales no se muestran.
```

Esto permite proteger información sensible como nombre, correo y teléfono hasta que exista autorización municipal.

---

## Prueba positiva del endpoint protegido

Se validó el caso positivo con una empresa autenticada, consultando una solicitud aprobada y perteneciente a su empresa.

Endpoint probado:

```http
GET /api/v1/solicitudes/1/contacto
```

Resultado obtenido:

```json
{
  "status": "ok",
  "message": "Contacto liberado correctamente",
  "solicitud": {
    "id": 1,
    "estado_solicitud": "aprobada",
    "empresa_id": 1,
    "talento_id": 1
  },
  "contacto": {
    "talento_id": 1,
    "nombre": "Camila Torres",
    "email": "camila.torres@example.com",
    "telefono": "+56911111111"
  }
}
```

Esta prueba confirma que una empresa autenticada puede ver el contacto del talento solo cuando la solicitud fue aprobada.

---

## Pruebas negativas realizadas

Además del caso positivo, se realizaron pruebas negativas para verificar que el backend bloquee accesos no autorizados.

| Prueba | Resultado esperado | Resultado |
|---|---|---|
| Consultar contacto sin token | Token no enviado | Correcto |
| Consultar contacto con token falso | Token inválido o expirado | Correcto |
| Consultar solicitud pendiente | El contacto aún no ha sido autorizado por la Municipalidad | Correcto |
| Consultar solicitud de otra empresa | No tiene permiso para ver esta solicitud | Correcto |

---

## Evidencias de protección

Las pruebas realizadas demuestran que:

- Un usuario sin token no puede acceder a datos personales.
- Un token inválido no permite acceso.
- Una solicitud pendiente no libera contacto.
- Una empresa no puede ver solicitudes de otra empresa.
- Una solicitud aprobada sí permite liberar contacto, siempre que el usuario tenga permisos.

Con esta mejora, el backend respeta la lógica del CV Ciego y protege los datos personales de los talentos registrados.

---

## Estado de seguridad implementado

El backend cuenta con las siguientes mejoras de seguridad:

| Mejora | Estado |
|---|---|
| Login JWT | Implementado |
| Contraseñas encriptadas con bcrypt | Implementado |
| Roles admin, empresa y talento | Implementado |
| Relación usuario-empresa | Implementado |
| Relación usuario-talento | Implementado |
| Middleware de autenticación | Implementado |
| Middleware de roles | Implementado |
| Ruta protegida para liberar contacto | Implementado |
| Validación de solicitud aprobada | Implementado |
| Bloqueo de acceso sin token | Implementado |
| Bloqueo de token inválido | Implementado |
| Bloqueo de empresa incorrecta | Implementado |

---

## Conclusión de esta mejora

Con la autenticación JWT, los roles y la ruta protegida de contacto, el backend queda mejor preparado para el desarrollo del frontend.

Esta mejora permite construir interfaces separadas para:

```txt
Admin municipal
Empresa
Talento
```

También permite mantener protegidos los datos personales de los talentos hasta que la Municipalidad autorice el contacto.
