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
                body: JSON.stringify({ message, tiles: selectedTiles, sceneId: selectedScene.id }),
            });
            const session = await response.json();
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
            if (stripe) await stripe.redirectToCheckout({ sessionId: session.id });
        } catch (err) { console.error("Checkout Error:", err); }
    };

    const toggleTile = (word: string) => {
        const clean = word.replace(/[.,!?;]/g, "");
        if (selectedTiles.includes(clean)) {
            setSelectedTiles(selectedTiles.filter(t => t !== clean));
        } else if (selectedTiles.length < 2) {
            setSelectedTiles([...selectedTiles, clean]);
        }
    };

    const tokens = message.split(/\s+/).filter(t => t.length > 0);

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            <video key={selectedScene.id} autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {/* THE BOX & HORIZONTAL WORDS */}
            <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', zIndex: 5, width: '400px', textAlign: 'center' }}>
                <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '100%' }} />
                
                {/* FLEX CONTAINER FOR HORIZONTAL ALIGNMENT */}
                <div style={{ position: 'absolute', bottom: '60px', left: '0', right: '0', display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '10px', flexWrap: 'nowrap' }}>
                    {selectedTiles.map((tile, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px' }}>
                                <img src={getLetterUrl(tile.charAt(0))} style={{ width: '60px', transform: 'rotateY(20deg) skewY(-4deg)', border: '2px solid #0070f3' }} />
                                <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '60px', transform: 'rotateY(-20deg) skewY(4deg)', border: '2px solid #0070f3' }} />
                            </div>
                            <span style={{ color: '#0070f3', fontSize: '0.8rem', background: 'rgba(0,0,0,0.8)', padding: '2px 5px', marginTop: '5px' }}>{tile}</span>
                        </div>
                    ))}
                </div>
            </div>

            {!isPreview && (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: '30px' }}>
                    <div style={{ width: '450px', background: 'rgba(0,0,0,0.7)', padding: '20px', borderRadius: '20px', textAlign: 'center' }}>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '15px' }}>
                            {tokens.map((t, i) => (
                                <button key={i} onClick={() => toggleTile(t)} style={{ background: selectedTiles.includes(t.replace(/[.,!?;]/g, "")) ? '#0070f3' : 'transparent', color: '#fff', border: '1px solid #0070f3', padding: '4px 10px' }}>{t}</button>
                            ))}
                        </div>

                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} style={{ width: '100%', height: '50px', background: 'rgba(0,0,0,0.5)', color: '#fff', marginBottom: '15px' }} />
                        
                        {/* UPDATED INSTRUCTION BUTTON */}
                        <button onClick={handleWrap} style={{ background: '#0070f3', color: '#fff', padding: '12px 20px', borderRadius: '50px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                            Click on a word or two to send them to the gift box!
                        </button>
                    </div>

                    <div style={{ position: 'absolute', top: '20%', right: '20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '15px' }}>
                        {SCENES.map(s => (
                            <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '45px', height: '45px', background: selectedScene.id === s.id ? '#0070f3' : '#222', color: '#fff' }}>{s.label}</button>
                        ))}
                    </div>
                </div>
            )}

            {/* SEPARATE EYE FOR PREVIEW */}
            <button onClick={() => setIsPreview(!isPreview)} style={{ position: 'absolute', bottom: '30px', right: '30px', zIndex: 20, background: 'rgba(0,0,0,0.6)', border: '1px solid #0070f3', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <span style={{ fontSize: '1.5rem' }}>{isPreview ? '🚫' : '👁️'}</span>
            </button>
        </main>
    );
}
