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
            <button onClick={toggleAudio} style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 100, background: 'rgba(0,0,0,0.6)', border: '1px solid #0070f3', borderRadius: '50%', width: '44px', height: '44px', color: '#fff', fontSize: '1.2rem', cursor: 'pointer' }}>
                {isMuted ? '🔇' : '🔊'}
            </button>

            {!isCinematicView && (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                    
                    {/* TITLE 1 */}
                    <div style={{ background: '#0070f3', color: '#fff', padding: '8px 20px', borderRadius: '50px', fontWeight: 'bold', marginBottom: '10px', fontSize: '0.9rem' }}>SEND A HEART IN A BOX</div>

                    {/* BOX & RHOMBOID LETTERS */}
                    <div style={{ width: '95%', maxWidth: '450px', background: 'rgba(0,0,0,0.4)', borderRadius: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid rgba(0,112,243,0.5)', paddingBottom: '25px' }}>
                        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '70%' }} alt="Box" />
                            
                            {selectedTiles.length > 0 && (
                                <div style={{ position: 'absolute', bottom: '15%', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '20px' }}>
                                    {selectedTiles.map((tile, idx) => (
                                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            {/* RHOMBOID SHAPE */}
                                            <div style={{ display: 'flex', gap: '4px', transform: 'perspective(500px) rotateX(20deg) rotateY(-15deg)' }}>
                                                <img src={getLetterUrl(tile.charAt(0))} style={{ width: '65px', border: '2px solid #0070f3', borderRadius: '8px', boxShadow: '5px 5px 15px rgba(0,0,0,0.5)' }} alt="L" />
                                                <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '65px', border: '2px solid #0070f3', borderRadius: '8px', boxShadow: '5px 5px 15px rgba(0,0,0,0.5)' }} alt="R" />
                                            </div>
                                            {/* ENGLISH LABEL */}
                                            <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 'bold', marginTop: '10px', textTransform: 'uppercase', background: 'rgba(0,112,243,0.8)', padding: '2px 8px', borderRadius: '5px' }}>{tile}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* TITLE 2 */}
                    <div style={{ color: '#fff', fontSize: '1rem', fontWeight: 'bold', margin: '15px 0', textShadow: '2px 2px 4px #000' }}>Try to click on a few of your words below:</div>

                    {/* INPUT AREA */}
                    <div style={{ width: '95%', maxWidth: '600px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '12px', borderRadius: '15px', border: '1px solid #333', marginBottom: '10px', minHeight: '40px' }}>
                            {tokens.map((t, i) => {
                                const clean = t.trim().replace(/[.,!?;:]/g, "");
                                const isSel = selectedTiles.includes(clean);
                                return <span key={i} onClick={() => toggleTile(t)} style={{ padding: '2px 5px', cursor: 'pointer', background: isSel ? '#0070f3' : 'transparent', borderRadius: '4px' }}>{t}</span>
                            })}
                        </div>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." style={{ width: '100%', height: '70px', borderRadius: '15px', padding: '12px', border: '1px solid #0070f3', background: '#111', color: '#fff', resize: 'none', boxSizing: 'border-box' }} />
                        
                        <button onClick={handlePaymentAndSend} style={{ width: '100%', marginTop: '10px', background: '#0070f3', color: '#fff', padding: '12px', borderRadius: '50px', border: 'none', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer' }}>SEND (0.99¢)</button>
                    </div>

                    {/* SCENE PICKER & EYE BUTTON */}
                    <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '320px' }}>
                            {SCENES.map((s) => (
                                <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid #333', background: selectedScene.id === s.id ? '#0070f3' : '#111', color: '#fff', fontSize: '0.8rem', cursor: 'pointer' }}>{s.label}</button>
                            ))}
                        </div>
                        <button onClick={() => setIsCinematicView(true)} style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid #0070f3', borderRadius: '50%', width: '55px', height: '55px', fontSize: '1.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👁️</button>
                    </div>
                </div>
            )}
        </main>
    );
}



