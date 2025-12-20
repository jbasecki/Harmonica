'use client';
import React, { useState } from 'react';
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
    const [isPreview, setIsPreview] = useState(false);
    const [isCleanView, setIsCleanView] = useState(false);

    const tokens = message.split(/(\s+)/);
    const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

    const handleSend = async () => {
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, tiles: selectedTiles.join(','), sceneId: selectedScene.id }),
            });
            const data = await res.json();
            if (data.id) {
                const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
                await stripe?.redirectToCheckout({ sessionId: data.id });
            }
        } catch (err) { console.error(err); }
    };

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            <video key={selectedScene.id} autoPlay loop playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {isCleanView && (
                <div onClick={() => setIsCleanView(false)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 100, cursor: 'pointer', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '60px' }}>
                    <div style={{ background: '#fff', padding: '15px 25px', borderRadius: '50px', fontWeight: 'bold', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>✍️ Tap to return to Editor</div>
                </div>
            )}

            {!isCleanView && (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: 'rgba(255,255,255,0.96)', padding: '30px', borderRadius: '50px', width: '95%', maxWidth: isPreview ? '850px' : '580px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', transition: 'max-width 0.3s' }}>
                        <h2 style={{ marginBottom: '10px' }}>{isPreview ? "👁️ Preview" : "Vibe Greeting Shop"}</h2>
                        
                        <div style={{ minHeight: '260px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '25px', flexWrap: 'wrap', paddingTop: '20px' }}>
                            {isPreview || selectedTiles.length > 0 ? (
                                /* THE DYNAMIC BOX PREVIEW */
                                selectedTiles.length === 0 ? (
                                    /* PRE-DETERMINED WIGGLING BOX */
                                    <div style={{ position: 'relative', width: '300px', animation: 'gentleWiggle 3s infinite ease-in-out' }}>
                                        <img src="https://storage.googleapis.com/simple-bucket-27/gifr-box.png" style={{ width: '100%' }} alt="Base Gift Box" />
                                    </div>
                                ) : (
                                    /* DYNAMIC BOXES FILLED WITH CARDS */
                                    selectedTiles.map((tile, idx) => (
                                        <div key={idx} style={{ position: 'relative', width: '280px' }}>
                                            <img src="https://storage.googleapis.com/simple-bucket-27/gifr-box.png" style={{ width: '100%' }} />
                                            <div style={{ position: 'absolute', bottom: '38px', left: '15px', right: '15px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                                <img src={getLetterUrl(tile.charAt(0))} style={{ width: '42%', borderRadius: '4px', border: '1.5px solid gold', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }} />
                                                <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '42%', borderRadius: '4px', border: '1.5px solid gold', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }} />
                                            </div>
                                        </div>
                                    ))
                                )
                            ) : (
                                /* INITIAL STATE: LARGE BOX SUGGESTION */
                                <div style={{ textAlign: 'left', lineHeight: '2', fontSize: '1.2rem', width: '100%' }}>
                                     <div style={{ position: 'relative', width: '280px', margin: '0 auto 20px', animation: 'gentleWiggle 3s infinite ease-in-out' }}>
                                        <img src="https://storage.googleapis.com/simple-bucket-27/gifr-box.png" style={{ width: '100%' }} />
                                        <p style={{ position: 'absolute', top: '50%', width: '100%', textAlign: 'center', color: '#ff6600', fontWeight: 'bold' }}>Gift a Vibe</p>
                                    </div>
                                    {tokens.map((t, i) => {
                                        const clean = t.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                        const isSel = selectedTiles.includes(clean);
                                        return <span key={i} onClick={() => clean && setSelectedTiles(prev => isSel ? prev.filter(x => x !== clean) : [...prev, clean])} style={{ padding: '2px 6px', borderRadius: '6px', cursor: 'pointer', background: isSel ? '#ff6600' : 'transparent', color: isSel ? '#fff' : '#000' }}>{t}</span>
                                    })}
                                </div>
                            )}
                        </div>

                        {!isPreview && <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." style={{ width: '100%', height: '60px', marginTop: '15px', borderRadius: '15px', padding: '12px', border: '1px solid #ddd' }} />}
                        
                        <div style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                            <button onClick={() => setIsPreview(!isPreview)} style={{ background: '#eee', padding: '12px 25px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>{isPreview ? '✍️ Edit' : '👁️ Preview'}</button>
                            <button onClick={handleSend} style={{ background: '#ff6600', color: '#fff', padding: '12px 35px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Wrap & Send (0.99¢)</button>
                        </div>
                    </div>

                    <div style={{ marginLeft: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.85)', padding: '15px', borderRadius: '25px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                            {SCENES.map((s) => (
                                <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '50px', height: '50px', borderRadius: '12px', border: selectedScene.id === s.id ? '3px solid #ff6600' : '1px solid #ccc', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>{s.label}</button>
                            ))}
                        </div>
                        <button onClick={() => setIsCleanView(true)} style={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '20px', padding: '15px', cursor: 'pointer', fontSize: '1.8rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>👁️</button>
                    </div>
                </div>
            )}
            <style jsx>{`
                @keyframes gentleWiggle {
                    0%, 100% { transform: rotate(-2deg); }
                    50% { transform: rotate(2deg); }
                }
            `}</style>
        </main>
    );
}
