import { Metadata } from 'next';
import { Suspense } from 'react';
import AccessPointsMap from '../components/AccessPointsMap';

export const metadata: Metadata = {
  title: 'Missouri River Access Points | 500+ Put-In & Take-Out Locations',
  description: 'Complete map of Missouri river access points for float trips. GPS coordinates, parking info, and amenities for every public put-in and take-out location.',
  keywords: 'missouri river access points, float trip put in locations, river launch sites, take out points missouri',
};

export default function AccessPointsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <AccessPointsMap />
    </Suspense>
  );
}