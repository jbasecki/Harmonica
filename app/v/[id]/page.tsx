'use client';
import React, { useState } from 'react';

export default function ReceiverPage({ params }: { params: { id: string } }) {
    // In a full version, we'd fetch the message using the 'id'
    const [isUnfolded, setIsUnfolded] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    // Placeholder data - this will eventually come from your database
    const selectedVideoId = "one"; 
    const senderMessage = "Your meditative vibe has arrived. Breathe in the winter.";

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            
            {/* CINEMATIC VIDEO - NO LOOP */}
            <video 
                autoPlay 
                muted={isMuted} 
                playsInline
                /* Plays once and stays on the final frame for a movie feel */
                style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
            >
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedVideoId}.mp4`} type="video/mp4" />
            </video>

            {/* OVERLAY CONTENT */}
            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.3)' }}>
                
                {!isUnfolded ? (
                    /* THE INITIAL GIFT REVEAL */
                    <div onClick={() => setIsUnfolded(true)} style={{ cursor: 'pointer', textAlign: 'center' }}>
                        <img 
                            src="https://storage.googleapis.com/simple-bucket-27/gold-vault-final.png" 
                            style={{ width: '250px', borderRadius: '20px', boxShadow: '0 0 50px gold' }} 
                            alt="The Vault" 
                        />
                        <h2 style={{ color: 'gold', marginTop: '20px', letterSpacing: '2px' }}>TAP TO UNFOLD</h2>
                    </div>
                ) : (
                    /* THE FINAL MESSAGE REVEAL */
                    <div style={{ width: '85%', maxWidth: '600px', textAlign: 'center', animation: 'fadeIn 2s ease-in' }}>
                        <h1 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 'bold', textShadow: '2px 2px 10px rgba(0,0,0,0.8)' }}>
                            {senderMessage}
                        </h1>
                        <button onClick={() => window.location.href = '/'} style={{ marginTop: '40px', background: 'transparent', border: '1px solid #fff', color: '#fff', padding: '10px 25px', borderRadius: '20px', cursor: 'pointer' }}>
                            SEND YOUR OWN VIBE
                        </button>
                    </div>
                )}

                <button onClick={() => setIsMuted(!isMuted)} style={{ position: 'absolute', bottom: '30px', right: '30px', background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}>
                    {isMuted ? '🔇' : '🔊'}
                </button>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </main>
    );
}
