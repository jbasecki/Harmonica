'use client';
import React, { useState } from 'react';

export default function SuccessPage() {
    const [message, setMessage] = useState('');
    const [copied, setCopied] = useState(false);

    // This creates the link the receiver will see
    const handleCopy = () => {
        const baseUrl = window.location.origin;
        const shareableLink = `${baseUrl}/receiver?msg=${encodeURIComponent(message)}`;
        navigator.clipboard.writeText(shareableLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <main style={{ minHeight: '100vh', background: '#000', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
            
            <div style={{ border: '2px solid gold', padding: '40px', borderRadius: '20px', background: 'rgba(255,255,0,0.05)', maxWidth: '500px', width: '100%' }}>
                <h1 style={{ color: 'gold', fontSize: '2rem', marginBottom: '10px' }}>VAULT SECURED</h1>
                <p style={{ marginBottom: '30px', opacity: 0.8 }}>Your $0.99 Vibe has been stashed. Now, write the message you want them to unfold.</p>

                {/* THE GREETING INPUT */}
                <textarea 
                    placeholder="Type your 2026 intention or greeting here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ width: '100%', height: '150px', borderRadius: '10px', padding: '15px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid gold', marginBottom: '20px', fontSize: '1rem', outline: 'none' }}
                />

                {/* THE COPY/SHARE BUTTON */}
                <button 
                    onClick={handleCopy}
                    disabled={!message}
                    style={{ background: message ? 'gold' : '#444', color: 'black', width: '100%', padding: '15px', borderRadius: '30px', fontWeight: 'bold', cursor: message ? 'pointer' : 'not-allowed', border: 'none', fontSize: '1.1rem', transition: '0.3s' }}
                >
                    {copied ? 'LINK COPIED!' : 'STASH & COPY LINK'}
                </button>

                {copied && <p style={{ color: 'gold', marginTop: '15px', fontSize: '0.9rem' }}>✨ Paste this link to your friend on X, Messenger, or WhatsApp!</p>}
            </div>
        </main>
    );
}
