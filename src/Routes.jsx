import { Routes, Route, Navigate } from 'react-router-dom'
import App from './App.jsx'
import Login from './pages/login/Login.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import Profile from './pages/profile/Profile.jsx'
import NotFound from './pages/notfound/NotFound.jsx'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      />
      <Route 
        path="/profile" 
        element={
        <ProtectedRoutes>
          <Profile />
        </ProtectedRoutes>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
