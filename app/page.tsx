'use client';
import React, { useState } from 'react';

// VERIFIED IDs: MATCHING YOUR GOOGLE BUCKET EXACTLY
const vibes = [
  { id: '14', name: 'Rainforest Sanctuary' },
  { id: '19', name: 'The Golden Clearing' },
  { id: '10', name: 'Misty Peak' },
  { id: '9', name: 'Solar Bloom' },   
  { id: '1', name: 'Midnight Stash' }, 
  { id: '2', name: 'Ethereal Dawn' },
  { id: '3', name: 'Golden Cognition' },
  { id: '4', name: 'Velvet Silence' },
  { id: '5', name: 'Amber Echo' },
  { id: '6', name: 'Stardust Archive' },
  { id: '7', name: 'Celestial Harmony' },
  { id: '8', name: 'Lunar Drift' },
  { id: '11', name: 'Winter Night' },
  { id: '12', name: 'Oceanic Breath' },
  { id: '13', name: 'Enchanted Gold' },
  { id: '15', name: 'Crimson Glow' },
  { id: '16', name: 'Twilight Ember' },
  { id: '17', name: 'Serene Moss' },
  { id: '18', name: 'Radiant Stillness' }
];

export default function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextVibe = () => setCurrentIndex((prev) => (prev + 1) % vibes.length);
  const prevVibe = () => setCurrentIndex((prev) => (prev - 1 + vibes.length) % vibes.length);

  const handlePayAndEnter = () => {
    const stripeUrl = "https://buy.stripe.com/aFaaEYf5ybtzg3173ofnO08";
    window.location.href = `${stripeUrl}?client_reference_id=${vibes[currentIndex].id}`;
  };

  return (
    <main style={{ minHeight: '100vh', background: '#000', color: 'white', padding: '40px 20px' }}>
      {/* GIFTING PROTOCOL */}
      <section style={{ maxWidth: '900px', margin: '0 auto 60px', padding: '30px', borderBottom: '1px solid rgba(255,215,0,0.3)' }}>
        <h2 style={{ color: 'gold', textAlign: 'center', letterSpacing: '6px', fontSize: '1.1rem', marginBottom: '25px' }}>HOW TO GIFT A HARMONICA</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', textAlign: 'center', fontSize: '0.8rem', color: '#bbb' }}>
          <div><b style={{color:'gold'}}>1. COMPOSE</b><br/>Write in the sanctuary.</div>
          <div><b style={{color:'gold'}}>2. STASH</b><br/>Touch words into gold.</div>
          <div><b style={{color:'gold'}}>3. PRODUCE</b><br/>Seal your unique link.</div>
          <div><b style={{color:'gold'}}>4. SHARE</b><br/>Send the unfolding light.</div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}>
        <h1 style={{ color: 'gold', fontSize: '2.5rem', letterSpacing: '12px', marginBottom: '10px' }}>HARMONICA</h1>
        <p style={{ color: '#888', marginBottom: '40px', letterSpacing: '2px' }}>A Sanctuary for Stashed Cognition</p>
        
        {/* THE SLIDER */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={prevVibe} style={{ background: 'none', border: 'none', color: 'gold', fontSize: '4rem', cursor: 'pointer', padding: '20px' }}>‹</button>
          
          <div style={{ width: '100%', height: '500px', borderRadius: '50px', overflow: 'hidden', border: '2px solid gold', position: 'relative' }}>
            <video key={vibes[currentIndex].id} autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
              <source src={`https://storage.googleapis.com/simple-bucket-27/${vibes[currentIndex].id}.mp4`} type="video/mp4" />
            </video>
            <div style={{ position: 'absolute', bottom: '30px', width: '100%', textAlign: 'center' }}>
              <p style={{ color: 'gold', letterSpacing: '5px', fontWeight: 'bold', textShadow: '2px 2px 8px black', fontSize: '1.2rem' }}>{vibes[currentIndex].name.toUpperCase()}</p>
            </div>
          </div>
          
          <button onClick={nextVibe} style={{ background: 'none', border: 'none', color: 'gold', fontSize: '4rem', cursor: 'pointer', padding: '20px' }}>›</button>
        </div>

        {/* STRIPE BUTTON */}
        <button onClick={handlePayAndEnter} style={{ marginTop: '50px', background: 'gold', color: 'black', padding: '18px 60px', borderRadius: '40px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', border: '
