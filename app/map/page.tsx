import { Metadata } from 'next';
import MapPageClient from '../components/MapPageClient';

export const metadata: Metadata = {
  title: 'Missouri Float Trips Map | Rivers, Access Points & Outfitters',
  description: 'Interactive map of all Missouri float trip rivers, access points, and outfitters. Plan your route, find put-in and take-out spots, and locate nearby services.',
  keywords: 'missouri float trips map, river access points missouri, float trip outfitters map, missouri river map, ozark rivers map',
};

export default function MapPage() {
  return <MapPageClient />;
}