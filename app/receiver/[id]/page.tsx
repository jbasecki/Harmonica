'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { alphabetMap } from '../../data/alphabetMap';

// --- GIFT BOX COMPONENT ---
function GiftBoxTile({ word }: { word: string }) {
    const [isOpen, setIsOpen] = useState(false);
    
    const firstL = word[0]?.toUpperCase() || '';
    const lastL = word[word.length - 1]?.toUpperCase() || '';
    const firstImg = alphabetMap[firstL] || '';
    const lastImg = alphabetMap[lastL] || '';

    return (
        <span onClick={() => setIsOpen(!isOpen)} style={styles.giftWrapper}>
            {isOpen ? (
                <span style={styles.revealedWord}>{word}</span>
            ) : (
                <div style={styles.boxContainer} className="wobble">
                    <div style={styles.bowKnot}></div>
                    <div style={styles.bowLoopLeft}></div>
                    <div style={styles.bowLoopRight}></div>
                    <div style={styles.boxBody}>
                        <div style={styles.alphabetGrid}>
                            {firstImg && <img src={firstImg} alt={firstL} style={styles.glyph} />}
                            <span style={styles.plusSign}>+</span>
                            {lastImg && <img src={lastImg} alt={lastL} style={styles.glyph} />}
                        </div>
                    </div>
                </div>
            )}
        </span>
    );
}

// --- ACTUAL CONTENT COMPONENT ---
function ReceiverContent() {
    const searchParams = useSearchParams();
    const [snow, setSnow] = useState<any[]>([]);
    
    // This looks at the link and finds "how about a dinner?"
    const displayMessage = searchParams.get('msg') || "Thinking of you!";
    const giftWordsString = searchParams.get('tiles') || "";
    const giftWords = giftWordsString.toLowerCase().split(',');

    const videoUrl = "https://storage.googleapis.com/simple-bucket-27/winter-daffodil.mp4";

    useEffect(() => {
        setSnow(Array.from({ length: 30 }).map((_, i) => ({
            id: i, left: `${Math.random() * 100}%`, duration: `${Math.random() * 10 + 5}s`, delay: `${Math.random() * 5}s`, size: `${Math.random() * 10 + 10}px`
        })));
    }, []);

    const words = displayMessage.split(' ');

    return (
        <main style={styles.container}>
            <video src={videoUrl} autoPlay loop style={styles.videoBg} />
            {snow.map(s => (
                <div key={s.id} style={{ ...styles.snowflake, left: s.left, animationDuration: s.duration, animationDelay: s.delay, fontSize: s.size }}>❄</div>
            ))}
            <div style={styles.card}>
                <h1 style={{color: '#ff4500', marginBottom: '10px'}}>A Winter Vibe for You!</h1>
                <div style={styles.messageArea}>
                    <p style={{fontSize: '1.6rem', color: '#333', lineHeight: '3'}}>
                        {words.map((word, i) => {
                            const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, "");
                            const isGift = giftWords.includes(cleanWord);
                            return (
                                <React.Fragment key={i}>
                                    {isGift ? <GiftBoxTile word={cleanWord} /> : word}{' '}
                                </React.Fragment>
                            );
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

// --- WRAPPER FOR VERCEL SAFETY ---
export default function ReceiverPage() {
    return (
        <Suspense fallback={<div>Loading your vibe...</div>}>
            <ReceiverContent />
        </Suspense>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: '#000', fontFamily: 'sans-serif' },
    videoBg: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 },
    snowflake: { position: 'absolute', top: '-10%', color: 'white', zIndex: 0, animationName: 'fall', animationIterationCount: 'infinite', animationTimingFunction: 'linear' },
    card: { background: 'rgba(255,255,255,0.92)', padding: '40px', borderRadius: '30px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', zIndex: 1, border: '6px solid #ffd700', maxWidth: '550px' },
    messageArea: { margin: '20px 0' },
    giftWrapper: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 12px', verticalAlign: 'middle', cursor: 'pointer', height: '90px' },
    boxContainer: { position: 'relative', width: '100px', height: '65px', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    bowKnot: { position: 'absolute', top: '-8px', width: '12px', height: '12px', background: 'white', borderRadius: '50%', zIndex: 3 },
    bowLoopLeft: { position: 'absolute', top: '-15px', left: '22px', width: '25px', height: '20px', border: '3px solid white', borderRadius: '50% 50% 0 50%', transform: 'rotate(-20deg)', zIndex: 2 },
    bowLoopRight: { position: 'absolute', top: '-15px', right: '22px', width: '25px', height: '20px', border: '3px solid white', borderRadius: '50% 50% 50% 0', transform: 'rotate(20deg)', zIndex: 2 },
    boxBody: { width: '100%', height: '100%', background: 'linear-gradient(135deg, #8b4513, #a0522d)', border: '2px solid #ffd700', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    alphabetGrid: { display: 'flex', alignItems: 'center', gap: '6px' },
    glyph: { width: '32px', height: '32px', objectFit: 'contain' },
    plusSign: { color: '#ffd700', fontWeight: 'bold', fontSize: '16px' },
    revealedWord: { fontSize: '1.8rem', color: '#8b4513', fontWeight: 'bold', borderBottom: '5px solid #ffd700', padding: '0 12px' },
    btn: { background: 'linear-gradient(45deg, #ff4500, #ff8c00)', color: '#fff', border: 'none', padding: '15px 35px', borderRadius: '40px', cursor: 'pointer', fontWeight: 'bold' }
};
