import { test, expect } from '@playwright/test';

test('debug hero and header layout', async ({ page }) => {
  page.on('console', msg => console.log('BROWSER:', msg.text()));
  // Go to homepage and wait for redirect
  await page.goto('/en', { waitUntil: 'load', timeout: 60000 });

  // Wait for animations to settle
  await page.waitForTimeout(2000);

  // 1. Check Header Positioning
  const header = page.locator('header');
  await header.waitFor({ state: 'visible', timeout: 15000 });
  await expect(header).toBeVisible();
  const headerBox = await header.boundingBox();
  console.log('Header Bounding Box:', headerBox);

  // 2. Check Trust Badge (subtitle) in Hero
  // Updated text from HeroSlider.tsx
  const trustBadge = page.getByText("India's Most Trusted Workforce Platform");
  await expect(trustBadge).toBeVisible();

  // 4. Check Play Store Stats Visualization
  const playStoreStats = page.locator('h3:has-text("uJobs India")');
  await expect(playStoreStats.first()).toBeVisible();

  // 5. Check Main Headline
  const headline = page.locator('h1');
  await expect(headline).toBeVisible();

  // 7. Check Menu Text Visibility (Contrast check)
  // Get computed style for a nav link
  const navLink = page.locator('nav a').first();
  const color = await navLink.evaluate((el) => window.getComputedStyle(el).color);
  console.log('Nav Link Color:', color);
});
