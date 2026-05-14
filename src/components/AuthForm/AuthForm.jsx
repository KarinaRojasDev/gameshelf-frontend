import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../context/useAuth.js";
import Button from "../Button/Button.jsx";
import styles from "./AuthForm.module.css";

function AuthForm({ type }) {
  const navigate = useNavigate();
  const { login, register, error, setError } = useAuth();
  const isLogin = type === "login";
  const [formData, setFormData] = useState(
    isLogin
      ? { email: "", password: "" }
      : { username: "", email: "", password: "" },
  );
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (isLogin) {
      try {
        await login(formData);
        // login OK
        navigate("/home");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
      return;
    }

    setSuccess("");

    try {
      await register(formData);

      setSuccess("Usuario creado correctamente. Redirigiendo...");

      setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch {
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authForm}>
     
        
        <article className={styles.authFormCard}>
          <h2 className={styles.authFormCardTitle}>{isLogin ? "Login" : "Register"}</h2>

          <form className={styles.authFormForm} onSubmit={handleSubmit}>
            {!isLogin && (
              <div className={styles.authFormField}>
                <label className={styles.authFormLabel} htmlFor="username">Username</label>
                <input
                  className={styles.authFormInput}
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className={styles.authFormField}>
              <label className={styles.authFormLabel} htmlFor="email">Email</label>
              <input
                className={styles.authFormInput}
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.authFormField}>
              <label className={styles.authFormLabel} htmlFor="password">Password</label>
              <input
                className={styles.authFormInput}
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.authFormActions}>
              <Button
                className={styles.authFormSubmitButton}
                type="submit"
                disabled={loading}
              >
                {loading
                  ? isLogin
                    ? "Entrando..."
                    : "Creando..."
                  : isLogin
                    ? "Login"
                    : "Crear cuenta"}
              </Button>
            </div>
          </form>

          {error ? <div className={styles.authFormError}>{error}</div> : null}
          {!isLogin && success ? <div className={styles.authFormSuccess}>{success}</div> : null}

          {isLogin ? (
            <p className={styles.authFormFooter}>
              ¿No tienes cuenta? <Link className={styles.authFormLink} to="/register">Register</Link>
            </p>
          ) : (
            <p className={styles.authFormFooter}>
              Si ya tienes cuenta, vuelve a <Link className={styles.authFormLink} to="/login">login</Link>.
            </p>
          )}
        </article>
  
    </div>
  );
}

export default AuthForm;
