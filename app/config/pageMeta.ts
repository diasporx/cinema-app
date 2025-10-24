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
    '/movie/:id()': {
        title: 'Фильм',
    },
    '/cinema/:id()': {
        title: 'Кинотеатр',
    },
    '/booking/session/:id()': {
        title: 'Сеанс',
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
