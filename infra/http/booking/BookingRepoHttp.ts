import type { IBookingRepo } from "@core/domain/booking/IBookingRepo";
import type { Session, BookSeatsRequest, BookSeatsResponse, Booking } from "@core/domain/booking/types";
import { HttpErrorHandler } from "@core/domain/shared/HttpErrorHandler";

export class BookingRepoHttp implements IBookingRepo {
    constructor(private apiBase: string) {}

    private handleError(error: unknown) {
        console.log(error)
    }

    async getDetailSession(movieSessionId: number): Promise<Session[]> {
        try {
            return await $fetch<Session[]>(`/api/movieSessions/${movieSessionId}`, { method: 'GET' })
        } catch (error) {
            HttpErrorHandler.handle(error)
            return []
        }
    }

    async bookSeats(movieSessionId: number, request: BookSeatsRequest): Promise<BookSeatsResponse> {
        try {
            const { getToken } = useAuthToken();
            const token = getToken();

            return await $fetch<BookSeatsResponse>(`/api/movieSessions/${movieSessionId}/bookings`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: request
            })
        } catch (error) {
            HttpErrorHandler.handle(error)
            throw error
        }
    }

    async getMyBookings(): Promise<Booking[]> {
        try {
            const { getToken } = useAuthToken();
            const token = getToken();

            return await $fetch<Booking[]>(`/api/me/bookings`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        } catch (error) {
            HttpErrorHandler.handle(error)
            throw error
        }
    }
}
