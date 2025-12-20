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
                <div onClick={() => setIsCleanView(false)} style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 100, cursor: 'pointer', background: 'rgba(255,255,255,0.9)', padding: '15px', borderRadius: '50%', boxShadow: '0 0 20px gold' }}>
                    <span style={{ fontSize: '2.5rem' }}>✍️</span>
                </div>
            )}

            {!isCleanView && (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Fixed narrow width for the entire central stack */}
                    <div style={{ width: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        
                        {/* COMPACT BOX AREA: Exact 320x320 Square */}
                        <div style={{ position: 'relative', width: '320px', height: '320px', background: 'white', borderRadius: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', boxShadow: '0 0 20px gold' }}>
                            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <img src="https://storage.googleapis.com/simple-bucket-27/gifr-box.png" 
                                     style={{ width: '85%', filter: 'hue-rotate(320deg) saturate(3) drop-shadow(0 0 8px gold)' }} />
                                
                                {selectedTiles.length > 0 && (
                                    <>
                                        {/* Gift Bow */}
                                        <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', fontSize: '3.5rem', filter: 'drop-shadow(0 0 8px gold)', zIndex: 5 }}>🎀</div>
                                        
                                        <div style={{ position: 'absolute', bottom: '45px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                            {selectedTiles.map((tile, idx) => (
                                                <div key={idx} style={{ display: 'flex', gap: '4px' }}>
                                                    <img src={getLetterUrl(tile.charAt(0))} style={{ width: '65px', borderRadius: '8px', border: '2px solid gold', boxShadow: '0 0 15px gold' }} />
                                                    <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '65px', borderRadius: '8px', border: '2px solid gold', boxShadow: '0 0 15px gold' }} />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* RED BUTTON: Anchored and fitted to width */}
                        <button onClick={handleSend} style={{ width: '100%', marginTop: '-20px', background: '#ff0000', color: '#fff', padding: '12px 0', borderRadius: '50px', border: 'none', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', boxShadow: '0 0 15px rgba(255,0,0,0.8)', zIndex: 30 }}>
                            Send a Vibe
                        </button>

                        {/* SYMMETRICAL COMPACT INPUT LINES: Matched to 320px */}
                        {!isPreview && (
                            <div style={{ width: '320px', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ background: '#fff', padding: '10px 15px', borderRadius: '12px', minHeight: '40px', textAlign: 'left', fontSize: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', width: '100%', overflowX: 'hidden' }}>
                                    {tokens.map((t, i) => {
                                        const clean = t.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                        const isSel = selectedTiles.includes(clean);
                                        return <span key={i} onClick={() => clean && setSelectedTiles(prev => isSel ? prev.filter(x => x !== clean) : [...prev, clean])} 
                                                     style={{ padding: '1px 3px', borderRadius: '3px', cursor: 'pointer', background: isSel ? '#ff0000' : 'transparent', color: isSel ? '#fff' : '#000' }}>{t}</span>
                                    })}
                                </div>
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." 
                                          style={{ width: '100%', height: '40px', borderRadius: '12px', padding: '10px 15px', border: 'none', background: '#fff', fontSize: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', resize: 'none' }} />
                                
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
                                    <button onClick={() => setIsPreview(!isPreview)} style={{ background: '#fff', width: '45px', height: '45px', borderRadius: '50%', border: 'none', cursor: 'pointer', fontSize: '1.4rem', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                                        👁️
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* SIDEBAR GRID - Unaffected */}
                    <div style={{ position: 'absolute', right: '40px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', padding: '12px', borderRadius: '25px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', border: '1px solid gold' }}>
                            {SCENES.map((s) => (
                                <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '50px', height: '50px', borderRadius: '12px', border: selectedScene.id === s.id ? '2px solid gold' : '1px solid rgba(255,255,255,0.3)', background: selectedScene.id === s.id ? '#fff' : 'rgba(0,0,0,0.5)', color: selectedScene.id === s.id ? '#000' : '#fff', cursor: 'pointer', fontWeight: 'bold' }}>{s.label}</button>
                            ))}
                        </div>
                        <button onClick={() => setIsCleanView(true)} style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid gold', borderRadius: '25px', padding: '15px', cursor: 'pointer', fontSize: '2rem', color: '#fff' }}>👁️</button>
                    </div>
                </div>
            )}
        </main>
    );
}
