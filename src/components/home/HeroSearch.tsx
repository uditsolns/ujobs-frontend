'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { ROUTES } from '@/lib/constants/routes';

interface HeroSearchProps {
  locale: string;
}

export default function HeroSearch({ locale }: HeroSearchProps) {
  const router = useRouter();
  const [jobQuery, setJobQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Build search URL with query params
    const params = new URLSearchParams();
    if (jobQuery) params.set('q', jobQuery);
    if (locationQuery) params.set('location', locationQuery);
    
    const searchUrl = `/${locale}${ROUTES.jobs.list}${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(searchUrl);
  };

  return (
    <Card padding="sm" className="bg-white/95 backdrop-blur-sm shadow-2xl">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus-within:bg-white focus-within:border-brand-500 transition-colors">
          <Icon name="search" size="md" className="text-brand-600 mr-3 flex-shrink-0" />
          <input
            type="text"
            value={jobQuery}
            onChange={(e) => setJobQuery(e.target.value)}
            placeholder="Find Nurse, Patient Caretaker, Medical Attendant, or Driver..."
            className="w-full border-0 bg-transparent focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500"
          />
        </div>
        <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus-within:bg-white focus-within:border-brand-500 transition-colors">
          <Icon name="mapPin" size="md" className="text-brand-600 mr-3 flex-shrink-0" />
          <input
            type="text"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            placeholder="City or Location"
            className="w-full border-0 bg-transparent focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500"
          />
        </div>
        <Button type="submit" size="lg" className="w-full md:w-auto whitespace-nowrap px-8">
          <Icon name="search" size="md" className="mr-2" />
          Search Jobs
        </Button>
      </form>
    </Card>
  );
}
