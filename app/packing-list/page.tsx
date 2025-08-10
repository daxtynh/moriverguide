import { Metadata } from 'next';
import Link from 'next/link';
import { CheckSquare, Sun, Package, Camera, Shirt, Home, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Float Trip Packing List | What to Bring on Missouri Rivers',
  description: 'Complete packing list for Missouri float trips. Essential items, clothing, safety gear, and what NOT to bring on your river adventure.',
  keywords: 'float trip packing list, what to bring floating, missouri river gear, float trip essentials',
};

export default function PackingListPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-16">
        <div className="section-padding">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm mb-4 opacity-90">
            <Link href="/" className="hover:text-white flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span>Packing List</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Float Trip Packing List</h1>
          <p className="text-xl opacity-95">Everything you need (and nothing you don&apos;t) for the perfect float</p>
        </div>
      </div>

      <div className="section-padding py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Essentials */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <CheckSquare className="w-5 h-5 mr-2 text-river-600" />
                Essentials
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>☑️ Life jackets (required)</li>
                <li>☑️ Paddles + spare</li>
                <li>☑️ Dry bag/waterproof container</li>
                <li>☑️ Rope (20ft minimum)</li>
                <li>☑️ Trash bags</li>
                <li>☑️ First aid kit</li>
                <li>☑️ Emergency whistle</li>
              </ul>
            </div>

            {/* Sun Protection */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Sun className="w-5 h-5 mr-2 text-yellow-600" />
                Sun Protection
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>☑️ Sunscreen SPF 30+</li>
                <li>☑️ Hat with strap</li>
                <li>☑️ Sunglasses with strap</li>
                <li>☑️ Lip balm with SPF</li>
                <li>☑️ Long-sleeve shirt (UV protection)</li>
                <li>☑️ Aloe vera (for after)</li>
              </ul>
            </div>

            {/* Clothing */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Shirt className="w-5 h-5 mr-2 text-blue-600" />
                Clothing
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>☑️ Swimsuit</li>
                <li>☑️ Quick-dry shorts</li>
                <li>☑️ Water shoes or sandals with straps</li>
                <li>☑️ Change of clothes (in car)</li>
                <li>☑️ Towel</li>
                <li>☑️ Light rain jacket</li>
              </ul>
            </div>

            {/* Food & Drinks */}
            <div className="card">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <Package className="w-5 h-5 mr-2 text-green-600" />
                Food & Drinks
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>☑️ Water (1 gallon per person)</li>
                <li>☑️ Cooler with ice</li>
                <li>☑️ Snacks (non-perishable)</li>
                <li>☑️ Sandwiches in bags</li>
                <li>☑️ Fruit</li>
                <li>☑️ NO GLASS (prohibited)</li>
              </ul>
            </div>
          </div>

          {/* What NOT to Bring */}
          <div className="card bg-red-50 border-2 border-red-200 mt-6">
            <h2 className="text-xl font-bold text-red-900 mb-4">❌ What NOT to Bring</h2>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <ul className="space-y-1">
                <li>🚫 Glass containers (illegal)</li>
                <li>🚫 Valuables</li>
                <li>🚫 Electronics without protection</li>
              </ul>
              <ul className="space-y-1">
                <li>🚫 Excessive alcohol</li>
                <li>🚫 Styrofoam coolers</li>
                <li>🚫 Firearms</li>
              </ul>
            </div>
          </div>

          {/* Optional Items */}
          <div className="card mt-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Camera className="w-5 h-5 mr-2 text-purple-600" />
              Optional But Nice
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <ul className="space-y-1">
                <li>📸 Waterproof camera</li>
                <li>🎵 Waterproof speaker</li>
                <li>🎣 Fishing gear</li>
              </ul>
              <ul className="space-y-1">
                <li>🏊 Floaties for relaxing</li>
                <li>🗺️ River map</li>
                <li>💰 Cash for shuttles</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}