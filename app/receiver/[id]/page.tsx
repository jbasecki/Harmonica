'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// ... (SCENES and GiftBoxTile remain the same)

function ReceiverContent() {
    const searchParams = useSearchParams();
    const [currentVibe, setCurrentVibe] = useState(SCENES[0]);
    const [showCard, setShowCard] = useState(true);
    const [openedCount, setOpenedCount] = useState(0);
    
    const msg = decodeURIComponent(searchParams.get('msg') || "");
    const tilesStr = decodeURIComponent(searchParams.get('tiles') || "");
    const selectedTiles = tilesStr.split(',').filter(t => t !== "");
    const tokens = msg.split(/(\s+)/);

    // Auto-reveal logic
    useEffect(() => {
        if (selectedTiles.length > 0 && openedCount === selectedTiles.length) {
            const timer = setTimeout(() => setShowCard(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [openedCount, selectedTiles.length]);

    return (
        <main style={styles.container}>
            <video key={currentVibe.id} autoPlay loop muted style={styles.video}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${currentVibe.id}.mp4`} type="video/mp4" />
            </video>

            {/* ALWAYS VISIBLE TOGGLE BUTTON */}
            <button 
                onClick={() => setShowCard(!showCard)} 
                style={styles.floatingToggle}
                title={showCard ? "Hide Message" : "Show Message"}
            >
                {showCard ? '👁️' : '📖'}
            </button>

            {/* THE 12-SPACE GRID */}
            <div style={styles.gridContainer}>
                <h4 style={styles.gridHeader}>CHOOSE BACKGROUND</h4>
                <div style={styles.videoGrid}>
                    {SCENES.map((scene) => (
                        <button key={scene.id} onClick={() => setCurrentVibe(scene)} style={{ ...styles.gridItem, border: currentVibe.id === scene.id ? '2px solid gold' : '1px solid rgba(255,255,255,0.2)', background: currentVibe.id === scene.id ? 'rgba(255,215,0,0.3)' : 'rgba(0,0,0,0.6)' }}>{scene.name}</button>
                    ))}
                </div>
            </div>

            <div className="snowflakes">
                {[...Array(15)].map((_, i) => <div key={i} className="snowflake">❅</div>)}
            </div>

            {/* MESSAGE CARD WITH TRANSITION */}
            <div style={{ ...styles.overlay, opacity: showCard ? 1 : 0, pointerEvents: showCard ? 'auto' : 'none', transition: 'opacity 0.8s ease' }}>
                <div style={styles.vibeCard}>
                    <h1 style={styles.vibeHeader}>A Winter Vibe for You!</h1>
                    <div style={styles.messageArea}>
                        {tokens.map((token, i) => {
                            const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                            const isGift = clean && selectedTiles.includes(clean);
                            return <React.Fragment key={i}>{isGift ? <GiftBoxTile word={token} onOpen={() => setOpenedCount(prev => prev + 1)} /> : token}</React.Fragment>;
                        })}
                    </div>
                    <button onClick={() => window.location.href = '/'} style={styles.hugBtn}>Send a Secret Message Back</button>
                </div>
            </div>

            <style jsx global>{`
                .snowflake { color: #fff; font-size: 1.5em; position: fixed; top: -10%; z-index: 1; animation: snow 10s linear infinite; }
                @keyframes snow { 0% { top: -10%; } 100% { top: 110%; } }
                .wobble:hover { animation: wobble 0.3s ease-in-out infinite; }
                @keyframes wobble { 0%, 100% { transform: rotate(0); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }
            `}</style>
        </main>
    );
}

// ... (Page wrapper and GiftBoxTile stay the same)

const styles = {
    // ... (Keep existing styles)
    floatingToggle: {
        position: 'absolute', top: '25px', left: '25px', zIndex: 100,
        width: '50px', height: '50px', borderRadius: '50%',
        background: 'rgba(255,255,255,0.9)', border: '2px solid #ffd700',
        fontSize: '1.5rem', cursor: 'pointer', display: 'flex',
        alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    } as React.CSSProperties,
    overlay: { 
        height: '100%', width: '100%', display: 'flex', 
        alignItems: 'center', justifyContent: 'center', 
        zIndex: 10, position: 'relative' 
    } as React.CSSProperties,
    // ...
};
