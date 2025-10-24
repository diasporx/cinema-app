import type { Movie, MovieSession } from './types';

export interface IMovieRepo {
  getMovies(): Promise<Movie[]>;
  getSessionsForMovie(movieId: number): Promise<MovieSession[]>;
}
