import React, { useState } from 'react';
import { usePickContext } from '../context/PickContext';
import { useAuth } from '../context/AuthContext';

export default function Admin() {
  const { user } = useAuth();
  const { picks, loading, createPick, updatePick, gradePick } = usePickContext();

  const [newPick, setNewPick] = useState({
    sport: 'NFL',
    matchup: '',
    pickType: 'Spread',
    line: '',
    odds: '',
    isUnderdog: true,
    access: 'free',
    notes: '',
  });

  if (!user || user.role !== 'admin') {
    return <p>Unauthorized</p>;
  }

  if (loading) {
    return <p>Loading picks...</p>;
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    await createPick(newPick);
    setNewPick({
      sport: 'NFL',
      matchup: '',
      pickType: 'Spread',
      line: '',
      odds: '',
      isUnderdog: true,
      access: 'free',
      notes: '',
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>

      {/* CREATE PICK */}
      <section style={{ marginBottom: 40 }}>
        <h3>Create New Pick</h3>

        <form onSubmit={handleCreate}>
          <input
            placeholder="Matchup"
            value={newPick.matchup}
            onChange={(e) =>
              setNewPick({ ...newPick, matchup: e.target.value })
            }
            required
          />

          <input
            placeholder="Line / Total"
            value={newPick.line}
            onChange={(e) => setNewPick({ ...newPick, line: e.target.value })}
          />

          <input
            placeholder="Odds"
            value={newPick.odds}
            onChange={(e) => setNewPick({ ...newPick, odds: e.target.value })}
          />

          <select
            value={newPick.pickType}
            onChange={(e) =>
              setNewPick({ ...newPick, pickType: e.target.value })
            }
          >
            <option>Spread</option>
            <option>Moneyline</option>
            <option>Total</option>
          </select>

          <select
            value={newPick.access}
            onChange={(e) => setNewPick({ ...newPick, access: e.target.value })}
          >
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>

          <textarea
            placeholder="Notes"
            value={newPick.notes}
            onChange={(e) => setNewPick({ ...newPick, notes: e.target.value })}
          />

          <button type="submit">Create Pick</button>
        </form>
      </section>

      {/* EXISTING PICKS */}
      <section>
        <h3>Existing Picks</h3>

        {picks.map((pick) => (
          <div
            key={pick.id}
            style={{
              border: '1px solid #ccc',
              padding: 12,
              marginBottom: 12,
            }}
          >
            <strong>{pick.matchup}</strong>
            <p>
              {pick.pickType} {pick.line} ({pick.odds})
            </p>
            <p>Access: {pick.access}</p>
            <p>Status: {pick.status}</p>

            <div>
              <button onClick={() => gradePick(pick.id, 'win')}>Win</button>
              <button onClick={() => gradePick(pick.id, 'loss')}>Loss</button>
              <button onClick={() => gradePick(pick.id, 'push')}>Push</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
