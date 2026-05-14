import { Navigate, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import HomeRedirect from "./components/HomeRedirect.jsx";
import GuestRoute from "./components/GuestRoute.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import GameDetail from "./pages/GameDetail.jsx";
import Profile from "./pages/Profile.jsx";
import AuthPage from "./pages/AuthPage.jsx";

function App() {
  
    return (
      <>
      <Header />
    <Routes>
      {/* ROOT */}
      <Route path="/" element={<HomeRedirect />} />

      {/* LOGIN */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <AuthPage />
          </GuestRoute>
        }
      />

      {/* REGISTER */}
      <Route
        path="/register"
        element={
          <GuestRoute>
            <AuthPage />
          </GuestRoute>
        }
      />

      {/* HOME */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* GAME DETAIL */}
      <Route
        path="/games/:id"
        element={
          <ProtectedRoute>
            <GameDetail />
          </ProtectedRoute>
        }
      />

      {/* PROFILE */}
      <Route
        path="/profile/:id"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
    );
  
}

export default App;
