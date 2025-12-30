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
    // Goal 7: Restrictions removed. Users can stash as many words as they desire.
    setStashedWords(prev => 
      prev.includes(clean) ? prev.filter(w => w !== clean) : [...prev, clean]
    );
  };

  const handleStashAndCopy = () => {
    const baseUrl = window.location.origin;
    // Goal 3 & 10: This unique link represents the ownership of the stashed Harmonica.
    const link = `${baseUrl}/open?vibe=${vibeId}&msg=${encodeURIComponent(message)}&tiles=${stashedWords.join(',')}&from=${encodeURIComponent(name)}`;
    navigator.clipboard.writeText(link);
    window.open(link, '_blank');
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
      
      {/* Goal 4: Signed Translations in the Preview */}
      <div style={{ width: '100%', maxWidth: '900px', textAlign: 'center', marginBottom: '50px' }}>
        <p style={{ color: 'gold', fontSize: '0.7rem', letterSpacing: '4px', marginBottom: '30px' }}>HARMONICA PREVIEW</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: '10px' }}>
          {stashedWords.map((word, i) => (
            <div key={i} style={{ flex: '0 0 auto', textAlign: 'center' }}>
              <div style={{ display: 'flex', gap: '3px', border: '1.5px solid gold', padding: '8px', borderRadius: '12px', background: 'rgba(255,215,0,0.1)', boxShadow: '0 0 20px gold' }}>
                <img src={getLetterUrl(word[0])} style={{ width: '50px' }} />
                <img src={getLetterUrl(word[word.length-1])} style={{ width: '50px' }} />
              </div>
              <p style={{ color: 'gold', fontSize: '0.7rem', marginTop: '10px', fontWeight: 'bold' }}>{word.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: '650px', background: 'rgba(30,0,0,0.4)', padding: '35px', borderRadius: '35px', border: '1px solid gold', position: 'relative' }}>
        
        {/* Goal 4: Reminder about clickables */}
        <p style={{ color: 'white', fontSize: '0.8rem', marginBottom: '15px', fontWeight: 'bold' }}>Your clickables:</p>
        
        <div style={{ marginBottom: '25px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {message.split(/\s+/).map((word, i) => {
            const clean = word.replace(/[.,!?;:]/g, "");
            const isSelected = stashedWords.includes(clean);
            return (
              <span key={i} onClick={() => toggleWord(word)} style={{ 
                cursor: 'pointer', padding: '6px 12px', borderRadius: '12px', 
                background: isSelected ? 'gold' : 'rgba(255,255,255,0.1)', 
                color: isSelected ? 'black' : 'white' 
              }}>{word}</span>
            );
          })}
        </div>

        <textarea 
          placeholder="Compose your message..."
          value={message} onChange={(e) => setMessage(e.target.value)}
          style={{ width: '100%', height: '150px', background: 'transparent', border: 'none', color: 'white', fontSize: '1.2rem', outline: 'none' }}
        />

        {/* Goal 8: Hover Info Icon [i] */}
        <div 
          title="Words of meditative meaning are formed by association with visual abstracts rather than specific symbols seen in text."
          style={{ position: 'absolute', bottom: '80px', right: '20px', color: 'white', border: '1px solid white', borderRadius: '4px', padding: '2px 6px', fontSize: '0.7rem', cursor: 'help' }}
        >
          [i]
        </div>

        <input placeholder="Signature" value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', background: 'transparent', borderTop: '1px solid #444', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', padding: '15px 0', color: 'gold', textAlign: 'center' }} />
      </div>

      <button onClick={handleStashAndCopy} style={{ marginTop: '40px', background: 'gold', color: 'black', padding: '15px 50px', borderRadius: '35px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
        PRODUCE & OPEN HARMONICA
      </button>
    </main>
  );
}

export default function SuccessPage() {
  return <Suspense fallback={<div>Loading...</div>}><SenderContent /></Suspense>;
}
