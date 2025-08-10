'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import riversData from '../data/rivers.json';
import outfittersData from '../data/outfitters.json';

// Fix for default markers
delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: () => string })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface LeafletMapProps {
  selectedRiver: string;
  mapLayers: { id: string; visible: boolean }[];
  showAccessPointsOnly?: boolean;
}

export default function LeafletMap({ 
  selectedRiver, 
  mapLayers, 
  showAccessPointsOnly = false 
}: LeafletMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Custom icons using base64 SVG
  const accessPointIcon = L.divIcon({
    html: `
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 2.755 0.901 5.301 2.423 7.368l10.077 20.632 10.077-20.632C24.099 17.801 25 15.255 25 12.5 25 5.596 19.404 0 12.5 0z" fill="#10B981"/>
        <circle cx="12.5" cy="12.5" r="8" fill="white"/>
        <circle cx="12.5" cy="12.5" r="3" fill="#10B981"/>
      </svg>
    `,
    className: 'custom-div-icon',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const outfitterIcon = L.divIcon({
    html: `
      <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 2.755 0.901 5.301 2.423 7.368l10.077 20.632 10.077-20.632C24.099 17.801 25 15.255 25 12.5 25 5.596 19.404 0 12.5 0z" fill="#8B5CF6"/>
        <rect x="7" y="7" width="11" height="11" fill="white" rx="1"/>
        <rect x="9" y="9" width="7" height="7" fill="#8B5CF6" rx="0.5"/>
      </svg>
    `,
    className: 'custom-div-icon',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current).setView([37.5, -91.5], 7);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Clear existing layers (except tile layer)
    map.eachLayer((layer) => {
      if (!(layer instanceof L.TileLayer)) {
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
                    ${point.amenities.map((a: string) => 
                      `<span style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px; font-size: 11px;">${a}</span>`
                    ).join('')}
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
                </div>
              </div>
            `);
        }
      });
    }

    // Add river paths (connect access points)
    if (mapLayers.find(l => l.id === 'rivers')?.visible && !showAccessPointsOnly) {
      riversData.rivers.forEach(river => {
        if (selectedRiver === 'all' || river.id === selectedRiver) {
          if (river.accessPoints.length > 1) {
            const coordinates = river.accessPoints.map(point => [point.lat, point.lng] as L.LatLngTuple);
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
  }, [selectedRiver, mapLayers, showAccessPointsOnly, accessPointIcon, outfitterIcon]);

  return (
    <div>
      <div ref={mapContainerRef} style={{ height: '600px', width: '100%', borderRadius: '0.5rem' }} />
      <style jsx global>{`
        .custom-div-icon {
          background: transparent;
          border: none;
        }
      `}</style>
    </div>
  );
}