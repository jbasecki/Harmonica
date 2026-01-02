import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// 1. Loading the "Sanctuary" fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Harmonica | The Art of Greeting",
  description: "A sanctuary for thoughtful words and metaphors.",
  // 2. Linking your Gold-Edged "Face" as the preview image
  openGraph: {
    images: ['/opengraph-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-black text-white antialiased`}>
        {/* 3. Global background treatment to ensure video visibility */}
        <div className="fixed inset-0 bg-black -z-50" />
        
        {/* The main content of your pages */}
        {children}
      </body>
    </html>
  );
}
