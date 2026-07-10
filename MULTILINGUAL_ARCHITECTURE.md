# Multilingual World-Class Architecture - Ujobs India

## 🌍 Multi-Language Support Strategy

### Supported Languages (12)
1. **English** (en) - Default
2. **हिन्दी Hindi** (hi)
3. **मराठी Marathi** (mr)
4. **தமிழ் Tamil** (ta)
5. **తెలుగు Telugu** (te)
6. **বাংলা Bengali** (bn)
7. **ಕನ್ನಡ Kannada** (kn)
8. **ગુજરાતી Gujarati** (gu)
9. **ਪੰਜਾਬੀ Punjabi** (pa)
10. **नेपाली Nepali** (ne)
11. **മലയാളം Malayalam** (ml)
12. **ଓଡ଼ିଆ Odia** (or)

### Regional Accent Strategy
- **Conversational Language**: Use daily spoken words, not formal literary language
- **Job Seeker Friendly**: Simple, easy-to-understand terms
- **Regional Context**: City names, job titles in local context
- **Cultural Sensitivity**: Respectful forms of address

---

## 🏗️ i18n Implementation Architecture

### Technology Stack
```
next-i18next (Next.js i18n)
├── Language Detection
│   ├── URL parameter (?lang=hi)
│   ├── Browser language
│   ├── Cookie persistence
│   └── Geo-location based
│
├── Translation Files
│   ├── /locales/en/common.json
│   ├── /locales/hi/common.json
│   ├── /locales/mr/common.json
│   └── ... (12 languages)
│
└── SEO Strategy
    ├── Separate URLs per language (/hi/, /mr/)
    ├── hreflang tags
    └── Language-specific metadata
```

### Folder Structure
```
ujobs-frontend/
├── public/
│   └── locales/
│       ├── en/
│       │   ├── common.json       # Common UI text
│       │   ├── jobs.json         # Job-related text
│       │   ├── auth.json         # Login/auth text
│       │   └── seo.json          # SEO metadata
│       ├── hi/
│       │   ├── common.json
│       │   ├── jobs.json
│       │   ├── auth.json
│       │   └── seo.json
│       └── ... (10 more languages)
│
├── src/
│   ├── i18n/
│   │   ├── config.ts             # i18n configuration
│   │   ├── languages.ts          # Language definitions
│   │   └── utils.ts              # Translation utilities
│   │
│   └── middleware.ts             # Language detection
```

---

## 📝 Translation File Structure

### Example: common.json (English)
```json
{
  "navigation": {
    "home": "Home",
    "jobs": "Jobs",
    "candidates": "Candidates",
    "hire": "Hire",
    "login": "Login",
    "downloadApp": "Download App"
  },
  "search": {
    "placeholder": "Search for jobs...",
    "searchButton": "Search",
    "filters": "Filters",
    "clearFilters": "Clear All"
  },
  "cta": {
    "applyNow": "Apply Now",
    "viewDetails": "View Details",
    "downloadApp": "Download App to Apply"
  }
}
```

### Example: common.json (Hindi - Conversational)
```json
{
  "navigation": {
    "home": "होम",
    "jobs": "नौकरियां",
    "candidates": "कैंडिडेट",
    "hire": "हायर करें",
    "login": "लॉगिन",
    "downloadApp": "ऐप डाउनलोड करें"
  },
  "search": {
    "placeholder": "नौकरी खोजें...",
    "searchButton": "खोजें",
    "filters": "फिल्टर",
    "clearFilters": "सब हटाएं"
  },
  "cta": {
    "applyNow": "अभी अप्लाई करें",
    "viewDetails": "डिटेल देखें",
    "downloadApp": "अप्लाई के लिए ऐप डाउनलोड करें"
  }
}
```

---

## 🔧 Config.json System (No .env rebuild)

### Problem with .env
- Requires rebuild for changes
- Not suitable for dynamic configuration
- Hard to manage multiple environments

### Solution: config.json
```
src/config/
├── config.json              # Runtime configuration
├── config.local.json        # Local overrides (gitignored)
└── config.schema.ts         # TypeScript schema
```

### config.json Example
```json
{
  "api": {
    "baseURL": "https://ujobsindia.com/aayusha-backend/public/api/v1",
    "timeout": 30000,
    "retryAttempts": 3
  },
  "app": {
    "name": "Ujobs India",
    "defaultLanguage": "en",
    "supportedLanguages": ["en", "hi", "mr", "ta", "te", "bn", "kn", "gu", "pa", "ne", "ml", "or"],
    "itemsPerPage": 20,
    "imageBaseURL": "https://ujobsindia.com/aayusha-backend/storage"
  },
  "features": {
    "showCandidates": true,
    "enableAuth": true,
    "showRatings": true,
    "enableChat": false
  },
  "seo": {
    "revalidate": {
      "homepage": 300,
      "jobDetail": 600,
      "seoPages": 3600
    }
  },
  "analytics": {
    "googleAnalyticsId": "G-XXXXXXXXXX",
    "facebookPixelId": "XXXXXXXXXXXXX"
  },
  "appStore": {
    "android": "https://play.google.com/store/apps/details?id=com.ujobs",
    "ios": "https://apps.apple.com/app/ujobs/id123456789"
  }
}
```

