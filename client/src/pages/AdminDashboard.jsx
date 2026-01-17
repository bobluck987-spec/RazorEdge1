import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, AlertTriangle, CheckCircle, XCircle, Clock, Edit2, Trash2, Plus, X, BarChart2, Shield, RefreshCw } from 'lucide-react';
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
      const { data: picksData, error: picksError } = await supabase
        .from('picks')
        .select('*')
        .order('created_at', { ascending: false });

      if (picksError) throw picksError;

      const { data: usersData, error: usersError } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;

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
      alert('Error loading data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserEmail = (userId) => {
    return userProfiles[userId]?.email || 'Unknown';
  };

  const handleCreatePick = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase.from('picks').insert([{
        ...formData,
        game_date: formData.game_date || null,
        created_by: user?.id
      }]).select();

      if (error) throw error;

      alert('Pick created successfully!');
      setShowCreateForm(false);
      resetForm();
      await loadData();
    } catch (error) {
      console.error('Error creating pick:', error);
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
          updated_at: new Date().toISOString()
        })
        .eq('id', editingPick.id);

      if (error) throw error;

      alert('Pick updated successfully!');
      setEditingPick(null);
      setShowCreateForm(false);
      resetForm();
      await loadData();
    } catch (error) {
      console.error('Error updating pick:', error);
      alert('Error updating pick: ' + error.message);
    }
  };

  const handleGradePick = async (pickId, newStatus) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('picks')
        .update({ 
          status: newStatus, 
          updated_at: new Date().toISOString(),
          graded_at: new Date().toISOString(),
          graded_by: user?.id
        })
        .eq('id', pickId);

      if (error) throw error;

      await loadData();
    } catch (error) {
      console.error('Error grading pick:', error);
      alert('Error grading pick: ' + error.message);
    }
  };

  const handleDeletePick = async (pickId) => {
    if (!confirm('Are you sure you want to delete this pick?')) return;

    try {
      const { error } = await supabase
        .from('picks')
        .delete()
        .eq('id', pickId);

      if (error) throw error;

      alert('Pick deleted successfully!');
      await loadData();
    } catch (error) {
      console.error('Error deleting pick:', error);
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
      await loadData();
    } catch (error) {
      console.error('Error updating user role:', error);
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
  const pending = picks.filter((p) => p.status === 'pending').length;
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

  const totalIssues = gradedThenEdited.length + pendingTooLong.length;

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#f8f8f8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <RefreshCw style={{ width: 48, height: 48, color: '#e73725', animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: 16, fontSize: 18, color: '#4a4a4a', fontWeight: 600 }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f8f8',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      paddingBottom: 40
    }}>
      {/* Header */}
      <div style={{
        background: '#010000',
        padding: '32px 24px',
        borderBottom: '3px solid #e73725'
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <h1 style={{
            fontSize: 36,
            fontWeight: 900,
            color: '#ffffff',
            margin: 0,
            letterSpacing: '-0.02em'
          }}>
            Admin Dashboard
          </h1>
          <p style={{
            fontSize: 16,
            color: '#999999',
            margin: '8px 0 0',
            fontWeight: 500
          }}>
            Manage picks, users, and monitor platform integrity
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '32px 24px' }}>
        {/* Stats Overview */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 32
        }}>
          {[
            { label: 'Total Picks', value: totalPicks, icon: <BarChart2 />, color: '#010000' },
            { label: 'Wins', value: wins, icon: <CheckCircle />, color: '#5dc110' },
            { label: 'Losses', value: losses, icon: <XCircle />, color: '#f44336' },
            { label: 'Win Rate', value: `${winRate}%`, icon: <TrendingUp />, color: '#e73725' }
          ].map((stat, idx) => (
            <div key={idx} style={{
              background: '#ffffff',
              padding: 24,
              borderRadius: 12,
              border: '1px solid #e0e0e0',
              boxShadow: '0.3px 0.5px 0.5px hsl(0 0% 70% / 0.41), 0.4px 0.8px 0.7px -1.1px hsl(0 0% 70% / 0.34), 0.9px 1.7px 1.6px -2.2px hsl(0 0% 70% / 0.27)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ color: stat.color }}>
                  {React.cloneElement(stat.icon, { size: 24 })}
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#666666', margin: 0 }}>
                  {stat.label}
                </h3>
              </div>
              <p style={{
                fontSize: 32,
                fontWeight: 900,
                color: stat.color,
                margin: 0,
                letterSpacing: '-0.02em'
              }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 32,
          borderBottom: '2px solid #e0e0e0',
          paddingBottom: 0
        }}>
          {[
            { id: 'picks', label: `Manage Picks (${picks.length})`, icon: <BarChart2 size={18} /> },
            { id: 'users', label: `Users (${users.length})`, icon: <Users size={18} /> },
            { id: 'integrity', label: 'Integrity Checks', icon: <Shield size={18} />, badge: totalIssues }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '14px 24px',
                border: 'none',
                background: activeTab === tab.id ? '#010000' : 'transparent',
                color: activeTab === tab.id ? '#ffffff' : '#666666',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 15,
                borderRadius: '8px 8px 0 0',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                position: 'relative',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.icon}
              {tab.label}
              {tab.badge > 0 && (
                <span style={{
                  background: '#e73725',
                  color: '#ffffff',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  fontSize: 11,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Picks Tab */}
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
                padding: '16px 32px',
                background: '#e73725',
                color: '#ffffff',
                border: 'none',
                borderRadius: 10,
                cursor: 'pointer',
                fontWeight: 800,
                fontSize: 16,
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                boxShadow: '0 4px 12px rgba(231, 55, 37, 0.3)',
                transition: 'all 0.2s ease'
              }}
            >
              {showCreateForm ? <X size={20} /> : <Plus size={20} />}
              {showCreateForm ? 'Cancel' : 'Create New Pick'}
            </button>

            {showCreateForm && (
              <div style={{
                background: '#ffffff',
                padding: 32,
                borderRadius: 12,
                marginBottom: 32,
                border: '1px solid #e0e0e0',
                boxShadow: '0.3px 0.5px 0.5px hsl(0 0% 70% / 0.41), 0.4px 0.8px 0.7px -1.1px hsl(0 0% 70% / 0.34)'
              }}>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#010000', marginBottom: 24 }}>
                  {editingPick ? 'Edit Pick' : 'Create New Pick'}
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 700, fontSize: 14, color: '#010000' }}>Sport</label>
                    <input
                      type="text"
                      value={formData.sport}
                      onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
                      placeholder="NFL, NBA, MLB, etc."
                      style={{
                        width: '100%',
                        padding: 12,
                        borderRadius: 8,
                        border: '1px solid #e0e0e0',
                        fontSize: 15,
                        fontFamily: 'inherit',
                        color: '#010000'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 700, fontSize: 14, color: '#010000' }}>Matchup</label>
                    <input
                      type="text"
                      value={formData.matchup}
                      onChange={(e) => setFormData({ ...formData, matchup: e.target.value })}
                      placeholder="Team A vs Team B"
                      style={{
                        width: '100%',
                        padding: 12,
                        borderRadius: 8,
                        border: '1px solid #e0e0e0',
                        fontSize: 15,
                        fontFamily: 'inherit',
                        color: '#010000'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 700, fontSize: 14, color: '#010000' }}>Pick Type</label>
                    <select
                      value={formData.pick_type}
                      onChange={(e) => setFormData({ ...formData, pick_type: e.target.value })}
                      style={{
                        width: '100%',
                        padding: 12,
                        borderRadius: 8,
                        border: '1px solid #e0e0e0',
                        fontSize: 15,
                        fontFamily: 'inherit',
                        color: '#010000'
                      }}
                    >
                      <option value="Spread">Spread</option>
                      <option value="Moneyline">Moneyline</option>
                      <option value="Over/Under">Over/Under</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 700, fontSize: 14, color: '#010000' }}>Line</label>
                    <input
                      type="text"
                      value={formData.line}
                      onChange={(e) => setFormData({ ...formData, line: e.target.value })}
                      placeholder="+3.5, -7, O 45.5"
                      style={{
                        width: '100%',
                        padding: 12,
                        borderRadius: 8,
                        border: '1px solid #e0e0e0',
                        fontSize: 15,
                        fontFamily: 'inherit',
                        color: '#010000'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 700, fontSize: 14, color: '#010000' }}>Odds</label>
                    <input
                      type="number"
                      value={formData.odds}
                      onChange={(e) => setFormData({ ...formData, odds: parseInt(e.target.value) })}
                      placeholder="-110, +150"
                      style={{
                        width: '100%',
                        padding: 12,
                        borderRadius: 8,
                        border: '1px solid #e0e0e0',
                        fontSize: 15,
                        fontFamily: 'inherit',
                        color: '#010000'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 700, fontSize: 14, color: '#010000' }}>Game Date/Time</label>
                    <input
                      type="datetime-local"
                      value={formData.game_date}
                      onChange={(e) => setFormData({ ...formData, game_date: e.target.value })}
                      style={{
                        width: '100%',
                        padding: 12,
                        borderRadius: 8,
                        border: '1px solid #e0e0e0',
                        fontSize: 15,
                        fontFamily: 'inherit',
                        color: '#010000'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: 8, fontWeight: 700, fontSize: 14, color: '#010000' }}>Access Level</label>
                    <select
                      value={formData.access}
                      onChange={(e) => setFormData({ ...formData, access: e.target.value })}
                      style={{
                        width: '100%',
                        padding: 12,
                        borderRadius: 8,
                        border: '1px solid #e0e0e0',
                        fontSize: 15,
                        fontFamily: 'inherit',
                        color: '#010000'
                      }}
                    >
                      <option value="free">Free</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: 14,
                      color: '#010000'
                    }}>
                      <input
                        type="checkbox"
                        checked={formData.is_underdog}
                        onChange={(e) => setFormData({ ...formData, is_underdog: e.target.checked })}
                        style={{ width: 18, height: 18, cursor: 'pointer' }}
                      />
                      Underdog Pick
                    </label>
                  </div>
                </div>

                <div style={{ marginTop: 20 }}>
                  <label style={{ display: 'block', marginBottom: 8, fontWeight: 700, fontSize: 14, color: '#010000' }}>Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Analysis, reasoning, etc."
                    rows={3}
                    style={{
                      width: '100%',
                      padding: 12,
                      borderRadius: 8,
                      border: '1px solid #e0e0e0',
                      fontSize: 15,
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      color: '#010000'
                    }}
                  />
                </div>

                <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
                  <button
                    onClick={editingPick ? handleUpdatePick : handleCreatePick}
                    style={{
                      padding: '14px 28px',
                      background: '#5dc110',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontWeight: 800,
                      fontSize: 16
                    }}
                  >
                    {editingPick ? 'Update Pick' : 'Create Pick'}
                  </button>
                  <button
                    onClick={cancelEdit}
                    style={{
                      padding: '14px 28px',
                      background: '#666666',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: 16
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Picks List */}
            <div style={{ display: 'grid', gap: 16 }}>
              {picks.map((pick) => (
                <div
                  key={pick.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e0e0e0',
                    borderRadius: 12,
                    padding: 24,
                    boxShadow: '0.3px 0.5px 0.5px hsl(0 0% 70% / 0.41), 0.4px 0.8px 0.7px -1.1px hsl(0 0% 70% / 0.34)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 24 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, flexWrap: 'wrap' }}>
                        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#010000' }}>
                          {pick.matchup}
                        </h3>
                        <span style={{
                          padding: '4px 12px',
                          background: pick.access === 'premium' ? '#ffd700' : '#e0e0e0',
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 800,
                          color: pick.access === 'premium' ? '#000000' : '#666666'
                        }}>
                          {pick.access.toUpperCase()}
                        </span>
                        <span style={{
                          padding: '4px 12px',
                          background: pick.status === 'win' ? '#5dc110' :
                                     pick.status === 'loss' ? '#f44336' :
                                     pick.status === 'push' ? '#ff9800' : '#9e9e9e',
                          color: '#ffffff',
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 800
                        }}>
                          {pick.status.toUpperCase()}
                        </span>
                      </div>

                      <p style={{ margin: '8px 0', color: '#4a4a4a', fontSize: 15, fontWeight: 600 }}>
                        <strong style={{ color: '#010000' }}>{pick.sport}</strong> • {pick.pick_type}
                        {pick.line && ` ${pick.line}`} • {pick.odds > 0 ? '+' : ''}{pick.odds}
                      </p>

                      {pick.game_date && (
                        <p style={{ margin: '8px 0', fontSize: 14, color: '#666666', display: 'flex', alignItems: 'center', gap: 6 }}>
                          <Clock size={16} />
                          Game: {new Date(pick.game_date).toLocaleString()}
                        </p>
                      )}

                      {pick.notes && (
                        <p style={{
                          margin: '12px 0 0',
                          fontStyle: 'italic',
                          color: '#555555',
                          fontSize: 14,
                          padding: 12,
                          background: '#f9f9f9',
                          borderRadius: 6,
                          borderLeft: '3px solid #e73725'
                        }}>
                          {pick.notes}
                        </p>
                      )}

                      <div style={{ margin: '16px 0 0', fontSize: 12, color: '#999999' }}>
                        <p style={{ margin: '4px 0' }}>
                          Created: {new Date(pick.created_at).toLocaleString()} by {getUserEmail(pick.created_by)}
                        </p>
                        {pick.graded_by && (
                          <p style={{ margin: '4px 0' }}>
                            Graded: {new Date(pick.graded_at).toLocaleString()} by {getUserEmail(pick.graded_by)}
                          </p>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 140 }}>
                      {pick.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleGradePick(pick.id, 'win')}
                            style={{
                              padding: '10px 16px',
                              background: '#5dc110',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: 8,
                              cursor: 'pointer',
                              fontWeight: 700,
                              fontSize: 14,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 6
                            }}
                          >
                            <CheckCircle size={16} /> Win
                          </button>
                          <button
                            onClick={() => handleGradePick(pick.id, 'loss')}
                            style={{
                              padding: '10px 16px',
                              background: '#f44336',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: 8,
                              cursor: 'pointer',
                              fontWeight: 700,
                              fontSize: 14,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 6
                            }}
                          >
                            <XCircle size={16} /> Loss
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleGradePick(pick.id, 'pending')}
                          style={{
                            padding: '10px 16px',
                            background: '#9e9e9e',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: 8,
                            cursor: 'pointer',
                            fontWeight: 700,
                            fontSize: 14
                          }}
                        >
                          Reset
                        </button>
                      )}

                      <button
                        onClick={() => startEdit(pick)}
                        style={{
                          padding: '10px 16px',
                          background: '#010000',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: 8,
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: 14,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6
                        }}
                      >
                        <Edit2 size={16} /> Edit
                      </button>

                      <button
                        onClick={() => handleDeletePick(pick.id)}
                        style={{
                          padding: '10px 16px',
                          background: '#d32f2f',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: 8,
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: 14,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6
                        }}
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {picks.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: 60,
                  background: '#ffffff',
                  borderRadius: 12,
                  border: '2px dashed #e0e0e0'
                }}>
                  <p style={{ color: '#999999', fontSize: 16, margin: 0 }}>
                    No picks yet. Create your first pick above!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#010000', marginBottom: 24 }}>
              User Management
            </h2>

            <div style={{
              background: '#ffffff',
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid #e0e0e0',
              boxShadow: '0.3px 0.5px 0.5px hsl(0 0% 70% / 0.41), 0.4px 0.8px 0.7px -1.1px hsl(0 0% 70% / 0.34)'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f5f5f5' }}>
                    <th style={{
                      padding: 16,
                      textAlign: 'left',
                      borderBottom: '2px solid #e0e0e0',
                      fontWeight: 800,
                      fontSize: 14,
                      color: '#010000'
                    }}>
                      Email
                    </th>
                    <th style={{
                      padding: 16,
                      textAlign: 'left',
                      borderBottom: '2px solid #e0e0e0',
                      fontWeight: 800,
                      fontSize: 14,
                      color: '#010000'
                    }}>
                      Role
                    </th>
                    <th style={{
                      padding: 16,
                      textAlign: 'left',
                      borderBottom: '2px solid #e0e0e0',
                      fontWeight: 800,
                      fontSize: 14,
                      color: '#010000'
                    }}>
                      Created
                    </th>
                    <th style={{
                      padding: 16,
                      textAlign: 'left',
                      borderBottom: '2px solid #e0e0e0',
                      fontWeight: 800,
                      fontSize: 14,
                      color: '#010000'
                    }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: 16, fontSize: 15, color: '#010000', fontWeight: 600 }}>
                        {user.email}
                      </td>
                      <td style={{ padding: 16 }}>
                        <span style={{
                          padding: '6px 14px',
                          background: user.role === 'admin' ? '#e73725' :
                                     user.role === 'premium' ? '#ffd700' : '#e0e0e0',
                          color: user.role === 'admin' ? '#ffffff' :
                                 user.role === 'premium' ? '#000000' : '#666666',
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 800
                        }}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: 16, fontSize: 14, color: '#666666' }}>
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td style={{ padding: 16 }}>
                        <select
                          value={user.role}
                          onChange={(e) => handleChangeUserRole(user.id, e.target.value)}
                          style={{
                            padding: '8px 14px',
                            borderRadius: 6,
                            border: '1px solid #e0e0e0',
                            cursor: 'pointer',
                            fontSize: 14,
                            fontWeight: 600,
                            fontFamily: 'inherit'
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
                <div style={{ textAlign: 'center', padding: 60 }}>
                  <p style={{ color: '#999999', fontSize: 16, margin: 0 }}>
                    No users registered yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Integrity Tab */}
        {activeTab === 'integrity' && (
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: '#010000', marginBottom: 24 }}>
              Integrity Monitoring
            </h2>

            <div style={{ display: 'grid', gap: 20 }}>
              {/* Graded Then Edited */}
              <section style={{
                background: '#ffffff',
                padding: 24,
                borderRadius: 12,
                border: gradedThenEdited.length > 0 ? '2px solid #ff9800' : '1px solid #e0e0e0',
                boxShadow: '0.3px 0.5px 0.5px hsl(0 0% 70% / 0.41), 0.4px 0.8px 0.7px -1.1px hsl(0 0% 70% / 0.34)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <AlertTriangle style={{ color: '#ff9800', width: 28, height: 28 }} />
                  <h3 style={{ margin: 0, color: '#ff9800', fontSize: 20, fontWeight: 800 }}>
                    Graded Then Edited ({gradedThenEdited.length})
                  </h3>
                </div>
                <p style={{ fontSize: 14, color: '#666666', marginBottom: 16 }}>
                  Picks that were graded but then had their details changed afterward
                </p>
                {gradedThenEdited.length === 0 ? (
                  <div style={{
                    padding: 20,
                    background: '#f0f9ff',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10
                  }}>
                    <CheckCircle style={{ color: '#5dc110', width: 20, height: 20 }} />
                    <span style={{ color: '#666666', fontWeight: 600 }}>No issues found</span>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: 12 }}>
                    {gradedThenEdited.map((p) => (
                      <div key={p.id} style={{
                        background: '#fff9e6',
                        padding: 16,
                        borderRadius: 8,
                        border: '1px solid #ffe0b2'
                      }}>
                        <strong style={{ fontSize: 16, color: '#010000' }}>{p.matchup}</strong>
                        <span style={{
                          marginLeft: 10,
                          padding: '2px 8px',
                          background: '#ff9800',
                          color: '#ffffff',
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 700
                        }}>
                          {p.status.toUpperCase()}
                        </span>
                        <p style={{ margin: '8px 0 0', fontSize: 13, color: '#666666' }}>
                          Created by: {getUserEmail(p.created_by)} | Graded by: {getUserEmail(p.graded_by)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Pending Too Long */}
              <section style={{
                background: '#ffffff',
                padding: 24,
                borderRadius: 12,
                border: pendingTooLong.length > 0 ? '2px solid #f44336' : '1px solid #e0e0e0',
                boxShadow: '0.3px 0.5px 0.5px hsl(0 0% 70% / 0.41), 0.4px 0.8px 0.7px -1.1px hsl(0 0% 70% / 0.34)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <Clock style={{ color: '#f44336', width: 28, height: 28 }} />
                  <h3 style={{ margin: 0, color: '#f44336', fontSize: 20, fontWeight: 800 }}>
                    Pending Too Long ({pendingTooLong.length})
                  </h3>
                </div>
                <p style={{ fontSize: 14, color: '#666666', marginBottom: 16 }}>
                  Picks where the game ended 48+ hours ago but haven't been graded
                </p>
                {pendingTooLong.length === 0 ? (
                  <div style={{
                    padding: 20,
                    background: '#f0f9ff',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10
                  }}>
                    <CheckCircle style={{ color: '#5dc110', width: 20, height: 20 }} />
                    <span style={{ color: '#666666', fontWeight: 600 }}>All picks graded on time</span>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: 12 }}>
                    {pendingTooLong.map((p) => (
                      <div key={p.id} style={{
                        background: '#ffebee',
                        padding: 16,
                        borderRadius: 8,
                        border: '1px solid #ffcdd2'
                      }}>
                        <strong style={{ fontSize: 16, color: '#010000' }}>{p.matchup}</strong>
                        <p style={{ margin: '8px 0 0', fontSize: 13, color: '#666666' }}>
                          Game: {new Date(p.game_date).toLocaleString()} | Created by: {getUserEmail(p.created_by)}
                        </p>
                        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                          <button
                            onClick={() => handleGradePick(p.id, 'win')}
                            style={{
                              padding: '8px 16px',
                              background: '#5dc110',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: 6,
                              cursor: 'pointer',
                              fontSize: 13,
                              fontWeight: 700
                            }}
                          >
                            Win
                          </button>
                          <button
                            onClick={() => handleGradePick(p.id, 'loss')}
                            style={{
                              padding: '8px 16px',
                              background: '#f44336',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: 6,
                              cursor: 'pointer',
                              fontSize: 13,
                              fontWeight: 700
                            }}
                          >
                            Loss
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
}