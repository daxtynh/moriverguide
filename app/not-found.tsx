import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-river-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-river-600 opacity-20">404</div>
          <h1 className="text-4xl font-bold text-gray-900 -mt-8 mb-4">
            Looks Like You&apos;re Lost Upstream!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The page you&apos;re looking for has floated away. Let&apos;s get you back on course.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <Link href="/" className="btn-primary inline-flex items-center">
            <Home className="w-5 h-5 mr-2" />
            Back to Homepage
          </Link>
        </div>

        <div className="border-t pt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Pages:</h2>
          <div className="grid md:grid-cols-2 gap-4 text-left max-w-md mx-auto">
            <Link href="/rivers" className="flex items-center text-river-600 hover:text-river-700">
              <ChevronRight className="w-4 h-4 mr-1" />
              View All Rivers
            </Link>
            <Link href="/rivers/current-river" className="flex items-center text-river-600 hover:text-river-700">
              <ChevronRight className="w-4 h-4 mr-1" />
              Current River
            </Link>
            <Link href="/rivers/meramec-river" className="flex items-center text-river-600 hover:text-river-700">
              <ChevronRight className="w-4 h-4 mr-1" />
              Meramec River
            </Link>
            <Link href="/rivers/elk-river" className="flex items-center text-river-600 hover:text-river-700">
              <ChevronRight className="w-4 h-4 mr-1" />
              Elk River
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}