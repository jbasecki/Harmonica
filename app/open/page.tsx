'use client';
import React, { Suspense, useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function OpenContent() {
  const searchParams = useSearchParams();
  const [unfolded, setUnfolded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // 1. RECEIVING THE BRIDGE: Extracting the specific background ID
  const message = searchParams.get('msg') || "";
  const sceneId = searchParams.get('vibe') || '14'; 
  const tilesStr = searchParams.get('tiles') || "";
  const from = searchParams.get('from') || 'A Friend';
  const selectedTiles = tilesStr ? tilesStr.split(',').filter(t => t.trim()) : [];

  const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.volume = 1.0;
      if (!isMuted) audioRef.current.play().catch(() => {});
    }
  }, [isMuted]);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden' }}>
      
      {/* 2. LOCKING THE BRIDGE: The 'key' ensures persistence of the chosen video */}
      <video 
        key={sceneId} 
        autoPlay 
        loop 
        muted 
        playsInline 
        style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: unfolded ? 0.5 : 0.3 }}
      >
        <source src={`https://storage.googleapis.com/simple-bucket-27/${sceneId}.mp4`} type="video/mp4" />
      </video>

      <audio ref={audioRef} src="https://storage.googleapis.com/simple-bucket-27/ambient.mp3" loop />

      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {!unfolded ? (
          <div style={{ textAlign: 'center' }}>
            <div onClick={() => {setUnfolded(true); setIsMuted(false);}} style={{ cursor: 'pointer', width: '130px', height: '130px', background: 'radial-gradient(circle, #fff7ad 0%, #ffa700 70%)', borderRadius: '50%', margin: '0 auto 30px', boxShadow: '0 0 60px #ffa700', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <p style={{color: 'black', fontWeight: 'bold'}}>UNFOLD</p>
            </div>
            <button onClick={() => setIsMuted(!isMuted)} style={{ background: 'none', border: '1.5px solid gold', color: 'gold', padding: '10px 20px', borderRadius: '25px', cursor: 'pointer' }}>
               {isMuted ? 'UNMUTE' : 'AUDIO ON'}
            </button>
          </div>
        ) : (
          <div style={{ width: '95%', textAlign: 'center', position: 'relative' }}>
            <h2 style={{ color: 'gold', letterSpacing: '4px', fontSize: '0.8rem', marginBottom: '40px' }}>
                A HARMONICA COMPOSED OF MEANINGFUL WORDS
            </h2>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '60px', overflowX: 'auto' }}>
              {selectedTiles.map((tile, idx) => (
                <div key={idx} style={{ flex: '0 0 auto' }}>
                  <div style={{ display: 'flex', gap: '4px', border: '1.5px solid gold', padding: '8px', borderRadius: '12px', background: 'rgba(0,0,0,0.8)' }}>
                    <img src={getLetterUrl(tile[0])} style={{ width: '60px' }} alt="tile" />
                    <img src={getLetterUrl(tile[tile.length-1])} style={{ width: '60px' }} alt="tile" />
                  </div>
                  <p style={{ color: 'gold', fontSize: '0.7rem', marginTop: '10px', fontWeight: 'bold' }}>{tile.toUpperCase()}</p>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(30,0,0,0.85)', padding: '40px', borderRadius: '35px', border: '1px solid gold', maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
              <p style={{ color: 'white', fontSize: '1.4rem' }}>{message}</p>
              <p style={{ color: 'gold', marginTop: '25px', fontWeight: 'bold' }}>— {from.toUpperCase()}</p>

              {/* RECIPIENT PHILOSOPHY ICON: Moved to match the Success Page style */}
              <div 
                title="Words of meditative meaning are formed by association with visual abstracts rather than specific symbols seen in text." 
                style={{ position: 'absolute', bottom: '15px', right: '15px', color: '#888', border: '1px solid #555', borderRadius: '4px', padding: '0px 5px', fontSize: '0.65rem', cursor: 'help' }}
              >
                i
              </div>
            </div>

            <button 
              onClick={() => window.location.href = '/'}
              style={{ marginTop: '50px', background: 'transparent', border: '1px solid gold', color: 'gold', padding: '15px 40px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '2px' }}
            >
              REPLY
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function OpenPage() {
  return <Suspense fallback={<div style={{background:'#000', height:'100vh'}}></div>}><OpenContent /></Suspense>;
}
