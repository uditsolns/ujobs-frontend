/**
 * FAQSection Component
 * Renders a list of FAQs with FAQPage structured data
 */

import React from 'react';
import { generateFAQSchema } from '@/lib/seo/schema';
import JsonLd from './JsonLd';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs, title }) => {
  if (!faqs || faqs.length === 0) return null;

  const schema = generateFAQSchema(faqs);

  return (
    <section className="py-16 bg-neutral-50 rounded-[32px] px-8 my-16 border border-neutral-100">
      <JsonLd schema={schema} />
      
      {title && (
        <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center tracking-tight">
          {title}
        </h2>
      )}

      <div className="grid gap-8 md:grid-cols-2">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-neutral-100 group"
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600 font-bold text-sm shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                Q
              </div>
              <div>
                <h3 className="font-bold text-lg text-neutral-900 mb-3 leading-tight group-hover:text-brand-600 transition-colors">
                  {faq.question}
                </h3>
                <p className="text-neutral-600 leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
