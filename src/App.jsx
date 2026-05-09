import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameDetail from "./pages/GameDetail";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register  from "./pages/Register";


function App() {
  return(
  <Routes>
    <Route path="/" element={<h1>Home</h1>} />
    <Route path="/games/:id" element={<h1>Detalle del juego</h1>} />
    <Route path="/profile/:id" element={<h1>Perfil de usuario</h1>} />
    <Route path="/login" element={<h1>Login</h1>} />
    <Route path="/register" element={<h1>Register</h1>} />
  </Routes>
  )
}

export default App;
