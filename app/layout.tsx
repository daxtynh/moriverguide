import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'leaflet/dist/leaflet.css';
import Header from './components/Header';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MoRiverGuide | Missouri River Conditions, Trip Planner & Kayaking Guide",
  description: "Your complete Missouri river guide. Real-time water levels, trip planner, outfitter directory, and 500+ access points for floating, kayaking, and canoeing. Plan your perfect river adventure.",
  keywords: "missouri rivers, river guide, float trips, kayaking missouri, canoeing, river conditions, water levels, trip planner, current river, jacks fork, meramec river, ozark rivers, paddle sports, river access points",
  metadataBase: new URL('https://moriverguide.com'),
  alternates: {
    canonical: 'https://moriverguide.com',
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
