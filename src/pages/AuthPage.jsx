import { useLocation } from "react-router-dom";
import AuthForm from "../components/AuthForm/AuthForm.jsx";
import styles from "./AuthPage.module.css";

function AuthPage() {
  const location = useLocation();
  const type = location.pathname === "/register" ? "register" : "login";

  return (
    <main className={styles.authPage}>
      <AuthForm key={type} type={type} />
    </main>
  );
}

export default AuthPage;
