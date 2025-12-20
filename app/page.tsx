'use client';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

// Using your exact 12 working videos
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
            {/* Full-screen clean videos */}
            <video key={selectedScene.id} autoPlay loop playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* 12-Video Grid Menu on Right */}
                {!isPreview && (
                    <div style={{ position: 'absolute', right: '20px', background: 'rgba(255,255,255,0.85)', padding: '15px', borderRadius: '25px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                        {SCENES.map((scene) => (
                            <button key={scene.id} onClick={() => setSelectedScene(scene)} style={{
                                width: '50px', height: '50px', borderRadius: '12px', border: selectedScene.id === scene.id ? '3px solid #ff6600' : '1px solid #ccc',
                                background: selectedScene.id === scene.id ? '#fff' : 'rgba(255,255,255,0.5)', cursor: 'pointer', fontWeight: 'bold'
                            }}>{scene.label}</button>
                        ))}
                    </div>
                )}

                <div style={{ background: 'rgba(255,255,255,0.96)', padding: '40px', borderRadius: '50px', width: '95%', maxWidth: '550px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }}>
                    <h2 style={{ margin: '0 0 10px 0' }}>{isPreview ? "👁️ Preview" : "Vibe Greeting Shop"}</h2>
                    
                    <div style={{ minHeight: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {isPreview ? (
                            <div style={{ position: 'relative' }}>
                                {/* Gift box placeholder */}
                                <img src="https://storage.googleapis.com/simple-bucket-27/gifr-box.png" style={{ width: '280px' }} />
                                <div style={{ position: 'absolute', bottom: '40px', width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                    {selectedTiles.slice(0, 2).map((tile, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '2px' }}>
                                            <img src={getLetterUrl(tile.charAt(0))} style={{ width: '55px', borderRadius: '5px', border: '1px solid gold' }} />
                                            <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '55px', borderRadius: '5px', border: '1px solid gold' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'left', fontSize: '1.2rem', lineHeight: '1.8' }}>
                                {tokens.map((token, i) => {
                                    const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                    const isSelected = selectedTiles.includes(clean);
                                    return (
                                        <span key={i} onClick={() => {
                                            if (!clean) return;
                                            setSelectedTiles(prev => isSelected ? prev.filter(t => t !== clean) : [...prev, clean]);
                                        }} style={{ padding: '2px 6px', borderRadius: '6px', cursor: 'pointer', background: isSelected ? '#ff6600' : 'transparent', color: isSelected ? '#fff' : '#000' }}>{token}</span>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {!isPreview && <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." style={{ width: '100%', height: '70px', marginTop: '15px', borderRadius: '12px', padding: '12px', border: '1px solid #ddd' }} />}
                    
                    <div style={{ marginTop: '25px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                        <button onClick={() => setIsPreview(!isPreview)} style={{ background: '#eee', padding: '12px 25px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>{isPreview ? '✍️ Edit' : '👁️ Preview'}</button>
                        <button onClick={handleSend} style={{ background: '#ff6600', color: '#fff', padding: '12px 35px', borderRadius: '50px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>Wrap & Send (0.99¢)</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
