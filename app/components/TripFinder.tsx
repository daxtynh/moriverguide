'use client';

import { useState } from 'react';
import { Search, Filter, Map, Clock, DollarSign, Users } from 'lucide-react';

export default function TripFinder() {
  const [tripType, setTripType] = useState('all');
  const [difficulty, setDifficulty] = useState('all');

  return (
    <section className="py-16 bg-white">
      <div className="section-padding">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Float Trip
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Whether you&apos;re planning a DIY adventure or looking for a guided experience, 
            we&apos;ll help you find the perfect Missouri river for your next trip.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="trip-type" className="block text-sm font-medium text-gray-700 mb-2">
                Trip Type
              </label>
              <select 
                id="trip-type"
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-river-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="diy">DIY Self-Guided</option>
                <option value="guided">Guided Tours</option>
                <option value="shuttle">Shuttle Service Only</option>
              </select>
            </div>

            <div>
              <label htmlFor="difficulty-level" className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <select 
                id="difficulty-level"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-river-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner (Class I)</option>
                <option value="intermediate">Intermediate (Class II)</option>
                <option value="advanced">Advanced (Class III+)</option>
              </select>
            </div>

            <div>
              <label htmlFor="trip-duration" className="block text-sm font-medium text-gray-700 mb-2">
                Trip Duration
              </label>
              <select id="trip-duration" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-river-500 focus:border-transparent">
                <option>Any Duration</option>
                <option>2-3 Hours</option>
                <option>Half Day (4-5 Hours)</option>
                <option>Full Day (6-8 Hours)</option>
                <option>Multi-Day</option>
              </select>
            </div>

            <div>
              <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-2">
                Distance from You
              </label>
              <select id="distance" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-river-500 focus:border-transparent">
                <option>Any Distance</option>
                <option>Within 50 miles</option>
                <option>Within 100 miles</option>
                <option>Within 200 miles</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button 
              className="flex items-center text-river-600 hover:text-river-700 min-h-[44px] px-4 py-2"
              aria-label="Show additional filter options"
            >
              <Filter className="w-4 h-4 mr-2" aria-hidden="true" />
              More Filters
            </button>
            <button 
              className="btn-primary"
              aria-label="Search for float trips with selected criteria"
            >
              <Search className="w-4 h-4 mr-2 inline" aria-hidden="true" />
              Search Trips
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-river-50 rounded-lg p-4 text-center">
            <Map className="w-8 h-8 text-river-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">25+</div>
            <div className="text-sm text-gray-600">River Sections</div>
          </div>
          
          <div className="bg-forest-50 rounded-lg p-4 text-center">
            <Clock className="w-8 h-8 text-forest-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">2-8 hrs</div>
            <div className="text-sm text-gray-600">Trip Options</div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">$0-45</div>
            <div className="text-sm text-gray-600">Per Person</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">1-100</div>
            <div className="text-sm text-gray-600">Group Sizes</div>
          </div>
        </div>
      </div>
    </section>
  );
}