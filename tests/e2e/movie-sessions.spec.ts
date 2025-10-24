import { test, expect } from '@playwright/test';

test('должен отображать детали фильма и его сеансы', async ({ page }) => {
  await page.goto('/movies');
  await page.waitForLoadState('networkidle');

  const firstMovieLink = page
    .locator('a')
    .filter({ hasText: 'Посмотреть сеансы' })
    .first();
  const href = await firstMovieLink.getAttribute('href');
  const movieId = href?.match(/\/movie\/(\d+)/)?.[1];

  expect(movieId).toBeTruthy();

  await page.goto(`/movie/${movieId}`);
  await page.waitForLoadState('networkidle');

  const title = page.locator('.movie > h1');
  await expect(title).toBeVisible();
  expect(await title.textContent()).toBeTruthy();

  const poster = page.locator('img');
  await expect(poster).toBeVisible();

  const description = page.locator('.description p');
  await expect(description).toBeVisible();

  const movieInfo = page.locator('.description ul li');
  await expect(movieInfo).toHaveCount(3);

  const sessions = page.locator('.movie-session');
  await expect(sessions.first()).toBeVisible();
});

test('должен отображать сеансы сгруппированные по датам и кинотеатрам', async ({
  page,
}) => {
  await page.goto('/movies');
  await page.waitForLoadState('networkidle');

  const firstMovieLink = page
    .locator('a')
    .filter({ hasText: 'Посмотреть сеансы' })
    .first();
  const href = await firstMovieLink.getAttribute('href');
  const movieId = href?.match(/\/movie\/(\d+)/)?.[1];

  await page.goto(`/movie/${movieId}`);
  await page.waitForLoadState('networkidle');

  const dateTitles = page.locator('.date-title');
  await expect(dateTitles.first()).toBeVisible();

  const cinemaBlocks = page.locator('.cinema-block');
  await expect(cinemaBlocks.first()).toBeVisible();

  const cinemaNames = page.locator('.cinema-name');
  await expect(cinemaNames.first()).toBeVisible();
  const timeButtons = page.locator('.time');
  await expect(timeButtons.first()).toBeVisible();
});

test('должен переходить на страницу бронирования при клике на время сеанса', async ({
  page,
}) => {
  await page.goto('/movies');
  await page.waitForLoadState('networkidle');

  const firstMovieLink = page
    .locator('a')
    .filter({ hasText: 'Посмотреть сеансы' })
    .first();
  const href = await firstMovieLink.getAttribute('href');
  const movieId = href?.match(/\/movie\/(\d+)/)?.[1];

  await page.goto(`/movie/${movieId}`);
  await page.waitForLoadState('networkidle');

  const firstTimeButton = page.locator('.time').first();
  await expect(firstTimeButton).toBeVisible();

  const timeHref = await firstTimeButton.getAttribute('href');
  expect(timeHref).toMatch(/^\/booking\/session\/\d+$/);

  await firstTimeButton.click();

  await expect(page).toHaveURL(timeHref!);
  await expect(page.locator('.book-session > h1')).toContainText('Выбрать места');
});
