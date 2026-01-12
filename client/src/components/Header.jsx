import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, TrendingUp, BarChart3, LogIn, LogOut, Crown, Zap } from 'lucide-react';

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
    { path: '/', label: 'Home', icon: Home },
    { path: '/picks', label: 'Picks', icon: TrendingUp }, // Changed from Target
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Desktop Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(0, 0, 0, 0.95)' : '#000000',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #262626',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '16px 24px',
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
              width: 36,
              height: 36,
              background: '#EF4444',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)'
            }}>
              <Zap style={{ width: 20, height: 20, color: '#000000' }} />
            </div>
            <span style={{
              fontSize: 20,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.01em'
            }}>
              RazorEdge
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32
          }}>
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: isActive(item.path) ? '#EF4444' : '#A3A3A3',
                  textDecoration: 'none',
                  padding: '8px 0',
                  borderBottom: isActive(item.path) ? '2px solid #EF4444' : '2px solid transparent',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) e.currentTarget.style.color = '#A3A3A3';
                }}
              >
                {item.label}
              </Link>
            ))}

            {user?.role === 'free' && (
              <Link to="/upgrade" style={{
                padding: '10px 20px',
                background: '#EF4444',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)'
              }}>
                <Crown style={{ width: 16, height: 16 }} />
                Upgrade
              </Link>
            )}

            {user?.role === 'admin' && (
              <>
                <Link to="/admin" style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#EF4444',
                  textDecoration: 'none'
                }}>
                  Admin
                </Link>
                <Link to="/admin/dashboard" style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#EF4444',
                  textDecoration: 'none'
                }}>
                  Dashboard
                </Link>
              </>
            )}
          </nav>

          {/* User Section */}
          <div className="desktop-nav" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            {!user ? (
              <>
                <Link to="/login" style={{
                  padding: '10px 20px',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 600
                }}>
                  Login
                </Link>
                <Link to="/register" style={{
                  padding: '10px 24px',
                  background: '#EF4444',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 700,
                  borderRadius: 8,
                  boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)'
                }}>
                  Sign Up
                </Link>
              </>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '8px 12px',
                background: '#0A0A0A',
                borderRadius: 8,
                border: '1px solid #262626'
              }}>
                <div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#FFFFFF'
                  }}>
                    {user.email}
                  </div>
                  <div style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: user.role === 'premium' ? '#EF4444' : user.role === 'admin' ? '#EF4444' : '#737373'
                  }}>
                    {user.role.toUpperCase()}
                  </div>
                </div>
                <button
                  onClick={logout}
                  style={{
                    padding: 8,
                    background: 'transparent',
                    border: 'none',
                    color: '#A3A3A3',
                    cursor: 'pointer'
                  }}
                >
                  <LogOut style={{ width: 18, height: 18 }} />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <div className="mobile-tabs" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: '#000000',
        borderTop: '1px solid #262626',
        padding: '12px 0 max(12px, env(safe-area-inset-bottom))'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          maxWidth: 600,
          margin: '0 auto'
        }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  padding: '8px 20px',
                  textDecoration: 'none',
                  color: active ? '#EF4444' : '#737373',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <Icon style={{ 
                  width: 24, 
                  height: 24,
                  strokeWidth: active ? 2.5 : 2
                }} />
                <span style={{
                  fontSize: 11,
                  fontWeight: 600
                }}>
                  {item.label}
                </span>
              </Link>
            );
          })}
          
          {!user ? (
            <Link to="/login" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '8px 20px',
              textDecoration: 'none',
              color: '#EF4444',
              WebkitTapHighlightColor: 'transparent'
            }}>
              <LogIn style={{ width: 24, height: 24 }} />
              <span style={{ fontSize: 11, fontWeight: 600 }}>Login</span>
            </Link>
          ) : (
            <div onClick={logout} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '8px 20px',
              color: '#737373',
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent'
            }}>
              <LogOut style={{ width: 24, height: 24 }} />
              <span style={{ fontSize: 11, fontWeight: 600 }}>Logout</span>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .mobile-tabs { display: none; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}