'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// This handles the cinematic display once the URL data is ready
function PreviewDisplay() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message') || "Merry Christmas!";
    
    // We are using 'eleven.mp4' from your bucket
    // because it is a clean greeting without the ad's call-to-action
    const videoUrl = "https://storage.googleapis.com/simple-bucket-27/eleven.mp4";

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#000' }}>
            
            {/* 1. ATMOSPHERIC BACKGROUND: Dimmed to 40% */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.4, 
                }}
            >
                <source src={videoUrl} type="video/mp4" />
            </video>

            {/* 2. PRIORITY WRITING: Large, centered, and readable */}
            <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                padding: '40px',
                textAlign: 'center'
            }}>
                <h1 style={{
                    color: 'white',
                    fontSize: '3.5rem',
                    fontWeight: '300',
                    textShadow: '0px 0px 30px rgba(0,0,0,0.9)',
                    maxWidth: '900px',
                    lineHeight: '1.2'
                }}>
                    {message}
                </h1>
            </div>
        </div>
    );
}

// Main page export with Suspense to prevent Vercel Build Errors
export default function ReceiverPreview() {
    return (
        <Suspense fallback={<div style={{color: 'white', padding: '20px'}}>Preparing your digital hug...</div>}>
            <PreviewDisplay />
        </Suspense>
    );
}
