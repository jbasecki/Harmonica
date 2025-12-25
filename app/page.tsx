'use client';
import React, { useState } from 'react';

export default function CombinedSenderPage() {
    const [message, setMessage] = useState("");
    const [selectedScene, setSelectedScene] = useState("1"); 

    const handlePaymentAndSend = () => {
        // This links to your Stripe checkout once your QR verification is done
        const STRIPE_LINK = "https://buy.stripe.com/your_unique_link";
        window.open(STRIPE_LINK, '_blank');
    };

    const handlePreview = () => {
        // This opens the cinematic receiver view in a new tab to "get the point"
        window.open(`/receiver/preview?message=${encodeURIComponent(message)}&scene=${selectedScene}`, '_blank');
    };

    return (
        <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
            {/* INSTRUCTION STRIP: Landmark for intuition */}
            <div style={{ backgroundColor: 'blue', padding: '15px', textAlign: 'center', marginBottom: '20px', borderRadius: '8px' }}>
                After you're done writing, please click on the words in the **top line** to transform them into "vibes" (optional).
            </div>

            {/* MESSAGE INPUT */}
            <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your digital hug message here..."
                style={{ width: '100%', height: '150px', borderRadius: '10px', padding: '15px', color: '#000', fontSize: '1.1rem' }}
            />

            {/* SIDEBAR NAVIGATION: Logic bridge */}
            <div style={{ marginTop: '30px' }}>
                <h3 style={{ fontSize: '0.9rem', opacity: 0.8, letterSpacing: '1px' }}>BACKGROUNDS</h3>
                <p style={{ fontSize: '0.7rem', marginBottom: '10px' }}>Select the snowy scene for your message (1-12)</p>
                {/* Your 1-12 grid logic sits here in the final build */}
            </div>

            {/* ACTION BUTTONS: The Intuition Solution */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '40px' }}>
                <button 
                    onClick={handlePreview} 
                    style={{ flex: 1, padding: '15px', backgroundColor: '#444', color: 'white', borderRadius: '8px', cursor: 'pointer', border: '1px solid #666' }}
                >
                    SEE PREVIEW (FREE)
                </button>
                <button 
                    onClick={handlePaymentAndSend} 
                    style={{ flex: 1, padding: '15px', backgroundColor: '#0070f3', color: 'white', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}
                >
                    SEND GIFT (0.99¢)
                </button>
            </div>
        </main>
    );
}
