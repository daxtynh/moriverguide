'use client';

import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import MapWrapper from './MapWrapper';

export default function MapPageClient() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-river-600 to-river-700 text-white py-16">
        <div className="section-padding">
          <nav className="flex items-center gap-2 text-sm mb-4 opacity-90">
            <Link href="/" className="hover:text-white flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span>Interactive Map</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Missouri Float Trips Interactive Map
          </h1>
          <p className="text-xl opacity-95 max-w-3xl">
            Explore all rivers, access points, and outfitters on our interactive map. 
            Click on any marker for details and directions.
          </p>
        </div>
      </div>
      
      <div className="section-padding py-8">
        <MapWrapper />
      </div>
    </div>
  );
}