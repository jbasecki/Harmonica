'use client';
import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function OpenContent() {
  const searchParams = useSearchParams();
  const [unfolded, setUnfolded] = useState(false);
  const [showProse, setShowProse] = useState(false);
  
  const message = searchParams.get('msg') || "";
  const sceneId = searchParams.get('vibe') || '14';
  const tilesStr = searchParams.get('tiles') || "";
  const from = searchParams.get('from') || 'A Friend';
  const selectedTiles = tilesStr ? tilesStr.split(',') : [];

  const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

  useEffect(() => {
    if (unfolded) {
      const timer = setTimeout(() => setShowProse(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [unfolded]);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      <video key={sceneId} autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: unfolded ? 0.5 : 0.2, transition: 'opacity 2s' }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${sceneId}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {!unfolded ? (
          <div onClick={() => setUnfolded(true)} style={{ cursor: 'pointer', textAlign: 'center', border: '2px solid gold', padding: '50px', borderRadius: '35px', background: 'rgba(50,0,0,0.6)', boxShadow: '0 0 40px gold' }}>
            <div style={{ fontSize: '4rem', marginBottom: '10px' }}>🏺</div>
            <p style={{ color: 'gold', marginTop: '10px', letterSpacing: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>OPEN STASHED MESSAGE</p>
          </div>
        ) : (
          <div style={{ width: '95%', maxWidth: '1000px', textAlign: 'center' }}>
            {/* HORIZONTAL VIBE ROW */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginBottom: '50px', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '20px' }}>
              {selectedTiles.map((tile, idx) => (
                <div key={idx} style={{ flex: '0 0 auto', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '4px', border: '1.5px solid gold', padding: '8px', borderRadius: '12px', background: 'rgba(0,0,0,0.8)', boxShadow: '0 0 25px rgba(255,215,0,0.4)' }}>
                    <img src={getLetterUrl(tile[0])} style={{ width: '60px' }} />
                    <img src={getLetterUrl(tile[tile.length-1])} style={{ width: '60px' }} />
                  </div>
                  <p style={{ color: 'gold', fontSize: '0.75rem', marginTop: '15px', fontWeight: '900', letterSpacing: '3px', textShadow: '0 0 10px black' }}>{tile.toUpperCase()}</p>
                </div>
              ))}
            </div>
            
            <div style={{ opacity: showProse ? 1 : 0, transition: 'opacity 2s', background: 'rgba(30,0,0,0.85)', padding: '40px', borderRadius: '30px', border: '1px solid gold' }}>
              <p style={{ color: 'white', fontSize: '1.4rem', lineHeight: '1.6', marginBottom: '25px' }}>{message}</p>
              <p style={{ color: 'gold', fontSize: '0.8rem', letterSpacing: '2px' }}>— {from.toUpperCase()}</p>
              <button onClick={() => window.location.href='/?reply=true'} style={{ marginTop: '30px', background: 'gold', color: 'black', padding: '12px 30px', borderRadius: '25px', cursor: 'pointer', border: 'none', fontWeight: 'bold' }}>REPLY FOR FREE</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function OpenPage() {
  return <Suspense><OpenContent /></Suspense>;
}
