'use client';
import React, { useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

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

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'A Harmonica Sanctuary',
        text: `I stashed a metaphor for you: ${word1} ${word2} ${word3}`,
        url: window.location.href,
      });
    } catch (err) {
      navigator.clipboard.writeText(window.location.href);
      alert('Sanctuary Link Copied!');
    }
  };

  return (
    <main style={{ position: 'relative', minHeight: '100vh', background: '#000', overflow: 'hidden' }}>
      <video autoPlay muted loop playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
        <source src="https://storage.googleapis.com/simple-bucket-27/14.mp4" type="video/mp4" />
      </video>

      <audio ref={audioRef} loop muted={isMuted} src="https://storage.googleapis.com/simple-bucket-27/ambient.mp3" />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
          {[word1, word2, word3].map((w, i) => (
            <div key={i} style={{ padding: '20px 40px', border: '2px solid gold', borderRadius: '15px', background: 'rgba(0,0,0,0.4)', color: 'gold', fontSize: '2rem', fontWeight: 'bold' }}>
              {w}
            </div>
          ))}
        </div>
        <p style={{ color: 'white', fontSize: '1.2rem', marginBottom: '10px' }}>signed,</p>
        <h1 className={greatVibes.className} style={{ color: 'gold', fontSize: '5rem', marginTop: 0 }}>{signature}</h1>
      </div>

      {/* FIXED BUTTON LAYOUT - ALL THREE BUTTONS INSIDE THE MAIN DIV */}
      <div style={{ position: 'fixed', bottom: '30px', left: '30px', display: 'flex', gap: '15px', zIndex: 10 }}>
        <button onClick={handleToggleMute} style={{ background: 'rgba(255,215,0,0.2)', color: 'gold', border: '1px solid gold', padding: '12px 24px', borderRadius: '30px', cursor: 'pointer' }}>
          {isMuted ? 'UNMUTE SANCTUARY' : 'MUTE SANCTUARY'}
        </button>
        <button onClick={handleShare} style={{ background: 'rgba(255,215,0,0.2)', color: 'gold', border: '1px solid gold', padding: '12px 24px', borderRadius: '30px', cursor: 'pointer' }}>
          SHARE
        </button>
        <button onClick={() => window.location.href = 'https://harmonica.design'} style={{ background: 'rgba(255,215,0,0.2)', color: 'gold', border: '1px solid gold', padding: '12px 24px', borderRadius: '30px', cursor: 'pointer' }}>
          REPLY WITH A METAPHOR
        </button>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ color: 'gold', background: 'black', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Sanctuary...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
