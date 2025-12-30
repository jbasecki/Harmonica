'use client';
import React, { useState, useRef, Suspense } from 'react';
import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'], display: 'swap' });

function SuccessContent() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  
  // Sender's Input States
  const [w1, setW1] = useState('');
  const [w2, setW2] = useState('');
  const [w3, setW3] = useState('');
  const [sig, setSig] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleToggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
      if (!audioRef.current.muted) audioRef.current.play();
    }
  };

  const createStash = () => {
    const link = `https://harmonica.design/success?word1=${w1}&word2=${w2}&word3=${w3}&signature=${sig}`;
    setGeneratedLink(link);
  };

  return (
    <main style={{ position: 'relative', minHeight: '100vh', background: '#000', overflow: 'hidden' }}>
      <video autoPlay muted loop playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
        <source src="https://storage.googleapis.com/simple-bucket-27/14.mp4" type="video/mp4" />
      </video>
      <audio ref={audioRef} loop muted={isMuted} src="https://storage.googleapis.com/simple-bucket-27/ambient.mp3" />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
        
        <div style={{ background: 'rgba(0,0,0,0.7)', padding: '40px', borderRadius: '25px', border: '2px solid gold', width: '100%', maxWidth: '500px', textAlign: 'center' }}>
          <h2 style={{ color: 'gold', marginBottom: '20px' }}>STASH YOUR METAPHOR</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input placeholder="First Word" value={w1} onChange={(e) => setW1(e.target.value)} style={{ padding: '15px', borderRadius: '10px', border: '1px solid gold', background: 'transparent', color: 'white', fontSize: '1.2rem' }} />
            <input placeholder="Second Word" value={w2} onChange={(e) => setW2(e.target.value)} style={{ padding: '15px', borderRadius: '10px', border: '1px solid gold', background: 'transparent', color: 'white', fontSize: '1.2rem' }} />
            <input placeholder="Third Word" value={w3} onChange={(e) => setW3(e.target.value)} style={{ padding: '15px', borderRadius: '10px', border: '1px solid gold', background: 'transparent', color: 'white', fontSize: '1.2rem' }} />
            <input placeholder="Your Signature (e.g. Mom)" value={sig} onChange={(e) => setSig(e.target.value)} style={{ padding: '15px', borderRadius: '10px', border: '1px solid gold', background: 'transparent', color: 'white', fontSize: '1.2rem' }} />
            
            <button onClick={createStash} style={{ marginTop: '10px', padding: '20px', background: 'gold', color: 'black', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}>
              GENERATE SANCTUARY LINK
            </button>
          </div>

          {generatedLink && (
            <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
              <p style={{ color: 'white', fontSize: '0.9rem', marginBottom: '10px' }}>Copy this link to send your gift:</p>
              <input readOnly value={generatedLink} style={{ width: '100%', padding: '10px', background: 'black', color: 'gold', border: 'none', borderRadius: '5px' }} />
              <button onClick={() => navigator.clipboard.writeText(generatedLink)} style={{ marginTop: '10px', color: 'gold', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Copy Link</button>
            </div>
          )}
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: '30px', left: '30px', zIndex: 10 }}>
        <button onClick={handleToggleMute} style={{ background: 'rgba(255,215,0,0.2)', color: 'gold', border: '1px solid gold', padding: '12px 24px', borderRadius: '30px' }}>
          {isMuted ? 'UNMUTE AMBIENCE' : 'MUTE AMBIENCE'}
        </button>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return <Suspense fallback={<div>Loading...</div>}><SuccessContent /></Suspense>;
}
