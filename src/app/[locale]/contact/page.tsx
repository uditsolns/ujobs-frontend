import { Metadata } from 'next';
import { Locale } from '@/i18n';
import { getDictionary } from '@/i18n';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import FAQAccordion from '@/components/shared/FAQAccordion';
import { generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo/schema';
import JsonLd from '@/components/seo/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  return {
    title: dict.contact.seo.title,
    description: dict.contact.seo.description,
    keywords: dict.contact.seo.keywords,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: dict.common?.home || 'Home', url: `/${locale}` },
    { name: dict.footer?.contactUs || 'Contact Us', url: `/${locale}/contact` },
  ]);

  const faqSchema = dict.home?.faq?.items ? generateFAQSchema(dict.home.faq.items.slice(0, 4)) : null;

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: dict.contact.info.email,
      content: 'support@ujobsindia.com',
      link: 'mailto:support@ujobsindia.com',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: dict.contact.info.call,
      content: '+91-7678040051',
      link: 'tel:+917678040051',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: dict.contact.info.visit,
      content: dict.contact.info.address,
      link: null,
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: dict.contact.info.whatsapp,
      content: '+91-7678040051',
      link: 'https://wa.me/917678040051',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <JsonLd schema={breadcrumbSchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-600 pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-6" dangerouslySetInnerHTML={{ __html: dict.contact.hero.title }} />
          <p className="text-xl text-brand-100 max-w-2xl mx-auto" dangerouslySetInnerHTML={{ __html: dict.contact.hero.description }} />
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-center"
              >
                <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {info.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-brand-600 hover:text-brand-700 hover:underline"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-gray-600">{info.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" dangerouslySetInnerHTML={{ __html: dict.contact.form.title }} />
            <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: dict.contact.form.description }} />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <ContactForm locale={locale} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {dict.home.faq.title}
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <FAQAccordion faqs={dict.home.faq.items.slice(0, 4)} />
          </div>
        </div>
      </section>
    </div>
  );
}
