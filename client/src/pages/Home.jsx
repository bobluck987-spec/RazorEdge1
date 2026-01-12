import React from 'react';
import { TrendingUp, Target, BarChart2, CheckCircle, ArrowRight, Trophy } from 'lucide-react';

export default function Home() {
  const recentWins = [
    { team: 'Eagles +3.5', result: 'WON', profit: '+$220', date: 'Jan 10' },
    { team: 'Lakers ML +145', result: 'WON', profit: '+$290', date: 'Jan 9' },
    { team: 'Chiefs -7', result: 'WON', profit: '+$200', date: 'Jan 8' },
    { team: '49ers o45.5', result: 'WON', profit: '+$180', date: 'Jan 7' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#e8eae3',
      paddingBottom: 100,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* DARK: Hero Section */}
      <section style={{
        background: '#e8eae3',
        padding: '80px 0 100px',
        position: 'relative'
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
              background: 'rgba(239, 68, 68, 0.1)',
              borderRadius: 100,
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}>
              <CheckCircle style={{ width: 18, height: 18, color: '#EF4444' }} />
              <span style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#EF4444',
                letterSpacing: '0.3px'
              }}>
                Verified 67.8% Win Rate
              </span>
            </div>
          </div>

          {/* Headline with Color Contrast */}
          <h1 style={{
            fontSize: 'clamp(36px, 8vw, 64px)',
            fontWeight: 900,
            textAlign: 'center',
            lineHeight: 1.1,
            marginBottom: 24,
            letterSpacing: '-0.02em'
          }}>
            <span style={{ color: '#FFFFFF' }}>
              Beat the Sportsbooks.
            </span>
            <br />
            <span style={{ color: '#EF4444' }}>
              Keep the Profit.
            </span>
          </h1>

          <p style={{
            fontSize: 20,
            color: '#A3A3A3',
            textAlign: 'center',
            maxWidth: 700,
            margin: '0 auto 48px',
            lineHeight: 1.6
          }}>
            Expert analysis. Market inefficiencies. Undervalued underdogs. 
            <strong style={{ color: '#FFFFFF' }}> No algorithms—just sharp picks that win.</strong>
          </p>

          {/* Primary CTAs */}
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
              background: '#EF4444',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)',
              transition: 'all 0.2s ease'
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
              e.currentTarget.style.background = '#DC2626';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = '#EF4444';
            }}>
              Start Winning Today
              <ArrowRight style={{ width: 20, height: 20 }} />
            </button>

            <button style={{
              width: '100%',
              padding: '20px 32px',
              background: 'transparent',
              color: '#FFFFFF',
              border: '2px solid #404040',
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.borderColor = '#525252';
              e.currentTarget.style.background = '#0A0A0A';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.borderColor = '#404040';
              e.currentTarget.style.background = 'transparent';
            }}>
              View Free Picks
            </button>
          </div>
        </div>
      </section>

      {/* LIGHT: Recent Big Hits + Stats */}
      <section style={{
        background: '#FFFFFF',
        padding: '80px 0'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px'
        }}>
          
          {/* Recent Wins */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginBottom: 40
          }}>
            <Trophy style={{ width: 28, height: 28, color: '#EF4444' }} />
            <h2 style={{
              fontSize: 32,
              fontWeight: 800,
              color: '#e8eae3',
              margin: 0
            }}>
              Recent Big Hits
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 16,
            marginBottom: 80
          }}>
            {recentWins.map((win, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FAFAFA',
                  border: '1px solid #E5E5E5',
                  borderRadius: 12,
                  padding: 20,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  padding: '6px 12px',
                  background: '#10B981',
                  borderBottomLeftRadius: 8,
                  fontSize: 12,
                  fontWeight: 900,
                  color: 'white'
                }}>
                  {win.result}
                </div>

                <div style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#e8eae3',
                  marginBottom: 8,
                  marginTop: 12
                }}>
                  {win.team}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: 24,
                    fontWeight: 900,
                    color: '#10B981'
                  }}>
                    {win.profit}
                  </span>
                  <span style={{
                    fontSize: 14,
                    color: '#737373'
                  }}>
                    {win.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Track Record Stats */}
          <h2 style={{
            fontSize: 36,
            fontWeight: 800,
            textAlign: 'center',
            color: '#e8eae3',
            marginBottom: 16
          }}>
            Proven Track Record
          </h2>

          <p style={{
            fontSize: 18,
            color: '#737373',
            textAlign: 'center',
            marginBottom: 48
          }}>
            Real results. Full transparency. Every pick graded.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 24
          }}>
            {[
              { label: 'All-Time Win Rate', value: '67.8%', sublabel: 'Against the spread' },
              { label: 'Total Picks Graded', value: '1,247', sublabel: 'Complete history' },
              { label: 'Average ROI', value: '+15.3%', sublabel: 'Verified returns' },
              { label: 'Last 30 Days', value: '24-16', sublabel: '60% win rate' },
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FAFAFA',
                  padding: 32,
                  borderRadius: 12,
                  border: '1px solid #E5E5E5',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  fontSize: 48,
                  fontWeight: 900,
                  color: '#EF4444',
                  marginBottom: 8,
                  letterSpacing: '-0.02em'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#e8eae3',
                  marginBottom: 4
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: 14,
                  color: '#737373'
                }}>
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK: Value Proposition */}
      <section style={{
        background: '#e8eae3',
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
            color: '#FFFFFF',
            marginBottom: 16
          }}>
            How We Find Value
          </h2>

          <p style={{
            fontSize: 18,
            color: '#A3A3A3',
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
            gap: 32
          }}>
            {[
              {
                icon: <Target style={{ width: 32, height: 32, color: '#EF4444' }} />,
                title: 'Market Inefficiencies',
                description: 'We identify when public perception creates mispriced lines. Teams get overvalued or undervalued based on narratives, not performance.'
              },
              {
                icon: <TrendingUp style={{ width: 32, height: 32, color: '#EF4444' }} />,
                title: 'Spread Analysis',
                description: 'Track teams that consistently over or underperform vs. expectations. Historical spread performance reveals hidden value.'
              },
              {
                icon: <BarChart2 style={{ width: 32, height: 32, color: '#EF4444' }} />,
                title: 'Underdog Focus',
                description: 'Many of our best picks are overlooked underdogs. The market often misprices teams with real winning potential.'
              }
            ].map((item, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 64,
                  height: 64,
                  background: '#0A0A0A',
                  border: '1px solid #262626',
                  borderRadius: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: 12
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: 15,
                  color: '#A3A3A3',
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

      {/* DARK: Final CTA */}
      <section style={{
        background: '#e8eae3',
        padding: '80px 0',
        borderTop: '1px solid #262626'
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
            color: '#FFFFFF',
            letterSpacing: '-0.01em'
          }}>
            Join 8,400+ Winning Bettors
          </h2>
          
          <p style={{
            fontSize: 18,
            color: '#A3A3A3',
            marginBottom: 40,
            lineHeight: 1.6
          }}>
            Get expert picks, full transparency, and proven results. Start winning today.
          </p>

          <button style={{
            padding: '24px 48px',
            background: '#EF4444',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(239, 68, 68, 0.4)',
            transition: 'all 0.2s ease',
            marginBottom: 24
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.transform = 'scale(0.98)';
            e.currentTarget.style.background = '#DC2626';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = '#EF4444';
          }}>
            Upgrade to Premium
          </button>

          <p style={{
            fontSize: 14,
            color: '#737373',
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