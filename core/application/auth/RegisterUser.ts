import type { IAuthRepo } from '@core/domain/auth/IAuthRepo';
import type { AuthCredentials, AuthResponse } from '@core/domain/auth/types';
import { AuthValidator } from '@core/domain/auth/AuthValidator';

export class RegisterUser {
  constructor(private repo: IAuthRepo) {}

  async register(credentials: AuthCredentials): Promise<AuthResponse> {
    AuthValidator.validateRegisterCredentials(
      credentials.username,
      credentials.password,
    );
    return await this.repo.register(credentials);
  }
}
