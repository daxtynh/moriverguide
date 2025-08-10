'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  MapPin, Store, Search, 
  Home, ChevronRight, X, Phone
} from 'lucide-react';
import riversData from '../data/rivers.json';
import outfittersData from '../data/outfitters.json';

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import('react-leaflet').then(mod => mod.Polyline), { ssr: false });

export default function MapClient() {
  const [selectedRiver, setSelectedRiver] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<null | {
    type?: string;
    name: string;
    lat?: number;
    lng?: number;
    riverName?: string;
    address?: string;
    description?: string;
    phone?: string;
    website?: string;
    amenities?: string[];
    difficulty?: string;
    waterLevel?: {
      current: number;
      optimal: string;
      status: string;
    };
  }>(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapLayers, setMapLayers] = useState([
    { id: 'rivers', name: 'Rivers', visible: true, color: '#3B82F6' },
    { id: 'access-points', name: 'Access Points', visible: true, color: '#10B981' },
    { id: 'outfitters', name: 'Outfitters', visible: true, color: '#8B5CF6' },
  ]);

  useEffect(() => {
    setMapReady(true);
  }, []);

  // Missouri center coordinates
  const mapCenter = { lat: 37.5, lng: -91.5 };
  const defaultZoom = 7;

  // Get all access points
  const getAllAccessPoints = () => {
    const points: Array<{
      lat: number;
      lng: number;
      name: string;
      address: string;
      amenities: string[];
      type: string;
      riverName: string;
      riverId: string;
    }> = [];
    riversData.rivers.forEach(river => {
      if (selectedRiver === 'all' || river.id === selectedRiver) {
        river.accessPoints.forEach(point => {
          points.push({
            ...point,
            type: 'access-point',
            riverName: river.name,
            riverId: river.id
          });
        });
      }
    });
    return points;
  };

  // Get filtered outfitters
  const getFilteredOutfitters = () => {
    return outfittersData.outfitters.filter(outfitter => 
      selectedRiver === 'all' || outfitter.rivers.includes(selectedRiver)
    );
  };

  // Create river paths from access points
  const getRiverPaths = () => {
    const paths: Array<{
      id: string;
      name: string;
      coordinates: [number, number][];
      waterLevel: {
        current: number;
        optimal: string;
        status: string;
      };
      difficulty: string;
    }> = [];
    riversData.rivers.forEach(river => {
      if (selectedRiver === 'all' || river.id === selectedRiver) {
        if (river.accessPoints.length > 1) {
          const coordinates: [number, number][] = river.accessPoints.map(point => [point.lat, point.lng] as [number, number]);
          paths.push({
            id: river.id,
            name: river.name,
            coordinates: coordinates,
            waterLevel: river.waterLevel,
            difficulty: river.difficulty
          });
        }
      }
    });
    return paths;
  };

  const toggleLayer = (layerId: string) => {
    setMapLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const accessPoints = getAllAccessPoints();
  const outfitters = getFilteredOutfitters();
  const riverPaths = getRiverPaths();

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

      {/* Map Controls */}
      <div className="bg-white border-b sticky top-0 z-[400]">
        <div className="section-padding py-4">
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
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="section-padding py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-4" style={{ height: '600px' }}>
              {mapReady && typeof window !== 'undefined' ? (
                <MapContainer
                  center={[mapCenter.lat, mapCenter.lng]}
                  zoom={defaultZoom}
                  style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
                  scrollWheelZoom={true}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* River Paths */}
                  {mapLayers.find(l => l.id === 'rivers')?.visible && riverPaths.map(river => (
                    <Polyline
                      key={river.id}
                      positions={river.coordinates}
                      color="#3B82F6"
                      weight={3}
                      opacity={0.7}
                      eventHandlers={{
                        click: () => setSelectedItem({
                          type: 'river',
                          name: river.name,
                          difficulty: river.difficulty,
                          waterLevel: river.waterLevel
                        })
                      }}
                    />
                  ))}
                  
                  {/* Access Points */}
                  {mapLayers.find(l => l.id === 'access-points')?.visible && accessPoints.map((point, index) => (
                    <Marker
                      key={`ap-${index}`}
                      position={[point.lat, point.lng]}
                      eventHandlers={{
                        click: () => setSelectedItem(point)
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-semibold">{point.name}</h3>
                          <p className="text-sm text-gray-600">{point.riverName}</p>
                          <p className="text-xs text-gray-500 mt-1">{point.address}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {point.amenities?.map((amenity: string, i: number) => (
                              <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {amenity}
                              </span>
                            ))}
                          </div>
                          <a 
                            href={`https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-river-600 text-sm mt-2 inline-block"
                          >
                            Get Directions →
                          </a>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                  
                  {/* Outfitters */}
                  {mapLayers.find(l => l.id === 'outfitters')?.visible && outfitters.map((outfitter, index) => (
                    <Marker
                      key={`out-${index}`}
                      position={[outfitter.lat, outfitter.lng]}
                      eventHandlers={{
                        click: () => setSelectedItem({...outfitter, type: 'outfitter'})
                      }}
                    >
                      <Popup>
                        <div className="p-2">
                          <h3 className="font-semibold">{outfitter.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{outfitter.description}</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center">
                              <Phone className="w-3 h-3 mr-1" />
                              <a href={`tel:${outfitter.phone}`} className="text-river-600">
                                {outfitter.phone}
                              </a>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {outfitter.address}
                            </div>
                          </div>
                          <div className="mt-2 space-y-1">
                            <a 
                              href={outfitter.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-river-600 text-sm block"
                            >
                              Visit Website →
                            </a>
                            <a 
                              href={`https://www.google.com/maps/dir/?api=1&destination=${outfitter.lat},${outfitter.lng}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-river-600 text-sm block"
                            >
                              Get Directions →
                            </a>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-river-600 mx-auto mb-3" />
                    <p className="text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Legend */}
            <div className="mt-4 p-4 bg-white rounded-lg shadow">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Legend</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-xs text-gray-600">River Paths</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-xs text-gray-600">Access Points</span>
                </div>
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-purple-600" />
                  <span className="text-xs text-gray-600">Outfitters</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-6 max-h-[650px] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">
                Map Locations
              </h2>
              
              {selectedItem && (
                <div className="mb-4 p-4 bg-river-50 rounded-lg border border-river-200">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900">{selectedItem.name}</h3>
                    <button onClick={() => setSelectedItem(null)}>
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  
                  {selectedItem.type === 'access-point' && (
                    <>
                      <p className="text-sm text-gray-600">{selectedItem.riverName}</p>
                      <p className="text-sm text-gray-500">{selectedItem.address}</p>
                      <div className="mt-2">
                        <a 
                          href={`https://www.google.com/maps/dir/?api=1&destination=${selectedItem.lat},${selectedItem.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-river-600 text-sm font-medium"
                        >
                          Get Directions →
                        </a>
                      </div>
                    </>
                  )}
                  
                  {selectedItem.type === 'outfitter' && (
                    <>
                      <p className="text-sm text-gray-600 mb-2">{selectedItem.description}</p>
                      <div className="space-y-1 text-sm">
                        <a href={`tel:${selectedItem.phone}`} className="text-river-600 block">
                          📞 {selectedItem.phone}
                        </a>
                        <a href={selectedItem.website} target="_blank" rel="noopener noreferrer" className="text-river-600 block">
                          🌐 Visit Website
                        </a>
                      </div>
                    </>
                  )}
                </div>
              )}
              
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700 text-sm">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-xl font-bold text-river-600">{accessPoints.length}</div>
                    <div className="text-xs text-gray-600">Access Points</div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <div className="text-xl font-bold text-purple-600">{outfitters.length}</div>
                    <div className="text-xs text-gray-600">Outfitters</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <h3 className="font-medium text-gray-700 text-sm mb-2">Resources</h3>
                <Link href="/rivers" className="block text-sm text-river-600 hover:text-river-700">
                  → View All Rivers
                </Link>
                <Link href="/access-points" className="block text-sm text-river-600 hover:text-river-700">
                  → Access Points List
                </Link>
                <Link href="/outfitters" className="block text-sm text-river-600 hover:text-river-700">
                  → Browse All Outfitters
                </Link>
                <Link href="/water-levels" className="block text-sm text-river-600 hover:text-river-700">
                  → Check Water Levels
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}