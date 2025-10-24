import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Bookings } from '../../core/application/booking/Bookings';
import type { IBookingRepo } from '../../core/domain/booking/IBookingRepo';
import type { Booking } from '../../core/domain/booking/types';

describe('Bookings', () => {
  let mockRepo: IBookingRepo;
  let bookings: Bookings;

  beforeEach(() => {
    mockRepo = {
      getDetailSession: vi.fn(),
      bookSeats: vi.fn(),
      getMyBookings: vi.fn(),
    };
    bookings = new Bookings(mockRepo);
  });

  describe('getBookings', () => {
    it('должен возвращать список бронирований от репозитория', async () => {
      const expectedBookings: Booking[] = [
        {
          id: 'booking1',
          movieSessionId: 1,
          userId: 123,
          isPaid: false,
          seats: [
            { rowNumber: 1, seatNumber: 1 },
            { rowNumber: 1, seatNumber: 2 },
          ],
          bookedAt: '2023-10-01T10:00:00Z',
        },
        {
          id: 'booking2',
          movieSessionId: 2,
          userId: 123,
          isPaid: true,
          seats: [{ rowNumber: 2, seatNumber: 5 }],
          bookedAt: '2023-10-02T14:30:00Z',
        },
      ];

      vi.mocked(mockRepo.getMyBookings).mockResolvedValue(expectedBookings);

      const result = await bookings.getBookings();

      expect(mockRepo.getMyBookings).toHaveBeenCalled();
      expect(result).toEqual(expectedBookings);
    });

    it('должен передавать ошибку от репозитория', async () => {
      const error = new Error('Failed to fetch bookings');

      vi.mocked(mockRepo.getMyBookings).mockRejectedValue(error);

      await expect(bookings.getBookings()).rejects.toThrow(
        'Failed to fetch bookings',
      );
    });
  });
});
