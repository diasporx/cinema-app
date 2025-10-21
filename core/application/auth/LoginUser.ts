import type { IAuthRepo } from '@core/domain/auth/IAuthRepo'
import type { AuthCredentials, AuthResponse } from '@core/domain/auth/types'
import { AuthValidator } from '@core/domain/auth/AuthValidator'

export class LoginUser {
    constructor(private repo: IAuthRepo) {}

    async exec(credentials: AuthCredentials): Promise<AuthResponse> {
        AuthValidator.validateLoginCredentials(credentials.username, credentials.password)
        return await this.repo.login(credentials)
    }
}
