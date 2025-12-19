'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const alphabetMap: { [key: string]: string } = {
  'A': 'https://storage.googleapis.com/simple-bucket-27/A5.png',
  'B': 'https://storage.googleapis.com/simple-bucket-27/B5.png',
  'C': 'https://storage.googleapis.com/simple-bucket-27/C5.png',
  // ... continue this for all A5 through Z5
  'Z': 'https://storage.googleapis.com/simple-bucket-27/Z5.png',
};

function GiftBoxTile({ word }: { word: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const firstL = word[0]?.toUpperCase() || 'A';
  const lastL = word[word.length - 1]?.toUpperCase() || 'Z';

  return (
    <div 
      onClick={() => setIsOpen(!isOpen)}
      style={{
        cursor: 'pointer',
        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: isOpen ? 'scale(1.2)' : 'scale(1)',
        display: 'inline-block',
        margin: '10px'
      }}
    >
      {!isOpen ? (
        <div style={{
          width: '100px', height: '100px', background: 'gold', 
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', // Rhomboid/Hex shape
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
        }}>
          🎁
        </div>
      ) : (
        <img src={alphabetMap[firstL]} style={{ width: '120px', borderRadius: '10px' }} alt="Revealed Letter" />
      )}
    </div>
  );
}

function ReceiverContent({ id }: { id: string }) {
  const [message, setMessage] = useState('');
  const [clearView, setClearView] = useState(false);
  const searchParams = useSearchParams();
  const sceneId = searchParams.get('scene');

  useEffect(() => {
    try { setMessage(atob(id)); } catch { setMessage("Message Error"); }
  }, [id]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Background Video */}
      <video autoPlay loop muted style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${sceneId === 'scene-01' ? 'loveisall' : 'winter-daffodil'}.mp4`} type="video/mp4" />
      </video>

      {/* Floating Orbs (The Bells & Whistles) */}
      {!clearView && <div className="orbs" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[1,2,3].map(i => (
          <div key={i} style={{
            position: 'absolute', width: '200px', height: '200px', background: 'rgba(255,255,255,0.1)',
            filter: 'blur(50px)', borderRadius: '50%', top: `${i*20}%`, left: `${i*15}%`,
            animation: `float ${10+i}s infinite alternate`
          }} />
        ))}
      </div>}

      {/* Main Content */}
      <div style={{ 
        position: 'relative', zIndex: 1, textAlign: 'center', top: '20%', 
        transition: 'opacity 0.5s', opacity: clearView ? 0 : 1 
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {message.split(' ').map((word, i) => <GiftBoxTile key={i} word={word} />)}
        </div>
      </div>

      {/* Clear View Toggle */}
      <button 
        onClick={() => setClearView(!clearView)}
        style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 10, padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}
      >
        {clearView ? 'Show Controls' : 'Full Scene View'}
      </button>

      <style jsx global>{`
        @keyframes float { from { transform: translate(0,0); } to { transform: translate(50px, 100px); } }
      `}</style>
    </div>
  );
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>Unwrapping...</div>}>
      <ReceiverContent id={params.id} />
    </Suspense>
  );
}
