import { NextResponse } from 'next/server';
import { USGS_SITES, getAllSiteIds, getWaterStatus } from '@/app/lib/usgs-sites';

interface CacheData {
  [key: string]: {
    name: string;
    stations: Array<{
      id: string;
      name: string;
      location?: string;
      lat?: number;
      lng?: number;
      gageHeight?: number | null;
      gageHeightUnit?: string | null;
      discharge?: number | null;
      dischargeUnit?: string | null;
      lastUpdated?: string | null;
      status?: { status: string; color: string; description?: string } | null;
      lastReading?: string;
      error?: string;
    }>;
    lastUpdated: string | null;
    error?: string;
  };
}

// Cache water levels for 15 minutes to avoid hitting API too often
let cache: { data: CacheData; timestamp: number } | null = null;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export async function GET() {
  try {
    // Check if we have cached data
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      return NextResponse.json(cache.data);
    }

    // Get all site IDs
    const siteIds = getAllSiteIds();
    
    // USGS API endpoint for instantaneous values
    const url = `https://waterservices.usgs.gov/nwis/iv/?format=json&sites=${siteIds}&parameterCd=00065,00060&siteStatus=all`;
    
    console.log('Fetching from USGS:', url);
    
    // Fetch data from USGS
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MissouriFloatTrips/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`USGS API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Process the data - USGS returns data in 'value.timeSeries' array
    const waterLevels: CacheData = {};
    
    // Initialize all rivers with their stations
    Object.entries(USGS_SITES).forEach(([riverId, riverData]) => {
      waterLevels[riverId] = {
        name: riverData.name,
        stations: [],
        lastUpdated: null
      };
    });

    // Process timeSeries data from USGS
    if (data.value && data.value.timeSeries) {
      data.value.timeSeries.forEach((ts: {
        sourceInfo?: { siteCode?: Array<{ value: string }>; siteName?: string };
        variable?: { variableCode?: Array<{ value: string }>; variableName?: string; unit?: { unitCode: string } };
        values?: Array<{ value?: Array<{ value: string; dateTime: string }> }>;
      }) => {
        // Extract site info
        const siteCode = ts.sourceInfo?.siteCode?.[0]?.value;
        // const siteName = ts.sourceInfo?.siteName; // Available if needed
        const variableCode = ts.variable?.variableCode?.[0]?.value;
        // const variableName = ts.variable?.variableName;
        const unit = ts.variable?.unit?.unitCode;
        
        // Get the latest value
        const latestValue = ts.values?.[0]?.value?.[0];
        
        if (!siteCode || !latestValue) return;
        
        // Find which river this site belongs to
        for (const [riverId, riverData] of Object.entries(USGS_SITES)) {
          const site = riverData.sites.find(s => s.id === siteCode);
          
          if (site) {
            // Find or create station in results
            let stationInfo = waterLevels[riverId].stations.find((s) => s.id === siteCode);
            
            if (!stationInfo) {
              stationInfo = {
                id: siteCode,
                name: site.name,
                location: site.location,
                lat: site.lat,
                lng: site.lng,
                gageHeight: null,
                gageHeightUnit: null,
                discharge: null,
                dischargeUnit: null,
                lastUpdated: null,
                status: null
              };
              waterLevels[riverId].stations.push(stationInfo);
            }
            
            // Add the measurement data
            const value = parseFloat(latestValue.value);
            
            if (variableCode === '00065') {
              // Gage height in feet
              stationInfo.gageHeight = value;
              stationInfo.gageHeightUnit = unit;
            } else if (variableCode === '00060') {
              // Discharge in cubic feet per second
              stationInfo.discharge = value;
              stationInfo.dischargeUnit = unit;
            }
            
            // Update timestamp
            if (latestValue.dateTime) {
              stationInfo.lastUpdated = latestValue.dateTime;
              if (!waterLevels[riverId].lastUpdated || latestValue.dateTime > waterLevels[riverId].lastUpdated) {
                waterLevels[riverId].lastUpdated = latestValue.dateTime;
              }
            }
            
            break; // Found the river, no need to continue
          }
        }
      });
    }

    // Calculate status for each station using station-specific thresholds
    Object.entries(waterLevels).forEach(([riverId, riverData]) => {
      riverData.stations.forEach((station) => {
        if (station.gageHeight !== null && station.gageHeight !== undefined) {
          // Pass both riverId and siteId for station-specific thresholds
          station.status = getWaterStatus(station.gageHeight, riverId, station.id);
        }
      });
    });

    console.log('Processed water levels:', JSON.stringify(waterLevels, null, 2));

    // Cache the processed data
    cache = {
      data: waterLevels,
      timestamp: Date.now()
    };

    return NextResponse.json(waterLevels);
    
  } catch (error) {
    console.error('Error fetching water levels:', error);
    
    // Return fallback data if API fails
    const fallbackData: CacheData = {};
    Object.entries(USGS_SITES).forEach(([riverId, riverData]) => {
      fallbackData[riverId] = {
        name: riverData.name,
        stations: riverData.sites.map(site => ({
          ...site,
          gageHeight: Math.random() * 3 + 2, // Random between 2-5 feet
          discharge: Math.random() * 500 + 200, // Random between 200-700 cfs
          status: {
            status: 'optimal',
            description: 'Simulated - API unavailable',
            color: 'gray'  
          },
          error: 'Using simulated data - USGS API unavailable'
        })),
        lastUpdated: new Date().toISOString(),
        error: 'Using simulated data'
      };
    });
    
    return NextResponse.json(fallbackData);
  }
}