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

            {/* SOUND BUTTON */}
            <button onClick={toggleAudio} style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100, background: 'rgba(0,0,0,0.6)', border: '1px solid #0070f3', borderRadius: '50%', width: '50px', height: '50px', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>
                {isMuted ? '🔇' : '🔊'}
            </button>

            {isCinematicView && (
                <button onClick={() => setIsCinematicView(false)} style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100, background: 'rgba(0,0,0,0.6)', border: '1px solid #fff', borderRadius: '50%', width: '50px', height: '50px', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            )}

            {!isCinematicView && (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    
                    {/* TITLE 1 */}
                    <div style={{ background: '#0070f3', color: '#fff', padding: '10px 30px', borderRadius: '50px', fontWeight: 'bold', marginBottom: '15px', fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}>SEND A HEART IN A BOX</div>

                   // ... (keep imports and SCENES same as before)

// Inside the return block, replace the Letter mapping with this:
{selectedTiles.map((tile, idx) => (
    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* LARGER RHOMBOID WITH GLOW */}
        <div style={{ 
            display: 'flex', 
            gap: '6px', 
            transform: 'perspective(800px) rotateX(25deg) rotateY(-20deg)',
            filter: 'drop-shadow(0 0 15px rgba(0, 112, 243, 0.8))' // The Blue Glow
        }}>
            <img src={getLetterUrl(tile.charAt(0))} style={{ width: '85px', border: '2px solid #0070f3', borderRadius: '12px' }} alt="L" />
            <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '85px', border: '2px solid #0070f3', borderRadius: '12px' }} alt="R" />
        </div>
        
        {/* ENGLISH LABEL UNDERNEATH */}
        <span style={{ 
            color: '#fff', 
            fontSize: '1rem', 
            fontWeight: 'bold', 
            marginTop: '15px', 
            background: 'rgba(0,112,243,0.9)', 
            padding: '4px 12px', 
            borderRadius: '8px',
            textTransform: 'uppercase',
            boxShadow: '0 0 10px rgba(0,112,243,0.5)'
        }}>
            {tile}
        </span>
    </div>
))}

                    {/* TITLE 2 */}
                    <div style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 'bold', margin: '20px 0', textShadow: '2px 2px 8px #000' }}>Try to click on a few of your words below:</div>

                    {/* INPUT AREA */}
                    <div style={{ width: '95%', maxWidth: '650px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.85)', color: '#fff', padding: '15px', borderRadius: '15px', border: '1px solid #333', marginBottom: '12px', minHeight: '50px', fontSize: '1rem' }}>
                            {tokens.map((t, i) => {
                                const clean = t.trim().replace(/[.,!?;:]/g, "");
                                const isSel = selectedTiles.includes(clean);
                                return <span key={i} onClick={() => toggleTile(t)} style={{ padding: '3px 6px', cursor: 'pointer', background: isSel ? '#0070f3' : 'transparent', borderRadius: '5px' }}>{t}</span>
                            })}
                        </div>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." style={{ width: '100%', height: '85px', borderRadius: '15px', padding: '15px', border: '1px solid #0070f3', background: '#111', color: '#fff', fontSize: '1.1rem', resize: 'none', boxSizing: 'border-box' }} />
                        
                        <button onClick={handlePaymentAndSend} style={{ width: '100%', marginTop: '15px', background: '#0070f3', color: '#fff', padding: '15px', borderRadius: '50px', border: 'none', fontWeight: 'bold', fontSize: '1.4rem', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,112,243,0.4)' }}>SEND (0.99¢)</button>
                    </div>

                    {/* SCENE PICKER & EYE */}
                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '350px' }}>
                            {SCENES.map((s) => (
                                <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '45px', height: '45px', borderRadius: '12px', border: '1px solid #444', background: selectedScene.id === s.id ? '#0070f3' : '#1a1a1a', color: '#fff', fontSize: '0.9rem', cursor: 'pointer' }}>{s.label}</button>
                            ))}
                        </div>
                        <button onClick={() => setIsCinematicView(true)} style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid #0070f3', borderRadius: '50%', width: '60px', height: '60px', fontSize: '2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👁️</button>
                    </div>
                </div>
            )}
        </main>
    );
}
