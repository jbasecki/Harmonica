'use client';
import React, { useState, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const SCENES = [
    { id: 'one', label: '1' }, { id: 'two', label: '2' }, { id: 'three', label: '3' },
    { id: 'four', label: '4' }, { id: 'five', label: '5' }, { id: 'six', label: '6' },
    { id: 'seven', label: '7' }, { id: 'eight', label: '8' }, { id: 'nine', label: '9' },
    { id: 'ten', label: '10' }, { id: 'eleven', label: '11' }, { id: 'twelve', label: '12' }
];

export default function SenderPage() {
    const [message, setMessage] = useState("");
    const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
    const [selectedScene, setSelectedScene] = useState(SCENES[0]);
    const [isCinematicView, setIsCinematicView] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const tokens = message.split(/(\s+)/);
    const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

    const toggleAudio = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const toggleTile = (rawWord: string) => {
        const clean = rawWord.trim().replace(/[.,!?;:]/g, "");
        if (!clean) return;
        setSelectedTiles(prev => 
            prev.includes(clean) ? prev.filter(t => t !== clean) : prev.length < 4 ? [...prev, clean] : prev
        );
    };

    const handlePaymentAndSend = async () => {
        if (!message.trim()) { alert("Please type a message first!"); return; }
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, tiles: selectedTiles, sceneId: selectedScene.id }),
            });
            const session = await response.json();
            if (session.error) { alert(`Stripe Error: ${session.error}`); return; }
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
            if (stripe) await stripe.redirectToCheckout({ sessionId: session.id });
        } catch (err) { alert("Error connecting to Stripe."); }
    };

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            <video ref={videoRef} key={selectedScene.id} autoPlay loop playsInline muted={isMuted} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {/* SOUND BUTTON (TOP LEFT) */}
            <button onClick={toggleAudio} style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 100, background: 'rgba(0,0,0,0.6)', border: '1px solid #0070f3', borderRadius: '50%', width: '44px', height: '44px', color: '#fff', cursor: 'pointer' }}>
                {isMuted ? '🔇' : '🔊'}
            </button>

            {/* RETURN FROM EYE BUTTON (TOP RIGHT) */}
            {isCinematicView && (
                <button onClick={() => setIsCinematicView(false)} style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 100, background: 'rgba(0,0,0,0.6)', border: '1px solid #fff', borderRadius: '50%', width: '44px', height: '44px', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            )}

            {!isCinematicView && (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                    
                    {/* TITLE 1 */}
                    <div style={{ background: '#0070f3', color: '#fff', padding: '8px 20px', borderRadius: '50px', fontWeight: 'bold', marginBottom: '10px', fontSize: '0.8rem' }}>SEND A HEART IN A BOX</div>

                    {/* THE ALPHABET AREA: HORIZONTAL, GLOWING RHOMBOIDS */}
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', margin: '20px 0' }}>
                        {selectedTiles.map((tile, idx) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                {/* THE BOW */}
                                <div style={{ fontSize: '1.5rem', marginBottom: '-10px', zIndex: 5 }}>🎀</div>
                                <div style={{ 
                                    display: 'flex', gap: '5px', 
                                    transform: 'rotateZ(-5deg) skewX(-15deg)', 
                                    filter: 'drop-shadow(0 0 12px rgba(0, 112, 243, 0.9))' 
                                }}>
                                    <img src={getLetterUrl(tile.charAt(0))} style={{ width: '85px', border: '2px solid #0070f3', borderRadius: '4px' }} />
                                    <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '85px', border: '2px solid #0070f3', borderRadius: '4px' }} />
                                </div>
                                <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 'bold', marginTop: '10px', textTransform: 'uppercase' }}>{tile}</span>
                            </div>
                        ))}
                    </div>

                    {/* TITLE 2 */}
                    <div style={{ color: '#fff', fontSize: '0.85rem', margin: '10px 0', textShadow: '1px 1px 2px #000' }}>Try to click on a few of your words below:</div>

                    {/* TEXT ENTRY AREA */}
                    <div style={{ width: '95%', maxWidth: '600px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '10px', borderRadius: '12px', border: '1px solid #333', marginBottom: '8px', minHeight: '35px' }}>
                            {tokens.map((t, i) => {
                                const clean = t.trim().replace(/[.,!?;:]/g, "");
                                const isSel = selectedTiles.includes(clean);
                                return <span key={i} onClick={() => toggleTile(t)} style={{ padding: '2px 4px', cursor: 'pointer', background: isSel ? '#0070f3' : 'transparent', borderRadius: '3px' }}>{t}</span>
                            })}
                        </div>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." style={{ width: '100%', height: '60px', borderRadius: '12px', padding: '10px', background: '#111', border: '1px solid #0070f3', color: '#fff', fontSize: '0.95rem', resize: 'none' }} />
                        <button onClick={handlePaymentAndSend} style={{ width: '100%', marginTop: '8px', background: '#0070f3', color: '#fff', padding: '12px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>SEND (0.99¢)</button>
                    </div>

                    {/* SCENE PICKER & EYE */}
                    <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '300px' }}>
                            {SCENES.map((s) => (
                                <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #333', background: selectedScene.id === s.id ? '#0070f3' : '#111', color: '#fff', fontSize: '0.7rem' }}>{s.label}</button>
                            ))}
                        </div>
                        <button onClick={() => setIsCinematicView(true)} style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid #0070f3', borderRadius: '50%', width: '44px', height: '44px', fontSize: '1.2rem', cursor: 'pointer' }}>👁️</button>
                    </div>
                </div>
            )}
        </main>
    );
}
