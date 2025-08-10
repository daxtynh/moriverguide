import { Metadata } from 'next';
import { Suspense } from 'react';
import OutfitterDirectory from '../components/OutfitterDirectory';

export const metadata: Metadata = {
  title: 'Missouri Float Trip Outfitters | Canoe, Kayak & Raft Rentals',
  description: 'Find and book with trusted Missouri float trip outfitters. Compare prices, services, and locations for canoe, kayak, and raft rentals on all major rivers.',
  keywords: 'missouri float trip outfitters, canoe rental missouri, kayak rental, raft rental, river outfitters',
};

export default function OutfittersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <OutfitterDirectory />
    </Suspense>
  );
}