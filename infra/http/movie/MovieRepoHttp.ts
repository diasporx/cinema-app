import type { IMovieRepo } from "@core/domain/movie/IMovieRepo";
import type { Movie } from "@core/domain/movie/types";
import { HttpErrorHandler } from "@core/domain/shared/HttpErrorHandler";

export class MovieRepoHttp implements IMovieRepo {
    constructor(private apiBase: string) {}

    private handleError(error: unknown) {
        console.log(error)
    }

    async getMovies(): Promise<Movie[]> {
        try {
            return await $fetch<Movie[]>('/api/movies', { method: 'GET' })
        } catch (error) {
            HttpErrorHandler.handle(error)
            return []
        }
    }
}
