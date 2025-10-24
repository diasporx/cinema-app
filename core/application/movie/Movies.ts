import type { IMovieRepo } from "@core/domain/movie/IMovieRepo";
import type { Movie, MovieSession } from "@core/domain/movie/types";

export class Movies {
    constructor(private repo: IMovieRepo) {}

    async getAll(): Promise<Movie[]> {
        return await this.repo.getMovies();
    }

    async getSessionsForMovie(movieId: number): Promise<MovieSession[]> {
        return await this.repo.getSessionsForMovie(movieId);
    }
}
