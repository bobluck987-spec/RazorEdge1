import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

export const PickContext = createContext();

export function PickProvider({ children }) {
  const { user } = useAuth();
  const [picks, setPicks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('upcoming'); // upcoming, week, month, ytd
  
  const getDateRange = (range) => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (range) {
      case 'upcoming':
        return {
          start: startOfToday.toISOString(),
            end: new Date(startOfToday.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
        };
      case 'week':
        const weekStart = new Date(startOfToday);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Start of current week (Sunday)
        return {
          start: weekStart.toISOString(),
            end: new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
        };
      case 'month':
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
        return {
          start: monthStart.toISOString(),
            end: monthEnd.toISOString()
        };
      case 'ytd':
        const yearStart = new Date(now.getFullYear(), 0, 1);
        return {
          start: yearStart.toISOString(),
            end: now.toISOString()
        };
      default:
        return {
          start: startOfToday.toISOString(),
            end: new Date(startOfToday.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
        };
    }
  };
  
  const fetchPicks = async (range = dateRange) => {
    try {
      setLoading(true);
      setError(null);
      
      const { start, end } = getDateRange(range);
      
      const { data, error: fetchError } = await supabase
        .rpc('get_picks_for_user', {
          user_role: user?.role || 'free',
          start_date: start,
          end_date: end
        });
      
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
  }, [user, dateRange]);
  
  return (
    <PickContext.Provider
      value={{
        picks,
        loading,
        error,
        dateRange,
        setDateRange,
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