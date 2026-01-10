import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function PickCard({ pick }) {
  const { user } = useAuth();

  const isPremiumPick = pick.access === 'premium';
  const isPremiumUser = user.role === 'premium' || user.role === 'admin';

  // Free users should NEVER receive premium pick details
  if (isPremiumPick && !isPremiumUser) {
    return (
      <div
        style={{
          border: '1px solid #ccc',
          padding: '1rem',
          marginBottom: '1rem',
          opacity: 0.9,
        }}
      >
        <p>
          <strong>Premium Pick</strong>
        </p>
        <p>This pick is available to premium members.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '1rem',
        marginBottom: '1rem',
      }}
    >
      <p>
        <strong>Matchup:</strong> {pick.matchup}
      </p>
      <p>
        <strong>Pick:</strong> {pick.pick}
      </p>
      <p>
        <strong>Odds:</strong> {pick.odds}
      </p>
      <p>
        <strong>Status:</strong> {pick.status}
      </p>

      {pick.notes && (
        <p>
          <strong>Notes:</strong> {pick.notes}
        </p>
      )}

      {pick.status === 'pending' && (
        <p style={{ fontStyle: 'italic' }}>Pending result</p>
      )}

      {(user.role === 'premium' || user.role === 'admin') && (
        <p style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
          Premium access
        </p>
      )}
    </div>
  );
}
