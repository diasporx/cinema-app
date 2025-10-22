type SuccessMessages = Record<string, string>;

export const SUCCESS_MESSAGES: SuccessMessages = {
    LOGIN_SUCCESS: 'Успешный вход в систему',
    REGISTER_SUCCESS: 'Пользователь успешно зарегистрирован',
} as const;