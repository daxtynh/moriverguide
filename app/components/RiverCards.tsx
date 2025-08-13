'use client';

import Link from 'next/link';
import { MapPin, Clock, Users, ChevronRight } from 'lucide-react';
import riversData from '../data/rivers.json';
import WaterLevelBadge from './WaterLevelBadge';

export default function RiverCards() {
  // Show only top 6 most popular rivers
  const featuredRivers = [
    'current-river',
    'meramec-river', 
    'jacks-fork-river',
    'elk-river',
    'niangua-river',
    'eleven-point-river'
  ];
  
  const rivers = riversData.rivers.filter(river => 
    featuredRivers.includes(river.id)
  );

  return (
    <section className="py-16 bg-gray-50">
      <div className="section-padding">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Most Popular Float Rivers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover Missouri&apos;s top 6 rivers for floating. From beginner-friendly family trips 
            to scenic wilderness adventures - find your perfect river experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rivers.map((river) => (
            <div key={river.id} className="card hover:transform hover:scale-105 transition-all duration-300">
              {/* Water Level Indicator */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900">{river.name}</h3>
                  <p className="text-gray-600 mt-1">{river.description}</p>
                </div>
                <WaterLevelBadge riverId={river.id} />
              </div>

              {/* Key Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-700">
                  <MapPin className="w-5 h-5 text-river-500 mr-2" />
                  <span>{river.length} total</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 text-river-500 mr-2" />
                  <span>{river.difficulty}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Users className="w-5 h-5 text-river-500 mr-2" />
                  <span>Crowd Level: {river.crowdLevel}</span>
                </div>
              </div>

              {/* Popular Sections */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Popular Sections:</h4>
                <div className="space-y-2">
                  {river.popularSections.slice(0, 2).map((section, index) => (
                    <div key={index} className="text-sm bg-gray-50 rounded-lg p-2">
                      <div className="font-medium text-gray-700">{section.name}</div>
                      <div className="text-gray-600">
                        {section.distance} • {section.time} • {section.difficulty}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {river.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="text-xs bg-river-100 text-river-700 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-2">
                <Link 
                  href={`/rivers/${river.slug}`}
                  className="flex-1 btn-primary text-center text-sm"
                >
                  View Details
                  <ChevronRight className="w-4 h-4 inline ml-1" />
                </Link>
                <Link 
                  href={`/outfitters?river=${river.id}`}
                  className="flex-1 btn-secondary text-center text-sm"
                >
                  Find Outfitters
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Plan Your Float Trip?
            </h3>
            <p className="text-gray-600 mb-6">
              Explore all 13+ Missouri rivers, compare conditions, and find the perfect outfitter for your adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/rivers" className="btn-primary">
                View All Rivers
                <ChevronRight className="w-5 h-5 inline ml-2" />
              </Link>
              <Link href="/outfitters" className="btn-secondary">
                Find Outfitters
              </Link>
              <Link href="/map" className="btn-outline">
                Interactive Map
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}