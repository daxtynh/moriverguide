interface WaterLevelSchemaProps {
  riverName: string;
  riverId: string;
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
  }>;
  lastUpdated?: string | null;
}

export default function WaterLevelSchema({ riverName, riverId, stations, lastUpdated }: WaterLevelSchemaProps) {
  const primaryStation = stations[0];
  
  const datasetSchema = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": `${riverName} Water Level Data`,
    "description": `Real-time water level and flow data for ${riverName} from USGS monitoring stations. Includes gauge height in feet and discharge in cubic feet per second (CFS).`,
    "keywords": [
      `${riverName} water levels`,
      "USGS water data",
      "river gauge height",
      "stream flow data",
      "Missouri rivers",
      "float trip conditions",
      "real-time water monitoring"
    ],
    "creator": {
      "@type": "Organization",
      "name": "U.S. Geological Survey",
      "url": "https://waterdata.usgs.gov/"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "Missouri River Guide",
      "url": "https://moriverguide.com"
    },
    "license": "https://creativecommons.org/publicdomain/zero/1.0/",
    "temporalCoverage": lastUpdated ? `../${lastUpdated}` : undefined,
    "spatialCoverage": primaryStation?.lat && primaryStation?.lng ? {
      "@type": "Place",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": primaryStation.lat,
        "longitude": primaryStation.lng
      },
      "name": primaryStation.location || `${riverName} Monitoring Area`
    } : undefined,
    "distribution": stations.map(station => ({
      "@type": "DataDownload",
      "contentUrl": `https://waterdata.usgs.gov/monitoring-location/${station.id}/`,
      "encodingFormat": "application/json",
      "name": station.name
    })),
    "variableMeasured": [
      {
        "@type": "PropertyValue",
        "name": "Gauge Height",
        "description": "Water surface elevation above datum",
        "unitCode": "FT",
        "unitText": "feet"
      },
      {
        "@type": "PropertyValue", 
        "name": "Discharge",
        "description": "Volume of water flowing past a point per unit time",
        "unitCode": "CFS",
        "unitText": "cubic feet per second"
      }
    ]
  };

  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": `${riverName} Water Monitoring`,
    "description": `Real-time water level monitoring for ${riverName} in Missouri`,
    "geo": primaryStation?.lat && primaryStation?.lng ? {
      "@type": "GeoCoordinates",
      "latitude": primaryStation.lat,
      "longitude": primaryStation.lng
    } : undefined,
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "MO",
      "addressCountry": "US"
    },
    "containedInPlace": {
      "@type": "State",
      "name": "Missouri"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Water Level Monitoring",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification", 
        "name": "Flow Rate Monitoring",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Real-time Data",
        "value": true
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://moriverguide.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Water Levels",
        "item": "https://moriverguide.com/water-levels"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${riverName} Water Levels`,
        "item": `https://moriverguide.com/water-levels/${riverId}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}