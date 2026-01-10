import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

export const PickContext = createContext();

export function PickProvider({ children }) {
  const { token } = useAuth();

  const [picks, setPicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPicks = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/picks', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!res.ok) {
        throw new Error('Failed to fetch picks');
      }

      const data = await res.json();
      setPicks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPicks();
  }, [token]);

  return (
    <PickContext.Provider
      value={{
        picks,
        loading,
        error,
        refreshPicks: fetchPicks,
      }}
    >
      {children}
    </PickContext.Provider>
  );
}

export function usePickContext() {
  return useContext(PickContext);
}
