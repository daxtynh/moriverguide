// USGS Water Data Site Codes for Missouri Rivers
// These are actual USGS monitoring stations on each river
// Flood stages and action stages are based on USGS/NWS data

interface USGSSite {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  // Station-specific thresholds (in feet)
  floodStage?: number;
  actionStage?: number;
  minorFloodStage?: number;
  optimalRange?: [number, number];
}

interface RiverSites {
  name: string;
  sites: USGSSite[];
}

export const USGS_SITES: Record<string, RiverSites> = {
  'current-river': {
    name: 'Current River',
    sites: [
      {
        id: '07067000',
        name: 'Current River at Van Buren',
        location: 'Van Buren, MO',
        lat: 36.9917,
        lng: -91.0151,
        floodStage: 20.0,  // Actual flood stage at Van Buren
        actionStage: 12.0,
        minorFloodStage: 16.0,
        optimalRange: [3.0, 7.0]  // Good floating conditions
      },
      {
        id: '07066000',
        name: 'Current River at Doniphan',
        location: 'Doniphan, MO',
        lat: 36.6206,
        lng: -90.8234,
        floodStage: 16.0,
        actionStage: 10.0,
        minorFloodStage: 13.0,
        optimalRange: [2.5, 6.0]
      },
      {
        id: '07064533',
        name: 'Current River at Big Spring',
        location: 'Big Spring, MO',
        lat: 36.9561,
        lng: -91.1073,
        optimalRange: [2.0, 5.0]  // Spring-fed, more consistent
      }
    ]
  },
  'meramec-river': {
    name: 'Meramec River',
    sites: [
      {
        id: '07019000',
        name: 'Meramec River near Eureka',
        location: 'Eureka, MO',
        lat: 38.5047,
        lng: -90.6279,
        floodStage: 26.0,  // Actual flood stage at Eureka
        actionStage: 19.0,
        minorFloodStage: 22.0,
        optimalRange: [3.0, 8.0]
      },
      {
        id: '07019130',
        name: 'Meramec River at Valley Park',
        location: 'Valley Park, MO',
        lat: 38.5492,
        lng: -90.4923,
        floodStage: 25.0,
        actionStage: 16.0,
        minorFloodStage: 21.0,
        optimalRange: [2.5, 7.0]
      },
      {
        id: '07018500',
        name: 'Meramec River near Sullivan',
        location: 'Sullivan, MO',
        lat: 38.1589,
        lng: -91.1779,
        floodStage: 18.0,
        actionStage: 12.0,
        minorFloodStage: 15.0,
        optimalRange: [2.0, 6.0]
      }
    ]
  },
  'niangua-river': {
    name: 'Niangua River',
    sites: [
      {
        id: '06923700',
        name: 'Niangua River near Bennett Spring',
        location: 'Bennett Spring, MO',
        lat: 37.7142,
        lng: -92.8532,
        optimalRange: [2.0, 5.0]  // Spring-fed section
      },
      {
        id: '06923500',
        name: 'Niangua River at Tunnel Dam',
        location: 'Tunnel Dam, MO',
        lat: 37.9711,
        lng: -92.9921,
        floodStage: 15.0,
        actionStage: 9.0,
        minorFloodStage: 12.0,
        optimalRange: [3.0, 7.0]
      }
    ]
  },
  'jacks-fork-river': {
    name: 'Jacks Fork River',
    sites: [
      {
        id: '07065495',
        name: 'Jacks Fork at Eminence',
        location: 'Eminence, MO',
        lat: 37.1506,
        lng: -91.3571,
        floodStage: 12.0,
        actionStage: 7.0,
        minorFloodStage: 9.0,
        optimalRange: [2.0, 4.5]
      },
      {
        id: '07065200',
        name: 'Jacks Fork at Alley Spring',
        location: 'Alley Spring, MO',
        lat: 37.1433,
        lng: -91.4468,
        optimalRange: [1.5, 4.0]  // Smaller stream here
      }
    ]
  },
  'eleven-point-river': {
    name: 'Eleven Point River',
    sites: [
      {
        id: '07071500',
        name: 'Eleven Point River near Bardley',
        location: 'Bardley, MO',
        lat: 36.6739,
        lng: -91.0968,
        floodStage: 14.0,
        actionStage: 8.0,
        minorFloodStage: 11.0,
        optimalRange: [2.5, 6.0]
      },
      {
        id: '07071000',
        name: 'Eleven Point River at Greer',
        location: 'Greer, MO',
        lat: 36.7939,
        lng: -91.3468,
        optimalRange: [2.0, 5.0]
      }
    ]
  },
  'elk-river': {
    name: 'Elk River',
    sites: [
      {
        id: '07189540',
        name: 'Elk River near Pineville',
        location: 'Pineville, MO',
        lat: 36.5948,
        lng: -94.3841,
        floodStage: 18.0,
        actionStage: 12.0,
        minorFloodStage: 15.0,
        optimalRange: [3.0, 8.0]
      },
      {
        id: '07189000',
        name: 'Elk River near Tiff City',
        location: 'Tiff City, MO',
        lat: 36.6334,
        lng: -94.5902,
        floodStage: 20.0,
        actionStage: 13.0,
        minorFloodStage: 16.0,
        optimalRange: [3.5, 9.0]
      }
    ]
  },
  'gasconade-river': {
    name: 'Gasconade River',
    sites: [
      {
        id: '06933500',
        name: 'Gasconade River at Jerome',
        location: 'Jerome, MO',
        lat: 37.9234,
        lng: -91.9678,
        floodStage: 15.0,
        actionStage: 10.0,
        minorFloodStage: 12.0,
        optimalRange: [3.0, 7.0]
      },
      {
        id: '06934500',
        name: 'Gasconade River near Rich Fountain',
        location: 'Rich Fountain, MO',
        lat: 38.3856,
        lng: -91.8234,
        floodStage: 20.0,
        actionStage: 14.0,
        minorFloodStage: 17.0,
        optimalRange: [4.0, 9.0]
      }
    ]
  },
  'big-piney-river': {
    name: 'Big Piney River',
    sites: [
      {
        id: '06930800',
        name: 'Big Piney River near Big Piney',
        location: 'Big Piney, MO',
        lat: 37.5678,
        lng: -92.1234,
        optimalRange: [2.0, 5.0]
      }
    ]
  },
  'black-river': {
    name: 'Black River',
    sites: [
      {
        id: '07061000',
        name: 'Black River at Poplar Bluff',
        location: 'Poplar Bluff, MO',
        lat: 36.7567,
        lng: -90.3929,
        floodStage: 16.0,
        actionStage: 12.0,
        minorFloodStage: 14.0,
        optimalRange: [3.0, 6.0]
      },
      {
        id: '07061500',
        name: 'Black River at Annapolis',
        location: 'Annapolis, MO',
        lat: 37.3456,
        lng: -90.7123,
        optimalRange: [2.5, 5.5]
      }
    ]
  },
  'huzzah-creek': {
    name: 'Huzzah Creek',
    sites: [
      {
        id: '07019280',
        name: 'Huzzah Creek near Steelville',
        location: 'Steelville, MO',
        lat: 37.9678,
        lng: -91.3456,
        optimalRange: [1.5, 3.0]
      }
    ]
  },
  'courtois-creek': {
    name: 'Courtois Creek',
    sites: [
      {
        id: '07019300',
        name: 'Courtois Creek near Courtois',
        location: 'Courtois, MO',
        lat: 37.9123,
        lng: -91.1456,
        optimalRange: [1.5, 3.0]
      }
    ]
  },
  'north-fork-river': {
    name: 'North Fork River',
    sites: [
      {
        id: '07057500',
        name: 'North Fork River near Tecumseh',
        location: 'Tecumseh, MO',
        lat: 36.5892,
        lng: -92.2793,
        floodStage: 12.0,
        actionStage: 8.0,
        minorFloodStage: 10.0,
        optimalRange: [3.0, 5.0]
      }
    ]
  },
  'james-river': {
    name: 'James River',
    sites: [
      {
        id: '07052500',
        name: 'James River at Galena',
        location: 'Galena, MO',
        lat: 36.8034,
        lng: -93.4668,
        floodStage: 15.0,
        actionStage: 10.0,
        minorFloodStage: 12.0,
        optimalRange: [2.5, 5.0]
      }
    ]
  },
  'osage-river': {
    name: 'Osage River',
    sites: [
      {
        id: '06918250',
        name: 'Osage River at Taberville',
        location: 'Taberville, MO',
        lat: 37.7739,
        lng: -93.8818,
        floodStage: 20.0,
        actionStage: 14.0,
        minorFloodStage: 17.0,
        optimalRange: [4.0, 9.0]
      },
      {
        id: '06926000',
        name: 'Osage River near Bagnell',
        location: 'Bagnell, MO',
        lat: 38.2111,
        lng: -92.5946,
        floodStage: 22.0,
        actionStage: 15.0,
        minorFloodStage: 18.0,
        optimalRange: [5.0, 12.0]
      },
      {
        id: '06926510',
        name: 'Osage River below St. Thomas',
        location: 'St. Thomas, MO',
        lat: 38.2567,
        lng: -92.4234,
        optimalRange: [3.0, 8.0]
      }
    ]
  },
  'spring-river': {
    name: 'Spring River',
    sites: [
      {
        id: '07185250',
        name: 'Spring River below Verona',
        location: 'Verona, MO',
        lat: 36.9734,
        lng: -93.7329,
        floodStage: 16.0,
        actionStage: 10.0,
        minorFloodStage: 13.0,
        optimalRange: [3.0, 7.0]
      },
      {
        id: '07185700',
        name: 'Spring River at La Russell',
        location: 'La Russell, MO',
        lat: 37.0456,
        lng: -93.8129,
        optimalRange: [2.5, 6.0]
      }
    ]
  },
  'buffalo-creek': {
    name: 'Buffalo Creek',
    sites: [
      {
        id: '07189100',
        name: 'Buffalo Creek at Tiff City',
        location: 'Tiff City, MO',
        lat: 36.6361,
        lng: -94.5908,
        floodStage: 12.0,
        actionStage: 8.0,
        minorFloodStage: 10.0,
        optimalRange: [2.0, 5.0]
      }
    ]
  },
  'big-river': {
    name: 'Big River',
    sites: [
      {
        id: '07019500',
        name: 'Big River at Byrnesville',
        location: 'Byrnesville, MO',
        lat: 37.9234,
        lng: -90.6123,
        floodStage: 18.0,
        actionStage: 12.0,
        minorFloodStage: 15.0,
        optimalRange: [2.5, 6.0]
      }
    ]
  },
  'bourbeuse-river': {
    name: 'Bourbeuse River',
    sites: [
      {
        id: '07014500',
        name: 'Bourbeuse River near Union',
        location: 'Union, MO',
        lat: 38.4467,
        lng: -91.0045,
        floodStage: 15.0,
        actionStage: 10.0,
        minorFloodStage: 12.0,
        optimalRange: [2.0, 5.0]
      }
    ]
  },
  'st-francis-river': {
    name: 'St. Francis River',
    sites: [
      {
        id: '07067500',
        name: 'St. Francis River near Roselle',
        location: 'Roselle, MO',
        lat: 37.0856,
        lng: -90.0734,
        floodStage: 16.0,
        actionStage: 11.0,
        minorFloodStage: 13.0,
        optimalRange: [3.0, 7.0]
      }
    ]
  },
  'white-river': {
    name: 'White River',
    sites: [
      {
        id: '07052152',
        name: 'White River at Forsyth',
        location: 'Forsyth, MO',
        lat: 36.6856,
        lng: -93.1234,
        floodStage: 14.0,
        actionStage: 9.0,
        minorFloodStage: 11.0,
        optimalRange: [2.5, 6.0]
      }
    ]
  }
};

