'use client';
import React, { useState, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const SCENES = [
    { id: 'one', label: '1' }, { id: 'two', label: '2' }, { id: 'three', label: '3' },
    { id: 'four', label: '4' }, { id: 'five', label: '5' }, { id: 'six', label: '6' },
    { id: 'seven', label: '7' }, { id: 'eight', label: '8' }, { id: 'nine', label: '9' },
    { id: 'ten', label: '10' }, { id: 'eleven', label: '11' }, { id: 'twelve', label: '12' }
];

export default function SenderPage() {
    const [message, setMessage] = useState("");
    const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
    const [selectedScene, setSelectedScene] = useState(SCENES[0]);
    const [isCinematicView, setIsCinematicView] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [hoveredWord, setHoveredWord] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const tokens = message.split(/(\s+)/);
    const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

    const toggleAudio = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const toggleTile = (rawWord: string) => {
        const clean = rawWord.trim().replace(/[.,!?;:]/g, "");
        if (!clean) return;
        // UNLIMITED WORD SELECTION - no limit!
        setSelectedTiles(prev => 
            prev.includes(clean) ? prev.filter(t => t !== clean) : [...prev, clean]
        );
    };

    const handlePaymentAndSend = async () => {
        if (!message.trim()) { alert("Please type a message first!"); return; }
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, tiles: selectedTiles, sceneId: selectedScene.id }),
            });
            const session = await response.json();
            if (session.error) { alert(`Stripe Error: ${session.error}`); return; }
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
            if (stripe) await stripe.redirectToCheckout({ sessionId: session.id });
        } catch (err) { alert("Error connecting to Stripe. Check Vercel logs."); }
    };

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            <video 
                ref={videoRef}
                key={selectedScene.id} 
                autoPlay 
                loop 
                playsInline 
                muted={isMuted} 
                style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
            >
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {/* AUDIO TOGGLE BUTTON */}
            <button 
                onClick={toggleAudio}
                style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100, background: 'rgba(0,0,0,0.6)', border: '1px solid #0070f3', borderRadius: '50%', width: '50px', height: '50px', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
                title={isMuted ? "Unmute audio" : "Mute audio"}
            >
                {isMuted ? '🔇' : '🔊'}
            </button>

            {isCinematicView ? (
                <div onClick={() => setIsCinematicView(false)} style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)', cursor: 'pointer', zIndex: 20 }}>
                    <div style={{ color: '#fff', fontSize: '2rem', fontWeight: 'bold', textShadow: '0 0 20px rgba(0,112,243,0.8)' }}>✨ Click anywhere to return ✨</div>
                </div>
            ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '60px', zIndex: 10, pointerEvents: 'none' }}>
                    <div style={{ pointerEvents: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', textShadow: '0 0 30px rgba(0,112,243,0.9)', marginBottom: '-10px' }}>SEND A HEART IN A BOX</h1>

                        <textarea 
                            placeholder="Write your message here..." 
                            value={message} 
                            onChange={(e) => setMessage(e.target.value)} 
                            style={{ width: '650px', height: '120px', fontSize: '1.2rem', padding: '15px', borderRadius: '15px', border: '2px solid #0070f3', background: 'rgba(0,0,0,0.85)', color: '#fff', resize: 'none', outline: 'none', boxShadow: '0 0 20px rgba(0,112,243,0.4)' }} 
                        />

                        {/* PREVIEW SELECTED WORDS */}
                        <div style={{ width: '650px', minHeight: '100px', background: 'rgba(0,0,0,0.85)', borderRadius: '15px', border: '2px solid #0070f3', padding: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ color: '#0070f3', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px' }}>Selected Words Preview:</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                                {selectedTiles.length === 0 ? (
                                    <span style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>Click words below to select them...</span>
                                ) : (
                                    selectedTiles.map((tile, idx) => (
                                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.3s ease', gap: '5px' }}>
                                            <div style={{ display: 'flex', gap: '3px', perspective: '400px' }}>
                                                <img src={getLetterUrl(tile[0])} style={{ width: '85px', border: '2px solid #0070f3', transform: 'rotateY(20deg) skewY(-4deg)' }} alt="L" />
                                                <img src={getLetterUrl(tile[tile.length - 1])} style={{ width: '85px', border: '2px solid #0070f3', transform: 'rotateY(-20deg) skewY(4deg)' }} alt="R" />
                                            </div>
                                            <span style={{ color: '#0070f3', fontSize: '1rem', fontWeight: 'bold', background: 'rgba(0,0,0,0.8)', padding: '2px 10px', borderRadius: '10px', marginTop: '8px' }}>{tile}</span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* WORD COUNTER */}
                        {selectedTiles.length > 0 && (
                            <div style={{ marginTop: '-55px', marginBottom: '10px', color: '#0070f3', fontSize: '1.1rem', fontWeight: 'bold', background: 'rgba(0,0,0,0.8)', padding: '8px 20px', borderRadius: '20px', border: '1px solid #0070f3' }}>
                                ✨ {selectedTiles.length} special {selectedTiles.length === 1 ? 'word' : 'words'} selected
                            </div>
                        )}

                        <button onClick={handlePaymentAndSend} style={{ width: '450px', marginTop: '0px', background: '#0070f3', color: '#fff', padding: '15px 0', borderRadius: '50px', border: 'none', fontWeight: 'bold', fontSize: '1.4rem', cursor: 'pointer', zIndex: 30 }}>
                            {selectedTiles.length === 0 ? 'CLICK WORDS BELOW TO SELECT THEM' : 'READY TO SEND (0.99¢)'}
                        </button>

                        <div style={{ width: '650px', marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {/* CLICKABLE WORD TILES WITH HOVER EFFECTS */}
                            <div style={{ background: 'rgba(0,0,0,0.85)', color: '#fff', padding: '15px 25px', borderRadius: '15px', border: '1px solid #0070f3', minHeight: '55px', width: '650px', boxSizing: 'border-box' }}>
                                {tokens.length === 0 || !message.trim() ? (
                                    <span style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>Your words will appear here as clickable tiles...</span>
                                ) : (
                                    tokens.map((t, i) => {
                                        const clean = t.trim().replace(/[.,!?;:]/g, "");
                                        const isSel = selectedTiles.includes(clean);
                                        const isHovered = hoveredWord === clean;
                                        return (
                                            <span 
                                                key={i} 
                                                onClick={() => toggleTile(t)} 
                                                onMouseEnter={() => clean && setHoveredWord(clean)}
                                                onMouseLeave={() => setHoveredWord(null)}
                                                style={{ 
                                                    padding: '2px 5px', 
                                                    borderRadius: '5px', 
                                                    cursor: clean ? 'pointer' : 'default', 
                                                    background: isSel ? '#0070f3' : 'transparent',
                                                    boxShadow: isHovered && !isSel ? '0 0 10px rgba(0, 112, 243, 0.6)' : 'none',
                                                    transition: 'all 0.2s ease',
                                                    textShadow: isHovered ? '0 0 8px rgba(0, 112, 243, 0.8)' : 'none',
                                                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                                    display: 'inline-block'
                                                }}
                                            >
                                                {t}
                                            </span>
                                        );
                                    })
                                )}
                            </div>

                            {/* SCENE SELECTOR */}
                            <div style={{ background: 'rgba(0,0,0,0.85)', padding: '10px 20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {SCENES.map(s => (
                                    <button key={s.id} onClick={() => setSelectedScene(s)} style={{ padding: '8px 15px', borderRadius: '10px', cursor: 'pointer', fontSize: '1.1rem', border: selectedScene.id === s.id ? '3px solid #fff' : '1px solid rgba(255,255,255,0.2)', background: selectedScene.id === s.id ? '#0070f3' : 'rgba(0,0,0,0.5)', color: '#fff' }}>{s.label}</button>
                                ))}
                            </div>
                            
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <button onClick={() => setIsCinematicView(true)} style={{ background: 'rgba(0,0,0,0.8)', border: '2px solid #0070f3', borderRadius: '30px', padding: '15px 25px', cursor: 'pointer', fontSize: '2rem', color: '#fff', boxShadow: '0 0 15px gold' }}>👁️</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </main>
    );
}