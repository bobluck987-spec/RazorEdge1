import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

export const PickContext = createContext();

export function PickProvider({ children }) {
  const { user } = useAuth();
  const [picks, setPicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchPicks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('picks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (fetchError) throw fetchError;
      
      setPicks(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching picks:', err);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPicks();
  }, [user]);
  
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