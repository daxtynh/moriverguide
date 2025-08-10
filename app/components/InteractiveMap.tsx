'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, Navigation, Store, Search, 
  Home, ChevronRight, ZoomIn, ZoomOut, Maximize2,
  X, DollarSign, Droplets, Phone
} from 'lucide-react';
import riversData from '../data/rivers.json';
import outfittersData from '../data/outfitters.json';

interface MapLayer {
  id: string;
  name: string;
  visible: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface MapDataItem {
  type: string;
  id?: string;
  name?: string;
  description?: string;
  address?: string;
  riverName?: string;
  riverId?: string;
  difficulty?: string;
  length?: string;
  waterLevel?: { current: number; optimal: string; status: string };
  crowdLevel?: string;
  lat?: number;
  lng?: number;
  amenities?: string[];
  phone?: string;
  priceRange?: string;
  website?: string;
  services?: string[];
  [key: string]: unknown;
}

export default function InteractiveMap() {
  const [selectedRiver, setSelectedRiver] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<MapDataItem | null>(null);
  const [mapLayers, setMapLayers] = useState<MapLayer[]>([
    { id: 'rivers', name: 'Rivers', visible: true, icon: Droplets, color: 'text-blue-600' },
    { id: 'access-points', name: 'Access Points', visible: true, icon: MapPin, color: 'text-green-600' },
    { id: 'outfitters', name: 'Outfitters', visible: true, icon: Store, color: 'text-purple-600' },
  ]);
  
  // Combine all data for the map
  const getAllMapData = () => {
    const data: MapDataItem[] = [];
    
    // Add rivers
    if (mapLayers.find(l => l.id === 'rivers')?.visible) {
      riversData.rivers.forEach(river => {
        if (selectedRiver === 'all' || river.id === selectedRiver) {
          data.push({
            type: 'river',
            id: river.id,
            name: river.name,
            description: river.description,
            difficulty: river.difficulty,
            length: river.length,
            waterLevel: river.waterLevel,
            crowdLevel: river.crowdLevel,
            // Center point of river (approximated from access points)
            lat: river.accessPoints[0]?.lat || 37.5,
            lng: river.accessPoints[0]?.lng || -91.5,
          });
        }
      });
    }
    
    // Add access points
    if (mapLayers.find(l => l.id === 'access-points')?.visible) {
      riversData.rivers.forEach(river => {
        if (selectedRiver === 'all' || river.id === selectedRiver) {
          river.accessPoints.forEach(point => {
            data.push({
              type: 'access-point',
              riverName: river.name,
              riverId: river.id,
              ...point
            });
          });
        }
      });
    }
    
    // Add outfitters
    if (mapLayers.find(l => l.id === 'outfitters')?.visible) {
      outfittersData.outfitters.forEach(outfitter => {
        if (selectedRiver === 'all' || outfitter.rivers.includes(selectedRiver)) {
          data.push({
            type: 'outfitter',
            ...outfitter
          });
        }
      });
    }
    
    // Filter by search term
    if (searchTerm) {
      return data.filter(item => 
        (typeof item.name === 'string' && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (typeof item.description === 'string' && item.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (typeof item.address === 'string' && item.address.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return data;
  };
  
  const toggleLayer = (layerId: string) => {
    setMapLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };
  
  const mapData = getAllMapData();
  
  // Missouri approximate center
  // const mapCenter = { lat: 37.5, lng: -91.5 }; // Available if needed
  
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
            <span>Interactive Map</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Missouri Float Trips Interactive Map
          </h1>
          <p className="text-xl opacity-95 max-w-3xl">
            Explore all rivers, access points, and outfitters on one interactive map. 
            Plan your route, find services, and discover new float destinations.
          </p>
        </div>
      </div>

      {/* Map Controls */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="section-padding py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search rivers, access points, outfitters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-river-500 focus:border-transparent"
              />
            </div>
            
            {/* River Filter */}
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
            
            {/* Layer Toggles */}
            <div className="flex gap-2">
              {mapLayers.map(layer => {
                const Icon = layer.icon;
                return (
                  <button
                    key={layer.id}
                    onClick={() => toggleLayer(layer.id)}
                    className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                      layer.visible 
                        ? 'bg-river-100 text-river-700 border border-river-300' 
                        : 'bg-gray-100 text-gray-500 border border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{layer.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="section-padding py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 relative">
              <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                <button className="bg-white p-2 rounded shadow hover:shadow-lg transition-shadow">
                  <ZoomIn className="w-5 h-5 text-gray-700" />
                </button>
                <button className="bg-white p-2 rounded shadow hover:shadow-lg transition-shadow">
                  <ZoomOut className="w-5 h-5 text-gray-700" />
                </button>
                <button className="bg-white p-2 rounded shadow hover:shadow-lg transition-shadow">
                  <Maximize2 className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 rounded-lg h-[600px] relative overflow-hidden">
                {/* Simple SVG Map Visualization */}
                <svg className="w-full h-full" viewBox="0 0 800 600">
                  {/* Rivers (simplified paths) */}
                  {mapLayers.find(l => l.id === 'rivers')?.visible && (
                    <g>
                      <path
                        d="M 200 100 Q 250 150, 300 200 T 400 300 Q 450 350, 500 400"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        fill="none"
                        opacity="0.7"
                      />
                      <path
                        d="M 100 200 Q 150 250, 200 300 T 300 400 Q 350 450, 400 500"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        fill="none"
                        opacity="0.7"
                      />
                      <path
                        d="M 500 150 Q 450 200, 400 250 T 350 350 Q 300 400, 250 450"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        fill="none"
                        opacity="0.7"
                      />
                    </g>
                  )}
                  
                  {/* Map Points */}
                  {mapData.map((item, index) => {
                    // Skip items without coordinates
                    if (!item.lat || !item.lng) return null;
                    
                    // Convert lat/lng to SVG coordinates (simplified)
                    const x = ((item.lng + 95) / 10) * 800;
                    const y = ((40 - item.lat) / 10) * 600;
                    
                    if (item.type === 'access-point' && mapLayers.find(l => l.id === 'access-points')?.visible) {
                      return (
                        <g key={`ap-${index}`} onClick={() => setSelectedItem(item)} className="cursor-pointer">
                          <circle cx={x} cy={y} r="8" fill="#10B981" opacity="0.8" />
                          <circle cx={x} cy={y} r="3" fill="white" />
                        </g>
                      );
                    }
                    
                    if (item.type === 'outfitter' && mapLayers.find(l => l.id === 'outfitters')?.visible) {
                      return (
                        <g key={`out-${index}`} onClick={() => setSelectedItem(item)} className="cursor-pointer">
                          <rect x={x-8} y={y-8} width="16" height="16" fill="#8B5CF6" opacity="0.8" rx="2" />
                          <rect x={x-3} y={y-3} width="6" height="6" fill="white" />
                        </g>
                      );
                    }
                    
                    if (item.type === 'river' && mapLayers.find(l => l.id === 'rivers')?.visible) {
                      return (
                        <g key={`riv-${index}`} onClick={() => setSelectedItem(item)} className="cursor-pointer">
                          <text x={x} y={y} fill="#1E40AF" fontSize="14" fontWeight="bold" textAnchor="middle">
                            {item.name}
                          </text>
                        </g>
                      );
                    }
                    
                    return null;
                  })}
                </svg>
                
                {/* Map Loading Message */}
                <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-river-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Map Demo</h3>
                    <p className="text-gray-600 max-w-md">
                      This is a simplified visualization. A full interactive map with 
                      Google Maps or Mapbox integration would show actual river paths, 
                      exact locations, and allow real interaction.
                    </p>
                    <div className="mt-4 flex gap-4 justify-center">
                      <a href="/access-points" className="text-river-600 hover:text-river-700 font-medium">
                        View Access Points List →
                      </a>
                      <a href="/outfitters" className="text-river-600 hover:text-river-700 font-medium">
                        Browse Outfitters →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map Legend */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Legend</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span className="text-xs text-gray-600">Rivers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                    <span className="text-xs text-gray-600">Access Points</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-600 rounded"></div>
                    <span className="text-xs text-gray-600">Outfitters</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar - List View */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-6 max-h-[700px] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">
                Locations ({mapData.length})
              </h2>
              
              {/* Selected Item Detail */}
              {selectedItem && (
                <div className="mb-4 p-4 bg-river-50 rounded-lg border border-river-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{selectedItem.name}</h3>
                    <button onClick={() => setSelectedItem(null)}>
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  
                  {selectedItem.type === 'river' && (
                    <>
                      <p className="text-sm text-gray-600 mb-2">{selectedItem.description}</p>
                      <div className="space-y-1 text-sm">
                        <div>Length: {selectedItem.length}</div>
                        <div>Difficulty: {selectedItem.difficulty}</div>
                        <div>Water Level: {selectedItem.waterLevel?.current || 'N/A'} ft</div>
                        <div>Crowd Level: {selectedItem.crowdLevel}</div>
                      </div>
                      <a href={`/rivers/${selectedItem.id}`} className="mt-3 text-river-600 hover:text-river-700 text-sm font-medium block">
                        View River Details →
                      </a>
                    </>
                  )}
                  
                  {selectedItem.type === 'access-point' && (
                    <>
                      <p className="text-sm text-gray-600 mb-2">{selectedItem.riverName}</p>
                      <p className="text-sm text-gray-600 mb-2">{selectedItem.address}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {(selectedItem.amenities as string[])?.map((amenity: string, i: number) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs font-mono text-gray-600">
                        {selectedItem.lat?.toFixed(4)}, {selectedItem.lng?.toFixed(4)}
                      </div>
                    </>
                  )}
                  
                  {selectedItem.type === 'outfitter' && (
                    <>
                      <p className="text-sm text-gray-600 mb-2">{selectedItem.description}</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {selectedItem.phone as string}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {selectedItem.address}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {String(selectedItem.priceRange || '')}
                        </div>
                      </div>
                      {selectedItem.website && (
                        <a href={String(selectedItem.website)} target="_blank" rel="noopener noreferrer" className="mt-3 text-river-600 hover:text-river-700 text-sm font-medium block">
                          Visit Website →
                        </a>
                      )}
                    </>
                  )}
                </div>
              )}
              
              {/* List Items */}
              <div className="space-y-3">
                {mapData.map((item, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedItem(item)}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {item.type === 'river' && <Droplets className="w-4 h-4 text-blue-600" />}
                          {item.type === 'access-point' && <MapPin className="w-4 h-4 text-green-600" />}
                          {item.type === 'outfitter' && <Store className="w-4 h-4 text-purple-600" />}
                          <h4 className="font-medium text-gray-900 text-sm">{item.name}</h4>
                        </div>
                        {item.type === 'access-point' && (
                          <p className="text-xs text-gray-500 mt-1">{item.riverName}</p>
                        )}
                        {item.type === 'outfitter' && (
                          <p className="text-xs text-gray-500 mt-1">{Array.isArray(item.services) ? (item.services as string[]).slice(0, 3).join(', ') : ''}</p>
                        )}
                        {item.type === 'river' && (
                          <p className="text-xs text-gray-500 mt-1">{item.difficulty} • {item.length}</p>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="card">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-green-600" />
              Access Points
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              Over 500 mapped put-in and take-out locations with detailed amenities and GPS coordinates.
            </p>
            <a href="/access-points" className="text-river-600 hover:text-river-700 font-medium text-sm">
              Browse All Access Points →
            </a>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Store className="w-5 h-5 mr-2 text-purple-600" />
              Outfitters
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              50+ trusted outfitters offering canoe, kayak, and raft rentals plus shuttle services.
            </p>
            <a href="/outfitters" className="text-river-600 hover:text-river-700 font-medium text-sm">
              Find Outfitters →
            </a>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Navigation className="w-5 h-5 mr-2 text-blue-600" />
              Trip Planning
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              Use our map to plan routes, estimate float times, and coordinate shuttle logistics.
            </p>
            <a href="/diy-guide" className="text-river-600 hover:text-river-700 font-medium text-sm">
              DIY Planning Guide →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}