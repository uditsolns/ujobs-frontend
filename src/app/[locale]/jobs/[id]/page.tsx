import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  Clock, 
  Building2, 
  Calendar, 
  Share2, 
  Download,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Zap,
  ShieldCheck,
  Target,
  Trophy
} from 'lucide-react';
import JobsService from '@/services/jobs.service';
import { ROUTES } from '@/lib/constants/routes';
import { formatRelativeTime } from '@/lib/utils/date';
import { capitalize } from '@/lib/utils/string';
import { getDictionary, Locale, i18n } from '@/i18n';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import JobCard from '@/components/jobs/JobCard';
import { getApiImageUrl } from '@/lib/utils/url';
import { generateJobPostingSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';
import { generateJobDetailMetadata } from '@/lib/seo/metadata';
import JsonLd from '@/components/seo/JsonLd';

interface JobDetailPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

// Enable ISR
export const revalidate = 3600;

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const { id, locale } = await params;
  const actualId = id.split('-')[0];
  
  try {
    const job = await JobsService.getJobById(actualId);
    if (!job) {
      return { title: 'Job Details | Ujobs India' };
    }
    return generateJobDetailMetadata({
      id: job.id,
      title: job.job_title,
      description: job.job_description,
      location: job.location?.name || job.location_name,
      company: job.company_name || job.user?.company_name
    }, locale);
  } catch (error) {
    return { title: 'Job Details | Ujobs India' };
  }
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id, locale } = await params;
  const actualId = id.split('-')[0];
  const dict = await getDictionary(locale as Locale);

  let job;
  let similarJobs: any[] = [];

  try {
    job = await JobsService.getJobById(actualId);
    similarJobs = await JobsService.getSimilarJobs(actualId, 4);
  } catch (error) {
    console.error('Error fetching job details:', error);
    notFound();
  }

  if (!job) notFound();

  // Production API mapping
  const jobTitle = job.job_title || job.name || 'Job Opening';
  const companyName = job.company_name || job.user?.company_name || job.user?.name || 'Ujobs Verified Employer';
  const location = job.location_name || job.location?.name || job.location?.city || 'India';
  const salary = job.salary || job.pay || 'Competitive Pay';
  const experience = job.experience || 'Fresher/Experienced';
  const employmentType = job.employment_type || (job as any).job_type || 'Full Time';
  const category = job.work_type?.name || job.category || 'General';
  const postedDate = job.posted_at || job.created_at;

  const displayTime = typeof postedDate === 'string' && (postedDate.includes('ago') || postedDate.includes('now'))
    ? postedDate
    : (postedDate ? (formatRelativeTime(postedDate) || 'Recently') : 'Recently');

  const schema = generateJobPostingSchema(job);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Jobs', url: '/jobs' },
    { name: category, url: `/jobs/${category.toLowerCase().replace(/ /g, '-')}-jobs` },
    { name: jobTitle, url: ROUTES.jobs.detail(job.id, jobTitle, location) }
  ]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-28 md:pt-32">
      <JsonLd schema={schema} />
      <JsonLd schema={breadcrumbSchema} />

      {/* Modern Header Section */}
      <div className="relative mb-8 md:mb-12">
        <div className="absolute inset-0 h-48 md:h-64 bg-gradient-to-br from-brand-600 to-blue-700 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('/bg-pattern.png')] bg-repeat" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative pt-12 md:pt-20">
          <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-xl shadow-brand-900/5 border border-white/50 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="h-24 w-24 md:h-32 md:w-32 bg-white rounded-[2rem] flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-neutral-100 shadow-inner">
                {job.work_type?.image ? (
                  <Image 
                    src={getApiImageUrl(job.work_type.image)} 
                    alt={category}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                ) : job.user?.profile_photo ? (
                  <Image 
                    src={getApiImageUrl(job.user.profile_photo)} 
                    alt={companyName}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                ) : (
                  <Building2 className="h-10 w-10 text-neutral-300" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 font-black text-[10px] uppercase tracking-wider px-3 py-1">
                    <ShieldCheck className="w-3 h-3 mr-1" />
                    Verified Listing
                  </Badge>
                  <Badge className="bg-brand-50 text-brand-600 border-brand-100 font-black text-[10px] uppercase tracking-wider px-3 py-1">
                    {employmentType}
                  </Badge>
                  <Badge className="bg-blue-50 text-blue-600 border-blue-100 font-black text-[10px] uppercase tracking-wider px-3 py-1">
                    {category}
                  </Badge>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-display font-black text-neutral-900 mb-3 tracking-tight truncate">
                  {capitalize(jobTitle)}
                </h1>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-neutral-500 font-bold">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-brand-500" />
                    <span className="text-brand-600">{companyName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-neutral-400" />
                    <span>{location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <span>{displayTime}</span>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex flex-col gap-3">
                <Button size="lg" className="h-16 px-10 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-brand-500/20">
                  Apply with App
                </Button>
                <button className="flex items-center justify-center gap-2 text-neutral-400 hover:text-brand-600 font-bold transition-all group">
                  <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Share Job</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm flex items-center gap-4 group hover:border-brand-200 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600 group-hover:scale-110 transition-transform">
                  <IndianRupee className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-0.5">Salary</p>
                  <p className="font-black text-neutral-900">{salary}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm flex items-center gap-4 group hover:border-emerald-200 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-0.5">Experience</p>
                  <p className="font-black text-neutral-900">{experience} Yrs</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm flex items-center gap-4 group hover:border-blue-200 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-0.5">Shift</p>
                  <p className="font-black text-neutral-900">{job.shift_timing || (job as any).time_duration || 'Standard'}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm flex items-center gap-4 group hover:border-orange-200 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-0.5">Working Hrs</p>
                  <p className="font-black text-neutral-900">{job.working_hrs || 'Flexible'}</p>
                </div>
              </div>
            </div>

            <Card padding="xl" className="bg-white border-neutral-100 rounded-[2.5rem]">
              <div className="space-y-12">
                {/* Description */}
                <section>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-brand-600" />
                    </div>
                    <h2 className="text-2xl font-display font-black text-neutral-900">Job Description</h2>
                  </div>
                  <div className="prose prose-neutral max-w-none text-neutral-600">
                    <div 
                      className="text-lg leading-relaxed font-medium"
                      dangerouslySetInnerHTML={{ __html: job.job_description || job.description || 'No detailed description provided.' }}
                    />
                  </div>
                </section>

                {/* Requirements */}
                {(job.requirement || job.expectation) && (
                  <section className="pt-12 border-t border-neutral-50">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-emerald-600" />
                      </div>
                      <h2 className="text-2xl font-display font-black text-neutral-900">Requirements & Expectations</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                      {job.requirement && (
                        <div className="p-6 bg-neutral-50 rounded-3xl">
                          <h4 className="font-black text-neutral-900 mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            Job Requirements
                          </h4>
                          <div 
                            className="text-neutral-600 leading-relaxed font-medium italic"
                            dangerouslySetInnerHTML={{ __html: job.requirement }}
                          />
                        </div>
                      )}
                      {job.expectation && (
                        <div className="p-6 bg-neutral-50 rounded-3xl">
                          <h4 className="font-black text-neutral-900 mb-4 flex items-center gap-2">
                            <Target className="w-4 h-4 text-brand-500" />
                            What to Expect
                          </h4>
                          <div 
                            className="text-neutral-600 leading-relaxed font-medium italic"
                            dangerouslySetInnerHTML={{ __html: job.expectation }}
                          />
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {/* Preferences */}
                {(job.gender_preference || job.religion_pref) && (
                  <section className="pt-12 border-t border-neutral-50">
                    <div className="flex items-center gap-3 mb-6">
                      <h2 className="text-xl font-display font-black text-neutral-900">Additional Preferences</h2>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {job.gender_preference && (
                        <div className="px-5 py-3 bg-white border border-neutral-100 rounded-2xl shadow-sm flex items-center gap-3">
                          <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Gender</span>
                          <span className="font-black text-neutral-900">{job.gender_preference}</span>
                        </div>
                      )}
                      {job.religion_pref && (
                        <div className="px-5 py-3 bg-white border border-neutral-100 rounded-2xl shadow-sm flex items-center gap-3">
                          <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Religion</span>
                          <span className="font-black text-neutral-900">{job.religion_pref}</span>
                        </div>
                      )}
                    </div>
                  </section>
                )}
              </div>
            </Card>

            {/* Light Theme App Promotion CTA */}
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-neutral-200 shadow-xl shadow-brand-900/5 relative overflow-hidden group">
              {/* Subtle background patterns */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-50 rounded-full blur-3xl -ml-24 -mb-24 opacity-50" />
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="flex-1">
                    <Badge className="bg-brand-50 text-brand-600 border-brand-100 mb-6 font-black uppercase tracking-[0.2em] text-[10px] px-4 py-1.5">
                       Mobile Experience
                    </Badge>
                    <h3 className="text-3xl md:text-4xl font-display font-black mb-6 leading-[1.1] tracking-tight text-neutral-900">
                      Apply Faster with the <span className="bg-gradient-to-r from-brand-600 to-blue-600 bg-clip-text text-transparent italic">Ujobs App</span>
                    </h3>
                    <p className="text-neutral-500 font-bold mb-10 text-lg leading-relaxed max-w-xl uppercase tracking-wide">
                      Track applications, chat with employers, and get instant job alerts on your phone.
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <Link href={ROUTES.download.android} target="_blank" className="flex-1 min-w-[180px]">
                        <div className="group/btn flex items-center justify-center gap-3 px-6 py-4 bg-white text-neutral-900 border border-neutral-200 rounded-2xl hover:border-brand-500 hover:bg-neutral-50 transition-all shadow-sm active:scale-95">
                          <svg className="w-6 h-6 text-brand-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                          </svg>
                          <div className="text-left leading-none">
                            <div className="text-[9px] font-black uppercase mb-1 text-neutral-400 tracking-wider">Get it on</div>
                            <div className="text-sm font-black text-neutral-900">Google Play</div>
                          </div>
                        </div>
                      </Link>
                      
                      <Link href={ROUTES.download.ios} target="_blank" className="flex-1 min-w-[180px]">
                        <div className="group/btn flex items-center justify-center gap-3 px-6 py-4 bg-white text-neutral-900 border border-neutral-200 rounded-2xl hover:border-brand-500 hover:bg-neutral-50 transition-all shadow-sm active:scale-95">
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                          </svg>
                          <div className="text-left leading-none">
                            <div className="text-[9px] font-black uppercase mb-1 text-neutral-400 tracking-wider">Download on</div>
                            <div className="text-sm font-black text-neutral-900">App Store</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="hidden lg:flex items-center gap-4 py-8 px-10 bg-brand-50/50 rounded-[2.5rem] border border-brand-100 shadow-inner">
                    <div className="flex flex-col items-center gap-2">
                       <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-soft mb-2">
                          <Zap className="w-8 h-8 text-brand-600" />
                       </div>
                       <p className="text-[10px] font-black text-brand-600 uppercase tracking-widest text-center">Fast Apply</p>
                    </div>
                    <div className="w-px h-12 bg-brand-200" />
                    <div className="flex flex-col items-center gap-2">
                       <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-soft mb-2">
                          <ShieldCheck className="w-8 h-8 text-emerald-600" />
                       </div>
                       <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest text-center">Verified</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Jobs */}
            {similarJobs.length > 0 && (
              <div className="pt-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-display font-black text-neutral-900 tracking-tight">Related Opportunities</h2>
                  <Link href={`/${locale}${ROUTES.jobs.list}`} className="text-sm font-black text-brand-600 hover:text-brand-700 uppercase tracking-widest flex items-center">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {similarJobs.map((similarJob) => (
                    <JobCard key={similarJob.id} job={similarJob} variant="default" locale={locale} dict={dict} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-32">
            <Card padding="xl" className="bg-white border-neutral-100 shadow-xl shadow-brand-900/5 rounded-[2.5rem]">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-500/20">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-black text-neutral-900">Quick Apply</h3>
                  <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Connect Directly</p>
                </div>
              </div>
              
              <p className="text-neutral-500 font-medium mb-8 leading-relaxed">
                Connect with the hiring manager instantly. Download our app and apply in seconds.
              </p>
              
              <Link href={ROUTES.download.home}>
                <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white h-16 text-lg font-black rounded-2xl mb-8 shadow-xl shadow-brand-500/20 transition-all active:scale-95">
                  Apply for this Job
                </Button>
              </Link>
              
              <div className="space-y-6 pt-8 border-t border-neutral-50">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-black text-neutral-900 text-sm">Verified Employer</p>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{job.hirer_phone || 'Protected Info'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-black text-neutral-900 text-sm">Quick Feedback</p>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Active Hiring</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="bg-brand-600 rounded-[2.5rem] p-8 text-white relative overflow-hidden group hover:-translate-y-1 transition-all duration-500 shadow-2xl shadow-brand-900/10">
              <div className="relative z-10">
                <Badge className="bg-white/20 text-white border-none mb-4 font-black uppercase tracking-widest text-[9px] px-3">Featured App</Badge>
                <h3 className="text-2xl font-display font-black mb-3">Join the Future of Hiring</h3>
                <p className="text-brand-100 font-bold mb-8 text-sm leading-relaxed">
                  Join 100,000+ professionals who found their dream job on Ujobs India.
                </p>
                <Link href={ROUTES.download.home}>
                  <Button className="w-full bg-white text-brand-600 hover:bg-neutral-50 h-14 font-black rounded-2xl shadow-lg transition-all active:scale-95">
                    Get Started Free
                  </Button>
                </Link>
              </div>
              <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <Download className="h-48 w-48" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
