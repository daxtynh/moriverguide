'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Activity, AlertTriangle, Info, Droplets } from 'lucide-react';
import { getRiverSiteIds, getWaterStatus, validateFlowRate, USGS_SITES } from '../lib/usgs-sites';

interface WaterLevelDetailProps {
  riverId: string;
  riverName: string;
}

interface USGSData {
  gageHeight?: number;
  discharge?: number;
  temperature?: number;
  siteName?: string;
  siteId?: string;
  dateTime?: string;
}

export default function WaterLevelDetail({ riverId, riverName }: WaterLevelDetailProps) {
  const [waterData, setWaterData] = useState<USGSData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchWaterLevels = useCallback(async () => {
    try {
      const siteIds = getRiverSiteIds(riverId);
      if (!siteIds) return;

      const response = await fetch(
        `https://waterservices.usgs.gov/nwis/iv/?sites=${siteIds}&parameterCd=00065,00060,00010&format=json`
      );
      const data = await response.json();

      const parsedData: USGSData[] = [];
      
      if (data.value?.timeSeries) {
        const sites = USGS_SITES[riverId]?.sites || [];
        
        sites.forEach(site => {
          const siteData: USGSData = {
            siteId: site.id,
            siteName: site.name,
          };

          data.value.timeSeries.forEach((series: {
            sourceInfo?: {
              siteCode?: Array<{ value: string }>;
            };
            variable: {
              variableCode: Array<{ value: string }>;
            };
            values: Array<{
              value: Array<{
                value: string;
                dateTime: string;
              }>;
            }>;
          }) => {
            if (series.sourceInfo?.siteCode?.[0]?.value === site.id) {
              const variable = series.variable.variableCode[0].value;
              const value = series.values[0]?.value[0]?.value;
              const dateTime = series.values[0]?.value[0]?.dateTime;

              if (value) {
                if (variable === '00065') siteData.gageHeight = parseFloat(value);
                if (variable === '00060') siteData.discharge = parseFloat(value);
                if (variable === '00010') siteData.temperature = parseFloat(value);
                if (dateTime) siteData.dateTime = dateTime;
              }
            }
          });

          if (siteData.gageHeight || siteData.discharge) {
            parsedData.push(siteData);
          }
        });
      }

      setWaterData(parsedData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching water data:', error);
    } finally {
      setLoading(false);
    }
  }, [riverId]);

  useEffect(() => {
    fetchWaterLevels();
    const interval = setInterval(fetchWaterLevels, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, [fetchWaterLevels]);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-river-600 to-river-700 text-white py-12">
        <div className="section-padding">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {riverName} Water Levels
          </h1>
          <p className="text-xl opacity-95">
            Real-time water conditions from USGS monitoring stations
          </p>
          {lastUpdated && (
            <p className="text-sm opacity-75 mt-2">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>

      <div className="section-padding py-8">
        {loading ? (
          <div className="text-center py-12">
            <Activity className="w-12 h-12 text-river-600 animate-pulse mx-auto mb-4" />
            <p className="text-gray-600">Loading real-time water data...</p>
          </div>
        ) : waterData.length === 0 ? (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <p className="text-gray-600">No water level data available for this river</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {waterData.map((site, index) => {
              const status = site.gageHeight 
                ? getWaterStatus(site.gageHeight, riverId, site.siteId)
                : null;
              const flowStatus = site.discharge
                ? validateFlowRate(site.discharge, riverId)
                : null;

              return (
                <div key={index} className="card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{site.siteName}</h2>
                      <p className="text-sm text-gray-500 mt-1">USGS Station #{site.siteId}</p>
                    </div>
                    {status && (
                      <div className={`px-4 py-2 rounded-lg font-medium ${
                        status.color === 'green' ? 'bg-green-100 text-green-700' :
                        status.color === 'yellow' ? 'bg-yellow-100 text-yellow-700' :
                        status.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {status.status.toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Gage Height */}
                    {site.gageHeight && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">Gage Height</span>
                          <Activity className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">
                          {site.gageHeight.toFixed(2)} ft
                        </p>
                        {status && (
                          <p className="text-xs text-gray-600 mt-2">{status.description}</p>
                        )}
                      </div>
                    )}

                    {/* Flow Rate */}
                    {site.discharge && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">Flow Rate</span>
                          <Droplets className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">
                          {site.discharge.toFixed(0)} cfs
                        </p>
                        {flowStatus && (
                          <p className="text-xs text-gray-600 mt-2">{flowStatus.description}</p>
                        )}
                      </div>
                    )}

                    {/* Water Temperature */}
                    {site.temperature && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">Water Temp</span>
                          <Info className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-3xl font-bold text-gray-900">
                          {site.temperature.toFixed(1)}°F
                        </p>
                        <p className="text-xs text-gray-600 mt-2">
                          {((site.temperature - 32) * 5/9).toFixed(1)}°C
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Float Recommendations */}
                  {status && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-900 mb-2">Float Recommendations</h3>
                      <div className="text-sm text-blue-800">
                        {status.status === 'optimal' && (
                          <p>✅ Excellent conditions for floating! Water levels are perfect for all skill levels.</p>
                        )}
                        {status.status === 'low' && (
                          <p>⚠️ Low water - expect to drag in shallow spots. Better for tubing than canoes.</p>
                        )}
                        {status.status === 'high' && (
                          <p>⚠️ Higher than normal - faster current. Recommended for experienced paddlers only.</p>
                        )}
                        {(status.status === 'flood' || status.status === 'minor-flood' || status.status === 'action') && (
                          <p>🚫 Dangerous conditions - DO NOT FLOAT. Check back when levels drop.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* SEO Content */}
        <div className="mt-12 prose max-w-none">
          <h2 className="text-3xl font-bold mb-4">About {riverName} Water Levels</h2>
          <p className="text-gray-700 mb-4">
            We provide real-time water level data for {riverName} from official USGS monitoring stations. 
            Our data updates every 5 minutes to give you the most current river conditions for planning your 
            float trip, kayaking adventure, or fishing expedition.
          </p>
          
          <h3 className="text-2xl font-semibold mt-6 mb-3">Understanding Water Levels</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Gage Height:</strong> The water level in feet at the monitoring station</li>
            <li><strong>Flow Rate (CFS):</strong> Cubic feet per second - how much water is flowing</li>
            <li><strong>Optimal Range:</strong> Best conditions for floating and paddling</li>
            <li><strong>Action Stage:</strong> Water approaching unsafe levels</li>
            <li><strong>Flood Stage:</strong> Dangerous conditions - do not enter the water</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-6 mb-3">Plan Your Trip</h3>
          <p className="text-gray-700">
            Use our <Link href="/trip-planner" className="text-river-600 hover:text-river-700 font-medium">Trip Planner</Link> to 
            find the best access points and calculate float times based on current water conditions. 
            Check our <Link href={`/rivers/${riverId}`} className="text-river-600 hover:text-river-700 font-medium">
            {riverName} River Guide</Link> for detailed information about access points, outfitters, and popular float sections.
          </p>
        </div>
      </div>
    </div>
  );
}