import { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import LiveWaterLevels from '../components/LiveWaterLevels';

export const metadata: Metadata = {
  title: 'Live Missouri River Water Levels | Real-Time USGS Data',
  description: 'Real-time water levels for 20+ Missouri float rivers from USGS monitoring stations. Check current conditions, flow rates, and safety status before your trip.',
  keywords: 'missouri river water levels, current river conditions, float trip water levels, river flow rates, USGS water data, missouri floating conditions',
  openGraph: {
    title: 'Live Missouri River Water Levels | Real-Time USGS Data',
    description: 'Real-time water levels for 20+ Missouri float rivers from USGS monitoring stations.',
    type: 'website',
    siteName: 'Missouri River Guide',
    images: [{
      url: 'https://moriverguide.com/api/og?title=Missouri%20River%20Water%20Levels',
      width: 1200,
      height: 630,
      alt: 'Missouri river water levels dashboard'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Missouri River Water Levels',
    description: 'Real-time water levels for 20+ Missouri float rivers from USGS monitoring stations.',
    images: ['https://moriverguide.com/api/og?title=Missouri%20River%20Water%20Levels']
  },
  alternates: {
    canonical: 'https://moriverguide.com/water-levels',
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
};

export default function WaterLevelsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://moriverguide.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Water Levels",
        "item": "https://moriverguide.com/water-levels"
      }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Live Missouri River Water Levels",
    "description": "Real-time water levels for 20+ Missouri float rivers from USGS monitoring stations. Check current conditions, flow rates, and safety status before your trip.",
    "url": "https://moriverguide.com/water-levels",
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Missouri River Guide",
      "url": "https://moriverguide.com"
    },
    "breadcrumb": breadcrumbSchema,
    "mainEntity": {
      "@type": "Dataset",
      "name": "Missouri Rivers Water Level Data",
      "description": "Comprehensive collection of real-time water level and flow data for Missouri's major float rivers from USGS monitoring stations",
      "creator": {
        "@type": "Organization",
        "name": "U.S. Geological Survey"
      },
      "keywords": ["Missouri rivers", "water levels", "river conditions", "float trip planning", "USGS data"]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="section-padding">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-sm mb-4 opacity-90">
              <Link href="/" className="hover:text-white flex items-center">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span>Water Levels</span>
            </nav>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Live Water Levels
            </h1>
            <p className="text-xl opacity-95 max-w-3xl">
              Real-time river conditions from USGS monitoring stations for 20+ Missouri rivers. 
              Updated every 15 minutes for accurate float planning.
            </p>
          </div>
        </div>

        <div className="section-padding py-12">
          <LiveWaterLevels />
        </div>
      </div>
    </>
  );
}