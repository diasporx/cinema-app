export interface Cinema {
  id: number;
  name: string;
  address: string;
}

export interface CinemaSession {
  id: number;
  movieId: string;
  cinemaId: string;
  startTime: string;
}
