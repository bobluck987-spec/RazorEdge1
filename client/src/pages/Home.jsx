import React from 'react';
import { TrendingUp, Target, BarChart2, CheckCircle, ArrowRight, Trophy } from 'lucide-react';

export default function Home() {
  const recentWins = [
    { team: 'Eagles +3.5', profit: '+$220', date: 'Jan 10' },
    { team: 'Lakers ML', profit: '+$290', date: 'Jan 9' },
    { team: 'Chiefs -7', profit: '+$200', date: 'Jan 8' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      paddingBottom: 100,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* Hero Section */}
      <section style={{
        background: '#ffffff',
        padding: '80px 0 60px'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px'
        }}>
          
          {/* Trust Badge */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 32
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              background: 'rgba(231, 55, 37, 0.1)',
              borderRadius: 100,
              border: '1px solid rgba(231, 55, 37, 0.3)'
            }}>
              <CheckCircle style={{ width: 18, height: 18, color: '#e73725' }} />
              <span style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#e73725',
                letterSpacing: '0.3px'
              }}>
                Verified 67.8% Win Rate
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(36px, 8vw, 64px)',
            fontWeight: 900,
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: 24,
            letterSpacing: '-0.02em'
          }}>
            <span style={{ color: '#010000' }}>
              Beat the Sportsbooks.
            </span>
            <br />
            <span style={{ color: '#e73725' }}>
              Keep the Profit.
            </span>
          </h1>

          <p style={{
            fontSize: 20,
            color: '#4a4a4a',
            textAlign: 'center',
            maxWidth: 700,
            margin: '0 auto 48px',
            lineHeight: 1.6
          }}>
            Expert analysis. Market inefficiencies. Undervalued underdogs. 
            <strong style={{ color: '#010000' }}> No algorithms—just sharp picks that win.</strong>
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxWidth: 400,
            margin: '0 auto'
          }}>
            <button style={{
              width: '100%',
              padding: '20px 32px',
              background: '#e73725',
              color: '#ffffff',
              border: 'none',
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              boxShadow: '0 4px 20px rgba(231, 55, 37, 0.3)',
              transition: 'all 0.2s ease'
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
              e.currentTarget.style.background = '#c72d1f';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = '#e73725';
            }}>
              Start Winning Today
              <ArrowRight style={{ width: 20, height: 20 }} />
            </button>

            <button style={{
              width: '100%',
              padding: '20px 32px',
              background: '#010000',
              color: '#ffffff',
              border: 'none',
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.background = '#1a1a1a';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.background = '#010000';
            }}>
              View Free Picks
            </button>
          </div>
        </div>
      </section>

      {/* Condensed Data Section */}
      <section style={{
        background: '#f5f5f5',
        padding: '50px 0',
        borderTop: '1px solid #e0e0e0',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px'
        }}>
          
          {/* Recent Wins - Horizontal on mobile */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 32,
            justifyContent: 'center'
          }}>
            <Trophy style={{ width: 24, height: 24, color: '#e73725' }} />
            <h2 style={{
              fontSize: 24,
              fontWeight: 800,
              color: '#010000',
              margin: 0
            }}>
              Recent Wins
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12,
            marginBottom: 40
          }}>
            {recentWins.map((win, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid #010000',
                  borderRadius: 10,
                  padding: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#010000',
                    marginBottom: 4
                  }}>
                    {win.team}
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: '#666666'
                  }}>
                    {win.date}
                  </div>
                </div>
                <div style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: '#5dc110'
                }}>
                  {win.profit}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats - 2x2 Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 12,
            maxWidth: 600,
            margin: '0 auto'
          }}>
            {[
              { label: 'Win Rate', value: '67.8%' },
              { label: 'Total Picks', value: '1,247' },
              { label: 'Avg ROI', value: '+15.3%' },
              { label: 'Last 30d', value: '24-16' },
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  padding: 20,
                  borderRadius: 10,
                  border: '1px solid #010000',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: '#e73725',
                  marginBottom: 4,
                  letterSpacing: '-0.02em'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#666666'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section style={{
        background: '#ffffff',
        padding: '80px 0'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px'
        }}>
          <h2 style={{
            fontSize: 36,
            fontWeight: 800,
            textAlign: 'center',
            color: '#010000',
            marginBottom: 16
          }}>
            How We Find Value
          </h2>

          <p style={{
            fontSize: 18,
            color: '#4a4a4a',
            textAlign: 'center',
            maxWidth: 700,
            margin: '0 auto 64px',
            lineHeight: 1.6
          }}>
            We specialize in identifying market inefficiencies and exploiting undervalued opportunities
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24
          }}>
            {[
              {
                icon: <Target style={{ width: 32, height: 32, color: '#e73725' }} />,
                title: 'Market Inefficiencies',
                description: 'We identify when public perception creates mispriced lines. Teams get overvalued or undervalued based on narratives, not performance.'
              },
              {
                icon: <TrendingUp style={{ width: 32, height: 32, color: '#e73725' }} />,
                title: 'Spread Analysis',
                description: 'Track teams that consistently over or underperform vs. expectations. Historical spread performance reveals hidden value.'
              },
              {
                icon: <BarChart2 style={{ width: 32, height: 32, color: '#e73725' }} />,
                title: 'Underdog Focus',
                description: 'Many of our best picks are overlooked underdogs. The market often misprices teams with real winning potential.'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: '#f5f5f5',
                border: '1px solid #e0e0e0',
                borderRadius: 16,
                padding: '32px 24px',
                textAlign: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 20
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#010000',
                  marginBottom: 12
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: 15,
                  color: '#4a4a4a',
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        background: '#010000',
        padding: '80px 0'
      }}>
        <div style={{
          maxWidth: 700,
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 40,
            fontWeight: 900,
            marginBottom: 16,
            color: '#ffffff',
            letterSpacing: '-0.01em'
          }}>
            Join 8,400+ Winning Bettors
          </h2>
          
          <p style={{
            fontSize: 18,
            color: '#e1e1e1',
            marginBottom: 40,
            lineHeight: 1.6
          }}>
            Get expert picks, full transparency, and proven results. Start winning today.
          </p>

          <button style={{
            padding: '24px 48px',
            background: '#e73725',
            color: '#ffffff',
            border: 'none',
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(231, 55, 37, 0.4)',
            transition: 'all 0.2s ease',
            marginBottom: 24
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.transform = 'scale(0.98)';
            e.currentTarget.style.background = '#c72d1f';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = '#e73725';
          }}>
            Upgrade to Premium
          </button>

          <p style={{
            fontSize: 14,
            color: '#999999',
            margin: 0
          }}>
            30-day money-back guarantee • Cancel anytime • No commitments
          </p>
        </div>
      </section>

      <style>{`
        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
}