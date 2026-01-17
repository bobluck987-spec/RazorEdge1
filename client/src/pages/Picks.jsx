import React, { useState } from 'react';
import { usePickContext } from '../context/PickContext';
import { useAuth } from '../context/AuthContext';
import { Target, Loader2, AlertCircle, Filter, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import PickCard from '../components/PickCard';
import PickCardSkeleton from '../components/PickCardSkeleton';

export default function Picks() {
  const { picks: allPicks, loading, error, dateRange, setDateRange } = usePickContext();
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [sportFilter, setSportFilter] = useState('all');

  const filteredPicks = allPicks.filter(pick => {
    if (filter !== 'all' && pick.access !== filter) return false;
    if (sportFilter !== 'all' && pick.sport !== sportFilter) return false;
    return true;
  });

  // Calculate betting units and ROI
  const calculateStats = () => {
    const completedPicks = allPicks.filter(p => p.status === 'win' || p.status === 'loss');
    const wins = allPicks.filter(p => p.status === 'win').length;
    const losses = allPicks.filter(p => p.status === 'loss').length;
    const total = wins + losses;
    const winRate = total > 0 ? ((wins / total) * 100).toFixed(1) : '0.0';
    
    // Calculate units (assuming 1 unit per bet)
    let totalUnits = 0;
    completedPicks.forEach(pick => {
      if (pick.status === 'win') {
        const odds = pick.odds;
        if (odds > 0) {
          totalUnits += odds / 100; // Underdog win
        } else {
          totalUnits += 100 / Math.abs(odds); // Favorite win
        }
      } else if (pick.status === 'loss') {
        totalUnits -= 1;
      }
    });
    
    const roi = total > 0 ? ((totalUnits / total) * 100).toFixed(1) : '0.0';
    
    return {
      record: `${wins}-${losses}`,
      winRate,
      units: totalUnits.toFixed(2),
      roi
    };
  };

  const stats = calculateStats();

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
        <div style={{ marginBottom: 32 }}>
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

        {/* Stats Cards - Betting Units & ROI */}
        {!loading && allPicks.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            marginBottom: 32
          }}>
            <div style={{
              background: '#ffffff',
              padding: 20,
              borderRadius: 12,
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 8
              }}>
                <Target style={{ width: 18, height: 18, color: '#e73725' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#666666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Record
                </span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#010000' }}>
                {stats.record}
              </div>
              <div style={{ fontSize: 14, color: '#4a4a4a', marginTop: 4 }}>
                {stats.winRate}% Win Rate
              </div>
            </div>

            <div style={{
              background: '#ffffff',
              padding: 20,
              borderRadius: 12,
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 8
              }}>
                <DollarSign style={{ width: 18, height: 18, color: parseFloat(stats.units) >= 0 ? '#5dc110' : '#ef4444' }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#666666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Units
                </span>
              </div>
              <div style={{ 
                fontSize: 28, 
                fontWeight: 900, 
                color: parseFloat(stats.units) >= 0 ? '#5dc110' : '#ef4444'
              }}>
                {parseFloat(stats.units) >= 0 ? '+' : ''}{stats.units}
              </div>
              <div style={{ fontSize: 14, color: '#4a4a4a', marginTop: 4 }}>
                Total Profit/Loss
              </div>
            </div>

            <div style={{
              background: '#ffffff',
              padding: 20,
              borderRadius: 12,
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 8
              }}>
                {parseFloat(stats.roi) >= 0 ? (
                  <TrendingUp style={{ width: 18, height: 18, color: '#5dc110' }} />
                ) : (
                  <TrendingDown style={{ width: 18, height: 18, color: '#ef4444' }} />
                )}
                <span style={{ fontSize: 12, fontWeight: 700, color: '#666666', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  ROI
                </span>
              </div>
              <div style={{ 
                fontSize: 28, 
                fontWeight: 900, 
                color: parseFloat(stats.roi) >= 0 ? '#5dc110' : '#ef4444'
              }}>
                {parseFloat(stats.roi) >= 0 ? '+' : ''}{stats.roi}%
              </div>
              <div style={{ fontSize: 14, color: '#4a4a4a', marginTop: 4 }}>
                Return on Investment
              </div>
            </div>
          </div>
        )}

        {/* Date Range Filter */}
        <div style={{
          display: 'flex',
          gap: 8,
          marginBottom: 24,
          justifyContent: 'center',
          flexWrap: 'wrap',
          width: '100%',
          overflow: 'hidden'
        }}>
          <div style={{
            display: 'flex',
            gap: 8,
            background: '#ffffff',
            padding: 6,
            borderRadius: 12,
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            flexWrap: 'wrap',
            maxWidth: '100%'
          }}>
            {[
              { value: 'upcoming', label: 'Upcoming' },
              { value: 'week', label: 'Week' },
              { value: 'month', label: 'Month' },
              { value: 'ytd', label: 'YTD' }
            ].map(range => (
              <button
                key={range.value}
                onClick={(e) => { 
                  e.preventDefault();
                  setDateRange(range.value);
                }}
                style={{
                  padding: '10px 16px',
                  background: dateRange === range.value ? '#e73725' : 'transparent',
                  color: dateRange === range.value ? '#ffffff' : '#010000',
                  border: 'none',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 13,
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
              >
                {range.label}
              </button>
            ))}
          </div>
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
                onClick={(e) => {
                  e.preventDefault();
                  setFilter(f);
                }}
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

        {/* Picks Grid with smooth transitions */}
        <div style={{ 
          display: 'grid', 
          gap: 24,
          transition: 'opacity 0.3s ease'
        }}>
          {loading ? (
            // Show skeleton loaders
            <>
              <PickCardSkeleton />
              <PickCardSkeleton />
              <PickCardSkeleton />
            </>
          ) : (
            filteredPicks.map((pick) => (
              <PickCard key={pick.id} pick={pick} user={user} />
            ))
          )}
        </div>

        {!loading && filteredPicks.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: 80,
            background: '#ffffff',
            borderRadius: 16,
            border: '1px solid #e0e0e0',
            opacity: 1,
            transition: 'opacity 0.3s ease'
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