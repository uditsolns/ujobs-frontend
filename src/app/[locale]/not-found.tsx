import Link from 'next/link';
import { Search, Home } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-2">
          <Search className="h-10 w-10 text-brand-600" />
        </div>
        
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Page Not Found</h2>
          <p className="text-gray-600">
            We couldn't find the page you're looking for. It might have been moved or no longer exists.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full flex items-center justify-center">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/jobs" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full flex items-center justify-center">
              <Search className="mr-2 h-4 w-4" />
              Browse Jobs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
