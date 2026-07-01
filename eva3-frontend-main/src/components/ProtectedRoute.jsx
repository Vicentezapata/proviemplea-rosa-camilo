import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, rolesPermitidos = [] }) {
  const token = localStorage.getItem('token')
  const usuarioGuardado = localStorage.getItem('usuario')

  let usuario = null

  try {
    usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null
  } catch (error) {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    return <Navigate to="/login" replace />
  }

  if (!token || !usuario) {
    return <Navigate to="/login" replace />
  }

  if (
    rolesPermitidos.length > 0 &&
    !rolesPermitidos.includes(usuario.rol)
  ) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute