'use client';
import React, { useState, useRef } from 'react';

export default function SuccessPage() {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Configuration from your Cloud Bucket
  const vibeId = 14; // Rainforest Sanctuary
  const videoSrc = `https://storage.googleapis.com/simple-bucket-27/${vibeId}.mp4`;
  const audioSrc = `https://storage.googleapis.com/simple-bucket-27/audio/ambient.mp3`;

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <main style={{ position: 'relative', minHeight: '100vh', background: '#000', overflow: 'hidden' }}>
      {/* 1. RESTORED VIDEO BACKGROUND */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{ position: 'fixed', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* 2. AMBIENT AUDIO LAYER */}
      <audio ref={audioRef} autoPlay loop src={audioSrc} />

      {/* 3. CONTENT OVERLAY (As seen in your screenshot) */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', paddingTop: '100px' }}>
        <p style={{ color: 'gold', letterSpacing: '4px', fontSize: '0.8rem' }}>
            A HARMONICA COMPOSED OF MEANINGFUL WORDS
        </p>

        {/* ... (Your existing Word Tiles and "signed, Mom" logic here) ... */}

        {/* 4. THE MUTE/UNMUTE TOGGLE */}
        <button 
          onClick={toggleMute}
          style={{ position: 'fixed', bottom: '30px', right: '30px', background: 'rgba(0,0,0,0.5)', border: '1px solid gold', color: 'gold', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}
        >
          {isMuted ? 'UNMUTE SANCTUARY' : 'MUTE SANCTUARY'}
        </button>
      </div>
    </main>
  );
}
