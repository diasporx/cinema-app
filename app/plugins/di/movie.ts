import { container } from './container';
import { MovieRepoHttp } from '@infra/http/movie/MovieRepoHttp';
import { Movies } from '@core/application/movie/Movies';

container.register('movieUC', (_container, apiBase) => {
  const repo = new MovieRepoHttp(apiBase);
  const getMovies = new Movies(repo);

  return { getMovies };
});
