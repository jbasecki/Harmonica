'use client';
import { useSearchParams } from 'next/navigation';

export default function ReceiverPreview() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message') || "Your message will appear here...";
    
    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#000' }}>
            
            {/* 1. BACKGROUND: The Snowman Video */}
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
                    opacity: 0.4, // Dimmed so text pops
                }}
            >
                <source src="https://storage.googleapis.com/simple-bucket-27/snowman.mp4" type="video/mp4" />
            </video>

            {/* 2. THE WRITING: Large, elegant centered text */}
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
                    textShadow: '0px 0px 30px rgba(0,0,0,0.9)', // Deep shadow for readability
                    maxWidth: '900px',
                    lineHeight: '1.2'
                }}>
                    {message}
                </h1>
            </div>
        </div>
    );
}
