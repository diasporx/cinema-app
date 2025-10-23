export interface Movie {
    id: number,
    title: string,
    description: string,
    year: number,
    lengthMinutes: number,
    posterImage: string,
    rating: number,
}

export interface MovieSession {
    id: number;
    movieId: number;
    cinemaId: number;
    startTime: string;
}

export interface SessionNotFound {
    message: string;
    error: string;
}
