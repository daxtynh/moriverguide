'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Search, Store, MapPin } from 'lucide-react';
import riversData from '../data/rivers.json';
import outfittersData from '../data/outfitters.json';

const LeafletMap = dynamic(() => import('./LeafletMap'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[600px] bg-gray-50 rounded-lg">
      <div className="text-center">
        <MapPin className="w-12 h-12 text-river-600 mx-auto mb-3 animate-pulse" />
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  )
});

interface MapWrapperProps {
  showAccessPointsOnly?: boolean;
  initialRiver?: string;
}

export default function MapWrapper({ showAccessPointsOnly = false, initialRiver = 'all' }: MapWrapperProps) {
  const [selectedRiver, setSelectedRiver] = useState(initialRiver);
  const [searchTerm, setSearchTerm] = useState('');
  const [mapLayers, setMapLayers] = useState([
    { id: 'rivers', name: 'Rivers', visible: !showAccessPointsOnly, color: '#3B82F6' },
    { id: 'access-points', name: 'Access Points', visible: true, color: '#10B981' },
    { id: 'outfitters', name: 'Outfitters', visible: !showAccessPointsOnly, color: '#8B5CF6' },
  ]);

  const toggleLayer = (layerId: string) => {
    setMapLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const accessPointCount = riversData.rivers.reduce((total, river) => {
    if (selectedRiver === 'all' || river.id === selectedRiver) {
      return total + river.accessPoints.length;
    }
    return total;
  }, 0);

  const outfitterCount = outfittersData.outfitters.filter(o => 
    selectedRiver === 'all' || o.rivers.includes(selectedRiver)
  ).length;

  return (
    <div className="w-full">
      {/* Map Controls */}
      <div className="bg-white border rounded-t-xl px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search locations..."
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
          
          {!showAccessPointsOnly && (
            <div className="flex gap-2">
              {mapLayers.map(layer => (
                <button
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    layer.visible 
                      ? 'bg-river-100 text-river-700 border border-river-300' 
                      : 'bg-gray-100 text-gray-500 border border-gray-300'
                  }`}
                >
                  {layer.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-b-xl lg:rounded-xl shadow-lg p-4">
            <LeafletMap 
              selectedRiver={selectedRiver}
              mapLayers={mapLayers}
              showAccessPointsOnly={showAccessPointsOnly}
            />
            
            {/* Legend */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Legend</h3>
              <div className="flex flex-wrap gap-4">
                {mapLayers.find(l => l.id === 'rivers')?.visible && !showAccessPointsOnly && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span className="text-xs text-gray-600">River Paths</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-gray-600">Access Points</span>
                </div>
                {!showAccessPointsOnly && (
                  <div className="flex items-center gap-2">
                    <Store className="w-4 h-4 text-purple-600" />
                    <span className="text-xs text-gray-600">Outfitters</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Map Information</h2>
            
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700 text-sm">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-gray-50 p-3 rounded">
                  <div className="text-xl font-bold text-river-600">{accessPointCount}</div>
                  <div className="text-xs text-gray-600">Access Points</div>
                </div>
                {!showAccessPointsOnly && (
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="text-xl font-bold text-purple-600">{outfitterCount}</div>
                    <div className="text-xs text-gray-600">Outfitters</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 space-y-2">
              <h3 className="font-medium text-gray-700 text-sm mb-2">Resources</h3>
              <Link href="/rivers" className="block text-sm text-river-600 hover:text-river-700">
                → View All Rivers
              </Link>
              <Link href="/access-points" className="block text-sm text-river-600 hover:text-river-700">
                → Access Points List
              </Link>
              {!showAccessPointsOnly && (
                <Link href="/outfitters" className="block text-sm text-river-600 hover:text-river-700">
                  → Browse All Outfitters
                </Link>
              )}
              <Link href="/water-levels" className="block text-sm text-river-600 hover:text-river-700">
                → Check Water Levels
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}