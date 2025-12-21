'use client';

import React, { useState } from 'react';

export default function SenderPage() {
    const [message, setMessage] = useState("");

    const handleWrap = async () => {
        console.log("Wrapping vibe with message:", message);
        // This will trigger your live Stripe checkout next
    };

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* 1. SNOWMAN VIDEO (The Background Layer) */}
            <video 
                autoPlay loop muted playsInline 
                style={{ 
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
                    objectFit: 'cover', zIndex: 1 
                }}
            >
                <source src="https://storage.googleapis.com/simple-bucket-27/snowman.mp4" type="video/mp4" />
            </video>

            {/* 2. THE INTERACTIVE LAYERS (The Foreground) */}
            <div style={{ zIndex: 10, position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                
                {/* THE NEW HEADER YOU LIKED */}
                <div style={{ textAlign: 'center', paddingTop: '60px' }}>
                    <h1 style={{ color: '#fff', fontSize: '3rem', fontWeight: '900', textShadow: '0 0 20px #0070f3', margin: 0 }}>
                        Sending a Heart in a Box
                    </h1>
                    <p style={{ color: '#0070f3', fontSize: '1.4rem', fontWeight: 'bold', marginTop: '10px' }}>
                        — Send a Vibe —
                    </p>
                </div>

                {/* THE GIFT BOX AND MESSAGE AREA */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', maxWidth: '420px', padding: '0 20px' }}>
                    
                    {/* RESTORED BLUE BOX */}
                    <img 
                        src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" 
                        style={{ width: '300px', marginBottom: '30px', filter: 'drop-shadow(0 0 20px #0070f3)' }} 
                    />

                    {/* LIVE MESSAGE INPUT */}
                    <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your secret message here..."
                        style={{
                            width: '100%', height: '120px', background: 'rgba(0,0,0,0.7)',
                            border: '2px solid #0070f3', borderRadius: '15px', color: 'white',
                            padding: '15px', fontSize: '1.1rem', outline: 'none', marginBottom: '25px'
                        }}
                    />

                    {/* THE WRAP BUTTON */}
                    <button 
                        onClick={handleWrap}
                        style={{
                            background: '#0070f3', color: '#fff', border: 'none',
                            padding: '18px 60px', borderRadius: '50px', fontSize: '1.4rem',
                            fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 30px #0070f3'
                        }}
                    >
                        WRAP MESSAGE (0.99¢)
                    </button>
                </div>
            </div>
        </main>
    );
}
