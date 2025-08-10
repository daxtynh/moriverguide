import { Metadata } from 'next';
import { Book, Users, Shield, Backpack, Calendar, MapPin, Heart, Sun } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Missouri River Guides - Float Trip, Kayaking & Safety Guides | MoRiverGuide',
  description: 'Complete guides for Missouri river adventures. Learn about safety, what to bring, best times to float, river etiquette, and expert tips for beginners.',
  keywords: 'missouri float trip guide, river safety, what to bring float trip, beginner kayaking guide, missouri river guide',
};

const guides = [
  {
    slug: 'beginners-guide',
    title: "Beginner's Guide to Missouri Float Trips",
    description: 'Everything first-timers need to know about floating Missouri rivers',
    icon: Users,
    color: 'bg-blue-500',
    topics: ['Choosing a river', 'What to expect', 'Basic paddling', 'Safety basics'],
    readTime: '10 min read',
  },
  {
    slug: 'safety-guide',
    title: 'River Safety Guide',
    description: 'Essential safety information for Missouri rivers',
    icon: Shield,
    color: 'bg-red-500',
    topics: ['Life jacket laws', 'Hazard recognition', 'Emergency procedures', 'Weather safety'],
    readTime: '8 min read',
  },
  {
    slug: 'what-to-bring',
    title: 'What to Bring on a Float Trip',
    description: 'Complete packing list for day trips and overnight floats',
    icon: Backpack,
    color: 'bg-green-500',
    topics: ['Essential gear', 'Food & drinks', 'Safety equipment', 'Optional items'],
    readTime: '6 min read',
  },
  {
    slug: 'seasonal-guide',
    title: 'Seasonal Float Guide',
    description: 'Best times to float and what to expect each season',
    icon: Calendar,
    color: 'bg-purple-500',
    topics: ['Spring conditions', 'Summer crowds', 'Fall colors', 'Water temperatures'],
    readTime: '7 min read',
  },
  {
    slug: 'river-etiquette',
    title: 'River Etiquette & Leave No Trace',
    description: 'How to be a responsible river user',
    icon: Heart,
    color: 'bg-pink-500',
    topics: ['Leave No Trace', 'Campsite etiquette', 'Noise considerations', 'Wildlife respect'],
    readTime: '5 min read',
  },
  {
    slug: 'kayaking-vs-canoeing',
    title: 'Kayaking vs Canoeing vs Tubing',
    description: 'Which watercraft is right for your Missouri river adventure',
    icon: MapPin,
    color: 'bg-indigo-500',
    topics: ['Vessel comparison', 'Skill requirements', 'Best rivers for each', 'Rental costs'],
    readTime: '8 min read',
  },
  {
    slug: 'fishing-guide',
    title: 'Fishing Missouri Float Streams',
    description: 'Combine floating with fishing on Missouri rivers',
    icon: Sun,
    color: 'bg-yellow-500',
    topics: ['Best fishing rivers', 'Species guide', 'Regulations', 'Techniques'],
    readTime: '9 min read',
  },
  {
    slug: 'overnight-camping',
    title: 'Overnight Float Camping Guide',
    description: 'Planning multi-day river trips with camping',
    icon: Sun,
    color: 'bg-orange-500',
    topics: ['Gravel bar camping', 'Gear for overnight', 'Meal planning', 'Permits needed'],
    readTime: '12 min read',
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-river-600 to-river-700 text-white py-16">
        <div className="section-padding">
          <div className="flex items-center mb-4">
            <Book className="w-8 h-8 mr-3" />
            <span className="text-sm uppercase tracking-wider opacity-75">River Guides</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Missouri River Guides
          </h1>
          <p className="text-xl opacity-95 max-w-3xl">
            Expert guides and resources to help you plan the perfect Missouri river adventure. 
            From beginner basics to advanced techniques.
          </p>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="section-padding py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="card hover:shadow-xl transition-all group"
              >
                <div className="flex items-start mb-4">
                  <div className={`${guide.color} text-white p-3 rounded-lg mr-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm text-gray-500">{guide.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold mb-2 group-hover:text-river-600 transition-colors">
                  {guide.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {guide.description}
                </p>
                
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">Topics covered:</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    {guide.topics.map((topic, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-river-400 rounded-full mr-2" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6 text-river-600 font-medium group-hover:translate-x-2 transition-transform inline-flex items-center">
                  Read Guide →
                </div>
              </Link>
            );
          })}
        </div>

        {/* Quick Resources */}
        <div className="mt-16 border-t pt-12">
          <h2 className="text-2xl font-bold mb-6">Quick Resources</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <a href="/resources/float-trip-checklist" className="p-4 bg-white rounded-lg border hover:border-river-500 transition-colors">
              <h3 className="font-semibold mb-1">Float Trip Checklist</h3>
              <p className="text-sm text-gray-600">Printable PDF checklist</p>
            </a>
            <a href="/resources/river-maps" className="p-4 bg-white rounded-lg border hover:border-river-500 transition-colors">
              <h3 className="font-semibold mb-1">River Maps</h3>
              <p className="text-sm text-gray-600">Downloadable maps</p>
            </a>
            <a href="/resources/shuttle-services" className="p-4 bg-white rounded-lg border hover:border-river-500 transition-colors">
              <h3 className="font-semibold mb-1">Shuttle Services</h3>
              <p className="text-sm text-gray-600">Transportation options</p>
            </a>
            <a href="/resources/emergency-contacts" className="p-4 bg-white rounded-lg border hover:border-river-500 transition-colors">
              <h3 className="font-semibold mb-1">Emergency Contacts</h3>
              <p className="text-sm text-gray-600">Important phone numbers</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}