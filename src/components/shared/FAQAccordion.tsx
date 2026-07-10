/**
 * FAQ Accordion Component
 * Frequently asked questions with expandable answers
 */

'use client';

import React, { useState, useMemo } from 'react';
import Icon from '@/components/ui/Icon';
import Link from 'next/link';

interface FAQ {
  question: string;
  answer: string;
  category?: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  defaultOpen?: number;
  className?: string;
  showSearch?: boolean;
  showContactCard?: boolean;
}

export default function FAQAccordion({ 
  faqs, 
  defaultOpen, 
  className = '', 
  showSearch = true,
  showContactCard = true
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen ?? null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | 'All'>('All');

  const categories = useMemo(() => {
    const cats = new Set(faqs.map(f => f.category).filter(Boolean));
    return ['All', ...Array.from(cats)] as string[];
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [faqs, searchQuery, activeCategory]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Search & Categories */}
      {showSearch && (
        <div className="space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icon name="search" size="sm" className="text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Search for answers..."
              className="block w-full pl-11 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                    activeCategory === cat
                      ? 'bg-neutral-900 text-white shadow-lg'
                      : 'bg-white text-neutral-600 border border-neutral-200 hover:border-brand-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FAQ List */}
      <div className="space-y-3 max-w-3xl mx-auto">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'border-brand-200 shadow-xl shadow-brand-500/[0.03] ring-1 ring-brand-100' 
                    : 'border-neutral-100 bg-white hover:border-brand-200 hover:shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full flex items-center justify-between p-6 text-left transition-colors ${
                    isOpen ? 'bg-brand-50/20' : 'bg-white hover:bg-neutral-50/50'
                  }`}
                >
                  <h3 className={`font-bold pr-4 text-base transition-colors ${
                    isOpen ? 'text-brand-700' : 'text-neutral-900'
                  }`}>
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    isOpen ? 'bg-brand-500 text-white rotate-180' : 'bg-neutral-100 text-neutral-500'
                  }`}>
                    <Icon
                      name="chevronDown"
                      size="sm"
                      className="w-4 h-4"
                    />
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pt-2">
                    <div 
                      className="text-neutral-600 leading-relaxed text-[15px] prose prose-brand prose-sm"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                    {faq.category && (
                      <div className="mt-4 pt-4 border-t border-neutral-50 flex items-center gap-2">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Category:</span>
                        <span className="text-[10px] font-black text-brand-600 uppercase tracking-widest">{faq.category}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-20 bg-neutral-50 rounded-[2rem] border border-dashed border-neutral-200">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
              <Icon name="search" size="lg" className="text-neutral-300" />
            </div>
            <h3 className="text-neutral-900 font-bold">No results found</h3>
            <p className="text-neutral-500 text-sm mt-1">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>

      {/* Still have questions? */}
      {showContactCard && (
        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-gradient-to-br from-brand-50 to-indigo-50/30 border border-brand-100 rounded-[2.5rem] p-8 md:p-10 text-center relative overflow-hidden group shadow-soft">
            {/* Background decorative bubbles */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full -mr-12 -mt-12 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/5 rounded-full -ml-12 -mb-12 pointer-events-none" />

            <div className="relative z-10">
              {/* Friendly Chat Support Icon Stack */}
              <div className="flex justify-center -space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center border-2 border-white shadow-sm">
                  <Icon name="message" size="sm" />
                </div>
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center border-2 border-white shadow-sm">
                  <Icon name="headphones" size="sm" />
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-display font-black text-neutral-900 mb-2">Still have questions?</h3>
              <p className="text-neutral-600 mb-8 max-w-md mx-auto text-sm font-medium">Can't find the answer you're looking for? Our dedicated team is here to help you 24/7 with zero hassle.</p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="inline-flex items-center px-8 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-black rounded-xl text-xs uppercase tracking-widest transition-all shadow-brand hover:shadow-elevated active:scale-95">
                  <Icon name="mail" size="sm" className="mr-2" />
                  Contact Support
                </Link>
                <a href="tel:+918448443934" className="inline-flex items-center px-8 py-3.5 bg-white hover:bg-neutral-50 text-neutral-900 font-black rounded-xl text-xs uppercase tracking-widest transition-all border-2 border-neutral-900 active:scale-95">
                  <Icon name="phone" size="sm" className="mr-2" />
                  Call Our Helpline
                </a>
              </div>

              {/* Response Time Badge */}
              <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1 bg-brand-600/10 text-brand-700 rounded-full text-[10px] font-black uppercase tracking-wider">
                <Icon name="clock" size="sm" />
                Average response time: &lt; 15 mins
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Pre-defined FAQ sets - Enhanced with categories
export const jobSeekerFAQs: FAQ[] = [
  {
    category: 'Application Process',
    question: 'How do I apply for jobs on Ujobs India?',
    answer: 'Applying is easy! 1. Download the app, 2. Complete your profile (no resume needed!), 3. Search for jobs in your city, 4. Click <strong>"Quick Apply"</strong>. Employers will contact you directly via call or WhatsApp.'
  },
  {
    category: 'Payments',
    question: 'Is Ujobs India free for job seekers?',
    answer: '<strong>Yes, 100% Free.</strong> We never charge job seekers for applications, profile creation, or interviews. If someone asks for money representing Ujobs, please report it immediately.'
  },
  {
    category: 'Trust & Safety',
    question: 'How are job postings checked?',
    answer: 'Every employer on our platform undergoes a strict <strong>KYC validation</strong> process. We confirm their GST/PAN details and office location to ensure all job postings are genuine and safe.'
  },
  {
    category: 'Account',
    question: 'Can I search for jobs in my local area?',
    answer: 'Yes! Our smart location filter allows you to find jobs within <strong>5-10km of your home</strong>. This helps you save on travel time and costs.'
  },
  {
    category: 'Application Process',
    question: 'What documents do I need to apply?',
    answer: 'Most blue-collar jobs only require an <strong>Aadhaar Card</strong> and basic contact details. Some specialized roles might ask for a driving license or bank account details for salary transfers.'
  }
];

export const employerFAQs: FAQ[] = [
  {
    category: 'Pricing',
    question: 'How much does it cost to post a job?',
    answer: 'We offer flexible plans starting from a free trial to premium bulk hiring packages. Contact our sales team for a customized quote tailored to your business size.'
  },
  {
    category: 'Hiring',
    question: 'How do I find suitable candidates?',
    answer: 'Once you post a job, our <strong>AI Matching Algorithm</strong> notifies the most relevant candidates in your area. You can also browse our database of 1M+ registered workers.'
  },
  {
    category: 'Trust & Safety',
    question: 'Are candidates pre-screened?',
    answer: 'Yes, we perform <strong>Aadhaar-based identity confirmation</strong> for all candidates. For premium plans, we also facilitate profile vetting and previous employment references.'
  },
  {
    category: 'Support',
    question: 'What support do you provide?',
    answer: 'Employers get a dedicated <strong>Account Manager</strong> and 24/7 technical support. We also provide assistance in drafting job descriptions to attract the best talent.'
  }
];

