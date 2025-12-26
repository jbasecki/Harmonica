'use client';
import React, { useState } from 'react';

export default function VibeSender() {
    const [message, setMessage] = useState("");
    const [selectedScene, setSelectedScene] = useState("1");

    return (
        <main style={{ position: 'relative', minHeight: '100vh', backgroundColor: '#000', color: '#fff' }}>
            {/* BACKGROUND HERO: No more black screen */}
            <video autoPlay loop muted playsInline style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25, zIndex: 0 }}>
                <source src="https://storage.googleapis.com/simple-bucket-27/eleven.mp4" type="video/mp4" />
            </video>

            <div style={{ position: 'relative', zIndex: 1, padding: '20px' }}>
                <div style={{ backgroundColor: 'rgba(0,0,255,0.7)', padding: '15px', textAlign: 'center', borderRadius: '8px', marginBottom: '20px' }}>
                    Type your digital hug, then pick a background number.
                </div>

                <textarea 
                    value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type here..."
                    style={{ width: '100%', height: '120px', borderRadius: '10px', padding: '15px', color: '#000', fontSize: '1.1rem' }}
                />

                <div style={{ marginTop: '30px' }}>
                    <h3 style={{ fontSize: '0.8rem', opacity: 0.8 }}>BACKGROUND VIBES (1-10)</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginTop: '10px' }}>
                        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((num) => (
                            <button 
                                key={num} onClick={() => setSelectedScene(num)}
                                style={{ padding: '12px', backgroundColor: selectedScene === num ? '#0070f3' : '#333', color: 'white', border: 'none', borderRadius: '5px' }}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={() => window.open(`/receiver/preview?message=${encodeURIComponent(message)}&scene=${selectedScene}`, '_blank')}
                    style={{ width: '100%', marginTop: '30px', padding: '15px', backgroundColor: '#fff', color: '#000', borderRadius: '8px', fontWeight: 'bold' }}
                >
                    SEE PREVIEW
                </button>
            </div>
        </main>
    );
}
