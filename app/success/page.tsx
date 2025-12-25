'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [shareUrl, setShareUrl] = useState("");

    useEffect(() => {
        if (id) {
            // This generates the link the recipient will eventually click
            setShareUrl(`${window.location.origin}/receive?id=${id}`);
        }
    }, [id]);

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        alert("Link copied! Send this to your person.");
    };

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'sans-serif', textAlign: 'center' }}>
            <div style={{ background: 'rgba(0,112,243,0.1)', padding: '40px', borderRadius: '30px', border: '2px solid #0070f3', maxWidth: '500px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📦 SENT!</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '30px' }}>Your Heart in a Box is ready to be opened.</p>
                
                <div style={{ background: '#111', padding: '20px', borderRadius: '15px', border: '1px border #333', marginBottom: '20px', wordBreak: 'break-all' }}>
                    <code style={{ color: '#0070f3' }}>{shareUrl || 'Generating link...'}</code>
                </div>

                <button onClick={copyLink} style={{ background: '#0070f3', color: '#fff', border: 'none', padding: '15px 40px', borderRadius: '50px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>
                    COPY LINK TO SHARE
                </button>
                
                <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>Text or DM this link to your person so they can see your vibe.</p>
            </div>
        </main>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
