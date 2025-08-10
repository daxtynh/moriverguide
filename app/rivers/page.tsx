import { Metadata } from 'next';
import RiversListing from '../components/RiversListing';

export const metadata: Metadata = {
  title: 'All Missouri Float Rivers | Complete Guide to Every River',
  description: 'Explore all Missouri rivers perfect for floating. Current River, Meramec, Niangua, Elk River and more. Find water levels, access points, and plan your trip.',
  keywords: 'missouri rivers, float trip rivers, missouri float rivers list, ozark rivers, spring fed rivers missouri',
};

export default function RiversPage() {
  return <RiversListing />;
}