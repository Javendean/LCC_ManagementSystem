import { test, expect } from '@playwright/test';

test('uploading the same csv twice does not create duplicate contacts', async ({ page }) => {
  // 1. Sign up a new user
  const email = `test-${Date.now()}@example.com`;
  const password = 'password';

  await page.goto('/signup');
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('button[type="submit"]').click();

  // Wait for the redirect to the contacts page
  await page.waitForURL('/contacts');

  // 2. Upload a CSV file
  const csvContent = `First Name,Last Name,Phone Number
John,Doe,1234567890`;

  const file = {
    name: 'contacts.csv',
    mimeType: 'text/csv',
    buffer: Buffer.from(csvContent),
  };

  await page.locator('[data-testid="csv-uploader"] input[type="file"]').setInputFiles(file);
  await page.locator('[data-testid="csv-uploader"] button').click();

  // 3. Verify the contact is displayed
  await expect(page.getByRole('cell', { name: 'John' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Doe' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1234567890' })).toBeVisible();


  // 4. Upload the same CSV file again
  await page.locator('[data-testid="csv-uploader"] input[type="file"]').setInputFiles(file);
  await page.locator('[data-testid="csv-uploader"] button').click();

  // 5. Verify that there is only one contact
  // After the second upload, we wait for the table to potentially update.
  // A simple way to wait is to check for a state that indicates the update is complete.
  // For example, we can wait for the row to be visible again.
  await expect(page.getByRole('cell', { name: 'John' })).toBeVisible();

  const rows = await page.locator('table tbody tr').count();
  expect(rows).toBe(1);
});
