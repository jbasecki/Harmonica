'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Internal Map to fix the "Module not found" build error
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

function GiftBoxTile({ word }: { word: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const firstL = word[0]?.toUpperCase() || '';
    const lastL = word[word.length - 1]?.toUpperCase() || '';
    const firstImg = alphabetMap[firstL];
    const lastImg = alphabetMap[lastL];

    return (
        <span onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', margin: '0 10px', verticalAlign: 'middle' }}>
            {isOpen ? (
                <span style={{ fontSize: '2.2rem', color: '#8b4513', fontWeight: 'bold', borderBottom: '6px solid #ffd700' }}>{word}</span>
            ) : (
                <div className="wobble" style={styles.boxBody}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {firstImg && <img src={firstImg} alt={firstL} style={{ width: '40px' }} />}
                        <span style={{ color: '#ffd700', fontWeight: 'bold' }}>+</span>
                        {lastImg && <img src={lastImg} alt={lastL} style={{ width: '40px' }} />}
                    </div>
                </div>
            )}
        </span>
    );
}

function ReceiverContent() {
    const searchParams = useSearchParams();
    const msg = decodeURIComponent(searchParams.get('msg') || "");
    const tilesStr = decodeURIComponent(searchParams.get('tiles') || "");
    const selectedTiles = tilesStr.split(',');
    const tokens = msg.split(/(\s+)/);

    return (
        <main style={styles.container}>
             {/* Side Menu for Videos */}
            <div style={styles.sideMenu}>
                {['Love is All', 'Winter Daffodil', 'Golden Glow', 'Midnight Sparkle'].map((vibe) => (
                    <div key={vibe} style={styles.menuItem}>{vibe}</div>
                ))}
            </div>

            <div className="snowflakes" aria-hidden="true">
                {[...Array(10)].map((_, i) => <div key={i} className="snowflake">❅</div>)}
            </div>

            <div style={styles.overlay}>
                {/* The "Winter Vibe" Card */}
                <div style={styles.vibeCard}>
                    <h1 style={{ color: '#ff4500', fontSize: '2.5rem', marginBottom: '30px' }}>A Winter Vibe for You!</h1>
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
                .snowflake { color: #fff; font-size: 1.5em; position: fixed; top: -10%; animation: snow 10s linear infinite; }
                @keyframes snow { 0% { top: -10%; } 100% { top: 100%; } }
                .wobble:hover { animation: wobble 0.3s ease-in-out infinite; }
                @keyframes wobble { 0%, 100% { transform: rotate(0); } 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } }
            `}</style>
        </main>
    );
}

export default function Page() {
    return <Suspense fallback={<div>Loading vibe...</div>}><ReceiverContent /></Suspense>;
}

const styles: { [key: string]: React.CSSProperties } = {
    container: { height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden' },
    sideMenu: { position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', zIndex: 20, display: 'flex', flexDirection: 'column', gap: '15px' },
    menuItem: { padding: '10px 20px', background: 'rgba(0,0,0,0.6)', color: 'white', borderRadius: '15px', border: '1px solid #ffd700', fontSize: '0.8rem' },
    overlay: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, position: 'relative' },
    vibeCard: { background: 'rgba(255,255,255,0.92)', padding: '50px', borderRadius: '40px', border: '8px solid #ffd700', width: '90%', maxWidth: '750px', textAlign: 'center' },
    boxBody: { padding: '10px 20px', background: 'linear-gradient(135deg, #8b4513, #a0522d)', borderRadius: '12px', border: '2px solid #ffd700' },
    hugBtn: { background: '#ff6600', color: 'white', padding: '15px 40px', borderRadius: '50px', border: 'none', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '40px' }
};
