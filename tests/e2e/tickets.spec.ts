import { test, expect } from '@playwright/test';

test('должен отображать страницу билетов', async ({ page }) => {
  await page.goto('/tickets');
  await page.waitForLoadState('networkidle');

  await expect(page.locator('.tickets > h1')).toContainText('Мои билеты');
});

test('должен отображать список билетов для авторизованного пользователя', async ({
  page,
}) => {
  await page.goto('/auth/register');
  await page.waitForLoadState('networkidle');

  const username = `testuser${Date.now()}`;
  const password = 'ValidPass123';

  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.fill('#repeatPassword', password);
  await page.click('button:has-text("Зарегестрироваться")');

  await page.waitForURL('/movies');
  await page.goto('/auth/login');
  await page.waitForLoadState('networkidle');

  await page.fill('#username', username);
  await page.fill('#password', password);
  await page.click('button:has-text("Войти")');

  await page.waitForURL('/movies');

  await page.goto('/tickets');
  await page.waitForLoadState('networkidle');

  await expect(page.locator('.tickets > h1')).toContainText('Мои билеты');
});

test('должен перенаправлять неавторизованного пользователя на страницу входа', async ({
  page,
}) => {
  await page.goto('/tickets');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL('/auth/login');
});
