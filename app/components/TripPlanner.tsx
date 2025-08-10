'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  MapPin, Users, Calendar, Navigation, Info, 
  ChevronRight, Share2, Printer, AlertCircle,
  DollarSign, ChevronDown
} from 'lucide-react';
import riversData from '../data/rivers.json';
import outfittersData from '../data/outfitters.json';
import WaterLevelBadge from './WaterLevelBadge';

interface River {
  id: string;
  name: string;
  slug: string;
  description: string;
  difficulty: string;
  length: string;
  popularSections: Array<{
    name: string;
    distance: string;
    time: string;
    difficulty: string;
    putIn?: string;
    takeOut?: string;
  }>;
  accessPoints: Array<{
    name: string;
    lat: number;
    lng: number;
    amenities: string[];
    address: string;
    notes?: string;
  }>;
}

interface AccessPoint {
  name: string;
  lat: number;
  lng: number;
  amenities: string[];
  address: string;
  notes?: string;
}

// interface TripDetails {
//   river: River | null;
//   putIn: AccessPoint | null;
//   takeOut: AccessPoint | null;
//   distance: number;
//   estimatedTime: string;
//   difficulty: string;
//   groupSize: number;
//   experience: string;
//   equipment: string[];
// }

// Helper function to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Radius of Earth in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c * 1.3; // Multiply by 1.3 for river miles (not straight line)
}

// Helper to estimate float time
function estimateFloatTime(distance: number, speed: number = 2.5): string {
  const hours = distance / speed;
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  
  if (wholeHours === 0) {
    return `${minutes} minutes`;
  } else if (minutes === 0) {
    return `${wholeHours} hour${wholeHours > 1 ? 's' : ''}`;
  } else {
    return `${wholeHours} hour${wholeHours > 1 ? 's' : ''} ${minutes} min`;
  }
}

