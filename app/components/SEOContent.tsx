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
      },
      {
        "@type": "Question",
        "name": "Where can I find Niangua River access points?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Niangua River access points include Bennett Spring State Park (most popular), Moon Valley Access, Tunnel Dam Access, Ha Ha Tonka State Park, and Barclay Public Access. All are free to use with GPS coordinates available on our interactive map."
        }
      },
      {
        "@type": "Question", 
        "name": "Do I need a boat ramp or can I use any access point?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most Missouri river access points accommodate canoes and kayaks without formal boat ramps. Concrete ramps are available at major access points like Meramec State Park and Big Spring. Smaller access points typically have gravel bars or gentle bank access suitable for hand-launching."
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
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Where can I find Niangua River access points?
                  </h4>
                  <p className="text-gray-700">
                    <strong>Niangua River access points</strong> include Bennett Spring State Park (most popular), 
                    Moon Valley Access, Tunnel Dam Access, Ha Ha Tonka State Park, and Barclay Public Access. 
                    All are free to use with GPS coordinates available on our interactive map.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">
                    Do I need a boat ramp or can I use any access point?
                  </h4>
                  <p className="text-gray-700">
                    Most Missouri river access points accommodate canoes and kayaks without formal boat ramps. 
                    Concrete ramps are available at major access points like Meramec State Park and Big Spring. 
                    Smaller access points typically have gravel bars or gentle bank access suitable for hand-launching.
                  </p>
                </div>
              </div>
            </div>

            {/* Access Points SEO Section */}
            <div className="mt-12 border-t pt-8">
              <h3 className="text-2xl font-semibold mb-6">
                Missouri River Access Points: Complete Guide to Put-ins and Take-outs
              </h3>
              
              <p className="text-gray-700 mb-6">
                Planning your float trip starts with finding the right <strong>Missouri river access points</strong>. 
                Our comprehensive database includes 500+ public access points with GPS coordinates, amenities, 
                and detailed directions for every major river in Missouri. All access points are free to use 
                and maintained by the Missouri Department of Conservation, state parks, or local authorities.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-xl font-semibold mb-3">
                    <Link href="/rivers/current-river" className="text-river-600 hover:text-river-700">
                      Current River Access Points
                    </Link>
                  </h4>
                  <p className="text-gray-700 mb-3">
                    The <strong>Current River access points</strong> include 9 major put-ins and take-outs spanning 184 miles. 
                    Popular access points include Big Spring (with visitor center), Round Spring (cave tours), 
                    and Akers Ferry (full-service campground). Baptist Camp Access offers the most remote entry point.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Baptist Camp Access - Remote upper river</li>
                    <li>• Akers Ferry - Full amenities, camping</li>
                    <li>• Round Spring - Cave tours, visitor center</li>
                    <li>• Big Spring - 286 million gallons/day spring</li>
                    <li>• Van Buren Landing - Easy highway access</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-3">
                    <Link href="/rivers/meramec-river" className="text-river-600 hover:text-river-700">
                      Meramec River Access Points
                    </Link>
                  </h4>
                  <p className="text-gray-700 mb-3">
                    <strong>Meramec River access points</strong> provide easy access within 1 hour of St. Louis. 
                    Key access points include Meramec State Park (cave tours), Campbell Bridge Access, 
                    and Sappington Bridge Access. All feature concrete boat ramps and ample parking.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Meramec State Park - Camping, cave tours</li>
                    <li>• Campbell Bridge - Concrete ramp, parking</li>
                    <li>• Sappington Bridge - Easy highway access</li>
                    <li>• Sullivan area - Multiple outfitter access</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-3">
                    <Link href="/rivers/niangua-river" className="text-river-600 hover:text-river-700">
                      Niangua River Access Points
                    </Link>
                  </h4>
                  <p className="text-gray-700 mb-3">
                    <strong>Niangua River access points</strong> span 60 miles from Bennett Spring to the Lake of the Ozarks. 
                    Bennett Spring State Park offers the most popular access with trout fishing, while Ha Ha Tonka State Park 
                    provides access to the lower river near the lake.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Bennett Spring State Park - Trout fishing, facilities</li>
                    <li>• Moon Valley Access - Primitive camping</li>
                    <li>• Tunnel Dam Access - Historic dam site</li>
                    <li>• Ha Ha Tonka State Park - Lake access, trails</li>
                    <li>• Barclay Public Access - Highway 64 access</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-3">
                    <Link href="/rivers/elk-river" className="text-river-600 hover:text-river-700">
                      Elk River Access Points
                    </Link>
                  </h4>
                  <p className="text-gray-700 mb-3">
                    <strong>Elk River access points</strong> in Southwest Missouri offer family-friendly floating access. 
                    Pineville Access and Noel Bridge Access are the most popular, with Mt Shira Access providing 
                    MDC-managed facilities and Cowskin Access offering remote entry.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Pineville Access - Popular put-in near town</li>
                    <li>• Mt Shira Access - MDC managed, full facilities</li>
                    <li>• Noel Bridge Access - Highway 59 bridge</li>
                    <li>• Cowskin Access - Remote, near Tiff City</li>
                    <li>• Ginger Blue Access - Outfitter access</li>
                  </ul>
                </div>
              </div>

              <h4 className="text-xl font-semibold mb-4">
                Using Missouri River Access Points: What You Need to Know
              </h4>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                <li><strong>All access points are free</strong> - No fees for launching at public access points</li>
                <li><strong>GPS coordinates provided</strong> - Use our <Link href="/map" className="text-river-600 hover:text-river-700">interactive map</Link> for exact locations</li>
                <li><strong>Parking available</strong> - Most access points have designated parking areas</li>
                <li><strong>No overnight parking</strong> - Arrange shuttle service or pickup transportation</li>
                <li><strong>Restroom facilities</strong> - Major access points include restrooms and picnic areas</li>
                <li><strong>Boat ramps vary</strong> - Some have concrete ramps, others are gravel or dirt access</li>
                <li><strong>Seasonal conditions</strong> - Spring flooding may temporarily close some access points</li>
              </ul>

              <p className="text-gray-700">
                For complete details on all <strong>Missouri river access points</strong> including GPS coordinates, 
                amenities, and current conditions, use our <Link href="/map" className="text-river-600 hover:text-river-700">interactive map</Link> or 
                browse individual river pages. All access point information is regularly updated based on MDC and 
                state park data to ensure accuracy for your float trip planning.
              </p>
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