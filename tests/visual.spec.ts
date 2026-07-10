import { test, expect } from '@playwright/test';

test('homepage visual and CSS loading check', async ({ page }) => {
  await page.goto('/en', { waitUntil: 'load', timeout: 60000 });
  
  // Check if body has the correct background color (white in new minimalist design)
  const body = page.locator('body');
  await expect(body).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  
  // Check if Navbar exists and is visible
  const nav = page.locator('nav');
  await expect(nav.first()).toBeVisible({ timeout: 15000 });

  // Check if main content is visible
  const main = page.locator('main');
  await expect(main).toBeVisible({ timeout: 15000 });

  console.log('Visual basic checks passed');
});

test('homepage specializations category grid check', async ({ page }) => {
  await page.goto('/en', { waitUntil: 'load', timeout: 60000 });
  
  // Wait for the category section to load/render
  const categoryHeading = page.locator('h3:has-text("Most Searched")');
  await categoryHeading.waitFor({ state: 'visible', timeout: 30000 });
  await expect(categoryHeading).toBeVisible();

  // The category links container is the grid immediately after or containing the categories
  const categoryLinks = page.locator('div.grid-cols-2.md\\:grid-cols-3.lg\\:grid-cols-5 a');
  const count = await categoryLinks.count();
  console.log(`Found ${count} category cards on the homepage`);

  // Assert that we have exactly 10 categories displayed (2 rows of 5 on desktop)
  expect(count).toBe(10);
});

test('media coverage page visual check', async ({ page }) => {
  await page.goto('/en/media-coverage', { waitUntil: 'load', timeout: 60000 });
  
  // Verify main title is displayed
  const title = page.locator('h1:has-text("Ujobs India in")');
  await expect(title).toBeVisible({ timeout: 15000 });

  // Verify that there is a grid of 8 media coverage items
  const cards = page.locator('div.grid.md\\:grid-cols-2.lg\\:grid-cols-3 a');
  const count = await cards.count();
  console.log(`Found ${count} media coverage cards`);
  expect(count).toBe(8);
});
