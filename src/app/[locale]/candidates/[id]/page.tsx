import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Languages, 
  User, 
  Calendar, 
  Phone, 
  Mail, 
  Lock, 
  Download,
  Share2,
  ArrowLeft,
  CheckCircle2,
  Award,
  History as HistoryIcon
} from 'lucide-react';
import CandidatesService from '@/services/candidates.service';
import { ROUTES } from '@/lib/constants/routes';
import { capitalize, decodeId } from '@/lib/utils/string';
import { getDictionary, Locale } from '@/i18n';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import CandidateCard from '@/components/candidates/CandidateCard';
import { getApiImageUrl } from '@/lib/utils/url';

import { generatePersonSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';
import JsonLd from '@/components/seo/JsonLd';

interface CandidateDetailPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export async function generateMetadata({ params }: CandidateDetailPageProps): Promise<Metadata> {
  const { id: obfuscatedId, locale } = await params;
  const id = decodeId(obfuscatedId);
  
  try {
    const candidate = await CandidatesService.getCandidateById(id);
    if (!candidate) return { title: 'Candidate Profile | Ujobs India' };
    
    return {
      title: `${candidate.name} - ${candidate.work_types?.[0]?.name || 'Worker'} Profile | Ujobs India`,
      description: `View ${candidate.name}'s professional profile. ${candidate.total_experience} years of experience in ${candidate.city}.`,
    };
  } catch (error) {
    return {
      title: 'Candidate Profile | Ujobs India',
    };
  }
}

export default async function CandidateDetailPage({ params }: CandidateDetailPageProps) {
  const { id: obfuscatedId, locale } = await params;
  const id = decodeId(obfuscatedId);
  const dict = await getDictionary(locale as Locale);

  let candidate;
  let similarCandidates: any[] = [];

  try {
    candidate = await CandidatesService.getCandidateById(id);
    similarCandidates = await CandidatesService.getSimilarCandidates(id, 4);
  } catch (error) {
    console.error('Error fetching candidate details:', error);
    notFound();
  }

  if (!candidate) {
    notFound();
  }

  const candidateName = candidate.name || 'Worker Profile';
  const location = candidate.city || 'Location not specified';
  const experience = candidate.total_experience || 'Not specified';
  const education = candidate.education || 'Not specified';
  const gender = candidate.gender || 'Not specified';
  const age = candidate.age ? `${candidate.age} years` : 'Not specified';
  const primaryCategory = candidate.work_types?.[0]?.name || 'General';

  const personSchema = generatePersonSchema(candidate, dict);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: dict.common.home, url: '/' },
    { name: dict.navigation.candidates, url: '/candidates' },
    { name: primaryCategory, url: `/candidates/${primaryCategory.toLowerCase().replace(/ /g, '-')}` },
    { name: candidateName, url: ROUTES.candidates.detail(candidate.id, candidateName, primaryCategory, candidate.city) }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <JsonLd schema={personSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {/* Navigation Bar */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container-custom py-4 flex items-center justify-between">
          <Link 
            href={`/${locale}${ROUTES.jobs.list}`} // Redirect to jobs or candidates list
            className="flex items-center text-gray-600 hover:text-brand-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Browse</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-400 hover:text-brand-600 rounded-full hover:bg-gray-100 transition-all">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card padding="lg">
              <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className="relative h-32 w-32 md:h-40 md:w-40 bg-gray-100 rounded-2xl overflow-hidden border-4 border-white shadow-sm flex-shrink-0">
                  {candidate.profile_photo ? (
                    <Image 
                      src={getApiImageUrl(candidate.profile_photo)} 
                      alt={candidateName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <User className="h-16 w-16 text-gray-300" />
                    </div>
                  )}
                  {candidate.is_verified && (
                    <div className="absolute bottom-2 right-2 bg-green-500 text-white p-1 rounded-full border-2 border-white">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {candidate.is_verified && (
                      <Badge variant="success" size="sm">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Verified Worker
                      </Badge>
                    )}
                    <Badge variant="info" size="sm">{primaryCategory}</Badge>
                    <Badge variant="default" size="sm">{experience} Experience</Badge>
                  </div>
                  
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {capitalize(candidateName)}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-brand-600" />
                      <span>{location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-brand-600" />
                      <span>{gender}, {age}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-gray-100 mb-8">
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 uppercase font-semibold">Education</span>
                  <div className="flex items-center gap-2 text-gray-900">
                    <GraduationCap className="h-5 w-5 text-brand-600" />
                    <span className="font-medium">{education}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 uppercase font-semibold">Languages</span>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Languages className="h-5 w-5 text-brand-600" />
                    <span className="font-medium">
                      {candidate.languages_known?.join(', ') || 'Not specified'}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 uppercase font-semibold">Expected Salary</span>
                  <div className="flex items-center gap-2 text-gray-900 font-bold">
                    <span className="text-brand-600">₹</span>
                    <span>{candidate.sal_expectation || 'Negotiable'}</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="h-5 w-5 text-brand-600" />
                  Professional Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills && candidate.skills.length > 0 ? (
                    candidate.skills.map((skill) => (
                      <div 
                        key={skill.id} 
                        className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-gray-700 font-medium"
                      >
                        {skill.skill_name}
                      </div>
                    ))
                  ) : (
                    <span className="text-gray-500 italic">No skills listed</span>
                  )}
                </div>
              </div>

              {/* Work History */}
              {candidate.experiences && candidate.experiences.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <HistoryIcon className="h-5 w-5 text-brand-600" />
                    Work Experience
                  </h3>
                  <div className="space-y-6">
                    {candidate.experiences.map((exp) => (
                      <div key={exp.id} className="relative pl-8 border-l-2 border-gray-100 pb-2">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-brand-600 border-4 border-white"></div>
                        <h4 className="font-bold text-gray-900">{exp.designation}</h4>
                        <p className="text-brand-600 font-medium mb-1">{exp.company_name}</p>
                        <p className="text-sm text-gray-500 mb-2">{exp.duration}</p>
                        {exp.description && (
                          <div 
                            className="text-gray-600 text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: exp.description }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Work Types/Categories */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-brand-600" />
                  Interested Roles
                </h3>
                <div className="flex flex-wrap gap-3">
                  {candidate.work_types?.map((type) => (
                    <div key={type.id} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-50 text-brand-700 border border-brand-100">
                      {type.image && (
                        <div className="h-6 w-6 rounded-full overflow-hidden bg-white">
                          <Image 
                            src={getApiImageUrl(type.image)} 
                            alt={type.name}
                            width={24}
                            height={24}
                          />
                        </div>
                      )}
                      <span className="font-bold">{type.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* How to Contact */}
            <Card padding="lg" className="bg-brand-50 border-brand-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Lock className="h-5 w-5 text-brand-600" />
                How to Contact this Candidate
              </h3>
              <p className="text-gray-700 mb-8">
                To protect our workers' privacy, contact details are only available through the Ujobs mobile app. Follow these steps to unlock the contact:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-4 rounded-xl border border-brand-100">
                  <div className="h-8 w-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold mb-3">1</div>
                  <p className="text-sm font-bold text-gray-900">Download App</p>
                  <p className="text-xs text-gray-600">Get Ujobs India on Play Store or App Store.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-brand-100">
                  <div className="h-8 w-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold mb-3">2</div>
                  <p className="text-sm font-bold text-gray-900">Login as Employer</p>
                  <p className="text-xs text-gray-600">Create your business profile in minutes.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-brand-100">
                  <div className="h-8 w-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold mb-3">3</div>
                  <p className="text-sm font-bold text-gray-900">Unlock Profile</p>
                  <p className="text-xs text-gray-600">Search for this profile and unlock details.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href={ROUTES.download.android} className="flex-1 min-w-[200px]">
                  <Button className="w-full bg-black hover:bg-gray-900 text-white h-14 rounded-xl">
                    <Download className="mr-2 h-5 w-5" />
                    <span>Get on Play Store</span>
                  </Button>
                </Link>
                <Link href={ROUTES.download.ios} className="flex-1 min-w-[200px]">
                  <Button variant="outline" className="w-full border-black text-black hover:bg-gray-50 h-14 rounded-xl">
                    <Download className="mr-2 h-5 w-5" />
                    <span>Get on App Store</span>
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Similar Candidates */}
            {similarCandidates.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Candidates for Your Business</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {similarCandidates.map((similarCandidate) => (
                    <CandidateCard key={similarCandidate.id} candidate={similarCandidate} locale={locale} dict={dict} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card padding="lg" className="sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Candidate</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase font-bold">Phone</p>
                    <p className="text-gray-900 font-medium">{candidate.phone || 'XX-XXXX-XX52'}</p>
                  </div>
                  <Lock className="h-4 w-4 text-brand-600" />
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase font-bold">Email</p>
                    <p className="text-gray-900 font-medium">{candidate.email || 'ma****@email.com'}</p>
                  </div>
                  <Lock className="h-4 w-4 text-brand-600" />
                </div>
              </div>
              
              <Link href={ROUTES.download.home}>
                <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white py-6 text-lg rounded-xl mb-4 shadow-lg shadow-brand-200">
                  Unlock Contact Details
                </Button>
              </Link>
              
              <p className="text-center text-xs text-gray-500">
                Unlock is free for verified employers with active plans.
              </p>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Profile Status</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Verification</span>
                    <span className="text-green-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" />
                      Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Profile Completion</span>
                    <span className="text-gray-900 font-bold">{candidate.profile_completion}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-brand-600 h-full rounded-full" 
                      style={{ width: `${candidate.profile_completion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Employer Promotion */}
            {/* <Card className="bg-brand-900 text-white overflow-hidden border-none shadow-xl">
              <div className="p-6 relative z-10">
                <h3 className="text-xl font-bold mb-3">Hire Faster & Better</h3>
                <p className="text-brand-200 text-sm mb-6">
                  Post your job and reach over 1 Lakh verified candidates in India.
                </p>
                <Link href={`/${locale}${ROUTES.employer.home}`}>
                  <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white border-none">
                    Start Hiring Now
                  </Button>
                </Link>
              </div>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  );
}
