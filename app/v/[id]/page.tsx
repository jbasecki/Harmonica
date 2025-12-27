'use client';
import React, { useState, useEffect } from 'react';

export default function ReceiverPage() {
    const [isUnfolded, setIsUnfolded] = useState(false);
    const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds

    // Simple countdown logic
    useEffect(() => {
        if (!isUnfolded) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [isUnfolded]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontFamily: 'sans-serif' }}>
            {!isUnfolded ? (
                <div onClick={() => setIsUnfolded(true)} style={{ cursor: 'pointer' }}>
                    <img 
                        src="https://storage.googleapis.com/simple-bucket-27/gold-vault-final.png" 
                        style={{ width: '250px', borderRadius: '20px', boxShadow: '0 0 30px gold' }} 
                        alt="Vault" 
                    />
                    <h2 style={{ color: 'gold', marginTop: '20px' }}>TAP TO UNFOLD</h2>
                </div>
            ) : (
                <div style={{ padding: '20px' }}>
                    <h1 style={{ color: 'white', fontSize: '2.5rem' }}>Your Vibe has Unfolded.</h1>
                    
                    <div style={{ marginTop: '30px', border: '1px solid gold', padding: '20px', borderRadius: '15px', background: 'rgba(255,215,0,0.1)' }}>
                        <h3 style={{ color: 'gold', margin: '0' }}>EARLY BIRD BONUS</h3>
                        <p style={{ color: '#ccc' }}>Respond within the next hour to send your next Vibe for FREE!</p>
                        <h2 style={{ color: 'white', fontSize: '2rem' }}>{formatTime(timeLeft)}</h2>
                        
                        <button 
                            onClick={() => window.location.href = '/'} 
                            style={{ marginTop: '15px', background: 'gold', color: 'black', padding: '12px 25px', borderRadius: '25px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
                        >
                            CLAIM MY FREE VIBE
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
