'use client';
import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function HarmonicaContent() {
  const searchParams = useSearchParams();
  const [unfolded, setUnfolded] = useState(false);
  const [showReply, setShowReply] = useState(false);
  
  // Dynamic extraction from the stashed link
  const line1 = searchParams.get('l1') || 'STASHED VIBE';
  const line2 = searchParams.get('l2') || '2026';
  const from = searchParams.get('from') || 'A FRIEND'; 
  const vibeId = searchParams.get('vibe') || '14'; 

  // The Reveal Delay: After clicking, wait 3 seconds to show the reply button
  useEffect(() => {
    if (unfolded) {
      const timer = setTimeout(() => setShowReply(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [unfolded]);

  return (
    <main style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', background: '#000', fontFamily: 'sans-serif' }}>
      <video key={vibeId} autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${vibeId}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(0,0,0,0.3)' }}>
        <div 
          onClick={() => !unfolded && setUnfolded(true)}
          style={{ 
            border: '2px solid gold', padding: '40px', borderRadius: '20px', 
            background: 'rgba(0,0,0,0.85)', textAlign: 'center', 
            cursor: unfolded ? 'default' : 'pointer',
            boxShadow: unfolded ? '0 0 50px gold' : '0 0 20px gold',
            transition: 'all 1s ease', maxWidth: '450px', width: '90%'
          }}
        >
          {!unfolded ? (
            <h2 style={{ color: 'gold', fontSize: '1.2rem', letterSpacing: '4px' }}>CLICK TO UNFOLD</h2>
          ) : (
            <div style={{ animation: 'fadeIn 2s ease-in' }}>
              <p style={{ color: 'gold', fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '20px' }}>STASHED BY {from}</p>
              <p style={{ color: 'white', fontSize: '2.2rem', fontWeight: 'bold', textTransform: 'uppercase', margin: '5px 0' }}>{line1}</p>
              <p style={{ color: 'white', fontSize: '2.2rem', fontWeight: 'bold', textTransform: 'uppercase', margin: '5px 0' }}>{line2}</p>
              
              <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,215,0,0.3)', opacity: showReply ? 1 : 0, transition: 'opacity 1.5s ease' }}>
                <button 
                  onClick={() => window.location.href = '/?reply=true'}
                  style={{ background: 'none', border: '1px solid gold', color: 'gold', padding: '10px 25px', borderRadius: '20px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}
                >
                  REPLY FOR FREE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{` @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } `}</style>
    </main>
  );
}

export default function OpenPage() {
  return (
    <Suspense fallback={<div style={{color: 'gold', background: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>UNFOLDING...</div>}>
      <HarmonicaContent />
    </Suspense>
  );
}
