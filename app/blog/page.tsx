import { Metadata } from 'next';
import { Calendar, Clock, ChevronRight, TrendingUp, Droplets, MapPin } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Missouri River Blog - News, Conditions & Float Trip Tips | MoRiverGuide',
  description: 'Latest Missouri river conditions, float trip reports, seasonal updates, and expert tips for kayaking and canoeing Missouri streams.',
  keywords: 'missouri river blog, float trip reports, river conditions update, missouri kayaking news',
};

// This would typically come from a CMS or database
const blogPosts = [
  {
    slug: 'spring-2025-river-conditions',
    title: 'Spring 2025 River Conditions: What to Expect',
    excerpt: 'Early spring rains have Missouri rivers running at optimal levels. Here\'s what floaters can expect this season.',
    category: 'Conditions',
    categoryColor: 'bg-blue-500',
    author: 'MoRiverGuide Team',
    date: '2025-03-15',
    readTime: '5 min read',
    image: '/images/blog/spring-conditions.jpg',
    featured: true,
  },
  {
    slug: 'new-cowskin-access-improvements',
    title: 'Cowskin Access Gets Major Improvements',
    excerpt: 'MDC completes upgrades at popular Elk River access point, including new boat ramp and expanded parking.',
    category: 'News',
    categoryColor: 'bg-green-500',
    author: 'MoRiverGuide Team',
    date: '2025-03-10',
    readTime: '3 min read',
    image: '/images/blog/cowskin-access.jpg',
  },
  {
    slug: 'best-rivers-for-beginners',
    title: 'Top 5 Missouri Rivers for First-Time Floaters',
    excerpt: 'New to floating? These gentle Missouri streams offer the perfect introduction to river adventures.',
    category: 'Guides',
    categoryColor: 'bg-purple-500',
    author: 'MoRiverGuide Team',
    date: '2025-03-08',
    readTime: '7 min read',
    image: '/images/blog/beginner-rivers.jpg',
  },
  {
    slug: 'current-river-water-levels-march',
    title: 'Current River Running at Perfect Levels',
    excerpt: 'March rains have the Current River at optimal floating conditions. All sections are clear and running well.',
    category: 'Conditions',
    categoryColor: 'bg-blue-500',
    author: 'MoRiverGuide Team',
    date: '2025-03-05',
    readTime: '4 min read',
    image: '/images/blog/current-river.jpg',
  },
  {
    slug: 'early-season-smallmouth-fishing',
    title: 'Early Season Smallmouth Bass on Float Streams',
    excerpt: 'Combine your float trip with some excellent early season smallmouth fishing. Best rivers and techniques.',
    category: 'Fishing',
    categoryColor: 'bg-orange-500',
    author: 'MoRiverGuide Team',
    date: '2025-03-01',
    readTime: '6 min read',
    image: '/images/blog/smallmouth-fishing.jpg',
  },
];

const categories = [
  { name: 'All Posts', count: 24, slug: 'all' },
  { name: 'Conditions', count: 8, slug: 'conditions' },
  { name: 'Guides', count: 6, slug: 'guides' },
  { name: 'News', count: 5, slug: 'news' },
  { name: 'Fishing', count: 3, slug: 'fishing' },
  { name: 'Safety', count: 2, slug: 'safety' },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-r from-river-600 to-river-700 text-white py-16">
        <div className="section-padding">
          <div className="flex items-center mb-4">
            <TrendingUp className="w-8 h-8 mr-3" />
            <span className="text-sm uppercase tracking-wider opacity-75">River Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Missouri River News & Updates
          </h1>
          <p className="text-xl opacity-95 max-w-3xl">
            Latest river conditions, float reports, seasonal updates, and expert tips 
            for Missouri river adventures.
          </p>
        </div>
      </div>

      <div className="section-padding py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            {blogPosts.filter(p => p.featured).map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block card mb-8 overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="md:flex">
                  <div className="md:w-2/5 h-64 md:h-auto bg-gray-200 relative">
                    {/* Placeholder for image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-river-400 to-river-600 flex items-center justify-center">
                      <Droplets className="w-20 h-20 text-white/30" />
                    </div>
                  </div>
                  <div className="md:w-3/5 p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className={`${post.categoryColor} text-white text-xs px-2 py-1 rounded font-medium`}>
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">Featured</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-river-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                      <span className="mx-3">•</span>
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* Regular Posts */}
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts.filter(p => !p.featured).map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="card hover:shadow-lg transition-shadow group"
                >
                  <div className="h-48 bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-river-400 to-river-600 flex items-center justify-center">
                      <MapPin className="w-16 h-16 text-white/30" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className={`${post.categoryColor} text-white text-xs px-2 py-1 rounded font-medium`}>
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-river-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex gap-2">
                <button className="px-4 py-2 bg-river-600 text-white rounded-lg">1</button>
                <button className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">2</button>
                <button className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">3</button>
                <button className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50">
                  Next <ChevronRight className="w-4 h-4 inline" />
                </button>
              </nav>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Categories */}
            <div className="card mb-6">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <Link
                    key={cat.slug}
                    href={`/blog/category/${cat.slug}`}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors"
                  >
                    <span className="text-gray-700">{cat.name}</span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {cat.count}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="card bg-gradient-to-br from-river-50 to-blue-50 mb-6">
              <h3 className="font-bold text-lg mb-2">River Conditions Newsletter</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get weekly updates on Missouri river conditions and float recommendations.
              </p>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-3 py-2 border rounded-lg mb-3"
              />
              <button className="w-full btn-primary">
                Subscribe
              </button>
            </div>

            {/* Popular Rivers */}
            <div className="card">
              <h3 className="font-bold text-lg mb-4">Check Current Conditions</h3>
              <div className="space-y-3">
                <Link href="/water-levels/current-river" className="flex items-center justify-between hover:text-river-600">
                  <span>Current River</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link href="/water-levels/meramec-river" className="flex items-center justify-between hover:text-river-600">
                  <span>Meramec River</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link href="/water-levels/jacks-fork-river" className="flex items-center justify-between hover:text-river-600">
                  <span>Jacks Fork River</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <Link href="/water-levels/elk-river" className="flex items-center justify-between hover:text-river-600">
                  <span>Elk River</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}