export default function TripPlanner() {
  const [selectedRiver, setSelectedRiver] = useState<River | null>(null);
  const [putInPoint, setPutInPoint] = useState<AccessPoint | null>(null);
  const [takeOutPoint, setTakeOutPoint] = useState<AccessPoint | null>(null);
  const [groupSize, setGroupSize] = useState(4);
  const [experience, setExperience] = useState('beginner');
  const [selectedDate, setSelectedDate] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [riverSectionOpen, setRiverSectionOpen] = useState(true);
  const [putInSectionOpen, setPutInSectionOpen] = useState(true);
  const [takeOutSectionOpen, setTakeOutSectionOpen] = useState(true);

  // Calculate downstream access points based on river flow direction
  const downstreamPoints = useMemo(() => {
    if (!selectedRiver || !putInPoint) return [];
    
    // Define which rivers need special handling (don't follow array order)
    // Most rivers' access points are ordered upstream to downstream in the data
    const specialFlowRivers: Record<string, (point: AccessPoint, putIn: AccessPoint) => boolean> = {
      // Elk River flows west/southwest - downstream has lower longitude
      'elk-river': (point, putIn) => point.lng < putIn.lng,
      
      // Meramec flows northeast - complex path, but generally higher lat and lng
      'meramec-river': (point, putIn) => {
        // Use array order for Meramec as it's complex
        const putInIdx = selectedRiver!.accessPoints.findIndex(p => p.name === putIn.name);
        const pointIdx = selectedRiver!.accessPoints.findIndex(p => p.name === point.name);
        return pointIdx > putInIdx;
      },
      
      // Niangua flows north then northeast
      'niangua-river': (point, putIn) => {
        const putInIdx = selectedRiver!.accessPoints.findIndex(p => p.name === putIn.name);
        const pointIdx = selectedRiver!.accessPoints.findIndex(p => p.name === point.name);
        return pointIdx > putInIdx;
      },
      
      // James River flows southwest  
      'james-river': (point, putIn) => point.lat < putIn.lat && point.lng < putIn.lng
    };
    
    // Check if this river needs special handling
    if (specialFlowRivers[selectedRiver.id]) {
      const isDownstream = specialFlowRivers[selectedRiver.id];
      return selectedRiver.accessPoints.filter(
        point => point.name !== putInPoint.name && isDownstream(point, putInPoint)
      );
    }
    
    // Default: Most rivers' access points are ordered upstream to downstream
    // So we can use array position (points after putIn are downstream)
    const putInIndex = selectedRiver.accessPoints.findIndex(
      point => point.name === putInPoint.name
    );
    
    // Don't allow put-in at the last point (no downstream options)
    if (putInIndex === selectedRiver.accessPoints.length - 1) {
      return [];
    }
    
    return selectedRiver.accessPoints.slice(putInIndex + 1);
  }, [selectedRiver, putInPoint]);

  // Calculate trip details
  const tripDetails = useMemo(() => {
    if (!putInPoint || !takeOutPoint) return null;

    const distance = calculateDistance(
      putInPoint.lat, putInPoint.lng,
      takeOutPoint.lat, takeOutPoint.lng
    );

    // Find if this matches a popular section
    const popularSection = selectedRiver?.popularSections.find(section => 
      (section.putIn === putInPoint.name || section.putIn?.includes(putInPoint.name)) &&
      (section.takeOut === takeOutPoint.name || section.takeOut?.includes(takeOutPoint.name))
    );

    const difficulty = popularSection?.difficulty || selectedRiver?.difficulty || 'Beginner';
    const estimatedTime = popularSection?.time || estimateFloatTime(distance);

    return {
      distance: popularSection ? parseFloat(popularSection.distance) : distance,
      estimatedTime,
      difficulty,
      popularSection
    };
  }, [putInPoint, takeOutPoint, selectedRiver]);

  // Find relevant outfitters
  const relevantOutfitters = useMemo(() => {
    if (!selectedRiver) return [];
    
    return outfittersData.outfitters.filter(outfitter => 
      outfitter.rivers.includes(selectedRiver.id)
    ).slice(0, 5); // Show top 5
  }, [selectedRiver]);

  // Equipment recommendations based on selections
  const recommendedEquipment = useMemo(() => {
    const equipment = [
      'Life jackets (required for children)',
      'Sunscreen and hat',
      'Water (1 gallon per person)',
      'Waterproof bags for valuables',
      'First aid kit',
      'Trash bags (Leave No Trace)'
    ];

    if (groupSize > 6) {
      equipment.push('Extra rope for tying boats together');
    }

    if (experience === 'beginner') {
      equipment.push('Map of the river', 'Whistle for emergencies');
    }

    if (tripDetails && tripDetails.distance > 10) {
      equipment.push('Lunch and snacks', 'Extra paddle');
    }

    return equipment;
  }, [groupSize, experience, tripDetails]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Float Trip Plan - ${selectedRiver?.name}`,
        text: `Planning a float trip from ${putInPoint?.name} to ${takeOutPoint?.name}`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-river-600 to-river-700 text-white py-12">
        <div className="section-padding">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Plan Your Float Trip
          </h1>
          <p className="text-xl opacity-95 max-w-3xl">
            Choose your river, select access points, and we&apos;ll help you plan the perfect Missouri float trip adventure.
          </p>
        </div>
      </div>

      <div className="section-padding py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Planning Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Choose River */}
            <div className="card">
              <div 
                className="flex items-center mb-4 cursor-pointer"
                onClick={() => setRiverSectionOpen(!riverSectionOpen)}
              >
                <div className="w-8 h-8 bg-river-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  1
                </div>
                <h2 className="text-xl font-semibold flex-1">
                  Choose Your River
                  {selectedRiver && (
                    <span className="text-sm font-normal text-river-600 ml-2">
                      - {selectedRiver.name}
                    </span>
                  )}
                </h2>
                <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform ${
                  riverSectionOpen ? 'rotate-0' : '-rotate-90'
                }`} />
              </div>
              
              {riverSectionOpen && (
                <div className="grid md:grid-cols-2 gap-4">
                {riversData.rivers.map(river => (
                  <button
                    key={river.id}
                    onClick={() => {
                      setSelectedRiver(river as River);
                      setPutInPoint(null);
                      setTakeOutPoint(null);
                      setRiverSectionOpen(false);
                      setPutInSectionOpen(true);
                    }}
                    className={`p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors ${
                      selectedRiver?.id === river.id 
                        ? 'border-river-600 bg-river-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{river.name}</h3>
                      <WaterLevelBadge riverId={river.id} />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{river.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{river.length}</span>
                      <span>{river.difficulty}</span>
                    </div>
                  </button>
                ))}
                </div>
              )}
            </div>

            {/* Step 2: Choose Put-In Point */}
            {selectedRiver && (
              <div className="card">
                <div 
                  className="flex items-center mb-4 cursor-pointer"
                  onClick={() => setPutInSectionOpen(!putInSectionOpen)}
                >
                  <div className="w-8 h-8 bg-river-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    2
                  </div>
                  <h2 className="text-xl font-semibold flex-1">
                    Select Put-In Point
                    {putInPoint && (
                      <span className="text-sm font-normal text-river-600 ml-2">
                        - {putInPoint.name}
                      </span>
                    )}
                  </h2>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform ${
                    putInSectionOpen ? 'rotate-0' : '-rotate-90'
                  }`} />
                </div>
                
                {putInSectionOpen && (
                  <div className="space-y-3">
                  {selectedRiver.accessPoints.map((point, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setPutInPoint(point);
                        setTakeOutPoint(null);
                        setPutInSectionOpen(false);
                        setTakeOutSectionOpen(true);
                      }}
                      disabled={index === selectedRiver.accessPoints.length - 1} // Can't put in at last point
                      className={`w-full p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        putInPoint?.name === point.name 
                          ? 'border-river-600 bg-river-50' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{point.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{point.address}</p>
                          {point.amenities.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {point.amenities.slice(0, 3).map((amenity, i) => (
                                <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                  {amenity}
                                </span>
                              ))}
                            </div>
                          )}
                          {point.notes && (
                            <p className="text-xs text-amber-600 mt-2 flex items-center">
                              <Info className="w-3 h-3 mr-1" />
                              {point.notes}
                            </p>
                          )}
                        </div>
                        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 ml-3" />
                      </div>
                    </button>
                  ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Choose Take-Out Point */}
            {putInPoint && (
              <div className="card">
                <div 
                  className="flex items-center mb-4 cursor-pointer"
                  onClick={() => setTakeOutSectionOpen(!takeOutSectionOpen)}
                >
                  <div className="w-8 h-8 bg-river-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    3
                  </div>
                  <h2 className="text-xl font-semibold flex-1">
                    Select Take-Out Point
                    {takeOutPoint && (
                      <span className="text-sm font-normal text-river-600 ml-2">
                        - {takeOutPoint.name}
                      </span>
                    )}
                  </h2>
                  <span className="text-sm text-gray-500 mr-2">
                    {downstreamPoints.length} options
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transform transition-transform ${
                    takeOutSectionOpen ? 'rotate-0' : '-rotate-90'
                  }`} />
                </div>
                
                {takeOutSectionOpen && downstreamPoints.length > 0 ? (
                  <div className="space-y-3">
                    {downstreamPoints.map((point, index) => {
                      const distance = calculateDistance(
                        putInPoint.lat, putInPoint.lng,
                        point.lat, point.lng
                      );
                      const time = estimateFloatTime(distance);
                      
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            setTakeOutPoint(point);
                            setTakeOutSectionOpen(false);
                          }}
                          className={`w-full p-4 border rounded-lg text-left hover:bg-gray-50 transition-colors ${
                            takeOutPoint?.name === point.name 
                              ? 'border-river-600 bg-river-50' 
                              : 'border-gray-200'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900">{point.name}</h3>
                              <p className="text-sm text-gray-600 mt-1">{point.address}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm">
                                <span className="text-river-600 font-medium">
                                  ~{distance.toFixed(1)} miles
                                </span>
                                <span className="text-gray-500">
                                  ~{time}
                                </span>
                              </div>
                              {point.amenities.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {point.amenities.slice(0, 3).map((amenity, i) => (
                                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                      {amenity}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <Navigation className="w-5 h-5 text-gray-400 flex-shrink-0 ml-3" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : takeOutSectionOpen ? (
                  <div className="text-center py-8 text-gray-500">
                    <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No downstream access points available from this put-in.</p>
                    <p className="text-sm mt-2">Please select a different put-in point.</p>
                  </div>
                ) : null}
              </div>
            )}

            {/* Step 4: Trip Details */}
            {takeOutPoint && (
              <div className="card">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-river-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                    4
                  </div>
                  <h2 className="text-xl font-semibold">Trip Details</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Group Size
                    </label>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={groupSize}
                        onChange={(e) => setGroupSize(parseInt(e.target.value) || 1)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-river-500 focus:border-river-500"
                      />
                      <span className="text-sm text-gray-500">people</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-river-500 focus:border-river-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="experienced">Experienced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Planned Date
                    </label>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-river-500 focus:border-river-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Equipment Needed
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-river-500 focus:border-river-500">
                      <option>Renting Everything</option>
                      <option>Have Own Canoe/Kayak</option>
                      <option>Have All Equipment</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => setShowSummary(true)}
                  className="w-full btn-primary mt-6"
                >
                  Generate Trip Plan
                  <ChevronRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar - Trip Summary */}
          <div className="space-y-6">
            {/* Current Selections */}
            <div className="card bg-gradient-to-br from-river-50 to-white sticky top-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Navigation className="w-5 h-5 mr-2 text-river-600" />
                Trip Summary
              </h3>
              
              {selectedRiver ? (
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-500">River:</span>
                    <p className="font-semibold">{selectedRiver.name}</p>
                  </div>
                  
                  {putInPoint && (
                    <div>
                      <span className="text-gray-500">Put-In:</span>
                      <p className="font-semibold">{putInPoint.name}</p>
                    </div>
                  )}
                  
                  {takeOutPoint && (
                    <div>
                      <span className="text-gray-500">Take-Out:</span>
                      <p className="font-semibold">{takeOutPoint.name}</p>
                    </div>
                  )}
                  
                  {tripDetails && (
                    <>
                      <div className="pt-3 border-t">
                        <span className="text-gray-500">Distance:</span>
                        <p className="font-semibold">{tripDetails.distance.toFixed(1)} miles</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Estimated Time:</span>
                        <p className="font-semibold">{tripDetails.estimatedTime}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Difficulty:</span>
                        <p className="font-semibold">{tripDetails.difficulty}</p>
                      </div>
                    </>
                  )}
                  
                  {groupSize > 0 && (
                    <div className="pt-3 border-t">
                      <span className="text-gray-500">Group Size:</span>
                      <p className="font-semibold">{groupSize} people</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">
                  Select a river to begin planning your trip
                </p>
              )}

              {tripDetails && (
                <div className="mt-6 space-y-2">
                  <button
                    onClick={handlePrint}
                    className="w-full btn-secondary text-sm"
                  >
                    <Printer className="w-4 h-4 mr-2" />
                    Print Plan
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-full btn-secondary text-sm"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Plan
                  </button>
                </div>
              )}
            </div>

            {/* Relevant Outfitters */}
            {selectedRiver && relevantOutfitters.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">
                  Recommended Outfitters
                </h3>
                <div className="space-y-3">
                  {relevantOutfitters.map(outfitter => (
                    <div key={outfitter.id} className="border-b pb-3 last:border-0">
                      <h4 className="font-medium text-gray-900">{outfitter.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{outfitter.description}</p>
                      <div className="flex items-center gap-3 mt-2 text-sm">
                        <a href={`tel:${outfitter.phone}`} className="text-river-600 hover:text-river-700">
                          {outfitter.phone}
                        </a>
                        <span className="text-gray-400">•</span>
                        <div className="flex">
                          {Array.from({ length: outfitter.priceRange.length }).map((_, i) => (
                            <DollarSign key={i} className="w-3 h-3 text-green-600" />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link 
                  href={`/outfitters?river=${selectedRiver.id}`}
                  className="block text-center text-sm text-river-600 hover:text-river-700 font-medium mt-4"
                >
                  View All Outfitters →
                </Link>
              </div>
            )}

            {/* Equipment Checklist */}
            {tripDetails && (
              <div className="card">
                <h3 className="text-lg font-semibold mb-4">
                  Equipment Checklist
                </h3>
                <div className="space-y-2">
                  {recommendedEquipment.map((item, index) => (
                    <label key={index} className="flex items-start">
                      <input
                        type="checkbox"
                        className="mt-1 mr-3 rounded border-gray-300 text-river-600 focus:ring-river-500"
                      />
                      <span className="text-sm text-gray-700">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Trip Summary Modal/Section */}
      {showSummary && tripDetails && putInPoint && takeOutPoint && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold">Your Float Trip Plan</h2>
              <p className="text-gray-600 mt-1">
                {selectedRiver?.name} • {selectedDate || 'Date TBD'}
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Route Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Route Information</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Put-In:</dt>
                      <dd className="font-medium">{putInPoint?.name}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Take-Out:</dt>
                      <dd className="font-medium">{takeOutPoint?.name}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Distance:</dt>
                      <dd className="font-medium">{tripDetails.distance.toFixed(1)} miles</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Float Time:</dt>
                      <dd className="font-medium">{tripDetails.estimatedTime}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Difficulty:</dt>
                      <dd className="font-medium">{tripDetails.difficulty}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Group Details</h3>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Group Size:</dt>
                      <dd className="font-medium">{groupSize} people</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Experience:</dt>
                      <dd className="font-medium capitalize">{experience}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Boats Needed:</dt>
                      <dd className="font-medium">{Math.ceil(groupSize / 2)} canoes/kayaks</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Directions */}
              <div>
                <h3 className="font-semibold mb-3">Directions</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Put-In Location:</p>
                    <p className="text-sm text-gray-600">{putInPoint?.address}</p>
                    <a 
                      href={`https://maps.google.com/?q=${putInPoint?.lat},${putInPoint?.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-river-600 hover:text-river-700"
                    >
                      Get Directions →
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Take-Out Location:</p>
                    <p className="text-sm text-gray-600">{takeOutPoint?.address}</p>
                    <a 
                      href={`https://maps.google.com/?q=${takeOutPoint?.lat},${takeOutPoint?.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-river-600 hover:text-river-700"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
              </div>

              {/* Equipment Checklist */}
              <div>
                <h3 className="font-semibold mb-3">Equipment Checklist</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {recommendedEquipment.map((item, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded mr-2" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Notes */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-semibold text-amber-900 mb-2 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Safety Reminders
                </h3>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Check weather forecast before departing</li>
                  <li>• Children under 7 must wear life jackets at all times (Missouri law)</li>
                  <li>• Tell someone your float plan and expected return time</li>
                  <li>• No glass containers on Missouri rivers</li>
                  <li>• Leave No Trace - pack out all trash</li>
                </ul>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-between">
              <button
                onClick={() => setShowSummary(false)}
                className="btn-secondary"
              >
                Close
              </button>
              <div className="flex gap-3">
                <button onClick={handlePrint} className="btn-secondary">
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </button>
                <button onClick={handleShare} className="btn-primary">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}