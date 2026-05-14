import { Link, useNavigate, useLocation  } from "react-router-dom";
import useAuth from "../../context/useAuth.js";
import Button from "../Button/Button.jsx";
import styles from "./Header.module.css";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation()

  

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }
  return (
    <header className={styles.header}>
      <Link className={styles.headerHomeLink} to={user ? "/home" : "/login"}>Home</Link>
      <nav className={styles.headerNav}>
        {user ? (
          <>
            <Link className={styles.headerProfileLink} to={`/profile/${user.id}`}>Mi perfil</Link>
            <Button
              className={styles.headerLogoutButton}
              type="button"
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>
          </>
        ) : (
          <>
            <Link className={styles.headerLoginLink} to="/login">Login</Link>
            <Link className={styles.headerRegisterLink} to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
