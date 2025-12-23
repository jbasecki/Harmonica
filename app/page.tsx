/* ... keep imports and SCENES as they were ... */

export default function SenderPage() {
    const [message, setMessage] = useState("");
    /* ... keep other states ... */

    // STRIPE PAYMENT LINK METHOD
    // Note: ensure this is defined AFTER 'message' state to avoid the build error in image_9145ae.png
    const handlePaymentAndSend = () => {
        if (!message.trim()) { alert("Please type a message first!"); return; }
        const STRIPE_LINK = "https://buy.stripe.com/your_unique_link_here";
        window.open(STRIPE_LINK, '_blank');
    };

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            {/* ... keep video background ... */}

            {!isCinematicView && (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        
                        {/* BOX AREA - LOCKED PROPORTIONS */}
                        <div style={{ position: 'relative', width: '450px', height: '350px', background: 'rgba(0,0,0,0.4)', borderRadius: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #0070f3', marginBottom: '15px' }}>
                            <div style={{ position: 'absolute', top: '-20px', width: '70%', background: '#0070f3', color: '#fff', padding: '8px 0', borderRadius: '50px', textAlign: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>SEND A HEART IN A BOX</div>
                            <img src="https://storage.googleapis.com/simple-bucket-27/blue-box.png" style={{ width: '85%', opacity: 0.8 }} alt="Box" />

                            {/* HARMONICA TILES ON TOP LAYER */}
                            {selectedTiles.length > 0 && (
                                <div style={{ position: 'absolute', bottom: '60px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 50 }}>
                                    {selectedTiles.map((tile, idx) => (
                                        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', gap: '2px', transform: `perspective(500px) rotateY(${idx % 2 === 0 ? '15deg' : '-15deg'})` }}>
                                                <img src={getLetterUrl(tile.charAt(0))} style={{ width: '60px', border: '1px solid #0070f3', borderRadius: '4px' }} />
                                                <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '60px', border: '1px solid #0070f3', borderRadius: '4px' }} />
                                            </div>
                                            <span style={{ background: '#0070f3', color: '#fff', fontSize: '0.7rem', fontWeight: 'bold', marginTop: '6px', padding: '2px 8px', borderRadius: '4px' }}>{tile}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* UPDATED BLUE STRIP TEXT */}
                        <div style={{ width: '500px', background: '#0070f3', color: '#fff', padding: '10px 20px', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.75rem', textAlign: 'center', marginBottom: '15px' }}>
                            After you're done writing please click on the words in the top line to transform them into "vibes" (optional).
                        </div>

                        {/* INPUT AREAS */}
                        <div style={{ width: '600px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <div style={{ background: 'rgba(0,0,0,0.8)', color: '#fff', padding: '12px 20px', borderRadius: '15px', border: '1px solid #0070f3', minHeight: '45px', textAlign: 'center' }}>
                                {tokens.map((t, i) => {
                                    const clean = t.trim().replace(/[.,!?;:]/g, "");
                                    const isSel = selectedTiles.includes(clean);
                                    return <span key={i} onClick={() => toggleTile(t)} style={{ padding: '2px 6px', margin: '0 2px', borderRadius: '4px', cursor: 'pointer', background: isSel ? '#0070f3' : 'transparent', display: 'inline-block' }}>{t}</span>
                                })}
                            </div>
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message..." style={{ width: '100%', height: '80px', borderRadius: '15px', padding: '15px', border: '1px solid #0070f3', background: 'rgba(0,0,0,0.8)', color: '#fff', fontSize: '1rem', resize: 'none' }} />
                        </div>
                    </div>

                    {/* SIDEBAR WITH NEW "BACKGROUNDS" LABEL */}
                    <div style={{ position: 'absolute', right: '30px', top: '15%', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                        <span style={{ color: '#fff', fontSize: '0.6rem', letterSpacing: '2px', fontWeight: 'bold', opacity: 0.8 }}>BACKGROUNDS</span>
                        <div style={{ background: 'rgba(0,0,0,0.8)', padding: '15px', borderRadius: '25px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', border: '1px solid #0070f3' }}>
                            {SCENES.map((s) => (
                                <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '45px', height: '45px', borderRadius: '12px', border: selectedScene.id === s.id ? '2px solid #fff' : '1px solid #333', background: selectedScene.id === s.id ? '#0070f3' : '#111', color: '#fff', fontSize: '0.7rem' }}>{s.label}</button>
                            ))}
                        </div>
                        {/* ... keep Eye and Send buttons ... */}
                    </div>
                </div>
            )}
        </main>
    );
}
