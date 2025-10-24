import { container } from './container';
import { CinemaRepoHttp } from '@infra/http/cinema/CinemaRepoHttp';
import { Cinemas } from '@core/application/cinema/Cinemas';

container.register('cinemaUC', (_container, apiBase) => {
  const repo = new CinemaRepoHttp(apiBase);
  const getCinemas = new Cinemas(repo);

  return { getCinemas };
});
