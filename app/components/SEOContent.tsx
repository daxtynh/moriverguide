import Link from 'next/link';

export default function SEOContent() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best river for float trips in Missouri?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Current River is Missouri's most popular float trip destination with 134 miles of crystal-clear water. For beginners, try the Elk River or upper Meramec River. Advanced floaters enjoy the Eleven Point River's remote sections."
        }
      },
      {
        "@type": "Question",
        "name": "How much do Missouri float trips cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "DIY float trips cost $35-50 per person for canoe/kayak rental plus shuttle service. Guided trips range from $75-150 per person. You can float for free with your own equipment at 500+ public access points throughout Missouri."
        }
      },
      {
        "@type": "Question",
        "name": "When is the best time for Missouri river float trips?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "May through September offers the best floating conditions in Missouri. Peak season is July-August with warm water (70-75°F) and predictable levels. Spring (April-May) has higher, faster water while fall offers smaller crowds and beautiful scenery."
        }
      },
      {
        "@type": "Question",
        "name": "What should I bring on a Missouri float trip?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Essential items include: life jackets (required for children under 7), sunscreen, water shoes, dry bag for phones/keys, cooler with ice, trash bags, and plenty of water. Avoid glass containers as they're prohibited on most Missouri rivers."
        }
      }
    ]
  };

  return (
    <>
      {/* SEO-Optimized Content Section */}
      <section className="bg-white py-16">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto">
            {/* Main H2 with primary keyword */}
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              Missouri Float Trips: Your Complete Guide to River Adventures
            </h2>
            
            {/* Content with keyword optimization */}
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                Experience the best <strong>Missouri float trips</strong> on crystal-clear, spring-fed rivers winding through the scenic Ozark Mountains. 
                With over 500 mapped access points and 50+ trusted outfitters, planning your perfect river adventure has never been easier. 
                Whether you&apos;re seeking a peaceful <strong>family float trip</strong> or an exciting multi-day camping adventure, 
                Missouri&apos;s rivers offer unforgettable experiences for every skill level.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">
                Top Missouri Rivers for Float Trips
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    <Link href="/rivers/current-river" className="text-river-600 hover:text-river-700">
                      Current River Float Trips
                    </Link>
                  </h4>
                  <p className="text-gray-700">
                    Missouri&apos;s most popular floating destination with 134 miles of pristine water. 
                    The <strong>Current River</strong> offers everything from gentle family floats near Big Spring to 
                    exciting rapids at Cedar Grove. Average float times range from 2-8 hours with numerous outfitters 
                    providing canoe, kayak, and raft rentals.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    <Link href="/rivers/meramec-river" className="text-river-600 hover:text-river-700">
                      Meramec River Float Trips
                    </Link>
                  </h4>
                  <p className="text-gray-700">
                    Perfect for <strong>float trips near St. Louis</strong>, the Meramec River combines easy access 
                    with beautiful scenery. Popular sections include Meramec State Park to Onondaga Cave, offering 
                    4-6 hour floats through towering bluffs and numerous swimming holes.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    <Link href="/rivers/niangua-river" className="text-river-600 hover:text-river-700">
                      Niangua River Float Trips
                    </Link>
                  </h4>
                  <p className="text-gray-700">
                    Known for excellent water quality and consistent levels, the <strong>Niangua River</strong> near 
                    Bennett Spring offers year-round floating opportunities. The river features gentle rapids, 
                    deep pools, and spectacular Ozark scenery perfect for intermediate paddlers.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-2">
                    <Link href="/rivers/elk-river" className="text-river-600 hover:text-river-700">
                      Elk River Float Trips
                    </Link>
                  </h4>
                  <p className="text-gray-700">
                    Southwest Missouri&apos;s hidden gem, the <strong>Elk River</strong> near Pineville provides 
                    family-friendly floating with shallow, clear water. This beginner-perfect river features 
                    numerous gravel bars for picnicking and some of Missouri&apos;s best river swimming.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-semibold mt-8 mb-4">
                Plan Your DIY Float Trip in Missouri
              </h3>
              
              <p className="text-gray-700 mb-4">
                Planning a <strong>DIY float trip in Missouri</strong> is easy with our comprehensive guides and tools. 
                Start by selecting your river based on difficulty level and location. Most float trips range from 
                2-8 hours covering 4-12 miles. Here&apos;s what you need to know:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>Access Points:</strong> Use our <Link href="/map" className="text-river-600 hover:text-river-700">interactive map</Link> to find 500+ public access points with GPS coordinates</li>
                <li><strong>Shuttle Service:</strong> Most outfitters offer shuttle service for $15-25 per vehicle</li>
                <li><strong>Float Times:</strong> Plan 2-3 miles per hour for casual floating using our <Link href="/trip-planner" className="text-river-600 hover:text-river-700">trip planner</Link></li>
                <li><strong>Water Levels:</strong> Check <Link href="/water-levels" className="text-river-600 hover:text-river-700">current water levels</Link> - optimal range is 2-4 feet for most rivers</li>
                <li><strong>Safety:</strong> Life jackets required for children under 7, recommended for all - see our <Link href="/guides/safety-guide" className="text-river-600 hover:text-river-700">safety guide</Link></li>
              </ul>

              <h3 className="text-2xl font-semibold mt-8 mb-4">
                Missouri Float Trip Season & Weather
              </h3>
              
              <p className="text-gray-700 mb-6">
                The <strong>best time for Missouri float trips</strong> is May through September when water temperatures 
                range from 65-75°F. Spring (April-May) offers higher water levels and fewer crowds, while summer 
                (June-August) provides the warmest conditions perfect for swimming. Fall floating (September-October) 
                features beautiful foliage and peaceful rivers.
              </p>

              <h3 className="text-2xl font-semibold mt-8 mb-4">
                Float Trip Outfitters & Services
              </h3>
              
              <p className="text-gray-700 mb-6">
                Choose from 50+ licensed <Link href="/outfitters" className="text-river-600 hover:text-river-700">Missouri float trip outfitters</Link> offering:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li>Canoe rentals: $40-60 per canoe (seats 2-3 people)</li>
                <li>Kayak rentals: $35-45 per kayak (single or tandem)</li>
                <li>Raft rentals: $50-80 per raft (seats 4-6 people)</li>
                <li>Tube rentals: $15-25 per tube</li>
                <li>Shuttle service: $15-25 per vehicle</li>
                <li>Camping: $10-30 per night at riverside campgrounds</li>
                <li>Cabin rentals: $75-200 per night</li>
              </ul>
            </div>

            {/* FAQ Section */}
            <div className="mt-12 border-t pt-8">
              <h3 className="text-2xl font-semibold mb-6">
                Frequently Asked Questions About Missouri Float Trips
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    What is the best river for float trips in Missouri?
                  </h4>
                  <p className="text-gray-700">
                    The Current River is Missouri&apos;s most popular float trip destination with 134 miles of crystal-clear water. 
                    For beginners, try the Elk River or upper Meramec River. Advanced floaters enjoy the Eleven Point River&apos;s remote sections.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    How much do Missouri float trips cost?
                  </h4>
                  <p className="text-gray-700">
                    DIY float trips cost $35-50 per person for canoe/kayak rental plus shuttle service. 
                    Guided trips range from $75-150 per person. You can float for free with your own equipment 
                    at 500+ public access points throughout Missouri.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    When is the best time for Missouri river float trips?
                  </h4>
                  <p className="text-gray-700">
                    May through September offers the best floating conditions in Missouri. Peak season is July-August 
                    with warm water (70-75°F) and predictable levels. Spring (April-May) has higher, faster water 
                    while fall offers smaller crowds and beautiful scenery.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    What should I bring on a Missouri float trip?
                  </h4>
                  <p className="text-gray-700">
                    Essential items include: life jackets (required for children under 7), sunscreen, water shoes, 
                    dry bag for phones/keys, cooler with ice, trash bags, and plenty of water. Avoid glass containers 
                    as they&apos;re prohibited on most Missouri rivers.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Are Missouri rivers safe for families with children?
                  </h4>
                  <p className="text-gray-700">
                    Yes! Rivers like the Elk River, upper Meramec, and Courtois Creek are perfect for families with 
                    shallow, slow-moving water. Always ensure children wear life jackets and choose calmer sections 
                    during your first trips. Most outfitters offer family-friendly route recommendations.
                  </p>
                </div>
              </div>
            </div>

            {/* Location-Based SEO */}
            <div className="mt-12 border-t pt-8">
              <h3 className="text-2xl font-semibold mb-6">
                Float Trips Near Major Missouri Cities
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Float Trips Near St. Louis
                  </h4>
                  <p className="text-gray-700">
                    The Meramec River (1 hour drive) and Courtois Creek (90 minutes) offer the closest float trip 
                    options to St. Louis. Both rivers feature easy access, multiple outfitters, and scenic Ozark terrain.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Float Trips Near Kansas City
                  </h4>
                  <p className="text-gray-700">
                    The Niangua River near Bennett Spring (2.5 hours) and the Osage River system provide excellent 
                    floating opportunities for Kansas City residents seeking weekend river adventures.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Float Trips Near Springfield
                  </h4>
                  <p className="text-gray-700">
                    Springfield floaters enjoy easy access to the James River, Finley River, and the northern 
                    sections of the North Fork River, all within an hour&apos;s drive.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Float Trips Near Columbia
                  </h4>
                  <p className="text-gray-700">
                    The Gasconade River and Big Piney River offer excellent floating within 90 minutes of Columbia, 
                    featuring limestone bluffs and clear spring-fed water.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}