import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Target, BarChart2, CheckCircle, ArrowRight, Trophy, Shield, Lock, RefreshCw } from 'lucide-react';

export default function Home() {
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleWins, setVisibleWins] = useState([]);
  const [visibleStats, setVisibleStats] = useState([]);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const cardRefs = useRef([]);
  const winRefs = useRef([]);
  const statRefs = useRef([]);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let index = cardRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleCards.includes(index)) {
              setVisibleCards(prev => [...prev, index]);
              return;
            }
            
            index = winRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleWins.includes(index)) {
              setVisibleWins(prev => [...prev, index]);
              return;
            }
            
            index = statRefs.current.indexOf(entry.target);
            if (index !== -1 && !visibleStats.includes(index)) {
              setVisibleStats(prev => [...prev, index]);
              return;
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    [...cardRefs.current, ...winRefs.current, ...statRefs.current].forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Observer for sticky CTA
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShowStickyCTA(!entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );

    if (heroRef.current) {
      heroObserver.observe(heroRef.current);
    }

    return () => {
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, [visibleCards, visibleWins, visibleStats]);

  const recentWins = [
    { title: 'NFL Wild Card', team: 'Eagles +3.5', odds: '-110', profit: '+$220', date: 'Jan 10' },
    { title: 'NBA', team: 'Lakers ML', odds: '+145', profit: '+$290', date: 'Jan 9' },
    { title: 'NFL Playoffs', team: 'Chiefs -7', odds: '-105', profit: '+$200', date: 'Jan 8' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8f8f8',
      paddingBottom: 100,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      
      {/* Hero Section */}
      <section ref={heroRef} style={{
        background: '#f8f8f8',
        padding: '80px 0 60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Image - Football themed */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://source.unsplash.com/1600x900/?football,stadium,red)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
          pointerEvents: 'none'
        }} />
        
        {/* Red tint overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, transparent 0%, rgba(231, 55, 37, 0.1) 100%)',
          pointerEvents: 'none'
        }} />
        
        {/* White overlay for text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(248, 248, 248, 0.75)',
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 1
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
        background: '#f8f8f8',
        padding: '80px 0'
      }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '50px 24px',
          background: '#f5f5f5',
          borderRadius: 20,
          boxShadow: '0.3px 0.5px 0.5px hsl(0 0% 70% / 0.38), 0.4px 0.8px 0.7px -0.5px hsl(0 0% 70% / 0.35), 0.7px 1.4px 1.3px -1px hsl(0 0% 70% / 0.32), 1.3px 2.6px 2.4px -1.5px hsl(0 0% 70% / 0.28), 2.3px 4.7px 4.3px -2px hsl(0 0% 70% / 0.25), 4px 8px 7.4px -2.5px hsl(0 0% 70% / 0.21), 6.4px 12.9px 11.9px -3px hsl(0 0% 70% / 0.18), 9.8px 19.6px 18.1px -3.5px hsl(0 0% 70% / 0.14), 14.3px 28.5px 26.3px -4px hsl(0 0% 70% / 0.11), 20px 40px 36.9px -4.5px hsl(0 0% 70% / 0.08)'
        }}>
        
          {/* Recent Wins */}
          <div style={{
            textAlign: 'center',
            marginBottom: 40
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 16,
              justifyContent: 'center'
            }}>
              <Trophy style={{ width: 26, height: 26, color: '#e73725' }} />
              <h2 style={{
                fontSize: 32,
                fontWeight: 800,
                color: '#010000',
                margin: 0
              }}>
                Recent Big Hits
              </h2>
            </div>
            <p style={{
              fontSize: 18,
              color: '#4a4a4a',
              margin: 0
            }}>
              We don't just talk. We cash tickets.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 16,
            marginBottom: 40
          }}>
            {recentWins.map((win, idx) => {
              const isVisible = visibleWins.includes(idx);
              return (
                <div
                  key={idx}
                  ref={el => winRefs.current[idx] = el}
                  style={{
                    background: '#ffffff',
                    border: 'none',
                    borderRadius: 10,
                    padding: 20,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translate(0, 0)' : 'translate(8px, 8px)',
                    boxShadow: isVisible ? '0.3px 0.5px 0.5px hsl(0 0% 70% / 0.41), 0.4px 0.8px 0.7px -1.1px hsl(0 0% 70% / 0.34), 0.9px 1.7px 1.6px -2.2px hsl(0 0% 70% / 0.27), 2.1px 4.2px 3.9px -3.4px hsl(0 0% 70% / 0.19), 4.5px 9px 8.3px -4.5px hsl(0 0% 70% / 0.12)' : 'none',
                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: `${idx * 0.1}s`
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: 16
                  }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: '#010000',
                        marginBottom: 8,
                        margin: 0
                      }}>
                        {win.title}
                      </h3>
                      <p style={{
                        fontSize: 15,
                        color: '#4a4a4a',
                        marginBottom: 4,
                        margin: '4px 0'
                      }}>
                        Pick: <span style={{ fontWeight: 700, color: '#010000' }}>{win.team}</span>
                      </p>
                      <p style={{
                        fontSize: 13,
                        color: '#666666',
                        margin: 0
                      }}>
                        Odds: {win.odds}
                      </p>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      gap: 8
                    }}>
                      <span style={{
                        background: '#5dc110',
                        color: '#ffffff',
                        fontSize: 11,
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: 20,
                        whiteSpace: 'nowrap'
                      }}>
                        WON
                      </span>
                      <div style={{
                        fontSize: 22,
                        fontWeight: 900,
                        color: '#5dc110'
                      }}>
                        {win.profit}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 12
          }}>
            {[
              { label: 'Win Rate', value: '67.8%' },
              { label: 'Total Picks', value: '1,247' },
              { label: 'Avg ROI', value: '+15.3%' },
              { label: 'Last 30d', value: '24-16' },
            ].map((stat, idx) => {
              const isVisible = visibleStats.includes(idx);
              return (
                <div
                  key={idx}
                  ref={el => statRefs.current[idx] = el}
                  style={{
                    background: '#ffffff',
                    padding: 20,
                    borderRadius: 10,
                    border: 'none',
                    textAlign: 'center',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translate(0, 0)' : 'translate(8px, 8px)',
                    boxShadow: isVisible ? '0.3px 0.5px 0.5px hsl(0 0% 70% / 0.41), 0.4px 0.8px 0.7px -1.1px hsl(0 0% 70% / 0.34), 0.9px 1.7px 1.6px -2.2px hsl(0 0% 70% / 0.27), 2.1px 4.2px 3.9px -3.4px hsl(0 0% 70% / 0.19), 4.5px 9px 8.3px -4.5px hsl(0 0% 70% / 0.12)' : 'none',
                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: `${idx * 0.1}s`
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section style={{
        background: '#f8f8f8',
        padding: '80px 0 60px'
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
            ].map((item, idx) => {
              const isVisible = visibleCards.includes(idx);
              return (
                <div 
                  key={idx} 
                  ref={el => cardRefs.current[idx] = el}
                  style={{
                    background: '#f5f5f5',
                    border: '1px solid #e0e0e0',
                    borderRadius: 16,
                    padding: '32px 24px',
                    textAlign: 'center',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translate(0, 0)' : 'translate(8px, 8px)',
                    boxShadow: isVisible ? '0.3px 0.5px 0.5px hsl(0 0% 70% / 0.41), 0.4px 0.8px 0.7px -1.1px hsl(0 0% 70% / 0.34), 0.9px 1.7px 1.6px -2.2px hsl(0 0% 70% / 0.27), 2.1px 4.2px 3.9px -3.4px hsl(0 0% 70% / 0.19), 4.5px 9px 8.3px -4.5px hsl(0 0% 70% / 0.12)' : 'none',
                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    transitionDelay: `${idx * 0.1}s`
                  }}
                >
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
              );
            })}
          </div>
        </div>
        
        {/* Transition Element */}
        <div style={{
          maxWidth: 1200,
          margin: '60px auto 0',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 16
        }}>
          <div style={{
            flex: 1,
            height: 2,
            background: 'linear-gradient(to right, transparent, #e73725, transparent)'
          }} />
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        background: '#010000',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Pattern Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(231, 55, 37, 0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: 0.3,
          pointerEvents: 'none'
        }} />
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

          {/* Trust Badges */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 24,
            marginTop: 40,
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: '#666666',
              fontSize: 13
            }}>
              <Shield style={{ width: 18, height: 18, color: '#e73725' }} />
              <span>Secure Payment</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: '#666666',
              fontSize: 13
            }}>
              <RefreshCw style={{ width: 18, height: 18, color: '#e73725' }} />
              <span>Money-Back Guarantee</span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: '#666666',
              fontSize: 13
            }}>
              <Lock style={{ width: 18, height: 18, color: '#e73725' }} />
              <span>SSL Encrypted</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA Bar */}
      <div style={{
        position: 'fixed',
        bottom: 'calc(84px + env(safe-area-inset-bottom))',
        left: 0,
        right: 0,
        background: '#ffffff',
        borderTop: '2px solid #e73725',
        padding: '12px 16px',
        boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.1)',
        transform: showStickyCTA ? 'translateY(0)' : 'translateY(calc(100% + 84px + env(safe-area-inset-bottom)))',
        transition: 'transform 0.3s ease',
        zIndex: 950,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12
      }}>
        <div>
          <div style={{
            fontSize: 14,
            fontWeight: 700,
            color: '#010000',
            marginBottom: 2
          }}>
            67.8% Win Rate
          </div>
          <div style={{
            fontSize: 11,
            color: '#666666'
          }}>
            Join 8,400+ winners
          </div>
        </div>
        <button style={{
          padding: '12px 24px',
          background: '#e73725',
          color: '#ffffff',
          border: 'none',
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 700,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 8px rgba(231, 55, 37, 0.3)'
        }}>
          Get Started
        </button>
      </div>

      <style>{`
        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
}