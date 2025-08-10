'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, Clock, Droplets, Calendar, Users, 
  AlertCircle, Navigation,
  ChevronDown, ChevronRight, Download, Star
} from 'lucide-react';
import WaterLevelBadge from './WaterLevelBadge';

interface River {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  difficulty: string;
  bestMonths: string[];
  length: string;
  averageDepth: string;
  waterTemp: string;
  features: string[];
  popularSections: {
    name: string;
    distance: string;
    time: string;
    difficulty: string;
  }[];
  accessPoints: {
    name: string;
    lat: number;
    lng: number;
    amenities: string[];
    address: string;
  }[];
  waterLevel: {
    current: number;
    optimal: string;
    status: string;
  };
  crowdLevel: string;
}

export default function RiverDetail({ river }: { river: River }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[500px] bg-gradient-to-b from-river-700 to-river-900">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 h-full flex items-center">
          <div className="section-padding text-white">
            <nav className="flex items-center gap-2 text-sm mb-4 opacity-90">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/rivers" className="hover:text-white">Rivers</Link>
              <ChevronRight className="w-4 h-4" />
              <span>{river.name}</span>
            </nav>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              {river.name} Float Trips
            </h1>
            <p className="text-xl mb-6 max-w-3xl opacity-95">
              {river.description}
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{river.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{river.difficulty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5" />
                <span>{river.waterLevel.current} ft - {river.waterLevel.status}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Crowd: {river.crowdLevel}</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/diy-guide"
                className="bg-white text-river-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg inline-block"
              >
                Plan DIY Trip
              </Link>
              <Link 
                href={`/outfitters?river=${river.id}`}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-river-700 transition-colors duration-200 inline-block"
              >
                Find Outfitters
              </Link>
              <button 
                onClick={() => window.print()}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-river-700 transition-colors duration-200"
              >
                <Download className="w-4 h-4 mr-2 inline" />
                Download Guide
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="section-padding">
          <div className="flex gap-8 overflow-x-auto">
            {['overview', 'access-points', 'sections', 'planning', 'safety'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? 'border-river-600 text-river-600 font-semibold' 
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="section-padding py-12">
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* About This River */}
              <section className="card">
                <h2 className="text-2xl font-bold mb-4">About {river.name}</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {river.longDescription}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {river.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Star className="w-4 h-4 text-river-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">River Stats</h3>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Total Length:</dt>
                        <dd className="font-medium">{river.length}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Average Depth:</dt>
                        <dd className="font-medium">{river.averageDepth}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Water Temp:</dt>
                        <dd className="font-medium">{river.waterTemp}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Difficulty:</dt>
                        <dd className="font-medium">{river.difficulty}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </section>

              {/* Popular Float Sections */}
              <section className="card">
                <h2 className="text-2xl font-bold mb-4">Popular Float Sections</h2>
                <div className="space-y-4">
                  {river.popularSections.map((section, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{section.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          section.difficulty === 'Beginner' 
                            ? 'bg-green-100 text-green-700'
                            : section.difficulty === 'Intermediate'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {section.difficulty}
                        </span>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {section.distance}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {section.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Current Conditions */}
              <div className="card bg-gradient-to-br from-river-50 to-white">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Droplets className="w-5 h-5 mr-2 text-river-600" />
                  Live River Conditions
                </h3>
                
                {/* Live Water Level Badge */}
                <div className="mb-4">
                  <WaterLevelBadge riverId={river.id} showDetails={true} />
                </div>
                
                <div className="space-y-3">
                  <div className="pt-3 border-t">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Crowd Level</span>
                      <span className="font-medium capitalize">{river.crowdLevel}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Water Clarity</span>
                      <span className="font-medium">Clear</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Best Time to Visit */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-river-600" />
                  Best Time to Float
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                    <div 
                      key={month}
                      className={`text-center py-2 rounded text-xs font-medium ${
                        river.bestMonths.includes(month) || 
                        (month === 'Apr' && river.bestMonths.includes('April')) ||
                        (month === 'May' && river.bestMonths.includes('May')) ||
                        (month === 'Jun' && river.bestMonths.includes('June')) ||
                        (month === 'Jul' && river.bestMonths.includes('July')) ||
                        (month === 'Aug' && river.bestMonths.includes('August')) ||
                        (month === 'Sep' && river.bestMonths.includes('September')) ||
                        (month === 'Oct' && river.bestMonths.includes('October'))
                          ? 'bg-river-100 text-river-700 border border-river-300'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link 
                    href={`/access-points?river=${river.id}`}
                    className="w-full btn-primary text-sm text-center block"
                  >
                    View All Access Points
                  </Link>
                  <a 
                    href={`https://weather.com/weather/today/l/${river.accessPoints[0].lat},${river.accessPoints[0].lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-secondary text-sm text-center block"
                  >
                    Check Weather Forecast
                  </a>
                  <Link 
                    href={`/outfitters?river=${river.id}&service=Camping`}
                    className="w-full btn-secondary text-sm text-center block"
                  >
                    Find Nearby Camping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'access-points' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">{river.name} Access Points</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {river.accessPoints.map((point, index) => (
                <div key={index} className="card">
                  <h3 className="text-xl font-semibold mb-2">{point.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{point.address}</p>
                  
                  <div className="flex items-center text-sm text-gray-700 mb-3">
                    <Navigation className="w-4 h-4 mr-2 text-river-500" />
                    <span>{point.lat.toFixed(4)}, {point.lng.toFixed(4)}</span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Amenities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {point.amenities.map((amenity, i) => (
                        <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="text-river-600 hover:text-river-700 text-sm font-medium">
                    Get Directions →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'planning' && (
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Planning Your {river.name} Float Trip</h2>
            
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-semibold mt-8 mb-4">What to Bring</h3>
              <ul className="space-y-2">
                <li>Waterproof bags for phones and valuables</li>
                <li>Sunscreen and hat - Missouri sun can be intense</li>
                <li>Water shoes or sandals with straps</li>
                <li>Cooler with ice (secure it well!)</li>
                <li>Trash bags - Leave No Trace</li>
                <li>First aid kit</li>
                <li>Rope for tying boats together</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">DIY Float Planning Tips</h3>
              <p className="text-gray-700">
                Planning a self-guided float on {river.name}? Here&apos;s everything you need to know:
              </p>
              <ul className="space-y-2">
                <li>Allow 2 miles per hour for casual floating</li>
                <li>Check water levels before you go - optimal is {river.waterLevel.optimal}</li>
                <li>Arrange shuttle service or use two vehicles</li>
                <li>Start early to avoid afternoon thunderstorms</li>
                <li>Bring more water than you think you need</li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">Local Regulations</h3>
              <p className="text-gray-700">
                Missouri rivers are public waterways, but respect private property along the banks. 
                Glass containers are prohibited on most rivers. Always check current regulations before your trip.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'sections' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Float Sections Detailed Guide</h2>
            <div className="space-y-6">
              {river.popularSections.map((section, index) => (
                <div key={index} className="card">
                  <div 
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setExpandedSection(expandedSection === section.name ? null : section.name)}
                  >
                    <div>
                      <h3 className="text-xl font-semibold">{section.name}</h3>
                      <p className="text-gray-600 mt-1">
                        {section.distance} • {section.time} • {section.difficulty}
                      </p>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedSection === section.name ? 'rotate-180' : ''
                    }`} />
                  </div>
                  
                  {expandedSection === section.name && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-gray-700 mb-4">
                        This section offers a perfect {section.difficulty.toLowerCase()} float experience 
                        with beautiful scenery and {section.difficulty === 'Beginner' ? 'gentle currents' : 'exciting rapids'}.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Highlights</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Scenic limestone bluffs</li>
                            <li>• Swimming holes</li>
                            <li>• Wildlife viewing opportunities</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Tips</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Best floated in morning</li>
                            <li>• Watch for shallow areas</li>
                            <li>• Popular on weekends</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'safety' && (
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Safety Guidelines for {river.name}</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded mb-8">
              <div className="flex items-start">
                <AlertCircle className="w-6 h-6 text-yellow-600 mt-0.5 mr-3" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Important Safety Information</h3>
                  <p className="text-gray-700">
                    Always wear a life jacket. Missouri law requires children under 7 to wear one at all times. 
                    Check weather forecasts and avoid floating during storms. Never float alone.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Before You Go</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="block w-6 h-6 bg-river-100 text-river-700 rounded-full text-center text-sm font-bold mr-3">1</span>
                    <div>
                      <h4 className="font-medium">Check Water Levels</h4>
                      <p className="text-sm text-gray-600">Current level: {river.waterLevel.current} ft</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="block w-6 h-6 bg-river-100 text-river-700 rounded-full text-center text-sm font-bold mr-3">2</span>
                    <div>
                      <h4 className="font-medium">Weather Forecast</h4>
                      <p className="text-sm text-gray-600">Avoid storms and high winds</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="block w-6 h-6 bg-river-100 text-river-700 rounded-full text-center text-sm font-bold mr-3">3</span>
                    <div>
                      <h4 className="font-medium">Tell Someone Your Plans</h4>
                      <p className="text-sm text-gray-600">Share your route and return time</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Emergency Contacts</h3>
                <div className="space-y-3">
                  <div className="bg-red-50 p-4 rounded">
                    <h4 className="font-semibold text-red-900">Emergency: 911</h4>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-medium">Missouri State Water Patrol</h4>
                    <p className="text-sm text-gray-600">1-800-525-5555</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-medium">Park Rangers</h4>
                    <p className="text-sm text-gray-600">Check specific park contacts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}