'use client';
import React, { Suspense, useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function OpenContent() {
  const searchParams = useSearchParams();
  const [unfolded, setUnfolded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // THE STRICT LOCK: We remove the '|| 14' so it cannot default back to the leaf
  const vibeParam = searchParams.get('vibe'); 
  const sceneId = vibeParam ? vibeParam : '14'; 

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Forces the player to abandon the old cache
    }
  }, [sceneId]);

  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden' }}>
      
      {/* THE FORCED VIDEO PLAYER */}
      <video 
        ref={videoRef}
        key={sceneId} 
        autoPlay 
        loop 
        muted 
        playsInline 
        style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: unfolded ? 0.6 : 0.4 }}
      >
        <source src={`https://storage.googleapis.com/simple-bucket-27/${sceneId}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {!unfolded ? (
          <div onClick={() => setUnfolded(true)} style={{ cursor: 'pointer', width: '140px', height: '140px', background: 'radial-gradient(circle, #fff7ad 0%, #ffa700 70%)', borderRadius: '50%', boxShadow: '0 0 60px #ffa700', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <p style={{color: 'black', fontWeight: 'bold'}}>UNFOLD</p>
          </div>
        ) : (
          <div style={{ width: '95%', textAlign: 'center' }}>
            <h2 style={{ color: 'gold', letterSpacing: '4px', fontSize: '0.8rem' }}>A HARMONICA COMPOSED OF MEANINGFUL WORDS</h2>
            <button onClick={() => window.location.href = '/'} style={{ marginTop: '50px', background: 'transparent', border: '1px solid gold', color: 'gold', padding: '15px 40px', borderRadius: '30px' }}>
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
