import React, { useState } from 'react';
import { usePickContext } from '../context/PickContext';
import { useAuth } from '../context/AuthContext';
import { Target, Loader2, AlertCircle, Filter } from 'lucide-react';
import PickCard from '../components/PickCard';

export default function Picks() {
  const { picks: allPicks, loading, error } = usePickContext();
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [sportFilter, setSportFilter] = useState('all');
  
  const filteredPicks = allPicks.filter(pick => {
    if (filter !== 'all' && pick.access !== filter) return false;
    if (sportFilter !== 'all' && pick.sport !== sportFilter) return false;
    return true;
  });
  
  if (loading) {
    return (
      <div style={{
        background: '#f8f8f8',
        minHeight: '100vh',
        color: '#010000',
        padding: '60px 20px 100px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 style={{ 
            width: 64, 
            height: 64, 
            color: '#e73725', 
            marginBottom: 20,
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <h3 style={{ fontSize: 24, fontWeight: 800, color: '#010000' }}>
            Loading picks...
          </h3>
        </div>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }
  
  if (error) {
    return (
      <div style={{
        background: '#f8f8f8',
        minHeight: '100vh',
        color: '#010000',
        padding: '60px 20px 100px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <AlertCircle style={{ 
            width: 64, 
            height: 64, 
            color: '#ef4444', 
            margin: '0 auto 20px'
          }} />
          <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12, color: '#010000' }}>
            Error Loading Picks
          </h3>
          <p style={{ fontSize: 16, color: '#666666' }}>
            {error}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div style={{
      background: '#f8f8f8',
      minHeight: '100vh',
      color: '#010000',
      padding: '60px 20px 100px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
            justifyContent: 'center'
          }}>
            <Target style={{ width: 32, height: 32, color: '#e73725' }} />
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 900,
              margin: 0,
              color: '#010000',
              letterSpacing: '-0.02em'
            }}>
              Expert Picks
            </h1>
          </div>
          <p style={{ 
            fontSize: 18, 
            color: '#4a4a4a', 
            margin: 0,
            textAlign: 'center',
            maxWidth: 600,
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Data-driven predictions with proven results
          </p>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: 15,
          marginBottom: 40,
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            gap: 8,
            background: '#ffffff',
            padding: 6,
            borderRadius: 12,
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            {['all', 'free', 'premium'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '12px 24px',
                  background: filter === f ? '#e73725' : 'transparent',
                  color: filter === f ? '#ffffff' : '#010000',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 14,
                  textTransform: 'capitalize',
                  transition: 'all 0.2s ease'
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <div style={{
            display: 'flex',
            gap: 8,
            background: '#ffffff',
            padding: 6,
            borderRadius: 12,
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}>
            {['all', 'NFL', 'NBA'].map(sport => (
              <button
                key={sport}
                onClick={() => setSportFilter(sport)}
                style={{
                  padding: '12px 24px',
                  background: sportFilter === sport ? '#010000' : 'transparent',
                  color: sportFilter === sport ? '#ffffff' : '#010000',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 14,
                  transition: 'all 0.2s ease'
                }}
              >
                {sport === 'all' ? 'All' : sport}
              </button>
            ))}
          </div>
        </div>

        {/* Picks Grid */}
        <div style={{ display: 'grid', gap: 24 }}>
          {filteredPicks.map((pick) => (
            <PickCard key={pick.id} pick={pick} user={user} />
          ))}
        </div>

        {filteredPicks.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: 80,
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #e0e0e0'
          }}>
            <Filter style={{ 
              width: 64, 
              height: 64, 
              color: '#e73725', 
              margin: '0 auto 20px'
            }} />
            <h3 style={{
              fontSize: 24,
              fontWeight: 800,
              marginBottom: 10,
              color: '#010000'
            }}>
              No picks match your filters
            </h3>
            <p style={{ fontSize: 16, color: '#666666' }}>
              Try adjusting your filters to see more picks
            </p>
          </div>
        )}
      </div>
    </div>
  );
}