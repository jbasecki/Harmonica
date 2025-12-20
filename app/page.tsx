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
                    <div style={{ background: '#fff', padding: '15px 25px', borderRadius: '50px', fontWeight: 'bold', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>✍️ Tap to return to Editor</div>
                </div>
            )}

            {!isCleanView && (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* CARD: Reduced padding from 30px to 10px to minimize white space */}
                    <div style={{ background: 'rgba(255,255,255,0.96)', padding: '10px 20px 20px', borderRadius: '50px', width: '95%', maxWidth: isPreview ? '950px' : '700px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', transition: 'max-width 0.3s' }}>
                        
                        <div style={{ minHeight: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                            
                            {/* BOX: Enlarged to 580px to fill the card */}
                            <div style={{ 
                                position: 'relative', 
                                width: '580px', 
                                animation: isBoxEmpty ? 'slowWiggle 6s infinite ease-in-out' : 'none',
                                pointerEvents: 'none' 
                            }}>
                                <img src="https://storage.googleapis.com/simple-bucket-27/gifr-box.png" style={{ width: '100%' }} />
                                
                                <p style={{ position: 'absolute', bottom: '15px', width: '100%', textAlign: 'center', color: '#ff6600', fontWeight: 'bold', fontSize: '2.2rem', textShadow: '2px 2px 4px rgba(255,255,255,0.8)' }}>Send a Vibe</p>
                                
                                {/* LETTERS: Scaled up to 115px for the massive box */}
                                <div style={{ position: 'absolute', bottom: '80px', left: '5%', right: '5%', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                                    {selectedTiles.map((tile, idx) => (
                                        <div key={idx} style={{ display: 'flex', gap: '10px' }}>
                                            <img src={getLetterUrl(tile.charAt(0))} style={{ width: '115px', borderRadius: '12px', border: '3px solid gold', boxShadow: '0 8px 20px rgba(0,0,0,0.4)' }} />
                                            <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '115px', borderRadius: '12px', border: '3px solid gold', boxShadow: '0 8px 20px rgba(0,0,0,0.4)' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {!isPreview && (
                            <div style={{ position: 'relative', zIndex: 20 }}>
                                <div style={{ textAlign: 'left', lineHeight: '1.4', fontSize: '1.2rem', marginBottom: '10px', maxHeight: '50px', overflowY: 'auto', background: 'rgba(255,255,255,0.5)', padding: '5px 10px', borderRadius: '10px' }}>
                                    {tokens.map((t, i) => {
                                        const clean = t.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                        const isSel = selectedTiles.includes(clean);
                                        return <span key={i} onClick={() => clean && setSelectedTiles(prev => isSel ? prev.filter(x => x !== clean) : [...prev, clean])} style={{ padding: '2px 4px', borderRadius: '4px', cursor: 'pointer', background: isSel ? '#ff6600' : 'transparent', color: isSel ? '#fff' : '#000' }}>{t}</span>
                                    })}
                                </div>
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." style={{ width: '100%', height: '40px', borderRadius: '12px', padding: '10px', border: '1px solid #ddd', fontSize: '1.1rem' }} />
                            </div>
                        )}
                        
                        <div style={{ marginTop: '15px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                            <button onClick={() => setIsPreview(!isPreview)} style={{ background: '#eee', padding: '10px 30px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>{isPreview ? '✍️ Edit' : '👁️ Preview'}</button>
                            <button onClick={handleSend} style={{ background: '#ff6600', color: '#fff', padding: '10px 45px', borderRadius: '50px', border: 'none', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer' }}>Wrap & Send (0.99¢)</button>
                        </div>
                    </div>

                    {/* SIDEBAR GRID */}
                    <div style={{ marginLeft: '40px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.85)', padding: '15px', borderRadius: '25px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                            {SCENES.map((s) => (
                                <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '60px', height: '60px', borderRadius: '18px', border: selectedScene.id === s.id ? '4px solid #ff6600' : '1px solid #ccc', background: '#fff', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}>{s.label}</button>
                            ))}
                        </div>
                        <button onClick={() => setIsCleanView(true)} style={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '25px', padding: '20px', cursor: 'pointer', fontSize: '2.5rem' }}>👁️</button>
                    </div>
                </div>
            )}
            <style jsx>{`
                @keyframes slowWiggle {
                    0%, 100% { transform: rotate(-1.5deg) scale(1); }
                    50% { transform: rotate(1.5deg) scale(1.02); }
                }
            `}</style>
        </main>
    );
}
