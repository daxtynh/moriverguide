'use client';

import { Users, MapPin, Star, Calendar } from 'lucide-react';

export default function QuickStats() {
  const stats = [
    {
      icon: Users,
      number: '10,000+',
      label: 'Happy Floaters',
      subtext: 'Plan trips monthly'
    },
    {
      icon: MapPin,
      number: '500+',
      label: 'Access Points',
      subtext: 'GPS mapped'
    },
    {
      icon: Star,
      number: '4.8/5',
      label: 'User Rating',
      subtext: 'From 2,400+ reviews'
    },
    {
      icon: Calendar,
      number: '24/7',
      label: 'Live Updates',
      subtext: 'Real-time conditions'
    }
  ];

  return (
    <section className="py-12 bg-river-600">
      <div className="section-padding">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group">
                <div className="flex justify-center mb-3">
                  <Icon className="w-8 h-8 text-river-200 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-1">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-river-100 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-river-200 opacity-90">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-river-100 text-lg">
            Missouri&apos;s most trusted river guide since 2023
          </p>
        </div>
      </div>
    </section>
  );
}