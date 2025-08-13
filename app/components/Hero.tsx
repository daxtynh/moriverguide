'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, MapPin, Calendar, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [selectedRiver, setSelectedRiver] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (!isMobile) {
      let ticking = false;
      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            setScrollY(window.scrollY);
            ticking = false;
          });
          ticking = true;
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', checkMobile);
      };
    }
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  const handleFindTrips = () => {
    const params = new URLSearchParams();
    if (selectedRiver) params.append('river', selectedRiver);
    if (selectedDate) params.append('date', selectedDate);
    if (selectedGroup) params.append('group', selectedGroup);
    
    router.push(`/outfitters${params.toString() ? '?' + params.toString() : ''}`);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          transform: isMobile ? 'none' : `translate3d(0, ${scrollY * 0.5}px, 0)`,
          willChange: isMobile ? 'auto' : 'transform',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://images.unsplash.com/photo-1529385101576-4e03aae38ffc?auto=format&fit=crop&w=${isMobile ? '800' : '1200'}&q=${isMobile ? '60' : '75'}")`
        }}
      />
      
      {/* Wave Animation Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32">
        <svg className="absolute bottom-0 w-full h-32" preserveAspectRatio="none" viewBox="0 0 1440 100">
          <path 
            fill="rgb(249 250 251)" 
            d="M0,50 C360,10 720,90 1440,50 L1440,100 L0,100 Z"
            className="animate-wave"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
            MoRiverGuide
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-lg">
            Real-Time River Conditions • Trip Planner • Kayaking & Float Guides
          </p>
          
          {/* Quick Search Bar */}
          <div className="bg-white rounded-xl shadow-2xl p-4 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2">
              <div className="flex items-center px-4 py-4 md:py-3 border-0 md:border-r border-gray-200">
                <MapPin className="w-5 h-5 text-river-600 mr-2" aria-hidden="true" />
                <label htmlFor="river-select" className="sr-only">Choose River</label>
                <select 
                  id="river-select"
                  className="w-full outline-none text-gray-700 min-h-[44px] text-base"
                  value={selectedRiver}
                  onChange={(e) => setSelectedRiver(e.target.value)}
                  aria-label="Select a river for your trip"
                >
                  <option value="">Choose River</option>
                  <option value="current-river">Current River</option>
                  <option value="meramec-river">Meramec River</option>
                  <option value="niangua-river">Niangua River</option>
                  <option value="jacks-fork-river">Jacks Fork</option>
                  <option value="eleven-point-river">Eleven Point</option>
                  <option value="elk-river">Elk River</option>
                </select>
              </div>
              
              <div className="flex items-center px-4 py-4 md:py-3 border-0 md:border-r border-gray-200">
                <Calendar className="w-5 h-5 text-river-600 mr-2" aria-hidden="true" />
                <label htmlFor="date-select" className="sr-only">Trip Date</label>
                <input 
                  id="date-select"
                  type="date" 
                  className="w-full outline-none text-gray-700 min-h-[44px] text-base"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  aria-label="Select your trip date"
                />
              </div>
              
              <div className="flex items-center px-4 py-4 md:py-3 border-0 md:border-r border-gray-200">
                <Users className="w-5 h-5 text-river-600 mr-2" aria-hidden="true" />
                <label htmlFor="group-select" className="sr-only">Group Size</label>
                <select 
                  id="group-select"
                  className="w-full outline-none text-gray-700 min-h-[44px] text-base"
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  aria-label="Select your group size"
                >
                  <option value="">Group Size</option>
                  <option value="1-2">1-2 People</option>
                  <option value="3-5">3-5 People</option>
                  <option value="6-10">6-10 People</option>
                  <option value="10+">10+ People</option>
                </select>
              </div>
              
              <button 
                onClick={handleFindTrips} 
                className="btn-primary rounded-lg min-h-[48px] px-6 py-3 text-base font-semibold w-full md:w-auto"
                aria-label="Find float trips based on your criteria"
              >
                Find Trips
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex gap-4 justify-center mt-8">
            <Link href="/map" className="text-white hover:text-river-200 font-medium flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Interactive Map
            </Link>
            <Link href="/rivers" className="text-white hover:text-river-200 font-medium flex items-center">
              View All Rivers
            </Link>
            <Link href="/diy-guide" className="text-white hover:text-river-200 font-medium flex items-center">
              DIY Guide
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
            <div className="text-white">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-sm opacity-90">Access Points</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold">10</div>
              <div className="text-sm opacity-90">Major Rivers</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm opacity-90">Outfitters</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-white" />
      </div>
    </div>
  );
}