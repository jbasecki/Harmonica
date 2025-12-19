'use client';
import React, { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const alphabetMap: { [key: string]: string } = {
    'A': 'https://storage.googleapis.com/simple-bucket-27/A.png',
    'B': 'https://storage.googleapis.com/simple-bucket-27/B.png',
    'C': 'https://storage.googleapis.com/simple-bucket-27/C.png',
    'D': 'https://storage.googleapis.com/simple-bucket-27/D.png',
    'E': 'https://storage.googleapis.com/simple-bucket-27/E.png',
    'F': 'https://storage.googleapis.com/simple-bucket-27/F.png',
    'G': 'https://storage.googleapis.com/simple-bucket-27/G.png',
    'H': 'https://storage.googleapis.com/simple-bucket-27/H.png',
    'I': 'https://storage.googleapis.com/simple-bucket-27/I.png',
    'J': 'https://storage.googleapis.com/simple-bucket-27/J.png',
    'K': 'https://storage.googleapis.com/simple-bucket-27/K.png',
    'L': 'https://storage.googleapis.com/simple-bucket-27/L.png',
    'M': 'https://storage.googleapis.com/simple-bucket-27/M.png',
    'N': 'https://storage.googleapis.com/simple-bucket-27/N.png',
    'O': 'https://storage.googleapis.com/simple-bucket-27/O.png',
    'P': 'https://storage.googleapis.com/simple-bucket-27/P.png',
    'Q': 'https://storage.googleapis.com/simple-bucket-27/Q.png',
    'R': 'https://storage.googleapis.com/simple-bucket-27/R.png',
    'S': 'https://storage.googleapis.com/simple-bucket-27/S.png',
    'T': 'https://storage.googleapis.com/simple-bucket-27/T.png',
    'U': 'https://storage.googleapis.com/simple-bucket-27/U.png',
    'V': 'https://storage.googleapis.com/simple-bucket-27/V.png',
    'W': 'https://storage.googleapis.com/simple-bucket-27/W.png',
    'X': 'https://storage.googleapis.com/simple-bucket-27/X.png',
    'Y': 'https://storage.googleapis.com/simple-bucket-27/Y.png',
    'Z': 'https://storage.googleapis.com/simple-bucket-27/Z.png',
};

const SCENES = [
    { id: 'loveisall', name: 'Love is All', url: 'https://storage.googleapis.com/simple-bucket-27/loveisall.mp4' },
    { id: 'winter-daffodil', name: 'Winter Daffodil', url: 'https://storage.googleapis.com/simple-bucket-27/winter-daffodil.mp4' },
    { id: 'goldenglow', name: 'Golden Glow', url: 'https://storage.googleapis.com/simple-bucket-27/goldenglow.mp4' },
    { id: 'midnight', name: 'Midnight Sparkle', url: 'https://storage.googleapis.com/simple-bucket-27/midnight.mp4' }
];

function GiftBoxTile({ word }: { word: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <span onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', display: 'inline-block', margin: '0 8px' }}>
            {isOpen ? (
                <span style={{ fontSize: '2.2rem', color: '#8b4513', fontWeight: 'bold', borderBottom: '6px solid #ffd700' }}>{word}</span>
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
            {/* Dynamic Background Video */}
            <video key={currentVibe.url} autoPlay loop muted style={styles.video}>
                <source src={currentVibe.url} type="video/mp4" />
            </video>

            {/* Interactive Side Menu */}
            <div style={styles.sideMenu}>
                {SCENES.map((scene) => (
                    <button 
                        key={scene.id} 
                        onClick={() => setCurrentVibe(scene)}
                        style={{
                            ...styles.menuItem,
                            border: currentVibe.id === scene.id ? '2px solid gold' : '1px solid rgba(255,255,255,0.3)',
                            background: currentVibe.id === scene.id ? 'rgba(255,215,0,0.3)' : 'rgba(0,0,0,0.6)'
                        }}
                    >
                        {scene.name}
                    </button>
                ))}
            </div>

            {/* Snowflakes for that Winter Vibe */}
            <div className="snowflakes">
                {[...Array(15)].map((_, i) => <div key={i} className="snowflake">❅</div>)}
            </div>

            <div style={styles.overlay}>
                <div style={styles.vibeCard}>
                    <h1 style={styles.vibeHeader}>A Winter Vibe for You!</h1>
                    <div style={{ fontSize: '2rem', color: '#333', lineHeight: '2.5' }}>
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
                .snowflake { color: #fff; font-size: 1.2em; position: fixed; top: -10%; z-index: 1; animation: snow 10s linear infinite; }
                @keyframes snow { 0% { top: -10%; transform: translateX(0); } 100% { top: 110%; transform: translateX(20px); } }
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
    sideMenu: { position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 20, display: 'flex', flexDirection: 'column', gap: '12px' },
    menuItem: { padding: '12px 18px', color: 'white', borderRadius: '15px', cursor: 'pointer', backdropFilter: 'blur(5px)', fontSize: '0.85rem', transition: '0.3s' },
    overlay: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, position: 'relative', background: 'rgba(0,0,0,0.1)' },
    vibeCard: { background: 'rgba(255,255,255,0.9)', padding: '50px', borderRadius: '40px', border: '8px solid #ffd700', width: '90%', maxWidth: '750px', textAlign: 'center' },
    vibeHeader: { color: '#ff4500', fontSize: '2.5rem', marginBottom: '30px', fontWeight: 'bold' },
    boxBody: { width: '80px', height: '60px', background: 'linear-gradient(135deg, #8b4513, #a0522d)', borderRadius: '10px', border: '2px solid #ffd700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' },
    hugBtn: { background: '#ff6600', color: 'white', padding: '15px 40px', borderRadius: '50px', border: 'none', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '40px' }
};
