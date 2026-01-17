import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function AdminDashboard() {
  const [picks, setPicks] = useState([]);
  const [users, setUsers] = useState([]);
  const [userProfiles, setUserProfiles] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('picks');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPick, setEditingPick] = useState(null);
  const [selectedPickAudit, setSelectedPickAudit] = useState(null);

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
    game_date: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: picksData } = await supabase
        .from('picks')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: usersData } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      setPicks(picksData || []);
      setUsers(usersData || []);

      // Create a lookup map of user profiles
      const profileMap = {};
      (usersData || []).forEach(user => {
        profileMap[user.id] = user;
      });
      setUserProfiles(profileMap);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserEmail = (userId) => {
    return userProfiles[userId]?.email || 'Unknown';
  };

  const handleCreatePick = async () => {
    try {
      const { error } = await supabase.from('picks').insert([{
        ...formData,
        game_date: formData.game_date || null,
      }]);

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
        .update({
          ...formData,
          game_date: formData.game_date || null,
        })
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
      const { error } = await supabase
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
      game_date: pick.game_date ? new Date(pick.game_date).toISOString().slice(0, 16) : '',
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
      game_date: '',
    });
  };

  const cancelEdit = () => {
    setEditingPick(null);
    setShowCreateForm(false);
    resetForm();
  };

  // Analytics
  const totalPicks = picks.length;
  const wins = picks.filter((p) => p.status === 'win').length;
  const losses = picks.filter((p) => p.status === 'loss').length;
  const winRate = totalPicks > 0 ? ((wins / (wins + losses)) * 100).toFixed(1) : '0';

  // Integrity checks
  const gradedThenEdited = picks.filter((p) => {
    if (!p.audit_log || p.status === 'pending') return false;
    const logs = Array.isArray(p.audit_log) ? p.audit_log : [];
    return logs.some((log) => {
      const changes = log.changes || {};
      return (changes.matchup_changed || changes.odds_changed || changes.line_changed);
    });
  });

  const pendingTooLong = picks.filter((p) => {
    if (p.status !== 'pending' || !p.game_date) return false;
    const gameDate = new Date(p.game_date);
    const now = new Date();
    const hoursSinceGame = (now - gameDate) / (1000 * 60 * 60);
    return hoursSinceGame > 48;
  });

  const premiumExposed = picks.filter((p) => p.access === 'premium' && p.exposed_to_free);

  const rapidStatusChanges = picks.filter((p) => {
    if (!p.audit_log) return false;
    const logs = Array.isArray(p.audit_log) ? p.audit_log : [];
    const statusChanges = logs.filter((log) => log.previous_status !== log.new_status);
    return statusChanges.length >= 3;
  });

  const oddsManipulated = picks.filter((p) => {
    if (!p.audit_log) return false;
    const logs = Array.isArray(p.audit_log) ? p.audit_log : [];
    return logs.some((log) => {
      if (!log.changes?.odds_changed || !log.old_values?.odds) return false;
      const oldOdds = log.old_values.odds;
      const change = Math.abs(oldOdds - p.odds);
      return change >= 50;
    });
  });

  const retroactivePicks = picks.filter((p) => {
    if (!p.game_date || !p.created_at) return false;
    const gameDate = new Date(p.game_date);
    const createdDate = new Date(p.created_at);
    return createdDate > gameDate;
  });

  const accessLevelChanged = picks.filter((p) => {
    if (!p.audit_log) return false;
    const logs = Array.isArray(p.audit_log) ? p.audit_log : [];
    return logs.some((log) => log.changes?.access_changed);
  });

  const orphanedPicks = picks.filter((p) => !p.created_by);

  const totalIssues = gradedThenEdited.length + pendingTooLong.length + premiumExposed.length + 
                     rapidStatusChanges.length + oddsManipulated.length + retroactivePicks.length + 
                     accessLevelChanged.length + orphanedPicks.length;

  if (loading) {
    return <div style={{ padding: 40 }}>Loading admin dashboard...</div>;
  }

  return (
    <div style={{ padding: 20, maxWidth: 1400, margin: '0 auto' }}>
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
            marginRight: 10,
          }}
        >
          Manage Users ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('integrity')}
          style={{
            padding: '10px 20px',
            border: 'none',
            background: activeTab === 'integrity' ? '#1976d2' : 'transparent',
            color: activeTab === 'integrity' ? 'white' : '#666',
            cursor: 'pointer',
            fontWeight: 'bold',
            position: 'relative',
          }}
        >
          Integrity Checks
          {totalIssues > 0 && (
            <span style={{
              position: 'absolute',
              top: 5,
              right: 5,
              background: '#f44336',
              color: 'white',
              borderRadius: '50%',
              width: 20,
              height: 20,
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {totalIssues}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'integrity' && (
        <div style={{ display: 'grid', gap: 20 }}>
          <section style={{ background: '#fff3e0', padding: 20, borderRadius: 8, border: '2px solid #ff9800' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#e65100' }}>⚠️ Graded Then Edited ({gradedThenEdited.length})</h3>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 15 }}>
              Picks that were graded but then had their details changed afterward
            </p>
            {gradedThenEdited.length === 0 ? (
              <p style={{ color: '#666' }}>✓ No issues found</p>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {gradedThenEdited.map((p) => (
                  <div key={p.id} style={{ background: 'white', padding: 15, borderRadius: 6 }}>
                    <strong>{p.matchup}</strong> - {p.status.toUpperCase()}
                    <p style={{ margin: '5px 0', fontSize: 13, color: '#666' }}>
                      Created by: {getUserEmail(p.created_by)} | Graded by: {getUserEmail(p.graded_by)}
                    </p>
                    <button
                      onClick={() => setSelectedPickAudit(p)}
                      style={{ marginTop: 8, padding: '4px 12px', background: '#1976d2', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}
                    >
                      View Audit Log
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section style={{ background: '#ffebee', padding: 20, borderRadius: 8, border: '2px solid #f44336' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#c62828' }}>⏳ Pending Too Long ({pendingTooLong.length})</h3>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 15 }}>
              Picks where the game ended 48+ hours ago but haven't been graded
            </p>
            {pendingTooLong.length === 0 ? (
              <p style={{ color: '#666' }}>✓ All picks graded on time</p>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {pendingTooLong.map((p) => (
                  <div key={p.id} style={{ background: 'white', padding: 15, borderRadius: 6 }}>
                    <strong>{p.matchup}</strong>
                    <p style={{ margin: '5px 0', fontSize: 13, color: '#666' }}>
                      Game: {new Date(p.game_date).toLocaleString()} | Created by: {getUserEmail(p.created_by)}
                    </p>
                    <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => handleGradePick(p.id, 'win')}
                        style={{ padding: '6px 12px', background: '#4caf50', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}
                      >
                        Win
                      </button>
                      <button
                        onClick={() => handleGradePick(p.id, 'loss')}
                        style={{ padding: '6px 12px', background: '#f44336', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}
                      >
                        Loss
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section style={{ background: '#e3f2fd', padding: 20, borderRadius: 8, border: '2px solid #2196f3' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#1565c0' }}>🔓 Premium Exposure Risk ({premiumExposed.length})</h3>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 15 }}>
              Premium picks that may have been exposed to free users
            </p>
            {premiumExposed.length === 0 ? (
              <p style={{ color: '#666' }}>✓ All premium content protected</p>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {premiumExposed.map((p) => (
                  <div key={p.id} style={{ background: 'white', padding: 15, borderRadius: 6 }}>
                    <strong>{p.matchup}</strong>
                    <p style={{ margin: '5px 0', fontSize: 13, color: '#666' }}>
                      Created by: {getUserEmail(p.created_by)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section style={{ background: '#fce4ec', padding: 20, borderRadius: 8, border: '2px solid #e91e63' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#880e4f' }}>⚡ Rapid Status Changes ({rapidStatusChanges.length})</h3>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 15 }}>
              Picks graded 3+ times (potential manipulation)
            </p>
            {rapidStatusChanges.length === 0 ? (
              <p style={{ color: '#666' }}>✓ No suspicious grading activity</p>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {rapidStatusChanges.map((p) => (
                  <div key={p.id} style={{ background: 'white', padding: 15, borderRadius: 6 }}>
                    <strong>{p.matchup}</strong> - Current: {p.status.toUpperCase()}
                    <p style={{ margin: '5px 0', fontSize: 13, color: '#666' }}>
                      Created by: {getUserEmail(p.created_by)} | Graded by: {getUserEmail(p.graded_by)}
                    </p>
                    <button
                      onClick={() => setSelectedPickAudit(p)}
                      style={{ marginTop: 8, padding: '4px 12px', background: '#1976d2', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}
                    >
                      View History
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section style={{ background: '#f3e5f5', padding: 20, borderRadius: 8, border: '2px solid #9c27b0' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#4a148c' }}>📊 Odds Manipulation ({oddsManipulated.length})</h3>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 15 }}>
              Picks where odds changed by 50+ points after posting
            </p>
            {oddsManipulated.length === 0 ? (
              <p style={{ color: '#666' }}>✓ No significant odds changes</p>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {oddsManipulated.map((p) => (
                  <div key={p.id} style={{ background: 'white', padding: 15, borderRadius: 6 }}>
                    <strong>{p.matchup}</strong> - Current odds: {p.odds}
                    <button
                      onClick={() => setSelectedPickAudit(p)}
                      style={{ marginLeft: 10, padding: '4px 12px', background: '#1976d2', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}
                    >
                      View Changes
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section style={{ background: '#e8eaf6', padding: 20, borderRadius: 8, border: '2px solid #3f51b5' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#1a237e' }}>⏮️ Retroactive Picks ({retroactivePicks.length})</h3>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 15 }}>
              Picks created after their game date (backdating)
            </p>
            {retroactivePicks.length === 0 ? (
              <p style={{ color: '#666' }}>✓ All picks created before game time</p>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {retroactivePicks.map((p) => (
                  <div key={p.id} style={{ background: 'white', padding: 15, borderRadius: 6 }}>
                    <strong>{p.matchup}</strong>
                    <p style={{ margin: '5px 0', fontSize: 13, color: '#666' }}>
                      Game: {new Date(p.game_date).toLocaleString()} | Created: {new Date(p.created_at).toLocaleString()}
                    </p>
                    <p style={{ margin: '5px 0', fontSize: 13, color: '#666' }}>
                      By: {getUserEmail(p.created_by)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section style={{ background: '#fff9c4', padding: 20, borderRadius: 8, border: '2px solid #fbc02d' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#f57f17' }}>🔄 Access Level Changed ({accessLevelChanged.length})</h3>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 15 }}>
              Picks that switched between free/premium after posting
            </p>
            {accessLevelChanged.length === 0 ? (
              <p style={{ color: '#666' }}>✓ No access level changes</p>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {accessLevelChanged.map((p) => (
                  <div key={p.id} style={{ background: 'white', padding: 15, borderRadius: 6 }}>
                    <strong>{p.matchup}</strong> - Current: {p.access.toUpperCase()}
                    <button
                      onClick={() => setSelectedPickAudit(p)}
                      style={{ marginLeft: 10, padding: '4px 12px', background: '#1976d2', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12 }}
                    >
                      View History
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section style={{ background: '#efebe9', padding: 20, borderRadius: 8, border: '2px solid #795548' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#3e2723' }}>👤 Orphaned Picks ({orphanedPicks.length})</h3>
            <p style={{ fontSize: 14, color: '#666', marginBottom: 15 }}>
              Picks with no creator (data integrity issue)
            </p>
            {orphanedPicks.length === 0 ? (
              <p style={{ color: '#666' }}>✓ All picks have creators</p>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {orphanedPicks.map((p) => (
                  <div key={p.id} style={{ background: 'white', padding: 15, borderRadius: 6 }}>
                    <strong>{p.matchup}</strong>
                    <p style={{ margin: '5px 0', fontSize: 13, color: '#666' }}>
                      Created: {new Date(p.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {selectedPickAudit && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 30, maxWidth: 700, maxHeight: '80vh', overflow: 'auto', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
            <h2 style={{ marginTop: 0 }}>Audit Log: {selectedPickAudit.matchup}</h2>
            
            <div style={{ marginBottom: 20, padding: 15, background: '#f5f5f5', borderRadius: 6 }}>
              <p style={{ margin: '5px 0' }}><strong>Created by:</strong> {getUserEmail(selectedPickAudit.created_by)}</p>
              <p style={{ margin: '5px 0' }}><strong>Created at:</strong> {new Date(selectedPickAudit.created_at).toLocaleString()}</p>
              {selectedPickAudit.graded_by && (
                <>
                  <p style={{ margin: '5px 0' }}><strong>Graded by:</strong> {getUserEmail(selectedPickAudit.graded_by)}</p>
                  <p style={{ margin: '5px 0' }}><strong>Graded at:</strong> {new Date(selectedPickAudit.graded_at).toLocaleString()}</p>
                </>
              )}
            </div>

            <h3>Change History:</h3>
            {!selectedPickAudit.audit_log || selectedPickAudit.audit_log.length === 0 ? (
              <p>No changes recorded</p>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {(Array.isArray(selectedPickAudit.audit_log) ? selectedPickAudit.audit_log : []).map((log, idx) => (
                  <div key={idx} style={{ padding: 15, background: '#f9f9f9', borderRadius: 6, border: '1px solid #e0e0e0' }}>
                    <p style={{ margin: '0 0 8px', fontSize: 12, color: '#999' }}>
                      {new Date(log.timestamp).toLocaleString()} - By: {getUserEmail(log.user_id)}
                    </p>
                    
                    {log.previous_status !== log.new_status && (
                      <p style={{ margin: '5px 0', fontSize: 14 }}>
                        <strong>Status:</strong> {log.previous_status} → {log.new_status}
                      </p>
                    )}
                    
                    {log.changes && Object.keys(log.changes).some(k => log.changes[k]) && (
                      <div style={{ marginTop: 8 }}>
                        <strong style={{ fontSize: 13 }}>Changes made:</strong>
                        <ul style={{ margin: '5px 0', paddingLeft: 20, fontSize: 13 }}>
                          {log.changes.matchup_changed && <li>Matchup modified</li>}
                          {log.changes.odds_changed && <li>Odds changed</li>}
                          {log.changes.line_changed && <li>Line adjusted</li>}
                          {log.changes.access_changed && <li>Access level changed</li>}
                          {log.changes.sport_changed && <li>Sport changed</li>}
                        </ul>
                      </div>
                    )}
                    
                    {log.old_values && Object.keys(log.old_values).length > 0 && (
                      <div style={{ marginTop: 8, padding: 10, background: '#fff3e0', borderRadius: 4 }}>
                        <strong style={{ fontSize: 12, color: '#e65100' }}>Previous values:</strong>
                        <div style={{ fontSize: 12, marginTop: 5 }}>
                          {log.old_values.matchup && <p style={{ margin: '3px 0' }}>Matchup: {log.old_values.matchup}</p>}
                          {log.old_values.odds && <p style={{ margin: '3px 0' }}>Odds: {log.old_values.odds}</p>}
                          {log.old_values.line && <p style={{ margin: '3px 0' }}>Line: {log.old_values.line}</p>}
                          {log.old_values.access && <p style={{ margin: '3px 0' }}>Access: {log.old_values.access}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            <button
              onClick={() => setSelectedPickAudit(null)}
              style={{ marginTop: 20, padding: '10px 20px', background: '#757575', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', width: '100%' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

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
                  <label style={{ display: 'block', marginBottom: 5, fontWeight: 'bold' }}>Game Date/Time</label>
                  <input
                    type="datetime-local"
                    value={formData.game_date}
                    onChange={(e) => setFormData({ ...formData, game_date: e.target.value })}
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

                    {pick.game_date && (
                      <p style={{ margin: '5px 0', fontSize: 14, color: '#666' }}>
                        Game: {new Date(pick.game_date).toLocaleString()}
                      </p>
                    )}

                    {pick.notes && (
                      <p style={{ margin: '10px 0', fontStyle: 'italic', color: '#555' }}>
                        {pick.notes}
                      </p>
                    )}

                    <div style={{ margin: '10px 0 0', fontSize: 12, color: '#999' }}>
                      <p style={{ margin: '3px 0' }}>Created: {new Date(pick.created_at).toLocaleString()} by {getUserEmail(pick.created_by)}</p>
                      {pick.graded_by && (
                        <p style={{ margin: '3px 0' }}>Graded: {new Date(pick.graded_at).toLocaleString()} by {getUserEmail(pick.graded_by)}</p>
                      )}
                    </div>

                    {pick.audit_log && pick.audit_log.length > 0 && (
                      <button
                        onClick={() => setSelectedPickAudit(pick)}
                        style={{ marginTop: 8, padding: '4px 12px', background: '#9e9e9e', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 11 }}
                      >
                        View Audit Log ({pick.audit_log.length} changes)
                      </button>
                    )}
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