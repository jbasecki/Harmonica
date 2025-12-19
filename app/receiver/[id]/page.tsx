'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const SCENES = [
    { id: 'loveisall', name: 'Love' }, { id: 'winter-daffodil', name: 'Winter' },
    { id: 'goldenglow', name: 'Glow' }, { id: 'midnight', name: 'Sparkle' },
    { id: 'my-little', name: 'Little' }, { id: 'magic', name: 'Magic' },
    { id: 'snowman', name: 'Snow' }, { id: 'cat-vibe', name: 'Cat' },
    { id: 'flowers', name: 'Floral' }, { id: 'stars', name: 'Stars' },
    { id: 'ocean', name: 'Ocean' }, { id: 'forest', name: 'Forest' }
];

/* --- SYMMETRICAL ALPHABET ART --- */
function DoubleGift({ word, onOpen }: { word: string, onOpen: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const first = word.charAt(0).toUpperCase();
    const last = word.charAt(word.length - 1).toUpperCase();
    const url = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l}.png`;

    return (
        <span onClick={() => { if(!isOpen) onOpen(); setIsOpen(!isOpen); }} style={styles.giftWrapper}>
            {isOpen ? (
                <span style={styles.revealedWord}>{word}</span>
            ) : (
                <div style={{ display: 'flex', gap: '8px' }} className="wobble">
                    <img src={url(first)} style={styles.alphabetBox} alt={first} />
                    <img src={url(last)} style={styles.alphabetBox} alt={last} />
                </div>
            )}
        </span>
    );
}

function ReceiverContent() {
    const searchParams = useSearchParams();
    const [currentVibe, setCurrentVibe] = useState(SCENES[0]);
    const [showCard, setShowCard] = useState(true);
    
    const msg = decodeURIComponent(searchParams.get('msg') || "");
    const selectedTiles = decodeURIComponent(searchParams.get('tiles') || "").split(',');
    const tokens = msg.split(/(\s+)/);

    return (
        <main style={styles.container}>
            {/* UNMUTED CINEMATIC VIDEO */}
            <video key={currentVibe.id} autoPlay loop playsInline style={styles.video}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${currentVibe.id}.mp4`} type="video/mp4" />
            </video>

            {/* TOP LEFT CONTROLS */}
            <div style={styles.topLeftControls}>
                <button onClick={() => setShowCard(!showCard)} style={styles.eyeBtn}>
                    {showCard ? '👁️' : '📖'}
                </button>
                
                <div style={styles.gridContainer}>
                    <div style={styles.videoGrid}>
                        {SCENES.map((scene) => (
                            <button key={scene.id} onClick={() => setCurrentVibe(scene)} style={{
                                ...styles.gridItem,
                                border: currentVibe.id === scene.id ? '2px solid gold' : '1px solid rgba(255,255,255,0.2)',
                                background: currentVibe.id === scene.id ? 'rgba(255,215,0,0.3)' : 'rgba(0,0,0,0.6)'
                            }}>
                                {scene.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {showCard && (
                <div style={styles.overlay}>
                    <div style={styles.vibeCard}>
                        <h1 style={styles.vibeHeader}>A Winter Vibe!</h1>
                        <div style={styles.messageArea}>
                            {tokens.map((token, i) => {
                                const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                return clean && selectedTiles.includes(clean) ? 
                                    <DoubleGift key={i} word={token} onOpen={() => {}} /> : token;
                            })}
                        </div>
                        <button onClick={() => window.location.href = '/'} style={styles.hugBtn}>Send Back</button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default function Page({ params }: { params: { id: string } }) {
    return <Suspense fallback={<div>Loading...</div>}><ReceiverContent /></Suspense>;
}

const styles: { [key: string]: React.CSSProperties } = {
    container: { height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' },
    // CONTAIN scaling ensures full visibility without cropping
    video: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain', zIndex: 0 },
    topLeftControls: { position: 'absolute', top: '20px', left: '20px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '15px' },
    eyeBtn: { width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: '2px solid gold', fontSize: '1.5rem', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' },
    gridContainer: { background: 'rgba(0,0,0,0.7)', padding: '10px', borderRadius: '15px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,215,0,0.3)' },
    videoGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' },
    gridItem: { width: '45px', height: '45px', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '0.5rem', fontWeight: 'bold' },
    overlay: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, position: 'relative' },
    vibeCard: { background: 'rgba(255,255,255,0.85)', padding: '40px', borderRadius: '40px', border: '8px solid #ffd700', width: '85%', maxWidth: '700px', textAlign: 'center' },
    vibeHeader: { color: '#ff4500', fontSize: '2rem', marginBottom: '20px' },
    messageArea: { fontSize: '1.8rem', color: '#333', lineHeight: '2.2' },
    giftWrapper: { cursor: 'pointer', display: 'inline-block', margin: '0 10px', verticalAlign: 'middle' },
    alphabetBox: { width: '80px', height: 'auto', filter: 'drop-shadow(0 8px 12px rgba(0,0,0,0.3))' },
    revealedWord: { fontSize: '2.2rem', color: '#8b4513', fontWeight: 'bold', borderBottom: '6px solid #ffd700' },
    hugBtn: { background: '#ff6600', color: 'white', padding: '12px 30px', borderRadius: '50px', border: 'none', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '25px' }
};
