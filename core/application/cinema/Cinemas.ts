import type { ICinemaRepo } from "@core/domain/cinema/ICinemaRepo";
import type { Cinema, CinemaSession } from "@core/domain/cinema/types";

export class Cinemas {
    constructor(private repo: ICinemaRepo) {}

    async getAll(): Promise<Cinema[]> {
        return await this.repo.getCinemas();
    }

    async getSessionsForCinema(movieId: number): Promise<CinemaSession[]> {
        return await this.repo.getSessionsForCinema(movieId);
    }
}
