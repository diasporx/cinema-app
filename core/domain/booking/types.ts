export interface BookedSeat {
    rowNumber: number;
    seatNumber: number;
}

export interface SeatsLayout {
    rows: number;
    seatsPerRow: number;
}

export interface Session {
    id: number;
    movieId: number;
    cinemaId: number;
    startTime: string;
    seats: SeatsLayout;
    bookedSeats: BookedSeat[];
}

export interface BookSeatsRequest {
    seats: BookedSeat[];
}

export interface BookSeatsResponse {
    bookingId: string;
}

export interface Booking {
    id: string;
    movieSessionId: number;
    userId: number;
    isPaid: boolean;
    seats: BookedSeat[];
    bookedAt: string;
}