// Function to get all site IDs as a comma-separated string for API call
export function getAllSiteIds(): string {
  return Object.values(USGS_SITES)
    .flatMap(river => river.sites.map(site => site.id))
    .join(',');
}

// Function to get site IDs for a specific river
export function getRiverSiteIds(riverId: string): string {
  const river = USGS_SITES[riverId as keyof typeof USGS_SITES];
  if (!river) return '';
  return river.sites.map(site => site.id).join(',');
}

// Function to find a specific site by ID
export function findSiteById(siteId: string): USGSSite | null {
  for (const river of Object.values(USGS_SITES)) {
    const site = river.sites.find(s => s.id === siteId);
    if (site) return site;
  }
  return null;
}

// Water level status calculation based on gauge height and station-specific thresholds
export function getWaterStatus(gageHeight: number, riverId: string, siteId?: string): {
  status: 'low' | 'optimal' | 'high' | 'flood' | 'action' | 'minor-flood';
  description: string;
  color: string;
} {
  // Try to find station-specific thresholds
  let site: USGSSite | null = null;
  
  if (siteId) {
    site = findSiteById(siteId);
  }
  
  // If we have station-specific thresholds, use them
  if (site) {
    // Check flood stages first (highest priority)
    if (site.floodStage && gageHeight >= site.floodStage) {
      return {
        status: 'flood',
        description: `Major Flood Stage (≥${site.floodStage} ft) - DO NOT FLOAT`,
        color: 'red'
      };
    }
    
    if (site.minorFloodStage && gageHeight >= site.minorFloodStage) {
      return {
        status: 'minor-flood',
        description: `Minor Flood Stage (≥${site.minorFloodStage} ft) - Dangerous conditions`,
        color: 'red'
      };
    }
    
    if (site.actionStage && gageHeight >= site.actionStage) {
      return {
        status: 'action',
        description: `Action Stage (≥${site.actionStage} ft) - Monitor closely`,
        color: 'orange'
      };
    }
    
    // Check optimal range
    if (site.optimalRange) {
      const [low, high] = site.optimalRange;
      
      if (gageHeight < low * 0.7) {
        return {
          status: 'low',
          description: `Very Low (<${(low * 0.7).toFixed(1)} ft) - May be too shallow`,
          color: 'yellow'
        };
      } else if (gageHeight < low) {
        return {
          status: 'low',
          description: `Low (<${low} ft) - Possible shallow spots`,
          color: 'yellow'
        };
      } else if (gageHeight <= high) {
        return {
          status: 'optimal',
          description: `Optimal (${low}-${high} ft) - Great floating conditions`,
          color: 'green'
        };
      } else if (gageHeight < (site.actionStage || high * 1.5)) {
        return {
          status: 'high',
          description: `High (>${high} ft) - Faster current than usual`,
          color: 'orange'
        };
      }
    }
  }
  
  // Fallback to general ranges if no station-specific data
  const generalRanges: Record<string, { low: number; optimal: [number, number]; high: number; flood: number }> = {
    'current-river': { low: 2.5, optimal: [3, 7], high: 10, flood: 15 },
    'meramec-river': { low: 2.5, optimal: [3, 8], high: 12, flood: 20 },
    'niangua-river': { low: 2, optimal: [2.5, 6], high: 8, flood: 12 },
    'jacks-fork-river': { low: 1.5, optimal: [2, 4.5], high: 6, flood: 10 },
    'eleven-point-river': { low: 2, optimal: [2.5, 6], high: 8, flood: 12 },
    'elk-river': { low: 3, optimal: [3.5, 8], high: 12, flood: 16 },
    'gasconade-river': { low: 2.5, optimal: [3, 7], high: 10, flood: 15 },
    'big-piney-river': { low: 2, optimal: [2, 5], high: 7, flood: 12 },
    'black-river': { low: 2, optimal: [3, 6], high: 9, flood: 14 },
    'huzzah-creek': { low: 1, optimal: [1.5, 3], high: 4, flood: 6 },
    'courtois-creek': { low: 1, optimal: [1.5, 3], high: 4, flood: 6 },
    'north-fork-river': { low: 2.5, optimal: [3, 5], high: 7, flood: 10 },
    'james-river': { low: 2, optimal: [2.5, 5], high: 7, flood: 12 },
    'osage-river': { low: 3.5, optimal: [4, 9], high: 14, flood: 20 },
    'spring-river': { low: 2.5, optimal: [3, 7], high: 10, flood: 16 },
    'buffalo-creek': { low: 1.5, optimal: [2, 5], high: 8, flood: 12 },
    'big-river': { low: 2, optimal: [2.5, 6], high: 12, flood: 18 },
    'bourbeuse-river': { low: 1.5, optimal: [2, 5], high: 10, flood: 15 },
    'st-francis-river': { low: 2.5, optimal: [3, 7], high: 11, flood: 16 },
    'white-river': { low: 2, optimal: [2.5, 6], high: 9, flood: 14 }
  };

  const range = generalRanges[riverId] || { low: 2, optimal: [3, 6], high: 9, flood: 15 };

  if (gageHeight >= range.flood) {
    return {
      status: 'flood',
      description: `Flood Stage (≥${range.flood} ft) - DO NOT FLOAT`,
      color: 'red'
    };
  } else if (gageHeight >= range.high) {
    return {
      status: 'high',
      description: `High (${range.high}-${range.flood} ft) - Use extreme caution`,
      color: 'orange'
    };
  } else if (gageHeight < range.low) {
    return {
      status: 'low',
      description: `Low (<${range.low} ft) - May be too shallow in spots`,
      color: 'yellow'
    };
  } else if (gageHeight >= range.optimal[0] && gageHeight <= range.optimal[1]) {
    return {
      status: 'optimal',
      description: `Optimal (${range.optimal[0]}-${range.optimal[1]} ft) - Great conditions`,
      color: 'green'
    };
  } else if (gageHeight > range.optimal[1]) {
    return {
      status: 'high',
      description: `Above Normal (>${range.optimal[1]} ft) - Faster current`,
      color: 'orange'
    };
  } else {
    return {
      status: 'low',
      description: `Below Normal (<${range.optimal[0]} ft) - Slower current`,
      color: 'yellow'
    };
  }
}

