import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Picks from './pages/Picks.jsx';
import Analytics from './pages/Analytics.jsx';
import NotFound from './pages/NotFound.jsx';
import Header from './components/Header.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import { PickProvider } from './context/PickContext.jsx';
import Upgrade from "./pages/Upgrade.jsx";

export default function App() {
  return (
    <AuthProvider>
      <PickProvider>
        <HashRouter>
          <div> {/* style={{ padding: 20 }}>*/}
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/picks" element={<Picks />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/upgrade" element={<Upgrade />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute role="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </HashRouter>
      </PickProvider>
    </AuthProvider>
  );
}
