import { Metadata } from 'next';
import { Locale } from '@/i18n';
import { getDictionary } from '@/i18n';
import { Target, Users, Shield, TrendingUp, Heart, Award } from 'lucide-react';
import { ROUTES, l } from '@/lib/constants/routes';
import Badge from '@/components/ui/Badge';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  return {
    title: dict.about.seo.title,
    description: dict.about.seo.description,
    keywords: dict.about.seo.keywords,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: dict.about.values.list[0].title,
      description: dict.about.values.list[0].desc,
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: dict.about.values.list[1].title,
      description: dict.about.values.list[1].desc,
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: dict.about.values.list[2].title,
      description: dict.about.values.list[2].desc,
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: dict.about.values.list[3].title,
      description: dict.about.values.list[3].desc,
    },
  ];

  const impactStats = [
    { value: '1M+', label: dict.about.impact.jobSeekers },
    { value: '50K+', label: dict.about.impact.activeJobs },
    { value: '5K+', label: dict.about.impact.employers },
    { value: '100K+', label: dict.about.impact.successfulHires },
  ];

  const milestones = [
    { year: dict.about.journey.milestones[0].year, title: dict.about.journey.milestones[0].title, description: dict.about.journey.milestones[0].desc },
    { year: dict.about.journey.milestones[1].year, title: dict.about.journey.milestones[1].title, description: dict.about.journey.milestones[1].desc },
    { year: dict.about.journey.milestones[2].year, title: dict.about.journey.milestones[2].title, description: dict.about.journey.milestones[2].desc },
    { year: dict.about.journey.milestones[3].year, title: dict.about.journey.milestones[3].title, description: dict.about.journey.milestones[3].desc },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-600 pt-28 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6" dangerouslySetInnerHTML={{ __html: dict.about.hero.title }} />
          <p className="text-xl text-brand-100 max-w-3xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: dict.about.hero.description }} />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-brand-50 to-white p-8 rounded-2xl shadow-sm">
              <Target className="w-12 h-12 text-brand-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{dict.about.mission.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: dict.about.mission.desc }} />
            </div>

            <div className="bg-gradient-to-br from-brand-50 to-white p-8 rounded-2xl shadow-sm">
              <Award className="w-12 h-12 text-brand-600 mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{dict.about.vision.title}</h2>
              <p className="text-lg text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: dict.about.vision.desc }} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{dict.about.impact.title}</h2>
            <p className="text-xl text-gray-600">{dict.about.impact.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm text-center">
                <div className="text-4xl font-bold text-brand-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {dict.about.values.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {dict.about.values.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: value.description }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Redesigned as a Premium Vertical Chronology */}
      <section className="py-24 bg-neutral-50/50 relative overflow-hidden border-t border-b border-neutral-100">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl -mr-48 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <Badge variant="brand" className="mb-4 bg-brand-50 text-brand-700 border border-brand-100 px-3 py-1 rounded-full font-black uppercase tracking-widest text-[9px] mx-auto">
              Our Journey
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-display font-black text-neutral-900 tracking-tight">
              Our <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent italic">Journey</span>
            </h2>
            <p className="text-neutral-500 font-medium mt-3 text-sm">
              How we grew from a simple idea in Mumbai to a secure national staffing utility serving lakhs of Indian homes.
            </p>
          </div>

          {/* Timeline Node Tree */}
          <div className="relative">
            {/* Center vertical track line (Desktop: center, Mobile: left) */}
            <div className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-1 bg-gradient-to-b from-brand-200 via-indigo-200 to-brand-100 transform md:-translate-x-1/2 rounded-full" />

            <div className="space-y-12">
              {[
                {
                  year: '2020',
                  title: 'The Genesis & Vision',
                  description: 'Founded under Ayushya Healthcare Services, Ujobs India was conceived with a clear social mission: to address the severe trust gap, lack of transparency, and unfair agency commissions plaguing the home care and domestic staffing sector in India.',
                  icon: <Target className="w-5 h-5 text-blue-600" />,
                  color: 'bg-blue-50 border-blue-200'
                },
                {
                  year: '2021',
                  title: 'Building the Foundation',
                  description: 'We established our core identity verification frameworks and launched pilot services in Mumbai. By focusing on direct-matching, we successfully connected over 10,000 households with pre-screened caretakers, drivers, and nursing staff.',
                  icon: <Users className="w-5 h-5 text-emerald-600" />,
                  color: 'bg-emerald-50 border-emerald-200'
                },
                {
                  year: '2023',
                  title: 'Mobilizing Trust & Technology',
                  description: 'Launched the custom Ujobs India mobile application for Android and iOS. By putting secure, direct-matching technology, instant chat, and digital profile vetting tools in the pockets of lakhs of users, we eliminated the need for third-party staffing agencies.',
                  icon: <Shield className="w-5 h-5 text-indigo-600" />,
                  color: 'bg-indigo-50 border-indigo-200'
                },
                {
                  year: '2026',
                  title: 'Scale, Impact & Local Languages',
                  description: 'Today, Ujobs India connects over 10,000+ families with verified, independent domestic care professionals across 500+ cities. Operating in 12 major regional languages, we are proud to be India\'s safest and most trusted direct staffing matching utility.',
                  icon: <Award className="w-5 h-5 text-amber-600" />,
                  color: 'bg-amber-50 border-amber-200'
                }
              ].map((milestone, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} className={`flex flex-col md:flex-row items-stretch relative ${isEven ? 'md:flex-row-reverse' : ''}`}>
                    
                    {/* 1. Content Card Column */}
                    <div className="w-full md:w-1/2 pl-[70px] md:pl-0 pr-0 md:group flex items-center">
                      <div className={`w-full bg-white rounded-[2rem] p-6 lg:p-8 border border-neutral-200 shadow-soft hover:shadow-elevated hover:border-brand-500 transition-all duration-300 relative ${
                        isEven ? 'md:mr-10' : 'md:ml-10'
                      }`}>
                        {/* Custom Badge Tag for Year */}
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-black text-brand-600 tracking-widest bg-brand-50 border border-brand-100 px-3.5 py-1 rounded-full uppercase">
                            {milestone.year}
                          </span>
                        </div>
                        <h3 className="text-lg font-black text-neutral-900 mb-2 tracking-tight group-hover:text-brand-600 transition-colors">
                          {milestone.title}
                        </h3>
                        <p className="text-xs text-neutral-500 font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: milestone.description }} />
                      </div>
                    </div>

                    {/* 2. Central Pin Column */}
                    <div className="absolute left-0 md:left-1/2 top-4 md:top-1/2 transform -translate-y-1/2 md:-translate-x-1/2 z-10 pl-[10px] md:pl-0">
                      <div className={`w-10 h-10 rounded-xl bg-white border-2 border-neutral-300 shadow-md flex items-center justify-center`}>
                        {milestone.icon}
                      </div>
                    </div>

                    {/* 3. Empty spacer column for desktop grid balance */}
                    <div className="hidden md:block w-1/2" />

                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-700">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {dict.about.cta.title}
          </h2>
          <p className="text-xl text-brand-100 mb-8" dangerouslySetInnerHTML={{ __html: dict.about.cta.description }} />
          <a
            href={l(ROUTES.download.home, locale)}
            className="inline-flex items-center bg-white text-brand-700 px-8 py-4 rounded-lg font-bold hover:bg-brand-50 transition-all shadow-lg"
          >
            {dict.about.cta.button}
          </a>
        </div>
      </section>
    </div>
  );
}
