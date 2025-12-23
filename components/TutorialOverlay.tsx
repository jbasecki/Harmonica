'use client';
import React, { useState, useRef } from 'react';

interface HugReceivedPageProps {
    hugData: {
        recipientName: string;
        sceneId?: string;
        timestamp: string;
    };
}

export default function HugReceivedPage({ hugData }: HugReceivedPageProps) {
    const [isMuted, setIsMuted] = useState(true);
    const [showHeart, setShowHeart] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        setTimeout(() => setShowHeart(true), 1000);
    }, []);

    const toggleAudio = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    // Use a warm, comforting scene for hug received
    const sceneId = hugData.sceneId || 'one';

    return (
        <main style={{ 
            height: '100vh', 
            width: '100vw', 
            background: '#000', 
            position: 'relative', 
            overflow: 'hidden', 
            fontFamily: 'sans-serif' 
        }}>
            {/* BACKGROUND VIDEO */}
            <video 
                ref={videoRef}
                autoPlay 
                loop 
                playsInline 
                muted={isMuted} 
                style={{ 
                    position: 'absolute', 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                }}
            >
                <source src={`https://storage.googleapis.com/simple-bucket-27/${sceneId}.mp4`} type="video/mp4" />
            </video>

            {/* AUDIO TOGGLE */}
            <button 
                onClick={toggleAudio}
                style={{ 
                    position: 'absolute', 
                    top: '20px', 
                    left: '20px', 
                    zIndex: 100, 
                    background: 'rgba(0,0,0,0.6)', 
                    border: '1px solid #ff6b9d', 
                    borderRadius: '50%', 
                    width: '50px', 
                    height: '50px', 
                    color: '#fff', 
                    fontSize: '1.5rem', 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                }}
            >
                {isMuted ? '🔇' : '🔊'}
            </button>

            {/* MAIN CONTENT */}
            <div style={{ 
                position: 'relative', 
                zIndex: 10, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center',
                padding: '40px',
            }}>
                {/* ANIMATED HEART */}
                <div style={{ 
                    fontSize: '150px',
                    marginBottom: '40px',
                    opacity: showHeart ? 1 : 0,
                    transform: showHeart ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
                    transition: 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                    filter: 'drop-shadow(0 0 30px rgba(255, 107, 157, 0.8))',
                }}>
                    💗
                </div>

                {/* MESSAGE CARD */}
                <div style={{ 
                    maxWidth: '700px',
                    background: 'rgba(0, 0, 0, 0.85)',
                    backdropFilter: 'blur(15px)',
                    padding: '50px 60px',
                    borderRadius: '30px',
                    border: '3px solid #ff6b9d',
                    boxShadow: '0 15px 50px rgba(255, 107, 157, 0.4)',
                    textAlign: 'center',
                    opacity: showHeart ? 1 : 0,
                    transform: showHeart ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'all 1s ease 0.3s',
                }}>
                    <h1 style={{ 
                        color: '#ff6b9d',
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        marginBottom: '30px',
                        textShadow: '0 0 20px rgba(255, 107, 157, 0.5)',
                    }}>
                        You Received a Hug Back! 🤗
                    </h1>

                    <div style={{ 
                        color: '#fff',
                        fontSize: '1.5rem',
                        lineHeight: '1.8',
                        marginBottom: '30px',
                    }}>
                        <strong style={{ color: '#ff6b9d' }}>{hugData.recipientName}</strong> 
                        {' '}was touched by your message and sent you a warm hug in return! ✨
                    </div>

                    <div style={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '1.1rem',
                        fontStyle: 'italic',
                        marginTop: '30px',
                    }}>
                        Received on {new Date(hugData.timestamp).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                </div>

                {/* FLOATING HEARTS ANIMATION */}
                <div style={{ 
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '100%',
                    pointerEvents: 'none',
                    overflow: 'hidden',
                }}>
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            style={{
                                position: 'absolute',
                                bottom: '-50px',
                                left: `${(i + 1) * 12}%`,
                                fontSize: '40px',
                                opacity: 0.6,
                                animation: `float ${3 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
                            }}
                        >
                            💗
                        </div>
                    ))}
                </div>
            </div>

            {/* ANIMATIONS */}
            <style jsx>{`
                @keyframes float {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.6;
                    }
                    90% {
                        opacity: 0.6;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `}</style>
        </main>
    );
}
