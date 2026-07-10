# 🚀 Quick Start - Using New Components

## Installation Complete ✅

All new components are ready to use! Here's how to get started immediately.

---

## 🎯 Most Common Use Cases

### 1. Display an Image with Loading State

```tsx
import { OptimizedImage } from '@/components/ui';
import { getApiImageUrl } from '@/lib/utils/url';

// In your component
<OptimizedImage 
  src={getApiImageUrl(imageUrl)}
  alt="Description"
  aspectRatio="square"
  showLoader={true}
/>
```

**Result**: Image loads with blur effect → shimmer animation → sharp image

---

### 2. Show Loading State for a Page

```tsx
import { JobsPageSkeleton } from '@/components/ui';

export default function JobsPage() {
  const [loading, setLoading] = useState(true);
  
  if (loading) {
    return <JobsPageSkeleton />;
  }
  
  return <ActualContent />;
}
```

**Result**: Beautiful skeleton matching your page layout

---

### 3. Add Error Handling

```tsx
import ErrorBoundary from '@/components/ui/ErrorBoundary';

export default function MyPage() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  );
}
```

**Result**: Catches errors and shows user-friendly error screen

---

### 4. Show Loading Spinner

```tsx
import { LoadingSpinner } from '@/components/ui';

<LoadingSpinner size="lg" variant="brand" label="Loading..." />
```

**Result**: Animated spinner with your brand colors

---

### 5. Create Shimmer Grid While Loading

```tsx
import { ShimmerGrid } from '@/components/ui';

<ShimmerGrid count={6} variant="job" />
```

**Result**: 6 job card skeletons in a grid with shimmer animation

---

## 📦 Available Components Quick Reference

### Images
- `<OptimizedImage />` - Enhanced image with loading states

### Loaders
- `<LoadingSpinner />` - Spinning loader
- `<PageLoader />` - Full page loader
- `<ContentLoader />` - Content section loader
- `<ButtonLoader />` - Small loader for buttons

### Shimmer/Skeletons
- `<Shimmer />` - Basic shimmer element
- `<ShimmerGrid />` - Grid of shimmers
- `<ShimmerJobCard />` - Job card skeleton
- `<ShimmerCandidateCard />` - Candidate card skeleton
- `<JobsPageSkeleton />` - Full jobs page skeleton
- `<CandidatesPageSkeleton />` - Full candidates page skeleton
- `<JobDetailSkeleton />` - Job detail page skeleton
- `<HomepageSkeleton />` - Homepage skeleton

### Error Handling
- `<ErrorBoundary />` - Catch React errors
- `<ImageErrorFallback />` - Image error display
- `<DataErrorFallback />` - Data loading error

---

## 🎨 Tailwind Classes You Can Use Now

### Animations
```css
animate-shimmer          /* Shimmer loading effect */
animate-scale-in         /* Scale in entrance */
animate-slide-in-right   /* Slide from right */
animate-slide-in-left    /* Slide from left */
animate-fade-in          /* Fade in */
animate-slide-up         /* Slide up */
```

### Gradients
```css
bg-brand-gradient        /* Your brand gradient */
bg-shimmer-gradient      /* Shimmer effect gradient */
```

### Usage Example:
```tsx
<div className="animate-fade-in bg-brand-gradient">
  Content here
</div>
```

---

## 💡 Pro Tips

### Tip 1: Priority Loading for Above-Fold Images
```tsx
<OptimizedImage 
  src={heroImage}
  alt="Hero"
  priority={true}  // ← Load first!
/>
```

### Tip 2: Different Shimmer Variants
```tsx
// Text shimmer with multiple lines
<Shimmer variant="text" lines={3} />

// Circular avatar shimmer
<Shimmer variant="circular" width={80} height={80} />

// Card shimmer
<Shimmer variant="card" />
```

### Tip 3: Custom Fallback Images
```tsx
<OptimizedImage 
  src={maybeInvalidUrl}
  alt="User"
  fallbackSrc="/images/default-user.png"  // ← Shows if src fails
/>
```

### Tip 4: Aspect Ratios
```tsx
<OptimizedImage 
  src={image}
  alt="Gallery"
  aspectRatio="video"  // Options: square, video, portrait, landscape, auto
/>
```

### Tip 5: Loading States with Suspense
```tsx
import { Suspense } from 'react';
import { JobDetailSkeleton } from '@/components/ui';

<Suspense fallback={<JobDetailSkeleton />}>
  <AsyncComponent />
</Suspense>
```

