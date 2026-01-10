import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/picks">Picks</Link>
        <Link to="/analytics">Analytics</Link>

        {/* Upgrade Links */}
        {user?.role === 'free' && <Link to="/upgrade">Upgrade</Link>}

        {/* ADMIN LINKS */}
        {user?.role === 'admin' && (
          <>
            <Link to="/admin">Admin</Link>
            <Link to="/admin/dashboard">Dashboard</Link>
          </>
        )}

        {/* AUTH LINKS */}
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {/* USER INFO */}
        {user && (
          <>
            <span className="user-info">
              {user.email} ({user.role})
            </span>
            <button onClick={logout}>Logout</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
