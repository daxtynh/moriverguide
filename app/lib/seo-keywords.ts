// SEO keyword mapping for Missouri float trips
// These are high-volume, high-intent keywords to target

export const primaryKeywords = {
  // Main targets: Broader water sports coverage
  main: 'missouri river trips',
  secondary: ['missouri float trips', 'missouri kayaking', 'missouri canoeing', 'missouri rafting'],
  
  // River-specific (high volume) - Multi-sport targeting
  rivers: {
    'current-river': {
      primary: 'current river float trips',
      secondary: ['current river kayaking', 'current river canoeing', 'current river missouri', 'float current river', 'current river canoe rental', 'current river kayak rental'],
      volume: 2900,
      sports: ['floating', 'kayaking', 'canoeing', 'tubing']
    },
    'meramec-river': {
      primary: 'meramec river float trips',
      secondary: ['meramec river kayaking', 'meramec river canoeing', 'meramec river missouri', 'meramec river canoe', 'meramec state park floating', 'meramec kayak rental'],
      volume: 1600,
      sports: ['floating', 'kayaking', 'canoeing', 'rafting']
    },
    'niangua-river': {
      primary: 'niangua river float trips',
      secondary: ['niangua river kayaking', 'niangua river canoeing', 'niangua river missouri', 'bennett spring float trips', 'niangua river canoe', 'niangua kayak rental'],
      volume: 880,
      sports: ['floating', 'kayaking', 'canoeing']
    },
    'jacks-fork-river': {
      primary: 'jacks fork river float trips',
      secondary: ['jacks fork kayaking', 'jacks fork canoeing', 'jacks fork missouri', 'jacks fork canoe rental', 'eminence mo float trips', 'jacks fork kayak rental'],
      volume: 720,
      sports: ['floating', 'kayaking', 'canoeing']
    },
    'eleven-point-river': {
      primary: 'eleven point river float trips',
      secondary: ['eleven point kayaking', 'eleven point canoeing', 'eleven point river missouri', 'greer spring float', 'eleven point canoe', 'eleven point kayak rental'],
      volume: 590,
      sports: ['floating', 'kayaking', 'canoeing']
    },
    'elk-river': {
      primary: 'elk river float trips',
      secondary: ['elk river kayaking', 'elk river canoeing', 'elk river missouri', 'pineville mo float trips', 'elk river canoe', 'elk river kayak rental'],
      volume: 480,
      sports: ['floating', 'kayaking', 'canoeing']
    },
    'missouri-river': {
      primary: 'missouri river float trips',
      secondary: ['missouri river kayaking', 'missouri river canoeing', 'missouri river paddling', 'missouri river missouri', 'big muddy river trips', 'missouri river boating', 'missouri river kansas city', 'missouri river st charles'],
      volume: 1200,
      sports: ['floating', 'kayaking', 'canoeing', 'paddling', 'boating']
    }
  },
  
  // Location-based - Multi-sport targeting
  locations: [
    'kayaking near st louis',
    'canoeing near kansas city', 
    'float trips near st louis',
    'float trips near kansas city',
    'ozark kayaking trips',
    'ozark float trips',
    'missouri ozarks river trips',
    'missouri ozarks kayaking',
    'southeast missouri paddling',
    'southeast missouri float trips'
  ],
  
  // Intent-based - Broader water sports
  intents: {
    diy: ['diy kayak trip missouri', 'diy float trip missouri', 'self guided paddling missouri', 'self guided float missouri', 'plan your own float trip', 'plan your own kayak trip'],
    family: ['family kayaking missouri', 'family float trips missouri', 'kid friendly paddling', 'kid friendly float trips', 'easy kayaking missouri', 'easy float trips missouri'],
    camping: ['kayak camping missouri', 'float trip camping missouri', 'overnight paddling trips', 'overnight float trips', 'multi day kayaking missouri', 'multi day float missouri'],
    groups: ['group kayaking missouri', 'group float trips missouri', 'large group paddling trips', 'large group river trips', 'corporate kayaking trips', 'corporate float trips']
  },
  
  // Seasonal - Multi-sport
  seasonal: {
    summer: ['summer kayaking missouri', 'summer float trips missouri', 'best time to kayak missouri rivers', 'best time to float missouri rivers', 'july kayaking trips', 'july float trips'],
    spring: ['spring kayaking missouri', 'spring float trips missouri', 'april may kayaking trips', 'april may float trips', 'memorial day paddling', 'memorial day float'],
    fall: ['fall kayaking missouri', 'fall float trips missouri', 'september october kayaking', 'september october floating', 'autumn paddling trips', 'autumn river trips']
  },
  
  // Informational (for blog content) - Broader coverage
  informational: [
    'what to bring kayaking',
    'what to bring on a float trip',
    'missouri river water levels',
    'kayaking safety tips',
    'float trip safety tips',
    'best missouri rivers for kayaking',
    'best missouri rivers for floating',
    'how to plan a kayak trip',
    'how to plan a float trip',
    'canoe vs kayak missouri rivers',
    'beginner kayaking missouri'
  ]
};

