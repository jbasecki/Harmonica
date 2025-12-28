'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function HomeContent() {
  const searchParams = useSearchParams();
  const isReply = searchParams.get('reply') === 'true';
  const [selectedVideo, setSelectedVideo] = useState(1);
  
  const grid1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const grid2 = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const handleAction = () => {
    if (isReply) {
      // If it's a free reply, skip Stripe and go straight to Success
      window.location.href = `/success?vibe=${selectedVideo}`;
    } else {
      // If it's a paid vibe, go to your Stripe Link
      window.location.href = 'https://buy.stripe.com/aFa8wQ2iM1SZ7wv73ofnO07';
    }
  };

  return (
    <main style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', background: '#000', fontFamily: 'sans-serif' }}>
      <video key={selectedVideo} autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedVideo}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'white', background: 'rgba(0,0,0,0.3)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '5px' }}>{isReply ? 'SEND A REPLY' : 'STASH A VIBE'}</h1>
        <p style={{ color: 'gold', fontSize: '0.9rem', marginBottom: '30px' }}>{isReply ? 'Your reply is free.' : 'New Year. New Energy. 2026.'}</p>

        {/* GRID I & II (Your Vibe Tiles) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '30px' }}>
          {[...grid1, ...grid2].map((num) => (
            <button key={num} onMouseEnter={() => setSelectedVideo(num)} style={{ width: '40px', height: '40px', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.3)', background: selectedVideo === num ? 'gold' : 'rgba(255,255,255,0.1)', color: selectedVideo === num ? 'black' : 'white', cursor: 'pointer' }}>{num}</button>
          ))}
        </div>

        <button onClick={handleAction} style={{ background: 'gold', color: 'black', padding: '15px 40px', borderRadius: '30px', fontSize: '1.1rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px gold' }}>
          {isReply ? `SEND FREE REPLY ${selectedVideo}` : `SEND VIBE ${selectedVideo} ($0.99)`}
        </button>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
