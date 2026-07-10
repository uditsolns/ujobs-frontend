/**
 * Schema.org Structured Data Utilities
 * Generate JSON-LD structured data for SEO
 */

import { siteConfig } from '@/config/site';
import type { Job } from '@/types';
import { ROUTES } from '@/lib/constants/routes';

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(dict?: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.twitter,
      siteConfig.links.instagram,
      siteConfig.links.linkedin,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      contactType: dict?.contact?.info?.title || 'Customer Service',
      email: siteConfig.contact.email,
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Bengali', 'Kannada', 'Gujarati', 'Punjabi', 'Malayalam', 'Odia'],
    },
  };
}

/**
 * Generate WebSite schema
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/jobs/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate JobPosting schema
 */
export function generateJobPostingSchema(job: Job) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.job_title,
    description: job.job_description,
    datePosted: job.created_at,
    validThrough: (job as any).valid_until || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    employmentType: job.employment_type?.toUpperCase().replace(' ', '_') || 'FULL_TIME',
    identifier: {
      '@type': 'PropertyValue',
      name: 'Ujobs India',
      value: job.id.toString(),
    },
    hiringOrganization: {
      '@type': 'Organization',
      name: job.company_name || siteConfig.name,
      sameAs: siteConfig.url,
      logo: job.company_logo || `${siteConfig.url}/logo.png`,
    },
    
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location?.city || job.location?.name,
        addressRegion: job.location?.state,
        addressCountry: 'IN',
      },
    },
  };

  // Add salary if available
  if ((job as any).salary_from || (job as any).salary_to) {
    (schema as any).baseSalary = {
      '@type': 'MonetaryAmount',
      currency: 'INR',
      value: {
        '@type': 'QuantitativeValue',
        minValue: (job as any).salary_from,
        maxValue: (job as any).salary_to,
        unitText: 'MONTH',
      },
    };
  }

  return schema;
}

/**
 * Generate FAQPage schema for AEO/GEO
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate HowTo schema for applying to jobs (AEO/GEO)
 */
export function generateHowToApplySchema(dict: any) {
  const steps = dict.home.howItWorks.steps || [];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: dict.home.howItWorks.title || 'How to apply for a job on Ujobs India',
    description: dict.about.hero.description || 'Follow these steps to find and apply for verified jobs in India.',
    step: steps.map((step: any, index: number) => ({
      '@type': 'HowToStep',
      name: step.title,
      text: step.desc,
      url: index === 0 ? `${siteConfig.url}/jobs` : undefined,
    })),
  };
}

/**
 * Generate Breadcrumb schema
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

/**
 * Generate ItemList schema for job listings
 */
export function generateJobListSchema(jobs: Job[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: jobs.map((job, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'JobPosting',
        title: job.job_title,
        datePosted: job.created_at,
        url: `${siteConfig.url}${ROUTES.jobs.detail(job.id, job.job_title, job.location?.name)}`,
      },
    })),
  };
}

/**
 * Generate Person schema for candidate profiles (AEO/GEO)
 */
export function generatePersonSchema(candidate: any, dict?: any) {
  const category = candidate.work_types?.[0]?.name || candidate.category || 'Professional';
  const description = dict?.seo?.categoryInCityDescription
    ? dict.seo.categoryInCityDescription.replace('{{category}}', category).replace('{{city}}', candidate.city)
    : `Verified professional ${category} in ${candidate.city} with ${candidate.total_experience || 'some'} experience.`;

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: candidate.name,
    jobTitle: category,
    address: {
      '@type': 'PostalAddress',
      addressLocality: candidate.city,
      addressRegion: candidate.state,
      addressCountry: 'IN',
    },
    image: candidate.profile_photo ? `${siteConfig.url}${candidate.profile_photo}` : undefined,
    description,
    knowsAbout: candidate.skills?.map((s: any) => s.name) || [],
  };
}

/**
 * Generate SoftwareApplication schema for Mobile App (SEO/GEO)
 */
export function generateAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Ujobs India - Safe Hiring App',
    operatingSystem: 'ANDROID, IOS',
    applicationCategory: 'BusinessApplication, LifestyleApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '15420',
    },
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'INR',
    },
    downloadUrl: 'https://play.google.com/store/apps/details?id=com.ujobsindia',
  };
}

/**
 * Render JSON-LD script tag
 */
export function renderJsonLd(schema: any) {
  return {
    __html: JSON.stringify(schema),
  };
}
