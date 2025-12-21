'use client';

import React, { useState, useEffect } from 'react';

export default function SenderPage() {
    // These states keep the title from flickering
    const [isWrapped, setIsWrapped] = useState(false);

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', overflow: 'hidden' }}>
            {/* 1. NARRATIVE HEADER */}
            {!isWrapped && (
                <div style={{ 
                    textAlign: 'center', 
                    paddingTop: '40px',
                    zIndex: 50, 
                    position: 'relative' 
                }}>
                    <h1 style={{ color: '#fff', fontSize: '3rem', fontWeight: '900', textShadow: '0 0 20px #0070f3' }}>
                        Sending a Heart in a Box
                    </h1>
                    <p style={{ color: '#0070f3', fontSize: '1.4rem', fontWeight: 'bold' }}>
                        — Send a Vibe —
                    </p>
                </div>
            )}

            {/* 2. THE SNOWMAN VIDEO */}
            <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src="https://storage.googleapis.com/simple-bucket-27/snowman.mp4" type="video/mp4" />
            </video>
            
            {/* rest of your box and button code... */}
        </main>
    );
}
