export interface PageMeta {
    title: string;
    description: string;
}

export const pageMeta: Record<string, PageMeta> = {
    '/': {
        title: 'Главная страница',
        description: 'Добро пожаловать в наше приложение',
    },
    '/auth/login': {
        title: 'Вход',
        description: 'Страница авторизации',
    },
    '/auth/register': {
        title: 'Регистрация',
        description: 'Создайте новый аккаунт',
    },
};
