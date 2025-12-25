'use client';
import React, { useEffect, useState, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ReceiveContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [vibe, setVibe] = useState<any>(null);
    const [isOpened, setIsOpened] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (id) {
            // In a real app, you'd fetch from your Postgres here. 
            // For now, we'll simulate the "Unboxing" feel.
            fetch(`/api/get-vibe?id=${id}`)
                .then(res => res.json())
                .then(data => setVibe(data))
                .catch(err => console.error(err));
        }
    }, [id]);

    const handleOpen = () => {
        setIsOpened(true);
        if (videoRef.current) {
            videoRef.current.muted = false;
            setIsMuted(false);
        }
    };

    if (!id) return <div style={{color: 'white', textAlign: 'center', marginTop: '50px'}}>No Vibe ID found.</div>;

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            {/* Background Video using the saved Scene ID */}
            <video 
                ref={videoRef}
                autoPlay loop playsInline muted={isMuted}
                style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
            >
                <source src={`https://storage.googleapis.com/simple-bucket-27/${vibe?.scene_id || 'one'}.mp4`} type="video/mp4" />
            </video>

            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {!isOpened ? (
                    <div onClick={handleOpen} style={{ cursor: 'pointer', textAlign: 'center' }}>
                        <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '300px', filter: 'drop-shadow(0 0 20px #0070f3)' }} alt="Box" />
                        <h2 style={{ color: '#fff', marginTop: '20px', fontSize: '2rem', textShadow: '0 0 10px #0070f3' }}>CLICK TO OPEN YOUR HUG</h2>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.8)', padding: '40px', borderRadius: '30px', border: '2px solid #0070f3', maxWidth: '600px', textAlign: 'center' }}>
                            <p style={{ color: '#fff', fontSize: '1.8rem', lineHeight: '1.4' }}>{vibe?.message || "Thinking of you..."}</p>
                            
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px' }}>
                                {vibe?.tiles?.map((tile: string, i: number) => (
                                    <div key={i} style={{ display: 'flex', gap: '4px' }}>
                                        <img src={`https://storage.googleapis.com/simple-bucket-27/${tile.charAt(0).toUpperCase()}5.png`} style={{ width: '60px', border: '1px solid #0070f3' }} alt="Letter" />
                                        <img src={`https://storage.googleapis.com/simple-bucket-27/${tile.charAt(tile.length - 1).toUpperCase()}5.png`} style={{ width: '60px', border: '1px solid #0070f3' }} alt="Letter" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button style={{ background: '#fff', color: '#000', border: 'none', padding: '15px 40px', borderRadius: '50px', fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 20px gold' }}>
                            SEND A HUG BACK ❤️
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}

export default function ReceivePage() {
    return (
        <Suspense fallback={<div style={{color: 'white'}}>Loading your Vibe...</div>}>
            <ReceiveContent />
        </Suspense>
    );
}
