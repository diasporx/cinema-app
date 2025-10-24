import { test, expect } from '@playwright/test';

test('должен отображать список кинотеатров', async ({ page }) => {
  await page.goto('/cinemas');
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL('/cinemas');

  const table = page.locator('table');
  await expect(table).toBeVisible();

  await expect(
    page.locator('th').filter({ hasText: 'Кинотеатр' }),
  ).toBeVisible();
  await expect(page.locator('th').filter({ hasText: 'Адрес' })).toBeVisible();

  const rows = page.locator('tbody tr');
  await expect(rows.first()).toBeVisible();
});

test('должен отображать детали кинотеатра при клике на "Посмотреть сеансы"', async ({
  page,
}) => {
  await page.goto('/cinemas');
  await page.waitForLoadState('networkidle');

  const firstCinemaLink = page
    .locator('a')
    .filter({ hasText: 'Посмотреть сеансы' })
    .first();
  await expect(firstCinemaLink).toBeVisible();

  const href = await firstCinemaLink.getAttribute('href');
  expect(href).toMatch(/^\/cinema\/\d+$/);

  await firstCinemaLink.click();

  await expect(page).toHaveURL(href!);
  await expect(page.locator('.cinema > h1')).toBeVisible();
});

test('должен отображать информацию о кинотеатре в таблице', async ({
  page,
}) => {
  await page.goto('/cinemas');
  await page.waitForLoadState('networkidle');

  const firstRow = page.locator('tbody tr').first();

  const name = firstRow.locator('th').first();
  await expect(name).toBeVisible();
  expect(await name.textContent()).toBeTruthy();

  const address = firstRow.locator('td').first();
  await expect(address).toBeVisible();
  const addressText = await address.textContent();
  expect(addressText).toBeTruthy();
  expect(addressText!.length).toBeGreaterThan(0);
});
