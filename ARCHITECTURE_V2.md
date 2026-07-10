# Ujobs India - World-Class Website Architecture (v2)

## 1. Vision & Strategy
Build a modern, high-performance, and SEO-optimized growth engine for Ujobs India.

### Core Objectives
- **Organic Growth**: Rank for 10,000+ job-related keywords.
- **Conversion**: High-intent CTAs for App Downloads (Candidates) and Lead Generation (Employers).
- **Brand Trust**: Premium UI, verified badges, and transparent job/candidate information.
- **Speed**: Core Web Vitals (LCP < 2.0s).

---

## 2. Technical Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS.
- **State Management**: React Context + Server Actions.
- **Internationalization**: `react-i18next` with dictionary-based routing (`/[locale]`).
- **Configuration**: Runtime `config.json` for dynamic settings without rebuilding.
- **Deployment**: Vercel/AWS with Edge Caching.

---

## 3. Advanced Folder Structure
```text
ujobs-frontend/
├── public/
│   ├── config.json           # Runtime settings (API URLs, Feature Flags)
│   ├── locales/              # Translation files (JSON)
│   └── images/               # Optimized assets
├── src/
│   ├── app/
│   │   ├── [locale]/         # Multilingual Root
│   │   │   ├── (public)/     # Public pages (Home, Jobs, Hire)
│   │   │   ├── (auth)/       # Employer Login/Profile
│   │   │   ├── jobs/         # Job Listing & Detail
│   │   │   ├── hire/         # Employer Section (Candidates)
│   │   │   └── seo/          # Programmatic SEO catch-all routes
│   │   ├── api/              # Internal Next.js API routes (Proxy/BFF)
│   │   └── layout.tsx        # Global Layout
│   ├── components/
│   │   ├── ui/               # Atomic Design System (Buttons, Cards, Inputs)
│   │   ├── layout/           # Header, Footer, Sidebar
│   │   ├── jobs/             # Job-specific components
│   │   ├── candidates/       # Candidate-specific components
│   │   └── seo/              # Schema.org & Meta components
│   ├── lib/
│   │   ├── api/              # Axios instance & Interceptors
│   │   ├── config-loader.ts  # Runtime config utility
│   │   ├── seo/              # Metadata & Schema generators
│   │   └── utils/            # Helper functions
│   ├── services/             # API Business Logic
│   └── types/                # Strict TypeScript Definitions
```

---

## 4. SEO Strategy (The Growth Engine)

### Programmatic SEO Routes
We will implement dynamic catch-all routes to handle thousands of combinations:
- `/[category]-jobs-in-[city]` (e.g., `/delivery-jobs-in-mumbai`)
- `/[category]-jobs` (e.g., `/telecaller-jobs`)
- `/jobs-in-[city]` (e.g., `/jobs-in-delhi`)

### Structured Data (JSON-LD)
- **JobPosting**: On every job detail page.
- **ItemList**: On every job listing page.
- **Organization**: On the homepage and about page.
- **Breadcrumbs**: For hierarchical navigation.

---

## 5. UI/UX Excellence (Benchmark: LinkedIn/Apna)

### Key UI Features
- **Modern Search**: Multi-input search (Job + Location) with auto-suggestions.
- **Skeleton Loading**: For better perceived performance.
- **Interactive Badges**: "Verified", "Hot Job", "High Salary".
- **Social Proof**: "Applied by 24 people today".
- **Mobile-First Navigation**: Sticky bottom bars for quick search and profile.

---

## 6. Security & Performance

### Security
- **Authentication**: JWT stored in HTTP-only cookies.
- **CSRF**: Header validation for all POST requests.
- **Sanitization**: `zod` validation for all user inputs.

### Performance
- **ISR**: Job detail pages revalidated every 10 mins.
- **Image Optimization**: `next/image` with WebP/AVIF.
- **Code Splitting**: Dynamic imports for heavy components.

---

## 7. Implementation Phases

1. **Phase 1: Global Foundation**
   - Runtime Config Loader.
   - Unified Multilingual Routing.
   - Design System (Tailwind + Framer Motion).

2. **Phase 2: The Job Search Engine**
   - Premium Job Listing with Sidebar Filters.
   - High-Conversion Job Detail Page.

3. **Phase 3: The Employer Portal**
   - "Hire Talent" Landing Page.
   - Candidate Browsing (Read-only for public).

4. **Phase 4: Programmatic SEO**
   - Dynamic Page Generator (Category x City).
   - Automated Sitemap & RSS Feed.

5. **Phase 5: Trust & Retention**
   - User Accounts (Employers).
   - App Download Funnels.
