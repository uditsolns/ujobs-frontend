# Ujobs India Website - Page Structure

```
📁 Ujobs India Website
│
├── 🏠 Homepage (/)
│   └── Features: Hero, Categories, Cities, Stats, App Download
│
├── 💼 Jobs Section
│   │
│   ├── 📋 Jobs Listing (/jobs)
│   │   ├── Search functionality
│   │   ├── Category filter (from API)
│   │   ├── Location filter (from API)
│   │   ├── Pagination
│   │   └── JobCard grid
│   │
│   └── 📄 Job Detail (/jobs/[id])
│       ├── Full job information
│       ├── Company details
│       ├── Apply CTA
│       ├── Related jobs
│       └── Schema.org JobPosting
│
├── 🏷️ Category Pages (SEO)
│   │
│   ├── 📑 Category Landing (/[category]-jobs)
│   │   ├── Examples:
│   │   │   • /driver-jobs
│   │   │   • /nurse-jobs
│   │   │   • /telecaller-jobs
│   │   │   • /delivery-boy-jobs
│   │   │   └── (25 total)
│   │   ├── Jobs for this category
│   │   ├── Links to all cities
│   │   └── SEO content
│   │
│   └── 🎯 Category × City (/[category]-jobs/[city])
│       ├── Examples:
│       │   • /driver-jobs/delhi
│       │   • /nurse-jobs/mumbai
│       │   • /telecaller-jobs/bangalore
│       │   └── (80+ combinations, scalable to 10,000+)
│       ├── Jobs for category in city
│       ├── Related links (other cities, other categories)
│       └── Comprehensive SEO content
│
└── 📍 City Pages (SEO)
    │
    └── 📑 City Landing (/[city]-jobs)
        ├── Examples:
        │   • /delhi-jobs
        │   • /mumbai-jobs
        │   • /bangalore-jobs
        │   └── (20 priority cities)
        ├── Jobs in this city
        ├── Links to all categories
        └── SEO content
```

---

## URL Structure Examples

### Jobs Listing & Details
```
/jobs                           → All jobs with filters
/jobs/123                       → Specific job detail
/jobs/456                       → Another job detail
```

### Category Pages (25 categories)
```
/driver-jobs                    → All driver jobs in India
/nurse-jobs                     → All nurse jobs in India
/telecaller-jobs                → All telecaller jobs in India
/delivery-boy-jobs              → All delivery jobs in India
/sales-executive-jobs           → All sales jobs in India
... (20 more categories)
```

### City Pages (20 priority cities)
```
/delhi-jobs                     → All jobs in Delhi
/mumbai-jobs                    → All jobs in Mumbai
/bangalore-jobs                 → All jobs in Bangalore
/pune-jobs                      → All jobs in Pune
/hyderabad-jobs                 → All jobs in Hyderabad
... (15 more cities)
```

### Category × City Pages (Programmatic SEO - 80 to 10,000+ pages)
```
/driver-jobs/delhi              → Driver jobs in Delhi
/driver-jobs/mumbai             → Driver jobs in Mumbai
/nurse-jobs/delhi               → Nurse jobs in Delhi
/nurse-jobs/mumbai              → Nurse jobs in Mumbai
/telecaller-jobs/bangalore      → Telecaller jobs in Bangalore
/delivery-boy-jobs/pune         → Delivery jobs in Pune
... (scalable to thousands)
```

---

## SEO Page Generation Strategy

### Tier 1 (Pre-generated at build)
- **Top 10 categories** × **Top 8 cities** = **80 pages**
- Examples: Driver/Delhi, Nurse/Mumbai, etc.
- Build time: ~10 seconds
- Always fresh, cached

### Tier 2 (Generated on-demand via ISR)
- **All 25 categories** × **All 20 cities** = **500 pages**
- Generated when first requested
- Cached after first generation
- Revalidated every hour

### Tier 3 (Future scaling)
- **50+ categories** × **200+ cities** = **10,000+ pages**
- ISR handles automatically
- No build time impact
- Infinite scalability

---

## Data Flow Per Page Type

### 1. Jobs Listing (/jobs)
```
User Action → Client Component
    ↓
State Update (filters, search, page)
    ↓
API Call (JobsService.getJobs)
    ↓
Render JobCard components
```

### 2. Job Detail (/jobs/[id])
```
URL Params (job ID) → Server Component
    ↓
API Call (JobsService.getJobById)
    ↓
Generate Metadata (SEO)
    ↓
Generate Schema.org (JobPosting)
    ↓
Fetch Related Jobs
    ↓
Render Page
```

### 3. Category Page (/[category]-jobs)
```
URL Params (category slug) → Server Component
    ↓
Lookup in JOB_CATEGORIES constant
    ↓
API Call (CategoriesService.getCategories)
    ↓
API Call (JobsService.getJobsByCategory)
    ↓
Generate Metadata
    ↓
Render Jobs + City Links
```

### 4. City Page (/[city]-jobs)
```
URL Params (city slug) → Server Component
    ↓
Lookup in PRIORITY_CITIES constant
    ↓
API Call (LocationsService.getLocations)
    ↓
API Call (JobsService.getJobsByCity)
    ↓
Generate Metadata
    ↓
Render Jobs + Category Links
```

