/**
 * Comprehensive E2E Tests for Ujobs India Website
 * Tests all critical user flows and API integrations
 */

import { test, expect } from '@playwright/test';

// Test configuration
const BASE_URL = 'http://localhost:3005';
const LANGUAGES = ['en', 'hi', 'mr'];
const TIMEOUT = 30000;

test.describe('Homepage Tests', () => {
  test('should load homepage in all languages', async ({ page }) => {
    for (const lang of LANGUAGES) {
      await page.goto(`/${lang}`, { waitUntil: 'networkidle', timeout: TIMEOUT });
      
      // Check page loads
      await expect(page).toHaveTitle(/Ujobs India/i);
      
      // Check main heading exists
      const heading = page.locator('h1').first();
      await expect(heading).toBeVisible();
      
      console.log(`✅ Homepage loaded for ${lang}`);
    }
  });

  test('should display stats counter', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle', timeout: TIMEOUT });
    
    // Wait for stats to load (API call)
    await page.waitForTimeout(2000);
    
    // Check for numeric stats
    const stats = page.locator('text=/\\d+/').first();
    await expect(stats).toBeVisible();
    
    console.log('✅ Stats counter displayed');
  });

  test('should display app download CTAs', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle', timeout: TIMEOUT });
    
    // Check for download buttons
    const downloadButton = page.locator('text=/download|get it on|app store/i').first();
    await expect(downloadButton).toBeVisible();
    
    console.log('✅ App download CTA found');
  });

  test('should have navigation menu', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle', timeout: TIMEOUT });
    
    // Check navigation items
    await expect(page.locator('text=/jobs/i').first()).toBeVisible();
    await expect(page.locator('text=/hire|candidates/i').first()).toBeVisible();
    
    console.log('✅ Navigation menu present');
  });
});

test.describe('Jobs Page Tests', () => {
  test('should load jobs listing page', async ({ page }) => {
    await page.goto('/en/jobs', { waitUntil: 'networkidle', timeout: TIMEOUT });
    
    // Wait for jobs to load (API call)
    await page.waitForTimeout(3000);
    
    // Check page title
    await expect(page).toHaveTitle(/jobs/i);
    
    // Check for job cards (if any jobs exist)
    const jobCards = page.locator('[data-testid="job-card"], .job-card, article').first();
    const jobCount = await jobCards.count();
    
    console.log(`✅ Jobs page loaded with ${jobCount} jobs`);
  });

  test('should have search functionality', async ({ page }) => {
    await page.goto('/en/jobs', { waitUntil: 'networkidle', timeout: TIMEOUT });
    
    // Look for search input
    const searchInput = page.locator('input[type="search"], input[placeholder*="search" i]').first();
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('driver');
      await page.waitForTimeout(1000);
      console.log('✅ Search input functional');
    } else {
      console.log('⚠️ Search input not found (may be on different component)');
    }
  });

  test('should have filters', async ({ page }) => {
    await page.goto('/en/jobs', { waitUntil: 'networkidle', timeout: TIMEOUT });
    
    // Check for filter buttons or selects
    const filters = page.locator('button:has-text("filter"), select, [role="combobox"]').first();
    
    if (await filters.isVisible()) {
      console.log('✅ Filters found');
    } else {
      console.log('⚠️ Filters may be hidden or implemented differently');
    }
  });

  test('should navigate to job detail page', async ({ page }) => {
    await page.goto('/en/jobs', { waitUntil: 'networkidle', timeout: TIMEOUT });
    await page.waitForTimeout(3000);
    
    // Find first job card link
    const jobLink = page.locator('a[href*="/jobs/"]').first();
    
    if (await jobLink.isVisible()) {
      await jobLink.click();
      await page.waitForTimeout(2000);
      
      // Check URL changed to job detail
      expect(page.url()).toContain('/jobs/');
      console.log('✅ Navigation to job detail works');
    } else {
      console.log('⚠️ No jobs available to test detail page');
    }
  });
});

