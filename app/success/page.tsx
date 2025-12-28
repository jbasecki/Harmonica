'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const vibeId = searchParams.get('vibe') || '14'; 
  
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [name, setName] = useState(''); // NEW SIGNATURE STATE
  const [copied, setCopied] = useState(false);

  const handleStashAndCopy = () => {
    const baseUrl = window.location.origin;
    // THE FINAL LINK: VIDEO ID + LINE 1 + LINE 2 + SIGNATURE
    const harmonicaLink = `${baseUrl}/open?vibe=${vibeId}&l1=${encodeURIComponent(line1)}&l2=${encodeURIComponent(line2)}&from=${encodeURIComponent(name)}`;
    
    navigator.clipboard.writeText(harmonicaLink);
    setCopied(true);
    window.open(harmonicaLink, '_blank'); // AUTO-OPEN
  };

  return (
    <div style={{ border: '2px solid gold', borderRadius: '20px', padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.05)', maxWidth: '500px', width: '90%' }}>
      <h1 style={{ color: 'gold', fontSize: '2rem', marginBottom: '10px' }}>VAULT SECURED</h1>
      <p style={{ color: 'white', opacity: 0.8, marginBottom: '30px' }}>Build your harmonica below.</p>

      <input 
        type="text" placeholder="Line 1: Alphabet Logic"
        value={line1} onChange={(e) => setLine1(e.target.value)}
        style={{ width: '100%', padding: '15px', borderRadius: '10px', background: '#111', border: '1px solid #333', color: 'white', marginBottom: '15px' }}
      />

      <input 
        type="text" placeholder="Line 2: Alphabet Logic"
        value={line2} onChange={(e) => setLine2(e.target.value)}
        style={{ width: '100%', padding: '15px', borderRadius: '10px', background: '#111', border: '1px solid #333', color: 'white', marginBottom: '15px' }}
      />

      <input 
        type="text" placeholder="Your Signature (e.g., JOANNE)"
        value={name} onChange={(e) => setName(e.target.value)}
        style={{ width: '100%', padding: '15px', borderRadius: '10px', background: '#111', border: '1px solid #333', color: 'white', marginBottom: '30px' }}
      />

      <button 
        onClick={handleStashAndCopy}
        style={{ background: copied ? '#4CAF50' : 'gold', color: 'black', padding: '15px 40px', borderRadius: '30px', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px gold' }}
      >
        {copied ? 'LINK COPIED & OPENED!' : 'STASH & OPEN GIFT'}
      </button>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main style={{ height: '100vh', width: '100vw', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <Suspense fallback={<div style={{color: 'white'}}>Loading Vault...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
