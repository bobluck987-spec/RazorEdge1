import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart2, Shield, Users, ArrowRight, CheckCircle } from 'lucide-react';

export default function Home() {
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: '67.8%', label: 'Win Rate', sublabel: 'Against the spread' },
    { value: '1,247', label: 'Picks Graded', sublabel: 'Full transparency' },
    { value: '+15.3%', label: 'Avg ROI', sublabel: 'Verified results' },
    { value: '8,400+', label: 'Active Members', sublabel: 'Growing daily' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FAFAFA',
      paddingBottom: 100,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif'
    }}>
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F5F7FA 100%)',
        padding: '60px 24px 80px',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto'
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
              padding: '12px 24px',
              background: '#E8F5E9',
              borderRadius: 100,
              border: '1px solid #4CAF50'
            }}>
              <CheckCircle style={{ width: 18, height: 18, color: '#2E7D32' }} />
              <span style={{
                fontSize: 14,
                fontWeight: 700,
                color: '#2E7D32',
                letterSpacing: '0.3px'
              }}>
                Verified 67.8% Win Rate
              </span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(36px, 8vw, 56px)',
            fontWeight: 800,
            textAlign: 'center',
            lineHeight: 1.2,
            color: '#1A1A1A',
            marginBottom: 24,
            letterSpacing: '-0.02em'
          }}>
            Expert Sports Picks.<br />
            Human Analysis.
          </h1>

          <p style={{
            fontSize: 20,
            color: '#616161',
            textAlign: 'center',
            maxWidth: 700,
            margin: '0 auto 48px',
            lineHeight: 1.6,
            fontWeight: 400
          }}>
            We identify market inefficiencies and exploit undervalued underdogs. 
            No algorithms. Just sharp analysis and proven results.
          </p>

          {/* Primary CTA */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            maxWidth: 400,
            margin: '0 auto 60px'
          }}>
            <button style={{
              width: '100%',
              padding: '20px 32px',
              background: '#2563EB',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              boxShadow: '0 4px 16px rgba(37, 99, 235, 0.24)',
              transition: 'all 0.2s ease'
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.24)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(37, 99, 235, 0.24)';
            }}>
              Get Started Today
              <ArrowRight style={{ width: 20, height: 20 }} />
            </button>

            <button style={{
              width: '100%',
              padding: '20px 32px',
              background: 'white',
              color: '#2563EB',
              border: '2px solid #2563EB',
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.background = '#F5F7FA';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.background = 'white';
            }}>
              View Free Picks
            </button>
          </div>

          {/* Stats Showcase */}
          <div style={{
            maxWidth: 600,
            margin: '0 auto',
            background: 'white',
            borderRadius: 16,
            padding: 32,
            boxShadow: '0 2px 16px rgba(0, 0, 0, 0.06)',
            border: '1px solid #E0E0E0'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: 24
            }}>
              <div style={{
                fontSize: 56,
                fontWeight: 900,
                color: '#2563EB',
                marginBottom: 8,
                letterSpacing: '-0.02em'
              }}>
                {stats[currentStat].value}
              </div>
              <div style={{
                fontSize: 18,
                fontWeight: 700,
                color: '#1A1A1A',
                marginBottom: 4
              }}>
                {stats[currentStat].label}
              </div>
              <div style={{
                fontSize: 14,
                color: '#757575'
              }}>
                {stats[currentStat].sublabel}
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: 8,
              justifyContent: 'center'
            }}>
              {stats.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStat(idx)}
                  style={{
                    width: currentStat === idx ? 32 : 8,
                    height: 8,
                    borderRadius: 4,
                    border: 'none',
                    background: currentStat === idx ? '#2563EB' : '#E0E0E0',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section style={{
        padding: '80px 24px',
        background: 'white'
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 36,
            fontWeight: 800,
            textAlign: 'center',
            color: '#1A1A1A',
            marginBottom: 16,
            letterSpacing: '-0.01em'
          }}>
            Our Edge
          </h2>
          
          <p style={{
            fontSize: 18,
            color: '#616161',
            textAlign: 'center',
            maxWidth: 600,
            margin: '0 auto 64px',
            lineHeight: 1.6
          }}>
            We specialize in finding value where the market is wrong
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24
          }}>
            {[
              {
                icon: <TrendingUp style={{ width: 32, height: 32, color: '#2563EB' }} />,
                title: 'Market Analysis',
                description: 'We identify when public perception creates mispriced lines and spreads'
              },
              {
                icon: <BarChart2 style={{ width: 32, height: 32, color: '#2563EB' }} />,
                title: 'Spread Performance',
                description: 'Track teams that consistently over or underperform against expectations'
              },
              {
                icon: <Shield style={{ width: 32, height: 32, color: '#2563EB' }} />,
                title: 'Underdog Value',
                description: 'Focus on finding overlooked underdogs with real winning potential'
              },
              {
                icon: <Users style={{ width: 32, height: 32, color: '#2563EB' }} />,
                title: 'Human Expertise',
                description: 'No bots. Real analysts who understand the nuances of each game'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FAFAFA',
                  padding: 32,
                  borderRadius: 12,
                  border: '1px solid #E0E0E0',
                  transition: 'all 0.3s ease'
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.background = '#FAFAFA';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ marginBottom: 20 }}>
                  {item.icon}
                </div>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#1A1A1A',
                  marginBottom: 12
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: 15,
                  color: '#616161',
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

      {/* How It Works */}
      <section style={{
        padding: '80px 24px',
        background: '#F5F7FA'
      }}>
        <div style={{
          maxWidth: 800,
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 36,
            fontWeight: 800,
            textAlign: 'center',
            color: '#1A1A1A',
            marginBottom: 64,
            letterSpacing: '-0.01em'
          }}>
            How It Works
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 48
          }}>
            {[
              {
                number: '1',
                title: 'Expert Analysis',
                description: 'Our team analyzes market trends, team performance vs. spread, and identifies mispriced lines'
              },
              {
                number: '2',
                title: 'Value Identification',
                description: 'We focus on games where public perception differs from actual team capability'
              },
              {
                number: '3',
                title: 'Underdog Focus',
                description: 'Many of our best picks are undervalued underdogs that the market has overlooked'
              },
              {
                number: '4',
                title: 'Transparent Results',
                description: 'Every pick is graded and tracked. We show wins and losses—total transparency'
              }
            ].map((step, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: 24,
                  alignItems: 'flex-start'
                }}
              >
                <div style={{
                  flexShrink: 0,
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#2563EB',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  fontWeight: 900
                }}>
                  {step.number}
                </div>
                <div>
                  <h3 style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#1A1A1A',
                    marginBottom: 8
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    fontSize: 16,
                    color: '#616161',
                    lineHeight: 1.6,
                    margin: 0
                  }}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section style={{
        padding: '80px 24px',
        background: 'white'
      }}>
        <div style={{
          maxWidth: 800,
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: 36,
            fontWeight: 800,
            textAlign: 'center',
            color: '#1A1A1A',
            marginBottom: 48,
            letterSpacing: '-0.01em'
          }}>
            What Our Members Say
          </h2>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24
          }}>
            {[
              {
                quote: "Up 40% since joining. The underdog picks are where the real value is.",
                author: "Mike T.",
                role: "Premium Member, 6 months"
              },
              {
                quote: "Finally understand why certain picks work. Human analysis makes all the difference.",
                author: "Sarah K.",
                role: "Premium Member, 4 months"
              },
              {
                quote: "The transparency is refreshing. They show every pick, win or lose.",
                author: "James R.",
                role: "Premium Member, 8 months"
              }
            ].map((testimonial, idx) => (
              <div
                key={idx}
                style={{
                  background: '#FAFAFA',
                  padding: 28,
                  borderRadius: 12,
                  border: '1px solid #E0E0E0',
                  borderLeft: '4px solid #2563EB'
                }}
              >
                <p style={{
                  fontSize: 16,
                  color: '#1A1A1A',
                  lineHeight: 1.6,
                  marginBottom: 16,
                  fontStyle: 'italic'
                }}>
                  "{testimonial.quote}"
                </p>
                <div>
                  <div style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#1A1A1A'
                  }}>
                    {testimonial.author}
                  </div>
                  <div style={{
                    fontSize: 14,
                    color: '#757575'
                  }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(180deg, #2563EB 0%, #1D4ED8 100%)',
        color: 'white'
      }}>
        <div style={{
          maxWidth: 600,
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 40,
            fontWeight: 800,
            marginBottom: 16,
            letterSpacing: '-0.01em'
          }}>
            Ready to Start Winning?
          </h2>
          
          <p style={{
            fontSize: 18,
            opacity: 0.9,
            marginBottom: 40,
            lineHeight: 1.6
          }}>
            Join 8,400+ members who trust our expert analysis and proven track record
          </p>

          <button style={{
            width: '100%',
            maxWidth: 400,
            margin: '0 auto',
            padding: '24px 40px',
            background: 'white',
            color: '#2563EB',
            border: 'none',
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.2s ease'
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.transform = 'scale(0.98)';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            Upgrade to Premium
          </button>

          <p style={{
            fontSize: 14,
            opacity: 0.8,
            marginTop: 24
          }}>
            30-day money-back guarantee • Cancel anytime
          </p>
        </div>
      </section>

      <style>{`
        * {
          -webkit-tap-highlight-color: transparent;
        }

        button {
          -webkit-appearance: none;
        }
      `}</style>
    </div>
  );
}