import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, TrendingUp, BarChart3, LogIn, LogOut, Crown, Zap, Menu, X } from 'lucide-react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const tabRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent scrolling when menu is open
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/picks', label: 'Picks', icon: TrendingUp },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const isActive = (path) => location.pathname === path;
  const activeIndex = navItems.findIndex(item => isActive(item.path));

  useEffect(() => {
    // Update indicator position when active tab changes
    if (tabRefs.current[activeIndex] && activeIndex !== -1) {
      const tab = tabRefs.current[activeIndex];
      setIndicatorStyle({
        left: tab.offsetLeft,
        width: tab.offsetWidth
      });
    }
  }, [activeIndex, location.pathname]);

  return (
    <>
      {/* Desktop Header */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(1, 0, 0, 0.95)' : '#010000',
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
              background: '#e73725',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(231, 55, 37, 0.3)'
            }}>
              <Zap style={{ width: 20, height: 20, color: '#010000' }} />
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

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              padding: 8,
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer'
            }}
          >
            {menuOpen ? <X style={{ width: 24, height: 24 }} /> : <Menu style={{ width: 24, height: 24 }} />}
          </button>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32
          }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: isActive(item.path) ? '#e73725' : '#A3A3A3',
                  textDecoration: 'none',
                  padding: '8px 0',
                  borderBottom: isActive(item.path) ? '2px solid #e73725' : '2px solid transparent',
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
                background: '#e73725',
                color: '#FFFFFF',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: 700,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 0 20px rgba(231, 55, 37, 0.3)'
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
                  color: '#e73725',
                  textDecoration: 'none'
                }}>
                  Admin
                </Link>
                <Link to="/admin/dashboard" style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#e73725',
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
                  background: '#e73725',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 700,
                  borderRadius: 8,
                  boxShadow: '0 0 20px rgba(231, 55, 37, 0.3)'
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
                    color: user.role === 'premium' ? '#e73725' : user.role === 'admin' ? '#e73725' : '#737373'
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

      {/* Mobile Menu Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(1, 0, 0, 0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 999,
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
        overflowY: 'auto',
        paddingTop: 80
      }}>
        <div style={{
          maxWidth: 600,
          margin: '0 auto',
          padding: '40px 24px',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-20px)',
          transition: 'transform 0.3s ease',
          transitionDelay: menuOpen ? '0.1s' : '0s'
        }}>
          {/* Nav Links */}
          <nav style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            marginBottom: 32
          }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '16px 20px',
                    background: active ? 'rgba(231, 55, 37, 0.1)' : 'transparent',
                    borderRadius: 12,
                    textDecoration: 'none',
                    color: active ? '#e73725' : '#ffffff',
                    fontSize: 18,
                    fontWeight: 600,
                    border: active ? '1px solid rgba(231, 55, 37, 0.3)' : '1px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Icon style={{ width: 24, height: 24 }} />
                  {item.label}
                </Link>
              );
            })}

            {user?.role === 'admin' && (
              <>
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '16px 20px',
                    background: 'transparent',
                    borderRadius: 12,
                    textDecoration: 'none',
                    color: '#e73725',
                    fontSize: 18,
                    fontWeight: 600,
                    border: '1px solid transparent'
                  }}
                >
                  Admin
                </Link>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '16px 20px',
                    background: 'transparent',
                    borderRadius: 12,
                    textDecoration: 'none',
                    color: '#e73725',
                    fontSize: 18,
                    fontWeight: 600,
                    border: '1px solid transparent'
                  }}
                >
                  Dashboard
                </Link>
              </>
            )}
          </nav>

          {/* User Section */}
          <div style={{
            borderTop: '1px solid #262626',
            paddingTop: 24
          }}>
            {!user ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: '16px 24px',
                    background: 'transparent',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: 16,
                    fontWeight: 600,
                    textAlign: 'center',
                    border: '1px solid #262626',
                    borderRadius: 12
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    padding: '16px 24px',
                    background: '#e73725',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontSize: 16,
                    fontWeight: 700,
                    textAlign: 'center',
                    borderRadius: 12,
                    boxShadow: '0 0 20px rgba(231, 55, 37, 0.3)'
                  }}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  background: '#0A0A0A',
                  borderRadius: 12,
                  border: '1px solid #262626',
                  marginBottom: 16
                }}>
                  <div>
                    <div style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: '#FFFFFF'
                    }}>
                      {user.email}
                    </div>
                    <div style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: user.role === 'premium' ? '#e73725' : user.role === 'admin' ? '#e73725' : '#737373'
                    }}>
                      {user.role.toUpperCase()}
                    </div>
                  </div>
                </div>

                {user.role === 'free' && (
                  <Link
                    to="/upgrade"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      padding: '16px 24px',
                      background: '#e73725',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: 16,
                      fontWeight: 700,
                      borderRadius: 12,
                      boxShadow: '0 0 20px rgba(231, 55, 37, 0.3)',
                      marginBottom: 12
                    }}
                  >
                    <Crown style={{ width: 20, height: 20 }} />
                    Upgrade to Premium
                  </Link>
                )}

                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    background: 'transparent',
                    color: '#A3A3A3',
                    border: '1px solid #262626',
                    borderRadius: 12,
                    fontSize: 16,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8
                  }}
                >
                  <LogOut style={{ width: 20, height: 20 }} />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="mobile-tabs" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        background: '#010000',
        borderTop: '1px solid #262626',
        padding: '12px 0 max(12px, env(safe-area-inset-bottom))',
        transform: 'translateZ(0)', // Force GPU acceleration
        WebkitTransform: 'translateZ(0)', // For Safari
        backfaceVisibility: 'hidden', // Prevent flickering
        WebkitBackfaceVisibility: 'hidden'
      }}>
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'space-around',
          maxWidth: 600,
          margin: '0 auto'
        }}>
          {/* Sliding Indicator */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: indicatorStyle.left,
            width: indicatorStyle.width,
            height: 3,
            background: '#e73725',
            borderRadius: '3px 3px 0 0',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 0 10px rgba(231, 55, 37, 0.5)'
          }} />

          {navItems.map((item, idx) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                ref={el => tabRefs.current[idx] = el}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  padding: '8px 20px',
                  textDecoration: 'none',
                  color: active ? '#e73725' : '#737373',
                  WebkitTapHighlightColor: 'transparent',
                  transition: 'color 0.2s ease'
                }}
              >
                <Icon style={{ 
                  width: 24, 
                  height: 24,
                  strokeWidth: active ? 2.5 : 2,
                  transition: 'all 0.2s ease'
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
              color: '#e73725',
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
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}