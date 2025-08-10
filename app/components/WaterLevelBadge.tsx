'use client';

import { useEffect, useState } from 'react';
import { Droplets, Activity } from 'lucide-react';

interface WaterLevelBadgeProps {
  riverId: string;
  showDetails?: boolean;
}

interface WaterStation {
  id: string;
  name: string;
  location?: string;
  gageHeight: number | null;
  discharge: number | null;
  status?: {
    status: string;
    description?: string;
  };
}

interface WaterData {
  name: string;
  stations: WaterStation[];
}

export default function WaterLevelBadge({ riverId, showDetails = false }: WaterLevelBadgeProps) {
  const [waterData, setWaterData] = useState<WaterData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWaterLevel = async () => {
      try {
        const response = await fetch('/api/water-levels');
        if (response.ok) {
          const data = await response.json();
          setWaterData(data[riverId]);
        }
      } catch (error) {
        console.error('Error fetching water level:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWaterLevel();
  }, [riverId]);

  if (loading) {
    return (
      <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
        <Droplets className="w-3 h-3 animate-pulse" />
        <span>Loading...</span>
      </div>
    );
  }

  if (!waterData || !waterData.stations || waterData.stations.length === 0) {
    return (
      <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
        <Droplets className="w-3 h-3" />
        <span>No data</span>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-100 text-green-700';
      case 'high':
      case 'action':
        return 'bg-orange-100 text-orange-700';
      case 'low':
        return 'bg-yellow-100 text-yellow-700';
      case 'flood':
      case 'minor-flood':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // For the compact badge, show the first station with data
  const primaryStation = waterData.stations.find((s: WaterStation) => s.gageHeight !== null) || waterData.stations[0];

  if (showDetails) {
    return (
      <div className="space-y-3">
        {waterData.stations.map((station: WaterStation) => (
          <div key={station.id} className={`rounded-lg px-3 py-2 ${getStatusColor(station.status?.status || 'unknown')}`}>
            <div className="font-semibold text-sm mb-1">{station.name}</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                {station.gageHeight !== null ? (
                  <>
                    <span className="font-semibold text-sm">
                      {station.gageHeight.toFixed(1)} ft
                    </span>
                    <span className="text-xs opacity-75">LIVE</span>
                  </>
                ) : (
                  <span className="text-xs">No height data</span>
                )}
              </div>
              {station.discharge !== null && (
                <span className="text-xs">
                  {station.discharge.toFixed(0)} cfs
                </span>
              )}
            </div>
            {station.status?.description && (
              <p className="text-xs mt-1 opacity-75">
                {station.status.description}
              </p>
            )}
            {station.location && (
              <p className="text-xs mt-1 opacity-60">
                {station.location}
              </p>
            )}
          </div>
        ))}
        {waterData.stations.length > 1 && (
          <p className="text-xs text-gray-600 italic">
            Showing {waterData.stations.length} monitoring stations for this river
          </p>
        )}
      </div>
    );
  }

  // Compact badge - show primary station
  if (!primaryStation || primaryStation.gageHeight === null) {
    return (
      <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
        <Droplets className="w-3 h-3" />
        <span>No data</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(primaryStation.status?.status || 'unknown')}`}>
      <Activity className="w-3 h-3" />
      <span>{primaryStation.gageHeight.toFixed(1)} ft</span>
      {primaryStation.discharge !== null && (
        <span className="opacity-75">• {primaryStation.discharge.toFixed(0)} cfs</span>
      )}
      <span className="text-[10px] uppercase tracking-wider opacity-75 ml-1">LIVE</span>
    </div>
  );
}