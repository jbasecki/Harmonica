'use client';
import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function HarmonicaContent() {
  const searchParams = useSearchParams();
  const [unfolded, setUnfolded] = useState(false);
  const [showText, setShowText] = useState(false);
  
  const message = searchParams.get('msg') || "";
  const sceneId = searchParams.get('vibe') || '14';
  const tilesStr = searchParams.get('tiles') || "";
  const from = searchParams.get('from') || 'A Friend';
  const selectedTiles = tilesStr ? tilesStr.split(',') : [];

  const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

  useEffect(() => {
    if (unfolded) {
      const timer = setTimeout(() => setShowText(true), 3000);
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
          // THE BRAND IMAGE: THE BLUE BOX
          <div onClick={() => setUnfolded(true)} style={{ cursor: 'pointer', textAlign: 'center', animation: 'float 3s ease-in-out infinite' }}>
            <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '200px', filter: 'drop-shadow(0 0 30px #0070f3)' }} />
            <p style={{ color: 'gold', marginTop: '20px', letterSpacing: '4px', fontSize: '0.8rem' }}>CLICK TO OPEN HARMONICA</p>
          </div>
        ) : (
          // THE ENCHANTED REVEAL
          <div style={{ width: '90%', maxWidth: '800px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px', animation: 'fadeIn 2s' }}>
              {selectedTiles.map((tile, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '2px', border: '1px solid gold', padding: '5px', borderRadius: '5px', background: 'rgba(0,0,0,0.6)', boxShadow: '0 0 20px gold' }}>
                  <img src={getLetterUrl(tile[0])} style={{ width: '50px' }} />
                  <img src={getLetterUrl(tile[tile.length-1])} style={{ width: '50px' }} />
                </div>
              ))}
            </div>
            
            <div style={{ opacity: showText ? 1 : 0, transition: 'opacity 2s', background: 'rgba(0,0,0,0.7)', padding: '40px', borderRadius: '30px', border: '1px solid gold' }}>
              <p style={{ color: 'white', fontSize: '1.4rem', lineHeight: '1.6', marginBottom: '20px' }}>{message}</p>
              <p style={{ color: 'gold', fontSize: '0.9rem' }}>— {from}</p>
              <button onClick={() => window.location.href='/?reply=true'} style={{ marginTop: '30px', background: 'none', border: '1px solid gold', color: 'gold', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}>REPLY FOR FREE</button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </main>
  );
}

export default function OpenPage() {
  return <Suspense><HarmonicaContent /></Suspense>;
}
