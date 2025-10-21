import { test, expect } from '@playwright/test'

test('должен успешно зарегистрироваться с корректными учетными данными', async ({ page }) => {
  const username = `testuser${Date.now()}`
  const password = 'ValidPass123'

  await page.goto('/auth/register')
  await page.waitForLoadState('networkidle')
  await page.fill('#userNameField', username)
  await page.fill('#passwordField', password)
  await page.fill('#RepeatPasswordField', password)

  await page.click('button:has-text("Зарегестрироваться")')

  await expect(page).toHaveURL('/auth/login')
})

test('должен показать ошибку когда пароли не совпадают', async ({ page }) => {
  await page.goto('/auth/register')
  await page.waitForLoadState('networkidle')
  await page.fill('#userNameField', 'newuser123')
  await page.fill('#passwordField', 'ValidPass123')
  await page.fill('#RepeatPasswordField', 'DifferentPass123')

  await page.click('button:has-text("Зарегестрироваться")')

  await expect(page.locator('text=Пароли не совпадают')).toBeVisible()
})

test('должен показать ошибку при неудачной регистрации', async ({ page }) => {
  await page.goto('/auth/register')
  await page.waitForLoadState('networkidle')
  await page.fill('#userNameField', 'existinguser')
  await page.fill('#passwordField', 'ValidPass123')
  await page.fill('#RepeatPasswordField', 'ValidPass123')

  await page.click('button:has-text("Зарегестрироваться")')

  await expect(page.locator('text=Имя пользователя уже существует')).toBeVisible()
})

test('должен показать ошибку валидации для короткого имени пользователя', async ({ page }) => {
  await page.goto('/auth/register')
  await page.waitForLoadState('networkidle')
  await page.fill('#userNameField', 'short')
  await page.fill('#passwordField', 'ValidPass123')
  await page.fill('#RepeatPasswordField', 'ValidPass123')

  await page.click('button:has-text("Зарегестрироваться")')

  await expect(page.locator('text=Имя пользователя должно содержать минимум 8 символов')).toBeVisible()
})

test('должен показать ошибку валидации для слабого пароля', async ({ page }) => {
  await page.goto('/auth/register')
  await page.waitForLoadState('networkidle')
  await page.fill('#userNameField', 'validuser123')
  await page.fill('#passwordField', 'weak')
  await page.fill('#RepeatPasswordField', 'weak')

  await page.click('button:has-text("Зарегестрироваться")')

  await expect(page.locator('text=Пароль должен содержать минимум 8 символов')).toBeVisible()
})

test('должен перейти на страницу входа', async ({ page }) => {
  await page.goto('/auth/register')
  await page.waitForLoadState('networkidle')
  await page.click('text=Войдите')

  await expect(page).toHaveURL('/auth/login')
})
