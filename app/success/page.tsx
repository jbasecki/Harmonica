'use client';
import React from 'react';

export default function SuccessPage() {
    return (
        <main style={{ height: '100vh', background: '#000', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img 
                src="https://storage.googleapis.com/simple-bucket-27/gold-vault-final.png" 
                style={{ width: '300px', marginBottom: '20px' }} 
                alt="Gold Vault"
            />
            <h1>YOUR VIBE IS STASHED</h1>
            <p>Check your email for the link to share with your friend.</p>
        </main>
    );
}
