'use client';

import React, { useState } from 'react';

export default function SenderPage() {
    const [isWrapped, setIsWrapped] = useState(false);
    const [message, setMessage] = useState("");

    const handleWrap = async () => {
        console.log("Wrapping vibe...");
    };

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* 1. THE NARRATIVE HEADER (Top Centered) */}
            <div style={{ textAlign: 'center', paddingTop: '50px', zIndex: 50, position: 'relative' }}>
                <h1 style={{ color: '#fff', fontSize: '3rem', fontWeight: '900', textShadow: '0 0 20px #0070f3', margin: 0 }}>
                    Sending a Heart in a Box
                </h1>
                <p style={{ color: '#0070f3', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '10px' }}>
                    — Send a Vibe —
                </p>
            </div>

            {/* 2. THE SNOWMAN VIDEO (Background Layer) */}
            <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}>
                <source src="https://storage.googleapis.com/simple-bucket-27/snowman.mp4" type="video/mp4" />
            </video>

            {/* 3. THE CENTERED BOX AREA */}
            <div style={{ zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '400px', display: 'flex', justifyContent: 'center' }}>
                    <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '100%', filter: 'drop-shadow(0 0 20px #0070f3)' }} />
                </div>

                {/* 4. THE ACTION BUTTON */}
                <button 
                    onClick={handleWrap}
                    style={{
                        marginTop: '40px',
                        background: '#0070f3',
                        color: '#fff',
                        border: 'none',
                        padding: '15px 40px',
                        borderRadius: '50px',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 0 20px #0070f3'
                    }}
                >
                    Wrap Message (0.99¢)
                </button>
            </div>
        </main>
    );
}
