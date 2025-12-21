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
            console.error("Payment failed:", err);
        }
    };

    const toggleTile = (word: string) => {
        const cleanWord = word.replace(/[.,!?;]/g, "");
        if (selectedTiles.includes(cleanWord)) {
            setSelectedTiles(selectedTiles.filter(t => t !== cleanWord));
        } else if (selectedTiles.length < 2) {
            setSelectedTiles([...selectedTiles, cleanWord]);
        }
    };

    const tokens = message.split(/\s+/).filter(t => t.length > 0);

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            
            {/* BACKGROUND SCENE */}
            <video key={selectedScene.id} autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* 1. THE KING: BLUE BOX & RHOMBOID TILES */}
                <div style={{ position: 'relative', width: '450px', display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                    <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '100%', filter: 'drop-shadow(0 0 20px #0070f3)' }} />
                    
                    {/* RHOMBOID LETTER LAYER */}
                    <div style={{ position: 'absolute', bottom: '80px', display: 'flex', gap: '15px', perspective: '1000px' }}>
                        {selectedTiles.map((tile, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <img src={getLetterUrl(tile.charAt(0))} style={{ width: '65px', borderRadius: '5px', border: '2px solid #0070f3', boxShadow: '0 0 15px #0070f3', transform: 'rotateY(20deg) skewY(-4deg)' }} />
                                    <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '65px', borderRadius: '5px', border: '2px solid #0070f3', boxShadow: '0 0 15px #0070f3', transform: 'rotateY(-20deg) skewY(4deg)' }} />
                                </div>
                                {/* THE IMPORTANT TRANSLATION TAG */}
                                <span style={{ color: '#0070f3', fontSize: '0.8rem', fontWeight: 'bold', background: 'rgba(0,0,0,0.8)', padding: '2px 8px', borderRadius: '8px', marginTop: '8px' }}>{tile}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. THE COMPOSING AREA */}
                <div style={{ width: '90%', maxWidth: '550px', background: 'rgba(0,0,0,0.7)', padding: '25px', borderRadius: '20px', border: '1px solid #333', textAlign: 'center' }}>
                    
                    <p style={{ color: '#0070f3', fontSize: '1rem', fontWeight: 'bold', marginBottom: '15px' }}>
                        click on some words to send them to the gift box
                    </p>

                    <div style={{ minHeight: '40px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
                        {tokens.map((token, i) => {
                            const clean = token.replace(/[.,!?;]/g, "");
                            return (
                                <button key={i} onClick={() => toggleTile(clean)} style={{ background: selectedTiles.includes(clean) ? '#0070f3' : 'transparent', color: selectedTiles.includes(clean) ? '#fff' : '#0070f3', border: '1px solid #0070f3', borderRadius: '8px', padding: '5px 12px', cursor: 'pointer' }}>
                                    {token}
                                </button>
                            );
                        })}
                    </div>

                    <textarea 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message..."
                        style={{ width: '100%', height: '70px', background: 'rgba(255,255,255,0.05)', border: '1px solid #444', borderRadius: '10px', color: '#fff', padding: '10px', marginBottom: '20px', outline: 'none' }}
                    />

                    <button onClick={handleWrap} style={{ background: '#0070f3', color: '#fff', border: 'none', padding: '15px 60px', borderRadius: '50px', fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 20px #0070f3' }}>
                        WRAP MESSAGE
                    </button>
                </div>

                {/* SCENE SELECTOR (Bottom Right) */}
                <div style={{ position: 'absolute', bottom: '20px', right: '20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', background: 'rgba(0,0,0,0.6)', padding: '10px', borderRadius: '15px' }}>
                    {SCENES.map(scene => (
                        <button key={scene.id} onClick={() => setSelectedScene(scene)} style={{ width: '40px', height: '40px', borderRadius: '8px', background: selectedScene.id === scene.id ? '#0070f3' : '#222', color: '#fff', border: 'none', cursor: 'pointer' }}>
                            {scene.label}
                        </button>
                    ))}
                </div>
            </div>
        </main>
    );
}
