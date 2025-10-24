import type { Cinema, CinemaSession } from './types';

export interface ICinemaRepo {
  getCinemas(): Promise<Cinema[]>;
  getSessionsForCinema(cinemaId: number): Promise<CinemaSession[]>;
}
