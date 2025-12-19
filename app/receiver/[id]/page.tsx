'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const alphabetMap: { [key: string]: string } = {
    'A': 'https://storage.googleapis.com/simple-bucket-27/A.png',
    // ... all 26 letters mapped here
};

const SCENES = [
    { id: 'loveisall', name: 'Love' }, { id: 'winter-daffodil', name: 'Winter' },
    { id: 'goldenglow', name: 'Glow' }, { id: 'midnight', name: 'Sparkle' },
    { id: 'my-little', name: 'Little' }, { id: 'magic', name: 'Magic' },
    { id: 'snowman', name: 'Snowman' }, { id: 'cat-vibe', name: 'Cat' },
    { id: 'flowers', name: 'Floral' }, { id: 'stars', name: 'Stars' },
    { id: 'ocean', name: 'Ocean' }, { id: 'forest', name: 'Forest' }
];

function GiftBoxTile({ word }: { word: string }) {
    const [isOpen, setIsOpen] = useState(false);

    // THE MAGIC CHIME LOGIC
    const playPopSound = () => {
        try {
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, audioCtx.currentTime); // High chime
            osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.1);
            
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 0.1);
        } catch (e) { console.log("Audio not supported"); }
    };

    const handleClick = () => {
        if (!isOpen) playPopSound();
        setIsOpen(!isOpen);
    };

    return (
        <span onClick={handleClick} style={styles.giftWrapper}>
            {isOpen ? (
                <span style={styles.revealedWord}>{word}</span>
            ) : (
                <div className="wobble" style={styles.boxBody}>🎁</div>
            )}
        </span>
    );
}

function ReceiverContent() {
    const searchParams = useSearchParams();
    const [currentVibe, setCurrentVibe] = useState(SCENES[0]);
    
    const msg = decodeURIComponent(searchParams.get('msg') || "");
    const tilesStr = decodeURIComponent(searchParams.get('tiles') || "");
    const selectedTiles = tilesStr.split(',');
    const tokens = msg.split(/(\s+)/);

    return (
        <main style={styles.container}>
            <video key={currentVibe.id} autoPlay loop muted style={styles.video}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${currentVibe.id}.mp4`} type="video/mp4" />
            </video>

            {/* 12-SPACE GRID MENU */}
            <div style={styles.gridContainer}>
                <div style={styles.videoGrid}>
                    {SCENES.map((scene) => (
                        <button 
                            key={scene.id} 
                            onClick={() => setCurrentVibe(scene)}
                            style={{
                                ...styles.gridItem,
                                border: currentVibe.id === scene.id ? '2px solid gold' : '1px solid rgba(255,255,255,0.2)',
                                background: currentVibe.id === scene.id ? 'rgba(255,215,0,0.3)' : 'rgba(0,0,0,0.5)'
                            }}
                        >
                            {scene.name}
                        </button>
                    ))}
                </div>
            </div>

            <div style={styles.overlay}>
                <div style={styles.vibeCard}>
                    <h1 style={styles.vibeHeader}>A Winter Vibe for You!</h1>
                    <div style={styles.messageArea}>
                        {tokens.map((token, i) => {
                            const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                            const isGift = clean && selectedTiles.includes(clean);
                            return <React.Fragment key={i}>{isGift ? <GiftBoxTile word={clean} /> : token}</React.Fragment>;
                        })}
                    </div>
                    <button style={styles.hugBtn}>Send a Digital Hug Back</button>
                </div>
            </div>
            
            <style jsx global>{`
                .wobble:hover { animation: wobble 0.3s ease-in-out infinite; }
                @keyframes wobble { 0%, 100% { transform: rotate(0); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }
            `}</style>
        </main>
    );
}

export default function Page() {
    return <Suspense fallback={<div>Loading...</div>}><ReceiverContent /></Suspense>;
}

const styles: { [key: string]: React.CSSProperties } = {
    container: { height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden' },
    video: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 },
    gridContainer: { position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', zIndex: 20, background: 'rgba(0,0,0,0.7)', padding: '10px', borderRadius: '20px', backdropFilter: 'blur(10px)' },
    videoGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' },
    gridItem: { width: '55px', height: '55px', color: 'white', borderRadius: '8px', cursor: 'pointer', fontSize: '0.6rem', fontWeight: 'bold' },
    overlay: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, position: 'relative' },
    vibeCard: { background: 'rgba(255,255,255,0.9)', padding: '40px', borderRadius: '40px', border: '8px solid #ffd700', width: '90%', maxWidth: '700px', textAlign: 'center' },
    vibeHeader: { color: '#ff4500', fontSize: '2.2rem', marginBottom: '20px' },
    messageArea: { fontSize: '2rem', color: '#333', lineHeight: '2.5' },
    giftWrapper: { display: 'inline-block', margin: '0 8px', verticalAlign: 'middle' },
    revealedWord: { color: '#8b4513', fontWeight: 'bold', borderBottom: '6px solid #ffd700' },
    boxBody: { width: '80px', height: '60px', background: 'linear-gradient(135deg, #8b4513, #a0522d)', borderRadius: '10px', border: '2px solid #ffd700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' },
    hugBtn: { background: '#ff6600', color: 'white', padding: '15px 35px', borderRadius: '50px', border: 'none', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '30px' }
};
