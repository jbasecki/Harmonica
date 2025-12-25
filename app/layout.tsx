import type { Metadata } from 'next'

// We removed the globals.css line to fix the "Module not found" error

export const metadata: Metadata = {
  title: 'A Digital Hug | Special Vibe Greeting',
  description: 'Someone sent you a secret winter vibe! Tap to unwrap your message.',
  openGraph: {
    title: 'A Digital Hug 🎉',
    description: 'You have a secret winter message waiting...',
    url: 'https://vibe-letter-final-clean.vercel.app',
    siteName: 'Vibe Greeting Shop',
    images: [
      {
        url: 'https://storage.googleapis.com/simple-bucket-27/A.png', 
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, overflowX: 'hidden' }}>
        {/* This line is critical; it displays your sender, success, and receiver pages */}
        {children}
      </body>
    </html>
  )
}
