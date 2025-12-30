'use client';
import React from 'react';

export default function ArtistOnboarding() {
  return (
    <main style={{ minHeight: '100vh', background: '#000', color: 'gold', padding: '60px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', fontSize: '2rem', letterSpacing: '8px', marginBottom: '10px' }}>CREATOR ONBOARDING</h1>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: '50px' }}>Secure your sanctuary for the 2026 launch.</p>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '25px', background: '#111', padding: '40px', borderRadius: '30px', border: '1px solid #333' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.8rem' }}>ARTIST / STUDIO NAME</label>
            <input type="text" placeholder="Your brand name..." style={{ width: '100%', padding: '15px', background: '#000', border: '1px solid gold', color: 'white', borderRadius: '10px' }} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.8rem' }}>PRIMARY VIBE SELECTION</label>
            <select style={{ width: '100%', padding: '15px', background: '#000', border: '1px solid gold', color: 'white', borderRadius: '10px' }}>
              <option>Misty Peak (ID 10)</option>
              <option>Rainforest Sanctuary (ID 14)</option>
              <option>The Golden Clearing (ID 19)</option>
              <option>Custom Atmosphere Submission</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontSize: '0.8rem' }}>SACRED TILE VISION</label>
            <textarea placeholder="Describe the aesthetic of your 26 letter tiles (A-Z)..." rows={4} style={{ width: '100%', padding: '15px', background: '#000', border: '1px solid gold', color: 'white', borderRadius: '10px' }} />
          </div>

          <div style={{ padding: '20px', border: '1px dashed #444', textAlign: 'center', borderRadius: '10px' }}>
            <p style={{ fontSize: '0.75rem', color: '#888' }}>Upload a sample of your "A" tile (PNG preferred)</p>
            <input type="file" style={{ marginTop: '10px', fontSize: '0.8rem' }} />
          </div>

          <button type="submit" style={{ background: 'gold', color: 'black', padding: '20px', borderRadius: '40px', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '20px' }}>
            SUBMIT FOR SANCTUARY REVIEW
          </button>
          
          <p style={{ fontSize: '0.7rem', textAlign: 'center', color: '#555', marginTop: '10px' }}>
            Submission constitutes agreement to the Harmonica Utility Patent protocols.
          </p>
        </form>
      </div>
    </main>
  );
}
