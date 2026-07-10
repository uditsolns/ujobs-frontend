# 🚀 Quick Start Guide - Multilingual Ujobs India

## 📦 What's Been Built

### ✅ Core Infrastructure
1. **Runtime Config System** - No rebuild needed for changes
2. **12-Language Support** - i18n infrastructure ready
3. **Worker/Candidate Types** - Complete TypeScript definitions
4. **Worker Service** - Full API integration
5. **Translation Files** - 3 languages complete (en, hi, mr)

---

## 🎯 How to Use What's Built

### 1. Using Config.json (Runtime Configuration)

**File**: `public/config.json`

```typescript
// In any component
import { loadConfig, getImageUrl, getAppDownloadUrl } from '@/config/runtime';

// Load config (do this in _app.tsx or layout)
const config = await loadConfig();

// Use config
console.log(config.api.baseURL); // API URL
console.log(config.app.defaultLanguage); // 'en'
console.log(config.features.showCandidates); // true

// Get image URLs
const photoUrl = getImageUrl(worker.profile_photo);
// Returns: https://ujobsindia.com/aayusha-backend/public/storage/worker.jpg

// Get app download URL (auto-detects device)
const appUrl = getAppDownloadUrl();
// Android: Play Store link
// iOS: App Store link
```

**Change Settings Without Rebuild**:
```json
// Edit public/config.json
{
  "features": {
    "showCandidates": false  // ← Change this
  }
}
// Save file → Changes reflect immediately!
```

---

### 2. Using Worker Service

**File**: `src/services/workers.service.ts`

```typescript
import WorkerService from '@/services/workers.service';

// Get all workers
const workers = await WorkerService.getWorkers();

// Get worker by ID
const worker = await WorkerService.getWorkerById(123);

// Search workers
const results = await WorkerService.searchWorkers({
  work_type_id: 5,
  city: 'Delhi',
  experience: '2-5 years',
});

// Get by category
const drivers = await WorkerService.getWorkersByCategory(5);

// Get by city
const delhiWorkers = await WorkerService.getWorkersByCity('Delhi');

// Helper methods
const rating = WorkerService.getRating(worker);
// Returns: { average: 4.5, total: 12 }

const completion = WorkerService.getProfileCompletion(worker);
// Returns: 85

const verified = WorkerService.isVerified(worker);
// Returns: true/false

const workTypes = WorkerService.getWorkTypes(worker);
// Returns: ['Driver', 'Delivery']

const photoUrl = WorkerService.getProfilePhotoUrl(worker, config.app.storageBaseURL);
// Returns: full image URL
```

---

### 3. Using Translations

**Files**: `public/locales/{lang}/common.json`

```typescript
// In _app.tsx or layout
import { appWithTranslation } from 'next-i18next';

// In any component
import { useTranslation } from 'next-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation('common');
  
  return (
    <div>
      <h1>{t('navigation.home')}</h1>
      {/* English: Home */}
      {/* Hindi: होम */}
      {/* Marathi: होम */}
      
      <p>{t('home.heroTitle')}</p>
      {/* English: Find Your Dream Job */}
      {/* Hindi: अपनी ड्रीम जॉब पाएं */}
      {/* Marathi: तुमची ड्रीम जॉब मिळवा */}
      
      <button onClick={() => i18n.changeLanguage('hi')}>
        हिन्दी
      </button>
    </div>
  );
}
```

**Dynamic Translations**:
```typescript
// With variables
t('search.results', { count: 42 })
// English: "42 results found"
// Hindi: "42 रिजल्ट मिले"

t('seo.categoryJobsInCity', { category: 'Driver', city: 'Delhi' })
// English: "Driver Jobs in Delhi"
// Hindi: "दिल्ली में Driver नौकरियां"
```

---

### 4. Worker/Candidate Type Usage

**File**: `src/types/worker.ts`

```typescript
import type { Worker, WorkerSearchParams } from '@/types/worker';

// Type-safe worker object
const worker: Worker = {
  id: 123,
  w_id: 'W123',
  name: 'John Doe',
  phone: '+91-9876543210',
  city: 'Delhi',
  work_types: [{ id: 5, name: 'Driver' }],
  profile_photo: 'workers/photo.jpg',
  profile_completion: 85,
  verified: true,
  rating: { average: 4.5, total: 12 },
  // ... all other fields
};

// Type-safe search params
const searchParams: WorkerSearchParams = {
  work_type_id: 5,
  location_id: 10,
  city: 'Delhi',
  experience: '2-5 years',
  min_salary: 15000,
  max_salary: 30000,
  gender: 'Male',
  verified_only: true,
  page: 1,
  limit: 20,
};
```

