'use client';
import React, { useState, useEffect } from 'react';

interface TutorialStep {
    title: string;
    description: string;
    emoji: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
    {
        title: "Welcome! 💙",
        description: "Send a heartfelt message in 3 easy steps!",
        emoji: "🎁",
    },
    {
        title: "Step 1: Write",
        description: "Type your message in the text box",
        emoji: "✍️",
    },
    {
        title: "Step 2: Select Words",
        description: "Click words in the top box to make them special. They'll turn into 3D cards!",
        emoji: "✨",
    },
    {
        title: "Step 3: Choose Scene",
        description: "Pick a beautiful background (1-12) from the grid on the right",
        emoji: "🎬",
    },
    {
        title: "Send!",
        description: "Preview with 👁️, then SEND! Recipients can hug you back! 🤗",
        emoji: "🚀",
    },
];

interface TutorialOverlayMobileProps {
    onComplete: () => void;
}

export default function TutorialOverlayMobile({ onComplete }: TutorialOverlayMobileProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
        if (hasSeenTutorial) {
            setIsVisible(false);
            onComplete();
        }
    }, [onComplete]);

    const handleNext = () => {
        if (currentStep < TUTORIAL_STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleComplete();
        }
    };

    const handleSkip = () => {
        handleComplete();
    };

    const handleComplete = () => {
        localStorage.setItem('hasSeenTutorial', 'true');
        setIsVisible(false);
        onComplete();
    };

    if (!isVisible) return null;

    const step = TUTORIAL_STEPS[currentStep];

    return (
        <>
            {/* DARK OVERLAY */}
            <div 
                style={{ 
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.9)',
                    zIndex: 9998,
                }}
                onClick={handleSkip}
            />

            {/* TUTORIAL CARD - BOTTOM SHEET STYLE FOR MOBILE */}
            <div 
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(180deg, rgba(0, 112, 243, 0.98) 0%, rgba(0, 80, 200, 0.98) 100%)',
                    backdropFilter: 'blur(10px)',
                    padding: '30px 25px',
                    borderTopLeftRadius: '30px',
                    borderTopRightRadius: '30px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderBottom: 'none',
                    boxShadow: '0 -10px 40px rgba(0, 112, 243, 0.5)',
                    zIndex: 10000,
                    animation: 'slideUp 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* SWIPE INDICATOR */}
                <div style={{
                    width: '50px',
                    height: '5px',
                    background: 'rgba(255, 255, 255, 0.4)',
                    borderRadius: '3px',
                    margin: '0 auto 20px',
                }} />

                {/* EMOJI */}
                <div style={{
                    fontSize: '50px',
                    textAlign: 'center',
                    marginBottom: '15px',
                }}>
                    {step.emoji}
                </div>

                {/* TITLE */}
                <h2 style={{
                    color: '#fff',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '10px',
                    textAlign: 'center',
                }}>
                    {step.title}
                </h2>

                {/* DESCRIPTION */}
                <p style={{
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontSize: '1rem',
                    lineHeight: '1.5',
                    textAlign: 'center',
                    marginBottom: '20px',
                }}>
                    {step.description}
                </p>

                {/* PROGRESS DOTS */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px',
                    marginBottom: '20px',
                }}>
                    {TUTORIAL_STEPS.map((_, index) => (
                        <div
                            key={index}
                            style={{
                                width: index === currentStep ? '25px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                background: index === currentStep 
                                    ? '#fff' 
                                    : 'rgba(255, 255, 255, 0.3)',
                                transition: 'all 0.3s ease',
                            }}
                        />
                    ))}
                </div>

                {/* BUTTONS */}
                <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                }}>
                    <button
                        onClick={handleSkip}
                        style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            border: '2px solid rgba(255, 255, 255, 0.4)',
                            borderRadius: '50px',
                            padding: '10px 20px',
                            color: '#fff',
                            fontSize: '0.95rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        }}
                    >
                        Skip
                    </button>

                    <button
                        onClick={handleNext}
                        style={{
                            background: '#fff',
                            border: '2px solid #fff',
                            borderRadius: '50px',
                            padding: '10px 25px',
                            color: '#0070f3',
                            fontSize: '0.95rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)',
                        }}
                    >
                        {currentStep === TUTORIAL_STEPS.length - 1 ? "Got it! 🚀" : "Next"}
                    </button>
                </div>

                {/* STEP COUNTER */}
                <div style={{
                    textAlign: 'center',
                    marginTop: '15px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.85rem',
                }}>
                    {currentStep + 1} of {TUTORIAL_STEPS.length}
                </div>
            </div>

            {/* ANIMATIONS */}
            <style jsx>{`
                @keyframes slideUp {
                    from {
                        transform: translateY(100%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    );
}