### Loading Config at Runtime
```typescript
// No rebuild required - changes reflect immediately
const config = await fetch('/api/config').then(r => r.json());
```

---

## 👥 Candidate/Worker Features

### Worker Profile Pages

#### URL Structure
```
/candidates                          # All candidates
/candidates/[id]                     # Candidate detail
/candidates/[category]               # Candidates by category
/candidates/[category]/[city]        # Candidates by category & city
```

#### Data from Backend
```typescript
interface Worker {
  id: number;
  w_id: string;
  name: string;
  email: string;
  phone: string;
  profile_photo: string;              // ✅ Image
  city: string;
  age: number;
  gender: string;
  education: string;
  total_experience: string;
  sal_expectation: string;
  work_types: WorkType[];             // Categories
  languages_known: string[];
  skills: Skill[];
  rating: {
    average: number;                  // ✅ Display ratings
    total: number;
  };
  profile_completion: number;         // ✅ Show percentage
  verified: boolean;
  adhaar_front: string;               // ✅ Verification docs
  pan_copy: string;
  // ... more fields
}
```

#### Features
1. **Candidate Search & Filters**
   - By category (driver, nurse, etc.)
   - By location
   - By experience
   - By salary range
   - By skills

2. **Candidate Cards**
   - Profile photo
   - Name, age, gender
   - Category & experience
   - Location
   - Rating stars
   - Verification badge
   - "Unlock to View Contact" CTA

3. **Candidate Detail Page**
   - Full profile
   - Work history
   - Skills & certifications
   - Documents (blurred - unlock in app)
   - Reviews & ratings
   - "Contact via App" CTA

---

## 🔐 Authentication System

### User Types
1. **Job Seeker** (Worker)
   - View jobs
   - Browse employer profiles
   - Save jobs (app only)
   - Apply (app only)

2. **Hirer** (Employer)
   - View candidates
   - Post jobs (app only)
   - Unlock candidates (app only)
   - Contact workers (app only)

3. **Guest** (No login)
   - Browse jobs
   - Browse candidates (limited info)
   - View details (limited)
   - No apply/unlock/contact

### Authentication Flow

#### Login API
```
POST /api/v1/login
POST /api/v1/worker-login
POST /api/v1/loginotp
POST /api/v1/worker/loginotp
```

#### Auth State Management
```typescript
interface AuthState {
  isAuthenticated: boolean;
  userType: 'hirer' | 'worker' | null;
  user: User | Worker | null;
  token: string | null;
}
```

#### Protected Features
```
✅ Guest: Browse, view limited info
✅ Logged In (Web): View full details
❌ Apply to Job: Redirect to app
❌ Unlock Candidate: Redirect to app
❌ Contact: Redirect to app
❌ Post Job: Redirect to app
```

---

## 📱 App-Only Features Strategy

### Website Shows Information
- Job listings
- Candidate listings
- Company profiles
- Search & filters
- Details & descriptions

### App Required For Actions
- Apply to jobs
- Unlock candidate contact
- Post jobs
- Chat/messaging
- Payment/transactions
- Notifications

### Implementation
```typescript
// Example: Apply CTA
<Button onClick={redirectToApp}>
  {t('cta.downloadAppToApply')}
</Button>

function redirectToApp() {
  // Detect device
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  
  if (isAndroid) {
    window.location.href = config.appStore.android;
  } else if (isIOS) {
    window.location.href = config.appStore.ios;
  } else {
    // Desktop - show QR code or download options
    showAppDownloadModal();
  }
}
```

---

## 🎨 World-Class UI/UX Features

### 1. Image Optimization
```typescript
// Worker profile photo
<Image
  src={`${config.imageBaseURL}/${worker.profile_photo}`}
  alt={worker.name}
  width={200}
  height={200}
  className="rounded-full"
/>
```

### 2. Rating Display
```typescript
<div className="flex items-center gap-1">
  {[1, 2, 3, 4, 5].map((star) => (
    <Star
      key={star}
      className={star <= worker.rating.average ? 'fill-yellow-400' : 'fill-gray-200'}
    />
  ))}
  <span className="text-sm text-gray-600">
    {worker.rating.average} ({worker.rating.total} reviews)
  </span>
</div>
```

### 3. Verification Badges
```typescript
{worker.verified && (
  <Badge variant="success">
    <CheckCircle className="h-4 w-4 mr-1" />
    Verified
  </Badge>
)}
```

