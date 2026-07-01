# 📋 Guía de Instalación en Servidor Propio — ProviEmplea

Este documento detalla los pasos necesarios para instalar y ejecutar la plataforma ProviEmplea en un servidor propio (VPS, servidor dedicado o entorno local).

---

## 📦 1. Requisitos Previos del Servidor

El servidor debe contar con las siguientes tecnologías instaladas:

- **Node.js** (v18.x o superior): Entorno de ejecución para el backend y frontend.
- **npm** (v8.x o superior): Gestor de paquetes de Node.js (se instala junto a Node).
- **MySQL Server** (v8.0 o superior) o MariaDB: Base de datos relacional.
- **Git**: Para clonar el repositorio.
- **Servidor Web / Proxy Inverso** (Opcional pero recomendado en producción): Nginx o Apache.
- **PM2** (Recomendado): Gestor de procesos para Node.js (se instala globalmente con `npm install -g pm2`).

---

## 🗄️ 2. Preparación de la Base de Datos

1. Ingresa a tu gestor de MySQL (por consola, phpMyAdmin, DBeaver, XAMPP, etc.).
2. Crea una base de datos vacía para el sistema:
   ```sql
   CREATE DATABASE proviemplea_db;
   ```
3. Asegúrate de tener un usuario y contraseña con privilegios sobre esa base de datos.

---

## ⚙️ 3. Configuración del Backend (API)

1. **Clonar o copiar el código fuente** en el servidor y navegar a la carpeta del backend:
   ```bash
   cd ruta-al-proyecto/eva3-backend-main/src
   ```

2. **Instalar las dependencias**:
   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno**:
   Copia el archivo `.env.example` y renómbralo a `.env`. Configura las credenciales de tu base de datos local/servidor:
   ```env
   PORT=3000
   NODE_ENV=development
   
   # Configuración de base de datos local
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_NAME=proviemplea_db
   DB_USER=tu_usuario_mysql
   DB_PASS=tu_contraseña_mysql
   
   # JWT
   JWT_SECRET=escribe_aqui_una_clave_secreta_muy_segura
   JWT_EXPIRES_IN=8h
   ```

4. **Ejecutar Migraciones y Seeds** (crear tablas y datos iniciales):
   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

5. **Iniciar el servidor backend**:
   Para desarrollo: `npm start`
   Para producción (usando PM2): `pm2 start index.js --name "proviemplea-api"`

El backend quedará escuchando en `http://localhost:3000`.

---

## 🌐 4. Configuración del Frontend

1. **Navegar a la carpeta del frontend**:
   ```bash
   cd ruta-al-proyecto/eva3-frontend-main
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar la conexión a la API**:
   Si tu backend se está ejecutando en el mismo servidor (por ejemplo, en el puerto 3000), asegúrate de que el frontend apunte allí. Puedes crear un archivo `.env` en la raíz de `eva3-frontend-main` con:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
   *(Si tienes un dominio público para la API, colócalo aquí).*

4. **Despliegue del Frontend**:
   - **Opción A (Desarrollo/Pruebas)**: Ejecutar `npm run dev` (levanta un servidor de pruebas en el puerto 5173).
   - **Opción B (Producción)**: 
     1. Generar la versión optimizada: `npm run build`
     2. Esto creará una carpeta llamada `dist`.
     3. Debes servir el contenido de la carpeta `dist` usando Nginx, Apache, o un paquete como `serve` (`npx serve -s dist`).

---

## ✅ 5. Verificación Final

Si todo está configurado correctamente:
- La API responderá en: `http://localhost:3000/api-docs`
- La plataforma web cargará correctamente.
- Podrás iniciar sesión con los usuarios por defecto:
  - **Admin**: `admin@proviemplea.cl` (Pass: `admin123`)
  - **Empresa**: `empresa@proviemplea.cl` (Pass: `empresa123`)
  - **Talento**: `talento@proviemplea.cl` (Pass: `talento123`)
