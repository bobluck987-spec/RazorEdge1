import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    // TEMP: All new users start as FREE
    // Backend will control role later
    register(email);

    navigate('/');
  };

  return (
    <div className="page-container">
      <h1>Create Account</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
          />
        </label>

        <button type="submit">Register</button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Already have an account?{' '}
        <span
          style={{ color: '#4ea1ff', cursor: 'pointer' }}
          onClick={() => navigate('/login')}
        >
          Log in
        </span>
      </p>
    </div>
  );
};

export default Register;
