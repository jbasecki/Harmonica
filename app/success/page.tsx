'use client';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const msg = searchParams.get('msg') || "";
    const scene = searchParams.get('scene') || "loveisall";
    const tiles = searchParams.get('tiles')?.split(',') || [];
    const tokens = msg.split(/(\s+)/);

    const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden' }}>
            <video key={scene} autoPlay loop playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'contain' }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${scene}.mp4`} type="video/mp4" />
            </video>
            
            <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <div style={{ background: 'rgba(255,255,255,0.9)', padding: '40px', borderRadius: '50px', border: '10px solid #ffd700', textAlign: 'center', maxWidth: '85%' }}>
                    <h1 style={{ color: '#28a745', fontSize: '2.5rem' }}>Ready to Send! 🥳</h1>
                    <div style={{ fontSize: '1.8rem', margin: '20px 0', lineHeight: '2' }}>
                        {tokens.map((token, i) => {
                            const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                            if (tiles.includes(clean)) {
                                const f = token.charAt(0);
                                const l = token.charAt(token.length - 1);
                                return (
                                    <span key={i} style={{ display: 'inline-flex', gap: '5px', verticalAlign: 'middle', margin: '0 8px' }}>
                                        <img src={getLetterUrl(f)} style={{ width: '70px' }} />
                                        <img src={getLetterUrl(l)} style={{ width: '70px' }} />
                                    </span>
                                );
                            }
                            return token;
                        })}
                    </div>
                    <div style={{ background: '#f8f8f8', padding: '15px', borderRadius: '15px', wordBreak: 'break-all', fontSize: '0.85rem' }}>
                        <p style={{ fontWeight: 'bold', color: '#ff6600' }}>Copy this gift link:</p>
                        <code>https://vibe-letter-final-clean.vercel.app/receiver/vibe?msg={encodeURIComponent(msg)}&tiles={tiles.join(',')}&scene={scene}</code>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div style={{color:'white', textAlign:'center', marginTop:'20%'}}>Loading Gift...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