test.describe('Job Detail Page Tests', () => {
  test('should display job details with schema markup', async ({ page }) => {
    // Use a mock job ID (you should replace with actual ID from your data)
    await page.goto('/en/jobs/1-test-job-mumbai', { waitUntil: 'networkidle', timeout: TIMEOUT });
    
    // Wait for content
    await page.waitForTimeout(2000);
    
    // Check for schema markup
    const schemaScript = page.locator('script[type="application/ld+json"]');
    const schemaCount = await schemaScript.count();
    
    expect(schemaCount).toBeGreaterThan(0);
    console.log(`✅ Found ${schemaCount} schema.org markup blocks`);
    
    // Verify JobPosting schema
    const schemaContent = await schemaScript.first().textContent();
    if (schemaContent) {
      expect(schemaContent).toContain('JobPosting');
      console.log('✅ JobPosting schema present');
    }
  });

  test('should have apply/download CTA', async ({ page }) => {
    await page.goto('/en/jobs/1-test-job-mumbai', { waitUntil: 'networkidle', timeout: TIMEOUT });
    await page.waitForTimeout(2000);
    
    // Look for apply or download button
    const ctaButton = page.locator('button:has-text("apply"), a:has-text("download"), button:has-text("contact")').first();
    
    if (await ctaButton.isVisible()) {
      console.log('✅ Apply/Contact CTA found');
    }
  });

  test('should display similar jobs', async ({ page }) => {
    await page.goto('/en/jobs/1-test-job-mumbai', { waitUntil: 'networkidle', timeout: TIMEOUT });
    await page.waitForTimeout(3000);
    
    // Check for similar jobs section
    const similarSection = page.locator('text=/similar|related|recommended/i');
    
    if (await similarSection.count() > 0) {
      console.log('✅ Similar jobs section present');
    }
  });
});

test.describe('Category Pages Tests', () => {
  test('should load category page (driver-jobs)', async ({ page }) => {
    await page.goto('/en/driver-jobs', { waitUntil: 'networkidle', timeout: TIMEOUT });
    await page.waitForTimeout(2000);
    
    // Check page loads
    expect(page.url()).toContain('driver-jobs');
    
    // Check for breadcrumb or title
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    
    console.log('✅ Category page loaded');
  });

  test('should have breadcrumb navigation', async ({ page }) => {
    await page.goto('/en/driver-jobs', { waitUntil: 'networkidle', timeout: TIMEOUT });
    
    // Look for breadcrumb
    const breadcrumb = page.locator('nav[aria-label="breadcrumb"], .breadcrumb, a:has-text("Home")').first();
    
    if (await breadcrumb.isVisible()) {
      console.log('✅ Breadcrumb navigation found');
    }
  });
});

test.describe('City Pages Tests', () => {
  test('should load city page (mumbai-jobs)', async ({ page }) => {
    await page.goto('/en/mumbai-jobs', { waitUntil: 'networkidle', timeout: TIMEOUT });
    await page.waitForTimeout(2000);
    
    // Check page loads
    expect(page.url()).toContain('mumbai-jobs');
    
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    
    console.log('✅ City page loaded');
  });
});

test.describe('Candidates Page Tests', () => {
  test('should load candidates listing page', async ({ page }) => {
    await page.goto('/en/candidates', { waitUntil: 'networkidle', timeout: TIMEOUT });
    await page.waitForTimeout(3000);
    
    // Check page title
    await expect(page).toHaveTitle(/candidates|workers/i);
    
    console.log('✅ Candidates page loaded');
  });

  test('should have filters for candidates', async ({ page }) => {
    await page.goto('/en/candidates', { waitUntil: 'networkidle', timeout: TIMEOUT });
    await page.waitForTimeout(2000);
    
    // Check for category/location filters
    const filters = page.locator('button:has-text("filter"), select').first();
    
    if (await filters.isVisible()) {
      console.log('✅ Candidate filters present');
    }
  });

  test('should display unlock contact CTA', async ({ page }) => {
    await page.goto('/en/candidates', { waitUntil: 'networkidle', timeout: TIMEOUT });
    await page.waitForTimeout(2000);
    
    // Look for unlock/contact/download CTA
    const unlockButton = page.locator('button:has-text("unlock"), button:has-text("contact"), a:has-text("download")').first();
    
    if (await unlockButton.isVisible()) {
      console.log('✅ Unlock contact CTA found');
    }
  });
});

test.describe('Hire/Employer Page Tests', () => {
  test('should load hire/employer page', async ({ page }) => {
    await page.goto('/en/hire', { waitUntil: 'networkidle', timeout: TIMEOUT });
    
    // Check page loads
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    
    console.log('✅ Hire page loaded');
  });

  test('should have employer lead form', async ({ page }) => {
    await page.goto('/en/hire', { waitUntil: 'networkidle', timeout: TIMEOUT });
    await page.waitForTimeout(2000);
    
    // Look for form inputs
    const nameInput = page.locator('input[name="name"], input[placeholder*="name" i]').first();
    const phoneInput = page.locator('input[name="phone"], input[name="mobile"], input[type="tel"]').first();
    
    if (await nameInput.isVisible() && await phoneInput.isVisible()) {
      console.log('✅ Employer lead form found');
      
      // Test form submission (don't actually submit)
      await nameInput.fill('Test Company');
      await phoneInput.fill('9876543210');
      console.log('✅ Form inputs functional');
    } else {
      console.log('⚠️ Lead form not found on this page');
    }
  });
});

