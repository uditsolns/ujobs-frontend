# Ujobs India - Website Architecture
## World-Class Production-Grade Architecture

**Version:** 1.0  
**Last Updated:** April 21, 2026  
**Architect:** Senior Product Architect Team  

---

## 🎯 Executive Summary

This document defines the complete technical architecture for Ujobs India's official website - a growth-focused, SEO-optimized, high-performance platform designed to become India's leading job discovery destination.

**Primary Business Goals:**
- Drive 10M+ organic monthly visitors within 12 months
- Generate 500K+ app installs
- Capture 50K+ employer leads  
- Achieve #1 ranking for primary job keywords across top Indian cities
- Deliver LinkedIn-quality trust with Apna-level simplicity

---

## 🏗️ System Architecture Overview

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     USER LAYER                          │
│  (Candidates, Employers, Search Engines, Social Media)  │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                   CDN LAYER                             │
│  (Cloudflare/AWS CloudFront - Edge Caching, DDoS)      │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              NEXT.JS APPLICATION                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │   SSR/SSG/ISR Pages (App Router)                 │  │
│  │   - Homepage                                     │  │
│  │   - Job Listings (Dynamic)                       │  │
│  │   - Job Details (SSG + ISR)                      │  │
│  │   - SEO Pages (SSG: Category × City × Intent)    │  │
│  │   - Employer Pages                               │  │
│  │   - Legal/Info Pages                             │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │   API Route Handlers                             │  │
│  │   - Lead Submission                              │  │
│  │   - Search Autocomplete                          │  │
│  │   - Analytics Events                             │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│           BACKEND API LAYER (Existing)                  │
│  https://ujobsindia.com/aayusha-backend/public/api/v1   │
│  ┌──────────────────────────────────────────────────┐  │
│  │   Web-Specific Controllers                       │  │
│  │   - PublicWebController (jobs, search, banners)  │  │
│  │   - PublicLeadController (employer leads)        │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │   Shared Controllers                             │  │
│  │   - WorkTypeController (categories)              │  │
│  │   - LocationController (cities/areas)            │  │
│  │   - BannerController                             │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              DATABASE LAYER                             │
│  MySQL: ayushya_live16042026                            │
│  - jobs, work_types, locations, users, banners          │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Frontend Folder Structure (Production-Grade)

