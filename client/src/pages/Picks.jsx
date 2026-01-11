import React, { useState } from 'react';
import { usePickContext } from '../context/PickContext';
import { useAuth } from '../context/AuthContext';

export default function Picks() {
  const { picks: allPicks, loading } = usePickContext();
  const { user } = useAuth();
  const [filter, setFilter] = useState('all'); // all, free, premium
  const [sportFilter, setSportFilter] = useState('all');

  const filteredPicks = allPicks.filter(pick => {
    if (filter !== 'all' && pick.access !== filter) return false;
    if (sportFilter !== 'all' && pick.sport !== sportFilter) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'win': return '#10b981';
      case 'loss': return '#ef4444';
      case 'push': return '#f59e0b';
      default: return '#64748b';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'win': return '✓';
      case 'loss': return '✗';
      case 'push': return '↔';
      default: return '○';
    }
  };

  const isPremiumLocked = (pick) => {
  return pick.access === 'premium' && (!user || user.role === 'free');
  };

  //if (loading) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
      minHeight: '100vh',
      color: 'white',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      paddingBottom: 80 // Add this for mobile tabs
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 900,
            margin: '0 0 10px',
            background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Expert Picks
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', margin: 0 }}>
            Data-driven predictions with proven results
          </p>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: 15,
          marginBottom: 30,
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            gap: 10,
            background: 'rgba(255, 255, 255, 0.05)',
            padding: 6,
            borderRadius: 12,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {['all', 'free', 'premium'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '10px 20px',
                  background: filter === f ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'transparent',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 14,
                  textTransform: 'capitalize',
                  transition: 'all 0.2s ease'
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <div style={{
            display: 'flex',
            gap: 10,
            background: 'rgba(255, 255, 255, 0.05)',
            padding: 6,
            borderRadius: 12,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            {['all', 'NFL', 'NBA'].map(sport => (
              <button
                key={sport}
                onClick={() => setSportFilter(sport)}
                style={{
                  padding: '10px 20px',
                  background: sportFilter === sport ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  color: 'white',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 14,
                  transition: 'all 0.2s ease'
                }}
              >
                {sport}
              </button>
            ))}
          </div>
        </div>

        {/* Picks Grid */}
        <div style={{
          display: 'grid',
          gap: 20
        }}>
          {filteredPicks.map((pick, idx) => (
            <div
              key={pick.id}
              style={{
                background: isPremiumLocked(pick) 
                  ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%)'
                  : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
                borderRadius: 16,
                border: isPremiumLocked(pick) 
                  ? '1px solid rgba(251, 191, 36, 0.3)'
                  : '1px solid rgba(59, 130, 246, 0.2)',
                padding: 25,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                opacity: isPremiumLocked(pick) ? 0.6 : 1,
                filter: isPremiumLocked(pick) ? 'blur(2px)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (!isPremiumLocked(pick)) {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isPremiumLocked(pick)) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                }
              }}
            >
              {/* Premium Lock Overlay */}
              {isPremiumLocked(pick) && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: 48,
                    marginBottom: 10
                  }}>🔒</div>
                  <div style={{
                    fontSize: 18,
                    fontWeight: 700,
                    marginBottom: 10,
                    color: '#fbbf24'
                  }}>
                    Premium Pick
                  </div>
                  <button style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                    color: '#0a0e27',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: 14
                  }}>
                    Upgrade to View
                  </button>
                </div>
              )}

              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'start',
                marginBottom: 20
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                    <span style={{
                      padding: '4px 12px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.5px'
                    }}>
                      {pick.sport}
                    </span>
                    <span style={{
                      padding: '4px 12px',
                      background: isPremiumLocked(pick) 
                        ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                        : 'rgba(255, 255, 255, 0.1)',
                      color: isPremiumLocked(pick) ? '#0a0e27' : 'white',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.5px'
                    }}>
                      {pick.access.toUpperCase()}
                    </span>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: getStatusColor(pick.status),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      fontWeight: 900,
                      color: 'white'
                    }}>
                      {getStatusIcon(pick.status)}
                    </div>
                  </div>

                  <h3 style={{
                    fontSize: 28,
                    fontWeight: 900,
                    margin: '0 0 5px',
                    color: 'white'
                  }}>
                    {pick.matchup}
                  </h3>
                  <div style={{
                    fontSize: 14,
                    color: '#94a3b8'
                  }}>
                    {new Date(pick.gameTime).toLocaleString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                {/* Confidence Badge */}
                <div style={{
                  background: `conic-gradient(#3b82f6 ${pick.confidence * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`,
                  borderRadius: '50%',
                  width: 80,
                  height: 80,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    background: '#1a1f3a',
                    borderRadius: '50%',
                    width: 64,
                    height: 64,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <div style={{ fontSize: 24, fontWeight: 900, color: '#3b82f6' }}>
                      {pick.confidence}
                    </div>
                    <div style={{ fontSize: 10, color: '#64748b', fontWeight: 700 }}>
                      CONF
                    </div>
                  </div>
                </div>
              </div>

              {/* Pick Details */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.2)',
                padding: 20,
                borderRadius: 12,
                marginBottom: 15
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: 20
                }}>
                  <div>
                    <div style={{
                      fontSize: 12,
                      color: '#64748b',
                      marginBottom: 5,
                      fontWeight: 600
                    }}>
                      PICK TYPE
                    </div>
                    <div style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: 'white'
                    }}>
                      {pick.pickType}
                    </div>
                  </div>
                  {pick.line && (
                    <div>
                      <div style={{
                        fontSize: 12,
                        color: '#64748b',
                        marginBottom: 5,
                        fontWeight: 600
                      }}>
                        LINE
                      </div>
                      <div style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: '#3b82f6'
                      }}>
                        {pick.line}
                      </div>
                    </div>
                  )}
                  <div>
                    <div style={{
                      fontSize: 12,
                      color: '#64748b',
                      marginBottom: 5,
                      fontWeight: 600
                    }}>
                      ODDS
                    </div>
                    <div style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: pick.odds > 0 ? '#10b981' : 'white'
                    }}>
                      {pick.odds > 0 ? '+' : ''}{pick.odds}
                    </div>
                  </div>
                  {pick.isUnderdog && (
                    <div>
                      <div style={{
                        padding: '6px 12px',
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 800,
                        textAlign: 'center',
                        marginTop: 15
                      }}>
                        🔥 UNDERDOG
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Analysis */}
              {!isPremiumLocked(pick) && (
                <div>
                  <div style={{
                    fontSize: 12,
                    color: '#64748b',
                    marginBottom: 8,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Analysis
                  </div>
                  <p style={{
                    fontSize: 15,
                    color: '#cbd5e1',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    {pick.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredPicks.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: 80,
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 16,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>📊</div>
            <h3 style={{
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 10,
              color: 'white'
            }}>
              No picks match your filters
            </h3>
            <p style={{ fontSize: 16, color: '#94a3b8' }}>
              Try adjusting your filters to see more picks
            </p>
          </div>
        )}
      </div>
    </div>
  );
}