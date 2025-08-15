import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import WaterLevelDetail from '../../components/WaterLevelDetail';
import WaterLevelSchema from '../../components/WaterLevelSchema';

const riverData: Record<string, { name: string; description: string; keywords: string[] }> = {
  'current-river': {
    name: 'Current River',
    description: 'Real-time water levels and float conditions for Current River, Missouri\'s most popular float stream with crystal-clear spring-fed water',
    keywords: ['current river water levels', 'current river missouri', 'current river float conditions', 'current river CFS', 'van buren water levels']
  },
  'meramec-river': {
    name: 'Meramec River',
    description: 'Live water levels and conditions for Meramec River near St. Louis with multiple USGS monitoring stations',
    keywords: ['meramec river water levels', 'meramec river missouri', 'eureka water levels', 'meramec river CFS', 'sullivan water levels']
  },
  'jacks-fork-river': {
    name: 'Jacks Fork River',
    description: 'Current water levels and float conditions for Jacks Fork River in the Ozark National Scenic Riverways',
    keywords: ['jacks fork water levels', 'jacks fork river missouri', 'eminence water levels', 'jacks fork CFS', 'alley spring water levels']
  },
  'niangua-river': {
    name: 'Niangua River',
    description: 'Real-time water levels for Niangua River at Bennett Spring and Tunnel Dam monitoring stations',
    keywords: ['niangua river water levels', 'bennett spring water levels', 'niangua river missouri', 'tunnel dam water levels', 'niangua CFS']
  },
  'eleven-point-river': {
    name: 'Eleven Point River',
    description: 'Live water conditions for Eleven Point Wild & Scenic River with monitoring at Bardley and Greer',
    keywords: ['eleven point river water levels', 'eleven point missouri', 'bardley water levels', 'greer water levels', 'eleven point CFS']
  },
  'elk-river': {
    name: 'Elk River',
    description: 'Current water levels and float conditions for Elk River in Southwest Missouri near Pineville',
    keywords: ['elk river water levels', 'elk river missouri', 'pineville water levels', 'tiff city water levels', 'elk river CFS']
  },
  'gasconade-river': {
    name: 'Gasconade River',
    description: 'Real-time water levels for Gasconade River, Missouri\'s longest river, with monitoring at Jerome and Rich Fountain',
    keywords: ['gasconade river water levels', 'gasconade missouri', 'jerome water levels', 'rich fountain water levels', 'gasconade CFS']
  },
  'black-river': {
    name: 'Black River',
    description: 'Live water levels and conditions for Black River with monitoring stations at Poplar Bluff and Annapolis',
    keywords: ['black river water levels', 'black river missouri', 'poplar bluff water levels', 'annapolis water levels', 'black river CFS']
  },
  'big-piney-river': {
    name: 'Big Piney River',
    description: 'Real-time water levels for Big Piney River, a scenic Ozark float stream with clear spring water',
    keywords: ['big piney river water levels', 'big piney missouri', 'big piney CFS', 'big piney float conditions']
  },
  'huzzah-creek': {
    name: 'Huzzah Creek',
    description: 'Current water levels for Huzzah Creek near Steelville, a popular beginner-friendly float stream',
    keywords: ['huzzah creek water levels', 'huzzah creek missouri', 'steelville water levels', 'huzzah creek CFS']
  },
  'courtois-creek': {
    name: 'Courtois Creek',
    description: 'Live water levels for Courtois Creek, a pristine Ozark creek perfect for short float trips',
    keywords: ['courtois creek water levels', 'courtois creek missouri', 'courtois water levels', 'courtois creek CFS']
  },
  'north-fork-river': {
    name: 'North Fork River',
    description: 'Real-time water levels for North Fork River near Tecumseh in the Missouri Ozarks',
    keywords: ['north fork river water levels', 'north fork missouri', 'tecumseh water levels', 'north fork CFS']
  },
  'james-river': {
    name: 'James River',
    description: 'Current water levels and conditions for James River at Galena in Southwest Missouri',
    keywords: ['james river water levels', 'james river missouri', 'galena water levels', 'james river CFS']
  },
  'osage-river': {
    name: 'Osage River',
    description: 'Live water levels for Osage River, a major Missouri waterway with monitoring at multiple locations',
    keywords: ['osage river water levels', 'osage river missouri', 'taberville water levels', 'bagnell water levels', 'osage CFS']
  },
  'spring-river': {
    name: 'Spring River',
    description: 'Real-time water levels for Spring River below Verona and at La Russell in Southwest Missouri',
    keywords: ['spring river water levels', 'spring river missouri', 'verona water levels', 'la russell water levels', 'spring river CFS']
  },
  'buffalo-creek': {
    name: 'Buffalo Creek',
    description: 'Current water levels for Buffalo Creek at Tiff City near the Oklahoma border',
    keywords: ['buffalo creek water levels', 'buffalo creek missouri', 'tiff city water levels', 'buffalo creek CFS']
  },
  'big-river': {
    name: 'Big River',
    description: 'Live water levels for Big River at Byrnesville, a scenic tributary of the Meramec River',
    keywords: ['big river water levels', 'big river missouri', 'byrnesville water levels', 'big river CFS']
  },
  'bourbeuse-river': {
    name: 'Bourbeuse River',
    description: 'Real-time water levels for Bourbeuse River near Union, flowing into the Meramec River',
    keywords: ['bourbeuse river water levels', 'bourbeuse missouri', 'union water levels', 'bourbeuse CFS']
  },
  'st-francis-river': {
    name: 'St. Francis River',
    description: 'Current water levels for St. Francis River near Roselle in Southeast Missouri',
    keywords: ['st francis river water levels', 'st francis missouri', 'roselle water levels', 'st francis CFS']
  },
  'white-river': {
    name: 'White River',
    description: 'Live water levels for White River at Forsyth, below Table Rock Dam in the Missouri Ozarks',
    keywords: ['white river water levels', 'white river missouri', 'forsyth water levels', 'table rock dam', 'white river CFS']
  }
};

