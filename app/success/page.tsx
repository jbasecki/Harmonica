'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SenderContent() {
  const searchParams = useSearchParams();
  const vibeId = searchParams.get('vibe') || '14'; 
  const [message, setMessage] = useState("");
  const [stashedWords, setStashedWords] = useState<string[]>([]);
  const [name, setName] = useState("");

  const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

  const toggleWord = (word: string) => {
    // Clean punctuation to ensure the alphabet logic finds the correct letter visuals
    const clean = word.trim().replace(/[.,!?;:]/g, "");
    if (!clean) return;
    
    // Toggle logic: click to add to the horizontal row, click again to remove
    setStashedWords(prev => 
      prev.includes(clean) ? prev.filter(w => w !== clean) : prev.length < 5 ? [...prev, clean] : prev
    );
  };

  const handleStashAndCopy = () => {
    const baseUrl = window.location.origin;
    // We pass the full message, the stashed tiles (in order), and the signature
    const link = `${baseUrl}/open?vibe=${vibeId}&msg=${encodeURIComponent(message)}&tiles=${stashedWords.join(',')}&from=${encodeURIComponent(name)}`;
    
    navigator.clipboard.writeText(link);
    window.open(link, '_blank');
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      
      {/* 1. HORIZONTAL HARMONICA PREVIEW (The Top Line) */}
      <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center', marginBottom: '50px' }}>
        <p style={{ color: 'gold', fontSize: '0.7rem', letterSpacing: '4px', marginBottom: '30px', opacity: 0.7 }}>STASH PREVIEW</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', minHeight: '120px', flexWrap: 'nowrap', overflowX: 'auto' }}>
          {stashedWords.map((word, i) => (
            <div key={i} style={{ flex: '0 0 auto', textAlign: 'center' }}>
              <div style={{ display: 'flex', gap: '3px', border: '1.5px solid gold', padding: '8px', borderRadius: '12px', background: 'rgba(255,215,0,0.1)', boxShadow: '0 0 20px gold' }}>
                <img src={getLetterUrl(word[0])} style={{ width: '45px' }} alt="start" />
                <img src={getLetterUrl(word[word.length-1])} style={{ width: '45px' }} alt="end" />
              </div>
              <p style={{ color: 'gold', fontSize: '0.65rem', marginTop: '10px', fontWeight: 'bold', letterSpacing: '2px' }}>{word.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. INTERACTIVE PROSE AREA (The Bottom Line) */}
      <div style={{ width: '100%', maxWidth: '650px', background: 'rgba(30,0,0,0.4)', padding: '35px', borderRadius: '35px', border: '1px solid gold', boxShadow: '0 0 25px rgba(255,215,0,0.2)' }}>
        
        {/* CLICKABLE WORD TOKENS */}
        <div style={{ marginBottom: '30px', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {message.split(/\s+/).map((word, i) => {
            const clean = word.replace(/[.,!?;:]/g, "");
            const isSelected = stashedWords.includes(clean);
            return (
              <span key={i} onClick={() => toggleWord(word)} style={{ 
                cursor: 'pointer', padding: '8px 15px', borderRadius: '15px', 
                background: isSelected ? 'gold' : 'rgba(255,255,255,0.1)', 
                color: isSelected ? 'black' : 'white', 
                fontSize: '1rem', transition: 'all 0.3s ease',
                border: isSelected ? '1px solid white' : '1px solid transparent'
              }}>{word}</span>
            );
          })}
        </div>

        <textarea 
          placeholder="Type your message here... then click words above to stash them into the horizontal reveal."
          value={message} onChange={(e) => setMessage(e.target.value)}
          style={{ width: '100%', height: '140px', background: 'transparent', border: 'none', color: 'white', fontSize: '1.2rem', outline: 'none', lineHeight: '1.6' }}
        />
        
        <input 
          placeholder="Your Signature" value={name} onChange={(e) => setName(e.target.value)} 
          style={{ width: '100%', background: 'transparent', borderTop: '1px solid #444', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', padding: '20px 0', color: 'gold', textAlign: 'center', fontSize: '1rem', marginTop: '10px' }} 
        />
      </div>

      <button onClick={handleStashAndCopy} style={{ marginTop: '50px', background: 'gold', color: 'black', padding: '20px 60px', borderRadius: '45px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '1.2rem', boxShadow: '0 0 30px gold' }}>
        STASH & REVEAL
      </button>
    </main>
  );
}

export default function SuccessPage() {
  return <Suspense fallback={<div style={{color: 'gold', background: '#000', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>PREPARING VAULT...</div>}><SenderContent /></Suspense>;
}
