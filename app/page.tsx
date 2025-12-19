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

/* --- SYMMETRICAL ALPHABET GIFT ART --- */
function DoubleGift({ word }: { word: string }) {
    const first = word.charAt(0).toUpperCase();
    const last = word.charAt(word.length - 1).toUpperCase();
    const url = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l}.png`;
    return (
        <div style={{ display: 'inline-flex', gap: '20px', alignItems: 'center', margin: '0 30px' }}>
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
            } else {
                // This alert will go away once your Vercel keys are saved
                alert("Stripe session failed. Check your Vercel Environment Variables!");
            }
        } catch (err) { console.error("Payment error", err); }
    };

    const toggleTile = (word: string) => {
        const clean = word.toLowerCase().replace(/[.,!?;:]/g, "").trim();
        if (!clean) return;
        setSelectedTiles(prev => prev.includes(clean) ? prev.filter(t => t !== clean) : [...prev, clean]);
    };

    return (
        <main style={styles.container}>
            {/* UNMUTED VIDEO - CONTAIN ENSURES VISIBILITY */}
            <video key={selectedScene.id} autoPlay loop playsInline style={styles.video}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {/* ENORMOUS TOP EDGE UI - THE PERFECT LOGO SHIELD */}
            <div style={styles.topLeftControls}>
                <div style={styles.gridContainer}>
                    <div style={styles.videoGrid}>
                        {SCENES.map((scene) => (
                            <button key={scene.id} onClick={() => setSelectedScene(scene)} style={{
                                ...styles.gridItem,
                                border: selectedScene.id === scene.id ? '8px solid gold' : '1px solid rgba(255,255,255,0.2)',
                                background: selectedScene.id === scene.id ? 'rgba(255,215,0,0.9)' : 'rgba(0,0,0,1)'
                            }}>
                                {scene.name}
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={() => setIsPreview(!isPreview)} style={styles.eyeBtn}>
                    {isPreview ? '📖' : '👁️'}
                </button>
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
                        <button onClick={() => setIsPreview(false)} style={styles.backBtn}>← Edit Gift</button>
                    </div>
                ) : (
                    <div style={styles.editorCard}>
                        <h2 style={{ color: '#ff4500', fontSize: '2.5rem' }}>Vibe Greeting Shop</h2>
                        <div style={styles.inputArea}>
                            {tokens.map((token, i) => {
                                const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                const isSelected = selectedTiles.includes(clean);
                                return (
                                    <span key={i} onClick={() => toggleTile(token)} style={{
                                        ...styles.token,
                                        background: isSelected ? '#ffd700' : 'transparent',
                                        fontSize: '1.4rem'
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
                            placeholder="Type your message..." 
                        />
                        <button onClick={handleSend} style={styles.sendBtn}>Wrap & Send (0.99¢)</button>
                    </div>
                )}
            </div>
        </main>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: { height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' },
    video: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 0 },
    topLeftControls: { position: 'absolute', top: '0', left: '0', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '30px' },
    eyeBtn: { width: '120px', height: '120px', borderRadius: '50%', background: '#fff', border: '6px solid gold', fontSize: '4.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '60px', boxShadow: '0 20px 40px rgba(0,0,0,1)' },
    gridContainer: { background: '#000', padding: '50px', borderRadius: '0 0 70px 0', borderRight: '6px solid gold', borderBottom: '6px solid gold' },
    videoGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' },
    // ENORMOUS size: 150px
    gridItem: { width: '150px', height: '150px', color: 'white', borderRadius: '40px', cursor: 'pointer', fontSize: '1.8rem', fontWeight: 'bold' },
    overlay: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, position: 'relative' },
    editorCard: { background: 'rgba(255,255,255,0.99)', padding: '70px', borderRadius: '80px', width: '95%', maxWidth: '800px', textAlign: 'center' },
    inputArea: { minHeight: '140px', padding: '30px', background: '#fff', borderRadius: '40px', border: '1px solid #eee', marginBottom: '30px', textAlign: 'left' },
    token: { cursor: 'pointer', padding: '5px 10px', borderRadius: '10px' },
    hiddenInput: { width: '100%', height: '80px', padding: '20px', borderRadius: '20px', border: '1px solid #eee', marginBottom: '40px', fontSize: '1.2rem' },
    sendBtn: { background: '#ff6600', color: 'white', padding: '35px 100px', borderRadius: '100px', border: 'none', fontSize: '2.5rem', fontWeight: 'bold', cursor: 'pointer' },
    vibeCard: { background: 'rgba(255,255,255,0.85)', padding: '70px', borderRadius: '80px', border: '25px solid #ffd700', width: '90%', maxWidth: '1300px', textAlign: 'center' },
    vibeHeader: { color: '#ff4500', marginBottom: '60px', fontSize: '4.5rem' },
    messageArea: { fontSize: '4rem', color: '#333', lineHeight: '4.8' },
    alphabetBox: { width: '250px', height: 'auto', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.9))' },
    backBtn: { marginTop: '60px', background: '#333', color: '#fff', padding: '30px 50px', borderRadius: '100px', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }
};
