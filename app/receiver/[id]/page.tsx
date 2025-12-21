'use client'; // MUST be Line 1

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
        console.log("Wrapping vibe...");
        // This will connect to your /api/checkout/route.ts
    };

    const toggleTile = (word: string) => {
        if (selectedTiles.includes(word)) {
            setSelectedTiles(selectedTiles.filter(t => t !== word));
        } else if (selectedTiles.length < 2) {
            setSelectedTiles([...selectedTiles, word]);
        }
    };

    const tokens = message.split(/\s+/).filter(t => t.length > 0);

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            
            {/* 1. CINEMATIC BACKGROUND */}
            <video key={selectedScene.id} autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {/* 2. INTERACTIVE CORE */}
            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                {/* THE INTEGRATED INTERACTION BOX */}
                <div style={{ width: '100%', maxWidth: '500px', background: 'rgba(0,0,0,0.8)', padding: '30px', borderRadius: '30px', border: '2px solid #0070f3', textAlign: 'center', boxShadow: '0 0 40px rgba(0,112,243,0.4)' }}>
                    
                    {/* INTEGRATED HEADER SIGN */}
                    <h1 style={{ color: '#fff', fontSize: '2rem', margin: '0 0 5px 0', textShadow: '0 0 10px #0070f3' }}>
                        Sending a Heart in a Box
                    </h1>

                    {/* THE NEW TINY INSTRUCTION */}
                    <p style={{ color: '#0070f3', fontSize: '1rem', fontWeight: 'bold', fontStyle: 'italic', margin: '0 0 25px 0' }}>
                        click on one or two words to send them to the box:
                    </p>

                    {/* WORD SELECTION AREA */}
                    <div style={{ minHeight: '40px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '20px' }}>
                        {tokens.map((token, i) => (
                            <button key={i} onClick={() => toggleTile(token)} style={{ background: selectedTiles.includes(token) ? '#0070f3' : 'transparent', color: selectedTiles.includes(token) ? '#fff' : '#0070f3', border: '1px solid #0070f3', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer' }}>
                                {token}
                            </button>
                        ))}
                    </div>

                    {/* MESSAGE INPUT */}
                    <textarea 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your secret message here..."
                        style={{ width: '100%', height: '80px', background: 'rgba(255,255,255,0.05)', border: '1px solid #333', borderRadius: '12px', color: '#fff', padding: '12px', marginBottom: '25px', outline: 'none' }}
                    />

                    {/* BOX & LETTERS */}
                    <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
                        <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '200px' }} />
                        <div style={{ position: 'absolute', bottom: '40px', display: 'flex', gap: '10px' }}>
                            {selectedTiles.map((tile, i) => (
                                <img key={i} src={getLetterUrl(tile.charAt(0))} style={{ width: '45px', border: '2px solid #0070f3', borderRadius: '5px' }} />
                            ))}
                        </div>
                    </div>

                    {/* WRAP BUTTON (0.99¢) */}
                    <button onClick={handleWrap} style={{ background: '#0070f3', color: '#fff', border: 'none', padding: '15px 50px', borderRadius: '50px', fontSize: '1.4rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 20px #0070f3' }}>
                        Wrap Message (0.99¢)
                    </button>
                </div>

                {/* SCENE SELECTOR GRID (Right Side) */}
                <div style={{ marginLeft: '40px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', background: 'rgba(0,0,0,0.6)', padding: '15px', borderRadius: '20px', border: '1px solid #333' }}>
                    {SCENES.map(scene => (
                        <button key={scene.id} onClick={() => setSelectedScene(scene)} style={{ width: '50px', height: '50px', borderRadius: '10px', background: selectedScene.id === scene.id ? '#0070f3' : '#222', color: '#fff', border: 'none', cursor: 'pointer' }}>
                            {scene.label}
                        </button>
                    ))}
                </div>
            </div>
        </main>
    );
}
