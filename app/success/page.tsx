'use client';
import React, { useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

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
        audioRef.current.play().catch(err => console.error("Audio failed:", err));
      }
    }
  };

  return (
    <main style={{ position: 'relative', minHeight: '100vh', background: '#000', overflow: 'hidden', fontFamily: 'serif' }}>
      {/* 1. LOAD CURSIVE FONT */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
        .cursive { font-family: 'Great Vibes', cursive; }
        .word-tile { 
          border: 1px solid gold; 
          padding: 20px 15px; 
          border-radius: 10px; 
          min-width: 80px; 
          text-align: center;
          background: rgba(0,0,0,0.3);
        }
      `}</style>

      {/* 2. BACKGROUND VIDEO */}
      <video autoPlay muted loop playsInline style={{ position: 'fixed', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
        <source src="https://storage.googleapis.com/simple-bucket-27/14.mp4" type="video/mp4" />
      </video>

      <audio ref={audioRef} loop muted src="https://storage.googleapis.com/simple-bucket-27/audio/ambient.mp3" />

      {/* 3. FORMATTED CONTENT */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', paddingTop: '12vh', color: 'gold' }}>
        <p style={{ letterSpacing: '6px', fontSize: '0.7rem', marginBottom: '60px', opacity: 0.9 }}>
          A HARMONICA COMPOSED OF MEANINGFUL WORDS
        </p>

        {/* SPACING FIXED: Words now separate */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '80px' }}>
          <div className="word-tile">
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{word1}</div>
          </div>
          <div className="word-tile">
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{word2}</div>
          </div>
          <div className="word-tile">
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{word3}</div>
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          <p style={{ fontStyle: 'italic', marginBottom: '0px', opacity: 0.8 }}>signed,</p>
          {/* CURSIVE RESTORED */}
          <h1 className="cursive" style={{ fontSize: '4.5rem', marginTop: '0px', color: 'gold' }}>
            {signature}
          </h1>
        </div>
      </div>

     <audio 
  ref={audioRef} 
  loop 
  src="https://storage.googleapis.com/simple-bucket-27/ambient.mp3" 
/>

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ background: '#000', height: '100vh' }} />}>
      <SuccessContent />
    </Suspense>
  );
}