### 4. Profile Completion Indicator
```typescript
<div className="w-full bg-gray-200 rounded-full h-2">
  <div
    className="bg-brand-600 h-2 rounded-full"
    style={{ width: `${worker.profile_completion}%` }}
  />
</div>
<span className="text-sm text-gray-600">
  {worker.profile_completion}% Complete
</span>
```

### 5. Language Switcher
```typescript
<LanguageSelector>
  <option value="en">English</option>
  <option value="hi">हिन्दी</option>
  <option value="mr">मराठी</option>
  <option value="ta">தமிழ்</option>
  {/* ... */}
</LanguageSelector>
```

---

## 🗺️ SEO Strategy for Multilingual

### URL Structure
```
English:
/jobs
/jobs/driver-jobs
/jobs/driver-jobs/delhi

Hindi:
/hi/jobs
/hi/jobs/driver-jobs
/hi/jobs/driver-jobs/delhi

Marathi:
/mr/jobs
/mr/jobs/driver-jobs
/mr/jobs/driver-jobs/delhi
```

### hreflang Tags
```html
<link rel="alternate" hreflang="en" href="https://ujobs.com/jobs" />
<link rel="alternate" hreflang="hi" href="https://ujobs.com/hi/jobs" />
<link rel="alternate" hreflang="mr" href="https://ujobs.com/mr/jobs" />
<link rel="alternate" hreflang="x-default" href="https://ujobs.com/jobs" />
```

### Language-Specific Metadata
```typescript
{
  en: {
    title: "Driver Jobs in Delhi | Ujobs India",
    description: "Find verified driver jobs in Delhi..."
  },
  hi: {
    title: "दिल्ली में ड्राइवर नौकरी | Ujobs India",
    description: "दिल्ली में वेरिफाइड ड्राइवर जॉब खोजें..."
  },
  mr: {
    title: "दिल्ली मध्ये ड्रायव्हर नोकऱ्या | Ujobs India",
    description: "दिल्ली मध्ये वेरिफाइड ड्रायव्हर नोकऱ्या शोधा..."
  }
}
```

---

## 📊 Complete Database Integration

### Available Data to Leverage

#### From Jobs Table
- job_title
- job_description
- work_type_id (category)
- location_id
- salary_from, salary_to
- employment_type
- gender_pref
- age_pref_from, age_pref_to
- languages (array)
- religion_pref (array)
- status
- user (employer details)

#### From Workers Table
- name, email, phone
- profile_photo ✅
- adhaar_front, adhaar_back ✅
- pan_copy ✅
- city, pincode
- work_types (categories)
- total_experience
- sal_expectation
- education
- languages_known (array)
- skills (relation)
- gender, age, religion
- profile_completion %
- rating (calculated)
- verified status

#### From Users Table (Employers)
- name
- email
- company_name
- company_logo ✅
- city
- ratings

#### Additional Features
- Banners (for homepage slider)
- Notifications
- Transactions (hiring history)
- Worker verifications

---

## 🚀 Implementation Roadmap

### Phase 1: Infrastructure (Day 1-2)
1. ✅ Install next-i18next
2. ✅ Create config.json system
3. ✅ Update type definitions
4. ✅ Create language files structure

### Phase 2: Authentication (Day 3-4)
1. ✅ Auth context/store
2. ✅ Login/logout components
3. ✅ Protected routes
4. ✅ User type detection

### Phase 3: Candidate Features (Day 5-7)
1. ✅ Candidate listing page
2. ✅ Candidate detail page
3. ✅ Candidate search & filters
4. ✅ Profile images & assets
5. ✅ Rating & verification display

### Phase 4: Multilingual (Day 8-10)
1. ✅ Translation files (all 12 languages)
2. ✅ Language switcher UI
3. ✅ SEO for each language
4. ✅ Regional accents review

### Phase 5: Polish (Day 11-12)
1. ✅ App-only CTAs
2. ✅ Image optimization
3. ✅ Performance tuning
4. ✅ Testing all languages

---

## 📈 Expected Outcomes

### SEO Impact
- **12x SEO coverage** (12 languages)
- **127 pages × 12 languages = 1,524 indexed pages**
- Regional keyword rankings
- Local search visibility

### User Experience
- Native language comfort
- Cultural relevance
- Higher engagement
- Better conversion

### Technical Excellence
- Runtime configuration
- No rebuild for changes
- Full type safety
- World-class performance

---

## 🎯 Success Metrics

### Traffic Goals
- 10x organic traffic (multilingual SEO)
- 5x app installs (app-only CTAs)
- 3x employer leads (candidate visibility)

### Performance Goals
- LCP < 2.0s (all languages)
- 100/100 Lighthouse SEO
- A11y score 95+

### Engagement Goals
- 50%+ users in regional languages
- 5+ minutes avg session
- 3+ pages per session

---

**This architecture will make Ujobs India the #1 multilingual job platform in India! 🇮🇳**
