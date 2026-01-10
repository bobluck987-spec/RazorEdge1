import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Analytics() {
  const { user, token } = useAuth();

  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    async function loadAnalytics() {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
          token, // <-- IMPORTANT: supports older middleware
        };

        const summaryRes = await fetch('/api/analytics/summary', { headers });
        if (!summaryRes.ok) {
          throw new Error('Summary fetch failed');
        }

        const historyRes = await fetch('/api/analytics/history', { headers });
        if (!historyRes.ok) {
          throw new Error('History fetch failed');
        }

        const summaryData = await summaryRes.json();
        const historyData = await historyRes.json();

        setSummary(summaryData);
        setHistory(historyData);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, [token]);

  if (!user) return <p>Please log in to view analytics.</p>;
  if (loading) return <p>Loading analytics...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Performance Summary</h2>
      <ul>
        <li>Total Picks: {summary.total}</li>
        <li>Wins: {summary.wins}</li>
        <li>Losses: {summary.losses}</li>
        <li>Pushes: {summary.pushes}</li>
        <li>ROI: {summary.roi}%</li>
      </ul>

      <h3>Pick History</h3>
      <ul>
        {history.map((h, i) => (
          <li key={i}>
            {h.date} — {h.result}
          </li>
        ))}
      </ul>
    </div>
  );
}
