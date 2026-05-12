import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../context/useAuth.js'


// src/pages/Register.jsx
function Register() {
  const navigate = useNavigate();
  const { register, error, setError } = useAuth();
  const [formData, setFormData] = useState({username: '',email: '',password: ''});
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    setIsSubmitting(true)

    try {
      await register(formData)

      setSuccess('Usuario creado correctamente. Redirigiendo...')

      setTimeout(() => {
        navigate('/login')
      }, 900)

    } catch {
      return
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <main className="page">

        <section className="heading">
          <h1>Register</h1>
          <p>Crea tu cuenta</p>
        </section>

        <article className="card">

          <h2>Register</h2>

          <form className="form" onSubmit={handleSubmit}>

            <div className="field">
              <label htmlFor="username">Username</label>
              <input id="username" name="username" value={formData.username} onChange={handleChange} required/>
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required/>
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required/>
            </div>

            <div className="form-actions actions">
              <button className="primary-button" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creando...' : 'Crear cuenta'}
              </button>
            </div>

          </form>

          {error ? <div className="error">{error}</div> : null}
          {success ? <div className="success">{success}</div> : null}

          <p className="footer">
            Si ya tienes cuenta, vuelve a <Link to="/login">login</Link>.
          </p>

        </article>
      </main>
    </>
  )
}
export default Register;
