import { Navigate } from 'react-router-dom'
import useAuth from '../context/useAuth.js'

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
  <main>
    <section>
      <p>Cargando sesión...</p>
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