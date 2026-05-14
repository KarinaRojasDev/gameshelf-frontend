import { Navigate } from 'react-router-dom'
import useAuth from '../context/useAuth.js'

function HomeRedirect() {
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

  return <Navigate to={user ? '/home' : '/login'} replace />
}

export default HomeRedirect;