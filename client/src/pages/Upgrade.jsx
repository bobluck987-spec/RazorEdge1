import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const Upgrade = () => {
  const { user, login } = useAuth();

  const handleUpgrade = () => {
    // TEMP: simulate successful Stripe checkout
    // Later this will be replaced with Stripe redirect + webhook
    login(user.email, 'premium');
  };

  return (
    <div className="page-container">
      <h1>Upgrade to Premium</h1>

      <div className="pricing-card">
        <h2>Premium Access</h2>
        <p>$29 / month</p>

        <ul>
          <li>All premium picks</li>
          <li>Full analytics & charts</li>
          <li>Historical performance</li>
          <li>Admin-grade insights</li>
        </ul>

        {user?.role === 'premium' || user?.role === 'admin' ? (
          <p>You already have Premium access.</p>
        ) : (
          <button onClick={handleUpgrade}>Upgrade Now</button>
        )}
      </div>
    </div>
  );
};

export default Upgrade;
