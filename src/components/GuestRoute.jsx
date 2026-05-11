import { Navigate } from 'react-router-dom'
import useAuth from '../context/useAuth.js'

function GuestRoute({ children }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <main className="auth-status-page">
        <section className="auth-status-card">
          <p className="auth-status-text">Comprobando acceso...</p>
        </section>
      </main>
    )
  }

  if (user) {
    return <Navigate to="/home" replace />
  }

  return children
}

export default GuestRoute;