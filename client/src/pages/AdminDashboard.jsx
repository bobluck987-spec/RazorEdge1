import React from 'react';
import { usePickContext } from '../context/PickContext.jsx';

export default function AdminDashboard() {
  const { picks } = usePickContext();

  const gradedThenEdited = picks.filter((p) =>
    p.auditLog?.some(
      (log) => log.changes && log.changes.length > 0 && p.status !== 'pending'
    )
  );

  const pendingTooLong = picks.filter(
    (p) =>
      p.status === 'pending' &&
      new Date(p.date) < new Date(Date.now() - 48 * 60 * 60 * 1000)
  );

  const premiumExposed = picks.filter(
    (p) => p.access === 'premium' && p.exposedToFree
  );

  return (
    <div>
      <h2>Admin Integrity Dashboard</h2>

      <section>
        <h3>⚠️ Graded Then Edited</h3>
        {gradedThenEdited.length === 0 ? (
          <p>None</p>
        ) : (
          gradedThenEdited.map((p) => <p key={p.id}>{p.matchup}</p>)
        )}
      </section>

      <section>
        <h3>⏳ Pending Too Long</h3>
        {pendingTooLong.length === 0 ? (
          <p>None</p>
        ) : (
          pendingTooLong.map((p) => <p key={p.id}>{p.matchup}</p>)
        )}
      </section>

      <section>
        <h3>🔓 Premium Exposure Risk</h3>
        {premiumExposed.length === 0 ? (
          <p>None</p>
        ) : (
          premiumExposed.map((p) => <p key={p.id}>{p.matchup}</p>)
        )}
      </section>
    </div>
  );
}
