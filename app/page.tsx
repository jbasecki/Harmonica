'use client';
import React, { useState, useEffect } from 'react';

// ... (SCENES and alphabetMap stay the same)

export default function VibeGreetingCreator() {
    const [message, setMessage] = useState("");
    const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
    const [selectedScene, setSelectedScene] = useState(SCENES[0]);
    const [isPreview, setIsPreview] = useState(false);
    const [history, setHistory] = useState<any[]>([]);

    // Load History from Local Storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('vibe_history');
        if (saved) setHistory(JSON.parse(saved));
    }, []);

    const tokens = message.split(/(\s+)/);

    const handleSend = () => {
        const encodedMsg = encodeURIComponent(message);
        const encodedGifts = encodeURIComponent(selectedTiles.join(','));
        const newUrl = `/success?msg=${encodedMsg}&tiles=${encodedGifts}`;

        // Save to History
        const newHistory = [{ 
            msg: message.substring(0, 20) + "...", 
            url: newUrl, 
            date: new Date().toLocaleDateString() 
        }, ...history].slice(0, 5); // Keep last 5
        
        localStorage.setItem('vibe_history', JSON.stringify(newHistory));
        window.location.href = newUrl;
    };

    return (
        <main style={styles.container}>
            {/* Background and Preview logic remains the same */}
            
            {!isPreview ? (
                <div style={styles.editorContainer}>
                    {/* ... (Existing Editor Card & Grid) ... */}
                    
                    <div style={styles.card}>
                        {/* ... (Message Input and Buttons) ... */}

                        {/* NEW HISTORY SECTION */}
                        {history.length > 0 && (
                            <div style={styles.historyBox}>
                                <h4 style={{ fontSize: '0.7rem', color: '#999', marginBottom: '10px' }}>RECENTLY SENT</h4>
                                {history.map((item, i) => (
                                    <div key={i} style={styles.historyItem} onClick={() => window.location.href = item.url}>
                                        <span>🎁 {item.msg}</span>
                                        <span style={{ fontSize: '0.6rem' }}>{item.date}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                /* ... (Live Preview Mode with Pulse Label) ... */
            )}
        </main>
    );
}

const styles = {
    // ... (Previous styles)
    historyBox: { marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' },
    historyItem: { 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '8px 12px', background: '#f9f9f9', borderRadius: '10px', 
        marginBottom: '5px', cursor: 'pointer', fontSize: '0.8rem', color: '#666' 
    }
    // ...
};