---

## 🏗️ File Structure Overview

```
ujobs-frontend/
│
├── public/
│   ├── config.json                    # ✅ Runtime configuration
│   └── locales/
│       ├── en/common.json             # ✅ English translations
│       ├── hi/common.json             # ✅ Hindi translations
│       ├── mr/common.json             # ✅ Marathi translations
│       └── [9 more languages to create]
│
├── src/
│   ├── config/
│   │   ├── api.ts                     # ✅ API endpoints (existing)
│   │   ├── site.ts                    # ✅ Site config (existing)
│   │   └── runtime.ts                 # ✅ NEW: Runtime config loader
│   │
│   ├── i18n/
│   │   └── languages.ts               # ✅ NEW: Language definitions
│   │
│   ├── services/
│   │   ├── jobs.service.ts            # ✅ Jobs API (existing)
│   │   ├── categories.service.ts      # ✅ Categories API (existing)
│   │   ├── locations.service.ts       # ✅ Locations API (existing)
│   │   └── workers.service.ts         # ✅ NEW: Workers/Candidates API
│   │
│   ├── types/
│   │   ├── index.ts                   # ✅ Common types (existing)
│   │   ├── job.ts                     # ✅ Job types (existing)
│   │   └── worker.ts                  # ✅ NEW: Worker/Candidate types
│   │
│   ├── components/                    # ← TO BE CREATED
│   │   ├── candidates/
│   │   │   ├── CandidateCard.tsx
│   │   │   ├── CandidateFilters.tsx
│   │   │   └── CandidateList.tsx
│   │   ├── auth/
│   │   │   ├── LoginModal.tsx
│   │   │   └── OTPVerification.tsx
│   │   └── common/
│   │       ├── LanguageSwitcher.tsx
│   │       └── AppDownloadModal.tsx
│   │
│   └── app/                           # ← TO BE CREATED
│       ├── candidates/
│       │   ├── page.tsx               # Candidate listing
│       │   ├── [id]/page.tsx          # Candidate detail
│       │   ├── [category]/page.tsx    # Category candidates
│       │   └── [category]/[city]/page.tsx
│       └── [locale]/                  # Multilingual routes
│
└── next-i18next.config.js             # ✅ i18n configuration
```

---

## 📝 Backend API Reference

### Available Endpoints

#### Public (No Auth Required)
```
GET  /web/jobs                         # All jobs
POST /web/jobs/search                  # Search jobs
GET  /web/jobs/{id}                    # Job detail
GET  /web/banners                      # Banners
GET  /work-types                       # Categories
GET  /locations                        # Locations
```

#### Protected (Auth Required)
```
GET  /workers                          # All workers
GET  /workers/{id}                     # Worker detail
POST /search/list/worker               # Search workers
POST /search/nearby                    # Nearby workers
```

#### Authentication
```
POST /login                            # Hirer login
POST /worker-login                     # Worker login
POST /loginotp                         # Hirer OTP login
POST /worker/loginotp                  # Worker OTP login
POST /sendOtp                          # Send OTP
POST /verify-otp                       # Verify OTP
```

### Response Structures

**Worker Object**:
```json
{
  "id": 123,
  "w_id": "W123",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "profile_photo": "workers/photo.jpg",
  "city": "Delhi",
  "age": 25,
  "gender": "Male",
  "work_types": [
    { "id": 5, "name": "Driver" }
  ],
  "total_experience": "2-5 years",
  "sal_expectation": "₹20,000 - ₹25,000",
  "education": "10th Pass",
  "languages_known": ["Hindi", "English"],
  "skills": [
    { "id": 1, "name": "Driving License" }
  ],
  "profile_completion": 85,
  "verified": true,
  "rating": {
    "average": 4.5,
    "total": 12
  }
}
```

---

## 🎨 Component Examples to Create

### 1. CandidateCard Component

