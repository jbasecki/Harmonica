'use client';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const SCENES = [
    { id: 'loveisall', name: 'Love' }, { id: 'winter-daffodil', name: 'Winter' },
    { id: 'goldenglow', name: 'Glow' }, { id: 'midnight', name: 'Sparkle' },
    { id: 'my-little', name: 'Little' }, { id: 'magic', name: 'Magic' },
    { id: 'snowman', name: 'Snow' }, { id: 'cat-vibe', name: 'Cat' },
    { id: 'flowers', name: 'Floral' }, { id: 'stars', name: 'Stars' },
    { id: 'ocean', name: 'Ocean' }, { id: 'forest', name: 'Forest' }
];

/* --- SYMMETRICAL ALPHABET ART --- */
function DoubleGift({ word }: { word: string }) {
    const first = word.charAt(0).toUpperCase();
    const last = word.charAt(word.length - 1).toUpperCase();
    const url = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l}.png`;

    return (
        <div style={{ display: 'inline-flex', gap: '8px', alignItems: 'center', margin: '0 10px' }}>
            <img src={url(first)} style={styles.alphabetBox} alt={first} />
            <img src={url(last)} style={styles.alphabetBox} alt={last} />
        </div>
    );
}

export default function SenderPage() {
    const [message, setMessage] = useState("");
    const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
    const [selectedScene, setSelectedScene] = useState(SCENES[0]);
    const [isPreview, setIsPreview] = useState(false);

    const tokens = message.split(/(\s+)/);

    const handleSend = async () => {
        const res = await fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify({ message, tiles: selectedTiles.join(','), sceneId: selectedScene.id }),
        });
        const { id } = await res.json();
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        await stripe?.redirectToCheckout({ sessionId: id });
    };

    const toggleTile = (word: string) => {
        const clean = word.toLowerCase().replace(/[.,!?;:]/g, "").trim();
        if (!clean) return;
        setSelectedTiles(prev => prev.includes(clean) ? prev.filter(t => t !== clean) : [...prev, clean]);
    };

    return (
        <main style={styles.container}>
            {/* UNMUTED VIDEO - CONTAIN PREVENTS ZOOM */}
            <video key={selectedScene.id} autoPlay loop playsInline style={styles.video}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {/* TOP LEFT CONTROLS - POSITIONED TO COVER LOGOS */}
            <div style={styles.topLeftControls}>
                <button onClick={() => setIsPreview(!isPreview)} style={styles.eyeBtn}>
                    {isPreview ? '📖' : '👁️'}
                </button>
                <div style={styles.gridContainer}>
                    <div style={styles.videoGrid}>
                        {SCENES.map((scene) => (
                            <button key={scene.id} onClick={() => setSelectedScene(scene)} style={{
                                ...styles.gridItem,
                                border: selectedScene.id === scene.id ? '2px solid gold' : '1px solid rgba(255,255,255,0.2)',
                                background: selectedScene.id === scene.id ? 'rgba(255,215,0,0.3)' : 'rgba(0,0,0,0.6)'
                            }}>
                                {scene.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div style={styles.overlay}>
                {isPreview ? (
                    <div style={styles.vibeCard}>
                        <h1 style={styles.vibeHeader}>Recipient Preview!</h1>
                        <div style={styles.messageArea}>
                            {tokens.map((token, i) => {
                                const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                return selectedTiles.includes(clean) ? <DoubleGift key={i} word={token} /> : token;
                            })}
                        </div>
                        <button onClick={() => setIsPreview(false)} style={styles.backBtn}>← Edit Hug</button>
                    </div>
                ) : (
                    <div style={styles.editorCard}>
                        <h2 style={{ color: '#ff4500' }}>Vibe Greeting Shop</h2>
                        <div style={styles.inputArea}>
                            {tokens.map((token, i) => {
                                const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                const isSelected = selectedTiles.includes(clean);
                                return (
                                    <span key={i} onClick={() => toggleTile(token)} style={{
                                        ...styles.token,
                                        background: isSelected ? '#ffd700' : 'transparent',
                                        border: isSelected ? '1px solid #b8860b' : 'none'
                                    }}>
                                        {token}
                                    </span>
                                );
                            })}
                        </div>
                        <textarea 
                            style={styles.hiddenInput} 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)} 
                            placeholder="Type your message here..." 
                        />
                        <button onClick={handleSend} style={styles.sendBtn}>Wrap & Send (0.99¢)</button>
                    </div>
                )}
            </div>
        </main>
    );
}

// STYLES OBJECT - RESOLVES "CANNOT FIND NAME STYLES"
const styles: { [key: string]: React.CSSProperties } = {
    container: { height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' },
    video: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 0 },
    // Anchored Top-Left to mask logos
    topLeftControls: { position: 'absolute', top: '15px', left: '15px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '15px' },
    eyeBtn: { width: '55px', height: '55px', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', border: '2px solid gold', fontSize: '1.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.4)' },
    gridContainer: { background: 'rgba(0,0,0,0.8)', padding: '12px', borderRadius: '20px', border: '1px solid rgba(255,215,0,0.4)', backdropFilter: 'blur(10px)' },
    videoGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' },
    gridItem: { width: '50px', height: '50px', color: 'white', borderRadius: '10px', cursor: 'pointer', fontSize: '0.6rem', fontWeight: 'bold' },
    overlay: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, position: 'relative' },
    editorCard: { background: 'rgba(255,255,255,0.95)', padding: '35px', borderRadius: '40px', width: '90%', maxWidth: '550px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' },
    inputArea: { minHeight: '80px', padding: '15px', background: '#fff', borderRadius: '20px', border: '1px solid #eee', marginBottom: '15px', textAlign: 'left', fontSize: '1.1rem' },
    token: { cursor: 'pointer', padding: '2px 5px', borderRadius: '5px', margin: '0 2px' },
    hiddenInput: { width: '100%', height: '60px', padding: '12px', borderRadius: '12px', border: '1px solid #eee', marginBottom: '20px', fontSize: '1rem' },
    sendBtn: { background: '#ff6600', color: 'white', padding: '15px 45px', borderRadius: '50px', border: 'none', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 5px 15px rgba(255,102,0,0.3)' },
    vibeCard: { background: 'rgba(255,255,255,0.85)', padding: '45px', borderRadius: '45px', border: '8px solid #ffd700', width: '85%', maxWidth: '780px', textAlign: 'center' },
    vibeHeader: { color: '#ff4500', marginBottom: '25px', fontSize: '2.4rem' },
    messageArea: { fontSize: '2.1rem', color: '#333', lineHeight: '2.8' },
    alphabetBox: { width: '100px', height: 'auto', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))' },
    backBtn: { marginTop: '25px', background: '#444', color: '#fff', padding: '10px 25px', borderRadius: '50px', border: 'none', cursor: 'pointer' }
};
