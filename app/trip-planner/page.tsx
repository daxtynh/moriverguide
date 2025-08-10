import { Metadata } from 'next';
import TripPlannerComponent from '../components/TripPlanner';

export const metadata: Metadata = {
  title: 'Float Trip Planner | Plan Your Missouri River Adventure',
  description: 'Plan your perfect Missouri float trip. Choose your river, select access points, calculate float times, and find outfitters. Interactive trip planning tool.',
  keywords: 'missouri float trip planner, river trip calculator, float time calculator, canoe trip planner, kayak route planner',
};

export default function TripPlannerPage() {
  return <TripPlannerComponent />;
}