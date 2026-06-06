import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Anant Suthar — Cybersecurity & Full Stack Developer',
  description:
    'Portfolio of Anant Suthar — B.Tech Cybersecurity student at MIT ADT University, Pune. Cybersecurity analyst, CTF player, hackathon winner, and full-stack developer. JEE 2024 top 3.6%.',
  keywords: [
    'Anant Suthar', 'cybersecurity', 'full stack developer', 'CTF', 'hackathon',
    'MIT ADT University', 'portfolio', 'Kali Linux', 'React', 'Next.js',
  ],
  authors: [{ name: 'Anant Suthar', url: 'https://github.com/anant720' }],
  creator: 'Anant Suthar',
  openGraph: {
    title: 'Anant Suthar — Cybersecurity & Full Stack Developer',
    description: 'B.Tech Cybersecurity student · CTF Player · Hackathon Winner · Open Source Builder',
    type: 'website',
    locale: 'en_IN',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} bg-bg min-h-screen`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
