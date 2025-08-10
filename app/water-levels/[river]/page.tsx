import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import WaterLevelDetail from '../../components/WaterLevelDetail';

const riverData: Record<string, { name: string; description: string }> = {
  'current-river': {
    name: 'Current River',
    description: 'Real-time water levels and float conditions for Current River, Missouri\'s most popular float stream'
  },
  'meramec-river': {
    name: 'Meramec River',
    description: 'Live water levels and conditions for Meramec River near St. Louis'
  },
  'jacks-fork-river': {
    name: 'Jacks Fork River',
    description: 'Current water levels and float conditions for Jacks Fork River'
  },
  'niangua-river': {
    name: 'Niangua River',
    description: 'Real-time water levels for Niangua River at Bennett Spring'
  },
  'eleven-point-river': {
    name: 'Eleven Point River',
    description: 'Live water conditions for Eleven Point Wild & Scenic River'
  },
  'elk-river': {
    name: 'Elk River',
    description: 'Current water levels and float conditions for Elk River in Southwest Missouri'
  },
  'gasconade-river': {
    name: 'Gasconade River',
    description: 'Real-time water levels for Gasconade River, Missouri\'s longest river'
  },
  'black-river': {
    name: 'Black River',
    description: 'Live water levels and conditions for Black River'
  },
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

  return {
    title: `${river.name} Water Levels - Real-Time River Conditions | MoRiverGuide`,
    description: `${river.description}. Check current water levels, CFS flow rates, and float recommendations. Updated hourly from USGS data.`,
    keywords: `${river.name} water level, ${river.name} river conditions, ${river.name} float conditions, ${river.name} CFS, Missouri river levels`,
    openGraph: {
      title: `${river.name} Water Levels - Current Conditions`,
      description: river.description,
      type: 'website',
    },
    alternates: {
      canonical: `https://moriverguide.com/water-levels/${riverSlug}`,
    },
  };
}

export default async function WaterLevelPage({ params }: { params: Promise<{ river: string }> }) {
  const { river: riverSlug } = await params;
  const river = riverData[riverSlug];
  
  if (!river) {
    notFound();
  }

  return <WaterLevelDetail riverId={riverSlug} riverName={river.name} />;
}