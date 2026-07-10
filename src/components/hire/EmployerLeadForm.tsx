'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Locale } from '@/i18n';
import { Building2, User, Phone, Mail, MapPin, Briefcase, Search, X } from 'lucide-react';
import LeadsService from '@/services/leads.service';
import CategoriesService from '@/services/categories.service';
import LocationsService from '@/services/locations.service';
import { matchLocation } from '@/lib/utils/fuzzySearch';
import type { WorkType, Location } from '@/types';
import Button from '@/components/ui/Button';

interface EmployerLeadFormProps {
  locale: Locale;
}

export default function EmployerLeadForm({ locale }: EmployerLeadFormProps) {
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    company_name: '',
    contact_person: '',
    phone: '',
    email: '',
    location: searchParams?.get('city') || '',
    job_category: searchParams?.get('category') || '',
    requirements: '',
  });

  useEffect(() => {
    // Update if search params change
    if (!searchParams) return;
    
    const category = searchParams.get('category');
    const city = searchParams.get('city');
    
    if (category || city) {
      setFormData(prev => ({
        ...prev,
        job_category: category || prev.job_category,
        location: city || prev.location
      }));
    }
  }, [searchParams]);

  const [categories, setCategories] = useState<WorkType[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, locs] = await Promise.all([
          CategoriesService.getCategories(),
          LocationsService.getLocations()
        ]);
        setCategories(cats);
        setLocations(locs);
      } catch (err) {
        console.error('Form data fetch error:', err);
      }
    };
    fetchData();
  }, []);

  const filteredLocations = formData.location 
    ? matchLocation(locations, formData.location)
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await LeadsService.submitLead({
        name: formData.contact_person,
        mobile_no: formData.phone,
        company_name: formData.company_name,
        requirement: `Location: ${formData.location}, Category: ${formData.job_category}, Details: ${formData.requirements}, Email: ${formData.email}`
      });
      setSuccess(true);
      setFormData({
        company_name: '',
        contact_person: '',
        phone: '',
        email: '',
        location: '',
        job_category: '',
        requirements: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (success) {
    return (
      <div className="bg-success-50 border border-success-200 rounded-3xl p-10 text-center animate-in zoom-in duration-300">
        <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-neutral-900 mb-2">Requirement Received!</h3>
        <p className="text-neutral-600 font-medium">
          Our specialized hiring team will contact you within 2 hours to discuss your needs.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-5 py-4 rounded-2xl text-sm font-bold flex items-center gap-3">
          <X className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-[11px] font-black text-neutral-400 uppercase tracking-widest ml-1">
          Company Name
        </label>
        <div className="relative">
           <div className="absolute left-4 top-4 text-neutral-300">
              <Building2 className="w-5 h-5" />
           </div>
           <input
             type="text"
             name="company_name"
             value={formData.company_name}
             onChange={handleChange}
             required
             className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-bold text-neutral-800"
             placeholder="e.g. Ujobs Solutions"
           />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-neutral-400 uppercase tracking-widest ml-1">
            Contact Person
          </label>
          <div className="relative">
             <div className="absolute left-4 top-4 text-neutral-300">
                <User className="w-5 h-5" />
             </div>
             <input
               type="text"
               name="contact_person"
               value={formData.contact_person}
               onChange={handleChange}
               required
               className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-bold text-neutral-800"
               placeholder="Your name"
             />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-neutral-400 uppercase tracking-widest ml-1">
            Phone Number
          </label>
          <div className="relative">
             <div className="absolute left-4 top-4 text-neutral-300">
                <Phone className="w-5 h-5" />
             </div>
             <input
               type="tel"
               name="phone"
               value={formData.phone}
               onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
               required
               className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-bold text-neutral-800"
               placeholder="10-digit number"
             />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-1.5 relative">
          <label className="text-[11px] font-black text-neutral-400 uppercase tracking-widest ml-1">
            Work Location
          </label>
          <div className="relative">
             <div className="absolute left-4 top-4 text-neutral-300">
                <MapPin className="w-5 h-5" />
             </div>
             <input
               type="text"
               name="location"
               value={formData.location}
               onChange={handleChange}
               onFocus={() => setShowLocationSuggestions(true)}
               required
               autoComplete="off"
               className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-bold text-neutral-800"
               placeholder="City name"
             />
             
             {showLocationSuggestions && filteredLocations.length > 0 && (
               <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-100 rounded-2xl shadow-elevated z-[80] max-h-48 overflow-y-auto">
                 {filteredLocations.map((loc, idx) => (
                   <button
                     key={idx}
                     type="button"
                     className="w-full text-left px-5 py-3 hover:bg-neutral-50 font-bold text-neutral-700 text-sm border-b border-neutral-50 last:border-none"
                     onClick={() => {
                       setFormData({ ...formData, location: loc.name });
                       setShowLocationSuggestions(false);
                     }}
                   >
                     <MapPin className="inline w-4 h-4 mr-3 text-brand-500" />
                     {loc.name}
                   </button>
                 ))}
               </div>
             )}
             {showLocationSuggestions && (
                <div className="fixed inset-0 z-[-1]" onClick={() => setShowLocationSuggestions(false)} />
             )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-neutral-400 uppercase tracking-widest ml-1">
            Job Category
          </label>
          <div className="relative">
             <div className="absolute left-4 top-4 text-neutral-300 pointer-events-none">
                <Briefcase className="w-5 h-5" />
             </div>
             <select
               name="job_category"
               value={formData.job_category}
               onChange={handleChange}
               required
               className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-bold text-neutral-800 appearance-none cursor-pointer"
             >
               <option value="">Select category</option>
               {categories.map((cat, idx) => (
                 <option key={`${cat.id}-${idx}`} value={cat.name}>{cat.name}</option>
               ))}
               <option value="Other">Other / Not Listed</option>
             </select>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-black text-neutral-400 uppercase tracking-widest ml-1">
          Hiring Requirements
        </label>
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          rows={3}
          className="w-full px-5 py-4 bg-neutral-50 border border-neutral-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all font-bold text-neutral-800 placeholder:font-normal"
          placeholder="e.g. Need 2 full-time home nurses for elderly care in Delhi. Experience with ICU equipment preferred."
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        fullWidth
        size="lg"
        className="h-16 rounded-2xl font-black bg-brand-600 hover:bg-brand-700 shadow-xl shadow-brand-500/10 transition-all"
      >
        {loading ? 'Submitting...' : 'Post Requirement'}
      </Button>

      <p className="text-[10px] text-neutral-400 text-center font-bold uppercase tracking-wider">
        Connect directly with verified talent • Zero agency fees
      </p>
    </form>
  );
}
