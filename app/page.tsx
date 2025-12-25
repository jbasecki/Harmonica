'use client';
import React, { useState } from 'react';

export default function CombinedSenderPage() {
    const [message, setMessage] = useState("");
    const [selectedScene, setSelectedScene] = useState("1"); // Default to Scene 1

    const handlePaymentAndSend = () => {
        // Replace with your real Stripe link once the QR code verification is done
        const STRIPE_LINK = "https://buy.stripe.com/your_unique_link";
        window.open(STRIPE_LINK, '_blank');
    };

    const handlePreview = () => {
        // This opens the cinematic receiver view in a new tab
        window.open(`/receiver/preview?message=${encodeURIComponent(message)}&scene=${selectedScene}`, '_blank');
    };

    return (
        <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
            {/* INSTRUCTION STRIP: Surgical Update */}
            <div style={{ backgroundColor: 'blue', padding: '10px', textAlign: 'center', marginBottom: '20px' }}>
                After you're done writing please click on the words in the top line to transform them into "vibes" (optional).
            </div>

            {/* MAIN INPUT AREA */}
            <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                style={{ width: '100%', height: '200px', borderRadius: '10px', padding: '15px', color: '#000' }}
            />

            {/* SIDEBAR: Backgrounds Label */}
            <div style={{ marginTop: '20px' }}>
                <h3 style={{ fontSize: '0.8rem', opacity: 0.7 }}>BACKGROUNDS</h3>
                {/* Imagine your 1-12 grid here */}
            </div>

            {/* ACTION BUTTONS: Combined Send and Preview */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <button onClick={handlePreview} style={{ padding: '12px 24px', backgroundColor: '#444', borderRadius: '5px' }}>
                    PREVIEW
                </button>
                <button onClick={handlePaymentAndSend} style={{ padding: '12px 24px', backgroundColor: '#0070f3', borderRadius: '5px' }}>
                    SEND (0.99¢)
                </button>
            </div>
        </main>
    );
}
