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

    const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

    const handleWrap = async () => {
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: message,
                    tiles: selectedTiles,
                    sceneId: selectedScene.id
                }),
            });
            const session = await response.json();
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
            if (stripe) {
                await stripe.redirectToCheckout({ sessionId: session.id });
            }
        } catch (err) {
            console.error("Payment connection failed:", err);
        }
    };

    const toggleTile = (word: string) => {
        const clean = word.replace(/[.,!?;]/g, "");
        if (selectedTiles.includes(clean)) {
            // This fix ensures you can delete tiles by clicking them again
            setSelectedTiles(selectedTiles.filter(t => t !== clean));
        } else if (selectedTiles.length < 2) {
            setSelectedTiles([...selectedTiles, clean]);
        }
    };

    const tokens = message.split(/\s+/).filter(t => t.length > 0);

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            
            {/* BACKGROUND VIDEO */}
            <video key={selectedScene.id} autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {/* THE KING: BLUE BOX & ORIGINAL SCALE TILES */}
            <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', zIndex: 5, width: '400px', display: 'flex', justifyContent: 'center' }}>
                <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '100%', filter: 'drop-shadow(0 0 15px #0070f3)' }} />
                
                <div style={{ position: 'absolute', bottom: '60px', display: 'flex', gap: '10px', perspective: '1000px' }}>
                    {selectedTiles.map((tile, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <img src={getLetterUrl(tile.charAt(0))} style={{ width: '60px', borderRadius: '5px', border: '2px solid #0070f3', boxShadow: '0 0 10px #0070f3', transform: 'rotateY(20deg) skewY(-4deg)' }} />
                                <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '60px', borderRadius: '5px', border: '2px solid #0070f3', boxShadow: '0 0 10px #0070f3', transform: 'rotateY(-20deg) skewY(4deg)' }} />
                            </div>
                            <span style={{ color: '#0070f3', fontSize: '0.8rem', fontWeight: 'bold', background: 'rgba(0,0,0,0.8)', padding: '2px 8px', borderRadius: '8px', marginTop: '5px' }}>{tile}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* INTERFACE (Hides during Preview) */}
            {!isPreview && (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '30px' }}>
                    
                    <div style={{ width: '90%', maxWidth: '450px', background: 'rgba(0,0,0,0.7)', padding: '20px', borderRadius: '20px', border: '1px solid #333', textAlign: 'center' }}>
                        <p style={{ color: '#0070f3', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '10px' }}>click on some words to send them to the gift box</p>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '15px' }}>
                            {tokens.map((token, i) => {
                                const clean = token.replace(/[.,!?;]/g, "");
                                return (
                                    <button key={i} onClick={() => toggleTile(clean)} style={{ background: selectedTiles.includes(clean) ? '#0070f3' : 'transparent', color: selectedTiles.includes(clean) ? '#fff' : '#0070f3', border: '1px solid #0070f3', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '0.9rem' }}>
                                        {token}
                                    </button>
                                );
                            })}
                        </div>

                        <textarea 
                            value={message} onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message here..."
                            style={{ width: '100%', height: '50px', background: 'rgba(255,255,255,0.05)', border: '1px solid #444', borderRadius: '8px', color: '#fff', padding: '8px', marginBottom: '15px', outline: 'none' }}
                        />

                        <button onClick={handleWrap} style={{ background: '#0070f3', color: '#fff', border: 'none', padding: '12px 40px', borderRadius: '50px', fontSize: '1.3rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 15px #0070f3' }}>
                            WRAP MESSAGE
                        </button>
                    </div>

                    {/* SCENE SELECTOR GRID */}
                    <div style={{ position: 'absolute', top: '20%', right: '20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '15px' }}>
                        {SCENES.map(scene => (
                            <button key={scene.id} onClick={() => setSelectedScene(scene)} style={{ width: '45px', height: '45px', borderRadius: '10px', background: selectedScene.id === scene.id ? '#0070f3' : '#222', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>{scene.label}</button>
                        ))}
                    </div>
                </div>
            )}

            {/* PREVIEW EYE */}
            <button 
                onClick={() => setIsPreview(!isPreview)}
                style={{ position: 'absolute', bottom: '30px', right: '30px', zIndex: 20, background: 'rgba(0,0,0,0.6)', border: '1px solid #0070f3', borderRadius: '50%', width: '60px', height: '60px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <span style={{ fontSize: '1.5rem' }}>{isPreview ? '🚫' : '👁️'}</span>
            </button>
        </main>
    );
}
