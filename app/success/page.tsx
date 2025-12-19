'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessCard() {
    const searchParams = useSearchParams();
    const msg = searchParams.get('msg') || '';
    const tiles = searchParams.get('tiles') || '';
    
    // This matches the exact URL format in your screenshot
    const shareUrl = `${window.location.origin}/receiver/vibe?msg=${msg}&tiles=${tiles}`;

    return (
        <main style={styles.container}>
            <div style={styles.card}>
                <h2 style={{ color: '#28a745', marginBottom: '10px' }}>Ready to Send! 🎉</h2>
                <p style={{ color: '#666', marginBottom: '30px' }}>Your custom greeting is packaged and ready.</p>
                
                <div style={styles.linkBox}>
                    <p style={{ color: '#ff4500', fontWeight: 'bold', wordBreak: 'break-all' }}>{shareUrl}</p>
                </div>

                <button 
                    onClick={() => { navigator.clipboard.writeText(shareUrl); alert('Link Copied!'); }}
                    style={styles.shareBtn}
                >
                    Share your Vibe Greeting
                </button>

                <p style={{ marginTop: '20px', cursor: 'pointer', color: '#8b4513' }} onClick={() => window.location.href='/'}>
                    ← Create another one
                </p>
            </div>
        </main>
    );
}

export default function SuccessPage() {
    return <Suspense><SuccessCard /></Suspense>;
}

const styles = {
    container: { height: '100vh', width: '100vw', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' },
    card: { background: 'white', padding: '50px 40px', borderRadius: '40px', border: '5px solid #ffd700', width: '90%', maxWidth: '550px', textAlign: 'center', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' },
    linkBox: { background: '#f0f2f5', padding: '20px', borderRadius: '15px', marginBottom: '30px' },
    shareBtn: { width: '100%', background: '#ff6600', color: 'white', padding: '18px', borderRadius: '50px', border: 'none', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer' }
};
