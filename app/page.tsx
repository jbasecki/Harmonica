'use client';
import React, { useState } from 'react';

export default function FinalSenderPage() {
    const [message, setMessage] = useState("");
    const [selectedScene, setSelectedScene] = useState("1"); 

    const handlePreview = () => {
        window.open(`/receiver/preview?message=${encodeURIComponent(message)}&scene=${selectedScene}`, '_blank');
    };

    return (
        <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
            <div style={{ backgroundColor: 'blue', padding: '15px', textAlign: 'center', marginBottom: '20px', borderRadius: '8px' }}>
                Step 1: Write your message. Step 2: Pick a vibe number. Step 3: See Preview.
            </div>

            <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Merry Christmas..."
                style={{ width: '100%', height: '100px', borderRadius: '10px', padding: '15px', color: '#000' }}
            />

            <div style={{ marginTop: '20px' }}>
                <h3 style={{ fontSize: '0.8rem', opacity: 0.7 }}>BACKGROUND VIBES</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '10px' }}>
                    {["1", "2", "3", "4", "5", "8"].map((num) => (
                        <button 
                            key={num}
                            onClick={() => setSelectedScene(num)}
                            style={{
                                padding: '12px',
                                backgroundColor: selectedScene === num ? '#0070f3' : '#222',
                                color: 'white',
                                border: selectedScene === num ? '2px solid white' : '1px solid #444',
                                borderRadius: '5px'
                            }}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>

            <button 
                onClick={handlePreview} 
                style={{ width: '100%', marginTop: '30px', padding: '18px', backgroundColor: '#333', color: 'white', borderRadius: '8px', fontWeight: 'bold' }}
            >
                VIEW CINEMATIC PREVIEW
            </button>
        </main>
    );
}