```
ujobs-frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout with providers
│   │   ├── page.tsx                  # Homepage (SSR)
│   │   ├── not-found.tsx             # 404 page
│   │   ├── error.tsx                 # Error boundary
│   │   ├── loading.tsx               # Loading UI
│   │   │
│   │   ├── jobs/                     # Job discovery section
│   │   │   ├── page.tsx              # All jobs listing (SSR)
│   │   │   ├── [id]/                 # Job detail pages
│   │   │   │   ├── page.tsx          # SSG + ISR (revalidate: 300)
│   │   │   │   └── opengraph-image.tsx
│   │   │   └── search/
│   │   │       └── page.tsx          # Search results (SSR)
│   │   │
│   │   ├── [category]/               # Category landing pages
│   │   │   ├── page.tsx              # SSG (e.g., /driver-jobs)
│   │   │   └── [city]/               # Category + City pages
│   │   │       └── page.tsx          # SSG (e.g., /driver-jobs/delhi)
│   │   │
│   │   ├── [city]/                   # City landing pages
│   │   │   └── page.tsx              # SSG (e.g., /delhi-jobs)
│   │   │
│   │   ├── hire/                     # Employer section
│   │   │   ├── page.tsx              # Employer landing page
│   │   │   ├── pricing/
│   │   │   │   └── page.tsx
│   │   │   └── contact/
│   │   │       └── page.tsx
│   │   │
│   │   ├── download/                 # App download pages
│   │   │   ├── page.tsx
│   │   │   └── [platform]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx
│   │   │
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   │
│   │   ├── legal/                    # Legal pages
│   │   │   ├── privacy/
│   │   │   │   └── page.tsx
│   │   │   ├── terms/
│   │   │   │   └── page.tsx
│   │   │   └── disclaimer/
│   │   │       └── page.tsx
│   │   │
│   │   ├── sitemap.xml/              # Dynamic sitemap
│   │   │   └── route.ts
│   │   │
│   │   ├── robots.txt/               # Robots.txt
│   │   │   └── route.ts
│   │   │
│   │   └── api/                      # API routes (Next.js)
│   │       ├── lead/
│   │       │   └── route.ts          # POST employer lead
│   │       ├── search/
│   │       │   └── route.ts          # Search autocomplete
│   │       └── revalidate/
│   │           └── route.ts          # On-demand ISR
│   │
│   ├── components/                   # React components
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── Breadcrumbs.tsx
│   │   │
│   │   ├── home/                     # Homepage sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SearchBox.tsx
│   │   │   ├── CategoryGrid.tsx
│   │   │   ├── FeaturedJobs.tsx
│   │   │   ├── TopCities.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── AppDownloadCTA.tsx
│   │   │   └── EmployerCTA.tsx
│   │   │
│   │   ├── jobs/                     # Job-related components
│   │   │   ├── JobCard.tsx
│   │   │   ├── JobList.tsx
│   │   │   ├── JobDetail.tsx
│   │   │   ├── JobFilters.tsx
│   │   │   ├── JobSearch.tsx
│   │   │   ├── ApplyButton.tsx
│   │   │   └── RelatedJobs.tsx
│   │   │
│   │   ├── employer/                 # Employer components
│   │   │   ├── LeadForm.tsx
│   │   │   ├── PricingCard.tsx
│   │   │   ├── BenefitsGrid.tsx
│   │   │   └── CTASection.tsx
│   │   │
│   │   ├── seo/                      # SEO-specific components
│   │   │   ├── SchemaOrg.tsx
│   │   │   ├── BreadcrumbSchema.tsx
│   │   │   ├── JobPostingSchema.tsx
│   │   │   └── OrganizationSchema.tsx
│   │   │
│   │   └── ui/                       # Design system components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       ├── Modal.tsx
│   │       ├── Skeleton.tsx
│   │       ├── Toast.tsx
│   │       ├── Dropdown.tsx
│   │       └── Pagination.tsx
│   │
│   ├── lib/                          # Core utilities
│   │   ├── api/                      # API clients
│   │   │   ├── client.ts             # Axios instance
│   │   │   ├── endpoints.ts          # API endpoints
│   │   │   └── types.ts              # API response types
│   │   │
│   │   ├── seo/                      # SEO utilities
│   │   │   ├── metadata.ts           # Metadata generators
│   │   │   ├── schema.ts             # Schema.org generators
│   │   │   ├── sitemap.ts            # Sitemap generator
│   │   │   └── canonical.ts          # Canonical URL logic
│   │   │
│   │   ├── utils/                    # Helper functions
│   │   │   ├── cn.ts                 # Class name merger
│   │   │   ├── date.ts               # Date formatters
│   │   │   ├── string.ts             # String utilities
│   │   │   ├── validation.ts         # Input validators
│   │   │   └── url.ts                # URL utilities
│   │   │
│   │   ├── constants/                # Constants
│   │   │   ├── routes.ts             # Route definitions
│   │   │   ├── seo.ts                # SEO constants
│   │   │   ├── cities.ts             # Priority cities
│   │   │   └── categories.ts         # Job categories
│   │   │
│   │   └── hooks/                    # Custom React hooks
│   │       ├── useDebounce.ts
│   │       ├── useIntersection.ts
│   │       ├── useMediaQuery.ts
│   │       └── useLocalStorage.ts
│   │
│   ├── services/                     # Business logic layer
│   │   ├── jobs.service.ts           # Job operations
│   │   ├── categories.service.ts     # Category operations
│   │   ├── locations.service.ts      # Location operations
│   │   ├── leads.service.ts          # Lead submission
│   │   ├── analytics.service.ts      # Analytics tracking
│   │   └── cache.service.ts          # Cache management
│   │
│   ├── types/                        # TypeScript types
│   │   ├── index.ts                  # Re-exports
│   │   ├── job.ts                    # Job types
│   │   ├── category.ts               # Category types
│   │   ├── location.ts               # Location types
│   │   ├── user.ts                   # User types
│   │   └── api.ts                    # API response types
│   │
│   ├── config/                       # Configuration
│   │   ├── site.ts                   # Site configuration
│   │   ├── api.ts                    # API configuration
│   │   └── features.ts               # Feature flags
│   │
│   └── styles/                       # Global styles
│       ├── globals.css               # Global CSS + Tailwind
│       └── fonts.ts                  # Font definitions
│
├── public/                           # Static assets
│   ├── images/
│   │   ├── logo.svg
│   │   ├── og-image.jpg
│   │   ├── icons/
│   │   └── placeholders/
│   ├── favicon.ico
│   └── manifest.json
│
├── .env.local                        # Environment variables
├── .env.production
├── next.config.js                    # Next.js configuration
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json
├── .eslintrc.json
├── .prettierrc
└── ARCHITECTURE.md                   # This document
```

