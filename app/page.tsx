'use client';
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const SCENES = [
    { id: 'loveisall', name: 'Love', isLimited: true }, { id: 'winter-daffodil', name: 'Winter', isLimited: true },
    { id: 'goldenglow', name: 'Glow' }, { id: 'midnight', name: 'Sparkle' },
    { id: 'my-little', name: 'Little' }, { id: 'magic', name: 'Magic', isLimited: true },
    { id: 'snowman', name: 'Snow' }, { id: 'cat-vibe', name: 'Cat' },
    { id: 'flowers', name: 'Floral' }, { id: 'stars', name: 'Stars' },
    { id: 'ocean', name: 'Ocean' }, { id: 'forest', name: 'Forest' }
];

/* --- DOUBLE-LETTER GIFT BOX --- */
function GiftBoxTile({ word }: { word: string }) {
    const first = word.charAt(0).toUpperCase();
    const last = word.charAt(word.length - 1).toUpperCase();
    const url = (letter: string) => `https://storage.googleapis.com/simple-bucket-27/${letter}.png`;

    return (
        <div style={{ display: 'inline-flex', gap: '5px', alignItems: 'center', margin: '0 10px' }}>
            <img src={url(first)} style={styles.alphabetBox} alt={first} />
            <img src={url(last)} style={styles.alphabetBox} alt={last} />
        </div>
    );
}

export default function VibeGreetingCreator() {
    const [message, setMessage] = useState("");
    const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
    const [selectedScene, setSelectedScene] = useState(SCENES[0]);
    const [isPreview, setIsPreview] = useState(false);

    const tokens = message.split(/(\s+)/);

    const handleSend = async () => {
        // Stripe Checkout Logic
        const res = await fetch('/api/checkout', {
            method: 'POST',
            body: JSON.stringify({ message, tiles: selectedTiles.join(','), sceneId: selectedScene.id }),
        });
        const { id } = await res.json();
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        await stripe?.redirectToCheckout({ sessionId: id });
    };

    return (
        <main style={styles.container}>
            <video key={selectedScene.id} autoPlay loop muted playsInline style={styles.video}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {!isPreview ? (
                <div style={styles.editorContainer}>
                    {/* GRID WITH LIMITED BADGES */}
                    <div style={styles.whiteGridContainer}>
                        <h4 style={styles.gridHeader}>BACKGROUNDS</h4>
                        <div style={styles.videoGrid}>
                            {SCENES.map((scene) => (
                                <button key={scene.id} onClick={() => setSelectedScene(scene)} style={{
                                    ...styles.gridItem,
                                    border: selectedScene.id === scene.id ? '2px solid #ff4500' : '1px solid #ddd',
                                    position: 'relative'
                                }}>
                                    {scene.name}
                                    {scene.isLimited && <span style={styles.limitedBadge}>HOT</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={styles.card}>
                        <h1 style={styles.cardTitle}>Vibe Greeting Shop</h1>
                        <p style={styles.tapPrompt}>✨ Tap words to wrap! 🎁</p>
                        <textarea style={styles.input} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => setIsPreview(true)} style={styles.previewBtn}>👁️ Preview</button>
                            <button onClick={handleSend} style={styles.sendBtn}>Wrap & Send (0.99¢)</button>
                        </div>
                    </div>
                </div>
            ) : (
                /* PREVIEW MODE */
                <div style={styles.overlay}>
                    <div style={styles.previewLabel}>👁️ Recipient View: High-End Art!</div>
                    <div style={styles.vibeCard}>
                        <h1 style={styles.vibeHeader}>A Winter Vibe for You!</h1>
                        <div style={styles.messageArea}>
                            {tokens.map((token, i) => {
                                const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                return selectedTiles.includes(clean) ? <GiftBoxTile key={i} word={token} /> : token;
                            })}
                        </div>
                        <button onClick={() => setIsPreview(false)} style={styles.backBtn}>← Back</button>
                    </div>
                </div>
            )}
        </main>
    );
}
