import type { Movie } from "./types";

export interface IMovieRepo {
    getMovies(): Promise<Movie[]>
}
