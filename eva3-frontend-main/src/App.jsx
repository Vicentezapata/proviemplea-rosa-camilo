import { Routes, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Login from './pages/Login'
import DashboardAdmin from './pages/DashboardAdmin'
import DashboardEmpresa from './pages/DashboardEmpresa'
import DashboardTalento from './pages/DashboardTalento'
import Talentos from './pages/Talentos'
import Empresas from './pages/Empresas'
import Solicitudes from './pages/Solicitudes'
import Seguimientos from './pages/Seguimientos'
import BuscarTalentos from './pages/BuscarTalentos'
import ContactoAprobado from './pages/ContactoAprobado'
import MisSolicitudesEmpresa from './pages/MisSolicitudesEmpresa'

import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute rolesPermitidos={['admin']}>
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/empresa"
        element={
          <ProtectedRoute rolesPermitidos={['empresa']}>
            <DashboardEmpresa />
          </ProtectedRoute>
        }
      />

      <Route
        path="/talento"
        element={
          <ProtectedRoute rolesPermitidos={['talento']}>
            <DashboardTalento />
          </ProtectedRoute>
        }
      />

      <Route
        path="/talentos"
        element={
          <ProtectedRoute rolesPermitidos={['admin']}>
            <Talentos />
          </ProtectedRoute>
        }
      />

      <Route
        path="/empresas"
        element={
          <ProtectedRoute rolesPermitidos={['admin']}>
            <Empresas />
          </ProtectedRoute>
        }
      />

      <Route
        path="/solicitudes"
        element={
          <ProtectedRoute rolesPermitidos={['admin']}>
            <Solicitudes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/seguimientos"
        element={
          <ProtectedRoute rolesPermitidos={['admin']}>
            <Seguimientos />
          </ProtectedRoute>
        }
      />

      <Route
        path="/buscar-talentos"
        element={
          <ProtectedRoute rolesPermitidos={['empresa']}>
            <BuscarTalentos />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mis-solicitudes"
        element={
          <ProtectedRoute rolesPermitidos={['empresa']}>
            <MisSolicitudesEmpresa />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contacto-aprobado"
        element={
          <ProtectedRoute rolesPermitidos={['empresa']}>
            <ContactoAprobado />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App