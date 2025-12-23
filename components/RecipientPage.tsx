'use client';
import React, { useState, useEffect, useRef } from 'react';

interface RecipientPageProps {
    messageData: {
        message: string;
        tiles: string[];
        sceneId: string;
        senderName?: string;
    };
    onSendHugBack: () => void;
}

export default function RecipientPage({ messageData, onSendHugBack }: RecipientPageProps) {
    const [showMessage, setShowMessage] = useState(false);
    const [currentTileIndex, setCurrentTileIndex] = useState(0);
    const [allTilesShown, setAllTilesShown] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [hugSent, setHugSent] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const getLetterUrl = (l: string) => `https://storage.googleapis.com/simple-bucket-27/${l.toUpperCase()}5.png`;

    useEffect(() => {
        // Animation sequence
        const timer1 = setTimeout(() => setShowMessage(true), 2000);
        
        if (messageData.tiles.length > 0) {
            const timer2 = setTimeout(() => {
                const interval = setInterval(() => {
                    setCurrentTileIndex(prev => {
                        if (prev >= messageData.tiles.length - 1) {
                            clearInterval(interval);
                            setAllTilesShown(true);
                            return prev;
                        }
                        return prev + 1;
                    });
                }, 800);
                return () => clearInterval(interval);
            }, 3000);
            
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }
        
        return () => clearTimeout(timer1);
    }, [messageData.tiles.length]);

    const toggleAudio = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const handleSendHugBack = () => {
        setHugSent(true);
        setTimeout(() => {
            onSendHugBack();
        }, 2000);
    };

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
                <source src={`https://storage.googleapis.com/simple-bucket-27/${messageData.sceneId}.mp4`} type="video/mp4" />
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
                    border: '1px solid #0070f3', 
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
                {/* GIFT BOX OPENING ANIMATION */}
                <div style={{ 
                    position: 'relative',
                    marginBottom: '40px',
                    opacity: showMessage ? 1 : 0,
                    transform: showMessage ? 'scale(1)' : 'scale(0.8)',
                    transition: 'all 1s ease',
                }}>
                    <img 
                        src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" 
                        style={{ 
                            width: '300px',
                            filter: allTilesShown ? 'brightness(1.2)' : 'brightness(1)',
                            transition: 'filter 0.5s ease',
                        }} 
                        alt="Gift Box" 
                    />
                    
                    {/* ANIMATED TILES EMERGING FROM BOX */}
                    {messageData.tiles.length > 0 && (
                        <div style={{ 
                            position: 'absolute', 
                            top: '-60px', 
                            left: '50%',
                            transform: 'translateX(-50%)',
                            display: 'flex', 
                            gap: '20px',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            maxWidth: '600px',
                        }}>
                            {messageData.tiles.map((tile, idx) => (
                                <div 
                                    key={idx} 
                                    style={{ 
                                        display: idx <= currentTileIndex ? 'flex' : 'none',
                                        flexDirection: 'column', 
                                        alignItems: 'center',
                                        opacity: idx <= currentTileIndex ? 1 : 0,
                                        transform: idx <= currentTileIndex ? 'translateY(0) rotate(0deg)' : 'translateY(100px) rotate(180deg)',
                                        transition: 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                                    }}
                                >
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <img 
                                            src={getLetterUrl(tile.charAt(0))} 
                                            style={{ 
                                                width: '100px', 
                                                border: '3px solid #0070f3', 
                                                transform: 'rotateY(20deg) skewY(-4deg)',
                                                boxShadow: '0 8px 25px rgba(0, 112, 243, 0.5)',
                                                borderRadius: '8px',
                                            }} 
                                            alt="L" 
                                        />
                                        <img 
                                            src={getLetterUrl(tile.charAt(tile.length - 1))} 
                                            style={{ 
                                                width: '100px', 
                                                border: '3px solid #0070f3', 
                                                transform: 'rotateY(-20deg) skewY(4deg)',
                                                boxShadow: '0 8px 25px rgba(0, 112, 243, 0.5)',
                                                borderRadius: '8px',
                                            }} 
                                            alt="R" 
                                        />
                                    </div>
                                    <span style={{ 
                                        color: '#fff', 
                                        fontSize: '1.3rem', 
                                        fontWeight: 'bold', 
                                        background: 'rgba(0, 112, 243, 0.9)', 
                                        padding: '8px 16px', 
                                        borderRadius: '15px', 
                                        marginTop: '12px',
                                        boxShadow: '0 4px 15px rgba(0, 112, 243, 0.4)',
                                    }}>
                                        {tile}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* MESSAGE TEXT */}
                {showMessage && (
                    <div style={{ 
                        maxWidth: '800px',
                        background: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(10px)',
                        padding: '40px 50px',
                        borderRadius: '25px',
                        border: '2px solid #0070f3',
                        boxShadow: '0 10px 40px rgba(0, 112, 243, 0.3)',
                        opacity: allTilesShown ? 1 : 0,
                        transform: allTilesShown ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 1s ease 0.5s',
                    }}>
                        {messageData.senderName && (
                            <div style={{ 
                                color: '#0070f3',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                marginBottom: '20px',
                                textAlign: 'center',
                            }}>
                                From: {messageData.senderName} 💙
                            </div>
                        )}
                        
                        <div style={{ 
                            color: '#fff',
                            fontSize: '1.5rem',
                            lineHeight: '2',
                            textAlign: 'center',
                            whiteSpace: 'pre-wrap',
                        }}>
                            {messageData.message}
                        </div>
                    </div>
                )}

                {/* SEND HUG BACK BUTTON */}
                {allTilesShown && (
                    <button
                        onClick={handleSendHugBack}
                        disabled={hugSent}
                        style={{ 
                            marginTop: '40px',
                            background: hugSent ? 'rgba(0, 200, 0, 0.9)' : 'linear-gradient(135deg, #ff6b9d 0%, #c06c84 100%)',
                            color: '#fff',
                            border: hugSent ? '2px solid #00ff00' : '2px solid #ff6b9d',
                            borderRadius: '50px',
                            padding: '18px 50px',
                            fontSize: '1.4rem',
                            fontWeight: 'bold',
                            cursor: hugSent ? 'default' : 'pointer',
                            boxShadow: hugSent ? '0 0 30px rgba(0, 255, 0, 0.6)' : '0 8px 25px rgba(255, 107, 157, 0.4)',
                            transition: 'all 0.4s ease',
                            opacity: hugSent ? 1 : 1,
                            transform: hugSent ? 'scale(1.1)' : 'scale(1)',
                            pointerEvents: hugSent ? 'none' : 'auto',
                        }}
                        onMouseEnter={(e) => {
                            if (!hugSent) {
                                e.currentTarget.style.transform = 'scale(1.1)';
                                e.currentTarget.style.boxShadow = '0 12px 35px rgba(255, 107, 157, 0.6)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!hugSent) {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 107, 157, 0.4)';
                            }
                        }}
                    >
                        {hugSent ? '🤗 Hug Sent! 🤗' : '🤗 Send a Hug Back 🤗'}
                    </button>
                )}

                {hugSent && (
                    <div style={{ 
                        marginTop: '20px',
                        color: '#00ff00',
                        fontSize: '1.2rem',
                        textAlign: 'center',
                        animation: 'pulse 1.5s ease infinite',
                    }}>
                        ✨ Your warm hug is on its way! ✨
                    </div>
                )}
            </div>

            {/* ANIMATIONS */}
            <style jsx>{`
                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.7;
                        transform: scale(1.05);
                    }
                }
            `}</style>
        </main>
    );
}
