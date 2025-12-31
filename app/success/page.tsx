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
      prev.includes(clean) ? prev.filter(w => w !== clean) : [...prev, clean]
    );
  };

  const handleStashAndCopy = () => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/open?vibe=${vibeId}&msg=${encodeURIComponent(message)}&tiles=${stashedWords.join(',')}&from=${encodeURIComponent(name)}`;
    navigator.clipboard.writeText(link);
    window.open(link, '_blank');
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
      
      {/* RESTORED: YOUR BEAUTIFUL ALPHABET TILES */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '50px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {stashedWords.map((word, i) => (
          <div key={i} style={{ display: 'flex', gap: '5px', border: '1.5px solid gold', padding: '10px', borderRadius: '12px' }}>
            <img src={getLetterUrl(word[0])} style={{ width: '50px' }} alt="tile" />
            <img src={getLetterUrl(word[word.length-1])} style={{ width: '50px' }} alt="tile" />
          </div>
        ))}
      </div>

      <div style={{ width: '100%', maxWidth: '550px', textAlign: 'center' }}>
        <textarea 
          placeholder="ENTER MESSAGE" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          onBlur={(e) => e.target.value.split(" ").forEach(toggleWord)}
          style={{ background: 'transparent', color: 'white', border: '1px solid #222', width: '100%', height: '180px', padding: '25px', borderRadius: '20px', fontSize: '1.3rem', outline: 'none' }}
        />
        
        <input 
          placeholder="SIGNATURE" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          style={{ background: 'transparent', color: 'gold', border: 'none', borderBottom: '1px solid #222', width: '80%', marginTop: '30px', textAlign: 'center', letterSpacing: '4px' }}
        />

        <button 
          onClick={handleStashAndCopy}
          style={{ marginTop: '70px', background: '#fbbf24', color: 'black', padding: '22px 50px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', border: 'none', width: '100%', fontSize: '1rem', letterSpacing: '2px' }}
        >
          PRODUCE & OPEN HARMONICA
        </button>
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{background:'#000', height:'100vh'}}></div>}>
      <SenderContent />
    </Suspense>
  );
}
