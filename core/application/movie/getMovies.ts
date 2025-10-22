import type { IMovieRepo } from "@core/domain/movie/IMovieRepo";
import type { Movie } from "@core/domain/movie/types";


export class Movies {
    constructor(private repo: IMovieRepo) {}

    async exec(): Promise<Movie[]> {
        return await this.repo.getMovies();
    }
}
