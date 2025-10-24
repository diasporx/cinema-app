import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DetailSession } from '../../core/application/booking/DetailSession';
import type { IBookingRepo } from '../../core/domain/booking/IBookingRepo';
import type { Session } from '../../core/domain/booking/types';

describe('DetailSession', () => {
  let mockRepo: IBookingRepo;
  let detailSession: DetailSession;

  beforeEach(() => {
    mockRepo = {
      getDetailSession: vi.fn(),
      bookSeats: vi.fn(),
      getMyBookings: vi.fn(),
    };
    detailSession = new DetailSession(mockRepo);
  });

  describe('getDetails', () => {
    it('должен возвращать детали сессии от репозитория', async () => {
      const sessionId = 123;
      const expectedSessions: Session[] = [
        {
          id: 123,
          movieId: 456,
          cinemaId: 789,
          startTime: '2023-10-01T20:00:00Z',
          seats: { rows: 10, seatsPerRow: 15 },
          bookedSeats: [
            { rowNumber: 1, seatNumber: 5 },
            { rowNumber: 3, seatNumber: 8 },
          ],
        },
      ];

      vi.mocked(mockRepo.getDetailSession).mockResolvedValue(expectedSessions);

      const result = await detailSession.getDetails(sessionId);

      expect(mockRepo.getDetailSession).toHaveBeenCalledWith(sessionId);
      expect(result).toEqual(expectedSessions);
    });

    it('должен передавать ошибку от репозитория', async () => {
      const sessionId = 123;
      const error = new Error('Failed to fetch session details');

      vi.mocked(mockRepo.getDetailSession).mockRejectedValue(error);

      await expect(detailSession.getDetails(sessionId)).rejects.toThrow(
        'Failed to fetch session details',
      );
    });
  });
});
