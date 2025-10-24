import type { SuccessMessages } from "@core/domain/auth/types";

export const SUCCESS_MESSAGES: SuccessMessages = {
    LOGIN_SUCCESS: 'Успешный вход в систему',
    REGISTER_SUCCESS: 'Пользователь успешно зарегистрирован',
    LOGOUT_SUCCESS: 'Вы вышли из системы',
} as const;
