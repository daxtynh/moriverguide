'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, Navigation, Car, Tent, Store, Ship, Search, Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import riversData from '../data/rivers.json';
import MapWrapper from './MapWrapper';

export default function AccessPointsMap() {
  const searchParams = useSearchParams();
  const [selectedRiver, setSelectedRiver] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const riverParam = searchParams.get('river');
    if (riverParam) {
      setSelectedRiver(riverParam);
    }
  }, [searchParams]);
  
  const allAccessPoints = riversData.rivers.flatMap(river => 
    river.accessPoints.map(point => ({
      ...point,
      riverName: river.name,
      riverId: river.id
    }))
  );

  const filteredPoints = allAccessPoints.filter(point => {
    const matchesRiver = selectedRiver === 'all' || point.riverId === selectedRiver;
    const matchesSearch = point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          point.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRiver && matchesSearch;
  });

  const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    'Parking': Car,
    'Camping': Tent,
    'Store': Store,
    'Boat Ramp': Ship,
    'Restrooms': MapPin,
    'Visitor Center': Store,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-river-600 to-river-700 text-white py-16">
        <div className="section-padding">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm mb-4 opacity-90">
            <Link href="/" className="hover:text-white flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span>Access Points</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Missouri River Access Points
          </h1>
          <p className="text-xl opacity-95 max-w-3xl">
            500+ mapped put-in and take-out locations with GPS coordinates, parking information, 
            and amenities. Find the perfect access point for your DIY float trip.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="section-padding py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search access points..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-river-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedRiver}
              onChange={(e) => setSelectedRiver(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-river-500 focus:border-transparent"
            >
              <option value="all">All Rivers</option>
              {riversData.rivers.map(river => (
                <option key={river.id} value={river.id}>{river.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Map & List */}
      <div className="section-padding py-8">
        {/* Full Width Map */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Interactive Access Points Map</h2>
          <MapWrapper showAccessPointsOnly={true} initialRiver={selectedRiver} />
        </div>
        
        {/* List View */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Access Points List</h2>
          <div className="text-sm text-gray-600 mb-4">
            Showing {filteredPoints.length} access points
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {filteredPoints.map((point, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{point.name}</h3>
                    <p className="text-sm text-river-600">{point.riverName}</p>
                  </div>
                  <button className="text-river-600 hover:text-river-700">
                    <Navigation className="w-5 h-5" />
                  </button>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{point.address}</p>
                
                <div className="flex items-center text-sm text-gray-700 mb-3">
                  <MapPin className="w-4 h-4 mr-2 text-river-500" />
                  <span className="font-mono">{point.lat.toFixed(4)}, {point.lng.toFixed(4)}</span>
                  <button className="ml-2 text-river-600 hover:text-river-700 text-xs">
                    Copy GPS
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {point.amenities.map((amenity, i) => {
                    const Icon = amenityIcons[amenity] || MapPin;
                    return (
                      <span key={i} className="flex items-center text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        <Icon className="w-3 h-3 mr-1" />
                        {amenity}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-river-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Planning Your DIY Float Trip?
          </h2>
          <p className="text-gray-700 mb-6">
            Use these access points to plan your self-guided adventure. Remember to arrange shuttle 
            service or use two vehicles. Most access points have parking, but arrive early on weekends 
            as popular spots fill up quickly.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Vehicle Strategy</h3>
              <p className="text-sm text-gray-600">
                Leave one car at take-out, drive together to put-in, float to your car.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Shuttle Services</h3>
              <p className="text-sm text-gray-600">
                Most outfitters offer shuttle service for $35-50 if you only have one vehicle.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Parking Tips</h3>
              <p className="text-sm text-gray-600">
                Don&apos;t leave valuables visible. Lock your vehicle and take keys in waterproof bag.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}