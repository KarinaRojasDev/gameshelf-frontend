import {Navigate, Routes, Route } from "react-router-dom";

import HomeRedirect from './components/HomeRedirect.jsx'
import GuestRoute from './components/GuestRoute.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import Home from "./pages/Home.jsx";
import GameDetail from "./pages/GameDetail.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
  return (
    <Routes>
      {/* ROOT */}
      <Route path="/" element={<HomeRedirect />} />

      {/* LOGIN */}
      <Route path="/login" element={<GuestRoute><Login /></GuestRoute>}/>

       {/* REGISTER */}
      <Route path="/register" element={<GuestRoute><Register /></GuestRoute>}/>

       {/* HOME */}
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>

       {/* GAME DETAIL */}
      <Route path="/games/:id" element={<GameDetail />} />

      {/* PROFILE */}
      <Route path="/profile/:id" element={<Profile />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;
