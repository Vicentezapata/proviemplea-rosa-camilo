// URL base de la API — se configura via variable de entorno en producción
// En desarrollo usa localhost:3000, en producción usa la URL de Render
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default API_BASE
