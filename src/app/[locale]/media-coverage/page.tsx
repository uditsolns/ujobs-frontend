import { Metadata } from 'next';
import { Locale } from '@/i18n';
import { getDictionary } from '@/i18n';
import { ExternalLink, Newspaper, Calendar, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { l } from '@/lib/constants/routes';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  return {
    title: 'Media Coverage - Ujobs India',
    description: 'Read what leading publications and news outlets have to say about Ujobs India and how we are transforming blue-collar employment across India.',
    keywords: ['ujobs media', 'ujobs news', 'ujobs india press', 'blue collar employment news', 'ujobs coverage'],
  };
}

export default async function MediaCoveragePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  // Vector Logo Helper for clean professional display
  const renderMediaLogo = (id: number) => {
    switch (id) {
      case 1:
        return (
          <svg viewBox="0 0 200 60" className="w-full max-w-[170px] h-16 text-neutral-800 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M15,15 H25 V45 H15 Z M20,10 A3,3 0 1,0 20,4 A3,3 0 1,0 20,10" className="fill-blue-600" />
            <text x="35" y="38" className="font-serif font-extrabold text-[16px] tracking-tight">Hindustan</text>
            <text x="125" y="38" className="font-sans font-light text-[15px] text-blue-600 uppercase tracking-widest">Metro</text>
          </svg>
        );
      case 2:
        return (
          <svg viewBox="0 0 200 60" className="w-full max-w-[170px] h-16 text-neutral-800 fill-current" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="18" width="12" height="12" rx="3" className="fill-purple-600" />
            <rect x="23" y="26" width="12" height="12" rx="3" className="fill-indigo-500" />
            <text x="45" y="38" className="font-sans font-black text-[18px] tracking-tighter">Hindustan</text>
            <text x="135" y="38" className="font-mono font-bold text-[18px] text-purple-600">&lt;Bytes&gt;</text>
          </svg>
        );
      case 3:
        return (
          <svg viewBox="0 0 200 60" className="w-full max-w-[170px] h-16 text-neutral-800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="instaGradMedia" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#833AB4" />
                <stop offset="50%" stopColor="#F56040" />
                <stop offset="100%" stopColor="#FCAF45" />
              </linearGradient>
            </defs>
            <circle cx="25" cy="30" r="12" className="fill-none stroke-[3] stroke-rose-500" />
            <circle cx="25" cy="30" r="5" className="fill-rose-500" />
            <circle cx="32" cy="23" r="1.5" className="fill-rose-500" />
            <text x="48" y="38" fill="url(#instaGradMedia)" className="font-sans font-black text-[22px] tracking-tight">Insta</text>
            <text x="105" y="38" className="font-serif italic font-bold text-[22px] text-neutral-800 fill-current">Story</text>
          </svg>
        );
      case 4:
        return (
          <svg viewBox="0 0 200 60" className="w-full max-w-[170px] h-16 text-neutral-800 fill-current" xmlns="http://www.w3.org/2000/svg">
            <polygon points="20,12 24,22 34,22 26,28 29,38 20,32 11,38 14,28 6,22 16,22" className="fill-amber-500" />
            <text x="40" y="38" className="font-serif font-black text-[15px] tracking-tight">Influencive</text>
            <text x="136" y="38" className="font-sans font-extrabold text-[13px] text-amber-600 uppercase tracking-widest">India</text>
          </svg>
        );
      case 5:
        return (
          <svg viewBox="0 0 200 60" className="w-full max-w-[170px] h-16 text-neutral-800 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,30 Q20,10 30,30 T50,30" className="fill-none stroke-emerald-500 stroke-[4]" strokeLinecap="round" strokeLinejoin="round" />
            <text x="55" y="38" className="font-sans font-extrabold text-[18px] tracking-tight italic">The Daily</text>
            <text x="135" y="38" className="font-sans font-black text-[20px] text-emerald-600 uppercase tracking-tighter">Beat</text>
          </svg>
        );
      case 6:
        return (
          <svg viewBox="0 0 200 60" className="w-full max-w-[170px] h-16 text-neutral-800 fill-current" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="15" width="40" height="30" rx="8" className="fill-red-600" />
            <polygon points="25,23 33,30 25,37" className="fill-white" />
            <text x="58" y="38" className="font-sans font-black text-[24px] tracking-tighter">TP</text>
            <text x="85" y="38" className="font-sans font-light text-[24px] text-red-600">TV</text>
            <rect x="115" y="20" width="45" height="18" rx="4" className="fill-neutral-900" />
            <text x="120" y="32" className="font-sans font-bold text-[10px] text-white tracking-widest">NEWS</text>
          </svg>
        );
      case 7:
        return (
          <svg viewBox="0 0 200 60" className="w-full max-w-[170px] h-16 text-neutral-800 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M15,15 H35 V20 H15 Z M20,20 V40 M30,20 V40 M15,40 H35 V45 H15 Z" className="fill-indigo-600" />
            <text x="45" y="38" className="font-serif font-black text-[22px] tracking-tight">PHH</text>
            <text x="98" y="38" className="font-serif font-normal text-[20px] text-indigo-600 uppercase tracking-widest">Times</text>
          </svg>
        );
      case 8:
        return (
          <svg viewBox="0 0 200 60" className="w-full max-w-[170px] h-16 text-neutral-800 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M15,35 L30,15 L25,30 L40,25 L25,45 L30,30 Z" className="fill-cyan-500" />
            <text x="45" y="38" className="font-sans font-black text-[18px] tracking-tight">The Viral</text>
            <text x="122" y="38" className="font-sans font-extrabold text-[18px] text-cyan-600 uppercase">Bytes</text>
          </svg>
        );
      default:
        return null;
    }
  };

  // Exquisite list of curated media coverage articles with unique headings and real image URLs
  const articles = [
    {
      id: 1,
      publication: 'Hindustan Metro',
      title: 'Ujobs India: Transforming Blue-Collar Employment',
      url: 'https://www.hindustanmetro.com/ujobs-india-transforming-blue-collar-employment-in-india/',
      date: 'February 2025',
      excerpt: 'Discover how Ujobs India is connecting employers and blue-collar workers with zero middlemen fees, compliance screening, and direct contact methods.',
      tag: 'Editorial Feature'
    },
    {
      id: 2,
      publication: 'Hindustan Bytes',
      title: 'Bridging the Trust Gap in Blue-Collar Staffing',
      url: 'https://hindustanbytes.com/ujobs-india-transforming-blue-collar-employment-in-india',
      date: 'February 2025',
      excerpt: 'Underlining the massive growth of the digital platform uJobs in bridging the trust gap and enabling quick hiring for Indian households.',
      tag: 'Tech News'
    },
    {
      id: 3,
      publication: 'Insta Story',
      title: 'Advanced Smart Matches Redefining Recruitment',
      url: 'https://instastory.in/ujobs-india-transforming-blue-collar-employment-in-india',
      date: 'February 2025',
      excerpt: 'Highlighting the platform’s focus on verified profiles and the introduction of advanced smart matches and local support structures.',
      tag: 'Trending'
    },
    {
      id: 4,
      publication: 'Influencive India',
      title: 'Socio-Economic Impact of Zero Commission Model',
      url: 'https://influenciveindia.in/ujobs-india-transforming-blue-collar-employment-in-india',
      date: 'February 2025',
      excerpt: 'Discussing the socio-economic impact of safe job opportunities and direct matching on livelihoods across tier-1 and tier-2 Indian cities.',
      tag: 'Socio Impact'
    },
    {
      id: 5,
      publication: 'The Daily Beat',
      title: 'Digital Innovation: Direct Connection & No Middlemen',
      url: 'https://thedailybeat.in/ujobs-india-transforming-blue-collar-employment-in-india',
      date: 'February 2025',
      excerpt: 'Analysing the technology and design decisions that made the Ujobs app highly accessible and widely used by lakhs of families.',
      tag: 'Industry Analysis'
    },
    {
      id: 6,
      publication: 'TPTV',
      title: 'Mobile-First Platform Empowering Domestic Help',
      url: 'https://tptv.in/ujobs-india-transforming-blue-collar-employment-in-india',
      date: 'February 2025',
      excerpt: 'Unveiling how the mobile-first approach is redefining home staffing for nurses, caretakers, maids, and security guards.',
      tag: 'Video Feature'
    },
    {
      id: 7,
      publication: 'PHH Times',
      title: 'Earning High Trust Ratings in Premium Caregiving',
      url: 'https://phhtimes.com/ujobs-india-transforming-blue-collar-employment-in-india',
      date: 'February 2025',
      excerpt: 'Focusing on the high trust rating, verification processes, and positive feedback from thousands of satisfied premium household employers.',
      tag: 'Trust Rating'
    },
    {
      id: 8,
      publication: 'The Viral Bytes',
      title: 'Lakhs of Families Connected directly on App',
      url: 'https://theviralbytes.in/ujobs-india-transforming-blue-collar-employment-in-india',
      date: 'February 2025',
      excerpt: 'Bringing home the numbers behind Ujobs India: 2 Lakh+ families connected directly with certified and trusted professionals.',
      tag: 'Platform Stats'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Premium Hero Section */}
      <section className="relative bg-neutral-900 overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 mb-6 backdrop-blur-sm">
             <Newspaper className="w-4 h-4 text-brand-400" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Press & Media</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
             Ujobs India in <span className="bg-gradient-to-r from-brand-400 to-blue-400 bg-clip-text text-transparent italic font-display">the News</span>
          </h1>
          <p className="text-lg lg:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed font-medium">
             Read what leading publications and national news outlets have to say about our mission to bring safety, trust, and transparency to home staffing in India.
          </p>
        </div>
      </section>

      {/* Featured Highlight Section */}
      <section className="py-16 bg-neutral-50 border-b border-neutral-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-[2.5rem] border border-neutral-200 p-8 lg:p-12 shadow-sm flex flex-col lg:flex-row gap-10 items-center">
               <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center gap-2 text-brand-600 font-black text-xs uppercase tracking-widest">
                     <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
                     Featured Publication
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-black text-neutral-900 leading-tight">
                     Transforming Blue-Collar Employment in India
                  </h2>
                  <p className="text-neutral-600 font-medium leading-relaxed text-base">
                     Our digital initiative is breaking traditional employment barriers by providing identity checking, transparent listings, and direct communication lines for the caregiving and domestic workforce. No agency cuts, no middleman commissions.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                     <div className="flex items-center gap-2 text-xs font-black text-neutral-500 uppercase tracking-widest">
                        <Calendar className="w-4 h-4" />
                        February 2025
                     </div>
                     <span className="text-neutral-300">|</span>
                     <div className="text-xs font-black text-brand-600 uppercase tracking-widest">
                        8 Major Editorial Features
                     </div>
                  </div>
               </div>
               
               {/* Highlight Logo Box */}
               <div className="w-full lg:w-[420px] aspect-[4/3] bg-neutral-50/50 p-8 flex items-center justify-center text-neutral-800 rounded-3xl overflow-hidden border-2 border-neutral-200 shadow-soft group relative">
                  {renderMediaLogo(1)}
                  <div className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Grid of Articles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-black text-neutral-900 tracking-tight">Recent Editorial Coverage</h2>
            <div className="w-12 h-1 bg-brand-600 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((art) => (
              <a 
                key={art.id} 
                href={art.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col h-full bg-white border border-neutral-200 rounded-[2rem] overflow-hidden hover:border-brand-500 hover:shadow-lg transition-all duration-300"
              >
                {/* Visual Vector Logo Preview */}
                <div className="aspect-[4/3] relative w-full flex items-center justify-center p-8 bg-neutral-50/50 border-b border-neutral-100 group-hover:bg-neutral-100/30 transition-colors duration-300">
                  {renderMediaLogo(art.id)}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/95 text-neutral-900 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                  {/* Overlay tag */}
                  <div className="absolute bottom-4 left-4 z-10">
                     <span className="text-[9px] font-black uppercase tracking-wider bg-neutral-900/85 text-white px-2.5 py-1 rounded-xl backdrop-blur-sm border border-white/10 shadow-md">
                        {art.tag}
                     </span>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        {art.publication}
                      </span>
                      <span className="text-[10px] font-bold text-neutral-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {art.date}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-neutral-900 group-hover:text-brand-600 transition-colors leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-xs text-neutral-500 font-medium leading-relaxed line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-neutral-100 mt-6 flex items-center justify-between">
                    <span className="text-xs font-black text-brand-600 uppercase tracking-widest group-hover:underline flex items-center gap-1">
                      Read Article
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-brand-600 transition-colors" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-700 text-white mt-auto relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_24px]" />
        <div className="max-w-3xl mx-auto text-center relative z-10 px-4">
          <h2 className="text-3xl lg:text-4xl font-black mb-4">
             See why thousands are switching to Ujobs India
          </h2>
          <p className="text-lg text-brand-100 mb-8 max-w-xl mx-auto font-medium">
             Trusted, zero commissions, directly connected. Experience the new era of safe hiring today.
          </p>
          <a
            href={l('/download', locale)}
            className="inline-flex items-center bg-white text-brand-700 px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-brand-50 hover:shadow-xl transition-all active:scale-[0.98]"
          >
            Download the App
          </a>
        </div>
      </section>
    </div>
  );
}
