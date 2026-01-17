import React from 'react';
import { Clock, Lock } from 'lucide-react';

export default function PickCard({ pick, user }) {
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

  const isPremiumLocked = () => {
    return pick.access === 'premium' && (!user || user.role === 'free');
  };

  const hasSensitiveData = () => {
    return pick.pick_type || pick.line || pick.odds || pick.notes || 
           pick.status || pick.is_underdog !== undefined;
  };

  const shouldRenderDetails = () => {
    if (isPremiumLocked() && hasSensitiveData()) {
      console.warn('Security Warning: Premium pick contains sensitive data for non-premium user');
      return false;
    }
    return !isPremiumLocked();
  };

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 16,
        border: isPremiumLocked() 
          ? '2px solid #e73725'
          : '1px solid #e0e0e0',
        padding: 22,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: '0.3px 0.5px 0.5px hsl(0 0% 70% / 0.38), 0.4px 0.8px 0.7px -0.5px hsl(0 0% 70% / 0.35), 0.7px 1.4px 1.3px -1px hsl(0 0% 70% / 0.32)',
        minHeight: isPremiumLocked() ? '350px' : 'auto'
      }}
    >
      {/* Underdog Top Ribbon */}
      {pick.is_underdog && !isPremiumLocked() && shouldRenderDetails() && (
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
      {isPremiumLocked() && (
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
        marginTop: pick.is_underdog && !isPremiumLocked() && shouldRenderDetails() ? 28 : 0
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
      {shouldRenderDetails() && (
        <div style={{
          background: '#f8f8f8',
          padding: 18,
          borderRadius: 12,
          marginBottom: 16,
          border: '1px solid #e0e0e0'
        }}>
          {/* First Row: Pick Type and Line */}
          <div style={{
            display: 'flex',
            gap: 80,
            marginBottom: 16
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
          </div>

          {/* Second Row: Odds and Grading Badge */}
          <div style={{
            display: 'flex',
            gap: 80,
            alignItems: 'flex-end'
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
              marginLeft: '16px'
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
      {shouldRenderDetails() && pick.notes && (
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
  );
}