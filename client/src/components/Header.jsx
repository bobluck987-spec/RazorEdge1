import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Target, BarChart3, LogIn, LogOut, Crown } from 'lucide-react';

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
    { path: '/picks', label: 'Picks', icon: Target },
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
        background: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'white',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #E0E0E0',
        boxShadow: scrolled ? '0 2px 8px rgba(0, 0, 0, 0.04)' : 'none',
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
              background: '#2563EB',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Target style={{ width: 20, height: 20, color: 'white' }} />
            </div>
            <span style={{
              fontSize: 20,
              fontWeight: 800,
              color: '#1A1A1A',
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
                  color: isActive(item.path) ? '#2563EB' : '#616161',
                  textDecoration: 'none',
                  padding: '8px 0',
                  borderBottom: isActive(item.path) ? '2px solid #2563EB' : '2px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                {item.label}
              </Link>
            ))}

            {user?.role === 'free' && (
              <Link to="/upgrade" style={{
                padding: '10px 20px',
                background: '#FFA726',
                color: 'white',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 6
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
                  color: '#2563EB',
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 600
                }}>
                  Login
                </Link>
                <Link to="/register" style={{
                  padding: '10px 24px',
                  background: '#2563EB',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 700,
                  borderRadius: 8
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
                background: '#FAFAFA',
                borderRadius: 8,
                border: '1px solid #E0E0E0'
              }}>
                <div>
                  <div style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#1A1A1A'
                  }}>
                    {user.email}
                  </div>
                  <div style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: user.role === 'premium' ? '#FFA726' : user.role === 'admin' ? '#EF4444' : '#757575'
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
                    color: '#616161',
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
        background: 'white',
        borderTop: '1px solid #E0E0E0',
        padding: '12px 0 max(12px, env(safe-area-inset-bottom))',
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.04)'
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
                  color: active ? '#2563EB' : '#9E9E9E',
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
              color: '#2563EB',
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
              color: '#9E9E9E',
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