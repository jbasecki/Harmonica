'use client';

import React, { useState } from 'react';

// --- DATA: Included directly to prevent "Module Not Found" errors ---
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

const UNIQUE_SCENES = [
    { id: 'scene-13', name: 'Love is All', url: 'https://storage.googleapis.com/simple-bucket-27/loveisall.mp4' },
    { id: 'scene-03', name: 'Winter Daffodil', url: 'https://storage.googleapis.com/simple-bucket-27/winter-daffodil.mp4' },
    { id: 'scene-01', name: 'My Little Vibe', url: 'https://storage.googleapis.com/simple-bucket-27/my-little.mp4' },
    { id: 'scene-05', name: 'Winter Magic', url: 'https://storage.googleapis.com/simple-bucket-27/magic.mp4' },
];

// --- MASTER GIFT COMPONENT ---
function GiftBoxTile({ word }: { word: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const firstL = word[0]?.toUpperCase() || '';
    const lastL = word[word.length - 1]?.toUpperCase() || '';
    const firstImg = alphabetMap[firstL] || '';
    const lastImg = alphabetMap[lastL] || '';

    return (
        <span onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} style={styles.giftWrapper}>
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

export default function VibeGreetingCreator() {
    const [message, setMessage] = useState("");
    const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
    const [selectedScene, setSelectedScene] = useState(UNIQUE_SCENES[0]);
    const [isPreviewing, setIsPreviewing] = useState(false);

    const playWrapSound = (isSelecting: boolean) => {
        try {
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            oscillator.type = 'sine';
            const startFreq = isSelecting ? 440 : 880;
            const endFreq = isSelecting ? 880 : 440;
            oscillator.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(endFreq, audioCtx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.1);
        } catch (e) { console.log("Audio not supported"); }
    };

    const handleSend = () => {
        const encodedMsg = encodeURIComponent(message);
        const encodedGifts = encodeURIComponent(selectedTiles.join(','));
        window.location.href = "/success?msg=" + encodedMsg + "&tiles=" + encodedGifts;
    };

    const tokens = message.split(/(\s+)/);

    return (
        <main style={styles.container}>
            <video key={selectedScene.url} src={selectedScene.url} autoPlay loop muted style={styles.video} />
            <div style={styles.overlay}>
                {!isPreviewing ? (
                    <div style={styles.card}>
                        <h1 style={{fontSize: '1.5rem', margin: '0 0 10px 0'}}>Vibe Greeting Shop</h1>
                        <p style={{fontSize: '0.9rem', color: '#ff8c00', fontWeight: 'bold', marginBottom: '15px'}}>✨ Tap words below to wrap them! 🎁</p>
                        <div style={styles.previewSection}>
                            <p style={styles.previewText}>
                                {tokens.map((token, i) => {
                                    const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                    if (!clean) return token;
                                    const isSelected = selectedTiles.includes(clean);
                                    return (
                                        <span key={i} onClick={() => {
                                            playWrapSound(!isSelected);
                                            setSelectedTiles(prev => prev.includes(clean) ? prev.filter(t => t !== clean) : [...prev, clean]);
                                        }} style={isSelected ? styles.selectedWord : styles.normalWord}>
                                            {token}
                                        </span>
                                    );
                                })}
                            </p>
                        </div>
                        <textarea style={styles.input} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." />
                        <div style={styles.scenePicker}>
                            {UNIQUE_SCENES.map(scene => (
                                <button key={scene.id} onClick={() => setSelectedScene(scene)} style={selectedScene.id === scene.id ? styles.sceneBtnActive : styles.sceneBtn}>{scene.name}</button>
                            ))}
                        </div>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <button style={{...styles.sendBtn, background: '#666', flex: 1}} onClick={() => setIsPreviewing(true)}>👁️ Preview</button>
                            <button style={{...styles.sendBtn, flex: 2}} onClick={handleSend}>Wrap & Send (0.99¢)</button>
                        </div>
                    </div>
                ) : (
                    <div style={styles.fullPreviewCard}>
                        <div style={styles.previewHeader}>
                            <span>Live Receiver Preview</span>
                            <button onClick={() => setIsPreviewing(false)} style={styles.closeBtn}>Close [X]</button>
                        </div>
                        <div style={styles.messageArea}>
                             <p style={{fontSize: '1.8rem', color: '#333', lineHeight: '3.8'}}>
                                {tokens.map((token, i) => {
                                    const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                    const isGift = clean && selectedTiles.includes(clean);
                                    return (
                                        <React.Fragment key={i}>
                                            {isGift ? <GiftBoxTile word={clean} /> : token}
                                        </React.Fragment>
                                    );
                                })}
                             </p>
                        </div>
                    </div>
                )}
            </div>
            <style jsx global>{`
                @keyframes wobble { 0% { transform: rotate(0deg); } 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } 100% { transform: rotate(0deg); } }
                .wobble:hover { animation: wobble 0.3s ease-in-out infinite; }
            `}</style>
        </main>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: { height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' },
    video: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 },
    overlay: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)' },
    card: { background: 'rgba(255,255,255,0.96)', padding: '30px', borderRadius: '35px', width: '90%', maxWidth: '500px', textAlign: 'center' },
    fullPreviewCard: { background: 'rgba(255,255,255,0.95)', padding: '40px', borderRadius: '35px', width: '92%', maxWidth: '650px', textAlign: 'center', border: '6px solid #ffd700', minHeight: '400px', zIndex: 10 },
    previewHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px', color: '#ff4500', fontWeight: 'bold' },
    closeBtn: { background: '#eee', border: 'none', cursor: 'pointer', padding: '8px 15px', borderRadius: '12px' },
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
    input: { width: '100%', height: '70px', padding: '15px', borderRadius: '15px', border: '1px solid #ddd', marginBottom: '15px' },
    previewSection: { minHeight: '100px', marginBottom: '20px', padding: '20px', background: '#fff', borderRadius: '20px', border: '2px dashed #ffd700' },
    previewText: { fontSize: '1.3rem', lineHeight: '2' },
    normalWord: { cursor: 'pointer', padding: '4px 8px', borderRadius: '8px' },
    selectedWord: { cursor: 'pointer', padding: '6px 12px', background: '#ffd700', borderRadius: '10px', fontWeight: 'bold' },
    scenePicker: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px', justifyContent: 'center', maxHeight: '120px', overflowY: 'auto' },
    sceneBtn: { padding: '8px 14px', borderRadius: '20px', border: '1px solid #ddd', background: 'white', fontSize: '0.8rem' },
    sceneBtnActive: { padding: '8px 14px', borderRadius: '20px', border: 'none', background: '#ff4500', color: 'white', fontSize: '0.8rem', fontWeight: 'bold' },
    sendBtn: { padding: '18px', borderRadius: '40px', border: 'none', color: 'white', fontWeight: 'bold', fontSize: '1.2rem', background: 'linear-gradient(45deg, #ff4500, #ff8c00)' }
};
