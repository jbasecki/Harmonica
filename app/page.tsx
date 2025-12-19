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
  const [isPreview, setIsPreview] = useState(false);

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
    <main style={{ minHeight: '100vh', display: 'flex', background: '#000', color: '#fff', position: 'relative' }}>
      {/* Background Video */}
      <video key={selectedScene.id} autoPlay loop muted style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: isPreview ? 1 : 0.5 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* THE EDITOR CARD */}
        {!isPreview ? (
          <div style={{ background: 'white', padding: '40px', borderRadius: '30px', color: '#333', textAlign: 'center', width: '90%', maxWidth: '500px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <h2 style={{ margin: 0, fontFamily: 'serif' }}>Vibe Greeting Shop</h2>
            <p style={{ color: '#ff8c00', fontSize: '0.9rem', fontWeight: 'bold' }}>✨ Tap words to wrap them! 🎁</p>
            
            <div style={{ border: '2px dashed #ffd700', borderRadius: '15px', padding: '20px', margin: '20px 0', minHeight: '80px', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {text.split(' ').map((word, i) => (
                <span 
                  key={i} 
                  onClick={() => toggleWrap(i)}
                  style={{ 
                    padding: '8px 12px', borderRadius: '10px', cursor: 'pointer', transition: '0.2s',
                    background: wrappedIndices.includes(i) ? 'gold' : 'rgba(0,0,0,0.05)',
                    transform: wrappedIndices.includes(i) ? 'scale(1.1) rotate(2deg)' : 'scale(1)',
                    display: 'inline-block'
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
              style={{ width: '100%', border: '1px solid #ddd', borderRadius: '15px', padding: '15px', fontSize: '1rem', outline: 'none' }}
            />

            <div style={{ display: 'flex', gap: '10px', margin: '20px 0', justifyContent: 'center', flexWrap: 'wrap' }}>
              {UNIQUE_SCENES.map(s => (
                <button key={s.id} onClick={() => setSelectedScene(s)} style={{ border: 'none', borderRadius: '20px', padding: '8px 16px', cursor: 'pointer', background: selectedScene.id === s.id ? '#ff8c00' : '#f0f0f0', color: selectedScene.id === s.id ? 'white' : '#666' }}>{s.name}</button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setIsPreview(true)} style={{ flex: 1, background: '#666', color: 'white', border: 'none', padding: '15px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}>👁️ Preview</button>
              <button onClick={() => { navigator.clipboard.writeText(generateLink()); alert('Link Copied!'); }} style={{ flex: 2, background: 'linear-gradient(45deg, #ff6600, #ff8c00)', color: 'white', border: 'none', padding: '15px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}>Wrap & Send (0.99¢)</button>
            </div>
          </div>
        ) : (
          /* THE PREVIEW MODE: Shows exactly what receiver sees */
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', maxWidth: '800px' }}>
              {text.split(' ').map((word, i) => (
                <div key={i} style={{ 
                  width: '100px', height: '100px', background: 'gold', 
                  clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)', // Rhomboid shape
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
                }}>
                  {wrappedIndices.includes(i) ? '🎁' : word}
                </div>
              ))}
            </div>
            <button onClick={() => setIsPreview(false)} style={{ marginTop: '50px', background: 'rgba(255,255,255,0.2)', color: 'white', border: '1px solid white', padding: '10px 30px', borderRadius: '30px', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>← Back to Editor</button>
          </div>
        )}
      </div>
    </main>
  );
}