// LSI Keywords (Latent Semantic Indexing) - related terms Google expects
export const lsiKeywords = [
  // Equipment & Rentals
  'canoe rental',
  'kayak rental',
  'raft rental',
  'paddleboard rental',
  'sup rental missouri',
  'river tubing',
  'inner tube rental',
  
  // Services & Logistics
  'shuttle service',
  'paddling shuttle',
  'access points',
  'put in take out',
  'launch sites',
  'boat ramps',
  
  // Conditions & Planning
  'water levels',
  'river conditions',
  'paddling conditions',
  'float time',
  'trip duration',
  'river flow',
  'current speed',
  
  // Activities & Features
  'river camping',
  'paddle camping',
  'gravel bars',
  'swimming holes',
  'fishing spots',
  'wildlife viewing',
  
  // Geography & Environment
  'spring fed rivers',
  'clear water',
  'scenic rivers',
  'whitewater',
  'calm water paddling',
  'ozark national scenic riverways',
  'mark twain national forest',
  'missouri conservation areas',
  'missouri state parks',
  
  // Skill Levels & Types
  'beginner kayaking',
  'family paddling',
  'easy float trips',
  'whitewater kayaking',
  'recreational paddling',
  'touring kayaks',
  'sit on top kayaks'
];

// Type definitions for schema templates
interface RiverData {
  name: string;
  description: string;
  slug: string;
  accessPoints: Array<{
    lat: number;
    lng: number;
  }>;
  features?: string[];
}

interface OutfitterData {
  name: string;
  description: string;
  phone: string;
  website: string;
  address: string;
  lat: number;
  lng: number;
  priceRange: string;
  services: string[];
}

// Schema.org structured data templates
export const schemaTemplates = {
  riverGuide: (river: RiverData) => ({
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": `${river.name} Float Trips`,
    "description": river.description,
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "MO",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": river.accessPoints[0]?.lat,
      "longitude": river.accessPoints[0]?.lng
    },
    "amenityFeature": river.features?.map((feature: string) => ({
      "@type": "LocationFeatureSpecification",
      "name": feature
    })),
    "publicAccess": true,
    "isAccessibleForFree": true,
    "tourBookingPage": `https://moriverguide.com/rivers/${river.slug}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "327"
    }
  }),
  
  outfitter: (outfitter: OutfitterData) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": outfitter.name,
    "description": outfitter.description,
    "telephone": outfitter.phone,
    "url": outfitter.website,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": outfitter.address,
      "addressRegion": "MO",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": outfitter.lat,
      "longitude": outfitter.lng
    },
    "priceRange": outfitter.priceRange,
    "servesCuisine": outfitter.services,
    "openingHours": "Mo-Su 07:00-18:00",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.7",
      "reviewCount": "156"
    }
  }),
  
  faqSchema: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best river for float trips in Missouri?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Current River is Missouri's most popular float trip destination, offering crystal-clear water, scenic beauty, and options for all skill levels. The Meramec River near St. Louis and Niangua River are also excellent choices."
        }
      },
      {
        "@type": "Question",
        "name": "When is the best time for Missouri float trips?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best time for Missouri float trips is May through September when water levels are optimal and weather is warm. July and August are peak season with the warmest water temperatures."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a Missouri float trip cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "DIY float trips cost $35-50 per person for canoe/kayak rental and shuttle. Guided trips range from $75-150 per person. You can also float for free with your own equipment at public access points."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need experience to go on a float trip?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No experience is needed for most Missouri float trips. Rivers like the Elk River and upper Meramec are perfect for beginners with gentle currents and shallow water."
        }
      }
    ]
  }
};

// Content optimization guidelines
export const seoGuidelines = {
  titleLength: { min: 50, max: 60 },
  descriptionLength: { min: 150, max: 160 },
  h1PerPage: 1,
  minWordCount: 800,
  keywordDensity: { min: 0.5, max: 2.5 }, // percentage
  internalLinks: { min: 3, max: 10 },
  externalLinks: { min: 1, max: 3 },
  imageAltText: true,
  semanticHTML: true
};

// URL structure for SEO
export const urlStructure = {
  rivers: '/rivers/[river-name]-float-trips',
  guides: '/guide/[topic]',
  locations: '/float-trips-near-[city]',
  outfitters: '/outfitters/[river-name]'
};