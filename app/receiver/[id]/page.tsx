'use client';
import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

/* --- DOUBLE CLICK-TO-REVEAL GIFT --- */
function DoubleGift({ word, onOpen }: { word: string, onOpen: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const first = word.charAt(0).toUpperCase();
    const last = word.charAt(word.length - 1).toUpperCase();
    const url = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l}.png`;

    return (
        <span onClick={() => { if(!isOpen) onOpen(); setIsOpen(!isOpen); }} style={{ cursor: 'pointer', display: 'inline-flex', gap: '5px', margin: '0 10px', verticalAlign: 'middle' }}>
            {isOpen ? (
                <span style={{ fontSize: '2.5rem', color: '#8b4513', fontWeight: 'bold', borderBottom: '6px solid #ffd700' }}>{word}</span>
            ) : (
                <>
                    <img src={url(first)} className="wobble" style={styles.alphabetBox} alt="First Letter" />
                    <img src={url(last)} className="wobble" style={styles.alphabetBox} alt="Last Letter" />
                </>
            )}
        </span>
    );
}

function ReceiverContent() {
    const searchParams = useSearchParams();
    const [showCard, setShowCard] = useState(true);
    const msg = decodeURIComponent(searchParams.get('msg') || "");
    const selectedTiles = decodeURIComponent(searchParams.get('tiles') || "").split(',');
    const tokens = msg.split(/(\s+)/);

    return (
        <main style={styles.container}>
            <video autoPlay loop muted playsInline style={styles.video}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/winter-daffodil.mp4`} type="video/mp4" />
            </video>

            <button onClick={() => setShowCard(!showCard)} style={styles.floatingToggle}>{showCard ? '👁️' : '📖'}</button>

            <div style={{ ...styles.overlay, opacity: showCard ? 1 : 0, transition: 'opacity 0.8s ease' }}>
                <div style={styles.vibeCard}>
                    <h1 style={styles.vibeHeader}>A Winter Vibe!</h1>
                    <div style={styles.messageArea}>
                        {tokens.map((token, i) => {
                            const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                            return selectedTiles.includes(clean) ? <DoubleGift key={i} word={token} onOpen={() => {}} /> : token;
                        })}
                    </div>
                    <button onClick={() => window.location.href = '/'} style={styles.hugBtn}>Send Back</button>
                </div>
            </div>
        </main>
    );
}

export default function Page({ params }: { params: { id: string } }) {
    return <Suspense fallback={<div>Loading...</div>}><ReceiverContent /></Suspense>;
}
