import type { IBookingRepo } from "@core/domain/booking/IBookingRepo";
import type { BookSeatsRequest, BookSeatsResponse } from "@core/domain/booking/types";

export class BookSeats {
    constructor(private repo: IBookingRepo) {}

    async execute(sessionId: number, request: BookSeatsRequest): Promise<BookSeatsResponse> {
        return await this.repo.bookSeats(sessionId, request);
    }
}