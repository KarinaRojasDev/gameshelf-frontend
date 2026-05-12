import { Link, useNavigate, useLocation  } from "react-router-dom";
import useAuth from "../context/useAuth.js";

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
    <header>
      <Link to={user ? "/home" : "/login"}>Home</Link>
      <nav>
        {user ? (
          <>
            <Link to={`/profile/${user.id}`}>Mi perfil</Link>
            <button type="button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
