'use client';

import { Droplets, Map, Shield, DollarSign, Calendar, Smartphone } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Droplets,
      title: 'Live Water Levels',
      description: 'Real-time USGS water data shows current conditions for safe floating',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Map,
      title: '500+ Access Points',
      description: 'Every public put-in and take-out mapped with GPS coordinates',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Current conditions, weather alerts, and safety guidelines for every river',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: DollarSign,
      title: 'Save Money',
      description: 'DIY guides help you float without expensive outfitter fees',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: Calendar,
      title: 'Crowd Predictions',
      description: 'Know the best times to avoid crowds on popular rivers',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Works perfectly on your phone - even with spotty river service',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="section-padding">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose MoRiverGuide?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;re the only site combining real-time data, DIY planning tools, 
            and comprehensive guides for every Missouri river.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center group">
                <div className={`${feature.bgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trust Signals */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-river-600">10+</div>
              <div className="text-gray-600">Rivers Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-river-600">500+</div>
              <div className="text-gray-600">Access Points</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-river-600">50+</div>
              <div className="text-gray-600">Outfitters Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-river-600">24/7</div>
              <div className="text-gray-600">Live Updates</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Float?
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Start planning your perfect Missouri river adventure today!
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/map" className="btn-primary">
              View Interactive Map
            </a>
            <a href="/diy-guide" className="btn-secondary">
              Plan DIY Trip
            </a>
            <a href="/outfitters" className="btn-secondary">
              Find Guided Tours
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}