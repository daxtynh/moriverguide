'use client';

import { useEffect, useState } from 'react';
import { 
  RefreshCw, AlertCircle, MapPin, 
  TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp 
} from 'lucide-react';

interface WaterLevelStation {
  id: string;
  name: string;
  location?: string;
  lat?: number;
  lng?: number;
  gageHeight: number | null;
  discharge: number | null;
  lastUpdated?: string;
  status?: {
    status: string;
    description?: string;
  };
}

interface RiverData {
  name: string;
  stations: WaterLevelStation[];
}

type WaterLevelsData = Record<string, RiverData>;

export default function LiveWaterLevels() {
  const [waterLevels, setWaterLevels] = useState<WaterLevelsData>({});
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [expandedRivers, setExpandedRivers] = useState<Set<string>>(new Set());

  const fetchWaterLevels = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/water-levels');
      if (response.ok) {
        const data = await response.json();
        setWaterLevels(data);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error fetching water levels:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWaterLevels();
    
    // Refresh every 15 minutes
    const interval = setInterval(fetchWaterLevels, 15 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const toggleRiver = (riverId: string) => {
    const newExpanded = new Set(expandedRivers);
    if (newExpanded.has(riverId)) {
      newExpanded.delete(riverId);
    } else {
      newExpanded.add(riverId);
    }
    setExpandedRivers(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'high':
      case 'action':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'low':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'flood':
      case 'minor-flood':
        return 'bg-red-100 text-red-700 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'high':
      case 'flood':
        return <TrendingUp className="w-4 h-4" />;
      case 'low':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  if (loading && Object.keys(waterLevels).length === 0) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="w-8 h-8 text-river-600 animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading live water data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">USGS Monitoring Stations</h2>
          <p className="text-gray-600 mt-1">
            Real-time data from {Object.values(waterLevels).reduce((acc: number, river: RiverData) => 
              acc + (river.stations?.length || 0), 0
            )} monitoring stations
          </p>
        </div>
        <div className="text-right">
          <button
            onClick={fetchWaterLevels}
            disabled={loading}
            className="btn-secondary inline-flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          {lastUpdated && (
            <p className="text-xs text-gray-500 mt-2">
              Updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-lg border p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Water Level Status Guide</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-sm text-gray-700">Optimal - Great floating</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span className="text-sm text-gray-700">Low - Possible shallow spots</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full" />
            <span className="text-sm text-gray-700">High/Action - Use caution</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="text-sm text-gray-700">Flood Stage - Do not float</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-400 rounded-full" />
            <span className="text-sm text-gray-700">No data available</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          * Each monitoring station has specific thresholds based on local conditions. 
          Optimal floating ranges vary by location (typically 2-7 ft for most Missouri rivers).
        </p>
      </div>

      {/* River Cards */}
      <div className="grid gap-4">
        {Object.entries(waterLevels).map(([riverId, riverData]) => {
          const isExpanded = expandedRivers.has(riverId);
          const hasStations = riverData.stations && riverData.stations.length > 0;
          
          return (
            <div key={riverId} className="bg-white rounded-lg border overflow-hidden">
              {/* River Header */}
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleRiver(riverId)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {riverData.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {hasStations ? `${riverData.stations.length} monitoring station${riverData.stations.length > 1 ? 's' : ''}` : 'No stations available'}
                    </p>
                  </div>
                  {hasStations && (
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        {riverData.stations[0].gageHeight !== null && (
                          <div className="text-lg font-semibold">
                            {riverData.stations[0].gageHeight.toFixed(1)} ft
                          </div>
                        )}
                        {riverData.stations[0].discharge !== null && (
                          <div className="text-sm text-gray-600">
                            {riverData.stations[0].discharge.toFixed(0)} cfs
                          </div>
                        )}
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded Station Details */}
              {isExpanded && hasStations && (
                <div className="border-t">
                  <div className="p-4 space-y-3">
                    {riverData.stations.map((station: WaterLevelStation) => (
                      <div 
                        key={station.id} 
                        className={`rounded-lg border p-3 ${getStatusColor(station.status?.status || 'unknown')}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{station.name}</h4>
                            {station.location && (
                              <p className="text-xs opacity-75 mt-1 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {station.location}
                              </p>
                            )}
                            {station.status?.description && (
                              <p className="text-xs mt-2 opacity-90">
                                {station.status.description}
                              </p>
                            )}
                          </div>
                          <div className="text-right ml-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(station.status?.status || 'unknown')}
                              <div>
                                {station.gageHeight !== null ? (
                                  <div className="font-semibold">
                                    {station.gageHeight.toFixed(2)} ft
                                  </div>
                                ) : (
                                  <div className="text-sm text-gray-500">No data</div>
                                )}
                                {station.discharge !== null && (
                                  <div className="text-xs opacity-75">
                                    {station.discharge.toFixed(0)} cfs
                                  </div>
                                )}
                              </div>
                            </div>
                            {station.lastUpdated && (
                              <div className="text-xs opacity-60 mt-1">
                                {new Date(station.lastUpdated).toLocaleTimeString()}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 pt-2 border-t border-current opacity-20"></div>
                        <div className="grid grid-cols-2 gap-4 text-xs mt-2">
                          <div>
                            <span className="opacity-75">Station ID:</span>
                            <span className="ml-1 font-mono">{station.id}</span>
                          </div>
                          {station.lat && station.lng && (
                            <div>
                              <span className="opacity-75">Coordinates:</span>
                              <span className="ml-1">{station.lat.toFixed(3)}, {station.lng.toFixed(3)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">About This Data</p>
            <p className="opacity-90">
              Water levels are provided by USGS monitoring stations and update every 15 minutes. 
              Conditions can change rapidly due to weather and dam releases. Always check current 
              conditions before launching and use your best judgment on the water.
            </p>
            <p className="mt-2 opacity-90">
              Note: Not all river sections have monitoring stations. Data shown represents conditions 
              at specific monitoring points which may vary from your launch location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}