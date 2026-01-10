import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminDashboard() {
  const [picks, setPicks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('picks');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPick, setEditingPick] = useState(null);

  const [formData, setFormData] = useState({
    sport: '',
    matchup: '',
    pick_type: 'Spread',
    line: '',
    odds: -110,
    is_underdog: true,
    access: 'free',
    status: 'pending',
    notes: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: picksData } = await supabase
        .from('picks')
        .select('*');

      const { data: usersData } = await supabase
        .from('user_profiles')
        .select('*');

      setPicks(picksData || []);
      setUsers(usersData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePick = async () => {
    try {
      const { error } = await supabase.from('picks').insert([formData]);

      if (error) throw error;

      alert('Pick created successfully!');
      setShowCreateForm(false);
      resetForm();
      loadData();
    } catch (error) {
      alert('Error creating pick: ' + error.message);
    }
  };

  const handleUpdatePick = async () => {
    try {
      const { error } = await supabase
        .from('picks')
        .update(formData)
        .eq('id', editingPick.id);

      if (error) throw error;

      alert('Pick updated successfully!');
      setEditingPick(null);
      resetForm();
      loadData();
    } catch (error) {
      alert('Error updating pick: ' + error.message);
    }
  };

  const handleGradePick = async (pickId, newStatus) => {
    try {
      const { error } = await supabase
        .from('picks')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', pickId);

      if (error) throw error;

      loadData();
    } catch (error) {
      alert('Error grading pick: ' + error.message);
    }
  };

  const handleDeletePick = async (pickId) => {
    if (!confirm('Are you sure you want to delete this pick?')) return;

    try {
      const { error } = await supabase.from('picks').delete().eq('id', pickId);

      if (error) throw error;

      alert('Pick deleted successfully!');
      loadData();
    } catch (error) {
      alert('Error deleting pick: ' + error.message);
    }
  };

  const handleChangeUserRole = async (userId, newRole) => {
    try {
      const { error} = await supabase
        .from('user_profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      alert('User role updated successfully!');
      loadData();
    } catch (error) {
      alert('Error updating user role: ' + error.message);
    }
  };

  const startEdit = (pick) => {
    setEditingPick(pick);
    setFormData({
      sport: pick.sport,
      matchup: pick.matchup,
      pick_type: pick.pick_type,
      line: pick.line || '',
      odds: pick.odds,
      is_underdog: pick.is_underdog,
      access: pick.access,
      status: pick.status,
      notes: pick.notes || '',
    });
    setShowCreateForm(true);
  };

  const resetForm = () => {
    setFormData({
      sport: '',
      matchup: '',
      pick_type: 'Spread',
      line: '',
      odds: -110,
      is_underdog: true,
      access: 'free',
      status: 'pending',
      notes: '',
    });
  };

  const cancelEdit = () => {
    setEditingPick(null);
    setShowCreateForm(false);
    resetForm();
  };

  const totalPicks = picks.length;
  const wins = picks.filter((p) => p.status === 'win').length;
  const losses = picks.filter((p) => p.status === 'loss').length;
  const winRate = totalPicks > 0 ? ((wins / (wins + losses)) * 100).toFixed(1) : '0';

  if (loading) {
    return <div style={{ padding: 40 }}>Loading admin dashboard...</div>;
  }

  return (
    <div style={{ padding: 20, maxWidth: 1200, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 30 }}>Admin Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 30 }}>
        <div style={{ padding: 20, background: '#f5f5f5', borderRadius: 8 }}>
          <h3 style={{ margin: 0, fontSize: 14, color: '#666' }}>Total Picks</h3>
          <p style={{ margin: '10px 0 0', fontSize: 32, fontWeight: 'bold' }}>{totalPicks}</p>
        </div>
        <div style={{ padding: 20, background: '#e8f5e9', borderRadius: 8 }}>
          <h3 style={{ margin: 0, fontSize: 14, color: '#2e7d32' }}>Wins</h3>
          <p style={{ margin: '10px 0 0', fontSize: 32, fontWeight: 'bold', color: '#2e7d32' }}>{wins}</p>
        </div>
        <div style={{ padding: 20, background: '#ffebee', borderRadius: 8 }}>
          <h3 style={{ margin: 0, fontSize: 14, color: '#c62828' }}>Losses</h3>
          <p style={{ margin: '10px 0 0', fontSize: 32, fontWeight: 'bold', color: '#c62828' }}>{losses}</p>
        </div>
        <div style={{ padding: 20, background: '#fff3e0', borderRadius: 8 }}>
          <h3 style={{ margin: 0, fontSize: 14, color: '#e65100' }}>Win Rate</h3>
          <p style={{ margin: '10px 0 0', fontSize: 32, fontWeight: 'bold', color: '#e65100' }}>{winRate}%</p>
        </div>
      </div>

      <div style={{ borderBottom: '2px solid #e0e0e0', marginBottom: 20 }}>
        <button
          onClick={() => setActiveTab('picks')}
          style={{
            padding: '10px 20px',
            border: 'none',
            background: activeTab === 'picks' ? '#1976d2' : 'transparent',
            color: activeTab === 'picks' ? 'white' : '#666',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginRight: 10,
          }}
        >
          Manage Picks ({picks.length})
        </button>
        <button
          onClick={() => setActiveTab('users')}
          style={{
            padding: '10px 20px',
            border: 'none',
            background: activeTab === 'users' ? '#1976d2' : 'transparent',
            color: activeTab === 'users' ? 'white' : '#666',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Manage Users ({users.length})
        </button>
      </div>

      {activeTab === 'picks' && (
        <div>
          <button
            onClick={() => {
              setShowCreateForm(!showCreateForm);
              if (!showCreateForm) {
                setEditingPick(null);
                resetForm();
              }
            }}
            style={{
              padding: '12px 24px',
              background: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: 20,
            }}
          >
            {showCreateForm ? 'Cancel' : '+ Create New Pick'}
          </button>

          {showCreateForm && (
            <div style={{ background: '#f9f9f9', padding: 20, borderRadius: 8, marginBottom: 30 }}>
              <h3>{editingPick ? 'Edit Pick' : 'Create New Pick'}</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Sport</label>
                  <input
                    type="text"
                    value={formData.sport}
                    onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                    placeholder="NFL, NBA, MLB, etc."
                    style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Matchup</label>
                  <input
                    type="text"
                    value={formData.matchup}
                    onChange={(e) => setFormData({ ...formData, matchup: e.target.value })}
                    placeholder="Team A vs Team B"
                    style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Pick Type</label>
                  <select
                    value={formData.pick_type}
                    onChange={(e) => setFormData({ ...formData, pick_type: e.target.value })}
                    style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                  >
                    <option value="Spread">Spread</option>
                    <option value="Moneyline">Moneyline</option>
                    <option value="Over/Under">Over/Under</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Line</label>
                  <input
                    type="text"
                    value={formData.line}
                    onChange={(e) => setFormData({ ...formData, line: e.target.value })}
                    placeholder="+3.5, -7, O 45.5"
                    style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Odds</label>
                  <input
                    type="number"
                    value={formData.odds}
                    onChange={(e) => setFormData({ ...formData, odds: parseInt(e.target.value) })}
                    placeholder="-110, +150"
                    style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Access Level</label>
                  <select
                    value={formData.access}
                    onChange={(e) => setFormData({ ...formData, access: e.target.value })}
                    style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                  >
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>
                    <input
                      type="checkbox"
                      checked={formData.is_underdog}
                      onChange={(e) => setFormData({ ...formData, is_underdog: e.target.checked })}
                      style={{ marginRight: 8 }}
                    />
                    Is Underdog Pick
                  </label>
                </div>
              </div>

              <div style={{ marginTop: 15 }}>
                <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Analysis, reasoning, etc."
                  rows={3}
                  style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                />
              </div>

              <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
                <button
                  onClick={editingPick ? handleUpdatePick : handleCreatePick}
                  style={{
                    padding: '10px 20px',
                    background: '#2e7d32',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  {editingPick ? 'Update Pick' : 'Create Pick'}
                </button>
                <button
                  onClick={cancelEdit}
                  style={{
                    padding: '10px 20px',
                    background: '#757575',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gap: 15 }}>
            {picks.map((pick) => (
              <div
                key={pick.id}
                style={{
                  background: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: 8,
                  padding: 20,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <h3 style={{ margin: 0 }}>{pick.matchup}</h3>
                      <span
                        style={{
                          padding: '4px 8px',
                          background: pick.access === 'premium' ? '#ffd700' : '#e0e0e0',
                          borderRadius: 4,
                          fontSize: 12,
                          fontWeight: 'bold',
                        }}
                      >
                        {pick.access.toUpperCase()}
                      </span>
                      <span
                        style={{
                          padding: '4px 8px',
                          background:
                            pick.status === 'win'
                              ? '#4caf50'
                              : pick.status === 'loss'
                              ? '#f44336'
                              : pick.status === 'push'
                              ? '#ff9800'
                              : '#9e9e9e',
                          color: 'white',
                          borderRadius: 4,
                          fontSize: 12,
                          fontWeight: 'bold',
                        }}
                      >
                        {pick.status.toUpperCase()}
                      </span>
                    </div>

                    <p style={{ margin: '5px 0', color: '#666' }}>
                      <strong>{pick.sport}</strong> • {pick.pick_type}
                      {pick.line && ` ${pick.line}`} • {pick.odds > 0 ? '+' : ''}
                      {pick.odds}
                    </p>

                    {pick.notes && (
                      <p style={{ margin: '10px 0', fontStyle: 'italic', color: '#555' }}>
                        {pick.notes}
                      </p>
                    )}

                    <p style={{ margin: '10px 0 0', fontSize: 12, color: '#999' }}>
                      Created: {new Date(pick.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 200 }}>
                    {pick.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleGradePick(pick.id, 'win')}
                          style={{
                            padding: '8px 16px',
                            background: '#4caf50',
                            color: 'white',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                          }}
                        >
                          ✓ Mark Win
                        </button>
                        <button
                          onClick={() => handleGradePick(pick.id, 'loss')}
                          style={{
                            padding: '8px 16px',
                            background: '#f44336',
                            color: 'white',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                          }}
                        >
                          ✗ Mark Loss
                        </button>
                        <button
                          onClick={() => handleGradePick(pick.id, 'push')}
                          style={{
                            padding: '8px 16px',
                            background: '#ff9800',
                            color: 'white',
                            border: 'none',
                            borderRadius: 4,
                            cursor: 'pointer',
                          }}
                        >
                          ↔ Mark Push
                        </button>
                      </>
                    )}

                    {pick.status !== 'pending' && (
                      <button
                        onClick={() => handleGradePick(pick.id, 'pending')}
                        style={{
                          padding: '8px 16px',
                          background: '#9e9e9e',
                          color: 'white',
                          border: 'none',
                          borderRadius: 4,
                          cursor: 'pointer',
                        }}
                      >
                        Reset to Pending
                      </button>
                    )}

                    <button
                      onClick={() => startEdit(pick)}
                      style={{
                        padding: '8px 16px',
                        background: '#1976d2',
                        color: 'white',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeletePick(pick.id)}
                      style={{
                        padding: '8px 16px',
                        background: '#d32f2f',
                        color: 'white',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {picks.length === 0 && (
              <p style={{ textAlign: 'center', color: '#999', padding: 40 }}>
                No picks yet. Create your first pick above!
              </p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div>
          <h2>User Management</h2>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: 12, textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>Email</th>
                <th style={{ padding: 12, textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>Role</th>
                <th style={{ padding: 12, textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>Created</th>
                <th style={{ padding: 12, textAlign: 'left', borderBottom: '2px solid #e0e0e0' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <td style={{ padding: 12 }}>{user.email}</td>
                  <td style={{ padding: 12 }}>
                    <span
                      style={{
                        padding: '4px 12px',
                        background:
                          user.role === 'admin'
                            ? '#f44336'
                            : user.role === 'premium'
                            ? '#ffd700'
                            : '#e0e0e0',
                        color: user.role === 'admin' || user.role === 'premium' ? 'white' : 'black',
                        borderRadius: 4,
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}
                    >
                      {user.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: 12, fontSize: 14, color: '#666' }}>
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td style={{ padding: 12 }}>
                    <select
                      value={user.role}
                      onChange={(e) => handleChangeUserRole(user.id, e.target.value)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 4,
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="free">Free</option>
                      <option value="premium">Premium</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p style={{ textAlign: 'center', color: '#999', padding: 40 }}>
              No users registered yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}