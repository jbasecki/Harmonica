'use client';
import { useSearchParams } from 'next/navigation';
import React, { useState, Suspense } from 'react';

function ReceiverContent() {
    const searchParams = useSearchParams();
    const [unwrapped, setUnwrapped] = useState(false);
    const [isClean, setIsClean] = useState(false);
    const scene = searchParams.get('scene') || "one";
    const tiles = searchParams.get('tiles')?.split(',') || [];
    const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden' }}>
            <video key={scene} autoPlay loop playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${scene}.mp4`} type="video/mp4" />
            </video>

            {isClean ? (
                <div onClick={() => setIsClean(false)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 100, cursor: 'pointer' }} />
            ) : (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                    {tiles.map((tile, i) => (
                        <div key={i} onClick={() => setUnwrapped(true)} style={{ position: 'relative', width: '320px', cursor: 'pointer' }}>
                            <img src="https://storage.googleapis.com/simple-bucket-27/gifr-box.png" style={{ width: '100%' }} />
                            {unwrapped && (
                                <div style={{ position: 'absolute', bottom: '42px', left: '18px', right: '18px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                                    <img src={getLetterUrl(tile.charAt(0))} style={{ width: '45%', borderRadius: '8px', border: '3px solid gold', boxShadow: '0 8px 15px rgba(0,0,0,0.4)' }} />
                                    <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '45%', borderRadius: '8px', border: '3px solid gold', boxShadow: '0 8px 15px rgba(0,0,0,0.4)' }} />
                                </div>
                            )}
                        </div>
                    ))}
                    <button onClick={() => setIsClean(true)} style={{ position: 'absolute', bottom: '30px', right: '30px', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '60px', height: '60px', fontSize: '1.5rem', cursor: 'pointer' }}>👁️</button>
                </div>
            )}
        </main>
    );
}

export default function ReceiverPage() {
    return <Suspense fallback={<div>Opening Gift...</div>}><ReceiverContent /></Suspense>;
}
