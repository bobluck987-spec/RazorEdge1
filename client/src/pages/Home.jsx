import React, { useState, useEffect } from 'react';

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: '67.8%', label: 'Win Rate', color: '#10b981' },
    { value: '1,247', label: 'Total Picks', color: '#3b82f6' },
    { value: '15.3%', label: 'Avg ROI', color: '#8b5cf6' },
    { value: '8.4K', label: 'Members', color: '#f59e0b' },
  ];

  const features = [
    { icon: '🎯', title: 'Expert Picks', desc: 'Verified 67.8% win rate' },
    { icon: '📊', title: 'Live Analytics', desc: 'Real-time performance tracking' },
    { icon: '⚡', title: 'Instant Alerts', desc: 'Never miss a winning pick' },
    { icon: '🏆', title: 'Proven Results', desc: 'Transparent track record' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0e27',
      color: 'white',
      paddingBottom: 80,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* Hero Section - Mobile Optimized */}
      <section style={{
        padding: '80px 20px 60px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Animated Background Glow */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
          animation: 'pulse 4s ease-in-out infinite',
          pointerEvents: 'none'
        }} />

        {/* Live Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 24px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 50,
          marginBottom: 32,
          position: 'relative',
          zIndex: 1
        }}>
          <span style={{
            width: 8,
            height: 8,
            background: '#10b981',
            borderRadius: '50%',
            animation: 'pulse 2s ease-in-out infinite',
            boxShadow: '0 0 10px #10b981'
          }} />
          <span style={{
            fontSize: 13,
            fontWeight: 700,
            color: '#10b981',
            letterSpacing: '0.5px'
          }}>
            LIVE • 67.8% WIN RATE
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 'clamp(36px, 10vw, 56px)',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: 20,
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 8
          }}>
            Premium Sports Picks
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            That Actually Win
          </div>
        </h1>

        <p style={{
          fontSize: 18,
          color: '#94a3b8',
          lineHeight: 1.6,
          marginBottom: 32,
          maxWidth: 500,
          margin: '0 auto 32px',
          position: 'relative',
          zIndex: 1
        }}>
          Join 8,400+ winners using data-driven picks to beat the sportsbooks
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          maxWidth: 400,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          <button style={{
            padding: '18px 32px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            border: 'none',
            borderRadius: 12,
            fontSize: 17,
            fontWeight: 700,
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
            transition: 'all 0.3s ease',
            width: '100%'
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.transform = 'scale(0.98)';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            Start Winning Today →
          </button>

          <button style={{
            padding: '18px 32px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 12,
            fontSize: 17,
            fontWeight: 700,
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '100%'
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          }}>
            View Free Picks
          </button>
        </div>
      </section>

      {/* Stats Carousel - Mobile Optimized */}
      <section style={{
        padding: '40px 20px',
        background: 'rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
          maxWidth: 600,
          margin: '0 auto'
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 16,
              padding: 20,
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.transform = 'scale(0.98)';
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
              e.currentTarget.style.transform = 'scale(1)';
            }}>
              <div style={{
                fontSize: 32,
                fontWeight: 900,
                color: stat.color,
                marginBottom: 4
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: 13,
                color: '#64748b',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Swiper - Mobile Optimized */}
      <section style={{
        padding: '60px 0'
      }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: 900,
          textAlign: 'center',
          marginBottom: 40,
          padding: '0 20px',
          background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Why RazorEdge?
        </h2>

        {/* Feature Card - Auto-rotating */}
        <div style={{
          maxWidth: 400,
          margin: '0 auto',
          padding: '0 20px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: 20,
            padding: 32,
            textAlign: 'center',
            minHeight: 240,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            transition: 'all 0.5s ease',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              borderRadius: '20px 20px 0 0'
            }}>
              <div style={{
                height: '100%',
                background: 'white',
                borderRadius: 'inherit',
                width: `${((activeFeature + 1) / 4) * 100}%`,
                transition: 'width 0.5s linear'
              }} />
            </div>

            <div style={{
              fontSize: 64,
              marginBottom: 20,
              animation: 'float 3s ease-in-out infinite'
            }}>
              {features[activeFeature].icon}
            </div>

            <h3 style={{
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 12,
              color: 'white'
            }}>
              {features[activeFeature].title}
            </h3>

            <p style={{
              fontSize: 16,
              color: '#94a3b8',
              lineHeight: 1.6
            }}>
              {features[activeFeature].desc}
            </p>
          </div>

          {/* Dot Indicators */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 8,
            marginTop: 24
          }}>
            {features.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFeature(idx)}
                style={{
                  width: activeFeature === idx ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  border: 'none',
                  background: activeFeature === idx ? '#3b82f6' : 'rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: 0
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof - Mobile Stack */}
      <section style={{
        padding: '60px 20px',
        background: 'rgba(59, 130, 246, 0.05)'
      }}>
        <h2 style={{
          fontSize: 32,
          fontWeight: 900,
          textAlign: 'center',
          marginBottom: 40,
          background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Trusted by Winners
        </h2>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          maxWidth: 400,
          margin: '0 auto'
        }}>
          {[
            { text: "Up 40% since joining. Best investment.", author: "Mike T.", role: "Premium" },
            { text: "The analytics are incredible. Finally get the edge.", author: "Sarah K.", role: "Premium" },
            { text: "ROI speaks for itself. This is real.", author: "James R.", role: "Premium" }
          ].map((t, idx) => (
            <div key={idx} style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 16,
              padding: 20
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 12
              }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  fontWeight: 900
                }}>
                  {t.author[0]}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>{t.author}</div>
                  <div style={{ fontSize: 12, color: '#3b82f6', fontWeight: 600 }}>{t.role} Member</div>
                </div>
              </div>
              <p style={{
                fontSize: 15,
                color: '#cbd5e1',
                fontStyle: 'italic',
                lineHeight: 1.5,
                margin: 0
              }}>
                "{t.text}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA - Mobile Sticky-ish */}
      <section style={{
        padding: '60px 20px',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)'
      }}>
        <div style={{
          maxWidth: 400,
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 36,
            fontWeight: 900,
            marginBottom: 16,
            background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Start Winning Today
          </h2>
          <p style={{
            fontSize: 16,
            color: '#94a3b8',
            marginBottom: 32,
            lineHeight: 1.6
          }}>
            Join premium and get instant access to expert picks, live analytics, and our winning community.
          </p>
          
          <button style={{
            padding: '20px 40px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            border: 'none',
            borderRadius: 12,
            fontSize: 18,
            fontWeight: 700,
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 15px 40px rgba(59, 130, 246, 0.4)',
            width: '100%',
            marginBottom: 16
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
            fontSize: 13,
            color: '#64748b',
            margin: 0
          }}>
            30-day money-back guarantee • Cancel anytime
          </p>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        * {
          -webkit-tap-highlight-color: transparent;
        }

        button {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
      `}</style>
    </div>
  );
}