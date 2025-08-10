import { Metadata } from 'next';
import Link from 'next/link';
import { Car, MapPin, Clock, DollarSign, CheckCircle, AlertTriangle, Download } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DIY Missouri Float Trip Guide | Self-Guided River Adventures',
  description: 'Complete guide to planning DIY float trips in Missouri. Save money with self-guided trips, vehicle logistics, shuttle alternatives, and expert tips.',
  keywords: 'DIY float trips missouri, self guided river trips, missouri float trip planning, how to plan float trip',
};

export default function DIYGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-600 to-forest-700 text-white py-16">
        <div className="section-padding">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            DIY Float Trip Guide
          </h1>
          <p className="text-xl opacity-95 max-w-3xl">
            Everything you need to plan a self-guided Missouri river adventure. 
            Save money and float on your own schedule!
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="section-padding py-12">
        <div className="max-w-4xl mx-auto">
          {/* Intro */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold mb-4">Why Go DIY?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Save Money</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <DollarSign className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                    <span>Save $30-60 per person vs guided trips</span>
                  </li>
                  <li className="flex items-start">
                    <DollarSign className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                    <span>Rent canoes for $40-50 vs $80+ with outfitter</span>
                  </li>
                  <li className="flex items-start">
                    <DollarSign className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                    <span>Free if you own your equipment</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">More Freedom</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-river-600 mr-2 mt-0.5" />
                    <span>Start and end whenever you want</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-river-600 mr-2 mt-0.5" />
                    <span>Choose your own route and distance</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-river-600 mr-2 mt-0.5" />
                    <span>Stop and explore at your pace</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step by Step Guide */}
          <div className="space-y-6 mb-12">
            <h2 className="text-3xl font-bold">Step-by-Step DIY Planning</h2>
            
            {/* Step 1 */}
            <div className="card border-l-4 border-river-600">
              <div className="flex items-start">
                <div className="bg-river-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Choose Your River & Section</h3>
                  <p className="text-gray-700 mb-3">
                    Start with an easy river like the Meramec or Elk for your first DIY trip. 
                    Plan for 2 miles per hour of casual floating.
                  </p>
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-medium mb-2">Beginner-Friendly Sections:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Meramec State Park: 7 miles, 3-4 hours</li>
                      <li>• Elk River Noel Section: 6 miles, 3 hours</li>
                      <li>• Current River Big Spring: 8 miles, 4 hours</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="card border-l-4 border-river-600">
              <div className="flex items-start">
                <div className="bg-river-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Plan Your Vehicle Logistics</h3>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded">
                      <h4 className="font-medium text-green-900 mb-2">Two-Car Method (Best)</h4>
                      <ol className="text-sm text-gray-700 space-y-1">
                        <li>1. Meet at take-out point, leave Car A</li>
                        <li>2. Everyone drives in Car B to put-in</li>
                        <li>3. Float to Car A</li>
                        <li>4. Drive Car A back to get Car B</li>
                      </ol>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded">
                      <h4 className="font-medium text-yellow-900 mb-2">One-Car + Shuttle</h4>
                      <p className="text-sm text-gray-700">
                        Park at take-out, pay $35-50 for shuttle to put-in. 
                        Float ends at your car!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="card border-l-4 border-river-600">
              <div className="flex items-start">
                <div className="bg-river-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Get Your Equipment</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Essential Gear:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Canoe/kayak ($40-50 rental)</li>
                        <li>• Life jackets (required by law)</li>
                        <li>• Paddles + spare</li>
                        <li>• Dry bags/waterproof containers</li>
                        <li>• Rope for tying boats</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Where to Rent:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Local outfitters (canoe only)</li>
                        <li>• Sporting goods stores</li>
                        <li>• Facebook Marketplace</li>
                        <li>• Walmart (basic kayaks $200)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="card border-l-4 border-river-600">
              <div className="flex items-start">
                <div className="bg-river-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Check Conditions & Launch</h3>
                  <div className="bg-blue-50 p-4 rounded">
                    <h4 className="font-medium text-blue-900 mb-2">Before You Go:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✓ Check water levels (2-4 ft optimal)</li>
                      <li>✓ Weather forecast (no storms)</li>
                      <li>✓ Tell someone your float plan</li>
                      <li>✓ Start early (8-10 AM best)</li>
                      <li>✓ Pack trash bags (Leave No Trace)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="card bg-gradient-to-br from-green-50 to-white mb-8">
            <h2 className="text-2xl font-bold mb-4">DIY vs Guided Cost Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Item</th>
                    <th className="text-center py-2">DIY Cost</th>
                    <th className="text-center py-2">Guided Cost</th>
                    <th className="text-right py-2">Savings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Canoe Rental</td>
                    <td className="text-center">$40-50</td>
                    <td className="text-center">$80-100</td>
                    <td className="text-right text-green-600 font-semibold">$40-50</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Shuttle (if needed)</td>
                    <td className="text-center">$35</td>
                    <td className="text-center">Included</td>
                    <td className="text-right">-</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Life Jackets</td>
                    <td className="text-center">$5 rental</td>
                    <td className="text-center">Included</td>
                    <td className="text-right">-</td>
                  </tr>
                  <tr className="border-b font-semibold">
                    <td className="py-2">Total Per Canoe</td>
                    <td className="text-center">$80-90</td>
                    <td className="text-center">$160-200</td>
                    <td className="text-right text-green-600">$80-110</td>
                  </tr>
                  <tr className="font-bold text-lg">
                    <td className="py-2">Per Person (2 people)</td>
                    <td className="text-center text-river-600">$40-45</td>
                    <td className="text-center">$80-100</td>
                    <td className="text-right text-green-600">$40-55</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="card mb-8">
            <h2 className="text-2xl font-bold mb-4">Pro DIY Tips</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  <Clock className="w-5 h-5 inline mr-2 text-river-600" />
                  Timing
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Start by 9 AM to avoid crowds</li>
                  <li>• Weekdays are much less crowded</li>
                  <li>• Allow extra time for first trip</li>
                  <li>• End by 4 PM for safety</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  <MapPin className="w-5 h-5 inline mr-2 text-river-600" />
                  Navigation
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Download offline maps beforehand</li>
                  <li>• Mark GPS waypoints</li>
                  <li>• Look for landmarks</li>
                  <li>• Ask locals for beta</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  <AlertTriangle className="w-5 h-5 inline mr-2 text-yellow-600" />
                  Common Mistakes
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Underestimating float time</li>
                  <li>• Not checking water levels</li>
                  <li>• Forgetting sun protection</li>
                  <li>• No backup paddle</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  <Car className="w-5 h-5 inline mr-2 text-river-600" />
                  Parking
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Arrive early for best spots</li>
                  <li>• Never leave valuables visible</li>
                  <li>• Take photos of parking spot</li>
                  <li>• Have backup access points</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-river-600 text-white rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready for Your DIY Adventure?</h2>
            <p className="text-lg mb-6 opacity-95">
              Use our trip planner to map your route and find access points
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/" className="btn-secondary bg-white text-river-700 hover:bg-gray-100">
                Plan Your Trip
              </Link>
              <button className="btn-secondary border-white text-white hover:bg-white/10">
                <Download className="w-5 h-5 mr-2 inline" />
                Download PDF Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}