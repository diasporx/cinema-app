import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CinemaRepoHttp } from '../../infra/http/cinema/CinemaRepoHttp';
import type { Cinema, CinemaSession } from '../../core/domain/cinema/types';

describe('CinemaRepoHttp', () => {
  let cinemaRepo: CinemaRepoHttp;

  beforeEach(() => {
    cinemaRepo = new CinemaRepoHttp('http://localhost:3000');
  });

  describe('getCinemas', () => {
    it('должен успешно получить список кинотеатров', async () => {
      const expectedCinemas: Cinema[] = [
        {
          id: 1,
          name: 'Кинотеатр 1',
          address: 'ул. Ленина, 1',
        },
        {
          id: 2,
          name: 'Кинотеатр 2',
          address: 'ул. Пушкина, 10',
        },
      ];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).$fetch = vi.fn().mockResolvedValue(expectedCinemas);

      const result = await cinemaRepo.getCinemas();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((global as any).$fetch).toHaveBeenCalledWith('/api/cinemas', {
        method: 'GET',
      });
      expect(result).toEqual(expectedCinemas);
    });

    it('должен обработать ошибку HTTP и бросить исключение', async () => {
      const mockError = new Error('Network error');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).$fetch = vi.fn().mockRejectedValue(mockError);

      await expect(cinemaRepo.getCinemas()).rejects.toThrow(
        'Проверьте подключение к интернету',
      );
    });
  });

  describe('getSessionsForCinema', () => {
    it('должен успешно получить сеансы для кинотеатра', async () => {
      const movieId = 123;
      const expectedSessions: CinemaSession[] = [
        {
          id: 1,
          movieId: '456',
          cinemaId: '789',
          startTime: '2023-10-01T20:00:00Z',
        },
        {
          id: 2,
          movieId: '456',
          cinemaId: '789',
          startTime: '2023-10-01T22:00:00Z',
        },
      ];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).$fetch = vi.fn().mockResolvedValue(expectedSessions);

      const result = await cinemaRepo.getSessionsForCinema(movieId);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((global as any).$fetch).toHaveBeenCalledWith(
        `/api/cinemas/${movieId}/sessions`,
        { method: 'GET' },
      );
      expect(result).toEqual(expectedSessions);
    });

    it('должен обработать ошибку HTTP и бросить исключение', async () => {
      const movieId = 123;
      const mockError = new Error('Network error');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).$fetch = vi.fn().mockRejectedValue(mockError);

      await expect(cinemaRepo.getSessionsForCinema(movieId)).rejects.toThrow(
        'Проверьте подключение к интернету',
      );
    });
  });
});
