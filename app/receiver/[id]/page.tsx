'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Complete A5-Z5 Map from Google Cloud
const alphabetMap: { [key: string]: string } = {
  'A': 'https://storage.googleapis.com/simple-bucket-27/A5.png', 'B': 'https://storage.googleapis.com/simple-bucket-27/B5.png',
  'C': 'https://storage.googleapis.com/simple-bucket-27/C5.png', 'D': 'https://storage.googleapis.com/simple-bucket-27/D5.png',
  'E': 'https://storage.googleapis.com/simple-bucket-27/E5.png', 'F': 'https://storage.googleapis.com/simple-bucket-27/F5.png',
  'G': 'https://storage.googleapis.com/simple-bucket-27/G5.png', 'H': 'https://storage.googleapis.com/simple-bucket-27/H5.png',
  'I': 'https://storage.googleapis.com/simple-bucket-27/I5.png', 'J': 'https://storage.googleapis.com/simple-bucket-27/J5.png',
  'K': 'https://storage.googleapis.com/simple-bucket-27/K5.png', 'L': 'https://storage.googleapis.com/simple-bucket-27/L5.png',
  'M': 'https://storage.googleapis.com/simple-bucket-27/M5.png', 'N': 'https://storage.googleapis.com/simple-bucket-27/N5.png',
  'O': 'https://storage.googleapis.com/simple-bucket-27/O5.png', 'P': 'https://storage.googleapis.com/simple-bucket-27/P5.png',
  'Q': 'https://storage.googleapis.com/simple-bucket-27/Q5.png', 'R': 'https://storage.googleapis.com/simple-bucket-27/R5.png',
  'S': 'https://storage.googleapis.com/simple-bucket-27/S5.png', 'T': 'https://storage.googleapis.com/simple-bucket-27/T5.png',
  'U': 'https://storage.googleapis.com/simple-bucket-27/U5.png', 'V': 'https://storage.googleapis.com/simple-bucket-27/V5.png',
  'W': 'https://storage.googleapis.com/simple-bucket-27/W5.png', 'X': 'https://storage.googleapis.com/simple-bucket-27/X5.png',
  'Y': 'https://storage.googleapis.com/simple-bucket-27/Y5.png', 'Z': 'https://storage.googleapis.com/simple-bucket-27/Z5.png',
};

// Rhomboid Gift Box Component
function GiftBoxTile({ word }: { word: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const letter = word[0]?.toUpperCase() || 'A';

  return (
    <div 
      onClick={() => setIsOpen(!isOpen)}
      style={{
        cursor: 'pointer', transition: 'all 0.4s ease',
        transform: isOpen ? 'scale(1.1) rotate(0deg)' : 'scale(1) rotate(-5deg)',
        display: 'inline-block', margin: '15px'
      }}
    >
      {!isOpen ? (
        <div style={{
          width: '110px', height: '110px', background: 'linear-gradient(135deg, #ffd700, #b8860b)',
          clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)', // Real Rhomboid Shape
          display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
        }}>
          <span style={{ fontSize: '40px' }}>🎁</span>
        </div>
      ) : (
        <img src={alphabetMap[letter]} style={{ width: '130px', filter: 'drop-shadow(0 0 10px gold)' }} alt="Art Letter" />
      )}
    </div>
  );
}

function ReceiverContent({ id }: { id: string }) {
  const [message, setMessage] = useState('');
  const [clearView, setClearView] = useState(false);
  const searchParams = useSearchParams();
  const scene = searchParams.get('scene') || 'winter-daffodil';

  useEffect(() => {
    try { setMessage(atob(id)); } catch { setMessage("Welcome!"); }
  }, [id]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', background: 'black' }}>
      <video autoPlay loop muted style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
        <source src={`https://storage.googleapis.com/simple-bucket-27/${scene}.mp4`} type="video/mp4" />
      </video>

      {/* Floating Orbs - Bells & Whistles */}
      {!clearView && <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <div className="orb" style={{ top: '10%', left: '20%' }} />
        <div className="orb" style={{ top: '60%', left: '70%', animationDelay: '2s' }} />
      </div>}

      <div style={{ 
        position: 'relative', zIndex: 2, textAlign: 'center', paddingTop: '10vh',
        transition: 'opacity 0.8s', opacity: clearView ? 0 : 1 
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '900px', margin: '0 auto' }}>
          {message.split(' ').map((word, i) => <GiftBoxTile key={i} word={word} />)}
        </div>
      </div>

      <button 
        onClick={() => setClearView(!clearView)}
        style={{ 
          position: 'fixed', bottom: '30px', right: '30px', zIndex: 100,
          padding: '12px 24px', borderRadius: '30px', background: 'rgba(255,255,255,0.2)',
          color: 'white', border: '1px solid white', cursor: 'pointer', backdropFilter: 'blur(10px)'
        }}
      >
        {clearView ? 'Show Letter' : 'View Background'}
      </button>

      <style jsx>{`
        .orb {
          position: absolute; width: 300px; height: 300px; 
          background: radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%);
          border-radius: 50%; animation: float 15s infinite alternate ease-in-out;
        }
        @keyframes float { from { transform: translate(0,0); } to { transform: translate(100px, 50px); } }
      `}</style>
    </div>
  );
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>Loading your gift...</div>}>
      <ReceiverContent id={params.id} />
    </Suspense>
  );
}