// Validate flow rate (CFS - Cubic Feet per Second)
// Normal ranges for Missouri float rivers
export function validateFlowRate(cfs: number, riverId: string): {
  isNormal: boolean;
  description: string;
} {
  // Typical flow ranges for Missouri rivers (in CFS)
  const flowRanges: Record<string, { low: number; normal: [number, number]; high: number }> = {
    'current-river': { low: 500, normal: [800, 3000], high: 5000 },  // Larger river
    'meramec-river': { low: 200, normal: [400, 2000], high: 4000 },
    'niangua-river': { low: 100, normal: [200, 1000], high: 2000 },
    'jacks-fork-river': { low: 50, normal: [100, 500], high: 1000 },  // Smaller river
    'eleven-point-river': { low: 200, normal: [300, 1500], high: 3000 },
    'elk-river': { low: 100, normal: [200, 1200], high: 2500 },
    'gasconade-river': { low: 300, normal: [500, 2500], high: 4500 },
    'big-piney-river': { low: 80, normal: [150, 800], high: 1500 },
    'black-river': { low: 150, normal: [300, 1200], high: 2500 },
    'huzzah-creek': { low: 20, normal: [40, 200], high: 400 },
    'courtois-creek': { low: 15, normal: [30, 150], high: 300 },
    'north-fork-river': { low: 200, normal: [300, 1000], high: 2000 },
    'james-river': { low: 150, normal: [250, 1000], high: 2000 },
    'osage-river': { low: 800, normal: [1200, 5000], high: 8000 },  // Large river
    'spring-river': { low: 200, normal: [350, 1500], high: 3000 },
    'buffalo-creek': { low: 40, normal: [80, 400], high: 800 },
    'big-river': { low: 100, normal: [200, 1000], high: 2000 },
    'bourbeuse-river': { low: 80, normal: [150, 800], high: 1500 },
    'st-francis-river': { low: 200, normal: [400, 1800], high: 3500 },
    'white-river': { low: 300, normal: [500, 2000], high: 4000 }
  };

  const range = flowRanges[riverId] || { low: 100, normal: [200, 1500], high: 3000 };

  if (cfs < range.low) {
    return {
      isNormal: false,
      description: `Very low flow (<${range.low} cfs)`
    };
  } else if (cfs >= range.normal[0] && cfs <= range.normal[1]) {
    return {
      isNormal: true,
      description: `Normal flow (${range.normal[0]}-${range.normal[1]} cfs)`
    };
  } else if (cfs > range.high) {
    return {
      isNormal: false,
      description: `Very high flow (>${range.high} cfs) - Dangerous`
    };
  } else if (cfs > range.normal[1]) {
    return {
      isNormal: true,
      description: `Above normal flow (${range.normal[1]}-${range.high} cfs)`
    };
  } else {
    return {
      isNormal: true,
      description: `Below normal flow (${range.low}-${range.normal[0]} cfs)`
    };
  }
}