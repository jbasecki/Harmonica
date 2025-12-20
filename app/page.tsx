/* ... existing imports and SCENES array ... */

export default function SenderPage() {
    /* ... existing state hooks ... */

    return (
        <main style={{ height: '100vh', width: '100vw', background: '#000', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
            <video key={selectedScene.id} autoPlay loop playsInline style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}>
                <source src={`https://storage.googleapis.com/simple-bucket-27/${selectedScene.id}.mp4`} type="video/mp4" />
            </video>

            {/* EYE TOGGLE: CLEAN VIEW */}
            {isCleanView && (
                <div onClick={() => setIsCleanView(false)} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 100, cursor: 'pointer', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '60px' }}>
                    <div style={{ background: '#fff', padding: '15px 25px', borderRadius: '50px', fontWeight: 'bold', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>✍️ Tap to return to Editor</div>
                </div>
            )}

            {!isCleanView && (
                <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    
                    {/* MAIN CARD */}
                    <div style={{ background: 'rgba(255,255,255,0.96)', padding: '30px', borderRadius: '50px', width: '95%', maxWidth: isPreview ? '850px' : '580px', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', transition: 'max-width 0.3s' }}>
                        <h2 style={{ marginBottom: '10px' }}>{isPreview ? "👁️ Preview" : "Vibe Greeting Shop"}</h2>
                        
                        {/* PREVIEW AREA: Enlarged for Bow Visibility */}
                        <div style={{ minHeight: '220px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '25px', flexWrap: 'wrap', paddingTop: '40px' }}>
                            {isPreview ? (
                                selectedTiles.map((tile, idx) => (
                                    <div key={idx} style={{ position: 'relative', width: '280px' }}>
                                        {/* Typos handled: gifr-box.png */}
                                        <img src="https://storage.googleapis.com/simple-bucket-27/gifr-box.png" style={{ width: '100%' }} />
                                        <div style={{ position: 'absolute', bottom: '35px', left: '15px', right: '15px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                                            <img src={getLetterUrl(tile.charAt(0))} style={{ width: '45%', borderRadius: '4px', border: '1.5px solid gold', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }} />
                                            <img src={getLetterUrl(tile.charAt(tile.length - 1))} style={{ width: '45%', borderRadius: '4px', border: '1.5px solid gold', boxShadow: '0 4px 8px rgba(0,0,0,0.3)' }} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ textAlign: 'left', lineHeight: '2', fontSize: '1.2rem', width: '100%' }}>
                                    {tokens.map((t, i) => {
                                        const clean = t.toLowerCase().replace(/[.,!?;:]/g, "").trim();
                                        const isSel = selectedTiles.includes(clean);
                                        return <span key={i} onClick={() => clean && setSelectedTiles(prev => isSel ? prev.filter(x => x !== clean) : [...prev, clean])} style={{ padding: '2px 6px', borderRadius: '6px', cursor: 'pointer', background: isSel ? '#ff6600' : 'transparent', color: isSel ? '#fff' : '#000' }}>{t}</span>
                                    })}
                                </div>
                            )}
                        </div>

                        {!isPreview && <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..." style={{ width: '100%', height: '60px', marginTop: '15px', borderRadius: '15px', padding: '12px', border: '1px solid #ddd' }} />}
                        
                        <div style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                            <button onClick={() => setIsPreview(!isPreview)} style={{ background: '#eee', padding: '12px 25px', borderRadius: '50px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>{isPreview ? '✍️ Edit' : '👁️ Preview'}</button>
                            <button onClick={handleSend} style={{ background: '#ff6600', color: '#fff', padding: '12px 35px', borderRadius: '50px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>Wrap & Send (0.99¢)</button>
                        </div>
                    </div>

                    {/* SIDEBAR: GRID + EYE */}
                    <div style={{ marginLeft: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.85)', padding: '15px', borderRadius: '25px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                            {SCENES.map((s) => (
                                <button key={s.id} onClick={() => setSelectedScene(s)} style={{ width: '50px', height: '50px', borderRadius: '12px', border: selectedScene.id === s.id ? '3px solid #ff6600' : '1px solid #ccc', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>{s.label}</button>
                            ))}
                        </div>
                        <button onClick={() => setIsCleanView(true)} style={{ background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '20px', padding: '15px', cursor: 'pointer', fontSize: '1.8rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>👁️</button>
                    </div>
                </div>
            )}
        </main>
    );
}
