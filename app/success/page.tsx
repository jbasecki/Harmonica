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
    const clean = word.trim().replace(/[.,!?;:]/g, "");
    if (!clean) return;
    setStashedWords(prev => 
      prev.includes(clean) ? prev.filter(w => w !== clean) : prev.length < 5 ? [...prev, clean] : prev
    );
  };

  const handleStashAndCopy = () => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/open?vibe=${vibeId}&msg=${encodeURIComponent(message)}&tiles=${stashedWords.join(',')}&from=${encodeURIComponent(name)}`;
    navigator.clipboard.writeText(link);
    window.open(link, '_blank');
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      
      {/* THE HARMONICA AREA (TOP) */}
      <div style={{ width: '100%', maxWidth: '600px', textAlign: 'center', marginBottom: '40px' }}>
        <p style={{ color: 'gold', fontSize: '0.7rem', letterSpacing: '3px', marginBottom: '20px' }}>HARMONICA PREVIEW</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', minHeight: '100px' }}>
          {stashedWords.map((word, i) => (
            <div key={i} style={{ display: 'flex', gap: '2px', border: '1px solid gold', padding: '5px', borderRadius: '5px', background: 'rgba(255,215,0,0.1)' }}>
              <img src={getLetterUrl(word[0])} style={{ width: '40px' }} />
              <img src={getLetterUrl(word[word.length-1])} style={{ width: '40px' }} />
            </div>
          ))}
        </div>
      </div>

      {/* THE PROSE AREA (BOTTOM) */}
      <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,215,0,0.3)' }}>
        <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
          {message.split(/\s+/).map((word, i) => (
            <span key={i} onClick={() => toggleWord(word)} style={{ cursor: 'pointer', padding: '5px 10px', borderRadius: '10px', background: stashedWords.includes(word.replace(/[.,!?;:]/g, "")) ? 'gold' : 'rgba(255,255,255,0.1)', color: stashedWords.includes(word.replace(/[.,!?;:]/g, "")) ? 'black' : 'white', fontSize: '0.9rem' }}>{word}</span>
          ))}
        </div>
        <textarea 
          placeholder="Write your long-form message here... then click words above to stash them."
          value={message} onChange={(e) => setMessage(e.target.value)}
          style={{ width: '100%', height: '120px', background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '1.1rem' }}
        />
        <input placeholder="Your Signature" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', background: 'transparent', borderTop: '1px solid #333', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', padding: '15px 0', color: 'gold' }} />
      </div>

      <button onClick={handleStashAndCopy} style={{ marginTop: '40px', background: 'gold', color: 'black', padding: '15px 40px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', border: 'none', boxShadow: '0 0 20px gold' }}>
        PRODUCE & OPEN HARMONICA
      </button>
    </main>
  );
}

export default function SuccessPage() {
  return <Suspense><SenderContent /></Suspense>;
}
