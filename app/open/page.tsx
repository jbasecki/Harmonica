'use client';
import React, { Suspense, useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function OpenContent() {
  const searchParams = useSearchParams();
  const [unfolded, setUnfolded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // THE PERSISTENCE CLEANER: Removes hidden characters that cause the 'revert'
  const rawVibe = searchParams.get('vibe') || '14';
  const sceneId = rawVibe.replace(/[^0-9]/g, ''); // Forces it to be ONLY the number (e.g., '15')
  
  const message = searchParams.get('msg') || "";
  const tilesStr = searchParams.get('tiles') || "";
  const from = searchParams.get('from') || 'A Friend';
  const selectedTiles = tilesStr ? tilesStr.split(',').filter(t => t.trim()) : [];

  const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

  // THE REFRESH TRIGGER: Forces the player to abandon the leaf immediately
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [sceneId]);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden' }}>
      
      <video 
        ref={videoRef}
        key={sceneId} 
        autoPlay 
        loop 
        muted 
        playsInline 
        style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: unfolded ? 0.6 : 0.4 }}
      >
        {/* THE HARD-WIRED BRIDGE */}
        <source src={`https://storage.googleapis.com/simple-bucket-27/${sceneId}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {!unfolded ? (
          <div onClick={() => setUnfolded(true)} style={{ cursor: 'pointer', width: '140px', height: '140px', background: 'radial-gradient(circle, #fff7ad 0%, #ffa700 70%)', borderRadius: '50%', boxShadow: '0 0 60px #ffa700', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <p style={{color: 'black', fontWeight: 'bold'}}>UNFOLD</p>
          </div>
        ) : (
          <div style={{ width: '95%', textAlign: 'center' }}>
            <h2 style={{ color: 'gold', letterSpacing: '4px', fontSize: '0.8rem', marginBottom: '40px' }}>A HARMONICA COMPOSED OF MEANINGFUL WORDS</h2>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '60px' }}>
              {selectedTiles.map((tile, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '4px', border: '1.5px solid gold', padding: '8px', borderRadius: '12px', background: 'rgba(0,0,0,0.8)' }}>
                  <img src={getLetterUrl(tile[0])} style={{ width: '60px' }} alt="tile" />
                  <img src={getLetterUrl(tile[tile.length-1])} style={{ width: '60px' }} alt="tile" />
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(30,0,0,0.85)', padding: '40px', borderRadius: '35px', border: '1px solid gold', maxWidth: '700px', margin: '0 auto' }}>
              <p style={{ color: 'white', fontSize: '1.4rem' }}>{message}</p>
              <p style={{ color: 'gold', marginTop: '25px', fontWeight: 'bold' }}>— {from.toUpperCase()}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function OpenPage() {
  return <Suspense fallback={<div style={{background:'#000', height:'100vh'}}></div>}><OpenContent /></Suspense>;
}
