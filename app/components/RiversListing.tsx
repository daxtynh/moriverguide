'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Clock, Users, Droplets, ChevronRight, Grid, List, Home } from 'lucide-react';
import riversData from '../data/rivers.json';

export default function RiversListing() {
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const filteredRivers = riversData.rivers.filter(river => {
    const matchesSearch = river.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          river.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || 
                              river.difficulty.toLowerCase().includes(difficultyFilter.toLowerCase());
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-river-600 to-river-700 text-white py-16">
        <div className="section-padding">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-sm mb-4 opacity-90">
            <Link href="/" className="hover:text-white flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span>Rivers</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Missouri Float Rivers
          </h1>
          <p className="text-xl opacity-95 max-w-3xl">
            Explore all the beautiful rivers Missouri has to offer. From gentle family floats to exciting rapids, 
            find your perfect river adventure with real-time conditions and detailed guides.
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="section-padding py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search rivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-river-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-river-500 focus:border-transparent"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-river-100 text-river-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-river-100 text-river-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="section-padding pt-8">
        <p className="text-gray-600">
          Showing {filteredRivers.length} of {riversData.rivers.length} rivers
        </p>
      </div>

      {/* Rivers Grid/List */}
      <div className="section-padding py-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRivers.map((river) => (
              <div key={river.id} className="card hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{river.name}</h2>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    river.waterLevel.status === 'excellent' 
                      ? 'bg-green-100 text-green-700'
                      : river.waterLevel.status === 'good'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    <Droplets className="w-4 h-4 inline mr-1" />
                    {river.waterLevel.current} ft
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{river.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-5 h-5 text-river-500 mr-2" />
                    <span>{river.length}</span>
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

                <div className="flex flex-wrap gap-2 mb-6">
                  {river.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="text-xs bg-river-100 text-river-700 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>

                <Link 
                  href={`/rivers/${river.slug}`}
                  className="btn-primary w-full text-center"
                >
                  View Details
                  <ChevronRight className="w-4 h-4 inline ml-1" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRivers.map((river) => (
              <div key={river.id} className="card hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">{river.name}</h2>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium md:hidden ${
                        river.waterLevel.status === 'excellent' 
                          ? 'bg-green-100 text-green-700'
                          : river.waterLevel.status === 'good'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {river.waterLevel.current} ft
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{river.description}</p>
                    
                    <div className="flex flex-wrap gap-4">
                      <span className="flex items-center text-gray-700">
                        <MapPin className="w-4 h-4 text-river-500 mr-1" />
                        {river.length}
                      </span>
                      <span className="flex items-center text-gray-700">
                        <Clock className="w-4 h-4 text-river-500 mr-1" />
                        {river.difficulty}
                      </span>
                      <span className="flex items-center text-gray-700">
                        <Users className="w-4 h-4 text-river-500 mr-1" />
                        Crowd: {river.crowdLevel}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <div className={`hidden md:block px-3 py-1 rounded-full text-sm font-medium ${
                      river.waterLevel.status === 'excellent' 
                        ? 'bg-green-100 text-green-700'
                        : river.waterLevel.status === 'good'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      <Droplets className="w-4 h-4 inline mr-1" />
                      {river.waterLevel.current} ft
                    </div>
                    
                    <Link 
                      href={`/rivers/${river.slug}`}
                      className="btn-primary whitespace-nowrap"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4 inline ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SEO Content */}
      <div className="bg-white py-16">
        <div className="section-padding">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mb-6">Your Complete Guide to Missouri Float Rivers</h2>
            
            <p className="text-gray-700 mb-6">
              Missouri offers some of the best float trips in the United States, with crystal-clear spring-fed rivers 
              winding through the beautiful Ozark Mountains. Whether you&apos;re planning a DIY float trip or looking 
              for guided tours, our comprehensive river guides provide everything you need for the perfect adventure.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Popular Missouri Float Rivers</h3>
            <p className="text-gray-700 mb-4">
              From the famous Current River to the family-friendly Elk River, Missouri&apos;s rivers offer diverse 
              experiences for every skill level. Each river has its own unique character, from gentle floats perfect 
              for families to exciting rapids for adventure seekers.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Planning Your Float Trip</h3>
            <p className="text-gray-700 mb-4">
              Use our real-time water level data and crowd predictions to choose the perfect time for your float. 
              Our DIY planning tools help you coordinate vehicles, find access points, and estimate float times. 
              With over 500 mapped access points and detailed river sections, you&apos;ll have everything needed 
              for a successful self-guided adventure.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Safety and Regulations</h3>
            <p className="text-gray-700">
              Always check current conditions before floating. Missouri law requires children under 7 to wear life 
              jackets at all times. Glass containers are prohibited on most rivers. Respect private property along 
              riverbanks and practice Leave No Trace principles to preserve these beautiful waterways for future generations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}