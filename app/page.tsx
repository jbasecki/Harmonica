{/* Updated Header: It now stays visible until the box is 'Wrapped' */}
{!isWrapped && (
    <div style={{ 
        textAlign: 'center', 
        marginBottom: '25px', 
        zIndex: 50, // Higher z-index to stay above the video
        animation: 'fadeIn 2s ease-in' // Gives it a smooth entrance
    }}>
        <h1 style={{ 
            color: '#fff', 
            fontSize: '3rem', 
            fontWeight: '900', 
            textShadow: '0 0 20px #0070f3',
            margin: '0'
        }}>
            Sending a Heart in a Box
        </h1>
        <p style={{ 
            color: '#0070f3', 
            fontSize: '1.4rem', 
            fontWeight: 'bold', 
            marginTop: '8px',
            textTransform: 'uppercase'
        }}>
            — Send a Vibe —
        </p>
    </div>
)}
