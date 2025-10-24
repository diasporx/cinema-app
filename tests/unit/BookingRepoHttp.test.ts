import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BookingRepoHttp } from '../../infra/http/booking/BookingRepoHttp';
import type {
  Session,
  BookSeatsRequest,
  BookSeatsResponse,
  Booking,
} from '../../core/domain/booking/types';

describe('BookingRepoHttp', () => {
  let bookingRepo: BookingRepoHttp;

  beforeEach(() => {
    bookingRepo = new BookingRepoHttp('http://localhost:3000');
  });

  describe('getDetailSession', () => {
    it('должен успешно получить детали сессии', async () => {
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).$fetch = vi.fn().mockResolvedValue(expectedSessions);

      const result = await bookingRepo.getDetailSession(sessionId);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((global as any).$fetch).toHaveBeenCalledWith(
        `/api/movieSessions/${sessionId}`,
        { method: 'GET' },
      );
      expect(result).toEqual(expectedSessions);
    });

    it('должен обработать ошибку HTTP и бросить исключение', async () => {
      const sessionId = 123;
      const mockError = new Error('Network error');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).$fetch = vi.fn().mockRejectedValue(mockError);

      await expect(bookingRepo.getDetailSession(sessionId)).rejects.toThrow(
        'Проверьте подключение к интернету',
      );
    });
  });

  describe('bookSeats', () => {
    it('должен успешно забронировать места', async () => {
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

      // Mock useAuthToken
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).useAuthToken = vi.fn().mockReturnValue({
        getToken: vi.fn().mockReturnValue('fake-token'),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).$fetch = vi.fn().mockResolvedValue(expectedResponse);

      const result = await bookingRepo.bookSeats(sessionId, request);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((global as any).$fetch).toHaveBeenCalledWith(
        `/api/movieSessions/${sessionId}/bookings`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer fake-token',
          },
          body: request,
        },
      );
      expect(result).toEqual(expectedResponse);
    });

    it('должен обработать ошибку HTTP и бросить исключение', async () => {
      const sessionId = 123;
      const request: BookSeatsRequest = {
        seats: [{ rowNumber: 1, seatNumber: 1 }],
      };
      const mockError = new Error('Booking failed');

      // Mock useAuthToken
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).useAuthToken = vi.fn().mockReturnValue({
        getToken: vi.fn().mockReturnValue('fake-token'),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).$fetch = vi.fn().mockRejectedValue(mockError);

      await expect(bookingRepo.bookSeats(sessionId, request)).rejects.toThrow(
        'Проверьте подключение к интернету',
      );
    });
  });

  describe('getMyBookings', () => {
    it('должен успешно получить бронирования пользователя', async () => {
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
      ];

      // Mock useAuthToken
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).useAuthToken = vi.fn().mockReturnValue({
        getToken: vi.fn().mockReturnValue('fake-token'),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).$fetch = vi.fn().mockResolvedValue(expectedBookings);

      const result = await bookingRepo.getMyBookings();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((global as any).$fetch).toHaveBeenCalledWith('/api/me/bookings', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer fake-token',
        },
      });
      expect(result).toEqual(expectedBookings);
    });

    it('должен обработать ошибку HTTP и бросить исключение', async () => {
      const mockError = new Error('Failed to fetch bookings');

      // Mock useAuthToken
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).useAuthToken = vi.fn().mockReturnValue({
        getToken: vi.fn().mockReturnValue('fake-token'),
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (global as any).$fetch = vi.fn().mockRejectedValue(mockError);

      await expect(bookingRepo.getMyBookings()).rejects.toThrow(
        'Проверьте подключение к интернету',
      );
    });
  });
});