### 5. Category × City Page (/[category]-jobs/[city])
```
URL Params (category + city) → Server Component
    ↓
Lookup in constants (JOB_CATEGORIES + PRIORITY_CITIES)
    ↓
API Calls (parallel):
    - CategoriesService.getCategories
    - LocationsService.getLocations
    ↓
API Call (JobsService.getJobsByCategoryAndCity)
    ↓
Generate Metadata
    ↓
Generate Schema.org
    ↓
Render Jobs + Related Links
```

---

## Components Hierarchy

```
Page Components
│
├── Layout Components
│   ├── Header (navigation, mobile menu)
│   ├── Footer (links, social, legal)
│   └── Container (responsive wrapper)
│
├── Job Components
│   ├── JobCard (job display)
│   │   ├── Card (base UI)
│   │   ├── Badge (status, type)
│   │   └── Button (CTA)
│   │
│   ├── JobFilters (search controls)
│   │   ├── Input (search)
│   │   └── Select (dropdowns)
│   │
│   └── JobSkeleton (loading state)
│       └── Skeleton (base UI)
│
└── UI Components
    ├── Button (all CTAs)
    ├── Card (containers)
    ├── Badge (labels)
    ├── Input (text fields)
    ├── Select (dropdowns)
    ├── Pagination (page navigation)
    └── Skeleton (loading states)
```

---

## API Integration Map

### Jobs Service (`services/jobs.service.ts`)
```
getJobs()                       → GET /web/jobs
getJobById(id)                  → GET /web/jobs/:id
searchJobs(query)               → GET /web/jobs/search?q={query}
getJobsByCategory(categoryId)   → GET /web/jobs/search?work_type_id={id}
getJobsByCity(cityId)           → GET /web/jobs/search?location_id={id}
getJobsByCategoryAndCity()      → GET /web/jobs/search?work_type_id={id}&location_id={id}
```

### Categories Service (`services/categories.service.ts`)
```
getCategories()                 → GET /work-types
getCategoryById(id)             → GET /work-types/:id
```

### Locations Service (`services/locations.service.ts`)
```
getLocations()                  → GET /locations
getLocationById(id)             → GET /locations/:id
```

---

## Static Assets Map

### Constants
```
lib/constants/
├── categories.ts      → 25 job categories
├── cities.ts          → 20 priority cities
├── routes.ts          → All route definitions
└── seo.ts             → SEO configuration
```

### Types
```
types/
├── index.ts           → Shared types
├── job.ts             → Job interface
└── api.ts             → API response types
```

### Utils
```
lib/utils/
├── string.ts          → Text formatting
├── date.ts            → Date formatting
└── cn.ts              → Class name utilities
```

---

## Metadata & SEO Map

### Dynamic Metadata Generation
```typescript
// Category Page
{
  title: "Driver Jobs in India | Ujobs India",
  description: "Find verified driver jobs across India...",
  keywords: ["driver jobs", "driver vacancies", "driving jobs"],
  openGraph: {...},
  twitter: {...}
}

// City Page
{
  title: "Jobs in Delhi, Delhi | Ujobs India",
  description: "Find verified jobs in Delhi...",
  keywords: ["delhi jobs", "jobs in delhi", "delhi vacancies"],
  openGraph: {...},
  twitter: {...}
}

// Category × City Page
{
  title: "Driver Jobs in Delhi | Ujobs India",
  description: "Find verified driver jobs in Delhi...",
  keywords: ["driver jobs delhi", "driver jobs in delhi"],
  openGraph: {...},
  twitter: {...}
}
```

### Schema.org Implementation
```typescript
// Every page includes:
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}

// Job detail pages include:
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "...",
  "description": "...",
  "datePosted": "...",
  "employmentType": "...",
  "hiringOrganization": {...},
  "jobLocation": {...},
  "baseSalary": {...}
}

// Listing pages include:
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": [...]
}
```

---

## Build Output Estimate

### Static Pages at Build Time
```
Homepage:                        1 page
Jobs listing:                    1 page
Category pages:                 25 pages
City pages:                     20 pages
Category × City (tier 1):       80 pages
────────────────────────────────────────
Total static pages:            127 pages
```

### On-Demand Pages (ISR)
```
Tier 2 category × city:        420 pages (25 × 20 - 80)
Tier 3 expansion:            9,500 pages (future)
────────────────────────────────────────
Total potential pages:      10,000+ pages
```

### Build Time Estimate
```
127 static pages × 0.1s =     12.7 seconds
+ Dependencies install =      30 seconds
+ TypeScript compile =         5 seconds
────────────────────────────────────────
Total build time:         ~50 seconds
```

---

## Performance Targets

### Core Web Vitals
```
LCP (Largest Contentful Paint):   < 2.0s  ✅
FID (First Input Delay):           < 100ms ✅
CLS (Cumulative Layout Shift):     < 0.1   ✅
```

### Lighthouse Scores (Target)
```
Performance:     90+  ✅
Accessibility:   95+  ✅
Best Practices:  95+  ✅
SEO:            100   ✅
```

---

## Summary

**Total Pages Built:** 5 page types (jobs, job detail, category, city, category × city)  
**Total Components:** 15+ reusable components  
**Total Routes:** 127+ pre-generated, scalable to 10,000+  
**SEO Coverage:** 100% with dynamic metadata and Schema.org  
**Data-Driven:** 100% from API or configuration  
**Type Safety:** Full TypeScript coverage  
**Performance:** Optimized with SSG + ISR  

**Phase 2 Status: ✅ COMPLETE**
