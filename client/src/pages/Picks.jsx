import React, { useState } from 'react';
import { usePickContext } from '../context/PickContext';
import { useAuth } from '../context/AuthContext';
import { Target, Clock, Lock } from 'lucide-react';

export default function Picks() {
  const { picks: allPicks, loading, error } = usePickContext();
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
      case 'win': return '#5dc110';
      case 'loss': return '#ef4444';
      case 'push': return '#f59e0b';
      default: return '#666666';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'win': return 'WON';
      case 'loss': return 'LOST';
      case 'push': return 'PUSH';
      default: return 'PENDING';
    }
  };

  const formatGameTime = (gameTime) => {
    const gameDate = new Date(gameTime);
    const now = new Date();
    
    // Reset hours to compare dates only
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const gameDay = new Date(gameDate.getFullYear(), gameDate.getMonth(), gameDate.getDate());
    
    const timeStr = gameDate.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
    
    if (gameDay.getTime() === today.getTime()) {
      return `Today, ${timeStr}`;
    } else if (gameDay.getTime() === tomorrow.getTime()) {
      return `Tomorrow, ${timeStr}`;
    } else {
      return gameDate.toLocaleString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    }
  };

  const isPremiumLocked = (pick) => {
    return pick.access === 'premium' && (!user || user.role === 'free');
  };

  const hasSensitiveData = (pick) => {
    // Check if pick has any sensitive fields that shouldn't be exposed
    return pick.pick_type || pick.line || pick.odds || pick.notes || 
           pick.status || pick.is_underdog !== undefined;
  };

  const shouldRenderDetails = (pick) => {
    // Only render details if NOT premium locked, or if somehow sensitive data leaked
    if (isPremiumLocked(pick) && hasSensitiveData(pick)) {
      console.warn('Security Warning: Premium pick contains sensitive data for non-premium user');
      return false;
    }
    return !isPremiumLocked(pick);
  };

  if (loading) {
    return (
      <div style={{
        background: '#f8f8f8',
        minHeight: '100vh',
        color: '#010000',
        padding: '60px 20px 100px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>⏳</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, color: '#010000' }}>
            Loading picks...
          </h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        background: '#f8f8f8',
        minHeight: '100vh',
        color: '#010000',
        padding: '60px 20px 100px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>⚠️</div>
          <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12, color: '#010000' }}>
            Error Loading Picks
          </h3>
          <p style={{ fontSize: 16, color: '#666666' }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: '#f8f8f8',
      minHeight: '100vh',
      color: '#010000',
      padding: '60px 20px 100px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
            justifyContent: 'center'
          }}>
            <Target style={{ width: 32, height: 32, color: '#e73725' }} />
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 900,
              margin: 0,
              color: '#010000',
              letterSpacing: '-0.02em'
            }}>
              Expert Picks
            </h1>
          </div>
          <p style={{ 
            fontSize: 18, 
            color: '#4a4a4a', 
            margin: 0,
            textAlign: 'center',
            maxWidth: 600,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Data-driven predictions with proven results
          </p>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: 15,
          marginBottom: 40,
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            gap: 8,
            background: '#ffffff',
            padding: 6,
            borderRadius: 12,
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            {['all', 'free', 'premium'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '12px 24px',
                  background: filter === f ? '#e73725' : 'transparent',
                  color: filter === f ? '#ffffff' : '#010000',
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
            gap: 8,
            background: '#ffffff',
            padding: 6,
            borderRadius: 12,
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            {['all', 'NFL', 'NBA'].map(sport => (
              <button
                key={sport}
                onClick={() => setSportFilter(sport)}
                style={{
                  padding: '12px 24px',
                  background: sportFilter === sport ? '#010000' : 'transparent',
                  color: sportFilter === sport ? '#ffffff' : '#010000',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 14,
                  transition: 'all 0.2s ease'
                }}
              >
                {sport === 'all' ? 'All' : sport}
              </button>
            ))}
          </div>
        </div>

        {/* Picks Grid */}
        <div style={{
          display: 'grid',
          gap: 24
        }}>
          {filteredPicks.map((pick) => (
            <div
              key={pick.id}
              style={{
                background: '#ffffff',
                borderRadius: 16,
                border: isPremiumLocked(pick) 
                  ? '2px solid #e73725'
                  : '1px solid #e0e0e0',
                padding: 22,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                boxShadow: '0.3px 0.5px 0.5px hsl(0 0% 70% / 0.38), 0.4px 0.8px 0.7px -0.5px hsl(0 0% 70% / 0.35), 0.7px 1.4px 1.3px -1px hsl(0 0% 70% / 0.32)',
                minHeight: isPremiumLocked(pick) ? '350px' : 'auto'
              }}
            >
              {/* Underdog Top Ribbon */}
              {pick.is_underdog && !isPremiumLocked(pick) && shouldRenderDetails(pick) && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 28,
                  background: '#f8f8f8',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 16
                }}>
                  <span style={{
                    color: '#e73725',
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: '1px'
                  }}>
                    UNDERDOG PICK
                  </span>
                </div>
              )}

              {/* Premium Lock Overlay */}
              {isPremiumLocked(pick) && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(255, 255, 255, 0.98)',
                  zIndex: 10,
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {/* Sport and Date at top */}
                  <div style={{
                    display: 'flex',
                    gap: 8,
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    marginBottom: '30px'
                  }}>
                    <span style={{
                      padding: '6px 14px',
                      background: '#f5f5f5',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: '0.5px',
                      color: '#010000',
                      whiteSpace: 'nowrap'
                    }}>
                      {pick.sport}
                    </span>
                    <div style={{
                      fontSize: 13,
                      color: '#666666',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontWeight: 600,
                      whiteSpace: 'nowrap'
                    }}>
                      <Clock style={{ width: 14, height: 14, flexShrink: 0 }} />
                      {formatGameTime(pick.game_date)}
                    </div>
                  </div>

                  {/* Centered content */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1
                  }}>
                    <Lock style={{ width: 48, height: 48, color: '#e73725', marginBottom: 20 }} />
                    <div style={{
                      fontSize: 24,
                      fontWeight: 800,
                      marginBottom: 12,
                      color: '#010000'
                    }}>
                      Premium Pick
                    </div>
                    <p style={{
                      fontSize: 15,
                      color: '#4a4a4a',
                      marginBottom: 24,
                      textAlign: 'center',
                      maxWidth: 300,
                      lineHeight: 1.5
                    }}>
                      Upgrade to unlock expert analysis and full pick details
                    </p>
                    <button style={{
                      padding: '14px 32px',
                      background: '#e73725',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 10,
                      cursor: 'pointer',
                      fontWeight: 800,
                      fontSize: 15,
                      boxShadow: '0 4px 12px rgba(231, 55, 37, 0.3)',
                      transition: 'all 0.2s ease'
                    }}>
                      Upgrade to Premium
                    </button>
                  </div>
                </div>
              )}

              {/* Header */}
              <div style={{
                marginBottom: 16,
                marginTop: pick.is_underdog && !isPremiumLocked(pick) && shouldRenderDetails(pick) ? 28 : 0
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 18,
                  gap: 12
                }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'nowrap', minWidth: 0 }}>
                    <span style={{
                      padding: '6px 14px',
                      background: '#f5f5f5',
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: '0.5px',
                      color: '#010000',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      {pick.sport}
                    </span>
                    <div style={{
                      fontSize: 12,
                      color: '#666666',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      <Clock style={{ width: 14, height: 14, flexShrink: 0 }} />
                      <span>{formatGameTime(pick.game_date)}</span>
                    </div>
                  </div>

                  <span style={{
                    padding: '6px 14px',
                    background: pick.access === 'premium' ? '#e73725' : '#5dc110',
                    color: '#ffffff',
                    borderRadius: 6,
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}>
                    {pick.access === 'premium' ? 'PREMIUM PICK' : 'FREE PICK'}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}>
                  <h3 style={{
                    fontSize: 26,
                    fontWeight: 900,
                    margin: 0,
                    color: '#010000',
                    letterSpacing: '-0.01em',
                    flex: 1
                  }}>
                    {pick.matchup}
                  </h3>
                </div>
              </div>

              {/* Pick Details */}
              {shouldRenderDetails(pick) && (
                <div style={{
                  background: '#f8f8f8',
                  padding: 18,
                  borderRadius: 12,
                  marginBottom: 16,
                  border: '1px solid #e0e0e0'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                    gap: 16
                  }}>
                    <div>
                      <div style={{
                        fontSize: 11,
                        color: '#666666',
                        marginBottom: 6,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Pick Type
                      </div>
                      <div style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: '#010000'
                      }}>
                        {pick.pick_type}
                      </div>
                    </div>
                    {pick.line && (
                      <div>
                        <div style={{
                          fontSize: 11,
                          color: '#666666',
                          marginBottom: 6,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          Line
                        </div>
                        <div style={{
                          fontSize: 18,
                          fontWeight: 800,
                          color: '#e73725'
                        }}>
                          {pick.line}
                        </div>
                      </div>
                    )}
                    <div>
                      <div style={{
                        fontSize: 11,
                        color: '#666666',
                        marginBottom: 6,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        Odds
                      </div>
                      <div style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: pick.odds > 0 ? '#5dc110' : '#010000'
                      }}>
                        {pick.odds > 0 ? '+' : ''}{pick.odds}
                      </div>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end'
                    }}>
                      <div style={{
                        padding: '8px 16px',
                        background: getStatusColor(pick.status),
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 800,
                        color: '#ffffff',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        letterSpacing: '0.5px'
                      }}>
                        {getStatusText(pick.status)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Analysis */}
              {shouldRenderDetails(pick) && pick.notes && (
                <div>
                  <div style={{
                    fontSize: 11,
                    color: '#666666',
                    marginBottom: 10,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}>
                    Analysis
                  </div>
                  <p style={{
                    fontSize: 15,
                    color: '#4a4a4a',
                    lineHeight: 1.7,
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
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #e0e0e0'
          }}>
            <div style={{ fontSize: 48, marginBottom: 20 }}>📊</div>
            <h3 style={{
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 10,
              color: '#010000'
            }}>
              No picks match your filters
            </h3>
            <p style={{ fontSize: 16, color: '#666666' }}>
              Try adjusting your filters to see more picks
            </p>
          </div>
        )}
      </div>
    </div>
  );
}