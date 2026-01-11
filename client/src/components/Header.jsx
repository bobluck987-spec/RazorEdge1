import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/picks', label: 'Picks', icon: '🎯' },
    { path: '/analytics', label: 'Analytics', icon: '📊' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* DESKTOP HEADER - Sticky at top */}
      <header style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled 
          ? 'rgba(10, 14, 39, 0.95)' 
          : 'rgba(10, 14, 39, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            textDecoration: 'none'
          }}>
            <div style={{
              width: 40,
              height: 40,
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              borderRadius: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 900,
              color: 'white',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)'
            }}>
              R
            </div>
            <span style={{
              fontSize: 24,
              fontWeight: 900,
              background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}>
              RazorEdge
            </span>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav style={{
            display: 'flex',
            alignItems: 'center',
            gap: 40
          }}
          className="desktop-nav">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  color: isActive(item.path) ? '#3b82f6' : 'white',
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  padding: '8px 0',
                  borderBottom: isActive(item.path) ? '2px solid #3b82f6' : '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) e.target.style.color = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) e.target.style.color = 'white';
                }}
              >
                {item.label}
              </Link>
            ))}

            {user?.role === 'free' && (
              <Link to="/upgrade"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 700,
                  padding: '8px 20px',
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  borderRadius: 8,
                  transition: 'all 0.2s ease',
                  animation: 'pulse 2s ease-in-out infinite'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 4px 20px rgba(251, 191, 36, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                ✨ Upgrade
              </Link>
            )}

            {user?.role === 'admin' && (
              <>
                <Link to="/admin"
                  style={{
                    color: '#ef4444',
                    textDecoration: 'none',
                    fontSize: 15,
                    fontWeight: 700,
                    transition: 'all 0.2s ease'
                  }}
                >
                  Admin
                </Link>
                <Link to="/admin/dashboard"
                  style={{
                    color: '#ef4444',
                    textDecoration: 'none',
                    fontSize: 15,
                    fontWeight: 700,
                    transition: 'all 0.2s ease'
                  }}
                >
                  Dashboard
                </Link>
              </>
            )}
          </nav>

          {/* User Section - Hidden on mobile */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 15
          }}
          className="desktop-nav">
            {!user ? (
              <>
                <Link to="/login"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: 15,
                    fontWeight: 600,
                    padding: '8px 16px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#3b82f6';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'white';
                  }}
                >
                  Login
                </Link>
                <Link to="/register"
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: 15,
                    fontWeight: 700,
                    padding: '10px 24px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    borderRadius: 8,
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
                  }}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 15,
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '8px 8px 8px 16px',
                borderRadius: 50,
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end'
                }}>
                  <span style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: 'white'
                  }}>
                    {user.email}
                  </span>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: user.role === 'premium' ? '#fbbf24' : user.role === 'admin' ? '#ef4444' : '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {user.role}
                  </span>
                </div>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  fontWeight: 900,
                  color: 'white'
                }}>
                  {user.email[0].toUpperCase()}
                </div>
                <button
                  onClick={logout}
                  style={{
                    padding: '8px 16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 700,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM TAB BAR */}
      <div className="mobile-tabs" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(10, 14, 39, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '8px 0',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          maxWidth: 600,
          margin: '0 auto'
        }}>
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: '8px 16px',
                textDecoration: 'none',
                color: isActive(item.path) ? '#3b82f6' : '#94a3b8',
                transition: 'all 0.2s ease',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <div style={{
                fontSize: 24,
                transform: isActive(item.path) ? 'translateY(-2px)' : 'translateY(0)',
                transition: 'transform 0.2s ease'
              }}>
                {item.icon}
              </div>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {item.label}
              </span>
            </Link>
          ))}
          
          {!user ? (
            <Link
              to="/login"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: '8px 16px',
                textDecoration: 'none',
                color: '#3b82f6',
                transition: 'all 0.2s ease',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <div style={{ fontSize: 24 }}>👤</div>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Login
              </span>
            </Link>
          ) : (
            <div
              onClick={logout}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: '8px 16px',
                color: '#94a3b8',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              <div style={{ fontSize: 24 }}>🚪</div>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                Logout
              </span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(251, 191, 36, 0);
          }
        }

        /* Hide mobile tabs on desktop */
        @media (min-width: 768px) {
          .mobile-tabs {
            display: none;
          }
        }

        /* Hide desktop nav on mobile, show mobile tabs */
        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}