---

## 🔧 Technology Stack

### Frontend Core
- **Next.js 15+** (App Router, Server Components)
- **React 18+** (Server & Client Components)
- **TypeScript 5+** (Strict mode)

### Styling & UI
- **Tailwind CSS 4+** (JIT mode)
- **CSS Variables** (Theme system)
- **Framer Motion** (Animations)
- **Lucide React** (Icons)

### Data & State
- **Axios** (HTTP client)
- **Zod** (Schema validation)
- **React Hook Form** (Forms)
- **SWR/React Query** (Client-side cache - optional)

### SEO & Performance
- **Next.js Metadata API** (Meta tags)
- **next-sitemap** (Sitemap generation)
- **Schema.org** (Structured data)
- **Sharp** (Image optimization)

### Development
- **ESLint** (Code linting)
- **Prettier** (Code formatting)
- **Husky** (Git hooks)
- **Commitlint** (Commit standards)

### Deployment
- **Vercel** (Primary - recommended)
- **AWS Amplify** (Alternative)
- **Cloudflare** (CDN + DDoS protection)

---

## 🎨 Design System

### Brand Colors
```typescript
const colors = {
  brand: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',  // Primary
    600: '#0284c7',  // Primary Dark
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    // ... rest of gray scale
  }
}
```

### Typography
```typescript
const typography = {
  fonts: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['Poppins', 'sans-serif'],
  },
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
  }
}
```

### Component Variants
- **Button:** primary, secondary, outline, ghost, danger
- **Card:** default, elevated, bordered, interactive
- **Badge:** default, success, warning, error, info

---

## 🚀 SEO Strategy & Implementation

### Programmatic SEO Architecture

**Pattern:** `{category}-jobs-in-{city}`

**Scale Target:** 10,000+ indexed pages within 6 months

**Implementation:**

```typescript
// Generation logic
const categories = ['driver', 'nurse', 'telecaller', 'delivery', ...]; // 50+
const cities = ['delhi', 'mumbai', 'bangalore', 'pune', ...]; // 200+
const intents = ['jobs', 'vacancy', 'hiring', 'recruitment'];

// Generates: 50 × 200 × 4 = 40,000 potential URLs
```

### Static Generation Strategy

```typescript
// app/[category]/[city]/page.tsx
export async function generateStaticParams() {
  const priorityPairs = [
    { category: 'driver', city: 'delhi' },
    { category: 'nurse', city: 'mumbai' },
    // Top 500 high-traffic combinations
  ];
  
  return priorityPairs;
}

export const revalidate = 3600; // 1 hour ISR
```

### Metadata Template

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const { category, city } = params;
  
  return {
    title: `${capitalize(category)} Jobs in ${capitalize(city)} | Ujobs India`,
    description: `Find verified ${category} jobs in ${city}. Apply directly through our app. 10,000+ jobs. Quick hiring. Trusted by top companies.`,
    keywords: [
      `${category} jobs ${city}`,
      `${category} vacancy ${city}`,
      `${category} hiring ${city}`,
      // ... LSI keywords
    ],
    openGraph: {
      title: `${capitalize(category)} Jobs in ${capitalize(city)}`,
      description: `Browse ${category} jobs in ${city}. Apply easily via Ujobs India app.`,
      images: [`/og/${category}-${city}.jpg`],
    },
    alternates: {
      canonical: `https://ujobsindia.com/${category}-jobs/${city}`,
    },
  };
}
```

### Schema.org Implementation

```typescript
// JobPosting Schema for job details
const jobSchema = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": job.title,
  "description": job.description,
  "datePosted": job.created_at,
  "validThrough": job.valid_until,
  "employmentType": job.employment_type,
  "hiringOrganization": {
    "@type": "Organization",
    "name": job.company_name,
    "sameAs": "https://ujobsindia.com"
  },
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": job.city,
      "addressRegion": job.state,
      "addressCountry": "IN"
    }
  },
  "baseSalary": {
    "@type": "MonetaryAmount",
    "currency": "INR",
    "value": {
      "@type": "QuantitativeValue",
      "value": job.salary,
      "unitText": "MONTH"
    }
  }
};
```

---

## ⚡ Performance Optimization

### Core Web Vitals Targets
- **LCP:** < 2.0s (target: 1.5s)
- **FID/INP:** < 100ms (target: 50ms)
- **CLS:** < 0.1 (target: 0.05)

### Strategies

**1. Static Generation**
```typescript
// Pre-render top 500 pages at build time
// Use ISR for remaining pages with revalidate: 3600
```

**2. Image Optimization**
```typescript
<Image
  src={job.image}
  alt={job.title}
  width={400}
  height={300}
  loading="lazy"
  placeholder="blur"
  quality={85}
