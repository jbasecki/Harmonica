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

                {/* 3. VISIBLE TOP LINE & INPUT [cite: image_787101.
