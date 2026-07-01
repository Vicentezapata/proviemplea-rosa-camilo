# 🚀 Memoria de Despliegue Gratuito — ProviEmplea

Este documento explica toda la arquitectura, decisiones y pasos técnicos realizados para lograr desplegar el proyecto ProviEmplea en Internet a costo cero ($0), utilizando una combinación de servicios en la nube gratuitos.

---

## 🏗️ Arquitectura Elegida

Para lograr un despliegue 100% gratuito, separamos la aplicación en tres capas, utilizando el "Free Tier" de diferentes proveedores:

1. **Base de Datos (Clever Cloud)**: Provee una base de datos MySQL real gratuita.
2. **Backend / API (Render)**: Permite alojar aplicaciones Node.js de forma gratuita.
3. **Frontend (Vercel)**: Excelente para proyectos frontend como React/Vite con ancho de banda y CDN globales gratis.
4. **Código Fuente (GitHub)**: Repositorio central que conecta todos los servicios y activa despliegues automáticos (CI/CD).

---

## 🛠️ Explicación de los Pasos Realizados

### 1. Preparación del Repositorio en GitHub
- **El Problema**: El código estaba solo de forma local. Los servicios en la nube modernos requieren conectarse a un repositorio de Git para poder descargar el código y compilarlo.
- **La Solución**: 
  - Inicializamos Git en la carpeta raíz (`git init`).
  - Tuvimos que configurar el email de Git a la versión privada `noreply` de GitHub para evitar bloqueos por políticas de privacidad (`GH007: Your push would publish a private email address`).
  - Se hizo push de todo el código (frontend y backend en la misma raíz) a un nuevo repositorio público en GitHub llamado `proviemplea-rosa-camilo`.

### 2. Base de Datos en Clever Cloud
- **El Problema**: Render y Vercel no ofrecen bases de datos MySQL gratuitas nativas.
- **La Solución**: 
  - Usamos **Clever Cloud**, creando un Add-on "MySQL" en su plan "DEV" (5MB gratis).
  - Clever Cloud nos proporcionó una URL de conexión segura (URI) con este formato: `mysql://usuario:password@host:3306/nombre_db`.

### 3. Backend en Render (Node.js + Express)
- **El Problema**: Necesitábamos un servidor que ejecutara Node.js constantemente para la API REST.
- **La Solución**:
  - Conectamos Render con nuestro repositorio de GitHub.
  - Al ser un "Monorepo" (frontend y backend en el mismo repo), configuramos el **Root Directory** a `eva3-backend-main/src` para que Render solo compile esa parte.
  - Configuramos los comandos: `npm install` para instalar dependencias y `npm start` para levantar el servidor.
  - Inyectamos las **Variables de Entorno**: `NODE_ENV`, `DATABASE_URL` (con la URI de Clever Cloud), y variables para los tokens JWT (`JWT_SECRET`, `JWT_EXPIRES_IN`).

### 4. Ejecución de Migraciones y Seeds
- **El Problema**: La base de datos de Clever Cloud estaba vacía, y el plan gratuito de Render no permite usar su "Shell" web para ejecutar comandos.
- **La Solución**: 
  - Usamos la terminal local del desarrollador (PowerShell).
  - Configuramos temporalmente la variable `$env:DATABASE_URL` apuntando a Clever Cloud.
  - Ejecutamos `npx sequelize-cli db:migrate` para que Sequelize creara las 8 tablas en la nube.
  - Ejecutamos `npx sequelize-cli db:seed:all` para llenar la base de datos con los catálogos y 3 usuarios de prueba (Admin, Empresa, Talento).

### 5. Frontend en Vercel (React + Vite)
- **El Problema**: El frontend en React debía estar disponible públicamente y saber cómo comunicarse con la nueva API de Render.
- **La Solución**:
  - Conectamos Vercel a GitHub.
  - Ajustamos el **Root Directory** a `eva3-frontend-main`. Vercel detectó automáticamente que era un proyecto **Vite**.
  - Configuramos la variable de entorno `VITE_API_URL` apuntando a la URL pública que nos dio Render (`https://proviemplea-api.onrender.com`).
  - Vercel compiló y desplegó el sitio con CDN global.

### 6. Solución de Problema: Error de CORS
- **El Problema**: Al intentar iniciar sesión desde Vercel, el navegador bloqueó la petición con un error de **CORS**. Esto pasó porque el backend estaba configurado para leer los dominios permitidos de una variable de entorno (`CORS_ORIGIN`) que no habíamos creado en Render.
- **La Solución**:
  - Modificamos el código en `expressServer.js` del backend para incluir directamente y de forma predeterminada la URL de Vercel en la lista de `allowedOrigins`.
  - Hicimos `git commit` y `git push`. Render detectó el cambio automáticamente, redesplegó el backend en 3 minutos y el login comenzó a funcionar perfectamente.

---

## 📈 Beneficios Obtenidos

- **Costo Cero**: Toda la infraestructura es 100% gratuita para desarrollo y pruebas.
- **CI/CD Automático**: Si se hace un nuevo `git push` a la rama `main`, tanto Vercel como Render descargarán el nuevo código, lo compilarán y lo desplegarán automáticamente sin intervención manual.
- **Arquitectura Desacoplada**: El Frontend y el Backend corren en servidores distintos y escalables, una práctica estándar en la industria.
