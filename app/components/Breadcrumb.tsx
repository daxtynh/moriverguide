import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-4 opacity-90">
      <Link href="/" className="hover:text-white flex items-center">
        <Home className="w-4 h-4 mr-1" />
        Home
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4" />
          {item.href ? (
            <Link href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}