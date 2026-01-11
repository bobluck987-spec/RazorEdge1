import React, { useState, useEffect } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: 'Win Rate', value: '67.8%', trend: '+5.2%' },
    { label: 'Total Picks', value: '1,247', trend: '+124' },
    { label: 'Avg ROI', value: '15.3%', trend: '+2.1%' },
    { label: 'Active Users', value: '8.4K', trend: '+1.2K' },
  ];

  const testimonials = [
    {
      text: "RazorEdge's picks have completely transformed my betting strategy. Up 40% this season.",
      author: "Mike T.",
      role: "Premium Member"
    },
    {
      text: "The analytics are incredible. I finally understand why certain picks work. Worth every penny.",
      author: "Sarah K.",
      role: "Premium Member"
    },
    {
      text: "Best investment I've made. The edge they provide is real and consistent.",
      author: "James R.",
      role: "Premium Member"
    }
  ];

  const features = [
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Deep statistical analysis and trend identification that gives you the edge'
    },
    {
      icon: '🎯',
      title: 'Expert Picks',
      description: 'Carefully researched plays from our team of professional analysts'
    },
    {
      icon: '⚡',
      title: 'Real-Time Updates',
      description: 'Instant notifications when new picks drop or lines move'
    },
    {
      icon: '📈',
      title: 'Track Record',
      description: 'Full transparency with detailed performance history and analytics'
    }
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%)',
      minHeight: '100vh',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      paddingBottom: 80 // Add this for mobile tabs
    }}>
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 20px 80px',
        background: `radial-gradient(circle at ${50 + scrollY * 0.02}% ${50 - scrollY * 0.02}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`
      }}>
        {/* Animated background grid */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translateY(${scrollY * 0.5}px)`,
          opacity: 0.3
        }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 20px',
            background: 'rgba(59, 130, 246, 0.2)',
            borderRadius: 50,
            border: '1px solid rgba(59, 130, 246, 0.3)',
            marginBottom: 30,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}>
            🔥 67.8% Win Rate This Season
          </div>

          <h1 style={{
            fontSize: 'clamp(40px, 8vw, 72px)',
            fontWeight: 900,
            margin: '0 0 20px',
            background: 'linear-gradient(135deg, #fff 0%, #a0aec0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}>
            Premium Sports Picks<br />
            That Actually Win
          </h1>

          <p style={{
            fontSize: 'clamp(18px, 3vw, 24px)',
            color: '#94a3b8',
            maxWidth: 700,
            margin: '0 0 40px',
            lineHeight: 1.6
          }}>
            Join thousands of winning bettors who trust RazorEdge for data-driven picks, 
            expert analysis, and consistent profits.
          </p>

          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 60 }}>
            <button style={{
              padding: '18px 40px',
              fontSize: 18,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
              transform: 'translateY(0)',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.3)';
            }}>
              Start Winning Now
            </button>

            <button style={{
              padding: '18px 40px',
              fontSize: 18,
              fontWeight: 700,
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 12,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}>
              View Free Picks
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 20,
            maxWidth: 900,
          }}>
            {stats.map((stat, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                padding: 25,
                borderRadius: 16,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{
                  fontSize: 14,
                  color: '#94a3b8',
                  marginBottom: 8,
                  fontWeight: 600
                }}>
                  {stat.label}
                </div>
                <div style={{
                  fontSize: 32,
                  fontWeight: 900,
                  marginBottom: 4,
                  background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: 14,
                  color: '#10b981',
                  fontWeight: 700
                }}>
                  {stat.trend} this month
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{
        padding: '80px 20px',
        background: 'rgba(255, 255, 255, 0.02)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 900,
            textAlign: 'center',
            marginBottom: 20,
            background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Why RazorEdge?
          </h2>
          <p style={{
            textAlign: 'center',
            fontSize: 18,
            color: '#94a3b8',
            maxWidth: 600,
            margin: '0 auto 60px'
          }}>
            We combine data science, expert analysis, and proven strategies to give you an unfair advantage.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 30
          }}>
            {features.map((feature, idx) => (
              <div key={idx} style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.05) 100%)',
                padding: 35,
                borderRadius: 20,
                border: '1px solid rgba(59, 130, 246, 0.2)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div style={{
                  position: 'absolute',
                  top: -50,
                  right: -50,
                  width: 150,
                  height: 150,
                  background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }} />
                <div style={{ fontSize: 48, marginBottom: 20 }}>{feature.icon}</div>
                <h3 style={{
                  fontSize: 24,
                  fontWeight: 800,
                  marginBottom: 12,
                  color: 'white'
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: 16,
                  color: '#94a3b8',
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div style={{ padding: '80px 20px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 900,
            textAlign: 'center',
            marginBottom: 60,
            background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Trusted by Winning Bettors
          </h2>

          <div style={{
            maxWidth: 800,
            margin: '0 auto',
            position: 'relative',
            minHeight: 200
          }}>
            {testimonials.map((testimonial, idx) => (
              <div key={idx} style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                opacity: activeTestimonial === idx ? 1 : 0,
                transform: `translateY(${activeTestimonial === idx ? 0 : 20}px)`,
                transition: 'all 0.6s ease',
                pointerEvents: activeTestimonial === idx ? 'auto' : 'none'
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  padding: 40,
                  borderRadius: 20,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  textAlign: 'center'
                }}>
                  <p style={{
                    fontSize: 24,
                    fontStyle: 'italic',
                    marginBottom: 30,
                    color: '#e2e8f0',
                    lineHeight: 1.6
                  }}>
                    "{testimonial.text}"
                  </p>
                  <div style={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: 'white',
                    marginBottom: 5
                  }}>
                    {testimonial.author}
                  </div>
                  <div style={{
                    color: '#3b82f6',
                    fontSize: 14,
                    fontWeight: 600
                  }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 12,
              marginTop: 220
            }}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    border: 'none',
                    background: activeTestimonial === idx ? '#3b82f6' : 'rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        padding: '100px 20px',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.2) 0%, transparent 70%)`,
          animation: 'pulse 4s ease-in-out infinite'
        }} />

        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontSize: 'clamp(32px, 6vw, 56px)',
            fontWeight: 900,
            marginBottom: 20,
            background: 'linear-gradient(135deg, #fff 0%, #cbd5e1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Ready to Start Winning?
          </h2>
          <p style={{
            fontSize: 20,
            color: '#94a3b8',
            marginBottom: 40,
            lineHeight: 1.6
          }}>
            Join premium and get access to expert picks, advanced analytics, and a winning community.
          </p>
          <button style={{
            padding: '20px 50px',
            fontSize: 20,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 15px 50px rgba(59, 130, 246, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-4px) scale(1.05)';
            e.target.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 15px 50px rgba(59, 130, 246, 0.4)';
          }}>
            Upgrade to Premium
          </button>
          <p style={{
            fontSize: 14,
            color: '#64748b',
            marginTop: 20
          }}>
            30-day money-back guarantee • Cancel anytime
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}