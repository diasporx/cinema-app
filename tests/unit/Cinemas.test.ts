import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Cinemas } from '../../core/application/cinema/Cinemas';
import type { ICinemaRepo } from '../../core/domain/cinema/ICinemaRepo';
import type { Cinema, CinemaSession } from '../../core/domain/cinema/types';

describe('Cinemas', () => {
  let mockRepo: ICinemaRepo;
  let cinemas: Cinemas;

  beforeEach(() => {
    mockRepo = {
      getCinemas: vi.fn(),
      getSessionsForCinema: vi.fn(),
    };
    cinemas = new Cinemas(mockRepo);
  });

  describe('getAll', () => {
    it('должен возвращать список всех кинотеатров от репозитория', async () => {
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

      vi.mocked(mockRepo.getCinemas).mockResolvedValue(expectedCinemas);

      const result = await cinemas.getAll();

      expect(mockRepo.getCinemas).toHaveBeenCalled();
      expect(result).toEqual(expectedCinemas);
    });

    it('должен передавать ошибку от репозитория', async () => {
      const error = new Error('Failed to fetch cinemas');

      vi.mocked(mockRepo.getCinemas).mockRejectedValue(error);

      await expect(cinemas.getAll()).rejects.toThrow('Failed to fetch cinemas');
    });
  });

  describe('getSessionsForCinema', () => {
    it('должен возвращать сеансы для кинотеатра от репозитория', async () => {
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

      vi.mocked(mockRepo.getSessionsForCinema).mockResolvedValue(
        expectedSessions,
      );

      const result = await cinemas.getSessionsForCinema(movieId);

      expect(mockRepo.getSessionsForCinema).toHaveBeenCalledWith(movieId);
      expect(result).toEqual(expectedSessions);
    });

    it('должен передавать ошибку от репозитория', async () => {
      const movieId = 123;
      const error = new Error('Failed to fetch sessions');

      vi.mocked(mockRepo.getSessionsForCinema).mockRejectedValue(error);

      await expect(cinemas.getSessionsForCinema(movieId)).rejects.toThrow(
        'Failed to fetch sessions',
      );
    });
  });
});
