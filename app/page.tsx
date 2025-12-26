'use client';
import React, { useState, useRef } from 'react';

const CLEAN_SCENES = [
    { id: 'eleven', label: '1' }, { id: 'four', label: '4' }, { id: 'five', label: '5' }, { id: 'eight', label: '8' }, { id: 'joy-of-winter', label: '11' }
];
const ART_SCENES = [
    { id: 'bigfeelings', label: '2' }, { id: 'daffodil-love', label: '6' }, { id: 'giftofheart', label: '7' }, { id: 'happy-holidays', label: '9' }, { id: 'happynewyear26', label: '10' }
];

export default function UltimateMeditativeSender() {
    const [message, setMessage] = useState("");
    const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
    const [selectedScene, setSelectedScene] = useState(CLEAN_SCENES[0]);
    const [dimness, setDimness] = useState(0.6);
    const videoRef = useRef<HTMLVideoElement>(null);

    const tokens = message.split(/(\s+)/);
    const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

    const toggleTile = (rawWord: string) => {
        const clean = rawWord.trim().replace(/[.,!?;:]/g, "");
        if (!clean || clean.length < 1) return;
        setSelectedTiles(prev => 
            prev.includes(clean) ? prev.filter(t => t !== clean) : prev.length < 4 ? [...prev, clean] : prev
        );
    };

    const handlePreview = () => {
        const tileString = selectedTiles.join(',');
        window.open(`/receiver/preview?message=${encodeURIComponent(message)}&scene=${selectedScene.id}&tiles=${tileString}&dim=${dimness}`, '_blank');
    };

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            {/* 1. DYNAMIC BACKGROUND */}
            <video ref={videoRef} key={selectedScene.id} autoPlay loop muted playsInline 
                style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', opacity: dimness }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                
                {/* 2. HEART IN A BOX AREA */}
                <div style={{ position: 'relative', width: '400px', height: '280px', background: 'rgba(0,0,0,0.5)', borderRadius: '25px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #0070f3', marginBottom: '10px' }}>
                    <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '60%', opacity: 0.8 }} alt="Box" />
                    
                    <div style={{ position: 'absolute', bottom: '40px', display: 'flex', gap: '8px' }}>
                        {selectedTiles.map((tile, idx) => (
                            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'scale(0.7)' }}>
                                <div style={{ display: 'flex', gap: '2px' }}>
                                    <img src={getLetterUrl(tile[0])} style={{ width: '45px', border: '1px solid gold', borderRadius: '4px' }} alt="L" />
                                    <img src={getLetterUrl(tile[tile.length-1])} style={{ width: '45px', border: '1px solid gold', borderRadius: '4px' }} alt="R" />
                                </div>
                                <span style={{ background: 'gold', color: '#000', fontSize: '0.6rem', fontWeight: 'bold', marginTop: '4px', padding: '1px 5px', borderRadius: '3px' }}>{tile}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. VISIBLE TOP LINE & INPUT */}
                <div style={{ width: '100%', maxWidth: '600px', background: 'rgba(0,0,0,0.7)', padding: '15px', borderRadius: '20px', border: '1px solid #0070f3' }}>
                    <div style={{ minHeight: '40px', textAlign: 'center', marginBottom: '10px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {tokens.map((t, i) => {
                            const clean = t.trim().replace(/[.,!?;:]/g, "");
                            const isSel = selectedTiles.includes(clean);
                            return (
                                <span key={i} onClick={() => toggleTile(t)} 
                                    style={{ 
                                        color: '#fff', 
                                        padding: '4px 10px', 
                                        cursor: 'pointer', 
                                        background: isSel ? '#0070f3' : 'rgba(255,255,255,0.3)', 
                                        borderRadius: '8px', 
                                        margin: '2px',
                                        fontSize: '0.9rem',
                                        fontWeight: 'bold',
                                        border: isSel ? '1px solid white' : '1px solid transparent'
                                    }}>
                                    {t}
                                </span>
                            )
                        })}
                    </div>
                    <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your meditative message..." style={{ width: '100%', height: '70px', borderRadius: '10px', padding: '10px', background: '#111', color: '#fff', border: 'none', fontSize: '1rem' }} />
                </div>

                {/* 4. TWO GRIDS */}
                <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                    <div>
                        <p style={{ fontSize: '0.6rem', color: '#fff', textAlign: 'center' }}>CLEAN</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '5px' }}>
                            {CLEAN_SCENES.map(s => (
                                <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '30px', height: '30px', borderRadius: '5px', background: selectedScene.id === s.id ? '#0070f3' : '#333', color: '#fff', border: 'none', fontSize: '0.7rem', cursor: 'pointer' }}>{s.label}</button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.6rem', color: '#fff', textAlign: 'center' }}>ARTISTIC</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '5px' }}>
                            {ART_SCENES.map(s => (
                                <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '30px', height: '30px', borderRadius: '5px', background: selectedScene.id === s.id ? '#0070f3' : '#333', color: '#fff', border: 'none', fontSize: '0.7rem', cursor: 'pointer' }}>{s.label}</button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 5. ACTIONS */}
                <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                    <button onClick={handlePreview} style={{ padding: '12px 25px', borderRadius: '25px', background: '#fff', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>PREVIEW</button>
                    {/* Placeholder for real SEND link */}
                    <button onClick={() => alert("Stripe documents pending—ready for live test tomorrow!")} style={{ padding: '12px 25px', borderRadius: '25px', background: '#0070f3', color: '#fff', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>SEND (0.99¢)</button>
                </div>
                <input type="range" min="0.1" max="1" step="0.1" value={dimness} onChange={(e) => setDimness(parseFloat(e.target.value))} style={{ width: '150px', marginTop: '10px' }} />
            </div>
        </main>
    );
}
