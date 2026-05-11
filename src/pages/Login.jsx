import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuth from '../context/useAuth.js'


// src/pages/Login.jsx
function Login() {
  const navigate = useNavigate()
  const { login, error, setError } = useAuth();
  const [formData, setFormData] = useState({email: '',password: ''});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(formData)
      // login OK
      navigate('/home')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
     <>
      <main className="page">

        <section className="heading">
          <h1>Login</h1>
          <p>Accede a tu cuenta</p>
        </section>

        <article className="card">

          <h2>Login</h2>

          <form className="form" onSubmit={handleSubmit}>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required/>
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required/>
            </div>

            <div className="form-actions actions">
              <button className="primary-button" type="submit" disabled={loading}>
                {loading ? 'Entrando...' : 'Login'}
              </button>
            </div>

          </form>

          {error ? <div className="error">{error}</div> : null}

          <p className="footer">
            ¿No tienes cuenta? <Link to="/register">Register</Link>
          </p>
        </article>
      </main>
    </>
  )
}
export default Login;
