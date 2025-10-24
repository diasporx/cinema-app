import { test, expect } from '@playwright/test';

test('должен показать ошибку для некорректных учетных данных', async ({
  page,
}) => {
  await page.goto('/auth/login');
  await page.waitForLoadState('networkidle');
  await page.fill('#userNameField', 'invaliduser');
  await page.fill('#passwordField', 'wrongpass');

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
  await page.fill('#userNameField', 'short');
  await page.fill('#passwordField', 'ValidPass123');

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
  await page.fill('#userNameField', 'validuser');
  await page.fill('#passwordField', 'weak');

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