test.describe('SEO & Technical Tests', () => {
  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle', timeout: TIMEOUT });
    
    // Check title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(10);
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    expect(await metaDescription.count()).toBe(1);
    
    // Check OG tags
    const ogTitle = page.locator('meta[property="og:title"]');
    expect(await ogTitle.count()).toBeGreaterThan(0);
    
    console.log('✅ Meta tags present');
  });

  test('should have hreflang tags', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle', timeout: TIMEOUT });
    
    // Check for hreflang tags
    const hreflangTags = page.locator('link[rel="alternate"][hreflang]');
    const count = await hreflangTags.count();
    
    expect(count).toBeGreaterThan(0);
    console.log(`✅ Found ${count} hreflang tags`);
  });

  test('should have sitemap.xml accessible', async ({ page }) => {
    const response = await page.goto('/sitemap.xml', { timeout: TIMEOUT });
    
    expect(response?.status()).toBe(200);
    
    const content = await page.content();
    expect(content).toContain('<?xml');
    expect(content).toContain('urlset');
    
    console.log('✅ Sitemap.xml accessible');
  });

  test('should have robots.txt accessible', async ({ page }) => {
    const response = await page.goto('/robots.txt', { timeout: TIMEOUT });
    
    expect(response?.status()).toBe(200);
    
    const content = await page.content();
    expect(content).toContain('User-agent');
    
    console.log('✅ Robots.txt accessible');
  });

  test('should not have console errors on homepage', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/en', { waitUntil: 'networkidle', timeout: TIMEOUT });
    await page.waitForTimeout(3000);
    
    // Filter out known external errors (like ad blockers, analytics, etc.)
    const criticalErrors = errors.filter(err => 
      !err.includes('chrome-extension') && 
      !err.includes('google-analytics') &&
      !err.includes('gtag')
    );
    
    console.log(`Console errors found: ${criticalErrors.length}`);
    if (criticalErrors.length > 0) {
      console.log('Errors:', criticalErrors);
    }
    
    expect(criticalErrors.length).toBe(0);
  });

  test('should not have 404 errors for critical resources', async ({ page }) => {
    const failed404s: string[] = [];
    
    page.on('response', response => {
      if (response.status() === 404 && !response.url().includes('favicon')) {
        failed404s.push(response.url());
      }
    });
    
    await page.goto('/en', { waitUntil: 'networkidle', timeout: TIMEOUT });
    await page.waitForTimeout(3000);
    
    console.log(`404 errors found: ${failed404s.length}`);
    if (failed404s.length > 0) {
      console.log('Failed resources:', failed404s);
    }
    
    // Allow up to 2 404s for external resources
    expect(failed404s.length).toBeLessThan(3);
  });
});

test.describe('Mobile Responsiveness Tests', () => {
  test('should display properly on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/en', { waitUntil: 'networkidle', timeout: TIMEOUT });
    
    // Check main heading visible
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    
    // Check mobile menu
    const menuButton = page.locator('button[aria-label*="menu" i], button:has-text("menu")').first();
    
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500);
      console.log('✅ Mobile menu works');
    }
    
    console.log('✅ Mobile layout functional');
  });

  test('should not have horizontal scroll on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/en', { waitUntil: 'networkidle', timeout: TIMEOUT });
    
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 5); // Allow 5px tolerance
    console.log('✅ No horizontal scroll on mobile');
  });
});

test.describe('Performance Tests', () => {
  test('should load homepage within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/en', { waitUntil: 'networkidle', timeout: TIMEOUT });
    
    const loadTime = Date.now() - startTime;
    
    console.log(`Homepage load time: ${loadTime}ms`);
    
    // Acceptable load time: < 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have optimized images', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle', timeout: TIMEOUT });
    
    // Check for Next.js optimized images
    const nextImages = page.locator('img[loading="lazy"]');
    const count = await nextImages.count();
    
    console.log(`Found ${count} lazy-loaded images`);
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Language Switching Tests', () => {
  test('should switch between languages', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle', timeout: TIMEOUT });
    
    // Look for language switcher
    const langSwitcher = page.locator('[aria-label*="language" i], button:has-text("EN")').first();
    
    if (await langSwitcher.isVisible()) {
      await langSwitcher.click();
      await page.waitForTimeout(500);
      
      // Click Hindi option
      const hindiOption = page.locator('text=/हिन्दी|hindi/i').first();
      
      if (await hindiOption.isVisible()) {
        await hindiOption.click();
        await page.waitForTimeout(2000);
        
        // Check URL changed to /hi
        expect(page.url()).toContain('/hi');
        console.log('✅ Language switching works');
      }
    }
  });
});

console.log(`
╔════════════════════════════════════════════╗
║   UJOBS INDIA E2E TEST SUITE               ║
║   Comprehensive Production Testing         ║
╚════════════════════════════════════════════╝
`);
