'use client';
import { useSearchParams } from 'next/navigation';
import React, { useState, Suspense } from 'react';

function ReceiverContent() {
    const searchParams = useSearchParams();
    const [unwrapped, setUnwrapped] = useState(false);
    const msg = searchParams.get('msg') || "";
    const scene = searchParams.get('scene') || "one";
    const tiles = searchParams.get('tiles')?.split(',') || [];
    const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden' }}>
            <video key={scene} autoPlay loop playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${scene}.mp4`} type="video/mp4" />
            </video>

            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div onClick={() => setUnwrapped(true)} style={{ position: 'relative', cursor: 'pointer' }}>
                    
                    {/* The 3D Gift Box */}
                    <img src="https://storage.googleapis.com/simple-bucket-27/gifr-box.png" style={{ width: '400px' }} />

                    {unwrapped && (
                        <div style={{ position: 'absolute', top: '10%', width: '100%', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', animation: 'wiggle 0.5s ease-in-out' }}>
                            {tiles.map((tile, i) => (
                                <div key={i} style={{ display: 'flex', gap: '6px' }}>
                                    <img src={getLetterUrl(tile.charAt(0))} style={{ width: '100px', borderRadius: '8px', border: '3px solid gold', boxShadow: '0 10px 20px rgba(0,0,0,0.4)' }} />
                                    <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '100px', borderRadius: '8px', border: '3px solid gold', boxShadow: '0 10px 20px rgba(0,0,0,0.4)' }} />
                                </div>
                            ))}
                        </div>
                    )}
                    {!unwrapped && <p style={{ color: 'white', position: 'absolute', bottom: '-40px', width: '100%', textAlign: 'center', fontWeight: 'bold', textShadow: '2px 2px 4px #000' }}>🎁 Tap to unwrap your Vibe...</p>}
                </div>
            </div>
            <style jsx>{` @keyframes wiggle { 0% { transform: scale(0.8); } 50% { transform: scale(1.1) rotate(5deg); } 100% { transform: scale(1); } } `}</style>
        </main>
    );
}

export default function ReceiverPage() {
    return <Suspense fallback={<div>Loading...</div>}><ReceiverContent /></Suspense>;
}
