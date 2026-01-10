import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function Analytics() {
  const { user } = useAuth();
  
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    
    async function loadAnalytics() {
      try {
        // Fetch all picks the user has access to
        const { data: picks, error: fetchError } = await supabase
          .from('picks')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (fetchError) throw fetchError;
        
        // Calculate summary statistics
        const total = picks.length;
        const wins = picks.filter((p) => p.status === 'win').length;
        const losses = picks.filter((p) => p.status === 'loss').length;
        const pushes = picks.filter((p) => p.status === 'push').length;
        const pending = picks.filter((p) => p.status === 'pending').length;
        
        // Calculate ROI (simplified - assumes -110 odds and $100 bets)
        // You can make this more sophisticated later
        const settledPicks = wins + losses;
        const roi = settledPicks > 0 ?
          (((wins * 100) - (losses * 110)) / (settledPicks * 100) * 100).toFixed(2) :
          '0.00';
        
        setSummary({
          total,
          wins,
          losses,
          pushes,
          pending,
          roi,
          winRate: total > 0 ? ((wins / total) * 100).toFixed(1) : '0.0',
        });
        
        // Format history
        const formattedHistory = picks.map((pick) => ({
          date: new Date(pick.created_at).toLocaleDateString(),
          matchup: pick.matchup,
          result: pick.status,
          sport: pick.sport,
          pickType: pick.pick_type,
        }));
        
        setHistory(formattedHistory);
      } catch (err) {
        console.error('Analytics error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    loadAnalytics();
  }, [user]);
  
  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        <h2>Analytics</h2>
        <p>Please log in to view analytics.</p>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        <p>Loading analytics...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div style={{ padding: 40 }}>
        <p style={{ color: 'red' }}>Error: {error}</p>
      </div>
    );
  }
  
  if (!summary) {
    return (
      <div style={{ padding: 40 }}>
        <p>No analytics data available.</p>
      </div>
    );
  }
  
  return (
    <div style={{ padding: 40 }}>
      <h2>Performance Summary</h2>
      <ul>
        <li>Total Picks: {summary.total}</li>
        <li>Wins: {summary.wins}</li>
        <li>Losses: {summary.losses}</li>
        <li>Pushes: {summary.pushes}</li>
        <li>Pending: {summary.pending}</li>
        <li>Win Rate: {summary.winRate}%</li>
        <li>ROI: {summary.roi}%</li>
      </ul>

      <h3>Pick History ({history.length} picks)</h3>
      {history.length === 0 ? (
        <p>No picks yet.</p>
      ) : (
        <ul>
          {history.map((h, i) => (
            <li key={i}>
              <strong>{h.date}</strong> — {h.sport} — {h.matchup} — {h.pickType} —{' '}
              <span
                style={{
                  color:
                    h.result === 'win'
                      ? 'green'
                      : h.result === 'loss'
                      ? 'red'
                      : h.result === 'push'
                      ? 'orange'
                      : 'gray',
                  fontWeight: 'bold',
                }}
              >
                {h.result.toUpperCase()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}