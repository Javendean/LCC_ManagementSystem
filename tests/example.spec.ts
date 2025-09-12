import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await page.screenshot({ path: 'screenshot.png' });
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/LCC Management System/);
});
