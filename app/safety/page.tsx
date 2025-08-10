import { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, Phone, Shield, Droplets, Heart, Home, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Missouri Float Trip Safety Guide | River Safety Tips & Emergency Info',
  description: 'Essential safety information for Missouri float trips. Learn about water safety, emergency contacts, weather hazards, and life jacket requirements.',
  keywords: 'float trip safety, missouri river safety, water safety guidelines, float trip emergency',
};

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="section-padding">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm mb-4 opacity-90">
            <Link href="/" className="hover:text-white flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span>Safety</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Safety Guidelines</h1>
          <p className="text-xl opacity-95 max-w-3xl">
            Your safety is our top priority. Follow these guidelines for a safe and enjoyable float trip.
          </p>
        </div>
      </div>

      <div className="section-padding py-12">
        <div className="max-w-4xl mx-auto">
          {/* Emergency Contacts */}
          <div className="card bg-red-50 border-2 border-red-200 mb-8">
            <h2 className="text-2xl font-bold text-red-900 mb-4 flex items-center">
              <Phone className="w-6 h-6 mr-2" />
              Emergency Contacts
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded">
                <h3 className="font-bold text-red-900">Emergency: 911</h3>
                <p className="text-sm text-gray-600">For immediate emergencies</p>
              </div>
              <div className="bg-white p-4 rounded">
                <h3 className="font-bold">MO Water Patrol</h3>
                <p className="text-sm text-gray-600">1-800-525-5555</p>
              </div>
            </div>
          </div>

          {/* Safety Rules */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold mb-6">Essential Safety Rules</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-river-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-2">Always Wear Life Jackets</h3>
                  <p className="text-gray-700">Missouri law requires children under 7 to wear life jackets at all times. We recommend everyone wears one.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Droplets className="w-6 h-6 text-river-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-2">Check Water Levels</h3>
                  <p className="text-gray-700">Never float when water levels are above 5 feet or during flood conditions.</p>
                </div>
              </div>
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-2">Avoid Alcohol</h3>
                  <p className="text-gray-700">Alcohol and water don&apos;t mix. Save celebrations for after your float.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Weather Hazards */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold mb-4">Weather Hazards</h2>
            <div className="bg-yellow-50 p-4 rounded mb-4">
              <p className="text-gray-700">
                <strong>Lightning:</strong> If you hear thunder, get off the water immediately. 
                Missouri thunderstorms can develop quickly.
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded">
              <p className="text-gray-700">
                <strong>Flash Floods:</strong> Never float if rain is forecast upstream. 
                Water levels can rise rapidly in narrow valleys.
              </p>
            </div>
          </div>

          {/* First Aid */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Heart className="w-6 h-6 mr-2 text-red-600" />
              Basic First Aid
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Bring These Items:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Waterproof first aid kit</li>
                  <li>• Sunscreen SPF 30+</li>
                  <li>• Insect repellent</li>
                  <li>• Medications</li>
                  <li>• Emergency whistle</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Common Issues:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Sunburn - reapply sunscreen hourly</li>
                  <li>• Dehydration - drink water regularly</li>
                  <li>• Cuts - clean and bandage</li>
                  <li>• Heat exhaustion - rest in shade</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}