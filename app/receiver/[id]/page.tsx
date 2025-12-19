'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Using the DNA from her original alphabet map
const alphabetMap: { [key: string]: string } = {
    'A': 'https://storage.googleapis.com/simple-bucket-27/A.png',
    'B': 'https://storage.googleapis.com/simple-bucket-27/B.png',
    // ... maps to your cloud bucket
};

function GiftBoxTile({ word }: { word: string }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <span onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', display: 'inline-block', margin: '0 10px' }}>
            {isOpen ? (
                <span style={{ fontSize: '2.2rem', color: '#8b4513', fontWeight: 'bold', borderBottom: '6px solid #ffd700' }}>{word}</span>
            ) : (
                <div className="wobble" style={{ width: '100px', height: '80px', background: 'linear-gradient(135deg, #8b4513, #a0522d)', borderRadius: '12px', border: '2px solid #ffd700', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    🎁
                </div>
            )}
        </span>
    );
}

function ReceiverContent({ id }: { id: string }) {
    const searchParams = useSearchParams();
    const msg = decodeURIComponent(searchParams.get('msg') || "");
    const tilesStr = decodeURIComponent(searchParams.get('tiles') || "");
    const selectedTiles = tilesStr.split(',');
    const tokens = msg.split(/(\s+)/);

    return (
        <main style={styles.container}>
            {/* Background Snowflakes */}
            <div className="snowflakes" aria-hidden="true">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="snowflake">❅</div>
                ))}
            </div>

            <div style={styles.overlay}>
                {/* The Yellow Bordered Card */}
                <div style={styles.vibeCard}>
                    <h1 style={styles.vibeHeader}>A Winter Vibe for You!</h1>
                    
                    <div style={styles.messageArea}>
                        {tokens.map((token, i) => {
                            const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                            const isGift = clean && selectedTiles.includes(clean);
                            return <React.Fragment key={i}>{isGift ? <GiftBoxTile word={clean} /> : token}</React.Fragment>;
                        })}
                    </div>

                    <div style={{ height: '4px', background: '#ffd700', width: '150px', margin: '30px auto' }}></div>

                    <button style={styles.hugBtn}>Send a Digital Hug Back</button>
                </div>
            </div>

            <style jsx global>{`
                .snowflake { color: #fff; font-size: 1.5em; position: fixed; top: -10%; z-index: 1; user-select: none; cursor: default; animation: snow 10s linear infinite; }
                @keyframes snow { 0% { top: -10%; transform: translateX(0); } 100% { top: 100%; transform: translateX(20px); } }
                .wobble:hover { animation: wobble 0.3s ease-in-out infinite; }
                @keyframes wobble { 0%, 100% { transform: rotate(0); } 25% { transform: rotate(-5deg); } 75% { transform: rotate(5deg); } }
            `}</style>
        </main>
    );
}

export default function Page({ params }: { params: { id: string } }) {
    return <Suspense fallback={<div>Loading vibe...</div>}><ReceiverContent id={params.id} /></Suspense>;
}

const styles: { [key: string]: React.CSSProperties } = {
    container: { height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden' },
    overlay: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, position: 'relative' },
    vibeCard: { background: 'rgba(255,255,255,0.9)', padding: '60px 40px', borderRadius: '40px', border: '8px solid #ffd700', width: '90%', maxWidth: '700px', textAlign: 'center' },
    vibeHeader: { color: '#ff4500', fontSize: '2.5rem', marginBottom: '40px', fontWeight: 'bold' },
    messageArea: { fontSize: '2rem', color: '#333', lineHeight: '2' },
    hugBtn: { background: '#ff6600', color: 'white', padding: '15px 40px', borderRadius: '50px', border: 'none', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }
};
