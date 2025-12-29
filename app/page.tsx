'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const vibes = [
  { id: '14', name: 'Rainforest' },
  { id: '11', name: 'Winter Night' },
  { id: '13', name: 'Enchanted Gold' },
  { id: '15', name: 'Crimson Sanctuary' },
  { id: '19', name: 'The Golden Clearing' } // Your favorite Background 19
];

export default function LandingPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextVibe = () => setCurrentIndex((prev) => (prev + 1) % vibes.length);
  const prevVibe = () => setCurrentIndex((prev) => (prev - 1 + vibes.length) % vibes.length);

  const handleConfirm = () => {
    // Logic: Confirm Selection -> Stripe Payment -> Sanctuary
    router.push(`/success?vibe=${vibes[currentIndex].id}`);
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: 'white', padding: '40px 20px' }}>
      
      {/* PROFESSIONAL HEADER: GIFTING PROTOCOL */}
      <section style={{ maxWidth: '900px', margin: '0 auto 60px', padding: '30px', borderBottom: '1px solid rgba(255,215,0,0.3)' }}>
        <h2 style={{ color: 'gold', textAlign: 'center', letterSpacing: '6px', fontSize: '1.1rem', marginBottom: '25px' }}>HOW TO GIFT A HARMONICA</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', textAlign: 'center', fontSize: '0.8rem', color: '#bbb' }}>
          <div><b style={{color:'gold'}}>1. COMPOSE</b><br/>Write in the sanctuary.</div>
          <div><b style={{color:'gold'}}>2. STASH</b><br/>Touch words into gold.</div>
          <div><b style={{color:'gold'}}>3. PRODUCE</b><br/>Seal your unique link.</div>
          <div><b style={{color:'gold'}}>4. SHARE</b><br/>Send the unfolding light.</div>
        </div>
      </section>

      {/* VIBE SELECTION WITH ARROWS */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ color: 'gold', fontSize: '2rem', letterSpacing: '10px', marginBottom: '10px' }}>HARMONICA</h1>
        <p style={{ color: '#888', marginBottom: '40px' }}>A Sanctuary for Stashed Cognition</p>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={prevVibe} style={{ background: 'none', border: 'none', color: 'gold', fontSize: '3rem', cursor: 'pointer', padding: '20px' }}>‹</button>
          
          <div style={{ width: '100%', height: '450px', borderRadius: '40px', overflow: 'hidden', border: '2px solid gold', position: 'relative' }}>
            <video key={vibes[currentIndex].id} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
              <source src={`https://storage.googleapis.com/simple-bucket-27/${vibes[currentIndex].id}.mp4`} type="video/mp4" />
            </video>
            <div style={{ position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center' }}>
              <p style={{ color: 'gold', letterSpacing: '4px', fontWeight: 'bold', textShadow: '2px 2px 4px black' }}>{vibes[currentIndex].name.toUpperCase()}</p>
            </div>
          </div>

          <button onClick={nextVibe} style={{ background: 'none', border: 'none', color: 'gold', fontSize: '3rem', cursor: 'pointer', padding: '20px' }}>›</button>
        </div>

        <button onClick={handleConfirm} style={{ marginTop: '40px', background: 'gold', color: 'black', padding: '15px 50px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', border: 'none' }}>
          CONFIRM SELECTION & ENTER
        </button>
      </div>
    </main>
  );
}
