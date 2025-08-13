import Hero from './components/Hero';
import TripFinder from './components/TripFinder';
import QuickStats from './components/QuickStats';
import RiverCards from './components/RiverCards';
import DIYPlanner from './components/DIYPlanner';
import Features from './components/Features';
import SEOContent from './components/SEOContent';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <TripFinder />
      <QuickStats />
      <RiverCards />
      <DIYPlanner />
      <Features />
      <SEOContent />
      <Footer />
    </main>
  );
}