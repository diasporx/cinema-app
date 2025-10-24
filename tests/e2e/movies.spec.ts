import { test, expect } from '@playwright/test';

test('должен отображать список фильмов', async ({ page }) => {
  await page.goto('/movies');
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL('/movies');

  const table = page.locator('table');
  await expect(table).toBeVisible();

  await expect(
    page.locator('th').filter({ hasText: 'Название' }),
  ).toBeVisible();
  await expect(
    page.locator('th').filter({ hasText: 'Продолжительность' }),
  ).toBeVisible();
  await expect(page.locator('th').filter({ hasText: 'Рейтинг' })).toBeVisible();

  const rows = page.locator('tbody tr');
  await expect(rows.first()).toBeVisible();
});

test('должен отображать детали фильма при клике на "Посмотреть сеансы"', async ({
  page,
}) => {
  await page.goto('/movies');
  await page.waitForLoadState('networkidle');

  const firstMovieLink = page
    .locator('a')
    .filter({ hasText: 'Посмотреть сеансы' })
    .first();
  await expect(firstMovieLink).toBeVisible();

  const href = await firstMovieLink.getAttribute('href');
  expect(href).toMatch(/^\/movie\/\d+$/);

  await firstMovieLink.click();

  await expect(page).toHaveURL(href!);
  await expect(page.locator('.movie > h1')).toBeVisible();
});

test('должен отображать постер фильма', async ({ page }) => {
  await page.goto('/movies');
  await page.waitForLoadState('networkidle');

  const posterImage = page.locator('img').first();
  await expect(posterImage).toBeVisible();

  const src = await posterImage.getAttribute('src');
  expect(src).toMatch(/^http:\/\/localhost:3022\//);
});

test('должен отображать информацию о фильме в таблице', async ({ page }) => {
  await page.goto('/movies');
  await page.waitForLoadState('networkidle');

  const firstRow = page.locator('tbody tr').first();

  const title = firstRow.locator('th').first();
  await expect(title).toBeVisible();
  expect(await title.textContent()).toBeTruthy();

  const duration = firstRow.locator('td').nth(1);
  await expect(duration).toBeVisible();
  const durationText = await duration.textContent();
  expect(durationText).toBeTruthy();
  expect(durationText!.length).toBeGreaterThan(0);

  const rating = firstRow.locator('td').nth(2);
  await expect(rating).toBeVisible();
  expect(await rating.textContent()).toMatch(/\d+(\.\d+)?/);
});
