import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Movies } from '../../core/application/movie/Movies';
import type { IMovieRepo } from '../../core/domain/movie/IMovieRepo';
import type { Movie, MovieSession } from '../../core/domain/movie/types';

describe('Movies', () => {
  let mockRepo: IMovieRepo;
  let movies: Movies;

  beforeEach(() => {
    mockRepo = {
      getMovies: vi.fn(),
      getSessionsForMovie: vi.fn(),
    };
    movies = new Movies(mockRepo);
  });

  describe('getAll', () => {
    it('должен возвращать список всех фильмов от репозитория', async () => {
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

      vi.mocked(mockRepo.getMovies).mockResolvedValue(expectedMovies);

      const result = await movies.getAll();

      expect(mockRepo.getMovies).toHaveBeenCalled();
      expect(result).toEqual(expectedMovies);
    });

    it('должен передавать ошибку от репозитория', async () => {
      const error = new Error('Failed to fetch movies');

      vi.mocked(mockRepo.getMovies).mockRejectedValue(error);

      await expect(movies.getAll()).rejects.toThrow('Failed to fetch movies');
    });
  });

  describe('getSessionsForMovie', () => {
    it('должен возвращать сеансы для фильма от репозитория', async () => {
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

      vi.mocked(mockRepo.getSessionsForMovie).mockResolvedValue(
        expectedSessions,
      );

      const result = await movies.getSessionsForMovie(movieId);

      expect(mockRepo.getSessionsForMovie).toHaveBeenCalledWith(movieId);
      expect(result).toEqual(expectedSessions);
    });

    it('должен передавать ошибку от репозитория', async () => {
      const movieId = 123;
      const error = new Error('Failed to fetch sessions');

      vi.mocked(mockRepo.getSessionsForMovie).mockRejectedValue(error);

      await expect(movies.getSessionsForMovie(movieId)).rejects.toThrow(
        'Failed to fetch sessions',
      );
    });
  });
});
