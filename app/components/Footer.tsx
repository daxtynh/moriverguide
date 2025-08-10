'use client';

import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">MoRiverGuide.com</h3>
            <p className="text-gray-400 text-sm mb-4">
              Your complete Missouri river resource. Real-time conditions, trip planner, and guides 
              for floating, kayaking, and canoeing Missouri&apos;s scenic waterways.
            </p>
            <div className="flex gap-3">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Popular Rivers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Rivers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/water-levels/current-river" className="text-gray-400 hover:text-white transition-colors">Current River</Link></li>
              <li><Link href="/water-levels/meramec-river" className="text-gray-400 hover:text-white transition-colors">Meramec River</Link></li>
              <li><Link href="/water-levels/niangua-river" className="text-gray-400 hover:text-white transition-colors">Niangua River</Link></li>
              <li><Link href="/water-levels/jacks-fork-river" className="text-gray-400 hover:text-white transition-colors">Jacks Fork</Link></li>
              <li><Link href="/water-levels/elk-river" className="text-gray-400 hover:text-white transition-colors">Elk River</Link></li>
              <li><Link href="/rivers" className="text-gray-400 hover:text-white transition-colors">View All Rivers →</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/trip-planner" className="text-gray-400 hover:text-white transition-colors">Trip Planner</Link></li>
              <li><Link href="/water-levels" className="text-gray-400 hover:text-white transition-colors">Water Levels</Link></li>
              <li><Link href="/guides" className="text-gray-400 hover:text-white transition-colors">River Guides</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog & News</Link></li>
              <li><Link href="/map" className="text-gray-400 hover:text-white transition-colors">Interactive Map</Link></li>
              <li><Link href="/outfitters" className="text-gray-400 hover:text-white transition-colors">Find Outfitters</Link></li>
              <li><Link href="/guides/beginners-guide" className="text-gray-400 hover:text-white transition-colors">Beginner&apos;s Guide</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                Missouri Ozarks Region
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                1-800-FLOAT-MO
              </li>
              <li className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                info@moriverguide.com
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Newsletter</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 px-3 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-river-500"
                />
                <button className="px-4 py-2 bg-river-600 rounded-lg hover:bg-river-700 transition-colors text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div>
            © 2025 MoRiverGuide.com. All rights reserved.
          </div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}