import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import ChatBotifyWidget from '@/components/ChatBotifyWidget';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Chatbot Solutions - Automate Customer Support & Boost Sales",
  description: "Transform your business with AI-powered chatbots. Get the BotPenguin King Plan with unlimited conversations, multi-platform support, and 24/7 automation. Start your free trial today!",
  keywords: "AI chatbot, customer support automation, sales chatbot, BotPenguin, King Plan, business automation",
  authors: [{ name: "AI Chatbot Solutions" }],
  creator: "AI Chatbot Solutions",
  publisher: "AI Chatbot Solutions",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'AI Chatbot Solutions - Automate Customer Support & Boost Sales',
    description: 'Transform your business with AI-powered chatbots. Get the BotPenguin King Plan with unlimited conversations, multi-platform support, and 24/7 automation.',
    siteName: 'AI Chatbot Solutions',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Chatbot Solutions - Transform Your Business',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Chatbot Solutions - Automate Customer Support & Boost Sales',
    description: 'Transform your business with AI-powered chatbots. Start your free trial today!',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}

        {/* BotPenguin Chat Widget */}
        {process.env.NEXT_PUBLIC_BOTPENGUIN_BOT_ID && (
          <Script
            id="botpenguin-widget"
            src="https://cdn.botpenguin.com/botpenguin.js"
            strategy="afterInteractive"
          />
        )}
        
        {/* BotPenguin Initialization */}
        {process.env.NEXT_PUBLIC_BOTPENGUIN_BOT_ID && (
          <Script id="botpenguin-init" strategy="afterInteractive">
            {`
              if (typeof window !== 'undefined' && window.BotPenguin) {
                window.BotPenguin.init({
                  botId: '${process.env.NEXT_PUBLIC_BOTPENGUIN_BOT_ID}',
                  customerId: '${process.env.NEXT_PUBLIC_BOTPENGUIN_CUSTOMER_ID}',
                });
              }
            `}
          </Script>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieConsentBanner />
        {process.env.NEXT_PUBLIC_USE_CHATBOTIFY === 'true' && <ChatBotifyWidget />}
      </body>
    </html>
  );
}
