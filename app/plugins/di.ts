import './di/auth';
import './di/cinema';
import './di/movie';
import './di/booking';
import { container } from './di/container';
import type { LoginUser } from '@core/application/auth/LoginUser';
import type { RegisterUser } from '@core/application/auth/RegisterUser';
import type { Movies } from '@core/application/movie/Movies';
import type { Cinemas } from '@core/application/cinema/Cinemas';
import type { DetailSession } from '@core/application/booking/DetailSession';
import type { BookSeats } from '@core/application/booking/BookSeats';
import type { Bookings } from '@core/application/booking/Bookings';

export default defineNuxtPlugin(() => {
  const {
    public: { apiBase },
  } = useRuntimeConfig();

  return {
    provide: {
      authUC: container.resolve<{
        loginUser: LoginUser;
        registerUser: RegisterUser;
      }>('authUC', apiBase),
      cinemaUC: container.resolve<{ getCinemas: Cinemas }>('cinemaUC', apiBase),
      movieUC: container.resolve<{ getMovies: Movies }>('movieUC', apiBase),
      bookingUC: container.resolve<{
        getDetails: DetailSession;
        bookSeats: BookSeats;
        getBookings: Bookings;
      }>('bookingUC', apiBase),
    },
  };
});
