'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SenderContent() {
  const searchParams = useSearchParams();
  // THE PERSISTENCE START: Grabbing the choice from the URL
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
    // THE PERSISTENCE BRIDGE: Ensuring the vibeId is attached to the copied link
    const link = `${baseUrl}/open?vibe=${vibeId}&msg=${encodeURIComponent(message)}&tiles=${stashedWords.join(',')}&from=${encodeURIComponent(name)}`;
    
    navigator.clipboard.writeText(link);
    alert("Harmonica Link Copied to Clipboard!");
    window.open(link, '_blank');
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
      <h2 style={{ color: 'gold', letterSpacing: '4px', marginBottom: '30px' }}>THE SUCCESS DESK</h2>
      
      {/* BACKGROUND PREVIEW: Shows the user what video is persisting */}
      <div style={{ width: '100%', maxWidth: '600px', marginBottom: '40px' }}>
        <video key={vibeId} autoPlay loop muted playsInline style={{ width: '100%', borderRadius: '15px', border: '1px solid #333' }}>
          <source src={`https://storage.googleapis.com/simple-bucket-27/${vibeId}.mp4`} type="video/mp4" />
        </video>
      </div>

      <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <textarea 
          placeholder="Type your message..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          style={{ background: '#111', color: 'white', border: '1px solid gold', padding: '15px', borderRadius: '10px', height: '100px' }}
        />
        
        <input 
          placeholder="Your Signature (From...)" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          style={{ background: '#111', color: 'white', border: '1px solid gold', padding: '15px', borderRadius: '10px' }}
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
          {["Harmony", "Peace", "Love", "Light"].map(word => (
            <button 
              key={word} 
              onClick={() => toggleWord(word)}
              style={{ padding: '10px 20px', borderRadius: '20px', border: '1px solid gold', background: stashedWords.includes(word) ? 'gold' : 'transparent', color: stashedWords.includes(word) ? 'black' : 'gold', cursor: 'pointer' }}
            >
              {word}
            </button>
          ))}
        </div>

        {/* THE YELLOW PRODUCE BUTTON */}
        <button 
          onClick={handleStashAndCopy}
          style={{ marginTop: '40px', background: 'gold', color: 'black', padding: '20px', borderRadius: '40px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', border: 'none' }}
        >
          PRODUCE & OPEN HARMONICA
        </button>
      </div>
    </main>
  );
}

// THE SUSPENSE FIX: Essential for the Yellow Button to work on Vercel
export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{color:'white'}}>Loading Desk...</div>}>
      <SenderContent />
    </Suspense>
  );
}
