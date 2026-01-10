import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Picks', path: '/picks' },
    { label: 'Analytics', path: '/analytics' },
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: scrolled 
        ? 'rgba(10, 14, 39, 0.95)' 
        : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
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
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          cursor: 'pointer'
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
        </div>

        {/* Desktop Navigation */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 40,
          '@media (max-width: 768px)': {
            display: mobileMenuOpen ? 'flex' : 'none'
          }
        }}>
          {navLinks.map(link => (
            <a
              key={link.path}
              href={link.path}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: 15,
                fontWeight: 600,
                transition: 'all 0.2s ease',
                position: 'relative',
                padding: '8px 0'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'white';
              }}
            >
              {link.label}
            </a>
          ))}

          {user?.role === 'free' && (
            <a
              href="/upgrade"
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
            </a>
          )}

          {user?.role === 'admin' && (
            <>
              <a
                href="/admin"
                style={{
                  color: '#ef4444',
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 700,
                  transition: 'all 0.2s ease'
                }}
              >
                Admin
              </a>
              <a
                href="/admin/dashboard"
                style={{
                  color: '#ef4444',
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 700,
                  transition: 'all 0.2s ease'
                }}
              >
                Dashboard
              </a>
            </>
          )}
        </nav>

        {/* User Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 15
        }}>
          {!user ? (
            <>
              <a
                href="/login"
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
              </a>
              <a
                href="/register"
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
              </a>
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
                onClick={() => console.log('logout')} // Replace with: onClick={logout}
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

      <style>{`
        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(251, 191, 36, 0);
          }
        }

        @media (max-width: 768px) {
          nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(10, 14, 39, 0.98);
            padding: 20px;
            flex-direction: column;
            gap: 20px !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
        }
      `}</style>
    </header>
  );
}