'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function OpenContent() {
  const searchParams = useSearchParams();
  const vibeId = searchParams.get('vibe') || '14'; // Default to 14 if missing
  const message = searchParams.get('msg') || '';
  const tiles = searchParams.get('tiles') ? searchParams.get('tiles')!.split(',') : [];
  const from = searchParams.get('from') || '';

  // This ensures the background video matches your choice exactly
  const videoUrl = `https://storage.googleapis.com/simple-bucket-27/${vibeId}.mp4`;

  return (
    <main style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      <video 
        key={vibeId} // The "Key" is the secret to fixing the mystery; it forces a reload when the ID changes
        autoPlay loop muted playsInline 
        style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'white', textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '30px', letterSpacing: '2px' }}>{message}</h1>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '40px' }}>
          {tiles.map((word, i) => (
            <div key={i} style={{ border: '1px solid gold', padding: '5px', borderRadius: '8px' }}>
              <img src={`https://storage.googleapis.com/simple-bucket-27/${word[0].toUpperCase()}5.png`} style={{ width: '40px' }} alt="tile" />
            </div>
          ))}
        </div>
        <p style={{ color: 'gold', fontSize: '1.2rem', letterSpacing: '4px' }}>— {from}</p>
      </div>
    </main>
  );
}

export default function OpenPage() {
  return <Suspense fallback={<div style={{background:'#000', height:'100vh'}}></div>}><OpenContent /></Suspense>;
}
