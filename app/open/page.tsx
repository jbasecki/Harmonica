'use client';
import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function HarmonicaContent() {
  const searchParams = useSearchParams();
  const [unfolded, setUnfolded] = useState(false);
  const [showReply, setShowReply] = useState(false);
  
  const line1 = searchParams.get('l1') || '';
  const line2 = searchParams.get('l2') || '';
  const from = searchParams.get('from') || 'A FRIEND'; 
  const vibeId = searchParams.get('vibe') || '15'; // Using your latest Vibe 15 as default

  useEffect(() => {
    if (unfolded) {
      const timer = setTimeout(() => setShowReply(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [unfolded]);

  return (
    <main style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', background: '#000', fontFamily: 'sans-serif' }}>
      <video key={vibeId} autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${vibeId}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: 'rgba(0,0,0,0.3)' }}>
        <div 
          onClick={() => !unfolded && setUnfolded(true)}
          style={{ 
            border: '2px solid gold', padding: '50px', borderRadius: '25px', 
            background: 'rgba(0,0,0,0.9)', textAlign: 'center', 
            cursor: unfolded ? 'default' : 'pointer',
            boxShadow: unfolded ? '0 0 60px gold' : '0 0 20px gold',
            transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)', maxWidth: '500px', width: '90%'
          }}
        >
          {!unfolded ? (
            <h2 style={{ color: 'gold', fontSize: '1.2rem', letterSpacing: '6px', fontWeight: 'lighter' }}>CLICK TO UNFOLD</h2>
          ) : (
            <div style={{ animation: 'revealHarmonica 2.5s ease-out' }}>
              <p style={{ color: 'gold', fontSize: '0.7rem', letterSpacing: '3px', marginBottom: '25px', opacity: 0.7 }}>STASHED BY {from}</p>
              
              {/* THE GOLDEN ALPHABET LOGIC */}
              <div className="golden-vibes">
                <p style={{ margin: '10px 0', fontSize: '2.5rem', fontWeight: '900', letterSpacing: '4px', textTransform: 'uppercase' }}>{line1}</p>
                <p style={{ margin: '10px 0', fontSize: '2.5rem', fontWeight: '900', letterSpacing: '4px', textTransform: 'uppercase' }}>{line2}</p>
              </div>
              
              <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,215,0,0.3)', opacity: showReply ? 1 : 0, transition: 'opacity 1.5s ease' }}>
                <button 
                  onClick={() => window.location.href = '/?reply=true'}
                  style={{ background: 'none', border: '1px solid gold', color: 'gold', padding: '12px 30px', borderRadius: '25px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px' }}
                >
                  REPLY FOR FREE
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes revealHarmonica {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .golden-vibes p {
          background: linear-gradient(to bottom, #fff7ad 0%, #ffa700 50%, #fff7ad 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 10px rgba(255,215,0,0.5));
        }
      `}</style>
    </main>
  );
}

export default function OpenPage() {
  return (
    <Suspense fallback={<div style={{color: 'gold', background: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>UNFOLDING THE VAULT...</div>}>
      <HarmonicaContent />
    </Suspense>
  );
}
