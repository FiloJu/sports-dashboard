import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../utils/AuthContext'

export default function ProtectedRoutes({ children }) {
  const { token } = useContext(AuthContext); 
    if (!token) {
        return <Navigate to="/login" />;  
    }
    return children; 
}