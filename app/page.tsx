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
        try {
            // This MUST match your file path: app/api/checkout/route.ts
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
            {/* RESTORED TO 'CONTAIN' TO SHOW TOP TEXT */}
            <video key={selectedScene.id} autoPlay loop playsInline style={styles.video}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {/* MASKING GRID AT THE VERY TOP EDGE */}
            <div style={styles.topLeftControls}>
                <div style={styles.gridContainer}>
                    <div style={styles.videoGrid}>
                        {SCENES.map((scene) => (
                            <button key={scene.id} onClick={() => setSelectedScene(scene)} style={{
                                ...styles.gridItem,
                                border: selectedScene.id === scene.id ? '2px solid gold' : '1px solid rgba(255,255,255,0.2)',
                                background: selectedScene.id === scene.id ? 'rgba(255,215,0,0.4)' : 'rgba(0,0,0,0.9)'
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
                        <p>Tap words to wrap them in a <b>gift</b>! 🎁</p>
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
    // objectFit: 'contain' stops enlargement so top text is visible
    video: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 0 },
    topLeftControls: { position: 'absolute', top: '0', left: '0', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '8px' },
    eyeBtn: { width: '55px', height: '55px', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', border: '2px solid gold', fontSize: '1.6rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' },
    gridContainer: { background: 'rgba(0,0,0,0.95)', padding: '12px', borderRadius: '0 0 15px 0', border: '1px solid rgba(255,215,0,0.5)', backdropFilter: 'blur(10px)' },
    videoGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' },
    gridItem: { width: '55px', height: '55px', color: 'white', borderRadius: '10px', cursor: 'pointer', fontSize: '0.65rem', fontWeight: 'bold' },
    overlay: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, position: 'relative' },
    editorCard: { background: 'rgba(255,255,255,0.98)', padding: '30px', borderRadius: '40px', width: '95%', maxWidth: '520px', textAlign: 'center' },
    inputArea: { minHeight: '80px', padding: '15px', background: '#fff', borderRadius: '20px', border: '1px solid #eee', marginBottom: '15px', textAlign: 'left' },
    token: { cursor: 'pointer', padding: '2px 4px', borderRadius: '4px' },
    hiddenInput: { width: '100%', height: '50px', padding: '10px', borderRadius: '12px', border: '1px solid #eee', marginBottom: '15px' },
    sendBtn: { background: '#ff6600', color: 'white', padding: '15px 45px', borderRadius: '50px', border: 'none', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' },
    vibeCard: { background: 'rgba(255,255,255,0.85)', padding: '40px', borderRadius: '40px', border: '8px solid #ffd700', width: '90%', maxWidth: '800px', textAlign: 'center' },
    vibeHeader: { color: '#ff4500', marginBottom: '25px' },
    messageArea: { fontSize: '2.2rem', color: '#333', lineHeight: '2.8' },
    alphabetBox: { width: '130px', height: 'auto', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))' },
    backBtn: { marginTop: '20px', background: '#444', color: '#fff', padding: '10px 25px', borderRadius: '50px', border: 'none', cursor: 'pointer' }
};
