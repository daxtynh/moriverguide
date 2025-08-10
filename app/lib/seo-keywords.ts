// SEO keyword mapping for Missouri float trips
// These are high-volume, high-intent keywords to target

export const primaryKeywords = {
  // Main target: 5,400 searches/month
  main: 'missouri float trips',
  
  // River-specific (high volume)
  rivers: {
    'current-river': {
      primary: 'current river float trips',
      secondary: ['current river missouri', 'float current river', 'current river canoe rental'],
      volume: 2900
    },
    'meramec-river': {
      primary: 'meramec river float trips',
      secondary: ['meramec river missouri', 'meramec river canoe', 'meramec state park floating'],
      volume: 1600
    },
    'niangua-river': {
      primary: 'niangua river float trips',
      secondary: ['niangua river missouri', 'bennett spring float trips', 'niangua river canoe'],
      volume: 880
    },
    'jacks-fork-river': {
      primary: 'jacks fork river float trips',
      secondary: ['jacks fork missouri', 'jacks fork canoe rental', 'eminence mo float trips'],
      volume: 720
    },
    'eleven-point-river': {
      primary: 'eleven point river float trips',
      secondary: ['eleven point river missouri', 'greer spring float', 'eleven point canoe'],
      volume: 590
    },
    'elk-river': {
      primary: 'elk river float trips',
      secondary: ['elk river missouri', 'pineville mo float trips', 'elk river canoe'],
      volume: 480
    }
  },
  
  // Location-based
  locations: [
    'float trips near st louis',
    'float trips near kansas city',
    'ozark float trips',
    'missouri ozarks river trips',
    'southeast missouri float trips'
  ],
  
  // Intent-based
  intents: {
    diy: ['diy float trip missouri', 'self guided float missouri', 'plan your own float trip'],
    family: ['family float trips missouri', 'kid friendly float trips', 'easy float trips missouri'],
    camping: ['float trip camping missouri', 'overnight float trips', 'multi day float missouri'],
    groups: ['group float trips missouri', 'large group river trips', 'corporate float trips']
  },
  
  // Seasonal
  seasonal: {
    summer: ['summer float trips missouri', 'best time to float missouri rivers', 'july float trips'],
    spring: ['spring float trips missouri', 'april may float trips', 'memorial day float'],
    fall: ['fall float trips missouri', 'september october floating', 'autumn river trips']
  },
  
  // Informational (for blog content)
  informational: [
    'what to bring on a float trip',
    'missouri river water levels',
    'float trip safety tips',
    'best missouri rivers for floating',
    'how to plan a float trip'
  ]
};

// LSI Keywords (Latent Semantic Indexing) - related terms Google expects
export const lsiKeywords = [
  'canoe rental',
  'kayak rental',
  'raft rental',
  'river tubing',
  'shuttle service',
  'access points',
  'put in take out',
  'water levels',
  'river conditions',
  'float time',
  'river camping',
  'gravel bars',
  'swimming holes',
  'spring fed rivers',
  'clear water',
  'scenic rivers',
  'ozark national scenic riverways',
  'mark twain national forest',
  'missouri conservation areas'
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