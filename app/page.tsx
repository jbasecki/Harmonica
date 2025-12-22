'use client';
import React, { useState, useRef } from 'react';

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
        setSelectedTiles(prev => 
            prev.includes(clean) ? prev.filter(t => t !== clean) : prev.length < 4 ? [...prev, clean] : prev
        );
    };

    // NEW HASSLE-FREE PAYMENT FUNCTION
    const handlePaymentAndSend = () => {
        if (!message.trim()) { alert("Please type a message first!"); return; }
        
        // 1. YOUR LEMON SQUEEZY CHECKOUT URL
        const CHECKOUT_URL = "https://your-store.lemonsqueezy.com/checkout/buy/YOUR_PRODUCT_ID";
        
        // 2. PASSING THE MESSAGE (Optional but helpful)
        const finalUrl = `${CHECKOUT_URL}?checkout[custom][message]=${encodeURIComponent(message)}&checkout[custom][tiles]=${selectedTiles.join(',')}&checkout[custom][scene]=${selectedScene.id}`;
        
        window.open(finalUrl, '_blank');
    };

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            <video ref={videoRef} key={selectedScene.id} autoPlay loop playsInline muted={isMuted} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            <button onClick={toggleAudio} style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100, background: 'rgba(0,0,0,0.6)', border: '2px solid #0070f3', borderRadius: '50%', width: '55px', height: '55px', color: '#fff', fontSize: '1.5rem' }}>
                {isMuted ? '🔇' : '🔊'}
            </button>

            {isCinematicView && (
                <button onClick={() => setIsCinematicView(false)} style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 100, background: 'rgba(0,0,0,0.8)', border: '2px solid #fff', borderRadius: '30px', padding: '10px 25px', color: '#fff', fontWeight: 'bold' }}>
                    EDIT ✏️
                </button>
            )}

            {!isCinematicView && (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        
                        <div style={{ position: 'relative', width: '450px', minHeight: '400px', background: 'rgba(0,0,0,0.5)', borderRadius: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #0070f3', marginBottom: '20px' }}>
                            <button style={{ position: 'absolute', top: '-25px', width: '80%', background: '#0070f3', color: '#fff', padding: '10px 0', borderRadius: '50px', border: 'none', fontWeight: 'bold' }}>SEND A HEART IN A BOX</button>
                            <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '90%' }} alt="Box" />
                                {selectedTiles.length > 0 && (
                                    <div style={{ position: 'absolute', bottom: '85px', left: 0, right: 0, display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '12px' }}>
                                        {selectedTiles.map((tile, idx) => (
                                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <div style={{ display: 'flex', gap: '6px', transform: `perspective(500px) rotateY(${idx % 2 === 0 ? '20deg' : '-20deg'})` }}>
                                                    <img src={getLetterUrl(tile.charAt(0))} style={{ width: '85px', border: '2px solid #0070f3' }} />
                                                    <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '85px', border: '2px solid #0070f3' }} />
                                                </div>
                                                <span style={{ color: '#0070f3', fontSize: '1rem', fontWeight: 'bold', background: 'rgba(0,0,0,0.8)', padding: '2px 10px', borderRadius: '10px', marginTop: '8px' }}>{tile}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <button onClick={handlePaymentAndSend} style={{ width: '550px', marginTop: '-45px', background: '#0070f3', color: '#fff', padding: '12px 20px', borderRadius: '50px', border: 'none', fontWeight: 'bold', fontSize: '0.85rem' }}>
                            After you're done writing please click on the most important words to transform them into "vibes" (optional).
                        </button>

                        <div style={{ width: '650px', marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ background: 'rgba(0,0,0,0.85)', color: '#fff', padding: '15px 25px', borderRadius: '15px', border: '1px solid #0070f3', minHeight: '55px', width: '650px', boxSizing: 'border-box' }}>
                                {tokens.map((t, i) => {
                                    const clean = t.trim().replace(/[.,!?;:]/g, "");
                                    const isSel = selectedTiles.includes(clean);
                                    return <span key={i} onClick={() => toggleTile(t)} style={{ padding: '2px 5px', borderRadius: '5px', cursor: 'pointer', background: isSel ? '#0070f3' : 'transparent' }}>{t}</span>
                                })}
                            </div>
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." style={{ width: '650px', height: '100px', borderRadius: '15px', padding: '15px 25px', border: '1px solid #0070f3', background: 'rgba(0,0,0,0.85)', color: '#fff', fontSize: '1.2rem', resize: 'none' }} />
                        </div>
                    </div>

                    <div style={{ position: 'absolute', right: '50px', top: '15%', display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                        <div style={{ background: 'rgba(0,0,0,0.8)', padding: '20px', borderRadius: '35px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', border: '2px solid #0070f3' }}>
                            {SCENES.map((s) => (
                                <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '65px', height: '65px', borderRadius: '18px', border: selectedScene.id === s.id ? '3px solid #fff' : '1px solid rgba(255,255,255,0.2)', background: selectedScene.id === s.id ? '#0070f3' : 'rgba(0,0,0,0.5)', color: '#fff' }}>{s.label}</button>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button onClick={() => setIsCinematicView(true)} style={{ background: 'rgba(0,0,0,0.8)', border: '2px solid #0070f3', borderRadius: '30px', padding: '15px 25px', fontSize: '2rem', color: '#fff' }}>👁️</button>
                            <button onClick={handlePaymentAndSend} style={{ background: '#000', border: '2px solid #fff', borderRadius: '30px', padding: '10px 25px', fontSize: '1.1rem', color: '#fff', fontWeight: 'bold' }}>SEND (0.99¢)</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
