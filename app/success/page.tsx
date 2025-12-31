'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SenderContent() {
  const searchParams = useSearchParams();
  const vibeId = searchParams.get('vibe') || '14'; // THE PERSISTENCE START
  const [message, setMessage] = useState("");
  const [stashedWords, setStashedWords] = useState<string[]>([]);
  const [name, setName] = useState("");

  const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

  const toggleWord = (word: string) => {
    const clean = word.trim().replace(/[.,!?;:]/g, "");
    if (!clean) return;
    setStashedWords(prev => 
      prev.includes(clean) ? prev.filter(w => w !== clean) : [...prev, clean]
    );
  };

const handleStashAndCopy = () => {
    const baseUrl = window.location.origin;
    // THE PERSISTENCE BRIDGE: Ensuring the vibeId is attached to the link
    const link = `${baseUrl}/open?vibe=${vibeId}&msg=${encodeURIComponent(message)}&tiles=${stashedWords.join(',')}&from=${encodeURIComponent(name)}`;
    
    navigator.clipboard.writeText(link);
    window.open(link, '_blank');
  };
  return (
    <main style={{ minHeight: '100vh', background: '#000', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
      
      <div style={{ width: '100%', maxWidth: '900px', textAlign: 'center', marginBottom: '50px' }}>
        <p style={{ color: 'gold', fontSize: '0.7rem', letterSpacing: '4px', marginBottom: '30px', opacity: 0.6 }}>HARMONICA PREVIEW</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', minHeight: '120px', overflowX: 'auto' }}>
          {stashedWords.map((word, i) => (
            <div key={i} style={{ flex: '0 0 auto', textAlign: 'center' }}>
              <div style={{ display: 'flex', gap: '3px', border: '1.5px solid gold', padding: '8px', borderRadius: '12px', background: 'rgba(255,215,0,0.1)', boxShadow: '0 0 20px gold' }}>
                <img src={getLetterUrl(word[0])} style={{ width: '50px' }} alt="vibe-start" />
                <img src={getLetterUrl(word[word.length-1])} style={{ width: '50px' }} alt="vibe-end" />
              </div>
              <p style={{ color: 'gold', fontSize: '0.7rem', marginTop: '10px', fontWeight: 'bold' }}>{word.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '650px', background: 'rgba(30,0,0,0.4)', padding: '35px', borderRadius: '35px', border: '1px solid gold', position: 'relative' }}>
        
        {/* NEWLY POSITIONED [i] INFO ICON - HIGH VISIBILITY */}
        <div 
          title="Words of meditative meaning are formed by association with visual abstracts rather than specific symbols seen in text." 
          style={{ position: 'absolute', top: '20px', right: '20px', color: 'gold', border: '1px solid gold', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', cursor: 'help', zIndex: 30 }}
        >
          i
        </div>

        <div style={{ marginBottom: '25px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {message.split(/\s+/).map((word, i) => {
            const clean = word.replace(/[.,!?;:]/g, "");
            const isSelected = stashedWords.includes(clean);
            if (!clean) return null;
            return (
              <span key={i} onClick={() => toggleWord(word)} style={{ cursor: 'pointer', padding: '6px 12px', borderRadius: '10px', background: isSelected ? 'gold' : 'rgba(255,255,255,0.05)', color: isSelected ? 'black' : 'rgba(255,255,255,0.6)', transition: '0.3s' }}>{word}</span>
            );
          })}
        </div>

        <textarea placeholder="Compose..." value={message} onChange={(e) => setMessage(e.target.value)} style={{ width: '100%', height: '140px', background: 'transparent', border: 'none', color: 'white', fontSize: '1.2rem', outline: 'none', resize: 'none' }} />

        {/* THE GOLDEN ARROW AND TIP */}
        {message.length > 5 && stashedWords.length === 0 && (
          <div style={{ position: 'absolute', bottom: '85px', left: '35px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'gold', fontSize: '1.2rem', animation: 'bounce 2s infinite' }}>↑</span>
            <p style={{ color: 'gold', fontSize: '0.75rem', fontStyle: 'italic', opacity: 0.8 }}>
              Tap your words above to stash them...
            </p>
          </div>
        )}

        <input placeholder="Signature" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', background: 'transparent', borderTop: '1px solid #333', padding: '15px 0', color: 'gold', textAlign: 'center', outline: 'none' }} />
      </div>

      <button onClick={handleStashAndCopy} style={{ marginTop: '50px', background: 'gold', color: 'black', padding: '18px 60px', borderRadius: '45px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
        PRODUCE & OPEN HARMONICA
      </button>

      <style jsx>{` @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } } `}</style>
    </main>
  );
}

export default function SuccessPage() {
  return <Suspense fallback={<div>Preparing...</div>}><SenderContent /></Suspense>;
}
