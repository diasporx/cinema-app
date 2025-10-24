import type { ErrorsMessages } from './types';

export const ERRORS_MESSAGES: ErrorsMessages = {
  USERNAME_TOO_SHORT: 'Имя пользователя должно содержать минимум 8 символов',
  PASSWORD_TOO_SHORT: 'Пароль должен содержать минимум 8 символов',
  PASSWORD_NO_UPPERCASE: 'Пароль должен содержать хотя бы одну заглавную букву',
  PASSWORD_NO_DIGIT: 'Пароль должен содержать хотя бы одну цифру',
  PASSWORDS_DO_NOT_MATCH: 'Пароли не совпадают',
  USER_MUST_BE_AUTHENTICATED: 'Пользователь должен быть авторизирован',
} as const;