---

## 🔥 Copy-Paste Examples

### Example 1: Card with Image and Loading

```tsx
import { OptimizedImage, LoadingSpinner } from '@/components/ui';
import { getApiImageUrl } from '@/lib/utils/url';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-soft">
      <OptimizedImage 
        src={getApiImageUrl(product.image)}
        alt={product.name}
        aspectRatio="square"
        className="mb-4"
      />
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
    </div>
  );
}
```

### Example 2: List with Loading State

```tsx
import { ShimmerGrid } from '@/components/ui';
import JobCard from './JobCard';

export default function JobsList() {
  const { jobs, loading } = useJobs();
  
  if (loading) {
    return <ShimmerGrid count={8} variant="job" />;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobs.map(job => <JobCard key={job.id} job={job} />)}
    </div>
  );
}
```

### Example 3: Button with Loading

```tsx
import { ButtonLoader } from '@/components/ui';

export default function SubmitButton() {
  const [submitting, setSubmitting] = useState(false);
  
  return (
    <button 
      onClick={handleSubmit}
      disabled={submitting}
      className="px-6 py-3 bg-brand-500 text-white rounded-xl"
    >
      {submitting ? <ButtonLoader /> : 'Submit'}
    </button>
  );
}
```

### Example 4: Full Page with Error Boundary

```tsx
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { JobsPageSkeleton } from '@/components/ui';
import { Suspense } from 'react';

export default function JobsPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<JobsPageSkeleton />}>
        <JobsContent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

---

## 🎯 What Changed in Existing Components

### JobCard (Updated)
- ✅ Now shows company logo
- ✅ Falls back to category image
- ✅ Better hover effects
- ✅ No code changes needed - works automatically!

### Image URLs (Enhanced)
```tsx
// Old way (still works)
getApiImageUrl(url)

// New way with optimization
getOptimizedImageUrl(url, { 
  width: 400, 
  quality: 85 
})
```

---

## 🚨 Important Notes

### 1. Import from UI Index
```tsx
// ✅ GOOD
import { OptimizedImage, LoadingSpinner } from '@/components/ui';

// ❌ AVOID
import OptimizedImage from '@/components/ui/OptimizedImage';
```

### 2. Always Provide Alt Text
```tsx
// ✅ GOOD
<OptimizedImage src={url} alt="Product photo" />

// ❌ AVOID
<OptimizedImage src={url} alt="" />
```

### 3. Use Appropriate Skeleton
```tsx
// ✅ GOOD - Matches page type
<JobsPageSkeleton /> // For jobs page

// ❌ AVOID - Generic for specific page
<GenericSkeleton /> // For jobs page
```

---

## 📊 Before vs After

| Scenario | Before | After |
|----------|--------|-------|
| Loading image | `<img>` instant or nothing | Blur → shimmer → sharp |
| Page loading | Blank or simple spinner | Full skeleton matching layout |
| Error | Console error | Beautiful error UI with retry |
| Job card | Text only | Image + text |
| Animation | Basic | Smooth, professional |

---

## ✅ Checklist for New Pages

When creating a new page, use this checklist:

- [ ] Wrap in `<ErrorBoundary>`
- [ ] Add loading skeleton for async data
- [ ] Use `<OptimizedImage>` for all images
- [ ] Add shimmer for loading lists
- [ ] Provide fallback images
- [ ] Test error states
- [ ] Check mobile responsive
- [ ] Verify animations work

---

## 🎓 Learning Path

**Day 1**: Start with `OptimizedImage` and `LoadingSpinner`  
**Day 2**: Add `ErrorBoundary` to critical pages  
**Day 3**: Implement page skeletons  
**Day 4**: Use shimmer grids for lists  
**Day 5**: Master advanced patterns

---

## 🆘 Need Help?

Check the main documentation: `WEBSITE_REVAMP_COMPLETE.md`

### Common Issues

**Issue**: Image not loading  
**Solution**: Check `getApiImageUrl()` is used and URL is valid

**Issue**: Shimmer not animating  
**Solution**: Ensure Tailwind config has shimmer keyframe

**Issue**: Skeleton doesn't match page  
**Solution**: Use specific skeleton (e.g., `JobsPageSkeleton`) not generic

---

## 🎉 You're Ready!

Start using these components in your pages. They're production-ready and fully tested!

**Happy Coding! 🚀**
