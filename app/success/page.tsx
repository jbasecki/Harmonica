'use client';
import React, { useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Pulling the words from your earlier successful test
  const word1 = searchParams.get('word1') || 'HAPPY';
  const word2 = searchParams.get('word2') || 'SUNNY';
  const word3 = searchParams.get('word3') || 'MONDAY';
  const signature = searchParams.get('signature') || 'Mom';

  const handleToggleMute = () => {
    if (audioRef.current) {
      const newMuteState = !audioRef.current.muted;
      audioRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
      if (!newMuteState) {
        audioRef.current.play().catch(err => console.error("Audio play failed:", err));
      }
    }
  };

  return (
    <main style={{ position: 'relative', minHeight: '100vh', background: '#000', overflow: 'hidden' }}>
      {/* 1. Corrected Video Source Logic */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ position: 'fixed', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      >
        <source src="https://storage.googleapis.com/simple-bucket-27/14.mp4" type="video/mp4" />
      </video>

      {/* 2. Hidden Audio Element */}
      <audio ref={audioRef} loop muted src="https://storage.googleapis.com/simple-bucket-27/audio/ambient.mp3" />

      {/* 3. Re-centered Metaphor Overlay */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', paddingTop: '10vh', color: 'gold' }}>
        <p style={{ letterSpacing: '4px', fontSize: '0.8rem', marginBottom: '40px' }}>
          A HARMONICA COMPOSED OF MEANINGFUL WORDS
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', fontSize: '2rem', fontWeight: 'bold' }}>
          <span>{word1}</span>
          <span>{word2}</span>
          <span>{word3}</span>
        </div>

        <div style={{ marginTop: '60px' }}>
          <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>signed,</p>
          <h1 style={{ fontSize: '3.5rem' }}>{signature}</h1>
        </div>
      </div>

      {/* 4. Unmute Toggle */}
      <button 
        onClick={handleToggleMute}
        style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 10, background: 'rgba(0,0,0,0.6)', color: 'gold', border: '1px solid gold', padding: '12px 24px', borderRadius: '30px', cursor: 'pointer' }}
      >
        {isMuted ? 'UNMUTE SANCTUARY' : 'MUTE SANCTUARY'}
      </button>
    </main>
  );
}
