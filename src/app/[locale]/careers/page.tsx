import { Metadata } from 'next';
import { Locale, getDictionary } from '@/i18n';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  return {
    title: `Careers | ${dict.common.title}`,
    description: 'Join our mission to redefine home staffing in India. Explore open positions at Ujobs India.',
  };
}

export default async function CareersPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const jobs = [
    { title: 'Full Stack Developer', department: 'Engineering', location: 'Remote / Mumbai', type: 'Full-time' },
    { title: 'Operations Manager', department: 'Operations', location: 'Mumbai', type: 'Full-time' },
    { title: 'Customer Support Lead', department: 'Support', location: 'Mumbai', type: 'Full-time' },
    { title: 'Regional Sales Head', department: 'Sales', location: 'Delhi NCR', type: 'Full-time' },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pt-28 md:pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="brand" className="mb-4 bg-brand-50 text-brand-700 py-1.5 px-6 font-black uppercase tracking-widest text-[10px]">
            Join Our Team
          </Badge>
          <h1 className="text-4xl md:text-6xl font-display font-black text-neutral-900 mb-6 tracking-tight">
            Work with <span className="text-brand-600 italic">Purpose.</span>
          </h1>
          <p className="text-xl text-neutral-600 font-medium leading-relaxed max-w-2xl mx-auto">
            We are building India's safest platform for home care staffing. Join us in making a difference in millions of households.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-display font-black text-neutral-900 mb-8">Current Openings</h2>
          {jobs.map((job, i) => (
            <Card key={i} className="group hover:border-brand-500 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-2">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-black text-neutral-900 group-hover:text-brand-600 transition-colors">{job.title}</h3>
                    <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-[9px] font-black uppercase tracking-widest rounded-md">{job.type}</span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs font-bold text-neutral-500">
                    <div className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {job.department}</div>
                    <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {job.location}</div>
                  </div>
                </div>
                <Button variant="outline" className="rounded-xl font-black uppercase tracking-widest text-[10px] group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 transition-all">
                  Apply Now <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-20 bg-gradient-to-br from-brand-50 to-indigo-50/30 border border-brand-100 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-soft">
           {/* Decorative glowing bubbles */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

           <div className="relative z-10">
             <h2 className="text-3xl font-display font-black mb-6 text-neutral-900">Don't see a <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent italic">fit?</span></h2>
             <p className="text-neutral-600 mb-10 max-w-xl mx-auto font-medium leading-relaxed text-sm">
               We are always looking for passionate, purpose-driven individuals to join our mission. Send your resume directly to <span className="text-brand-600 font-black">support@ujobsindia.com</span> and let's shape the future of safe hiring together.
             </p>
             <Link href={`/${locale}/contact`}>
               <Button className="bg-brand-600 hover:bg-brand-700 text-white px-10 h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-brand hover:shadow-elevated transition-all active:scale-95">
                 Contact Our HR Team
               </Button>
             </Link>
             
             {/* HR Reply Promise Badge */}
             <div className="mt-5 text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
               Our HR team typically replies within 2 working days
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
