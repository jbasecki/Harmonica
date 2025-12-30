'use client';
import { useSearchParams } from 'next/navigation';
import React, { useState, useRef } from 'react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // 1. PULL DATA FROM THE CHECKOUT
  const word1 = searchParams.get('word1') || 'HAPPY';
  const word2 = searchParams.get('word2') || 'SUNNY';
  const word3 = searchParams.get('word3') || 'MONDAY';
  const signature = searchParams.get('signature') || 'Mom';

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
      if (!audioRef.current.muted) audioRef.current.play();
    }
  };

  return (
    <main style={{ position: 'relative', minHeight: '100vh', background: '#000' }}>
      {/* BACKGROUND VIDEO */}
      <video autoPlay muted loop playsInline style={{ position: 'fixed', width: '100%', height: '100%', objectFit: 'cover' }}>
        <source src="https://storage.googleapis.com/simple-bucket-27/14.mp4" type="video/mp4" />
      </video>

      <audio ref={audioRef} loop src="https://storage.googleapis.com/simple-bucket-27/audio/ambient.mp3" />

      {/* OVERLAY CONTENT */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: 'gold', paddingTop: '10vh' }}>
         <h2 style={{ letterSpacing: '4px', fontSize: '0.8rem' }}>A HARMONICA COMPOSED OF MEANINGFUL WORDS</h2>
         
         <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '40px 0' }}>
            {/* These display the tiles you saw in your first test */}
            <div className="tile">{word1}</div>
            <div className="tile">{word2}</div>
            <div className="tile">{word3}</div>
         </div>

         <p style={{ fontStyle: 'italic' }}>signed,</p>
         <h1 style={{ fontSize: '3rem' }}>{signature}</h1>
      </div>

      <button onClick={toggleMute} style={{ position: 'fixed', bottom: '30px', right: '30px', ... }}>
        {isMuted ? 'UNMUTE SANCTUARY' : 'MUTE SANCTUARY'}
      </button>
    </main>
  );
}
