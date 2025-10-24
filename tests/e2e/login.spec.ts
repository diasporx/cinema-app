import { test, expect } from '@playwright/test';

test('должен показать ошибку для некорректных учетных данных', async ({
  page,
}) => {
  await page.goto('/auth/login');
  await page.waitForLoadState('networkidle');
  await page.fill('#username', 'invaliduser');
  await page.fill('#password', 'wrongpass');

  await page.click('button:has-text("Войти")');

  await expect(
    page.locator('text=Пароль должен содержать хотя бы одну заглавную букву'),
  ).toBeVisible();
});

test('должен показать ошибку валидации для короткого имени пользователя', async ({
  page,
}) => {
  await page.goto('/auth/login');
  await page.waitForLoadState('networkidle');
  await page.fill('#username', 'short');
  await page.fill('#password', 'ValidPass123');

  await page.click('button:has-text("Войти")');

  await expect(
    page.locator('text=Имя пользователя должно содержать минимум 8 символов'),
  ).toBeVisible();
});

test('должен показать ошибку валидации для слабого пароля', async ({
  page,
}) => {
  await page.goto('/auth/login');
  await page.waitForLoadState('networkidle');
  await page.fill('#username', 'validuser');
  await page.fill('#password', 'weak');

  await page.click('button:has-text("Войти")');

  await expect(
    page.locator('text=Пароль должен содержать минимум 8 символов'),
  ).toBeVisible();
});

test('должен перейти на страницу регистрации', async ({ page }) => {
  await page.goto('/auth/login');
  await page.waitForLoadState('networkidle');
  await page.click('text=зарегистрируйтесь');

  await expect(page).toHaveURL('/auth/register');
});
