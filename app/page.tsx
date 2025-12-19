'use client';
import React, { useState } from 'react';

const UNIQUE_SCENES = [
  { id: 'scene-01', name: 'Love is All', url: 'https://storage.googleapis.com/simple-bucket-27/loveisall.mp4' },
  { id: 'scene-02', name: 'Winter Daffodil', url: 'https://storage.googleapis.com/simple-bucket-27/winter-daffodil.mp4' },
  { id: 'scene-03', name: 'Golden Glow', url: 'https://storage.googleapis.com/simple-bucket-27/goldenglow.mp4' },
  { id: 'scene-04', name: 'Midnight Sparkle', url: 'https://storage.googleapis.com/simple-bucket-27/midnight.mp4' },
  // Add any other video links from your bucket here!
];

export default function SenderPage() {
  const [text, setText] = useState('');
  const [selectedScene, setSelectedScene] = useState(UNIQUE_SCENES[0]);

  const generateLink = () => {
    const encoded = btoa(text);
    return `${window.location.origin}/receiver/${encoded}?scene=${selectedScene.id}`;
  };

  return (
    <main style={{ padding: '20px', textAlign: 'center', background: '#1a1a1a', color: 'white', minHeight: '100vh' }}>
      <h1>Vibe Greeting Shop</h1>
      <textarea 
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: '80%', height: '100px', margin: '20px 0', borderRadius: '10px', padding: '10px' }}
      />
      <h3>Pick your Vibe:</h3>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {UNIQUE_SCENES.map(scene => (
          <button 
            key={scene.id}
            onClick={() => setSelectedScene(scene)}
            style={{ padding: '10px', border: selectedScene.id === scene.id ? '2px solid yellow' : '1px solid gray' }}
          >
            {scene.name}
          </button>
        ))}
      </div>
      <br />
      <button 
        onClick={() => { navigator.clipboard.writeText(generateLink()); alert('Link Copied!'); }}
        style={{ background: 'yellow', color: 'black', padding: '15px 30px', fontWeight: 'bold', borderRadius: '50px', cursor: 'pointer' }}
      >
        Wrap & Send!
      </button>
    </main>
  );
}
