import { test, expect } from '@playwright/test';

test('должен отображать детали кинотеатра и его сеансы', async ({ page }) => {
  await page.goto('/cinemas');
  await page.waitForLoadState('networkidle');

  const firstCinemaLink = page
    .locator('a')
    .filter({ hasText: 'Посмотреть сеансы' })
    .first();
  const href = await firstCinemaLink.getAttribute('href');
  const cinemaId = href?.match(/\/cinema\/(\d+)/)?.[1];

  expect(cinemaId).toBeTruthy();

  await page.goto(`/cinema/${cinemaId}`);
  await page.waitForLoadState('networkidle');

  const title = page.locator('.cinema > h1');
  await expect(title).toBeVisible();
  expect(await title.textContent()).toBeTruthy();

  const sessions = page.locator('.movie-session');
  await expect(sessions.first()).toBeVisible();
});

test('должен отображать сеансы сгруппированные по датам и фильмам', async ({
  page,
}) => {
  await page.goto('/cinemas');
  await page.waitForLoadState('networkidle');

  const firstCinemaLink = page
    .locator('a')
    .filter({ hasText: 'Посмотреть сеансы' })
    .first();
  const href = await firstCinemaLink.getAttribute('href');
  const cinemaId = href?.match(/\/cinema\/(\d+)/)?.[1];

  await page.goto(`/cinema/${cinemaId}`);
  await page.waitForLoadState('networkidle');

  const dateTitles = page.locator('.date-title');
  await expect(dateTitles.first()).toBeVisible();

  const movieBlocks = page.locator('.cinema-block');
  await expect(movieBlocks.first()).toBeVisible();

  const movieNames = page.locator('.cinema-name');
  await expect(movieNames.first()).toBeVisible();

  const timeButtons = page.locator('.time');
  await expect(timeButtons.first()).toBeVisible();
});

test('должен переходить на страницу бронирования при клике на время сеанса', async ({
  page,
}) => {
  await page.goto('/cinemas');
  await page.waitForLoadState('networkidle');

  const firstCinemaLink = page
    .locator('a')
    .filter({ hasText: 'Посмотреть сеансы' })
    .first();
  const href = await firstCinemaLink.getAttribute('href');
  const cinemaId = href?.match(/\/cinema\/(\d+)/)?.[1];

  await page.goto(`/cinema/${cinemaId}`);
  await page.waitForLoadState('networkidle');

  const firstTimeButton = page.locator('.time').first();
  await expect(firstTimeButton).toBeVisible();

  const timeHref = await firstTimeButton.getAttribute('href');
  expect(timeHref).toMatch(/^\/booking\/session\/\d+$/);

  await firstTimeButton.click();

  await expect(page).toHaveURL(timeHref!);
  await expect(page.locator('.book-session > h1')).toContainText('Выбрать места');
});
