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
                autoPlay muted loop playsInline
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
            >
                <source src={videoUrl(selectedVideo)} type="video/mp4" />
            </video>

            {/* INTERFACE LAYER */}
            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '20px' }}>
                
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', textShadow: '0 0 20px black' }}>STASH A VIBE</h1>
                <p style={{ color: 'gold', marginBottom: '40px', fontWeight: 'bold' }}>New Year. New Energy. 2026.</p>

                {/* GRID 1: THE CLEARING */}
                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <h3 style={{ color: '#888', letterSpacing: '2px', fontSize: '0.8rem', marginBottom: '15px' }}>GRID I: THE CLEARING</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                        {grid1.map((num) => (
                            <button 
                                key={num}
                                onMouseEnter={() => setSelectedVideo(num)}
                                style={{ background: selectedVideo === num ? 'gold' : 'rgba(255,255,255,0.1)', color: selectedVideo === num ? 'black' : 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' }}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                {/* GRID 2: THE AWAKENING */}
                <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <h3 style={{ color: '#888', letterSpacing: '2px', fontSize: '0.8rem', marginBottom: '15px' }}>GRID II: THE AWAKENING</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                        {grid2.map((num) => (
                            <button 
                                key={num}
                                onMouseEnter={() => setSelectedVideo(num)}
                                style={{ background: selectedVideo === num ? 'gold' : 'rgba(255,255,255,0.1)', color: selectedVideo === num ? 'black' : 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' }}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                {/* THE "SEND" BUTTON */}
                <button 
                    onClick={() => window.location.href = 'https://buy.stripe.com/4gM14obTmgNT9ED2N8fnO03'} 
                    style={{ background: 'gold', color: 'black', padding: '15px 40px', borderRadius: '30px', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 0 20px gold' }}
                >
                    SEND VIBE {selectedVideo} ($0.99)
                </button>
            </div>
        </main>
    );
}
