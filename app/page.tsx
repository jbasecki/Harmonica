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

            {/* Hand Icon Return */}
            {isCleanView && (
                <div onClick={() => setIsCleanView(false)} style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 100, cursor: 'pointer', background: 'rgba(0,0,0,0.85)', padding: '15px', borderRadius: '50%', boxShadow: '0 0 20px gold', border: '1px solid gold' }}>
                    <span style={{ fontSize: '2.5rem' }}>✍️</span>
                </div>
            )}

            {!isCleanView && (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        
                        {/* COMPACT BOX: 400px width */}
                        <div style={{ position: 'relative', width: '400px', minHeight: '350px', background: 'rgba(0,0,0,0.8)', borderRadius: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid gold', boxShadow: '0 0 30px rgba(0,0,0,0.5)' }}>
                            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <img src="https://storage.googleapis.com/simple-bucket-27/re-box.png" 
                                     style={{ width: '90%', filter: 'drop-shadow(0 0 10px gold)' }} />
                                
                                {selectedTiles.length > 0 && (
                                    <div style={{ position: 'absolute', bottom: '60px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                        {selectedTiles.map((tile, idx) => (
                                            <div key={idx} style={{ display: 'flex', gap: '5px' }}>
                                                <img src={getLetterUrl(tile.charAt(0))} style={{ width: '80px', borderRadius: '10px', border: '2px solid gold', boxShadow: '0 0 15px gold' }} />
                                                <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '80px', borderRadius: '10px', border: '2px solid gold', boxShadow: '0 0 15px gold' }} />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RED BUTTON: Anchored */}
                        <button onClick={handleSend} style={{ width: '400px', marginTop: '-25px', background: '#e60073', color: '#fff', padding: '15px 0', borderRadius: '50px', border: 'none', fontWeight: 'bold', fontSize: '1.5rem', cursor: 'pointer', boxShadow: '0 0 25px rgba(230,0,115,0.8)', zIndex: 30 }}>
                            Send a Vibe
                        </button>

                        {/* WIDER WRITING LINES: 650px width */}
                        {!isPreview && (
                            <div style={{ width: '650px', marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <div style={{ background: 'rgba(0,0,0,0.85)', color: '#fff', padding: '15px 25px', borderRadius: '15px', minHeight: '55px', textAlign: 'left', fontSize: '1.3rem', border: '1px solid gold' }}>
                                    {tokens.map((t, i) => {
                                        const clean = t.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                        const isSel = selectedTiles.includes(clean);
                                        return <span key={i} onClick={() => clean && setSelectedTiles(prev => isSel ? prev.filter(x => x !== clean) : [...prev, clean])} 
                                                     style={{ padding: '2px 5px', borderRadius: '5px', cursor: 'pointer', background: isSel ? '#e60073' : 'transparent', color: '#fff' }}>{t}</span>
                                    })}
                                </div>
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." 
                                          style={{ width: '100%', height: '60px', borderRadius: '15px', padding: '15px 25px', border: '1px solid gold', background: 'rgba(0,0,0,0.85)', color: '#fff', fontSize: '1.2rem', resize: 'none' }} />
                                
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                    <button onClick={() => setIsPreview(!isPreview)} style={{ background: 'rgba(0,0,0,0.85)', width: '65px', height: '65px', borderRadius: '50%', border: '1px solid gold', cursor: 'pointer', fontSize: '1.8rem', color: '#fff' }}>
                                        👁️
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div style={{ position: 'absolute', right: '50px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', padding: '20px', borderRadius: '35px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', border: '2px solid gold' }}>
                            {SCENES.map((s) => (
                                <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '65px', height: '65px', borderRadius: '18px', border: selectedScene.id === s.id ? '3px solid gold' : '1px solid rgba(255,255,255,0.2)', background: selectedScene.id === s.id ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.5)', color: selectedScene.id === s.id ? '#000' : '#fff', cursor: 'pointer', fontWeight: 'bold' }}>{s.label}</button>
                            ))}
                        </div>
                        <button onClick={() => setIsCleanView(true)} style={{ background: 'rgba(0,0,0,0.8)', border: '2px solid gold', borderRadius: '35px', padding: '25px', cursor: 'pointer', fontSize: '2.8rem', color: '#fff' }}>👁️</button>
                    </div>
                </div>
            )}
        </main>
    );
}
