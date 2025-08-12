import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from './components/Header';

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  fallback: ['system-ui', 'Arial', 'sans-serif']
});

export const metadata: Metadata = {
  title: "MoRiverGuide | Missouri River Conditions, Trip Planner & Kayaking Guide",
  description: "Your complete Missouri river guide. Real-time water levels, trip planner, outfitter directory, and 500+ access points for floating, kayaking, and canoeing. Plan your perfect river adventure.",
  keywords: "missouri rivers, river guide, float trips, kayaking missouri, canoeing, river conditions, water levels, trip planner, current river, jacks fork, meramec river, ozark rivers, paddle sports, river access points",
  metadataBase: new URL('https://moriverguide.com'),
  alternates: {
    canonical: 'https://moriverguide.com',
  },
  other: {
    'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
  },
  openGraph: {
    title: "MoRiverGuide - Missouri River Conditions & Trip Planner",
    description: "Real-time river conditions, trip planner, and complete guide for Missouri rivers. Plan your perfect float, kayak, or canoe adventure.",
    url: "https://moriverguide.com",
    siteName: "MoRiverGuide",
    images: [
      {
        url: "https://moriverguide.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MoRiverGuide - Missouri River Adventures",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoRiverGuide | Missouri River Conditions & Trip Planner",
    description: "Real-time river conditions, trip planner, and guides for Missouri rivers. Float, kayak, or canoe with confidence.",
    images: ["https://moriverguide.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0284c7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "MoRiverGuide",
    "description": "Complete guide to Missouri rivers - conditions, trip planning, and outfitters",
    "url": "https://moriverguide.com",
    "areaServed": {
      "@type": "State",
      "name": "Missouri"
    },
    "serviceType": ["River Guide", "Float Trips", "Kayaking", "Canoeing", "Trip Planning"],
    "priceRange": "$0-$150",
  };

  return (
    <html lang="en">
      <head>
        {/* Resource preloading */}
        <link rel="preconnect" href="https://moriverguide.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://waterservices.usgs.gov" />
        <meta httpEquiv="Link" content="<https://moriverguide.com>; rel=preconnect" />
        
        {/* Critical CSS for above-the-fold content */}
        <style dangerouslySetInnerHTML={{
          __html: `
            body{margin:0;background-color:rgb(249 250 251);-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;color:rgb(17 24 39)}
            .min-h-screen{min-height:100vh}
            .relative{position:relative}
            .h-screen{height:100vh}
            .overflow-hidden{overflow:hidden}
            .absolute{position:absolute}
            .inset-0{inset:0}
            .object-cover{object-fit:cover}
            .z-10{z-index:10}
            .flex{display:flex}
            .items-center{align-items:center}
            .justify-center{justify-content:center}
            .text-center{text-align:center}
            .text-white{color:white}
            .bg-white{background-color:white}
            .rounded-xl{border-radius:0.75rem}
            .shadow-2xl{box-shadow:0 25px 50px -12px rgba(0,0,0,0.25)}
            .p-4{padding:1rem}
            .max-w-3xl{max-width:48rem}
            .mx-auto{margin-left:auto;margin-right:auto}
            .grid{display:grid}
            .grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}
            .gap-4{gap:1rem}
            .min-h-\\[44px\\]{min-height:44px}
            .min-h-\\[48px\\]{min-height:48px}
            .text-base{font-size:1rem;line-height:1.5rem}
            .w-full{width:100%}
            @media(min-width:768px){
              .md\\:grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}
              .md\\:gap-2{gap:0.5rem}
              .md\\:py-3{padding-top:0.75rem;padding-bottom:0.75rem}
              .md\\:w-auto{width:auto}
            }
            @media(max-width:767px){
              .py-4{padding-top:1rem;padding-bottom:1rem}
              .border-0{border:0}
            }
          `
        }} />
        
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-03ZXQNWT7J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-03ZXQNWT7J');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
          suppressHydrationWarning
        />
      </body>
    </html>
  );
}
