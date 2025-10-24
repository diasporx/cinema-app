import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MovieRepoHttp } from '../../infra/http/movie/MovieRepoHttp';
import type { Movie, MovieSession } from '../../core/domain/movie/types';

describe('MovieRepoHttp', () => {
  let movieRepo: MovieRepoHttp;

  beforeEach(() => {
    movieRepo = new MovieRepoHttp('http://localhost:3000');
  });

  describe('getMovies', () => {
    it('должен успешно получить список фильмов', async () => {
      const expectedMovies: Movie[] = [
        {
          id: 1,
          title: 'Фильм 1',
          description: 'Описание фильма 1',
          year: 2023,
          lengthMinutes: 120,
          posterImage: '/images/movie1.jpg',
          rating: 8.5,
        },
        {
          id: 2,
          title: 'Фильм 2',
          description: 'Описание фильма 2',
          year: 2022,
          lengthMinutes: 95,
          posterImage: '/images/movie2.jpg',
          rating: 7.2,
        },
      ];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).$fetch = vi.fn().mockResolvedValue(expectedMovies);

      const result = await movieRepo.getMovies();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((global as any).$fetch).toHaveBeenCalledWith('/api/movies', {
        method: 'GET',
      });
      expect(result).toEqual(expectedMovies);
    });

    it('должен обработать ошибку HTTP и бросить исключение', async () => {
      const mockError = new Error('Network error');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).$fetch = vi.fn().mockRejectedValue(mockError);

      await expect(movieRepo.getMovies()).rejects.toThrow(
        'Проверьте подключение к интернету',
      );
    });
  });

  describe('getSessionsForMovie', () => {
    it('должен успешно получить сеансы для фильма', async () => {
      const movieId = 123;
      const expectedSessions: MovieSession[] = [
        {
          id: 1,
          movieId: 123,
          cinemaId: 456,
          startTime: '2023-10-01T20:00:00Z',
        },
        {
          id: 2,
          movieId: 123,
          cinemaId: 789,
          startTime: '2023-10-01T22:00:00Z',
        },
      ];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).$fetch = vi.fn().mockResolvedValue(expectedSessions);

      const result = await movieRepo.getSessionsForMovie(movieId);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((global as any).$fetch).toHaveBeenCalledWith(
        `/api/movies/${movieId}/sessions`,
        { method: 'GET' },
      );
      expect(result).toEqual(expectedSessions);
    });

    it('должен обработать ошибку HTTP и бросить исключение', async () => {
      const movieId = 123;
      const mockError = new Error('Network error');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).$fetch = vi.fn().mockRejectedValue(mockError);

      await expect(movieRepo.getSessionsForMovie(movieId)).rejects.toThrow(
        'Проверьте подключение к интернету',
      );
    });
  });
});
