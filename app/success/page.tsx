'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const vibeId = searchParams.get('vibe') || '14'; 
  
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [copied, setCopied] = useState(false);

  // The Alphabet Logic: First and Last letter visuals
  const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;
  
  const words = message.trim().split(/\s+/).filter(w => w.length > 0).slice(0, 4);

  const handleStashAndCopy = () => {
    const baseUrl = window.location.origin;
    // We pass the full message and the signature to the harmonica page
    const harmonicaLink = `${baseUrl}/open?vibe=${vibeId}&msg=${encodeURIComponent(message)}&from=${encodeURIComponent(name)}`;
    navigator.clipboard.writeText(harmonicaLink);
    setCopied(true);
    window.open(harmonicaLink, '_blank');
  };

  return (
    <main style={{ minHeight: '100vh', width: '100vw', background: '#000', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      
      {/* 1. THE ENCHANTED BLUE BOX PREVIEW */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '400px', height: '260px', background: 'rgba(0,112,243,0.1)', borderRadius: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #0070f3', marginBottom: '30px', boxShadow: '0 0 30px rgba(0,112,243,0.3)' }}>
          <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '55%', opacity: 0.8 }} alt="Box" />
          
          <div style={{ position: 'absolute', bottom: '40px', display: 'flex', gap: '8px' }}>
              {words.map((word, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'scale(0.7)' }}>
                      <div style={{ display: 'flex', gap: '2px' }}>
                          <img src={getLetterUrl(word[0])} style={{ width: '45px', border: '1px solid gold', borderRadius: '4px' }} alt="Start" />
                          <img src={getLetterUrl(word[word.length-1])} style={{ width: '45px', border: '1px solid gold', borderRadius: '4px' }} alt="End" />
                      </div>
                      <span style={{ background: 'gold', color: '#000', fontSize: '0.6rem', fontWeight: 'bold', marginTop: '4px', padding: '1px 5px', borderRadius: '3px' }}>{word.toUpperCase()}</span>
                  </div>
              ))}
          </div>
      </div>

      {/* 2. THE WRITING AREA */}
      <div style={{ width: '100%', maxWidth: '450px', textAlign: 'center' }}>
        <h2 style={{ color: 'gold', marginBottom: '20px', letterSpacing: '2px' }}>STASH YOUR SONG</h2>
        
        <textarea 
          placeholder="Type your message (each word becomes a golden vibe)..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          style={{ width: '100%', height: '100px', borderRadius: '15px', padding: '15px', background: '#111', border: '1px solid #333', color: 'white', marginBottom: '15px', fontSize: '1rem' }} 
        />

        <input 
          type="text" placeholder="Your Signature" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={{ width: '100%', padding: '15px', borderRadius: '10px', background: '#111', border: '1px solid #333', color: 'white', marginBottom: '30px' }} 
        />

        <button onClick={handleStashAndCopy} style={{ background: '#0070f3', color: 'white', padding: '18px 40px', borderRadius: '35px', fontWeight: 'bold', border: 'none', cursor: 'pointer', width: '100%', boxShadow: '0 0 20px #0070f3' }}>
          {copied ? 'HARMONICA PRODUCED!' : 'STASH IN BLUE VAULT'}
        </button>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading Vault...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
