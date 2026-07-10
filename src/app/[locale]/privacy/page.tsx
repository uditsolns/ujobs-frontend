import { Metadata } from 'next';
import { Locale, getDictionary } from '@/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  return {
    title: dict.privacy.seo.title,
    description: dict.privacy.seo.description,
    keywords: dict.privacy.seo.keywords,
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-brand-700 pt-28 pb-16 md:pt-36">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-white">{dict.privacy.hero.title}</h1>
          <p className="text-brand-100 mt-4">{dict.privacy.hero.lastUpdated}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          {dict.privacy.sections.map((section: any, index: number) => (
            <section key={index} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
              {section.content && (
                <p 
                  className="text-gray-700 mb-4"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              )}
              
              {section.subsections && section.subsections.map((sub: any, subIndex: number) => (
                <div key={subIndex} className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{sub.title}</h3>
                  {sub.content && (
                    <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: sub.content }} />
                  )}
                  {sub.list && (
                    <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                      {sub.list.map((item: string, i: number) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {section.list && (
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  {section.list.map((item: string, i: number) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
