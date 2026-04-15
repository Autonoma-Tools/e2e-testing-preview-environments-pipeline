import { test, expect } from '@playwright/test';

// Minimal smoke spec — proves the config is wired up correctly.
// Uses page.goto('/') so it inherits the baseURL from playwright.config.ts,
// which is what makes the same file work against localhost AND a Vercel
// preview URL without any code change.

test('home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/.+/);
});
