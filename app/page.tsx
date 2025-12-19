'use client';
import React, { useState, useEffect } from 'react';

const SCENES = [
    { id: 'loveisall', name: 'Love' }, { id: 'winter-daffodil', name: 'Winter' },
    { id: 'goldenglow', name: 'Glow' }, { id: 'midnight', name: 'Sparkle' },
    { id: 'my-little', name: 'Little' }, { id: 'magic', name: 'Magic' },
    { id: 'snowman', name: 'Snow' }, { id: 'cat-vibe', name: 'Cat' },
    { id: 'flowers', name: 'Floral' }, { id: 'stars', name: 'Stars' },
    { id: 'ocean', name: 'Ocean' }, { id: 'forest', name: 'Forest' }
];

/* --- INTERACTIVE TRANSLATION COMPONENT --- */
function GiftBoxTile({ word }: { word: string }) {
    const [isOpen, setIsOpen] = useState(false);
    
    const playPop = () => {
        try {
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.1);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.1);
        } catch (e) { console.log("Audio blocked"); }
    };

    return (
        <span onClick={() => { if(!isOpen) playPop(); setIsOpen(!isOpen); }} style={{ cursor: 'pointer', display: 'inline-block', margin: '0 8px', verticalAlign: 'middle' }}>
            {isOpen ? (
                <span style={{ fontSize: '2.2rem', color: '#8b4513', fontWeight: 'bold', borderBottom: '6px solid #ffd700' }}>{word}</span>
            ) : (
                <div className="wobble" style={{ width: '80px', height: '60px', background: 'linear-gradient(135deg, #8b4513, #a0522d)', borderRadius: '10px', border: '2px solid #ffd700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                    🎁
                </div>
            )}
        </span>
    );
}

export default function VibeGreetingCreator() {
    const [message, setMessage] = useState("");
    const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
    const [selectedScene, setSelectedScene] = useState(SCENES[0]);
    const [isPreview, setIsPreview] = useState(false);
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('vibe_history');
        if (saved) setHistory(JSON.parse(saved));
    }, []);

    const tokens = message.split(/(\s+)/);

    const handleSend = () => {
        const encodedMsg = encodeURIComponent(message);
        const encodedGifts = encodeURIComponent(selectedTiles.join(','));
        const newUrl = `/success?msg=${encodedMsg}&tiles=${encodedGifts}`;
        const newHistory = [{ msg: message.substring(0, 20) + "...", url: newUrl, date: new Date().toLocaleDateString() }, ...history].slice(0, 5);
        localStorage.setItem('vibe_history', JSON.stringify(newHistory));
        window.location.href = newUrl;
    };

    return (
        <main style={styles.container}>
            <video key={selectedScene.id} autoPlay loop muted style={styles.video}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {isPreview && (
                <div className="snowflakes">
                    {[...Array(15)].map((_, i) => <div key={i} className="snowflake">❅</div>)}
                </div>
            )}

            {!isPreview ? (
                <div style={styles.editorContainer}>
                    <div style={styles.whiteGridContainer}>
                        <h4 style={styles.gridHeader}>BACKGROUNDS</h4>
                        <div style={styles.videoGrid}>
                            {SCENES.map((scene) => (
                                <button key={scene.id} onClick={() => setSelectedScene(scene)} style={{ ...styles.gridItem, border: selectedScene.id === scene.id ? '2px solid #ff4500' : '1px solid #ddd', background: selectedScene.id === scene.id ? 'rgba(255,69,0,0.1)' : 'white' }}>{scene.name}</button>
                            ))}
                        </div>
                    </div>

                    <div style={styles.card}>
                        <h1 style={styles.cardTitle}>Vibe Greeting Shop</h1>
                        <p style={styles.tapPrompt}>✨ Tap words to wrap them! 🎁</p>
                        <div style={styles.previewBox}>
                            <p style={styles.tokensDisplay}>
                                {tokens.map((token, i) => {
                                    const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                    if (!clean) return token;
                                    const isSelected = selectedTiles.includes(clean);
                                    return (
                                        <span key={i} onClick={() => setSelectedTiles(prev => prev.includes(clean) ? prev.filter(t => t !== clean) : [...prev, clean])} style={isSelected ? styles.selectedWord : styles.normalWord}>
                                            {isSelected ? '🎁' : token}
                                        </span>
                                    );
                                })}
                            </p>
                        </div>
                        <textarea style={styles.input} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => setIsPreview(true)} style={styles.previewBtn}>👁️ Preview</button>
                            <button onClick={handleSend} style={styles.sendBtn}>Wrap & Send (0.99¢)</button>
                        </div>
                        {history.length > 0 && (
                            <div style={styles.historyBox}>
                                <h4 style={{ fontSize: '0.7rem', color: '#999', marginBottom: '10px' }}>RECENTLY SENT</h4>
                                {history.map((item, i) => (
                                    <div key={i} style={styles.historyItem} onClick={() => window.location.href = item.url}>
                                        <span>🎁 {item.msg}</span>
                                        <span style={{ fontSize: '0.6rem' }}>{item.date}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div style={styles.overlay}>
                    <div style={styles.previewLabel}>👁️ Recipient View: This is what they will see!</div>
                    <div style={styles.vibeCard}>
                        <h1 style={styles.vibeHeader}>A Winter Vibe for You!</h1>
                        <div style={styles.messageArea}>
                            {tokens.map((token, i) => {
                                const clean = token.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                const isGift = clean && selectedTiles.includes(clean);
                                return <React.Fragment key={i}>{isGift ? <GiftBoxTile word={token} /> : token}</React.Fragment>;
                            })}
                        </div>
                        <button onClick={() => setIsPreview(false)} style={styles.backBtn}>← Back to Editor</button>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .snowflake { color: #fff; font-size: 1.5em; position: fixed; top: -10%; z-index: 1; animation: snow 10s linear infinite; }
                @keyframes snow { 0% { top: -10%; } 100% { top: 110%; } }
                @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } 100% { transform: scale(1); opacity: 1; } }
                .wobble:hover { animation: wobble 0.3s ease-in-out infinite; }
                @keyframes wobble { 0%, 100% { transform: rotate(0); } 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } }
            `}</style>
        </main>
    );
}

const styles = {
    container: { height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' } as React.CSSProperties,
    video: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 } as React.CSSProperties,
    editorContainer: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' } as React.CSSProperties,
    whiteGridContainer: { position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.85)', padding: '12px', borderRadius: '25px', backdropFilter: 'blur(10px)', border: '1px solid white', zIndex: 20 } as React.CSSProperties,
    gridHeader: { color: '#ff4500', fontSize: '0.6rem', marginBottom: '8px', textAlign: 'center' as const },
    videoGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' },
    gridItem: { width: '55px', height: '55px', borderRadius: '12px', cursor: 'pointer', fontSize: '0.6rem', fontWeight: 'bold' } as React.CSSProperties,
    card: { background: 'rgba(255,255,255,0.96)', padding: '30px', borderRadius: '35px', width: '90%', maxWidth: '500px', textAlign: 'center' as const, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' } as React.CSSProperties,
    cardTitle: { fontSize: '1.5rem', margin: '0 0 10px 0', color: '#333' },
    tapPrompt: { fontSize: '0.9rem', color: '#ff8c00', fontWeight: 'bold', marginBottom: '15px' },
    previewBox: { minHeight: '80px', marginBottom: '15px', padding: '15px', background: '#fff', borderRadius: '20px', border: '2px dashed #ffd700' },
    tokensDisplay: { fontSize: '1.2rem', lineHeight: '1.8', color: '#333' },
    normalWord: { cursor: 'pointer', padding: '2px 5px' },
    selectedWord: { cursor: 'pointer', background: '#ffd700', borderRadius: '8px', padding: '4px 8px', fontWeight: 'bold' },
    input: { width: '100%', height: '70px', padding: '12px', borderRadius: '15px', border: '1px solid #ddd', marginBottom: '10px' },
    previewBtn: { flex: 1, padding: '15px', borderRadius: '40px', border: '1px solid #ddd', background: '#eee', fontWeight: 'bold', cursor: 'pointer' },
    sendBtn: { flex: 2, padding: '15px', borderRadius: '40px', border: 'none', color: 'white', fontWeight: 'bold', background: 'linear-gradient(45deg, #ff4500, #ff8c00)', cursor: 'pointer' },
    overlay: { height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', position: 'relative', zIndex: 100 } as React.CSSProperties,
    previewLabel: { position: 'absolute', top: '30px', background: 'rgba(255, 69, 0, 0.9)', color: 'white', padding: '8px 20px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 'bold', zIndex: 110, boxShadow: '0 4px 15
