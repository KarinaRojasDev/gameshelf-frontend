import { Navigate } from 'react-router-dom'
import useAuth from '../context/useAuth.js'

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
       <main className="auth-status-page">
        <section className="auth-status-card">
          <p className="auth-status-text">Cargando sesión...</p>
        </section>
      </main>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute;