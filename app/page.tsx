'use client';
import React, { useState } from 'react';

export default function CombinedSenderPage() {
    const [message, setMessage] = useState("");
    const [selectedScene, setSelectedScene] = useState("11"); // Default to the snowman scene

    const handlePreview = () => {
        // This now sends both the message AND the chosen scene number to the preview
        window.open(`/receiver/preview?message=${encodeURIComponent(message)}&scene=${selectedScene}`, '_blank');
    };

    return (
        <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
            <div style={{ backgroundColor: 'blue', padding: '15px', textAlign: 'center', marginBottom: '20px', borderRadius: '8px' }}>
                Type your message, then pick a background number below.
            </div>

            <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your digital hug here..."
                style={{ width: '100%', height: '120px', borderRadius: '10px', padding: '15px', color: '#000' }}
            />

            <div style={{ marginTop: '30px' }}>
                <h3 style={{ fontSize: '0.9rem', opacity: 0.8 }}>BACKGROUNDS</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginTop: '10px' }}>
                    {/* Only using the numbers currently in your bucket for testing */}
                    {["4", "5", "8", "11"].map((num) => (
                        <button 
                            key={num}
                            onClick={() => setSelectedScene(num)}
                            style={{
                                padding: '10px',
                                backgroundColor: selectedScene === num ? '#0070f3' : '#333',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>

            <button 
                onClick={handlePreview} 
                style={{ width: '100%', marginTop: '30px', padding: '15px', backgroundColor: '#444', color: 'white', borderRadius: '8px', cursor: 'pointer' }}
            >
                SEE PREVIEW
            </button>
        </main>
    );
}
