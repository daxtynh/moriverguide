'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Phone, Globe, MapPin, DollarSign, Star, ExternalLink, Navigation, Home, ChevronRight } from 'lucide-react';
import outfittersData from '../data/outfitters.json';
import riversData from '../data/rivers.json';

export default function OutfitterDirectory() {
  const searchParams = useSearchParams();
  const [selectedRiver, setSelectedRiver] = useState('all');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState('all');

  useEffect(() => {
    const riverParam = searchParams.get('river');
    if (riverParam) {
      setSelectedRiver(riverParam);
    }
  }, [searchParams]);

  // const allServices = Array.from(new Set(
  //   outfittersData.outfitters.flatMap(o => o.services)
  // )).sort();

  const filteredOutfitters = outfittersData.outfitters.filter(outfitter => {
    const matchesRiver = selectedRiver === 'all' || outfitter.rivers.includes(selectedRiver);
    const matchesServices = selectedServices.length === 0 || 
      selectedServices.every(service => outfitter.services.includes(service));
    const matchesPrice = priceFilter === 'all' || outfitter.priceRange === priceFilter;
    return matchesRiver && matchesServices && matchesPrice;
  });

  // For now, we'll treat all outfitters equally since we don't have featured data
  const featuredOutfitters: typeof filteredOutfitters = [];
  const regularOutfitters = filteredOutfitters;

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const getRiverName = (riverId: string) => {
    const river = riversData.rivers.find(r => r.id === riverId);
    return river ? river.name : riverId;
  };

  const openDirections = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`, '_blank');
  };

  const callOutfitter = (phone: string) => {
    window.location.href = `tel:${phone.replace(/[^0-9]/g, '')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-600 to-forest-700 text-white py-16">
        <div className="section-padding">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm mb-4 opacity-90">
            <Link href="/" className="hover:text-white flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span>Outfitters</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Missouri Float Trip Outfitters
          </h1>
          <p className="text-xl opacity-95 max-w-3xl">
            Book with trusted outfitters on all major Missouri rivers. 
            Compare prices, services, and find the perfect float trip provider.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="section-padding py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* River Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">River</label>
              <select
                value={selectedRiver}
                onChange={(e) => setSelectedRiver(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-river-500 focus:border-transparent"
              >
                <option value="all">All Rivers</option>
                {riversData.rivers.map(river => (
                  <option key={river.id} value={river.id}>{river.name}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-river-500 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="$">Budget ($)</option>
                <option value="$$">Moderate ($$)</option>
                <option value="$$$">Premium ($$$)</option>
              </select>
            </div>

            {/* Service Filters */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Services</label>
              <div className="flex flex-wrap gap-2">
                {['Canoes', 'Kayaks', 'Rafts', 'Camping', 'Cabins', 'Lodging'].map(service => (
                  <button
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedServices.includes(service)
                        ? 'bg-river-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="section-padding pt-6">
        <p className="text-gray-600">
          Showing {filteredOutfitters.length} outfitters
          {selectedRiver !== 'all' && ` on ${getRiverName(selectedRiver)}`}
        </p>
      </div>

      {/* Outfitters Grid */}
      <div className="section-padding py-6">
        {/* Featured Outfitters */}
        {featuredOutfitters.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              Featured Outfitters
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredOutfitters.map(outfitter => (
                <div key={outfitter.id} className="card border-2 border-yellow-100 hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{outfitter.name}</h3>
                      <p className="text-sm text-river-600">
                        {outfitter.rivers.map(r => getRiverName(r)).join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: outfitter.priceRange.length }).map((_, i) => (
                        <DollarSign key={i} className="w-4 h-4 text-green-600" />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{outfitter.description}</p>

                  {/* Services */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {outfitter.services.slice(0, 4).map(service => (
                      <span key={service} className="text-xs bg-river-100 text-river-700 px-2 py-1 rounded">
                        {service}
                      </span>
                    ))}
                    {outfitter.services.length > 4 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{outfitter.services.length - 4} more
                      </span>
                    )}
                  </div>


                  {/* Contact Info */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="truncate">{outfitter.address}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <button 
                        onClick={() => callOutfitter(outfitter.phone)}
                        className="text-river-600 hover:text-river-700"
                      >
                        {outfitter.phone}
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <a
                      href={outfitter.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 btn-primary text-center text-sm"
                    >
                      <Globe className="w-4 h-4 inline mr-1" />
                      Book Now
                    </a>
                    <button
                      onClick={() => openDirections(outfitter.lat, outfitter.lng)}
                      className="flex-1 btn-secondary text-sm"
                    >
                      <Navigation className="w-4 h-4 inline mr-1" />
                      Directions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Regular Outfitters */}
        {regularOutfitters.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4">
              {featuredOutfitters.length > 0 ? 'More Outfitters' : 'All Outfitters'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularOutfitters.map(outfitter => (
                <div key={outfitter.id} className="card hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{outfitter.name}</h3>
                      <p className="text-sm text-river-600">
                        {outfitter.rivers.map(r => getRiverName(r)).join(', ')}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: outfitter.priceRange.length }).map((_, i) => (
                        <DollarSign key={i} className="w-4 h-4 text-green-600" />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3">{outfitter.description}</p>

                  {/* Services */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {outfitter.services.slice(0, 3).map(service => (
                      <span key={service} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {service}
                      </span>
                    ))}
                    {outfitter.services.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        +{outfitter.services.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Contact */}
                  <div className="text-sm text-gray-600 mb-3">
                    <button 
                      onClick={() => callOutfitter(outfitter.phone)}
                      className="text-river-600 hover:text-river-700 flex items-center"
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      {outfitter.phone}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <a
                      href={outfitter.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center text-sm text-river-600 hover:text-river-700 font-medium"
                    >
                      Visit Website
                      <ExternalLink className="w-3 h-3 inline ml-1" />
                    </a>
                    <button
                      onClick={() => openDirections(outfitter.lat, outfitter.lng)}
                      className="flex-1 text-center text-sm text-gray-600 hover:text-gray-700"
                    >
                      Get Directions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {filteredOutfitters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No outfitters found matching your criteria.</p>
            {selectedRiver !== 'all' && (
              <p className="text-gray-500 mt-2">
                Looking for a DIY adventure? Check out our{' '}
                <Link href="/diy-guide" className="text-river-600 hover:text-river-700 font-medium">
                  DIY Float Trip Guide
                </Link>{' '}
                and{' '}
                <Link href={`/access-points?river=${selectedRiver}`} className="text-river-600 hover:text-river-700 font-medium">
                  Access Points Map
                </Link>
              </p>
            )}
            <button 
              onClick={() => {
                setSelectedRiver('all');
                setSelectedServices([]);
                setPriceFilter('all');
              }}
              className="mt-4 text-river-600 hover:text-river-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-river-600 text-white py-12">
        <div className="section-padding text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Float Trip?</h2>
          <p className="text-lg mb-6 opacity-95">
            Contact outfitters directly for the best rates and availability
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/rivers" className="btn-secondary bg-white text-river-700 hover:bg-gray-100">
              Explore Rivers
            </Link>
            <Link href="/trip-planner" className="btn-secondary border-white hover:bg-white hover:text-river-700">
              Plan Your Trip
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}