```typescript
// src/components/candidates/CandidateCard.tsx
import Image from 'next/image';
import { Star, MapPin, Briefcase, CheckCircle } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { getImageUrl } from '@/config/runtime';
import type { Worker } from '@/types/worker';
import WorkerService from '@/services/workers.service';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';

interface CandidateCardProps {
  worker: Worker;
  onUnlock?: (workerId: number) => void;
}

export default function CandidateCard({ worker, onUnlock }: CandidateCardProps) {
  const { t } = useTranslation('common');
  const rating = WorkerService.getRating(worker);
  const workTypes = WorkerService.getWorkTypes(worker);
  const verified = WorkerService.isVerified(worker);
  
  return (
    <Card padding="md" className="hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        {/* Profile Photo */}
        <div className="relative">
          <Image
            src={getImageUrl(worker.profile_photo)}
            alt={worker.name}
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          {verified && (
            <div className="absolute -bottom-1 -right-1">
              <CheckCircle className="h-6 w-6 text-green-600 bg-white rounded-full" />
            </div>
          )}
        </div>
        
        {/* Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {worker.name}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{WorkerService.getAge(worker)}</span>
                <span>•</span>
                <span>{worker.gender}</span>
              </div>
            </div>
            
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{rating.average}</span>
              <span className="text-sm text-gray-600">({rating.total})</span>
            </div>
          </div>
          
          {/* Work Types */}
          <div className="flex flex-wrap gap-2 mt-2">
            {workTypes.slice(0, 2).map((type, idx) => (
              <Badge key={idx} variant="primary">
                {type}
              </Badge>
            ))}
          </div>
          
          {/* Location & Experience */}
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{worker.city}</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              <span>{WorkerService.getExperience(worker)}</span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              onClick={() => window.location.href = `/candidates/${worker.id}`}
            >
              {t('cta.viewProfile')}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUnlock?.(worker.id)}
            >
              {t('cta.unlockContact')}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
```

### 2. Language Switcher Component

```typescript
// src/components/common/LanguageSwitcher.tsx
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { LANGUAGES } from '@/i18n/languages';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const router = useRouter();
  
  const handleLanguageChange = (lang: string) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  };
  
  return (
    <select
      value={i18n.language}
      onChange={(e) => handleLanguageChange(e.target.value)}
      className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.nativeName}
        </option>
      ))}
    </select>
  );
}
```

---

## 🔑 Key Concepts

### 1. Runtime Configuration
**Why**: No rebuild needed for config changes
**When**: Use for feature flags, API URLs, revalidation times
**How**: Edit `public/config.json` → Changes apply immediately

### 2. Multilingual SEO
**Why**: 12x SEO coverage, regional reach
**What**: Each page in 12 languages with unique URLs
**How**: `/en/jobs`, `/hi/jobs`, `/mr/jobs`, etc.

### 3. App-Only Actions
**Why**: Drive app installs
**What**: Website shows info, app required for actions
**Actions**: Apply, unlock contact, post jobs, chat

### 4. Type Safety
**Why**: Catch errors at compile time
**What**: Full TypeScript for all data structures
**How**: Import types, use them everywhere

### 5. Image Optimization
**Why**: Fast loading, good UX
**What**: Next.js Image component with placeholder
**How**: `getImageUrl()` helper + Image component

---

## ✅ Checklist for Next Development Session

**Before You Start**:
- [ ] Review `MULTILINGUAL_ARCHITECTURE.md`
- [ ] Review `IMPLEMENTATION_SUMMARY.md`
- [ ] Check `public/config.json` settings
- [ ] Test API accessibility

**Create Next**:
- [ ] Remaining 9 language files
- [ ] CandidateCard component
- [ ] CandidateFilters component
- [ ] LanguageSwitcher component
- [ ] Candidate listing page
- [ ] Candidate detail page
- [ ] Authentication components

**Test After Creation**:
- [ ] All language translations work
- [ ] Worker API calls successful
- [ ] Images load correctly
- [ ] Config changes without rebuild
- [ ] App download redirects work

---

## 🚀 You're Ready!

All infrastructure is in place. The foundation is solid. Now it's time to build the UI components and pages on top of this architecture.

**Need help?** Check these files:
- `MULTILINGUAL_ARCHITECTURE.md` - Complete architecture
- `IMPLEMENTATION_SUMMARY.md` - What's next
- `PAGE_STRUCTURE.md` - Existing job pages structure
- `PHASE_2_COMPLETE.md` - Job pages completion

**Happy coding! 🎉**
