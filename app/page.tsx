'use client';
import React, { useState } from 'react';

export default function HomePage() {
    // Default video is #14 for that "New Year" rainforest vibe
    const [selectedVideo, setSelectedVideo] = useState(14);

    const grid1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const grid2 = [11, 12, 13, 14, 15, 16, 17, 18, 19];

    const videoUrl = (num: number) => `https://storage.googleapis.com/simple-bucket-27/${num}.mp4`;

   return (
    <main style={{ position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', background: '#000', fontFamily: 'sans-serif' }}>
      
      {/* LIVE BACKGROUND PREVIEW */}
      <video
        key={selectedVideo}
        autoPlay
        loop
        muted
        playsInline
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
      >
        <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedVideo}.mp4`} type="video/mp4" />
      </video>

      {/* OVERLAY CONTENT */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'white', background: 'rgba(0,0,0,0.4)' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px', letterSpacing: '2px' }}>STASH A VIBE</h1>
        <p style={{ color: 'gold', marginBottom: '40px' }}>New Year. New Energy. 2026.</p>

        {/* GRIDS - Ensure your grid arrays are defined above this return */}
        {/* ... keep your existing grid mapping here ... */}

        {/* THE "SEND" BUTTON WITH YOUR NEW 004 URL */}
        <div style={{ marginTop: '30px' }}>
          <button 
            onClick={() => window.location.href = 'https://buy.stripe.com/4gM14obTmgNT9ED2N8fn004'} 
            style={{ background: 'gold', color: 'black', padding: '15px 40px', borderRadius: '30px', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px gold' }}
          >
            SEND VIBE {selectedVideo} ($0.99)
          </button>
        </div>
      </div>
    </main>
  );
}