export async function generateStaticParams() {
  return Object.keys(riverData).map((river) => ({
    river,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ river: string }> }): Promise<Metadata> {
  const { river: riverSlug } = await params;
  const river = riverData[riverSlug];
  
  if (!river) {
    return {
      title: 'River Not Found',
    };
  }

  const keywordsString = river.keywords.join(', ') + ', missouri river water levels, USGS water data, float trip conditions';

  return {
    title: `${river.name} Water Levels - Live USGS Data & Float Conditions`,
    description: `${river.description}. Check current gauge height, CFS flow rates, and safety status. Updated every 15 minutes from USGS monitoring stations.`,
    keywords: keywordsString,
    openGraph: {
      title: `${river.name} Water Levels - Live River Conditions`,
      description: river.description,
      type: 'website',
      siteName: 'Missouri River Guide',
      images: [{
        url: `https://moriverguide.com/api/og?river=${encodeURIComponent(river.name)}`,
        width: 1200,
        height: 630,
        alt: `${river.name} water levels and float conditions`
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: `${river.name} Water Levels - Live USGS Data`,
      description: river.description,
      images: [`https://moriverguide.com/api/og?river=${encodeURIComponent(river.name)}`]
    },
    alternates: {
      canonical: `https://moriverguide.com/water-levels/${riverSlug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

async function fetchWaterLevelData(riverId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/water-levels`, {
      cache: 'no-cache'
    });
    const data = await response.json();
    return data[riverId] || null;
  } catch (error) {
    console.error('Error fetching water level data:', error);
    return null;
  }
}

export default async function WaterLevelPage({ params }: { params: Promise<{ river: string }> }) {
  const { river: riverSlug } = await params;
  const river = riverData[riverSlug];
  
  if (!river) {
    notFound();
  }

  const waterLevelData = await fetchWaterLevelData(riverSlug);

  return (
    <>
      {waterLevelData && (
        <WaterLevelSchema
          riverName={river.name}
          riverId={riverSlug}
          stations={waterLevelData.stations || []}
          lastUpdated={waterLevelData.lastUpdated}
        />
      )}
      <WaterLevelDetail riverId={riverSlug} riverName={river.name} />
    </>
  );
}