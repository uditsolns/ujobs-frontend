import { Metadata } from 'next';
import { Locale } from '@/i18n';
import { getDictionary } from '@/i18n';
import { Smartphone, Shield, Zap, Star, CheckCircle, ShieldCheck } from 'lucide-react';
import { loadConfig } from '@/config/runtime';
import AppMockup from '@/components/shared/AppMockup';
import Badge from '@/components/ui/Badge';
import Icon from '@/components/ui/Icon';
import DownloadClient from '@/components/download/DownloadClient';
import FAQAccordion from '@/components/shared/FAQAccordion';
import { generateAppSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/seo/schema';
import JsonLd from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  return {
    title: dict.download.seo.title,
    description: dict.download.seo.description,
    keywords: dict.download.seo.keywords,
  };
}

export default async function DownloadAppPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const enDict = await getDictionary('en');
  const config = await loadConfig();

  const downloadFaq = dict.download?.faq || enDict.download?.faq;

  const appSchema = generateAppSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: dict.common?.home || 'Home', url: `/${locale}` },
    { name: dict.appBanner?.mobileApp || 'Download App', url: `/${locale}/download` },
  ]);
  const faqSchema = downloadFaq?.items ? generateFAQSchema(downloadFaq.items) : null;

  const features = [
    {
      icon: 'zap',
      title: dict.download.features.list[0].title,
      description: dict.download.features.list[0].desc,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      icon: 'message',
      title: dict.download.features.list[1].title,
      description: dict.download.features.list[1].desc,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: 'shieldCheck',
      title: dict.download.features.list[2].title,
      description: dict.download.features.list[2].desc,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      icon: 'checkCircle',
      title: dict.download.features.list[3].title,
      description: dict.download.features.list[3].desc,
      color: 'bg-brand-50 text-brand-600',
    },
  ];

  const appStoreUrl = config?.appStore?.android || 'https://play.google.com/store/apps/details?id=com.ujobsindia';
  const iosStoreUrl = config?.appStore?.ios || 'https://apps.apple.com/in/app/ujobs-india/id6741137870';

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <JsonLd schema={appSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-50/20 rounded-l-full blur-3xl -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge variant="brand" className="mb-5 bg-brand-500 text-white border-none px-3 py-1 rounded-full font-bold uppercase tracking-widest text-[9px]">
                {dict.appBanner.mobileApp}
              </Badge>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-neutral-900 leading-[1.1]" dangerouslySetInnerHTML={{ __html: dict.download.hero.title }} />
              <p className="text-base md:text-lg text-neutral-500 mb-8 leading-relaxed font-medium max-w-xl" dangerouslySetInnerHTML={{ __html: dict.download.hero.description }} />

              {/* Stats Bar */}
              <div className="flex flex-wrap gap-5 mb-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-white shadow-soft rounded-xl flex items-center justify-center text-brand-600 border border-neutral-100/50">
                    <Icon name="download" size="md" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-neutral-900 leading-none">1M+</div>
                    <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{dict.download.hero.downloads}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-white shadow-soft rounded-xl flex items-center justify-center text-brand-600 border border-neutral-100/50">
                    <Icon name="briefcase" size="md" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-neutral-900 leading-none">50K+</div>
                    <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{dict.download.hero.activeJobs}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-white shadow-soft rounded-xl flex items-center justify-center text-yellow-500 border border-neutral-100/50">
                    <Icon name="star" size="md" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-neutral-900 leading-none">4.5★</div>
                    <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest">{dict.download.hero.userRating}</div>
                  </div>
                </div>
              </div>

              {/* Desktop Download QR Hint */}
              <div className="hidden lg:block">
                <div className="flex items-center gap-2.5 text-neutral-900 font-bold mb-4 text-xs">
                   <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                      <Icon name="checkCircle" size="sm" />
                   </div>
                   <span>Scan the QR codes to download instantly</span>
                </div>
              </div>
            </div>

            {/* App Mockup */}
            <div className="relative">
              <div className="absolute inset-0 bg-brand-gradient rounded-full blur-3xl opacity-5 -z-10" />
              <AppMockup 
                className="max-w-xs lg:max-w-[300px] mx-auto drop-shadow-2xl transform rotate-1" 
                imageSrc="/appimg.jpeg"
              />
            </div>
          </div>

          {/* QR Codes and Store Buttons Component */}
          <div className="mt-12">
            <DownloadClient 
              dict={dict} 
              androidUrl={appStoreUrl} 
              iosUrl={iosStoreUrl} 
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-neutral-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-black text-neutral-900 mb-4 tracking-tight">
              {dict.download.features.title}
            </h2>
            <p className="text-lg text-neutral-500 max-w-2xl mx-auto font-medium">
              {dict.download.features.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-6 shadow-soft hover:shadow-elevated transition-all duration-500 group border border-neutral-100/50"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon name={feature.icon as any} size="md" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2" dangerouslySetInnerHTML={{ __html: feature.title }} />
                <p className="text-neutral-500 leading-relaxed font-medium text-xs" dangerouslySetInnerHTML={{ __html: feature.description }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Download Section */}
      <section className="py-20 bg-neutral-50/50 relative overflow-hidden border-t border-neutral-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-50/20 via-transparent to-transparent -z-10" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="brand" className="mb-4 bg-brand-50 text-brand-700 border border-brand-100 px-3 py-1 rounded-full font-black uppercase tracking-widest text-[9px] mx-auto">
              <Zap className="w-3.5 h-3.5" />
              Simple 3-Step Process
            </Badge>
            <h2 className="text-3xl md:text-5xl font-display font-black text-neutral-900 tracking-tight">
              How to Download & <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent italic">Get Started</span>
            </h2>
            <p className="text-neutral-500 font-medium max-w-lg mx-auto mt-3 text-sm">
              Follow these simple steps to install the app and begin connecting directly with trusted professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              {
                number: '01',
                title: 'Download & Install',
                desc: 'Search for <strong>"Ujobs India"</strong> on the Google Play Store or Apple App Store. Or simply scan the secure QR code on our homepage to download the app directly to your phone in one click.',
                icon: 'download',
                color: 'bg-blue-50 text-blue-600 border-blue-100',
                badge: 'Free Download'
              },
              {
                number: '02',
                title: 'Verify & Register',
                desc: 'Open the app and verify your mobile number instantly with a secure OTP. Create your profile as an Employer or Job Seeker in under 10 seconds—no complex resumes or paperwork required.',
                icon: 'userPlus',
                color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
                badge: 'Quick OTP'
              },
              {
                number: '03',
                title: 'Search & Connect',
                desc: 'Browse through thousands of trusted home care and household professionals in your area. Contact them directly via built-in secure chat or mobile calls with <strong>zero agency commissions</strong>.',
                icon: 'briefcase',
                color: 'bg-amber-50 text-amber-600 border-amber-100',
                badge: 'Direct Connect'
              }
            ].map((step, i) => (
              <div key={i} className="relative group">
                <div className="bg-white rounded-[2rem] p-8 border border-neutral-200 hover:border-brand-500 shadow-soft hover:shadow-elevated transition-all duration-500 flex flex-col h-full relative z-10">
                  
                  {/* Card Header with Icon & Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 ${step.color} rounded-2xl flex items-center justify-center border group-hover:scale-110 transition-all duration-500`}>
                      <Icon name={step.icon as any} size="md" />
                    </div>
                    <span className="text-3xl font-display font-black bg-gradient-to-br from-neutral-200 to-neutral-300 bg-clip-text text-transparent group-hover:from-brand-100 group-hover:to-brand-200 transition-colors">
                      {step.number}
                    </span>
                  </div>

                  {/* Badget Tag */}
                  <span className="inline-flex items-center w-fit px-2.5 py-0.5 bg-neutral-50 text-neutral-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-neutral-200/60 mb-3 group-hover:bg-brand-50 group-hover:text-brand-700 group-hover:border-brand-100 transition-colors">
                    {step.badge}
                  </span>

                  {/* Title & Description */}
                  <h3 className="text-lg font-black text-neutral-900 mb-3 tracking-tight group-hover:text-brand-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium leading-relaxed flex-grow" dangerouslySetInnerHTML={{ __html: step.desc }} />
                </div>

                {/* Connection Lines (Desktop only) */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-[104px] left-[90%] w-[20%] h-[2px] border-t-2 border-dashed border-neutral-200 -z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {downloadFaq && (
        <section className="py-16 md:py-20 bg-neutral-50 relative overflow-hidden border-t border-b border-neutral-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-black text-neutral-900 mb-4 tracking-tight">
                {downloadFaq.title}
              </h2>
            </div>
            <div className="max-w-2xl mx-auto">
              <FAQAccordion faqs={downloadFaq.items} />
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section - Re-designed as 'Ready to Get Started' */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-brand-50 to-indigo-50/30 border border-brand-100 rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-soft">
          {/* Subtle brand glow decorative orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-600 mx-auto mb-8 shadow-md border border-neutral-100 group-hover:scale-110 transition-transform duration-500">
              <Icon name="download" size="lg" strokeWidth={2} />
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-neutral-900 mb-6 tracking-tight leading-tight">
              Ready to <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent italic">Get Started?</span>
            </h2>
            <p className="text-base text-neutral-600 mb-10 font-medium leading-relaxed max-w-lg mx-auto" dangerouslySetInnerHTML={{ __html: dict.download.cta.description }} />
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-600 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-brand hover:bg-brand-700 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
              >
                <Icon name="smartphone" size="sm" />
                {dict.download.cta.android}
              </a>
              <a
                href={iosStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-neutral-900 px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-soft hover:bg-neutral-50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 border-2 border-neutral-900 active:scale-95"
              >
                <Icon name="smartphone" size="sm" />
                {dict.download.cta.ios}
              </a>
            </div>
            
            <div className="mt-10 flex items-center justify-center gap-6">
               <div className="flex items-center gap-2 text-neutral-400 text-[9px] font-black uppercase tracking-[0.2em]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Secure
               </div>
               <div className="w-1.5 h-1.5 rounded-full bg-neutral-200" />
               <div className="flex items-center gap-2 text-neutral-400 text-[9px] font-black uppercase tracking-[0.2em]">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" /> Free Download
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
