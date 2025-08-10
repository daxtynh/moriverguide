import { Metadata } from 'next';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';
import LiveWaterLevels from '../components/LiveWaterLevels';

export const metadata: Metadata = {
  title: 'Live Missouri River Water Levels | Real-Time USGS Data',
  description: 'Real-time water levels for Missouri float rivers from USGS monitoring stations. Check current conditions, flow rates, and safety status before your trip.',
  keywords: 'missouri river water levels, current river conditions, float trip water levels, river flow rates, USGS water data',
};

export default function WaterLevelsPage() {
  return (
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
            Real-time river conditions from USGS monitoring stations. 
            Updated every 15 minutes for accurate float planning.
          </p>
        </div>
      </div>

      <div className="section-padding py-12">
        <LiveWaterLevels />
      </div>
    </div>
  );
}