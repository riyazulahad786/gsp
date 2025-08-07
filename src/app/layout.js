import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: {
    default: "Supreme Group - Your Trusted Partner",
    template: "%s | Supreme Group"
  },
  description: "Supreme Group provides exceptional services in [your industry]. Discover our innovative solutions and premium offerings.",
  keywords: ["Supreme Group", "your industry keywords", "services", "solutions"],
  authors: [{ name: "Supreme Group" }],
  openGraph: {
    title: "Supreme Group",
    description: "Premium services and solutions from Supreme Group",
    url: "https://yourwebsite.com",
    siteName: "Supreme Group",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Supreme Group - Premium Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supreme Group",
    description: "Premium services and solutions from Supreme Group",
    images: ["https://yourwebsite.com/twitter-image.jpg"],
  },
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`} suppressHydrationWarning>
        <header className="flex-shrink-0">
          <Navbar/>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="flex-shrink-0">
          <Footer/>
        </footer>
      </body>
    </html>
  );
}