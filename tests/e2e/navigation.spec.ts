import { test, expect } from '@playwright/test';

test('должен иметь навигацию между основными страницами', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const moviesLink = page.locator('a').filter({ hasText: 'Фильмы' });
  const cinemasLink = page.locator('a').filter({ hasText: 'Кинотеатры' });
  const ticketsLink = page.locator('a').filter({ hasText: 'Мои билеты' });

  await expect(moviesLink).toBeVisible();
  await expect(cinemasLink).toBeVisible();
  await expect(ticketsLink).toBeVisible();
});

test('должен переходить на страницу фильмов', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const moviesLink = page.locator('a').filter({ hasText: 'Фильмы' });
  await moviesLink.click();

  await expect(page).toHaveURL('/movies');
});

test('должен переходить на страницу кинотеатров', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  const cinemasLink = page.locator('a').filter({ hasText: 'Кинотеатры' });
  await cinemasLink.click();

  await expect(page).toHaveURL('/cinemas');
});
