import type {
  Session,
  BookSeatsRequest,
  BookSeatsResponse,
  Booking,
} from './types';

export interface IBookingRepo {
  getDetailSession(sessionId: number): Promise<Session[]>;
  bookSeats(
    movieSessionId: number,
    request: BookSeatsRequest,
  ): Promise<BookSeatsResponse>;
  getMyBookings(): Promise<Booking[]>;
}
