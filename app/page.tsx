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
    const isBoxEmpty = selectedTiles.length === 0;

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
                    <div style={{ background: '#fff', padding: '15px 25px', borderRadius: '50px', fontWeight: 'bold' }}>✍️ Back to Vibe Shop</div>
                </div>
            )}

            {!isCleanView && (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* TRANSPARENT CONTAINER: Replaces the white card */}
                    <div style={{ padding: '20px', width: '95%', maxWidth: isPreview ? '1100px' : '800px', textAlign: 'center', transition: 'max-width 0.3s' }}>
                        
                        <div style={{ minHeight: '550px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                            
                            {/* MASSIVE WIGGLING BOX: Floating in space */}
                            <div style={{ 
                                position: 'relative', 
                                width: '650px', 
                                animation: isBoxEmpty ? 'slowWiggle 6s infinite ease-in-out' : 'none',
                                pointerEvents: 'none' 
                            }}>
                                <img src="https://storage.googleapis.com/simple-bucket-27/gifr-box.png" style={{ width: '100%' }} />
                                <p style={{ position: 'absolute', bottom: '15px', width: '100%', textAlign: 'center', color: '#ff6600', fontWeight: 'bold', fontSize: '3rem', textShadow: '0 0 10px rgba(255,255,255,0.9), 2px 2px 4px rgba(0,0,0,0.5)' }}>Send a Vibe</p>
                                
                                <div style={{ position: 'absolute', bottom: '100px', left: '5%', right: '5%', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                                    {selectedTiles.map((tile, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '10px' }}>
                                            <img src={getLetterUrl(tile.charAt(0))} style={{ width: '135px', borderRadius: '15px', border: '4px solid gold', boxShadow: '0 10px 30px rgba(0,0,0,0.6)' }} />
                                            <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '135px', borderRadius: '15px', border: '4px solid gold', boxShadow: '0 10px 30px rgba(0,0,0,0.6)' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {!isPreview && (
                            <div style={{ position: 'relative', zIndex: 20 }}>
                                {/* WHITE WRITING LINES: Only white part of the UI */}
                                <div style={{ textAlign: 'left', lineHeight: '1.2', fontSize: '1.3rem', marginBottom: '10px', maxHeight: '50px', overflowY: 'auto', background: 'rgba(255,255,255,0.95)', padding: '10px 20px', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }}>
                                    {tokens.map((t, i) => {
                                        const clean = t.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                        const isSel = selectedTiles.includes(clean);
                                        return <span key={i} onClick={() => clean && setSelectedTiles(prev => isSel ? prev.filter(x => x !== clean) : [...prev, clean])} style={{ padding: '2px 5px', borderRadius: '5px', cursor: 'pointer', background: isSel ? '#ff6600' : 'transparent', color: isSel ? '#fff' : '#000' }}>{t}</span>
                                    })}
                                </div>
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." style={{ width: '100%', height: '40px', borderRadius: '15px', padding: '10px 20px', border: 'none', background: 'rgba(255,255,255,0.95)', fontSize: '1.1rem', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }} />
                            </div>
                        )}
                        
                        <div style={{ marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
                            <button onClick={() => setIsPreview(!isPreview)} style={{ background: 'rgba(255,255,255,0.9)', padding: '12px 30px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>{isPreview ? '✍️ Edit' : '👁️ Preview'}</button>
                            <button onClick={handleSend} style={{ background: '#ff6600', color: '#fff', padding: '12px 50px', borderRadius: '50px', border: 'none', fontWeight: 'bold', fontSize: '1.3rem', cursor: 'pointer', boxShadow: '0 5px 20px rgba(255,102,0,0.4)' }}>Wrap & Send (0.99¢)</button>
                        </div>
                    </div>

                    {/* SIDEBAR */}
                    <div style={{ marginLeft: '50px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '15px', borderRadius: '30px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', border: '1px solid rgba(255,255,255,0.3)' }}>
                            {SCENES.map((s) => (
                                <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '65px', height: '65px', borderRadius: '20px', border: selectedScene.id === s.id ? '4px solid gold' : '1px solid rgba(255,255,255,0.5)', background: selectedScene.id === s.id ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.5)', color: selectedScene.id === s.id ? '#000' : '#fff', cursor: 'pointer', fontWeight: 'bold' }}>{s.label}</button>
                            ))}
                        </div>
                        <button onClick={() => setIsCleanView(true)} style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '30px', padding: '25px', cursor: 'pointer', fontSize: '3rem', color: '#fff' }}>👁️</button>
                    </div>
                </div>
            )}
            <style jsx>{`
                @keyframes slowWiggle {
                    0%, 100% { transform: rotate(-2deg) scale(1); }
                    50% { transform: rotate(2deg) scale(1.03); }
                }
            `}</style>
        </main>
    );
}
