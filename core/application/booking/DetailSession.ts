import type { IBookingRepo } from '@core/domain/booking/IBookingRepo';
import type { Session } from '@core/domain/booking/types';

export class DetailSession {
  constructor(private repo: IBookingRepo) {}

  async getDetails(sessionId: number): Promise<Session[]> {
    return await this.repo.getDetailSession(sessionId);
  }
}
