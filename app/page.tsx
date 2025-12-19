'use client';
import React, { useState } from 'react';

const UNIQUE_SCENES = [
  { id: 'loveisall', name: 'Love is All' },
  { id: 'winter-daffodil', name: 'Winter Daffodil' },
  { id: 'goldenglow', name: 'Golden Glow' },
  { id: 'midnight', name: 'Midnight Sparkle' }
];

export default function SenderPage() {
  const [text, setText] = useState('');
  const [wrappedIndices, setWrappedIndices] = useState<number[]>([]);
  const [selectedScene, setSelectedScene] = useState(UNIQUE_SCENES[0]);

  const toggleWrap = (index: number) => {
    setWrappedIndices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const generateLink = () => {
    const data = { t: text, w: wrappedIndices, s: selectedScene.id };
    const encoded = btoa(JSON.stringify(data));
    return `${window.location.origin}/receiver/${encoded}`;
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', background: '#000', color: '#fff' }}>
      <video key={selectedScene.id} autoPlay loop muted style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '30px', color: '#333', textAlign: 'center', width: '90%', maxWidth: '500px' }}>
          <h2 style={{ margin: 0 }}>Vibe Greeting Shop</h2>
          <p style={{ color: 'orange', fontSize: '0.9rem' }}>✨ Tap words to wrap them! 🎁</p>
          
          {/* Interactive Preview Box */}
          <div style={{ border: '2px dashed #ffd700', borderRadius: '15px', padding: '20px', margin: '20px 0', minHeight: '80px', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {text.split(' ').map((word, i) => (
              <span 
                key={i} 
                onClick={() => toggleWrap(i)}
                style={{ 
                  padding: '5px 10px', borderRadius: '8px', cursor: 'pointer',
                  background: wrappedIndices.includes(i) ? 'gold' : 'transparent',
                  fontWeight: wrappedIndices.includes(i) ? 'bold' : 'normal'
                }}
              >
                {wrappedIndices.includes(i) ? '🎁' : word}
              </span>
            ))}
          </div>

          <textarea 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message here..."
            style={{ width: '100%', border: '1px solid #ddd', borderRadius: '10px', padding: '10px' }}
          />

          <div style={{ display: 'flex', gap: '5px', margin: '20px 0', justifyContent: 'center' }}>
            {UNIQUE_SCENES.map(s => (
              <button key={s.id} onClick={() => setSelectedScene(s)} style={{ border: '1px solid #ddd', borderRadius: '20px', padding: '5px 15px', background: selectedScene.id === s.id ? 'orange' : 'white' }}>{s.name}</button>
            ))}
          </div>

          <button 
            onClick={() => { navigator.clipboard.writeText(generateLink()); alert('Link Copied!'); }}
            style={{ background: '#ff6600', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '50px', fontWeight: 'bold', width: '100%', cursor: 'pointer' }}
          >
            Wrap & Send (0.99¢)
          </button>
        </div>
      </div>
    </main>
  );
}