/>
```

**3. Code Splitting**
```typescript
// Dynamic imports for heavy components
const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <Skeleton />,
  ssr: false
});
```

**4. Edge Caching**
```typescript
// next.config.js
export const config = {
  headers: [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
        }
      ]
    }
  ]
};
```

**5. Font Optimization**
```typescript
// app/layout.tsx
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true
});
```

---

## 🔒 Security Implementation

### Security Headers

```typescript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  },
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self' data:;
      connect-src 'self' https://ujobsindia.com https://www.google-analytics.com;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];
```

### Input Validation (Zod)

```typescript
// lib/validations/lead.ts
import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2).max(100),
  mobile_no: z.string().regex(/^[6-9]\d{9}$/),
  company_name: z.string().min(2).max(200).optional(),
  requirement: z.string().max(500).optional(),
});
```

### Rate Limiting

```typescript
// app/api/lead/route.ts
import rateLimit from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function POST(request: Request) {
  try {
    await limiter.check(request, 10, 'CACHE_TOKEN'); // 10 requests per minute
    // ... handle request
  } catch {
    return new Response('Too Many Requests', { status: 429 });
  }
}
```

### Environment Variables Security

```bash
# .env.local (never commit)
NEXT_PUBLIC_API_URL=https://ujobsindia.com/aayusha-backend/public/api/v1
NEXT_PUBLIC_SITE_URL=https://ujobsindia.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Server-only (never exposed to client)
REVALIDATE_SECRET=xxxxxxxxxxxxx
INTERNAL_API_KEY=xxxxxxxxxxxxx
```

---

## 📊 Analytics & Tracking

### Events to Track

**User Journey**
- Page views
- Job search queries
- Job detail views
- Apply button clicks
- App download clicks
- Lead form submissions

**Business Metrics**
- Top searched keywords
- Top performing cities
- Top performing categories
- Conversion rate (view → apply)
- Time on page
- Bounce rate

### Implementation (Google Analytics 4)

```typescript
// lib/analytics.ts
export const trackEvent = (
  action: string,
  category: string,
  label: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Usage
trackEvent('job_view', 'jobs', job.title, job.id);
trackEvent('app_download_click', 'conversions', 'android');
trackEvent('lead_submit', 'conversions', 'employer');
```

---

## 🔄 Data Flow

### Job Listing Page Flow

```
User Request → Next.js Server
  ↓
Server Component fetches jobs from API
  ↓
Render HTML with data
  ↓
Send to Client (Fast First Paint)
  ↓
Hydrate Client Components
  ↓
User interacts (filters, search)
  ↓
Client-side fetch → Update UI
```

### Job Detail Page Flow (ISR)

```
User Request → CDN Check
  ↓ (Cache Miss)
Next.js checks if page exists in build
  ↓ (Not found)
Fetch job data from API
  ↓
Generate static HTML
  ↓
Cache for 1 hour
  ↓
Serve to user
  ↓ (Next request within 1 hour)
Serve from cache (instant)
```

---

## 🚦 Deployment Strategy

### Environment Setup

**Development**
- Local: `npm run dev`
- API: Production API (read-only)
- Hot reload enabled

**Staging**
- Vercel preview branch
- API: Production API
- Testing ground for stakeholders

**Production**
- Vercel production
- Custom domain: ujobsindia.com
- CDN: Cloudflare
- Monitoring: Vercel Analytics + Google Analytics

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID}}
          vercel-project-id: ${{ secrets.PROJECT_ID}}
          vercel-args: '--prod'
```

---

## 📈 Growth Roadmap

### Phase 1: Foundation (Weeks 1-2)
- ✅ Architecture design
- ✅ Project setup
- ✅ Design system
- ✅ Core components
- ✅ API integration

### Phase 2: Core Pages (Weeks 3-4)
- Homepage
- Job listing
- Job detail
- Basic SEO setup

### Phase 3: SEO Engine (Weeks 5-6)
- Programmatic pages
- Sitemap generation
- Schema implementation
- Meta optimization

### Phase 4: Conversion (Weeks 7-8)
- Employer pages
- Lead forms
- App download pages
- CTAs optimization

### Phase 5: Polish (Weeks 9-10)
- Performance optimization
- Security hardening
- Analytics setup
- User testing

### Phase 6: Launch (Week 11)
- Production deployment
- Monitoring setup
- Marketing coordination
- Soft launch

### Phase 7: Scale (Week 12+)
- Monitor metrics
- A/B testing
- Continuous optimization
- Feature expansion

---

## 🎯 Success Metrics

### Technical KPIs
- **Lighthouse Score:** 95+ (all metrics)
- **Core Web Vitals:** All green
- **SEO Score:** 100
- **Accessibility:** AAA compliance
- **Uptime:** 99.9%

### Business KPIs
- **Organic Traffic:** 100K/month (Month 3), 1M/month (Month 12)
- **App Installs:** 10K/month (Month 3), 50K/month (Month 12)
- **Employer Leads:** 500/month (Month 3), 5K/month (Month 12)
- **Job Applications:** 50K/month (Month 3), 500K/month (Month 12)

### SEO KPIs
- **Indexed Pages:** 1K (Month 1), 10K (Month 6)
- **Top 3 Rankings:** 100 keywords (Month 3), 1000 keywords (Month 12)
- **Domain Authority:** 40+ (Month 6), 60+ (Month 12)

---

## 🔍 Monitoring & Logging

### Tools
- **Vercel Analytics** - Performance monitoring
- **Google Analytics 4** - User behavior
- **Google Search Console** - SEO health
- **Sentry** - Error tracking
- **LogRocket** - Session replay (optional)

### Alerts
- 5xx errors
- API failures
- Performance degradation
- Security incidents

---

## 🛡️ Risk Mitigation

### Technical Risks
- **API downtime:** Implement graceful degradation
- **High traffic:** CDN + ISR + caching
- **Security breach:** Regular audits + monitoring

### Business Risks
- **SEO penalty:** Follow Google guidelines strictly
- **Competition:** Continuous innovation
- **Quality:** Regular content audits

---

## 📚 Documentation Standards

### Code Comments
```typescript
/**
 * Fetches paginated jobs from the API
 * @param page - Page number (1-indexed)
 * @param filters - Optional filters (category, city)
 * @returns Promise<PaginatedResponse<Job>>
 * @throws Error if API request fails
 */
```

### Component Documentation
- Props documentation
- Usage examples
- Visual regression tests

---

## 🎓 Best Practices

1. **Mobile-First:** Design for mobile, enhance for desktop
2. **Progressive Enhancement:** Core functionality works without JS
3. **Accessibility:** WCAG 2.1 AAA compliance
4. **SEO-First:** Every decision considers SEO impact
5. **Performance Budget:** Monitor bundle size continuously
6. **Security-First:** Never trust client input
7. **Code Quality:** 100% TypeScript, strict linting
8. **Testing:** Unit + Integration + E2E
9. **Documentation:** Code is documentation
10. **User-Centric:** Every feature serves user needs

---

## 🔗 Key Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com
- **TypeScript:** https://www.typescriptlang.org
- **Schema.org:** https://schema.org
- **Web.dev:** https://web.dev (Performance guides)

---

## ✅ Pre-Launch Checklist

- [ ] All pages render correctly on mobile
- [ ] All forms validated and sanitized
- [ ] All images optimized
- [ ] All links working
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Analytics integrated
- [ ] Error tracking setup
- [ ] Security headers active
- [ ] Performance targets met
- [ ] Accessibility audit passed
- [ ] SEO audit passed
- [ ] Legal pages complete
- [ ] SSL certificate active
- [ ] Domain configured
- [ ] CDN configured
- [ ] Monitoring active

---

**This architecture is designed to scale to 10M+ users while maintaining world-class performance, security, and SEO.**

**Next Step:** Implement the folder structure and initialize the project with production-grade configuration.
