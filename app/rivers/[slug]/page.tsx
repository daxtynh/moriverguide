import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import RiverDetail from '../../components/RiverDetail';
import riversData from '../../data/rivers.json';

interface RiverPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return riversData.rivers.map((river) => ({
    slug: river.slug,
  }));
}

export async function generateMetadata({ params }: RiverPageProps): Promise<Metadata> {
  const { slug } = await params;
  const river = riversData.rivers.find(r => r.slug === slug);
  
  if (!river) {
    return {
      title: 'River Not Found',
    };
  }

  return {
    title: `${river.name} Float Trips | Missouri River Guide | Access Points & DIY Planning`,
    description: `Complete guide to ${river.name} float trips in Missouri. ${river.longDescription.substring(0, 150)}...`,
    keywords: `${river.name.toLowerCase()} float trips, ${river.name.toLowerCase()} missouri, ${river.name.toLowerCase()} access points, ${river.name.toLowerCase()} river map, ${river.name.toLowerCase()} canoe rental`,
    openGraph: {
      title: `${river.name} Float Trips - Complete Missouri River Guide`,
      description: river.longDescription,
      url: `https://moriverguide.com/rivers/${river.slug}`,
      type: 'article',
      images: [
        {
          url: `https://moriverguide.com/images/${river.slug}-hero.jpg`,
          width: 1200,
          height: 630,
          alt: `${river.name} Float Trips`,
        },
      ],
    },
  };
}

export default async function RiverPage({ params }: RiverPageProps) {
  const { slug } = await params;
  const river = riversData.rivers.find(r => r.slug === slug);

  if (!river) {
    notFound();
  }

  return <RiverDetail river={river} />;
}