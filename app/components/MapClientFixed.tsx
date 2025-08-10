'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import L from 'leaflet';
import { 
  MapPin, Store, Search
} from 'lucide-react';
import riversData from '../data/rivers.json';
import outfittersData from '../data/outfitters.json';

// Fix for default markers
delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom icons
const accessPointIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 2.755 0.901 5.301 2.423 7.368l10.077 20.632 10.077-20.632C24.099 17.801 25 15.255 25 12.5 25 5.596 19.404 0 12.5 0z" fill="#10B981"/>
      <circle cx="12.5" cy="12.5" r="8" fill="white"/>
      <circle cx="12.5" cy="12.5" r="3" fill="#10B981"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const outfitterIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 2.755 0.901 5.301 2.423 7.368l10.077 20.632 10.077-20.632C24.099 17.801 25 15.255 25 12.5 25 5.596 19.404 0 12.5 0z" fill="#8B5CF6"/>
      <rect x="7" y="7" width="11" height="11" fill="white" rx="1"/>
      <rect x="9" y="9" width="7" height="7" fill="#8B5CF6" rx="0.5"/>
    </svg>
  `),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

interface MapClientFixedProps {
  showAccessPointsOnly?: boolean;
  initialRiver?: string;
}

export default function MapClientFixed({ showAccessPointsOnly = false, initialRiver = 'all' }: MapClientFixedProps) {
  const [map, setMap] = useState<L.Map | null>(null);
  const [selectedRiver, setSelectedRiver] = useState(initialRiver);
  const [searchTerm, setSearchTerm] = useState('');
  // const [selectedItem, setSelectedItem] = useState<{
  //   type?: string;
  //   name: string;
  //   description?: string;
  //   address?: string;
  //   phone?: string;
  //   website?: string;
  //   lat?: number;
  //   lng?: number;
  // } | null>(null);
  const [mapLayers, setMapLayers] = useState([
    { id: 'rivers', name: 'Rivers', visible: !showAccessPointsOnly, color: '#3B82F6' },
    { id: 'access-points', name: 'Access Points', visible: true, color: '#10B981' },
    { id: 'outfitters', name: 'Outfitters', visible: !showAccessPointsOnly, color: '#8B5CF6' },
  ]);

  // Missouri center coordinates
  const mapCenter = { lat: 37.5, lng: -91.5 };
  const defaultZoom = 7;

  useEffect(() => {
    if (typeof window !== 'undefined' && !map) {
      
      // Create map
      const mapInstance = L.map('map').setView([mapCenter.lat, mapCenter.lng], defaultZoom);
      
      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance);
      
      setMap(mapInstance);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!map) return;

    // Clear existing layers
    map.eachLayer((layer: L.Layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.removeLayer(layer);
      }
    });

    // Add access points
    if (mapLayers.find(l => l.id === 'access-points')?.visible) {
      riversData.rivers.forEach(river => {
        if (selectedRiver === 'all' || river.id === selectedRiver) {
          river.accessPoints.forEach(point => {
            L.marker([point.lat, point.lng], { icon: accessPointIcon })
              .addTo(map)
              .bindPopup(`
                <div style="min-width: 200px;">
                  <h3 style="font-weight: bold; margin-bottom: 8px;">${point.name}</h3>
                  <p style="color: #666; font-size: 14px; margin-bottom: 4px;">${river.name}</p>
                  <p style="color: #999; font-size: 12px; margin-bottom: 8px;">${point.address}</p>
                  <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 8px;">
                    ${point.amenities.map((a: string) => `<span style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px; font-size: 11px;">${a}</span>`).join('')}
                  </div>
                  <a href="https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}" 
                     target="_blank" 
                     style="color: #0284c7; font-size: 14px; text-decoration: none;">
                    Get Directions →
                  </a>
                </div>
              `);
          });
        }
      });
    }

    // Add outfitters
    if (mapLayers.find(l => l.id === 'outfitters')?.visible && !showAccessPointsOnly) {
      outfittersData.outfitters.forEach(outfitter => {
        if (selectedRiver === 'all' || outfitter.rivers.includes(selectedRiver)) {
          L.marker([outfitter.lat, outfitter.lng], { icon: outfitterIcon })
            .addTo(map)
            .bindPopup(`
              <div style="min-width: 200px;">
                <h3 style="font-weight: bold; margin-bottom: 8px;">${outfitter.name}</h3>
                <p style="color: #666; font-size: 14px; margin-bottom: 8px;">${outfitter.description}</p>
                <div style="margin-bottom: 8px;">
                  <div style="margin-bottom: 4px;">
                    📞 <a href="tel:${outfitter.phone}" style="color: #0284c7; text-decoration: none;">${outfitter.phone}</a>
                  </div>
                  <div style="color: #666; font-size: 12px;">📍 ${outfitter.address}</div>
                </div>
                <div style="display: flex; gap: 8px;">
                  <a href="${outfitter.website}" target="_blank" style="color: #0284c7; font-size: 14px; text-decoration: none;">
                    Visit Website →
                  </a>
                  <a href="https://www.google.com/maps/dir/?api=1&destination=${outfitter.lat},${outfitter.lng}" 
                     target="_blank" 
                     style="color: #0284c7; font-size: 14px; text-decoration: none;">
                    Directions →
                  </a>
                </div>
              </div>
            `);
        }
      });
    }

    // Add simplified river paths (only connect access points, no random lines)
    if (mapLayers.find(l => l.id === 'rivers')?.visible && !showAccessPointsOnly) {
      riversData.rivers.forEach(river => {
        if (selectedRiver === 'all' || river.id === selectedRiver) {
          if (river.accessPoints.length > 1) {
            // Only draw lines between consecutive access points
            const coordinates: [number, number][] = river.accessPoints.map(point => [point.lat, point.lng] as [number, number]);
            L.polyline(coordinates, {
              color: '#3B82F6',
              weight: 3,
              opacity: 0.6,
              smoothFactor: 1
            }).addTo(map);
          }
        }
      });
    }
  }, [map, selectedRiver, mapLayers, showAccessPointsOnly]);

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
      <div className="bg-white border-b sticky top-0 z-[400]">
        <div className="py-4">
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
      </div>

      {/* Map Container */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div id="map" style={{ height: '600px', width: '100%', borderRadius: '0.5rem' }}></div>
            
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