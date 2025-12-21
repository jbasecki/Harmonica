'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ReceiverPage() {
    // These would eventually be loaded from your database via a URL ID
    const [receivedMessage, setReceivedMessage] = useState("have a great evening and lots of love for the New Year!");
    const [receivedTiles, setReceivedTiles] = useState(["great", "evening", "love", "New", "Year!"]);
    const [sceneId, setSceneId] = useState("two"); // Defaulting to the New Year scene

    const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            {/* Background Cinematic Scene */}
            <video key={sceneId} autoPlay loop playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${sceneId}.mp4`} type="video/mp4" />
            </video>

            <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                    <h1 style={{ color: '#fff', marginBottom: '20px', textShadow: '0 0 10px #0070f3' }}>✨ You received a Vibe!</h1>

                    {/* BOX AREA: The Revealed Secret */}
                    <div style={{ position: 'relative', width: '450px', minHeight: '400px', background: 'rgba(0,0,0,0.6)', borderRadius: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '2px solid #0070f3', perspective: '1000px', boxShadow: '0 0 30px rgba(0,112,243,0.4)' }}>
                        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '90%', filter: 'drop-shadow(0 0 15px rgba(0, 112, 243, 0.6))' }} />
                            
                            <div style={{ position: 'absolute', bottom: '60px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', padding: '0 10px' }}>
                                {receivedTiles.map((tile, idx) => (
                                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <img src={getLetterUrl(tile.charAt(0))} style={{ width: '60px', borderRadius: '5px', border: '2px solid #0070f3', boxShadow: '0 0 10px #0070f3', transform: 'rotateY(20deg) skewY(-4deg)' }} />
                                            <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '60px', borderRadius: '5px', border: '2px solid #0070f3', boxShadow: '0 0 10px #0070f3', transform: 'rotateY(-20deg) skewY(4deg)' }} />
                                        </div>
                                        <span style={{ color: '#0070f3', fontSize: '0.8rem', fontWeight: 'bold', background: 'rgba(0,0,0,0.8)', padding: '1px 6px', borderRadius: '8px', marginTop: '4px' }}>{tile}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Full Message Reveal */}
                    <div style={{ width: '650px', marginTop: '30px', background: 'rgba(0,0,0,0.85)', color: '#fff', padding: '20px 30px', borderRadius: '15px', border: '1px solid #0070f3', textAlign: 'center', fontSize: '1.4rem', lineHeight: '1.5', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                        {receivedMessage}
                    </div>

                    {/* THE VIRAL "HUG BACK" BUTTON */}
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <button style={{ marginTop: '30px', background: '#0070f3', color: '#fff', padding: '15px 60px', borderRadius: '50px', border: 'none', fontWeight: 'bold', fontSize: '1.6rem', cursor: 'pointer', boxShadow: '0 0 25px rgba(0,112,243,0.8)', transition: 'transform 0.2s' }}>
                            💙 Send a Hug Back
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
