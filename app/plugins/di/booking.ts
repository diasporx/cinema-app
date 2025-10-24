import { container } from './container';
import { BookingRepoHttp } from '@infra/http/booking/BookingRepoHttp';
import { DetailSession } from '@core/application/booking/DetailSession';
import { BookSeats } from '@core/application/booking/BookSeats';
import { Bookings } from '@core/application/booking/Bookings';

container.register('bookingUC', (_container, apiBase) => {
  const repo = new BookingRepoHttp(apiBase);
  const getDetails = new DetailSession(repo);
  const bookSeats = new BookSeats(repo);
  const getBookings = new Bookings(repo);

  return { getDetails, bookSeats, getBookings };
});
