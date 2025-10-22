export interface PageMeta {
    title: string;
}

export const pageMeta: Record<string, PageMeta> = {
    '/': {
        title: 'Главная страница',
    },
    '/movies': {
        title: 'Фильмы',
    },
    '/cinemas': {
        title: 'Кинотеатры',
    },
    '/tickets': {
        title: 'Мои билеты',
    },

    '/auth/login': {
        title: 'Вход',
    },
    '/auth/register': {
        title: 'Регистрация',
    },
};
