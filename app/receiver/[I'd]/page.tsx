'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const alphabetMap: { [key: string]: string } = {
    'A': 'https://storage.googleapis.com/simple-bucket-27/A.png', 'B': 'https://storage.googleapis.com/simple-bucket-27/B.png',
    'C': 'https://storage.googleapis.com/simple-bucket-27/C.png', 'D': 'https://storage.googleapis.com/simple-bucket-27/D.png',
    'E': 'https://storage.googleapis.com/simple-bucket-27/E.png', 'F': 'https://storage.googleapis.com/simple-bucket-27/F.png',
    'G': 'https://storage.googleapis.com/simple-bucket-27/G.png', 'H': 'https://storage.googleapis.com/simple-bucket-27/H.png',
    'I': 'https://storage.googleapis.com/simple-bucket-27/I.png', 'J': 'https://storage.googleapis.com/simple-bucket-27/J.png',
    'K': 'https://storage.googleapis.com/simple-bucket-27/K.png', 'L': 'https://storage.googleapis.com/simple-bucket-27/L.png',
    'M': 'https://storage.googleapis.com/simple-bucket-27/M.png', 'N': 'https://storage.googleapis.com/simple-bucket-27/N.png',
    'O': 'https://storage.googleapis.com/simple-bucket-27/O.png', 'P': 'https://storage.googleapis.com/simple-bucket-27/P.png',
    'Q': 'https://storage.googleapis.com/simple-bucket-27/Q.png', 'R': 'https://storage.googleapis.com/simple-bucket-27/R.png',
    'S': 'https://storage.googleapis.com/simple-bucket-27/S.png', 'T': 'https://storage.googleapis.com/simple-bucket-27/T.png',
    'U': 'https://storage.googleapis.com/simple-bucket-27/U.png', 'V': 'https://storage.googleapis.com/simple-bucket-27/V.png',
    'W': 'https://storage.googleapis.com/simple-bucket-27/W.png', 'X': 'https://storage.googleapis.com/simple-bucket-27/X.png',
    'Y': 'https://storage.googleapis.com/simple-bucket-27/Y.png', 'Z': 'https://storage.googleapis.com/simple-bucket-27/Z.png'
};

function GiftBoxTile({ word }: { word: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const firstL = word[0]?.toUpperCase() || 'A';
    const lastL = word[word.length - 1]?.toUpperCase() || 'Z';
    return (
        <span onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} style={styles.giftWrapper}>
            {isOpen ? <span style={styles.revealedWord}>{word}</span> : (
                <div style={styles.boxContainer} className="wobble">
                    <div style={styles.bowKnot}></div><div style={styles.bowLoopLeft}></div><div style={styles.bowLoopRight}></div>
                    <div style={styles.boxBody}>
                        <div style={styles.alphabetGrid}>
                            <img src={alphabetMap[firstL]} alt={firstL} style={styles.glyph} />
                            <span style={styles.plusSign}>+</span>
                            <img src={alphabetMap[lastL]} alt={lastL} style={styles.glyph} />
                        </div>
                    </div>
                </div>
            )}
        </span>
    );
}

function ReceiverContent() {
    const searchParams = useSearchParams();
    const [snow, setSnow] = useState<any[]>([]);
    const displayMessage = searchParams.get('msg') || "Thinking of you!";
    const giftWords = (searchParams.get('tiles') || "").toLowerCase().split(',');
    const videoUrl = "https://storage.googleapis.com/simple-bucket-27/winter-daffodil.mp4";

    useEffect(() => {
        setSnow(Array.from({ length: 30 }).map((_, i) => ({
            id: i, left: `${Math.random() * 100}%`, duration: `${Math.random() * 10 + 5}s`, delay: `${Math.random() * 5}s`, size: `${Math.random() * 10 + 10}px`
        })));
    }, []);

    const tokens = displayMessage.split(/(\s+)/);

    return (
        <main style={styles.container}>
            <video src={videoUrl} autoPlay loop muted style={styles.videoBg} />
            {snow.map(s => <div key={s.id} style={{ ...styles.snowflake, left: s.left, animationDuration: s.duration, animationDelay: s.delay, fontSize: s.size }}>❄</div>)}
            <div style={styles.card}>
                <h1 style={{color: '#ff4500', marginBottom: '10px'}}>A Winter Vibe for You!</h1>
                <div style={styles.messageArea}>
                    <p style={{fontSize: '1.8rem', color: '#333', lineHeight: '3.8'}}>
                        {tokens.map((token, i) => {
                            const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                            return clean && giftWords.includes(clean) ? <GiftBoxTile key={i} word={clean} /> : token;
                        })}
                    </p>
                </div>
                <button onClick={() => window.location.href = '/'} style={styles.btn}>Send a Digital Hug Back</button>
            </div>
            <style jsx global>{`
                @keyframes fall { 0% { transform: translateY(-10vh) rotate(0deg); } 100% { transform: translateY(110vh) rotate(360deg); } }
                @keyframes wobble { 0% { transform: rotate(0deg); } 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } 100% { transform: rotate(0deg); } }
                .wobble:hover { animation: wobble 0.3s ease-in-out infinite; }
            `}</style>
        </main>
    );
}

export default function ReceiverPage() {
    return <Suspense fallback={<div>Loading...</div>}><ReceiverContent /></Suspense>;
}

const styles: { [key: string]: React.CSSProperties } = {
    container: { height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden', background: '#000', fontFamily: 'sans-serif' },
    videoBg: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 },
    snowflake: { position: 'absolute', top: '-10%', color: 'white', zIndex: 0, animationName: 'fall', animationIterationCount: 'infinite', animationTimingFunction: 'linear' },
    card: { background: 'rgba(255,255,255,0.92)', padding: '40px', borderRadius: '35px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', zIndex: 1, border: '6px solid #ffd700', maxWidth: '650px' },
    messageArea: { margin: '20px 0' },
    giftWrapper: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 10px', verticalAlign: 'middle', cursor: 'pointer' },
    boxContainer: { position: 'relative', width: '115px', height: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    bowKnot: { position: 'absolute', top: '-6px', width: '16px', height: '16px', background: 'white', borderRadius: '50%', zIndex: 3 },
    bowLoopLeft: { position: 'absolute', top: '-15px', left: '26px', width: '32px', height: '26px', border: '3px solid white', borderRadius: '50% 50% 0 50%', transform: 'rotate(-20deg)', zIndex: 2 },
    bowLoopRight: { position: 'absolute', top: '-15px', right: '26px', width: '32px', height: '26px', border: '3px solid white', borderRadius: '50% 50% 50% 0', transform: 'rotate(20deg)', zIndex: 2 },
    boxBody: { width: '100%', height: '100%', background: 'linear-gradient(135deg, #8b4513, #a0522d)', border: '2px solid #ffd700', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    alphabetGrid: { display: 'flex', alignItems: 'center', gap: '8px' },
    glyph: { width: '40px', height: '40px', objectFit: 'contain' },
    plusSign: { color: '#ffd700', fontWeight: 'bold', fontSize: '20px' },
    revealedWord: { fontSize: '2.2rem', color: '#8b4513', fontWeight: 'bold', borderBottom: '6px solid #ffd700', padding: '0 10px' },
    btn: { background: 'linear-gradient(45deg, #ff4500, #ff8c00)', color: '#fff', border: 'none', padding: '15px 35px', borderRadius: '40px', cursor: 'pointer', fontWeight: 'bold' }
};
