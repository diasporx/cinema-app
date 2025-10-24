import type { IBookingRepo } from "@core/domain/booking/IBookingRepo";
import type { Booking } from "@core/domain/booking/types";

export class Bookings {
    constructor(private repo: IBookingRepo) {}

    async getBookings(): Promise<Booking[]> {
        return await this.repo.getMyBookings();
    }
}
