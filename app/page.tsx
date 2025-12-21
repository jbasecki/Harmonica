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

    const tokens = message.split(/(\s+)/);
    const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            {/* Cinematic Background Video */}
            <video key={selectedScene.id} autoPlay loop playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                    {/* Header: Visible only in Preview Mode */}
                    {isPreview && <h2 style={{ color: '#fff', marginBottom: '15px', textShadow: '0 0 10px #0070f3' }}>👁️ This is what your friend will see</h2>}

                    {/* CENTRAL BOX AREA */}
                    <div style={{ position: 'relative', width: '450px', minHeight: '400px', background: 'rgba(0,0,0,0.5)', borderRadius: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #0070f3', perspective: '1000px', boxShadow: '0 0 30px rgba(0,112,243,0.4)' }}>
                        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '90%', filter: 'drop-shadow(0 0 15px rgba(0, 112, 243, 0.6))' }} />
                            
                            {selectedTiles.length > 0 && (
                                <div style={{ position: 'absolute', bottom: '70px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                    {selectedTiles.map((tile, idx) => (
                                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                <img src={getLetterUrl(tile.charAt(0))} style={{ width: '80px', borderRadius: '5px', border: '2px solid #0070f3', boxShadow: '0 0 15px #0070f3', transform: 'rotateY(20deg) skewY(-4deg)' }} />
                                                <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '80px', borderRadius: '5px', border: '2px solid #0070f3', boxShadow: '0 0 15px #0070f3', transform: 'rotateY(-20deg) skewY(4deg)' }} />
                                            </div>
                                            <span style={{ color: '#0070f3', fontSize: '0.9rem', fontWeight: 'bold', background: 'rgba(0,0,0,0.7)', padding: '2px 8px', borderRadius: '10px', marginTop: '5px' }}>{tile}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* MAIN CTA */}
                    <button onClick={() => setIsPreview(!isPreview)} style={{ width: '450px', marginTop: '-25px', background: '#0070f3', color: '#fff', padding: '15px 0', borderRadius: '50px', border: 'none', fontWeight: 'bold', fontSize: '1.4rem', cursor: 'pointer', zIndex: 30, boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>
                        {isPreview ? "✍️ Edit Message" : "Wrap Message"}
                    </button>

                    {/* SYMMETRICAL WRITING AREA */}
                    {!isPreview && (
                        <div style={{ width: '650px', marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ background: 'rgba(0,0,0,0.85)', color: '#fff', padding: '15px 25px', borderRadius: '15px', border: '1px solid #0070f3', width: '100%', minHeight: '55px' }}>
                                {tokens.map((t, i) => {
                                    const clean = t.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                    const isSel = selectedTiles.includes(clean);
                                    return <span key={i} onClick={() => clean && setSelectedTiles(prev => isSel ? prev.filter(x => x !== clean) : [...prev, clean])} style={{ padding: '2px 5px', borderRadius: '5px', cursor: 'pointer', background: isSel ? '#0070f3' : 'transparent', color: '#fff' }}>{t}</span>
                                })}
                            </div>
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." style={{ width: '100%', height: '60px', borderRadius: '15px', padding: '15px 25px', border: '1px solid #0070f3', background: 'rgba(0,0,0,0.85)', color: '#fff', fontSize: '1.2rem', resize: 'none' }} />
                        </div>
                    )}
                </div>

                {/* SIDEBAR GRID WITH RESTORED EYE */}
                <div style={{ position: 'absolute', right: '50px', top: '15%', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                    <div style={{ background: 'rgba(0,0,0,0.8)', padding: '20px', borderRadius: '35px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', border: '2px solid #0070f3' }}>
                        {SCENES.map((s) => (
                            <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '65px', height: '65px', borderRadius: '18px', border: selectedScene.id === s.id ? '3px solid #fff' : '1px solid rgba(255,255,255,0.2)', background: selectedScene.id === s.id ? '#0070f3' : 'rgba(0,0,0,0.5)', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>{s.label}</button>
                        ))}
                    </div>
                    
                    {/* The Restored Eye Toggle */}
                    <button onClick={() => setIsPreview(!isPreview)} style={{ background: 'rgba(0,0,0,0.8)', border: '2px solid #0070f3', borderRadius: '30px', padding: '15px 30px', cursor: 'pointer', fontSize: '2.5rem', color: '#fff', boxShadow: '0 0 15px rgba(0,112,243,0.3)' }}>
                        {isPreview ? "✍️" : "👁️"}
                    </button>
                </div>
            </div>
        </main>
    );
}
