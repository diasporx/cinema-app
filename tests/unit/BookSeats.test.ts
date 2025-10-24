import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BookSeats } from '../../core/application/booking/BookSeats';
import type { IBookingRepo } from '../../core/domain/booking/IBookingRepo';
import type {
  BookSeatsRequest,
  BookSeatsResponse,
} from '../../core/domain/booking/types';

describe('BookSeats', () => {
  let mockRepo: IBookingRepo;
  let bookSeats: BookSeats;

  beforeEach(() => {
    mockRepo = {
      getDetailSession: vi.fn(),
      bookSeats: vi.fn(),
      getMyBookings: vi.fn(),
    };
    bookSeats = new BookSeats(mockRepo);
  });

  describe('execute', () => {
    it('должен успешно бронировать места и возвращать ответ от репозитория', async () => {
      const sessionId = 123;
      const request: BookSeatsRequest = {
        seats: [
          { rowNumber: 1, seatNumber: 5 },
          { rowNumber: 2, seatNumber: 3 },
        ],
      };
      const expectedResponse: BookSeatsResponse = {
        bookingId: 'booking-456',
      };

      vi.mocked(mockRepo.bookSeats).mockResolvedValue(expectedResponse);

      const result = await bookSeats.execute(sessionId, request);

      expect(mockRepo.bookSeats).toHaveBeenCalledWith(sessionId, request);
      expect(result).toEqual(expectedResponse);
    });

    it('должен передавать ошибку от репозитория', async () => {
      const sessionId = 123;
      const request: BookSeatsRequest = {
        seats: [{ rowNumber: 1, seatNumber: 1 }],
      };
      const error = new Error('Booking failed');

      vi.mocked(mockRepo.bookSeats).mockRejectedValue(error);

      await expect(bookSeats.execute(sessionId, request)).rejects.toThrow(
        'Booking failed',
      );
    });
  });
});
