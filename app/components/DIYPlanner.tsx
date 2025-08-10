'use client';

import { useState } from 'react';
import { Car, MapPin, Navigation, AlertCircle, Calculator, Download } from 'lucide-react';

export default function DIYPlanner() {
  const [numCars, setNumCars] = useState(2);
  const [groupSize, setGroupSize] = useState(4);
  const [distance, setDistance] = useState(8);
  
  const hoursNeeded = (distance / 2).toFixed(1);
  const canoesNeeded = Math.ceil(groupSize / 2);
  const shuttleCost = numCars === 1 ? 35 : 0;

  return (
    <section className="py-16 bg-white">
      <div className="section-padding">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-forest-100 text-forest-700 rounded-full text-sm font-semibold mb-4">
            NEW: DIY Float Trip Planner
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Plan Your Self-Guided Float Adventure
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Save money and float on your schedule! Our DIY planner helps you coordinate vehicles, 
            find access points, and plan the perfect self-guided trip.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Planning Calculator */}
          <div className="card bg-gradient-to-br from-river-50 to-white">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calculator className="w-6 h-6 mr-2 text-river-600" />
              Trip Calculator
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How many people in your group?
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="20" 
                  value={groupSize}
                  onChange={(e) => setGroupSize(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>1 person</span>
                  <span className="font-bold text-river-600">{groupSize} people</span>
                  <span>20 people</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How many vehicles do you have?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => setNumCars(1)}
                    className={`py-2 px-4 rounded-lg border-2 transition-colors ${
                      numCars === 1 
                        ? 'border-river-600 bg-river-50 text-river-700' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    1 Car
                  </button>
                  <button 
                    onClick={() => setNumCars(2)}
                    className={`py-2 px-4 rounded-lg border-2 transition-colors ${
                      numCars === 2 
                        ? 'border-river-600 bg-river-50 text-river-700' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    2 Cars
                  </button>
                  <button 
                    onClick={() => setNumCars(3)}
                    className={`py-2 px-4 rounded-lg border-2 transition-colors ${
                      numCars === 3 
                        ? 'border-river-600 bg-river-50 text-river-700' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    3+ Cars
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Desired float distance (miles)
                </label>
                <input 
                  type="range" 
                  min="3" 
                  max="20" 
                  value={distance}
                  onChange={(e) => setDistance(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>3 miles</span>
                  <span className="font-bold text-river-600">{distance} miles</span>
                  <span>20 miles</span>
                </div>
              </div>

              {/* Results */}
              <div className="bg-white rounded-lg p-4 border-2 border-river-200">
                <h4 className="font-semibold text-gray-900 mb-3">Your Trip Plan:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Float Time:</span>
                    <span className="font-semibold">{hoursNeeded} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Canoes/Kayaks Needed:</span>
                    <span className="font-semibold">{canoesNeeded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle Strategy:</span>
                    <span className="font-semibold">
                      {numCars === 1 ? 'Need Shuttle Service' : `${numCars}-Car Shuttle`}
                    </span>
                  </div>
                  {shuttleCost > 0 && (
                    <div className="flex justify-between text-river-600">
                      <span>Est. Shuttle Cost:</span>
                      <span className="font-semibold">${shuttleCost}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Logistics Guide */}
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Car className="w-6 h-6 mr-2 text-river-600" />
              Vehicle Logistics Guide
            </h3>

            {numCars === 1 && (
              <div className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Single Vehicle Strategy</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        You&apos;ll need a shuttle service to get back to your car. 
                        Most local outfitters offer shuttle for $35-50.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="bg-river-100 rounded-full p-1 mr-3 mt-1">
                      <span className="block w-6 h-6 text-center text-sm font-bold text-river-700">1</span>
                    </div>
                    <div>
                      <h5 className="font-semibold">Park at Take-Out Point</h5>
                      <p className="text-sm text-gray-600">Leave your vehicle at the end point</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-river-100 rounded-full p-1 mr-3 mt-1">
                      <span className="block w-6 h-6 text-center text-sm font-bold text-river-700">2</span>
                    </div>
                    <div>
                      <h5 className="font-semibold">Catch Shuttle to Put-In</h5>
                      <p className="text-sm text-gray-600">Ride with outfitter to starting point</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-river-100 rounded-full p-1 mr-3 mt-1">
                      <span className="block w-6 h-6 text-center text-sm font-bold text-river-700">3</span>
                    </div>
                    <div>
                      <h5 className="font-semibold">Float to Your Car</h5>
                      <p className="text-sm text-gray-600">End right where you parked!</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {numCars === 2 && (
              <div className="space-y-4">
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                  <div className="flex items-start">
                    <Navigation className="w-5 h-5 text-green-600 mt-0.5 mr-2" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Two Vehicle Strategy</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        Perfect setup! No shuttle needed. Save $35-50 per trip.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="bg-river-100 rounded-full p-1 mr-3 mt-1">
                      <span className="block w-6 h-6 text-center text-sm font-bold text-river-700">1</span>
                    </div>
                    <div>
                      <h5 className="font-semibold">Meet at Take-Out Point</h5>
                      <p className="text-sm text-gray-600">Leave Car #1 at the end point</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-river-100 rounded-full p-1 mr-3 mt-1">
                      <span className="block w-6 h-6 text-center text-sm font-bold text-river-700">2</span>
                    </div>
                    <div>
                      <h5 className="font-semibold">Drive Together to Put-In</h5>
                      <p className="text-sm text-gray-600">Everyone rides in Car #2 to start</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-river-100 rounded-full p-1 mr-3 mt-1">
                      <span className="block w-6 h-6 text-center text-sm font-bold text-river-700">3</span>
                    </div>
                    <div>
                      <h5 className="font-semibold">Float & Retrieve</h5>
                      <p className="text-sm text-gray-600">Float to Car #1, drive back for Car #2</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {numCars >= 3 && (
              <div className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <div className="flex items-start">
                    <Car className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Multi-Vehicle Strategy</h4>
                      <p className="text-sm text-gray-700 mt-1">
                        Great for large groups! Multiple shuttle options available.
                      </p>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">
                  With 3+ vehicles, you can leave cars at both ends and middle access points 
                  for maximum flexibility. Perfect for groups who might want to exit early.
                </p>
              </div>
            )}

            <button className="w-full btn-primary mt-6">
              <Download className="w-4 h-4 mr-2 inline" />
              Download DIY Float Guide PDF
            </button>
          </div>
        </div>

        {/* Access Points Preview */}
        <div className="mt-12 bg-gradient-to-r from-river-600 to-river-700 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <MapPin className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">
              500+ Mapped Access Points
            </h3>
            <p className="text-lg mb-6 opacity-90">
              We&apos;ve mapped every public access point in Missouri with GPS coordinates, 
              parking info, and real-time conditions. Never guess where to put in or take out again!
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/access-points" className="btn-secondary bg-white">
                View Access Map
              </a>
              <button className="btn-secondary border-white text-white hover:bg-white/10">
                Download GPS Points
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}