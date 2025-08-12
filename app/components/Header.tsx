'use client';

import { useState } from 'react';
import { Menu, X, MapPin, Droplets, Users, Book, Map } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Rivers', href: '/rivers', icon: Droplets },
    { name: 'Trip Planner', href: '/trip-planner', icon: Map },
    { name: 'Guides', href: '/guides', icon: Book },
    { name: 'Blog', href: '/blog', icon: Book },
    { name: 'Map', href: '/map', icon: MapPin },
    { name: 'Outfitters', href: '/outfitters', icon: Users },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="section-padding">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center" aria-label="MoRiverGuide - Home">
              <Droplets className="w-8 h-8 text-river-600 mr-2" aria-hidden="true" />
              <span className="text-xl font-bold text-gray-900">
                Mo<span className="text-river-600">RiverGuide</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center text-gray-700 hover:text-river-600 transition-colors font-medium"
                >
                  <Icon className="w-4 h-4 mr-1" aria-hidden="true" />
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/water-levels"
              className="px-4 py-2 bg-river-600 text-white rounded-lg hover:bg-river-700 transition-colors font-medium"
            >
              Water Levels
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-river-600 focus:outline-none p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center text-gray-700 hover:text-river-600 transition-colors font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4 mr-2" aria-hidden="true" />
                    {item.name}
                  </Link>
                );
              })}
              <Link
                href="/water-levels"
                className="px-4 py-2 bg-river-600 text-white rounded-lg hover:bg-river-700 transition-colors font-medium text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Check Water Levels
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}