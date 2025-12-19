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
        <div style={{ display: 'inline-flex', gap: '15px', alignItems: 'center', margin: '0 25px' }}>
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
            <video key={selectedScene.id} autoPlay loop playsInline style={styles.video}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            <div style={styles.topLeftControls}>
                <div style={styles.gridContainer}>
                    <div style={styles.videoGrid}>
                        {SCENES.map((scene) => (
                            <button key={scene.id} onClick={() => setSelectedScene(scene)} style={{
                                ...styles.gridItem,
                                border: selectedScene.id === scene.id ? '6px solid gold' : '1px solid rgba(255,255,255,0.2)',
                                background: selectedScene.id === scene.id ? 'rgba(255,215,0,0.8)' : 'rgba(0,0,0,1)'
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
                        <h2 style={{ color: '#ff4500' }}>Vibe Greeting Shop</h2>
                        <div style={styles.inputArea}>
                            {tokens.map((token, i) => {
                                const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                const isSelected = selectedTiles.includes(clean);
                                return (
                                    <span key={i} onClick={() => toggleTile(token)} style={{
                                        ...styles.token,
                                        background: isSelected ? '#ffd700' : 'transparent'
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
    topLeftControls: { position: 'absolute', top: '0', left: '0', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '25px' },
    eyeBtn: { width: '100px', height: '100px', borderRadius: '50%', background: '#fff', border: '5px solid gold', fontSize: '3.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '50px', boxShadow: '0 15px 35px rgba(0,0,0,0.9)' },
    gridContainer: { background: '#000', padding: '40px', borderRadius: '0 0 60px 0', borderRight: '5px solid gold', borderBottom: '5px solid gold' },
    videoGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' },
    gridItem: { width: '125px', height: '125px', color: 'white', borderRadius: '30px', cursor: 'pointer', fontSize: '1.4rem', fontWeight: 'bold' },
    overlay: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, position: 'relative' },
    editorCard: { background: 'rgba(255,255,255,0.99)', padding: '60px', borderRadius: '70px', width: '95%', maxWidth: '700px', textAlign: 'center' },
    inputArea: { minHeight: '120px', padding: '25px', background: '#fff', borderRadius: '30px', border: '1px solid #eee', marginBottom: '25px', textAlign: 'left' },
    token: { cursor: 'pointer', padding: '4px 8px', borderRadius: '8px' },
    hiddenInput: { width: '100%', height: '60px', padding: '15px', borderRadius: '15px', border: '1px solid #eee', marginBottom: '30px' },
    sendBtn: { background: '#ff6600', color: 'white', padding: '30px 90px', borderRadius: '80px', border: 'none', fontSize: '2rem', fontWeight: 'bold', cursor: 'pointer' },
    vibeCard: { background: 'rgba(255,255,255,0.85)', padding: '60px', borderRadius: '70px', border: '20px solid #ffd700', width: '90%', maxWidth: '1200px', textAlign: 'center' },
    vibeHeader: { color: '#ff4500', marginBottom: '50px', fontSize: '4rem' },
    messageArea: { fontSize: '3.5rem', color: '#333', lineHeight: '4.2' },
    alphabetBox: { width: '220px', height: 'auto', filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.8))' },
    backBtn: { marginTop: '50px', background: '#333', color: '#fff', padding: '25px 60px', borderRadius: '80px', border: 'none', cursor: 'pointer' }
};
