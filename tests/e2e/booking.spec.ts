import { test, expect } from '@playwright/test';

test('должен отображать схему зала и информацию о сеансе', async ({ page }) => {
  await page.goto('/movies');
  await page.waitForLoadState('networkidle');

  const firstMovieLink = page
    .locator('a')
    .filter({ hasText: 'Посмотреть сеансы' })
    .first();
  await firstMovieLink.click();

  const firstTimeButton = page.locator('.time').first();
  const sessionHref = await firstTimeButton.getAttribute('href');
  const sessionId = sessionHref?.match(/\/booking\/session\/(\d+)/)?.[1];

  expect(sessionId).toBeTruthy();

  await page.goto(`/booking/session/${sessionId}`);
  await page.waitForLoadState('networkidle');

  await expect(page.locator('.book-session > h1')).toContainText('Выбрать места');

  const movieInfo = page.locator('ul li').first();
  await expect(movieInfo).toBeVisible();

  const seatsWrapper = page.locator('.seats-wrapper');
  await expect(seatsWrapper).toBeVisible();

  const seats = page.locator('.seat');
  await expect(seats.first()).toBeVisible();
});

test('должен позволять выбирать и отменять выбор мест', async ({ page }) => {
  await page.goto('/movies');
  await page.waitForLoadState('networkidle');

  const firstMovieLink = page
    .locator('a')
    .filter({ hasText: 'Посмотреть сеансы' })
    .first();
  await firstMovieLink.click();

  const firstTimeButton = page.locator('.time').first();
  const sessionHref = await firstTimeButton.getAttribute('href');
  const sessionId = sessionHref?.match(/\/booking\/session\/(\d+)/)?.[1];

  await page.goto(`/booking/session/${sessionId}`);
  await page.waitForLoadState('networkidle');

  const availableSeat = page.locator('.seat:not(.bg-red-500)').first();
  await expect(availableSeat).toBeVisible();

  await availableSeat.click();
  await expect(availableSeat).toHaveClass(/bg-blue-500/);

  const selectedSeatsText = page
    .locator('p')
    .filter({ hasText: 'Выбранные места:' });
  await expect(selectedSeatsText).toBeVisible();

  await availableSeat.click();
  await expect(availableSeat).toHaveClass(/h-8 w-8 seat rounded-md border/);
});

test('должен отображать кнопку бронирования при выборе мест', async ({
  page,
}) => {
  await page.goto('/movies');
  await page.waitForLoadState('networkidle');

  const firstMovieLink = page
    .locator('a')
    .filter({ hasText: 'Посмотреть сеансы' })
    .first();
  await firstMovieLink.click();

  const firstTimeButton = page.locator('.time').first();
  const sessionHref = await firstTimeButton.getAttribute('href');
  const sessionId = sessionHref?.match(/\/booking\/session\/(\d+)/)?.[1];

  await page.goto(`/booking/session/${sessionId}`);
  await page.waitForLoadState('networkidle');

  const bookButton = page
    .locator('button')
    .filter({ hasText: 'Забронировать' });
  await expect(bookButton).not.toBeVisible();

  const availableSeat = page.locator('.seat:not(.bg-red-500)').first();
  await availableSeat.click();

  await expect(bookButton).toBeVisible();
});

test('должен требовать авторизации для бронирования', async ({ page }) => {
  await page.goto('/movies');
  await page.waitForLoadState('networkidle');

  const firstMovieLink = page
    .locator('a')
    .filter({ hasText: 'Посмотреть сеансы' })
    .first();
  await firstMovieLink.click();

  const firstTimeButton = page.locator('.time').first();
  const sessionHref = await firstTimeButton.getAttribute('href');
  const sessionId = sessionHref?.match(/\/booking\/session\/(\d+)/)?.[1];

  await page.goto(`/booking/session/${sessionId}`);
  await page.waitForLoadState('networkidle');

  const availableSeat = page.locator('.seat:not(.bg-red-500)').first();
  await availableSeat.click();

  const bookButton = page
    .locator('button')
    .filter({ hasText: 'Забронировать' });
  await bookButton.click();

  await expect(page).toHaveURL('/auth/login');
});
