import React from 'react';

export default function PickCardSkeleton() {
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: 16,
      border: '1px solid #e0e0e0',
      padding: 22,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0.3px 0.5px 0.5px hsl(0 0% 70% / 0.38), 0.4px 0.8px 0.7px -0.5px hsl(0 0% 70% / 0.35), 0.7px 1.4px 1.3px -1px hsl(0 0% 70% / 0.32)',
      minHeight: '200px'
    }}>
      {/* Shimmer effect overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        height: '100%',
        width: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
        animation: 'shimmer 1.5s infinite'
      }} />

      {/* Header skeleton */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18, gap: 12 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{
              width: 60,
              height: 28,
              background: '#f0f0f0',
              borderRadius: 6
            }} />
            <div style={{
              width: 140,
              height: 28,
              background: '#f0f0f0',
              borderRadius: 6
            }} />
          </div>
          <div style={{
            width: 90,
            height: 28,
            background: '#f0f0f0',
            borderRadius: 6
          }} />
        </div>
        <div style={{
          width: '70%',
          height: 32,
          background: '#f0f0f0',
          borderRadius: 4
        }} />
      </div>

      {/* Details skeleton */}
      <div style={{
        background: '#f8f8f8',
        padding: 18,
        borderRadius: 12,
        marginBottom: 16
      }}>
        <div style={{ display: 'flex', gap: 80, marginBottom: 16 }}>
          <div>
            <div style={{
              width: 80,
              height: 12,
              background: '#e0e0e0',
              borderRadius: 4,
              marginBottom: 6
            }} />
            <div style={{
              width: 100,
              height: 24,
              background: '#e0e0e0',
              borderRadius: 4
            }} />
          </div>
          <div>
            <div style={{
              width: 40,
              height: 12,
              background: '#e0e0e0',
              borderRadius: 4,
              marginBottom: 6
            }} />
            <div style={{
              width: 80,
              height: 24,
              background: '#e0e0e0',
              borderRadius: 4
            }} />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{
              width: 50,
              height: 12,
              background: '#e0e0e0',
              borderRadius: 4,
              marginBottom: 6
            }} />
            <div style={{
              width: 70,
              height: 24,
              background: '#e0e0e0',
              borderRadius: 4
            }} />
          </div>
          <div style={{
            width: 80,
            height: 32,
            background: '#e0e0e0',
            borderRadius: 8
          }} />
        </div>
      </div>

      {/* Analysis skeleton */}
      <div>
        <div style={{
          width: 80,
          height: 12,
          background: '#f0f0f0',
          borderRadius: 4,
          marginBottom: 10
        }} />
        <div style={{
          width: '100%',
          height: 16,
          background: '#f0f0f0',
          borderRadius: 4,
          marginBottom: 8
        }} />
        <div style={{
          width: '90%',
          height: 16,
          background: '#f0f0f0',
          borderRadius: 4,
          marginBottom: 8
        }} />
        <div style={{
          width: '70%',
          height: 16,
          background: '#f0f0f0',
          borderRadius: 4
        }} />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
}