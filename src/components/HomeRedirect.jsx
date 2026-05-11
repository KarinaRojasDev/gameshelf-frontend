import { Navigate } from 'react-router-dom'
import useAuth from '../context/useAuth.js'

function HomeRedirect() {
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

  return <Navigate to={user ? '/home' : '/login'} replace />
}

export default HomeRedirect;