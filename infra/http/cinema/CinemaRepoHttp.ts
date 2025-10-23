import type { ICinemaRepo } from "@core/domain/cinema/ICinemaRepo";
import type { Cinema, CinemaSession } from "@core/domain/cinema/types";
import { HttpErrorHandler } from "@core/domain/shared/HttpErrorHandler";

export class CinemaRepoHttp implements ICinemaRepo {
    constructor(private apiBase: string) {}

    private handleError(error: unknown) {
        console.log(error)
    }

    async getCinemas(): Promise<Cinema[]> {
        try {
            return await $fetch<Cinema[]>('/api/cinemas', { method: 'GET' })
        } catch (error) {
            HttpErrorHandler.handle(error)
            return []
        }
    }

    async getSessionsForCinema(movieId: number): Promise<CinemaSession[]> {
        try {
            return await $fetch<CinemaSession[]>(`/api/cinemas/${movieId}/sessions`, { method: 'GET' });
        } catch (error) {
            HttpErrorHandler.handle(error);
            return [];
        }
    }
}
